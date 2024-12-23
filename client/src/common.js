import indianFlag from "../src/assets/india.png";
import UsaFlag from "../src/assets/usa.png";
import shirt from "./assets/SHIRTS.png";
import coords from "./assets/COORDS.png";
import suits from "./assets/SUITS.png";
import festive from "./assets/FESTIVE.png";
import bestSeller1 from "./assets/bestSellerP1.jpg";
import bestSeller2 from "./assets/bestSellerP2.jpg";
import bestSeller3 from "./assets/bestSeller11.jpg";
import bestSeller4 from "./assets/bestSellerP4.jpg";
import bestSeller5 from "./assets/bestSeller8.jpg";
import bestSeller6 from "./assets/bestSeller9.jpg";
import bestSeller7 from "./assets/bestSeller10.jpg";
import bestSeller11 from "./assets/bestSeller11.jpg";
import bestSeller12 from "./assets/bestSeller12.jpg";
import bestSeller13 from "./assets/bestSeller13.jpg";
import {
  Dashboard as DashboardIcon,
  Category as CategoryIcon,
  RecentActors as RecentActorsIcon,
} from "@mui/icons-material"; // Import icons
import GroupIcon from "@mui/icons-material/Group";

export const dashboardTabValue = [
  { label: "Products", value: "one", icon: <DashboardIcon /> },
  { label: "Categories", value: "two", icon: <CategoryIcon /> },
  { label: "Testimonials", value: "three", icon: <RecentActorsIcon /> },
  { label: "User", value: "four", icon: <GroupIcon /> },
];

export const countries = [
  {
    label: "India",
    value: "INR",
    flag: indianFlag,
    currency: "₹",
  },
  {
    label: "USA",
    value: "USD",
    flag: UsaFlag,
    currency: "$",
  },
];

export const getCurrencySymbol = (country) => {
  const symbol = countries.filter((row) => row.value === country)[0];
  return symbol ? symbol.currency : "₹";
};

export const urlToFile = async (url, filename) => {
  const response = await fetch(url);
  const blob = await response.blob();

  const file = new File([blob], filename, { type: blob.type });
  return file;
};

export const categories = [
  {
    label: "SHIRTS and Dresses",
    imgSrc: shirt,
    value: "shirts",
  },
  {
    label: "CO-ORDS",
    imgSrc: coords,
    value: "cord",
  },
  {
    label: "KURTAS",
    imgSrc: suits,
    value: "kurtas",
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

export const hasEmptyField = (obj) => {
  return Object.values(obj).some(
    (value) => typeof value === "string" && value.trim() === ""
  );
};

export const validateEmail = (passedEmail) => {
  let emailRegex = /^[A-Za-z0-9_.-]{3,}@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  return emailRegex.test(passedEmail);
};

export const isValidPhoneNumber = (phoneNumber) => {
  // Regex to check if the cleaned number is a 10-digit number starting with 7-9
  const phoneRegex = /^[7-9]\d{9}$/;

  return phoneRegex.test(phoneNumber);
};

export const validatePassword = (password) => {
  return {
    minLength: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    digit: /\d/.test(password),
    specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };
};

export const availableSizes = [
  { label: "XS", value: "XS" },
  { label: "S", value: "S" },
  { label: "M", value: "M" },
  { label: "L", value: "L" },
  { label: "XL", value: "XL" },
  { label: "XXL", value: "XXL" },
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
    title: "Genelia Deshmukh in Embroidered Jacket",
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

export const findLabelByValue = (array, value) => {
  const option = array.find((option) => option.value === value);
  return option ? option.label : null;
};

export const products = [
  {
    label: "Sapphire Applique Kurta Set",
    // imgSrc: [bestSeller1, bestSeller2, bestSeller3, bestSeller4, bestSeller1],
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
    imgSrc: [bestSeller6],
    price: 9999,
    sizes: ["S", "M", "L", "XL"],
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged",
    garmentDetails: ["100% cotton", "machine washable.", "Printed"],
    deliveryInfo: "Delivered in 5-7 business days.",
  },
  {
    label: "Sapphire Applique Kurta Set",
    imgSrc: [bestSeller7],
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
    imgSrc: [bestSeller5],
    price: 9999,
    sizes: ["S", "M", "L", "XL"],
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged",
    garmentDetails: ["100% cotton", "machine washable.", "Printed"],
    deliveryInfo: "Delivered in 5-7 business days.",
  },
  {
    label: "Sapphire Applique Kurta Set",
    imgSrc: [bestSeller11],
    price: 9999,
    sizes: ["S", "M", "L", "XL"],
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged",
    garmentDetails: ["100% cotton", "machine washable.", "Printed"],
    deliveryInfo: "Delivered in 5-7 business days.",
  },
  {
    label: "Sapphire Applique Kurta Set",
    imgSrc: [bestSeller12],
    price: 9999,
    sizes: ["S", "M", "L", "XL"],
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged",
    garmentDetails: ["100% cotton", "machine washable.", "Printed"],
    deliveryInfo: "Delivered in 5-7 business days.",
  },
  {
    label: "Sapphire Applique Kurta Set",
    imgSrc: [bestSeller13],
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
