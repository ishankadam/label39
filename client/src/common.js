import indianFlag from "../src/assets/india.png";
import UsaFlag from "../src/assets/usa.png";
import coords from "./assets/COORDS.png";
import festive from "./assets/FESTIVE.png";
import shirt from "./assets/SHIRTS.png";
import suits from "./assets/SUITS.png";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AttributionIcon from "@mui/icons-material/Attribution";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import CategoryIcon from "@mui/icons-material/Category";
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupIcon from "@mui/icons-material/Group";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import LoyaltyIcon from "@mui/icons-material/Loyalty";
import RecentActorsIcon from "@mui/icons-material/RecentActors";
import ViewModuleIcon from "@mui/icons-material/ViewModule";

export const dashboardTabValue = [
  { label: "Products", value: "one", icon: <DashboardIcon /> },
  { label: "Categories", value: "two", icon: <CategoryIcon /> },
  { label: "Testimonials", value: "three", icon: <RecentActorsIcon /> },
  { label: "User", value: "four", icon: <GroupIcon /> },
  { label: "Orders", value: "five", icon: <ViewModuleIcon /> },
  { label: "Profile", value: "six", icon: <AccountCircleIcon /> },
  { label: "Client Diaries", value: "seven", icon: <GroupAddIcon /> },
  { label: "Celebrity Style", value: "eight", icon: <AttributionIcon /> },
  { label: "Sales", value: "nine", icon: <LoyaltyIcon /> },
  { label: "Gift Card", value: "ten", icon: <CardGiftcardIcon /> },
];

export const whatsappQueryMessage =
  "Hey Prachi your ORDER is yet to be fulfilled! \n\n📦 Meanwhile, enjoy purchasing with code MAMAFIRST10 to get 10% off 🎉\n\n As we have already been waiting for you for a long time 🥳";

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
    label: "SHIRTS & Dresses",
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
  { label: "10000 To 20000", value: "10000_20000" },
  { label: "Above 20000", value: "above_20000" },
];

export const availableColors = [
  "Red",
  "Blue",
  "Green",
  "Yellow",
  "Orange",
  "Black",
  "Ivory",
  "Gray",
  "Pink",
  "Lilac",
  "Purple",
  "Beige",
  "Brown",
  "Peach",
  "Off-white",
  "Maroon",
  "Gold",
  "Silver",
  "Print",
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
];

export const garmentDetails = [
  "Fabric: Pure Silk Chanderi",
  "Fabric: Cotton Linen",
  "Fabric: Pure Silk",
  "Fabric: Pure Linen",
  "Fabric: Crepe",
  "Fabric: Cotton Silk",
  "Fabric: Dupion Silk",
  "Fabric: Pure Raw Silk",
  "Fabric: Pure Organza",
  "Fabric: Denim Cotton",
  "Fabric: Mul Chanderi",
  "Fabric: Mul Cotton",
  "Lining - cotton",
  "No. of Components: 1",
  "No. of Components: 2",
  "No. of Components: 3",
  "No. of Components: 4",
  "No. of Components: 5",
  "No. of Components: 6",
  "No. of Components: 7",
  "Dispatch Timeline: 2-3 Weeks",
  "Dispatch Timeline: Made to order",
  "Dispatch Timeline: Ready to ship",
  "Dispatch Timeline: Delivery in 2-3 weeks",
  "Dispatch Timeline: Delivery in 3-4 weeks",
  "Dispatch Timeline: Delivery in 4-5 weeks",
  "Dispatch Timeline: One Month",
  "Dispatch Timeline: 20 days",
  "Dispatch Timeline: 60 days",
  "Dispatch Timeline: 45 days",
  "Dispatch Timeline: Delivery in 20 Days",
  "Dispatch Timeline: Express delivery",
  "Wash Care: Dry clean only",
  "Wash Care: Gentle hand wash",
  "Wash Care: Machine wash",
  "Wash Care: Tumble dry",
  "Wash Care: Hand/Machine washable",
];

export const deliveryIn = [
  "Made to order",
  "Ready to ship",
  "Delivery in 2-3 weeks",
  "Delivery in 3-4 weeks",
  "Delivery in 4-5 weeks",
  "Delivery in 20 days ",
  "Delivery in 45 days",
  "Delivery in 60 days",
  "Delivery in 1 month",
  "Express Delivery",
  "Sold Out",
];

export const findLabelByValue = (array, value) => {
  const option = array.find((option) => option.value === value);
  return option ? option.label : null;
};

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

export const prepareOrderDetailsMessage = (orders) => {
  let message = "Thank you for your order! Here are your order details:\n\n";

  orders.forEach((order, index) => {
    message += `Order ${index + 1}:\n`;
    message += `Order ID: ${order.id}\n`;
    message += `Total Amount: ${order.total_amount}\n`;
    message += `Items:\n`;
    order.items.forEach((item) => {
      message += `  - ${item.name}: ${item.quantity} x ${item.price}\n`;
    });
    message += "\n";
  });

  return message;
};

export const addCommaToPrice = (price) => {
  if (typeof price !== "number") {
    throw new Error("Input must be a number");
  }
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const calculatePriceAfterDiscount = (price, type, value) => {
  let finalPrice = price;
  if (type === "Percentage") {
    finalPrice = ((price * (100 - value)) / 100).toFixed(2);
  } else if (type === "Amount") {
    finalPrice = (price - value).toFixed(2);
  } else {
    finalPrice = price;
  }
  return finalPrice;
};
