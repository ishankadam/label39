import React, { createContext, useContext, useState } from "react";

const ShopContext = createContext();
export const ShopProvider = ({ children }) => {
  const [openShopMenu, setOpenShopMenu] = useState(false);

  const openDialog = () => setOpenShopMenu(true);
  const closeDialog = () => setOpenShopMenu(false);

  return (
    <ShopContext.Provider value={{ openShopMenu, openDialog, closeDialog }}>
      {children}
    </ShopContext.Provider>
  );
};

export const useShopContext = () => {
  return useContext(ShopContext);
};
