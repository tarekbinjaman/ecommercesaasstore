/* ------------------------------------------------------------------ */
/*  TYPES                                                              */
/* ------------------------------------------------------------------ */

// ✅ should look like this
export type Category = {
  id: string;
  name: string;
  nameBn: string;
  image: string;
};

export type ProductImage = {
  url: string;
  alt: string;
};

export type Brand = {
  id: string;
  name: string;
  nameBn: string;
};

/** Union of every flag a product can carry. Add more here as your catalog grows. */
export type ProductFlag =
  | "new-arrival"
  | "on-sale"
  | "best-seller"
  | "top-rated"
  | "trending"
  | "limited-stock"
  | "back-in-stock"
  | "featured"
  | "flash-sale";


export type Product = {
  id: string;
  slug: string;
  name: string;
  nameBn: string;
  categoryId: string;
  brandId?: string;
  flag?: ProductFlag;
  description: string;
  price: number;
  oldPrice?: number;
  discount?: number;
  unit: string;
  inStock: boolean;
  stockQuantity: number;
  images: ProductImage[];
};


/* ------------------------------------------------------------------ */
/*  CATEGORIES                                                         */
/* ------------------------------------------------------------------ */

export const categories: Category[] = [
  {
    id: "rice-grains",
    name: "Rice & Grains",
    nameBn: "চাল ও শস্য",
    image:
      "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "lentils-pulses",
    name: "Lentils & Pulses",
    nameBn: "ডাল ও শুঁটি",
    image:
      "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "cooking-oil",
    name: "Cooking Oil",
    nameBn: "রান্নার তেল",
    image:
      "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "spices-condiments",
    name: "Spices & Condiments",
    nameBn: "মসলা ও আচার",
    image:
      "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "fresh-vegetables",
    name: "Fresh Vegetables",
    nameBn: "তাজা সবজি",
    image:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "fresh-fruits",
    name: "Fresh Fruits",
    nameBn: "তাজা ফল",
    image:
      "https://images.unsplash.com/photo-1518843875459-f738682238a6?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "fresh-fish",
    name: "Fresh Fish",
    nameBn: "তাজা মাছ",
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "meat-poultry",
    name: "Meat & Poultry",
    nameBn: "মাংস ও মুরগি",
    image:
      "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "dairy",
    name: "Dairy",
    nameBn: "দুগ্ধজাত পণ্য",
    image:
      "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "eggs",
    name: "Eggs",
    nameBn: "ডিম",
    image:
      "https://images.unsplash.com/photo-1506976785307-8732e854ad03?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "tea-coffee",
    name: "Tea & Coffee",
    nameBn: "চা ও কফি",
    image:
      "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "snacks-biscuits",
    name: "Snacks & Biscuits",
    nameBn: "নাশতা ও বিস্কুট",
    image:
      "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "noodles-pasta",
    name: "Noodles & Pasta",
    nameBn: "নুডলস ও পাস্তা",
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "bakery",
    name: "Bakery",
    nameBn: "বেকারি",
    image:
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "salt-sugar",
    name: "Salt & Sugar",
    nameBn: "লবণ ও চিনি",
    image:
      "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=400&q=80",
  },
];


export const brands: Brand[] = [
  { id: "aci",         name: "ACI Pure",      nameBn: "এসিআই পিউর" },
  { id: "fresh",       name: "Fresh",         nameBn: "ফ্রেশ" },
  { id: "pran",        name: "Pran",          nameBn: "প্রাণ" },
  { id: "radhuni",     name: "Radhuni",       nameBn: "রাঁধুনী" },
  { id: "teer",        name: "Teer",          nameBn: "তীর" },
  { id: "rupchanda",   name: "Rupchanda",     nameBn: "রূপচাঁদা" },
  { id: "milkvita",    name: "Milk Vita",     nameBn: "মিল্ক ভিটা" },
  { id: "ispahani",    name: "Ispahani",      nameBn: "ইস্পাহানি" },
  { id: "bombay",      name: "Bombay Sweets", nameBn: "বম্বে সুইটস" },
  { id: "olympic",     name: "Olympic",       nameBn: "অলিম্পিক" },
  { id: "bengal-meat", name: "Bengal Meat",   nameBn: "বেঙ্গল মিট" },
  { id: "local-farm",  name: "Local Farm",    nameBn: "স্থানীয় খামার" },
];

