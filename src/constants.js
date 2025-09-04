import { Shield, ConciergeBell, Heart, CreditCard } from "lucide-react";

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
      'pictures/sakura-sushi.png',
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
      'pictures/coastal-grill.png',
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
      'pictures/sakura-sushi.png',
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
];

export const STEPS_INFO = [
  {cardNumber: "01", cardName: "Sign Up", cardDescription: "Create your personal profile and let us know your favorite flavors and dishes.", cardImage: "/pictures/person-reading-cellphone-messages.jpg", cardImageAlt: "person reading cellphone"},
  {cardNumber: "02", cardName: "Match", cardDescription: "Our algorithm matches you with people who share your tastes for a great dinner.", cardImage: "/pictures/teenage-girl-posing.jpg", cardImageAlt: "teenage girl at the table"},
  {cardNumber: "03", cardName: "Book", cardDescription: "Select the perfect restaurant and quickly book your table with just one click.", cardImage: "/pictures/people-drinking-coffee.jpg", cardImageAlt: "people drinking coffee"},
]