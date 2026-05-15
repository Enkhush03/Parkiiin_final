# Parkiiin – Зогсоолын Удирдлагын Систем

## Технологи

| Хэсэг | Технологи |
|---|---|
| Frontend | React 19 + Vite + React Router |
| Backend | Node.js + Express 5 |
| Database | MongoDB + Mongoose |

## Локал ажиллуулах

### 1. MongoDB ажиллуулах
MongoDB локал эсвэл [MongoDB Atlas](https://cloud.mongodb.com) ашиглана.

### 2. Backend
```bash
cd backend
cp .env.example .env    # .env файл үүсгэж утгуудыг бөглөнө
npm install
npm run dev
```

### 3. Frontend
```bash
cd frontend
cp .env.example .env    # .env файл үүсгэж утгуудыг бөглөнө
npm install
npm run dev
```

## AWS Deploy

### Архитектур
```
S3 + CloudFront (Frontend)  →  Elastic Beanstalk (Backend)  →  MongoDB Atlas
```

### Backend – AWS Elastic Beanstalk
1. [AWS Console](https://console.aws.amazon.com) → Elastic Beanstalk → Create Application
2. Platform: **Node.js 20**
3. Zip хийж upload хийнэ (node_modules-гүй):
   ```bash
   # root directory-д
   zip -r parkiiin-backend.zip backend/ Procfile .ebextensions/ --exclude "backend/node_modules/*"
   ```
4. Environment variables тохируулна (Configuration → Software):
   - `MONGO_URI` = MongoDB Atlas connection string
   - `JWT_SECRET` = Аюулгүй урт нууц тэмдэгт мөр
   - `CLIENT_ORIGIN` = CloudFront URL (жишээ: `https://d1234abcd.cloudfront.net`)

### Frontend – AWS S3 + CloudFront
1. Frontend build хийнэ:
   ```bash
   cd frontend
   # .env файлд VITE_API_BASE_URL=<EB URL>/api тохируулна
   npm run build
   ```
2. S3 bucket үүсгэж `frontend/dist/` хавтасны агуулгыг upload хийнэ
3. CloudFront distribution үүсгэж S3-тай холбоно
4. CloudFront → Error Pages → 403 болон 404-г `/index.html`-д redirect хийнэ (SPA routing-д шаардлагатай)

## Environment Variables

### Backend (`backend/.env`)
| Variable | Тайлбар |
|---|---|
| `PORT` | Server port (default: 5000) |
| `MONGO_URI` | MongoDB connection string |
| `JWT_SECRET` | JWT нууц түлхүүр (хамгийн багадаа 32 тэмдэгт) |
| `CLIENT_ORIGIN` | Frontend URL (CORS-д ашиглана) |

### Frontend (`frontend/.env`)
| Variable | Тайлбар |
|---|---|
| `VITE_API_BASE_URL` | Backend API URL |
