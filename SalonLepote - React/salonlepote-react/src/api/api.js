import axios from "./axios";

export const getClientReservations = async () => {
  return await axios.get("/client/my-reservations");
};

export const getMakeupArtistReservations = async () => {
  return await axios.get("/makeup-artist/my-reservations");
};