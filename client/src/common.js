import indianFlag from "../src/assets/india.png";
import UsaFlag from "../src/assets/usa.png";
import shirt from "./assets/SHIRTS.png";
import coords from "./assets/COORDS.png";
import suits from "./assets/SUITS.png";
import festive from "./assets/FESTIVE.png";
import bestSeller1 from "./assets/bestseller1.jpeg";
import bestSeller2 from "./assets/bestseller2.jpeg";
import bestSeller3 from "./assets/bestseller3.jpeg";
import bestSeller4 from "./assets/bestseller4.jpeg";
export const adminSettings = ["Profile", "Account", "Dashboard", "Logout"];

export const countries = [
  {
    label: "India",
    value: "india",
    flag: indianFlag,
  },
  {
    label: "USA",
    value: "usa",
    flag: UsaFlag,
  },
];

export const categories = [
  {
    label: "SHIRTS",
    imgSrc: shirt,
    value: "shirts",
  },
  {
    label: "CO-ORDS",
    imgSrc: coords,
    value: "coords",
  },
  {
    label: "SUITS",
    imgSrc: suits,
    value: "suits",
  },
  {
    label: "FESTIVE",
    imgSrc: festive,
    value: "festive",
  },
];

export const fabrics = [
  {
    Cotton: [
      {
        label: "Muslin Cotton",
        value: "muslincotton",
      },
    ],
    Silk: [
      {
        label: "Silk test",
        value: "silktest",
      },
    ],
  },
];

export const priceRanges = [
  { label: "Under 10000", value: "under_10000" },
  { label: "10000 To 15000", value: "10000_15000" },
  { label: "15000 To 20000", value: "15000_20000" },
  { label: "Above 10000", value: "above_20000" },
];

export const availableColors = [
  { label: "Red", value: "red" },
  { label: "Green", value: "green" },
  { label: "Blue", value: "blue" },
  { label: "Yellow", value: "yellow" },
  { label: "Black", value: "black" },
];

export const availableSizes = [
  { label: "XS", value: "xs" },
  { label: "S", value: "s" },
  { label: "M", value: "m" },
  { label: "L", value: "l" },
  { label: "XL", value: "xl" },
  { label: "XXL", value: "xxl" },
];

export const cartItems = [
  {
    id: 1,
    image: bestSeller1,
    title: "Prajakta Koli in Marble Cape Set",
    price: 49900,
    quantity: 1,
    size: "XS",
  },
  {
    id: 2,
    image: bestSeller2,
    title: "Genelia Deshmukh in Gulshan Anarkali with Embroidered Jacket",
    price: 59900,
    quantity: 1,
    size: "M",
  },
];
export const garmentDetails = ["100% cotton", "Machine washable.", "Printed"];
export const deliveryIn = ["Available", "In 2-3 days", "In a week"];
export const bestSellers = [
  {
    label: "Sapphire Applique Kurta Set",
    imgSrc: [bestSeller1],
    price: 9999,
  },
  {
    label: "Sapphire Applique Kurta Set",
    imgSrc: [bestSeller2],
    price: 9999,
  },
  {
    label: "Sapphire Applique Kurta Set",
    imgSrc: [bestSeller3],
    price: 9999,
  },
  {
    label: "Sapphire Applique Kurta Set",
    imgSrc: [bestSeller4],
    price: 9999,
  },
];

export const products = [
  {
    label: "Sapphire Applique Kurta Set",
    imgSrc: [bestSeller1, bestSeller2, bestSeller3, bestSeller4, bestSeller1],
    price: 9999,
    sizes: ["S", "M", "L", "XL"],
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged",
    garmentDetails: ["100% cotton", "machine washable.", "Printed"],
    deliveryInfo: "Delivered in 5-7 business days.",
  },
  {
    label: "Sapphire Applique Kurta Set",
    imgSrc: [bestSeller2],
    price: 9999,
    sizes: ["S", "M", "L", "XL"],
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged",
    garmentDetails: ["100% cotton", "machine washable.", "Printed"],
    deliveryInfo: "Delivered in 5-7 business days.",
  },
  {
    label: "Sapphire Applique Kurta Set",
    imgSrc: [bestSeller3],
    price: 9999,
    sizes: ["S", "M", "L", "XL"],
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged",
    garmentDetails: ["100% cotton", "machine washable.", "Printed"],
    deliveryInfo: "Delivered in 5-7 business days.",
  },
  {
    label: "Sapphire Applique Kurta Set",
    imgSrc: [bestSeller4],
    price: 9999,
    sizes: ["S", "M", "L", "XL"],
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged",
    garmentDetails: ["100% cotton", "machine washable.", "Printed"],
    deliveryInfo: "Delivered in 5-7 business days.",
  },
  {
    label: "Sapphire Applique Kurta Set",
    imgSrc: [bestSeller1],
    price: 9999,
    sizes: ["S", "M", "L", "XL"],
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged",
    garmentDetails: ["100% cotton", "machine washable.", "Printed"],
    deliveryInfo: "Delivered in 5-7 business days.",
  },
  {
    label: "Sapphire Applique Kurta Set",
    imgSrc: [bestSeller2],
    price: 9999,
    sizes: ["S", "M", "L", "XL"],
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged",
    garmentDetails: ["100% cotton", "machine washable.", "Printed"],
    deliveryInfo: "Delivered in 5-7 business days.",
  },
  {
    label: "Sapphire Applique Kurta Set",
    imgSrc: [bestSeller3],
    price: 9999,
    sizes: ["S", "M", "L", "XL"],
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged",
    garmentDetails: ["100% cotton", "machine washable.", "Printed"],
    deliveryInfo: "Delivered in 5-7 business days.",
  },
  {
    label: "Sapphire Applique Kurta Set",
    imgSrc: [bestSeller4],
    price: 9999,
    sizes: ["S", "M", "L", "XL"],
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged",
    garmentDetails: ["100% cotton", "machine washable.", "Printed"],
    deliveryInfo: "Delivered in 5-7 business days.",
  },
];

export const handleMiddleTruncation = (value) => {
  if (value && value.length > 50) {
    const string1 = value.substr(0, 23);
    const string2 = value.substr(value.length - 23, value.length);
    const truncatedValue = string1 + "..." + string2;
    return truncatedValue;
  } else {
    return value;
  }
};

export const getUrl = () => {
  const url = new URL(window.location.origin);
  url.port = 5000;
  return url;
};
