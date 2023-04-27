export const mainPageProducts = {
  data: [
    {
      Attributes: [{ value: '/images/products/13/1695259_2_i1064.jpg' }],
      Manufacturer: { manufacturerName: 'Seagate' },
      Prices: [{ grossPrice: 264.4 }],
      productID: 13,
      productName: 'Barracuda Pro 1 TB 2.5" SATA III (ST1000LM049)',
      productsCount: 2
    },
    {
      Attributes: [{ value: '/images/products/2/860922_0_i1064.jpeg' }],
      Manufacturer: { manufacturerName: 'Toshiba' },
      Prices: [{ grossPrice: 257.99 }],
      productID: 2,
      productName: 'P300 2 TB 3.5" SATA III (HDWD120UZSVA)',
      productsCount: 1
    },
    {
      Attributes: [{ value: '/images/products/4/769736_0_i1064.jpeg' }],
      Manufacturer: { manufacturerName: 'Western Digital' },
      Prices: [{ grossPrice: 174.84 }],
      productID: 4,
      productName: 'Blue 500 GB 2.5" SATA III (WD5000LPCX)',
      productsCount: 1
    },
    {
      Attributes: [{ value: '/images/products/7/483906_0_i1064.jpg' }],
      Manufacturer: { manufacturerName: 'Toshiba' },
      Prices: [{ grossPrice: 153.85 }],
      productID: 7,
      productName: '500 GB 2.5" SATA II (MQ01ABD050)',
      productsCount: 1
    },
    {
      Attributes: [{ value: '/images/products/12/1727818_2_i1064.jpg' }],
      Manufacturer: { manufacturerName: 'Seagate' },
      Prices: [{ grossPrice: 846.6 }],
      productID: 12,
      productName: 'Barracuda 8 TB 3.5" SATA III (ST8000DM004)',
      productsCount: 1
    },
    {
      Attributes: [{ value: '/images/products/1/1042371_4_i1064.jpg' }],
      value: '/images/products/1/1042371_4_i1064.jpg',
      Manufacturer: { manufacturerName: 'Seagate' },
      Prices: [{ grossPrice: 161.87 }],
      grossPrice: 161.87,
      productID: 1,
      productName: 'Barracuda 1 TB 3.5" SATA III (ST1000DM010)',
      productsCount: 4
    }
  ],
  messaage: 'Product retrieved'
};

export const profileInvoiceList = [
  {
    VATNumber: null,
    ZIPCode: '45-256',
    cityName: 'Opole',
    companyName: null,
    grossPrice: 17145.12,
    invoiceDate: '2022-11-03T12:22:18.000Z',
    invoiceID: 4,
    name: 'Bartosz Ostrowski',
    netPrice: 13201.74,
    paymentMethod: 'Credit card',
    status: 'Pending',
    streetName: 'Ozimska 215/55'
  }
];

export const profilelUserData = {
  ZIPCode: '45-256',
  cityName: 'Opole',
  companyName: null,
  firstName: 'Bartosz',
  lastName: 'Ostrowski',
  streetName: 'Ozimska 215/55',
  email: 'bartosz.ostrowski@gmail.com',
  login: 'bartek'
};

export const InvoiceItems3Items = {
  InvoiceItems: [
    {
      InvoiceID: 4,
      Product: {
        Category: { categoryName: 'Karty graficzne' },
        Manufacturer: { manufacturerName: 'Gigabyte' },
        Prices: [{ netPrice: 3851.53, grossPrice: 5001.99 }],
        categoryID: 3,
        productID: 36,
        productName: 'GeForce RTX 3080 Vision OC 10GB GDDR6X (GV-N3080VISION OC-10GD 2.0)'
      },
      grossPrice: 5001.99,
      invoiceID: 4,
      invoiceItemID: 12,
      netPrice: 3851.53,
      productID: 36,
      productName: 'GeForce RTX 3080 Vision OC 10GB GDDR6X (GV-N3080VISION OC-10GD 2.0)',
      quantity: 3,
      taxPercentage: 23
    },
    {
      InvoiceID: 4,
      Product: {
        Category: { categoryName: 'Zasilacze' },
        Manufacturer: { manufacturerName: 'EVGA' },
        Prices: [{ netPrice: 444, grossPrice: 576.63 }],
        categoryID: 9,
        productID: 71,
        productName: 'B5 850W (220-B5-0850-V2)'
      },
      grossPrice: 576.63,
      invoiceID: 4,
      invoiceItemID: 13,
      netPrice: 444,
      productID: 71,
      productName: 'B5 850W (220-B5-0850-V2)',
      quantity: 3,
      taxPercentage: 23
    },
    {
      InvoiceID: 4,
      Product: {
        Category: { categoryName: 'Napędy optyczne' },
        Manufacturer: { manufacturerName: 'LG' },
        Prices: [{ netPrice: 105.04, grossPrice: 136.42 }],
        categoryID: 4,
        productID: 56,
        productName: 'HLDS GP57EB40.AHLE10B'
      },

      grossPrice: 136.42,
      invoiceID: 4,
      invoiceItemID: 14,
      netPrice: 105.04,
      productID: 56,
      productName: 'HLDS GP57EB40.AHLE10B',
      quantity: 3,
      taxPercentage: 23
    }
  ],
  VATNumber: null,
  ZIPCode: '45-256',
  cityName: 'Opole',
  companyName: null,
  grossPrice: 17145.12,
  invoiceDate: '2022-11-03T12:22:18.000Z',
  invoiceID: 4,
  name: 'Bartosz Ostrowski',
  netPrice: 13201.74,
  paymentMethod: 'Credit card',
  status: 'Pending',
  streetName: 'Ozimska 215/55'
};

export const cartItems3Items = {
  cartData: {
    cartID: 4,
    numberOfProducts: 3,
    totalPriceOfProducts: 8003.99,
    totalQuantityofProducts: 5
  },
  cartItemsData: [
    {
      Product: {
        Attributes: [{ value: '/images/products/58/9642637_0_i1064.jpg' }],
        Manufacturer: { manufacturerName: 'Gigabyte' },
        Prices: [{ grossPrice: 535 }],
        categoryID: 7,
        productID: 58,
        productName: 'B660M DS3H DDR4'
      },
      cartID: 4,
      cartItemID: 12,
      productID: 58,
      quantity: 3
    },
    {
      Product: {
        Attributes: [{ value: '/images/products/33/5948207_0_i1064.jpg' }],
        Manufacturer: { manufacturerName: 'MSI' },
        Prices: [{ grossPrice: 3399.99 }],
        categoryID: 3,
        productID: 33,
        productName:
          'GeForce RTX 3060 Ti Gaming Z Trio 8GB GDDR6 (RTX 3060 Ti GAMING Z TRIO 8G LHR)'
      },
      cartID: 4,
      cartItemID: 13,
      productID: 33,
      quantity: 1
    },
    {
      Product: {
        Attributes: [{ value: '/images/products/76/5949745_0_i1064.jpg' }],
        Manufacturer: { manufacturerName: 'Intel' },
        Prices: [{ grossPrice: 2999 }],
        categoryID: 8,
        productID: 76,
        productName: 'Core i9-12900K, 3.2 GHz, 30 MB, BOX (BX8071512900K)'
      },
      cartID: 4,
      cartItemID: 14,
      productID: 76,
      quantity: 1
    }
  ]
};

export const logInInfo = {
  data: [],
  message: 'Logged out.'
  // message: 'Logged.'
};

