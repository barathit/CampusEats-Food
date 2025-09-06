const MenuItem = require("../models/MenuItem");

exports.verifyUser = (req, res, next) => {
  if (!req.user) return res.status(401).json({ error: "Unauthorized" });
  next();
};

exports.verifyVendor = (req, res, next) => {
  if (req.user?.role !== "vendor")
    return res.status(403).json({ error: "Vendor access only" });
  next();
};

exports.checkStock = async (req, res, next) => {
  try {
    for (const item of req.body.items) {
      const menuItem = await MenuItem.findById(item.menuItem);
      if (!menuItem || menuItem.availability < item.quantity) {
        return res.status(400).json({ error: "Out of stock" });
      }
    }
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
