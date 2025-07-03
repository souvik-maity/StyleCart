import React, { useState } from 'react';

const Cart: React.FC = () => {
  const [quantity, setQuantity] = useState<string>('1');
  const [error, setError] = useState<string>('');

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!/^\d+$/.test(value) || parseInt(value) <= 0) {
      setError('Please enter a positive number');
    } else {
      setError('');
    }
    setQuantity(value);
  };

  const handleAddToCart = () => {
    if (error || parseInt(quantity) <= 0) return;
    // Add to cart logic here
    alert(`Added ${quantity} item(s) to cart!`);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Cart</h1>

      <label className="block mb-2 font-medium">Quantity:</label>
      <input
        type="number"
        min="1"
        value={quantity}
        onChange={handleQuantityChange}
        className="border border-gray-400 rounded px-3 py-2 mb-2"
      />
      {error && <p className="text-red-500 mb-2">{error}</p>}

      <button
        onClick={handleAddToCart}
        disabled={!!error || !quantity}
        className={`px-4 py-2 rounded text-white ${
          error || !quantity ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default Cart;
