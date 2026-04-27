'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Suspense } from 'react';

interface AnalysisData {
  overallScore: number;
  status: string;
  metrics: Record<string, number>;
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

const statusTabs = [
  { label: 'APPROVED', color: '#22c55e', bg: 'rgba(34,197,94,0.1)' },
  { label: 'REVISION REQUIRED', color: '#eab308', bg: 'rgba(234,179,8,0.1)' },
  { label: 'REJECTED', color: '#ef4444', bg: 'rgba(239,68,68,0.1)' },
];

const statusMap: Record<string, number> = {
  APPROVED: 0,
  REVISION_REQUIRED: 1,
  REJECTED: 2,
};

function ReportContent() {
  const router = useRouter();
  const [activeStatus, setActiveStatus] = useState(0);
  const [data, setData] = useState<AnalysisData | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem('rendereval_results');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setData(parsed);
        // Set active tab based on API result
        setActiveStatus(statusMap[parsed.status] ?? 0);
      } catch { /* ignore */ }
    }
  }, []);

  const summary = data?.summary || { mainShot: 'N/A', sequence: 'N/A', filmGrid: 'N/A', shotName: 'N/A', estimatedFrames: 'N/A' };
  const notes = data?.supervisorNotes || 'No evaluation data available. Run an analysis to see results.';
  const flags = data?.flags || ['AMBER_FLAG'];

  const now = new Date();
  const metadataJson = `{
  date: "${now.toLocaleDateString('en-GB')}_${now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })} UTC",
  artist_: openId_ref: 20,
  level_: renderLevel_01,
  module_: ${data?.status === 'APPROVED' ? 'VFX/anim' : 'VFX/review'},
  evaluation_: auto,
  score_: ${data?.overallScore || 'N/A'},
  signature_: 01 61 72
}`;

  return (
    <div style={{ minHeight: 'calc(100vh - 53px)', background: '#1F1F1E', display: 'flex', flexDirection: 'column' }}>
      {/* Status Tabs */}
      <div style={{ display: 'flex', borderBottom: '1px solid #2a2a3e', background: '#1e1e32' }}>
        {statusTabs.map((tab, i) => (
          <button
            key={tab.label}
            onClick={() => setActiveStatus(i)}
            style={{
              flex: 1,
              padding: '14px 20px',
              fontSize: '13px',
              fontWeight: 600,
              letterSpacing: '0.5px',
              color: activeStatus === i ? tab.color : '#6b7280',
              background: activeStatus === i ? tab.bg : 'transparent',
              border: 'none',
              borderBottom: activeStatus === i ? `2px solid ${tab.color}` : '2px solid transparent',
              cursor: 'pointer',
              transition: 'all 0.15s',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        {/* Main Content */}
        <div style={{ flex: 1, padding: '24px 32px', overflowY: 'auto' }}>
          {/* AI Supervisor Notes */}
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ color: '#6b7280', fontSize: '11px', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '10px' }}>
              AI Supervisor Notes
            </h3>
            <div style={{ background: '#232336', border: '1px solid #3a3a50', borderRadius: '8px', padding: '16px', minHeight: '80px' }}>
              <p style={{ color: '#9ca3af', fontSize: '13px', lineHeight: '1.6', whiteSpace: 'pre-wrap' }}>
                {notes}
              </p>
            </div>
          </div>

          {/* Annotated Summary */}
          <div>
            <h3 style={{ color: '#3b82f6', fontSize: '12px', fontWeight: 600, marginBottom: '12px' }}>
              Annotated Summary
            </h3>
            <div style={{ background: '#232336', border: '1px solid #3a3a50', borderRadius: '8px', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <tbody>
                  {[
                    ['Main Shot', summary.mainShot],
                    ['Sequence', summary.sequence],
                    ['Film grid', summary.filmGrid],
                    ['Shot name', summary.shotName],
                    ['Total Frames', summary.estimatedFrames],
                  ].map(([label, value]) => (
                    <tr key={label} style={{ borderBottom: '1px solid #2a2a3e' }}>
                      <td style={{ padding: '10px 16px', color: '#6b7280', fontSize: '12px', width: '140px' }}>{label}</td>
                      <td style={{ padding: '10px 16px', color: '#e0e0e0', fontSize: '12px' }}>{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div style={{ padding: '12px 16px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {flags.includes('GREEN_LIGHT') && (
                  <span style={{ padding: '4px 10px', borderRadius: '4px', background: 'rgba(34,197,94,0.15)', color: '#22c55e', fontSize: '10px', fontWeight: 600 }}>GREEN LIGHT</span>
                )}
                {flags.includes('AMBER_FLAG') && (
                  <span style={{ padding: '4px 10px', borderRadius: '4px', background: 'rgba(234,179,8,0.15)', color: '#eab308', fontSize: '10px', fontWeight: 600 }}>AMBER FLAG</span>
                )}
                {flags.includes('CORRECTION_REQ') && (
                  <span style={{ padding: '4px 10px', borderRadius: '4px', background: 'rgba(239,68,68,0.15)', color: '#ef4444', fontSize: '10px', fontWeight: 600 }}>CORRECTION REQ</span>
                )}
                {/* If no known flags, show all */}
                {!flags.some(f => ['GREEN_LIGHT', 'AMBER_FLAG', 'CORRECTION_REQ'].includes(f)) && (
                  <>
                    <span style={{ padding: '4px 10px', borderRadius: '4px', background: 'rgba(34,197,94,0.15)', color: '#22c55e', fontSize: '10px', fontWeight: 600 }}>GREEN LIGHT</span>
                    <span style={{ padding: '4px 10px', borderRadius: '4px', background: 'rgba(234,179,8,0.15)', color: '#eab308', fontSize: '10px', fontWeight: 600 }}>AMBER FLAG</span>
                    <span style={{ padding: '4px 10px', borderRadius: '4px', background: 'rgba(239,68,68,0.15)', color: '#ef4444', fontSize: '10px', fontWeight: 600 }}>CORRECTION REQ</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div style={{ width: '260px', borderLeft: '1px solid #2a2a3e', padding: '20px 16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <h3 style={{ color: '#9ca3af', fontSize: '11px', fontWeight: 600, letterSpacing: '1px', marginBottom: '4px' }}>ACTIONS</h3>

          {[
            { label: 'Export Report', icon: <><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></> },
            { label: 'Share to Artist', icon: <><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></> },
            { label: 'Log to Audit Trail', icon: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></> },
          ].map((action) => (
            <button key={action.label} style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #3a3a50', background: '#232336', color: '#e0e0e0', fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 500 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{action.icon}</svg>
              {action.label}
            </button>
          ))}

          <div style={{ marginTop: '8px' }}>
            <pre style={{ background: '#232336', border: '1px solid #3a3a50', borderRadius: '6px', padding: '12px', color: '#6b7280', fontSize: '10px', lineHeight: '1.5', overflow: 'auto', margin: 0, fontFamily: 'monospace' }}>
              {metadataJson}
            </pre>
          </div>

          <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <button style={{ width: '100%', padding: '10px', borderRadius: '8px', border: 'none', background: '#3b82f6', color: '#fff', fontSize: '12px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
              Save Report
            </button>
            <button onClick={() => router.push('/')} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #3a3a50', background: 'transparent', color: '#9ca3af', fontSize: '12px', fontWeight: 500, cursor: 'pointer' }}>
              New Evaluation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ReportPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', background: '#1F1F1E' }} />}>
      <ReportContent />
    </Suspense>
  );
}
