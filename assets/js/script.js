
function isNullOrEmpty(string) {
  if (string.trim() === null || string.trim() === '') {
    return true;
  }
  else {
    return false;
  }
}

let formStateValues = {}, formStateSuccess = {};
let formElm = document.querySelector('form');
let forms = document.querySelectorAll('.form-page');
let buttons = document.querySelectorAll('.buttons .btn-form');
let formsPagesLength = forms.length - 1;
let activeFormPageIndex = 0;
const controlType = 'BUTTONS';

forms.forEach((form, index) => {
  //Set Form State
  let list = {}, list2 = {};
  form.querySelectorAll('input[befill]').forEach(input => {
    list[input.name] = input.value;
    list2[input.name] = input.hasAttribute('success') ? true : false;
  })
  formStateValues[index] = list;
  formStateSuccess[index] = list2;
  //Input Listeners
  form.addEventListener('change', function (e) {
    //Placeholder Move Up
    if (e.target.closest('.inner-input[type-pa] input')) {
      let target = e.target.closest('.input-part');
      isNullOrEmpty(target.querySelector('input').value)
        ? target.querySelector('.inner-input').classList.add('anim')
        : target.querySelector('.inner-input').classList.remove('anim');
    }
  })
})
window.addEventListener('input', function (e) {
  console.log(e.target.closest('.inner-input[type-ph] :is(input,textarea)'))
  if (e.target.closest('.inner-input[type-ph] :is(input,textarea)')) {
    let target = e.target.closest('.input-part');
    isNullOrEmpty(e.target.closest('.inner-input[type-ph] :is(input,textarea)').value)
      ? target.querySelector('.inner-input').classList.remove('hidden-ph')
      : target.querySelector('.inner-input').classList.add('hidden-ph');
  }
})


const BeforeLoadForm = () => {
  activeFormPageIndex = Array.from(document.querySelectorAll('.form-page')).indexOf(document.querySelector('.form-page.active'))
  activeFormPageIndex === 0 ? buttons[0].classList.add('d-none')
    : buttons[0].classList.remove('d-none');
  buttons[1].innerText = (formsPagesLength === activeFormPageIndex
    ? buttons[1].getAttribute('submit-title')
    : buttons[1].getAttribute('forward-title'));
  IsSuccessFormPage();
};
BeforeLoadForm();

