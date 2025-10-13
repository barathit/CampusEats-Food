const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");
const authMiddleware = require("../middleware/authMiddleware"); // ensure user is logged in

// ✅ All cart routes require authentication
router.use(authMiddleware);

// ➕ Add item to cart
router.post("/add", cartController.addToCart);

// ➖ Remove item from cart
router.delete("/remove/:menuItemId", cartController.removeFromCart);

// 🔄 Update item quantity
router.put("/update/:menuItemId", cartController.updateCartItem);

// 🛒 Get user cart
router.get("/", cartController.getCart);

module.exports = router;
