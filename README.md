# RENDEREVAL - Professional Render Evaluation Platform# RENDEREVAL - Professional Render Evaluation PlatformThis is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).



## 🎬 Proje Hakkında



RENDEREVAL, **VFX ve Animation projelerinin render kalitesini profesyonel şekilde değerlendiren** web tabanlı bir platformdur. ## 🎬 Proje Hakkında## Getting Started



- 🎨 **Frontend**: Modern Next.js web interface

- 🐍 **Backend**: Kapsamlı Python image analysis engine

- 📊 **16+ Analiz Metrikleri**: Kapsamlı render quality evaluationRENDEREVAL, VFX ve Animation projelerinin render kalitesini profesyonel şekilde değerlendiren web tabanlı bir platformdur. Kullanıcılar projelerini yükleyerek, detaylı analiz sonuçlarını ve değerlendirme raporlarını görebilirler.First, run the development server:

- 🚀 **Production Ready**: Docker support, scalable architecture



---

## 🎨 Özellikler```bash

## ✨ Ana Özellikler

npm run dev

### 🎯 İki Analiz Modu

- **VFX Mode**: Compositing, color separation, alpha quality- **İki Mod Seçeneği**: VFX ve Animation analiz modları# or

- **Animation Mode**: Motion smoothness, frame consistency, gradient analysis

- **Proje Yönetimi**: Shot management ve detaylı proje bilgileriyarn dev

### 📊 Kapsamlı Analiz Metrikleri

- **Teknik**: Resolution, Noise, Contrast, Sharpness- **Multi-Tab Analysis**: Sanatçılar, zaman, mekan ve diğer parametreler# or

- **Renk**: Color Grading, Balance, Saturation

- **Komposisyon**: Composition, Visual Balance, Focus Areas- **Gerçek-zamanlı Evaluasyon**: Hızlı ve güvenilir analizpnpm dev

- **Artifacts**: Banding, Compression, General Artifacts

