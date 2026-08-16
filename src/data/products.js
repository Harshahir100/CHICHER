// Mock product database — 100 items across Women's Wear & Jewellery.
// Images are real, license-free Pexels stock URLs.

const ethnicWearImages = [
  'https://images.pexels.com/photos/38526708/pexels-photo-38526708.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/34346734/pexels-photo-34346734.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/35637857/pexels-photo-35637857.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/34095761/pexels-photo-34095761.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/38391095/pexels-photo-38391095.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/35273892/pexels-photo-35273892.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/28405815/pexels-photo-28405815.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/36951354/pexels-photo-36951354.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/32603187/pexels-photo-32603187.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/33418336/pexels-photo-33418336.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
];

const westernWearImages = [
  'https://images.pexels.com/photos/32504513/pexels-photo-32504513.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/20552110/pexels-photo-20552110.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/10506772/pexels-photo-10506772.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/31718042/pexels-photo-31718042.png?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/34286820/pexels-photo-34286820.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/33152783/pexels-photo-33152783.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/32504521/pexels-photo-32504521.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/6138908/pexels-photo-6138908.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/13452828/pexels-photo-13452828.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/32504511/pexels-photo-32504511.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
];

const necklaceImages = [
  'https://images.pexels.com/photos/4889719/pexels-photo-4889719.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/32780784/pexels-photo-32780784.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/177332/pexels-photo-177332.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/35059564/pexels-photo-35059564.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/9551116/pexels-photo-9551116.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/17833830/pexels-photo-17833830.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/38269804/pexels-photo-38269804.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/29038003/pexels-photo-29038003.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/4735888/pexels-photo-4735888.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/28976815/pexels-photo-28976815.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
];

const earringImages = [
  'https://images.pexels.com/photos/37601639/pexels-photo-37601639.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/15636700/pexels-photo-15636700.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/9704263/pexels-photo-9704263.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/5475582/pexels-photo-5475582.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/1721937/pexels-photo-1721937.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/16594496/pexels-photo-16594496.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/4974402/pexels-photo-4974402.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/7615245/pexels-photo-7615245.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/16055232/pexels-photo-16055232.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/16055228/pexels-photo-16055228.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
];

const bangleImages = [
  'https://images.pexels.com/photos/32874211/pexels-photo-32874211.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/14873626/pexels-photo-14873626.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/32988532/pexels-photo-32988532.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/37401674/pexels-photo-37401674.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/12194309/pexels-photo-12194309.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/11476471/pexels-photo-11476471.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/8268782/pexels-photo-8268782.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/32988534/pexels-photo-32988534.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
];

const ringImages = [
  'https://images.pexels.com/photos/2849742/pexels-photo-2849742.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/2732096/pexels-photo-2732096.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/30541177/pexels-photo-30541177.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/30541187/pexels-photo-30541187.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/30541171/pexels-photo-30541171.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/30541170/pexels-photo-30541170.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/30541184/pexels-photo-30541184.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/30541178/pexels-photo-30541178.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/30541176/pexels-photo-30541176.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/19681742/pexels-photo-19681742.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
];

const colorPalette = [
  { hex: '#7c2d12', name: 'Rust' },
  { hex: '#831843', name: 'Maroon' },
  { hex: '#14532d', name: 'Emerald' },
  { hex: '#1e3a8a', name: 'Royal Blue' },
  { hex: '#581c87', name: 'Plum' },
  { hex: '#92400e', name: 'Bronze' },
  { hex: '#b45309', name: 'Amber' },
  { hex: '#0f172a', name: 'Onyx' },
  { hex: '#f8fafc', name: 'Ivory' },
  { hex: '#9ca3af', name: 'Silver' },
  { hex: '#d4af37', name: 'Gold' },
  { hex: '#dc2626', name: 'Crimson' },
  { hex: '#facc15', name: 'Sunflower' },
  { hex: '#0d9488', name: 'Teal' },
  { hex: '#4b5563', name: 'Slate' },
  { hex: '#e5e7eb', name: 'Pearl' },
];

const allSizes = ['XS', 'S', 'M', 'L', 'XL'];
const freeSizes = ['Free Size'];

function pick(arr, i, offset = 0) {
  return arr[(i + offset) % arr.length];
}

function buildProduct(id, name, category, subcategory, price, originalPrice, rating, reviewsCount, colorIdxs, sizes, images, description, inStock, isNew) {
  const colors = colorIdxs.map((idx) => colorPalette[idx]);
  return {
    id,
    name,
    category,
    subcategory,
    price,
    originalPrice,
    rating,
    reviewsCount,
    colors,
    sizes,
    images,
    description,
    inStock,
    sku: `AUR-${String(id).padStart(4, '0')}`,
    isNew,
  };
}

const products = [];

