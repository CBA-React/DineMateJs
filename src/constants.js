import { Shield, ConciergeBell, Heart, CreditCard, Venus, Mars, CircleSmall, Wine, Cigarette, UsersRound, IdCardLanyard } from "lucide-react";

export const BG_BY_PATH = [
    { test: (p) => p.startsWith("/login"),            src: "/pictures/restaurant-interior(3).jpg" },
    { test: (p) => p.startsWith("/forgot-password") || p.startsWith("/verification-code") || p.startsWith("/reset-password"),   src: "/pictures/restaurant-interior(1).jpg" },
    { test: (p) => p.startsWith("/register") || p.startsWith("/onboarding"),         src: "/pictures/restaurant-interior(2).jpg"},
    { test: () => true,                                    src: "/pictures/restaurant-interior(3).jpg" }
  ];

export const FEATURES = [
    { key: "safe",    title: "Safe & Verified",        icon: Shield, desc: "Every profile is verified to ensure a trustworthy community." },
    { key: "exclusive", title: "Exclusive Restaurants", icon: ConciergeBell,    desc: "Book tables at top local spots — only through DineMate." },
    { key: "smart",   title: "Smart Matching",          icon: Heart,  desc: "AI matches you by food preferences and interests." },
    { key: "pay",     title: "Book & Pay Easy",         icon: CreditCard,   desc: "Reserve, split, and pay — all in one place." },
  ];

export const RESTAURANTS = [
  {
    id: '1',
    name: 'La Bella Italia',
    cuisine: 'Italian',
    priceLevel: 2,
    distanceMiles: 0.8,
    pricePerPerson: 65,
    description:
      'Authentic Italian cuisine with romantic ambiance and wood-fired specialties.',
    tags: ['Handmade Pasta', 'Wood-fired Pizza', 'Tiramisu'],
    image:
      '/pictures/la-bella-italia.png',
    rating: 4.9,
    isOpen: true,
    area: 'North Beach',
  },
  {
    id: '2',
    name: 'Sakura Sushi',
    cuisine: 'Japanese',
    priceLevel: 3,
    distanceMiles: 0.8,
    pricePerPerson: 85,
    description:
      'Fresh sushi and sashimi in an elegant, minimal setting with sake pairings.',
    tags: ['Omakase', 'Sake Selection', 'Tiramisu'],
    image:
      '/pictures/sakura-sushi.png',
    rating: 4.9,
    isOpen: true,
    area: 'Japantown',
  },
  {
    id: '3',
    name: 'Coastal Grill',
    cuisine: 'Seafood',
    priceLevel: 3,
    distanceMiles: 0.8,
    pricePerPerson: 65,
    description:
      'Fresh seafood with panoramic ocean views and an open-kitchen experience.',
    tags: ['Dungeness Crab', 'Cioppino', 'Oyster Bar'],
    image:
      '/pictures/coastal-grill.png',
    rating: 4.9,
    isOpen: true,
    area: 'Japantown',
  },
  {
    id: '4',
    name: 'Sakura Sushi',
    cuisine: 'Japanese',
    priceLevel: 3,
    distanceMiles: 0.8,
    pricePerPerson: 85,
    description:
      'Fresh sushi and sashimi in an elegant, minimal setting with sake pairings.',
    tags: ['Omakase', 'Sake Selection', 'Tiramisu'],
    image:
      '/pictures/sakura-sushi.png',
    rating: 4.9,
    isOpen: true,
    area: 'Japantown',
  },
];

export const SOCIAL_CARDS = [
    { type: 'photo', image: 'pictures/happy-woman-eating.jpg'},
    {
      type: 'quote',
      avatar: 'https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?q=80&w=200&auto=format&fit=crop',
      name: 'Anna K, 32',
      meta: '2.4M followers on Youtube',
      text: 'DineMate helped me discover amazing restaurants and meet wonderful people. Highly recommend!',
    },
    { type: 'quote',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop',
      name: '@mytechceo',
      meta: '254k followers',
      text: 'DineMate helped me discover amazing restaurants and meet wonderful people. Highly recommend!',
    },
    { type: 'photo', image: 'pictures/two-gay-love.jpg' },
    { type: 'photo', image: 'pictures/front-view-smiley-people-with-drinks.jpg' },
    {
      type: 'quote',
      avatar: 'https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=200&auto=format&fit=crop',
      name: 'Anna K, 32',
      meta: '2.4M followers on Youtube',
      text: 'DineMate helped me discover amazing restaurants and meet wonderful people. Highly recommend!',
    },
    {
      type: 'quote',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop',
      name: 'Anna K, 32',
      meta: '2.4M followers on YouTube',
      text: 'DineMate helped me discover amazing restaurants and meet wonderful people. Highly recommend!'
    },
    { type: 'photo', image: 'pictures/group-of-old-people-talking.jpg' },
]

