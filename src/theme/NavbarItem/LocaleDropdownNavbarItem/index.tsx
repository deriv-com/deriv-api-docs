// Re-export the original Docusaurus LocaleDropdownNavbarItem.
// The custom locale dropdown UI was removed along with the navbar language
// switcher, but Docusaurus core (`@theme-original/NavbarItem/ComponentTypes`)
// still imports this via the `@theme/NavbarItem/LocaleDropdownNavbarItem`
// alias, so the module must resolve.
export { default } from '@theme-original/NavbarItem/LocaleDropdownNavbarItem';
