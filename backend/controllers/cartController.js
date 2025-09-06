const cartService = require("../services/cartService");
const { validateCart } = require("../utils/validation");

/**
 * 📌 Add Item to Cart
 */
exports.addToCart = async (req, res) => {
  try {
    const { error } = validateCart({
      items: [{ menuItem: req.body.menuItemId, quantity: req.body.quantity }],
    });
    if (error)
      return res.status(400).json({ message: error.details[0].message });

    const userId = req.user.id;
    const { menuItemId, quantity } = req.body;

    const cart = await cartService.addItem(userId, menuItemId, quantity);
    res.status(200).json({ message: "Item added to cart", cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * 📌 Remove Item from Cart
 */
exports.removeFromCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { menuItemId } = req.params;

    const cart = await cartService.removeItem(userId, menuItemId);
    res.status(200).json({ message: "Item removed from cart", cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * 📌 Update Quantity in Cart
 */
exports.updateCartItem = async (req, res) => {
  try {
    const userId = req.user.id;
    const { menuItemId } = req.params;
    const { quantity } = req.body;

    const cart = await cartService.updateItem(userId, menuItemId, quantity);
    res.status(200).json({ message: "Cart updated", cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * 📌 Get User Cart
 */
exports.getCart = async (req, res) => {
  try {
    const cart = await cartService.getUserCart(req.user.id);
    if (!cart) {
      return res.status(200).json({
        message: "Cart is empty",
        cart: { items: [], totalPrice: 0 },
      });
    }
    res.status(200).json({ cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
