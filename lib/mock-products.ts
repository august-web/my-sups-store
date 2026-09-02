import type { Variant } from "@/components/product/VariantSelector";
import type { Ingredient } from "@/components/product/IngredientBreakdown";

export interface MockReview {
  id: string;
  name: string;
  rating: number;
  comment: string;
  is_verified: boolean;
  created_at: string;
}

export interface MockProduct {
  name: string;
  slug: string;
  description: string;
  long_description: string;
  price: number;
  compare_at_price?: number;
  images: string[];
  ratings: number;
  review_count: number;
  is_bestseller: boolean;
  is_subscription: boolean;
  subscription_discount: number;
  mood: string;
  how_to_use: string;
  variants: Variant[];
  ingredients: Ingredient[];
  reviews: MockReview[];
}

export const MOCK_PRODUCTS: Record<string, MockProduct> = {
  "marine-collagen-peptides": {
    name: "Marine Collagen Peptides",
    slug: "marine-collagen-peptides",
    description:
      "Wild-caught marine collagen peptides sourced from sustainably harvested fish. Supports skin elasticity, hydration, and a youthful glow from within. Unflavored and dissolves easily in any beverage.",
    long_description:
      "Our Marine Collagen Peptides are sourced from wild-caught, sustainably harvested deep-sea fish off the coast of Norway. Using a patented cold-hydrolysis process, we break down collagen fibers into small peptides (2000-5000 Daltons) that your body absorbs up to 1.5x more effectively than bovine or plant-based alternatives.\n\nType I and Type III collagen are the most abundant forms in human skin — and that's exactly what you get in every scoop. Combined with Vitamin C for collagen synthesis, Hyaluronic Acid for deep hydration, and Zinc for skin repair, this is your all-in-one foundation for skin that radiates from within.\n\nClinical studies show visible improvements in skin hydration, elasticity, and fine line depth within 8-12 weeks of consistent use.",
    price: 39.99,
    compare_at_price: 49.99,
    images: [
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&q=80",
      "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800&q=80",
      "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=800&q=80",
    ],
    ratings: 4.8,
    review_count: 234,
    is_bestseller: true,
    is_subscription: true,
    subscription_discount: 20,
    mood: "glow",
    how_to_use:
      "Mix one scoop (10g) into your morning coffee, smoothie, or water. For best results, take daily for at least 30 days. Can be used hot or cold — the unflavored formula won't change the taste of your drink. Many customers love adding it to their morning matcha or overnight oats.",
    variants: [
      { id: "v1", name: "30 Day Supply", price: 39.99 },
      { id: "v2", name: "60 Day Supply", price: 69.99 },
      { id: "v3", name: "90 Day Supply", price: 94.99 },
    ],
    ingredients: [
      {
        name: "Marine Collagen Peptides",
        amount: "10g",
        benefit:
          "Hydrolyzed type I and III collagen from wild-caught fish. Supports skin elasticity, hydration, and reduces fine lines. Absorbs 1.5x more effectively than bovine collagen.",
      },
      {
        name: "Vitamin C",
        amount: "90mg",
        benefit:
          "Essential co-factor for collagen synthesis and powerful antioxidant protection. Helps brighten skin tone and defend against environmental stressors like UV and pollution.",
      },
      {
        name: "Hyaluronic Acid",
        amount: "120mg",
        benefit:
          "A naturally occurring molecule that attracts and retains up to 1000x its weight in water. Supports deep skin hydration from within, helping to plump and smooth fine lines.",
      },
      {
        name: "Zinc",
        amount: "11mg",
        benefit:
          "Essential mineral for skin repair and wound healing. Helps regulate sebum production and reduces inflammation associated with breakouts and irritation.",
      },
    ],
    reviews: [
      {
        id: "mc-1",
        name: "Sarah M.",
        rating: 5,
        comment:
          "I've been using this for 3 months now and the difference in my skin is incredible. My dermatologist actually noticed the improvement in my collagen levels during my last visit.",
        is_verified: true,
        created_at: "2025-08-15",
      },
      {
        id: "mc-2",
        name: "James K.",
        rating: 5,
        comment:
          "Great taste — or rather, no taste at all, which is exactly what I wanted. Mixes perfectly into my morning coffee. My skin looks more plump and hydrated after just 6 weeks.",
        is_verified: true,
        created_at: "2025-08-10",
      },
      {
        id: "mc-3",
        name: "Priya L.",
        rating: 4,
        comment:
          "Good product overall. Took about 3 weeks to notice a difference but now my skin feels so much smoother. Taking one star off because I wish the container was bigger.",
        is_verified: false,
        created_at: "2025-07-28",
      },
      {
        id: "mc-4",
        name: "Ahmed R.",
        rating: 5,
        comment:
          "I was skeptical about collagen supplements but this one changed my mind. My nails are stronger, my hair feels thicker, and my skin has a natural glow I haven't seen in years.",
        is_verified: true,
        created_at: "2025-07-20",
      },
      {
        id: "mc-5",
        name: "Chen W.",
        rating: 5,
        comment:
          "Third time ordering. The subscribe and save makes it so worth it. I've tried at least 5 different collagen brands and this is by far the best quality for the price.",
        is_verified: true,
        created_at: "2025-07-15",
      },
    ],
  },

  "glow-boosting-gummies": {
    name: "Glow-Boosting Gummies",
    slug: "glow-boosting-gummies",
    description:
      "Delicious berry-flavored gummies packed with Vitamin C, E, and biotin to support radiant, healthy-looking skin from the inside out. Vegan, gluten-free, and addictively tasty.",
    long_description:
      "Think of these as your daily skin dessert. Our Glow-Boosting Gummies combine the most evidence-backed skin vitamins into one delicious berry-flavored gummy you'll actually look forward to taking.\n\nEach gummy delivers a clinical dose of Vitamin C for brightening and collagen support, Vitamin E for antioxidant protection, Biotin for hair and nail strength, and a carefully selected blend of berry extracts rich in anthocyanins.\n\nThey're vegan, gluten-free, made with natural flavors and colors, and contain zero artificial sweeteners. The result? A supplement that feels like a treat but works like a powerhouse.",
    price: 29.99,
    compare_at_price: undefined,
    images: [
      "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=800&q=80",
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&q=80",
      "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=800&q=80",
    ],
    ratings: 4.7,
    review_count: 189,
    is_bestseller: true,
    is_subscription: true,
    subscription_discount: 20,
    mood: "glow",
    how_to_use:
      "Take 2 gummies daily, with or without food. Best taken in the morning for a glow-boosting start to your day. Chew thoroughly before swallowing. Do not exceed recommended daily intake.",
    variants: [
      { id: "v1", name: "30 Day Supply (60 gummies)", price: 29.99 },
      { id: "v2", name: "60 Day Supply (120 gummies)", price: 54.99 },
    ],
    ingredients: [
      {
        name: "Vitamin C",
        amount: "250mg",
        benefit:
          "Powerful antioxidant that supports collagen production, brightens skin tone, and protects against free radical damage from UV and pollution.",
      },
      {
        name: "Vitamin E",
        amount: "15mg",
        benefit:
          "Fat-soluble antioxidant that works synergistically with Vitamin C to protect skin cell membranes from oxidative stress and premature aging.",
      },
      {
        name: "Biotin",
        amount: "5000mcg",
        benefit:
          "B-vitamin essential for keratin production — the protein that makes up your hair, skin, and nails. Supports strength, growth, and a healthy appearance.",
      },
      {
        name: "Berry Antioxidant Blend",
        amount: "100mg",
        benefit:
          "Concentrated extract from blueberry, acai, and goji berry rich in anthocyanins and polyphenols that fight oxidative stress and support skin radiance.",
      },
    ],
    reviews: [
      {
        id: "gg-1",
        name: "Fatima A.",
        rating: 5,
        comment:
          "These taste incredible — like actual candy. But the real magic is my skin after 4 weeks. The dullness is gone and I'm getting compliments on my glow.",
        is_verified: true,
        created_at: "2025-08-12",
      },
      {
        id: "gg-2",
        name: "David L.",
        rating: 5,
        comment:
          "Bought these for my girlfriend and she loves them. She's on her second bottle already. Her skin does look noticeably brighter.",
        is_verified: false,
        created_at: "2025-08-01",
      },
      {
        id: "gg-3",
        name: "Nina K.",
        rating: 4,
        comment:
          "Love the taste and the ingredients are solid. Only wish they came in a bigger bottle because I go through them fast.",
        is_verified: true,
        created_at: "2025-07-22",
      },
      {
        id: "gg-4",
        name: "Omar S.",
        rating: 5,
        comment:
          "Finally a supplement I don't forget to take. These are genuinely delicious and my skin has never looked better. 10/10 would recommend.",
        is_verified: true,
        created_at: "2025-07-18",
      },
    ],
  },

  "beauty-sleep-complex": {
    name: "Beauty Sleep Complex",
    slug: "beauty-sleep-complex",
    description:
      "A calming blend of magnesium, L-theanine, and valerian root to promote deep, restorative sleep — so you wake up refreshed and your skin can repair overnight.",
    long_description:
      "Your skin does its most important repair work while you sleep. Beauty Sleep Complex ensures you get the deep, restorative rest your body needs to regenerate cells, produce collagen, and reduce cortisol-related skin damage.\n\nOur formula combines three clinically studied ingredients: Magnesium Glycinate for muscle relaxation and nervous system support, L-Theanine for calm focus and stress reduction, and Valerian Root extract for gentle, non-habit-forming sleep support.\n\nUnlike melatonin supplements that can leave you groggy, this formula works with your body's natural rhythms. You'll fall asleep easier, sleep more deeply, and wake up feeling genuinely refreshed — not sedated.",
    price: 34.99,
    compare_at_price: undefined,
    images: [
      "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&q=80",
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80",
      "https://images.unsplash.com/photo-1507398941214-572c25f4b1dc?w=800&q=80",
    ],
    ratings: 4.9,
    review_count: 156,
    is_bestseller: true,
    is_subscription: true,
    subscription_discount: 20,
    mood: "sleep",
    how_to_use:
      "Take 2 capsules 30-45 minutes before bedtime with water. For best results, establish a consistent nightly routine. Avoid screens for 30 minutes before sleep. Can be combined with our Marine Collagen Peptides for a complete morning and night routine.",
    variants: [
      { id: "v1", name: "30 Day Supply (60 caps)", price: 34.99 },
      { id: "v2", name: "60 Day Supply (120 caps)", price: 62.99 },
    ],
    ingredients: [
      {
        name: "Magnesium Glycinate",
        amount: "400mg",
        benefit:
          "Highly absorbable form of magnesium that supports muscle relaxation, nervous system function, and deep sleep. Also helps reduce stress-related breakouts.",
      },
      {
        name: "L-Theanine",
        amount: "200mg",
        benefit:
          "Amino acid found in green tea that promotes calm alertness during the day and deeper sleep at night. Reduces cortisol levels that accelerate skin aging.",
      },
      {
        name: "Valerian Root Extract",
        amount: "300mg",
        benefit:
          "Herbal extract used for centuries as a gentle sleep aid. Increases GABA levels in the brain to promote relaxation without the morning grogginess of melatonin.",
      },
      {
        name: "Chamomile Extract",
        amount: "100mg",
        benefit:
          "Contains apigenin, an antioxidant that binds to brain receptors to decrease anxiety and initiate sleep. Anti-inflammatory properties also support skin healing.",
      },
    ],
    reviews: [
      {
        id: "bs-1",
        name: "Layla H.",
        rating: 5,
        comment:
          "I used to toss and turn for hours. Now I fall asleep within 20 minutes and wake up feeling genuinely rested. My skin has been clearer too — I think it's the reduced stress.",
        is_verified: true,
        created_at: "2025-08-18",
      },
      {
        id: "bs-2",
        name: "Michael T.",
        rating: 5,
        comment:
          "No grogginess, no weird dreams. Just solid, deep sleep. I've tried melatonin and other sleep aids — this is by far the best. Worth every penny.",
        is_verified: true,
        created_at: "2025-08-05",
      },
      {
        id: "bs-3",
        name: "Jessica P.",
        rating: 5,
        comment:
          "My esthetician recommended I improve my sleep for better skin. Three weeks on Beauty Sleep Complex and the difference is visible — less puffiness, fewer dark circles, and my skin just looks healthier.",
        is_verified: true,
        created_at: "2025-07-30",
      },
    ],
  },

  "de-bloat-probiotic": {
    name: "De-Bloat Probiotic",
    slug: "de-bloat-probiotic",
    description:
      "A targeted probiotic blend with 50 billion CFU to support gut health, reduce bloating, and promote a flatter, more comfortable belly. With added digestive enzymes for complete support.",
    long_description:
      "Gut health is skin health. When your digestive system is balanced, inflammation decreases, nutrient absorption improves, and your skin reflects that internal harmony.\n\nOur De-Bloat Probiotic delivers 50 billion CFU of clinically studied strains — including Lactobacillus acidophilus and Bifidobacterium lactis — specifically chosen for their effectiveness in reducing bloating, supporting regularity, and improving overall gut comfort.\n\nWe've also added a digestive enzyme blend (protease, lipase, amylase) to help break down food more efficiently, reducing gas and discomfort after meals. The delayed-release capsule ensures the probiotics survive stomach acid and reach your gut alive.",
    price: 32.99,
    compare_at_price: 39.99,
    images: [
      "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=800&q=80",
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&q=80",
      "https://images.unsplash.com/photo-1607613009820-a29f7bb81ba0?w=800&q=80",
    ],
    ratings: 4.6,
    review_count: 128,
    is_bestseller: true,
    is_subscription: true,
    subscription_discount: 20,
    mood: "debloat",
    how_to_use:
      "Take 1 capsule daily with water, preferably in the morning on an empty stomach or 20 minutes before a meal. For enhanced results, pair with a fiber-rich diet and adequate hydration. Store in a cool, dry place.",
    variants: [
      { id: "v1", name: "30 Day Supply (30 caps)", price: 32.99 },
      { id: "v2", name: "60 Day Supply (60 caps)", price: 58.99 },
    ],
    ingredients: [
      {
        name: "Probiotic Blend",
        amount: "50B CFU",
        benefit:
          "Clinically studied strains including L. acidophilus and B. lactis that survive stomach acid to restore healthy gut flora, reduce bloating, and improve digestion.",
      },
      {
        name: "Digestive Enzyme Blend",
        amount: "150mg",
        benefit:
          "Protease, lipase, and amylase work together to break down proteins, fats, and carbohydrates more efficiently — reducing gas and post-meal discomfort.",
      },
      {
        name: "Prebiotic Fiber (FOS)",
        amount: "200mg",
        benefit:
          "Fructooligosaccharides feed the beneficial bacteria in your gut, helping them multiply and thrive. Creates an optimal environment for probiotic colonization.",
      },
      {
        name: "Ginger Root Extract",
        amount: "50mg",
        benefit:
          "Traditional digestive aid that soothes the stomach lining, reduces nausea, and has anti-inflammatory properties that complement the probiotic blend.",
      },
    ],
    reviews: [
      {
        id: "db-1",
        name: "Tanya R.",
        rating: 5,
        comment:
          "The bloating that plagued me for years is basically gone. I used to look 5 months pregnant after dinner — now my stomach is flat and comfortable. This product is a game changer.",
        is_verified: true,
        created_at: "2025-08-14",
      },
      {
        id: "db-2",
        name: "Kevin M.",
        rating: 4,
        comment:
          "Solid probiotic. Noticeably less bloating after the first week. The delayed-release capsule is a nice touch — you can tell they care about quality.",
        is_verified: true,
        created_at: "2025-08-02",
      },
      {
        id: "db-3",
        name: "Aisha N.",
        rating: 5,
        comment:
          "My nutritionist recommended this brand specifically. The 50B CFU count is impressive and the added digestive enzymes make a real difference. I'm on my third bottle.",
        is_verified: true,
        created_at: "2025-07-25",
      },
    ],
  },

  "energy-glow-stack": {
    name: "Energy + Glow Stack",
    slug: "energy-glow-stack",
    description:
      "The ultimate daily duo: Marine Collagen Peptides + Glow-Boosting Gummies bundled together. Save 20% when you stack these bestsellers for comprehensive skin nutrition.",
    long_description:
      "Why choose between energy and glow when you can have both? This curated stack combines our two bestselling products into one powerful daily routine.\n\nThe Marine Collagen Peptides provide the structural building blocks for firm, elastic skin — Type I and III collagen, Hyaluronic Acid, Vitamin C, and Zinc. Take it in the morning mixed into your coffee or smoothie.\n\nThe Glow-Boosting Gummies deliver the protective and brightening vitamins your skin needs — Vitamin C, E, Biotin, and berry antioxidants. Pop two gummies as your afternoon pick-me-up.\n\nTogether, they create a comprehensive inside-out approach to skin health that covers every angle: repair, hydration, protection, and radiance. And you save 20% compared to buying them separately.",
    price: 64.99,
    compare_at_price: 79.98,
    images: [
      "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=800&q=80",
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&q=80",
      "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=800&q=80",
    ],
    ratings: 4.8,
    review_count: 97,
    is_bestseller: true,
    is_subscription: true,
    subscription_discount: 20,
    mood: "energy",
    how_to_use:
      "Morning: Mix one scoop of Marine Collagen Peptides into your coffee or smoothie. Afternoon: Take 2 Glow-Boosting Gummies as a delicious skin-boosting treat. Use consistently for 30+ days for visible results.",
    variants: [
      { id: "v1", name: "30 Day Stack", price: 64.99 },
      { id: "v2", name: "60 Day Stack", price: 119.99 },
    ],
    ingredients: [
      {
        name: "Marine Collagen Peptides",
        amount: "10g",
        benefit:
          "The complete collagen foundation — type I and III peptides with Vitamin C, Hyaluronic Acid, and Zinc for comprehensive skin support.",
      },
      {
        name: "Glow Gummies Complex",
        amount: "2 gummies",
        benefit:
          "Vitamin C (250mg), Vitamin E (15mg), Biotin (5000mcg), and Berry Antioxidants (100mg) for brightening, protection, and a visible radiance boost.",
      },
    ],
    reviews: [
      {
        id: "eg-1",
        name: "Michelle B.",
        rating: 5,
        comment:
          "Buying the stack saved me so much money and having both products in my routine has been incredible. My skin has never looked this good — people keep asking what I'm using.",
        is_verified: true,
        created_at: "2025-08-11",
      },
      {
        id: "eg-2",
        name: "Yusuf K.",
        rating: 5,
        comment:
          "Perfect combo. Collagen in the morning, gummies in the afternoon. Simple, effective, and the savings compared to buying separately is a nice bonus.",
        is_verified: true,
        created_at: "2025-07-29",
      },
      {
        id: "eg-3",
        name: "Rachel D.",
        rating: 4,
        comment:
          "Great value for two quality products. I'm on month 2 and my skin texture has improved noticeably. Would love to see more bundle options in the future.",
        is_verified: false,
        created_at: "2025-07-20",
      },
    ],
  },

  "hyaluronic-acid-serum": {
    name: "Hyaluronic Acid Serum",
    slug: "hyaluronic-acid-serum",
    description:
      "Lightweight, fast-absorbing serum with multi-weight Hyaluronic Acid for deep, multi-layer hydration. Plumps, smooths, and gives your skin an instant glass-skin finish.",
    long_description:
      "This isn't just another Hyaluronic Acid serum — it's a three-weight hydration system that works on every layer of your skin.\n\nLow molecular weight HA (50kDa) penetrates deep into the dermis for long-lasting hydration. Medium weight HA (300kDa) plumps the mid-layers, smoothing fine lines. High molecular weight HA (1500kDa) forms a breathable moisture shield on the surface, preventing transepidermal water loss.\n\nThe result is skin that looks and feels genuinely hydrated — not just coated in a temporary film. Lightweight, non-sticky, and fast-absorbing, it layers beautifully under moisturizer and sunscreen. Works synergistically with our Marine Collagen Peptides for a complete hydration strategy inside and out.",
    price: 27.99,
    compare_at_price: undefined,
    images: [
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&q=80",
      "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=800&q=80",
      "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800&q=80",
    ],
    ratings: 4.5,
    review_count: 82,
    is_bestseller: false,
    is_subscription: true,
    subscription_discount: 15,
    mood: "glow",
    how_to_use:
      "Apply 3-4 drops to clean, slightly damp skin morning and evening. Pat gently — don't rub. Follow with moisturizer to lock in hydration. For best results, use consistently and pair with sunscreen during the day.",
    variants: [
      { id: "v1", name: "30ml", price: 27.99 },
      { id: "v2", name: "50ml", price: 39.99 },
    ],
    ingredients: [
      {
        name: "Triple-Weight Hyaluronic Acid",
        amount: "2%",
        benefit:
          "Three molecular weights work at different skin depths: low (50kDa) for deep dermal hydration, medium (300kDa) for mid-layer plumping, and high (1500kDa) for surface moisture lock.",
      },
      {
        name: "Niacinamide",
        amount: "5%",
        benefit:
          "Vitamin B3 that strengthens the skin barrier, reduces pore appearance, and evens skin tone. Works synergistically with HA for comprehensive skin improvement.",
      },
      {
        name: "Panthenol (Vitamin B5)",
        amount: "2%",
        benefit:
          "Humectant that attracts and holds moisture while supporting skin barrier repair. Soothes irritation and enhances the hydrating effects of Hyaluronic Acid.",
      },
    ],
    reviews: [
      {
        id: "ha-1",
        name: "Lin X.",
        rating: 5,
        comment:
          "The glass skin effect is real. I pat this on damp skin and follow with moisturizer — my face looks like porcelain. Best HA serum I've used, and I've tried at least 10.",
        is_verified: true,
        created_at: "2025-08-09",
      },
      {
        id: "ha-2",
        name: "Zara M.",
        rating: 4,
        comment:
          "Lightweight and absorbs instantly. No sticky residue at all. My skin stays hydrated all day which is rare for me since I have combination skin.",
        is_verified: true,
        created_at: "2025-07-27",
      },
      {
        id: "ha-3",
        name: "Emma S.",
        rating: 4,
        comment:
          "Nice formula, the multi-weight HA is a smart approach. I noticed plumper skin within a week. Only downside is the dropper could be better designed.",
        is_verified: false,
        created_at: "2025-07-18",
      },
    ],
  },

  "vitamin-c-brightening-gummies": {
    name: "Vitamin C Brightening Gummies",
    slug: "vitamin-c-brightening-gummies",
    description:
      "High-potency Vitamin C gummies with turmeric and citrus bioflavonoids for powerful antioxidant protection and a visibly brighter, more even complexion.",
    long_description:
      "When it comes to skin brightening, Vitamin C is the gold standard — and these gummies deliver a clinical 500mg dose in every serving.\n\nBut we didn't stop there. We added Turmeric (with curcumin for anti-inflammatory support) and Citrus Bioflavonoids (which enhance Vitamin C absorption by up to 30%). The result is a brightening supplement that works from multiple angles.\n\nClinical research shows that consistent Vitamin C supplementation can reduce hyperpigmentation, even out skin tone, and protect against UV-induced damage — all while supporting your body's natural collagen production.\n\nTropical orange flavor makes these a pleasure to take. Vegan, gluten-free, and made with natural colors from real fruit.",
    price: 26.99,
    compare_at_price: undefined,
    images: [
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&q=80",
      "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=800&q=80",
      "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=800&q=80",
    ],
    ratings: 4.6,
    review_count: 115,
    is_bestseller: false,
    is_subscription: true,
    subscription_discount: 15,
    mood: "glow",
    how_to_use:
      "Take 2 gummies daily with food. Best taken in the morning for maximum antioxidant protection throughout the day. For enhanced brightening, combine with daily SPF 30+ sunscreen.",
    variants: [
      { id: "v1", name: "30 Day Supply (60 gummies)", price: 26.99 },
      { id: "v2", name: "60 Day Supply (120 gummies)", price: 48.99 },
    ],
    ingredients: [
      {
        name: "Vitamin C",
        amount: "500mg",
        benefit:
          "High-dose ascorbic acid for collagen synthesis, brightening, and powerful antioxidant defense against UV damage and environmental stressors.",
      },
      {
        name: "Turmeric Extract",
        amount: "50mg",
        benefit:
          "Standardized to 95% curcuminoids for anti-inflammatory and antioxidant support. Helps reduce redness and evening out skin tone over time.",
      },
      {
        name: "Citrus Bioflavonoids",
        amount: "100mg",
        benefit:
          "Natural compounds from citrus peels that enhance Vitamin C absorption by up to 30% and provide additional antioxidant protection for skin cells.",
      },
    ],
    reviews: [
      {
        id: "vc-1",
        name: "Amara O.",
        rating: 5,
        comment:
          "My dark spots have noticeably faded after 6 weeks. The turmeric addition is clever — I can feel the anti-inflammatory effect. Great tasting gummies too.",
        is_verified: true,
        created_at: "2025-08-08",
      },
      {
        id: "vc-2",
        name: "Ben H.",
        rating: 4,
        comment:
          "Solid Vitamin C supplement. I take these in the morning instead of my old pills. More enjoyable and seems to be working better.",
        is_verified: true,
        created_at: "2025-07-24",
      },
    ],
  },

  "complete-glow-bundle": {
    name: "Complete Glow Bundle",
    slug: "complete-glow-bundle",
    description:
      "Our most popular products in one curated set: Marine Collagen, Glow Gummies, Beauty Sleep, and Hyaluronic Acid Serum. Save 17% compared to buying individually.",
    long_description:
      "The Complete Glow Bundle is everything you need for a full-spectrum skin wellness routine, inside and out.\n\nHere's what's included:\n\n1. Marine Collagen Peptides (30 Day Supply) — Your morning foundation for skin structure and elasticity.\n2. Glow-Boosting Gummies (30 Day Supply) — Your afternoon vitamin boost for brightening and protection.\n3. Beauty Sleep Complex (30 Day Supply) — Your nighttime repair support for restorative sleep and overnight skin renewal.\n4. Hyaluronic Acid Serum (30ml) — Your topical hydration hero for a glass-skin finish.\n\nThis is the routine that 10,000+ customers swear by. Morning collagen, afternoon gummies, evening serum, and bedtime sleep support. Complete, simple, effective.",
    price: 89.99,
    compare_at_price: 107.97,
    images: [
      "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=800&q=80",
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&q=80",
      "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=800&q=80",
    ],
    ratings: 4.9,
    review_count: 63,
    is_bestseller: true,
    is_subscription: true,
    subscription_discount: 20,
    mood: "glow",
    how_to_use:
      "Morning: 1 scoop Marine Collagen in coffee or smoothie. Afternoon: 2 Glow Gummies. Evening: Apply Hyaluronic Acid Serum to clean, damp skin. Bedtime: 2 Beauty Sleep capsules. Consistent daily use for 30+ days recommended.",
    variants: [
      { id: "v1", name: "30 Day Bundle", price: 89.99 },
      { id: "v2", name: "60 Day Bundle", price: 164.99 },
    ],
    ingredients: [
      {
        name: "Marine Collagen Peptides",
        amount: "10g per scoop",
        benefit:
          "Type I and III collagen with Vitamin C, Hyaluronic Acid, and Zinc for skin structure and elasticity.",
      },
      {
        name: "Glow Gummies Vitamins",
        amount: "2 gummies",
        benefit:
          "Vitamin C, E, Biotin, and Berry Antioxidants for brightening and daily protection.",
      },
      {
        name: "Beauty Sleep Blend",
        amount: "2 capsules",
        benefit:
          "Magnesium Glycinate, L-Theanine, Valerian Root, and Chamomile for deep, restorative sleep.",
      },
      {
        name: "Hyaluronic Acid Serum",
        amount: "3-4 drops",
        benefit:
          "Triple-weight HA with Niacinamide and Panthenol for multi-layer hydration and barrier repair.",
      },
    ],
    reviews: [
      {
        id: "cg-1",
        name: "Samantha W.",
        rating: 5,
        comment:
          "This bundle changed my entire skincare routine. Having everything I need in one set made it so easy to stay consistent. My skin is genuinely glowing after 5 weeks.",
        is_verified: true,
        created_at: "2025-08-16",
      },
      {
        id: "cg-2",
        name: "Daniel F.",
        rating: 5,
        comment:
          "Bought this as a gift for my wife and she's obsessed. The value is incredible for the quality you get. Already planning to reorder.",
        is_verified: false,
        created_at: "2025-08-03",
      },
      {
        id: "cg-3",
        name: "Leila A.",
        rating: 5,
        comment:
          "Best investment in my skin. The combination of internal supplements and the topical serum covers all bases. I've never had so many compliments on my skin.",
        is_verified: true,
        created_at: "2025-07-26",
      },
    ],
  },
};

/** Get product by slug, or undefined if not found */
export function getProductBySlug(slug: string): MockProduct | undefined {
  return MOCK_PRODUCTS[slug];
}

/** Get all products as an array */
export function getAllProducts(): MockProduct[] {
  return Object.values(MOCK_PRODUCTS);
}

/** Get bestseller products */
export function getBestsellers(): MockProduct[] {
  return Object.values(MOCK_PRODUCTS).filter((p) => p.is_bestseller);
}
