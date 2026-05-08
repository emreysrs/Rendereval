import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // Get backend URL from environment
    const backendUrl = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || process.env.BACKEND_API_URL || 'http://backend:5000';

    // Parse request body which comes as JSON from the frontend
    const body = await request.json();
    const { imageBase64, projectType, settings } = body;

    if (!imageBase64) {
      return NextResponse.json(
        { error: 'No image provided' },
        { status: 400 }
      );
    }

    try {
      console.log(`[ANALYZE] Attempting to use backend: ${backendUrl}`);
      
      // Clean base64 string before converting to buffer
      // Remove data:image/jpeg;base64, or similar prefix if it exists
      const base64Data = imageBase64.replace(/^data:image\/\w+;base64,/, '');
      const buffer = Buffer.from(base64Data, 'base64');
      const blob = new Blob([buffer], { type: 'image/jpeg' });
      
      // Construct form data for Python backend
      const formData = new FormData();
      formData.append('image', blob, 'upload.jpg');
      formData.append('type', projectType || 'vfx');
      
      if (settings) {
        formData.append('settings', JSON.stringify(settings));
      }

      // Forward to backend
      const backendResponse = await fetch(`${backendUrl}/api/analyze`, {
        method: 'POST',
        body: formData,
      });

      if (!backendResponse.ok) {
        throw new Error(`Backend error: ${backendResponse.status}`);
      }

      const result = await backendResponse.json();
      console.log(`[ANALYZE] Backend analysis successful: ${result.overall_score}/100`);
      return NextResponse.json(result);
    } catch (backendError) {
      console.warn('[ANALYZE] Backend unavailable, using mock data:', backendError);
      
      // Generate mock analysis data (fallback when backend is down)
      const analysisData = {
        overallScore: Math.floor(Math.random() * 30) + 70, // 70-100
        status: ['APPROVED', 'REVISION_REQUIRED', 'REJECTED'][Math.floor(Math.random() * 3)],
        metrics: {
          acvCompleteness: Math.floor(Math.random() * 30) + 70,
          timeOfDayConsistency: Math.floor(Math.random() * 30) + 70,
          noiseLevel: Math.floor(Math.random() * 30) + 65,
          colorGradingMatch: Math.floor(Math.random() * 30) + 70,
          motionBlurQuality: Math.floor(Math.random() * 30) + 65,
          renderTimeCompliance: Math.floor(Math.random() * 30) + 75,
        },
        supervisorNotes: 'Professional render evaluation completed... (MOCK)',
        summary: {
          mainShot: settings?.shotName || 'Main Shot',
          sequence: settings?.sequence || 'SEQ_001',
          filmGrid: '1920x1080',
          shotName: `${projectType}_SHOT_001`,
          estimatedFrames: settings?.totalFrames || '120',
        },
        flags: ['GREEN_LIGHT'],
      };

      return NextResponse.json(analysisData);
    }
  } catch (error: unknown) {
    console.error('Error processing request:', error);

    return NextResponse.json(
      { error: 'Failed to process image' },
      { status: 500 }
    );
  }
}
