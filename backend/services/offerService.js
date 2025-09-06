const Offer = require("../models/Offer");

class OfferService {
  async createOffer(data) {
    return await Offer.create(data);
  }

  async getActiveOffers() {
    const now = new Date();
    return await Offer.find({
      isActive: true,
      startDate: { $lte: now },
      endDate: { $gte: now },
    })
      .populate("vendor", "name email")
      .populate("items", "name price");
  }

  async updateOffer(id, data) {
    return await Offer.findByIdAndUpdate(id, data, { new: true })
      .populate("vendor", "name email")
      .populate("items", "name price");
  }

  async deleteOffer(id) {
    return await Offer.findByIdAndDelete(id);
  }
}

module.exports = new OfferService();
