/* ------------------------------------------------------------------ */
/*  TYPES                                                              */
/* ------------------------------------------------------------------ */

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

/** Union of every flag a product can carry. */
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
    id: "electronics",
    name: "Electronics",
    nameBn: "ইলেকট্রনিক্স",
    image:
      "https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "fashion",
    name: "Fashion",
    nameBn: "ফ্যাশন",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "beauty",
    name: "Beauty",
    nameBn: "বিউটি",
    image:
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "homes",
    name: "Home & Living",
    nameBn: "হোম ও লিভিং",
    image:
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "accessories",
    name: "Accessories",
    nameBn: "অ্যাক্সেসরিজ",
    image:
      "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "sports",
    name: "Sports",
    nameBn: "স্পোর্টস",
    image:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=400&q=80",
  },
];

/* ------------------------------------------------------------------ */
/*  BRANDS                                                             */
/* ------------------------------------------------------------------ */

export const brands: Brand[] = [
  { id: "urbanstep",    name: "UrbanStep",     nameBn: "আরবানস্টেপ" },
  { id: "cottonclub",   name: "Cotton Club",   nameBn: "কটন ক্লাব" },
  { id: "denimhouse",   name: "Denim House",   nameBn: "ডেনিম হাউস" },
  { id: "bloomwear",    name: "Bloomwear",     nameBn: "ব্লুমওয়্যার" },
  { id: "timeline",     name: "Timeline",      nameBn: "টাইমলাইন" },
  { id: "carryon",      name: "CarryOn",       nameBn: "ক্যারিওঅন" },
  { id: "leathercraft", name: "LeatherCraft",  nameBn: "লেদারক্রাফট" },
  { id: "shadeup",      name: "ShadeUp",       nameBn: "শেডআপ" },
  { id: "soundwave",    name: "SoundWave",     nameBn: "সাউন্ডওয়েভ" },
  { id: "pulsefit",     name: "PulseFit",      nameBn: "পালসফিট" },
  { id: "glowup",       name: "GlowUp",        nameBn: "গ্লোআপ" },
  { id: "purecare",     name: "PureCare",      nameBn: "পিওরকেয়ার" },
  { id: "homely",       name: "Homely",        nameBn: "হোমলি" },
  { id: "fitzone",      name: "FitZone",       nameBn: "ফিটজোন" },
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
  "flash-sale":    { label: "Flash Sale",    labelBn: "ফ্ল্যাশ সেল", color: "#e11d48" },
};

/* ------------------------------------------------------------------ */
/*  PRODUCTS                                                           */
/* ------------------------------------------------------------------ */

