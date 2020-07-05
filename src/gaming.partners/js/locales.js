import en from "../locales/en.json";
import ru from "../locales/ru.json";

const LOCALE_PARAM = "locale";
const DEFAULT_LOCALE = "en";
const LOCALE_BUTTON_ACTIVE_CLASS = "language--active";

const translations = {
  en,
  ru
};

const localeSearchParameter = {
  set: locale => {
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set(LOCALE_PARAM, locale);
    window.history.pushState(null, null, `?${urlParams.toString()}`);
  },
  get: () => {
    const detectedLocale = new URLSearchParams(window.location.search).get(
      LOCALE_PARAM
    );
    return detectedLocale ? detectedLocale.toLocaleLowerCase() : null;
  }
};

const setTranslations = locale => {
  const selectedTranslations =
    translations[locale] || translations[DEFAULT_LOCALE];
  localeSearchParameter.set(locale);
  Object.keys(selectedTranslations).forEach(id => {
    document.getElementById(id).innerHTML =
      selectedTranslations[id] || translations[DEFAULT_LOCALE][id];
  });
};

const initButtons = locale => {
  const languageButtons = document.querySelectorAll(".language");

  const onClickLanguageButton = evt => {
    for (let button of languageButtons) {
      if (button === evt.target) {
        button.classList.add(LOCALE_BUTTON_ACTIVE_CLASS);
        continue;
      }
      button.classList.remove(LOCALE_BUTTON_ACTIVE_CLASS);
    }

    setTranslations(evt.target.name);
  };

  languageButtons.forEach(el => {
    if (el.name === locale) el.classList.add(LOCALE_BUTTON_ACTIVE_CLASS);
    el.addEventListener("click", onClickLanguageButton);
  });
};

window.onload = () => {
  const locale = localeSearchParameter.get() || DEFAULT_LOCALE;
  setTranslations(locale);
  initButtons(locale);
};
