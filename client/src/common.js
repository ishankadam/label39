import aeFlag from "../src/assets/countryFlags/ae.png";
import ausFlag from "../src/assets/countryFlags/au.png";
import caFlag from "../src/assets/countryFlags/ca.png";
import euFlag from "../src/assets/countryFlags/eu.png";
import idFlag from "../src/assets/countryFlags/id.png";
import indianFlag from "../src/assets/countryFlags/india.png";
import sgFlag from "../src/assets/countryFlags/sg.png";
import thFlag from "../src/assets/countryFlags/th.png";
import ukFlag from "../src/assets/countryFlags/uk.png";
import usaFlag from "../src/assets/countryFlags/usa.png";

import coords from "./assets/COORDS.png";
import festive from "./assets/FESTIVE.png";
import shirt from "./assets/SHIRTS.png";
import suits from "./assets/SUITS.png";

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
  // { label: "Profile", value: "six", icon: <AccountCircleIcon /> },
  { label: "Client Diaries", value: "seven", icon: <GroupAddIcon /> },
  { label: "Celebrity Style", value: "eight", icon: <AttributionIcon /> },
  { label: "Sales", value: "nine", icon: <LoyaltyIcon /> },
  { label: "Gift Card", value: "ten", icon: <CardGiftcardIcon /> },
  { label: "Discount", value: "eleven", icon: <CardGiftcardIcon /> },
];

export const whatsappQueryMessage =
  "I'm excited about your products and have a few questions—can you guide me through?";

export const countries = [
  {
    countryName: "India",
    value: "INR",
    flag: indianFlag,
    currency: "₹",
    label: "Rupee (INR)",
    fields: [
      "firstName",
      "lastName",
      "address",
      "apartment",
      "email",
      "state",
      "city",
      "pincode",
    ],
  },
  {
    countryName: "USA",
    value: "USD",
    flag: usaFlag,
    currency: "$",
    label: "US Dollar (USD)",
    fields: [
      "firstName",
      "lastName",
      "address",
      "apartment",
      "email",
      "state",
      "zipcode",
    ],
  },

  {
    countryName: "Europe",
    value: "EUR",
    flag: euFlag,
    currency: "€",
    label: "Euro (EUR)",
    fields: [
      "firstName",
      "lastName",
      "address",
      "apartment",
      "email",
      "state",
      "postalcode",
    ],
  },

  {
    countryName: "United Kingdom",
    value: "GBP",
    flag: ukFlag,
    currency: "£",
    label: "British Pound (GBP)",
    fields: [
      "firstName",
      "lastName",
      "address",
      "apartment",
      "email",
      "state",
      "postcode",
    ],
  },
  {
    countryName: "Canada",
    value: "CAD",
    flag: caFlag,
    currency: "C$",
    label: "Canadian Dollar (CAD)",
    fields: [
      "firstName",
      "lastName",
      "address",
      "apartment",
      "email",
      "city",
      "province",
      "postalcode",
    ],
  },
  {
    countryName: "United Arab Emirates",
    value: "AED",
    flag: aeFlag,
    currency: "د.إ",
    label: "Dirham (AED)",
    fields: [
      "firstName",
      "lastName",
      "address",
      "apartment",
      "email",
      "city",
      "emirate",
    ],
  },
  {
    countryName: "Australia",
    value: "AUD",
    flag: ausFlag,
    currency: "A$",
    label: "Australian Dollar (AUD)",
    fields: [
      "firstName",
      "lastName",
      "address",
      "apartment",
      "email",
      "city",
      "state/territory",
      "postcode",
    ],
  },

  {
    countryName: "Indonesia",
    value: "IDR",
    flag: idFlag,
    currency: "Rp",
    label: "Rupiah (IDR)",
    fields: [
      "firstName",
      "lastName",
      "address",
      "apartment",
      "email",
      "province",
      "postalcode",
    ],
  },

  {
    countryName: "Singapore",
    value: "SGD",
    flag: sgFlag,
    currency: "S$",
    label: "Singapore Dollar (SGD)",
    fields: [
      "firstName",
      "lastName",
      "address",
      "apartment",
      "email",
      "postalcode",
    ],
  },
  {
    countryName: "Thailand",
    value: "THB",
    flag: thFlag,
    currency: "฿",
    label: "Baht (THB)",
    fields: [
      "firstName",
      "lastName",
      "address",
      "apartment",
      "email",
      "city",
      "province",
      "postalcode",
    ],
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
    label: "SHIRTS & DRESSES",
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
  let emailRegex =
    /^[A-Za-z0-9]([A-Za-z0-9_.-]*[A-Za-z0-9])?@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  return emailRegex.test(passedEmail);
};

export const isValidPhoneNumber = (phoneNumber) => {
  // Regex to check if the cleaned number is a 10-digit number starting with 7-9
  const phoneRegex = /^[6-9]\d{9}$/;

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
    return Number(price)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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

export const orderStatus = [
  { label: "Order Placed", value: "placed" },
  { label: "Shipped", value: "shipped" },
  { label: "Delivered", value: "delivered" },
  { label: "Rejected", value: "rejected" },
];

export const featured = [
  { label: "NEW ARRIVAL", value: "newArrival" },
  { label: "BEST SELLERS", value: "bestSellers" },
  { label: "READY TO SHIP", value: "readyToShip" },
  { label: "As seen on", value: "asSeenOn" },
  // { label: "CLIENTS DAIRY", value: "clientsDiaries" },
];
