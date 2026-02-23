import { loadStyle } from '../utils/utils.js';

const blockConfig = [
  {
    key: 'header',
    name: 'global-navigation',
    targetEl: 'header',
    appendType: 'prepend',
    params: ['imsClientId', 'searchEnabled', 'unav', 'customLinks', 'jarvis', 'selfIntegrateUnav', 'miniGnav', 'desktopAppsCta'],
  },
  {
    key: 'footer',
    name: 'global-footer',
    targetEl: 'footer',
    appendType: 'appendChild',
    params: ['privacyId', 'privacyLoadDelay'],
  },
];

const envMap = {
  prod: 'https://www.adobe.com',
  stage: 'https://www.stage.adobe.com',
  qa: 'https://gnav--milo--adobecom.aem.page',
};

const LOCALES = {
  '': { ietf: 'en-US', tk: 'hah7vzn.css' },
  ae_ar: { ietf: 'ar-AE', tk: 'lpk1hwn.css', dir: 'rtl' },
  ae_en: { ietf: 'en', tk: 'hah7vzn.css' },
  africa: { ietf: 'en', tk: 'hah7vzn.css' },
  ar: { ietf: 'es-AR', tk: 'hah7vzn.css' },
  at: { ietf: 'de-AT', tk: 'hah7vzn.css', base: 'de' },
  au: { ietf: 'en-AU', tk: 'hah7vzn.css' },
  be_en: { ietf: 'en-BE', tk: 'hah7vzn.css' },
  be_fr: { ietf: 'fr-BE', tk: 'hah7vzn.css', base: 'fr' },
  be_nl: { ietf: 'nl-BE', tk: 'qxw8hzm.css' },
  bg: { ietf: 'bg-BG', tk: 'qxw8hzm.css' },
  br: { ietf: 'pt-BR', tk: 'hah7vzn.css' },
  ca_fr: { ietf: 'fr-CA', tk: 'hah7vzn.css', base: 'fr' },
  ca: { ietf: 'en-CA', tk: 'hah7vzn.css', base: '' },
  ch_de: { ietf: 'de-CH', tk: 'hah7vzn.css', base: 'de' },
  ch_fr: { ietf: 'fr-CH', tk: 'hah7vzn.css', base: 'fr' },
  ch_it: { ietf: 'it-CH', tk: 'hah7vzn.css', base: 'it' },
  cl: { ietf: 'es-CL', tk: 'hah7vzn.css' },
  cn: { ietf: 'zh-CN', tk: 'qxw8hzm' },
  co: { ietf: 'es-CO', tk: 'hah7vzn.css' },
  cr: { ietf: 'es-419', tk: 'hah7vzn.css' },
  cy_en: { ietf: 'en-CY', tk: 'hah7vzn.css' },
  cz: { ietf: 'cs-CZ', tk: 'qxw8hzm.css' },
  de: { ietf: 'de-DE', tk: 'hah7vzn.css' },
  dk: { ietf: 'da-DK', tk: 'qxw8hzm.css' },
  ec: { ietf: 'es-419', tk: 'hah7vzn.css' },
  ee: { ietf: 'et-EE', tk: 'qxw8hzm.css' },
  eg_ar: { ietf: 'ar', tk: 'qxw8hzm.css', dir: 'rtl' },
  eg_en: { ietf: 'en-GB', tk: 'hah7vzn.css' },
  el: { ietf: 'el', tk: 'qxw8hzm.css' },
  es: { ietf: 'es-ES', tk: 'hah7vzn.css' },
  fi: { ietf: 'fi-FI', tk: 'qxw8hzm.css' },
  fr: { ietf: 'fr-FR', tk: 'hah7vzn.css' },
  gr_el: { ietf: 'el', tk: 'qxw8hzm.css' },
  gr_en: { ietf: 'en-GR', tk: 'hah7vzn.css' },
  gt: { ietf: 'es-419', tk: 'hah7vzn.css' },
  hk_en: { ietf: 'en-HK', tk: 'hah7vzn.css' },
  hk_zh: { ietf: 'zh-HK', tk: 'jay0ecd' },
  hu: { ietf: 'hu-HU', tk: 'qxw8hzm.css' },
  id_en: { ietf: 'en', tk: 'hah7vzn.css' },
  id_id: { ietf: 'id', tk: 'qxw8hzm.css' },
  ie: { ietf: 'en-GB', tk: 'hah7vzn.css' },
  il_en: { ietf: 'en-IL', tk: 'hah7vzn.css' },
  il_he: { ietf: 'he', tk: 'qxw8hzm.css', dir: 'rtl' },
  in_hi: { ietf: 'hi', tk: 'qxw8hzm.css' },
  in: { ietf: 'en-GB', tk: 'hah7vzn.css' },
  it: { ietf: 'it-IT', tk: 'hah7vzn.css' },
  jp: { ietf: 'ja-JP', tk: 'dvg6awq' },
  kr: { ietf: 'ko-KR', tk: 'qjs5sfm' },
  kw_ar: { ietf: 'ar', tk: 'qxw8hzm.css', dir: 'rtl' },
  kw_en: { ietf: 'en-GB', tk: 'hah7vzn.css' },
  la: { ietf: 'es-LA', tk: 'hah7vzn.css' },
  langstore: { ietf: 'en-US', tk: 'hah7vzn.css' },
  lt: { ietf: 'lt-LT', tk: 'qxw8hzm.css' },
  lu_de: { ietf: 'de-LU', tk: 'hah7vzn.css', base: 'de' },
  lu_en: { ietf: 'en-LU', tk: 'hah7vzn.css' },
  lu_fr: { ietf: 'fr-LU', tk: 'hah7vzn.css', base: 'fr' },
  lv: { ietf: 'lv-LV', tk: 'qxw8hzm.css' },
  mena_ar: { ietf: 'ar', tk: 'qxw8hzm.css', dir: 'rtl' },
  mena_en: { ietf: 'en', tk: 'hah7vzn.css' },
  mt: { ietf: 'en-MT', tk: 'hah7vzn.css' },
  mx: { ietf: 'es-MX', tk: 'hah7vzn.css' },
  my_en: { ietf: 'en-GB', tk: 'hah7vzn.css' },
  my_ms: { ietf: 'ms', tk: 'qxw8hzm.css' },
  ng: { ietf: 'en-GB', tk: 'hah7vzn.css' },
  nl: { ietf: 'nl-NL', tk: 'qxw8hzm.css' },
  no: { ietf: 'no-NO', tk: 'qxw8hzm.css' },
  nz: { ietf: 'en-GB', tk: 'hah7vzn.css' },
  pe: { ietf: 'es-PE', tk: 'hah7vzn.css' },
  ph_en: { ietf: 'en', tk: 'hah7vzn.css' },
  ph_fil: { ietf: 'fil-PH', tk: 'qxw8hzm.css' },
  pl: { ietf: 'pl-PL', tk: 'qxw8hzm.css' },
  pr: { ietf: 'es-419', tk: 'hah7vzn.css' },
  pt: { ietf: 'pt-PT', tk: 'hah7vzn.css' },
  qa_ar: { ietf: 'ar', tk: 'qxw8hzm.css', dir: 'rtl' },
  qa_en: { ietf: 'en-GB', tk: 'hah7vzn.css' },
  ro: { ietf: 'ro-RO', tk: 'qxw8hzm.css' },
  ru: { ietf: 'ru-RU', tk: 'qxw8hzm.css' },
  sa_ar: { ietf: 'ar', tk: 'qxw8hzm.css', dir: 'rtl' },
  sa_en: { ietf: 'en', tk: 'hah7vzn.css' },
  se: { ietf: 'sv-SE', tk: 'qxw8hzm.css' },
  sg: { ietf: 'en-SG', tk: 'hah7vzn.css' },
  si: { ietf: 'sl-SI', tk: 'qxw8hzm.css' },
  sk: { ietf: 'sk-SK', tk: 'qxw8hzm.css' },
  th_en: { ietf: 'en', tk: 'hah7vzn.css' },
  th_th: { ietf: 'th', tk: 'lqo2bst.css' },
  tr: { ietf: 'tr-TR', tk: 'qxw8hzm.css' },
  tw: { ietf: 'zh-TW', tk: 'jay0ecd' },
  ua: { ietf: 'uk-UA', tk: 'qxw8hzm.css' },
  uk: { ietf: 'en-GB', tk: 'hah7vzn.css' },
  vn_en: { ietf: 'en-GB', tk: 'hah7vzn.css' },
  vn_vi: { ietf: 'vi', tk: 'qxw8hzm.css' },
  za: { ietf: 'en-GB', tk: 'hah7vzn.css' },
  cis_en: { ietf: 'en', tk: 'rks2kng.css' },
  cis_ru: { ietf: 'ru', tk: 'qxw8hzm.css' },
  sea: { ietf: 'en', tk: 'hah7vzn.css' },
};

