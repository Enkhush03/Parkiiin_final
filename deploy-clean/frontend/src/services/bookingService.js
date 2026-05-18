
import { apiUrl, authFetch } from './api';

export const bookingService = {
  /*Захиалгын тохиргоо болон тарифын мэдээлэл авах*/
  getBookingConfig: async () => {
    try {
      const response = await fetch(apiUrl('/booking'));
      if (!response.ok) throw new Error('Network response was not ok');
      return await response.json();
    } catch (error) {
      console.error("Fetching booking config failed:", error);
      throw error;
    }
  },

  /* MongoDB-д захиалга хадгалах */
  saveOrder: async (orderData) => {
    try {
      const response = await authFetch(apiUrl('/orders'), {
        method: 'POST',
        body: JSON.stringify(orderData)
      });
      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message || 'Захиалга хадгалахад алдаа гарлаа');
      }
      return await response.json();
    } catch (error) {
      console.error("Saving order failed:", error);
      throw error;
    }
  },

  /* Хэрэглэгчийн захиалгын түүх авах */
  getUserOrders: async (userId) => {
    try {
      const response = await authFetch(apiUrl(`/orders/user/${userId}`));
      if (!response.ok) throw new Error('Захиалгын түүх авахад алдаа гарлаа');
      return await response.json();
    } catch (error) {
      console.error("Fetching orders failed:", error);
      throw error;
    }
  }
};