export const searchResults_Barracuda = {
  products: [
    {
      productID: 1,
      quantity: 5,
      productName: 'Barracuda 1 TB 3.5" SATA III (ST1000DM010)',
      Category: { categoryID: 1, categoryName: 'Dyski HDD' },
      Manufacturer: { manufacturerID: 3, manufacturerName: 'Seagate' },
      Prices: [{ netPrice: 131.6, grossPrice: 161.87 }],
      va: [
        { attributeID: 1 },
        { attributeID: 2 },
        { attributeID: 3 },
        { attributeID: 4 },
        { attributeID: 5 },
        { attributeID: 6 }
      ],
      Attributes: [
        { property: 'Format dysku', value: '3.5"' },
        { property: 'Pojemność dysku [GB]', value: '1000' },
        { property: 'image', value: '/images/products/1/1042371_4_i1064.jpg' }
      ]
    },
    {
      productID: 3,
      quantity: 10,
      productName: 'Barracuda 1 TB 2.5" SATA III (ST1000LM048)',
      Category: { categoryID: 1, categoryName: 'Dyski HDD' },
      Manufacturer: { manufacturerID: 3, manufacturerName: 'Seagate' },
      Prices: [{ netPrice: 155.41, grossPrice: 191.15 }],
      va: [
        { attributeID: 13 },
        { attributeID: 14 },
        { attributeID: 15 },
        { attributeID: 16 },
        { attributeID: 17 },
        { attributeID: 18 },
        { attributeID: 19 }
      ],
      Attributes: [
        { property: 'Format dysku', value: '2.5"' },
        { property: 'Pojemność dysku [GB]', value: '1000' },
        { property: 'image', value: '/images/products/3/1042366_1_i1064.jpg' }
      ]
    },
    {
      productID: 11,
      quantity: 10,
      productName: 'Barracuda 2 TB 3.5" SATA III (ST2000DM008)',
      Category: { categoryID: 1, categoryName: 'Dyski HDD' },
      Manufacturer: { manufacturerID: 3, manufacturerName: 'Seagate' },
      Prices: [{ netPrice: 202.43, grossPrice: 248.99 }],
      va: [
        { attributeID: 65 },
        { attributeID: 66 },
        { attributeID: 67 },
        { attributeID: 68 },
        { attributeID: 69 },
        { attributeID: 70 },
        { attributeID: 71 },
        { attributeID: 72 }
      ],
      Attributes: [
        { property: 'Format dysku', value: '3.5"' },
        { property: 'Pojemność dysku [GB]', value: '2000' },
        { property: 'image', value: '/images/products/11/4765408_2_i1064.png' }
      ]
    },
    {
      productID: 12,
      quantity: 10,
      productName: 'Barracuda 8 TB 3.5" SATA III (ST8000DM004)',
      Category: { categoryID: 1, categoryName: 'Dyski HDD' },
      Manufacturer: { manufacturerID: 3, manufacturerName: 'Seagate' },
      Prices: [{ netPrice: 688.29, grossPrice: 846.6 }],
      va: [
        { attributeID: 73 },
        { attributeID: 74 },
        { attributeID: 75 },
        { attributeID: 76 },
        { attributeID: 77 },
        { attributeID: 78 },
        { attributeID: 79 },
        { attributeID: 80 }
      ],
      Attributes: [
        { property: 'Format dysku', value: '3.5"' },
        { property: 'Pojemność dysku [GB]', value: '8000' },
        { property: 'image', value: '/images/products/12/1727818_2_i1064.jpg' }
      ]
    },
    {
      productID: 13,
      quantity: 10,
      productName: 'Barracuda Pro 1 TB 2.5" SATA III (ST1000LM049)',
      Category: { categoryID: 1, categoryName: 'Dyski HDD' },
      Manufacturer: { manufacturerID: 3, manufacturerName: 'Seagate' },
      Prices: [{ netPrice: 214.96, grossPrice: 264.4 }],
      va: [
        { attributeID: 81 },
        { attributeID: 82 },
        { attributeID: 83 },
        { attributeID: 84 },
        { attributeID: 85 },
        { attributeID: 86 },
        { attributeID: 87 }
      ],
      Attributes: [
        { property: 'Format dysku', value: '2.5"' },
        { property: 'Pojemność dysku [GB]', value: '1000' },
        { property: 'image', value: '/images/products/13/1695259_2_i1064.jpg' }
      ]
    },
    {
      productID: 15,
      quantity: 10,
      productName: 'Barracuda 8 TB 3.5" SATA III (ST8000DM004)',
      Category: { categoryID: 1, categoryName: 'Dyski HDD' },
      Manufacturer: { manufacturerID: 3, manufacturerName: 'Seagate' },
      Prices: [{ netPrice: 688.29, grossPrice: 846.6 }],
      va: [
        { attributeID: 99 },
        { attributeID: 100 },
        { attributeID: 101 },
        { attributeID: 102 },
        { attributeID: 103 },
        { attributeID: 104 },
        { attributeID: 105 },
        { attributeID: 106 }
      ],
      Attributes: [
        { property: 'Format dysku', value: '3.5"' },
        { property: 'Pojemność dysku [GB]', value: '8000' },
        { property: 'image', value: '/images/products/15/1727818_2_i1064.jpg' }
      ]
    },
    {
      productID: 20,
      quantity: 10,
      productName: 'BarraCuda 250GB 2.5" SATA3 (ZA250CM1A002)',
      Category: { categoryID: 2, categoryName: 'Dyski SSD' },
      Manufacturer: { manufacturerID: 3, manufacturerName: 'Seagate' },
      Prices: [{ netPrice: 145.53, grossPrice: 179 }],
      va: [
        { attributeID: 141 },
        { attributeID: 142 },
        { attributeID: 143 },
        { attributeID: 144 },
        { attributeID: 145 },
        { attributeID: 146 },
        { attributeID: 147 },
        { attributeID: 148 },
        { attributeID: 149 },
        { attributeID: 150 },
        { attributeID: 151 }
      ],
      Attributes: [
        { property: 'Format dysku', value: '2.5"' },
        { property: 'Pojemność dysku [GB]', value: '250' },
        { property: 'image', value: '/images/products/20/5939179_4_i1064.jpg' }
      ]
    }
  ],
  filters: [
    {
      property: 'Format dysku',
      numberOfProducts: 7,
      values: [
        { property: 'Format dysku', value: '2.5"', numberOfProducts: 3 },
        { property: 'Format dysku', value: '3.5"', numberOfProducts: 4 }
      ]
    },
    {
      property: 'Interfejs',
      numberOfProducts: 7,
      values: [{ property: 'Interfejs', value: 'SATA III', numberOfProducts: 7 }]
    },
    {
      property: 'Pamięć podręczna',
      numberOfProducts: 5,
      values: [
        { property: 'Pamięć podręczna', value: '256', numberOfProducts: 3 },
        { property: 'Pamięć podręczna', value: '128', numberOfProducts: 2 }
      ]
    },
    {
      property: 'Pojemność dysku [GB]',
      numberOfProducts: 7,
      values: [
        { property: 'Pojemność dysku [GB]', value: '8000', numberOfProducts: 2 },
        { property: 'Pojemność dysku [GB]', value: '2000', numberOfProducts: 1 },
        { property: 'Pojemność dysku [GB]', value: '1000', numberOfProducts: 3 },
        { property: 'Pojemność dysku [GB]', value: '250', numberOfProducts: 1 }
      ]
    },
    {
      property: 'Prędkość obrotowa [obr./min.]',
      numberOfProducts: 6,
      values: [
        { property: 'Prędkość obrotowa [obr./min.]', value: '7200', numberOfProducts: 3 },
        { property: 'Prędkość obrotowa [obr./min.]', value: '5400', numberOfProducts: 3 }
      ]
    },
    {
      property: 'Rodzaj kości pamięci',
      numberOfProducts: 1,
      values: [{ property: 'Rodzaj kości pamięci', value: 'TLC', numberOfProducts: 1 }]
    },
    {
      property: 'Szybkość odczytu [MB/s]',
      numberOfProducts: 1,
      values: [{ property: 'Szybkość odczytu [MB/s]', value: '560', numberOfProducts: 1 }]
    },
    {
      property: 'Szybkość zapisu [MB/s]',
      numberOfProducts: 1,
      values: [{ property: 'Szybkość zapisu [MB/s]', value: '530', numberOfProducts: 1 }]
    }
  ],
  categories: [
    { categoryName: 'Dyski HDD', categoryID: 1, numberOfProducts: 6 },
    { categoryName: 'Dyski SSD', categoryID: 2, numberOfProducts: 1 }
  ],
  manufacturers: [{ ManufacturerName: 'Seagate', ManufacturerID: 3, numberOfProducts: 7 }],
  numberOfProducts: 7,
  activePage: 1,
  NumberOfpages: 1,
  minPrice: 161.87,
  maxPrice: 846.6
};