const getStageDomainsMap = (stageDomainsMap, env) => {
  const defaultUrls = {
    'www.adobe.com': 'origin',
    'helpx.adobe.com': 'helpx.stage.adobe.com',
    'creativecloud.adobe.com': 'stage.creativecloud.adobe.com',
  };

  const merged = { ...defaultUrls, ...stageDomainsMap };
  const domainMap = { 'www.stage.adobe.com': merged };

  if (env !== 'prod') {
    domainMap[window.location.host] = { ...merged, 'www.adobe.com': 'www.stage.adobe.com' };
  }

  return domainMap;
};

// Production Domain
const prodDomains = [
  'milo.adobe.com',
  'business.adobe.com',
  'www.adobe.com',
  'helpx.adobe.com',
  'stock.adobe.com',
  'adobecom.github.io',
];

function getParamsConfigs(configs) {
  return blockConfig.reduce((acc, block) => {
    block.params.forEach((param) => {
      const value = configs[block.key]?.[param];
      if (value !== undefined) {
        acc[param] = value;
      }
    });
    return acc;
  }, {});
}

function setMetaTags(metaTags, configs, createTag) {
  metaTags.forEach((tag) => {
    const { key } = tag;
    if (configs[key]) {
      const metaTag = createTag('meta', {
        name: tag.name,
        content: configs[key],
      });
      document.head.append(metaTag);
    }
  });
}

