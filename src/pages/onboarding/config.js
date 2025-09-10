export const STEPS = [
  {
    id: "photos", label: "Photo", route: "photos",
    fields: ["photos"],
    h2: "Add your photos",
    sub: "Choose at least 2 photos that represent you well",
  },
  {
    id: "about", label: "About You", route: "about",
    fields: ["gender","type","distance","about"],
    h2: "Tell about yourself",
    sub: "Choose at least 2 photos that represent you well",
  },
  {
    id: "interests", label: "Interests", route: "interests",
    fields: ["interests","traits"],
    h2: "Share your interests",
    sub: "Select at least 3 interests and 3 personality traits",
  },
  {
    id: "quiz", label: "Quiz", route: "quiz",
    fields: ["additionalProp1","additionalProp2","additionalProp3"],
    h2: "Compatibility Quiz",
    sub: "Help us find your perfect matches",
  },
]