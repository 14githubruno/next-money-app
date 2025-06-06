import {
  House,
  ListOrdered,
  ReceiptText,
  Sun,
  Moon,
  MonitorCog,
} from "lucide-react";
import type { CategoryFormState, ExpenseFormState } from "./types";

/**
 * Pages titles
 */
export const PAGES_TITLES = {
  h1: {
    dashboard: "Overview",
    dashboardAccount: "Account",
    dashboardCategories: "Categories",
    dashboardExpenses: "Expenses",
  },
  h2: {
    dashboard: "Expenses Chart",
    dashboardCategories: "Bar List",
  },
};

/**
 * Dashboard sidenav links
 */
export const DASHBOARD_LINKS = [
  {
    name: "Overview",
    href: "/dashboard",
    icon: House,
    tooltip: "Overview",
  },
  {
    name: "Categories",
    href: "/dashboard/categories",
    icon: ListOrdered,
    tooltip: "Categories",
  },
  {
    name: "Expenses",
    href: "/dashboard/expenses",
    icon: ReceiptText,
    tooltip: "Expenses",
  },
];

/**
 * Theme modes to populate theme-switcher
 */
export const THEMES = [
  {
    mode: "Light",
    value: "light",
    ["aria-label"]: "Switch to light mode",
    icon: Sun,
  },
  {
    mode: "Dark",
    value: "dark",
    ["aria-label"]: "Switch to dark mode",
    icon: Moon,
  },
  {
    mode: "System",
    value: "system",
    ["aria-label"]: "Switch to system mode",
    icon: MonitorCog,
  },
];

/**
 * Initial/default state of category form fields.
 */
export const CATEGORY_FORM_INITIAL_STATE: CategoryFormState = {
  success: false,
  message: "",
  fieldValues: { name: "" },
};

/**
 * Initial/default state of expense form fields.
 */
export const EXPENSE_FORM_INITIAL_STATE: ExpenseFormState = {
  success: false,
  message: "",
  fieldValues: {
    amount: 0.01,
    expenseDate: new Date(),
    isConfirmed: false,
    payment: "CASH",
    note: "",
    categoryId: "",
  },
};

/**
 * First year of the app.
 */
export const APP_FIRST_YEAR = 2025;

/**
 * Months.
 */
export const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

/**
 * An array of supported and valid currencies
 */
export const CURRENCIES = Intl.supportedValuesOf("currency");

/**
 * Default country values.
 */
export const DEFAULT_COUNTRY = {
  code: "US",
  currency: "USD",
  locale: "en-US",
};

/*
 * Countries with currencies data (and languages)
 */
type Currency = {
  name: string;
  symbol: string;
};

type Languages = Record<string, string>;

type CountryData = {
  cca2: string;
  currencies: Record<string, Currency> | never[];
  languages: Languages;
};