export const STEPS_INFO = [
  {cardNumber: "01", cardName: "Sign Up", cardDescription: "Create your personal profile and let us know your favorite flavors and dishes.", cardImage: "/pictures/person-reading-cellphone-messages.jpg", cardImageAlt: "person reading cellphone"},
  {cardNumber: "02", cardName: "Match", cardDescription: "Our algorithm matches you with people who share your tastes for a great dinner.", cardImage: "/pictures/teenage-girl-posing.jpg", cardImageAlt: "teenage girl at the table"},
  {cardNumber: "03", cardName: "Book", cardDescription: "Select the perfect restaurant and quickly book your table with just one click.", cardImage: "/pictures/people-drinking-coffee.jpg", cardImageAlt: "people drinking coffee"},
]

  export const FOOTER_SECTIONS = [
    {
      id: "about",
      items: [
        { label: "Why Us", href: "/#why-us" },
        { label: "How it works", href: "/#how-it-works" },
        { label: "Restaurants", href: "/#restaurants" },
        { label: "Stories", href: "/#stories" },
      ],
    },
    {
      id: "legal",
      items: [
        { label: "Terms of Service", href: "/terms" },
        { label: "Privacy Policy", href: "/privacy" },
      ],
    },
    {
      id: "support",
      items: [
        { label: "Contact Us", href: "/contact" },
        { label: "Report a Problem", href: "/report" },
        { label: "FAQ", href: "/faq" },
      ],
    },
    {
      id: "social",
      items: [
        { label: "Instagram", href: "https://instagram.com", external: true },
        { label: "Facebook", href: "https://facebook.com", external: true },
        { label: "TikTok", href: "https://tiktok.com", external: true },
        { label: "X", href: "https://x.com", external: true },
        { label: "LinkedIn", href: "https://linkedin.com", external: true },
      ],
    },
  ]

export const FOOTER_SECTIONS_EXTENDED = [
  {
    id: "sections",
    items: [
      { label: "Discover", href: "/discover" },
      { label: "Matches", href: "/matches" },
      { label: "Dining", href: "/dining" },
      { label: "Events", href: "/events" },
    ],
  },
  ...FOOTER_SECTIONS
]

export const PEOPLE = [
    {
      id: 111, name: "Emma Chen", age: 26,
      photo: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1200&auto=format&fit=crop",
      match: 94, location: "North Beach", distance: 0.8, interests: ["Reading", "Cooking"], verified: true
    },
    {
      id: 222, name: "Lina Park", age: 24,
      photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1200&auto=format&fit=crop",
      match: 91, location: "Mission", distance: 1.4, interests: ["Yoga", "Sushi"], verified: true
    },
    {
      id: 333, name: "Maya Patel", age: 28,
      photo: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=1200&auto=format&fit=crop",
      match: 89, location: "Downtown", distance: 2.1, interests: ["Hiking", "Jazz"], verified: false
    },
    {
      id: 444, name: "Maya Patel", age: 28,
      photo: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=1200&auto=format&fit=crop",
      match: 89, location: "Downtown", distance: 2.1, interests: ["Hiking", "Jazz"], verified: false
    },
];

export const PROFILE_MOCK = {
  id: "emma-chen",
  name: "Emma Chen",
  age: 26,
  match: 94,
  verified: true,
  location: "North Beach",
  distance: 0.8,
  online: true,
  interests: ["Reading", "Cooking"],
  bio:
    "Lorem ipsum dolor sit amet consectetur. Lectus ipsum nulla pharetra lacus semper quisque feugiat laoreet. Ornare dictum non suspendisse lectus nunc auctor vulputate. Vehicula aliquam interdum tellus faucibus. Venenatis consectetur vulputate tempor ut nullam bibendum in.",
  photos: [
    "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=1200&auto=format&fit=crop",
  ],
  gender: "female",
  lookingFor: "Man",
  qa: [
    {
      icon: Wine,
      q: "How often do I drink alcohol?",
      a: "I DON’T DRINK",
    },
    {
      icon: Cigarette,
      q: "How often do I smoke?",
      a: "I DON’T SMOKE",
    },
    {
      q: "How do I recharge after a long day?",
      a: "SOCIAL GATHERING OR PARTY",
    },
    {
      q: "When planning a date, I prefer to:",
      a: "HAVE A GENERAL IDEA AND GO WITH THE FLOW",
    },
    {
      q: "My approach to trying new cuisines:",
      a: "I’LL TRY MOST THINGS ONCE",
    },
  ],
};

export const GENDERS_ICONS = new Map([
  ["male", Mars],
  ["female", Venus],
  ["other", CircleSmall]
])

export const GENDER_OPTIONS = [
  {value: "male", label: "Male"},
  {value: "female", label: "Female"},
  {value: "other", label: "Other"},
]

export const SORT_OPTIONS = [
    {value: "best-match", label: "Best Match"},
    {value: "most-recent", label: "Most Recent"},
    {value: "closest-location", label: "Closest Location"},
]

