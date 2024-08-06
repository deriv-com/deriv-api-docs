export const locales = ['en', 'fr'];

export const getCurrentLanguage = () => {
  const path = window.location.pathname;
  const currentLocale = locales.find(
    (locale) => path.startsWith(`/${locale}/`) || path === `/${locale}`,
  );
  return currentLocale ?? 'en';
};
