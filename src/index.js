import { Keyboard } from './keyboard/keyboard';

window.addEventListener('DOMContentLoaded', function () {
  let title = document.createElement('h1');
  title.textContent = "Virtual Keyboard";
  document.body.appendChild(title);

  let textarea = document.createElement('textarea');
  textarea.style.position = "absolute";
  textarea.classList.add("use-keyboard-input");
  textarea.style.top = "10%";
  textarea.style.right = "10%";
  textarea.style.width = "80%";
  textarea.style.height = "40%";
  document.body.appendChild(textarea);

  Keyboard.init();

  let text = document.createElement('p');
  text.classList.add("language");
  text.textContent = "Для переключения языка комбинация: левыe shift + alt";
  document.body.appendChild(text);
});