/* eslint import/no-relative-packages: 0 */
export default async function loadBlock(configs, customLib) {
  const {
    header,
    footer,
    authoringPath,
    env = 'prod',
    locale = '',
    theme,
    stageDomainsMap = {},
    allowedOrigins = [],
  } = configs || {};
  if (!header && !footer) {
    // eslint-disable-next-line no-console
    console.error('Global navigation Error: header and footer configurations are missing.');
    return;
  }
  const branch = new URLSearchParams(window.location.search).get('navbranch');
  let miloLibs = branch ? `https://${branch}--milo--adobecom.aem.page` : customLib || envMap[env];
  const useLocal = new URLSearchParams(window.location.search).get('useLocal') || false;
  if (useLocal) {
    miloLibs = 'http://localhost:6456';
  }
  // The below css imports will fail when using the non-bundled standalone gnav
  // and fallback to using loadStyle. On the other hand, the bundler will rewrite
  // the css imports to attach the styles to the head (and point to the dist folder
  // using the custom StyleLoader plugin found in build.mjs
  try {
    await import('./base.css');
    if (theme === 'dark') {
      await import('./dark-nav.css');
    }
    await import('./navigation.css');
  } catch (e) {
    if (theme === 'dark') {
      loadStyle(`${miloLibs}/libs/navigation/base.css`, () => loadStyle(`${miloLibs}/libs/navigation/dark-nav.css`));
    } else {
      loadStyle(`${miloLibs}/libs/navigation/base.css`);
    }
    loadStyle(`${miloLibs}/libs/navigation/navigation.css`);
  }

  // Relative paths work just fine since they exist in the context of this file's origin
  const [
    { default: bootstrapBlock },
    { setConfig, getConfig, createTag }] = await Promise.all([
    import('./bootstrapper.js'),
    import('../utils/utils.js'),
  ]);
  const paramConfigs = getParamsConfigs(configs);
  const origin = (() => {
    switch (env) {
      case 'prod': return 'https://www.adobe.com';
      case 'stage': return 'https://www.stage.adobe.com';
      default: return 'https://main--federal--adobecom.aem.page';
    }
  })();
  const clientConfig = {
    theme,
    prodDomains,
    clientEnv: env,
    standaloneGnav: true,
    pathname: `/${locale}`,
    miloLibs: `${miloLibs}/libs`,
    locales: configs.locales || LOCALES,
    contentRoot: authoringPath || footer?.authoringPath,
    stageDomainsMap: getStageDomainsMap(stageDomainsMap, env),
    origin,
    allowedOrigins: [...allowedOrigins, origin],
    onFooterReady: footer?.onReady,
    onFooterError: footer?.onError,
    ...paramConfigs,
  };
  setConfig({ ...getConfig(), ...clientConfig });
  for await (const block of blockConfig) {
    const configBlock = configs[block.key];

    if (configBlock) {
      const config = getConfig();
      if (block.key === 'header') {
        let gnavSource = configBlock.gnavSource || `${config?.locale?.contentRoot}/gnav`;
        if (String(configBlock.disableActiveLink) === 'true' && !gnavSource.includes('_noActiveItem')) {
          gnavSource += '#_noActiveItem';
        }
        try {
          const gnavConfigs = {
            ...block,
            gnavSource,
            unavComponents: configBlock.selfIntegrateUnav ? [] : configBlock.unav?.unavComponents,
            redirect: configBlock.redirect,
            layout: configBlock.layout,
            noBorder: configBlock.noBorder,
            jarvis: configBlock.jarvis,
            isLocalNav: configBlock.isLocalNav,
            mobileGnavV2: configBlock.mobileGnavV2 || 'on',
            signInCtaStyle: configBlock?.unav?.profile?.signInCtaStyle || 'secondary',
            productEntryCta: configBlock.productEntryCta || 'off',
          };
          const metaTags = [
            { key: 'gnavSource', name: 'gnav-source' },
            { key: 'unavComponents', name: 'universal-nav' },
            { key: 'redirect', name: 'adobe-home-redirect' },
            { key: 'mobileGnavV2', name: 'mobile-gnav-v2' },
            { key: 'productEntryCta', name: 'product-entry-cta' },
          ];
          setMetaTags(metaTags, gnavConfigs, createTag);
          const { default: init, closeGnavOptions } = await import('../blocks/global-navigation/global-navigation.js');
          await bootstrapBlock(init, gnavConfigs);
          window.closeGnav = closeGnavOptions;
          configBlock.onReady?.();
        } catch (e) {
          configBlock.onError?.(e);
          window.lana.log(`${e.message} | gnav-source: ${gnavSource} | href: ${window.location.href}`, {
            clientId: 'feds-milo',
            tags: 'standalone-gnav',
            severity: 'error',
          });
        }
      }
      if (block.key === 'footer') {
        const footerSource = configBlock.footerSource || `${config?.locale?.contentRoot}/footer`;
        try {
          const metaTags = [
            { key: 'footerSource', name: 'footer-source' },
          ];
          const footerConfigs = {
            ...block,
            footerSource,
            isContainerResponsive: configBlock.isContainerResponsive,
          };

          setMetaTags(metaTags, footerConfigs, createTag);
          import('./footer.css').catch(() => loadStyle(`${miloLibs}/libs/navigation/footer.css`));
          const { default: init } = await import('../blocks/global-footer/global-footer.js');
          await bootstrapBlock(init, footerConfigs);
        } catch (e) {
          configBlock.onError?.(e);
          window.lana.log(`${e.message} | footer-source: ${footerSource} | href: ${window.location.href}`, {
            clientId: 'feds-milo',
            tags: 'standalone-footer',
            severity: 'error',
          });
        }
      }
    }
  }
}

window.loadNavigation = loadBlock;
