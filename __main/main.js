import Cookies from "js-cookie";

// Polyfills
Array.prototype.includes||Object.defineProperty(Array.prototype,"includes",{value:function(r,e){if(null==this)throw new TypeError('"this" is null or not defined');var t=Object(this),n=t.length>>>0;if(0===n)return!1;var i,o,a=0|e,u=Math.max(0<=a?a:n-Math.abs(a),0);for(;u<n;){if((i=t[u])===(o=r)||"number"==typeof i&&"number"==typeof o&&isNaN(i)&&isNaN(o))return!0;u++}return!1}});

//MODAL FORM MODULE
(function(){

  if($('#cb-modal-form-content')[0])return;

  let modalCSS = `
        <style id="cb-modal-form-css">
            .cb-modal-form-wrapper {
                width: 100vw;
                height: 100vh;
                position: fixed;
                left: 0;
                top: 0;
                background-color: #000000a8;
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 1000;
                padding: 15px;
                box-sizing: border-box;
            }
            .cb-modal-form-container .form_content {
                border-radius: 5px;
                background-color: #fff;
                max-width: 600px;
            }
            .cb-modal-form-container .form_body {
                padding: 30px;
            }            
            .cb-modal-form-container .form_title {
                font-size: 32px;
                text-align: center;
                padding: 30px;
                background-color: #E5E6EB;
                color: #1C52EE;
                font-weight: 600;
                text-transform: uppercase;
                border-top-left-radius: 5px;
                border-top-right-radius: 5px;
                line-height: 1;
            }
            .cb-modal-form-container .form_body__fields {
                display: flex;
            }
            .cb-modal-form-container .form_body__fields>div {
                flex-grow: 1;
                position: relative;
            }
            .cb-modal-form-container .form_body__fields>div+div{
                margin-left: 30px;
            }
            .cb-modal-form-container .form_input input {
                font-size: 16px;
                border-radius: 3px;
                border: 1px solid #9cc7fd;
                background-color: #fff;
                width: 100%;
                outline: none;
                padding: 12px 15px;
                box-sizing: border-box;
            }
            .cb-modal-form-container .currency__container {
                width: 100%;
                margin-top: 30px;
                justify-content: flex-start;
                align-items: center;
                display: flex;
            }
            .cb-modal-form-container .currency__title {
                margin-right: 1.25rem;
                font-size: 1.5rem;
            }
            .cb-modal-form-container .currency__text {
                font-size: 1.7rem;
                user-select: none;
            }
            
            .cb-modal-form-container .currency {
                display: flex;
                width: 2.875rem;
                height: 2.875rem;
                border-radius: 3px;
                border: 1px solid #e5e6eb;
                margin: 0 .5rem;
                cursor: pointer;
                background-color: #e5e6eb;
                transition: .3s;
                align-items: center;
                justify-content: center;
                color: #536686;
            }
            .cb-modal-form-container .cb-active {
                border: 1px solid #ffc6de;
                background-color: #fcf5f8;
                color: #f60066;
            }
            .cb-modal-form-container .form-midline {
                margin: 30px 0;
                height: 1px;
                width: 100%;
                background-color: #e5e6eb;
            }
            .cb-modal-form-container .form_container {
                display: block;
                margin-top: 10px;
                position: relative;
                padding-left: 25px;
                margin-bottom: 12px;
                height: 25px;
                cursor: pointer;
                font-size: 1rem;
                margin-right: 20px;
                -webkit-user-select: none;
                -moz-user-select: none;
                -ms-user-select: none;
                user-select: none;
            }
            .cb-modal-form-container .form_container input {
                position: absolute;
                opacity: 0;
                cursor: pointer;
                height: 0;
                width: 0;
            }
            .cb-modal-form-container .checkmark, .cb-modal-form-container .form_container input:checked~.checkmark {
                background-color: #fff;
            }
            .cb-modal-form-container .form_container input:checked~.checkmark:after {
                display: block;
            }
            .cb-modal-form-container .checkmark {
                position: absolute;
                top: 0;
                left: 0;
                height: 30px;
                width: 30px;
                border-radius: 3px;
                border: 1px solid #9cc7fd;
            }
            .cb-modal-form-container .checkmark:after{
                display: none;
            }
            .cb-modal-form-container .form_container .checkmark:after {
                left: 11px;
                top: 6px;
                width: 6px;
                height: 12px;
                border: solid #9cc7fd;
                border-width: 0 3px 3px 0;
                -webkit-transform: rotate(45deg);
                -ms-transform: rotate(45deg);
                transform: rotate(45deg);
            }            
            .cb-modal-form-container .checkbox__text {
                color: #282828;
                font-size: 14px;
                font-weight: 400;
                font-style: normal;
                font-stretch: normal;
                line-height: normal;
                letter-spacing: normal;
                text-align: left;
            }
            .cb-modal-form-container .form_terms {
                display: flex;
                justify-content: space-between;
                align-items: center;
                position: relative;
            }
            .cb-modal-form-container .checkmark:after {
                content: "";
                position: absolute;
            }
            .cb-modal-form-container .submit__button {
                margin-top: 30px;
                display: flex;
                flex-direction: column;
                align-items: center;
            }
            .cb-modal-form-container  .submit__button button {
                background: #FCEE21;
                border-radius: 3px;
                text-align: center;
                font-weight: bold;
                font-size: 23px;
                line-height: 28px;
                text-transform: uppercase;
                padding: 10px 30px;
                outline: none;
                border: none;
                box-shadow: 0 0 4px 0 #7b7b7b;
                margin-bottom: 15px;
                min-width: 240px;
            }
            .cb-modal-form-container  .submit__button button:hover{
             cursor: pointer;
            }
            .cb-modal-form-container  .submit__button a{
                font-size: 14px;
            }
            .cb-modal-form-container   .form_error {
                position: absolute;
                bottom: -20px;
            }
            .cb-modal-form-container .error_message {
                font-size: 12px;
                color: #ca0000;
            }
            
            @media screen and (max-width: 600px) {
                .cb-modal-form-container .form_title{
                    font-size: 24px;
                    padding: 15px;
                }
                .cb-modal-form-container .form_body {
                    padding: 30px 15px;
                }
                .cb-modal-form-container .form_body__fields {
                 flex-direction: column; 
                }
                .cb-modal-form-container .form_body__fields>div+div {
                    margin-left: 0;
                    margin-top: 15px;
                }
                .cb-modal-form-container .currency__title {
                    margin-right: 0;
                    font-size: 16px;
                }
                .cb-modal-form-container .currency {
                    width: 1.875rem;
                    height: 1.875rem;
                }
            
            }
               
        </style>
    `;
  const getModalHTML = ({title,buttonText}) => `
        <div id="cb-modal-form-content" class="cb-modal-form-wrapper" style="display: none;">
            <div class="cb-modal-form-container">
                <form action="" id="cb-form">
                    <div class="form_content">                        
                        <div class="form_title cbl-formTitle">
                            ${title}
                        </div>
                        <div class="form_body">
                            <div class="form_body__fields">
                                <div id="cb-email-container" class="form_input">
                                    <input id="cb-email-input" type="email" name="email" placeholder="E-mail" autocomplete="on">
                                     <div class="form_error">
                                        <span id="cb-email-error" class="error_message"></span>
                                    </div>
                                </div>                           
                                <div id="cb-password-container" class="form_input">
                                    <input id="cb-password-input" type="password" placeholder="Password">
                                    <div class="form_error">
                                        <span id="cb-password-error" class="error_message"></span>
                                    </div>
                                </div>
                            </div>                            
                            <div class="currency__container"><span class="currency__title cbl-currency">Currency</span>
                                <div class="cb-currency currency" data-currency="EUR"><span class="currency__text">€</span></div>
                                <div class="cb-currency currency" data-currency="USD"><span class="currency__text">$</span></div>
                                <div class="cb-currency currency" data-currency="GBP"><span class="currency__text">£</span></div>
                                <div class="cb-currency currency cb-active" data-currency="RUB"><span class="currency__text">₽</span></div>
                            </div>
                            <div class="form-midline">
                            
                            </div>
                            <div class="form_checking">
                                <div class="form_terms">
                                    <label class="form_container"> <input type="checkbox" id="cb-terms-checkbox" checked>
                                        <span class="checkmark" id="checkmark"></span>
                                    </label>
                                    <span class="checkbox__text">
                                        <span class="cbl-consent">I am 18 years old and I have read and accepted</span>
                                        <a class="term__modal cbl-policy" href="https://static.mycyber4.bet/legal/privacy-policy-v1.0.pdf" id="cb-policy-link">Privacy Policy</a>, <a class="term__modal cbl-terms" href="https://static.mycyber4.bet/legal/terms-and-conditions-v1.0.pdf" id="cb-terms-link">Terms&amp;Conditions</a>
                                    </span>                                    
                                    <div class="form_error">
                                        <span id="cb-form-error" class="error_message"></span>
                                    </div>
                                </div>
                                <div class="submit__button">
                                    <button id="cb-submit-button" class="btn cbl-register cbl-formButton">${buttonText}</button>
                                    <a href="http://cyber-bet.net#login" id="cb-login-link" class="cbl-account">Already have an account?</a>
                                </div>
                            </div>
                        </div>                        
                    </div>
                </form>    
            </div>            
        </div>
    `

  function initCbFormModal() {
    let options = window.cbFormModalOptions;
    if(!options) return;
    $('head').append(modalCSS);
    $('body').append(getModalHTML(options));

    window.cbModal = $('#cb-modal-form-content');
    $(document).on('click','.show-cb-modal-form', function () {
      cbModal.fadeIn();
    });
  }

  initCbFormModal()


})();