export const FLAG_META: Record<
  ProductFlag,
  { label: string; labelBn: string; color: string }
> = {
  "new-arrival":   { label: "New Arrival",   labelBn: "নতুন এসেছে",  color: "#2563eb" },
  "on-sale":       { label: "On Sale",       labelBn: "ছাড়ে",        color: "#dc2626" },
  "best-seller":   { label: "Best Seller",   labelBn: "বেস্ট সেলার", color: "#1A9D5B" },
  "top-rated":     { label: "Top Rated",     labelBn: "সেরা রেটিং",  color: "#7c3aed" },
  "trending":      { label: "Trending",      labelBn: "ট্রেন্ডিং",    color: "#ea580c" },
  "limited-stock": { label: "Limited Stock", labelBn: "সীমিত স্টক",  color: "#d97706" },
  "back-in-stock": { label: "Back in Stock", labelBn: "আবার এসেছে",  color: "#0891b2" },
  "featured":      { label: "Featured",      labelBn: "ফিচার্ড",      color: "#be185d" },
  "flash-sale":    {label: "Flash Sale",     labelBn: "ফ্ল্যাশ সেল", color: "#e11d48",
  },
};

/* ------------------------------------------------------------------ */
/*  PRODUCTS                                                           */
/* ------------------------------------------------------------------ */