- **İleri**: Dynamic Range, Lighting, Type-specific Metrics- **Profesyonel UI**: Modern, dark theme arayüz (#1F1F1E arka plan)# or



### 🎨 Profesyonel UI- **Rapor Sistemi**: Detaylı sonuç ve rapor sayfalarıbun dev

- Dark theme (#1F1F1E arka plan)

- Smooth hover effects (#5B8BB8)```

- Responsive design

- Multi-page workflow## 🛠 Teknoloji Stack



### 📄 Detaylı RaporlarOpen [http://localhost:3000](http://localhost:3000) with your browser to see the result.

- Overall Score (0-100)

- Status Badges (APPROVED/REVISION_REQUIRED/REJECTED)- **Frontend**: Next.js 16+, React 19, TypeScript

- Smart Recommendations (8+ suggestions)

- Detailed metrics breakdown- **Styling**: Tailwind CSS v4, Inline CSSYou can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.



---- **Backend**: Next.js API Routes



## 🛠 Teknoloji Stack- **Runtime**: Node.js 18+This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.



### Frontend

- **Next.js** 16.2.2 - React 19

- **TypeScript** - Type safety## 📦 Kurulum## Learn More

- **Tailwind CSS** v4 - Styling

- **Lucide React** - Icons



### Backend### GereksinimlerTo learn more about Next.js, take a look at the following resources:

- **Python 3.13** - Image analysis

- **Flask** 3.0 - REST API- Node.js 18+

- **OpenCV** 4.13 - Computer vision

- **NumPy/SciPy** - Scientific computing- npm veya yarn- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.

- **PIL/Pillow** - Image processing

- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

### Infrastructure

- **Docker** - Containerization### Adımlar

- **Docker Compose** - Orchestration

- **Vercel** - Frontend deploymentYou can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!



---1. **Proje klonla**:



## 📦 Kurulum & Çalıştırma```bash## Deploy on Vercel



### Option 1: Local Development (Recommended)git clone <repo-url>



#### Frontend Setupcd alireza-projectThe easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

```bash

# Frontend dependencies```

npm install

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# Frontend development server

npm run dev2. **Bağımlılıkları yükle**:

# → http://localhost:3000```bash

```npm install

```

#### Backend Setup

```bash3. **Geliştirme sunucusunu başlat**:

cd backend```bash

npm run dev

# Create virtual environment```

python3.13 -m venv venv

source venv/bin/activate4. **Tarayıcıda aç**:

```

# Install dependencieshttp://localhost:3000

pip install -r requirements.txt```



# Run Flask server (port 8000)## 📁 Proje Yapısı

export FLASK_PORT=8000

python app.py```

# → http://localhost:8000alireza-project/

```├── app/

│   ├── page.tsx              # Ana sayfa (Home)

### Option 2: Docker Compose (Full Stack)│   ├── project/

│   │   └── page.tsx          # Proje detay sayfası

```bash│   ├── analysis/

docker-compose up│   │   └── page.tsx          # Analiz sayfası

# → Frontend: http://localhost:3000│   ├── results/

# → Backend: http://localhost:8000│   │   └── page.tsx          # Sonuçlar sayfası

```│   ├── report/

│   │   └── page.tsx          # Rapor sayfası

### Option 3: Production Deployment│   ├── api/

│   │   └── analyze/

#### Frontend → Vercel│   │       └── route.ts      # Fake analyze endpoint

```bash│   ├── layout.tsx            # Root layout

vercel│   └── globals.css           # Global stiller

```├── public/                   # Static dosyalar

├── .env.local                # Environment variables (git ignored)

#### Backend → Railway/Render├── package.json

```bash└── tsconfig.json

# Build Docker image```

docker build -t rendereval-backend ./backend

## 🎯 Kullanım Akışı

# Deploy to service (Railway, Render, etc)

# Set FLASK_PORT environment variable1. **Home Sayfası**: VFX veya Animation seç

```2. **Project Details**: 

   - Proje adı gir

---   - Sequence numarası gir

   - Total frame sayısı belirt

## 🚀 API Endpoints   - Shot açıklaması ekle

3. **Shot Upload**: 

### Backend API (Python Flask)   - Previous Shot (opsiyonel)

   - Main Shot (zorunlu)

#### Health Check   - Next Shot (opsiyonel)

```http4. **Analysis**: 

GET /health   - Sanatçıları seç

```   - Zaman dönemini belirt

   - Mekan tipini seç

#### Analyze Single Image   - Mood tanımı yap

```http5. **Results**: Analiz sonuçlarını görüntüle

POST /api/analyze6. **Report**: Detaylı rapor indir

Content-Type: multipart/form-data

## 🎨 Renk Şeması

- image: [binary file]

- type: 'vfx' or 'animation'```

```Primary Background:   #1F1F1E (RGB 31, 31, 30)

Secondary Background: #000000 (Siyah - Navbar)

**Response:**Details Panel:        #393D3D (RGB 57, 59, 61)

```jsonPrimary Button:       #3B82F6 (Mavi)

{Hover Color:          #5B8BB8 (RGB 91, 139, 184)

  "success": true,Text Primary:         #FFFFFF (Beyaz)

  "overall_score": 87,Text Secondary:       #9CA3AF (Gri)

  "status": "APPROVED",```

  "metrics": {

    "technical": { "resolution": 90, "noise": 80, ... },## 🚀 Deployment

    "color": { "grading": 85, "balance": 88, ... },

    "composition": { "composition": 85, "balance": 82, ... },### Vercel'e Deploy

    "artifacts": { "general": 82, "banding": 80, ... },

    "advanced": { "dynamic_range": 88, "lighting": 85, ... }```bash

  },npm install -g vercel

  "recommendations": [vercel

    "✅ Excellent render quality!",```

    "...more suggestions"

  ],### Self-Hosted

  "image_info": {

    "resolution": "1920x1080",```bash

    "aspect_ratio": "1.78"npm run build

  }npm start

}```

```

## 📝 Environment Variables

#### Batch Analyze

```http```bash

POST /api/batch-analyze# .env.local

Content-Type: multipart/form-dataOPENROUTER_API_KEY=your_api_key_here  # (Opsiyonel - gelecek için)

```

- images: [multiple files]

- type: 'vfx' or 'animation'## 🔍 Sayfa Açıklamaları

```

### Home Page (`/`)

#### Get Settings- RENDEREVAL başlığı

```http- VFX ve ANİMATİON seçim butonları

GET /api/settings- Smooth hover effects

```

### Project Page (`/project?type=vfx|animation`)

---- Üç zone upload alanı (Previous, Main, Next)

- Sağ sidebar'da proje detayları

## 📁 Proje Yapısı- Continue butonu



```### Analysis Page (`/analysis?type=vfx|animation`)

rendereval/- 6 tab: Artists, Time, Location, Mood, Frames, Deadline

├── frontend/- Checkbox ve radio button seçenekleri

│   ├── app/- Submit butonu

│   │   ├── page.tsx              # Home page (VFX/Animation selection)

│   │   ├── project/              # Project details### Results Page (`/results?type=vfx|animation`)

│   │   ├── analysis/             # Analysis configuration- Overall score gösterimi

│   │   ├── results/              # Results display- Metrics dashboard

│   │   ├── report/               # Report generation- Status badge

│   │   ├── api/analyze/          # API proxy route- Supervisor notes

│   │   ├── layout.tsx            # Root layout

│   │   └── globals.css           # Global styles### Report Page (`/report?type=vfx|animation`)

│   ├── public/                   # Static assets- Detaylı rapor view'ı

│   ├── package.json- Export seçenekleri

│   └── tsconfig.json- Print friendly format

│

├── backend/## 💡 Fake Analyze Sistemi

│   ├── app.py                    # Flask server

│   ├── analyzer.py               # Comprehensive image analyzer (16 metrics)Şu anda `/api/analyze` endpoint'i fake data döndürmektedir:

│   ├── requirements.txt          # Python dependencies- Random score (70-100 arası)

│   ├── Dockerfile                # Docker config- Random metrics

│   ├── .env.example              # Configuration template- Örnek supervisor notes

│   └── README.md                 # Backend documentation- Placeholder summary

│

├── docker-compose.yml            # Full stack orchestrationGelecekte gerçek AI integasyonu için `/api/analyze/route.ts` dosyası güncellenebilir.

└── README.md                     # This file

```## 🐛 Troubleshooting



---### Port 3000 kullanımda

```bash

## 🎯 Kullanım Akışınpm run dev -- -p 3001

```

1. **Ana Sayfa** (`/`)

   - VFX veya Animation modunu seç### Cache sorunu

- Tarayıcı: Hard refresh (Cmd+Shift+R)

2. **Proje Detayları** (`/project`)- Terminal: `npm run dev` yeniden başlat

   - Proje bilgileri gir

   - Shot dosyalarını yükle (Previous, Main, Next)### Build hatası

```bash

3. **Analiz Konfigürasyonu** (`/analysis`)npm install

   - Sanatçıları seçnpm run build

   - Zaman, mekan, mood parametreleri ayarla```

   - Analysis başlat

## 📚 Kaynaklar

4. **Sonuçlar** (`/results`)

   - Overall score görüntüle- [Next.js Docs](https://nextjs.org/docs)

   - Detaylı metrikleri analiz et- [React 19 Docs](https://react.dev)

   - Recommendations oku- [Tailwind CSS v4](https://tailwindcss.com)



5. **Rapor** (`/report`)## 📄 Lisans

   - Detaylı rapor indir

   - Export seçenekleriMIT License



---## 👨‍💻 Geliştirici



## 🎨 Renk ŞemasıEmre - RENDEREVAL Project



```---

Primary Background:    #1F1F1E

Secondary Background:  #000000 (Navbar)**Versiyon**: 1.0.0  

Details Panel:         #393D3D**Son Güncelleme**: 27 Nisan 2026  

Primary Button:        #3B82F6 (Mavi)**Durum**: Frontend Ready - Müşteri Sunuma Hazır ✅

Hover Color:           #5B8BB8
Text Primary:          #FFFFFF
Text Secondary:        #9CA3AF
```

---

## 📊 Analyzer Metrikleri (16 Analiz)

### Technical (4)
- **Resolution**: 4K, Full HD, HD, SD evaluation
- **Sharpness**: Laplacian variance analysis
- **Noise**: Laplacian-based noise detection
- **Contrast**: Standard deviation measurement

### Color (3)
- **Color Grading**: HSV consistency check
- **Color Balance**: RGB channel balance
- **Saturation**: Saturation level analysis

### Composition (3)
- **Composition**: Edge density analysis
- **Visual Balance**: Quadrant variance check
- **Focus Areas**: Corner detection

### Artifacts (3)
- **General Artifacts**: Entropy-based detection
- **Banding**: Color banding detection
- **Compression**: DCT-based compression analysis

### Advanced (3)
- **Dynamic Range**: Min-Max analysis
- **Lighting**: Brightness analysis
- **Type Quality**: VFX/Animation specific metrics

---

## 🔧 Konfigürasyon

### Frontend .env
```bash
# Backend API URL (for real analysis)
BACKEND_API_URL=http://localhost:8000

# Use backend or mock analysis
USE_BACKEND_ANALYSIS=true
```

### Backend .env
```bash
FLASK_PORT=8000
FLASK_DEBUG=False
FLASK_ENV=production

# CORS settings
CORS_ORIGINS=http://localhost:3000

# File upload limits
MAX_FILE_SIZE_MB=500
ALLOWED_FORMATS=png,jpg,jpeg,bmp,tiff,exr
```

---

## 🧪 Testing

### Test Image Analysis
```bash
# Single image
curl -X POST \
  -F "image=@test_image.png" \
  -F "type=vfx" \
  http://localhost:8000/api/analyze

# Response with full metrics
```

### Test Batch Analysis
```bash
curl -X POST \
  -F "images=@image1.png" \
  -F "images=@image2.png" \
  -F "type=animation" \
  http://localhost:8000/api/batch-analyze
```

---

## 📚 Kaynaklar

- [Next.js Docs](https://nextjs.org/docs)
- [React 19](https://react.dev)
- [Flask Docs](https://flask.palletsprojects.com)
- [OpenCV Docs](https://docs.opencv.org)
- [Docker Docs](https://docs.docker.com)

---

## 🚀 Deployment

### Vercel (Frontend)
```bash
vercel deploy
# → https://rendereval.vercel.app
```

### Railway/Render (Backend)
1. Connect GitHub repo
2. Set environment variables:
   - `FLASK_PORT=8000`
   - `FLASK_ENV=production`
3. Deploy

### Self-Hosted
```bash
# Build backend
docker build -t rendereval-backend ./backend

# Run with Docker Compose
docker-compose up -d
```

---

## 📄 Lisans

MIT License

---

## 👨‍💻 Support

For issues or questions:
1. Check `/backend/README.md` for backend details
2. Review API documentation
3. Check Docker/deployment guides

---

**Versiyon**: 1.0.0  
**Son Güncelleme**: 28 Nisan 2026  
**Durum**: Production Ready ✅

---

## 🎬 RENDEREVAL - AI-Powered Professional Render Evaluation

_Render kalitesini otomatik olarak analiz et, detaylı metrikleri elde et, profesyonel raporlar oluştur._
