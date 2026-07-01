export interface Faq {
  q: string;
  a: string;
}

/** The 8 FAQ entries, verbatim from the support prototype. */
export const FAQS: Faq[] = [
  {
    q: "How does the AI bed score work?",
    a: "When you scan your bed, Bedly's model looks at things like how flat the duvet is, whether the pillows are arranged, and how tidy the corners are, then turns that into a 0–100 score. The photo is used only to score your bed and is never stored — we only keep the number.",
  },
  {
    q: "Do you store photos of my bed?",
    a: "Never. Your photo is used only to produce a score and is then deleted right away — we never store it. The only thing that syncs is the resulting number, so your streaks and points stay up to date. You can read the full details in our Privacy Policy.",
  },
  {
    q: "What happens if I miss a day?",
    a: "Your streak resets to zero — unless you have a Streak Freeze. Bedly Pro gives you Streak Freezes that automatically protect your streak on the occasional day life gets in the way, so one missed morning doesn't undo weeks of progress.",
  },
  {
    q: "What's included in Bedly Pro?",
    a: "Pro adds Streak Freeze, mascot outfits (hats, shades and duvet colors), full score history with weekly trends, and bigger squads with custom nudges. Everything else — daily scans, scores, streaks and a squad of up to five friends — is free forever.",
  },
  {
    q: "How do I cancel my subscription?",
    a: "Bedly Pro is billed through your Apple ID. Open the Settings app on your iPhone, tap your name, then Subscriptions, choose Bedly and tap Cancel. You can also manage it from Settings inside the Bedly app under Manage subscription.",
  },
  {
    q: "How do squads and nudges work?",
    a: "Add friends to your squad to compare streaks and points on a shared leaderboard. If a friend hasn't made their bed yet, you can send a playful nudge to remind them. Only invite people you actually know — squad members can see your display name, streak and points.",
  },
  {
    q: "Which devices does Bedly support?",
    a: "Bedly is currently available for iPhone on the Apple App Store. We recommend keeping iOS up to date for the best experience. Android is on our wish list — let us know if you want it!",
  },
  {
    q: "How do I delete my account and data?",
    a: "Open Settings in the app, go to Account and choose to delete your account. This removes your personal data within 30 days. You can always email hello@bedly.app if you need a hand or want to confirm deletion.",
  },
];