// Women's Wear — Ethnic (1–30)
const ethnicNames = [
  'Banarasi Silk Saree', 'Kanjivaram Festive Saree', 'Chikankari Anarkali Kurti', 'Patola Silk Saree',
  'Georgette Embroidered Saree', 'Cotton Straight Kurti', 'Net Lehenga Choli', 'Silk Palazzo Suit Set',
  'Organza Floral Saree', 'Linen A-Line Kurti', 'Velvet Bridal Lehenga', 'Chanderi Printed Saree',
  'Mirror Work Gown', 'Tussar Silk Saree', 'Straight Cut Suit Set', 'Half Saree Set',
  'Festive Sharara Set', 'Pattu Pavadai Sattai', 'Mysore Silk Saree', 'Bandhani Print Saree',
  'Embroidered Anarkali Gown', 'Chanderi Straight Kurti', 'Bridal Silk Lehenga', 'Kota Doria Saree',
  'Pashmina Wool Shawl', 'Silk Dhoti Kurta Set', 'Festive Kurti with Dupatta', 'Tissue Saree with Border',
  'Handloom Cotton Saree', 'Zari Work Lehenga',
];
ethnicNames.forEach((baseName, i) => {
  const id = i + 1;
  const price = 1499 + (i % 8) * 350;
  const originalPrice = price + 600 + (i % 5) * 200;
  const images = [pick(ethnicWearImages, i), pick(ethnicWearImages, i, 3), pick(ethnicWearImages, i, 6)];
  products.push(
    buildProduct(
      id,
      `${baseName}`,
      'women-wear',
      'Ethnic',
      price,
      originalPrice,
      3.8 + ((i % 12) / 10),
      24 + (i * 7) % 400,
      [i % 16, (i + 5) % 16, (i + 10) % 16],
      i % 4 === 0 ? freeSizes : allSizes,
      images,
      `Crafted with premium fabric and intricate detailing, the ${baseName} blends timeless tradition with a modern silhouette. Perfect for festive occasions, weddings, and celebratory gatherings. Easy to drape and comfortable for all-day wear.`,
      i % 9 !== 0,
      i < 8,
    ),
  );
});

// Women's Wear — Western (31–50)
const westernNames = [
  'Floral Midi Dress', 'Wrap Maxi Dress', 'Tailored Blazer', 'Pleated Skirt Set',
  'Off-Shoulder Top', 'Wide-Leg Trousers', 'Denim Jacket Dress', 'Satin Slip Dress',
  'Boho Tunic Top', 'Cropped Cardigan', 'Linen Shirt Dress', 'High-Waist Jeans',
  'Peplum Blouse', 'Tiered Midi Skirt', 'Knit Sweater Dress', 'Cargo Jumpsuit',
  'Ruffle Hem Dress', 'Belted Trench Coat', 'Cowl Neck Top', 'A-Line Mini Dress',
];
westernNames.forEach((baseName, i) => {
  const id = 31 + i;
  const price = 999 + (i % 7) * 300;
  const originalPrice = price + 500 + (i % 4) * 150;
  const images = [pick(westernWearImages, i), pick(westernWearImages, i, 4), pick(westernWearImages, i, 7)];
  products.push(
    buildProduct(
      id,
      `${baseName}`,
      'women-wear',
      'Western',
      price,
      originalPrice,
      3.6 + ((i % 14) / 10),
      18 + (i * 5) % 320,
      [i % 16, (i + 6) % 16, (i + 11) % 16],
      allSizes,
      images,
      `The ${baseName} is designed for effortless everyday elegance. Cut from breathable, easy-care fabric with a flattering fit that transitions seamlessly from day to evening. A versatile staple for the modern wardrobe.`,
      i % 8 !== 0,
      i < 6,
    ),
  );
});

// Jewellery — Necklaces (51–70)
const necklaceNames = [
  'Temple Gold Necklace', 'Kundan Bridal Set', 'Pearl Strand Necklace', 'Antique Polki Necklace',
  'Meenakari Pendant Set', 'Layered Gold Chain', 'Ruby Studded Haar', 'South Indian Mango Mala',
  'Navratri Necklace Set', 'Filigree Choker', 'Rose Gold Pendant', 'Emerald Bead Necklace',
  'Lakshmi Coin Necklace', 'Victorian Pearl Set', 'Oxidised Tribal Necklace', 'CZ American Diamond Set',
  'Bridal Rani Haar', 'Gold Plated Mangalsutra', 'Antique Temple Set', 'Festive Choker Set',
];
necklaceNames.forEach((baseName, i) => {
  const id = 51 + i;
  const price = 799 + (i % 9) * 250;
  const originalPrice = price + 400 + (i % 6) * 180;
  const images = [pick(necklaceImages, i), pick(necklaceImages, i, 5), pick(necklaceImages, i, 8)];
  products.push(
    buildProduct(
      id,
      `${baseName}`,
      'jewellery',
      'Necklaces',
      price,
      originalPrice,
      4.0 + ((i % 10) / 10),
      30 + (i * 9) % 500,
      [i % 16, (i + 4) % 16],
      freeSizes,
      images,
      `The ${baseName} is handcrafted by skilled artisans with a lustrous finish and secure clasp. Skin-friendly and tarnish-resistant, it elevates both festive and everyday looks. Comes in a keepsake jewellery box.`,
      i % 7 !== 0,
      i < 7,
    ),
  );
});