export const products: Product[] = [
  {
    "id": "groc-001",
    "slug": "miniket-rice",
    "name": "Miniket Rice",
    "nameBn": "মিনিকেট চাল",
    "categoryId": "rice-grains",
    "brandId": "fresh",
    "flag": "best-seller",
    "description": "Miniket Rice is a widely trusted everyday rice in Bangladeshi households, known for its slender, polished grains and dependable cooking results. It cooks up soft, fluffy, and separate, making it suitable for plain rice, tehari, fried rice, and regular family meals. This 1 kg pack is ideal for daily kitchen use and pairs well with dal, fish curry, chicken, and vegetables. Store in an airtight container in a cool, dry place to preserve freshness and protect against moisture.",
    "price": 78,
    "unit": "1 kg",
    "inStock": true,
    "stockQuantity": 85,
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=900&q=80",
        "alt": "Grains for a rice and pantry staple"
      },
      {
        "url": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80",
        "alt": "A prepared meal served with rice"
      }
    ]
  },
  {
    "id": "groc-002",
    "slug": "chinigura-aromatic-rice",
    "name": "Chinigura Aromatic Rice",
    "nameBn": "চিনিগুঁড়া সুগন্ধি চাল",
    "categoryId": "rice-grains",
    "brandId": "pran",
    "flag": "new-arrival",
    "description": "Chinigura Aromatic Rice is a fragrant short-grain rice prized for its delicate aroma and naturally sweet flavour. It is the preferred choice for special-occasion dishes such as biryani, pulao, khichuri, and payesh, where its scent and texture can really shine. When cooked, the grains remain tender yet distinct, absorbing spices and ghee beautifully. Keep sealed in a cool, dry place and rinse gently before cooking to preserve its fragrance.",
    "price": 145,
    "oldPrice": 160,
    "discount": 9,
    "unit": "1 kg",
    "inStock": true,
    "stockQuantity": 42,
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=900&q=80",
        "alt": "Grain close-up for aromatic rice"
      },
      {
        "url": "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80",
        "alt": "Aromatic rice meal with spices"
      }
    ]
  },
  {
    "id": "groc-003",
    "slug": "masoor-dal",
    "name": "Red Lentils (Masoor Dal)",
    "nameBn": "মসুর ডাল",
    "categoryId": "lentils-pulses",
    "brandId": "aci",
    "flag": "best-seller",
    "description": "Red Lentils (Masoor Dal) are split, quick-cooking lentils that form the backbone of everyday Bengali meals. They turn soft and creamy in a short time, making them perfect for classic dal, khichuri, soups, and lentil fritters. Their mild, earthy flavour accepts garlic, onion, turmeric, and mustard oil beautifully. This 1 kg pack is a practical pantry staple for busy households and can be stored in an airtight jar away from sunlight.",
    "price": 125,
    "oldPrice": 140,
    "discount": 11,
    "unit": "1 kg",
    "inStock": true,
    "stockQuantity": 60,
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=900&q=80",
        "alt": "A selection of dry pantry ingredients and spices"
      }
    ]
  },
  {
    "id": "groc-004",
    "slug": "mung-dal",
    "name": "Mung Dal",
    "nameBn": "মুগ ডাল",
    "categoryId": "lentils-pulses",
    "brandId": "fresh",
    "flag": "trending",
    "description": "Mung Dal is a nutritious, nutty-tasting lentil rich in protein and fibre. It is commonly used in bhuna khichuri, soups, and light home-style dal, and it cooks to a pleasant creamy texture while holding its shape. Its gentle flavour makes it easy to pair with ginger, cumin, green chillies, and seasonal vegetables. Store in a dry, airtight container to keep it free from moisture and insects.",
    "price": 150,
    "unit": "1 kg",
    "inStock": true,
    "stockQuantity": 36,
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=900&q=80",
        "alt": "Dry grains and pulses"
      }
    ]
  },
  {
    "id": "groc-005",
    "slug": "cold-pressed-mustard-oil",
    "name": "Mustard Oil",
    "nameBn": "সরিষার তেল",
    "categoryId": "cooking-oil",
    "brandId": "teer",
    "flag": "best-seller",
    "description": "Mustard Oil is a bold, pungent cooking oil central to traditional Bengali cuisine. Its sharp aroma and robust taste make it ideal for fish curries, bhorta, pickles, marinades, and stir-fried vegetables. Many households also value it for its traditional culinary and cultural significance. This 500 ml bottle should be kept tightly closed in a cool, dark place to maintain its characteristic pungency and freshness.",
    "price": 240,
    "unit": "500 ml",
    "inStock": true,
    "stockQuantity": 28,
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=900&q=80",
        "alt": "Cooking ingredients and spices"
      },
      {
        "url": "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80",
        "alt": "Traditional food prepared with Bengali spices"
      }
    ]
  },
  {
    "id": "groc-006",
    "slug": "turmeric-powder",
    "name": "Turmeric Powder",
    "nameBn": "হলুদ গুঁড়া",
    "categoryId": "spices-condiments",
    "brandId": "radhuni",
    "flag": "limited-stock",
    "description": "Turmeric Powder is a bright golden spice ground from dried turmeric root and used daily in Bangladeshi cooking. It adds warm, earthy flavour and a rich colour to fish curry, vegetable dishes, lentil dal, and marinades. Besides its culinary role, it is valued for its traditional wellness associations. Store in an airtight container away from direct sunlight to protect its colour and aroma.",
    "price": 55,
    "oldPrice": 65,
    "discount": 15,
    "unit": "200 g",
    "inStock": true,
    "stockQuantity": 70,
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=900&q=80",
        "alt": "Ground spices and pantry seasonings"
      },
      {
        "url": "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80",
        "alt": "Spiced curry ingredients"
      }
    ]
  },
  {
    "id": "groc-007",
    "slug": "mixed-fruit-pickle",
    "name": "Mixed Fruit Pickle",
    "nameBn": "মিশ্র ফলের আচার",
    "categoryId": "spices-condiments",
    "brandId": "pran",
    "flag": "new-arrival",
    "description": "Mixed Fruit Pickle is a sweet, tangy, and mildly spiced achar made with fruit pieces in a rich, oily masala. It is a classic accompaniment to plain rice, khichuri, paratha, and tea-time snacks, adding a burst of flavour to every bite. The balance of sweetness and heat makes it especially popular during festive meals and family gatherings. Refrigerate after opening and always use a clean, dry spoon.",
    "price": 180,
    "unit": "400 g jar",
    "inStock": true,
    "stockQuantity": 20,
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=900&q=80",
        "alt": "Spices and condiments"
      },
      {
        "url": "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80",
        "alt": "A traditional meal served with condiments"
      }
    ]
  },
  {
    "id": "groc-008",
    "slug": "potato",
    "name": "Fresh Potatoes",
    "nameBn": "আলু",
    "categoryId": "fresh-vegetables",
    "brandId": "local-farm",
    "flag": "best-seller",
    "description": "Fresh Potatoes are a versatile everyday vegetable used in countless Bangladeshi dishes, from bhaji and curry to mashed potato and cutlets. They have a smooth texture and mild flavour that absorbs spices well, making them indispensable in the kitchen. This 1 kg pack is selected for freshness and all-purpose cooking. Keep in a cool, dark, well-ventilated place and avoid direct sunlight to prevent sprouting.",
    "price": 35,
    "unit": "1 kg",
    "inStock": true,
    "stockQuantity": 95,
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=900&q=80",
        "alt": "Fresh vegetables at a market"
      },
      {
        "url": "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?auto=format&fit=crop&w=900&q=80",
        "alt": "Assorted fresh produce"
      }
    ]
  },
  {
    "id": "groc-009",
    "slug": "red-onion",
    "name": "Red Onion",
    "nameBn": "লাল পেঁয়াজ",
    "categoryId": "fresh-vegetables",
    "brandId": "local-farm",
    "flag": "limited-stock",
    "description": "Red Onion is one of the most essential ingredients in Bangladeshi cooking, valued for its sharp flavour and natural sweetness when fried. It is used in curries, bhuna, salads, marinades, and crispy fried onions that garnish biryani and polao. This 1 kg pack offers firm, fresh onions suitable for daily kitchen use. Store in a dry, airy place away from potatoes and moisture to help them last longer.",
    "price": 65,
    "unit": "1 kg",
    "inStock": true,
    "stockQuantity": 75,
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=900&q=80",
        "alt": "Fresh market vegetables"
      }
    ]
  },
  {
    "id": "groc-010",
    "slug": "ripe-mango",
    "name": "Ripe Seasonal Mangoes",
    "nameBn": "পাকা মৌসুমি আম",
    "categoryId": "fresh-fruits",
    "brandId": "local-farm",
    "flag": "trending",
    "description": "Ripe Seasonal Mangoes are a celebrated summer fruit in Bangladesh, enjoyed for their juicy flesh, sweet aroma, and vibrant flavour. They are perfect for eating fresh, blending into smoothies, or making desserts such as mango firni and mango lassi. Because varieties and sizes change with the season, each batch may offer a slightly different taste and texture. Keep at room temperature until ripe, then refrigerate for a refreshing treat.",
    "price": 160,
    "unit": "1 kg",
    "inStock": true,
    "stockQuantity": 32,
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1518843875459-f738682238a6?auto=format&fit=crop&w=900&q=80",
        "alt": "Fresh fruit assortment"
      },
      {
        "url": "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=900&q=80",
        "alt": "Fresh tropical fruit"
      }
    ]
  },
  {
    "id": "groc-011",
    "slug": "sagor-banana",
    "name": "Sagor Bananas",
    "nameBn": "সাগর কলা",
    "categoryId": "fresh-fruits",
    "brandId": "local-farm",
    "description": "Sagor Bananas are naturally sweet, soft, and easy to digest, making them a favourite breakfast and snack fruit in Bangladesh. They are great on their own, sliced into cereal, blended into smoothies, or packed in lunchboxes for an energy boost. Their mild flavour and creamy texture also work well in desserts and baking. Store at room temperature and refrigerate only after they are fully ripe.",
    "price": 60,
    "unit": "1 dozen",
    "inStock": true,
    "stockQuantity": 40,
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=900&q=80",
        "alt": "Fresh bananas"
      },
      {
        "url": "https://images.unsplash.com/photo-1518843875459-f738682238a6?auto=format&fit=crop&w=900&q=80",
        "alt": "Fresh seasonal fruit"
      }
    ]
  },
  {
    "id": "groc-012",
    "slug": "rohu-fish-cut-cleaned",
    "name": "Rohu Fish (Cut & Cleaned)",
    "nameBn": "রুই মাছ (কাটা ও পরিষ্কার)",
    "categoryId": "fresh-fish",
    "flag": "limited-stock",
    "description": "Rohu Fish (Cut & Cleaned) is a popular freshwater fish in Bangladeshi cuisine, known for its firm texture and ability to absorb rich spices. The fish is cleaned and cut into curry-ready pieces, saving time in the kitchen. It is ideal for traditional fish curry, bhuna, and mustard-based preparations. Because freshness depends on the day's catch, cook soon after purchase or refrigerate immediately and use within a short time.",
    "price": 380,
    "unit": "1 kg",
    "inStock": true,
    "stockQuantity": 18,
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80",
        "alt": "Fresh meal ingredients"
      },
      {
        "url": "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80",
        "alt": "Bengali-style curry inspiration"
      }
    ]
  },
  {
    "id": "groc-013",
    "slug": "broiler-chicken",
    "name": "Broiler Chicken (Skinless)",
    "nameBn": "ব্রয়লার মুরগি (চামড়া ছাড়া)",
    "categoryId": "meat-poultry",
    "brandId": "bengal-meat",
    "flag": "best-seller",
    "description": "Broiler Chicken (Skinless) is a convenient, versatile protein for everyday family meals. The cleaned, skinless portions are ready for curry, roast, grill, or quick stir-fries, and they absorb marinades and spices well. Skinless cuts are a lighter option while still providing rich flavour and tenderness. Keep refrigerated and cook thoroughly; use within one to two days for best freshness.",
    "price": 220,
    "unit": "1 kg",
    "inStock": true,
    "stockQuantity": 24,
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&w=900&q=80",
        "alt": "Fresh meat prepared for cooking"
      },
      {
        "url": "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80",
        "alt": "Cooked curry with Bengali spices"
      }
    ]
  },
  {
    "id": "groc-014",
    "slug": "pasteurized-full-cream-milk",
    "name": "Pasteurized Full-Cream Milk",
    "nameBn": "পাস্তুরিত ফুল-ক্রিম দুধ",
    "categoryId": "dairy",
    "brandId": "milkvita",
    "flag": "best-seller",
    "description": "Pasteurized Full-Cream Milk is a chilled dairy staple with a rich, creamy taste and smooth texture. It is ideal for tea, coffee, cereal, desserts, custards, and everyday drinking. The full-cream variety adds body and richness to both sweet and savoury recipes. Keep refrigerated at all times, and once opened, consume within the recommended period and store in a clean, covered container.",
    "price": 95,
    "unit": "1 litre",
    "inStock": true,
    "stockQuantity": 26,
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=900&q=80",
        "alt": "Milk and dairy product"
      },
      {
        "url": "https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=900&q=80",
        "alt": "Fresh milk"
      }
    ]
  },
  {
    "id": "groc-015",
    "slug": "farm-eggs",
    "name": "Farm Eggs",
    "nameBn": "খামারের ডিম",
    "categoryId": "eggs",
    "brandId": "teer",
    "flag": "limited-stock",
    "description": "Farm Eggs are fresh, versatile, and packed with protein, making them a daily essential in Bangladeshi kitchens. They are perfect for breakfast, baking, omelettes, boiled egg curries, and quick snacks. Their neutral flavour works in both sweet and savoury dishes. Store in a cool place or refrigerator, keep them away from strong-smelling foods, and use within the recommended date for best quality.",
    "price": 145,
    "unit": "12 pieces",
    "inStock": true,
    "stockQuantity": 30,
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1506976785307-8732e854ad03?auto=format&fit=crop&w=900&q=80",
        "alt": "Fresh eggs"
      },
      {
        "url": "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=900&q=80",
        "alt": "Breakfast ingredients including eggs"
      }
    ]
  },
  {
    "id": "groc-016",
    "slug": "bangladeshi-black-tea",
    "name": "Strong Black Tea",
    "nameBn": "কড়া কালো চা",
    "categoryId": "tea-coffee",
    "brandId": "ispahani",
    "flag": "trending",
    "description": "Strong Black Tea is a full-bodied tea with a robust flavour, ideal for a strong morning cup or classic Bangladeshi milk tea. It brews to a rich, dark liquor that stands up well to milk, sugar, cardamom, and ginger. This 200 g pack is suitable for daily tea lovers who prefer a bold taste. Store in an airtight container away from moisture, heat, and strong odours to preserve its aroma.",
    "price": 180,
    "unit": "200 g",
    "inStock": true,
    "stockQuantity": 38,
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=900&q=80",
        "alt": "A cup of tea"
      },
      {
        "url": "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80",
        "alt": "Food and spices served with tea"
      }
    ]
  },
  {
    "id": "groc-017",
    "slug": "chanachur-mix",
    "name": "Spicy Chanachur Mix",
    "nameBn": "ঝাল চানাচুর",
    "categoryId": "snacks-biscuits",
    "brandId": "bombay",
    "flag": "new-arrival",
    "description": "Spicy Chanachur Mix is a crunchy, savoury snack blend inspired by the popular Bangladeshi tea-time favourite. It combines crispy noodles, lentils, peanuts, and spices for a satisfying mix of heat, tang, and texture. Enjoy it on its own, with tea, or as a topping for salads and chaat. Keep the pack tightly closed after opening and store in a cool, dry place to maintain its crunch.",
    "price": 50,
    "oldPrice": 60,
    "discount": 17,
    "unit": "250 g pack",
    "inStock": true,
    "stockQuantity": 55,
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=900&q=80",
        "alt": "Spiced snack ingredients"
      },
      {
        "url": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80",
        "alt": "Assorted food for a snack spread"
      }
    ]
  },
  {
    "id": "groc-018",
    "slug": "instant-chicken-noodles",
    "name": "Instant Chicken Noodles",
    "nameBn": "ইনস্ট্যান্ট চিকেন নুডলস",
    "categoryId": "noodles-pasta",
    "brandId": "pran",
    "flag": "best-seller",
    "description": "Instant Chicken Noodles are a quick and convenient option for a fast snack or light meal. The seasoned noodles cook in minutes and can be enjoyed as they are or upgraded with vegetables, eggs, chicken, or chillies. Their savoury chicken flavour makes them a popular choice for students, busy families, and late-night cravings. Store in a cool, dry place and follow the pack instructions for best results.",
    "price": 25,
    "oldPrice": 30,
    "discount": 17,
    "unit": "70 g pack",
    "inStock": true,
    "stockQuantity": 100,
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80",
        "alt": "A quick meal with fresh ingredients"
      },
      {
        "url": "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80",
        "alt": "A prepared noodle-style meal"
      }
    ]
  },
  {
    "id": "groc-019",
    "slug": "soft-sliced-bread",
    "name": "Soft Sliced Bread",
    "nameBn": "নরম পাউরুটি",
    "categoryId": "bakery",
    "brandId": "olympic",
    "flag": "new-arrival",
    "description": "Soft Sliced Bread is a freshly baked-style loaf with a tender texture, ideal for toast, sandwiches, and quick breakfasts. It pairs well with eggs, butter, jam, tea, or savoury fillings, making it a versatile household staple. The slices are soft enough for children and sturdy enough for grilled sandwiches. Keep the loaf sealed and store in a cool, dry place; refrigerate or freeze for longer freshness.",
    "price": 65,
    "unit": "400 g loaf",
    "inStock": true,
    "stockQuantity": 22,
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=900&q=80",
        "alt": "Freshly baked bread"
      },
      {
        "url": "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=900&q=80",
        "alt": "Bread as part of a breakfast spread"
      }
    ]
  },
  {
    "id": "groc-020",
    "slug": "refined-white-sugar",
    "name": "Refined White Sugar",
    "nameBn": "পরিশোধিত সাদা চিনি",
    "categoryId": "salt-sugar",
    "brandId": "fresh",
    "description": "Refined White Sugar is a fine, free-flowing sweetener used daily in tea, coffee, baking, desserts, and countless Bangladeshi sweets. It dissolves easily and blends smoothly into batters, drinks, and syrups. This 1 kg pack is a practical pantry essential for family kitchens. Store in an airtight container in a cool, dry place to prevent clumping and moisture absorption.",
    "price": 135,
    "unit": "1 kg",
    "inStock": true,
    "stockQuantity": 62,
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=900&q=80",
        "alt": "Pantry ingredients and seasonings"
      }
    ]
  }
]


