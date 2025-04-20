import React, { useState } from "react";
import { SelectChangeEvent } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Box, MenuItem, FormControl, Select, Typography } from "@mui/material";
import USFlag from "../assets/flags/us.svg";
import FRFlag from "../assets/flags/fr.svg";
import DEFlag from "../assets/flags/de.svg";

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();
  const languages = {
    en: { code: "US", name: "English", image: USFlag },
    fr: { code: "FR", name: "Français", image: FRFlag },
    de: { code: "DE", name: "Deutsch", image: DEFlag },
  };
  const [selectedLanguage, setSelectedLanguage] = useState<string>("en");

  const handleChange = (event: SelectChangeEvent<string>) => {
    const language = event.target.value as string;
    setSelectedLanguage(language);
    i18n.changeLanguage(language);
  };

  return (
    <Box>
      <FormControl fullWidth>
        {/* <InputLabel id="language-select-label">Language</InputLabel> */}
        <Select
          data-testid="language-select"
          labelId="language-select-label"
          id="language-select"
          value={selectedLanguage}
          onChange={handleChange}
          sx={{
            "border-radius": "25px",
            "max-width": "fit-content",
            "& .MuiOutlinedInput-input": {
              display: "flex",
              padding: "10px",
            },
          }}
        >
          {Object.entries(languages).map(
            ([langCode, { code, name, image }]) => (
              <MenuItem
                key={langCode}
                value={langCode}
                data-testid={`language-menuitem-${langCode}`}
                className="cb-flex cb-items-center cb-py-2 cb-px-4"
              >
                <Box
                  component="img"
                  src={image}
                  alt={`${name} flag`}
                  sx={{
                    width: 24,
                    height: 24,
                    borderRadius: "50%",
                    objectFit: "cover",
                    marginRight: 1.5,
                  }}
                  data-testid={`flag-${code}`}
                />
                <Typography className="cb-text-sm">{name}</Typography>
              </MenuItem>
            )
          )}
        </Select>
      </FormControl>
    </Box>
  );
};

export default LanguageSwitcher;
