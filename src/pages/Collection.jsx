import React, { use, useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";

const Collection = () => {
  // search, showSearch used to apply the logic for the search bar to work
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  // for map product section
  const [filterProduct, setFilterProduct] = useState([]);
  // logic for the filters
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  // const [filterProduct, ]
  const [sortType, setSortType] = useState("relevant");

  // category section
  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setCategory((prev) => [...prev, e.target.value]);
    }
  };

  // subCategory section
  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setSubCategory((prev) => [...prev, e.target.value]);
    }
  };

  // use the category and subCategory state to create one filter
  const applyFilter = () => {
    // using this (products.slice()), it will create on copy of the poducts array in this variable (productsCopy)
    let productsCopy = products.slice();

    // to make the searchbar work
    if (showSearch && search) {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // to make the filter in the category section work onClick
    // "category.length > 0" means if we have selected any category in the filter
    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        category.includes(item.category)
      );
    }
    // to make the filter in the subCategory section work onClick
    // "subCategory.length > 0" means if we have selected any subCategory in the filter
    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        subCategory.includes(item.subCategory)
      );
    }
    setFilterProduct(productsCopy);
  };

  // USED BEFORE THE "applyFilter" function wa written. Since there is "productsCopy" in the "applyFilter" section, we will remove this but I decided to comment it out for future reference back to the code.

  // // to filter products
  // useEffect(() => {
  //   setFilterProduct(products);
  // }, []);

  // Logic for SORTING proruct
  const sortProduct = () => {
    // fpCopy = filterProductCopy
    let fpCopy = filterProduct.slice();

    switch (sortType) {
      case "low-high":
        setFilterProduct(fpCopy.sort((a, b) => a.price - b.price));
        break;

      case "high-low":
        setFilterProduct(fpCopy.sort((a, b) => b.price - a.price));
        break;

      default:
        applyFilter();
        break;
    }
  };

  // run the function applyFilters whenever the category array or subCategory array gets updated instead of the ones below this code
  // Alos, run the function applyFilters whenever the search and showSearch are applied.
  useEffect(() => {
    applyFilter();
  }, [category, subCategory, search, showSearch]);

  // // for category
  // useEffect(() => {
  //   // setCategory(console.log(category);
  //   console.log(category);
  // }, [category]);

  // // for subCategory
  // useEffect(() => {
  //   // setSubCategory(console.log(category);
  //   console.log(subCategory);
  // }, [subCategory]);

  // FOR THE SORT FILTER
  useEffect(() => {
    sortProduct();
  }, [sortType]);

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      {/* Filter Options */}
      <div className="min-w-60">
        {/* the onClick below is for the filters option to show when you click on the filters in smaller screens */}
        <p
          onClick={() => setShowFilter(!showFilter)}
          className="my-2 text-xl flex items-center cursor-pointer gap-2"
        >
          FILTERS
          <img
            src={assets.dropdown_icon}
            className={`h-2 sm:hidden ${showFilter ? "rotate-90" : ""}`}
            alt=""
          />
        </p>
        {/* Cartegory Filter */}
        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Men"}
                onChange={toggleCategory}
              />{" "}
              Men
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Women"}
                onChange={toggleCategory}
              />{" "}
              Women
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Kids"}
                onChange={toggleCategory}
              />{" "}
              Kids
            </p>
          </div>
        </div>
        {/* SubCartegory Filter */}
        <div
          className={`border border-gray-300 pl-5 py-3 my-5 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">TYPE</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Topwear"}
                onChange={toggleSubCategory}
              />
              Topwear
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Bottomwear"}
                onChange={toggleSubCategory}
              />
              Bottomwear
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Winterwear"}
                onChange={toggleSubCategory}
              />
              Winterwear
            </p>
          </div>
        </div>
      </div>

      {/* Right side for big screen */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1={"ALL"} text2={"COLLECTIONS"} />
          {/* Prouct Sort */}
          {/* "onChange={(e)=>setSortType(e.target.value)}" makes the sort filter work */}
          <select
            onChange={(e) => setSortType(e.target.value)}
            className="border border-gray-300 text-sm px-2"
          >
            <option value="relevant">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        {/* Map Products */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {filterProduct.map((item, index) => (
            <ProductItem
              key={index}
              name={item.name}
              id={item._id}
              price={item.price}
              image={item.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;
