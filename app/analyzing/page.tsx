'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function AnalyzingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const projectType = searchParams.get('type') || 'vfx';

  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('Evaluating file...');
  const [cancelled, setCancelled] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [error, setError] = useState('');
  const apiCalled = useRef(false);

  // Call API
  useEffect(() => {
    if (apiCalled.current || cancelled) return;
    apiCalled.current = true;

    const imageBase64 = sessionStorage.getItem('rendereval_image');
    const settingsStr = sessionStorage.getItem('rendereval_settings');
    const settings = settingsStr ? JSON.parse(settingsStr) : null;

    if (!imageBase64) {
      // No image — simulate with fake progress and go to results with demo data
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            // Store demo results
            sessionStorage.setItem('rendereval_results', JSON.stringify({
              overallScore: 74,
              status: 'APPROVED',
              metrics: {
                acvCompleteness: 85,
                timeOfDayConsistency: 90,
                noiseLevel: 68,
                colorGradingMatch: 92,
                motionBlurQuality: 75,
                renderTimeCompliance: 88,
              },
              supervisorNotes: 'Demo mode — no image was uploaded. Upload an image from the project page to get a real AI evaluation.',
              summary: { mainShot: 'Demo Shot', sequence: 'DEMO_001', filmGrid: 'HD_1080p', shotName: 'demo_render', estimatedFrames: '120' },
              flags: ['AMBER_FLAG'],
            }));
            setTimeout(() => router.push(`/results?type=${projectType}`), 300);
            return 100;
          }
          return prev + 3;
        });
      }, 60);
      return () => clearInterval(interval);
    }

    // Start fake progress bar
    const progressInterval = setInterval(() => {
      setProgress((prev) => Math.min(prev + 1, 90));
    }, 200);

    // Make actual API call
    fetch('/api/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ imageBase64, projectType, settings }),
    })
      .then(async (res) => {
        const data = await res.json();
        clearInterval(progressInterval);

        if (!res.ok) {
          setError(data.error || 'Analysis failed');
          return;
        }

        // Store results
        sessionStorage.setItem('rendereval_results', JSON.stringify(data.analysis));
        setProgress(100);
        setStatusText('Complete!');
        setTimeout(() => router.push(`/results?type=${projectType}`), 500);
      })
      .catch((err) => {
        clearInterval(progressInterval);
        setError(err.message || 'Network error');
      });

    return () => clearInterval(progressInterval);
  }, [cancelled, router, projectType]);

  useEffect(() => {
    if (progress > 20 && !error) setStatusText('Detecting scene breakdowns...');
    if (progress > 50 && !error) setStatusText('Mapping metadata...');
    if (progress > 75 && !error) setStatusText('Generating evaluation report...');
    if (progress > 90 && !error) setStatusText('Finalizing...');
  }, [progress, error]);

  useEffect(() => {
    const timer = setTimeout(() => setShowNotification(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      style={{
        minHeight: 'calc(100vh - 53px)',
        background: '#111122',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
      }}
    >
      <div style={{ textAlign: 'center', maxWidth: '500px', width: '100%', padding: '0 20px' }}>
        <h1 style={{ color: '#4ecdc4', fontSize: '20px', fontWeight: 700, letterSpacing: '4px', marginBottom: '32px' }}>
          RENDEREVAL
        </h1>

        {/* Progress Bar */}
        <div style={{ width: '100%', height: '3px', background: '#2a2a3e', borderRadius: '2px', marginBottom: '20px', overflow: 'hidden' }}>
          <div
            style={{
              width: `${progress}%`,
              height: '100%',
              background: error ? '#ef4444' : 'linear-gradient(90deg, #3b82f6, #4ecdc4)',
              borderRadius: '2px',
              transition: 'width 0.2s linear',
            }}
          />
        </div>

        {/* Status */}
        {error ? (
          <div style={{ marginBottom: '20px' }}>
            <p style={{ color: '#ef4444', fontSize: '13px', fontWeight: 600, marginBottom: '8px' }}>⚠ Analysis Error</p>
            <p style={{ color: '#9ca3af', fontSize: '12px', lineHeight: '1.6', maxWidth: '400px', margin: '0 auto' }}>{error}</p>
          </div>
        ) : (
          <>
            <p style={{ color: '#9ca3af', fontSize: '12px', marginBottom: '6px' }}>
              Analyzing: AI{'  '}|{'  '}200 Frames{'  '}|{'  '}Sort: 15s
            </p>
            <p style={{ color: '#6b7280', fontSize: '11px', marginBottom: '28px' }}>{statusText}</p>
          </>
        )}

        {/* Buttons */}
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
          {error && (
            <button
              onClick={() => {
                setError('');
                setProgress(0);
                apiCalled.current = false;
              }}
              style={{
                padding: '8px 28px',
                borderRadius: '6px',
                border: 'none',
                background: '#3b82f6',
                color: '#fff',
                fontSize: '12px',
                cursor: 'pointer',
                fontWeight: 500,
              }}
            >
              Retry
            </button>
          )}
          <button
            onClick={() => {
              setCancelled(true);
              router.push('/analysis?type=' + projectType);
            }}
            style={{
              padding: '8px 28px',
              borderRadius: '6px',
              border: '1px solid #3a3a50',
              background: 'transparent',
              color: '#9ca3af',
              fontSize: '12px',
              cursor: 'pointer',
              fontWeight: 500,
            }}
          >
            {error ? 'Go Back' : 'Cancel'}
          </button>
        </div>
      </div>

      {/* Notification Toast */}
      {showNotification && !error && (
        <div
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            background: '#2a2a3e',
            border: '1px solid #3a3a50',
            borderRadius: '10px',
            padding: '14px 18px',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '12px',
            maxWidth: '300px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
            animation: 'slideIn 0.3s ease',
          }}
        >
          <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
          </div>
          <div>
            <p style={{ color: '#e0e0e0', fontSize: '12px', fontWeight: 600, marginBottom: '2px' }}>Email</p>
            <p style={{ color: '#6b7280', fontSize: '11px', lineHeight: '1.4' }}>
              We&apos;ll do AI rendering and email you when analysis is complete.
            </p>
          </div>
          <button onClick={() => setShowNotification(false)} style={{ background: 'none', border: 'none', color: '#6b7280', cursor: 'pointer', fontSize: '16px', lineHeight: 1, padding: 0, flexShrink: 0 }}>
            ×
          </button>
        </div>
      )}

      <style>{`
        @keyframes slideIn {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

export default function AnalyzingPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', background: '#111122' }} />}>
      <AnalyzingContent />
    </Suspense>
  );
}
