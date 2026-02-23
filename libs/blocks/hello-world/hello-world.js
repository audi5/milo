export default function init(el) {
  el.classList.add('hello-world');

  const message = document.createElement('p');
  message.textContent = '👋 Hello from Milo';

  el.append(message);
}