export const productID_13 = {
  productID: 13,
  categoryID: 1,
  manufacturerID: 3,
  quantity: 10,
  productName: 'Barracuda Pro 1 TB 2.5" SATA III (ST1000LM049)',
  description:
    'Urządzenie zostało wykonane w technologii talerzowej. Jego budowa składa się między innymi z ruchomej głowicy i obracających się talerzy. Dysk może zostać wykorzystany w każdym komputerze – zarówno w konfiguracjach typowo domowych, jak i biznesowych, biurowych, gamingowych czy też specjalistycznych. Dysk HDD sprawdza się także w wielu innych urządzeniach. Pozwala na magazynowanie sporej ilości danych, gwarantuje też stabilną obsługę systemu operacyjnego i zainstalowanych programów oraz narzędzi. Dysk twardy został przystosowany do wnęki 3,5 cala. Jego obudowę wykonano z dobrej jakości materiałów, dzięki czemu charakteryzuje się wysoką wytrzymałością mechaniczną oraz odpornością na wpływ czynników zewnętrznych. Wymiary dysku przekładają się również na prosty montaż w każdej obudowie komputerowej. Dzięki temu jest on gotowy do użycia w bardzo krótkim czasie po jego wypakowaniu z pudełka. Zastosowana obudowa chroni dysk przed obciążeniem generowanym podczas intensywnej, wielogodzinnej pracy. |http://localhost:9000/images/description/HDD/500542_2022_04_19_11_40_26998522033.jpeg| Dysk twardy działa w oparciu o interfejs SATA III, którego przepustowość maksymalna wynosi 6 Gbit/s. Jest to odpowiedni parametr do codziennej pracy w komputerach domowych, biurowych i biznesowych. Interfejs jest kompatybilny z większością obecnie sprzedawanych komputerów oraz płyt głównych. Urządzenie jest więc uniwersalne, może zostać wykorzystane w różnych zastosowaniach. Użyta technologia zapewnia stabilną i sprawną pracę w różnych warunkach, związana między innymi z przenoszeniem plików. Talerze dysku twardego obracają się z prędkością 7200 obrotów na minutę, co przekłada się na najszybsze i najefektywniejsze działanie w kategorii dysków twardych HDD. Urządzenie pozwoli więc na obsługę wielu zdarzeń w tym samym czasie, zagwarantuje również szybkie i sprawne przenoszenie danych na dysk, a także na nośniki zewnętrzne. Prędkość obrotowa utrzymana na tym poziomie zapewni także stabilną realizację standardowych zadań, związanych między innymi z obsługą systemu operacyjnego. |http://localhost:9000/images/description/HDD/1727818_2020_10_12_19_29_07876566786.png| Dyski twarde HDD to standardowe nośniki do komputerów PC. Są tańsze i bardziej pojemne od dysków półprzewodnikowych i dlatego bardzo często wybierane są przez użytkowników, którzy potrzebują sporej przestrzeni dyskowej na magazynowanie pokaźnych ilości danych.| HDD to nośnik, który zaoferuje optymalny stosunek ceny do pojemności. Przechowuj archiwa, wykonuj kopie zapasowe systemu i programów, magazynuj zdjęcia, a wszystko to na nośniku Western Digital Caviar Blue.|Western Digital to jeden z niekwestionowanych liderów wśród producentów dysków twardych. Amerykańskie przedsiębiorstwo od lat dostarcza użytkownikom szeroką gamę nośników o bardzo dobrych parametrach działania.| nie zawiedzie oczekiwań użytkowników, zapewniając stabilną i pojemną przestrzeń do magazynowania danych, a także dopracowane parametry działania.|Dysk twardy SATA3 to nośnik w rozmiarze 3.5 cala, co powoduje, że jest to idealny wybór do komputerów stacjonarnych. Jego montaż jest bardzo prosty, nie wymaga przejściówek – wystarczy umieścić go w zatoce 3.5 cala i podłączyć do komputera.|Dysk twardy SATA3 został wyposażony w technologię NoTouch. Jest to rozwiązanie powodujące, że głowica zapisująca nie dotyka bezpośrednio powierzchni talerzy dysku, co wpływa zarówno na cichsze działanie i mniejsze drgania nośnika, jak i na wyższą trwałość głowicy zapisującej oraz samych talerzy. Rozwiązanie to zapewnia też wyższą trwałość nośnika na wstrząsy podczas transportu.',
  Manufacturer: { manufacturerID: 3, manufacturerName: 'Seagate' },
  Category: { categoryID: 1, categoryName: 'Dyski HDD' },
  Prices: [
    {
      priceID: 13,
      productID: 13,
      netPrice: 214.96,
      grossPrice: 264.4,
      taxPercentage: 23,
      fromDate: '2019-12-01T00:00:00.000Z',
      toDate: '2020-08-20T21:00:00.000Z'
    }
  ],
  Attributes: [
    { attributeID: 81, property: 'Format dysku', value: '2.5"', type: '1' },
    { attributeID: 82, property: 'Pojemność dysku [GB]', value: '1000', type: '1' },
    { attributeID: 83, property: 'Prędkość obrotowa [obr./min.]', value: '7200', type: '0' },
    { attributeID: 84, property: 'Interfejs', value: 'SATA III', type: '0' },
    { attributeID: 85, property: 'Pamięć podręczna', value: '128', type: '0' },
    {
      attributeID: 86,
      property: 'image',
      value: '/images/products/13/1695259_2_i1064.jpg',
      type: '2'
    },
    {
      attributeID: 87,
      property: 'image',
      value: '/images/products/13/1695259_1_i1064.jpg',
      type: '3'
    }
  ]
};

export const productID_4 = {
  productID: 4,
  categoryID: 1,
  manufacturerID: 1,
  quantity: 10,
  productName: 'Blue 500 GB 2.5" SATA III (WD5000LPCX)',
  description:
    'Urządzenie zostało wykonane w technologii talerzowej. Jego budowa składa się między innymi z ruchomej głowicy i obracających się talerzy. Dysk może zostać wykorzystany w każdym komputerze – zarówno w konfiguracjach typowo domowych, jak i biznesowych, biurowych, gamingowych czy też specjalistycznych. Dysk HDD sprawdza się także w wielu innych urządzeniach. Pozwala na magazynowanie sporej ilości danych, gwarantuje też stabilną obsługę systemu operacyjnego i zainstalowanych programów oraz narzędzi. Dysk twardy został przystosowany do wnęki 3,5 cala. Jego obudowę wykonano z dobrej jakości materiałów, dzięki czemu charakteryzuje się wysoką wytrzymałością mechaniczną oraz odpornością na wpływ czynników zewnętrznych. Wymiary dysku przekładają się również na prosty montaż w każdej obudowie komputerowej. Dzięki temu jest on gotowy do użycia w bardzo krótkim czasie po jego wypakowaniu z pudełka. Zastosowana obudowa chroni dysk przed obciążeniem generowanym podczas intensywnej, wielogodzinnej pracy. |http://localhost:9000/images/description/HDD/500542_2022_04_19_11_40_26998522033.jpeg| Dysk twardy działa w oparciu o interfejs SATA III, którego przepustowość maksymalna wynosi 6 Gbit/s. Jest to odpowiedni parametr do codziennej pracy w komputerach domowych, biurowych i biznesowych. Interfejs jest kompatybilny z większością obecnie sprzedawanych komputerów oraz płyt głównych. Urządzenie jest więc uniwersalne, może zostać wykorzystane w różnych zastosowaniach. Użyta technologia zapewnia stabilną i sprawną pracę w różnych warunkach, związana między innymi z przenoszeniem plików. Talerze dysku twardego obracają się z prędkością 7200 obrotów na minutę, co przekłada się na najszybsze i najefektywniejsze działanie w kategorii dysków twardych HDD. Urządzenie pozwoli więc na obsługę wielu zdarzeń w tym samym czasie, zagwarantuje również szybkie i sprawne przenoszenie danych na dysk, a także na nośniki zewnętrzne. Prędkość obrotowa utrzymana na tym poziomie zapewni także stabilną realizację standardowych zadań, związanych między innymi z obsługą systemu operacyjnego. |http://localhost:9000/images/description/HDD/1727818_2020_10_12_19_29_07876566786.png| Dyski twarde HDD to standardowe nośniki do komputerów PC. Są tańsze i bardziej pojemne od dysków półprzewodnikowych i dlatego bardzo często wybierane są przez użytkowników, którzy potrzebują sporej przestrzeni dyskowej na magazynowanie pokaźnych ilości danych.| HDD to nośnik, który zaoferuje optymalny stosunek ceny do pojemności. Przechowuj archiwa, wykonuj kopie zapasowe systemu i programów, magazynuj zdjęcia, a wszystko to na nośniku Western Digital Caviar Blue.|Western Digital to jeden z niekwestionowanych liderów wśród producentów dysków twardych. Amerykańskie przedsiębiorstwo od lat dostarcza użytkownikom szeroką gamę nośników o bardzo dobrych parametrach działania.| nie zawiedzie oczekiwań użytkowników, zapewniając stabilną i pojemną przestrzeń do magazynowania danych, a także dopracowane parametry działania.|Dysk twardy SATA3 to nośnik w rozmiarze 3.5 cala, co powoduje, że jest to idealny wybór do komputerów stacjonarnych. Jego montaż jest bardzo prosty, nie wymaga przejściówek – wystarczy umieścić go w zatoce 3.5 cala i podłączyć do komputera.|Dysk twardy SATA3 został wyposażony w technologię NoTouch. Jest to rozwiązanie powodujące, że głowica zapisująca nie dotyka bezpośrednio powierzchni talerzy dysku, co wpływa zarówno na cichsze działanie i mniejsze drgania nośnika, jak i na wyższą trwałość głowicy zapisującej oraz samych talerzy. Rozwiązanie to zapewnia też wyższą trwałość nośnika na wstrząsy podczas transportu.',
  Manufacturer: { manufacturerID: 1, manufacturerName: 'Western Digital' },
  Category: { categoryID: 1, categoryName: 'Dyski HDD' },
  Prices: [
    {
      priceID: 4,
      productID: 4,
      netPrice: 142.15,
      grossPrice: 174.84,
      taxPercentage: 23,
      fromDate: '2019-12-01T00:00:00.000Z',
      toDate: '2020-08-20T21:00:00.000Z'
    }
  ],
  Attributes: [
    { attributeID: 20, property: 'Format dysku', value: '2.5"', type: '1' },
    { attributeID: 21, property: 'Pojemność dysku [GB]', value: '500', type: '1' },
    { attributeID: 22, property: 'Prędkość obrotowa [obr./min.]', value: '5400', type: '0' },
    { attributeID: 23, property: 'Interfejs', value: 'SATA III', type: '0' },
    { attributeID: 24, property: 'Pamięć podręczna', value: '16', type: '0' },
    {
      attributeID: 25,
      property: 'image',
      value: '/images/products/4/769736_0_i1064.jpeg',
      type: '2'
    }
  ]
};

export const lastSearched = [
  {
    value: 'GeForce RTX 3080 Vision OC 10GB GDDR6X (GV-N3080VISION OC-10GD 2.0)',
    url: '/search?q=GeForce RTX 3080 Vision OC 10GB GDDR6X (GV-N3080VISION OC-10GD 2.0)&s=domyślne&l=10&p=1',
    isProduct: true
  },
  { value: 'b', url: '/search?q=b&s=domyślne&l=10&p=1', isProduct: false },
  { value: 'bar', url: '/search?q=bar&s=domyślne&l=10&p=1', isProduct: false },
  { value: 'Toshiba', url: '/search?filterManufacturer=[2]&s=domyślne&l=10&p=1', isProduct: false },
  { value: 'Obudowy', url: '/search?filterCategory=[5]&s=domyślne&l=10&p=1', isProduct: false }
];

