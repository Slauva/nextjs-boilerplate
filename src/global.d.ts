// Type-safe i18n with NextIntl
type Messages = typeof import("../public/locales/ru.json");
declare global {
  declare interface IntlMessages extends Messages {}
}
