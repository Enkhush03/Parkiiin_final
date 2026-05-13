

const BASE_URL = 'http://localhost:5000/api';

export const userService = {
 
  getTips: async () => {
    try {
      const response = await fetch(`${BASE_URL}/tips`);
      if (!response.ok) throw new Error('Network response was not ok');
      return await response.json();
    } catch (error) {
      console.error("Fetching tips failed:", error);
      throw error;
    }
  },

  /**
   * Хэрэглэгчийн бүртгэл/профайл мэдээлэл авах
   * (Одоогоор статик JSON ашиглаж байна)
   */
  getUserProfile: async () => {
    try {
      const response = await fetch(`${BASE_URL}/user.json`);
      if (!response.ok) throw new Error('Network response was not ok');
      return await response.json();
    } catch (error) {
      console.error("Fetching user profile failed:", error);
      throw error;
    }
  }
};
