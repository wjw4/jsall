
const appDiv = document.getElementById('app');
appDiv.innerHTML = `
  <div id="copy">複製</div>
  <div id="control" class="control control--edit">編輯中</div>
  <textarea id="write"></textarea>
  <textarea id="read" readonly style="display: none;"></textarea>
`;

const copy = appDiv.querySelector('#copy');
const control = appDiv.querySelector('#control');
const write = appDiv.querySelector('#write');
const read = appDiv.querySelector('#read');

copy.addEventListener(
  'click',
  (() => {
    let domTimer;

    return (ev) => {
      const { target } = ev;
      const isEdit = control.classList.contains('control--edit');

      copyToClipboard((isEdit ? write.value : read.value) || '', true);

      if (domTimer) {
        clearTimeout(domTimer);
        domTimer = null;
      }

      target.innerText = '成功';
      target.style.color = 'green';

      domTimer = setTimeout(() => {
        target.innerText = '複製';
        target.style.color = 'black';
      }, 3000);
    };
  })()
);

control.addEventListener('click', (ev) => {
  const { target } = ev;
  const isEdit = target.classList.contains('control--edit');

  if (isEdit) {
    target.classList.remove('control--edit');
    target.classList.add('control--view');
    write.style.display = 'none';
    read.style.display = '';

    let isEncode = false;
    try {
      const writeValue = write.value || '';
      const code =
        writeValue.split('\n').filter((e) => !!e && e !== '\n')[0] || '';
      let text = '';

      if (code) {
        try {
          text = decode(code);
        } catch (err) {
          console.error(err);
          text = encode(writeValue);
          isEncode = true;
        }
      }

      read.value = text;
    } catch (err) {
      console.error(err);
      read.value = err;
    }

    target.style.color = isEncode ? 'red' : 'green';
    target.innerText = `(${isEncode ? '加密' : '解密'}) 查看中`;
  } else {
    target.classList.remove('control--view');
    target.classList.add('control--edit');
    write.style.display = '';
    read.style.display = 'none';
    target.style.color = 'black';
    target.innerText = '編輯中';
  }
});

/**
 * @param {any} value
 * @param {any} view Optional. If the value is from an iframe, provide the iframe content window here.
 * @returns {boolean}
 */
function isHtmlElement(value, view) {
  if (value instanceof HTMLElement) return true;
  if (view && value instanceof view.HTMLElement) return true;

  return !!(
    value &&
    typeof value === 'object' &&
    value !== null &&
    value.nodeType === 1 &&
    typeof value.nodeName === 'string'
  );
}

function copyToClipboard(input, isLine = false) {
  var _input = document.createElement(isLine ? 'textarea' : 'input');
  _input.setAttribute('readonly', 'readonly');

  document.body.append(_input);
  _input.value = isHtmlElement(input) ? input.value : input;

  if (navigator.userAgent.match(/ipad|ipod|iphone/i)) {
    var editable = _input.contentEditable;
    var readOnly = _input.readOnly;
    _input.contentEditable = 'true';
    _input.readOnly = 'false';
    var range = document.createRange();
    range.selectNodeContents(_input);
    var sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
    _input.setSelectionRange(0, 999999);
    _input.contentEditable = editable;
    _input.readOnly = readOnly;
  } else {
    _input.select();
  }

  document.execCommand('copy');
  _input.blur();
  _input.remove();
}

function utf8Btoa(text) {
  return window.btoa(
    window
      .encodeURIComponent(text)
      .replace(/%([0-9A-F]{2})/g, function toSolidBytes(match, p1) {
        return String.fromCharCode('0x' + p1);
      })
  );
}

function utf8Atob(encodeText) {
  return window.decodeURIComponent(
    window
      .atob(encodeText)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join('')
  );
}

function encode(text) {
  var base64 = utf8Btoa(text);

  for (var i = base64.length - 1; i > 0; i--) {
    if (base64[i] !== '=') {
      base64 = base64.substring(1, i + 1) + base64[0] + base64.substring(i + 1);
      break;
    }
  }

  return base64;
}

function decode(encodeText, isDecodeUrl) {
  var _encodeText = encodeText;

  for (var i = _encodeText.length - 1; i > 0; i--) {
    if (_encodeText[i] !== '=') {
      _encodeText =
        _encodeText[i] +
        _encodeText.substring(0, i) +
        _encodeText.substring(i + 1);
      break;
    }
  }

  if (isDecodeUrl === undefined || isDecodeUrl === true) {
    return utf8Atob(_encodeText);
  } else {
    return _encodeText;
  }
}
