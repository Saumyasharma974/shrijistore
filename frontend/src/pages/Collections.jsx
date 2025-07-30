import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Collections() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAllProducts = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/products/getall");
      setProducts(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching products", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h2 className="text-3xl font-bold mb-6">All Collections</h2>
      {loading ? (
        <p>Loading...</p>
      ) : products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map(product => (
            <div
              key={product._id}
              className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl hover:scale-[1.03] transition-all duration-300"
            >
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-56 object-contain bg-white p-2"
              />
              <div className="p-4 flex flex-col justify-between h-56">
                <h3 className="text-lg font-semibold mb-1 line-clamp-2">{product.name}</h3>
                <p className="text-sm text-gray-400 line-clamp-2 mb-2">{product.description}</p>
                <div className="text-yellow-400 font-bold text-lg mb-2">₹{product.price}</div>
                <div className="flex justify-between items-center">
                  <p className="text-xs text-gray-300">Qty: {product.quantity}</p>
                  <button className="bg-yellow-500 text-black px-3 py-1 rounded hover:bg-yellow-400 text-sm font-semibold">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Collections;
