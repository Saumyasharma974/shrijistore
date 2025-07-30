import express from "express";


import { requireSignIn } from "../middleware/authMiddleware.js";
import { createProduct, deleteProduct, getAllProducts, getProductById, updateProduct } from "../controller/ProductContoller.js";

import { isAdmin } from "../controller/isAdmin.js";
import upload from "../middleware/uploadMiddleware.js";


const router = express.Router();

router.post(
  "/create",
  requireSignIn,

  isAdmin,
  upload.single("imageUrl"),

  // field name: image
  createProduct
);
router.get('/getall',  getAllProducts);
router.get('/getByid/:id', getProductById);
router.put('/update/:id', requireSignIn,

  isAdmin,
   upload.single("imageUrl"),
  updateProduct
);
router.delete('/deletebyId/:id', requireSignIn,isAdmin , deleteProduct);

export default router;