function SwitchBetweenPages() {
  buttons.forEach(button => {
    button.addEventListener('click', function (e) {
      if (button.closest('.btn-form:last-child:not([disabled])')) {
        if (IsSuccessFormPage('BUTTONS')) {
          formsPagesLength === activeFormPageIndex
            ? formElm.submit()
            : forms[activeFormPageIndex].classList.remove('active') & forms[activeFormPageIndex + 1].classList.add('active') & console.log('else');
          activeFormPageIndex += 1;
        }
      }
      else if (button.closest('.btn-form:first-child')) {
        forms[activeFormPageIndex].classList.remove('active');
        forms[activeFormPageIndex - 1].classList.add('active');
        activeFormPageIndex -= 1;
      }
      else {
        IsSuccessFormPage('INPUTS');
      }
      //Buttons update name and visibility
      activeFormPageIndex === 0 ? buttons[0].classList.add('d-none')
        : buttons[0].classList.remove('d-none');
      buttons[1].innerText = (formsPagesLength === activeFormPageIndex
        ? buttons[1].getAttribute('submit-title')
        : buttons[1].getAttribute('forward-title'))
    })
  })
}
SwitchBetweenPages();
function ErrorMessage(target, bool, errorCode = 102) {
  // let cloneH5 = document.createElement('h5')
  // cloneH5.classList.add('file-error', 'fSize-14');
  let messages = {
    101: 'Doldurulmasi gerekli alan.',
    102: 'Hatalı yazım, lüttfen kontrol ediniz.',
    201: 'Telefon numarası hatalıdır.',
    202: 'Eksik numara girilmiştir.',
    203: 'Numaraya bağlı bir hesap bulunmamaktadır.',
    211: 'Ynalış doğrulama kodu.',
    301: 'Geçerli bir link giriniz.',
    401: 'Geçerli bir e-mail adresi giriniz.',
    501: 'Lütfen en az bir isim ve soyisim giriniz!',
    502: `${target.minLength} karakterden az olmamalı`,
    601: 'Dosya türü uygun değildir.',
    602: `Dosya Sayısı Maksimum ${target.firstElementChild?.dataset.filetotalnumber} Olmalıdır.`,
    603: 'Dosya boyutu 200x200 olmalıdır.',
    604: `Dosya boyutu ${target.firstElementChild?.dataset.maxfilesize} MB'ı aşmıştır.`,
    701: `Recaptche bos birakilmamalidir.`,
    801: `Geçerli bir yıl giriniz.`,
    901: `TC No eksik girilmiştir.`,
    902: `Hatalı bir TC No girilmiştir.`,
  }
  let inputPart = target.closest('.input-part');
  let inputError = target.closest('.input-part').querySelector('.input-error');
  if (bool && errorCode === 99) {
    console.log(target);
    target.removeAttribute('success')
  }
  else if (bool) {
    if (target.classList.contains('checkboxFieldset') || target.classList.contains('radioFieldset')) {
      target.previousElementSibling.firstElementChild.setAttribute('unsuccess', '');
    }
    else if (target.type === 'checkbox') {
      target.setAttribute('unsuccess', '');
    }
    else {
      // target.nextElementSibling ? (target.nextElementSibling.innerText = messages[errorCode]) : target.after(cloneH5) & (cloneH5.innerText = messages[errorCode]);
      inputError.innerText = messages[errorCode];
      target.setAttribute('unsuccess', '');
    }
  }
  else {
    if (target.classList.contains('checkboxFieldset') || target.classList.contains('radioFieldset')) {
      target.previousElementSibling.firstElementChild.removeAttribute('unsuccess');
    }
    else if (target.type === 'checkbox') {
      target.removeAttribute('unsuccess');
    }
    else {
      inputError.innerText = '';
      target.removeAttribute('unsuccess');
    }
  }
}
function SetStateOfInput(target, state, errorCode = 102) {
  let messages = {
    101: 'Doldurulmasi gerekli alan.',
    102: 'Hatalı yazım, lüttfen kontrol ediniz.',
    201: 'Telefon numarası hatalıdır.',
    202: 'Eksik numara girilmiştir.',
    203: 'Numaraya bağlı bir hesap bulunmamaktadır.',
    211: 'Ynalış doğrulama kodu.',
    301: 'Geçerli bir link giriniz.',
    401: 'Geçerli bir e-mail adresi giriniz.',
    501: 'Lütfen en az bir isim ve soyisim giriniz!',
    502: `${target.minLength} karakterden az olmamalı`,
    601: 'Dosya türü uygun değildir.',
    602: `Dosya Sayısı Maksimum ${target.firstElementChild?.dataset.filetotalnumber} Olmalıdır.`,
    603: 'Dosya boyutu 200x200 olmalıdır.',
    604: `Dosya boyutu ${target.firstElementChild?.dataset.maxfilesize} MB'ı aşmıştır.`,
    701: `Recaptche bos birakilmamalidir.`,
    801: `Geçerli bir yıl giriniz.`,
    901: `TC No eksik girilmiştir.`,
    902: `Hatalı bir TC No girilmiştir.`,
  }
  let inputPart = target.closest('.input-part');
  let inputError = target.closest('.input-part').querySelector('.input-error');
  switch (state) {
    case 'STATE_SUCCESS':
      // console.log(state, target);
      inputError.innerText = '';
      target.setAttribute('success', '');
      target.removeAttribute('unsuccess');
      target.name in formStateSuccess[activeFormPageIndex] && (formStateSuccess[activeFormPageIndex][target.name] = true);
      break;
    case 'STATE_UNSUCCESS':
      inputError.innerText = messages[errorCode];
      target.setAttribute('unsuccess', '');
      target.removeAttribute('success');
      target.name in formStateSuccess[activeFormPageIndex] && (formStateSuccess[activeFormPageIndex][target.name] = false);
      break;
    case 'STATE_EMPTY':
      inputError.innerText = '';
      ['success', 'unsuccess'].forEach(attribute => target.removeAttribute(attribute));
      target.name in formStateSuccess[activeFormPageIndex] && (formStateSuccess[activeFormPageIndex][target.name] = false)
      break;
    default:
      break;
  }
}
function TextInput() {
  const regEx = /^([a-zA-ZğüşöçıİĞÜŞÖÇ]{2,})+(?: [a-zA-ZğüşöçıİĞÜŞÖÇ]{2,})+(?:)$/;
  const regExOnlyLetter = /^([a-zA-ZğüşöçıİĞÜŞÖÇ]+\s?)*\s*$/;
  const eventsList = ['blur', 'change']
  for (const event of eventsList) {
    document.querySelector('form')?.addEventListener(event, function (e) {
      if (e.target.matches('input[type=text]')) {
        if (e.target.value.length === 0) {
          SetStateOfInput(e.target, 'STATE_EMPTY')
        }
        else if (e.target.classList.contains('namesurname')) {
          if (!regEx.test(e.target.value.trim())) {
            SetStateOfInput(e.target, 'STATE_UNSUCCESS', 501)
          }
          else {
            SetStateOfInput(e.target, 'STATE_SUCCESS')
          }
        }
        else if (e.target.classList.contains('id-number')) {
          var odd = 0, even = 0, result = 0, idSum = 0, i = 0;
          if (e.target.value.length != 11) {
            SetStateOfInput(e.target, 'STATE_UNSUCCESS', 901)
          }
          else {
            odd = parseInt(e.target.value[0]) + parseInt(e.target.value[2]) + parseInt(e.target.value[4]) + parseInt(e.target.value[6]) + parseInt(e.target.value[8]);
            even = parseInt(e.target.value[1]) + parseInt(e.target.value[3]) + parseInt(e.target.value[5]) + parseInt(e.target.value[7]);
            odd = odd * 7;
            result = Math.abs(odd - even);
            if (result % 10 != e.target.value[9]) {
              SetStateOfInput(e.target, 'STATE_UNSUCCESS', 902)
              return false;
            }
            for (var i = 0; i < 10; i++) {
              idSum += parseInt(e.target.value[i]);
            }
            if (idSum % 10 != e.target.value[10]) {
              SetStateOfInput(e.target, 'STATE_UNSUCCESS', 902)
              return false;
            }
            else {
              SetStateOfInput(e.target, 'STATE_SUCCESS')
            }
          }
        }
        else {
          if (e.target.minLength > e.target.value.trim().length) {
            SetStateOfInput(e.target, 'STATE_UNSUCCESS', 502)
          }
          else {
            SetStateOfInput(e.target, 'STATE_SUCCESS')
          }
        }
      }
      IsSuccessFormPage('INPUTS');
    }, true)
  }
  window.addEventListener('keydown', function (e) {
    if (e.target.matches('input[type=text].onlyLetters')) {
      !regExOnlyLetter.test(e.key) && e.preventDefault();
    }
    if (e.target.matches('input[type=number]')) {
      e.key === 'e' && e.preventDefault();
    }
  })
  window.addEventListener('keypress', function (e) {
    if (e.target.classList.contains('id-number')) {
      let key = e.which || e.keyCode;
      if (key && (key <= 47 || key >= 58) && key != 8) {
        e.preventDefault();
      }
    }
  })
}
function TextInput2() {
  const regEx = /^([a-zA-ZğüşöçıİĞÜŞÖÇ]{2,})+(?: [a-zA-ZğüşöçıİĞÜŞÖÇ]{2,})+(?:)$/;
  const regExOnlyLetter = /^([a-zA-ZğüşöçıİĞÜŞÖÇ]+\s?)*\s*$/;
  const eventsList = ['blur', 'change']
  for (const event of eventsList) {
    console.log(document.querySelector('form'));
    document.querySelector('form')?.addEventListener(event, function (e) {
      if (e.target.matches('input[type=text]')) {//&& e.target.value != 0
        if (e.target.value.length === 0) {
          e.target.removeAttribute('success');

          e.target.name in formStateSuccess[activeFormPageIndex] && (formStateSuccess[activeFormPageIndex][e.target.name] = false)
          ErrorMessage(e.target, false);
        }
        else if (e.target.classList.contains('namesurname')) {
          if (!regEx.test(e.target.value.trim())) {
            ErrorMessage(e.target, true, 501);
            e.target.name in formStateSuccess[activeFormPageIndex] && (formStateSuccess[activeFormPageIndex][e.target.name] = false)
          }
          else {
            ErrorMessage(e.target, false);
            e.target.setAttribute('success', '');
            e.target.name in formStateSuccess[activeFormPageIndex] && (formStateSuccess[activeFormPageIndex][e.target.name] = true)
          }
        }
        else if (e.target.classList.contains('id-number')) {
          var odd = 0,
            even = 0,
            result = 0,
            idSum = 0,
            i = 0;
          if (e.target.value.length != 11) {
            ErrorMessage(e.target, true, 901);
            e.target.name in formStateSuccess[activeFormPageIndex] && (formStateSuccess[activeFormPageIndex][e.target.name] = false)
          }
          else {
            odd = parseInt(e.target.value[0]) + parseInt(e.target.value[2]) + parseInt(e.target.value[4]) + parseInt(e.target.value[6]) + parseInt(e.target.value[8]);
            even = parseInt(e.target.value[1]) + parseInt(e.target.value[3]) + parseInt(e.target.value[5]) + parseInt(e.target.value[7]);
            odd = odd * 7;
            result = Math.abs(odd - even);
            if (result % 10 != e.target.value[9]) {
              ErrorMessage(e.target, true, 902);
              e.target.name in formStateSuccess[activeFormPageIndex] && (formStateSuccess[activeFormPageIndex][e.target.name] = false)
              return false;
            }

            for (var i = 0; i < 10; i++) {
              idSum += parseInt(e.target.value[i]);
            }

            if (idSum % 10 != e.target.value[10]) {
              ErrorMessage(e.target, true, 902);
              e.target.name in formStateSuccess[activeFormPageIndex] && (formStateSuccess[activeFormPageIndex][e.target.name] = false)
              return false;
            }
            else {
              ErrorMessage(e.target, false);
              e.target.setAttribute('success', '');
              e.target.name in formStateSuccess[activeFormPageIndex] && (formStateSuccess[activeFormPageIndex][e.target.name] = true)
            }
          }

        }
        else {
          if (e.target.minLength > e.target.value.trim().length) {
            ErrorMessage(e.target, true, 502);
            e.target.name in formStateSuccess[activeFormPageIndex] && (formStateSuccess[activeFormPageIndex][e.target.name] = false)
          }
          else {
            ErrorMessage(e.target, false);
            e.target.setAttribute('success', '');
            e.target.name in formStateSuccess[activeFormPageIndex] && (formStateSuccess[activeFormPageIndex][e.target.name] = true)
          }
        }
      }
      IsSuccessFormPage('INPUTS');
    }, true)
  }
  window.addEventListener('keydown', function (e) {
    if (e.target.matches('input[type=text].onlyLetters')) {
      !regExOnlyLetter.test(e.key) && e.preventDefault();
    }
    if (e.target.matches('input[type=number]')) {
      e.key === 'e' && e.preventDefault();
    }
  })
  window.addEventListener('keypress', function (e) {
    if (e.target.classList.contains('id-number')) {
      let key = e.which || e.keyCode;
      if (key && (key <= 47 || key >= 58) && key != 8) {
        e.preventDefault();
      }
    }
  })
}
function TelInput() {
  const phoneCodes = [530, 531, 532, 533, 534, 535, 536, 537, 538, 539, 501, 505, 506, 507, 551, 552, 553, 554, 555, 559, 540, 541, 542, 543, 544, 545, 546, 547, 548, 549, 322, 416, 272, 472, 382, 358, 312, 242, 478, 466, 256, 266, 378, 488, 458, 228, 426, 434, 374, 248, 224, 286, 376, 364, 258, 412, 380, 284, 424, 446, 442, 222, 342, 454, 456, 438, 326, 476, 246, 324, 212, 216, 392, 372, 354, 226, 432, 276, 428, 462, 356, 282, 486, 414, 346, 368, 484, 362, 264, 464, 328, 452, 388, 384, 436, 252, 482, 236, 422, 274, 332, 262, 344, 348, 386, 288, 318, 352, 366, 474, 338, 370, 232];
  let firstThree = '';
  $("input[type=tel].tel-input").inputmask({ "mask": $("input[type=tel].tel-input").data('pattern'),showMaskOnHover : false });
  window.addEventListener('keyup', function (e) {
    if (e.target.matches("input[type=tel].tel-input")) {
      firstThree = e.target.value.match(/(\d+)/g) || '';
      firstThree != '' && (firstThree = firstThree.join());
      let value = e.target.value.match(/(\d+)/g)?.join().replaceAll(',', '').length;
      let pattern = e.target.dataset.pattern.match(/(9)/g).length;
      if (firstThree.length === 3) {
        for (const phoneCode of phoneCodes) {
          if (firstThree.substring(0, 3).match(phoneCode)) {
            SetStateOfInput(e.target, 'STATE_EMPTY');
            return false;
          }
        }
        SetStateOfInput(e.target, 'STATE_UNSUCCESS', 201);
      }
      else if (firstThree.length < phoneCodes[0].length) {
        SetStateOfInput(e.target, 'STATE_EMPTY');
      }
      else if (value === pattern && !e.target.hasAttribute('unsuccess')) {

        SetStateOfInput(e.target, 'STATE_SUCCESS');
      }
      else {
        SetStateOfInput(e.target, 'STATE_EMPTY');
      }
      IsSuccessFormPage('INPUTS');
    }
  })
  window.addEventListener('paste', function (e) {
    if (e.target.matches("input[type=tel].tel-input")) {
      CheckInput(e);
    }
  })
  document.querySelector('form').addEventListener('focus', function (e) {
    if (e.target.matches("input[type=tel].tel-input")) {
      CheckInput(e);
    }
  }, true)
  document.querySelector('form').addEventListener('blur', function (e) {
    if (e.target.matches("input[type=tel].tel-input")) {
      let value = e.target.value.match(/(\d+)/g)?.join().replaceAll(',', '').length;
      let pattern = e.target.dataset.pattern.match(/(9)/g).length;
      if (value === pattern && !e.target.hasAttribute('unsuccess')) {
        SetStateOfInput(e.target, 'STATE_SUCCESS');
      }
      else if (e.target.value.length === 0) {
        SetStateOfInput(e.target, 'STATE_EMPTY');
      }
      else if (value != pattern && !e.target.hasAttribute('unsuccess')) {
        SetStateOfInput(e.target, 'STATE_UNSUCCESS', 202);
      }
      else {
        SetStateOfInput(e.target, 'STATE_UNSUCCESS', 201);
      }
      IsSuccessFormPage('INPUTS');
    }
  }, true)
  function CheckInput(e) {
    firstThree = e.target.value?.match(/(\d+)/g) || '';
    firstThree != '' && (firstThree = firstThree.join());
    if (firstThree.length >= 3) {
      for (const phoneCode of phoneCodes) {
        if (firstThree.substring(0, 3).match(phoneCode)) {
          SetStateOfInput(e.target, 'STATE_EMPTY');
          return false;
        }
      }
      SetStateOfInput(e.target, 'STATE_UNSUCCESS', 201);
    }
    else if (firstThree.length < 3) {
      SetStateOfInput(e.target, 'STATE_EMPTY');
    }
    IsSuccessFormPage('INPUTS');
  }
}
function TelInput2() {
  const phoneCodes = [530, 531, 532, 533, 534, 535, 536, 537, 538, 539, 501, 505, 506, 507, 551, 552, 553, 554, 555, 559, 540, 541, 542, 543, 544, 545, 546, 547, 548, 549, 322, 416, 272, 472, 382, 358, 312, 242, 478, 466, 256, 266, 378, 488, 458, 228, 426, 434, 374, 248, 224, 286, 376, 364, 258, 412, 380, 284, 424, 446, 442, 222, 342, 454, 456, 438, 326, 476, 246, 324, 212, 216, 392, 372, 354, 226, 432, 276, 428, 462, 356, 282, 486, 414, 346, 368, 484, 362, 264, 464, 328, 452, 388, 384, 436, 252, 482, 236, 422, 274, 332, 262, 344, 348, 386, 288, 318, 352, 366, 474, 338, 370, 232];
  let firstThree = '';
  $("input[type=tel].tel-input").inputmask({ "mask": $("input[type=tel].tel-input").data('pattern') });
  window.addEventListener('keyup', function (e) {
    if (e.target.matches("input[type=tel].tel-input")) {
      firstThree = e.target.value.match(/(\d+)/g) || '';
      firstThree != '' && (firstThree = firstThree.join());
      let value = e.target.value.match(/(\d+)/g)?.join().replaceAll(',', '').length;
      let pattern = e.target.dataset.pattern.match(/(9)/g).length;
      if (firstThree.length === 3) {
        for (const phoneCode of phoneCodes) {
          if (firstThree.substring(0, 3).match(phoneCode)) {
            ErrorMessage(e.target, false);
            SetStateOfInput(e.target, 'STATE_EMPTY');
            return false;
          }
        }
        ErrorMessage(e.target, true, 201);
      }
      else if (firstThree.length < phoneCodes[0].length) {
        ErrorMessage(e.target, false);
      }
      else if (value === pattern && !e.target.hasAttribute('unsuccess')) {
        ErrorMessage(e.target, false);
        e.target.setAttribute('success', '');
        e.target.name in formStateSuccess[activeFormPageIndex] && (formStateSuccess[activeFormPageIndex][e.target.name] = true)
      }
      else {
        e.target.removeAttribute('success')
        e.target.name in formStateSuccess[activeFormPageIndex] && (formStateSuccess[activeFormPageIndex][e.target.name] = false)
      }
      IsSuccessFormPage('INPUTS');
    }
  })
  window.addEventListener('paste', function (e) {
    if (e.target.matches("input[type=tel].tel-input")) {
      CheckInput(e);
    }
  })
  document.querySelector('form').addEventListener('focus', function (e) {
    if (e.target.matches("input[type=tel].tel-input")) {
      CheckInput(e);
    }
  }, true)
  document.querySelector('form').addEventListener('blur', function (e) {
    if (e.target.matches("input[type=tel].tel-input")) {
      let value = e.target.value.match(/(\d+)/g)?.join().replaceAll(',', '').length;
      let pattern = e.target.dataset.pattern.match(/(9)/g).length;
      if (value === pattern && !e.target.hasAttribute('unsuccess')) {
        ErrorMessage(e.target, false);
        e.target.setAttribute('success', '')
        e.target.name in formStateSuccess[activeFormPageIndex] && (formStateSuccess[activeFormPageIndex][e.target.name] = true)
      }
      else if (e.target.value.length === 0) {//&& !e.target.hasAttribute('unsuccess')
        ErrorMessage(e.target, false, 99);
      }
      else if (value != pattern && !e.target.hasAttribute('unsuccess')) {
        ErrorMessage(e.target, true, 202);
      }
      else {
        ErrorMessage(e.target, true, 201);
      }
      IsSuccessFormPage('INPUTS');
    }
  }, true)
  function CheckInput(e) {
    firstThree = e.target.value?.match(/(\d+)/g) || '';
    firstThree != '' && (firstThree = firstThree.join());
    if (firstThree.length >= 3) {
      for (const phoneCode of phoneCodes) {
        if (firstThree.substring(0, 3).match(phoneCode)) {
          ErrorMessage(e.target, false);
          return false;
        }
      }
      ErrorMessage(e.target, true, 201);
    }
    else if (firstThree.length < 3) {
      ErrorMessage(e.target, false);
    }
    IsSuccessFormPage('INPUTS');
  }
}
function MailInput() {
  const eventsList = ['blur', 'change']
  for (const event of eventsList) {
    document.querySelector('form').addEventListener(event, function (e) {
      if (e.target.matches('input[type=email]')) {
        const re = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
        e.target.value.length > 0 && !e.target.value.match(re)
          ? SetStateOfInput(e.target, 'STATE_UNSUCCESS', 401)
          : SetStateOfInput(e.target, 'STATE_SUCCESS');
        e.target.value.length === 0 && SetStateOfInput(e.target, 'STATE_EMPTY');
        IsSuccessFormPage('INPUTS');
      }
    }, true)
  }
  document.querySelector('form').addEventListener('focus', function (e) {
    if (e.target.matches('input[type=email]')) {
      SetStateOfInput(e.target, 'STATE_EMPTY');
      IsSuccessFormPage('INPUTS');
    }
  }, true);
}
const DateInput = () => {
  document.querySelector('form').addEventListener('focus', function (e) {
    if (e.target.matches('input.input-date')) {
      // e.target.classList.remove('placeholder');
      IsSuccessFormPage('INPUTS');
    }
  }, true);
  document.querySelector('form').addEventListener('blur', function (e) {//change ypaılabilir.
    if (e.target.matches('input.input-date')) {
      console.log(e.target.value);
      if (e.target.value === '') {
        SetStateOfInput(e.target, 'STATE_EMPTY', 99);
      }
      else {
        SetStateOfInput(e.target, 'STATE_SUCCESS');
      }
      IsSuccessFormPage('INPUTS');
    }
  }, true)
}
function IsSuccessFormPage(parameterType) {
  let access = true;
  console.log(controlType, parameterType);
  // if (controlType === parameterType) {
  Array.from(document.querySelectorAll('.form-page.active input')).forEach(parameter => {
    parameter.hasAttribute('unsuccess') && (access = false);
  })
  Object.values(formStateSuccess[activeFormPageIndex]).forEach(parameter => {
    !parameter && (access = false);
  })
  controlType === 'INPUTS' && (access ? buttons[1].removeAttribute('disabled') : buttons[1].setAttribute('disabled', ''));
  if (parameterType === 'BUTTONS') {
    for (const [key, value] of Object.entries(formStateSuccess[activeFormPageIndex])) {
      let target = document.querySelector(`.form-page.active [name=${key}]`);
      !value && SetStateOfInput(target, 'STATE_UNSUCCESS', 101);
    }
    return access;
  };
}
TextInput();
TelInput();
MailInput();
DateInput();