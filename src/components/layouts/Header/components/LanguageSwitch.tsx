import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useState, MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitch = () => {
  const { i18n } = useTranslation();
  const [lang, setLang] = useState<string | null>(localStorage.getItem('i18nextLng') || 'en');

  const handleToggle = (_: MouseEvent<HTMLElement>, newLang: string) => {
    setLang(newLang);
    i18n.changeLanguage(newLang);
  };

  return (
    <ToggleButtonGroup value={lang} exclusive onChange={handleToggle} aria-label="text alignment">
      <ToggleButton value="en" aria-label="left aligned">
        EN
      </ToggleButton>
      <ToggleButton value="ru" aria-label="centered">
        RU
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export default LanguageSwitch;
