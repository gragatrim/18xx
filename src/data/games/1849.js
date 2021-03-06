const game = {
  // Generic Game Info
  info: {
    title: "1849",
    subtitle: "The Game of Sicilian Railways",
    designer: "Federico Vellani",
    background: "water",
    width: 150,
    orientation: "horizontal",
    titleY: 900,
    titleX: 25,
    extraTokens: 2,
    color_5: "water"
  },

  tokens: ["Round", "+L.20", "+L.20", "#port", "#port"],

  bank: "L.7,760",

  players: [{
    number: 3,
    certLimit: 12,
    capital: "L.500"
  },{
    number: 4,
    certLimit: "9/11",
    capital: "L.375"
  },{
    number: 5,
    certLimit: 9,
    capital: "L.300"
  }],

  privates: [
    {
      name: "Società Corriere Etnee",
      price: "L.20",
      revenue: "L.5",
      description:
        "A Corporation cannot build track in the Acireale hex until this Company is either eliminated or bought by any Corporation."
    },
    {
      name: "Studio di Ingegneria Giuseppe Incorpora",
      price: "L.45",
      revenue: "L.10",
      description:
        "The owning Corporation can lay or upgrade standard gauge track at half cost on Mountain, Hill or Rough hexes. Narrow gauge track is still at normal cost."
    },
    {
      name: "Compagnia Navale Mediterranea",
      price: "L.75",
      revenue: "L.15",
      description:
        "The owning Corporation can place the +L. 20 token on any port. This action closes the Company but the Corporation adds L. 20 to the revenue of the port until the end of the game."
    },
    {
      name: "Società Marittima Siciliana",
      price: "L.110",
      revenue: "L.20",
      description:
        "The owning Corporation can place a tile and a token on a coastal city, even if that city is not connected to one of its railheads, subject to all other limitations described on rule 4.2. This action closes the Company, and is made instead of the regular Track Laying and Token Laying Steps."
    },
    {
      name: "Reale Società d'Affari",
      price: "L.150",
      revenue: "L.25",
      description:
        "When a player buys the R.S.A. they immediately open the first available corporation and get the president's certificate. The R.S.A. is eliminated when the Corporation buys its first train."
    }
  ],

  tiles: {
    // Yellow
    "3": 4,
    "4": 4,
    "7": 4,
    "8": 10,
    "9": 6,
    "58": 4,
    "73": 4,
    "74": 3,
    "77": 4,
    "78": 10,
    "79": 7,
    "644": 2,
    "645": 2,
    "657": 2,
    "658": 2,
    "659": 2,
    "679": 2,
    // Green
    "23": 3,
    "24": 3,
    "25": 2,
    "26": 1,
    "27": 1,
    "28": 1,
    "29": 1,
    "30": 1,
    "31": 1,
    "624": 1,
    "650": 1,
    "651": 1,
    "653": 1,
    "655": 1,
    "660": 1,
    "661": 1,
    "662": 1,
    "663": 1,
    "664": 1,
    "665": 1,
    "666": 1,
    "667": 1,
    "668": 1,
    "669": 1,
    "670": 1,
    "671": 1,
    "675": 1,
    "677": 3,
    "678": 3,
    "680": 1,
    "681": 1,
    "682": 1,
    "683": 1,
    "684": 1,
    "685": 1,
    "686": 1,
    "687": 1,
    "688": 1,
    "689": 1,
    "690": 1,
    "691": 1,
    "692": 1,
    "693": 1,
    "694": 1,
    "695": 1,
    "699": 2,
    "700": 1,
    "701": 1,
    "702": 1,
    "703": 1,
    "704": 1,
    "705": 1,
    "706": 1,
    "707": 1,
    "708": 1,
    "709": 1,
    "710": 1,
    "711": 1,
    "712": 1,
    "713": 1,
    "714": 1,
    "715": 1,
    // Brown
    "39": 1,
    "40": 1,
    "41": 1,
    "42": 1,
    "646": 1,
    "647": 1,
    "648": 1,
    "649": 1,
    "652": 1,
    "654": 1,
    "656": 1,
    "672": 1,
    "673": 2,
    "674": 2,
    "676": 1,
    "696": 3,
    "697": 2,
    "698": 2,
  },

  stock: {
    type: "2D",
    market: [
      [
        72,
        83,
        95,
        107,
        120,
        133,
        147,
        164,
        182,
        202,
        224,
        248,
        276,
        {color:"cyan",label:306},
        {color:"cyan",label:340},
        {color:"cyan",label:377}
      ],
      [
        63,
        72,
        82,
        93,
        104,
        116,
        128,
        142,
        158,
        175,
        195,
        { label: 216, color: "brown" },
        { label: 240, arrow: "up", arrowColor: "cyan" },
        {color:"cyan",label:266},
        {color:"cyan",label:295},
        {color:"cyan",label:328}
      ],
      [
        57,
        66,
        75,
        84,
        95,
        105,
        117,
        129,
        { label: 144, color: "green" },
        159,
        177,
        196,
        { label: 218, arrow: "up", arrowColor: "cyan" },
        {color:"cyan",label:242},
        {color:"cyan",label:269},
        {color:"cyan",label:298}
      ],
      [
        54,
        62,
        71,
        80,
        90,
        { label: 100, color: "yellow" },
        111,
        123,
        137,
        152,
        169,
        187,
        208,
        230
      ],
      [
        52,
        59,
        { label: 68, color: "yellow" },
        77,
        86,
        95,
        106,
        117,
        130,
        145,
        160,
        178,
        198
      ],
      [47, 54, 62, 70, 78, 87, 96, 107, 118, 131, 146, 162],
      [41, 47, 54, 61, 68, 75, 84, 93, 103, 114, 127],
      [34, 39, 45, 50, 57, 63, 70, 77, 86, 95],
      [27, 31, 36, 40, 45, 50, 56],
      [{ label: "Closed", color: "black" }, 24, 27, 31]
    ],
    limits: []
  },

  pools: [
    {
      name: "Bank Pool",
      notes: [
        {
          color: "water",
          note: "Shares in the bank pool pay dividends to the bank"
        },
        {
          color: "red",
          icon: "times",
          note: "Unoperated companies may not be sold"
        }
      ]
    }
  ],

  trains: [
    {
      name: "4H",
      quantity: 4,
      price: "L.100",
      color: "yellow",
      info: [
        {
          color: "green",
          note: "Rusted by 8H"
        }
      ]
    },
    {
      name: "6H",
      quantity: 4,
      price: "L.200",
      color: "green",
      info: [
        {
          color: "brown",
          note: "Rusted by 10H"
        }
      ]
    },
    {
      name: "8H",
      quantity: 3,
      price: "L.350",
      color: "green",
      info: [
        {
          color: "brown",
          note: "Rusted by 16H"
        }
      ]
    },
    {
      name: "10H",
      quantity: 2,
      price: "L.550",
      color: "brown",
      info: [
        {
          color: "yellow",
          note: "Permanent"
        }
      ]
    },
    {
      name: "12H",
      quantity: 1,
      price: "L.800",
      color: "brown",
      info: [
        {
          color: "yellow",
          note: "Permanent"
        }
      ]
    },
    {
      name: "16H",
      quantity: 5,
      price: "L.1100",
      color: "brown",
      info: [
        {
          color: "yellow",
          note: "Permanent"
        }
      ]
    },
    {
      name: "R6H",
      quantity: 2,
      price: "L.350",
      color: "brown",
      info: [
        {
          color: "yellow",
          note: "Permanent"
        }
      ]
    }
  ],

  rounds: [
    {
      name: "OR3",
      color: "brown"
    },
    {
      name: "OR2",
      color: "green"
    },
    {
      name: "OR1",
      color: "yellow"
    },
    {
      name: "SR",
      color: "gray"
    }
  ],

  turns: [
    {
      name: "Stock Round",
      steps: [
        "Sell any number of certificates",
        "Buy one certificate or start company"
      ],
      ordered: true
    },
    {
      name: "Operating Round",
      steps: [
        "Lay track",
        "Please one token",
        "Run trains",
        "Purchase trains",
        "Sell treasury stock",
        "Buy back treasury stock"
      ],
      ordered: true
    }
  ],

  phases: [
    {
      phase: "4",
      train: "4H",
      limit: "4",
      number: "4",
      tiles: "yellow"
    },
    {
      phase: "6",
      train: "6H",
      limit: "4",
      number: "3/4",
      tiles: "green",
      notes: "Private companies can be bought"
    },
    {
      phase: "8",
      train: "8H",
      rust: "4H",
      limit: "3",
      number: "2/3",
      tiles: "green"
    },
    {
      phase: "10",
      train: "10H",
      rust: "6H",
      limit: "2",
      number: "2",
      tiles: "brown"
    },
    {
      phase: "12",
      train: "12H",
      limit: "2",
      number: "1",
      tiles: "brown",
      notes: "Private companies close, Messina Earthquake"
    },
    {
      phase: "16",
      train: ["16H", "R6H"],
      limit: "2",
      number: ["4/5", "2"],
      rust: "8H",
      tiles: "brown",
      notes: "Stock market tokens can advance in the blue zone"
    }
  ],
  companies: [
    {
      name: "Azienda Ferroviaria Garibaldi",
      abbrev: "AFG",
      tokens: ["L.40", "", ""],
      color: "red",
      shares: [
        {
          quantity: 1,
          label: "President Certificate",
          percent: 20,
          shares: 2
        },
        {
          quantity: 6,
          percent: 10,
          shares: 1
        },
        {
          quantity: 1,
          label: "Double Certificate",
          percent: 20,
          shares: 2
        }
      ]
    },
    {
      name: "Aziena Trasporti Archimede",
      abbrev: "ATA",
      tokens: ["L.30", "", ""],
      color: "green",
      shares: [
        {
          quantity: 1,
          label: "President Certificate",
          percent: 20,
          shares: 2
        },
        {
          quantity: 6,
          percent: 10,
          shares: 1
        },
        {
          quantity: 1,
          label: "Double Certificate",
          percent: 20,
          shares: 2
        }
      ]
    },
    {
      name: "Compagnia Trasporti Lilibeo",
      abbrev: "CTL",
      tokens: ["L.40", "", ""],
      color: "yellow",
      shares: [
        {
          quantity: 1,
          label: "President Certificate",
          percent: 20,
          shares: 2
        },
        {
          quantity: 6,
          percent: 10,
          shares: 1
        },
        {
          quantity: 1,
          label: "Double Certificate",
          percent: 20,
          shares: 2
        }
      ]
    },
    {
      name: "Impresa Ferroviaria Trinacria",
      abbrev: "IFT",
      tokens: ["L.90", "", ""],
      color: "blue",
      shares: [
        {
          quantity: 1,
          label: "President Certificate",
          percent: 20,
          shares: 2
        },
        {
          quantity: 6,
          percent: 10,
          shares: 1
        },
        {
          quantity: 1,
          label: "Double Certificate",
          percent: 20,
          shares: 2
        }
      ]
    },
    {
      name: "Rete Centrale Sicula",
      abbrev: "RCS",
      tokens: ["L.130", "", ""],
      color: "orange",
      shares: [
        {
          quantity: 1,
          label: "President Certificate",
          percent: 20,
          shares: 2
        },
        {
          quantity: 6,
          percent: 10,
          shares: 1
        },
        {
          quantity: 1,
          label: "Double Certificate",
          percent: 20,
          shares: 2
        }
      ]
    },
    {
      name: "Societa Ferroviaria Akragas",
      abbrev: "SFA",
      tokens: ["L.40", "", ""],
      color: "pink",
      shares: [
        {
          quantity: 1,
          label: "President Certificate",
          percent: 20,
          shares: 2
        },
        {
          quantity: 6,
          percent: 10,
          shares: 1
        },
        {
          quantity: 1,
          label: "Double Certificate",
          percent: 20,
          shares: 2
        }
      ]
    }
  ],

  map: {
    print: "landscape",
    hexes: [
      {
        color: "water",
        offBoardTrack: [{ side: 6 }],
        icons: [{ type: "port" }],
        values: [{ value: 20, angle: 180, percent: 0.58 }],
        hexes: ["L1"]
      },
      {
        color: "water",
        offBoardTrack: [{ side: 1 }],
        icons: [{ type: "port" }],
        values: [{ value: 10, angle: 180, percent: 0.58 }],
        hexes: ["E2"]
      },
      {
        color: "gray",
        values: [
          {
            value: 10,
            angle: 60,
            percent: 0.6
          }
        ],
        centerTowns: [
          {
            name: {
              name: "Milazzo",
              rotation: 30
            }
          }
        ],
        track: [{ side: 1 }, { side: 3 }, { side: 6 }],
        hexes: ["M2"]
      },
      {
        color: "gray",
        divides: [{}],
        track: [{ type: "sharp", gauge: "double", side: 1 }],
        hexes: ["O2"]
      },
      {
        copy: "D3",
        mountain: {
          size: "small",
          cost: "L.40"
        },
        hexes: ["B3"]
      },
      {
        color: "plain",
        borders: [
          {
            side: 2,
            color: "water"
          }
        ],
        hexes: ["D3", "G4"]
      },
      {
        color: "plain",
        hexes: ["L3", "N5", "B9", "L11", "H13", "K16"]
      },
      {
        color: "yellow",
        values: [
          {
            value: 30,
            angle: 180,
            percent: 0.667
          }
        ],
        labels: [
          {
            label: "M",
            angle: 90,
            percent: 0.667
          }
        ],
        cities: [
          {
            name: {
              name: "Messina",
              rotation: 90
            }
          }
        ],
        track: [{ side: 1 }],
        hexes: ["N3"]
      },
      {
        color: "gray",
        cities: [
          {
            name: {
              name: "Trapani",
              rotation: -90
            }
          }
        ],
        offBoardRevenue: {
          angle: 180,
          percent: 0.65,
          revenues: [
            {
              color: "white",
              cost: "20"
            },
            {
              color: "white",
              cost: "30"
            },
            {
              color: "white",
              cost: "40"
            }
          ]
        },
        borders: [
          {
            side: 5,
            color: "water"
          }
        ],
        track: [{ side: 1, gauge: "double" }, { side: 6, gauge: "double" }],
        hexes: ["A4"]
      },
      {
        color: "plain",
        centerTowns: [
          {
            name: {
              name: "Alcamo"
            }
          }
        ],
        borders: [
          {
            side: 5,
            color: "water"
          }
        ],
        hexes: ["C4"]
      },
      {
        color: "yellow",
        values: [
          {
            value: 50,
            angle: 210,
            percent: 0.75
          }
        ],
        labels: [{ label: "P", angle: 150, percent: 0.8 }],
        cities: [
          {
            companies: [
              {
                label: "RCS",
                color: "orange"
              }
            ],
            name: {
              name: "Palermo",
              reverse: true,
              rotation: 30
            }
          }
        ],
        track: [{ side: 3 }, { side: 4 }, { side: 6 }],
        hexes: ["E4"]
      },
      {
        color: "gray",
        values: [
          {
            value: 10,
            angle: 180,
            percent: 0.667
          }
        ],
        centerTowns: [
          {
            name: {
              name: "St. Stefano"
            }
          }
        ],
        track: [{ side: 2 }, { side: 6 }, { side: 1, gauge: "narrow" }],
        hexes: ["I4"]
      },
      {
        color: "plain",
        borders: [
          {
            side: 1,
            color: "mountain"
          }
        ],
        hexes: ["K4"]
      },
      {
        color: "gray",
        track: [
          { type: "sharp", side: 3 },
          { type: "straight", side: 2, gauge: "narrow" }
        ],
        hexes: ["M4"]
      },
      {
        color: "gray",
        centerTowns: [
          {
            name: {
              name: "Calabria",
              reverse: true
            }
          }
        ],
        offBoardRevenue: {
          angle: 180,
          percent: 0.65,
          revenues: [
            {
              color: "white",
              cost: "10"
            },
            {
              color: "white",
              cost: "30"
            },
            {
              color: "white",
              cost: "90"
            }
          ]
        },
        track: [{ side: 4, gauge: "double" }],
        hexes: ["O4"]
      },
      {
        color: "plain",
        mountain: {
          size: "large",
          cost: "L.160"
        },
        hexes: ["B5", "L5", "B7", "D7", "E8", "K8", "H11", "L13"]
      },
      {
        color: "plain",
        centerTowns: [
          {
            angle: 180,
            percent: 0.333,
            name: {
              name: "Partinico"
            }
          }
        ],
        mountain: {
          size: "small",
          cost: "L.40",
          percent: 0.333
        },
        hexes: ["D5"]
      },
      {
        color: "plain",
        borders: [
          {
            side: 5,
            color: "water"
          }
        ],
        hexes: ["F5"]
      },
      {
        color: "plain",
        borders: [
          {
            side: 1,
            color: "mountain"
          },
          {
            side: 2,
            color: "mountain"
          },
          {
            side: 6,
            color: "mountain"
          }
        ],
        hexes: ["H5", "J5"]
      },
      {
        color: "gray",
        cities: [
          {
            companies: [
              {
                label: "CTL",
                color: "yellow"
              }
            ],
            name: {
              name: "Marsala",
              rotation: -90
            }
          }
        ],
        offBoardRevenue: {
          angle: 180,
          percent: 0.65,
          revenues: [
            {
              color: "white",
              cost: "20"
            },
            {
              color: "white",
              cost: "30"
            },
            {
              color: "white",
              cost: "40"
            }
          ]
        },
        track: [
          { side: 1, gauge: "double" },
          { side: 4, gauge: "double" },
          { side: 5, gauge: "double" },
          { side: 6, gauge: "double" }
        ],
        hexes: ["A6"]
      },
      {
        color: "plain",
        mountain: {
          size: "medium",
          cost: "L.80"
        },
        hexes: ["C6", "F7", "G8", "E10"]
      },
      {
        copy: "D5",
        mountain: {
          size: "large",
          cost: "L.160"
        },
        centerTowns: [
          {
            name: {
              name: "Corleone"
            }
          }
        ],
        hexes: ["E6"]
      },
      {
        copy: "C4",
        centerTowns: [
          {
            name: {
              name: "Termini Imerese"
            }
          }
        ],
        borders: [
          {
            side: 5,
            color: "mountain"
          }
        ],
        hexes: ["G6"]
      },
      {
        color: "plain",
        mountain: {
          size: "large",
          cost: "L.160"
        },
        borders: [
          {
            side: 3,
            color: "mountain"
          },
          {
            side: 5,
            color: "mountain"
          }
        ],
        hexes: ["I6"]
      },
      {
        copy: "E6",
        centerTowns: [
          {
            name: {
              name: "Bronte"
            }
          }
        ],
        mountain: {
          cost: "L.160"
        },
        borders: [
          {
            side: 3,
            color: "mountain"
          },
          {
            side: 4,
            color: "mountain"
          }
        ],
        hexes: ["K6"]
      },
      {
        color: "gray",
        values: [
          {
            value: 10,
            angle: 60,
            percent: 0.6
          }
        ],
        centerTowns: [
          {
            name: {
              name: "Taormina",
              reverse: true,
              rotation: -60,
              y: 20
            }
          }
        ],
        track: [{ side: 3, gauge: "narrow" }, { side: 5 }, { side: 1 }],
        hexes: ["M6"]
      },
      {
        color: "plain",
        mountain: {
          cost: "L.160",
          size: "large"
        },
        borders: [
          {
            side: 4,
            color: "mountain"
          }
        ],
        hexes: ["H7"]
      },
      {
        copy: "E6",
        borders: [
          {
            side: 4,
            color: "mountain"
          }
        ],
        centerTowns: [
          {
            name: {
              name: "Troina"
            }
          }
        ],
        mountain: {
          cost: "L.160",
          size: "large"
        },
        hexes: ["J7"]
      },
      {
        color: "gray",
        hexes: ["L7"]
      },
      {
        color: "plain",
        centerTowns: [
          {
            name: {
              name: "Mazzara"
            }
          }
        ],
        hexes: ["A8"]
      },
      {
        color: "plain",
        centerTowns: [
          {
            name: {
              name: "Castelvetrano"
            }
          }
        ],
        hexes: ["C8"]
      },
      {
        copy: "D5",
        mountain: {
          size: "medium",
          cost: "L.80"
        },
        centerTowns: [
          {
            name: {
              name: "Castrogiovanni"
            }
          }
        ],
        hexes: ["I8"]
      },
      {
        color: "plain",
        centerTowns: [
          {
            percent: 0.3333,
            name: {
              name: "Acireale"
            }
          }
        ],
        companies: [
          {
            label: "SCE",
            angle: 180,
            percent: 0.3333
          }
        ],
        hexes: ["M8"]
      },
      {
        copy: "D5",
        mountain: {
          size: "medium",
          cost: "L.80"
        },
        centerTowns: [
          {
            name: {
              name: "Sciacca"
            }
          }
        ],
        hexes: ["D9"]
      },
      {
        color: "plain",
        mountain: {
          size: "small",
          cost: "L.40"
        },
        hexes: ["F9", "J9"]
      },
      {
        color: "plain",
        mountain: {
          percent: 0.45,
          size: "medium",
          cost: "L.80"
        },
        cities: [
          {
            angle: 180,
            percent: 0.333,
            name: {
              name: "Caltanisetta"
            }
          }
        ],
        hexes: ["H9"]
      },
      {
        color: "yellow",
        values: [
          {
            value: "40",
            angle: 210,
            percent: 0.75
          }
        ],
        labels: [{ label: "C", angle: 150, percent: 0.8 }],
        cities: [
          {
            companies: [
              {
                label: "IFT",
                color: "blue"
              }
            ],
            name: {
              name: "Catania",
              reverse: true,
              rotation: -60
            }
          }
        ],
        track: [{ side: 2 }],
        hexes: ["L9"]
      },
      {
        copy: "E6",
        centerTowns: [
          {
            name: {
              name: "Canicatti"
            }
          }
        ],
        mountain: {
          cost: "L.40",
          size: "small"
        },
        hexes: ["G10"]
      },
      {
        copy: "E6",
        centerTowns: [
          {
            name: {
              name: "Piazza Armerina"
            }
          }
        ],
        hexes: ["I10"]
      },
      {
        color: "yellow",
        track: [{ type: "gentle", side: 3 }],
        hexes: ["K10"]
      },
      {
        copy: "H9",
        mountain: {
          size: "small",
          cost: "L.40"
        },
        cities: [
          {
            name: {
              name: "Girgenti"
            },
            companies: [
              {
                color: "pink",
                label: "SFA"
              }
            ]
          }
        ],
        hexes: ["F11"]
      },
      {
        copy: "G10",
        centerTowns: [
          {
            name: {
              name: "Caltagirone"
            }
          }
        ],
        hexes: ["J11"]
      },
      {
        color: "plain",
        centerTowns: [
          {
            name: {
              name: "Licata"
            }
          }
        ],
        hexes: ["G12"]
      },
      {
        color: "yellow",
        mountain: {
          angle: 90,
          percent: 0.5,
          border: true,
          cost: "L.160",
          size: "tiny"
        },
        track: [{ type: "straight", side: 1, gauge: "narrow", offset: 12 }],
        hexes: ["I12"]
      },
      {
        color: "plain",
        mountain: {
          size: "small",
          cost: "L.40"
        },
        borders: [
          {
            side: 1,
            color: "mountain"
          },
          {
            side: 2,
            color: "mountain"
          }
        ],
        hexes: ["K12"]
      },
      {
        color: "gray",
        values: [
          {
            value: 10,
            angle: 210,
            percent: 0.667
          }
        ],
        centerTowns: [
          {
            name: {
              name: "Augusta",
              rotation: 30
            }
          }
        ],
        track: [
          {
            side: 1
          },
          {
            side: 3
          },
          {
            side: 6
          }
        ],
        hexes: ["M12"]
      },
      {
        color: "plain",
        mountain: {
          size: "large",
          cost: "L.160"
        },
        borders: [
          {
            side: 5,
            color: "mountain"
          }
        ],
        hexes: ["J13"]
      },
      {
        color: "water",
        offBoardTrack: [{ side: 3 }],
        icons: [{ type: "port" }],
        values: [{ value: 60, angle: 180, percent: 0.58 }],
        hexes: ["N13"]
      },
      {
        color: "gray",
        cities: [
          {
            size: 2,
            name: {
              name: "Terranova",
              reverse: true
            }
          }
        ],
        track: [
          { side: 2, gauge: "double" },
          { side: 3 },
          { side: 4, gauge: "narrow", offset: 2 },
          { side: 5, gauge: "narrow" },
          { side: 6 }
        ],
        offBoardRevenue: {
          angle: 180,
          percent: 0.65,
          revenues: [
            {
              color: "white",
              cost: "20"
            },
            {
              color: "white",
              cost: "30"
            },
            {
              color: "white",
              cost: "40"
            }
          ]
        },
        hexes: ["I14"]
      },
      {
        color: "yellow",
        cities: [
          {
            name: {
              name: "Ragusa",
              rotation: -30
            }
          }
        ],
        track: [{ side: 2 }, { side: 5, gauge: "narrow" }],
        borders: [
          { side: 4, color: "mountain" },
          { side: 6, color: "mountain" }
        ],
        values: [{ value: 20, angle: 90, percent: 0.75 }],
        mountain: {
          size: "tiny",
          border: true,
          cost: "L.40",
          angle: -30,
          percent: 0.7
        },
        hexes: ["K14"]
      },
      {
        color: "yellow",
        values: [
          {
            value: 10,
            angle: 210,
            percent: 0.75
          }
        ],
        cities: [
          {
            companies: [
              {
                label: "ATA",
                color: "darkGreen"
              }
            ],
            name: {
              name: "Siacusa",
              rotation: 30
            }
          }
        ],
        labels: [{ label: "S", angle: 150, percent: 0.8 }],
        track: [{ side: 3, gauge: "narrow" }],
        hexes: ["M14"]
      },
      {
        color: "water",
        offBoardTrack: [{ side: 5 }],
        icons: [{ type: "port" }],
        values: [{ value: 20, angle: 180, percent: 0.58 }],
        hexes: ["H15"]
      },
      {
        color: "plain",
        centerTowns: [
          {
            name: {
              name: "Vittoria"
            }
          }
        ],
        hexes: ["J15"]
      },
      {
        color: "plain",
        borders: [{ side: 3, color: "mountain" }],
        hexes: ["L15"]
      }
    ]
  }
};

export default game;
