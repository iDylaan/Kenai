export interface PrimeVueLocaleOptions {
    accept: string;
    reject: string;
    startsWith: string;
    contains: string;
    notContains: string;
    endsWith: string;
    equals: string;
    notEquals: string;
    noFilter: string;
    lt: string;
    lte: string;
    gt: string;
    gte: string;
    dateIs: string;
    dateIsNot: string;
    dateBefore: string;
    dateAfter: string;
    clear: string;
    apply: string;
    matchAll: string;
    matchAny: string;
    addRule: string;
    removeRule: string;
    acceptLabel: string;
    rejectLabel: string;
    choose: string;
    upload: string;
    cancel: string;
    dayNames: string[];
    dayNamesShort: string[];
    dayNamesMin: string[];
    monthNames: string[];
    monthNamesShort: string[];
    today: string;
    weekHeader: string;
    fileSizeTypes: string[]; 
  }
  
  export interface LocaleMessages {
    welcome: string;
    settings: {
      title: string;
      refresh: string;
      export: string;
      enableNotifications: string;
      selectOption: string;
    };
    "prime-ui": PrimeVueLocaleOptions;
  }
  