export const products: Product[] = [
  /* ---------- FASHION ---------- */
  {
    id: "fash-001",
    slug: "classic-everyday-sneakers",
    name: "Classic Everyday Sneakers",
    nameBn: "ক্লাসিক এভরিডে স্নিকার্স",
    categoryId: "fashion",
    brandId: "urbanstep",
    flag: "new-arrival",
    description:
      "The Classic Everyday Sneakers are built for all-day comfort with a cushioned insole, breathable upper, and lightweight rubber outsole. They pair effortlessly with jeans, joggers, or casual shorts, making them a versatile pick for daily wear. The understated silhouette keeps things clean and modern, while the durable stitching ensures they hold up through regular use. Wipe with a soft cloth to keep them looking fresh.",
    price: 2490,
    oldPrice: 2990,
    discount: 17,
    unit: "1 pair",
    inStock: true,
    stockQuantity: 40,
    images: [
      {
        url: "https://res.cloudinary.com/drvwvre57/image/upload/v1793093865/778821dc8676de592828ffded2ff95e5_ugcnlj.jpg",
        alt: "Classic everyday sneakers in a neutral colourway",
      },
    ],
  },
  {
    id: "fash-002",
    slug: "premium-running-sneakers",
    name: "Premium Running Sneakers",
    nameBn: "প্রিমিয়াম রানিং স্নিকার্স",
    categoryId: "fashion",
    brandId: "urbanstep",
    flag: "best-seller",
    description:
      "Designed for runners and gym-goers, the Premium Running Sneakers feature a responsive foam midsole, a breathable knit upper, and a grippy outsole for confident traction. The padded collar and tongue add extra comfort during long sessions, while the streamlined build keeps them looking sharp on and off the track. A great combination of performance and everyday style.",
    price: 2890,
    oldPrice: 3490,
    discount: 17,
    unit: "1 pair",
    inStock: true,
    stockQuantity: 32,
    images: [
      {
        url: "https://res.cloudinary.com/drvwvre57/image/upload/v1793094286/fc44a5fbba527eae04fd6cd16d4dc469_tqzjlg.jpg",
        alt: "Premium running sneakers with a modern sole",
      },
    ],
  },
  {
    id: "fash-003",
    slug: "premium-cotton-tshirt",
    name: "Premium Cotton T-Shirt",
    nameBn: "প্রিমিয়াম কটন টি-শার্ট",
    categoryId: "fashion",
    brandId: "cottonclub",
    flag: "new-arrival",
    description:
      "Crafted from 100% combed cotton, the Premium Cotton T-Shirt delivers a soft, breathable feel that stays comfortable all day. The regular fit sits comfortably across the shoulders, and the reinforced neckline keeps its shape wash after wash. An easy staple that works under a jacket or on its own with jeans and chinos.",
    price: 890,
    unit: "1 piece",
    inStock: true,
    stockQuantity: 80,
    images: [
      {
        url: "https://res.cloudinary.com/drvwvre57/image/upload/v1793093985/e1128cffa1f314759d3b16ebd57a66be_pvcf9w.jpg",
        alt: "Premium cotton t-shirt neatly folded",
      },
    ],
  },
  {
    id: "fash-004",
    slug: "essential-casual-tshirt",
    name: "Essential Casual T-Shirt",
    nameBn: "এসেনশিয়াল ক্যাজুয়াল টি-শার্ট",
    categoryId: "fashion",
    brandId: "cottonclub",
    description:
      "The Essential Casual T-Shirt is a no-fuss wardrobe basic with a clean neckline and a relaxed fit. The cotton-blend fabric is lightweight and easy to care for, making it ideal for warm weather and everyday wear. Pair it with denim, joggers, or layered under a shirt for a casual weekend look.",
    price: 790,
    unit: "1 piece",
    inStock: true,
    stockQuantity: 95,
    images: [
      {
        url: "https://res.cloudinary.com/drvwvre57/image/upload/v1793094366/578c27b4ff2171e9c60dfafbe9a04616_wuucy4.jpg",
        alt: "Essential casual t-shirt laid flat",
      },
    ],
  },
  {
    id: "fash-005",
    slug: "slim-fit-stretch-denim-jeans",
    name: "Slim-Fit Stretch Denim Jeans",
    nameBn: "স্লিম-ফিট স্ট্রেচ ডেনিম জিন্স",
    categoryId: "fashion",
    brandId: "denimhouse",
    flag: "trending",
    description:
      "These Slim-Fit Stretch Denim Jeans combine classic denim styling with a touch of elastane for extra flexibility. The slim cut through the leg creates a sharp silhouette while the mid-rise waist offers comfortable coverage. Reinforced pockets and a sturdy zip fly keep them practical for regular wear. Roll the cuffs for a relaxed weekend look.",
    price: 1890,
    oldPrice: 2290,
    discount: 17,
    unit: "1 piece",
    inStock: true,
    stockQuantity: 45,
    images: [
      {
        url: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=900&q=80",
        alt: "Slim-fit stretch denim jeans",
      },
    ],
  },
  {
    id: "fash-006",
    slug: "floral-summer-midi-dress",
    name: "Floral Summer Midi Dress",
    nameBn: "ফ্লোরাল সামার মিডি ড্রেস",
    categoryId: "fashion",
    brandId: "bloomwear",
    flag: "featured",
    description:
      "The Floral Summer Midi Dress brings easy elegance to warm-weather days. The lightweight fabric drapes beautifully, and the floral print adds a fresh seasonal touch. A flattering waistline and a flowy midi-length skirt make it suitable for brunches, day trips, or casual evenings out. Pair with sandals or light flats.",
    price: 1590,
    unit: "1 piece",
    inStock: true,
    stockQuantity: 28,
    images: [
      {
        url: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=900&q=80",
        alt: "Floral summer midi dress",
      },
    ],
  },
  {
    id: "fash-007",
    slug: "breathable-linen-shirt",
    name: "Breathable Linen Shirt",
    nameBn: "ব্রেদেবল লিনেন শার্ট",
    categoryId: "fashion",
    brandId: "cottonclub",
    description:
      "The Breathable Linen Shirt is made from a lightweight linen blend that keeps you cool on hot days. The relaxed cut and natural texture give it an effortless look that works with shorts, chinos, or trousers. Wear it buttoned up for a smart-casual finish or open over a t-shirt for a more relaxed style. Machine wash cold and hang dry.",
    price: 1290,
    unit: "1 piece",
    inStock: true,
    stockQuantity: 50,
    images: [
      {
        url: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=900&q=80",
        alt: "Breathable linen shirt in a light tone",
      },
    ],
  },

  /* ---------- ACCESSORIES ---------- */
  {
    id: "acc-001",
    slug: "minimalist-wrist-watch",
    name: "Minimalist Wrist Watch",
    nameBn: "মিনিমালিস্ট রিস্ট ওয়াচ",
    categoryId: "accessories",
    brandId: "timeline",
    flag: "on-sale",
    description:
      "The Minimalist Wrist Watch is built around a clean dial, slim hands, and a simple case that fits any outfit. The leather strap softens with wear and adds a touch of character over time. It runs on a reliable quartz movement with a scratch-resistant crystal, making it a practical everyday piece that also works for formal occasions.",
    price: 1850,
    oldPrice: 2200,
    discount: 16,
    unit: "1 piece",
    inStock: true,
    stockQuantity: 35,
    images: [
      {
        url: "https://res.cloudinary.com/drvwvre57/image/upload/v1793094059/61b777a0df9764613dd7ed4afcbd2c2c_ewws5g.jpg",
        alt: "Minimalist wrist watch with a clean dial",
      },
    ],
  },
  {
    id: "acc-002",
    slug: "classic-gold-tone-watch",
    name: "Classic Gold-Tone Watch",
    nameBn: "ক্লাসিক গোল্ড-টোন ওয়াচ",
    categoryId: "accessories",
    brandId: "timeline",
    flag: "best-seller",
    description:
      "The Classic Gold-Tone Watch brings a warm, polished finish to any look. The gold-tone case and bracelet catch the light subtly, while the minimalist dial keeps things refined. A reliable quartz movement and a secure fold-over clasp make it as practical as it is stylish. Pairs beautifully with both business and evening attire.",
    price: 2190,
    oldPrice: 2590,
    discount: 15,
    unit: "1 piece",
    inStock: true,
    stockQuantity: 22,
    images: [
      {
        url: "https://res.cloudinary.com/drvwvre57/image/upload/v1793094430/e25d61ab390dbfe4fb5e8da9df8c552e_rqhsao.jpg",
        alt: "Classic gold-tone wrist watch",
      },
    ],
  },
  {
    id: "acc-003",
    slug: "everyday-shoulder-bag",
    name: "Everyday Shoulder Bag",
    nameBn: "এভরিডে শোল্ডার ব্যাগ",
    categoryId: "accessories",
    brandId: "carryon",
    flag: "new-arrival",
    description:
      "The Everyday Shoulder Bag is a compact, go-anywhere piece with a smooth finish and sturdy stitching. It has a main zip compartment, an inner slip pocket, and an adjustable strap that sits comfortably on the shoulder. Large enough for a phone, wallet, and essentials, but light enough to carry all day. An easy pick for casual outings and travel.",
    price: 1590,
    unit: "1 piece",
    inStock: true,
    stockQuantity: 30,
    images: [
      {
        url: "https://res.cloudinary.com/drvwvre57/image/upload/v1793094182/6675153f6ade8c83cbcceda5020fbb5b_yjqiz7.jpg",
        alt: "Everyday shoulder bag with a clean design",
      },
    ],
  },
  {
    id: "acc-004",
    slug: "modern-everyday-backpack",
    name: "Modern Everyday Backpack",
    nameBn: "মডার্ন এভরিডে ব্যাকপ্যাক",
    categoryId: "accessories",
    brandId: "carryon",
    flag: "trending",
    description:
      "The Modern Everyday Backpack blends a sleek profile with practical storage. A padded laptop sleeve, multiple organiser pockets, and a water-resistant exterior make it ready for commutes, classes, and short trips. The ergonomic straps distribute weight evenly across the shoulders so you stay comfortable on longer carries.",
    price: 1790,
    unit: "1 piece",
    inStock: true,
    stockQuantity: 40,
    images: [
      {
        url: "https://res.cloudinary.com/drvwvre57/image/upload/v1793094522/5f06c020bace7ba72ce83ffd94b76c2b_hmxfxs.jpg",
        alt: "Modern everyday backpack",
      },
    ],
  },
  {
    id: "acc-005",
    slug: "classic-leather-belt",
    name: "Classic Leather Belt",
    nameBn: "ক্লাসিক লেদার বেল্ট",
    categoryId: "accessories",
    brandId: "leathercraft",
    description:
      "The Classic Leather Belt is made from genuine leather with a smooth finish and a sturdy metal buckle. It has a clean, timeless design that pairs well with jeans, chinos, and formal trousers. The edges are neatly stitched for durability, and the belt softens beautifully with wear, developing a character all its own.",
    price: 890,
    unit: "1 piece",
    inStock: true,
    stockQuantity: 55,
    images: [
      {
        url: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=80",
        alt: "Classic leather belt with metal buckle",
      },
    ],
  },
  {
    id: "acc-006",
    slug: "polarized-sunglasses",
    name: "Polarized Sunglasses",
    nameBn: "পোলারাইজড সানগ্লাস",
    categoryId: "accessories",
    brandId: "shadeup",
    flag: "limited-stock",
    description:
      "The Polarized Sunglasses cut glare and protect your eyes from harsh sunlight while keeping things stylish. The lightweight frame sits comfortably on the nose, and the polarized lenses improve clarity on bright days. A great pick for driving, travel, and everyday outdoor use. Comes with a protective case and cleaning cloth.",
    price: 1190,
    oldPrice: 1490,
    discount: 20,
    unit: "1 piece",
    inStock: true,
    stockQuantity: 18,
    images: [
      {
        url: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=900&q=80",
        alt: "Polarized sunglasses on a plain surface",
      },
    ],
  },

  /* ---------- ELECTRONICS ---------- */
  {
    id: "elec-001",
    slug: "wireless-bluetooth-earbuds",
    name: "Wireless Bluetooth Earbuds",
    nameBn: "ওয়্যারলেস ব্লুটুথ ইয়ারবাডস",
    categoryId: "electronics",
    brandId: "soundwave",
    flag: "best-seller",
    description:
      "These Wireless Bluetooth Earbuds deliver clear audio with punchy bass and a comfortable in-ear fit. The charging case gives you extra playtime on the go, and the touch controls make it easy to manage music and calls without reaching for your phone. Bluetooth 5.3 keeps the connection stable, and the built-in mic keeps your voice clear on calls.",
    price: 2490,
    oldPrice: 2990,
    discount: 17,
    unit: "1 set",
    inStock: true,
    stockQuantity: 60,
    images: [
      {
        url: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=900&q=80",
        alt: "Wireless Bluetooth earbuds with charging case",
      },
    ],
  },
  {
    id: "elec-002",
    slug: "over-ear-studio-headphones",
    name: "Over-Ear Studio Headphones",
    nameBn: "ওভার-ইয়ার স্টুডিও হেডফোন",
    categoryId: "electronics",
    brandId: "soundwave",
    flag: "top-rated",
    description:
      "The Over-Ear Studio Headphones are tuned for balanced sound with clear mids, crisp highs, and controlled bass. The padded ear cushions and adjustable headband make long listening sessions comfortable, and the swivel design makes storage easy. Whether you're working, studying, or just relaxing with music, these headphones deliver a rich, immersive soundstage.",
    price: 3990,
    unit: "1 piece",
    inStock: true,
    stockQuantity: 25,
    images: [
      {
        url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80",
        alt: "Over-ear studio headphones",
      },
    ],
  },
  {
    id: "elec-003",
    slug: "smart-fitness-watch",
    name: "Smart Fitness Watch",
    nameBn: "স্মার্ট ফিটনেস ওয়াচ",
    categoryId: "electronics",
    brandId: "pulsefit",
    flag: "trending",
    description:
      "The Smart Fitness Watch helps you track workouts, steps, heart rate, and sleep from your wrist. The bright display is easy to read outdoors, and the long-lasting battery keeps up with your week. Smart notifications keep you connected without pulling out your phone, making it a practical companion for both fitness and everyday life.",
    price: 4590,
    oldPrice: 5490,
    discount: 16,
    unit: "1 piece",
    inStock: true,
    stockQuantity: 20,
    images: [
      {
        url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80",
        alt: "Smart fitness watch on a light background",
      },
    ],
  },
  {
    id: "elec-004",
    slug: "portable-bluetooth-speaker",
    name: "Portable Bluetooth Speaker",
    nameBn: "পোর্টেবল ব্লুটুথ স্পিকার",
    categoryId: "electronics",
    brandId: "soundwave",
    description:
      "The Portable Bluetooth Speaker pumps out room-filling sound in a compact, travel-friendly body. The rugged exterior and splash-resistant design make it safe for outdoor use, and the built-in strap lets you hang it from a bag or bike. Pair it with a phone or laptop in seconds and enjoy up to several hours of playback on a single charge.",
    price: 2890,
    unit: "1 piece",
    inStock: true,
    stockQuantity: 35,
    images: [
      {
        url: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=900&q=80",
        alt: "Portable Bluetooth speaker",
      },
    ],
  },

  /* ---------- BEAUTY ---------- */
  {
    id: "beauty-001",
    slug: "matte-liquid-lipstick",
    name: "Matte Liquid Lipstick",
    nameBn: "ম্যাট লিকুইড লিপস্টিক",
    categoryId: "beauty",
    brandId: "glowup",
    flag: "best-seller",
    description:
      "The Matte Liquid Lipstick glides on smoothly and dries down to a soft, transfer-resistant matte finish. The highly pigmented formula delivers rich colour in a single swipe and stays comfortable through the day. Available in wearable everyday shades, it's a great pick for both office looks and evening outings. Remove with a gentle oil-based cleanser.",
    price: 690,
    oldPrice: 890,
    discount: 22,
    unit: "3.5 ml",
    inStock: true,
    stockQuantity: 70,
    images: [
      {
        url: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=900&q=80",
        alt: "Matte liquid lipstick",
      },
    ],
  },
  {
    id: "beauty-002",
    slug: "vitamin-c-face-serum",
    name: "Vitamin C Face Serum",
    nameBn: "ভিটামিন সি ফেস সিরাম",
    categoryId: "beauty",
    brandId: "glowup",
    flag: "featured",
    description:
      "This Vitamin C Face Serum is a lightweight, fast-absorbing formula designed to brighten dull skin and support an even-looking complexion. The non-sticky texture layers well under moisturiser and makeup, making it easy to slot into a morning routine. Use a few drops on cleansed skin and follow with sunscreen during the day for best results.",
    price: 1290,
    unit: "30 ml",
    inStock: true,
    stockQuantity: 40,
    images: [
      {
        url: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=900&q=80",
        alt: "Vitamin C face serum bottle",
      },
    ],
  },
  {
    id: "beauty-003",
    slug: "daily-moisturizing-lotion",
    name: "Daily Moisturizing Lotion",
    nameBn: "ডেইলি ময়েশ্চারাইজিং লোশন",
    categoryId: "beauty",
    brandId: "purecare",
    description:
      "The Daily Moisturizing Lotion is a lightweight, non-greasy formula that hydrates without feeling heavy. It absorbs quickly and leaves skin feeling soft and comfortable, making it suitable for daily use on both face and body. The gentle formula is a good fit for most skin types and works well as part of a simple, consistent skincare routine.",
    price: 590,
    unit: "200 ml",
    inStock: true,
    stockQuantity: 65,
    images: [
      {
        url: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=900&q=80",
        alt: "Daily moisturizing lotion bottle",
      },
    ],
  },

  /* ---------- HOMES ---------- */
  {
    id: "home-001",
    slug: "cotton-bedsheet-set",
    name: "Cotton Bedsheet Set",
    nameBn: "কটন বেডশিট সেট",
    categoryId: "homes",
    brandId: "homely",
    flag: "new-arrival",
    description:
      "The Cotton Bedsheet Set brings softness and a fresh look to your bedroom. The breathable cotton fabric feels gentle against the skin and stays comfortable through the night, while the neat stitching keeps the set durable through regular washes. The set includes a fitted sheet and matching pillow covers, making it an easy upgrade for any bed.",
    price: 2290,
    oldPrice: 2790,
    discount: 18,
    unit: "1 set",
    inStock: true,
    stockQuantity: 30,
    images: [
      {
        url: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=900&q=80",
        alt: "Cotton bedsheet set on a neatly made bed",
      },
    ],
  },
  {
    id: "home-002",
    slug: "ceramic-coffee-mug-set",
    name: "Ceramic Coffee Mug Set",
    nameBn: "সিরামিক কফি মগ সেট",
    categoryId: "homes",
    brandId: "homely",
    description:
      "The Ceramic Coffee Mug Set is perfect for slow mornings and shared coffee breaks. Each mug has a comfortable handle, a smooth glaze, and a generous capacity for coffee, tea, or hot chocolate. The timeless design works well with a range of kitchen styles and makes a thoughtful gift for coffee lovers.",
    price: 890,
    unit: "4 pieces",
    inStock: true,
    stockQuantity: 42,
    images: [
      {
        url: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=900&q=80",
        alt: "Ceramic coffee mug set",
      },
    ],
  },
  {
    id: "home-003",
    slug: "aroma-reed-diffuser",
    name: "Aroma Reed Diffuser",
    nameBn: "অ্যারোমা রিড ডিফিউজার",
    categoryId: "homes",
    brandId: "purecare",
    flag: "trending",
    description:
      "The Aroma Reed Diffuser gently releases a long-lasting fragrance into your room without the need for flame or electricity. The reed sticks draw up the scented oil and fill the space with a subtle, calming aroma, making it ideal for bedrooms, living rooms, or home offices. Flip the reeds occasionally to refresh the scent, and enjoy a smoother, more relaxing atmosphere.",
    price: 1290,
    unit: "100 ml",
    inStock: true,
    stockQuantity: 25,
    images: [
      {
        url: "https://images.unsplash.com/photo-1602874801007-bd458bb1b8b6?auto=format&fit=crop&w=900&q=80",
        alt: "Aroma reed diffuser on a table",
      },
    ],
  },

  /* ---------- SPORTS ---------- */
  {
    id: "sport-001",
    slug: "non-slip-yoga-mat",
    name: "Non-Slip Yoga Mat",
    nameBn: "নন-স্লিপ যোগা ম্যাট",
    categoryId: "sports",
    brandId: "fitzone",
    flag: "best-seller",
    description:
      "The Non-Slip Yoga Mat provides a stable, cushioned surface for yoga, pilates, stretching, and home workouts. The textured surface grips well even during sweaty sessions, and the padded thickness protects joints without sacrificing balance. It rolls up easily and comes with a carry strap, so you can take it to class, the park, or a friend's place.",
    price: 1490,
    oldPrice: 1790,
    discount: 17,
    unit: "1 piece",
    inStock: true,
    stockQuantity: 40,
    images: [
      {
        url: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=900&q=80",
        alt: "Non-slip yoga mat rolled out",
      },
    ],
  },
  {
    id: "sport-002",
    slug: "adjustable-dumbbell-set",
    name: "Adjustable Dumbbell Set",
    nameBn: "অ্যাডজাস্টেবল ডাম্বেল সেট",
    categoryId: "sports",
    brandId: "fitzone",
    description:
      "The Adjustable Dumbbell Set is a compact strength-training solution for home workouts. The weight plates are easy to swap on and off, letting you move quickly between exercises and adjust the load as you get stronger. The knurled handles provide a secure grip, and the plates are built to hold up to regular use on a mat or gym floor.",
    price: 3490,
    unit: "1 set",
    inStock: true,
    stockQuantity: 20,
    images: [
      {
        url: "https://images.unsplash.com/photo-1638536532686-d610adfc8e5c?auto=format&fit=crop&w=900&q=80",
        alt: "Adjustable dumbbell set",
      },
    ],
  },
  {
    id: "sport-003",
    slug: "insulated-sports-water-bottle",
    name: "Insulated Sports Water Bottle",
    nameBn: "ইনসুলেটেড স্পোর্টস ওয়াটার বোতল",
    categoryId: "sports",
    brandId: "fitzone",
    flag: "limited-stock",
    description:
      "The Insulated Sports Water Bottle keeps drinks cold for long workouts and warm on chilly days. The double-wall stainless steel body resists condensation, and the leak-proof lid makes it safe to toss into a gym bag or backpack. The one-hand flip cap is easy to use during runs, cycling, or training sessions.",
    price: 690,
    unit: "750 ml",
    inStock: true,
    stockQuantity: 15,
    images: [
      {
        url: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=900&q=80",
        alt: "Insulated sports water bottle",
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  FLASH SALE PRODUCTS                                                */
/* ------------------------------------------------------------------ */

export const flashSale: Product[] = [
  {
    id: "flash-001",
    slug: "premium-running-sneakers-flash-sale",
    name: "Premium Running Sneakers",
    nameBn: "প্রিমিয়াম রানিং স্নিকার্স",
    categoryId: "fashion",
    brandId: "urbanstep",
    flag: "flash-sale",
    description:
      "Lightweight running sneakers with a responsive midsole and breathable upper. Perfect for gym sessions, jogs, and everyday wear at a limited-time price.",
    price: 2390,
    oldPrice: 2890,
    discount: 17,
    unit: "1 pair",
    inStock: true,
    stockQuantity: 30,
    images: [
      {
        url: "https://res.cloudinary.com/drvwvre57/image/upload/v1793094286/fc44a5fbba527eae04fd6cd16d4dc469_tqzjlg.jpg",
        alt: "Premium running sneakers on flash sale",
      },
    ],
  },
  {
    id: "flash-002",
    slug: "smart-fitness-watch-flash-sale",
    name: "Smart Fitness Watch",
    nameBn: "স্মার্ট ফিটনেস ওয়াচ",
    categoryId: "electronics",
    brandId: "pulsefit",
    flag: "flash-sale",
    description:
      "Track workouts, heart rate, and sleep from your wrist with this fitness watch. Long battery life and smart notifications in a stylish build.",
    price: 3790,
    oldPrice: 4590,
    discount: 17,
    unit: "1 piece",
    inStock: true,
    stockQuantity: 18,
    images: [
      {
        url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80",
        alt: "Smart fitness watch on flash sale",
      },
    ],
  },
  {
    id: "flash-003",
    slug: "wireless-bluetooth-earbuds-flash-sale",
    name: "Wireless Bluetooth Earbuds",
    nameBn: "ওয়্যারলেস ব্লুটুথ ইয়ারবাডস",
    categoryId: "electronics",
    brandId: "soundwave",
    flag: "flash-sale",
    description:
      "True wireless earbuds with punchy bass and a compact charging case. Stable Bluetooth connection and touch controls for calls and music.",
    price: 1990,
    oldPrice: 2490,
    discount: 20,
    unit: "1 set",
    inStock: true,
    stockQuantity: 35,
    images: [
      {
        url: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=900&q=80",
        alt: "Wireless earbuds on flash sale",
      },
    ],
  },
  {
    id: "flash-004",
    slug: "matte-liquid-lipstick-flash-sale",
    name: "Matte Liquid Lipstick",
    nameBn: "ম্যাট লিকুইড লিপস্টিক",
    categoryId: "beauty",
    brandId: "glowup",
    flag: "flash-sale",
    description:
      "Highly pigmented matte lipstick that stays comfortable all day. A limited-time offer on a crowd-favourite everyday shade.",
    price: 490,
    oldPrice: 690,
    discount: 29,
    unit: "3.5 ml",
    inStock: true,
    stockQuantity: 50,
    images: [
      {
        url: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=900&q=80",
        alt: "Matte lipstick on flash sale",
      },
    ],
  },
  {
    id: "flash-005",
    slug: "cotton-bedsheet-set-flash-sale",
    name: "Cotton Bedsheet Set",
    nameBn: "কটন বেডশিট সেট",
    categoryId: "homes",
    brandId: "homely",
    flag: "flash-sale",
    description:
      "Soft, breathable cotton bedsheet set with matching pillow covers. A fresh look for your bedroom at a special flash-sale price.",
    price: 1790,
    oldPrice: 2290,
    discount: 22,
    unit: "1 set",
    inStock: true,
    stockQuantity: 25,
    images: [
      {
        url: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=900&q=80",
        alt: "Cotton bedsheet set on flash sale",
      },
    ],
  },
  {
    id: "flash-006",
    slug: "non-slip-yoga-mat-flash-sale",
    name: "Non-Slip Yoga Mat",
    nameBn: "নন-স্লিপ যোগা ম্যাট",
    categoryId: "sports",
    brandId: "fitzone",
    flag: "flash-sale",
    description:
      "Cushioned, non-slip yoga mat with a carry strap. Ideal for yoga, pilates, and home workouts at a limited-time price.",
    price: 1190,
    oldPrice: 1490,
    discount: 20,
    unit: "1 piece",
    inStock: true,
    stockQuantity: 30,
    images: [
      {
        url: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=900&q=80",
        alt: "Yoga mat on flash sale",
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  HELPERS                                                            */
/* ------------------------------------------------------------------ */

const BN_DIGITS = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

/** Convert any latin digits inside a string/number to Bengali digits. */
export function toBnDigits(value: string | number): string {
  return String(value).replace(/\d/g, (d) => BN_DIGITS[Number(d)]);
}

/** Format a number as a Bengali taka string, e.g. 1500 -> "৳1,500" */
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

/** Single product by its id (e.g. "fash-001"). */
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