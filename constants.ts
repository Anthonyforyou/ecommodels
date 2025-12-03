import { Plan, PlanType } from "./types";

export const PLANS: Plan[] = [
  {
    id: "plan_free",
    name: PlanType.FREE,
    price: 0,
    creditsIncluded: 10,
    costPerExtraCredit: 0, 
    features: [
      "10 Generaties per maand",
      "Standaard resolutie",
      "Toegang tot community support",
      "Basis modellen bibliotheek"
    ]
  },
  {
    id: "plan_premium",
    name: PlanType.PREMIUM,
    price: 199,
    creditsIncluded: 300,
    costPerExtraCredit: 0.55,
    recommended: true,
    features: [
      "300 Generaties per maand",
      "Hoge resolutie downloads",
      "Extra credits voor €0,55/stuk",
      "Commerciële licentie",
      "Prioriteit in wachtrij"
    ]
  },
  {
    id: "plan_enterprise",
    name: PlanType.ENTERPRISE,
    price: 499,
    creditsIncluded: 1000,
    costPerExtraCredit: 0.45,
    features: [
      "1000 Generaties per maand",
      "Ultra HD (4K) support",
      "Extra credits voor €0,45/stuk",
      "API Toegang",
      "Dedicated account manager",
      "Custom modellen uploaden"
    ]
  }
];

export const TESTIMONIALS = [
  {
    name: "Sophie de Vries",
    role: "E-commerce Manager",
    company: "FashionNova NL",
    text: "EcomModels AI heeft onze retourpercentages met 40% verlaagd. Klanten zien nu echt hoe het staat.",
    image: "https://picsum.photos/100/100?random=1"
  },
  {
    name: "Mark Jansen",
    role: "Creative Director",
    company: "Studio Stijl",
    text: "De snelheid waarmee we collecties kunnen visualiseren zonder fotoshoots is ongekend. Een gamechanger.",
    image: "https://picsum.photos/100/100?random=2"
  }
];