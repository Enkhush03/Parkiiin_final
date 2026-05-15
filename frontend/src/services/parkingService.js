
import { apiUrl } from './api';

const requestJson = async (path) => {
  const response = await fetch(apiUrl(path));
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};

export const parkingService = {
  /** Бүх зогсоол болон үйлчилгээний мэдээллийг авах*/
  getAllData: async () => {
    try {
      const [parkingData, serviceData] = await Promise.all([
        requestJson('/parking'),
        requestJson('/services')
      ]);

      return {
        ...parkingData,
        parking_spots: parkingData.parking_spots || parkingData.PARKING_SPOTS || [],
        services: serviceData.services || []
      };
    } catch (error) {
      console.error("Fetching parking data failed:", error);
      throw error;
    }
  },

  /**Зөвхөн зогсоолуудыг шүүж авах*/
  getParkingSpots: async () => {
    const data = await requestJson('/parking');
    return data.PARKING_SPOTS || data.parking_spots || [];
  },

  /**Үйлчилгээнүүдийг төрлөөр нь шүүж авах (washing/repair)*/
  getServicesByType: async (type) => {
    const data = await requestJson(`/services?type=${encodeURIComponent(type)}`);
    return data.services || [];
  }
};
