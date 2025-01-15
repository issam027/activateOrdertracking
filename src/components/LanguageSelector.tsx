import React from 'react';
import { Button } from '@/components/ui/button';
import { Language, translations } from '@/i18n/translations';

interface LanguageSelectorProps {
  currentLanguage: Language;
  onLanguageChange: (language: Language) => void;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  currentLanguage,
  onLanguageChange,
}) => (
  <div className="flex justify-end mb-4 gap-2" dir="ltr">
    {(Object.keys(translations) as Language[]).map((lang) => {
      const FlagComponent = translations[lang].flag;
      return (
        <Button
          key={lang}
          variant={lang === currentLanguage ? "default" : "ghost"}
          size="icon"
          onClick={() => onLanguageChange(lang)}
          className="w-12 h-8 p-1 overflow-hidden"
          title={lang.toUpperCase()}
        >
          <FlagComponent />
        </Button>
      );
    })}
  </div>
);