import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import { PiPinterestLogoBold } from "react-icons/pi";
export const categories = [
  { img: "honey-nuts", label: "মধু ও বাদাম" },
  { img: "ghee-doi", label: "ঘী ও দই" },
  { img: "khejur-dates", label: "খেজুর" },
  { img: "mustard-oil", label: "সরিষার তেল" },
  { img: "fresh-fol", label: "ফল" },
  { img: "veg-sobji", label: "সবজি" },
  { img: "fish-mach", label: "মাছ ও মাংস" },
  { img: "grocery-store", label: "গ্রোসারি" },
];

export const products = [
  { seed: "sweet-yogu", name: "Bangladeshi Sweet Yogu 1kg", old: "২৫০৳", now: "২৩০৳", badge: "-৮%" },
  { seed: "bay-leaf", name: "Bay Leaf 50gm", old: "৩২৳", now: "৩০৳", badge: "-৭%" },
  { seed: "beef-1kg", name: "Beef 1kg", old: "৭৫০৳", now: "৭০০৳", badge: "-৭%" },
  { seed: "black-cardamom", name: "Black Cardamom 100gm", old: "৫০০৳", now: "৪৬০৳", badge: "-৮%" },
  { seed: "black-garlic", name: "Black Garlic 500gm", old: "১,৫০০৳", now: "১,৩১০৳", badge: "-১৩%" },
  { seed: "black-seed-honey", name: "Black Seed Honey 500g", old: "১,২০০৳", now: "৯০০৳", badge: "-২৫%" },
  { seed: "black-tomato", name: "Black Tomato 1kg", old: "৬৫৳", now: "৬০৳", badge: "-৫%" },
  { seed: "bombay-lychee", name: "Bombay Lychee 100 Pieces", old: "৪২০৳", now: "৩৯৯৳", badge: "-৫%" },
  { seed: "borboti-veg", name: "Borboti 1kg", old: "৩৫৳", now: "৩০৳", badge: "-১৪%" },
  {
    seed: "broiler-chicken",
    name: "Broiler Whole Chicken (Skin, Liver, Gizzard)",
    old: "৩৫০৳",
    now: "৩২০৳",
    badge: "-৯%",
  },
];

export const allProducts = [...products, ...products, ...products];

export const sidebarCategories = [
  { icon: "fa-jar", label: "মধু ও বাদাম" },
  { icon: "fa-cheese", label: "ঘী ও দই" },
  { icon: "fa-seedling", label: "খেজুর" },
  { icon: "fa-bottle-droplet", label: "সরিষার তেল" },
  { icon: "fa-apple-whole", label: "ফল" },
  { icon: "fa-carrot", label: "সবজি" },
  { icon: "fa-fish", label: "মাছ ও মাংস" },
  { icon: "fa-basket-shopping", label: "গ্রোসারি" },
];

export const sidebarQuickLinks = [
  { icon: "fa-home", label: "হোম", href: "/" },
  { icon: "fa-store", label: "শপ", href: "#" },
  { icon: "fa-circle-info", label: "আমাদের সম্পর্কে", href: "#" },
  { icon: "fa-phone", label: "কন্টাক্ট আস", href: "#" },
];

export const socials = [
  { icon: FaFacebook , label: "Facebook" },
  { icon: FaInstagram , label: "Instagram" },
  { icon: FaYoutube, label: "YouTube" },
  { icon: PiPinterestLogoBold, label: "Pinterest" },
];

export const headerNav = [
  { label: "HOME", href: "/" },
  { label: "SHOP", href: "/products" },
];