$(document).ready(function() {
  if (Cookies.get(config.ALREADY_REGISTER)) window.location.href = config.BASE_URL + window.location.search;

  const possibleCurrencies = ["USD", "EUR", "RUB", "GBP"];

  function Form() {
    // default values
    this.values = {
      email: "",
      password: "",
      currency: "USD",
      terms: true
    };

    this.errors = {
      _form: "",
      email: "",
      password: ""
    };

    this.params = getUrlParameter();

    this.elements = {

      form: $("#cb-form"),

      emailContainer:    $("#cb-email-container"),
      passwordContainer: $("#cb-password-container"),

      emailInput:    $("#cb-email-input"),
      passwordInput: $("#cb-password-input"),
      termsCheckbox: $("#cb-terms-checkbox"),

      emailError:    $("#cb-email-error"),
      passwordError: $("#cb-password-error"),
      formError:     $("#cb-form-error"),

      currencies:  $(".cb-currency"),

      mainText:  $("#cb-main-text"),
      text1:  $("#cb-text-1"),
      text2:  $("#cb-text-2"),
      text3:  $("#cb-text-3"),

      loginLink:  $("#cb-login-link"),
      regLink:  $("#cb-reg-link"),
      termsLink:  $("#cb-terms-link"),
      policyLink: $("#cb-policy-link"),

      submitButton:  $("#cb-submit-button")

    };

    this.init = () => {
      this.elements.form.submit((e) => { e.preventDefault() });

      this.elements.currencies.click(this.currencyClick);
      this.elements.emailInput.on("input", this.handlerChangeEmail);
      this.elements.passwordInput.on("input", this.handlerChangePassword);
      this.elements.termsCheckbox.change(this.handlerTermsCheckbox);
      this.elements.submitButton.click(this.handlerSubmit);

      this.setCurrency();
      this.setText();
      this.setLinks();
      this.setLocales();
      this.render();

      $("body").show();
    };

    this.checkWidget = () => {
      if (!window.config) console.error("CYBERBET: Config not found!");
      if (!window.cbLocale) console.error("CYBERBET: Locale not found!");

      Object.keys(this.elements).map((key) => {
        if (!this.elements[key].length)  console.error(`CYBERBET: ${key} not found!`);
      });
    };

    this.render = () => {
      this.elements.currencies.removeClass("cb-active");
      $(`.cb-currency[data-currency=${this.values.currency}]`).addClass("cb-active");

      this.elements.emailInput.val(this.values.email);
      this.elements.passwordInput.val(this.values.password);

      this.elements.termsCheckbox.prop("checked", this.values.terms);

      this.elements.emailContainer.removeClass("cb-error");
      if (this.errors.email) this.elements.emailContainer.addClass("cb-error");
      this.elements.emailError.text(this.errors.email);

      this.elements.passwordContainer.removeClass("cb-error");
      if (this.errors.password) this.elements.passwordContainer.addClass("cb-error");
      this.elements.passwordError.text(this.errors.password);

      this.elements.formError.text(this.errors._form);
    };

    this.setLinks = () => {
      this.elements.loginLink.attr("href", config.BASE_URL + window.location.search + "#login");
      this.elements.regLink.attr("href", config.BASE_URL + window.location.search + "#register");
      this.elements.termsLink.attr("href", config.TERMS_URL + window.location.search);
      this.elements.policyLink.attr("href", config.POLICY_URL + window.location.search);
      this.elements.policyLink.attr("href", config.POLICY_URL + window.location.search);
    };

    this.setLocales = () => {

      const lang = this.params.geo || config.LANG;

      if (!window.cbLocales || !window.cbLocales[lang]) return;
      const { texts, images, backgrounds } = window.cbLocales[lang];

      if(texts){
        Object.keys(texts).forEach(key => {
          const el = $(".cbl-"+key);
          if (!el.length) return;

          el.html(texts[key]);
        });
      }

      if(images){
        Object.keys(images).forEach(key => {
          const el = $(".cbl-"+key);
          if (!el.length) return;

          el.attr("src", images[key]);
        });
      }

      if(backgrounds){
        Object.keys(backgrounds).forEach(key => {
          const el = $(".cbl-"+key);
          if (!el.length) return;

          el.addClass(backgrounds[key]);
        });
      }

    };

    this.setCurrency = () => {
      if (!this.params || !this.params.currency) return;
      if (!possibleCurrencies.includes(this.params.currency.toUpperCase())) return;

      this.values.currency = this.params.currency.toUpperCase();
    };

    this.setText = () => {
      if (!promo) return;
      if (!this.params || !this.params.promocode) return;
      if (!promo[this.params.promocode]) return;

      const promoText = promo[this.params.promocode];

      if (promoText.mainText) this.elements.mainText.text(promoText.mainText);
      if (promoText.text1) this.elements.text1.text(promoText.text1);
      if (promoText.text2) this.elements.text2.text(promoText.text2);
      if (promoText.text3) this.elements.text3.text(promoText.text3);
    };

    this.currencyClick = (e) => {
      e.stopPropagation();
      this.values.currency = $(e.currentTarget).data('currency');
      this.render();
    };

    this.validate = () => {
      this.resetErrors();

      let isValid = true;

      const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!pattern.test(this.values.email.toLowerCase())) {
        this.errors.email = cbLocale.email.validate.invalid;
        isValid = false;
      }

      if (/[а-я А-Я]/g.test(this.values.password)) {
        this.errors.password = cbLocale.password.validate.onlyLatin;
        isValid = false;
      }

      if (this.values.password && this.values.password.length < 8) {
        this.errors.password = cbLocale.password.validate.minLength;
        isValid = false;
      }

      if (!this.values.terms) {
        this.errors._form = cbLocale.terms.validate.invalid;
        isValid = false;
      }

      return isValid;
    };

    this.handlerChangeEmail = (e) => {
      this.values.email = $(e.currentTarget).val();
      this.validate();
      this.render();
    };

    this.handlerChangePassword = (e) => {
      this.values.password = $(e.currentTarget).val();
      this.validate();
      this.render();
    };

    this.handlerTermsCheckbox = (e) => {
      this.values.terms = $(e.currentTarget).prop('checked');
      this.validate();
      this.render();
    };

    this.disable = () => {
      this.elements.emailInput.prop("disabled", true);
      this.elements.passwordInput.prop("disabled", true);
      this.elements.submitButton.prop("disabled", true);
      this.elements.currencies.prop("disabled", true);
      this.elements.termsCheckbox.prop("disabled", true);
    };

    this.enable = () => {
      this.elements.emailInput.prop("disabled", false);
      this.elements.passwordInput.prop("disabled", false);
      this.elements.submitButton.prop("disabled", false);
      this.elements.currencies.prop("disabled", false);
      this.elements.termsCheckbox.prop("disabled", false);
    };

    this.resetErrors = () => {
      this.errors = {
        _form: "",
        email: "",
        password: ""
      };
      this.render();
    };

    this.handlerSubmit = (e) => {
      e.preventDefault();

      if (!this.validate()) {
        this.render();
        return;
      }

      this.disable();
      this.resetErrors();

      $.ajax({
        method: "POST",
        url: config.API,
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        data:JSON.stringify({
          query: registerGql,
          variables: {
            email: this.values.email,
            password: this.values.password,
            currency: this.values.currency,
            affiliate: this.params
          }
        })
      }).done((res) => {
        this.enable();

        if (res.data) {
          const token = res.data.userRegistrationSimple.loginToken;

          Cookies.set(config.ALREADY_REGISTER, "register", { expires: 365, domain: "cyberbet.bet" });

          if(!this.params.promocode) this.params.promocode = "FDEP10";

          let paramsStr = Object.entries(this.params).map(e => e.join('=')).join('&');

          window.location.href = `${config.BASE_URL}?loginToken=${token}&${paramsStr}`;
        }

        if (res.errors) {
          const { code, data } = res.errors[0].extensions;

          if (code === "RateLimitExceeded") {
            this.errors._form = cbLocale.form.rateLimit;
            this.render();
          }

          if (code === "InvalidArgument") {
            if (data.email)    this.errors.email = data.email[0];
            if (data.password) this.errors.password = data.password[0];
            this.render();
          }

          if (code === "BlockedCountry") {
            this.errors._form = cbLocale.form.blockedCountry;
            this.render();
          }
        }
      })
    }
  }

  //block form init if not exists
  const form = new Form();
  if($("#cb-form")[0]){
    form.checkWidget();
    form.init();
  }else{
    form.setLocales();
  }

});

export const registerGql = `mutation
  userRegistrationSimple($password: String!, $email: String!, $currency: Currency!, $affiliate: MapString){
    userRegistrationSimple(input: {
      password: $password,
      email: $email,
      currency: $currency,
      affiliate: $affiliate
    }) {
      loginToken
      accessToken
      refreshToken
    }
}`;

const getUrlParameter = () => {
  const search = window.location.search.substring(1);
  const params = search.split('&');
  let result = {};

  params.forEach((pair) => {
    const res = pair.split('=');
    result[res[0]] = res[1] ? decodeURIComponent(res[1]) : undefined;
  });

  return result;
};

