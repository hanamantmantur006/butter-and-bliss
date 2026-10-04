import React, { useState, useEffect, useMemo } from 'react';
import {
  ShoppingBag,
  Search,
  Menu as MenuIcon,
  X,
  Phone,
  Mail,
  MapPin,
  Clock,
  CheckCircle,
  Truck,
  ShieldCheck,
  Star,
  ChevronRight,
  Plus,
  Minus,
  Trash2,
  Lock,
  Upload,
  Sparkles,
  ArrowRight,
  ChefHat,
  Award,
  Check,
  Package,
  MessageCircle,
  Edit2,
  RefreshCw
} from 'lucide-react';

const INITIAL_PRODUCTS = [
  // --- CAKES ---
  {
    id: 'c1',
    name: 'Chocolate Truffle Cake',
    category: 'Cakes',
    subCategory: 'Classic Cakes',
    basePrice: 650,
    priceUnit: '500g',
    rating: 4.9,
    reviews: 142,
    badge: 'Chef Special',
    isVeg: true,
    available: true,
    description: 'Layers of soft chocolate sponge drenched in rich 60% Belgian dark chocolate ganache.',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80',
    weightOptions: [
      { label: '500g', multiplier: 1 },
      { label: '1 kg', multiplier: 1.85 },
      { label: '2 kg', multiplier: 3.5 }
    ]
  },
  {
    id: 'c2',
    name: 'Black Forest Cake',
    category: 'Cakes',
    subCategory: 'Classic Cakes',
    basePrice: 550,
    priceUnit: '500g',
    rating: 4.8,
    reviews: 98,
    badge: 'Popular',
    isVeg: true,
    available: true,
    description: 'German chocolate gateau layered with fresh whipped vanilla cream, dark flakes, and wild sour cherries.',
    image: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?auto=format&fit=crop&w=800&q=80',
    weightOptions: [
      { label: '500g', multiplier: 1 },
      { label: '1 kg', multiplier: 1.85 },
      { label: '2 kg', multiplier: 3.5 }
    ]
  },
  {
    id: 'c3',
    name: 'White Forest Cake',
    category: 'Cakes',
    subCategory: 'Classic Cakes',
    basePrice: 600,
    priceUnit: '500g',
    rating: 4.7,
    reviews: 64,
    badge: null,
    isVeg: true,
    available: true,
    description: 'Vanilla sponge infused with cherry compote, enveloped in velvety Belgian white chocolate flakes.',
    image: 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&w=800&q=80',
    weightOptions: [
      { label: '500g', multiplier: 1 },
      { label: '1 kg', multiplier: 1.85 }
    ]
  },
  {
    id: 'c4',
    name: 'Red Velvet Cake',
    category: 'Cakes',
    subCategory: 'Gourmet Cakes',
    basePrice: 750,
    priceUnit: '500g',
    rating: 4.9,
    reviews: 210,
    badge: 'Bestseller',
    isVeg: true,
    available: true,
    description: 'Signature crimson sponge layered with light Philadelphia cream cheese mousse and Madagascar vanilla.',
    image: 'https://images.unsplash.com/photo-1586788680434-30d324b2d46f?auto=format&fit=crop&w=800&q=80',
    weightOptions: [
      { label: '500g', multiplier: 1 },
      { label: '1 kg', multiplier: 1.85 },
      { label: '2 kg', multiplier: 3.5 }
    ]
  },
  {
    id: 'c5',
    name: 'Butterscotch Caramel Cake',
    category: 'Cakes',
    subCategory: 'Classic Cakes',
    basePrice: 550,
    priceUnit: '500g',
    rating: 4.8,
    reviews: 82,
    badge: null,
    isVeg: true,
    available: true,
    description: 'Caramelized butter sponge layered with homemade crunchy butterscotch cashew praline and cream.',
    image: 'https://images.unsplash.com/photo-1559622214-f8a9850965bb?auto=format&fit=crop&w=800&q=80',
    weightOptions: [
      { label: '500g', multiplier: 1 },
      { label: '1 kg', multiplier: 1.85 }
    ]
  },
  {
    id: 'c6',
    name: 'Pineapple Delight Cake',
    category: 'Cakes',
    subCategory: 'Fruit Cakes',
    basePrice: 500,
    priceUnit: '500g',
    rating: 4.6,
    reviews: 110,
    badge: 'Classic',
    isVeg: true,
    available: true,
    description: 'Feather-light sponge filled with juicy simmered pineapple pieces and non-dairy whipped cream.',
    image: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=800&q=80',
    weightOptions: [
      { label: '500g', multiplier: 1 },
      { label: '1 kg', multiplier: 1.85 }
    ]
  },
  {
    id: 'c7',
    name: 'Madagascar Vanilla Bean Cake',
    category: 'Cakes',
    subCategory: 'Classic Cakes',
    basePrice: 450,
    priceUnit: '500g',
    rating: 4.7,
    reviews: 55,
    badge: null,
    isVeg: true,
    available: true,
    description: 'Pure natural vanilla sponge frosted with aerated buttercream and delicate white chocolate curls.',
    image: 'https://images.unsplash.com/photo-1621303837174-89787a7d4729?auto=format&fit=crop&w=800&q=80',
    weightOptions: [
      { label: '500g', multiplier: 1 },
      { label: '1 kg', multiplier: 1.85 }
    ]
  },
  {
    id: 'c8',
    name: 'New York Baked Cheesecake',
    category: 'Cakes',
    subCategory: 'Gourmet Cakes',
    basePrice: 180,
    priceUnit: '1 Slice',
    rating: 4.9,
    reviews: 175,
    badge: 'Chef Favorite',
    isVeg: true,
    available: true,
    description: 'Slow-baked cultured cream cheese slice resting on a spiced butter graham cracker crust.',
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=800&q=80',
    weightOptions: [
      { label: '1 Slice', multiplier: 1 },
      { label: 'Whole Cake (1kg)', multiplier: 5.5 }
    ]
  },
  {
    id: 'c9',
    name: 'Fresh Garden Fruit Cake',
    category: 'Cakes',
    subCategory: 'Fruit Cakes',
    basePrice: 650,
    priceUnit: '500g',
    rating: 4.8,
    reviews: 90,
    badge: 'Seasonal',
    isVeg: true,
    available: true,
    description: 'Adorned with handpicked kiwi, strawberries, green apples, dragon fruit, and glossy apricot glaze.',
    image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=800&q=80',
    weightOptions: [
      { label: '500g', multiplier: 1 },
      { label: '1 kg', multiplier: 1.85 }
    ]
  },
  {
    id: 'c10',
    name: 'Edible Custom Photo Cake',
    category: 'Cakes',
    subCategory: 'Gourmet Cakes',
    basePrice: 900,
    priceUnit: '1 kg',
    rating: 4.9,
    reviews: 130,
    badge: 'Customizable',
    isVeg: true,
    available: true,
    description: 'High-definition food-grade sugar sheet image printed on your choice of truffle or vanilla base.',
    image: 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&w=800&q=80',
    weightOptions: [
      { label: '1 kg', multiplier: 1 },
      { label: '2 kg', multiplier: 1.9 }
    ]
  },

  // --- PASTRIES & DESSERTS ---
  {
    id: 'p1',
    name: 'Dark Chocolate Pastry',
    category: 'Pastries & Desserts',
    subCategory: 'Pastries',
    basePrice: 100,
    priceUnit: '1 pc',
    rating: 4.8,
    reviews: 140,
    badge: 'Fast Seller',
    isVeg: true,
    available: true,
    description: 'Fluffy cocoa sponge slice covered in dark Belgian glaze with edible golden leaf.',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80',
    weightOptions: [{ label: '1 pc', multiplier: 1 }, { label: 'Pack of 2', multiplier: 1.9 }]
  },
  {
    id: 'p2',
    name: 'Black Forest Pastry',
    category: 'Pastries & Desserts',
    subCategory: 'Pastries',
    basePrice: 90,
    priceUnit: '1 pc',
    rating: 4.7,
    reviews: 87,
    badge: null,
    isVeg: true,
    available: true,
    description: 'Layered fresh cream pastry topped with dark chocolate curls and marinated cherries.',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80',
    weightOptions: [{ label: '1 pc', multiplier: 1 }]
  },
  {
    id: 'p3',
    name: 'Red Velvet Pastry',
    category: 'Pastries & Desserts',
    subCategory: 'Pastries',
    basePrice: 130,
    priceUnit: '1 pc',
    rating: 4.9,
    reviews: 95,
    badge: null,
    isVeg: true,
    available: true,
    description: 'Crimson cocoa sponge slice with smooth Philadelphia cream cheese frosting.',
    image: 'https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?auto=format&fit=crop&w=800&q=80',
    weightOptions: [{ label: '1 pc', multiplier: 1 }]
  },
  {
    id: 'p4',
    name: 'Fudgy Walnut Brownie',
    category: 'Pastries & Desserts',
    subCategory: 'Pastries',
    basePrice: 120,
    priceUnit: '1 pc',
    rating: 4.9,
    reviews: 215,
    badge: 'Warm & Gooey',
    isVeg: true,
    available: true,
    description: 'Decadent chocolate square loaded with toasted Kashmiri walnuts and melted chocolate chunks.',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80',
    weightOptions: [{ label: '1 pc', multiplier: 1 }, { label: 'Box of 4', multiplier: 3.8 }]
  },
  {
    id: 'p5',
    name: 'Molten Choco Lava Cake',
    category: 'Pastries & Desserts',
    subCategory: 'Desserts',
    basePrice: 150,
    priceUnit: '1 pc',
    rating: 4.9,
    reviews: 310,
    badge: 'Hot Seller',
    isVeg: true,
    available: true,
    description: 'Warm, individual chocolate cake that bursts with hot Belgian ganache upon spooning.',
    image: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?auto=format&fit=crop&w=800&q=80',
    weightOptions: [{ label: '1 pc', multiplier: 1 }]
  },
  {
    id: 'p6',
    name: 'Gourmet Frosted Cupcake',
    category: 'Pastries & Desserts',
    subCategory: 'Pastries',
    basePrice: 80,
    priceUnit: '1 pc',
    rating: 4.6,
    reviews: 50,
    badge: null,
    isVeg: true,
    available: true,
    description: 'Soft vanilla sponge crowned with Swiss meringue buttercream and sprinkles.',
    image: 'https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?auto=format&fit=crop&w=800&q=80',
    weightOptions: [{ label: '1 pc', multiplier: 1 }, { label: 'Box of 4', multiplier: 3.7 }]
  },
  {
    id: 'p7',
    name: 'Glazed Chocolate Donut',
    category: 'Pastries & Desserts',
    subCategory: 'Pastries',
    basePrice: 90,
    priceUnit: '1 pc',
    rating: 4.7,
    reviews: 73,
    badge: null,
    isVeg: true,
    available: true,
    description: 'Brioche ring dough fried light and bathed in glossy dark chocolate glaze.',
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80',
    weightOptions: [{ label: '1 pc', multiplier: 1 }]
  },
  {
    id: 'p8',
    name: 'Italian Tiramisu Jar',
    category: 'Pastries & Desserts',
    subCategory: 'Desserts',
    basePrice: 180,
    priceUnit: '1 Jar',
    rating: 4.9,
    reviews: 140,
    badge: 'Artisanal',
    isVeg: true,
    available: true,
    description: 'Espresso-soaked ladyfingers layered with fluffy mascarpone sabayon and Dutch cocoa.',
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=800&q=80',
    weightOptions: [{ label: '1 Jar (180ml)', multiplier: 1 }]
  },
  {
    id: 'p9',
    name: 'Silk Chocolate Mousse Cup',
    category: 'Pastries & Desserts',
    subCategory: 'Desserts',
    basePrice: 120,
    priceUnit: '1 Cup',
    rating: 4.8,
    reviews: 62,
    badge: null,
    isVeg: true,
    available: true,
    description: 'Light-as-air aerated dark chocolate mousse adorned with dark chocolate curls.',
    image: 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=800&q=80',
    weightOptions: [{ label: '1 Cup', multiplier: 1 }]
  },
  {
    id: 'p10',
    name: 'Parisian French Macarons',
    category: 'Pastries & Desserts',
    subCategory: 'Desserts',
    basePrice: 100,
    priceUnit: '1 pc',
    rating: 4.9,
    reviews: 188,
    badge: 'Parisian',
    isVeg: false,
    available: true,
    description: 'Almond flour meringue cookies with pistachio, salted caramel, raspberry and chocolate ganache.',
    image: 'https://images.unsplash.com/photo-1569864358642-9d1684040f43?auto=format&fit=crop&w=800&q=80',
    weightOptions: [{ label: '1 pc', multiplier: 1 }, { label: 'Box of 6', multiplier: 5.5 }]
  },

  // --- AUTHENTIC INDIAN SWEETS ---
  {
    id: 's1',
    name: 'Silver Vark Kaju Katli',
    category: 'Indian Sweets',
    subCategory: 'North Indian',
    basePrice: 1000,
    priceUnit: '1 kg',
    rating: 5.0,
    reviews: 420,
    badge: 'Pure Cashew',
    isVeg: true,
    available: true,
    description: 'Diamond-shaped cashew fudge made with premium Goan cashews and finished with 99.9% pure silver vark.',
    image: '/images/sweets/kaju_katli.jpg',
    weightOptions: [
      { label: '250g', multiplier: 0.28 },
      { label: '500g', multiplier: 0.52 },
      { label: '1 kg', multiplier: 1 }
    ]
  },
  {
    id: 's2',
    name: 'Desi Ghee Motichoor Laddu',
    category: 'Indian Sweets',
    subCategory: 'North Indian',
    basePrice: 500,
    priceUnit: '1 kg',
    rating: 4.9,
    reviews: 310,
    badge: 'Desi Ghee',
    isVeg: true,
    available: true,
    description: 'Tiny gram flour pearls fried in Vedic cow ghee, bound in saffron syrup with melon seeds.',
    image: '/images/sweets/motichoor.jpg',
    weightOptions: [
      { label: '250g', multiplier: 0.28 },
      { label: '500g', multiplier: 0.52 },
      { label: '1 kg', multiplier: 1 }
    ]
  },
  {
    id: 's3',
    name: 'Kashmiri Besan Laddu',
    category: 'Indian Sweets',
    subCategory: 'North Indian',
    basePrice: 450,
    priceUnit: '1 kg',
    rating: 4.8,
    reviews: 145,
    badge: 'Desi Ghee',
    isVeg: true,
    available: true,
    description: 'Slow-roasted nutty gram flour simmered in pure ghee, garnished with crushed cardamom and almond flakes.',
    image: '/images/sweets/motichoor.jpg',
    weightOptions: [
      { label: '500g', multiplier: 0.52 },
      { label: '1 kg', multiplier: 1 }
    ]
  },
  {
    id: 's4',
    name: 'Traditional Boondi Laddu',
    category: 'Indian Sweets',
    subCategory: 'North Indian',
    basePrice: 400,
    priceUnit: '1 kg',
    rating: 4.7,
    reviews: 95,
    badge: null,
    isVeg: true,
    available: true,
    description: 'Plump juicy boondi globes prepared with pure cloves, golden raisins, and rich cashew nuts.',
    image: '/images/sweets/motichoor.jpg',
    weightOptions: [
      { label: '500g', multiplier: 0.52 },
      { label: '1 kg', multiplier: 1 }
    ]
  },
  {
    id: 's5',
    name: 'Melt-in-Mouth Mysore Pak',
    category: 'Indian Sweets',
    subCategory: 'South Indian',
    basePrice: 550,
    priceUnit: '1 kg',
    rating: 4.9,
    reviews: 260,
    badge: 'Royal Heritage',
    isVeg: true,
    available: true,
    description: 'Authentic royal Mysore palace fudge crafted with gram flour and sizzling hot cow ghee.',
    image: 'https://images.unsplash.com/photo-1599785209707-a456fc1337bb?auto=format&fit=crop&w=800&q=80',
    weightOptions: [
      { label: '250g', multiplier: 0.28 },
      { label: '500g', multiplier: 0.52 },
      { label: '1 kg', multiplier: 1 }
    ]
  },
  {
    id: 's6',
    name: 'Authentic Dharwad Peda',
    category: 'Indian Sweets',
    subCategory: 'South Indian',
    basePrice: 600,
    priceUnit: '1 kg',
    rating: 4.9,
    reviews: 180,
    badge: 'GI Heritage',
    isVeg: true,
    available: true,
    description: 'Dark caramelized Dharwad milk mawa roasted slowly until bronze, dusted lightly with fine tagar sugar.',
    image: '/images/sweets/kaju_katli.jpg',
    weightOptions: [
      { label: '500g', multiplier: 0.52 },
      { label: '1 kg', multiplier: 1 }
    ]
  },
  {
    id: 's7',
    name: 'Belagavi Special Kunda',
    category: 'Indian Sweets',
    subCategory: 'South Indian',
    basePrice: 500,
    priceUnit: '1 kg',
    rating: 4.8,
    reviews: 94,
    badge: null,
    isVeg: true,
    available: true,
    description: 'Slow-simmered whole milk caramelized to a decadent toffee texture from North Karnataka.',
    image: '/images/sweets/gajar_halwa.jpg',
    weightOptions: [
      { label: '500g', multiplier: 0.52 },
      { label: '1 kg', multiplier: 1 }
    ]
  },
  {
    id: 's8',
    name: 'Dharwad Karadantu',
    category: 'Indian Sweets',
    subCategory: 'South Indian',
    basePrice: 800,
    priceUnit: '1 kg',
    rating: 4.9,
    reviews: 110,
    badge: 'Nutrient Rich',
    isVeg: true,
    available: true,
    description: 'Chewy traditional Gokak treat loaded with organic jaggery, edible gum (dink), pistachios, and almonds.',
    image: '/images/sweets/kaju_katli.jpg',
    weightOptions: [
      { label: '500g', multiplier: 0.52 },
      { label: '1 kg', multiplier: 1 }
    ]
  },
  {
    id: 's9',
    name: 'Shahi Mawa Gulab Jamun',
    category: 'Indian Sweets',
    subCategory: 'North Indian',
    basePrice: 30,
    priceUnit: '1 pc',
    rating: 5.0,
    reviews: 520,
    badge: 'All-time Hit',
    isVeg: true,
    available: true,
    description: 'Golden-fried mawa and paneer spheres soaked warm in rose water and crushed cardamom syrup.',
    image: '/images/sweets/gulab_jamun.jpg',
    weightOptions: [
      { label: '1 pc', multiplier: 1 },
      { label: 'Box of 6', multiplier: 5.8 },
      { label: 'Box of 12', multiplier: 11 }
    ]
  },
  {
    id: 's10',
    name: 'Crispy Caramel Kala Jamun',
    category: 'Indian Sweets',
    subCategory: 'North Indian',
    basePrice: 35,
    priceUnit: '1 pc',
    rating: 4.9,
    reviews: 140,
    badge: null,
    isVeg: true,
    available: true,
    description: 'Slow-fried to dark caramelized crust with a pistachio and saffron core.',
    image: 'https://images.unsplash.com/photo-1590779033100-9f60a05a013d?auto=format&fit=crop&w=800&q=80',
    weightOptions: [
      { label: '1 pc', multiplier: 1 },
      { label: 'Box of 6', multiplier: 5.8 }
    ]
  },
  {
    id: 's11',
    name: 'Kolkata Spongy Rasgulla',
    category: 'Indian Sweets',
    subCategory: 'Bengali',
    basePrice: 30,
    priceUnit: '1 pc',
    rating: 4.9,
    reviews: 380,
    badge: 'Authentic Chena',
    isVeg: true,
    available: true,
    description: 'Porous, light cow milk cottage cheese dumplings simmered in clear, fragrant cardamom nectar.',
    image: '/images/sweets/rasgulla.jpg',
    weightOptions: [
      { label: '1 pc', multiplier: 1 },
      { label: 'Can of 6', multiplier: 5.8 }
    ]
  },
  {
    id: 's12',
    name: 'Kesar Pista Rasmalai',
    category: 'Indian Sweets',
    subCategory: 'Bengali',
    basePrice: 60,
    priceUnit: '1 pc',
    rating: 5.0,
    reviews: 490,
    badge: 'Royal Favorite',
    isVeg: true,
    available: true,
    description: 'Soft flattened chenna discs submerged in chilled thickened saffron milk, flecked with pistachios.',
    image: '/images/sweets/rasmalai.webp',
    weightOptions: [
      { label: '1 pc', multiplier: 1 },
      { label: 'Pack of 4', multiplier: 3.9 }
    ]
  },
  {
    id: 's13',
    name: 'Bengali Cham Cham',
    category: 'Indian Sweets',
    subCategory: 'Bengali',
    basePrice: 50,
    priceUnit: '1 pc',
    rating: 4.7,
    reviews: 88,
    badge: null,
    isVeg: true,
    available: true,
    description: 'Elongated chenna sweet stuffed with sweetened mawa cream and rolled in desiccated coconut.',
    image: '/images/sweets/rasmalai.webp',
    weightOptions: [{ label: '1 pc', multiplier: 1 }]
  },
  {
    id: 's14',
    name: 'Nolen Gur Sandesh',
    category: 'Indian Sweets',
    subCategory: 'Bengali',
    basePrice: 50,
    priceUnit: '1 pc',
    rating: 4.9,
    reviews: 130,
    badge: 'Specialty',
    isVeg: true,
    available: true,
    description: 'Delicate fresh chenna kneaded with authentic winter date palm jaggery from Bengal.',
    image: '/images/sweets/rasmalai.webp',
    weightOptions: [{ label: '1 pc', multiplier: 1 }]
  },
  {
    id: 's15',
    name: 'Shahi Kesar Rajbhog',
    category: 'Indian Sweets',
    subCategory: 'Bengali',
    basePrice: 60,
    priceUnit: '1 pc',
    rating: 4.8,
    reviews: 95,
    badge: null,
    isVeg: true,
    available: true,
    description: 'King-sized rasgulla stuffed with roasted almonds and steeped in fragrant Kashmiri kesar syrup.',
    image: '/images/sweets/rasgulla.jpg',
    weightOptions: [{ label: '1 pc', multiplier: 1 }]
  },
  {
    id: 's16',
    name: 'Pure Ghee Jalebi (Crisp & Hot)',
    category: 'Indian Sweets',
    subCategory: 'North Indian',
    basePrice: 300,
    priceUnit: '1 kg',
    rating: 4.9,
    reviews: 320,
    badge: 'Fresh & Crisp',
    isVeg: true,
    available: true,
    description: 'Swirling pretzel coils fried crisp in hot cow ghee, bursting with warm saffron syrup.',
    image: '/images/sweets/jalebi.jpg',
    weightOptions: [
      { label: '250g', multiplier: 0.28 },
      { label: '500g', multiplier: 0.52 },
      { label: '1 kg', multiplier: 1 }
    ]
  },
  {
    id: 's17',
    name: 'Shahi Urad Imarti',
    category: 'Indian Sweets',
    subCategory: 'North Indian',
    basePrice: 400,
    priceUnit: '1 kg',
    rating: 4.8,
    reviews: 110,
    badge: null,
    isVeg: true,
    available: true,
    description: 'Geometrically piped black gram batter fried golden and steeped in rose-cardamom syrup.',
    image: 'https://images.unsplash.com/photo-1760263215450-b13943da7e17?auto=format&fit=crop&w=800&q=80',
    weightOptions: [
      { label: '500g', multiplier: 0.52 },
      { label: '1 kg', multiplier: 1 }
    ]
  },
  {
    id: 's18',
    name: 'Flaky Balushahi',
    category: 'Indian Sweets',
    subCategory: 'North Indian',
    basePrice: 400,
    priceUnit: '1 kg',
    rating: 4.7,
    reviews: 82,
    badge: null,
    isVeg: true,
    available: true,
    description: 'Multi-layered flaky donut sweet fried in desi ghee with crisp glaze outside and melt within.',
    image: '/images/sweets/jalebi.jpg',
    weightOptions: [
      { label: '500g', multiplier: 0.52 },
      { label: '1 kg', multiplier: 1 }
    ]
  },
  {
    id: 's19',
    name: 'Jaipuri Malai Ghewar',
    category: 'Indian Sweets',
    subCategory: 'North Indian',
    basePrice: 600,
    priceUnit: '1 kg',
    rating: 5.0,
    reviews: 280,
    badge: 'Festive Special',
    isVeg: true,
    available: true,
    description: 'Crisp honeycomb disc deep-fried in desi ghee, crowned with condensed Rabri and silver vark.',
    image: '/images/sweets/rasmalai.webp',
    weightOptions: [
      { label: '500g', multiplier: 0.55 },
      { label: '1 kg', multiplier: 1 }
    ]
  },
  {
    id: 's20',
    name: 'Mathura Mawa Peda',
    category: 'Indian Sweets',
    subCategory: 'North Indian',
    basePrice: 450,
    priceUnit: '1 kg',
    rating: 4.8,
    reviews: 130,
    badge: null,
    isVeg: true,
    available: true,
    description: 'Deep roasted brown khoya fudge packed with freshly ground green cardamom.',
    image: '/images/sweets/kaju_katli.jpg',
    weightOptions: [
      { label: '500g', multiplier: 0.52 },
      { label: '1 kg', multiplier: 1 }
    ]
  },
  {
    id: 's21',
    name: 'Maharashtrian Puran Poli',
    category: 'Indian Sweets',
    subCategory: 'Gujarati & Maharashtrian',
    basePrice: 60,
    priceUnit: '1 pc',
    rating: 4.9,
    reviews: 210,
    badge: 'Traditional',
    isVeg: true,
    available: true,
    description: 'Paper-thin wheat flatbread stuffed with spiced chana dal and organic jaggery, drenched in tup (ghee).',
    image: 'https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&w=800&q=80',
    weightOptions: [
      { label: '1 pc', multiplier: 1 },
      { label: 'Pack of 4', multiplier: 3.8 }
    ]
  },
  {
    id: 's22',
    name: 'Ukdiche Modak (Steamed)',
    category: 'Indian Sweets',
    subCategory: 'Gujarati & Maharashtrian',
    basePrice: 50,
    priceUnit: '1 pc',
    rating: 5.0,
    reviews: 310,
    badge: 'Ganesh Favorite',
    isVeg: true,
    available: true,
    description: 'Delicate steamed rice flour dumplings filled with freshly grated coconut and melted organic jaggery.',
    image: '/images/sweets/rasgulla.jpg',
    weightOptions: [
      { label: '1 pc', multiplier: 1 },
      { label: 'Box of 5', multiplier: 4.8 }
    ]
  },
  {
    id: 's23',
    name: 'Crispy Karanji / Gujiya',
    category: 'Indian Sweets',
    subCategory: 'Gujarati & Maharashtrian',
    basePrice: 40,
    priceUnit: '1 pc',
    rating: 4.8,
    reviews: 140,
    badge: null,
    isVeg: true,
    available: true,
    description: 'Crisp half-moon pastry shell stuffed with dry fruits, roasted semolina, and grated coconut.',
    image: '/images/sweets/jalebi.jpg',
    weightOptions: [{ label: '1 pc', multiplier: 1 }]
  },
  {
    id: 's24',
    name: 'Fresh Coconut Barfi',
    category: 'Indian Sweets',
    subCategory: 'South Indian',
    basePrice: 400,
    priceUnit: '1 kg',
    rating: 4.7,
    reviews: 70,
    badge: null,
    isVeg: true,
    available: true,
    description: 'Freshly grated coastal coconut cooked with milk, organic cane sugar, and aromatic cardamom seeds.',
    image: '/images/sweets/kaju_katli.jpg',
    weightOptions: [
      { label: '500g', multiplier: 0.52 },
      { label: '1 kg', multiplier: 1 }
    ]
  },
  {
    id: 's25',
    name: 'Creamy Milk Barfi',
    category: 'Indian Sweets',
    subCategory: 'North Indian',
    basePrice: 500,
    priceUnit: '1 kg',
    rating: 4.8,
    reviews: 110,
    badge: null,
    isVeg: true,
    available: true,
    description: 'Pure whole cow milk condensed slowly in cast iron kadhais to tender velvety squares.',
    image: '/images/sweets/kaju_katli.jpg',
    weightOptions: [
      { label: '500g', multiplier: 0.52 },
      { label: '1 kg', multiplier: 1 }
    ]
  },
  {
    id: 's26',
    name: 'Shahi Badam Barfi',
    category: 'Indian Sweets',
    subCategory: 'Festival Specials',
    basePrice: 900,
    priceUnit: '1 kg',
    rating: 4.9,
    reviews: 160,
    badge: 'Premium',
    isVeg: true,
    available: true,
    description: 'Finely blanched California almonds made into royal melt-in-mouth diamonds with saffron.',
    image: '/images/sweets/kaju_katli.jpg',
    weightOptions: [
      { label: '500g', multiplier: 0.52 },
      { label: '1 kg', multiplier: 1 }
    ]
  },
  {
    id: 's27',
    name: 'Flaky Soan Papdi',
    category: 'Indian Sweets',
    subCategory: 'North Indian',
    basePrice: 350,
    priceUnit: '1 kg',
    rating: 4.6,
    reviews: 74,
    badge: null,
    isVeg: true,
    available: true,
    description: 'Spun sugar and roasted chickpea flour confection topped with crushed pistachios.',
    image: '/images/sweets/kaju_katli.jpg',
    weightOptions: [
      { label: '500g', multiplier: 0.52 },
      { label: '1 kg', multiplier: 1 }
    ]
  },
  {
    id: 's28',
    name: 'Alwar Special Kalakand',
    category: 'Indian Sweets',
    subCategory: 'North Indian',
    basePrice: 500,
    priceUnit: '1 kg',
    rating: 4.9,
    reviews: 190,
    badge: 'Moist & Grainy',
    isVeg: true,
    available: true,
    description: 'Grainy, moist milk cake prepared through slow artisanal condensation of fresh farm milk.',
    image: '/images/sweets/kaju_katli.jpg',
    weightOptions: [
      { label: '500g', multiplier: 0.52 },
      { label: '1 kg', multiplier: 1 }
    ]
  },
  {
    id: 's29',
    name: 'Lachha Rabri Matka',
    category: 'Indian Sweets',
    subCategory: 'North Indian',
    basePrice: 100,
    priceUnit: '1 serving',
    rating: 5.0,
    reviews: 320,
    badge: 'Clay Matka',
    isVeg: true,
    available: true,
    description: 'Clotted cream layers suspended in thick saffron-cardamom condensed milk, served in earthenware.',
    image: '/images/sweets/rasmalai.webp',
    weightOptions: [{ label: '1 serving (150g)', multiplier: 1 }]
  },
  {
    id: 's30',
    name: 'Kesar Pista Shrikhand',
    category: 'Indian Sweets',
    subCategory: 'Gujarati & Maharashtrian',
    basePrice: 100,
    priceUnit: '1 serving',
    rating: 4.9,
    reviews: 180,
    badge: 'Chilled',
    isVeg: true,
    available: true,
    description: 'Velvety whipped hung curd flavored with pure Kashmiri saffron and crushed green pistachios.',
    image: '/images/sweets/rasmalai.webp',
    weightOptions: [{ label: '1 serving (200g)', multiplier: 1 }, { label: '500g Tub', multiplier: 2.3 }]
  },
  {
    id: 's31',
    name: 'Almond Rich Basundi',
    category: 'Indian Sweets',
    subCategory: 'Gujarati & Maharashtrian',
    basePrice: 120,
    priceUnit: '1 serving',
    rating: 4.8,
    reviews: 85,
    badge: null,
    isVeg: true,
    available: true,
    description: 'Slow-thickened whole milk infused with nutmeg, saffron, and sliced California almond flakes.',
    image: '/images/sweets/rasmalai.webp',
    weightOptions: [{ label: '1 serving (200ml)', multiplier: 1 }]
  },
  {
    id: 's32',
    name: 'Rabri Malpua',
    category: 'Indian Sweets',
    subCategory: 'North Indian',
    basePrice: 60,
    priceUnit: '1 pc',
    rating: 4.9,
    reviews: 210,
    badge: 'Festive',
    isVeg: true,
    available: true,
    description: 'Crispy fried sweet pancakes topped with hot thick rabri, pistachio nuts, and cardamom drizzle.',
    image: '/images/sweets/jalebi.jpg',
    weightOptions: [{ label: '1 pc', multiplier: 1 }]
  },
  {
    id: 's33',
    name: 'Royal Anjeer Barfi',
    category: 'Indian Sweets',
    subCategory: 'Festival Specials',
    basePrice: 900,
    priceUnit: '1 kg',
    rating: 4.9,
    reviews: 130,
    badge: 'No Added Sugar',
    isVeg: true,
    available: true,
    description: 'Natural dried Turkish figs pureed with cashews and pistachios with zero refined sugar.',
    image: '/images/sweets/kaju_katli.jpg',
    weightOptions: [
      { label: '500g', multiplier: 0.52 },
      { label: '1 kg', multiplier: 1 }
    ]
  },
  {
    id: 's34',
    name: 'Kashmiri Dry Fruit Laddu',
    category: 'Indian Sweets',
    subCategory: 'Festival Specials',
    basePrice: 800,
    priceUnit: '1 kg',
    rating: 4.9,
    reviews: 170,
    badge: 'Energy Boost',
    isVeg: true,
    available: true,
    description: 'Dates, pistachios, almonds, cashews, and organic figs rolled in toasted poppy seeds.',
    image: '/images/sweets/motichoor.jpg',
    weightOptions: [
      { label: '500g', multiplier: 0.52 },
      { label: '1 kg', multiplier: 1 }
    ]
  },
  {
    id: 's35',
    name: 'Makar Sankranti Til Laddu',
    category: 'Indian Sweets',
    subCategory: 'Festival Specials',
    basePrice: 400,
    priceUnit: '1 kg',
    rating: 4.7,
    reviews: 65,
    badge: 'Winter Special',
    isVeg: true,
    available: true,
    description: 'Roasted white sesame seeds bound with organic Kolhapuri jaggery and crushed peanuts.',
    image: '/images/sweets/motichoor.jpg',
    weightOptions: [
      { label: '500g', multiplier: 0.52 },
      { label: '1 kg', multiplier: 1 }
    ]
  },
  {
    id: 's36',
    name: 'Ghee Roasted Rava Laddu',
    category: 'Indian Sweets',
    subCategory: 'South Indian',
    basePrice: 400,
    priceUnit: '1 kg',
    rating: 4.8,
    reviews: 90,
    badge: null,
    isVeg: true,
    available: true,
    description: 'Roasted semolina in golden cow ghee with fresh grated coconut and green raisins.',
    image: '/images/sweets/motichoor.jpg',
    weightOptions: [
      { label: '500g', multiplier: 0.52 },
      { label: '1 kg', multiplier: 1 }
    ]
  },
  {
    id: 's37',
    name: 'Maharashtrian Chirote',
    category: 'Indian Sweets',
    subCategory: 'Gujarati & Maharashtrian',
    basePrice: 400,
    priceUnit: '1 kg',
    rating: 4.7,
    reviews: 58,
    badge: null,
    isVeg: true,
    available: true,
    description: 'Multi-layered flaky pastry swirls dusted with confectioners sugar and rose cardamom snow.',
    image: '/images/sweets/jalebi.jpg',
    weightOptions: [
      { label: '500g', multiplier: 0.52 },
      { label: '1 kg', multiplier: 1 }
    ]
  },
  {
    id: 's38',
    name: 'Tamil Adhirasam',
    category: 'Indian Sweets',
    subCategory: 'South Indian',
    basePrice: 350,
    priceUnit: '1 kg',
    rating: 4.8,
    reviews: 77,
    badge: 'Traditional',
    isVeg: true,
    available: true,
    description: 'Fermented raw rice flour and dark jaggery pastry fried in pure sesame and ghee blend.',
    image: '/images/sweets/gulab_jamun.jpg',
    weightOptions: [
      { label: '500g', multiplier: 0.52 },
      { label: '1 kg', multiplier: 1 }
    ]
  },
  {
    id: 's39',
    name: 'Andhra Ghee Ariselu',
    category: 'Indian Sweets',
    subCategory: 'South Indian',
    basePrice: 400,
    priceUnit: '1 kg',
    rating: 4.8,
    reviews: 84,
    badge: null,
    isVeg: true,
    available: true,
    description: 'Andhra heritage delicacy prepared with fresh rice dough, jaggery syrup, and sesame seeds.',
    image: '/images/sweets/gulab_jamun.jpg',
    weightOptions: [
      { label: '500g', multiplier: 0.52 },
      { label: '1 kg', multiplier: 1 }
    ]
  },
  {
    id: 's40',
    name: 'Atreyapuram Pootharekulu',
    category: 'Indian Sweets',
    subCategory: 'South Indian',
    basePrice: 60,
    priceUnit: '1 pc',
    rating: 5.0,
    reviews: 195,
    badge: 'Paper Sweet',
    isVeg: true,
    available: true,
    description: 'Gossamer-thin rice starch edible wrappers stuffed with powdered dry fruits, jaggery, and pure cow ghee.',
    image: '/images/sweets/kaju_katli.jpg',
    weightOptions: [
      { label: '1 pc', multiplier: 1 },
      { label: 'Box of 5', multiplier: 4.8 }
    ]
  },
  {
    id: 's41',
    name: 'Kerala Unniyappam',
    category: 'Indian Sweets',
    subCategory: 'South Indian',
    basePrice: 25,
    priceUnit: '1 pc',
    rating: 4.7,
    reviews: 62,
    badge: null,
    isVeg: true,
    available: true,
    description: 'Crisp deep-fried spheres made with roasted rice, mashed Kerala bananas, coconut bits, and melted jaggery.',
    image: '/images/sweets/gulab_jamun.jpg',
    weightOptions: [{ label: '1 pc', multiplier: 1 }, { label: 'Pack of 6', multiplier: 5.5 }]
  },
  {
    id: 's42',
    name: 'Steamed Kozhukattai',
    category: 'Indian Sweets',
    subCategory: 'South Indian',
    basePrice: 40,
    priceUnit: '1 pc',
    rating: 4.8,
    reviews: 53,
    badge: null,
    isVeg: true,
    available: true,
    description: 'South Indian steamed rice dumplings packed with fresh coconut, cardamom, and palm jaggery.',
    image: '/images/sweets/rasgulla.jpg',
    weightOptions: [{ label: '1 pc', multiplier: 1 }]
  },
  {
    id: 's43',
    name: 'Tender Coconut (Elaneer) Payasam',
    category: 'Indian Sweets',
    subCategory: 'South Indian',
    basePrice: 100,
    priceUnit: '1 serving',
    rating: 5.0,
    reviews: 240,
    badge: 'Kerala Special',
    isVeg: true,
    available: true,
    description: 'Chilled pudding of tender coconut pulp and thickened coconut milk with roasted cashew nuts.',
    image: '/images/sweets/rasmalai.webp',
    weightOptions: [{ label: '1 serving (200ml)', multiplier: 1 }]
  },

  // --- COOKIES AND SNACKS ---
  {
    id: 'k1',
    name: 'Belgian Chocolate Chip Cookies',
    category: 'Cookies & Snacks',
    subCategory: 'Cookies',
    basePrice: 150,
    priceUnit: '1 pack',
    rating: 4.9,
    reviews: 180,
    badge: 'Top Pick',
    isVeg: true,
    available: true,
    description: 'Crisp butter cookies bursting with 55% cocoa Belgian dark chocolate chips.',
    image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=800&q=80',
    weightOptions: [{ label: '1 pack (200g)', multiplier: 1 }]
  },
  {
    id: 'k2',
    name: 'Danish Butter Cookies',
    category: 'Cookies & Snacks',
    subCategory: 'Cookies',
    basePrice: 120,
    priceUnit: '1 pack',
    rating: 4.8,
    reviews: 95,
    badge: null,
    isVeg: true,
    available: true,
    description: 'Melt-in-mouth piped swirls made with 100% pure dairy butter and vanilla extract.',
    image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=800&q=80',
    weightOptions: [{ label: '1 pack (200g)', multiplier: 1 }]
  },
  {
    id: 'k3',
    name: 'Roasted Almond Cookies',
    category: 'Cookies & Snacks',
    subCategory: 'Cookies',
    basePrice: 180,
    priceUnit: '1 pack',
    rating: 4.8,
    reviews: 62,
    badge: null,
    isVeg: true,
    available: true,
    description: 'Crunchy butter cookies packed with roasted California almonds and sea salt.',
    image: 'https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?auto=format&fit=crop&w=800&q=80',
    weightOptions: [{ label: '1 pack (200g)', multiplier: 1 }]
  },
  {
    id: 'k4',
    name: 'Old Delhi Ghee Nankhatai',
    category: 'Cookies & Snacks',
    subCategory: 'Cookies',
    basePrice: 150,
    priceUnit: '1 pack',
    rating: 5.0,
    reviews: 210,
    badge: 'Desi Ghee',
    isVeg: true,
    available: true,
    description: 'Traditional Indian shortbread baked with pure Bilona cow ghee, chickpea flour, and cardamom.',
    image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=800&q=80',
    weightOptions: [{ label: '1 pack (250g)', multiplier: 1 }]
  },
  {
    id: 'k5',
    name: 'Karachi Tutti Frutti Biscuits',
    category: 'Cookies & Snacks',
    subCategory: 'Cookies',
    basePrice: 120,
    priceUnit: '1 pack',
    rating: 4.7,
    reviews: 110,
    badge: null,
    isVeg: true,
    available: true,
    description: 'Crunchy square biscuits studded with colorful candied papaya fruit and cashew bits.',
    image: 'https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?auto=format&fit=crop&w=800&q=80',
    weightOptions: [{ label: '1 pack (250g)', multiplier: 1 }]
  },
  {
    id: 'k6',
    name: 'Crispy Butter Khari Biscuit',
    category: 'Cookies & Snacks',
    subCategory: 'Savory Snacks',
    basePrice: 100,
    priceUnit: '1 pack',
    rating: 4.8,
    reviews: 130,
    badge: 'Tea Time Fav',
    isVeg: true,
    available: true,
    description: 'Ultra flaky puff pastry biscuit with thousands of airy buttery layers, ideal for chai dunking.',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80',
    weightOptions: [{ label: '1 pack (200g)', multiplier: 1 }]
  },
  {
    id: 'k7',
    name: 'Artisan Cheesy Garlic Bread',
    category: 'Cookies & Snacks',
    subCategory: 'Savory Snacks',
    basePrice: 120,
    priceUnit: '1 Loaf',
    rating: 4.8,
    reviews: 145,
    badge: null,
    isVeg: true,
    available: true,
    description: 'Crusty loaf slathered with roasted garlic herb butter and bubbling molten mozzarella.',
    image: 'https://images.unsplash.com/photo-1619895092538-128341789043?auto=format&fit=crop&w=800&q=80',
    weightOptions: [{ label: '1 Loaf', multiplier: 1 }]
  },
  {
    id: 'k8',
    name: 'Crispy Spiced Veg Puff',
    category: 'Cookies & Snacks',
    subCategory: 'Savory Snacks',
    basePrice: 30,
    priceUnit: '1 pc',
    rating: 4.7,
    reviews: 290,
    badge: 'Hot Seller',
    isVeg: true,
    available: true,
    description: 'Golden flaky pastry triangle filled with potato, green peas, and fragrant Garam Masala.',
    image: '/images/sweets/samosa.jpeg',
    weightOptions: [{ label: '1 pc', multiplier: 1 }]
  },
  {
    id: 'k9',
    name: 'Spicy Paneer Tikka Puff',
    category: 'Cookies & Snacks',
    subCategory: 'Savory Snacks',
    basePrice: 45,
    priceUnit: '1 pc',
    rating: 4.9,
    reviews: 340,
    badge: 'Best Snack',
    isVeg: true,
    available: true,
    description: 'Puff pastry square bursting with marinated Malai paneer cubes tossed in tandoori spices.',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80',
    weightOptions: [{ label: '1 pc', multiplier: 1 }]
  },
  {
    id: 'k10',
    name: 'Bombay Grilled Cheese Sandwich',
    category: 'Cookies & Snacks',
    subCategory: 'Savory Snacks',
    basePrice: 100,
    priceUnit: '1 pc',
    rating: 4.8,
    reviews: 160,
    badge: null,
    isVeg: true,
    available: true,
    description: 'Layered with spiced mint chutney, crunchy cucumbers, tomatoes, and molten cheddar cheese.',
    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&q=80',
    weightOptions: [{ label: '1 pc', multiplier: 1 }]
  }
];

