export const EDIT_STEPS = [
    {
      id: 1,
      key: "general",
      label: "General",
      route: "general",
      h2: "Add your best photos",
      sub: "Upload at least one photo.",
      fields: ["photos"],
    },
    {
      id: 2,
      key: "about",
      label: "About you",
      route: "about",
      h2: "Tell us about you",
      sub: "Basics other users will see.",
      fields: ["gender", "type", "distance", "aboutYou"],
    },
    {
      id: 3,
      key: "interests",
      label: "Interests",
      route: "interests",
      h2: "What are you into?",
      sub: "Add interests and personality tags.",
      fields: ["interests", "personalityTags"],
    },
    {
      id: 4,
      key: "quiz",
      label: "Quiz",
      route: "quiz",
      h2: "Quick profile Q&A",
      sub: "Short answers that show your vibe.",
      fields: [
        "quizAnswers.recharge",
        "quizAnswers.datePlanning",
        "quizAnswers.newCuisines",
      ],
    },
  ];
  