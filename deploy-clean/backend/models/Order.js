const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    userName: { type: String, default: '' },
    type: {
        type: String,
        enum: ['parking', 'washing', 'wash', 'repair', 'service'],
        required: true
    },
    name: { type: String, required: true },       // Зогсоол/үйлчилгээний нэр
    loc: { type: String, default: '' },            // Байршил
    price: { type: Number, required: true },       // Нийт төлбөр
    hour: { type: Number, default: null },         // Зогсоолын цаг (зогсоолд)
    payment: { type: String, default: 'qpay' },   // Төлбөрийн хэрэгсэл
    vehicle: {                                     // Сонгосон машины мэдээлэл
        model: { type: String, default: '' },
        plate: { type: String, default: '' },
        emoji: { type: String, default: '🚗' }
    },
    status: {
        type: String,
        enum: ['active', 'completed', 'cancelled'],
        default: 'active'
    },
    orderId: { type: String, default: '' }         // #88219 хэлбэртэй ID
}, { timestamps: true });

// Захиалга хадгалахын өмнө orderId автоматаар үүсгэх
OrderSchema.pre('save', function() {
    if (!this.orderId) {
        this.orderId = '#' + Math.floor(10000 + Math.random() * 90000).toString();
    }
});

module.exports = mongoose.model('Order', OrderSchema);
