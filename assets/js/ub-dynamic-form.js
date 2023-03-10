"use strict";

function isNullOrEmpty(string) {
    if (string.trim() === null || string.trim() === '') {
        return true;
    }
    else {
        return false;
    }
}
let formStateValues = {}, formStateSuccess = {};
NodeList.prototype.formValidation = function ({ formIndex, controlType, placeholderType, formCookies }) {
    this.forEach((el, index) => {
        el.formValidation({ formIndex: index, controlType, placeholderType, formCookies })
    })
}
HTMLElement.prototype.formValidation = function ({
    formIndex,
    controlType = 'BUTTONS',
    placeholderType = 'title',
    formCookies = false

}) {
    //Elements
    let formElm = this;
    let formPages = this.querySelectorAll('.form-page');
    let buttons = this.querySelectorAll('.buttons .btn-form');
    //Variables
    let formsPagesLength = formPages.length - 1;
    formStateValues[formElm.id] = {};
    formStateSuccess[formElm.id] = { activeFormPageIndex: 0 };
    let activeFormPageIndex = formStateValues[formElm.id].activeFormPageIndex;

    const BeforeLoadForm = () => {
    //SetState
        formPages.forEach((form, index) => {
        //Set Form State
            let list = {}, list2 = {};
            form.querySelectorAll('[befill]').forEach(input => {
                input.tagName === 'INPUT' && (list[input.id] = input.value);
                list2[input.id] = input.hasAttribute('success') ? true : false;
            })
            formStateValues[formElm.id][index] = list;
            formStateSuccess[formElm.id][index] = list2;
        //Input Listeners
            form.addEventListener('blur', function (e) {//change
                //Placeholder Move Up
                if (e.target.closest('.inner-input[type-placeholder="anim"] input')) {
                    let target = e.target.closest('.input-part');
                    isNullOrEmpty(target.querySelector('input').value)
                        ? target.querySelector('.inner-input').classList.add('anim')
                        : target.querySelector('.inner-input').classList.remove('anim');
                }
            }, true)
        })
    //Placeholder Design Method
        window.addEventListener('input', function (e) {
            if (e.target.closest('.inner-input[type-placeholder="classic"] :is(input,textarea)')) {
                let target = e.target.closest('.input-part');
                isNullOrEmpty(e.target.closest('.inner-input[type-placeholder="classic"] :is(input,textarea)').value)
                    ? target.querySelector('.inner-input').classList.remove('hidden-ph')
                    : target.querySelector('.inner-input').classList.add('hidden-ph');
            }
        })
    //Set LocaleStroge
        if(formCookies){
            let cookie = JSON.parse(localStorage.getItem(`formStorage-${formElm.id}`));
            if (cookie) {
                formStateValues[formElm.id] = cookie;
                for (let i = 0; i < Object.keys(cookie).length; i++) {
                    for (const [key, value] of Object.entries(cookie[i])) {
                        document.getElementById(key).value = value;
                    }
                }
            }
        }
    //Set Input Type
        formElm.querySelectorAll('input:is([type=text],[type=email],[type=number]),textarea').forEach(input => {
            input.closest('.inner-input').setAttribute('type-placeholder', placeholderType);
            (placeholderType === 'anim' && input.value.length === 0) && input.closest('.inner-input').classList.add('anim');
            
            (placeholderType === 'classic' && input.value.length != 0) && input.closest('.inner-input').classList.add('hidden-ph');
        })
    //Set Button 
        activeFormPageIndex = Array.from(document.querySelectorAll('.form-page')).indexOf(document.querySelector('.form-page.active'))
        activeFormPageIndex === 0 ? buttons[0].classList.add('d-none')
            : buttons[0].classList.remove('d-none');
        buttons[1].innerText = (formsPagesLength === activeFormPageIndex
            ? buttons[1].getAttribute('submit-title')
            : buttons[1].getAttribute('forward-title'));
        IsSuccessFormPage();
    //Set Focused Form
        let listEvent = ['blur', 'change'];
        listEvent.forEach(event => {
            window.addEventListener(event, function (e) {
                try {
                    formElm = e.target.closest('form');
                } catch (error) {

                }
            }, true)
        })
        
    };
    function SwitchBetweenPages() {
        buttons.forEach(button => {
            button.addEventListener('click', function (e) {
                if (button.closest('.btn-form:last-child:not([disabled])')) {
                    if (IsSuccessFormPage('BUTTONS')) {
                        formsPagesLength === activeFormPageIndex
                            ? formElm.submit() & localStorage.removeItem(`formStorage-${formElm.id}`)
                            : formPages[activeFormPageIndex].classList.remove('active') & formPages[activeFormPageIndex + 1].classList.add('active');
                        activeFormPageIndex += 1;
                    }
                }
                else if (button.closest('.btn-form:first-child')) {
                    formPages[activeFormPageIndex].classList.remove('active');
                    formPages[activeFormPageIndex - 1].classList.add('active');
                    activeFormPageIndex -= 1;
                }
                IsSuccessFormPage('INPUTS');
                //Buttons update name and visibility
                activeFormPageIndex === 0 ? buttons[0].classList.add('d-none')
                    : buttons[0].classList.remove('d-none');
                buttons[1].innerText = (formsPagesLength === activeFormPageIndex
                    ? buttons[1].getAttribute('submit-title')
                    : buttons[1].getAttribute('forward-title'))
            })
        })
    }
    function SetStateOfInput(target, state, errorCode = 102) {
        let messages = {
            101: 'Doldurulmasi gerekli alan.',
            102: 'Hatalı yazım, lüttfen kontrol ediniz.',
            201: 'Telefon numarası hatalıdır.',
            202: 'Eksik numara girilmiştir.',
            203: 'Numaraya bağlı bir hesap bulunmamaktadır.',
            211: 'Yanlış doğrulama kodu.',
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
                inputError && (inputError.innerText = '');
                target.setAttribute('success', '');
                target.removeAttribute('unsuccess');
                target.id in formStateSuccess[formElm.id][activeFormPageIndex] && (formStateSuccess[formElm.id][activeFormPageIndex][target.id] = true);
                target.id in formStateValues[formElm.id][activeFormPageIndex] && (formStateValues[formElm.id][activeFormPageIndex][target.id] = target.value);
                break;
            case 'STATE_UNSUCCESS':
                inputError && (inputError.innerText = messages[errorCode]);
                target.setAttribute('unsuccess', '');
                target.removeAttribute('success');
                target.id in formStateSuccess[formElm.id][activeFormPageIndex] && (formStateSuccess[formElm.id][activeFormPageIndex][target.id] = false);
                break;
            case 'STATE_EMPTY':
                inputError && (inputError.innerText = '');
                ['success', 'unsuccess'].forEach(attribute => target.removeAttribute(attribute));
                target.id in formStateSuccess[formElm.id][activeFormPageIndex] && (formStateSuccess[formElm.id][activeFormPageIndex][target.id] = false)
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
            window.addEventListener(event, function (e) {
                try {
                    if (e.target.matches('input[type=text],textarea')) {
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
                } catch (error) {

                }
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
        $("input[type=tel].tel-input").inputmask({ "mask": $("input[type=tel].tel-input").data('pattern'), showMaskOnHover: false });
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
    function MailInput() {
        const eventsList = ['blur', 'change']
        for (const event of eventsList) {
            window.addEventListener(event, function (e) {
                try {
                    if (e.target.matches('input[type=email]')) {
                        const re = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
                        e.target.value.length > 0 && !e.target.value.match(re)
                            ? SetStateOfInput(e.target, 'STATE_UNSUCCESS', 401)
                            : SetStateOfInput(e.target, 'STATE_SUCCESS');
                        e.target.value.length === 0 && SetStateOfInput(e.target, 'STATE_EMPTY');
                        IsSuccessFormPage('INPUTS');
                    }
                } catch (error) {

                }
            }, true)
        }
        window.addEventListener('focus', function (e) {
            try {
                if (e.target.matches('input[type=email]')) {
                    SetStateOfInput(e.target, 'STATE_EMPTY');
                    IsSuccessFormPage('INPUTS');
                }
            } catch (error) {

            }
        }, true);
    }
    const DateInput = () => {
        window.addEventListener('change', function (e) {//change ypaılabilir.
            if (e.target.matches('input.input-date')) {
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
    function YearInput() {
        const regExYear = /^(19[6-9]\d|200\d|201\d|202[0-3])$/;
        const regExOnlyNumber = /^[0-9]*$/;
        const eventsList = ['blur', 'change', 'paste']
        for (const event of eventsList) {
            window.addEventListener(event, function (e) {
                try {
                    if (e.target.matches('input[type=number].year')) {
                        if (e.target.value.length === 0) {
                            SetStateOfInput(e.target, 'STATE_EMPTY', 99);
                        }
                        else if (!regExYear.test(e.target.value.trim())) {
                            SetStateOfInput(e.target, 'STATE_UNSUCCESS', 801)
                        }
                        else {
                            SetStateOfInput(e.target, 'STATE_SUCCESS');
                        }
                    }
                    IsSuccessFormPage('INPUTS');
                } catch (error) {

                }
            }, true)
        }
        window.addEventListener('keydown', function (e) {
            if (e.target.matches('input[type=number].year')) {
                (e.target.value.length > 3 && regExOnlyNumber.test(e.key)) && e.preventDefault();
            }
        })
        window.addEventListener('keyup', function (e) {
            if (e.target.matches('input[type=number].year')) {
                e.target.value.length > 4 && e.preventDefault();
            }
        })
    }
    const FileInput = () => {
        window.addEventListener('click', function (e) {
            if (e.target.closest('.file-input .btn-file')) {
                const target = e.target.closest('.inner-input');
                target.querySelector('input[type=file]').click();
            }
        })
        window.addEventListener('change', function (e) {
            if (e.target.closest('input[type=file]')) {
                const target = e.target.closest('input[type=file]');
                const innerDiv = e.target.closest('.inner-input');
                target.files.length != 0
                    ? SetStateOfInput(target, 'STATE_SUCCESS')
                    & innerDiv.querySelector('[file-title]').setAttribute('file-name', 'dosya ismi')
                    : SetStateOfInput(target, 'STATE_EMPTY')
                    & innerDiv.querySelector('[file-title]').setAttribute('file-name', '');
            }
        })
    }
    function CheckboxFieldset() {
        window.addEventListener('change', function (e) {
            if (e.target.getAttribute('type') === 'checkbox') {
                let fieldset = e.target.closest('fieldset');
                let checkCb = false;
                let countCb = 0;
                fieldset.querySelectorAll('input[type=checkbox]').forEach(cb => {
                    cb.checked && (checkCb = true) & (countCb += 1);
                })
                checkCb
                    ? ((countCb >= fieldset.getAttribute('minLimit') && countCb <= fieldset.getAttribute('maxLimit')) ? SetStateOfInput(fieldset, 'STATE_SUCCESS') : SetStateOfInput(fieldset, 'STATE_EMPTY', 99))
                    : SetStateOfInput(fieldset, 'STATE_EMPTY', 99);
            }
        }, true)
    }
    function RadioFieldset() {
        window.addEventListener('change', function (e) {
            if (e.target.getAttribute('type') === 'radio') {
                let fieldset = e.target.closest('fieldset');
                let checkR = false;
                fieldset.querySelectorAll('input[type=radio]').forEach(rb => {
                    rb.checked && (checkR = true);
                })
                checkR
                    ? SetStateOfInput(fieldset, 'STATE_SUCCESS')
                    : SetStateOfInput(fieldset, 'STATE_EMPTY', 99);
            }
        }, true)
    }
    const CommonInputsProperty = () => {
        window.addEventListener('keydown', function (e) {
            if (e.target.closest('input,textarea')) {
                let target = e.target.closest('input,textarea');
                (target.maxLength > 0 && target.maxLength < target.value.length) && e.preventDefault();
            }
        })
        document.querySelector('form').addEventListener('blur', function (e) {
            if (e.target.closest('input,textarea')) {
                let target = e.target.closest('input,textarea');
                if (target.minLength) {
                    (target.minLength > target.value.length && target.value.length != 0)//target.minLength > 0 && 
                        && SetStateOfInput(target, 'STATE_UNSUCCESS', 502);
                }
            }
        }, true)
        window.addEventListener('focus', function (e) {
            try {
                if (e.target.matches('input,textarea')) {
                    SetStateOfInput(e.target, 'STATE_EMPTY', 99);
                }
            } catch (error) {
            }
        }, true)
    }
    function IsSuccessFormPage(parameterType) {
        console.log('blabla')
        let access = true;
        Array.from(formElm.querySelectorAll('.form-page.active input')).forEach(parameter => {
            parameter.hasAttribute('unsuccess') && (access = false);
        })
        Object.values(formStateSuccess[formElm.id][activeFormPageIndex]).forEach(parameter => {
            !parameter && (access = false);
        })
        controlType === 'INPUTS' && (access ? formElm.querySelectorAll('.buttons .btn-form')[1].removeAttribute('disabled') : formElm.querySelectorAll('.buttons .btn-form')[1].setAttribute('disabled', ''));
        if (parameterType === 'BUTTONS') {
            for (const [key, value] of Object.entries(formStateSuccess[formElm.id][activeFormPageIndex])) {
                let target = formElm.querySelector(`.form-page.active [id=${key}]`);
                !value && SetStateOfInput(target, 'STATE_UNSUCCESS', 101);
            }
            return access;
        };
        if(formCookies){
            console.log(formStateValues[formElm.id])
            localStorage.setItem(`formStorage-${formElm.id}`, JSON.stringify(formStateValues[formElm.id]))
        }
    }
    BeforeLoadForm();
    SwitchBetweenPages();
    //Input Types
    TextInput();
    TelInput();
    MailInput();
    DateInput();
    FileInput();
    CheckboxFieldset();
    RadioFieldset();
    YearInput();
    CommonInputsProperty();

}