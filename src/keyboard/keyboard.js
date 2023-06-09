import './keyboard.css';
import { keyLayout } from './keybase.js';

const Keyboard = {
  elements: {
    main: null,
    keysContainer: null,
    keys: [],
  },

  eventHandlers: {
    oninput: null,
    onclose: null,
  },

  properties: {
    value: '',
    lang: false,
    capsLock: false,
    shift: false,
    ctrl: false,
    alt: false,
  },

  init() {
    this.loadParametrs();
    // Create main elements
    this.elements.main = document.createElement('div');
    this.elements.keysContainer = document.createElement('div');

    // Setup main elements
    this.elements.main.classList.add('keyboard'); //, 'keyboard--hidden');
    this.elements.keysContainer.classList.add('keyboard__keys');
    this.elements.keysContainer.appendChild(this._createKeys());

    this.elements.keys =
      this.elements.keysContainer.querySelectorAll('.keyboard__key');

    // Add to DOM
    this.elements.main.appendChild(this.elements.keysContainer);
    document.body.appendChild(this.elements.main);

    // Automatically use keyboard for elements with .use-keyboard-input
    document.querySelectorAll('.use-keyboard-input').forEach((element) => {
      element.addEventListener('focus', () => {
        this.open(element.value, (currentValue) => {
          element.value = currentValue;
        });
      });
    });

    document.onkeydown = this.checkKeyDowncode;
    document.onkeyup = this.checkKeyUpcode;
  },

  _createKeys() {
    const fragment = document.createDocumentFragment();

    // Creates HTML for an icon
    const createIconHTML = (icon_name) => {
      return `<i class="material-icons">${icon_name}</i>`;
    };

    keyLayout.forEach((element) => {
      const keyElement = document.createElement('button');
      const insertLineBreak =
        ['Backspace', 'Backslash', 'Enter', 'ShiftRight'].indexOf(
          element.keyCode,
        ) !== -1;

      // Add attributes/classes
      keyElement.setAttribute('type', 'button');
      keyElement.classList.add('keyboard__key');
      keyElement.id = element.keyCode;
      const lang = !this.properties.lang ? element.en_EN : element.ru_RU;
      switch (element.keyCode) {
        case 'Backspace':
          keyElement.classList.add('keyboard__key--wide');
          keyElement.innerHTML = createIconHTML('backspace');

          keyElement.addEventListener('click', () => {
            this.properties.value = this.properties.value.substring(
              0,
              this.properties.value.length - 1,
            );
            this._triggerEvent('oninput');
            this.saveParametrs();
          });

          break;

        case 'CapsLock':
          keyElement.classList.add(
            'keyboard__key--wide',
            'keyboard__key--activatable',
          );
          keyElement.innerHTML = createIconHTML('keyboard_capslock');
          keyElement.classList.toggle(
            'keyboard__key--active',
            this.properties.capsLock,
          );
          keyElement.addEventListener('click', () => {
            this._toggleCapsLock();
            keyElement.classList.toggle(
              'keyboard__key--active',
              this.properties.capsLock,
            );
            this.saveParametrs();
          });

          break;

        case 'Tab':
          keyElement.classList.add('keyboard__key--wide');
          keyElement.innerHTML = createIconHTML('keyboard_tab');

          keyElement.addEventListener('click', () => {
            this.properties.value += '  ';
            this._triggerEvent('oninput');
            this.saveParametrs();
          });

          break;

        case 'Enter':
          keyElement.classList.add('keyboard__key--wide');
          keyElement.innerHTML = createIconHTML('keyboard_return');

          keyElement.addEventListener('click', () => {
            this.properties.value += '\n';
            this._triggerEvent('oninput');
            this.saveParametrs();
          });

          break;

        case 'ShiftLeft':
        case 'ShiftRight':
          keyElement.classList.add('keyboard__key--wide');
          keyElement.innerHTML = createIconHTML('publish');

          keyElement.addEventListener('mousedown', () => {
            this._toggleShift();
            keyElement.classList.toggle(
              'keyboard__key--active',
              this.properties.shift,
            );
            this.saveParametrs();
          });

          keyElement.addEventListener('mouseup', () => {
            this._toggleShift();
            keyElement.classList.toggle(
              'keyboard__key--active',
              this.properties.shift,
            );
            this.saveParametrs();
          });

          break;
        case 'ControlLeft':
        case 'ControlRight':
          keyElement.classList.add('keyboard__key');
          keyElement.innerHTML = createIconHTML('keyboard_control_key');

          keyElement.addEventListener('click', () => {
            keyElement.classList.toggle(
              'keyboard__key--active',
              this.properties.ctrl,
            );
            this.saveParametrs();
          });

          break;
        //keyboard_arrow_up
        case 'ArrowUp':
          keyElement.classList.add('keyboard__key');
          keyElement.innerHTML = createIconHTML('keyboard_arrow_up');

          keyElement.addEventListener('click', () => {
            this.properties.value += element.en_EN.key;
            this._triggerEvent('oninput');
            this.saveParametrs();
          });

          break;
        //keyboard_arrow_left
        case 'ArrowLeft':
          keyElement.classList.add('keyboard__key');
          keyElement.innerHTML = createIconHTML('keyboard_arrow_left');

          keyElement.addEventListener('click', () => {
            this.properties.value += element.en_EN.key;
            this._triggerEvent('oninput');
            this.saveParametrs();
          });

          break;
        case 'ArrowRight':
          keyElement.classList.add('keyboard__key');
          keyElement.innerHTML = createIconHTML('keyboard_arrow_right');

          keyElement.addEventListener('click', () => {
            this.properties.value += element.en_EN.key;
            this._triggerEvent('oninput');
            this.saveParametrs();
          });

          break;
        case 'ArrowDown':
          keyElement.classList.add('keyboard__key');
          keyElement.innerHTML = createIconHTML('keyboard_arrow_down');

          keyElement.addEventListener('click', () => {
            this.properties.value += element.en_EN.key;
            this._triggerEvent('oninput');
            this.saveParametrs();
          });

          break;
        case 'MetaLeft':
          keyElement.classList.add('keyboard__key');
          keyElement.innerHTML = createIconHTML('computer');

          keyElement.addEventListener('click', () => {});

          break;
        case 'AltLeft':
        case 'AltRight':
          keyElement.classList.add('keyboard__key');
          keyElement.innerHTML = createIconHTML('text_format');

          keyElement.addEventListener('click', () => {
            keyElement.classList.toggle(
              'keyboard__key--active',
              this.properties.alt,
            );
          });

          break;
        case 'Space':
          keyElement.classList.add('keyboard__key--extra-wide');
          keyElement.innerHTML = createIconHTML('space_bar');

          keyElement.addEventListener('click', () => {
            this.properties.value += ' ';
            this._triggerEvent('oninput');
            this.saveParametrs();
          });

          break;

        case 'done':
          keyElement.classList.add(
            'keyboard__key--wide',
            'keyboard__key--dark',
          );
          keyElement.innerHTML = createIconHTML('check_circle');

          keyElement.addEventListener('click', () => {
            this.close();
            this._triggerEvent('onclose');
          });

          break;

        default:
          keyElement.textContent = this.properties.capsLock
            ? this.properties.shift
              ? lang.keyShift.toLowerCase()
              : lang.key.toUpperCase()
            : this.properties.shift
            ? lang.keyShift.toUpperCase()
            : lang.key.toLowerCase();

          keyElement.addEventListener('click', () => {
            let langSymbol = !this.properties.lang
              ? element.en_EN
              : element.ru_RU;
            this.properties.value += this.properties.capsLock
              ? this.properties.shift
                ? langSymbol.keyShift.toLowerCase()
                : langSymbol.key.toUpperCase()
              : this.properties.shift
              ? langSymbol.keyShift.toUpperCase()
              : langSymbol.key.toLowerCase();
            this._triggerEvent('oninput');
            this.saveParametrs();
          });

          break;
      }

      fragment.appendChild(keyElement);

      if (insertLineBreak) {
        fragment.appendChild(document.createElement('br'));
      }
    });

    return fragment;
  },

  _triggerEvent(handlerName) {
    if (typeof this.eventHandlers[handlerName] == 'function') {
      this.eventHandlers[handlerName](this.properties.value);
    }
  },

  _toggleCapsLock() {
    this.properties.capsLock = !this.properties.capsLock;

    let index = 0;
    for (const key of this.elements.keys) {
      if (key.childElementCount === 0) {
        let langSymbol = !this.properties.lang
          ? keyLayout[index].en_EN
          : keyLayout[index].ru_RU;
        key.textContent = this.properties.capsLock
          ? this.properties.shift
            ? langSymbol.keyShift.toLowerCase()
            : langSymbol.key.toUpperCase()
          : this.properties.shift
          ? langSymbol.keyShift.toUpperCase()
          : langSymbol.key.toLowerCase();
      }
      index++;
    }
  },

  _toggleShift() {
    this.properties.shift = !this.properties.shift;
    let index = 0;
    for (const key of this.elements.keys) {
      if (key.childElementCount === 0) {
        let langSymbol = !this.properties.lang
          ? keyLayout[index].en_EN
          : keyLayout[index].ru_RU;
        key.textContent = this.properties.capsLock
          ? this.properties.shift
            ? langSymbol.keyShift.toLowerCase()
            : langSymbol.key.toUpperCase()
          : this.properties.shift
          ? langSymbol.keyShift.toUpperCase()
          : langSymbol.key.toLowerCase();
      }
      index++;
    }
  },

  open(initialValue, oninput, onclose) {
    this.properties.value = initialValue || '';
    this.eventHandlers.oninput = oninput;
    this.eventHandlers.onclose = onclose;
    //this.elements.main.classList.remove('keyboard--hidden');
  },

  close() {
    this.properties.value = '';
    this.eventHandlers.oninput = oninput;
    this.eventHandlers.onclose = onclose;
    //this.elements.main.classList.add('keyboard--hidden');
  },

  buttonDownToUpByCode(code) {
    for (const _key of this.elements.keys) {
      if (_key.id === code) {
        setTimeout(function () {
          _key.classList.remove('keyboard__key--hovered');
        }, 100);
        const eventShift = new Event('mousedown');
        switch (code) {
          case 'ShiftLeft':
          case 'ShiftRight':
            _key.dispatchEvent(eventShift);
            break;

          default:
            break;
        }

        break;
      }
    }
  },

  findButtonByCode(code) {
    let index = 0;
    for (const _key of this.elements.keys) {
      if (_key.id === code) {
        if (!_key.classList.contains('keyboard__key--hovered')) {
          _key.classList.add('keyboard__key--hovered');
          let langSymbol = !this.properties.lang
            ? keyLayout[index].en_EN
            : keyLayout[index].ru_RU;
          this.properties.value += this.properties.capsLock
            ? this.properties.shift
              ? langSymbol.keyShift.toLowerCase()
              : langSymbol.key.toUpperCase()
            : this.properties.shift
            ? langSymbol.keyShift.toUpperCase()
            : langSymbol.key.toLowerCase();

          const eventCaps = new Event('click');
          const eventShift = new Event('mousedown');

          switch (code) {
            case 'ArrowUp':
            case 'ArrowLeft':
            case 'ArrowRight':
            case 'ArrowDown':
              document.querySelector('.use-keyboard-input').value +=
                keyLayout[index].en_EN.key;
              break;
            case 'CapsLock':
              _key.dispatchEvent(eventCaps);
              // setTimeout(function () {
              //   _key.classList.remove('keyboard__key--hovered');
              // }, 100);
              break;
            case 'ShiftLeft':
            case 'ShiftRight':
              _key.dispatchEvent(eventShift);
              break;
            case 'AltLeft':
            case 'AltRight':
              if (this.properties.shift) this.changeLanguage();
              break;
            default:
              break;
          }
        }

        // const event = new Event('click');
        // _key.dispatchEvent(event);

        break;
      }
      index++;
    }
  },

  checkKeyDowncode(event) {
    var key;
    //if (!event) var event = window.event;
    if (event.code) key = event.code; // для IE
    //console.log('keycode: ' + key); // Выводим сообщение
    Keyboard.findButtonByCode(key);
    Keyboard.saveParametrs();
  },

  checkKeyUpcode(event) {
    var key;
    //if (!event) var event = window.event;
    if (event.code) key = event.code; // для IE
    //console.log('keycode: ' + key); // Выводим сообщение
    Keyboard.buttonDownToUpByCode(key);
  },

  changeLanguage() {
    this.properties.lang = !this.properties.lang;

    let index = 0;
    for (const key of this.elements.keys) {
      if (key.childElementCount === 0) {
        let langSymbol = !this.properties.lang
          ? keyLayout[index].en_EN
          : keyLayout[index].ru_RU;
        key.textContent = this.properties.capsLock
          ? this.properties.shift
            ? langSymbol.keyShift.toLowerCase()
            : langSymbol.key.toUpperCase()
          : this.properties.shift
          ? langSymbol.keyShift.toUpperCase()
          : langSymbol.key.toLowerCase();
      }
      index++;
    }
    this.saveParametrs();
  },

  saveParametrs() {
    localStorage.setItem('value', this.properties.value);
    localStorage.setItem('lang', this.properties.lang);
  },

  loadParametrs() {
    this.properties.value =
      localStorage.getItem('value') === 'null'
        ? ''
        : localStorage.getItem('value');
    this.properties.lang =
      localStorage.getItem('lang') === 'null'
        ? false
        : localStorage.getItem('lang');
    document.querySelector('.use-keyboard-input').value +=
      this.properties.value;
  },
};

export { Keyboard };
