const Cart = require("../models/Cart");
const MenuItem = require("../models/MenuItem");

/**
 * ➕ Add Item to Cart
 */
exports.addItem = async (userId, menuItemId, quantity) => {
  const menuItem = await MenuItem.findById(menuItemId);
  if (!menuItem) throw new Error("Menu item not found");

  let cart = await Cart.findOne({ user: userId });

  if (!cart) {
    cart = new Cart({
      user: userId,
      items: [{ menuItem: menuItemId, quantity, price: menuItem.price }],
      totalPrice: menuItem.price * quantity,
    });
  } else {
    const existingItem = cart.items.find(
      (item) => item.menuItem.toString() === menuItemId
    );

    if (existingItem) {
      existingItem.quantity += quantity;
      existingItem.price = menuItem.price;
    } else {
      cart.items.push({
        menuItem: menuItemId,
        quantity,
        price: menuItem.price,
      });
    }

    cart.totalPrice = cart.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  }

  await cart.save();
  return cart;
};

/**
 * ➖ Remove Item
 */
exports.removeItem = async (userId, menuItemId) => {
  const cart = await Cart.findOne({ user: userId });
  if (!cart) throw new Error("Cart not found");

  cart.items = cart.items.filter(
    (item) => item.menuItem.toString() !== menuItemId
  );
  cart.totalPrice = cart.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  await cart.save();
  return cart;
};

/**
 * 🔄 Update Item Quantity
 */
exports.updateItem = async (userId, menuItemId, quantity) => {
  const cart = await Cart.findOne({ user: userId });
  if (!cart) throw new Error("Cart not found");

  const item = cart.items.find((i) => i.menuItem.toString() === menuItemId);
  if (!item) throw new Error("Item not found in cart");

  item.quantity = quantity;

  cart.totalPrice = cart.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  await cart.save();
  return cart;
};

/**
 * 🛒 Get User Cart
 */
exports.getUserCart = async (userId) => {
  return await Cart.findOne({ user: userId }).populate("items.menuItem");
};
