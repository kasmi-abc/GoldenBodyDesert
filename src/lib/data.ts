export type Product = {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  compareAtPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  images?: string[];
  flavors?: string[];
  weights: string[];
  stock: number;
  isNew?: boolean;
  sku: string;
  expiryDate: string;
  batchNumber: string;
  nutrition?: { servingSize: string; servings: string; calories: number; protein: string; carbs: string; fat: string };
};

export const categories = [
  { slug: "protein", name: "البروتينات", count: 42, image: "/images/products/whey-gold-standard.jpg" },
  { slug: "creatine", name: "الكرياتين", count: 18, image: "/images/products/creatine-300.jpg" },
  { slug: "amino", name: "الأحماض الأمينية", count: 23, image: "/images/products/bcaa.jpg" },
  { slug: "vitamins", name: "الفيتامينات والمعادن", count: 35, image: "/images/products/omega3.jpg" },
  { slug: "preworkout", name: "ما قبل التمرين", count: 12, image: "/images/products/pre-workout.jpg" },
  { slug: "mass", name: "زيادة الكتلة", count: 9, image: "/images/products/mass-gainer.jpg" },
  { slug: "fatburner", name: "حرق الدهون", count: 14, image: "/images/products/l-carnitine.jpg" },
  { slug: "bars", name: "ألواح ومشروبات", count: 20, image: "/images/products/whey-gold-standard-nutrition.jpg" },
  { slug: "accessories", name: "أدوات الرياضيين", count: 28, image: "/images/bundles/stack-mass.jpg" },
];

export const products: Product[] = [
  { id:"1", slug:"whey-gold-standard", name:"Whey Protein Gold Standard 2.5كغ", brand:"Optimum Nutrition", category:"protein", price:14900, compareAtPrice:17000, rating:4.8, reviews:234, image:"/images/products/whey-gold-standard.jpg", images:["/images/products/whey-gold-standard.jpg","/images/products/whey-gold-standard-nutrition.jpg"], flavors:["شوكولاتة","فانيلا"], weights:["1كغ","2.5كغ"], stock:12, sku:"WHEY-CH-1", expiryDate:"2027-06-15", batchNumber:"ON2026A12", nutrition:{ servingSize:"30g", servings:"33", calories:120, protein:"24g", carbs:"3g", fat:"1g"} },
  { id:"2", slug:"creatine-mono-300", name:"Creatine Monohydrate 300غ", brand:"MyProtein", category:"creatine", price:6500, compareAtPrice:11000, rating:4.9, reviews:189, image:"/images/products/creatine-300.jpg", images:["/images/products/creatine-300.jpg"], weights:["300غ","500غ"], stock:20, sku:"CREA-300", expiryDate:"2027-03-20", batchNumber:"MP2026B04", nutrition:{ servingSize:"5g", servings:"60", calories:0, protein:"0g", carbs:"0g", fat:"0g"} },
  { id:"3", slug:"mass-gainer-5kg", name:"Mass Gainer 5كغ - Serious Mass", brand:"Optimum Nutrition", category:"mass", price:19500, compareAtPrice:22000, rating:4.5, reviews:112, image:"/images/products/mass-gainer.jpg", images:["/images/products/mass-gainer.jpg"], weights:["5كغ"], stock:4, isNew:true, sku:"MASS-CH5", expiryDate:"2026-12-01", batchNumber:"ON2026C01", nutrition:{ servingSize:"334g", servings:"16", calories:1250, protein:"50g", carbs:"250g", fat:"4g"} },
  { id:"4", slug:"pre-workout-explosive", name:"C4 Original Pre-Workout 30 حصة", brand:"C4", category:"preworkout", price:8500, rating:4.6, reviews:98, image:"/images/products/pre-workout.jpg", images:["/images/products/pre-workout.jpg"], flavors:["توت أزرق","بطيخ"], weights:["30 حصة"], stock:10, sku:"PRE-BLUE", expiryDate:"2027-01-10", batchNumber:"CL2026D02" },
  { id:"5", slug:"omega3-fish-oil", name:"Omega 3 Fish Oil - 90 كبسولة", brand:"Now Foods", category:"vitamins", price:4500, rating:4.7, reviews:76, image:"/images/products/omega3.jpg", images:["/images/products/omega3.jpg"], weights:["90 كبسولة"], stock:30, sku:"OM90", expiryDate:"2027-08-30", batchNumber:"NOW2026E11" },
  { id:"6", slug:"bcaa-500g", name:"BCAA 2:1:1 - 500غ", brand:"Scitec", category:"amino", price:5400, compareAtPrice:6200, rating:4.5, reviews:54, image:"/images/products/bcaa.jpg", images:["/images/products/bcaa.jpg"], weights:["500غ"], stock:8, sku:"SC-BCAA500", expiryDate:"2027-04-18", batchNumber:"SC2026F09" },
  { id:"7", slug:"l-carnitine-1500", name:"L-Carnitine 1500 - 30 جرعة", brand:"Nutrex", category:"fatburner", price:7200, rating:4.3, reviews:42, image:"/images/products/l-carnitine.jpg", images:["/images/products/l-carnitine.jpg"], flavors:["فراولة"], weights:["500مل"], stock:7, sku:"CARN-ST", expiryDate:"2026-11-11", batchNumber:"AP2026G03" },
  { id:"8", slug:"protein-bar-barebells", name:"Protein Bar - 12 لوح", brand:"Barebells", category:"bars", price:5600, rating:4.9, reviews:67, image:"/images/bundles/stack-energy.jpg", images:["/images/bundles/stack-energy.jpg"], weights:["12 لوح"], stock:40, isNew:true, sku:"BB-BAR12", expiryDate:"2026-10-05", batchNumber:"BB2026H07" },
];

export const brands = [
  { name: "Optimum Nutrition", src: "/images/brands/optimum-nutrition.png" },
  { name: "MyProtein", src: "/images/brands/myprotein.png" },
  { name: "Dymatize", src: "/images/brands/dymatize.png" },
  { name: "MuscleTech", src: "/images/brands/muscletech.png" },
  { name: "Now Foods", src: "/images/brands/now-foods.png" },
  { name: "C4", src: "/images/brands/c4.png" },
];

export const bundles = [
  { id:"b1", name:"باك الضخامة الشامل", price:39500, oldPrice:47500, items:["Whey 2كغ","Creatine 300غ","Shaker"], badge:"الأكثر مبيعاً", image:"/images/bundles/stack-mass.jpg" },
  { id:"b2", name:"باك التنشيف", price:28500, oldPrice:34000, items:["Whey Isolate","L-Carnitine","Omega 3"], badge:"توفير 16%", image:"/images/bundles/stack-cut.jpg" },
  { id:"b3", name:"باك الطاقة", price:22500, oldPrice:27000, items:["Pre-Workout","Creatine","BCAA"], badge:"جديد", image:"/images/bundles/stack-energy.jpg" },
];

export const heroImage = "/images/hero/hero-athlete.jpg";
