
import { apiUrl } from './api';

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
  }
};
