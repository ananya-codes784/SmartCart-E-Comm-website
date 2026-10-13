export interface ProductItem {
  id?: string;
  _id?: string;
  name: string;
  description: string;
  brand: string;
  category: string;
  gender: 'women' | 'men' | 'kids';
  price: number;
  salePrice?: number;
  onSale: boolean;
  isNewArrival: boolean;
  isBestSeller: boolean;
  sizes: string[];
  colors: string[];
  inStock: boolean;
  stockCount: number;
  fabric: string;
  care: string;
  image: string;
  gallery: string[];
  rating: number;
  numReviews: number;
  reviews?: {
    id: string;
    userName: string;
    rating: number;
    comment: string;
    date: string;
  }[];
}

export const initialProducts: ProductItem[] = [
  // ---------------- WOMEN: Dresses ----------------
  {
    name: "Linen Trench Midi Dress",
    description: "Crafted from breathable French linen, this belted midi dress features structured lapels, double-breasted horn buttons, and a flared A-line silhouette suited for warm afternoon gatherings.",
    brand: "SmartCart Atelier",
    category: "Dresses",
    gender: "women",
    price: 145,
    salePrice: 115,
    onSale: true,
    isNewArrival: true,
    isBestSeller: true,
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Oatmeal Ivory", "Muted Sage", "Noir"],
    inStock: true,
    stockCount: 18,
    fabric: "100% French Flax Linen",
    care: "Dry clean or gentle cold hand wash. Line dry in shade.",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=900&q=80"
    ],
    rating: 4.9,
    numReviews: 24,
    reviews: [
      { id: "r1", userName: "Elena Rostova", rating: 5, comment: "Exquisite tailoring and the linen drape is world-class.", date: "2026-03-12" },
      { id: "r2", userName: "Camille Laurent", rating: 5, comment: "Fits true to size with an effortless Parisian silhouette.", date: "2026-03-20" }
    ]
  },
  {
    name: "Pleated Silk Slip Maxi Dress",
    description: "A fluid, bias-cut silk crepe maxi dress featuring delicate accordion micro-pleating at the hemline and minimalist adjustable spaghetti straps.",
    brand: "SmartCart Atelier",
    category: "Dresses",
    gender: "women",
    price: 180,
    onSale: false,
    isNewArrival: true,
    isBestSeller: false,
    sizes: ["XS", "S", "M", "L"],
    colors: ["Champagne", "Black Onyx"],
    inStock: true,
    stockCount: 12,
    fabric: "100% Mulberry Silk Crepe",
    care: "Specialist dry clean only.",
    image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=900&q=80"
    ],
    rating: 4.8,
    numReviews: 19
  },

  // ---------------- WOMEN: Tops and Shirts ----------------
  {
    name: "Oversized Crisp Poplin Shirt",
    description: "Tailored from 120-thread count Egyptian cotton poplin. Features dropped shoulders, clean French cuffs, and a curved hem designed for effortless tucking.",
    brand: "SmartCart Essentials",
    category: "Tops and Shirts",
    gender: "women",
    price: 88,
    salePrice: 68,
    onSale: true,
    isNewArrival: false,
    isBestSeller: true,
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Optic White", "Sky Stripe", "Sand"],
    inStock: true,
    stockCount: 30,
    fabric: "100% Long-Staple Egyptian Cotton",
    care: "Machine wash cold with like colors. Warm iron.",
    image: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=900&q=80"
    ],
    rating: 4.7,
    numReviews: 31
  },
  {
    name: "Draped Asymmetrical Silk Blouse",
    description: "Modern architectural neckline with soft bias-cut draping across the shoulder. Adds an effortless, sculpted elegance to casual or formal ensembles.",
    brand: "SmartCart Atelier",
    category: "Tops and Shirts",
    gender: "women",
    price: 110,
    onSale: false,
    isNewArrival: true,
    isBestSeller: false,
    sizes: ["S", "M", "L"],
    colors: ["Sage Green", "Bone White"],
    inStock: true,
    stockCount: 14,
    fabric: "70% Silk, 30% Modal",
    care: "Delicate cycle cold or hand wash. Iron on reverse.",
    image: "https://images.unsplash.com/photo-1608234807905-446702a39499?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1608234807905-446702a39499?auto=format&fit=crop&w=900&q=80"
    ],
    rating: 4.9,
    numReviews: 15
  },

  // ---------------- WOMEN: Jeans and Trousers ----------------
  {
    name: "Wide-Leg Pleated Tailored Trousers",
    description: "High-waisted trousers with sharp front pleats and fluid wide legs. Designed with deep slant pockets and a clean hidden tab closure.",
    brand: "SmartCart Sartorial",
    category: "Jeans and Trousers",
    gender: "women",
    price: 125,
    salePrice: 98,
    onSale: true,
    isNewArrival: false,
    isBestSeller: true,
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Charcoal", "Pecan Beige", "Cream"],
    inStock: true,
    stockCount: 22,
    fabric: "75% Fine Wool Blend, 25% Lyocell",
    care: "Dry clean recommended.",
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=900&q=80"
    ],
    rating: 4.8,
    numReviews: 42
  },
  {
    name: "Straight-Leg Vintage Raw Denim",
    description: "Authentic non-stretch 13oz Japanese selvedge denim in a timeless high-rise straight cut with subtle whiskering and reinforced copper hardware.",
    brand: "SmartCart Denim Co.",
    category: "Jeans and Trousers",
    gender: "women",
    price: 130,
    onSale: false,
    isNewArrival: true,
    isBestSeller: false,
    sizes: ["26", "27", "28", "29", "30", "31"],
    colors: ["Indigo Raw", "Vintage Washed Light"],
    inStock: true,
    stockCount: 16,
    fabric: "100% Organic Cotton Selvedge",
    care: "Wash inside out in cold water. Hang dry.",
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=900&q=80"
    ],
    rating: 4.6,
    numReviews: 28
  },

  // ---------------- WOMEN: Kurtis and Ethnic Wear ----------------
  {
    name: "Chanderi Silk Embroidered Kurti Set",
    description: "Handcrafted Chanderi silk kurti with delicate zari threadwork along the neckline, paired with tailored straight-cut trousers and a diaphanous organza dupatta.",
    brand: "SmartCart Heritage",
    category: "Kurtis and Ethnic Wear",
    gender: "women",
    price: 165,
    salePrice: 129,
    onSale: true,
    isNewArrival: true,
    isBestSeller: true,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Sage Mint", "Dusty Rose", "Ivory Gold"],
    inStock: true,
    stockCount: 20,
    fabric: "Chanderi Silk with Pure Cotton Lining",
    care: "Dry clean only to maintain zari luster.",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=80"
    ],
    rating: 4.9,
    numReviews: 38
  },
  {
    name: "Block-Printed Mulmul Anarkali",
    description: "Airy hand-block printed mulmul cotton flared anarkali silhouette with potli button detailing, angrakha-style neckline, and bordered churidar.",
    brand: "SmartCart Heritage",
    category: "Kurtis and Ethnic Wear",
    gender: "women",
    price: 120,
    onSale: false,
    isNewArrival: false,
    isBestSeller: true,
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Indigo Floral", "Terracotta Ochre"],
    inStock: true,
    stockCount: 15,
    fabric: "100% Fine Mulmul Cotton",
    care: "Cold gentle wash with mild detergent.",
    image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=900&q=80"
    ],
    rating: 4.8,
    numReviews: 29
  },

  // ---------------- WOMEN: Co-ord Sets ----------------
  {
    name: "Relaxed Linen Blazer & Trouser Co-ord",
    description: "Unstructured single-breasted relaxed blazer paired with matching pleated wide-leg trousers. Cut in heavyweight pure linen for an effortless modern summer suit.",
    brand: "SmartCart Atelier",
    category: "Co-ord Sets",
    gender: "women",
    price: 195,
    salePrice: 155,
    onSale: true,
    isNewArrival: true,
    isBestSeller: true,
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Warm Stone", "Eucalyptus Green"],
    inStock: true,
    stockCount: 15,
    fabric: "100% Belgian Linen",
    care: "Dry clean or gentle cold wash.",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80"
    ],
    rating: 5.0,
    numReviews: 18
  },
  {
    name: "Knitted Ribbed Lounge Co-ord",
    description: "Buttery soft ribbed merino blend wrap cardigan paired with high-rise kick-flare knit trousers. Tailored loungewear with luxury proportions.",
    brand: "SmartCart Essentials",
    category: "Co-ord Sets",
    gender: "women",
    price: 140,
    onSale: false,
    isNewArrival: false,
    isBestSeller: true,
    sizes: ["S", "M", "L"],
    colors: ["Ivory Cream", "Deep Mocha"],
    inStock: true,
    stockCount: 19,
    fabric: "70% Extra Fine Merino Wool, 30% Cashmere",
    care: "Hand wash cold. Dry flat.",
    image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=900&q=80"
    ],
    rating: 4.9,
    numReviews: 22
  },

  // ---------------- WOMEN: Jackets and Outerwear ----------------
  {
    name: "Double-Faced Wool Trench Coat",
    description: "Architectural raglan coat cut from premium double-faced wool. Features a removable waist tie, deep welt pockets, and clean hand-finished seams.",
    brand: "SmartCart Sartorial",
    category: "Jackets and Outerwear",
    gender: "women",
    price: 260,
    salePrice: 210,
    onSale: true,
    isNewArrival: true,
    isBestSeller: true,
    sizes: ["XS", "S", "M", "L"],
    colors: ["Camel", "Olive Moss", "Black"],
    inStock: true,
    stockCount: 10,
    fabric: "90% Australian Virgin Wool, 10% Cashmere",
    care: "Dry clean only.",
    image: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=900&q=80"
    ],
    rating: 4.9,
    numReviews: 35
  },

  // ---------------- MEN: T-shirts and Polos ----------------
  {
    name: "Heavyweight Boxy Supima T-Shirt",
    description: "280 GSM heavyweight Supima cotton t-shirt with a structured boxy drape, dense ribbed collar, and blind-stitched hem that retains crisp form wash after wash.",
    brand: "SmartCart Essentials",
    category: "T-shirts and Polos",
    gender: "men",
    price: 48,
    salePrice: 38,
    onSale: true,
    isNewArrival: false,
    isBestSeller: true,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Off-White", "Washed Olive", "Obsidian Black"],
    inStock: true,
    stockCount: 45,
    fabric: "100% Organic Supima Cotton (280 GSM)",
    care: "Machine wash cold. Tumble dry low or air dry.",
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80"
    ],
    rating: 4.8,
    numReviews: 64
  },
  {
    name: "Milano-Knit Johnny Collar Polo",
    description: "Seamless knitted polo featuring a relaxed open Johnny collar, ribbed cuffs, and an ultra-fine 16-gauge knit in breathable mercerized cotton.",
    brand: "SmartCart Sartorial",
    category: "T-shirts and Polos",
    gender: "men",
    price: 85,
    onSale: false,
    isNewArrival: true,
    isBestSeller: false,
    sizes: ["S", "M", "L", "XL"],
    colors: ["Forest Sage", "Sandstone", "Navy"],
    inStock: true,
    stockCount: 22,
    fabric: "100% Mercerized Long-Staple Cotton",
    care: "Hand wash or gentle cold cycle in wash bag.",
    image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=900&q=80"
    ],
    rating: 4.9,
    numReviews: 17
  },

  // ---------------- MEN: Shirts ----------------
  {
    name: "Relaxed Linen Camp Collar Shirt",
    description: "Summer staple cut from washed pure linen. Features a vintage cuban camp collar, straight vented hem, and mother-of-pearl buttons.",
    brand: "SmartCart Essentials",
    category: "Shirts",
    gender: "men",
    price: 82,
    salePrice: 65,
    onSale: true,
    isNewArrival: true,
    isBestSeller: true,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Sage Green", "White Linen", "Toasted Almond"],
    inStock: true,
    stockCount: 30,
    fabric: "100% Normandy Linen",
    care: "Machine wash cold. Hang dry for natural linen texture.",
    image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=900&q=80"
    ],
    rating: 4.8,
    numReviews: 41
  },
  {
    name: "Architectural Oxford Button-Down",
    description: "Classic American ivy silhouette reimagined with a contemporary relaxed fit. 2-ply pinpoint Oxford weave that softens with every wear.",
    brand: "SmartCart Sartorial",
    category: "Shirts",
    gender: "men",
    price: 95,
    onSale: false,
    isNewArrival: false,
    isBestSeller: true,
    sizes: ["S", "M", "L", "XL"],
    colors: ["Oxford Blue", "Classic White", "Charcoal Stripe"],
    inStock: true,
    stockCount: 25,
    fabric: "100% Combed Cotton Oxford",
    care: "Warm wash. Medium iron or steam.",
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=900&q=80"
    ],
    rating: 4.7,
    numReviews: 53
  },

  // ---------------- MEN: Jeans and Trousers ----------------
  {
    name: "Relaxed Tapered Selvedge Denim",
    description: "14oz Japanese raw indigo selvedge denim woven on vintage shuttle looms. Features a roomy top block with a gentle taper from knee to ankle.",
    brand: "SmartCart Denim Co.",
    category: "Jeans and Trousers",
    gender: "men",
    price: 140,
    salePrice: 110,
    onSale: true,
    isNewArrival: false,
    isBestSeller: true,
    sizes: ["30", "32", "34", "36"],
    colors: ["Raw Indigo", "Washed Charcoal"],
    inStock: true,
    stockCount: 28,
    fabric: "100% Kurabo Japanese Selvedge Cotton",
    care: "Soak in cold water or machine wash delicate.",
    image: "https://images.unsplash.com/photo-1542272604-780c96856592?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1542272604-780c96856592?auto=format&fit=crop&w=900&q=80"
    ],
    rating: 4.9,
    numReviews: 46
  },
  {
    name: "Pleated Linen-Cotton Trousers",
    description: "Single-pleated trousers with side adjusters, clean forward pockets, and a tailored taper. Unlined for breathable spring and summer elegance.",
    brand: "SmartCart Sartorial",
    category: "Jeans and Trousers",
    gender: "men",
    price: 118,
    onSale: false,
    isNewArrival: true,
    isBestSeller: false,
    sizes: ["30", "32", "34", "36"],
    colors: ["Stone Ivory", "Olive Drab", "Midnight"],
    inStock: true,
    stockCount: 18,
    fabric: "55% Linen, 45% Organic Cotton",
    care: "Dry clean or gentle cold wash.",
    image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=900&q=80"
    ],
    rating: 4.7,
    numReviews: 21
  },

  // ---------------- MEN: Ethnic Wear ----------------
  {
    name: "Handwoven Silk-Linen Kurta & Churidar",
    description: "Modern minimalist bandhgala kurta woven with subtle hand-spun silk texture. Features concealed placket with brass hook detailing and tailored pyjama bottoms.",
    brand: "SmartCart Heritage",
    category: "Ethnic Wear",
    gender: "men",
    price: 145,
    salePrice: 119,
    onSale: true,
    isNewArrival: true,
    isBestSeller: true,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Raw Ecru", "Olive Moss", "Midnight Indigo"],
    inStock: true,
    stockCount: 20,
    fabric: "60% Handloom Silk, 40% Natural Linen",
    care: "Dry clean only.",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=900&q=80"
    ],
    rating: 4.9,
    numReviews: 27
  },

  // ---------------- MEN: Jackets and Hoodies ----------------
  {
    name: "Structured Minimalist Field Jacket",
    description: "Utility meets tailoring in this structured field overshirt. Features 4 pleated patch pockets, internal cinch cord, and concealed horn button closures.",
    brand: "SmartCart Essentials",
    category: "Jackets and Hoodies",
    gender: "men",
    price: 175,
    salePrice: 139,
    onSale: true,
    isNewArrival: true,
    isBestSeller: true,
    sizes: ["S", "M", "L", "XL"],
    colors: ["Sage Khaki", "Deep Coal"],
    inStock: true,
    stockCount: 16,
    fabric: "100% Water-Resistant Cotton Twill",
    care: "Spot clean or gentle machine wash.",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=900&q=80"
    ],
    rating: 4.8,
    numReviews: 33
  },
  {
    name: "Heavy French Terry Oversized Hoodie",
    description: "Crafted from 480 GSM unbrushed French terry cotton. Features double-layered hood without drawstrings for a clean architectural silhouette.",
    brand: "SmartCart Essentials",
    category: "Jackets and Hoodies",
    gender: "men",
    price: 98,
    onSale: false,
    isNewArrival: false,
    isBestSeller: true,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Heather Gray", "Washed Black", "Chalk"],
    inStock: true,
    stockCount: 26,
    fabric: "100% Heavy French Terry Organic Cotton",
    care: "Machine wash cold inside out.",
    image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=900&q=80"
    ],
    rating: 4.9,
    numReviews: 50
  },

  // ---------------- KIDS: Boys' Clothing ----------------
  {
    name: "Boys' Organic Cotton Linen Shirt & Short Set",
    description: "Breathable mandarin-collar linen shirt paired with elasticated drawstring shorts. Soft on sensitive skin and engineered for play.",
    brand: "SmartCart Petit",
    category: "Boys' Clothing",
    gender: "kids",
    price: 55,
    salePrice: 42,
    onSale: true,
    isNewArrival: true,
    isBestSeller: true,
    sizes: ["2-3Y", "4-5Y", "6-7Y", "8-9Y", "10-11Y"],
    colors: ["Sage Stripe", "Sand Beige"],
    inStock: true,
    stockCount: 24,
    fabric: "70% Organic Cotton, 30% Pure Linen",
    care: "Machine wash warm. Tumble dry gentle.",
    image: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=900&q=80"
    ],
    rating: 4.9,
    numReviews: 20
  },
  {
    name: "Boys' Heavyweight Everyday Denim Overalls",
    description: "Durable organic cotton denim dungarees with adjustable brass buckles, reinforced knees, and multiple utility pockets.",
    brand: "SmartCart Petit",
    category: "Boys' Clothing",
    gender: "kids",
    price: 60,
    onSale: false,
    isNewArrival: false,
    isBestSeller: true,
    sizes: ["3-4Y", "5-6Y", "7-8Y", "9-10Y"],
    colors: ["Washed Indigo"],
    inStock: true,
    stockCount: 17,
    fabric: "100% Organic Soft Denim",
    care: "Machine wash cold with like colors.",
    image: "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=900&q=80"
    ],
    rating: 4.8,
    numReviews: 14
  },

  // ---------------- KIDS: Girls' Clothing ----------------
  {
    name: "Girls' Embroidered Tiered Muslin Dress",
    description: "Whimsical triple-tiered dress made of cloud-soft organic cotton muslin with delicate tonal floral embroidery at the Peter Pan collar.",
    brand: "SmartCart Petit",
    category: "Girls' Clothing",
    gender: "kids",
    price: 58,
    salePrice: 45,
    onSale: true,
    isNewArrival: true,
    isBestSeller: true,
    sizes: ["2-3Y", "4-5Y", "6-7Y", "8-9Y"],
    colors: ["Blush Meadow", "Ivory White"],
    inStock: true,
    stockCount: 20,
    fabric: "100% GOTS Certified Organic Cotton Muslin",
    care: "Machine wash gentle cycle cold.",
    image: "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&w=900&q=80"
    ],
    rating: 4.9,
    numReviews: 29
  },

  // ---------------- KIDS: Kids' Ethnic Wear ----------------
  {
    name: "Kids' Handloom Kurta & Dhoti / Churidar Set",
    description: "Festive handloom cotton silk kurta set with gentle golden foil motifs and easy-fit pre-pleated dhoti designed for all-day comfort.",
    brand: "SmartCart Heritage Petit",
    category: "Kids' Ethnic Wear",
    gender: "kids",
    price: 68,
    salePrice: 52,
    onSale: true,
    isNewArrival: true,
    isBestSeller: true,
    sizes: ["2-3Y", "4-5Y", "6-7Y", "8-9Y", "10-11Y"],
    colors: ["Marigold Ochre", "Mint Sage"],
    inStock: true,
    stockCount: 15,
    fabric: "Soft Handloom Cotton with Silk Blend",
    care: "Gentle hand wash cold.",
    image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=900&q=80"
    ],
    rating: 4.8,
    numReviews: 21
  }
];
