const offerService = require("../services/offerService");

class OfferController {
  async createOffer(req, res) {
    try {
      const offer = await offerService.createOffer(req.body);
      res.status(201).json({ success: true, offer });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async getActiveOffers(req, res) {
    try {
      const offers = await offerService.getActiveOffers();
      res.status(200).json({ success: true, offers });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async updateOffer(req, res) {
    try {
      const updatedOffer = await offerService.updateOffer(
        req.params.id,
        req.body
      );
      res.status(200).json({ success: true, updatedOffer });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async deleteOffer(req, res) {
    try {
      await offerService.deleteOffer(req.params.id);
      res
        .status(200)
        .json({ success: true, message: "Offer deleted successfully" });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }
}

module.exports = new OfferController();