export const hintsManufacturersWithB = [
  { manufacturerID: 2, manufacturerName: 'Toshiba' },
  { manufacturerID: 10, manufacturerName: 'Gigabyte' },
  { manufacturerID: 23, manufacturerName: 'Ballistix' },
  { manufacturerID: 27, manufacturerName: 'be quiet!' },
  { manufacturerID: 29, manufacturerName: 'Gembird' },
  { manufacturerID: 31, manufacturerName: 'Biostar' }
];
export const hintsManufacturersWithBar = [];

export const hintsCategoriesWithB = [{ categoryID: 5, categoryName: 'Obudowy' }];
export const hintsCategoriesWithBar = [];

export const hintsProductsWithB = [
  { productID: 1, productName: 'Barracuda 1 TB 3.5" SATA III (ST1000DM010)' },
  { productID: 2, productName: 'P300 2 TB 3.5" SATA III (HDWD120UZSVA)' },
  { productID: 3, productName: 'Barracuda 1 TB 2.5" SATA III (ST1000LM048)' },
  { productID: 4, productName: 'Blue 500 GB 2.5" SATA III (WD5000LPCX)' },
  { productID: 5, productName: '4 TB 3.5" SATA III X300 (HDWE140UZSVA)' },
  { productID: 6, productName: 'P300 2 TB 3.5" SATA III (HDWD120UZSVA)' },
  { productID: 7, productName: '500 GB 2.5" SATA II (MQ01ABD050)' },
  { productID: 8, productName: 'FireCuda 1 TB 3.5" SATA III (ST1000DX002)' },
  { productID: 9, productName: 'Caviar Blue 500 GB 3.5" SATA III (WD5000AAKX)' },
  { productID: 10, productName: 'Digital Black 1 TB 3.5" SATA III (WD1003FZEX)' }
];
export const hintsProductsWithBar = [
  { productID: 1, productName: 'Barracuda 1 TB 3.5" SATA III (ST1000DM010)' },
  { productID: 3, productName: 'Barracuda 1 TB 2.5" SATA III (ST1000LM048)' },
  { productID: 11, productName: 'Barracuda 2 TB 3.5" SATA III (ST2000DM008)' },
  { productID: 12, productName: 'Barracuda 8 TB 3.5" SATA III (ST8000DM004)' },
  { productID: 13, productName: 'Barracuda Pro 1 TB 2.5" SATA III (ST1000LM049)' },
  { productID: 15, productName: 'Barracuda 8 TB 3.5" SATA III (ST8000DM004)' },
  { productID: 20, productName: 'BarraCuda 250GB 2.5" SATA3 (ZA250CM1A002)' }
];

export const searchResultProducts = {
  products: [
    {
      productID: 1,
      quantity: 5,
      productName: 'Barracuda 1 TB 3.5" SATA III (ST1000DM010)',
      Category: { categoryID: 1, categoryName: 'Dyski HDD' },
      Manufacturer: { manufacturerID: 3, manufacturerName: 'Seagate' },
      Prices: [{ netPrice: 131.6, grossPrice: 161.87 }],
      va: [
        { attributeID: 1 },
        { attributeID: 2 },
        { attributeID: 3 },
        { attributeID: 4 },
        { attributeID: 5 },
        { attributeID: 6 }
      ],
      Attributes: [
        { property: 'Format dysku', value: '3.5"' },
        { property: 'Pojemność dysku [GB]', value: '1000' },
        { property: 'image', value: '/images/products/1/1042371_4_i1064.jpg' }
      ]
    },
    {
      productID: 3,
      quantity: 10,
      productName: 'Barracuda 1 TB 2.5" SATA III (ST1000LM048)',
      Category: { categoryID: 1, categoryName: 'Dyski HDD' },
      Manufacturer: { manufacturerID: 3, manufacturerName: 'Seagate' },
      Prices: [{ netPrice: 155.41, grossPrice: 191.15 }],
      va: [
        { attributeID: 13 },
        { attributeID: 14 },
        { attributeID: 15 },
        { attributeID: 16 },
        { attributeID: 17 },
        { attributeID: 18 },
        { attributeID: 19 }
      ],
      Attributes: [
        { property: 'Format dysku', value: '2.5"' },
        { property: 'Pojemność dysku [GB]', value: '1000' },
        { property: 'image', value: '/images/products/3/1042366_1_i1064.jpg' }
      ]
    },
    {
      productID: 11,
      quantity: 10,
      productName: 'Barracuda 2 TB 3.5" SATA III (ST2000DM008)',
      Category: { categoryID: 1, categoryName: 'Dyski HDD' },
      Manufacturer: { manufacturerID: 3, manufacturerName: 'Seagate' },
      Prices: [{ netPrice: 202.43, grossPrice: 248.99 }],
      va: [
        { attributeID: 65 },
        { attributeID: 66 },
        { attributeID: 67 },
        { attributeID: 68 },
        { attributeID: 69 },
        { attributeID: 70 },
        { attributeID: 71 },
        { attributeID: 72 }
      ],
      Attributes: [
        { property: 'Format dysku', value: '3.5"' },
        { property: 'Pojemność dysku [GB]', value: '2000' },
        { property: 'image', value: '/images/products/11/4765408_2_i1064.png' }
      ]
    },
    {
      productID: 12,
      quantity: 10,
      productName: 'Barracuda 8 TB 3.5" SATA III (ST8000DM004)',
      Category: { categoryID: 1, categoryName: 'Dyski HDD' },
      Manufacturer: { manufacturerID: 3, manufacturerName: 'Seagate' },
      Prices: [{ netPrice: 688.29, grossPrice: 846.6 }],
      va: [
        { attributeID: 73 },
        { attributeID: 74 },
        { attributeID: 75 },
        { attributeID: 76 },
        { attributeID: 77 },
        { attributeID: 78 },
        { attributeID: 79 },
        { attributeID: 80 }
      ],
      Attributes: [
        { property: 'Format dysku', value: '3.5"' },
        { property: 'Pojemność dysku [GB]', value: '8000' },
        { property: 'image', value: '/images/products/12/1727818_2_i1064.jpg' }
      ]
    },
    {
      productID: 13,
      quantity: 10,
      productName: 'Barracuda Pro 1 TB 2.5" SATA III (ST1000LM049)',
      Category: { categoryID: 1, categoryName: 'Dyski HDD' },
      Manufacturer: { manufacturerID: 3, manufacturerName: 'Seagate' },
      Prices: [{ netPrice: 214.96, grossPrice: 264.4 }],
      va: [
        { attributeID: 81 },
        { attributeID: 82 },
        { attributeID: 83 },
        { attributeID: 84 },
        { attributeID: 85 },
        { attributeID: 86 },
        { attributeID: 87 }
      ],
      Attributes: [
        { property: 'Format dysku', value: '2.5"' },
        { property: 'Pojemność dysku [GB]', value: '1000' },
        { property: 'image', value: '/images/products/13/1695259_2_i1064.jpg' }
      ]
    },
    {
      productID: 15,
      quantity: 10,
      productName: 'Barracuda 8 TB 3.5" SATA III (ST8000DM004)',
      Category: { categoryID: 1, categoryName: 'Dyski HDD' },
      Manufacturer: { manufacturerID: 3, manufacturerName: 'Seagate' },
      Prices: [{ netPrice: 688.29, grossPrice: 846.6 }],
      va: [
        { attributeID: 99 },
        { attributeID: 100 },
        { attributeID: 101 },
        { attributeID: 102 },
        { attributeID: 103 },
        { attributeID: 104 },
        { attributeID: 105 },
        { attributeID: 106 }
      ],
      Attributes: [
        { property: 'Format dysku', value: '3.5"' },
        { property: 'Pojemność dysku [GB]', value: '8000' },
        { property: 'image', value: '/images/products/15/1727818_2_i1064.jpg' }
      ]
    },
    {
      productID: 20,
      quantity: 10,
      productName: 'BarraCuda 250GB 2.5" SATA3 (ZA250CM1A002)',
      Category: { categoryID: 2, categoryName: 'Dyski SSD' },
      Manufacturer: { manufacturerID: 3, manufacturerName: 'Seagate' },
      Prices: [{ netPrice: 145.53, grossPrice: 179 }],
      va: [
        { attributeID: 141 },
        { attributeID: 142 },
        { attributeID: 143 },
        { attributeID: 144 },
        { attributeID: 145 },
        { attributeID: 146 },
        { attributeID: 147 },
        { attributeID: 148 },
        { attributeID: 149 },
        { attributeID: 150 },
        { attributeID: 151 }
      ],
      Attributes: [
        { property: 'Format dysku', value: '2.5"' },
        { property: 'Pojemność dysku [GB]', value: '250' },
        { property: 'image', value: '/images/products/20/5939179_4_i1064.jpg' }
      ]
    }
  ],
  filters: [
    {
      property: 'Format dysku',
      numberOfProducts: 7,
      values: [
        { property: 'Format dysku', value: '2.5"', numberOfProducts: 3 },
        { property: 'Format dysku', value: '3.5"', numberOfProducts: 4 }
      ]
    },
    {
      property: 'Interfejs',
      numberOfProducts: 7,
      values: [{ property: 'Interfejs', value: 'SATA III', numberOfProducts: 7 }]
    },
    {
      property: 'Pamięć podręczna',
      numberOfProducts: 5,
      values: [
        { property: 'Pamięć podręczna', value: '256', numberOfProducts: 3 },
        { property: 'Pamięć podręczna', value: '128', numberOfProducts: 2 }
      ]
    },
    {
      property: 'Pojemność dysku [GB]',
      numberOfProducts: 7,
      values: [
        { property: 'Pojemność dysku [GB]', value: '8000', numberOfProducts: 2 },
        { property: 'Pojemność dysku [GB]', value: '2000', numberOfProducts: 1 },
        { property: 'Pojemność dysku [GB]', value: '1000', numberOfProducts: 3 },
        { property: 'Pojemność dysku [GB]', value: '250', numberOfProducts: 1 }
      ]
    },
    {
      property: 'Prędkość obrotowa [obr./min.]',
      numberOfProducts: 6,
      values: [
        { property: 'Prędkość obrotowa [obr./min.]', value: '7200', numberOfProducts: 3 },
        { property: 'Prędkość obrotowa [obr./min.]', value: '5400', numberOfProducts: 3 }
      ]
    },
    {
      property: 'Rodzaj kości pamięci',
      numberOfProducts: 1,
      values: [{ property: 'Rodzaj kości pamięci', value: 'TLC', numberOfProducts: 1 }]
    },
    {
      property: 'Szybkość odczytu [MB/s]',
      numberOfProducts: 1,
      values: [{ property: 'Szybkość odczytu [MB/s]', value: '560', numberOfProducts: 1 }]
    },
    {
      property: 'Szybkość zapisu [MB/s]',
      numberOfProducts: 1,
      values: [{ property: 'Szybkość zapisu [MB/s]', value: '530', numberOfProducts: 1 }]
    }
  ],
  categories: [
    { categoryName: 'Dyski HDD', categoryID: 1, numberOfProducts: 6 },
    { categoryName: 'Dyski SSD', categoryID: 2, numberOfProducts: 1 }
  ],
  manufacturers: [{ ManufacturerName: 'Seagate', ManufacturerID: 3, numberOfProducts: 7 }],
  numberOfProducts: 7,
  activePage: 1,
  NumberOfpages: 1,
  minPrice: 161.87,
  maxPrice: 846.6
};

