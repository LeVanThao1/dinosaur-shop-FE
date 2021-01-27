import i18n from "i18next";
// import Backend from 'i18next-xhr-backend'
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import vietnamese from "./languages/vn.json";
import english from "./languages/en.json";

i18n
	// .use(Backend)
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		resources: {
			en: {
				translation: english,
			},
			vi: {
				translation: vietnamese,
			},
		},
		fallbackLng: ["vi", "en"],
		// lng: 'en',
		interpolation: {
			escapeValue: false, // not needed for react!!
			formatSeparator: ",",
		},
		react: {
			wait: true,
		},
		returnObjects: true,
	});

export default i18n;
