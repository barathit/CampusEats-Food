const MenuItem = require("../models/MenuItem");

// 📌 Vendor: Add Menu Item
exports.addMenuItem = async (req, res) => {
  try {
    const {
      category,
      name,
      description,
      price,
      isVeg,
      availability,
      availableCount,
      image,
      addons,
    } = req.body;

    const menuItem = new MenuItem({
      vendor: req.user.id,
      category,
      name,
      description,
      price,
      isVeg,
      availability,
      availableCount: availableCount || 0,
      image,
      addons,
    });

    await menuItem.save();
    res.status(201).json({ message: "Menu item added successfully", menuItem });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateMenuAvailability = async (req, res) => {
  try {
    const { id } = req.params;
    const { availability, availableCount } = req.body;

    const menuItem = await MenuItem.findOneAndUpdate(
      { _id: id, vendor: req.user.id },
      { availability, availableCount },
      { new: true }
    );

    if (!menuItem)
      return res.status(404).json({ message: "Menu item not found" });

    res.json({ message: "Availability updated", menuItem });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getVendorMenuWithCount = async (req, res) => {
  try {
    const vendorId = req.user.id;
    const menuItems = await MenuItem.find({ vendor: vendorId });

    // Total count for all items
    const totalCount = menuItems.reduce(
      (acc, item) => acc + item.availableCount,
      0
    );

    res.json({
      totalCount,
      menu: menuItems,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📌 Vendor: Update Menu Item
exports.updateMenuItem = async (req, res) => {
  try {
    const { id } = req.params;

    const menuItem = await MenuItem.findOneAndUpdate(
      { _id: id, vendor: req.user.id },
      req.body,
      { new: true }
    );

    if (!menuItem)
      return res.status(404).json({ message: "Menu item not found" });

    res.json({ message: "Menu item updated", menuItem });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📌 Vendor: Delete Menu Item
exports.deleteMenuItem = async (req, res) => {
  try {
    const { id } = req.params;

    const menuItem = await MenuItem.findOneAndDelete({
      _id: id,
      vendor: req.user.id,
    });
    if (!menuItem)
      return res.status(404).json({ message: "Menu item not found" });

    res.json({ message: "Menu item deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📌 Vendor: Get Own Menu
exports.getVendorMenu = async (req, res) => {
  try {
    const menuItems = await MenuItem.find({ vendor: req.user.id });
    res.json({ menu: menuItems });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📌 Student: Browse Menu (by Vendor)
exports.getMenuByVendor = async (req, res) => {
  try {
    const { vendorId } = req.params;
    const menuItems = await MenuItem.find({
      vendor: vendorId,
      availability: true,
    });
    res.json({ menu: menuItems });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📌 Admin: View All Menus
exports.getAllMenus = async (req, res) => {
  try {
    const menuItems = await MenuItem.find().populate(
      "vendor",
      "fullName email"
    );
    res.json({ menu: menuItems });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📌 Admin: Delete Any Menu Item
exports.adminDeleteMenuItem = async (req, res) => {
  try {
    const { id } = req.params;
    const menuItem = await MenuItem.findByIdAndDelete(id);
    if (!menuItem)
      return res.status(404).json({ message: "Menu item not found" });

    res.json({ message: "Menu item deleted by admin" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📌 Search & Filter Menus
exports.searchMenus = async (req, res) => {
  try {
    const { search, category, isVeg, minPrice, maxPrice } = req.query;

    let filter = { availability: true };

    // 🔍 Search by name or description
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    // 📂 Filter by category
    if (category) filter.category = category;

    // 🌱 Veg/Non-Veg
    if (isVeg !== undefined) filter.isVeg = isVeg === "true";

    // 💰 Price Range
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    const menuItems = await MenuItem.find(filter).populate(
      "vendor",
      "fullName email"
    );
    res.json({ results: menuItems.length, menu: menuItems });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
