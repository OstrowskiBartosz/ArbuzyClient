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

export const profielUserData = {
  ZIPCode: '45-256',
  cityName: 'Opole',
  companyName: null,
  firstName: 'Bartosz',
  lastName: 'Ostrowski',
  streetName: 'Ozimska 215/55'
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

export const searchHintsProductsWithB = {
  products: [
    {
      productID: 1,
      productName: 'Barracuda 1 TB 3.5" SATA III (ST1000DM010)'
    },
    {
      productID: 2,
      productName: 'P300 2 TB 3.5" SATA III (HDWD120UZSVA)'
    },
    {
      productID: 3,
      productName: 'Barracuda 1 TB 2.5" SATA III (ST1000LM048)'
    },
    {
      productID: 4,
      productName: 'Blue 500 GB 2.5" SATA III (WD5000LPCX)'
    },
    {
      productID: 5,
      productName: '4 TB 3.5" SATA III X300 (HDWE140UZSVA)'
    },
    {
      productID: 6,
      productName: 'P300 2 TB 3.5" SATA III (HDWD120UZSVA)'
    },
    {
      productID: 7,
      productName: '500 GB 2.5" SATA II (MQ01ABD050)'
    },
    {
      productID: 8,
      productName: 'FireCuda 1 TB 3.5" SATA III (ST1000DX002)'
    },
    {
      productID: 9,
      productName: 'Caviar Blue 500 GB 3.5" SATA III (WD5000AAKX)'
    },
    {
      productID: 10,
      productName: 'Digital Black 1 TB 3.5" SATA III (WD1003FZEX)'
    }
  ]
};
export const searchHintsCategoriesWithB = [{ categoryID: 5, categoryName: 'Obudowy' }];
export const searchHintsManufacturersWithB = [
  { manufacturerID: 2, manufacturerName: 'Toshiba' },
  { manufacturerID: 10, manufacturerName: 'Gigabyte' },
  { manufacturerID: 23, manufacturerName: 'Ballistix' },
  { manufacturerID: 27, manufacturerName: 'be quiet!' },
  { manufacturerID: 29, manufacturerName: 'Gembird' },
  { manufacturerID: 31, manufacturerName: 'Biostar' }
];

export const searchHintsProductsWithBar = {
  products: [
    {
      productID: 1,
      productName: 'Barracuda 1 TB 3.5" SATA III (ST1000DM010)'
    },
    {
      productID: 3,
      productName: 'Barracuda 1 TB 2.5" SATA III (ST1000LM048)'
    },
    {
      productID: 11,
      productName: 'Barracuda 2 TB 3.5" SATA III (ST2000DM008)'
    },
    {
      productID: 12,
      productName: 'Barracuda 8 TB 3.5" SATA III (ST8000DM004)'
    },
    {
      productID: 13,
      productName: 'Barracuda Pro 1 TB 2.5" SATA III (ST1000LM049)'
    },
    {
      productID: 15,
      productName: 'Barracuda 8 TB 3.5" SATA III (ST8000DM004)'
    },
    {
      productID: 20,
      productName: 'BarraCuda 250GB 2.5" SATA3 (ZA250CM1A002)'
    }
  ]
};
export const searchHintsCategoriesWithBar = [];
export const searchHintsManufacturersWithBar = [];

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
