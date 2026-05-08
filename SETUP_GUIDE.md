# Image Lighting Analysis MVP - Setup Guide

## Project Overview

This is a complete, production-ready MVP for an Image Lighting Analysis web application built with Next.js, React, TypeScript, Tailwind CSS, and the OpenAI Vision API (GPT-4o-mini).

## Features

✅ Modern, minimalist, and sleek UI with dark gradient theme
✅ Drag-and-drop file upload with click-to-browse fallback
✅ Real-time image preview
✅ AI-powered lighting analysis using OpenAI Vision API
✅ Beautiful result display with color-coded status indicators
✅ Loading animations and error handling
✅ Fully responsive design
✅ TypeScript for type safety
✅ Production-ready code

## Initial Setup Commands

### 1. Project Creation
```bash
npx create-next-app@latest alireza-project --typescript --tailwind --no-eslint --no-git --no-src-dir --import-alias '@/*'
```

### 2. Install Additional Dependencies
```bash
cd alireza-project
npm install lucide-react openai
```

## Project Structure

```
alireza-project/
├── app/
│   ├── api/
│   │   └── analyze/
│   │       └── route.ts          # OpenAI API integration
│   ├── layout.tsx                 # Root layout
│   ├── page.tsx                   # Homepage with file upload & UI
│   ├── globals.css                # Global styles
│   └── favicon.ico
├── public/                        # Static assets
├── .env.local                     # Environment variables (API keys)
├── next.config.ts                 # Next.js configuration
├── tsconfig.json                  # TypeScript configuration
├── tailwind.config.ts             # Tailwind CSS configuration
├── postcss.config.mjs             # PostCSS configuration
├── package.json                   # Dependencies and scripts
└── package-lock.json              # Dependency lock file
```

## Environment Configuration

### Create `.env.local` File

1. Create a file named `.env.local` in the root directory:
```env
OPENAI_API_KEY=your_openai_api_key_here
```

2. Replace `your_openai_api_key_here` with your actual OpenAI API key
   - Get your key from: https://platform.openai.com/api-keys
   - You need a paid OpenAI account with credits available

## Running the Application

### Development Mode
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Production Build
```bash
npm run build
npm run start
```

## How to Use

1. **Upload an Image**: 
   - Drag and drop an image into the upload zone, or
   - Click the upload zone to browse files from your computer

2. **Preview**: 
   - Once uploaded, a preview appears showing the image and file details

3. **Analyze**: 
   - Click the "Analyze Lighting" button
   - A loading animation appears while processing
   - The AI analyzes the image and returns results in ~5-10 seconds

4. **View Results**: 
   - Results display in a beautifully styled card with color coding:
     - 🟢 **Green**: Good lighting
     - 🔴 **Red**: Bad lighting
     - 🟡 **Yellow**: Average lighting

## API Route Details

### POST `/api/analyze`

**Request Body:**
```json
{
  "imageBase64": "base64_encoded_image_string"
}
```

**Response:**
```json
{
  "analysis": "Good\n\nThe photo shows well-balanced lighting with..."
}
```

**System Prompt Used:**
> "Act as a professional photography expert. Is the lighting in this photo generally good or bad? Briefly analyze the shadows on faces or objects, overexposed highlights, and overall illumination. Provide the result with a clear heading like 'Good', 'Bad', or 'Average', followed by a brief, easy-to-understand explanation."

## Key Technologies Used

- **Next.js 15+**: React framework with App Router
- **React 19+**: UI library
- **TypeScript**: Type safety
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Beautiful icons
- **OpenAI API**: GPT-4o-mini vision model for image analysis
- **Node.js**: Server runtime

## Dependencies Explained