export const productDataWeekly = {
  Attributes: [{ value: '/images/products/13/1695259_2_i1064.jpg' }],
  Manufacturer: { manufacturerName: 'Seagate' },
  Prices: [{ grossPrice: 264.4, promoPrice: 235.2 }],
  productID: 13,
  productName: 'Barracuda Pro 1 TB 2.5" SATA III (ST1000LM049)',
  productsCount: 0
};
export const productDataDaily = {
  Attributes: [{ value: '/images/products/13/1695259_2_i1064.jpg' }],
  Manufacturer: { manufacturerName: 'Seagate' },
  Prices: [{ grossPrice: 264.4, promoPrice: 235.2 }],
  productID: 13,
  productName: 'Barracuda Pro 1 TB 2.5" SATA III (ST1000LM049)',
  productsCount: 2
};

export const searchResultsWithB = {
  products: [
    {
      productID: 1,
      quantity: 5,
      productName: 'Barracuda 1 TB 3.5" SATA III (ST1000DM010)',
      Category: { categoryID: 1, categoryName: 'Dyski HDD' },
      Manufacturer: { manufacturerID: 3, manufacturerName: 'Seagate' },
      Prices: [{ netPrice: 131.6, grossPrice: 161.87 }],
      va: [
        { attributeID: 1 },
        { attributeID: 2 },
        { attributeID: 3 },
        { attributeID: 4 },
        { attributeID: 5 },
        { attributeID: 6 }
      ],
      Attributes: [
        { property: 'Format dysku', value: '3.5"' },
        { property: 'Pojemność dysku [GB]', value: '1000' },
        { property: 'image', value: '/images/products/1/1042371_4_i1064.jpg' }
      ]
    },
    {
      productID: 2,
      quantity: 10,
      productName: 'P300 2 TB 3.5" SATA III (HDWD120UZSVA)',
      Category: { categoryID: 1, categoryName: 'Dyski HDD' },
      Manufacturer: { manufacturerID: 2, manufacturerName: 'Toshiba' },
      Prices: [{ netPrice: 209.75, grossPrice: 257.99 }],
      va: [
        { attributeID: 7 },
        { attributeID: 8 },
        { attributeID: 9 },
        { attributeID: 10 },
        { attributeID: 11 },
        { attributeID: 12 }
      ],
      Attributes: [
        { property: 'Format dysku', value: '3.5"' },
        { property: 'Pojemność dysku [GB]', value: '2000' },
        { property: 'image', value: '/images/products/2/860922_0_i1064.jpeg' }
      ]
    },
    {
      productID: 3,
      quantity: 10,
      productName: 'Barracuda 1 TB 2.5" SATA III (ST1000LM048)',
      Category: { categoryID: 1, categoryName: 'Dyski HDD' },
      Manufacturer: { manufacturerID: 3, manufacturerName: 'Seagate' },
      Prices: [{ netPrice: 155.41, grossPrice: 191.15 }],
      va: [
        { attributeID: 13 },
        { attributeID: 14 },
        { attributeID: 15 },
        { attributeID: 16 },
        { attributeID: 17 },
        { attributeID: 18 },
        { attributeID: 19 }
      ],
      Attributes: [
        { property: 'Format dysku', value: '2.5"' },
        { property: 'Pojemność dysku [GB]', value: '1000' },
        { property: 'image', value: '/images/products/3/1042366_1_i1064.jpg' }
      ]
    },
    {
      productID: 4,
      quantity: 10,
      productName: 'Blue 500 GB 2.5" SATA III (WD5000LPCX)',
      Category: { categoryID: 1, categoryName: 'Dyski HDD' },
      Manufacturer: { manufacturerID: 1, manufacturerName: 'Western Digital' },
      Prices: [{ netPrice: 142.15, grossPrice: 174.84 }],
      va: [
        { attributeID: 20 },
        { attributeID: 21 },
        { attributeID: 22 },
        { attributeID: 23 },
        { attributeID: 24 },
        { attributeID: 25 }
      ],
      Attributes: [
        { property: 'Format dysku', value: '2.5"' },
        { property: 'Pojemność dysku [GB]', value: '500' },
        { property: 'image', value: '/images/products/4/769736_0_i1064.jpeg' }
      ]
    },
    {
      productID: 5,
      quantity: 10,
      productName: '4 TB 3.5" SATA III X300 (HDWE140UZSVA)',
      Category: { categoryID: 1, categoryName: 'Dyski HDD' },
      Manufacturer: { manufacturerID: 2, manufacturerName: 'Toshiba' },
      Prices: [{ netPrice: 417.16, grossPrice: 513.1 }],
      va: [
        { attributeID: 26 },
        { attributeID: 27 },
        { attributeID: 28 },
        { attributeID: 29 },
        { attributeID: 30 },
        { attributeID: 31 }
      ],
      Attributes: [
        { property: 'Format dysku', value: '3.5"' },
        { property: 'Pojemność dysku [GB]', value: '4000' },
        { property: 'image', value: '/images/products/5/930692_0_i1064.jpeg' }
      ]
    },
    {
      productID: 6,
      quantity: 10,
      productName: 'P300 2 TB 3.5" SATA III (HDWD120UZSVA)',
      Category: { categoryID: 1, categoryName: 'Dyski HDD' },
      Manufacturer: { manufacturerID: 2, manufacturerName: 'Toshiba' },
      Prices: [{ netPrice: 209.75, grossPrice: 257.99 }],
      va: [
        { attributeID: 32 },
        { attributeID: 33 },
        { attributeID: 34 },
        { attributeID: 35 },
        { attributeID: 36 },
        { attributeID: 37 }
      ],
      Attributes: [
        { property: 'Format dysku', value: '3.5"' },
        { property: 'Pojemność dysku [GB]', value: '2000' },
        { property: 'image', value: '/images/products/6/860922_0_i1064.jpeg' }
      ]
    },
    {
      productID: 7,
      quantity: 10,
      productName: '500 GB 2.5" SATA II (MQ01ABD050)',
      Category: { categoryID: 1, categoryName: 'Dyski HDD' },
      Manufacturer: { manufacturerID: 2, manufacturerName: 'Toshiba' },
      Prices: [{ netPrice: 125.08, grossPrice: 153.85 }],
      va: [
        { attributeID: 38 },
        { attributeID: 39 },
        { attributeID: 40 },
        { attributeID: 41 },
        { attributeID: 42 },
        { attributeID: 43 }
      ],
      Attributes: [
        { property: 'Format dysku', value: '2.5"' },
        { property: 'Pojemność dysku [GB]', value: '500' },
        { property: 'image', value: '/images/products/7/483906_0_i1064.jpg' }
      ]
    },
    {
      productID: 8,
      quantity: 10,
      productName: 'FireCuda 1 TB 3.5" SATA III (ST1000DX002)',
      Category: { categoryID: 1, categoryName: 'Dyski HDD' },
      Manufacturer: { manufacturerID: 3, manufacturerName: 'Seagate' },
      Prices: [{ netPrice: 245.61, grossPrice: 302.1 }],
      va: [
        { attributeID: 44 },
        { attributeID: 45 },
        { attributeID: 46 },
        { attributeID: 47 },
        { attributeID: 48 },
        { attributeID: 49 },
        { attributeID: 50 },
        { attributeID: 51 }
      ],
      Attributes: [
        { property: 'Format dysku', value: '3.5"' },
        { property: 'Pojemność dysku [GB]', value: '1000' },
        { property: 'image', value: '/images/products/8/958503_0_i1064.jpeg' }
      ]
    },
    {
      productID: 9,
      quantity: 10,
      productName: 'Caviar Blue 500 GB 3.5" SATA III (WD5000AAKX)',
      Category: { categoryID: 1, categoryName: 'Dyski HDD' },
      Manufacturer: { manufacturerID: 1, manufacturerName: 'Western Digital' },
      Prices: [{ netPrice: 97.94, grossPrice: 120.47 }],
      va: [
        { attributeID: 52 },
        { attributeID: 53 },
        { attributeID: 54 },
        { attributeID: 55 },
        { attributeID: 56 },
        { attributeID: 57 }
      ],
      Attributes: [
        { property: 'Format dysku', value: '3.5"' },
        { property: 'Pojemność dysku [GB]', value: '500' },
        { property: 'image', value: '/images/products/9/353686_2_i1064.jpg' }
      ]
    },
    {
      productID: 10,
      quantity: 10,
      productName: 'Digital Black 1 TB 3.5" SATA III (WD1003FZEX)',
      Category: { categoryID: 1, categoryName: 'Dyski HDD' },
      Manufacturer: { manufacturerID: 1, manufacturerName: 'Western Digital' },
      Prices: [{ netPrice: 277.87, grossPrice: 341.78 }],
      va: [
        { attributeID: 59 },
        { attributeID: 60 },
        { attributeID: 61 },
        { attributeID: 62 },
        { attributeID: 63 },
        { attributeID: 64 }
      ],
      Attributes: [
        { property: 'Format dysku', value: '3.5"' },
        { property: 'Pojemność dysku [GB]', value: '1000' },
        { property: 'image', value: '/images/products/10/616526_3_i1064.jpg' }
      ]
    }
  ],
  filters: [
    {
      property: 'Certyfikat sprawności',
      numberOfProducts: 3,
      values: [{ property: 'Certyfikat sprawności', value: '80 Plus Bronze', numberOfProducts: 3 }]
    },
    {
      property: 'Chipset płyty',
      numberOfProducts: 7,
      values: [
        { property: 'Chipset płyty', value: 'AMD B450', numberOfProducts: 4 },
        { property: 'Chipset płyty', value: 'Intel B660', numberOfProducts: 2 },
        { property: 'Chipset płyty', value: 'Intel H370', numberOfProducts: 1 }
      ]
    },
    {
      property: 'Chłodzenie',
      numberOfProducts: 6,
      values: [{ property: 'Chłodzenie', value: 'Radiator', numberOfProducts: 6 }]
    },
    {
      property: 'Częstotliwość pracy [MHz]',
      numberOfProducts: 6,
      values: [
        { property: 'Częstotliwość pracy [MHz]', value: '5600', numberOfProducts: 1 },
        { property: 'Częstotliwość pracy [MHz]', value: '3333', numberOfProducts: 1 },
        { property: 'Częstotliwość pracy [MHz]', value: '3200', numberOfProducts: 4 }
      ]
    },
    {
      property: 'Częstotliwość taktowania [GHZ]',
      numberOfProducts: 18,
      values: [
        { property: 'Częstotliwość taktowania [GHZ]', value: '4.7', numberOfProducts: 2 },
        { property: 'Częstotliwość taktowania [GHZ]', value: '4.5', numberOfProducts: 1 },
        { property: 'Częstotliwość taktowania [GHZ]', value: '4.1', numberOfProducts: 1 },
        { property: 'Częstotliwość taktowania [GHZ]', value: '3.9', numberOfProducts: 1 },
        { property: 'Częstotliwość taktowania [GHZ]', value: '3.8', numberOfProducts: 1 },
        { property: 'Częstotliwość taktowania [GHZ]', value: '3.7', numberOfProducts: 4 },
        { property: 'Częstotliwość taktowania [GHZ]', value: '3.6', numberOfProducts: 5 },
        { property: 'Częstotliwość taktowania [GHZ]', value: '3.5', numberOfProducts: 1 },
        { property: 'Częstotliwość taktowania [GHZ]', value: '3.2', numberOfProducts: 1 },
        { property: 'Częstotliwość taktowania [GHZ]', value: '2.9', numberOfProducts: 1 }
      ]
    },
    {
      property: 'Długość karty [mm]',
      numberOfProducts: 12,
      values: [
        { property: 'Długość karty [mm]', value: '335', numberOfProducts: 1 },
        { property: 'Długość karty [mm]', value: '323', numberOfProducts: 2 },
        { property: 'Długość karty [mm]', value: '299', numberOfProducts: 1 },
        { property: 'Długość karty [mm]', value: '294', numberOfProducts: 2 },
        { property: 'Długość karty [mm]', value: '282', numberOfProducts: 1 },
        { property: 'Długość karty [mm]', value: '245', numberOfProducts: 1 },
        { property: 'Długość karty [mm]', value: '242', numberOfProducts: 1 },
        { property: 'Długość karty [mm]', value: '235', numberOfProducts: 1 },
        { property: 'Długość karty [mm]', value: '200', numberOfProducts: 1 },
        { property: 'Długość karty [mm]', value: '320,', numberOfProducts: 1 }
      ]
    },
    {
      property: 'Format dysku',
      numberOfProducts: 27,
      values: [
        { property: 'Format dysku', value: '2.5"', numberOfProducts: 14 },
        { property: 'Format dysku', value: '3.5"', numberOfProducts: 11 },
        { property: 'Format dysku', value: 'M.2', numberOfProducts: 2 }
      ]
    },
    {
      property: 'Gniazdo procesora',
      numberOfProducts: 7,
      values: [
        { property: 'Gniazdo procesora', value: 'Socket 1151', numberOfProducts: 1 },
        { property: 'Gniazdo procesora', value: 'Socket 1700', numberOfProducts: 2 },
        { property: 'Gniazdo procesora', value: 'Socket AM4', numberOfProducts: 4 }
      ]
    },
    {
      property: 'Ilość pamięci RAM [GB]',
      numberOfProducts: 12,
      values: [
        { property: 'Ilość pamięci RAM [GB]', value: '24', numberOfProducts: 3 },
        { property: 'Ilość pamięci RAM [GB]', value: '12', numberOfProducts: 4 },
        { property: 'Ilość pamięci RAM [GB]', value: '10', numberOfProducts: 1 },
        { property: 'Ilość pamięci RAM [GB]', value: '8', numberOfProducts: 4 }
      ]
    },
    {
      property: 'Interfejs',
      numberOfProducts: 33,
      values: [
        { property: 'Interfejs', value: 'PCI-Express x4 NVMe', numberOfProducts: 1 },
        { property: 'Interfejs', value: 'SATA', numberOfProducts: 1 },
        { property: 'Interfejs', value: 'SATA II', numberOfProducts: 1 },
        { property: 'Interfejs', value: 'SATA III', numberOfProducts: 25 },
        { property: 'Interfejs', value: 'USB', numberOfProducts: 5 }
      ]
    },
    {
      property: 'Jednostki teksturujące',
      numberOfProducts: 12,
      values: [
        { property: 'Jednostki teksturujące', value: '328', numberOfProducts: 3 },
        { property: 'Jednostki teksturujące', value: '272', numberOfProducts: 1 },
        { property: 'Jednostki teksturujące', value: '192', numberOfProducts: 1 },
        { property: 'Jednostki teksturujące', value: '184', numberOfProducts: 1 },
        { property: 'Jednostki teksturujące', value: '152', numberOfProducts: 2 },
        { property: 'Jednostki teksturujące', value: '112', numberOfProducts: 4 }
      ]
    },
    {
      property: 'Kolor',
      numberOfProducts: 11,
      values: [
        { property: 'Kolor', value: 'Biały', numberOfProducts: 1 },
        { property: 'Kolor', value: 'Czarny', numberOfProducts: 8 },
        { property: 'Kolor', value: 'Szary', numberOfProducts: 2 }
      ]
    },
    {
      property: 'Liczba rdzeni',
      numberOfProducts: 18,
      values: [
        { property: 'Liczba rdzeni', value: '16', numberOfProducts: 1 },
        { property: 'Liczba rdzeni', value: '12', numberOfProducts: 3 },
        { property: 'Liczba rdzeni', value: '10', numberOfProducts: 1 },
        { property: 'Liczba rdzeni', value: '8', numberOfProducts: 3 },
        { property: 'Liczba rdzeni', value: '6', numberOfProducts: 7 },
        { property: 'Liczba rdzeni', value: '4', numberOfProducts: 3 }
      ]
    },
    {
      property: 'Liczba slotów pamięci',
      numberOfProducts: 7,
      values: [
        { property: 'Liczba slotów pamięci', value: '4', numberOfProducts: 5 },
        { property: 'Liczba slotów pamięci', value: '2', numberOfProducts: 2 }
      ]
    },
    {
      property: 'Linia',
      numberOfProducts: 18,
      values: [
        { property: 'Linia', value: 'Core i3', numberOfProducts: 2 },
        { property: 'Linia', value: 'Core i5', numberOfProducts: 3 },
        { property: 'Linia', value: 'Core i7', numberOfProducts: 2 },
        { property: 'Linia', value: 'Core i9', numberOfProducts: 2 },
        { property: 'Linia', value: 'Ryzen 3', numberOfProducts: 1 },
        { property: 'Linia', value: 'Ryzen 5', numberOfProducts: 5 },
        { property: 'Linia', value: 'Ryzen 7', numberOfProducts: 1 },
        { property: 'Linia', value: 'Ryzen 9', numberOfProducts: 2 }
      ]
    },
    {
      property: 'Maksymalna długość gpu',
      numberOfProducts: 5,
      values: [
        { property: 'Maksymalna długość gpu', value: '42', numberOfProducts: 1 },
        { property: 'Maksymalna długość gpu', value: '36', numberOfProducts: 4 }
      ]
    },
    {
      property: 'Maksymalna ilość pamięci [GB]',
      numberOfProducts: 7,
      values: [
        { property: 'Maksymalna ilość pamięci [GB]', value: '128', numberOfProducts: 3 },
        { property: 'Maksymalna ilość pamięci [GB]', value: '64', numberOfProducts: 2 },
        { property: 'Maksymalna ilość pamięci [GB]', value: '32', numberOfProducts: 2 }
      ]
    },
    {
      property: 'Moc [W]',
      numberOfProducts: 3,
      values: [
        { property: 'Moc [W]', value: '850', numberOfProducts: 1 },
        { property: 'Moc [W]', value: '750', numberOfProducts: 1 },
        { property: 'Moc [W]', value: '650', numberOfProducts: 1 }
      ]
    },
    {
      property: 'Modularne okablowanie',
      numberOfProducts: 3,
      values: [
        { property: 'Modularne okablowanie', value: 'Nie', numberOfProducts: 1 },
        { property: 'Modularne okablowanie', value: 'Pół modularny', numberOfProducts: 1 },
        { property: 'Modularne okablowanie', value: 'W pełni modularny', numberOfProducts: 1 }
      ]
    },
    {
      property: 'Obsługa płyty',
      numberOfProducts: 6,
      values: [{ property: 'Obsługa płyty', value: 'Tacka', numberOfProducts: 6 }]
    },
    {
      property: 'Odblokowany mnożnik',
      numberOfProducts: 18,
      values: [
        { property: 'Odblokowany mnożnik', value: 'Nie', numberOfProducts: 4 },
        { property: 'Odblokowany mnożnik', value: 'Tak', numberOfProducts: 14 }
      ]
    },
    {
      property: 'Opóźnienie',
      numberOfProducts: 6,
      values: [
        { property: 'Opóźnienie', value: 'CL16', numberOfProducts: 2 },
        { property: 'Opóźnienie', value: 'CL18', numberOfProducts: 2 },
        { property: 'Opóźnienie', value: 'CL36', numberOfProducts: 2 }
      ]
    },
    {
      property: 'Pamięć podręczna',
      numberOfProducts: 15,
      values: [
        { property: 'Pamięć podręczna', value: '256', numberOfProducts: 3 },
        { property: 'Pamięć podręczna', value: '128', numberOfProducts: 3 },
        { property: 'Pamięć podręczna', value: '64', numberOfProducts: 5 },
        { property: 'Pamięć podręczna', value: '32', numberOfProducts: 1 },
        { property: 'Pamięć podręczna', value: '16', numberOfProducts: 2 },
        { property: 'Pamięć podręczna', value: '8', numberOfProducts: 1 }
      ]
    },
    {
      property: 'Podświetlenie',
      numberOfProducts: 11,
      values: [
        { property: 'Podświetlenie', value: 'Nie', numberOfProducts: 2 },
        { property: 'Podświetlenie', value: 'RGB', numberOfProducts: 4 },
        { property: 'Podświetlenie', value: 'Tak', numberOfProducts: 5 }
      ]
    },
    {
      property: 'Pojemność dysku [GB]',
      numberOfProducts: 27,
      values: [
        { property: 'Pojemność dysku [GB]', value: '8000', numberOfProducts: 2 },
        { property: 'Pojemność dysku [GB]', value: '4000', numberOfProducts: 1 },
        { property: 'Pojemność dysku [GB]', value: '2000', numberOfProducts: 3 },
        { property: 'Pojemność dysku [GB]', value: '1024', numberOfProducts: 2 },
        { property: 'Pojemność dysku [GB]', value: '1000', numberOfProducts: 7 },
        { property: 'Pojemność dysku [GB]', value: '512', numberOfProducts: 2 },
        { property: 'Pojemność dysku [GB]', value: '500', numberOfProducts: 4 },
        { property: 'Pojemność dysku [GB]', value: '480', numberOfProducts: 1 },
        { property: 'Pojemność dysku [GB]', value: '256', numberOfProducts: 1 },
        { property: 'Pojemność dysku [GB]', value: '250', numberOfProducts: 1 },
        { property: 'Pojemność dysku [GB]', value: '240', numberOfProducts: 2 },
        { property: 'Pojemność dysku [GB]', value: '120', numberOfProducts: 1 }
      ]
    },
    {
      property: 'Prędkość obrotowa [obr./min.]',
      numberOfProducts: 16,
      values: [
        { property: 'Prędkość obrotowa [obr./min.]', value: '7200', numberOfProducts: 10 },
        { property: 'Prędkość obrotowa [obr./min.]', value: '5400', numberOfProducts: 6 }
      ]
    },
    {
      property: 'Procesory strumieniowe',
      numberOfProducts: 12,
      values: [
        { property: 'Procesory strumieniowe', value: '10496', numberOfProducts: 3 },
        { property: 'Procesory strumieniowe', value: '8704', numberOfProducts: 1 },
        { property: 'Procesory strumieniowe', value: '6144', numberOfProducts: 1 },
        { property: 'Procesory strumieniowe', value: '5888', numberOfProducts: 1 },
        { property: 'Procesory strumieniowe', value: '4864', numberOfProducts: 2 },
        { property: 'Procesory strumieniowe', value: '3584', numberOfProducts: 4 }
      ]
    },
    {
      property: 'Przeznaczenie',
      numberOfProducts: 6,
      values: [
        { property: 'Przeznaczenie', value: 'Komputer stacjonarny', numberOfProducts: 1 },
        { property: 'Przeznaczenie', value: 'Zewnętrzny', numberOfProducts: 5 }
      ]
    },
    {
      property: 'Rdzenie Tensor',
      numberOfProducts: 12,
      values: [
        { property: 'Rdzenie Tensor', value: '328', numberOfProducts: 3 },
        { property: 'Rdzenie Tensor', value: '272', numberOfProducts: 1 },
        { property: 'Rdzenie Tensor', value: '192', numberOfProducts: 1 },
        { property: 'Rdzenie Tensor', value: '184', numberOfProducts: 1 },
        { property: 'Rdzenie Tensor', value: '152', numberOfProducts: 2 },
        { property: 'Rdzenie Tensor', value: '112', numberOfProducts: 4 }
      ]
    },
    {
      property: 'Rekomendowana moc zasilacza [W]',
      numberOfProducts: 12,
      values: [
        { property: 'Rekomendowana moc zasilacza [W]', value: '850', numberOfProducts: 1 },
        { property: 'Rekomendowana moc zasilacza [W]', value: '750', numberOfProducts: 5 },
        { property: 'Rekomendowana moc zasilacza [W]', value: '650', numberOfProducts: 1 },
        { property: 'Rekomendowana moc zasilacza [W]', value: '600', numberOfProducts: 2 },
        { property: 'Rekomendowana moc zasilacza [W]', value: '550', numberOfProducts: 3 }
      ]
    },
    {
      property: 'Rodzaj chipsetu',
      numberOfProducts: 12,
      values: [
        { property: 'Rodzaj chipsetu', value: 'GeForce RTX 3060', numberOfProducts: 4 },
        { property: 'Rodzaj chipsetu', value: 'GeForce RTX 3060 Ti', numberOfProducts: 2 },
        { property: 'Rodzaj chipsetu', value: 'GeForce RTX 3070 Ti', numberOfProducts: 2 },
        { property: 'Rodzaj chipsetu', value: 'GeForce RTX 3080', numberOfProducts: 1 },
        { property: 'Rodzaj chipsetu', value: 'GeForce RTX 3090', numberOfProducts: 3 }
      ]
    },
    {
      property: 'Rodzaj kości pamięci',
      numberOfProducts: 9,
      values: [
        { property: 'Rodzaj kości pamięci', value: 'MLC', numberOfProducts: 1 },
        { property: 'Rodzaj kości pamięci', value: 'TLC', numberOfProducts: 8 }
      ]
    },
    {
      property: 'Średnica wentylatora [mm]',
      numberOfProducts: 3,
      values: [
        { property: 'Średnica wentylatora [mm]', value: '135', numberOfProducts: 2 },
        { property: 'Średnica wentylatora [mm]', value: '120', numberOfProducts: 1 }
      ]
    },
    {
      property: 'Standard pamięci',
      numberOfProducts: 7,
      values: [{ property: 'Standard pamięci', value: 'DDR4', numberOfProducts: 7 }]
    },
    {
      property: 'Standard płyty',
      numberOfProducts: 7,
      values: [
        { property: 'Standard płyty', value: 'ATX', numberOfProducts: 4 },
        { property: 'Standard płyty', value: 'Micro ATX', numberOfProducts: 3 }
      ]
    },
    {
      property: 'Standard/Format',
      numberOfProducts: 3,
      values: [{ property: 'Standard/Format', value: 'ATX', numberOfProducts: 3 }]
    },
    {
      property: 'Szybkość odczytu [MB/s]',
      numberOfProducts: 10,
      values: [
        { property: 'Szybkość odczytu [MB/s]', value: '3400', numberOfProducts: 1 },
        { property: 'Szybkość odczytu [MB/s]', value: '560', numberOfProducts: 5 },
        { property: 'Szybkość odczytu [MB/s]', value: '550', numberOfProducts: 2 },
        { property: 'Szybkość odczytu [MB/s]', value: '520', numberOfProducts: 1 },
        { property: 'Szybkość odczytu [MB/s]', value: '480', numberOfProducts: 1 }
      ]
    },
    {
      property: 'Szybkość zapisu [MB/s]',
      numberOfProducts: 11,
      values: [
        { property: 'Szybkość zapisu [MB/s]', value: '2300', numberOfProducts: 1 },
        { property: 'Szybkość zapisu [MB/s]', value: '560', numberOfProducts: 1 },
        { property: 'Szybkość zapisu [MB/s]', value: '530', numberOfProducts: 1 },
        { property: 'Szybkość zapisu [MB/s]', value: '520', numberOfProducts: 4 },
        { property: 'Szybkość zapisu [MB/s]', value: '500', numberOfProducts: 3 },
        { property: 'Szybkość zapisu [MB/s]', value: '480', numberOfProducts: 1 }
      ]
    },
    {
      property: 'Taktowanie rdzenia [MHz]',
      numberOfProducts: 12,
      values: [
        { property: 'Taktowanie rdzenia [MHz]', value: '1575', numberOfProducts: 1 },
        { property: 'Taktowanie rdzenia [MHz]', value: '1500', numberOfProducts: 1 },
        { property: 'Taktowanie rdzenia [MHz]', value: '1440', numberOfProducts: 1 },
        { property: 'Taktowanie rdzenia [MHz]', value: '1410', numberOfProducts: 2 },
        { property: 'Taktowanie rdzenia [MHz]', value: '1400', numberOfProducts: 2 },
        { property: 'Taktowanie rdzenia [MHz]', value: '1395', numberOfProducts: 1 },
        { property: 'Taktowanie rdzenia [MHz]', value: '1320', numberOfProducts: 4 }
      ]
    },
    {
      property: 'Typ chłodzenia',
      numberOfProducts: 3,
      values: [{ property: 'Typ chłodzenia', value: 'Aktywne - wentylator', numberOfProducts: 3 }]
    },
    {
      property: 'Typ gniazda',
      numberOfProducts: 18,
      values: [
        { property: 'Typ gniazda', value: 'Socket 1200', numberOfProducts: 6 },
        { property: 'Typ gniazda', value: 'Socket 1700', numberOfProducts: 3 },
        { property: 'Typ gniazda', value: 'Socket AM4', numberOfProducts: 6 },
        { property: 'Typ gniazda', value: 'Socket AM5', numberOfProducts: 3 }
      ]
    },
    {
      property: 'Typ napędu',
      numberOfProducts: 6,
      values: [{ property: 'Typ napędu', value: 'CD, DVD', numberOfProducts: 6 }]
    },
    {
      property: 'Typ obudowy',
      numberOfProducts: 5,
      values: [{ property: 'Typ obudowy', value: 'Midi Tower', numberOfProducts: 5 }]
    },
    {
      property: 'Typ pamięci',
      numberOfProducts: 6,
      values: [
        { property: 'Typ pamięci', value: 'DDR4', numberOfProducts: 5 },
        { property: 'Typ pamięci', value: 'DDR5', numberOfProducts: 1 }
      ]
    },
    {
      property: 'Typ złącza',
      numberOfProducts: 18,
      values: [
        { property: 'Typ złącza', value: 'DIMM', numberOfProducts: 5 },
        { property: 'Typ złącza', value: 'PCI Express 4.0 x16', numberOfProducts: 12 },
        { property: 'Typ złącza', value: 'UDIMM', numberOfProducts: 1 }
      ]
    },
    {
      property: 'USB 3.0',
      numberOfProducts: 5,
      values: [
        { property: 'USB 3.0', value: '2', numberOfProducts: 2 },
        { property: 'USB 3.0', value: '1', numberOfProducts: 3 }
      ]
    },
    {
      property: 'USB Typ-C',
      numberOfProducts: 5,
      values: [
        { property: 'USB Typ-C', value: '1', numberOfProducts: 2 },
        { property: 'USB Typ-C', value: '0', numberOfProducts: 3 }
      ]
    },
    {
      property: 'Waga [g]',
      numberOfProducts: 6,
      values: [
        { property: 'Waga [g]', value: '650', numberOfProducts: 1 },
        { property: 'Waga [g]', value: '300', numberOfProducts: 1 },
        { property: 'Waga [g]', value: '250', numberOfProducts: 1 },
        { property: 'Waga [g]', value: '220', numberOfProducts: 1 },
        { property: 'Waga [g]', value: '200', numberOfProducts: 2 }
      ]
    },
    {
      property: 'Wentylatory',
      numberOfProducts: 5,
      values: [
        { property: 'Wentylatory', value: '4', numberOfProducts: 1 },
        { property: 'Wentylatory', value: '3', numberOfProducts: 3 },
        { property: 'Wentylatory', value: '1', numberOfProducts: 1 }
      ]
    },
    {
      property: 'wolne miejsca na wenty.',
      numberOfProducts: 4,
      values: [
        { property: 'wolne miejsca na wenty.', value: '5', numberOfProducts: 1 },
        { property: 'wolne miejsca na wenty.', value: '4', numberOfProducts: 1 },
        { property: 'wolne miejsca na wenty.', value: '2', numberOfProducts: 2 }
      ]
    },
    {
      property: 'Załączone chłodzenie',
      numberOfProducts: 18,
      values: [
        { property: 'Załączone chłodzenie', value: 'Nie', numberOfProducts: 10 },
        { property: 'Załączone chłodzenie', value: 'Tak', numberOfProducts: 8 }
      ]
    },
    {
      property: 'Łączna pojemność [GB]',
      numberOfProducts: 6,
      values: [
        { property: 'Łączna pojemność [GB]', value: '32', numberOfProducts: 1 },
        { property: 'Łączna pojemność [GB]', value: '16', numberOfProducts: 5 }
      ]
    }
  ],
  categories: [
    { categoryName: 'Dyski HDD', categoryID: 1, numberOfProducts: 16 },
    { categoryName: 'Dyski SSD', categoryID: 2, numberOfProducts: 11 },
    { categoryName: 'Karty graficzne', categoryID: 3, numberOfProducts: 12 },
    { categoryName: 'Obudowy', categoryID: 5, numberOfProducts: 5 },
    { categoryName: 'Pamięci RAM', categoryID: 6, numberOfProducts: 6 },
    { categoryName: 'Napędy optyczne', categoryID: 4, numberOfProducts: 6 },
    { categoryName: 'Płyty główne', categoryID: 7, numberOfProducts: 7 },
    { categoryName: 'Zasilacze', categoryID: 9, numberOfProducts: 3 },
    { categoryName: 'Procesory', categoryID: 8, numberOfProducts: 18 }
  ],
  manufacturers: [
    { ManufacturerName: 'Seagate', ManufacturerID: 3, numberOfProducts: 8 },
    { ManufacturerName: 'Toshiba', ManufacturerID: 2, numberOfProducts: 4 },
    { ManufacturerName: 'Western Digital', ManufacturerID: 1, numberOfProducts: 5 },
    { ManufacturerName: 'Patriot', ManufacturerID: 24, numberOfProducts: 1 },
    { ManufacturerName: 'Transcend', ManufacturerID: 5, numberOfProducts: 1 },
    { ManufacturerName: 'Intel', ManufacturerID: 4, numberOfProducts: 10 },
    { ManufacturerName: 'Gigabyte', ManufacturerID: 10, numberOfProducts: 10 },
    { ManufacturerName: 'ADATA', ManufacturerID: 8, numberOfProducts: 3 },
    { ManufacturerName: 'Kingston', ManufacturerID: 7, numberOfProducts: 1 },
    { ManufacturerName: 'Samsung', ManufacturerID: 6, numberOfProducts: 2 },
    { ManufacturerName: 'Asus', ManufacturerID: 9, numberOfProducts: 5 },
    { ManufacturerName: 'Gainward', ManufacturerID: 26, numberOfProducts: 1 },
    { ManufacturerName: 'MSI', ManufacturerID: 11, numberOfProducts: 5 },
    { ManufacturerName: 'Palit', ManufacturerID: 12, numberOfProducts: 1 },
    { ManufacturerName: 'Corsair', ManufacturerID: 18, numberOfProducts: 7 },
    { ManufacturerName: 'be quiet!', ManufacturerID: 27, numberOfProducts: 1 },
    { ManufacturerName: 'SilentiumPC', ManufacturerID: 20, numberOfProducts: 1 },
    { ManufacturerName: 'Lexar', ManufacturerID: 28, numberOfProducts: 1 },
    { ManufacturerName: 'G.Skill', ManufacturerID: 21, numberOfProducts: 1 },
    { ManufacturerName: 'Gembird', ManufacturerID: 29, numberOfProducts: 1 },
    { ManufacturerName: 'Lite-On', ManufacturerID: 30, numberOfProducts: 1 },
    { ManufacturerName: 'LG', ManufacturerID: 14, numberOfProducts: 1 },
    { ManufacturerName: 'ASRock', ManufacturerID: 25, numberOfProducts: 3 },
    { ManufacturerName: 'EVGA', ManufacturerID: 32, numberOfProducts: 1 },
    { ManufacturerName: 'AMD', ManufacturerID: 35, numberOfProducts: 9 }
  ],
  numberOfProducts: 84,
  activePage: 4,
  NumberOfpages: 9,
  minPrice: 89.99,
  maxPrice: 7679
};

export const sortSettings = {
  productLimit: 10,
  productSort: 'domyślne',
  productPage: 1
};
