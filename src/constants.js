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