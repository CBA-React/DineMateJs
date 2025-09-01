export const BG_BY_PATH = [
    { test: (p) => p.startsWith("/login"),            src: "/pictures/restaurant-interior(3).jpg" },
    { test: (p) => p.startsWith("/forgot-password") || p.startsWith("/verification-code") || p.startsWith("/reset-password"),   src: "/pictures/restaurant-interior(1).jpg" },
    { test: (p) => p.startsWith("/register") || p.startsWith("/onboarding"),         src: "/pictures/restaurant-interior(2).jpg"},
    { test: () => true,                                    src: "/pictures/restaurant-interior(3).jpg" }
  ];