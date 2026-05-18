
import { apiUrl } from './api';

export const userService = {
 
  getTips: async () => {
    try {
      const response = await fetch(apiUrl('/tips'));
      if (!response.ok) throw new Error('API failed');
      return await response.json();
    } catch {
      // API амжилтгүй бол статик JSON-оос уншина
      const fallback = await fetch('/api/tips.json');
      return await fallback.json();
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
