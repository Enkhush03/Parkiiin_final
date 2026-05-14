import { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import s from './AdminParking.module.css';

export default function AdminParking() {
  const [spots, setSpots] = useState([]);
  const [formData, setFormData] = useState({
    spotId: '',
    name: '',
    loc: '',
    price: '',
    slots: '',
    rating: '5.0',
    emoji: '🅿️'
  });

  // Fetch spots on load
  const loadSpots = () => {
    fetch('http://localhost:5000/api/parking')
      .then(res => res.json())
      .then(data => setSpots(data.PARKING_SPOTS || []))
      .catch(err => console.error("Error loading spots:", err));
  };

  useEffect(() => {
    loadSpots();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddSpot = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/parking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          spotId: formData.spotId,
          name: formData.name,
          loc: formData.loc,
          price: Number(formData.price),
          slots: Number(formData.slots),
          dist: 1.0, // Default for testing
          rating: Number(formData.rating),
          cssClass: 'c1',
          badge: `${formData.slots} зогсоол`,
          emoji: formData.emoji,
          markerPrice: `${formData.price}₮`,
          markerSlots: `${formData.slots} зогсоол`,
          markerLoc: formData.loc
        })
      });

      if (response.ok) {
        alert('Амжилттай нэмэгдлээ!');
        loadSpots();
        setFormData({ spotId: '', name: '', loc: '', price: '', slots: '', rating: '5.0', emoji: '🅿️' });
      } else {
        const err = await response.json();
        alert('Алдаа гарлаа: ' + err.message);
      }
    } catch (error) {
      console.error(error);
      alert('Сэрвэртэй холбогдож чадсангүй.');
    }
  };

  const handleDelete = async (spotId) => {
    if (!window.confirm('Энэ зогсоолыг устгах уу?')) return;
    
    try {
      const response = await fetch(`http://localhost:5000/api/parking/${spotId}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        loadSpots();
      } else {
        alert('Устгахад алдаа гарлаа.');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Navbar />
      <div className={s.adminContainer}>
        <h2>Админ - Зогсоол Удирдах</h2>
        
        <div className={s.grid}>
          {/* Add Form */}
          <div className={s.formCard}>
            <h3>Шинэ зогсоол нэмэх</h3>
            <form onSubmit={handleAddSpot} className={s.form}>
              <input type="text" name="spotId" placeholder="ID (жишээ нь: emart)" value={formData.spotId} onChange={handleInputChange} required />
              <input type="text" name="name" placeholder="Зогсоолын нэр" value={formData.name} onChange={handleInputChange} required />
              <input type="text" name="loc" placeholder="Хаяг, байршил" value={formData.loc} onChange={handleInputChange} required />
              <input type="number" name="price" placeholder="Цагийн үнэ (₮)" value={formData.price} onChange={handleInputChange} required />
              <input type="number" name="slots" placeholder="Сул зогсоолын тоо" value={formData.slots} onChange={handleInputChange} required />
              <button type="submit" className={s.submitBtn}>Хадгалах</button>
            </form>
          </div>

          {/* List of Spots */}
          <div className={s.listCard}>
            <h3>Одоо байгаа зогсоолууд ({spots.length})</h3>
            <div className={s.spotList}>
              {spots.map(spot => (
                <div key={spot.id} className={s.spotItem}>
                  <div>
                    <strong>{spot.name}</strong>
                    <p>{spot.loc}</p>
                    <small>{spot.price}₮ | {spot.slots} зогсоол</small>
                  </div>
                  <button onClick={() => handleDelete(spot.id)} className={s.deleteBtn}>Устгах</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
