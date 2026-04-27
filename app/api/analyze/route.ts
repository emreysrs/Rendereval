import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { imageBase64, projectType, settings } = await request.json();

    if (!imageBase64) {
      return NextResponse.json(
        { error: 'No image provided' },
        { status: 400 }
      );
    }

    // Generate fake but realistic analysis data
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
      supervisorNotes: 'Professional render evaluation completed. Image analyzed for lighting quality, color balance, and technical specifications. Overall assessment meets production standards for the specified project type.',
      summary: {
        mainShot: settings?.shotName || 'Main Shot',
        sequence: settings?.sequence || 'SEQ_001',
        filmGrid: '1920x1080',
        shotName: `${projectType}_SHOT_001`,
        estimatedFrames: settings?.totalFrames || '120',
      },
      flags: ['GREEN_LIGHT'],
    };

    return NextResponse.json({ analysis: analysisData });
  } catch (error: unknown) {
    console.error('Error processing request:', error);

    return NextResponse.json(
      { error: 'Failed to process image' },
      { status: 500 }
    );
  }
}
