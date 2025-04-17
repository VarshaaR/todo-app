import React from "react";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";
import dayjs from "dayjs";

function WelcomeBanner() {
  const { t } = useTranslation();
  const today = dayjs().format("MMMM D, YYYY");
  return (
    <div
      className="cb-flex cb-justify-between cb-p-4 cb-flex-wrap-reverse cb-gap-4"
      data-testid="welcome-container"
    >
      <div>
        <p className="cb-text-sm cb-text-gray-500">{today}</p>
        <h3 className="">{t("welcome.title")}</h3>
        <p className="cb-text-base">{t("welcome.description")}</p>
      </div>
      <LanguageSwitcher />
    </div>
  );
}

export default WelcomeBanner;
