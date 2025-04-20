import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpBackend from "i18next-http-backend";

i18n
  .use(HttpBackend)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    debug: true,
    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: `${import.meta.env.BASE_URL}locales/{{lng}}/{{ns}}.json`,
    },
    ns: ["translation"], // 👈 use "translation" namespace
    defaultNS: "translation", // 👈 default to "translation"
  });

export default i18n;
