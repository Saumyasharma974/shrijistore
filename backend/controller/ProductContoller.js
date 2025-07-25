import Product from "../models/Products.model.js";
import { v2 as cloudinary } from "cloudinary";

export const createProduct = async (req, res) => {
  try {
  console.log("BODY:", JSON.stringify(req.body, null, 2));



    // Check admin role
    if (req.user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "You are not authorized to create a product" });
    }

    // Extract fields
    const { name, description, price, category, quantity } = req.body;

    // Check for required fields
    if (!name || !description || !price || !category || !quantity) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check for image
    if (!req.file || !req.file.path) {
      return res.status(400).json({ message: "Product image is required" });
    }
  
    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "products",
    });

    // Create product
    const product = new Product({
      name,
      description,
      price,
      category,
      quantity,
      imageUrl: result.secure_url,
    });

    await product.save();

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product,
    });

  } catch (err) {
  console.error("Product Creation Error:", err.message); // 👈 Will print string
  res.status(500).json({ error: err.message }); // 👈 sends clean message
}

};

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    console.error("Get All Products Error:", err.message);
    res.status(500).json({ error: err.message });
  }
};

export const getProductById = async (req, res) => {
  try{
     const productId=req.params.id;
      if(!productId){
        return res.status(400).json({ message: "Product ID is required" });
      }
      const product =await Product.findById(productId);
      if(!product){
        return res.status(404).json({ message: "Product not found" });
      }
      res.status(200).json(product);
  }catch(e){
    console.error("Get Product By ID Error:", e.message);
    res.status(500).json({ error: e.message });
  }
}


export const updateProduct = async (req, res) => {
  try {
    // 1. Only admin can update
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "You are not authorized to update a product" });
    }

    // 2. Get product ID from URL
    const productId = req.params.id;
    if (!productId) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    // 3. Find the product in DB
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // 4. Prepare imageUrl variable to update later
    let imageUrl = product.imageUrl; // default: keep old image

    // 5. If user uploads new image
    if (req.file) {
      // Delete old image from Cloudinary
      const segments = product.imageUrl.split('/');
      const filename = segments[segments.length - 1];
      const publicId = `products/${filename.split('.')[0]}`;

      await cloudinary.uploader.destroy(publicId);

      // Upload new image to Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'products',
      });

      imageUrl = result.secure_url; // set new image URL
    } else if (!req.body.imageUrl) {
      // No new image and no old image URL provided = error
      return res.status(400).json({ message: "Product image is required" });
    }

    // 6. Update product info in DB
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      {
        name: req.body.name || product.name,
        description: req.body.description || product.description,
        price: req.body.price || product.price,
        category: req.body.category || product.category,
        quantity: req.body.quantity || product.quantity,
        imageUrl: imageUrl,
      },
      { new: true }
    );

    // 7. Send success response
    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product: updatedProduct,
    });

  } catch (err) {
    console.error("Update Product Error:", err.message);
    res.status(500).json({ error: err.message });
  }
};


export const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    if (!productId) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Optional: delete image from Cloudinary
    const publicId = product.imageUrl?.split("/").pop().split(".")[0];
    if (publicId) {
      await cloudinary.uploader.destroy(`products/${publicId}`);
    }

    await product.deleteOne(); // ✅ recommended instead of remove()

    res.status(200).json({ success: true, message: "Product deleted successfully" });
  } catch (err) {
    console.error("Delete Product Error:", err);
    res.status(500).json({ error: err.message });
  }
};
