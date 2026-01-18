import { useTranslation } from 'react-i18next';

interface LanguageSwitcherProps {
  className?: string;
}

export default function LanguageSwitcher({ className = '' }: LanguageSwitcherProps) {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;

  const toggleLanguage = () => {
    const newLang = currentLang === 'no' ? 'en' : 'no';
    i18n.changeLanguage(newLang);
  };

  return (
    <button
      onClick={toggleLanguage}
      className={`
        px-2 py-1 text-sm font-medium rounded
        hover:bg-black/5 transition-colors
        ${className}
      `}
      aria-label={`Switch to ${currentLang === 'no' ? 'English' : 'Norwegian'}`}
    >
      <span className={currentLang === 'no' ? 'font-bold' : 'opacity-50'}>NO</span>
      <span className="mx-1 opacity-50">/</span>
      <span className={currentLang === 'en' ? 'font-bold' : 'opacity-50'}>EN</span>
    </button>
  );
}
