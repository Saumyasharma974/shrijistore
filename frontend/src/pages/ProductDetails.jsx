import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const sizes = ['S', 'M', 'L', 'XL']; // example size options

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/products/getByid/${id}`);
        setProduct(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching product:", err);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size.');
      return;
    }
    alert(`Added to cart: ${product.name} (${selectedSize})`);
    // ➕ Optional: Call your backend or update context/cart state
  };

  if (loading) return <p className="text-white">Loading...</p>;
  if (!product) return <p className="text-white">Product not found.</p>;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 flex flex-col md:flex-row gap-8">
      <div className="flex-1">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-[400px] object-contain bg-white p-4 rounded-xl"
        />
      </div>

      <div className="flex-1">
        <h2 className="text-3xl font-bold mb-2">{product.name}</h2>
        <p className="text-gray-400 mb-4">{product.description}</p>
        <div className="text-yellow-400 text-2xl font-bold mb-4">₹{product.price}</div>
        <div className="mb-4">
          <p className="font-semibold mb-1">Select Size:</p>
          <div className="flex gap-2">
            {sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-4 py-1 rounded border ${
                  selectedSize === size
                    ? 'bg-yellow-500 text-black font-bold'
                    : 'bg-gray-700 text-white hover:bg-gray-600'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
        <button
          onClick={handleAddToCart}
          className="mt-4 px-6 py-2 bg-yellow-500 hover:bg-yellow-400 text-black font-bold rounded"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductDetails;
