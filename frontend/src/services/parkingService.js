

const BASE_URL = '/api';

export const parkingService = {
  /** Бүх зогсоол болон үйлчилгээний мэдээллийг авах*/
  getAllData: async () => {
    try {
      const response = await fetch(`${BASE_URL}/parking.json`);
      if (!response.ok) throw new Error('Network response was not ok');
      return await response.json();
    } catch (error) {
      console.error("Fetching parking data failed:", error);
      throw error;
    }
  },

  /**Зөвхөн зогсоолуудыг шүүж авах*/
  getParkingSpots: async () => {
    const data = await parkingService.getAllData();
    return data.parking_spots;
  },

  /**Үйлчилгээнүүдийг төрлөөр нь шүүж авах (washing/repair)*/
  getServicesByType: async (type) => {
    const data = await parkingService.getAllData();
    return data.services.filter(s => s.type === type);
  }
};
