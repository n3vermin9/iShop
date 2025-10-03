import { useState } from "react";

function QuickView({ item, onClose, cartItems, setCartItems, setSuccess}) {
  const [selectedColor, setSelectedColor] = useState("#fff");
  const [selectedSize, setSelectedSize] = useState("128 GB");

  const colors = [
    { colorName: "Black", hex: "#111" },
    { colorName: "White", hex: "#fff" },
    { colorName: "Red", hex: "red" },
  ];

  const handleColorSelect = (color) => {
    setSelectedColor(color);
  };

  const handleClose = () => {
    document.querySelector(".fixed").classList.add("hidden");
    onClose();
  };

  const handleAddToCart = () => {
    handleClose();
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
    }, 750);
    setCartItems([
      ...cartItems,
      {
        id: Date.now(),
        name: item.name,
        size: selectedSize,
        color: selectedColor,
        price: item.price,
        image: item.image,
      },
    ]);
  };

  const handleChange = (e) => {
    setSelectedSize(e.target.value);
  };

  return (
    <div className="fixed select-none inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
      <div className="popUp bg-white rounded-lg shadow-lg max-w-2xl w-[360px] md:w-[460px] p-6 pl-10 relative">
        <button
          className="absolute top-2 right-4 text-gray-500 hover:text-gray-700"
          onClick={handleClose}
        >
          &times;
        </button>
        <div className="flex md:flex-row gap-4">
          <div className="flex-1">
            <img
              src={item.image}
              alt="Product"
              className="w-28 h-auto object-cover rounded-md"
            />
          </div>
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <h2 className="text-lg md:text-2xl font-semibold mb-2">
                {item.name}
              </h2>
              <div className="mb-4">
                <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">
                  Color
                </label>
                <div className="flex space-x-2">
                  {colors.map((color) => (
                    <button
                      key={color.colorName}
                      aria-label={color.colorName}
                      className={`w-6 h-6 md:w-8 md:h-8 rounded-full border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                        selectedColor?.colorName === color.colorName
                          ? "ring-2 ring-offset-2 ring-blue-500"
                          : ""
                      }`}
                      style={{ backgroundColor: color.hex }}
                      onClick={() => handleColorSelect(color)}
                    />
                  ))}
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">
                  Size
                </label>
                <select
                  className="w-32 h-8 text-sm md:w-36 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-label="Size"
                  value={selectedSize}
                  onChange={handleChange}
                >
                  <option>128 GB</option>
                  <option>256 GB</option>
                  <option>512 GB</option>
                  <option>1 TB</option>
                </select>
              </div>
            </div>
            <div className="mt-4 flex flex-col sm:flex-row sm:justify-between items-center">
              <button
                onClick={handleAddToCart}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuickView;
