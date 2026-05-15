
import { apiUrl } from './api';

export const userService = {
 
  getTips: async () => {
    try {
      const response = await fetch(apiUrl('/tips'));
      if (!response.ok) throw new Error('Network response was not ok');
      return await response.json();
    } catch (error) {
      console.error("Fetching tips failed:", error);
      throw error;
    }
  },

  /**
   * Хэрэглэгчийн бүртгэл/профайл мэдээлэл авах
   * Backend API-аар MongoDB-ээс уншина.
   */
  getUserProfile: async () => {
    try {
      const response = await fetch(apiUrl('/user-profile'));
      if (!response.ok) throw new Error('Network response was not ok');
      return await response.json();
    } catch (error) {
      console.error("Fetching user profile failed:", error);
      throw error;
    }
  }
};
