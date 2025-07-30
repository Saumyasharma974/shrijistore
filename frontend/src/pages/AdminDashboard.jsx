import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AdminDashboard() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    quantity: '',
    imageUrl: null,
  });
  const [editingId, setEditingId] = useState(null);

  // ✅ Check if user is admin
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      toast.error("You must login first");
      navigate("/login");
      return;
    }
    const { role, token } = JSON.parse(storedUser);
    if (role !== "admin") {
      toast.error("Access Denied. Admin only.");
      navigate("/");
    }
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:3000/api/products/getall");
      setProducts(response.data);
    } catch (error) {
      toast.error("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    if (e.target.name === 'imageUrl') {
      setForm({ ...form, imageUrl: e.target.files[0] });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const stored = JSON.parse(localStorage.getItem("user"));
    const token = stored?.token;

    const formData = new FormData();
    Object.keys(form).forEach((key) => formData.append(key, form[key]));

    try {
      if (editingId) {
        await axios.put(`http://localhost:3000/api/products/update/${editingId}`, formData, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        toast.success("Product updated successfully!");
        setEditingId(null);
      } else {
        await axios.post("http://localhost:3000/api/products/create", formData, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        toast.success("Product added!");
      }
      setForm({ name: '', description: '', price: '', category: '', quantity: '', imageUrl: null });
      fetchProducts();
    } catch (err) {
      toast.error("Error saving product");
    }
  };

  const handleEdit = (product) => {
    setForm({ ...product, imageUrl: null });
    setEditingId(product._id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    const stored = JSON.parse(localStorage.getItem("user"));
    const token = stored?.token;
    try {
      await axios.delete(`http://localhost:3000/api/products/deletebyId/${id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      toast.success("Product deleted");
      fetchProducts();
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-6">
      <ToastContainer />
      <h1 className="text-3xl font-bold mb-6 text-center sm:text-left">Admin Dashboard</h1>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-800 p-6 rounded-xl mb-8 shadow-lg"
      >
        <input type="text" name="name" placeholder="Product Name" value={form.name} onChange={handleChange}
          className="p-2 rounded bg-gray-700 text-white" required />

        <input type="text" name="description" placeholder="Description" value={form.description} onChange={handleChange}
          className="p-2 rounded bg-gray-700 text-white" required />

        <input type="number" name="price" placeholder="Price" value={form.price} onChange={handleChange}
          className="p-2 rounded bg-gray-700 text-white" required />

        <input type="text" name="category" placeholder="Category" value={form.category} onChange={handleChange}
          className="p-2 rounded bg-gray-700 text-white" required />

        <input type="number" name="quantity" placeholder="Quantity" value={form.quantity} onChange={handleChange}
          className="p-2 rounded bg-gray-700 text-white" required />

        <input type="file" name="imageUrl" accept="image/*" onChange={handleChange}
          className="p-2 bg-gray-700 text-white" />

        <button type="submit"
          className="col-span-1 md:col-span-2 bg-blue-600 hover:bg-blue-700 p-2 rounded font-bold transition">
          {editingId ? 'Update Product' : 'Add Product'}
        </button>
      </form>

      {/* Product list */}
      {loading ? (
        <div className="text-center text-gray-300">Loading products...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product._id}
              className="bg-gray-800 rounded-xl p-4 shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1">
              <img src={product.imageUrl} alt={product.name}
                className="w-full h-40 object-cover rounded mb-2" />
              <h2 className="text-xl font-bold">{product.name}</h2>
              <p className="text-gray-400">{product.description}</p>
              <p>₹{product.price} | {product.category}</p>
              <p>Qty: {product.quantity}</p>
              <div className="mt-2 flex gap-2">
                <button onClick={() => handleEdit(product)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-black px-3 py-1 rounded transition">
                  Edit
                </button>
                <button onClick={() => handleDelete(product._id)}
                  className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded transition">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