/* ------------------------------------------------------------------ */
/* FLASH SALE PRODUCT                                                 */
/* ------------------------------------------------------------------ */

/* ------------------------------------------------------------------ */
/* FLASH SALE PRODUCT                                                 */
/* ------------------------------------------------------------------ */

export const flashSale: Product[] = [
  {
    "id": "groc-101",
    "slug": "miniket-rice-flash-sale",
    "name": "Miniket Rice",
    "nameBn": "মিনিকেট চাল",
    "categoryId": "rice-grains",
    "brandId": "fresh",
    "flag": "flash-sale",
    "description": "Miniket Rice is a popular everyday staple in Bangladeshi households, known for its slender grains and fluffy texture. Suitable for daily meals, fried rice, and traditional rice dishes. Store in a cool, dry place.",
    "price": 65,
    "oldPrice": 78,
    "discount": 17,
    "unit": "1 kg",
    "inStock": true,
    "stockQuantity": 85,
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=900&q=80",
        "alt": "Rice grains for a pantry staple"
      }
    ]
  },
  {
    "id": "groc-102",
    "slug": "fresh-red-lentils-flash-sale",
    "name": "Red Lentils",
    "nameBn": "মসুর ডাল",
    "categoryId": "lentils-pulses",
    "brandId": "fresh",
    "flag": "flash-sale",
    "description": "Red lentils are a kitchen essential for preparing comforting dal and everyday Bangladeshi meals. They cook quickly and pair well with rice, vegetables, and fish curry.",
    "price": 89,
    "oldPrice": 110,
    "discount": 19,
    "unit": "1 kg",
    "inStock": true,
    "stockQuantity": 60,
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1515543904379-3d757afe72e4?auto=format&fit=crop&w=900&q=80",
        "alt": "Dry lentils and legumes"
      }
    ]
  },
  {
    "id": "groc-103",
    "slug": "soybean-oil-flash-sale",
    "name": "Soybean Oil",
    "nameBn": "সয়াবিন তেল",
    "categoryId": "cooking-oil",
    "brandId": "fresh",
    "flag": "flash-sale",
    "description": "Soybean oil is a versatile cooking oil for everyday frying, sautéing, and preparing family meals. Keep the bottle sealed and store away from direct sunlight.",
    "price": 165,
    "oldPrice": 185,
    "discount": 11,
    "unit": "1 litre",
    "inStock": true,
    "stockQuantity": 42,
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=900&q=80",
        "alt": "Cooking oil in a glass bottle"
      }
    ]
  },
  {
    "id": "groc-104",
    "slug": "fresh-potatoes-flash-sale",
    "name": "Fresh Potatoes",
    "nameBn": "আলু",
    "categoryId": "fresh-vegetables",
    "brandId": "fresh",
    "flag": "flash-sale",
    "description": "Fresh potatoes are a versatile everyday vegetable for curries, fries, mashed potatoes, and traditional Bangladeshi dishes. Store in a cool, dry, well-ventilated place.",
    "price": 29,
    "oldPrice": 36,
    "discount": 19,
    "unit": "1 kg",
    "inStock": true,
    "stockQuantity": 100,
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=900&q=80",
        "alt": "Fresh potatoes"
      }
    ]
  },
  {
    "id": "groc-105",
    "slug": "fresh-eggs-flash-sale",
    "name": "Farm Fresh Eggs",
    "nameBn": "ডিম",
    "categoryId": "eggs",
    "brandId": "fresh",
    "flag": "flash-sale",
    "description": "Farm fresh eggs are a convenient source of protein for breakfast, snacks, baking, and everyday meals. Keep refrigerated and cook thoroughly before serving.",
    "price": 105,
    "oldPrice": 120,
    "discount": 13,
    "unit": "12 pcs",
    "inStock": true,
    "stockQuantity": 35,
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1506976785307-8732e854ad03?auto=format&fit=crop&w=900&q=80",
        "alt": "Fresh eggs"
      }
    ]
  },
  {
    "id": "groc-106",
    "slug": "full-cream-milk-flash-sale",
    "name": "Full Cream Milk",
    "nameBn": "ফুল ক্রিম দুধ",
    "categoryId": "dairy",
    "brandId": "fresh",
    "flag": "flash-sale",
    "description": "Full cream milk is suitable for tea, coffee, breakfast cereals, and everyday cooking. Follow the package storage instructions to maintain freshness.",
    "price": 85,
    "oldPrice": 95,
    "discount": 11,
    "unit": "1 litre",
    "inStock": true,
    "stockQuantity": 28,
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=900&q=80",
        "alt": "A glass of fresh milk"
      }
    ]
  },
  {
    "id": "groc-107",
    "slug": "premium-sugar-flash-sale",
    "name": "Refined Sugar",
    "nameBn": "চিনি",
    "categoryId": "salt-sugar",
    "brandId": "fresh",
    "flag": "flash-sale",
    "description": "Refined sugar is a pantry staple for sweetening tea, coffee, desserts, and homemade treats. Store in an airtight container in a dry place.",
    "price": 95,
    "oldPrice": 110,
    "discount": 14,
    "unit": "1 kg",
    "inStock": true,
    "stockQuantity": 55,
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1581441363689-1f3c3c414635?auto=format&fit=crop&w=900&q=80",
        "alt": "White sugar crystals"
      }
    ]
  },
  {
    "id": "groc-108",
    "slug": "instant-noodles-flash-sale",
    "name": "Instant Noodles",
    "nameBn": "ইনস্ট্যান্ট নুডলস",
    "categoryId": "noodles-pasta",
    "brandId": "fresh",
    "flag": "flash-sale",
    "description": "Instant noodles are a quick and convenient option for a snack or light meal. Prepare according to the package instructions and customize with vegetables or eggs.",
    "price": 25,
    "oldPrice": 30,
    "discount": 17,
    "unit": "1 pack",
    "inStock": true,
    "stockQuantity": 75,
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=900&q=80",
        "alt": "A bowl of prepared noodles"
      }
    ]
  }
];
/* ------------------------------------------------------------------ */
/*  HELPERS                                                            */
/* ------------------------------------------------------------------ */