// Jewellery — Earrings (71–85)
const earringNames = [
  'Jhumka Gold Earrings', 'Chandbali Drops', 'Kundan Stud Earrings', 'Pearl Hoop Earrings',
  'Temple Hangings', 'Oxidised Tribal Earrings', 'CZ Drop Earrings', 'Meenakari Jhumka',
  'Antique Peacock Earrings', 'Gold Plated Hoops', 'Ruby Stud Set', 'Filigree Drops',
  'South Indian Mattal', 'Bridal Chandelier Earrings', 'Minimalist Huggies',
];
earringNames.forEach((baseName, i) => {
  const id = 71 + i;
  const price = 499 + (i % 6) * 200;
  const originalPrice = price + 300 + (i % 5) * 120;
  const images = [pick(earringImages, i), pick(earringImages, i, 3), pick(earringImages, i, 6)];
  products.push(
    buildProduct(
      id,
      `${baseName}`,
      'jewellery',
      'Earrings',
      price,
      originalPrice,
      3.9 + ((i % 11) / 10),
      20 + (i * 6) % 350,
      [i % 16, (i + 7) % 16],
      freeSizes,
      images,
      `The ${baseName} feature lightweight comfort with a secure push-back or hook closure. Hypoallergenic and nickel-free, ideal for sensitive ears. A statement piece for festive, bridal, or everyday styling.`,
      i % 6 !== 0,
      i < 5,
    ),
  );
});

// Jewellery — Bangles (86–95)
const bangleNames = [
  'Gold Plated Kada Set', 'Kundan Bridal Bangles', 'Antique Temple Bangle', 'Pearl Cuff Bracelet',
  'Meenakari Bangle Pair', 'Oxidised Stack Bangles', 'CZ Tennis Bracelet', 'Gold Plated Stack Set',
  'Emerald Studded Bangle', 'Filigree Cuff Kada',
];
bangleNames.forEach((baseName, i) => {
  const id = 86 + i;
  const price = 699 + (i % 7) * 220;
  const originalPrice = price + 350 + (i % 4) * 140;
  const images = [pick(bangleImages, i), pick(bangleImages, i, 2), pick(bangleImages, i, 5)];
  products.push(
    buildProduct(
      id,
      `${baseName}`,
      'jewellery',
      'Bangles',
      price,
      originalPrice,
      3.7 + ((i % 13) / 10),
      16 + (i * 8) % 280,
      [i % 16, (i + 3) % 16],
      i % 3 === 0 ? allSizes : freeSizes,
      images,
      `The ${baseName} are crafted with a smooth, skin-friendly finish and a secure box clasp. Tarnish-resistant and built for everyday wear or festive occasions. Arrives in a protective jewellery pouch.`,
      i % 5 !== 0,
      i < 4,
    ),
  );
});

// Jewellery — Rings (96–100)
const ringNames = [
  'Solitaire Diamond Ring', 'Antique Gold Band', 'Emerald Cocktail Ring', 'Pearl Statement Ring', 'CZ Bridal Ring Set',
];
ringNames.forEach((baseName, i) => {
  const id = 96 + i;
  const price = 899 + (i % 5) * 280;
  const originalPrice = price + 450 + (i % 3) * 160;
  const images = [pick(ringImages, i), pick(ringImages, i, 3), pick(ringImages, i, 6)];
  products.push(
    buildProduct(
      id,
      `${baseName}`,
      'jewellery',
      'Rings',
      price,
      originalPrice,
      4.1 + ((i % 9) / 10),
      40 + (i * 11) % 420,
      [i % 16, (i + 8) % 16],
      i % 2 === 0 ? allSizes : freeSizes,
      images,
      `The ${baseName} features a brilliant-cut stone set in a tarnish-resistant band. Hypoallergenic and nickel-free for comfortable everyday wear. Presented in a gift-ready jewellery box.`,
      true,
      i < 3,
    ),
  );
});

export const categories = [
  {
    slug: 'women-wear',
    name: 'Women Wear',
    subcategories: [
      { slug: 'Ethnic', name: 'Ethnic Wear' },
      { slug: 'Western', name: 'Western Wear' },
    ],
  },
  {
    slug: 'jewellery',
    name: 'Jewellery',
    subcategories: [
      { slug: 'Necklaces', name: 'Necklaces' },
      { slug: 'Earrings', name: 'Earrings' },
      { slug: 'Bangles', name: 'Bangles' },
      { slug: 'Rings', name: 'Rings' },
    ],
  },
];

export function getNewArrivals(limit = 12) {
  return products.filter((p) => p.isNew).slice(0, limit);
}

export function getProductById(id) {
  return products.find((p) => p.id === Number(id));
}

export function getRelatedProducts(product, limit = 4) {
  return products
    .filter((p) => p.id !== product.id && p.subcategory === product.subcategory)
    .slice(0, limit);
}

export default products;
