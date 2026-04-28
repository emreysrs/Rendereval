# RENDEREVAL Backend

Python Flask API backend for professional render image analysis.

## 🎨 Features

- **Image Analysis**: Detailed render quality metrics
- **VFX/Animation Support**: Type-specific analysis
- **Batch Processing**: Analyze multiple images
- **RESTful API**: Easy integration
- **Docker Support**: Container-ready

## 📦 Installation

### Local Setup

1. **Create virtual environment**:
```bash
python3 -m venv venv
source venv/bin/activate  # macOS/Linux
# or
venv\Scripts\activate  # Windows
```

2. **Install dependencies**:
```bash
pip install -r requirements.txt
```

3. **Create .env file**:
```bash
cp .env.example .env
```

4. **Run server**:
```bash
python app.py
```

Server runs on `http://localhost:5000`

### Docker Setup

```bash
docker build -t rendereval-backend .
docker run -p 5000:5000 rendereval-backend
```

## 🚀 API Endpoints

### Health Check
```http
GET /health
```

### Analyze Single Image
```http
POST /api/analyze
Content-Type: multipart/form-data

- image: [binary file]
- type: 'vfx' or 'animation'
```

**Response**:
```json
{
  "success": true,
  "overall_score": 87,
  "status": "APPROVED",
  "metrics": {
    "resolution": 90,
    "color_grading": 85,
    "noise_level": 80,
    "contrast": 88,
    "composition": 85,
    "artifacts": 82,
    "type_quality": 85
  },
  "recommendations": [
    "Excellent render quality!"
  ]
}
```

### Analyze Multiple Images
```http
POST /api/batch-analyze
Content-Type: multipart/form-data

- images: [binary files array]
- type: 'vfx' or 'animation'
```

**Response**:
```json
{
  "success": true,
  "results": [
    { /* individual results */ }
  ],
  "summary": {
    "total_analyzed": 5,
    "average_score": 84,
    "passed": 4,
    "needs_revision": 1,
    "rejected": 0
  }
}
```

### Get Settings
```http
GET /api/settings
```

## 📊 Metrics Analyzed

- **Resolution**: Image dimensions and quality
- **Color Grading**: Color consistency and balance
- **Noise Level**: Rendering noise presence
- **Contrast**: Image contrast quality
- **Composition**: Frame composition analysis
- **Artifacts**: Detection of rendering artifacts
- **Type Quality**: VFX/Animation specific quality

## 📋 Supported Formats

- PNG
- JPG/JPEG
- BMP
- TIFF
- EXR (OpenEXR)

## ⚙️ Configuration

Edit `.env` file:

```bash
# Server
FLASK_PORT=5000
FLASK_DEBUG=False

# CORS (Frontend URLs)
CORS_ORIGINS=http://localhost:3000

# File Upload
MAX_FILE_SIZE_MB=500
ALLOWED_FORMATS=png,jpg,jpeg,bmp,tiff,exr
```

## 🐳 Docker Compose (Full Stack)

From project root:

```bash
docker-compose up
```

- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:5000`

## 🧪 Testing

### Test Health Endpoint
```bash
curl http://localhost:5000/health
```

### Test Image Analysis
```bash
curl -X POST \
  -F "image=@path/to/image.png" \
  -F "type=vfx" \
  http://localhost:5000/api/analyze
```

## 📚 Analysis Details

### VFX Analysis
Focuses on:
- Compositing quality
- Color separation
- Render cleanliness
- Alpha channel integrity

### Animation Analysis
Focuses on:
- Smooth color transitions
- Frame consistency
- Motion blur quality
- Gradient smoothness

## 🔧 Development

### Adding New Metrics

Edit `backend/analyzer.py`:

```python
def _analyze_custom_metric(self, image: np.ndarray) -> int:
    """Your metric analysis"""
    # Implementation here
    return score
```

Then add to `analyze_image()` method.

### File Structure

```
backend/
├── app.py              # Flask server
├── analyzer.py         # Analysis logic
├── requirements.txt    # Dependencies
├── Dockerfile          # Docker config
├── .env.example        # Configuration template
└── uploads/            # Uploaded files (temp)
```

## 🚢 Deployment

### Vercel (Backend + Frontend)

1. **Deploy backend to service** (Railway, Render, etc.)
2. **Update NEXT_PUBLIC_API_URL** in frontend .env
3. **Deploy frontend to Vercel**

### Self-Hosted

```bash
# Build
docker build -t rendereval-backend .

# Run
docker run -p 5000:5000 -e FLASK_ENV=production rendereval-backend
```

## 📖 API Integration

### From Next.js Frontend

```typescript
const formData = new FormData();
formData.append('image', imageFile);
formData.append('type', 'vfx');

const response = await fetch('http://localhost:5000/api/analyze', {
  method: 'POST',
  body: formData
});

const result = await response.json();
```

## 🐛 Troubleshooting

### OpenCV import error
```bash
pip install opencv-python
```

### Port already in use
```bash
# macOS/Linux
sudo lsof -i :5000
kill -9 <PID>

# or use different port
FLASK_PORT=5001 python app.py
```

### CORS errors
Add your frontend URL to `CORS_ORIGINS` in `.env`

## 📄 License

MIT License

## 👨‍💻 Support

For issues or questions, check the main project README.md