const BN_DIGITS = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

/** Convert any latin digits inside a string/number to Bengali digits. */
export function toBnDigits(value: string | number): string {
  return String(value).replace(/\d/g, (d) => BN_DIGITS[Number(d)]);
}

/** Format a number as a Bengali taka string, e.g. 1500 -> "১,৫০০৳" */
export function formatBDT(amount: number): string {
  return `৳${amount.toLocaleString("en-US")}`;
}

/** Look up a category by its id (a.k.a. slug in the URL). */
export function getCategoryBySlug(slug?: string): Category | undefined {
  if (!slug) return undefined;
  return categories.find((c) => c.id === slug);
}

/** Look up a category by its id. */
export function getCategoryById(id?: string): Category | undefined {
  if (!id) return undefined;
  return categories.find((c) => c.id === id);
}

/** All products in a given category, or the whole catalog if no id is given. */
export function getProductsByCategory(categoryId?: string): Product[] {
  if (!categoryId) return products;
  return products.filter((p) => p.categoryId === categoryId);
}

/** Single product by its slug (searches both regular and flash sale products). */
export function getProductBySlug(slug: string): Product | undefined {
  return (
    products.find((p) => p.slug === slug) ?? 
    flashSale.find((p) => p.slug === slug)
  );
}

/** Look up a brand by id. */
export function getBrandById(id?: string): Brand | undefined {
  if (!id) return undefined;
  return brands.find((b) => b.id === id);
}

