import { createTag, getConfig, getCountry, setInternational, getMetadata } from '../../utils/utils.js';

const MARKET_COOKIE = 'market';

function getCookie(name) {
  return document.cookie
    .split('; ')
    .find((row) => row.startsWith(`${name}=`))
    ?.split('=')[1];
}

function setCookie(name, value, days = 365) {
  const domain = window.location.host.endsWith('.adobe.com') ? 'domain=adobe.com;' : '';
  const maxAge = days * 24 * 60 * 60;
  document.cookie = `${name}=${value};max-age=${maxAge};path=/;${domain}`;
}

async function loadConfig() {
  const marketSelectorKey = getMetadata('marketselector');
  const { contentRoot } = getConfig();
  
  const paths = [];
  if (marketSelectorKey) {
    paths.push(`${contentRoot}/market-selector/market-selector-${marketSelectorKey}.json`);
  }
  paths.push(`${contentRoot}/market-config.json`);
  paths.push('/market-config.json');
  paths.push('https://main--federal--adobecom.aem.live/federal/assets/data/market-config.json');

  for (const path of paths) {
    try {
      const resp = await fetch(path);
      if (resp.ok) return await resp.json();
    } catch (e) { /* continue */ }
  }
  return null;
}

const normalizedCache = new Map();
function getNormalizedText(text) {
  if (!normalizedCache.has(text)) {
    const normalized = text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
    normalizedCache.set(text, normalized);
  }
  return normalizedCache.get(text);
}

function matches(itemText, searchTerm) {
  const searchLower = searchTerm.trim().toLowerCase();
  if (!searchLower) return true;
  const searchNormalized = getNormalizedText(searchLower);
  
  const itemLower = itemText.toLowerCase();
  const itemNormalized = getNormalizedText(itemText);
  
  return itemLower.includes(searchLower) || itemNormalized.includes(searchNormalized);
}

function getPlaceholders(block) {
  const p = [...block.querySelectorAll('p')].map((el) => el.textContent.trim());
  return {
    searchLang: p[0] || 'Search Language',
    searchMarket: p[1] || 'Search Market',
    noResultLang: p[2] || 'No results found',
    noResultMarket: p[3] || 'No results found',
    chooseLang: p[4] || 'Choose your language',
  };
}

function getCurrentPrefix() {
  const { locale } = getConfig();
  return locale.prefix?.replace('/', '') || '';
}

export default async function init(block) {
  const config = await loadConfig();
  if (!config) return;

  const { languages, markets } = config;
  const placeholders = getPlaceholders(block);
  
  const currentPrefix = getCurrentPrefix();
  const marketCookie = getCookie(MARKET_COOKIE);
  const geoCountry = getCountry()?.toLowerCase();
  const currentMarketCode = marketCookie || geoCountry || 'us';

  // Proactive cookie setting
  if (!marketCookie) setCookie(MARKET_COOKIE, currentMarketCode);

  const matchedLang = languages.find((l) => l.prefix === currentPrefix);
  const currentMarket = markets.find((m) => m.marketCode === currentMarketCode) 
    || markets.find((m) => m.marketCode === (matchedLang?.defaultMarket || 'us'));

  block.innerHTML = '';
  const wrapper = createTag('div', { class: 'market-selector-wrapper' });

  // --- Language Dropdown ---
  const langLabel = matchedLang ? matchedLang.languageName : placeholders.chooseLang;
  const langBtn = createTag('div', { class: 'market-selector-dropdown' }, langLabel);
  const langPopover = createTag('div', { class: 'market-selector-popover' });
  const langSearch = createTag('div', { class: 'market-selector-search' }, `<input type="text" placeholder="${placeholders.searchLang}">`);
  const langList = createTag('ul', { class: 'market-selector-list' });
  
  languages.forEach((lang) => {
    const isSelected = lang.prefix === currentPrefix;
    const item = createTag('li', { 
      class: `market-selector-item ${isSelected ? 'is-selected' : ''}`,
      'data-prefix': lang.prefix 
    }, lang.languageName);
    
    item.addEventListener('click', async () => {
      if (isSelected) return;
      
      const targetPath = window.location.pathname.replace(getConfig().locale.prefix, lang.prefix ? `/${lang.prefix}` : '');
      const headResp = await fetch(targetPath, { method: 'HEAD' });
      const finalUrl = headResp.ok ? targetPath : (lang.prefix ? `/${lang.prefix}/` : '/');
      
      // Check market compatibility
      const supportedMarkets = lang.markets.split(',');
      if (!supportedMarkets.includes(currentMarketCode)) {
        setCookie(MARKET_COOKIE, lang.defaultMarket);
      }
      
      setInternational(lang.prefix || 'us');
      window.location.href = finalUrl;
    });
    langList.append(item);
  });

  langPopover.append(langSearch, langList);
  langBtn.append(langPopover);

  // --- Market Dropdown ---
  const marketLabel = currentMarket ? `${currentMarket.marketName} - ${currentMarket.currencyCode}` : 'Select Market';
  const marketBtn = createTag('div', { class: 'market-selector-dropdown' }, marketLabel);
  const marketPopover = createTag('div', { class: 'market-selector-popover' });
  const marketSearch = createTag('div', { class: 'market-selector-search' }, `<input type="text" placeholder="${placeholders.searchMarket}">`);
  const marketList = createTag('ul', { class: 'market-selector-list' });

  const updateMarketList = (lang) => {
    marketList.innerHTML = '';
    const supportedCodes = lang?.markets.split(',') || markets.map(m => m.marketCode);
    const filteredMarkets = markets.filter((m) => supportedCodes.includes(m.marketCode));

    filteredMarkets.forEach((m) => {
      const isSelected = m.marketCode === currentMarketCode;
      const item = createTag('li', { 
        class: `market-selector-item ${isSelected ? 'is-selected' : ''}`,
        'data-search-text': `${m.marketName} ${m.marketCode} ${m.currencyName} ${m.currencyCode}`
      }, `<a href="${window.location.pathname}" data-market="${m.marketCode}">${m.marketName} - ${m.currencyCode}</a>`);
      
      item.querySelector('a').addEventListener('click', (e) => {
        e.preventDefault();
        setCookie(MARKET_COOKIE, m.marketCode);
        window.location.reload();
      });
      marketList.append(item);
    });
  };

  updateMarketList(matchedLang);
  marketPopover.append(marketSearch, marketList);
  marketBtn.append(marketPopover);

  // --- Search Logic ---
  [langSearch, marketSearch].forEach((searchDiv) => {
    const input = searchDiv.querySelector('input');
    input.addEventListener('input', (e) => {
      const searchTerm = e.target.value;
      const items = searchDiv.nextElementSibling.querySelectorAll('.market-selector-item');
      items.forEach((item) => {
        const searchText = item.getAttribute('data-search-text') || item.textContent;
        const match = matches(searchText, searchTerm);
        item.style.display = match ? 'block' : 'none';
      });
    });
  });

  // --- Popover Toggles ---
  [langBtn, marketBtn].forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = btn.classList.contains('is-open');
      document.querySelectorAll('.market-selector-dropdown').forEach((d) => d.classList.remove('is-open'));
      if (!isOpen) btn.classList.add('is-open');
    });
  });

  document.addEventListener('click', () => {
    document.querySelectorAll('.market-selector-dropdown').forEach((d) => d.classList.remove('is-open'));
  });

  wrapper.append(langBtn, marketBtn);
  block.append(wrapper);
}
