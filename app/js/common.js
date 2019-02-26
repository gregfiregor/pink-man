$(window).on('load', function () {
    'use strict'

    // Validation fields

    function MyValidation() {
        this.validiryChecks = [];
    }


    MyValidation.prototype = {
        checkValidity: function (input) {

            var flag = false;

            if (this.validiryChecks != null) {

                var parent = this.validiryChecks.parentElement;
                if (input.value != 0) {


                    var isInvalid = this.validiryChecks.isInvalidate(input);


                    var validElement = document.createElement("span");
                    validElement.classList.add("validation");
                    validElement.innerHTML = this.validiryChecks.errorValidateMessage;

                    if (isInvalid) {
                        this.validiryChecks.element.classList.add('invalid');
                        this.validiryChecks.element.classList.remove('valid');
                        if (!parent.querySelector('span.validation')) {
                            parent.appendChild(validElement);
                        }

                    } else {
                        this.validiryChecks.element.classList.remove('invalid');
                        this.validiryChecks.element.classList.add('valid');
                        if (parent.querySelector('span.validation')) {
                            parent.querySelector('span.validation').remove();
                        }
                        flag = true;


                    }
                } else {

                    this.validiryChecks.element.classList.remove('invalid');
                    this.validiryChecks.element.classList.remove('valid');
                    if (parent.querySelector('span.validation')) {
                        parent.querySelector('span.validation').remove();
                    }
                    flag = false;
                }

            }
            return flag;
        },
        checkFocusLabel: function (input) {

            if (input === document.activeElement) {

                input.classList.add("labelTop");
                console.log("ON FOCUS");

            } else {
                input.classList.remove("labelTop");
                console.log("LOSE FOCUS");
            }


            console.log(" :: " + input.value);
        }
    };


    function checkValidity(input) {

        input.MyValidation.invalidates = [];
        input.MyValidation.checkValidity(input);

        if (input.MyValidation.invalidates.invalidates.length === 0 && input.value != '') {
            input.setCustomValidity('');
        } else {
            var message = input.MyValidation.getInvalidatis();
            input.setCustomValidity(message);
        }
    }


    // For username input

    var usernameValidity = {

        isInvalidate: function (input) {
            return input.value.length < 3 || input.value.match(/[^a-zа-я\s]+/i);
        },
        errorValidateMessage: "Введите корректное имя",
        element: document.getElementById("input_fio"),
        parentElement: document.querySelector('label[for="input_fio"]')

    };


    var usernameInput = document.getElementById('input_fio');

    usernameInput.MyValidation = new MyValidation();
    usernameInput.MyValidation.validiryChecks = usernameValidity;

    usernameInput.addEventListener('change', function (e) {

        e.target.MyValidation.checkFocusLabel(e.target);
        e.target.MyValidation.checkValidity(this);
        checkSubmitToDisable();
    });

    $(usernameInput).on('focusin', function (e) {
        $(e.target).next().addClass("labelTop");
    });
    $(usernameInput).on('focusout', function (e) {
        if (e.target.value.length == 0) {
            $(e.target).next().removeClass("labelTop");
        }
    });


    // For phone input

    var phoneValidity = {

        isInvalidate: function (input) {
            return input.value.length < 11 || input.value.match(/[a-z\s]+/i);
        },
        errorValidateMessage: "Введите корректный номер телефона",
        element: document.getElementById("input_phone"),
        parentElement: document.querySelector('label[for="input_phone"]')

    };


    var phoneInput = document.getElementById("input_phone");

    phoneInput.MyValidation = new MyValidation();
    phoneInput.MyValidation.validiryChecks = phoneValidity;

    phoneInput.addEventListener('change', function (e) {

        e.target.MyValidation.checkValidity(this);
        checkSubmitToDisable();

    });


    // For email input

    var emailValidation = {

        isInvalidate: function (input) {
            return !input.value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/i);
        },
        errorValidateMessage: "Введите корректный E-mail",
        element: document.getElementById("input_email"),
        parentElement: document.querySelector('label[for="input_email"]')


    };

    var emailInput = document.getElementById("input_email");

    emailInput.MyValidation = new MyValidation();
    emailInput.MyValidation.validiryChecks = emailValidation;

    emailInput.addEventListener('change', function () {

        emailInput.MyValidation.checkValidity(this);
        checkSubmitToDisable();

    });


    $(emailInput).on('focusin', function (e) {
        $(e.target).next().addClass("labelTop");
    });
    $(emailInput).on('focusout', function (e) {
        if (e.target.value.length == 0) {
            $(e.target).next().removeClass("labelTop");
        }
    });


    var anotherInputs = [usernameInput, phoneInput, emailInput];
    var elemSubmit = document.getElementById("input-submit");


    elemSubmit.addEventListener('click', function (e) {
        e.preventDefault();

        var flag = true;

        for (var i = 0; i < anotherInputs.length; i++) {
            if (!anotherInputs[i].MyValidation.checkValidity(anotherInputs[i])) {
                flag = false;
                break;
            }
        }

        if (flag) {

            var fData = new FormData(document.querySelector('form'));
            console.log(fData.get("fio"));
            console.log(fData.get("phone"));
            console.log(fData.get("email"));
            console.log(fData.get("choose"));


        }
    });

    var radios = document.getElementsByTagName("choose");

    for (var i = 0; i < radios.length; i++) {

    }


    function checkSubmitToDisable() {

        var flag = true;

        for (var i = 0; i < anotherInputs.length; i++) {
            if (!anotherInputs[i].MyValidation.checkValidity(anotherInputs[i])) {
                flag = false;
                break;
            }
        }

        if (flag) {
            document.getElementById("input-submit").disabled = false;
        } else {
            document.getElementById("input-submit").disabled = true;
        }
    }


    // Tab text animation

    $('label[for^="radio"]').each(function () {

        var that = this;

        $(this).on('click', function (e) {

            var iconPanels = document.querySelectorAll('label[for^="radio"]');
            for (var i = 0; i < iconPanels.length; i++) {
                iconPanels[i].classList.remove("active");
            }

            var activeIconPanel = document.getElementById(that.getAttribute("for") + "-label");
            if (activeIconPanel) activeIconPanel.classList.add("active");

            var textPanels = document.querySelectorAll(".textPanel__item");

            for (var i = 0; i < textPanels.length; i++) {
                textPanels[i].classList.remove("active");
            }

            var activeTextPanel = document.getElementById(that.getAttribute("for") + "-text");
            if (activeTextPanel) activeTextPanel.classList.add("active");


        });
    })


});
