import React from "react";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";
import dayjs from "dayjs";

function WelcomeBanner() {
  const { t } = useTranslation();
  const today = dayjs().format("MMMM D, YYYY");
  return (
    <div
      className="cb-bg-blue-200 cb-flex cb-justify-between cb-px-8 cb-py-10 cb-flex-wrap-reverse cb-gap-4"
      data-testid="welcome-container"
    >
      <div>
        <p className="cb-text-sm cb-text-gray-500">{today}</p>
        <h3 className="cb-text-blue-500">{t("welcome.title")}</h3>
        <p className="cb-text-sm cb-text-gray-600 cb-mb-4">
          {t("welcome.description")}
        </p>
      </div>
      <LanguageSwitcher />
    </div>
  );
}

export default WelcomeBanner;
