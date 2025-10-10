import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import { useLocation } from "react-router-dom";

const SearchBar = () => {
  // call the "search, setSearch, showSearch, setShowSearch" from the ShopContext.jsx
  const { search, setSearch, showSearch, setShowSearch } =
    useContext(ShopContext);
  // used for the determining of the location of where the SearchBar is opened
  const [visible, setVisible] = useState(false);

  //   when I open the SearchBar on a page, I do not want it to be opened in another page. Using the useLocation hook, you can get the path of the URL
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes("collection")) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [location]);

  // if "showSearch" is true, then the functions below should work, else, null
  return showSearch && visible ? (
    <div className="border-t border-b bg-gray-50 text-center">
      <div className="inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 outline-none bg-inherit text-sm"
          type="text"
          placeholder="Search"
        />
        <img className="w-4" src={assets.search_icon} alt="" />
      </div>
      {/* "onClick={() => setShowSearch(false)}" closes the search bar opened in Navbar.jsx */}
      <img
        onClick={() => setShowSearch(false)}
        className="inline w-3 cursor-pointer"
        src={assets.cross_icon}
        alt=""
      />
    </div>
  ) : null;
};

export default SearchBar;
