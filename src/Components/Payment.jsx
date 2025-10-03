import React, { useState } from "react";
import InputField from "./InputCard";

function PaymentModal({ cartItems, setShowModal, handleClose, handlePay }) {
  const [numberValue, setNumberValue] = useState("");
  const [expireDateValue, setExpireDateValue] = useState("");
  const [CVVValue, setCVVValue] = useState("");
  let cards = [
    "https://finexpert24.ru/upload/iblock/fa3/fa3fc455af917b17a65babaa6f3c4a5a.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtw96jpVRrOTWcYjCpZLNpyV5ESnloAvRU5A&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWxYUQvdwKXZ9meVu4Jx6fr7nNNo99TLl-bA&s",
  ];

  const formatInput = (value, chunkSize, separator, maxLength, setValue) => {
    const filteredInput = value.replace(/[^0-9]/g, "");
    const chunks =
      filteredInput.match(new RegExp(`.{1,${chunkSize}}`, "g")) || [];
    const formattedInput = chunks.join(separator);
    if (filteredInput.length > maxLength) {
      return;
    }
    setValue(formattedInput);
  };

  const handleChangeNumber = (e) => {
    formatInput(e.target.value, 4, " ", 16, setNumberValue);
  };

  const handleChangeExpireDate = (e) => {
    formatInput(e.target.value, 2, "/", 4, setExpireDateValue);
  };

  const handleChangeCVV = (e) => {
    const filteredInput = e.target.value.replace(/[^0-9]/g, "");
    if (filteredInput.length > 3) {
      return;
    }
    setCVVValue(filteredInput);
  };

  const handleCheckCard = () => {
    if (
      numberValue.length == 19 &&
      expireDateValue.length == 5 &&
      CVVValue.length == 3
    ) {
      handlePay();
    }
  };

  return (
    <div className="fixed select-none inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
      <div className="popUp relative bg-white flex flex-col items-center justify-center gap-6 rounded-lg shadow-lg max-w-2xl w-[320px] h-[330px]">
        <button
          className="absolute top-2 right-4 text-gray-500 hover:text-gray-700"
          onClick={handleClose}
        >
          &times;
        </button>
        <div className="h-[260px] w-[85%] mt-10 flex flex-col gap-4">
          <p className="text-sm text-zinc-500">Pay with</p>
          <div className="flex items-center gap-2">
            {cards.map((card, index) => (
              <div
                key={index}
                className={`bg-[url("${card}")] w-7 bg-center border border-zinc-200 rounded-sm h-5 bg-contain bg-no-repeat`}
              ></div>
            ))}
          </div>
          <div className="flex flex-col gap-1">
            <InputField
              title={"Card number"}
              placeholder="0000 0000 0000 0000"
              width={"w-full"}
              onChange={handleChangeNumber}
              value={numberValue}
            />
          </div>
          <div className="flex justify-between items-center">
            <div className="flex flex-col gap-1">
              <InputField
                title={"Expire date"}
                placeholder="00/00"
                width={"w-40"}
                onChange={handleChangeExpireDate}
                value={expireDateValue}
              />
            </div>
            <div className="flex flex-col gap-1">
              <InputField
                title={"CVV"}
                placeholder="###"
                width={"w-24"}
                onChange={handleChangeCVV}
                value={CVVValue}
              />
            </div>
          </div>
        </div>
        <button
          onClick={handleCheckCard}
          className="bg-blue-600 w-[90%] mb-8 text-white text-sm px-4 py-3 rounded hover:bg-blue-700"
        >
          Pay {cartItems.reduce((total, item) => total + item.price, 0)} USD
        </button>
      </div>
    </div>
  );
}

export default PaymentModal;
