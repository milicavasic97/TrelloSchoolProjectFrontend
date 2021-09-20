import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./en.json";
import sr from "./sr.json";

export const supportLanguages = ["en", "sr"];

const initializeI18N = () => {
    i18next.use(initReactI18next).init({
        resources: {
            en: {
                trnaslation: en,
            },
            sr: {
                trnaslation: sr,
            },
        },
        lng: localStorage.getItem("language"),
        fallbackLng: "en",
    });
};

export default initializeI18N;