/** Brands that actually appear inside a given category (or the whole catalog). */
export function getBrandsInCategory(categoryId?: string): Brand[] {
  const inCategory = getProductsByCategory(categoryId);
  const used = new Set(
    inCategory.map((p) => p.brandId).filter(Boolean) as string[]
  );
  return brands.filter((b) => used.has(b.id));
}

/** Flags that actually appear inside a given category (or the whole catalog). */
export function getFlagsInCategory(categoryId?: string): ProductFlag[] {
  const inCategory = getProductsByCategory(categoryId);
  const used = new Set<ProductFlag>();
   inCategory.forEach((p) => { if (p.flag) used.add(p.flag); });
  return (Object.keys(FLAG_META) as ProductFlag[]).filter((f) => used.has(f));
}

/** Single product by its id (e.g. "groc-001"). */
export function getProductById(id?: string): Product | undefined {
  if (!id) return undefined;
  return products.find((p) => p.id === id);
}


/** Get all flash sale products. */
export function getFlashSaleProducts(): Product[] {
  return flashSale;
}

/** Find a single flash sale product by its id. */
export function getFlashSaleProductById(id: string): Product | undefined {
  return flashSale.find((p) => p.id === id);
}

/** Find a single flash sale product by its slug. */
export function getFlashSaleProductBySlug(slug: string): Product | undefined {
  return flashSale.find((p) => p.slug === slug);
}