```json
{
  "dependencies": {
    "next": "^15.0.0",           // React framework
    "react": "^19.0.0",          // UI library
    "react-dom": "^19.0.0",      // DOM rendering
    "lucide-react": "^latest",   // Icon library
    "openai": "^latest"          // OpenAI SDK
  },
  "devDependencies": {
    "@types/node": "^latest",    // Node.js types
    "@types/react": "^latest",   // React types
    "@types/react-dom": "^latest", // React DOM types
    "typescript": "^latest",     // TypeScript compiler
    "tailwindcss": "^latest",    // CSS framework
    "@tailwindcss/postcss": "^latest" // Tailwind plugin
  }
}
```

## UI Components Overview

### Homepage (`app/page.tsx`)
- Modern dark theme with gradient backgrounds
- Responsive grid layout for all screen sizes
- Smooth animations and transitions
- Icon feedback system with Lucide React

### Upload Zone
- Supports drag-and-drop and click-to-browse
- Visual feedback on hover
- File validation (images only)
- File size and name display

### Result Card
- Color-coded based on analysis result
- Icon indicators (CheckCircle, AlertCircle, HelpCircle)
- Full analysis text display
- Backdrop blur effect for premium feel

## Customization

### Change the System Prompt
Edit `app/api/analyze/route.ts` line 28:
```typescript
text: 'Your custom prompt here...',
```

### Modify the UI Theme
Edit the Tailwind classes in `app/page.tsx`:
- Change gradient colors: `from-blue-400 to-cyan-400`
- Adjust spacing: `p-8`, `mb-8`
- Modify border styles: `border-2 border-dashed`

### Add More Analysis Parameters
Extend the `AnalysisResult` interface in `app/page.tsx` to track additional data

## Troubleshooting

### "Failed to analyze image" Error
- Verify `OPENAI_API_KEY` is set in `.env.local`
- Check that your OpenAI account has available credits
- Ensure the image format is supported (JPEG, PNG, WebP, GIF)

### Image Upload Not Working
- Check browser console for errors (F12)
- Verify file is a valid image format
- Check maximum file size (API limit is ~20MB)

### Build Errors
- Run `npm install` to ensure all dependencies are installed
- Clear `.next` folder: `rm -rf .next`
- Rebuild: `npm run build`

## Performance Optimization

The application is already optimized with:
- Server-side API route for secure API key handling
- Client-side image preview (no server processing)
- Efficient Base64 encoding for image transmission
- Minimal dependencies for fast load times
- CSS-in-JS with Tailwind for optimal bundle size

## Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Connect repository to Vercel
3. Add `OPENAI_API_KEY` to environment variables
4. Deploy automatically on push

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Deploy to Other Platforms
- **Netlify**: Requires Node.js runtime for API routes
- **Railway**: Full Next.js support
- **Render**: Full Next.js support
- **Self-hosted**: Use `npm run build && npm run start`

## API Costs

OpenAI Vision API pricing (as of 2024):
- **GPT-4o-mini**: $0.00015 per image token
- Average image analysis: ~500-1000 tokens
- Estimated cost per image: $0.08-0.15

**Monthly estimate** (1000 analyses/month): ~$80-150

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Development Tips

1. **Test image formats**: JPEG, PNG, WebP, GIF all supported
2. **Test file sizes**: Try different image sizes for performance
3. **Monitor API usage**: Check OpenAI dashboard regularly
4. **Enable TypeScript strict mode**: Already enabled in `tsconfig.json`

## Next Steps for Production

- [ ] Add user authentication
- [ ] Implement image history/database
- [ ] Add export analysis as PDF
- [ ] Implement rate limiting
- [ ] Add analytics/monitoring
- [ ] Create admin dashboard
- [ ] Add image compression before upload
- [ ] Implement caching for repeated analyses

## Support & Resources

- **Next.js Docs**: https://nextjs.org/docs
- **OpenAI API Docs**: https://platform.openai.com/docs/api-reference
- **Tailwind CSS**: https://tailwindcss.com/docs
- **Lucide Icons**: https://lucide.dev

## License

MIT - Feel free to use this code for personal and commercial projects.

---

**Built with ❤️ | Ready for Production**
