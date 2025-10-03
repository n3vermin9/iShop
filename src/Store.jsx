import React, { useState } from "react";
import QuickView from "./Components/QuickView";
import { items } from "./data";
import { Link } from "react-router-dom";
import Success from "./Components/Success";
import arrowUp from "./Components/ArrowUp";
import arrowDown from "./Components/ArrowDown";
import ScrollUp from "./Components/ScrollUp";

function Store({ cartItems, setCartItems }) {
  let [showModal, setShowModal] = useState(false);
  let [currentItem, setCurrentItem] = useState(null);
  let [success, setSuccess] = useState(false);
  let [inputValue, setInputValue] = useState("");
  let [filteredItems, setFilteredItems] = useState(items);
  let [searchFilter, setSearchFilter] = useState(0);

  function handleView(item) {
    setShowModal((prev) => !prev);
    setCurrentItem(item);
  }

  const handleChange = (e) => {
    const searchTerm = e.target.value;
    setInputValue(searchTerm);
    const newFilteredItems = items.filter((obj) =>
      obj.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredItems(newFilteredItems);
  };

  const displayItems =
    searchFilter === 0 || searchFilter === 2
      ? filteredItems
      : filteredItems.slice().reverse();

  const handleFilter = () => {
    searchFilter == 0
      ? setSearchFilter(1)
      : searchFilter == 1
      ? setSearchFilter(2)
      : setSearchFilter(0);
  };

  return (
    <div className="appear bg-white text-gray-900 select-none">
      <p className="text-3xl absolute top-3 left-3 font-extrabold">
        i<span className="bg-blue-500 text-white px-1">Shop</span>
      </p>
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="w-[90%] md:w-[70%] h-20 m-auto mt-10 flex items-center justify-center p-2 gap-4">
          <input
            onChange={handleChange}
            value={inputValue}
            placeholder="Search..."
            type="text"
            className="bg-zinc-100 border-2 shadow-lg h-11 w-[80%] outline-none rounded-lg text-lg p-2 capitalize"
          />
          <button
            onClick={handleFilter}
            className="text-white bg-blue-600 shadow-lg h-11 w-28 hover:bg-blue-700 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center flex justify-center items-center me-2"
          >
            <div className="flex items-center justify-center">
              {searchFilter === 0 ? (
                "Filter"
              ) : searchFilter === 1 ? (
                <>
                  <p className="pr-1">Price</p>
                  {arrowUp}
                </>
              ) : (
                <>
                  <p className="pr-1">Price</p>
                  {arrowDown}
                </>
              )}
            </div>
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-4 mt-14 justify-center place-items-center">
          {filteredItems.length === 0 ? (
            <p className="absolute top-1/2 left-1/2 w-40 h-40 flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2">
              No such item
            </p>
          ) : (
            displayItems.map((item, index) => (
              <div
                key={index}
                onClick={() => handleView(item)}
                className="group popUp border-2 rounded-xl w-84 mb-20 md:w-52 bg-gray-100 shadow-lg p-1 md:mb-20 cursor-pointer hover:brightness-75 duration-200"
              >
                <img
                  src={item.image}
                  className="aspect-square w-full bg-white rounded-lg object-contain p-4"
                  alt={item.name}
                />
                <h3 className="mt-4 text-sm text-gray-700">{item.name}</h3>
                <p className="mt-1 text-lg font-medium text-gray-900">
                  ${item.price}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
      <Link
        to={"/Cart"}
        className="absolute top-4 right-2 shadow-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2"
      >
        <span className="brightness-0 invert text-md">🛒 Cart</span>
        {cartItems.length === 0 ? null : (
          <p
            className="appear rounded-full w-7 h-7 bg-blue-600 border-4 border-white absolute -top-3 -right-2 z-20
        flex items-center justify-center font-extrabold text-[10px]"
          >
            {cartItems.length}
          </p>
        )}
      </Link>
      {showModal && (
        <QuickView
          item={currentItem}
          onClose={handleView}
          setCartItems={setCartItems}
          cartItems={cartItems}
          success={success}
          setSuccess={setSuccess}
        />
      )}
      {success && <Success />}
      <ScrollUp />
    </div>
  );
}

export default Store;
