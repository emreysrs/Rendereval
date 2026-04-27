'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

interface AnalysisData {
  overallScore: number;
  status: string;
  metrics: {
    acvCompleteness: number;
    timeOfDayConsistency: number;
    noiseLevel: number;
    colorGradingMatch: number;
    motionBlurQuality: number;
    renderTimeCompliance: number;
  };
  supervisorNotes: string;
  summary: {
    mainShot: string;
    sequence: string;
    filmGrid: string;
    shotName: string;
    estimatedFrames: string;
  };
  flags: string[];
}

const defaultData: AnalysisData = {
  overallScore: 74,
  status: 'APPROVED',
  metrics: { acvCompleteness: 85, timeOfDayConsistency: 90, noiseLevel: 68, colorGradingMatch: 92, motionBlurQuality: 75, renderTimeCompliance: 88 },
  supervisorNotes: 'No analysis data. Run an evaluation to see results.',
  summary: { mainShot: 'N/A', sequence: 'N/A', filmGrid: 'N/A', shotName: 'N/A', estimatedFrames: 'N/A' },
  flags: ['AMBER_FLAG'],
};

const frames = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  name: `Frame${String(i + 1).padStart(2, '0')}`,
  status: i % 5 === 0 ? 'warning' : i % 7 === 0 ? 'error' : 'good',
}));

function getColor(value: number) {
  if (value >= 85) return '#22c55e';
  if (value >= 70) return '#eab308';
  return '#ef4444';
}

const timelineSegments = [
  { width: 15, color: '#22c55e' },
  { width: 5, color: '#ef4444' },
  { width: 25, color: '#22c55e' },
  { width: 3, color: '#3b82f6' },
  { width: 20, color: '#22c55e' },
  { width: 4, color: '#ef4444' },
  { width: 28, color: '#22c55e' },
];

function ResultsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const projectType = searchParams.get('type') || 'vfx';
  const [selectedFrame, setSelectedFrame] = useState(0);
  const [data, setData] = useState<AnalysisData>(defaultData);

  useEffect(() => {
    const stored = sessionStorage.getItem('rendereval_results');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setData({ ...defaultData, ...parsed, metrics: { ...defaultData.metrics, ...parsed.metrics }, summary: { ...defaultData.summary, ...parsed.summary } });
      } catch { /* use defaults */ }
    }
  }, []);

  const metricsArray = [
    { name: 'ACV Completeness', value: data.metrics.acvCompleteness },
    { name: 'Time of Day Consistency', value: data.metrics.timeOfDayConsistency },
    { name: 'Noise Level', value: data.metrics.noiseLevel },
    { name: 'Color Grading Match', value: data.metrics.colorGradingMatch },
    { name: 'Motion Blur Quality', value: data.metrics.motionBlurQuality },
    { name: 'Render Time Compliance', value: data.metrics.renderTimeCompliance },
  ];

  return (
    <div style={{ minHeight: 'calc(100vh - 53px)', background: '#1F1F1E', display: 'flex', flexDirection: 'column' }}>
      {/* Breadcrumb */}
      <div style={{ padding: '10px 24px', borderBottom: '1px solid #2a2a3e', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px' }}>
        <span style={{ color: '#6b7280' }}>{projectType.toUpperCase()}</span>
        <span style={{ color: '#3a3a50' }}>›</span>
        <span style={{ color: '#6b7280' }}>{data.summary.shotName || 'Shot_F16_v01'}</span>
        <span style={{ color: '#3a3a50' }}>›</span>
        <span style={{ color: '#6b7280' }}>Criteria</span>
        <span style={{ color: '#3a3a50' }}>›</span>
        <span style={{ color: '#e0e0e0', fontWeight: 600 }}>Results</span>
      </div>

      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        {/* Left Sidebar */}
        <div style={{ width: '80px', borderRight: '1px solid #2a2a3e', overflowY: 'auto', padding: '8px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {frames.map((frame, i) => (
            <button key={frame.id} onClick={() => setSelectedFrame(i)} style={{ width: '100%', aspectRatio: '16/10', borderRadius: '6px', border: selectedFrame === i ? '2px solid #3b82f6' : '1px solid #3a3a50', background: '#2a2a3e', cursor: 'pointer', position: 'relative', overflow: 'hidden', padding: 0 }}>
              <div style={{ position: 'absolute', bottom: '2px', right: '3px', width: '6px', height: '6px', borderRadius: '50%', background: frame.status === 'good' ? '#22c55e' : frame.status === 'warning' ? '#eab308' : '#ef4444' }} />
            </button>
          ))}
        </div>

        {/* Center */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '20px' }}>
          <div style={{ flex: 1, background: '#232336', borderRadius: '8px', border: '1px solid #3a3a50', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '300px' }}>
            <span style={{ color: '#6b7280', fontSize: '14px' }}>Frame {selectedFrame + 1} / {data.summary.shotName || 'Akeleti'}</span>
          </div>

          {/* Timeline */}
          <div style={{ marginTop: '16px' }}>
            <div style={{ width: '100%', height: '24px', background: '#232336', borderRadius: '4px', position: 'relative', overflow: 'hidden', display: 'flex' }}>
              {timelineSegments.map((seg, i) => (
                <div key={i} style={{ width: `${seg.width}%`, height: '100%', background: seg.color, opacity: 0.7 }} />
              ))}
              <div style={{ position: 'absolute', left: `${(selectedFrame / frames.length) * 100}%`, top: 0, bottom: 0, width: '2px', background: '#fff' }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
              {Array.from({ length: 10 }, (_, i) => (
                <span key={i} style={{ color: '#4a4a60', fontSize: '9px' }}>{i * 12 + 1}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div style={{ width: '260px', borderLeft: '1px solid #2a2a3e', padding: '16px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            <span style={{ color: '#9ca3af', fontSize: '11px', fontWeight: 600, letterSpacing: '1px' }}>AI EVALUATION BRIEF</span>
          </div>

          {metricsArray.map((m) => (
            <div key={m.name} style={{ marginBottom: '4px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ color: '#9ca3af', fontSize: '11px' }}>{m.name}</span>
                <span style={{ color: getColor(m.value), fontSize: '11px', fontWeight: 600 }}>{m.value}%</span>
              </div>
              <div style={{ width: '100%', height: '4px', background: '#232336', borderRadius: '2px', overflow: 'hidden' }}>
                <div style={{ width: `${m.value}%`, height: '100%', background: getColor(m.value), borderRadius: '2px' }} />
              </div>
            </div>
          ))}

          {/* Score Card */}
          <div style={{ background: '#232336', border: '1px solid #3a3a50', borderRadius: '10px', padding: '20px', textAlign: 'center', marginTop: '8px' }}>
            <div style={{ fontSize: '36px', fontWeight: 700, color: '#3b82f6', lineHeight: 1 }}>{data.overallScore}</div>
            <div style={{ fontSize: '14px', color: '#6b7280', marginTop: '2px' }}>/ 100</div>
            <div style={{ fontSize: '11px', color: '#9ca3af', marginTop: '6px' }}>AI Confidence Score</div>
          </div>

          <button onClick={() => router.push(`/report?type=${projectType}`)} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: 'none', background: '#3b82f6', color: '#fff', fontSize: '12px', fontWeight: 600, cursor: 'pointer', marginTop: '4px' }}>
            Continue to Dashboard
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', padding: '12px', borderTop: '1px solid #2a2a3e', gap: '8px' }}>
        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#3b82f6' }} />
        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#3b82f6' }} />
        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#3b82f6' }} />
      </div>
    </div>
  );
}

export default function ResultsPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', background: '#1F1F1E' }} />}>
      <ResultsContent />
    </Suspense>
  );
}