export const CUISINES = ["Italian","Japanese","Seafood","Mexican","Mediterranean","American","Indian","Spanish","Chinese","French","Vegan"];

export const INTERESTS = ["Hiking","Photography","Yoga","Wine Tasting","Reading","Art","Music","Dancing","Meditation","Movies","Gardening","Travel","Sports","Theater","Cooking","Volunteering"];
export const PERSONALITY = ["Adventurous","Foodie","Introverted","Spontaneous","Planner","Spiritual","Ambitious","Romantic","Intellectual","Laid-back","Extroverted","Optimistic","Artistic","Athletic","Creative"];

export const EVENTS_TYPES = [
  "Speed Dating",
  "Social Mixers",
  "Workshops",
  "Dining Events"
]

export const EVENTS = [
  {
    id: 1,
    title: "Wine and Dine Speed Dating",
    image: "/pictures/wine-event.jpg",
    venue: "The Rose Garden, Downtown",
    featured: true,
    tags: ["Speed Dating"],
    description: "Meet 12-15 potential matches in an elegant wine bar setting. Each date lasts 5 minutes with a wine tasting component.",
    price: 45,
    attending: 60,
    capacity: 90,
    ages: "25-40",
    distance: 10,
    date: "2025-01-25",
    time: "18:00",
    included: [
      { label: 'Welcome Drink', icon: Wine, text: 'Red Wine' },
      { label: 'Name Tag and Event Materials', icon: IdCardLanyard, text: 'Personal name tag' },
      { label: 'Light Refreshments', icon: ConciergeBell, text: 'Bruschetta' },
      { label: 'Contact Exchange Facilitation', icon: UsersRound, text: 'Interactive with a sommelier' },
    ],
  },
  {
      id: 2,
      title: "Sunset Rooftop Jazz Night",
      image: "/pictures/jazz-event.jpg",
      venue: "Skyline Lounge, Uptown",
      featured: false,
      tags: ["Live Music", "Networking"],
      description:
        "Enjoy smooth jazz as the sun sets over the city skyline. A perfect evening of music, cocktails, and great conversation.",
      price: 60,
      attending: 40,
      capacity: 80,
      ages: "21-45",
      distance: 8,
      date: "2025-02-15",
      time: "20:00",
      included: [
        { label: 'Welcome Drink', icon: Wine, text: 'Red Wine' },
        { label: 'Name Tag and Event Materials', icon: IdCardLanyard, text: 'Personal name tag' },
        { label: 'Light Refreshments', icon: ConciergeBell, text: 'Bruschetta' },
        { label: 'Contact Exchange Facilitation', icon: UsersRound, text: 'Interactive with a sommelier' },
      ],
    }
]


export const ALL_ALCOHOL = [
  "Not for me","I don't drink","I try not to drink",
  "I drink on special occasions","I drink with company on weekends","Almost every evening"
];
export const ALL_SMOKE = [
  "I smoke for company","With alcohol","I don't smoke","I smoke","I'm trying to quit"
];

export const Q1 = [
  "Quiet time alone or with a book",
  "Intimate dinner with close friends",
  "Social gathering or party"
];
export const Q2 = [
  "Plan every detail in advance",
  "Have a general idea and go with the flow",
  "Be completely spontaneous"
];
export const Q3 = [
  "I prefer familiar foods",
  "I'll try most things once",
  "The more exotic, the better!"
];
export const MOCK_CONVERSATIONS = [
  {
    id: "emma",
    name: "Emma Chan",
    lastMessage: "Ok, see you later",
    time: "18:42",
    avatar: "https://i.pravatar.cc/64?img=47",
    unread: 0,
    isOnline: true,
  },
  {
    id: "mia",
    name: "Mia Corvere",
    lastMessage: "Table for four, 6PM. Be there.",
    time: "16:58",
    avatar: "https://i.pravatar.cc/64?img=32",
    unread: 2,
    isOnline: false,
  },
  {
    id: "peter",
    name: "Peter Parker",
    lastMessage: "I'll bring dessert 🍰",
    time: "12:10",
    avatar: "https://i.pravatar.cc/64?img=12",
    unread: 0,
    isOnline: true,
  },
];

export const MOCK_MESSAGES_BY_ID = {
  emma: [
    { id: 1, authorId: "them", text: "Hey! Dinner tonight?", ts: "18:35", createdAt: "2025-09-15"},
    { id: 2, authorId: "me", text: "Sure, 7PM works?", ts: "18:37", status: "seen" },
    { id: 3, authorId: "them", text: "Perfect. See you then!", ts: "18:42" },
  ],
  mia: [
    { id: 1, authorId: "them", text: "Table for four, 6PM.", ts: "16:53" },
    { id: 2, authorId: "them", text: "Be there.", ts: "16:58" },
  ],
  peter: [
    { id: 1, authorId: "me", text: "Picking a place near downtown.", ts: "11:55", status: "unread" },
    { id: 2, authorId: "them", text: "I'll bring dessert 🍰", ts: "12:10" },
  ],
};