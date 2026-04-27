# RENDEREVAL - Professional Render Evaluation PlatformThis is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).



## 🎬 Proje Hakkında## Getting Started



RENDEREVAL, VFX ve Animation projelerinin render kalitesini profesyonel şekilde değerlendiren web tabanlı bir platformdur. Kullanıcılar projelerini yükleyerek, detaylı analiz sonuçlarını ve değerlendirme raporlarını görebilirler.First, run the development server:



## 🎨 Özellikler```bash

npm run dev

- **İki Mod Seçeneği**: VFX ve Animation analiz modları# or

- **Proje Yönetimi**: Shot management ve detaylı proje bilgileriyarn dev

- **Multi-Tab Analysis**: Sanatçılar, zaman, mekan ve diğer parametreler# or

- **Gerçek-zamanlı Evaluasyon**: Hızlı ve güvenilir analizpnpm dev

- **Profesyonel UI**: Modern, dark theme arayüz (#1F1F1E arka plan)# or

- **Rapor Sistemi**: Detaylı sonuç ve rapor sayfalarıbun dev

```

## 🛠 Teknoloji Stack

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

- **Frontend**: Next.js 16+, React 19, TypeScript

- **Styling**: Tailwind CSS v4, Inline CSSYou can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

- **Backend**: Next.js API Routes

- **Runtime**: Node.js 18+This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.



## 📦 Kurulum## Learn More



### GereksinimlerTo learn more about Next.js, take a look at the following resources:

- Node.js 18+

- npm veya yarn- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.

- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

### Adımlar

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

1. **Proje klonla**:

```bash## Deploy on Vercel

git clone <repo-url>

cd alireza-projectThe easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

```

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

2. **Bağımlılıkları yükle**:
```bash
npm install
```

3. **Geliştirme sunucusunu başlat**:
```bash
npm run dev
```

4. **Tarayıcıda aç**:
```
http://localhost:3000
```

## 📁 Proje Yapısı

```
alireza-project/
├── app/
│   ├── page.tsx              # Ana sayfa (Home)
│   ├── project/
│   │   └── page.tsx          # Proje detay sayfası
│   ├── analysis/
│   │   └── page.tsx          # Analiz sayfası
│   ├── results/
│   │   └── page.tsx          # Sonuçlar sayfası
│   ├── report/
│   │   └── page.tsx          # Rapor sayfası
│   ├── api/
│   │   └── analyze/
│   │       └── route.ts      # Fake analyze endpoint
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Global stiller
├── public/                   # Static dosyalar
├── .env.local                # Environment variables (git ignored)
├── package.json
└── tsconfig.json
```

## 🎯 Kullanım Akışı

1. **Home Sayfası**: VFX veya Animation seç
2. **Project Details**: 
   - Proje adı gir
   - Sequence numarası gir
   - Total frame sayısı belirt
   - Shot açıklaması ekle
3. **Shot Upload**: 
   - Previous Shot (opsiyonel)
   - Main Shot (zorunlu)
   - Next Shot (opsiyonel)
4. **Analysis**: 
   - Sanatçıları seç
   - Zaman dönemini belirt
   - Mekan tipini seç
   - Mood tanımı yap
5. **Results**: Analiz sonuçlarını görüntüle
6. **Report**: Detaylı rapor indir

## 🎨 Renk Şeması

```
Primary Background:   #1F1F1E (RGB 31, 31, 30)
Secondary Background: #000000 (Siyah - Navbar)
Details Panel:        #393D3D (RGB 57, 59, 61)
Primary Button:       #3B82F6 (Mavi)
Hover Color:          #5B8BB8 (RGB 91, 139, 184)
Text Primary:         #FFFFFF (Beyaz)
Text Secondary:       #9CA3AF (Gri)
```

## 🚀 Deployment

### Vercel'e Deploy

```bash
npm install -g vercel
vercel
```

### Self-Hosted

```bash
npm run build
npm start
```

## 📝 Environment Variables

```bash
# .env.local
OPENROUTER_API_KEY=your_api_key_here  # (Opsiyonel - gelecek için)
```

## 🔍 Sayfa Açıklamaları

### Home Page (`/`)
- RENDEREVAL başlığı
- VFX ve ANİMATİON seçim butonları
- Smooth hover effects

### Project Page (`/project?type=vfx|animation`)
- Üç zone upload alanı (Previous, Main, Next)
- Sağ sidebar'da proje detayları
- Continue butonu

### Analysis Page (`/analysis?type=vfx|animation`)
- 6 tab: Artists, Time, Location, Mood, Frames, Deadline
- Checkbox ve radio button seçenekleri
- Submit butonu

### Results Page (`/results?type=vfx|animation`)
- Overall score gösterimi
- Metrics dashboard
- Status badge
- Supervisor notes

### Report Page (`/report?type=vfx|animation`)
- Detaylı rapor view'ı
- Export seçenekleri
- Print friendly format

## 💡 Fake Analyze Sistemi

Şu anda `/api/analyze` endpoint'i fake data döndürmektedir:
- Random score (70-100 arası)
- Random metrics
- Örnek supervisor notes
- Placeholder summary

Gelecekte gerçek AI integasyonu için `/api/analyze/route.ts` dosyası güncellenebilir.

## 🐛 Troubleshooting

### Port 3000 kullanımda
```bash
npm run dev -- -p 3001
```

### Cache sorunu
- Tarayıcı: Hard refresh (Cmd+Shift+R)
- Terminal: `npm run dev` yeniden başlat

### Build hatası
```bash
npm install
npm run build
```

## 📚 Kaynaklar

- [Next.js Docs](https://nextjs.org/docs)
- [React 19 Docs](https://react.dev)
- [Tailwind CSS v4](https://tailwindcss.com)

## 📄 Lisans

MIT License

## 👨‍💻 Geliştirici

Emre - RENDEREVAL Project

---

**Versiyon**: 1.0.0  
**Son Güncelleme**: 27 Nisan 2026  
**Durum**: Frontend Ready - Müşteri Sunuma Hazır ✅