export const COUNTRIES_DATA: CountryData[] = [
  {
    cca2: "AW",
    currencies: { AWG: { name: "Aruban florin", symbol: "ƒ" } },
    languages: { nld: "Dutch", pap: "Papiamento" },
  },
  {
    cca2: "AF",
    currencies: { AFN: { name: "Afghan afghani", symbol: "؋" } },
    languages: { prs: "Dari", pus: "Pashto", tuk: "Turkmen" },
  },
  {
    cca2: "AO",
    currencies: { AOA: { name: "Angolan kwanza", symbol: "Kz" } },
    languages: { por: "Portuguese" },
  },
  {
    cca2: "AI",
    currencies: {
      XCD: { name: "Eastern Caribbean dollar", symbol: "$" },
    },
    languages: { eng: "English" },
  },
  {
    cca2: "AX",
    currencies: { EUR: { name: "Euro", symbol: "€" } },
    languages: { swe: "Swedish" },
  },
  {
    cca2: "AL",
    currencies: { ALL: { name: "Albanian lek", symbol: "L" } },
    languages: { sqi: "Albanian" },
  },
  {
    cca2: "AD",
    currencies: { EUR: { name: "Euro", symbol: "€" } },
    languages: { cat: "Catalan" },
  },
  {
    cca2: "AE",
    currencies: {
      AED: { name: "United Arab Emirates dirham", symbol: "د.إ" },
    },
    languages: { ara: "Arabic" },
  },
  {
    cca2: "AR",
    currencies: { ARS: { name: "Argentine peso", symbol: "$" } },
    languages: { grn: "Guaraní", spa: "Spanish" },
  },
  {
    cca2: "AM",
    currencies: { AMD: { name: "Armenian dram", symbol: "֏" } },
    languages: { hye: "Armenian" },
  },
  {
    cca2: "AS",
    currencies: { USD: { name: "United States dollar", symbol: "$" } },
    languages: { eng: "English", smo: "Samoan" },
  },
  { cca2: "AQ", currencies: [], languages: {} },
  {
    cca2: "TF",
    currencies: { EUR: { name: "Euro", symbol: "€" } },
    languages: { fra: "French" },
  },
  {
    cca2: "AG",
    currencies: {
      XCD: { name: "Eastern Caribbean dollar", symbol: "$" },
    },
    languages: { eng: "English" },
  },
  {
    cca2: "AU",
    currencies: { AUD: { name: "Australian dollar", symbol: "$" } },
    languages: { eng: "English" },
  },
  {
    cca2: "AT",
    currencies: { EUR: { name: "Euro", symbol: "€" } },
    languages: { bar: "Austro-Bavarian German" },
  },
  {
    cca2: "AZ",
    currencies: { AZN: { name: "Azerbaijani manat", symbol: "₼" } },
    languages: { aze: "Azerbaijani", rus: "Russian" },
  },
  {
    cca2: "BI",
    currencies: { BIF: { name: "Burundian franc", symbol: "Fr" } },
    languages: { fra: "French", run: "Kirundi" },
  },
  {
    cca2: "BE",
    currencies: { EUR: { name: "Euro", symbol: "€" } },
    languages: { deu: "German", fra: "French", nld: "Dutch" },
  },
  {
    cca2: "BJ",
    currencies: {
      XOF: { name: "West African CFA franc", symbol: "Fr" },
    },
    languages: { fra: "French" },
  },
  {
    cca2: "BF",
    currencies: {
      XOF: { name: "West African CFA franc", symbol: "Fr" },
    },
    languages: { fra: "French" },
  },
  {
    cca2: "BD",
    currencies: { BDT: { name: "Bangladeshi taka", symbol: "৳" } },
    languages: { ben: "Bengali" },
  },
  {
    cca2: "BG",
    currencies: { BGN: { name: "Bulgarian lev", symbol: "лв" } },
    languages: { bul: "Bulgarian" },
  },
  {
    cca2: "BH",
    currencies: { BHD: { name: "Bahraini dinar", symbol: ".د.ب" } },
    languages: { ara: "Arabic" },
  },
  {
    cca2: "BS",
    currencies: {
      BSD: { name: "Bahamian dollar", symbol: "$" },
      USD: { name: "United States dollar", symbol: "$" },
    },
    languages: { eng: "English" },
  },
  {
    cca2: "BA",
    currencies: {
      BAM: {
        name: "Bosnia and Herzegovina convertible mark",
        symbol: "KM",
      },
    },
    languages: { bos: "Bosnian", hrv: "Croatian", srp: "Serbian" },
  },
  {
    cca2: "BL",
    currencies: { EUR: { name: "Euro", symbol: "€" } },
    languages: { fra: "French" },
  },
  {
    cca2: "SH",
    currencies: {
      GBP: { name: "Pound sterling", symbol: "£" },
      SHP: { name: "Saint Helena pound", symbol: "£" },
    },
    languages: { eng: "English" },
  },
  {
    cca2: "BY",
    currencies: { BYN: { name: "Belarusian ruble", symbol: "Br" } },
    languages: { bel: "Belarusian", rus: "Russian" },
  },
  {
    cca2: "BZ",
    currencies: { BZD: { name: "Belize dollar", symbol: "$" } },
    languages: {
      bjz: "Belizean Creole",
      eng: "English",
      spa: "Spanish",
    },
  },
  {
    cca2: "BM",
    currencies: { BMD: { name: "Bermudian dollar", symbol: "$" } },
    languages: { eng: "English" },
  },
  {
    cca2: "BO",
    currencies: { BOB: { name: "Bolivian boliviano", symbol: "Bs." } },
    languages: {
      aym: "Aymara",
      grn: "Guaraní",
      que: "Quechua",
      spa: "Spanish",
    },
  },
  {
    cca2: "BQ",
    currencies: { USD: { name: "United States dollar", symbol: "$" } },
    languages: { eng: "English", nld: "Dutch", pap: "Papiamento" },
  },
  {
    cca2: "BR",
    currencies: { BRL: { name: "Brazilian real", symbol: "R$" } },
    languages: { por: "Portuguese" },
  },
  {
    cca2: "BB",
    currencies: { BBD: { name: "Barbadian dollar", symbol: "$" } },
    languages: { eng: "English" },
  },
  {
    cca2: "BN",
    currencies: {
      BND: { name: "Brunei dollar", symbol: "$" },
      SGD: { name: "Singapore dollar", symbol: "$" },
    },
    languages: { msa: "Malay" },
  },
  {
    cca2: "BT",
    currencies: {
      BTN: { name: "Bhutanese ngultrum", symbol: "Nu." },
      INR: { name: "Indian rupee", symbol: "₹" },
    },
    languages: { dzo: "Dzongkha" },
  },
  { cca2: "BV", currencies: [], languages: { nor: "Norwegian" } },
  {
    cca2: "BW",
    currencies: { BWP: { name: "Botswana pula", symbol: "P" } },
    languages: { eng: "English", tsn: "Tswana" },
  },
  {
    cca2: "CF",
    currencies: {
      XAF: { name: "Central African CFA franc", symbol: "Fr" },
    },
    languages: { fra: "French", sag: "Sango" },
  },
  {
    cca2: "CA",
    currencies: { CAD: { name: "Canadian dollar", symbol: "$" } },
    languages: { eng: "English", fra: "French" },
  },
  {
    cca2: "CC",
    currencies: { AUD: { name: "Australian dollar", symbol: "$" } },
    languages: { eng: "English" },
  },
  {
    cca2: "CH",
    currencies: { CHF: { name: "Swiss franc", symbol: "Fr." } },
    languages: {
      fra: "French",
      gsw: "Swiss German",
      ita: "Italian",
      roh: "Romansh",
    },
  },
  {
    cca2: "CL",
    currencies: { CLP: { name: "Chilean peso", symbol: "$" } },
    languages: { spa: "Spanish" },
  },
  {
    cca2: "CN",
    currencies: { CNY: { name: "Chinese yuan", symbol: "¥" } },
    languages: { zho: "Chinese" },
  },
  {
    cca2: "CI",
    currencies: {
      XOF: { name: "West African CFA franc", symbol: "Fr" },
    },
    languages: { fra: "French" },
  },
  {
    cca2: "CM",
    currencies: {
      XAF: { name: "Central African CFA franc", symbol: "Fr" },
    },
    languages: { eng: "English", fra: "French" },
  },
  {
    cca2: "CD",
    currencies: { CDF: { name: "Congolese franc", symbol: "FC" } },
    languages: {
      fra: "French",
      kon: "Kikongo",
      lin: "Lingala",
      lua: "Tshiluba",
      swa: "Swahili",
    },
  },
  {
    cca2: "CG",
    currencies: {
      XAF: { name: "Central African CFA franc", symbol: "Fr" },
    },
    languages: { fra: "French", kon: "Kikongo", lin: "Lingala" },
  },
  {
    cca2: "CK",
    currencies: {
      CKD: { name: "Cook Islands dollar", symbol: "$" },
      NZD: { name: "New Zealand dollar", symbol: "$" },
    },
    languages: { eng: "English", rar: "Cook Islands Māori" },
  },
  {
    cca2: "CO",
    currencies: { COP: { name: "Colombian peso", symbol: "$" } },
    languages: { spa: "Spanish" },
  },
  {
    cca2: "KM",
    currencies: { KMF: { name: "Comorian franc", symbol: "Fr" } },
    languages: { ara: "Arabic", fra: "French", zdj: "Comorian" },
  },
  {
    cca2: "CV",
    currencies: { CVE: { name: "Cape Verdean escudo", symbol: "Esc" } },
    languages: { por: "Portuguese" },
  },
  {
    cca2: "CR",
    currencies: { CRC: { name: "Costa Rican colón", symbol: "₡" } },
    languages: { spa: "Spanish" },
  },
  {
    cca2: "CU",
    currencies: {
      CUC: { name: "Cuban convertible peso", symbol: "$" },
      CUP: { name: "Cuban peso", symbol: "$" },
    },
    languages: { spa: "Spanish" },
  },
  {
    cca2: "CW",
    currencies: {
      ANG: { name: "Netherlands Antillean guilder", symbol: "ƒ" },
    },
    languages: { eng: "English", nld: "Dutch", pap: "Papiamento" },
  },
  {
    cca2: "CX",
    currencies: { AUD: { name: "Australian dollar", symbol: "$" } },
    languages: { eng: "English" },
  },
  {
    cca2: "KY",
    currencies: { KYD: { name: "Cayman Islands dollar", symbol: "$" } },
    languages: { eng: "English" },
  },
  {
    cca2: "CY",
    currencies: { EUR: { name: "Euro", symbol: "€" } },
    languages: { ell: "Greek", tur: "Turkish" },
  },
  {
    cca2: "CZ",
    currencies: { CZK: { name: "Czech koruna", symbol: "Kč" } },
    languages: { ces: "Czech", slk: "Slovak" },
  },
  {
    cca2: "DE",
    currencies: { EUR: { name: "Euro", symbol: "€" } },
    languages: { deu: "German" },
  },
  {
    cca2: "DJ",
    currencies: { DJF: { name: "Djiboutian franc", symbol: "Fr" } },
    languages: { ara: "Arabic", fra: "French" },
  },
  {
    cca2: "DM",
    currencies: {
      XCD: { name: "Eastern Caribbean dollar", symbol: "$" },
    },
    languages: { eng: "English" },
  },
  {
    cca2: "DK",
    currencies: { DKK: { name: "Danish krone", symbol: "kr" } },
    languages: { dan: "Danish" },
  },
  {
    cca2: "DO",
    currencies: { DOP: { name: "Dominican peso", symbol: "$" } },
    languages: { spa: "Spanish" },
  },
  {
    cca2: "DZ",
    currencies: { DZD: { name: "Algerian dinar", symbol: "د.ج" } },
    languages: { ara: "Arabic" },
  },
  {
    cca2: "EC",
    currencies: { USD: { name: "United States dollar", symbol: "$" } },
    languages: { spa: "Spanish" },
  },
  {
    cca2: "EG",
    currencies: { EGP: { name: "Egyptian pound", symbol: "£" } },
    languages: { ara: "Arabic" },
  },
  {
    cca2: "ER",
    currencies: { ERN: { name: "Eritrean nakfa", symbol: "Nfk" } },
    languages: { ara: "Arabic", eng: "English", tir: "Tigrinya" },
  },
  {
    cca2: "EH",
    currencies: {
      DZD: { name: "Algerian dinar", symbol: "دج" },
      MAD: { name: "Moroccan dirham", symbol: "DH" },
      MRU: { name: "Mauritanian ouguiya", symbol: "UM" },
    },
    languages: { ber: "Berber", mey: "Hassaniya", spa: "Spanish" },
  },
  {
    cca2: "ES",
    currencies: { EUR: { name: "Euro", symbol: "€" } },
    languages: { spa: "Spanish" },
  },
  {
    cca2: "EE",
    currencies: { EUR: { name: "Euro", symbol: "€" } },
    languages: { est: "Estonian" },
  },
  {
    cca2: "ET",
    currencies: { ETB: { name: "Ethiopian birr", symbol: "Br" } },
    languages: { amh: "Amharic" },
  },
  {
    cca2: "FI",
    currencies: { EUR: { name: "Euro", symbol: "€" } },
    languages: { fin: "Finnish", swe: "Swedish" },
  },
  {
    cca2: "FJ",
    currencies: { FJD: { name: "Fijian dollar", symbol: "$" } },
    languages: { eng: "English", fij: "Fijian", hif: "Fiji Hindi" },
  },
  {
    cca2: "FK",
    currencies: {
      FKP: { name: "Falkland Islands pound", symbol: "£" },
    },
    languages: { eng: "English" },
  },
  {
    cca2: "FR",
    currencies: { EUR: { name: "Euro", symbol: "€" } },
    languages: { fra: "French" },
  },
  {
    cca2: "FO",
    currencies: {
      DKK: { name: "Danish krone", symbol: "kr" },
      FOK: { name: "Faroese króna", symbol: "kr" },
    },
    languages: { dan: "Danish", fao: "Faroese" },
  },
  { cca2: "FM", currencies: [], languages: { eng: "English" } },
  {
    cca2: "GA",
    currencies: {
      XAF: { name: "Central African CFA franc", symbol: "Fr" },
    },
    languages: { fra: "French" },
  },
  {
    cca2: "GB",
    currencies: { GBP: { name: "British pound", symbol: "£" } },
    languages: { eng: "English" },
  },
  {
    cca2: "GE",
    currencies: { GEL: { name: "lari", symbol: "₾" } },
    languages: { kat: "Georgian" },
  },
  {
    cca2: "GG",
    currencies: {
      GBP: { name: "British pound", symbol: "£" },
      GGP: { name: "Guernsey pound", symbol: "£" },
    },
    languages: { eng: "English", fra: "French", nfr: "Guernésiais" },
  },
  {
    cca2: "GH",
    currencies: { GHS: { name: "Ghanaian cedi", symbol: "₵" } },
    languages: { eng: "English" },
  },
  {
    cca2: "GI",
    currencies: { GIP: { name: "Gibraltar pound", symbol: "£" } },
    languages: { eng: "English" },
  },
  {
    cca2: "GN",
    currencies: { GNF: { name: "Guinean franc", symbol: "Fr" } },
    languages: { fra: "French" },
  },
  {
    cca2: "GP",
    currencies: { EUR: { name: "Euro", symbol: "€" } },
    languages: { fra: "French" },
  },
  {
    cca2: "GM",
    currencies: { GMD: { name: "dalasi", symbol: "D" } },
    languages: { eng: "English" },
  },
  {
    cca2: "GW",
    currencies: {
      XOF: { name: "West African CFA franc", symbol: "Fr" },
    },
    languages: { por: "Portuguese", pov: "Upper Guinea Creole" },
  },
  {
    cca2: "GQ",
    currencies: {
      XAF: { name: "Central African CFA franc", symbol: "Fr" },
    },
    languages: { fra: "French", por: "Portuguese", spa: "Spanish" },
  },
  {
    cca2: "GR",
    currencies: { EUR: { name: "Euro", symbol: "€" } },
    languages: { ell: "Greek" },
  },
  {
    cca2: "GD",
    currencies: {
      XCD: { name: "Eastern Caribbean dollar", symbol: "$" },
    },
    languages: { eng: "English" },
  },
  {
    cca2: "GL",
    currencies: { DKK: { name: "krone", symbol: "kr." } },
    languages: { kal: "Greenlandic" },
  },
  {
    cca2: "GT",
    currencies: { GTQ: { name: "Guatemalan quetzal", symbol: "Q" } },
    languages: { spa: "Spanish" },
  },
  {
    cca2: "GF",
    currencies: { EUR: { name: "Euro", symbol: "€" } },
    languages: { fra: "French" },
  },
  {
    cca2: "GU",
    currencies: { USD: { name: "United States dollar", symbol: "$" } },
    languages: { cha: "Chamorro", eng: "English", spa: "Spanish" },
  },
  {
    cca2: "GY",
    currencies: { GYD: { name: "Guyanese dollar", symbol: "$" } },
    languages: { eng: "English" },
  },
  {
    cca2: "HK",
    currencies: { HKD: { name: "Hong Kong dollar", symbol: "$" } },
    languages: { eng: "English", zho: "Chinese" },
  },
  { cca2: "HM", currencies: [], languages: { eng: "English" } },
  {
    cca2: "HN",
    currencies: { HNL: { name: "Honduran lempira", symbol: "L" } },
    languages: { spa: "Spanish" },
  },
  {
    cca2: "HR",
    currencies: { EUR: { name: "Euro", symbol: "€" } },
    languages: { hrv: "Croatian" },
  },
  {
    cca2: "HT",
    currencies: { HTG: { name: "Haitian gourde", symbol: "G" } },
    languages: { fra: "French", hat: "Haitian Creole" },
  },
  {
    cca2: "HU",
    currencies: { HUF: { name: "Hungarian forint", symbol: "Ft" } },
    languages: { hun: "Hungarian" },
  },
  {
    cca2: "ID",
    currencies: { IDR: { name: "Indonesian rupiah", symbol: "Rp" } },
    languages: { ind: "Indonesian" },
  },
  {
    cca2: "IM",
    currencies: {
      GBP: { name: "British pound", symbol: "£" },
      IMP: { name: "Manx pound", symbol: "£" },
    },
    languages: { eng: "English", glv: "Manx" },
  },
  {
    cca2: "IN",
    currencies: { INR: { name: "Indian rupee", symbol: "₹" } },
    languages: { eng: "English", hin: "Hindi", tam: "Tamil" },
  },
  {
    cca2: "IO",
    currencies: { USD: { name: "United States dollar", symbol: "$" } },
    languages: { eng: "English" },
  },
  {
    cca2: "IE",
    currencies: { EUR: { name: "Euro", symbol: "€" } },
    languages: { eng: "English", gle: "Irish" },
  },
  {
    cca2: "IR",
    currencies: { IRR: { name: "Iranian rial", symbol: "﷼" } },
    languages: { fas: "Persian (Farsi)" },
  },
  {
    cca2: "IQ",
    currencies: { IQD: { name: "Iraqi dinar", symbol: "ع.د" } },
    languages: { ara: "Arabic", arc: "Aramaic", ckb: "Sorani" },
  },
  {
    cca2: "IS",
    currencies: { ISK: { name: "Icelandic króna", symbol: "kr" } },
    languages: { isl: "Icelandic" },
  },
  {
    cca2: "IL",
    currencies: { ILS: { name: "Israeli new shekel", symbol: "₪" } },
    languages: { ara: "Arabic", heb: "Hebrew" },
  },
  {
    cca2: "IT",
    currencies: { EUR: { name: "Euro", symbol: "€" } },
    languages: { ita: "Italian" },
  },
  {
    cca2: "JM",
    currencies: { JMD: { name: "Jamaican dollar", symbol: "$" } },
    languages: { eng: "English", jam: "Jamaican Patois" },
  },
  {
    cca2: "JE",
    currencies: {
      GBP: { name: "British pound", symbol: "£" },
      JEP: { name: "Jersey pound", symbol: "£" },
    },
    languages: { eng: "English", fra: "French", nrf: "Jèrriais" },
  },
  {
    cca2: "JO",
    currencies: { JOD: { name: "Jordanian dinar", symbol: "د.ا" } },
    languages: { ara: "Arabic" },
  },
  {
    cca2: "JP",
    currencies: { JPY: { name: "Japanese yen", symbol: "¥" } },
    languages: { jpn: "Japanese" },
  },
  {
    cca2: "KZ",
    currencies: { KZT: { name: "Kazakhstani tenge", symbol: "₸" } },
    languages: { kaz: "Kazakh", rus: "Russian" },
  },
  {
    cca2: "KE",
    currencies: { KES: { name: "Kenyan shilling", symbol: "Sh" } },
    languages: { eng: "English", swa: "Swahili" },
  },
  {
    cca2: "KG",
    currencies: { KGS: { name: "Kyrgyzstani som", symbol: "с" } },
    languages: { kir: "Kyrgyz", rus: "Russian" },
  },
  {
    cca2: "KH",
    currencies: {
      KHR: { name: "Cambodian riel", symbol: "៛" },
      USD: { name: "United States dollar", symbol: "$" },
    },
    languages: { khm: "Khmer" },
  },
  {
    cca2: "KI",
    currencies: {
      AUD: { name: "Australian dollar", symbol: "$" },
      KID: { name: "Kiribati dollar", symbol: "$" },
    },
    languages: { eng: "English", gil: "Gilbertese" },
  },
  {
    cca2: "KN",
    currencies: {
      XCD: { name: "Eastern Caribbean dollar", symbol: "$" },
    },
    languages: { eng: "English" },
  },
  {
    cca2: "KR",
    currencies: { KRW: { name: "South Korean won", symbol: "₩" } },
    languages: { kor: "Korean" },
  },
  {
    cca2: "XK",
    currencies: { EUR: { name: "Euro", symbol: "€" } },
    languages: { sqi: "Albanian", srp: "Serbian" },
  },
  {
    cca2: "KW",
    currencies: { KWD: { name: "Kuwaiti dinar", symbol: "د.ك" } },
    languages: { ara: "Arabic" },
  },
  {
    cca2: "LA",
    currencies: { LAK: { name: "Lao kip", symbol: "₭" } },
    languages: { lao: "Lao" },
  },
  {
    cca2: "LB",
    currencies: { LBP: { name: "Lebanese pound", symbol: "ل.ل" } },
    languages: { ara: "Arabic", fra: "French" },
  },
  {
    cca2: "LR",
    currencies: { LRD: { name: "Liberian dollar", symbol: "$" } },
    languages: { eng: "English" },
  },
  {
    cca2: "LY",
    currencies: { LYD: { name: "Libyan dinar", symbol: "ل.د" } },
    languages: { ara: "Arabic" },
  },
  {
    cca2: "LC",
    currencies: {
      XCD: { name: "Eastern Caribbean dollar", symbol: "$" },
    },
    languages: { eng: "English" },
  },
  {
    cca2: "LI",
    currencies: { CHF: { name: "Swiss franc", symbol: "Fr" } },
    languages: { deu: "German" },
  },
  {
    cca2: "LK",
    currencies: { LKR: { name: "Sri Lankan rupee", symbol: "Rs  රු" } },
    languages: { sin: "Sinhala", tam: "Tamil" },
  },
  {
    cca2: "LS",
    currencies: {
      LSL: { name: "Lesotho loti", symbol: "L" },
      ZAR: { name: "South African rand", symbol: "R" },
    },
    languages: { eng: "English", sot: "Sotho" },
  },
  {
    cca2: "LT",
    currencies: { EUR: { name: "Euro", symbol: "€" } },
    languages: { lit: "Lithuanian" },
  },
  {
    cca2: "LU",
    currencies: { EUR: { name: "Euro", symbol: "€" } },
    languages: { deu: "German", fra: "French", ltz: "Luxembourgish" },
  },
  {
    cca2: "LV",
    currencies: { EUR: { name: "Euro", symbol: "€" } },
    languages: { lav: "Latvian" },
  },
  {
    cca2: "MO",
    currencies: { MOP: { name: "Macanese pataca", symbol: "P" } },
    languages: { por: "Portuguese", zho: "Chinese" },
  },
  {
    cca2: "MF",
    currencies: { EUR: { name: "Euro", symbol: "€" } },
    languages: { fra: "French" },
  },
  {
    cca2: "MA",
    currencies: { MAD: { name: "Moroccan dirham", symbol: "د.م." } },
    languages: { ara: "Arabic", ber: "Berber" },
  },
  {
    cca2: "MC",
    currencies: { EUR: { name: "Euro", symbol: "€" } },
    languages: { fra: "French" },
  },
  {
    cca2: "MD",
    currencies: { MDL: { name: "Moldovan leu", symbol: "L" } },
    languages: { ron: "Moldavian" },
  },
  {
    cca2: "MG",
    currencies: { MGA: { name: "Malagasy ariary", symbol: "Ar" } },
    languages: { fra: "French", mlg: "Malagasy" },
  },
  {
    cca2: "MV",
    currencies: { MVR: { name: "Maldivian rufiyaa", symbol: ".ރ" } },
    languages: { div: "Maldivian" },
  },
  {
    cca2: "MX",
    currencies: { MXN: { name: "Mexican peso", symbol: "$" } },
    languages: { spa: "Spanish" },
  },
  {
    cca2: "MH",
    currencies: { USD: { name: "United States dollar", symbol: "$" } },
    languages: { eng: "English", mah: "Marshallese" },
  },
  {
    cca2: "MK",
    currencies: { MKD: { name: "denar", symbol: "den" } },
    languages: { mkd: "Macedonian" },
  },
  {
    cca2: "ML",
    currencies: {
      XOF: { name: "West African CFA franc", symbol: "Fr" },
    },
    languages: { fra: "French" },
  },
  {
    cca2: "MT",
    currencies: { EUR: { name: "Euro", symbol: "€" } },
    languages: { eng: "English", mlt: "Maltese" },
  },
  {
    cca2: "MM",
    currencies: { MMK: { name: "Burmese kyat", symbol: "Ks" } },
    languages: { mya: "Burmese" },
  },
  {
    cca2: "ME",
    currencies: { EUR: { name: "Euro", symbol: "€" } },
    languages: { cnr: "Montenegrin" },
  },
  {
    cca2: "MN",
    currencies: { MNT: { name: "Mongolian tögrög", symbol: "₮" } },
    languages: { mon: "Mongolian" },
  },
  {
    cca2: "MP",
    currencies: { USD: { name: "United States dollar", symbol: "$" } },
    languages: { cal: "Carolinian", cha: "Chamorro", eng: "English" },
  },
  {
    cca2: "MZ",
    currencies: { MZN: { name: "Mozambican metical", symbol: "MT" } },
    languages: { por: "Portuguese" },
  },
  {
    cca2: "MR",
    currencies: { MRU: { name: "Mauritanian ouguiya", symbol: "UM" } },
    languages: { ara: "Arabic" },
  },
  {
    cca2: "MS",
    currencies: {
      XCD: { name: "Eastern Caribbean dollar", symbol: "$" },
    },
    languages: { eng: "English" },
  },
  {
    cca2: "MQ",
    currencies: { EUR: { name: "Euro", symbol: "€" } },
    languages: { fra: "French" },
  },
  {
    cca2: "MU",
    currencies: { MUR: { name: "Mauritian rupee", symbol: "₨" } },
    languages: {
      eng: "English",
      fra: "French",
      mfe: "Mauritian Creole",
    },
  },
  {
    cca2: "MW",
    currencies: { MWK: { name: "Malawian kwacha", symbol: "MK" } },
    languages: { eng: "English", nya: "Chewa" },
  },
  {
    cca2: "MY",
    currencies: { MYR: { name: "Malaysian ringgit", symbol: "RM" } },
    languages: { eng: "English", msa: "Malay" },
  },
  {
    cca2: "YT",
    currencies: { EUR: { name: "Euro", symbol: "€" } },
    languages: { fra: "French" },
  },
  {
    cca2: "NA",
    currencies: {
      NAD: { name: "Namibian dollar", symbol: "$" },
      ZAR: { name: "South African rand", symbol: "R" },
    },
    languages: {
      afr: "Afrikaans",
      deu: "German",
      eng: "English",
      her: "Herero",
      hgm: "Khoekhoe",
      kwn: "Kwangali",
      loz: "Lozi",
      ndo: "Ndonga",
      tsn: "Tswana",
    },
  },
  {
    cca2: "NC",
    currencies: { XPF: { name: "CFP franc", symbol: "₣" } },
    languages: { fra: "French" },
  },
  {
    cca2: "NE",
    currencies: {
      XOF: { name: "West African CFA franc", symbol: "Fr" },
    },
    languages: { fra: "French" },
  },
  {
    cca2: "NF",
    currencies: { AUD: { name: "Australian dollar", symbol: "$" } },
    languages: { eng: "English", pih: "Norfuk" },
  },
  {
    cca2: "NG",
    currencies: { NGN: { name: "Nigerian naira", symbol: "₦" } },
    languages: { eng: "English" },
  },
  {
    cca2: "NI",
    currencies: { NIO: { name: "Nicaraguan córdoba", symbol: "C$" } },
    languages: { spa: "Spanish" },
  },
  {
    cca2: "NU",
    currencies: { NZD: { name: "New Zealand dollar", symbol: "$" } },
    languages: { eng: "English", niu: "Niuean" },
  },
  {
    cca2: "NL",
    currencies: { EUR: { name: "Euro", symbol: "€" } },
    languages: { nld: "Dutch" },
  },
  {
    cca2: "NO",
    currencies: { NOK: { name: "Norwegian krone", symbol: "kr" } },
    languages: {
      nno: "Norwegian Nynorsk",
      nob: "Norwegian Bokmål",
      smi: "Sami",
    },
  },
  {
    cca2: "NP",
    currencies: { NPR: { name: "Nepalese rupee", symbol: "₨" } },
    languages: { nep: "Nepali" },
  },
  {
    cca2: "NR",
    currencies: { AUD: { name: "Australian dollar", symbol: "$" } },
    languages: { eng: "English", nau: "Nauru" },
  },
  {
    cca2: "NZ",
    currencies: { NZD: { name: "New Zealand dollar", symbol: "$" } },
    languages: {
      eng: "English",
      mri: "Māori",
      nzs: "New Zealand Sign Language",
    },
  },
  {
    cca2: "OM",
    currencies: { OMR: { name: "Omani rial", symbol: "ر.ع." } },
    languages: { ara: "Arabic" },
  },
  {
    cca2: "PK",
    currencies: { PKR: { name: "Pakistani rupee", symbol: "₨" } },
    languages: { eng: "English", urd: "Urdu" },
  },
  {
    cca2: "PA",
    currencies: {
      PAB: { name: "Panamanian balboa", symbol: "B/." },
      USD: { name: "United States dollar", symbol: "$" },
    },
    languages: { spa: "Spanish" },
  },
  {
    cca2: "PN",
    currencies: { NZD: { name: "New Zealand dollar", symbol: "$" } },
    languages: { eng: "English" },
  },
  {
    cca2: "PE",
    currencies: { PEN: { name: "Peruvian sol", symbol: "S/." } },
    languages: { aym: "Aymara", que: "Quechua", spa: "Spanish" },
  },
  {
    cca2: "PH",
    currencies: { PHP: { name: "Philippine peso", symbol: "₱" } },
    languages: { eng: "English", fil: "Filipino" },
  },
  {
    cca2: "PW",
    currencies: { USD: { name: "United States dollar", symbol: "$" } },
    languages: { eng: "English", pau: "Palauan" },
  },
  {
    cca2: "PG",
    currencies: {
      PGK: { name: "Papua New Guinean kina", symbol: "K" },
    },
    languages: { eng: "English", hmo: "Hiri Motu", tpi: "Tok Pisin" },
  },
  {
    cca2: "PL",
    currencies: { PLN: { name: "Polish złoty", symbol: "zł" } },
    languages: { pol: "Polish" },
  },
  {
    cca2: "PR",
    currencies: { USD: { name: "United States dollar", symbol: "$" } },
    languages: { eng: "English", spa: "Spanish" },
  },
  {
    cca2: "KP",
    currencies: { KPW: { name: "North Korean won", symbol: "₩" } },
    languages: { kor: "Korean" },
  },
  {
    cca2: "PT",
    currencies: { EUR: { name: "Euro", symbol: "€" } },
    languages: { por: "Portuguese" },
  },
  {
    cca2: "PY",
    currencies: { PYG: { name: "Paraguayan guaraní", symbol: "₲" } },
    languages: { grn: "Guaraní", spa: "Spanish" },
  },
  {
    cca2: "PS",
    currencies: {
      EGP: { name: "Egyptian pound", symbol: "E£" },
      ILS: { name: "Israeli new shekel", symbol: "₪" },
      JOD: { name: "Jordanian dinar", symbol: "JD" },
    },
    languages: { ara: "Arabic" },
  },
  {
    cca2: "PF",
    currencies: { XPF: { name: "CFP franc", symbol: "₣" } },
    languages: { fra: "French" },
  },
  {
    cca2: "QA",
    currencies: { QAR: { name: "Qatari riyal", symbol: "ر.ق" } },
    languages: { ara: "Arabic" },
  },
  {
    cca2: "RE",
    currencies: { EUR: { name: "Euro", symbol: "€" } },
    languages: { fra: "French" },
  },
  {
    cca2: "RO",
    currencies: { RON: { name: "Romanian leu", symbol: "lei" } },
    languages: { ron: "Romanian" },
  },
  {
    cca2: "RU",
    currencies: { RUB: { name: "Russian ruble", symbol: "₽" } },
    languages: { rus: "Russian" },
  },
  {
    cca2: "RW",
    currencies: { RWF: { name: "Rwandan franc", symbol: "Fr" } },
    languages: { eng: "English", fra: "French", kin: "Kinyarwanda" },
  },
  {
    cca2: "SA",
    currencies: { SAR: { name: "Saudi riyal", symbol: "ر.س" } },
    languages: { ara: "Arabic" },
  },
  {
    cca2: "SD",
    currencies: { SDG: { name: "Sudanese pound", symbol: "PT" } },
    languages: { ara: "Arabic", eng: "English" },
  },
  {
    cca2: "SN",
    currencies: {
      XOF: { name: "West African CFA franc", symbol: "Fr" },
    },
    languages: { fra: "French" },
  },
  {
    cca2: "SG",
    currencies: { SGD: { name: "Singapore dollar", symbol: "$" } },
    languages: {
      eng: "English",
      msa: "Malay",
      tam: "Tamil",
      zho: "Chinese",
    },
  },
  {
    cca2: "GS",
    currencies: { SHP: { name: "Saint Helena pound", symbol: "£" } },
    languages: { eng: "English" },
  },
  {
    cca2: "SJ",
    currencies: { NOK: { name: "krone", symbol: "kr" } },
    languages: { nor: "Norwegian" },
  },
  {
    cca2: "SB",
    currencies: {
      SBD: { name: "Solomon Islands dollar", symbol: "$" },
    },
    languages: { eng: "English" },
  },
  {
    cca2: "SL",
    currencies: { SLL: { name: "Sierra Leonean leone", symbol: "Le" } },
    languages: { eng: "English" },
  },
  {
    cca2: "SV",
    currencies: { USD: { name: "United States dollar", symbol: "$" } },
    languages: { spa: "Spanish" },
  },
  {
    cca2: "SM",
    currencies: { EUR: { name: "Euro", symbol: "€" } },
    languages: { ita: "Italian" },
  },
  {
    cca2: "SO",
    currencies: { SOS: { name: "Somali shilling", symbol: "Sh" } },
    languages: { ara: "Arabic", som: "Somali" },
  },
  {
    cca2: "PM",
    currencies: { EUR: { name: "Euro", symbol: "€" } },
    languages: { fra: "French" },
  },
  {
    cca2: "RS",
    currencies: { RSD: { name: "Serbian dinar", symbol: "дин." } },
    languages: { srp: "Serbian" },
  },
  {
    cca2: "SS",
    currencies: { SSP: { name: "South Sudanese pound", symbol: "£" } },
    languages: { eng: "English" },
  },
  {
    cca2: "ST",
    currencies: {
      STN: { name: "São Tomé and Príncipe dobra", symbol: "Db" },
    },
    languages: { por: "Portuguese" },
  },
  {
    cca2: "SR",
    currencies: { SRD: { name: "Surinamese dollar", symbol: "$" } },
    languages: { nld: "Dutch" },
  },
  {
    cca2: "SK",
    currencies: { EUR: { name: "Euro", symbol: "€" } },
    languages: { slk: "Slovak" },
  },
  {
    cca2: "SI",
    currencies: { EUR: { name: "Euro", symbol: "€" } },
    languages: { slv: "Slovene" },
  },
  {
    cca2: "SE",
    currencies: { SEK: { name: "Swedish krona", symbol: "kr" } },
    languages: { swe: "Swedish" },
  },
  {
    cca2: "SZ",
    currencies: {
      SZL: { name: "Swazi lilangeni", symbol: "L" },
      ZAR: { name: "South African rand", symbol: "R" },
    },
    languages: { eng: "English", ssw: "Swazi" },
  },
  {
    cca2: "SX",
    currencies: {
      ANG: { name: "Netherlands Antillean guilder", symbol: "ƒ" },
    },
    languages: { eng: "English", fra: "French", nld: "Dutch" },
  },
  {
    cca2: "SC",
    currencies: { SCR: { name: "Seychellois rupee", symbol: "₨" } },
    languages: {
      crs: "Seychellois Creole",
      eng: "English",
      fra: "French",
    },
  },
  {
    cca2: "SY",
    currencies: { SYP: { name: "Syrian pound", symbol: "£" } },
    languages: { ara: "Arabic" },
  },
  {
    cca2: "TC",
    currencies: { USD: { name: "United States dollar", symbol: "$" } },
    languages: { eng: "English" },
  },
  {
    cca2: "TD",
    currencies: {
      XAF: { name: "Central African CFA franc", symbol: "Fr" },
    },
    languages: { ara: "Arabic", fra: "French" },
  },
  {
    cca2: "TG",
    currencies: {
      XOF: { name: "West African CFA franc", symbol: "Fr" },
    },
    languages: { fra: "French" },
  },
  {
    cca2: "TH",
    currencies: { THB: { name: "Thai baht", symbol: "฿" } },
    languages: { tha: "Thai" },
  },
  {
    cca2: "TJ",
    currencies: { TJS: { name: "Tajikistani somoni", symbol: "ЅМ" } },
    languages: { rus: "Russian", tgk: "Tajik" },
  },
  {
    cca2: "TK",
    currencies: { NZD: { name: "New Zealand dollar", symbol: "$" } },
    languages: { eng: "English", smo: "Samoan", tkl: "Tokelauan" },
  },
  {
    cca2: "TM",
    currencies: { TMT: { name: "Turkmenistan manat", symbol: "m" } },
    languages: { rus: "Russian", tuk: "Turkmen" },
  },
  {
    cca2: "TL",
    currencies: { USD: { name: "United States dollar", symbol: "$" } },
    languages: { por: "Portuguese", tet: "Tetum" },
  },
  {
    cca2: "TO",
    currencies: { TOP: { name: "Tongan paʻanga", symbol: "T$" } },
    languages: { eng: "English", ton: "Tongan" },
  },
  {
    cca2: "TT",
    currencies: {
      TTD: { name: "Trinidad and Tobago dollar", symbol: "$" },
    },
    languages: { eng: "English" },
  },
  {
    cca2: "TN",
    currencies: { TND: { name: "Tunisian dinar", symbol: "د.ت" } },
    languages: { ara: "Arabic" },
  },
  {
    cca2: "TR",
    currencies: { TRY: { name: "Turkish lira", symbol: "₺" } },
    languages: { tur: "Turkish" },
  },
  {
    cca2: "TV",
    currencies: {
      AUD: { name: "Australian dollar", symbol: "$" },
      TVD: { name: "Tuvaluan dollar", symbol: "$" },
    },
    languages: { eng: "English", tvl: "Tuvaluan" },
  },
  {
    cca2: "TW",
    currencies: { TWD: { name: "New Taiwan dollar", symbol: "$" } },
    languages: { zho: "Chinese" },
  },
  {
    cca2: "TZ",
    currencies: { TZS: { name: "Tanzanian shilling", symbol: "Sh" } },
    languages: { eng: "English", swa: "Swahili" },
  },
  {
    cca2: "UG",
    currencies: { UGX: { name: "Ugandan shilling", symbol: "Sh" } },
    languages: { eng: "English", swa: "Swahili" },
  },
  {
    cca2: "UA",
    currencies: { UAH: { name: "Ukrainian hryvnia", symbol: "₴" } },
    languages: { ukr: "Ukrainian" },
  },
  {
    cca2: "UM",
    currencies: { USD: { name: "United States dollar", symbol: "$" } },
    languages: { eng: "English" },
  },
  {
    cca2: "UY",
    currencies: { UYU: { name: "Uruguayan peso", symbol: "$" } },
    languages: { spa: "Spanish" },
  },
  {
    cca2: "US",
    currencies: { USD: { name: "United States dollar", symbol: "$" } },
    languages: { eng: "English" },
  },
  {
    cca2: "UZ",
    currencies: { UZS: { name: "Uzbekistani soʻm", symbol: "so'm" } },
    languages: { rus: "Russian", uzb: "Uzbek" },
  },
  {
    cca2: "VA",
    currencies: { EUR: { name: "Euro", symbol: "€" } },
    languages: { ita: "Italian", lat: "Latin" },
  },
  {
    cca2: "VC",
    currencies: {
      XCD: { name: "Eastern Caribbean dollar", symbol: "$" },
    },
    languages: { eng: "English" },
  },
  {
    cca2: "VE",
    currencies: {
      VES: { name: "Venezuelan bolívar soberano", symbol: "Bs.S." },
    },
    languages: { spa: "Spanish" },
  },
  {
    cca2: "VG",
    currencies: { USD: { name: "United States dollar", symbol: "$" } },
    languages: { eng: "English" },
  },
  {
    cca2: "VI",
    currencies: { USD: { name: "United States dollar", symbol: "$" } },
    languages: { eng: "English" },
  },
  {
    cca2: "VN",
    currencies: { VND: { name: "Vietnamese đồng", symbol: "₫" } },
    languages: { vie: "Vietnamese" },
  },
  {
    cca2: "VU",
    currencies: { VUV: { name: "Vanuatu vatu", symbol: "Vt" } },
    languages: { bis: "Bislama", eng: "English", fra: "French" },
  },
  {
    cca2: "WF",
    currencies: { XPF: { name: "CFP franc", symbol: "₣" } },
    languages: { fra: "French" },
  },
  {
    cca2: "WS",
    currencies: { WST: { name: "Samoan tālā", symbol: "T" } },
    languages: { eng: "English", smo: "Samoan" },
  },
  {
    cca2: "YE",
    currencies: { YER: { name: "Yemeni rial", symbol: "﷼" } },
    languages: { ara: "Arabic" },
  },
  {
    cca2: "ZA",
    currencies: { ZAR: { name: "South African rand", symbol: "R" } },
    languages: {
      afr: "Afrikaans",
      eng: "English",
      nbl: "Southern Ndebele",
      nso: "Northern Sotho",
      sot: "Southern Sotho",
      ssw: "Swazi",
      tsn: "Tswana",
      tso: "Tsonga",
      ven: "Venda",
      xho: "Xhosa",
      zul: "Zulu",
    },
  },
  {
    cca2: "ZM",
    currencies: { ZMW: { name: "Zambian kwacha", symbol: "ZK" } },
    languages: { eng: "English" },
  },
  {
    cca2: "ZW",
    currencies: {
      BWP: { name: "Botswana pula", symbol: "P" },
      CNY: { name: "Chinese yuan", symbol: "¥" },
      EUR: { name: "Euro", symbol: "€" },
      GBP: { name: "British pound", symbol: "£" },
      INR: { name: "Indian rupee", symbol: "₹" },
      JPY: { name: "Japanese yen", symbol: "¥" },
      USD: { name: "United States dollar", symbol: "$" },
      ZAR: { name: "South African rand", symbol: "Rs" },
      ZWB: { name: "Zimbabwean bonds", symbol: "$" },
    },
    languages: {
      bwg: "Chibarwe",
      eng: "English",
      kck: "Kalanga",
      khi: "Khoisan",
      ndc: "Ndau",
      nde: "Northern Ndebele",
      nya: "Chewa",
      sna: "Shona",
      sot: "Sotho",
      toi: "Tonga",
      tsn: "Tswana",
      tso: "Tsonga",
      ven: "Venda",
      xho: "Xhosa",
      zib: "Zimbabwean Sign Language",
    },
  },
];

/**
 * Expenses to query.
 * - 5 per page `dashboard/expenses/page.tsx`
 * - 3 per slice `expenses-slice.tsx`
 */
export const EXPENSES_PER = {
  page: 5,
  slice: 3,
};

/**
 * Mock data (i.e. mock categories bar list data)
 */

export const MOCK_CATEGORIES_BAR_LIST = [
  { name: "groceries", value: 10 },
  { name: "cigarettes", value: 5 },
  { name: "books", value: 0 },
];
