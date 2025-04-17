import React, { useState } from "react";
import { SelectChangeEvent } from "@mui/material";

import { useTranslation } from "react-i18next";
import Flag from "react-world-flags";
import { Box, MenuItem, FormControl, Select, Typography } from "@mui/material";

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();
  const languages = {
    en: { code: "US", name: "English" },
    fr: { code: "FR", name: "Français" },
    de: { code: "DE", name: "Deutsch" },
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
          {Object.entries(languages).map(([langCode, { code, name }]) => (
            <MenuItem
              key={langCode}
              value={langCode}
              data-testid={`language-menuitem-${langCode}`}
              className="cb-flex cb-items-center cb-py-2 cb-px-4"
            >
              <Flag
                code={code}
                data-testid={`flag-${code}`}
                className="cb-mr-2 cb-w-6 cb-rounded-full cb-aspect-square cb-object-cover"
              />
              <Typography className="cb-text-sm">{name}</Typography>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default LanguageSwitcher;
