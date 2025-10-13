import axios from "axios";
import config from "./config";

const API_BASE_URL = `${config.BASE_URL}/offers`;

console.log("Offer API Base URL:", API_BASE_URL);

// ================== CREATE OFFER ==================
export const createOffer = async (offerData, token) => {
  const res = await axios.post(API_BASE_URL, offerData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// ================== GET ACTIVE OFFERS ==================
export const getActiveOffers = async () => {
  const res = await axios.get(`${API_BASE_URL}/active`);
  return res.data;
};

// ================== UPDATE OFFER ==================
export const updateOffer = async (offerId, offerData, token) => {
  const res = await axios.put(`${API_BASE_URL}/${offerId}`, offerData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// ================== DELETE OFFER ==================
export const deleteOffer = async (offerId, token) => {
  const res = await axios.delete(`${API_BASE_URL}/${offerId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