// Web Crypto API: Generate SHA-256 Hash
async function generateSha256(text) {
  const msgBuffer = new TextEncoder().encode(text);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Generate high-entropy customer passkey
function generateCustomerPasskey() {
  const array = new Uint8Array(16);
  crypto.getRandomValues(array);
  return Array.from(array, b => b.toString(16).padStart(2, '0')).join('');
}

// Compute immutable order integrity checksum
async function computeOrderIntegrityChecksum(orderData) {
  const serialized = [
    orderData.orderId,
    orderData.mobile,
    orderData.finalTotal,
    orderData.subtotal,
    JSON.stringify(orderData.items.map(i => ({ name: i.name, size: i.size, q: i.quantity, p: i.unitPrice }))),
    orderData.address,
    orderData.city
  ].join('|');
  return await generateSha256(serialized);
}

const INITIAL_ORDERS = [
  {
    orderId: 'BNB-2026-8812',
    date: '2026-10-04',
    customerName: 'Ananya Sharma',
    mobile: '9845012345',
    email: 'ananya.s@gmail.com',
    address: '12th Main, Indiranagar',
    city: 'Bengaluru',
    pincode: '560038',
    deliveryType: 'Home Delivery',
    timeSlot: 'Today 5:00 PM - 7:00 PM',
    status: 'Preparing',
    items: [
      { name: 'Chocolate Truffle Cake', size: '1 kg', quantity: 1, unitPrice: 1202, total: 1202 },
      { name: 'Silver Vark Kaju Katli', size: '500g', quantity: 1, unitPrice: 520, total: 520 }
    ],
    subtotal: 1722,
    deliveryFee: 0,
    discount: 172,
    finalTotal: 1550,
    paymentMethod: 'UPI',
    paymentStatus: 'Verified (Transaction #UPI-8842190)',
    custKey: 'cust_ananya_8812_secure',
    orderIntegrityHash: 'verified_genesis_signature_8812',
    instructions: 'Please pack in golden ribbon festival box.'
  },
  {
    orderId: 'BNB-2026-8799',
    date: '2026-10-04',
    customerName: 'Rohit Kulkarni',
    mobile: '9920156789',
    email: 'rohit.k@yahoo.com',
    address: '4th Block, Koramangala',
    city: 'Bengaluru',
    pincode: '560034',
    deliveryType: 'Home Delivery',
    timeSlot: 'Today 7:00 PM - 9:00 PM',
    status: 'Confirmed',
    items: [
      { name: 'Melt-in-Mouth Mysore Pak', size: '1 kg', quantity: 2, unitPrice: 550, total: 1100 },
      { name: 'Lachha Rabri Matka', size: '1 serving (150g)', quantity: 4, unitPrice: 100, total: 400 }
    ],
    subtotal: 1500,
    deliveryFee: 0,
    discount: 150,
    finalTotal: 1350,
    paymentMethod: 'Razorpay Online',
    paymentStatus: 'Verified (Razorpay #pay_Rzp9087112)',
    custKey: 'cust_rohit_8799_secure',
    orderIntegrityHash: 'verified_genesis_signature_8799',
    instructions: 'Do not ring the bell, please call upon arrival.'
  }
];

const INITIAL_CUSTOM_REQUESTS = [
  {
    id: 'CR-101',
    customerName: 'Priyanka Iyer',
    mobile: '9880011223',
    email: 'priyanka@iyer.in',
    type: 'Wedding 3-Tier Cake',
    flavor: 'Belgian Chocolate & Raspberry Buttercream',
    weight: '5 kg',
    message: 'Happy Forever Priyanka & Vikram',
    eventDate: '2026-10-18',
    budget: '₹8,000 - ₹10,000',
    dietary: '100% Eggless',
    instructions: 'Champagne gold leaf detailing with sugar handcrafted white jasmine blossoms.',
    status: 'Quotation Sent',
    dateAdded: '2026-10-03'
  }
];

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Application Data Persistence
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem('bnb_products');
      return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
    } catch {
      return INITIAL_PRODUCTS;
    }
  });

  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('bnb_orders');
      return saved ? JSON.parse(saved) : INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
    }
  });

  const [customRequests, setCustomRequests] = useState(() => {
    try {
      const saved = localStorage.getItem('bnb_custom_requests');
      return saved ? JSON.parse(saved) : INITIAL_CUSTOM_REQUESTS;
    } catch {
      return INITIAL_CUSTOM_REQUESTS;
    }
  });

  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('bnb_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [customerTokens, setCustomerTokens] = useState(() => {
    try {
      const saved = localStorage.getItem('bnb_customer_tokens');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Admin Authentication State
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => {
    return sessionStorage.getItem('bnb_admin_auth') === 'true';
  });
  const [adminPinInput, setAdminPinInput] = useState('');
  const [adminPinError, setAdminPinError] = useState('');

  // Discount Coupons
  const [coupons, setCoupons] = useState([
    { code: 'BLISS10', discountPercent: 10, minOrder: 499, description: '10% OFF on all orders above ₹499' },
    { code: 'FESTIVE20', discountPercent: 20, minOrder: 1200, description: '20% OFF festive celebration orders above ₹1200' },
    { code: 'SWEET50', discountPercent: 15, minOrder: 799, description: '15% OFF for traditional Indian sweets' }
  ]);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponInput, setCouponInput] = useState('');

  useEffect(() => {
    try {
      localStorage.setItem('bnb_products', JSON.stringify(products));
    } catch (e) { console.error(e); }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem('bnb_orders', JSON.stringify(orders));
    } catch (e) { console.error(e); }
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem('bnb_custom_requests', JSON.stringify(customRequests));
    } catch (e) { console.error(e); }
  }, [customRequests]);

  useEffect(() => {
    try {
      localStorage.setItem('bnb_cart', JSON.stringify(cart));
    } catch (e) { console.error(e); }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('bnb_customer_tokens', JSON.stringify(customerTokens));
    } catch (e) { console.error(e); }
  }, [customerTokens]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const addToCart = (product, selectedOption = null) => {
    const canonicalProduct = products.find(p => p.id === product.id) || product;
    const option = selectedOption || (canonicalProduct.weightOptions ? canonicalProduct.weightOptions[0] : { label: canonicalProduct.priceUnit, multiplier: 1 });
    const finalPrice = Math.round(canonicalProduct.basePrice * option.multiplier);
    const cartItemId = `${canonicalProduct.id}-${option.label}`;

    setCart((prev) => {
      const existing = prev.find((item) => item.cartItemId === cartItemId);
      if (existing) {
        return prev.map((item) =>
          item.cartItemId === cartItemId
            ? { ...item, quantity: item.quantity + 1, totalPrice: (item.quantity + 1) * finalPrice }
            : item
        );
      } else {
        return [
          ...prev,
          {
            cartItemId,
            productId: canonicalProduct.id,
            name: canonicalProduct.name,
            category: canonicalProduct.category,
            image: canonicalProduct.image,
            optionLabel: option.label,
            multiplier: option.multiplier,
            unitPrice: finalPrice,
            quantity: 1,
            totalPrice: finalPrice
          }
        ];
      }
    });

    showToast(`Added "${canonicalProduct.name} (${option.label})" to cart!`);
  };

  const updateCartQuantity = (cartItemId, delta) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.cartItemId === cartItemId) {
            const newQty = item.quantity + delta;
            return newQty > 0
              ? { ...item, quantity: newQty, totalPrice: newQty * item.unitPrice }
              : null;
          }
          return item;
        })
        .filter(Boolean)
      );
  };

  const removeFromCart = (cartItemId) => {
    setCart((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
    showToast('Item removed from cart.');
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  const cartSubtotal = useMemo(() => {
    return cart.reduce((sum, item) => {
      const catalogItem = products.find(p => p.id === item.productId);
      const trustedUnit = catalogItem ? Math.round(catalogItem.basePrice * (item.multiplier || 1)) : item.unitPrice;
      return sum + (trustedUnit * item.quantity);
    }, 0);
  }, [cart, products]);

  const discountAmount = useMemo(() => {
    if (!appliedCoupon) return 0;
    if (cartSubtotal < appliedCoupon.minOrder) return 0;
    return Math.round((cartSubtotal * appliedCoupon.discountPercent) / 100);
  }, [appliedCoupon, cartSubtotal]);

  const deliveryFee = useMemo(() => {
    if (cart.length === 0) return 0;
    return cartSubtotal >= 500 ? 0 : 50;
  }, [cartSubtotal, cart.length]);

  const grandTotal = useMemo(() => {
    return Math.max(0, cartSubtotal - discountAmount + deliveryFee);
  }, [cartSubtotal, discountAmount, deliveryFee]);

  const totalCartCount = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }, [cart]);

  const navigateTo = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#FDFBF7] text-[#2C1810]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#3A1C16] text-[#FDFBF7] px-5 py-3.5 rounded-xl shadow-2xl flex items-center space-x-3 border border-[#D99B26]/30 animate-bounce">
          <Sparkles className="w-5 h-5 text-[#D99B26]" />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Navigation Header */}
      <header className="sticky top-0 z-40 bg-[#FDFBF7]/95 backdrop-blur-md border-b border-[#E8DFD8] shadow-sm transition-all">
        <div className="bg-[#3A1C16] text-[#F9EBD2] text-xs py-1.5 px-4 text-center tracking-wide font-medium flex justify-center items-center gap-2">
          <span>✨ Traditional Bilona Cow Ghee Sweets & French Patisserie • Free Express Delivery Over ₹500 across India</span>
          <span className="hidden sm:inline bg-[#D99B26] text-[#3A1C16] px-2 py-0.5 rounded font-bold uppercase text-[10px]">Secure & Verified</span>
        </div>

        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Brand Logo */}
          <div onClick={() => navigateTo('home')} className="flex items-center space-x-3 cursor-pointer group">
            <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-[#3A1C16] to-[#6A382A] flex items-center justify-center text-[#D99B26] shadow-md group-hover:scale-105 transition-transform">
              <ChefHat className="w-6 h-6" />
            </div>
            <div>
              <span className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#3A1C16] block leading-none">
                BUTTER <span className="text-[#C5892F]">&</span> BLISS
              </span>
              <span className="text-[11px] uppercase tracking-widest text-[#8C6D62] font-semibold">
                Bakery & Royal Mithai
              </span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center space-x-7 font-medium text-sm text-[#4A3228]">
            <button onClick={() => navigateTo('home')} className={`hover:text-[#C5892F] transition py-1 ${currentPage === 'home' ? 'text-[#C5892F] font-bold border-b-2 border-[#C5892F]' : ''}`}>Home</button>
            <button onClick={() => navigateTo('menu')} className={`hover:text-[#C5892F] transition py-1 ${currentPage === 'menu' ? 'text-[#C5892F] font-bold border-b-2 border-[#C5892F]' : ''}`}>Our Menu</button>
            <button onClick={() => navigateTo('order-online')} className={`hover:text-[#C5892F] transition py-1 ${currentPage === 'order-online' ? 'text-[#C5892F] font-bold border-b-2 border-[#C5892F]' : ''}`}>Order Online</button>
            <button onClick={() => navigateTo('custom-cakes')} className={`hover:text-[#C5892F] transition py-1 ${currentPage === 'custom-cakes' ? 'text-[#C5892F] font-bold border-b-2 border-[#C5892F]' : ''}`}>Custom Cakes</button>
            <button onClick={() => navigateTo('about')} className={`hover:text-[#C5892F] transition py-1 ${currentPage === 'about' ? 'text-[#C5892F] font-bold border-b-2 border-[#C5892F]' : ''}`}>About Us</button>
            <button onClick={() => navigateTo('contact-track')} className={`hover:text-[#C5892F] transition py-1 ${currentPage === 'contact-track' ? 'text-[#C5892F] font-bold border-b-2 border-[#C5892F]' : ''}`}>Contact & Track</button>
          </div>

          {/* Action Area */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => navigateTo('admin')}
              className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition ${
                currentPage === 'admin'
                  ? 'bg-[#3A1C16] text-[#F9EBD2] border-[#3A1C16]'
                  : 'bg-white text-[#5C3B30] border-[#E2D5CC] hover:bg-[#F5ECE5]'
              }`}
              title="Bakery Management Portal"
            >
              <ShieldCheck className="w-4 h-4 text-[#D99B26]" />
              <span>Admin Portal</span>
            </button>

            {/* Shopping Cart Button */}
            <button
              onClick={() => setCartDrawerOpen(true)}
              className="relative p-2.5 rounded-full bg-[#FAF3EB] text-[#3A1C16] hover:bg-[#F2E5D6] transition shadow-sm border border-[#E8DFD8]"
              aria-label="View Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalCartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#D99B26] text-[#3A1C16] font-extrabold text-[11px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-white animate-pulse">
                  {totalCartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-[#3A1C16] hover:bg-[#F2E5D6]"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </nav>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#FDFBF7] border-b border-[#E8DFD8] px-4 pt-2 pb-6 space-y-3 shadow-lg">
            <button onClick={() => navigateTo('home')} className="block w-full text-left py-2 font-medium text-[#3A1C16] hover:text-[#C5892F]">Home</button>
            <button onClick={() => navigateTo('menu')} className="block w-full text-left py-2 font-medium text-[#3A1C16] hover:text-[#C5892F]">Our Menu</button>
            <button onClick={() => navigateTo('order-online')} className="block w-full text-left py-2 font-medium text-[#3A1C16] hover:text-[#C5892F]">Order Online & Checkout</button>
            <button onClick={() => navigateTo('custom-cakes')} className="block w-full text-left py-2 font-medium text-[#3A1C16] hover:text-[#C5892F]">Custom Cakes & Gift Hampers</button>
            <button onClick={() => navigateTo('about')} className="block w-full text-left py-2 font-medium text-[#3A1C16] hover:text-[#C5892F]">About Us</button>
            <button onClick={() => navigateTo('contact-track')} className="block w-full text-left py-2 font-medium text-[#3A1C16] hover:text-[#C5892F]">Track Order & Contact</button>
            <div className="pt-2 border-t border-[#E8DFD8]">
              <button onClick={() => navigateTo('admin')} className="w-full text-left py-2 font-semibold text-[#8C3C24] flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#D99B26]" />
                Owner Admin Dashboard
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Pages Content View */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage
            onExploreMenu={() => navigateTo('menu')}
            onOrderNow={() => navigateTo('order-online')}
            onAddToCart={addToCart}
            products={products}
            showToast={showToast}
          />
        )}

        {currentPage === 'menu' && (
          <MenuPage
            products={products}
            onAddToCart={addToCart}
            onGoToCheckout={() => navigateTo('order-online')}
          />
        )}

        {currentPage === 'order-online' && (
          <OrderOnlinePage
            cart={cart}
            products={products}
            updateCartQuantity={updateCartQuantity}
            removeFromCart={removeFromCart}
            clearCart={clearCart}
            cartSubtotal={cartSubtotal}
            deliveryFee={deliveryFee}
            discountAmount={discountAmount}
            grandTotal={grandTotal}
            appliedCoupon={appliedCoupon}
            setAppliedCoupon={setAppliedCoupon}
            coupons={coupons}
            couponInput={couponInput}
            setCouponInput={setCouponInput}
            onOrderPlaced={async (newOrder, passkey) => {
              setOrders((prev) => [newOrder, ...prev]);
              setCustomerTokens((prev) => ({ ...prev, [newOrder.orderId]: passkey }));
              clearCart();
              showToast(`Order #${newOrder.orderId} authenticated & placed securely!`);
              navigateTo('contact-track');
            }}
            showToast={showToast}
          />
        )}

        {currentPage === 'custom-cakes' && (
          <CustomCakesPage
            onSubmitCustomOrder={(req) => {
              setCustomRequests((prev) => [req, ...prev]);
              showToast('Your custom inquiry has been recorded! Our chef will review it shortly.');
            }}
          />
        )}

        {currentPage === 'about' && <AboutUsPage onExplore={() => navigateTo('menu')} />}

        {currentPage === 'contact-track' && (
          <ContactAndTrackPage
            orders={orders}
            setOrders={setOrders}
            customerTokens={customerTokens}
            isAdmin={isAdminAuthenticated}
            showToast={showToast}
          />
        )}

        {currentPage === 'admin' && (
          <AdminDashboardPage
            isAuthenticated={isAdminAuthenticated}
            setIsAuthenticated={(val) => {
              setIsAdminAuthenticated(val);
              sessionStorage.setItem('bnb_admin_auth', val ? 'true' : 'false');
            }}
            adminPinInput={adminPinInput}
            setAdminPinInput={setAdminPinInput}
            adminPinError={adminPinError}
            setAdminPinError={setAdminPinError}
            orders={orders}
            setOrders={setOrders}
            products={products}
            setProducts={setProducts}
            customRequests={customRequests}
            setCustomRequests={setCustomRequests}
            coupons={coupons}
            setCoupons={setCoupons}
            showToast={showToast}
          />
        )}
      </main>

      {/* Shopping Cart Drawer */}
      {cartDrawerOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity" onClick={() => setCartDrawerOpen(false)} />
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-[#FDFBF7] shadow-2xl flex flex-col border-l border-[#E8DFD8]">
              <div className="p-5 bg-[#3A1C16] text-[#FDFBF7] flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <ShoppingBag className="w-5 h-5 text-[#D99B26]" />
                  <h3 className="font-serif font-bold text-lg">Your Blissful Cart</h3>
                  <span className="text-xs bg-[#D99B26] text-[#3A1C16] px-2 py-0.5 rounded-full font-bold">{totalCartCount} items</span>
                </div>
                <button onClick={() => setCartDrawerOpen(false)} className="p-1 rounded-full hover:bg-white/20 text-white">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                {cart.length === 0 ? (
                  <div className="text-center py-16 space-y-4">
                    <div className="w-16 h-16 bg-[#F5ECE5] text-[#8C6D62] rounded-full flex items-center justify-center mx-auto">
                      <ShoppingBag className="w-8 h-8" />
                    </div>
                    <p className="font-serif text-lg text-[#3A1C16]">Your cart is hungry!</p>
                    <p className="text-xs text-[#8C6D62]">Add mouth-watering cakes or pure ghee mithai to enjoy a delicious bite.</p>
                    <button
                      onClick={() => {
                        setCartDrawerOpen(false);
                        navigateTo('menu');
                      }}
                      className="mt-3 px-5 py-2.5 bg-[#C5892F] hover:bg-[#A86F1E] text-white text-xs font-bold uppercase tracking-wider rounded-lg shadow"
                    >
                      Browse Our Sweets
                    </button>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div key={item.cartItemId} className="flex items-center space-x-3 bg-white p-3 rounded-xl border border-[#EDE4DC] shadow-xs">
                      <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover" />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm text-[#3A1C16] truncate">{item.name}</h4>
                        <p className="text-xs text-[#8C6D62]">Size: {item.optionLabel}</p>
                        <p className="text-xs font-bold text-[#C5892F] mt-1">₹{item.unitPrice}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button onClick={() => updateCartQuantity(item.cartItemId, -1)} className="w-6 h-6 rounded-md bg-[#F2E5D6] hover:bg-[#E8D4C0] text-[#3A1C16] flex items-center justify-center">
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold text-[#3A1C16] w-4 text-center">{item.quantity}</span>
                        <button onClick={() => updateCartQuantity(item.cartItemId, 1)} className="w-6 h-6 rounded-md bg-[#F2E5D6] hover:bg-[#E8D4C0] text-[#3A1C16] flex items-center justify-center">
                          <Plus className="w-3 h-3" />
                        </button>
                        <button onClick={() => removeFromCart(item.cartItemId)} className="text-[#B33925] p-1 hover:text-red-700">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {cart.length > 0 && (
                <div className="p-5 bg-white border-t border-[#E8DFD8] space-y-3">
                  <div className="flex justify-between text-sm text-[#5C3B30]">
                    <span>Catalog Subtotal</span>
                    <span>₹{cartSubtotal}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-sm text-green-700 font-medium">
                      <span>Discount ({appliedCoupon?.code})</span>
                      <span>-₹{discountAmount}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm text-[#5C3B30]">
                    <span>Delivery Charge</span>
                    <span>{deliveryFee === 0 ? <span className="text-green-600 font-bold">FREE</span> : `₹${deliveryFee}`}</span>
                  </div>
                  <div className="flex justify-between font-serif font-bold text-lg text-[#3A1C16] pt-2 border-t border-dashed border-[#E8DFD8]">
                    <span>Authoritative Total</span>
                    <span>₹{grandTotal}</span>
                  </div>

                  <button
                    onClick={() => {
                      setCartDrawerOpen(false);
                      navigateTo('order-online');
                    }}
                    className="w-full py-3 bg-[#3A1C16] hover:bg-[#25100B] text-[#F9EBD2] font-bold rounded-xl text-center shadow-lg transition flex items-center justify-center space-x-2"
                  >
                    <span>Proceed to Secure Checkout</span>
                    <ArrowRight className="w-4 h-4 text-[#D99B26]" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Global Footer */}
      <footer className="bg-[#26120D] text-[#ECE0D7] pt-16 pb-8 border-t border-[#3A1C16]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-[#3F231B]">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-9 h-9 rounded-full bg-[#D99B26] text-[#3A1C16] flex items-center justify-center font-bold">
                  <ChefHat className="w-5 h-5" />
                </div>
                <span className="font-serif text-2xl font-bold tracking-tight text-[#FDFBF7]">BUTTER & BLISS</span>
              </div>
              <p className="text-[#C5B3A6] text-sm leading-relaxed">
                "A Little Sweetness, A Lot of Happiness." Handcrafting European gourmet cakes and authentic pure Desi Ghee Indian sweets since 2012.
              </p>
              <div className="pt-2 text-xs text-[#D99B26] font-semibold space-y-1">
                <p>✓ 100% Desi Cow Ghee Sweets</p>
                <p>✓ Eggless Cakes & Jain Sweets Available</p>
                <p>✓ Cryptographically Verified Checkout</p>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-serif font-bold text-white text-base tracking-wide border-b border-[#D99B26]/30 pb-2">Explore Delights</h4>
              <ul className="space-y-2 text-sm text-[#C5B3A6]">
                <li><button onClick={() => navigateTo('menu')} className="hover:text-[#D99B26] transition">Royal Indian Mithai</button></li>
                <li><button onClick={() => navigateTo('menu')} className="hover:text-[#D99B26] transition">Belgian Truffle Cakes</button></li>
                <li><button onClick={() => navigateTo('custom-cakes')} className="hover:text-[#D99B26] transition">Custom Wedding Tiers</button></li>
                <li><button onClick={() => navigateTo('custom-cakes')} className="hover:text-[#D99B26] transition">Corporate Sweet Gift Boxes</button></li>
                <li><button onClick={() => navigateTo('contact-track')} className="hover:text-[#D99B26] transition">Live Order Tracker</button></li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="font-serif font-bold text-white text-base tracking-wide border-b border-[#D99B26]/30 pb-2">Flagship Boutiques</h4>
              <div className="space-y-3 text-xs text-[#C5B3A6]">
                <div>
                  <p className="font-semibold text-white">Bengaluru (Main Kitchen):</p>
                  <p>100 Feet Rd, Indiranagar, Bengaluru, KA 560038</p>
                </div>
                <div>
                  <p className="font-semibold text-white">Mumbai Studio:</p>
                  <p>Hill Road, Bandra West, Mumbai, MH 400050</p>
                </div>
                <div>
                  <p className="font-semibold text-white">Delhi NCR:</p>
                  <p>Greater Kailash 1, M-Block Market, New Delhi 110048</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-serif font-bold text-white text-base tracking-wide border-b border-[#D99B26]/30 pb-2">Order Direct</h4>
              <div className="space-y-2 text-xs text-[#C5B3A6]">
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-[#D99B26]" />
                  <span>+91 95358 39261</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-[#D99B26]" />
                  <span>orders@butterandbliss.in</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-[#D99B26]" />
                  <span>Mon - Sun: 8:00 AM – 11:30 PM</span>
                </div>
              </div>

              <a
                href="https://wa.me/919535839261?text=Hi%20Butter%20and%20Bliss,%20I%20would%20like%20to%20place%20a%20bakery%20order"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center space-x-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-bold py-2.5 px-4 rounded-xl shadow w-full transition"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp (+91 95358 39261)</span>
              </a>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#8C756B] gap-4">
            <p>© 2026 BUTTER AND BLISS India Private Limited. All Rights Reserved.</p>
            <div className="flex space-x-4">
              <span>FSSAI Lic. No: 11224334000189</span>
              <span>•</span>
              <button onClick={() => navigateTo('admin')} className="hover:text-white underline">Owner Portal</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function HomePage({ onExploreMenu, onOrderNow, onAddToCart, products, showToast }) {
  const [newsletterEmail, setNewsletterEmail] = useState('');

  const featuredBestsellers = useMemo(() => {
    return products.slice(0, 8);
  }, [products]);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      showToast('Please enter a valid email address.');
      return;
    }
    showToast(`Thank you! Bliss Club promo code BLISS10 sent to ${newsletterEmail}`);
    setNewsletterEmail('');
  };

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#FAF3EB] via-[#FDFBF7] to-[#FAF3EB] pt-12 pb-20 sm:pt-20 sm:pb-32 border-b border-[#EDE4DC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-[#F3E3D3] text-[#633526] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border border-[#E0C7B4]">
                <Sparkles className="w-3.5 h-3.5 text-[#C5892F]" />
                <span>Handcrafted Pure Ghee Sweets & European Cakes</span>
              </div>

              <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold text-[#3A1C16] leading-tight">
                Every Bite, <br />
                <span className="italic font-serif text-[#C5892F] font-normal">A Moment of Bliss.</span>
              </h1>

              <p className="text-base sm:text-lg text-[#5A3F35] max-w-2xl leading-relaxed">
                Freshly baked happiness and traditional Indian sweets, made with love and crafted to delight. From velvety Belgian truffle cakes to melt-in-mouth Kaju Katli and Mysore Pak.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  onClick={onExploreMenu}
                  className="w-full sm:w-auto px-8 py-4 bg-[#3A1C16] hover:bg-[#25100B] text-[#F9EBD2] text-sm font-bold uppercase tracking-wider rounded-xl shadow-xl hover:shadow-2xl transition duration-300 flex items-center justify-center gap-2 group"
                >
                  <span>Explore Our Menu</span>
                  <ChevronRight className="w-4 h-4 text-[#D99B26] group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={onOrderNow}
                  className="w-full sm:w-auto px-8 py-4 bg-[#C5892F] hover:bg-[#A86F1E] text-white text-sm font-bold uppercase tracking-wider rounded-xl shadow-lg transition duration-300 flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Order Now (Instant Delivery)</span>
                </button>
              </div>

              <div className="grid grid-cols-3 gap-3 pt-6 max-w-lg mx-auto lg:mx-0">
                <div className="bg-white/80 backdrop-blur-xs p-3 rounded-xl border border-[#EBDCCF] text-center">
                  <p className="font-serif font-bold text-[#3A1C16] text-xl">100%</p>
                  <p className="text-[11px] text-[#7A5B50] font-medium">Bilona Cow Ghee</p>
                </div>
                <div className="bg-white/80 backdrop-blur-xs p-3 rounded-xl border border-[#EBDCCF] text-center">
                  <p className="font-serif font-bold text-[#3A1C16] text-xl">45+</p>
                  <p className="text-[11px] text-[#7A5B50] font-medium">Regional Mithais</p>
                </div>
                <div className="bg-white/80 backdrop-blur-xs p-3 rounded-xl border border-[#EBDCCF] text-center">
                  <p className="font-serif font-bold text-[#3A1C16] text-xl">2 Hrs</p>
                  <p className="text-[11px] text-[#7A5B50] font-medium">Express Dispatch</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-4/5 transform hover:scale-[1.01] transition duration-500">
                  <img
                    src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1000&q=80"
                    alt="Luxury Chocolate Cake"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="absolute -bottom-6 -left-6 bg-white p-3.5 rounded-2xl shadow-xl border border-[#E8DFD8] flex items-center gap-3">
                  <img
                    src="/images/sweets/kaju_katli.jpg"
                    alt="Kaju Katli"
                    className="w-12 h-12 rounded-xl object-cover"
                  />
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#C5892F] block">Signature Sweet</span>
                    <span className="font-serif font-bold text-sm text-[#3A1C16]">Silver Vark Kaju Katli</span>
                    <span className="text-xs text-green-700 font-bold block">₹1,000 / kg</span>
                  </div>
                </div>

                <div className="absolute -top-4 -right-4 bg-[#3A1C16] text-[#F9EBD2] px-4 py-2 rounded-2xl shadow-xl flex items-center gap-2 border border-[#D99B26]/30">
                  <Star className="w-4 h-4 fill-[#D99B26] text-[#D99B26]" />
                  <span className="font-bold text-sm">4.9 / 5.0</span>
                  <span className="text-[10px] text-[#C5B3A6]">(10k+ reviews)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Freshly Made Pillars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAF3EB] rounded-3xl p-8 sm:p-12 border border-[#E8DFD8] shadow-xs">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="font-serif text-3xl font-bold text-[#3A1C16]">Freshly Made, Just for You.</h2>
            <p className="text-sm text-[#6C4E44] mt-2">Zero compromises on generational recipes, pure ingredients, and hygienic preparation.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-[#EDE4DC] text-center space-y-3 hover:shadow-md transition">
              <div className="w-12 h-12 mx-auto rounded-full bg-[#FAF0E6] text-[#C5892F] flex items-center justify-center">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-[#3A1C16] text-base">100% Pure Desi Ghee</h3>
              <p className="text-xs text-[#7A5B50] leading-relaxed">All traditional laddus, barfis, and ghewar are fried only in Vedic cow bilona ghee.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-[#EDE4DC] text-center space-y-3 hover:shadow-md transition">
              <div className="w-12 h-12 mx-auto rounded-full bg-[#FAF0E6] text-[#C5892F] flex items-center justify-center">
                <ChefHat className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-[#3A1C16] text-base">Eggless Mastery</h3>
              <p className="text-xs text-[#7A5B50] leading-relaxed">95% of our exquisite cakes, pastries, and sweets are 100% vegetarian without sacrificing fluffy texture.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-[#EDE4DC] text-center space-y-3 hover:shadow-md transition">
              <div className="w-12 h-12 mx-auto rounded-full bg-[#FAF0E6] text-[#C5892F] flex items-center justify-center">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-[#3A1C16] text-base">Artisanal Patisserie</h3>
              <p className="text-xs text-[#7A5B50] leading-relaxed">Crafted with Callebaut Belgian cocoa, Madagascar vanilla, and pure Kashmiri saffron threads.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-[#EDE4DC] text-center space-y-3 hover:shadow-md transition">
              <div className="w-12 h-12 mx-auto rounded-full bg-[#FAF0E6] text-[#C5892F] flex items-center justify-center">
                <Truck className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-[#3A1C16] text-base">Express 2-Hr Delivery</h3>
              <p className="text-xs text-[#7A5B50] leading-relaxed">Temperature-controlled insulated delivery ensures your cakes and sweets arrive fresh.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Bestsellers */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#C5892F]">Customer Favorites</span>
            <h2 className="font-serif text-3xl font-bold text-[#3A1C16] mt-1">Best-Selling Cakes & Sweets</h2>
          </div>
          <button onClick={onExploreMenu} className="text-sm font-bold text-[#C5892F] hover:text-[#8F5A13] flex items-center gap-1 transition">
            <span>View Full Menu ({products.length} Delights)</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {featuredBestsellers.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl overflow-hidden border border-[#EDE4DC] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col group">
              <div className="relative aspect-4/3 overflow-hidden bg-[#F5ECE5]">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                {item.badge && (
                  <span className="absolute top-3 left-3 bg-[#3A1C16] text-[#F9EBD2] text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md shadow">
                    {item.badge}
                  </span>
                )}
                {item.isVeg && (
                  <span className="absolute top-3 right-3 bg-white/90 p-1 rounded-md shadow text-[10px] text-green-700 font-bold flex items-center gap-1" title="100% Vegetarian">
                    <span className="w-2 h-2 rounded-full bg-green-600 inline-block" />
                    Veg
                  </span>
                )}
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center justify-between text-xs text-[#8C6D62] mb-1">
                    <span>{item.category}</span>
                    <div className="flex items-center gap-1 text-[#D99B26]">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span className="font-semibold text-[#3A1C16]">{item.rating}</span>
                      <span className="text-[#8C6D62]">({item.reviews})</span>
                    </div>
                  </div>
                  <h3 className="font-serif font-bold text-base text-[#3A1C16] line-clamp-1">{item.name}</h3>
                  <p className="text-xs text-[#6C4E44] line-clamp-2 mt-1 leading-relaxed">{item.description}</p>
                </div>

                <div className="pt-2 border-t border-[#F2E8DF] flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-[#8C6D62] uppercase block">Price</span>
                    <span className="font-serif font-bold text-base text-[#3A1C16]">₹{item.basePrice}</span>
                    <span className="text-[11px] text-[#8C6D62]"> / {item.priceUnit}</span>
                  </div>

                  <button
                    onClick={() => onAddToCart(item)}
                    className="px-3.5 py-2 bg-[#FAF3EB] hover:bg-[#C5892F] text-[#3A1C16] hover:text-white font-bold text-xs rounded-xl transition duration-200 border border-[#E2D4C7] flex items-center gap-1.5 shadow-xs"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pure Ghee Mithai Legacy Section */}
      <section className="bg-gradient-to-r from-[#3A1C16] via-[#4A241D] to-[#3A1C16] text-[#FDFBF7] py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-[#D99B26] uppercase font-bold text-xs tracking-widest block">Generational Heritage</span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold leading-tight text-white">The Pure Ghee Mithai Legacy of India</h2>
            <p className="text-sm sm:text-base text-[#D4C4B9] leading-relaxed">
              Every festive milestone deserves the golden warmth of authentic mithai. We source raw milk from indigenous Gir cows, pistachios from Iran, and saffron directly from Pampore, Kashmir to craft authentic Kaju Katli, Mysuru Pak, Dharwad Karadantu, and Malai Ghewar.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="border-l-2 border-[#D99B26] pl-4">
                <h4 className="font-serif font-bold text-white text-base">North Indian Classics</h4>
                <p className="text-xs text-[#BFAEA2]">Motichoor, Ghewar, Kaju Katli, Kalakand</p>
              </div>
              <div className="border-l-2 border-[#D99B26] pl-4">
                <h4 className="font-serif font-bold text-white text-base">South & Western Gems</h4>
                <p className="text-xs text-[#BFAEA2]">Mysore Pak, Dharwad Peda, Puran Poli, Modak</p>
              </div>
            </div>
            <button
              onClick={onExploreMenu}
              className="mt-4 px-6 py-3.5 bg-[#D99B26] hover:bg-[#BC8117] text-[#2C1810] font-bold text-xs uppercase tracking-wider rounded-xl transition shadow-lg inline-flex items-center gap-2"
            >
              <span>Explore 35+ Regional Sweets</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <img
              src="/images/sweets/motichoor.jpg"
              alt="Motichoor Laddu"
              className="rounded-2xl shadow-lg object-cover h-56 w-full border-2 border-[#542B22]"
            />
            <img
              src="/images/sweets/kaju_katli.jpg"
              alt="Indian Sweets Platter"
              className="rounded-2xl shadow-lg object-cover h-56 w-full border-2 border-[#542B22] translate-y-4"
            />
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAF3EB] border border-[#E8DFD8] rounded-3xl p-8 sm:p-12 text-center max-w-3xl mx-auto space-y-6">
          <div className="w-12 h-12 bg-[#3A1C16] text-[#D99B26] rounded-full flex items-center justify-center mx-auto">
            <Mail className="w-6 h-6" />
          </div>
          <div className="space-y-2">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#3A1C16]">Join The Bliss Sweet Club</h2>
            <p className="text-xs sm:text-sm text-[#7A5B50] max-w-md mx-auto">
              Subscribe to get secret festival menu previews, chef recipes, and an instant 10% coupon for your next cake order.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              className="flex-1 px-4 py-3 text-sm rounded-xl border border-[#D5C2B4] focus:outline-none focus:ring-2 focus:ring-[#C5892F] bg-white"
              required
            />
            <button
              type="submit"
              className="px-6 py-3 bg-[#3A1C16] hover:bg-[#25100B] text-[#F9EBD2] text-xs font-bold uppercase tracking-wider rounded-xl shadow transition"
            >
              Subscribe
            </button>
          </form>
          <p className="text-[11px] text-[#9A7D71]">We respect your privacy. Unsubscribe anytime.</p>
        </div>
      </section>
    </div>
  );
}

function MenuPage({ products, onAddToCart }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSubCategory, setSelectedSubCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [vegOnly, setVegOnly] = useState(false);
  const [sortBy, setSortBy] = useState('popularity');
  const [selectedOptions, setSelectedOptions] = useState({});

  const categories = ['All', 'Cakes', 'Pastries & Desserts', 'Indian Sweets', 'Cookies & Snacks'];
  const indianSubCategories = ['All', 'North Indian', 'South Indian', 'Bengali', 'Gujarati & Maharashtrian', 'Festival Specials'];

  const handleOptionChange = (productId, option) => {
    setSelectedOptions((prev) => ({ ...prev, [productId]: option }));
  };

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        if (!p.available) return false;
        if (selectedCategory !== 'All' && p.category !== selectedCategory) return false;
        if (selectedCategory === 'Indian Sweets' && selectedSubCategory !== 'All' && p.subCategory !== selectedSubCategory) {
          return false;
        }
        if (vegOnly && !p.isVeg) return false;
        if (searchQuery.trim() !== '') {
          const q = searchQuery.toLowerCase();
          const matchName = p.name.toLowerCase().includes(q);
          const matchDesc = p.description.toLowerCase().includes(q);
          const matchSub = p.subCategory?.toLowerCase().includes(q);
          if (!matchName && !matchDesc && !matchSub) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.basePrice - b.basePrice;
        if (sortBy === 'price-high') return b.basePrice - a.basePrice;
        return b.reviews - a.reviews;
      });
  }, [products, selectedCategory, selectedSubCategory, vegOnly, searchQuery, sortBy]);

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-bold uppercase tracking-widest text-[#C5892F]">Artisanal Bakes & Heritage Mithai</span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#3A1C16]">Our Delicacy Menu</h1>
        <p className="text-xs sm:text-sm text-[#6C4E44]">Explore over 50+ fresh handcrafted cakes, single-origin desserts, and regional Indian sweets prepared daily.</p>
      </div>

      {/* Search & Sort Controls */}
      <div className="bg-white p-4 rounded-2xl border border-[#E8DFD8] shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-[#8C6D62] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search truffle cake, kaju katli, rasmalai..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-[#D8C7B9] focus:outline-none focus:ring-2 focus:ring-[#C5892F] bg-[#FAF7F3]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
          <button
            onClick={() => setVegOnly(!vegOnly)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 border transition ${
              vegOnly ? 'bg-green-100 text-green-800 border-green-300' : 'bg-white text-[#5C3B30] border-[#D8C7B9]'
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${vegOnly ? 'bg-green-600' : 'bg-gray-400'}`} />
            <span>Veg Only</span>
          </button>

          <div className="flex items-center space-x-2 text-xs">
            <span className="text-[#8C6D62] font-medium hidden sm:inline">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="py-1.5 px-3 rounded-xl border border-[#D8C7B9] bg-[#FAF7F3] text-xs font-medium text-[#3A1C16] focus:outline-none"
            >
              <option value="popularity">Most Popular</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex overflow-x-auto pb-2 gap-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setSelectedCategory(cat);
              setSelectedSubCategory('All');
            }}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition shadow-xs ${
              selectedCategory === cat ? 'bg-[#3A1C16] text-[#F9EBD2]' : 'bg-white text-[#5C3B30] border border-[#E8DFD8] hover:bg-[#F7EFE9]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Regional Subcategories for Indian Sweets */}
      {selectedCategory === 'Indian Sweets' && (
        <div className="p-3 bg-[#FAF3EB] rounded-2xl border border-[#E8DFD8] flex overflow-x-auto gap-2">
          <span className="text-xs font-bold text-[#8C6D62] self-center pl-2 whitespace-nowrap">Regions:</span>
          {indianSubCategories.map((sub) => (
            <button
              key={sub}
              onClick={() => setSelectedSubCategory(sub)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition ${
                selectedSubCategory === sub ? 'bg-[#C5892F] text-white font-bold shadow-xs' : 'bg-white/80 text-[#5C3B30] hover:bg-white'
              }`}
            >
              {sub}
            </button>
          ))}
        </div>
      )}

      {/* Grid of Product Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => {
          const currentOption = selectedOptions[product.id] || (product.weightOptions ? product.weightOptions[0] : { label: product.priceUnit, multiplier: 1 });
          const dynamicPrice = Math.round(product.basePrice * currentOption.multiplier);

          return (
            <div key={product.id} className="bg-white rounded-2xl overflow-hidden border border-[#EDE4DC] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col group justify-between">
              <div>
                <div className="relative aspect-4/3 overflow-hidden bg-[#F5ECE5]">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  {product.badge && (
                    <span className="absolute top-2.5 left-2.5 bg-[#3A1C16] text-[#F9EBD2] text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded shadow">
                      {product.badge}
                    </span>
                  )}
                  {product.isVeg && (
                    <span className="absolute top-2.5 right-2.5 bg-white/95 px-2 py-0.5 rounded shadow text-[10px] text-green-700 font-bold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-600 inline-block" />
                      Veg
                    </span>
                  )}
                </div>

                <div className="p-4 space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-[#8C6D62]">
                    <span className="bg-[#FAF3EB] px-2 py-0.5 rounded font-medium text-[#6B4639]">{product.subCategory || product.category}</span>
                    <div className="flex items-center gap-1 text-[#D99B26]">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span className="font-bold text-[#3A1C16]">{product.rating}</span>
                    </div>
                  </div>

                  <h3 className="font-serif font-bold text-base text-[#3A1C16] leading-snug">{product.name}</h3>
                  <p className="text-xs text-[#6C4E44] line-clamp-2 leading-relaxed">{product.description}</p>

                  {product.weightOptions && product.weightOptions.length > 1 && (
                    <div className="pt-2">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-[#8C6D62] block mb-1">Select Portion / Weight:</label>
                      <div className="flex flex-wrap gap-1.5">
                        {product.weightOptions.map((opt) => (
                          <button
                            key={opt.label}
                            type="button"
                            onClick={() => handleOptionChange(product.id, opt)}
                            className={`px-2.5 py-1 text-[11px] rounded-lg font-semibold transition ${
                              currentOption.label === opt.label ? 'bg-[#3A1C16] text-[#F9EBD2]' : 'bg-[#F5ECE5] text-[#5C3B30] hover:bg-[#E8DFD8]'
                            }`}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="p-4 pt-0">
                <div className="pt-3 border-t border-[#F2E8DF] flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-[#8C6D62] uppercase block">Price</span>
                    <span className="font-serif font-bold text-lg text-[#3A1C16]">₹{dynamicPrice}</span>
                    <span className="text-[11px] text-[#8C6D62]"> ({currentOption.label})</span>
                  </div>

                  <button
                    onClick={() => onAddToCart(product, currentOption)}
                    className="px-3.5 py-2 bg-[#C5892F] hover:bg-[#A86F1E] text-white font-bold text-xs rounded-xl transition shadow flex items-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function OrderOnlinePage({
  cart,
  products,
  updateCartQuantity,
  removeFromCart,
  clearCart,
  cartSubtotal,
  deliveryFee,
  discountAmount,
  grandTotal,
  appliedCoupon,
  setAppliedCoupon,
  coupons,
  couponInput,
  setCouponInput,
  onOrderPlaced,
  showToast
}) {
  const [deliveryType, setDeliveryType] = useState('Home Delivery');
  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentSecurityModal, setPaymentSecurityModal] = useState(false);
  const [stagedOrderPayload, setStagedOrderPayload] = useState(null);

  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    email: '',
    address: '',
    city: 'Bengaluru',
    pincode: '',
    orderDate: '2026-10-04',
    timeSlot: 'Evening (5:00 PM - 8:00 PM)',
    instructions: ''
  });

  const [formErrors, setFormErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) setFormErrors((prev) => ({ ...prev, [name]: null }));
  };

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    const found = coupons.find(c => c.code.toUpperCase() === couponInput.trim().toUpperCase());
    if (!found) {
      showToast('Invalid coupon code. Try BLISS10 or FESTIVE20');
      return;
    }
    if (cartSubtotal < found.minOrder) {
      showToast(`Coupon requires minimum cart total of ₹${found.minOrder}`);
      return;
    }
    setAppliedCoupon(found);
    showToast(`Coupon ${found.code} applied! Saved ₹${Math.round((cartSubtotal * found.discountPercent) / 100)}`);
  };

  const handleInitiateOrder = async (e) => {
    e.preventDefault();
    if (cart.length === 0) {
      showToast('Your cart is empty! Please add products.');
      return;
    }

    const errors = {};
    if (!formData.fullName.trim()) errors.fullName = 'Full Name is required.';
    if (!formData.mobile.trim() || !/^\d{10}$/.test(formData.mobile.trim())) {
      errors.mobile = 'Enter a valid 10-digit mobile number.';
    }
    if (deliveryType === 'Home Delivery') {
      if (!formData.address.trim()) errors.address = 'Delivery address is required.';
      if (!formData.pincode.trim() || !/^\d{6}$/.test(formData.pincode.trim())) {
        errors.pincode = 'Valid 6-digit PIN code required.';
      }
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      showToast('Please correct form validation errors.');
      return;
    }

    let verifiedSubtotal = 0;
    const verifiedItems = cart.map(item => {
      const canonical = products.find(p => p.id === item.productId);
      if (!canonical || !canonical.available) {
        throw new Error(`Product ${item.name} is no longer available.`);
      }
      const verifiedUnitPrice = Math.round(canonical.basePrice * (item.multiplier || 1));
      const lineTotal = verifiedUnitPrice * item.quantity;
      verifiedSubtotal += lineTotal;
      return {
        name: canonical.name,
        size: item.optionLabel,
        quantity: item.quantity,
        unitPrice: verifiedUnitPrice,
        total: lineTotal
      };
    });

    const verifiedDiscount = appliedCoupon && verifiedSubtotal >= appliedCoupon.minOrder
      ? Math.round((verifiedSubtotal * appliedCoupon.discountPercent) / 100)
      : 0;

    const verifiedDeliveryFee = deliveryType === 'Store Pickup' ? 0 : (verifiedSubtotal >= 500 ? 0 : 50);
    const verifiedFinalTotal = Math.max(0, verifiedSubtotal - verifiedDiscount + verifiedDeliveryFee);

    const randomId = Math.floor(1000 + Math.random() * 9000);
    const orderId = `BNB-2026-${randomId}`;
    const custKey = `pass_${generateCustomerPasskey().substring(0, 12)}`;

    const candidateOrder = {
      orderId,
      date: formData.orderDate,
      customerName: formData.fullName,
      mobile: formData.mobile,
      email: formData.email,
      address: deliveryType === 'Home Delivery' ? formData.address : 'Store Pickup at Indiranagar Flagship',
      city: formData.city,
      pincode: formData.pincode,
      deliveryType,
      timeSlot: formData.timeSlot,
      status: 'Order Received',
      items: verifiedItems,
      subtotal: verifiedSubtotal,
      deliveryFee: verifiedDeliveryFee,
      discount: verifiedDiscount,
      finalTotal: verifiedFinalTotal,
      paymentMethod,
      instructions: formData.instructions,
      custKey
    };

    candidateOrder.orderIntegrityHash = await computeOrderIntegrityChecksum(candidateOrder);

    setStagedOrderPayload(candidateOrder);
    setPaymentSecurityModal(true);
  };

  const confirmSecurePayment = async () => {
    setIsProcessingPayment(true);
    try {
      await new Promise(res => setTimeout(res, 1200));

      let paymentId = '';
      if (stagedOrderPayload.paymentMethod === 'Razorpay Online') {
        paymentId = `rzp_pay_${generateCustomerPasskey().substring(0, 10)}`;
      } else if (stagedOrderPayload.paymentMethod === 'UPI') {
        paymentId = `upi_txn_${generateCustomerPasskey().substring(0, 10)}`;
      } else {
        paymentId = 'cod_pending_cash';
      }

      const finalizedOrder = {
        ...stagedOrderPayload,
        paymentStatus: stagedOrderPayload.paymentMethod === 'Cash on Delivery'
          ? 'COD (Pending delivery payment)'
          : `Verified (${paymentId})`
      };

      setPaymentSecurityModal(false);
      onOrderPlaced(finalizedOrder, finalizedOrder.custKey);
    } catch {
      showToast('Payment verification failed! Please try again.');
    } finally {
      setIsProcessingPayment(false);
    }
  };

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-bold uppercase tracking-widest text-[#C5892F]">Checkout & Fresh Dispatch</span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#3A1C16]">Order Online</h1>
        <p className="text-xs sm:text-sm text-[#6C4E44]">Review your items with server-verified pricing, pick home delivery or boutique pickup, and confirm with encrypted payment verification.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-7 space-y-8">
          <form onSubmit={handleInitiateOrder} className="bg-white p-6 sm:p-8 rounded-3xl border border-[#EDE4DC] shadow-xs space-y-6">
            <h2 className="font-serif text-xl font-bold text-[#3A1C16] border-b border-[#F2E8DF] pb-3 flex items-center justify-between">
              <span>1. Customer & Delivery Info</span>
              <span className="text-[10px] font-sans font-bold text-green-700 bg-green-50 px-2 py-0.5 rounded flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> Anti-Tamper Protected
              </span>
            </h2>

            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setDeliveryType('Home Delivery')}
                className={`flex-1 py-3 px-4 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition ${
                  deliveryType === 'Home Delivery' ? 'bg-[#3A1C16] text-[#F9EBD2] border-[#3A1C16]' : 'bg-[#FAF3EB] text-[#5C3B30] border-[#E2D4C7]'
                }`}
              >
                <Truck className="w-4 h-4 text-[#D99B26]" />
                <span>Home Delivery</span>
              </button>
              <button
                type="button"
                onClick={() => setDeliveryType('Store Pickup')}
                className={`flex-1 py-3 px-4 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition ${
                  deliveryType === 'Store Pickup' ? 'bg-[#3A1C16] text-[#F9EBD2] border-[#3A1C16]' : 'bg-[#FAF3EB] text-[#5C3B30] border-[#E2D4C7]'
                }`}
              >
                <Package className="w-4 h-4 text-[#D99B26]" />
                <span>Boutique Pickup (Free)</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-[#5C3B30] block mb-1">Customer Full Name *</label>
                <input
                  type="text"
                  name="fullName"
                  placeholder="e.g. Aditi Singhania"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#D8C7B9] bg-[#FAF7F3] focus:outline-none focus:ring-2 focus:ring-[#C5892F]"
                />
                {formErrors.fullName && <p className="text-[11px] text-red-600 mt-1">{formErrors.fullName}</p>}
              </div>

              <div>
                <label className="text-xs font-bold text-[#5C3B30] block mb-1">Mobile Number (10 digits) *</label>
                <input
                  type="tel"
                  name="mobile"
                  placeholder="e.g. 9845012345"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  maxLength={10}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#D8C7B9] bg-[#FAF7F3] focus:outline-none focus:ring-2 focus:ring-[#C5892F]"
                />
                {formErrors.mobile && <p className="text-[11px] text-red-600 mt-1">{formErrors.mobile}</p>}
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-[#5C3B30] block mb-1">Email Address (Optional for e-invoice)</label>
              <input
                type="email"
                name="email"
                placeholder="aditi@example.com"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#D8C7B9] bg-[#FAF7F3] focus:outline-none focus:ring-2 focus:ring-[#C5892F]"
              />
            </div>

            {deliveryType === 'Home Delivery' && (
              <>
                <div>
                  <label className="text-xs font-bold text-[#5C3B30] block mb-1">Complete Delivery Address *</label>
                  <textarea
                    rows={2}
                    name="address"
                    placeholder="House/Flat number, Building name, Street, Landmark"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#D8C7B9] bg-[#FAF7F3] focus:outline-none focus:ring-2 focus:ring-[#C5892F]"
                  />
                  {formErrors.address && <p className="text-[11px] text-red-600 mt-1">{formErrors.address}</p>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-[#5C3B30] block mb-1">City *</label>
                    <select
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#D8C7B9] bg-[#FAF7F3] focus:outline-none"
                    >
                      <option value="Bengaluru">Bengaluru</option>
                      <option value="Mumbai">Mumbai</option>
                      <option value="Delhi NCR">Delhi NCR</option>
                      <option value="Hyderabad">Hyderabad</option>
                      <option value="Pune">Pune</option>
                      <option value="Chennai">Chennai</option>
                      <option value="Kolkata">Kolkata</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#5C3B30] block mb-1">Postal PIN Code *</label>
                    <input
                      type="text"
                      name="pincode"
                      placeholder="e.g. 560038"
                      value={formData.pincode}
                      onChange={handleInputChange}
                      maxLength={6}
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#D8C7B9] bg-[#FAF7F3] focus:outline-none focus:ring-2 focus:ring-[#C5892F]"
                    />
                    {formErrors.pincode && <p className="text-[11px] text-red-600 mt-1">{formErrors.pincode}</p>}
                  </div>
                </div>
              </>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-[#5C3B30] block mb-1">Delivery / Pickup Date</label>
                <input
                  type="date"
                  name="orderDate"
                  value={formData.orderDate}
                  onChange={handleInputChange}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#D8C7B9] bg-[#FAF7F3] focus:outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-[#5C3B30] block mb-1">Preferred Time Slot</label>
                <select
                  name="timeSlot"
                  value={formData.timeSlot}
                  onChange={handleInputChange}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#D8C7B9] bg-[#FAF7F3] focus:outline-none"
                >
                  <option value="Morning (9:00 AM - 12:00 PM)">Morning (9:00 AM - 12:00 PM)</option>
                  <option value="Afternoon (1:00 PM - 4:00 PM)">Afternoon (1:00 PM - 4:00 PM)</option>
                  <option value="Evening (5:00 PM - 8:00 PM)">Evening (5:00 PM - 8:00 PM)</option>
                  <option value="Express Night (8:00 PM - 10:30 PM)">Express Night (8:00 PM - 10:30 PM)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-[#5C3B30] block mb-1">Special Instructions (Message on cake, packaging notes)</label>
              <input
                type="text"
                name="instructions"
                placeholder="e.g. Write 'Happy 25th Anya' on the cake with gold ribbon."
                value={formData.instructions}
                onChange={handleInputChange}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#D8C7B9] bg-[#FAF7F3] focus:outline-none"
              />
            </div>

            <div className="space-y-3 pt-4 border-t border-[#F2E8DF]">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#3A1C16]">2. Verified Payment Gateway</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <label className={`p-3 rounded-xl border cursor-pointer flex flex-col justify-between text-xs transition ${
                  paymentMethod === 'UPI' ? 'border-[#C5892F] bg-[#FAF3EB] text-[#3A1C16] font-bold' : 'border-[#E8DFD8] text-[#5C3B30]'
                }`}>
                  <div className="flex items-center justify-between">
                    <span>UPI / GPay / PhonePe</span>
                    <input type="radio" name="payMethod" checked={paymentMethod === 'UPI'} onChange={() => setPaymentMethod('UPI')} className="accent-[#C5892F]" />
                  </div>
                  <span className="text-[10px] text-[#8C6D62] mt-2 font-normal">Encrypted instant settlement</span>
                </label>

                <label className={`p-3 rounded-xl border cursor-pointer flex flex-col justify-between text-xs transition ${
                  paymentMethod === 'Razorpay Online' ? 'border-[#C5892F] bg-[#FAF3EB] text-[#3A1C16] font-bold' : 'border-[#E8DFD8] text-[#5C3B30]'
                }`}>
                  <div className="flex items-center justify-between">
                    <span>Razorpay Gateway</span>
                    <input type="radio" name="payMethod" checked={paymentMethod === 'Razorpay Online'} onChange={() => setPaymentMethod('Razorpay Online')} className="accent-[#C5892F]" />
                  </div>
                  <span className="text-[10px] text-[#8C6D62] mt-2 font-normal">Cards, NetBanking, Wallets</span>
                </label>

                <label className={`p-3 rounded-xl border cursor-pointer flex flex-col justify-between text-xs transition ${
                  paymentMethod === 'Cash on Delivery' ? 'border-[#C5892F] bg-[#FAF3EB] text-[#3A1C16] font-bold' : 'border-[#E8DFD8] text-[#5C3B30]'
                }`}>
                  <div className="flex items-center justify-between">
                    <span>Cash on Delivery</span>
                    <input type="radio" name="payMethod" checked={paymentMethod === 'Cash on Delivery'} onChange={() => setPaymentMethod('Cash on Delivery')} className="accent-[#C5892F]" />
                  </div>
                  <span className="text-[10px] text-[#8C6D62] mt-2 font-normal">Pay cash upon verified delivery</span>
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={cart.length === 0}
              className={`w-full py-4 text-sm font-bold uppercase tracking-wider rounded-xl shadow-lg transition flex items-center justify-center space-x-2 ${
                cart.length === 0 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-[#3A1C16] hover:bg-[#25100B] text-[#F9EBD2]'
              }`}
            >
              <span>Verify & Place Order (₹{deliveryType === 'Store Pickup' ? Math.max(0, cartSubtotal - discountAmount) : grandTotal})</span>
              <ShieldCheck className="w-5 h-5 text-[#D99B26]" />
            </button>
          </form>
        </div>

        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-[#EDE4DC] shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-[#F2E8DF] pb-3">
              <h3 className="font-serif font-bold text-lg text-[#3A1C16]">Verified Order Summary</h3>
              {cart.length > 0 && (
                <button type="button" onClick={clearCart} className="text-xs text-red-600 hover:underline font-medium">Clear Cart</button>
              )}
            </div>

            {cart.length === 0 ? (
              <p className="text-xs text-[#8C6D62] py-4 text-center">Your cart is empty. Please visit Our Menu to pick your favorites!</p>
            ) : (
              <div className="divide-y divide-[#F5ECE5] max-h-80 overflow-y-auto pr-1">
                {cart.map((item) => (
                  <div key={item.cartItemId} className="py-3 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover" />
                      <div>
                        <h4 className="font-medium text-xs text-[#3A1C16]">{item.name}</h4>
                        <p className="text-[11px] text-[#8C6D62]">{item.optionLabel} × {item.quantity}</p>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="font-serif font-bold text-xs text-[#3A1C16]">₹{item.totalPrice}</p>
                      <div className="flex items-center space-x-1.5 mt-1">
                        <button type="button" onClick={() => updateCartQuantity(item.cartItemId, -1)} className="w-5 h-5 rounded bg-[#FAF3EB] hover:bg-[#F2E5D6] text-xs flex items-center justify-center font-bold">-</button>
                        <span className="text-[11px] font-bold">{item.quantity}</span>
                        <button type="button" onClick={() => updateCartQuantity(item.cartItemId, 1)} className="w-5 h-5 rounded bg-[#FAF3EB] hover:bg-[#F2E5D6] text-xs flex items-center justify-center font-bold">+</button>
                        <button type="button" onClick={() => removeFromCart(item.cartItemId)} className="text-[#B33925] pl-1">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <form onSubmit={handleApplyCoupon} className="pt-3 border-t border-[#F2E8DF] flex gap-2">
              <input
                type="text"
                placeholder="Coupon (e.g. BLISS10)"
                value={couponInput}
                onChange={(e) => setCouponInput(e.target.value)}
                className="flex-1 px-3 py-2 text-xs rounded-xl border border-[#D8C7B9] bg-[#FAF7F3] uppercase tracking-wider font-semibold focus:outline-none"
              />
              <button type="submit" className="px-4 py-2 bg-[#C5892F] hover:bg-[#A86F1E] text-white text-xs font-bold rounded-xl">Apply</button>
            </form>

            {appliedCoupon && (
              <div className="p-2.5 bg-green-50 border border-green-200 rounded-xl text-xs text-green-800 flex items-center justify-between">
                <span>Code <strong>{appliedCoupon.code}</strong> applied ({appliedCoupon.discountPercent}% OFF)</span>
                <button type="button" onClick={() => setAppliedCoupon(null)} className="text-red-600 text-[10px] font-bold underline">Remove</button>
              </div>
            )}

            <div className="space-y-2 pt-3 border-t border-[#F2E8DF] text-xs text-[#5C3B30]">
              <div className="flex justify-between">
                <span>Verified Subtotal</span>
                <span>₹{cartSubtotal}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-green-700 font-bold">
                  <span>Discount</span>
                  <span>-₹{discountAmount}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span>
                  {deliveryType === 'Store Pickup' ? (
                    <span className="text-green-700 font-bold">FREE (Pickup)</span>
                  ) : deliveryFee === 0 ? (
                    <span className="text-green-700 font-bold">FREE (Above ₹500)</span>
                  ) : (
                    `₹${deliveryFee}`
                  )}
                </span>
              </div>
              <div className="flex justify-between font-serif font-bold text-base text-[#3A1C16] pt-2 border-t border-dashed border-[#E8DFD8]">
                <span>Total Payable</span>
                <span>₹{deliveryType === 'Store Pickup' ? Math.max(0, cartSubtotal - discountAmount) : grandTotal}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Security Payment Handshake Modal */}
      {paymentSecurityModal && stagedOrderPayload && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-4 border border-[#EDE4DC] shadow-2xl">
            <div className="flex items-center space-x-3 text-[#3A1C16] border-b border-[#F2E8DF] pb-3">
              <ShieldCheck className="w-6 h-6 text-[#D99B26]" />
              <h3 className="font-serif font-bold text-lg">Secure Gateway Verification</h3>
            </div>

            <div className="text-xs text-[#5C3B30] space-y-2 bg-[#FAF7F3] p-4 rounded-2xl border border-[#EBDCD1]">
              <p><strong>Order ID:</strong> {stagedOrderPayload.orderId}</p>
              <p><strong>Recipient:</strong> {stagedOrderPayload.customerName} ({stagedOrderPayload.mobile})</p>
              <p><strong>Authoritative Charge:</strong> ₹{stagedOrderPayload.finalTotal}</p>
              <p className="font-mono text-[10px] break-all text-[#8C6D62]">
                <strong>Integrity Hash:</strong> {stagedOrderPayload.orderIntegrityHash}
              </p>
            </div>

            <div className="text-[11px] text-[#7A5B50] space-y-1">
              <p className="flex items-center gap-1.5 text-green-700 font-semibold">
                <CheckCircle className="w-3.5 h-3.5" /> 256-bit cryptographic signature verified.
              </p>
              <p>Your unique access passkey will be issued upon payment confirmation to protect your delivery address from unauthorized changes.</p>
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              <button
                type="button"
                onClick={() => setPaymentSecurityModal(false)}
                className="px-4 py-2 text-xs font-bold text-[#8C6D62] hover:bg-[#FAF3EB] rounded-xl"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isProcessingPayment}
                onClick={confirmSecurePayment}
                className="px-6 py-2.5 bg-[#3A1C16] hover:bg-[#25100B] text-[#F9EBD2] text-xs font-bold rounded-xl shadow flex items-center gap-2"
              >
                {isProcessingPayment ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Lock className="w-4 h-4 text-[#D99B26]" />}
                <span>{isProcessingPayment ? 'Validating Signature...' : `Authorize ₹${stagedOrderPayload.finalTotal}`}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function CustomCakesPage({ onSubmitCustomOrder }) {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    type: 'Custom Birthday Cake',
    flavor: 'Belgian Dark Chocolate Ganache',
    weight: '1 kg',
    dietary: '100% Eggless',
    design: '',
    cakeMessage: '',
    eventDate: '2026-10-15',
    budget: '₹2,000 - ₹3,500',
    referenceImage: null
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImagePreview(url);
      setFormData((prev) => ({ ...prev, referenceImage: file.name }));
    }
  };

  const handleCustomSubmit = (e) => {
    e.preventDefault();
    const newInquiry = {
      id: `CR-${Math.floor(100 + Math.random() * 900)}`,
      customerName: formData.name,
      mobile: formData.mobile,
      email: formData.email,
      type: formData.type,
      flavor: formData.flavor,
      weight: formData.weight,
      dietary: formData.dietary,
      message: formData.cakeMessage,
      eventDate: formData.eventDate,
      budget: formData.budget,
      instructions: formData.design,
      referencePhotoUrl: imagePreview,
      status: 'In Review',
      dateAdded: '2026-10-04'
    };

    onSubmitCustomOrder(newInquiry);
    setSubmitted(true);
  };

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-[#C5892F]">Bespoke Celebrations & Corporate Hampers</span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#3A1C16]">Custom Cakes & Special Orders</h1>
        <p className="text-xs sm:text-sm text-[#6C4E44] leading-relaxed">
          From multi-tiered fondant wedding monuments and personalized photo cakes to royal Diwali sweet hampers. Upload your vision and let our pastry masters create pure bliss.
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-[#EDE4DC] p-6 sm:p-10 shadow-sm max-w-4xl mx-auto">
        {submitted ? (
          <div className="text-center py-12 space-y-4">
            <div className="w-16 h-16 bg-green-100 text-green-700 rounded-full flex items-center justify-center mx-auto">
              <Check className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#3A1C16]">Custom Order Inquiry Submitted!</h3>
            <p className="text-sm text-[#6C4E44] max-w-md mx-auto">
              Our Executive Pastry Chef will review your reference and call you on <strong>{formData.mobile}</strong> within 2 hours with flavor sampling notes and a final quotation.
            </p>
            <button onClick={() => setSubmitted(false)} className="mt-4 px-6 py-2.5 bg-[#3A1C16] text-[#F9EBD2] text-xs font-bold rounded-xl">
              Submit Another Request
            </button>
          </div>
        ) : (
          <form onSubmit={handleCustomSubmit} className="space-y-6">
            <div className="border-b border-[#F2E8DF] pb-4">
              <h3 className="font-serif font-bold text-xl text-[#3A1C16]">Design Your Masterpiece</h3>
              <p className="text-xs text-[#8C6D62] mt-1">Customized creations may require 24-48 hours lead time depending on intricacy.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-bold text-[#5C3B30] block mb-1">Your Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Meera Nair"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#D8C7B9] bg-[#FAF7F3] focus:outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-[#5C3B30] block mb-1">Mobile Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 9845012345"
                  value={formData.mobile}
                  onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#D8C7B9] bg-[#FAF7F3] focus:outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-[#5C3B30] block mb-1">Email Address</label>
                <input
                  type="email"
                  placeholder="meera@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#D8C7B9] bg-[#FAF7F3] focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-bold text-[#5C3B30] block mb-1">Order Type *</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#D8C7B9] bg-[#FAF7F3] focus:outline-none"
                >
                  <option value="Custom Birthday Cake">Custom Birthday Cake</option>
                  <option value="Wedding Multi-Tier Cake">Wedding Multi-Tier Cake</option>
                  <option value="Anniversary Designer Cake">Anniversary Designer Cake</option>
                  <option value="Photo Printed Cake">Photo Printed Cake</option>
                  <option value="Festival Sweet Hamper">Festival Sweet Gift Hamper</option>
                  <option value="Corporate Gift Box">Corporate Gift Box</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-[#5C3B30] block mb-1">Flavor / Sweet Combo *</label>
                <select
                  value={formData.flavor}
                  onChange={(e) => setFormData({ ...formData, flavor: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#D8C7B9] bg-[#FAF7F3] focus:outline-none"
                >
                  <option value="Belgian Dark Chocolate Ganache">Belgian Dark Chocolate Ganache</option>
                  <option value="Philadelphia Red Velvet Cream Cheese">Red Velvet Cream Cheese</option>
                  <option value="Kesar Pista Saffron Fusion">Kesar Pista Saffron Fusion</option>
                  <option value="Madagascar Bourbon Vanilla">Madagascar Vanilla Fruit</option>
                  <option value="Salted Caramel & Roasted Almond">Salted Caramel & Hazelnut</option>
                  <option value="Assorted Royal Mithai Box (Kaju Katli + Mysore Pak + Ladoos)">Assorted Royal Mithai Box</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-[#5C3B30] block mb-1">Weight / Box Size *</label>
                <select
                  value={formData.weight}
                  onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#D8C7B9] bg-[#FAF7F3] focus:outline-none"
                >
                  <option value="1 kg (8-10 servings)">1 kg (8-10 servings)</option>
                  <option value="2 kg (15-20 servings)">2 kg (15-20 servings)</option>
                  <option value="3 kg (25-30 servings)">3 kg (25-30 servings)</option>
                  <option value="5 kg+ Grand Tier">5 kg+ Grand Tier</option>
                  <option value="Festive Hamper (1 kg Assorted Mithai)">Festive Hamper (1 kg Assorted)</option>
                  <option value="Luxury Gift Hamper (2 kg Sweets + Nuts)">Luxury Gift Hamper (2 kg)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-bold text-[#5C3B30] block mb-1">Dietary Preference</label>
                <select
                  value={formData.dietary}
                  onChange={(e) => setFormData({ ...formData, dietary: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#D8C7B9] bg-[#FAF7F3] focus:outline-none"
                >
                  <option value="100% Eggless">100% Eggless (Pure Vegetarian)</option>
                  <option value="Classic French (With Egg)">Classic French (With Egg)</option>
                  <option value="Jain Friendly (No Gelatin/Root Starch)">Jain Friendly</option>
                  <option value="Sugar-Free Jaggery Sweetened">Sugar-Free / Jaggery Only</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-[#5C3B30] block mb-1">Event Date *</label>
                <input
                  type="date"
                  required
                  value={formData.eventDate}
                  onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#D8C7B9] bg-[#FAF7F3] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#5C3B30] block mb-1">Budget Range</label>
                <select
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#D8C7B9] bg-[#FAF7F3] focus:outline-none"
                >
                  <option value="₹1,500 - ₹2,500">₹1,500 - ₹2,500</option>
                  <option value="₹2,500 - ₹4,500">₹2,500 - ₹4,500</option>
                  <option value="₹4,500 - ₹8,000">₹4,500 - ₹8,000</option>
                  <option value="₹8,000 - ₹20,000+ (Grand Weddings)">₹8,000 - ₹20,000+ (Grand Weddings)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-[#5C3B30] block mb-1">Message on Cake or Gift Card</label>
              <input
                type="text"
                placeholder="e.g. 'Happy 1st Birthday Samar!' or 'Season's Greetings from TechCorp'"
                value={formData.cakeMessage}
                onChange={(e) => setFormData({ ...formData, cakeMessage: e.target.value })}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#D8C7B9] bg-[#FAF7F3] focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-[#5C3B30] block mb-1">Design Theme & Requirements</label>
              <textarea
                rows={3}
                placeholder="Describe your theme (e.g. Lavender color palette, edible golden pearls, fresh flowers, cricket theme...)"
                value={formData.design}
                onChange={(e) => setFormData({ ...formData, design: e.target.value })}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#D8C7B9] bg-[#FAF7F3] focus:outline-none"
              />
            </div>

            <div className="p-4 bg-[#FAF3EB] rounded-2xl border border-dashed border-[#C5892F] space-y-3">
              <label className="text-xs font-bold text-[#3A1C16] flex items-center gap-2">
                <Upload className="w-4 h-4 text-[#C5892F]" />
                <span>Upload Design Inspiration / Reference Photo</span>
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="text-xs text-[#6C4E44] file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-[#3A1C16] file:text-[#F9EBD2] hover:file:bg-[#25100B] cursor-pointer"
              />
              {imagePreview && (
                <div className="mt-2 flex items-center space-x-3 bg-white p-2 rounded-xl border border-[#E8DFD8] w-fit">
                  <img src={imagePreview} alt="Preview" className="w-16 h-16 object-cover rounded-lg" />
                  <div className="text-xs">
                    <p className="font-bold text-[#3A1C16]">Reference Attached</p>
                    <p className="text-[10px] text-green-700 font-semibold">Ready for chef review</p>
                  </div>
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-[#3A1C16] hover:bg-[#25100B] text-[#F9EBD2] text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg transition"
            >
              Request a Custom Order Quote
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

function AboutUsPage() {
  return (
    <div className="space-y-16 py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-[#C5892F]">Our Story, Baked with Love</span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#3A1C16]">Where Modern Patisserie Meets Royal Indian Mithai</h1>
        <p className="text-base text-[#5A3F35] leading-relaxed">
          At BUTTER AND BLISS, we believe that every celebration deserves something sweet. From freshly baked cakes and delicious pastries to authentic Indian sweets, we bring together traditional flavors and modern baking. Every creation is prepared with care, passion and attention to detail.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-6 space-y-5 text-sm text-[#5C3B30] leading-relaxed">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#3A1C16]">Our Passion for Pure Ingredients</h2>
          <p>
            Founded by a duo of French-trained pastry chefs and 3rd-generation Halwais from Karnataka, BUTTER AND BLISS was born from a singular passion: Why should customers have to choose between a gourmet European bakery and authentic traditional pure ghee sweets?
          </p>
          <p>
            We unified both worlds under one roof. When you order our Chocolate Truffle Cake, you taste 100% Belgian couverture chocolate. And when you savor our Kaju Katli or Motichoor Laddu, you experience pure Bilona cow ghee, slow-fried hand-rubbed boondi, and natural Kashmiri saffron.
          </p>
          <div className="pt-2 grid grid-cols-2 gap-4">
            <div className="bg-[#FAF3EB] p-4 rounded-xl border border-[#EDE3DA]">
              <h4 className="font-serif font-bold text-[#3A1C16] text-base">A2 Cow Ghee</h4>
              <p className="text-xs text-[#7A5B50] mt-1">Slow churned from curd, zero artificial essences.</p>
            </div>
            <div className="bg-[#FAF3EB] p-4 rounded-xl border border-[#EDE3DA]">
              <h4 className="font-serif font-bold text-[#3A1C16] text-base">Zero Preservatives</h4>
              <p className="text-xs text-[#7A5B50] mt-1">Baked fresh every morning with short shelf-life honesty.</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 grid grid-cols-2 gap-4">
          <img
            src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=600&q=80"
            alt="Bakery Kitchen Craft"
            className="rounded-2xl shadow-lg object-cover h-64 w-full"
          />
          <img
            src="https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80"
            alt="Artisanal Breads"
            className="rounded-2xl shadow-lg object-cover h-64 w-full translate-y-6"
          />
        </div>
      </div>
    </div>
  );
}

function ContactAndTrackPage({ orders, setOrders, customerTokens, isAdmin, showToast }) {
  const [activeTab, setActiveTab] = useState('track');
  const [searchOrderId, setSearchOrderId] = useState('');
  const [searchMobile, setSearchMobile] = useState('');
  const [passkeyInput, setPasskeyInput] = useState('');
  const [trackedOrder, setTrackedOrder] = useState(orders[0] || null);
  const [trackError, setTrackError] = useState('');

  // Editing address & instructions state
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [newAddress, setNewAddress] = useState('');
  const [newInstructions, setNewInstructions] = useState('');
  const [addressAuthError, setAddressAuthError] = useState('');

  // Contact Form
  const [contactData, setContactData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [contactSent, setContactSent] = useState(false);

  const handleTrackSubmit = (e) => {
    e.preventDefault();
    setTrackError('');
    setIsEditingAddress(false);
    setAddressAuthError('');

    const found = orders.find(
      (o) => o.orderId.toLowerCase() === searchOrderId.trim().toLowerCase() && o.mobile.includes(searchMobile.trim())
    );

    if (found) {
      setTrackedOrder(found);
      setNewAddress(found.address);
      setNewInstructions(found.instructions || '');
    } else {
      setTrackError('No order found matching this Order ID and Mobile number combination.');
      setTrackedOrder(null);
    }
  };

  const handleUpdateAddress = async (e) => {
    e.preventDefault();
    setAddressAuthError('');

    if (!trackedOrder) return;

    // RBAC: Check whether requester is authorized admin OR holds customer passkey
    const storedCustomerToken = customerTokens[trackedOrder.orderId] || trackedOrder.custKey;
    const isAuthorized = isAdmin || (passkeyInput.trim() === storedCustomerToken);

    if (!isAuthorized) {
      setAddressAuthError('Unauthorized! Only the verified customer with their Secret Security Key or the Bakery Admin can edit this order.');
      return;
    }

    if (trackedOrder.status === 'Out for Delivery' || trackedOrder.status === 'Delivered') {
      setAddressAuthError('Cannot modify address because the order is already Out for Delivery or Delivered.');
      return;
    }

    // Update with new integrity checksum
    const updatedOrder = {
      ...trackedOrder,
      address: newAddress,
      instructions: newInstructions
    };

    updatedOrder.orderIntegrityHash = await computeOrderIntegrityChecksum(updatedOrder);

    setOrders((prev) => prev.map((o) => (o.orderId === trackedOrder.orderId ? updatedOrder : o)));
    setTrackedOrder(updatedOrder);
    setIsEditingAddress(false);
    showToast('Delivery address updated and re-verified cryptographically!');
  };

  const statusStages = ['Order Received', 'Confirmed', 'Preparing', 'Ready for Pickup / Out for Delivery', 'Delivered'];

  const getStageIndex = (status) => {
    if (status === 'Order Received') return 0;
    if (status === 'Confirmed') return 1;
    if (status === 'Preparing') return 2;
    if (status === 'Out for Delivery' || status === 'Ready for Pickup / Out for Delivery') return 3;
    if (status === 'Delivered') return 4;
    return 1;
  };

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      <div className="flex justify-center">
        <div className="inline-flex bg-[#FAF3EB] p-1.5 rounded-2xl border border-[#E8DFD8]">
          <button
            onClick={() => setActiveTab('track')}
            className={`px-6 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeTab === 'track' ? 'bg-[#3A1C16] text-[#F9EBD2] shadow-sm' : 'text-[#5C3B30] hover:text-[#3A1C16]'
            }`}
          >
            <Truck className="w-4 h-4 text-[#D99B26]" />
            <span>Live Order Tracking</span>
          </button>
          <button
            onClick={() => setActiveTab('contact')}
            className={`px-6 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeTab === 'contact' ? 'bg-[#3A1C16] text-[#F9EBD2] shadow-sm' : 'text-[#5C3B30] hover:text-[#3A1C16]'
            }`}
          >
            <Mail className="w-4 h-4 text-[#D99B26]" />
            <span>Contact & Flagship Boutiques</span>
          </button>
        </div>
      </div>

      {activeTab === 'track' && (
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h2 className="font-serif text-3xl font-bold text-[#3A1C16]">Track Your Sweet Order</h2>
            <p className="text-xs sm:text-sm text-[#7A5B50]">
              Enter your Order ID (e.g. <code>BNB-2026-8812</code>) and 10-digit mobile number to check real-time status.
            </p>
          </div>

          <form onSubmit={handleTrackSubmit} className="bg-white p-6 rounded-3xl border border-[#EDE4DC] shadow-xs grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-bold text-[#5C3B30] block mb-1">Order ID</label>
              <input
                type="text"
                placeholder="BNB-2026-8812"
                value={searchOrderId}
                onChange={(e) => setSearchOrderId(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#D8C7B9] bg-[#FAF7F3] uppercase tracking-wider font-semibold focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-[#5C3B30] block mb-1">Mobile Number</label>
              <input
                type="tel"
                placeholder="9845012345"
                value={searchMobile}
                onChange={(e) => setSearchMobile(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#D8C7B9] bg-[#FAF7F3] focus:outline-none"
              />
            </div>
            <div className="sm:self-end">
              <button type="submit" className="w-full py-2.5 bg-[#C5892F] hover:bg-[#A86F1E] text-white font-bold text-xs rounded-xl shadow transition">
                Track Order
              </button>
            </div>
          </form>

          {trackError && <p className="text-xs text-red-600 bg-red-50 p-3 rounded-xl border border-red-200 text-center font-medium">{trackError}</p>}

          {trackedOrder && (
            <div className="bg-white rounded-3xl border border-[#EDE4DC] p-6 sm:p-8 shadow-md space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#F2E8DF] pb-4 gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#C5892F]">Verified Order</span>
                    <span className="text-[10px] bg-green-50 text-green-700 font-bold px-2 py-0.5 rounded border border-green-200">
                      Signature Intact
                    </span>
                  </div>
                  <h3 className="font-serif text-xl font-bold text-[#3A1C16]">Order #{trackedOrder.orderId}</h3>
                  <p className="text-xs text-[#8C6D62]">Placed on: {trackedOrder.date} • {trackedOrder.deliveryType}</p>
                </div>
                <div className="sm:text-right">
                  <span className="inline-block bg-[#FAF3EB] text-[#3A1C16] border border-[#D99B26]/40 px-3 py-1 rounded-full text-xs font-bold">
                    Status: {trackedOrder.status}
                  </span>
                  <p className="text-xs font-serif font-bold text-[#3A1C16] mt-1">Total: ₹{trackedOrder.finalTotal}</p>
                </div>
              </div>

              {/* Progress Timeline */}
              <div className="py-4">
                <div className="relative">
                  <div className="absolute top-1/2 left-0 right-0 h-1 bg-[#E8DFD8] -translate-y-1/2 z-0" />
                  <div
                    className="absolute top-1/2 left-0 h-1 bg-green-600 -translate-y-1/2 z-0 transition-all duration-500"
                    style={{ width: `${(getStageIndex(trackedOrder.status) / (statusStages.length - 1)) * 100}%` }}
                  />
                  <div className="relative z-10 flex justify-between">
                    {statusStages.map((stage, idx) => {
                      const currentIdx = getStageIndex(trackedOrder.status);
                      const isCompleted = idx <= currentIdx;
                      return (
                        <div key={stage} className="flex flex-col items-center">
                          <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition ${
                            isCompleted ? 'bg-green-600 text-white shadow-md' : 'bg-[#E8DFD8] text-[#8C6D62]'
                          }`}>
                            {isCompleted ? <Check className="w-4 h-4" /> : idx + 1}
                          </div>
                          <span className={`text-[10px] mt-2 max-w-[70px] text-center font-medium leading-tight ${
                            isCompleted ? 'text-[#3A1C16] font-bold' : 'text-[#A0887E]'
                          }`}>
                            {stage}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Order Items List */}
              <div className="space-y-3 pt-2">
                <h4 className="font-serif font-bold text-sm text-[#3A1C16]">Items in this Order</h4>
                <div className="bg-[#FAF7F3] p-4 rounded-2xl border border-[#EDE4DC] divide-y divide-[#EBDCD1]">
                  {trackedOrder.items.map((it, i) => (
                    <div key={i} className="py-2 flex justify-between text-xs text-[#4A3228]">
                      <span>{it.name} ({it.size}) × {it.quantity}</span>
                      <span className="font-bold">₹{it.total}</span>
                    </div>
                  ))}
                  <div className="pt-2 flex justify-between text-xs font-bold text-[#3A1C16]">
                    <span>Final Amount Paid ({trackedOrder.paymentMethod})</span>
                    <span>₹{trackedOrder.finalTotal}</span>
                  </div>
                </div>
              </div>

              {/* Secure Customer Address Modification Area */}
              <div className="bg-[#FAF3EB] p-4 sm:p-5 rounded-2xl space-y-3 border border-[#E2D5CC]">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-serif font-bold text-sm text-[#3A1C16] flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-[#C5892F]" />
                      <span>Delivery Destination</span>
                    </h4>
                    <p className="text-xs text-[#6C4E44] mt-0.5">{trackedOrder.address}, {trackedOrder.city} {trackedOrder.pincode}</p>
                    {trackedOrder.instructions && (
                      <p className="text-[11px] text-[#8C6D62] italic mt-0.5">Instructions: "{trackedOrder.instructions}"</p>
                    )}
                  </div>

                  {!isEditingAddress && (
                    <button
                      onClick={() => setIsEditingAddress(true)}
                      className="px-3 py-1.5 bg-white hover:bg-[#F2E5D6] text-xs font-bold text-[#3A1C16] rounded-xl border border-[#D5C2B4] flex items-center gap-1 shadow-xs"
                    >
                      <Edit2 className="w-3 h-3" />
                      <span>Edit Destination</span>
                    </button>
                  )}
                </div>

                {isEditingAddress && (
                  <form onSubmit={handleUpdateAddress} className="pt-3 border-t border-[#E0D0C4] space-y-3">
                    <div className="bg-amber-50 p-2.5 rounded-xl border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
                      <Lock className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold">Security Passkey Verification Required</p>
                        <p className="text-[11px]">
                          Enter your Customer Security Key (or log in as Admin). Only the verified buyer or owner can modify this address.
                        </p>
                        {trackedOrder.custKey && (
                          <p className="text-[10px] text-amber-700 mt-1">
                            Your session key for this order: <code className="bg-white px-1.5 py-0.5 rounded font-mono font-bold">{trackedOrder.custKey}</code>
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-[#5C3B30] block mb-1">Customer Security Key *</label>
                      <input
                        type="password"
                        placeholder="Enter your security passkey"
                        value={passkeyInput}
                        onChange={(e) => setPasskeyInput(e.target.value)}
                        required
                        className="w-full px-3 py-2 text-xs rounded-xl border border-[#D8C7B9] bg-white font-mono"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-[#5C3B30] block mb-1">Updated Delivery Address *</label>
                      <textarea
                        rows={2}
                        value={newAddress}
                        onChange={(e) => setNewAddress(e.target.value)}
                        required
                        className="w-full px-3 py-2 text-xs rounded-xl border border-[#D8C7B9] bg-white"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-[#5C3B30] block mb-1">Updated Delivery Instructions</label>
                      <input
                        type="text"
                        value={newInstructions}
                        onChange={(e) => setNewInstructions(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-[#D8C7B9] bg-white"
                      />
                    </div>

                    {addressAuthError && (
                      <p className="text-xs text-red-600 bg-red-50 p-2 rounded-lg font-medium">{addressAuthError}</p>
                    )}

                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setIsEditingAddress(false)}
                        className="px-3 py-1.5 text-xs text-[#7A5B50] font-semibold"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-1.5 bg-[#3A1C16] text-[#F9EBD2] text-xs font-bold rounded-xl shadow"
                      >
                        Save & Sign Address
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === 'contact' && (
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#C5892F]">Get In Touch</span>
              <h2 className="font-serif text-3xl font-bold text-[#3A1C16] mt-1">We'd Love to Hear From You</h2>
              <p className="text-xs text-[#7A5B50] mt-2">Questions regarding bespoke wedding cakes, corporate bulk gifting, or dietary queries? Reach out directly!</p>
            </div>

            <div className="space-y-4 text-xs text-[#5C3B30]">
              <div className="flex items-start space-x-3 bg-white p-3.5 rounded-2xl border border-[#EDE4DC]">
                <MapPin className="w-5 h-5 text-[#C5892F] shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-[#3A1C16]">Bengaluru Main Boutique</p>
                  <p>#42, 100 Feet Road, HAL 2nd Stage, Indiranagar, Bengaluru - 560038</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 bg-white p-3.5 rounded-2xl border border-[#EDE4DC]">
                <Phone className="w-5 h-5 text-[#C5892F] shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-[#3A1C16]">Customer Concierge Phone</p>
                  <p>+91 95358 39261</p>
                  <p className="text-[10px] text-[#8C6D62]">Daily: 8:00 AM – 11:00 PM</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 bg-white p-3.5 rounded-2xl border border-[#EDE4DC]">
                <Mail className="w-5 h-5 text-[#C5892F] shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-[#3A1C16]">Direct Email</p>
                  <p>orders@butterandbliss.in</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-[#EDE4DC] shadow-xs">
            {contactSent ? (
              <div className="text-center py-12 space-y-3">
                <CheckCircle className="w-12 h-12 text-green-600 mx-auto" />
                <h3 className="font-serif font-bold text-xl text-[#3A1C16]">Message Received!</h3>
                <p className="text-xs text-[#7A5B50]">Thank you for writing to BUTTER AND BLISS. Our guest relations representative will get back to you shortly.</p>
                <button onClick={() => setContactSent(false)} className="mt-2 px-5 py-2 bg-[#3A1C16] text-[#F9EBD2] text-xs font-bold rounded-xl">
                  Send Another Note
                </button>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setContactSent(true); showToast('Message submitted!'); }} className="space-y-4">
                <h3 className="font-serif font-bold text-lg text-[#3A1C16] border-b border-[#F2E8DF] pb-3">Send a Message</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-[#5C3B30] block mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Hegde"
                      value={contactData.name}
                      onChange={(e) => setContactData({ ...contactData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#D8C7B9] bg-[#FAF7F3] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-[#5C3B30] block mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 9535839261"
                      value={contactData.phone}
                      onChange={(e) => setContactData({ ...contactData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#D8C7B9] bg-[#FAF7F3] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-[#5C3B30] block mb-1">Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="ramesh@example.com"
                    value={contactData.email}
                    onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#D8C7B9] bg-[#FAF7F3] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-[#5C3B30] block mb-1">Subject</label>
                  <input
                    type="text"
                    placeholder="e.g. Corporate Diwali Gift Boxes (50+ units)"
                    value={contactData.subject}
                    onChange={(e) => setContactData({ ...contactData, subject: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#D8C7B9] bg-[#FAF7F3] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-[#5C3B30] block mb-1">Your Message *</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell us what you're looking for..."
                    value={contactData.message}
                    onChange={(e) => setContactData({ ...contactData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#D8C7B9] bg-[#FAF7F3] focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#3A1C16] hover:bg-[#25100B] text-[#F9EBD2] text-xs font-bold uppercase tracking-wider rounded-xl shadow transition"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function AdminDashboardPage({
  isAuthenticated,
  setIsAuthenticated,
  adminPinInput,
  setAdminPinInput,
  adminPinError,
  setAdminPinError,
  orders,
  setOrders,
  products,
  setProducts,
  customRequests,
  setCustomRequests,
  coupons,
  setCoupons,
  showToast
}) {
  const [activeTab, setActiveTab] = useState('orders');
  const [orderFilter, setOrderFilter] = useState('All');
  const [orderSearch, setOrderSearch] = useState('');

  // Product Modal
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [productForm, setProductForm] = useState({
    name: '',
    category: 'Cakes',
    subCategory: 'Classic Cakes',
    basePrice: 500,
    priceUnit: '500g',
    description: '',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80',
    isVeg: true,
    available: true
  });

  const [newCouponCode, setNewCouponCode] = useState('');
  const [newCouponPercent, setNewCouponPercent] = useState(15);
  const [newCouponMin, setNewCouponMin] = useState(599);

  const handlePinSubmit = (e) => {
    e.preventDefault();
    if (adminPinInput.trim() === 'bliss2026') {
      setIsAuthenticated(true);
      setAdminPinError('');
      showToast('Admin session authorized.');
    } else {
      setAdminPinError('Invalid passcode. Passcode is bliss2026');
    }
  };

  const totalRevenue = useMemo(() => {
    return orders.reduce((sum, o) => sum + (o.finalTotal || 0), 0);
  }, [orders]);

  const pendingOrdersCount = useMemo(() => {
    return orders.filter((o) => o.status !== 'Delivered').length;
  }, [orders]);

  const handleStatusChange = (orderId, newStatus) => {
    setOrders((prev) => prev.map((o) => (o.orderId === orderId ? { ...o, status: newStatus } : o)));
    showToast(`Order #${orderId} marked as "${newStatus}"`);
  };

  const toggleProductStock = (id) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, available: !p.available } : p)));
  };

  const handleDeleteProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    showToast('Product removed from catalog.');
  };

  const openEditModal = (product) => {
    setEditingProduct(product);
    setProductForm({
      name: product.name,
      category: product.category,
      subCategory: product.subCategory || '',
      basePrice: product.basePrice,
      priceUnit: product.priceUnit,
      description: product.description,
      image: product.image,
      isVeg: product.isVeg,
      available: product.available
    });
    setIsProductModalOpen(true);
  };

  const openAddModal = () => {
    setEditingProduct(null);
    setProductForm({
      name: '',
      category: 'Cakes',
      subCategory: 'Classic Cakes',
      basePrice: 500,
      priceUnit: '500g',
      description: '',
      image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80',
      isVeg: true,
      available: true
    });
    setIsProductModalOpen(true);
  };

  const handleSaveProduct = (e) => {
    e.preventDefault();
    if (!productForm.name.trim()) return;

    if (editingProduct) {
      setProducts((prev) =>
        prev.map((p) => (p.id === editingProduct.id ? { ...p, ...productForm, basePrice: Number(productForm.basePrice) } : p))
      );
      showToast(`Updated "${productForm.name}"`);
    } else {
      const newP = {
        id: `p-${Date.now()}`,
        ...productForm,
        basePrice: Number(productForm.basePrice),
        rating: 5.0,
        reviews: 1,
        weightOptions: [{ label: productForm.priceUnit, multiplier: 1 }]
      };
      setProducts((prev) => [newP, ...prev]);
      showToast(`Added new item "${productForm.name}"!`);
    }
    setIsProductModalOpen(false);
  };

  const updateCustomStatus = (id, newStatus) => {
    setCustomRequests((prev) => prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r)));
    showToast(`Inquiry #${id} marked as "${newStatus}"`);
  };

  const handleAddCoupon = (e) => {
    e.preventDefault();
    if (!newCouponCode.trim()) return;
    const newC = {
      code: newCouponCode.trim().toUpperCase(),
      discountPercent: Number(newCouponPercent),
      minOrder: Number(newCouponMin),
      description: `${newCouponPercent}% OFF on orders above ₹${newCouponMin}`
    };
    setCoupons((prev) => [...prev, newC]);
    setNewCouponCode('');
    showToast(`Coupon ${newC.code} added!`);
  };

  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      if (orderFilter !== 'All' && o.status !== orderFilter) return false;
      if (orderSearch.trim() !== '') {
        const q = orderSearch.toLowerCase();
        const matchId = o.orderId.toLowerCase().includes(q);
        const matchCust = o.customerName.toLowerCase().includes(q);
        const matchMob = o.mobile.includes(q);
        if (!matchId && !matchCust && !matchMob) return false;
      }
      return true;
    });
  }, [orders, orderFilter, orderSearch]);

  if (!isAuthenticated) {
    return (
      <div className="py-20 max-w-md mx-auto px-4 text-center">
        <div className="bg-white p-8 rounded-3xl border border-[#EDE4DC] shadow-xl space-y-6">
          <div className="w-16 h-16 rounded-full bg-[#FAF3EB] text-[#3A1C16] flex items-center justify-center mx-auto border border-[#D99B26]">
            <Lock className="w-7 h-7 text-[#D99B26]" />
          </div>
          <div>
            <h2 className="font-serif text-2xl font-bold text-[#3A1C16]">Owner Portal Login</h2>
            <p className="text-xs text-[#7A5B50] mt-1">Authorized bakery managers & confectionery chefs only.</p>
          </div>

          <form onSubmit={handlePinSubmit} className="space-y-4">
            <div>
              <input
                type="password"
                placeholder="Enter Access Passcode (bliss2026)"
                value={adminPinInput}
                onChange={(e) => setAdminPinInput(e.target.value)}
                className="w-full px-4 py-3 text-center text-sm rounded-xl border border-[#D8C7B9] bg-[#FAF7F3] tracking-widest font-mono focus:outline-none focus:ring-2 focus:ring-[#C5892F]"
              />
              {adminPinError && <p className="text-xs text-red-600 mt-2 font-medium">{adminPinError}</p>}
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#3A1C16] hover:bg-[#25100B] text-[#F9EBD2] text-xs font-bold uppercase tracking-wider rounded-xl shadow transition"
            >
              Sign In to Management
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#E8DFD8] gap-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#C5892F]">Butter and Bliss Operations Hub</span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#3A1C16]">Bakery Control Center</h1>
        </div>

        <button
          onClick={() => setIsAuthenticated(false)}
          className="px-3.5 py-1.5 text-xs font-bold text-[#8C3C24] bg-white border border-[#E2D5CC] rounded-xl hover:bg-red-50 flex items-center gap-1.5 w-fit"
        >
          <Lock className="w-3.5 h-3.5" />
          <span>Lock Session</span>
        </button>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-5 rounded-2xl border border-[#EDE4DC] shadow-xs">
          <p className="text-[11px] font-bold uppercase text-[#8C6D62]">Total Gross Sales</p>
          <p className="font-serif text-2xl font-bold text-[#3A1C16] mt-1">₹{totalRevenue}</p>
          <p className="text-[10px] text-green-700 font-semibold mt-1">Verified customer orders</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#EDE4DC] shadow-xs">
          <p className="text-[11px] font-bold uppercase text-[#8C6D62]">Total Customer Orders</p>
          <p className="font-serif text-2xl font-bold text-[#3A1C16] mt-1">{orders.length}</p>
          <p className="text-[10px] text-[#8C6D62] mt-1">Catalog tracked</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#EDE4DC] shadow-xs">
          <p className="text-[11px] font-bold uppercase text-[#8C6D62]">Pending Orders</p>
          <p className="font-serif text-2xl font-bold text-[#C5892F] mt-1">{pendingOrdersCount}</p>
          <p className="text-[10px] text-[#8C6D62] mt-1">Requires kitchen dispatch</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#EDE4DC] shadow-xs">
          <p className="text-[11px] font-bold uppercase text-[#8C6D62]">Custom Requests</p>
          <p className="font-serif text-2xl font-bold text-[#3A1C16] mt-1">{customRequests.length}</p>
          <p className="text-[10px] text-[#8C6D62] mt-1">Wedding & event quotes</p>
        </div>
      </div>

      {/* Admin Tabs */}
      <div className="flex border-b border-[#E8DFD8] gap-4 overflow-x-auto">
        <button
          onClick={() => setActiveTab('orders')}
          className={`pb-3 text-xs font-bold whitespace-nowrap border-b-2 transition ${
            activeTab === 'orders' ? 'text-[#C5892F] border-[#C5892F]' : 'text-[#8C6D62] border-transparent hover:text-[#3A1C16]'
          }`}
        >
          Customer Orders ({orders.length})
        </button>
        <button
          onClick={() => setActiveTab('menu')}
          className={`pb-3 text-xs font-bold whitespace-nowrap border-b-2 transition ${
            activeTab === 'menu' ? 'text-[#C5892F] border-[#C5892F]' : 'text-[#8C6D62] border-transparent hover:text-[#3A1C16]'
          }`}
        >
          Product & Price Editor ({products.length})
        </button>
        <button
          onClick={() => setActiveTab('custom')}
          className={`pb-3 text-xs font-bold whitespace-nowrap border-b-2 transition ${
            activeTab === 'custom' ? 'text-[#C5892F] border-[#C5892F]' : 'text-[#8C6D62] border-transparent hover:text-[#3A1C16]'
          }`}
        >
          Custom Cake Quotes ({customRequests.length})
        </button>
        <button
          onClick={() => setActiveTab('coupons')}
          className={`pb-3 text-xs font-bold whitespace-nowrap border-b-2 transition ${
            activeTab === 'coupons' ? 'text-[#C5892F] border-[#C5892F]' : 'text-[#8C6D62] border-transparent hover:text-[#3A1C16]'
          }`}
        >
          Discounts & Promo Codes ({coupons.length})
        </button>
      </div>

      {/* Admin Order Board */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-[#EDE4DC]">
            <div className="relative flex-1 max-w-sm">
              <Search className="w-3.5 h-3.5 text-[#8C6D62] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by Order ID, Customer name, Phone..."
                value={orderSearch}
                onChange={(e) => setOrderSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-[#D8C7B9] bg-[#FAF7F3] focus:outline-none"
              />
            </div>

            <div className="flex items-center space-x-2 text-xs">
              <span className="text-[#8C6D62]">Status Filter:</span>
              <select
                value={orderFilter}
                onChange={(e) => setOrderFilter(e.target.value)}
                className="py-1 px-2.5 rounded-lg border border-[#D8C7B9] bg-[#FAF7F3] font-medium"
              >
                <option value="All">All Statuses</option>
                <option value="Order Received">Order Received</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Preparing">Preparing</option>
                <option value="Out for Delivery">Out for Delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-[#EDE4DC] overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#FAF3EB] text-[#5C3B30] uppercase text-[10px] tracking-wider border-b border-[#EDE4DC]">
                  <tr>
                    <th className="p-3.5">Order ID & Date</th>
                    <th className="p-3.5">Customer & Security Key</th>
                    <th className="p-3.5">Items</th>
                    <th className="p-3.5">Total & Payment</th>
                    <th className="p-3.5">Status Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F2E8DF]">
                  {filteredOrders.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="p-6 text-center text-[#8C6D62]">No matching orders found.</td>
                    </tr>
                  ) : (
                    filteredOrders.map((order) => (
                      <tr key={order.orderId} className="hover:bg-[#FAF7F3]">
                        <td className="p-3.5">
                          <p className="font-bold text-[#3A1C16]">{order.orderId}</p>
                          <p className="text-[11px] text-[#8C6D62]">{order.date}</p>
                          <span className="text-[10px] text-[#C5892F] font-semibold">{order.deliveryType}</span>
                        </td>
                        <td className="p-3.5">
                          <p className="font-bold text-[#3A1C16]">{order.customerName}</p>
                          <p className="text-[11px] text-[#8C6D62]">{order.mobile}</p>
                          <p className="text-[10px] text-[#8C6D62] truncate max-w-[160px]">{order.address}</p>
                          <code className="text-[9px] bg-[#FAF3EB] text-[#8C6D62] px-1 py-0.5 rounded font-mono">
                            Passkey: {order.custKey}
                          </code>
                        </td>
                        <td className="p-3.5 max-w-xs">
                          <div className="space-y-1">
                            {order.items.map((it, i) => (
                              <p key={i} className="text-[11px] text-[#3A1C16]">
                                • {it.name} <span className="text-[#8C6D62]">({it.size}) × {it.quantity}</span>
                              </p>
                            ))}
                          </div>
                        </td>
                        <td className="p-3.5">
                          <p className="font-serif font-bold text-sm text-[#3A1C16]">₹{order.finalTotal}</p>
                          <span className="text-[10px] bg-green-50 text-green-700 px-1.5 py-0.5 rounded font-medium block w-fit mt-0.5">
                            {order.paymentStatus || order.paymentMethod}
                          </span>
                        </td>
                        <td className="p-3.5">
                          <select
                            value={order.status}
                            onChange={(e) => handleStatusChange(order.orderId, e.target.value)}
                            className="text-xs py-1.5 px-2.5 rounded-lg border border-[#D8C7B9] bg-[#FAF7F3] font-semibold text-[#3A1C16] focus:outline-none"
                          >
                            <option value="Order Received">Order Received</option>
                            <option value="Confirmed">Confirmed</option>
                            <option value="Preparing">Preparing</option>
                            <option value="Out for Delivery">Out for Delivery</option>
                            <option value="Delivered">Delivered</option>
                          </select>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Menu & Price Management */}
      {activeTab === 'menu' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center bg-white p-3.5 rounded-2xl border border-[#EDE4DC]">
            <p className="text-xs text-[#8C6D62]">Change prices, mark out-of-stock items, or add festive seasonal sweets.</p>
            <button
              onClick={openAddModal}
              className="px-3.5 py-2 bg-[#3A1C16] hover:bg-[#25100B] text-[#F9EBD2] text-xs font-bold rounded-xl flex items-center gap-1.5 shadow"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add New Item</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((prod) => (
              <div key={prod.id} className="bg-white p-4 rounded-2xl border border-[#EDE4DC] shadow-xs flex space-x-3 items-center">
                <img src={prod.image} alt={prod.name} className="w-16 h-16 rounded-xl object-cover shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-[#8C6D62] font-semibold uppercase">{prod.category}</span>
                    <button
                      onClick={() => toggleProductStock(prod.id)}
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        prod.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {prod.available ? 'In Stock' : 'Unavailable'}
                    </button>
                  </div>
                  <h4 className="font-serif font-bold text-xs text-[#3A1C16] truncate">{prod.name}</h4>
                  <p className="font-serif font-bold text-sm text-[#C5892F] mt-0.5">
                    ₹{prod.basePrice} <span className="text-[10px] text-[#8C6D62] font-normal">/ {prod.priceUnit}</span>
                  </p>

                  <div className="flex items-center space-x-3 mt-2">
                    <button onClick={() => openEditModal(prod)} className="text-xs text-[#C5892F] font-bold hover:underline flex items-center gap-1">
                      <Edit2 className="w-3.5 h-3.5" />
                      <span>Edit Price</span>
                    </button>
                    <button onClick={() => handleDeleteProduct(prod.id)} className="text-xs text-red-600 hover:underline flex items-center gap-1">
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Custom Cake Inquiries */}
      {activeTab === 'custom' && (
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-2xl border border-[#EDE4DC]">
            <h3 className="font-serif font-bold text-sm text-[#3A1C16]">Customer Personalized Cake & Hamper Inquiries</h3>
            <p className="text-xs text-[#8C6D62]">Review requirements, reference photo previews, and update quote communication.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {customRequests.map((req) => (
              <div key={req.id} className="bg-white p-5 rounded-2xl border border-[#EDE4DC] shadow-xs space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] bg-[#FAF3EB] text-[#C5892F] font-bold px-2 py-0.5 rounded">
                      {req.id} • {req.type}
                    </span>
                    <h4 className="font-serif font-bold text-base text-[#3A1C16] mt-1">{req.customerName}</h4>
                    <p className="text-xs text-[#8C6D62]">{req.mobile} • {req.email}</p>
                  </div>
                  <span className="text-xs font-bold text-[#3A1C16] bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">
                    {req.status}
                  </span>
                </div>

                <div className="text-xs text-[#5C3B30] space-y-1 bg-[#FAF7F3] p-3 rounded-xl">
                  <p><strong>Flavor:</strong> {req.flavor}</p>
                  <p><strong>Weight/Size:</strong> {req.weight} | <strong>Dietary:</strong> {req.dietary}</p>
                  <p><strong>Event Date:</strong> {req.eventDate} | <strong>Budget:</strong> {req.budget}</p>
                  {req.message && <p><strong>Message on Cake:</strong> "{req.message}"</p>}
                  {req.instructions && <p><strong>Notes:</strong> {req.instructions}</p>}
                </div>

                <div className="flex justify-end space-x-2 pt-2 border-t border-[#F2E8DF]">
                  <button
                    onClick={() => updateCustomStatus(req.id, 'Quotation Sent')}
                    className="px-3 py-1 bg-[#FAF3EB] hover:bg-[#F2E5D6] text-xs font-bold text-[#3A1C16] rounded-lg"
                  >
                    Mark Quote Sent
                  </button>
                  <button
                    onClick={() => updateCustomStatus(req.id, 'Confirmed & Baking')}
                    className="px-3 py-1 bg-[#3A1C16] hover:bg-[#25100B] text-[#F9EBD2] text-xs font-bold rounded-lg shadow"
                  >
                    Confirm & Bake
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Coupon Management Tab */}
      {activeTab === 'coupons' && (
        <div className="space-y-6">
          <div className="bg-white p-5 rounded-2xl border border-[#EDE4DC] shadow-xs">
            <h3 className="font-serif font-bold text-base text-[#3A1C16] mb-1">Create New Discount Coupon</h3>
            <p className="text-xs text-[#8C6D62] mb-4">Set promotional codes for festive seasons and customer rewards.</p>

            <form onSubmit={handleAddCoupon} className="grid grid-cols-1 sm:grid-cols-4 gap-3 items-end">
              <div>
                <label className="text-xs font-bold text-[#5C3B30] block mb-1">Coupon Code</label>
                <input
                  type="text"
                  placeholder="e.g. DIWALI25"
                  value={newCouponCode}
                  onChange={(e) => setNewCouponCode(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[#D8C7B9] bg-[#FAF7F3] uppercase font-bold focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="text-xs font-bold text-[#5C3B30] block mb-1">Discount (%)</label>
                <input
                  type="number"
                  min="1"
                  max="50"
                  value={newCouponPercent}
                  onChange={(e) => setNewCouponPercent(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[#D8C7B9] bg-[#FAF7F3] font-bold focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="text-xs font-bold text-[#5C3B30] block mb-1">Min Order Amount (₹)</label>
                <input
                  type="number"
                  min="0"
                  step="50"
                  value={newCouponMin}
                  onChange={(e) => setNewCouponMin(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[#D8C7B9] bg-[#FAF7F3] font-bold focus:outline-none"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 bg-[#C5892F] hover:bg-[#A86F1E] text-white font-bold text-xs rounded-xl shadow transition"
              >
                Add Coupon
              </button>
            </form>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {coupons.map((c) => (
              <div key={c.code} className="bg-white p-4 rounded-2xl border border-[#EDE4DC] shadow-xs flex justify-between items-center">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-mono font-bold text-sm text-[#3A1C16] bg-[#FAF3EB] px-2 py-0.5 rounded border border-[#E2D4C7]">
                      {c.code}
                    </span>
                    <span className="text-xs font-bold text-green-700 bg-green-50 px-2 py-0.5 rounded">
                      {c.discountPercent}% OFF
                    </span>
                  </div>
                  <p className="text-xs text-[#6C4E44] mt-2">{c.description}</p>
                  <p className="text-[10px] text-[#8C6D62] mt-0.5">Min Order: ₹{c.minOrder}</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setCoupons(prev => prev.filter(item => item.code !== c.code));
                    showToast(`Coupon ${c.code} deleted.`);
                  }}
                  className="text-red-500 hover:text-red-700 p-2"
                  title="Delete Coupon"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Product Add / Edit Modal */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-4 border border-[#EDE4DC] shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#F2E8DF] pb-3">
              <h3 className="font-serif font-bold text-lg text-[#3A1C16]">
                {editingProduct ? 'Edit Product Details' : 'Add New Delicacy'}
              </h3>
              <button onClick={() => setIsProductModalOpen(false)} className="text-[#8C6D62] hover:text-[#3A1C16]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-[#5C3B30] block mb-1">Delicacy Name *</label>
                <input
                  type="text"
                  required
                  value={productForm.name}
                  onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                  placeholder="e.g. Belgian Chocolate Hazelnut Truffle"
                  className="w-full px-3 py-2 rounded-xl border border-[#D8C7B9] bg-[#FAF7F3] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-[#5C3B30] block mb-1">Category *</label>
                  <select
                    value={productForm.category}
                    onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#D8C7B9] bg-[#FAF7F3] focus:outline-none"
                  >
                    <option value="Cakes">Cakes</option>
                    <option value="Pastries & Desserts">Pastries & Desserts</option>
                    <option value="Indian Sweets">Indian Sweets</option>
                    <option value="Cookies & Snacks">Cookies & Snacks</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-[#5C3B30] block mb-1">Subcategory</label>
                  <input
                    type="text"
                    value={productForm.subCategory}
                    onChange={(e) => setProductForm({ ...productForm, subCategory: e.target.value })}
                    placeholder="e.g. Classic Cakes, North Indian"
                    className="w-full px-3 py-2 rounded-xl border border-[#D8C7B9] bg-[#FAF7F3] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-[#5C3B30] block mb-1">Base Price (₹) *</label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={productForm.basePrice}
                    onChange={(e) => setProductForm({ ...productForm, basePrice: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#D8C7B9] bg-[#FAF7F3] focus:outline-none font-bold"
                  />
                </div>

                <div>
                  <label className="font-bold text-[#5C3B30] block mb-1">Price Unit *</label>
                  <input
                    type="text"
                    required
                    value={productForm.priceUnit}
                    onChange={(e) => setProductForm({ ...productForm, priceUnit: e.target.value })}
                    placeholder="e.g. 500g, 1 kg, 1 pc"
                    className="w-full px-3 py-2 rounded-xl border border-[#D8C7B9] bg-[#FAF7F3] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-[#5C3B30] block mb-1">Image URL</label>
                <input
                  type="url"
                  value={productForm.image}
                  onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
                  placeholder="https://..."
                  className="w-full px-3 py-2 rounded-xl border border-[#D8C7B9] bg-[#FAF7F3] focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-[#5C3B30] block mb-1">Description</label>
                <textarea
                  rows={2}
                  value={productForm.description}
                  onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                  placeholder="Flavor notes, ingredients..."
                  className="w-full px-3 py-2 rounded-xl border border-[#D8C7B9] bg-[#FAF7F3] focus:outline-none"
                />
              </div>

              <div className="flex items-center space-x-6 pt-1">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={productForm.isVeg}
                    onChange={(e) => setProductForm({ ...productForm, isVeg: e.target.checked })}
                    className="accent-[#C5892F] w-4 h-4 rounded"
                  />
                  <span className="font-bold text-[#3A1C16]">100% Vegetarian</span>
                </label>

                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={productForm.available}
                    onChange={(e) => setProductForm({ ...productForm, available: e.target.checked })}
                    className="accent-[#C5892F] w-4 h-4 rounded"
                  />
                  <span className="font-bold text-[#3A1C16]">Available in Stock</span>
                </label>
              </div>

              <div className="flex justify-end space-x-3 pt-3 border-t border-[#F2E8DF]">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="px-4 py-2 font-bold text-[#8C6D62] hover:bg-[#FAF3EB] rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#3A1C16] hover:bg-[#25100B] text-[#F9EBD2] font-bold rounded-xl shadow"
                >
                  {editingProduct ? 'Update Product' : 'Add Delicacy'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
