// This file contains mock data for shipping costs and messages for different countries.
export const shippingData = {
  India: {
    cost: 0,
    message: "Shipping is free across India. No additional charges apply.",          
  },
  USA: {
    cost: 999,
    isJewelry: false,
    jewelrySurcharges: 500,
    message: "",
  },
};

shippingData.USA.message =  `Affordable cost of ${shippingData.USA.cost}/kg for all orders shipped from India to the USA!`;

export default shippingData;