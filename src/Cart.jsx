import PaymentModal from "./Components/Payment";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Success from "./Components/Success";

function Cart({ cartItems, setCartItems }) {
  let [showModal, setShowModal] = useState(false);
  let [success, setSuccess] = useState(false);

  function RemoveCartItem(id) {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  }

  const handleToggleModal = () => {
    setShowModal((prev) => !prev);
  };

  const handlePay = () => {
    handleToggleModal();
    setCartItems([]);
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
    }, 750);
  };

  return (
    <div className="appear bg-white select-none">
      <p className="text-3xl absolute top-3 left-3 font-extrabold">
        i<span className="bg-blue-500 text-white px-1">Shop</span>
      </p>
      <div
        className="flex flex-col items-center justify-start
        h-screen gap-4 pt-[170px]"
      >
        {cartItems.length === 0 ? (
          <p className="border-t-2 w-[70%] flex items-center justify-center h-40 mt-10">
            Cart is empty
          </p>
        ) : (
          <>
            <div className="flex bg-white justify-between w-[300px] md:w-[400px]">
              <p>
                Total: $
                {cartItems.reduce((total, item) => total + item.price, 0)}
              </p>
              <button
                onClick={() => {
                  setCartItems([]);
                }}
                className="text-blue-500"
              >
                Clear All
              </button>
            </div>
            <div className=" overflow-scroll h-[500px] md:h-[600px] w-[310px] md:w-[440px] flex justify-start items-center flex-col border-b-2 border-zinc-300">
              {[...cartItems].reverse().map((item, index) => (
                <div
                  key={index}
                  className="group popUp border w-[300px] md:w-[400px] h-[90px] mb-2 flex  rounded-xl hover:bg-zinc-200 duration-100"
                >
                  <img
                    src={item.image}
                    className={`bg-[${
                      item.color?.hex || "#fff"
                    }] bg-opacity-50 aspect-square rounded-lg border object-contain p-2 xl:aspect-7/8`}
                  />
                  <div className="h-full w-full relative flex items-center justify-around gap-2 pr-10">
                    <h3 className="text-gray-700 text-sm pl-4 w-28">
                      {item.name} <br></br>
                      {item.size}
                    </h3>
                    <p className="font-medium text-gray-900">${item.price}</p>
                    <button
                      onClick={() => RemoveCartItem(item.id)}
                      className="absolute right-2 w-6 h-6"
                    >
                      &times;
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={handleToggleModal}
              className="text-white bg-blue-600 h-11 w-28 hover:bg-blue-700 focus:outline-none font-medium rounded-lg text-md px-5 py-2.5 text-center flex justify-center items-center me-2"
            >
              Pay
            </button>
          </>
        )}
        {showModal && (
          <PaymentModal
            cartItems={cartItems}
            showModal={showModal}
            setShowModal={setShowModal}
            handleClose={handleToggleModal}
            handlePay={handlePay}
            success={success}
            setSucces={setSuccess}
          />
        )}
        {success && <Success />}
        <Link
          to={"/"}
          className="absolute top-4 right-2 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700"
        >
          <span className="text-md">Go back</span>
        </Link>
      </div>
    </div>
  );
}

export default Cart;
