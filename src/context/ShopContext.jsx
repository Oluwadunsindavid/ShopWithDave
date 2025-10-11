import { createContext, useEffect, useState } from "react";
import { products } from "../assets/assets";
import { toast } from "react-toastify";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  // to change the currency symbol on the whole website once
  const currency = "$";
  const delivery_fee = 10;
  // for the search bar
  const [search, setSearch] = useState("");
  // initialized it with boolean data so that when it is true, the search bar shows, when is it false, the search bar gets hidden
  const [showSearch, setShowSearch] = useState(false);
  //   for the cart page when you click the add to cart button, initialized with empty onject
  const [cartItems, setCartItems] = useState({});

  const addToCart = async (itemId, size) => {
    // if size is not selected
    if (!size) {
      toast.error("Select Product Size");
      return;
    }

    let cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }
    setCartItems(cartData);
  };

  const getCartCount = () => {
    let totalCount = 0;
    // iterate the items
    for (const items in cartItems) {
      // iterate the product size
      for (const item in cartItems[items]) {
        try {
          // "if (cartItems[items][item] > 0)" means in the cartItems, we have the product with the particular size
          if (cartItems[items][item] > 0) {
            // increase the count
            totalCount += cartItems[items][item];
          }
        } catch (error) {}
      }
    }
    return totalCount;
  };

  //  For the cart.jsx page, the delete icon. Using this function, we can clear the cartData or we can also modify the cartItems
  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);

    cartData[itemId][size] = quantity;

    setCartItems(cartData);
  };

  // To display the total cart amount to be used in the CartTotal.jsx page
  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      let itemInfo = products.find((product) => product._id === items);
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            // from "itemInfo.price" we get the product price and from "cartItems[items][item]" we get the product quantity
            totalAmount += itemInfo.price * cartItems[items][item];
          }
        } catch (error) {}
      }
    }
    return totalAmount;
  };

  // the data/functions that are passed below can be accessed in any other component and used anywhere in our work
  const value = {
    products,
    currency,
    delivery_fee,
    // used in SearchBar.jsx page
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
