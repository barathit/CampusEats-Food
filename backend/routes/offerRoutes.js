const express = require("express");
const router = express.Router();

const offerController = require("../controllers/offerController");
const authMiddleware = require("../middleware/authMiddleware");

/**
 * ===========================
 * 📌 Offer & Discounts Routes
 * ===========================
 * - Create new offer (Vendor/Admin only)
 * - Get active offers
 * - Update offer
 * - Delete offer
 */

// ✅ Create new offer
router.post(
  "/",
  authMiddleware,
  offerController.createOffer.bind(offerController)
);

// ✅ Get active offers (visible to users in home/offers page)
router.get("/", offerController.getActiveOffers.bind(offerController));

// ✅ Update offer
router.put(
  "/:id",
  authMiddleware,
  offerController.updateOffer.bind(offerController)
);

// ✅ Delete offer
router.delete(
  "/:id",
  authMiddleware,
  offerController.deleteOffer.bind(offerController)
);

module.exports = router;
