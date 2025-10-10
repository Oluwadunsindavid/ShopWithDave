import { createContext, useState } from "react";
import { products } from "../assets/assets";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  // to change the currency symbol on the whole website once
  const currency = "$";
  const delivery_fee = 10;
  // for the search bar
  const [search, setSearch] = useState("");
  // initialized it with boolean data so that when it is true, the search bar shows, when is it false, the search bar gets hidden
  const [showSearch, setShowSearch] = useState(false);
  // the data below can be used anywhere in our work
  const value = {
    products,
    currency,
    delivery_fee,
    // used in SearchBar.jsx page
    search,
    setSearch,
    showSearch,
    setShowSearch,
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
