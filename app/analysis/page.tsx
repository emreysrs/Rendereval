'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

const tabs = [
  'Required Artists',
  'Time of Day',
  'Location',
  'Required Mood',
  'Frame Range',
  'Render TimeFrame',
];

const artists = ['Roto', 'Offices', 'Telecine', 'Shadows', 'Cleanup', 'Motion Tracker'];

function AnalysisContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const projectType = searchParams.get('type') || 'vfx';

  const [activeTab, setActiveTab] = useState(0);
  const [selectedArtists, setSelectedArtists] = useState<string[]>([]);
  const [timeOfDay, setTimeOfDay] = useState<'day' | 'night' | null>(null);
  const [location, setLocation] = useState<'interior' | 'exterior' | null>(null);
  const [moodText, setMoodText] = useState('');
  const [startFrame, setStartFrame] = useState('1');
  const [endFrame, setEndFrame] = useState('120');
  const [renderDeadline, setRenderDeadline] = useState('');

  const toggleArtist = (a: string) => {
    setSelectedArtists((prev) =>
      prev.includes(a) ? prev.filter((x) => x !== a) : [...prev, a]
    );
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 0: // Required Artists
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '8px 0' }}>
            {artists.map((a) => (
              <div
                key={a}
                onClick={() => toggleArtist(a)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  cursor: 'pointer',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  background: selectedArtists.includes(a) ? 'rgba(59,130,246,0.1)' : 'transparent',
                  transition: 'background 0.15s',
                }}
              >
                <div
                  style={{
                    width: '18px',
                    height: '18px',
                    borderRadius: '4px',
                    border: selectedArtists.includes(a)
                      ? '2px solid #3b82f6'
                      : '2px solid #4a4a60',
                    background: selectedArtists.includes(a) ? '#3b82f6' : 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.15s',
                  }}
                >
                  {selectedArtists.includes(a) && (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </div>
                <span style={{ color: '#e0e0e0', fontSize: '14px' }}>{a}</span>
              </div>
            ))}
          </div>
        );

      case 1: // Time of Day
        return (
          <div style={{ display: 'flex', gap: '12px', padding: '8px 0' }}>
            {(['day', 'night'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTimeOfDay(t)}
                style={{
                  padding: '12px 32px',
                  borderRadius: '8px',
                  border: timeOfDay === t ? '2px solid #3b82f6' : '2px solid #3a3a50',
                  background: timeOfDay === t ? '#3b82f6' : '#2a2a3e',
                  color: '#fff',
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  textTransform: 'capitalize',
                  transition: 'all 0.15s',
                }}
              >
                {t === 'day' ? 'Day' : 'Night'}
              </button>
            ))}
          </div>
        );

      case 2: // Location
        return (
          <div style={{ display: 'flex', gap: '12px', padding: '8px 0' }}>
            {(['interior', 'exterior'] as const).map((l) => (
              <button
                key={l}
                onClick={() => setLocation(l)}
                style={{
                  padding: '12px 32px',
                  borderRadius: '8px',
                  border: location === l ? '2px solid #3b82f6' : '2px solid #3a3a50',
                  background: location === l ? '#3b82f6' : '#2a2a3e',
                  color: '#fff',
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  textTransform: 'capitalize',
                  transition: 'all 0.15s',
                }}
              >
                {l === 'interior' ? 'Interior' : 'Exterior'}
              </button>
            ))}
          </div>
        );

      case 3: // Required Mood
        return (
          <div style={{ padding: '8px 0' }}>
            <textarea
              value={moodText}
              onChange={(e) => setMoodText(e.target.value)}
              placeholder='Describe the required mood (e.g. "dark and moody", "bright and cheerful").'
              rows={4}
              style={{
                width: '100%',
                maxWidth: '500px',
                padding: '12px 16px',
                borderRadius: '8px',
                border: '1px solid #3a3a50',
                background: '#232336',
                color: '#e0e0e0',
                fontSize: '13px',
                outline: 'none',
                resize: 'vertical',
                marginBottom: '16px',
              }}
            />
            <div
              style={{
                width: '100%',
                maxWidth: '500px',
                height: '80px',
                border: '2px dashed #3a3a50',
                borderRadius: '8px',
                background: '#232336',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
            </div>
          </div>
        );

      case 4: // Frame Range
        return (
          <div style={{ display: 'flex', gap: '24px', padding: '8px 0' }}>
            <div>
              <label style={{ color: '#6b7280', fontSize: '11px', display: 'block', marginBottom: '6px' }}>Start Frame</label>
              <input
                type="number"
                value={startFrame}
                onChange={(e) => setStartFrame(e.target.value)}
                style={{
                  width: '160px',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  border: '1px solid #3a3a50',
                  background: '#232336',
                  color: '#e0e0e0',
                  fontSize: '13px',
                  outline: 'none',
                }}
              />
            </div>
            <div>
              <label style={{ color: '#6b7280', fontSize: '11px', display: 'block', marginBottom: '6px' }}>End Frame</label>
              <input
                type="number"
                value={endFrame}
                onChange={(e) => setEndFrame(e.target.value)}
                style={{
                  width: '160px',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  border: '1px solid #3a3a50',
                  background: '#232336',
                  color: '#e0e0e0',
                  fontSize: '13px',
                  outline: 'none',
                }}
              />
            </div>
          </div>
        );

      case 5: // Render TimeFrame
        return (
          <div style={{ padding: '8px 0' }}>
            <label style={{ color: '#6b7280', fontSize: '11px', display: 'block', marginBottom: '6px' }}>Render Time Limit</label>
            <input
              type="text"
              value={renderDeadline}
              onChange={(e) => setRenderDeadline(e.target.value)}
              placeholder="3hrs"
              style={{
                width: '200px',
                padding: '8px 12px',
                borderRadius: '6px',
                border: '1px solid #3a3a50',
                background: '#232336',
                color: '#e0e0e0',
                fontSize: '13px',
                outline: 'none',
              }}
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div style={{ minHeight: 'calc(100vh - 53px)', background: '#1F1F1E', display: 'flex', flexDirection: 'column' }}>
      {/* Tabs */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0',
          borderBottom: '1px solid #2a2a3e',
          padding: '0 24px',
          background: '#1F1F1E',
          overflowX: 'auto',
        }}
      >
        {tabs.map((tab, i) => (
          <button
            key={tab}
            onClick={() => setActiveTab(i)}
            style={{
              padding: '14px 18px',
              fontSize: '12px',
              fontWeight: activeTab === i ? 600 : 400,
              color: activeTab === i ? '#3b82f6' : '#6b7280',
              background: 'none',
              border: 'none',
              borderBottom: activeTab === i ? '2px solid #3b82f6' : '2px solid transparent',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all 0.15s',
            }}
          >
            {tab}
          </button>
        ))}

        {/* Studio Default Badge */}
        <div style={{ marginLeft: 'auto' }}>
          <span
            style={{
              padding: '6px 12px',
              borderRadius: '6px',
              border: '1px solid #3a3a50',
              background: '#232336',
              color: '#9ca3af',
              fontSize: '11px',
              fontWeight: 500,
            }}
          >
            STUDIO DEFAULT
          </span>
        </div>
      </div>

      {/* Tab Content */}
      <div style={{ flex: 1, padding: '24px 32px' }}>
        {renderTabContent()}
      </div>

      {/* Bottom Navigation */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '16px 32px',
          borderTop: '1px solid #2a2a3e',
        }}
      >
        <button
          onClick={() => router.push(`/project?type=${projectType}`)}
          style={{
            padding: '10px 24px',
            borderRadius: '8px',
            border: '1px solid #3a3a50',
            background: 'transparent',
            color: '#9ca3af',
            fontSize: '13px',
            cursor: 'pointer',
            fontWeight: 500,
          }}
        >
          Back
        </button>

        <div style={{ display: 'flex', gap: '8px' }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#3b82f6' }} />
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#3b82f6' }} />
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#3a3a50' }} />
        </div>

        <button
          onClick={() => {
            sessionStorage.setItem('rendereval_settings', JSON.stringify({
              artists: selectedArtists,
              timeOfDay,
              location,
              mood: moodText,
              startFrame,
              endFrame,
              renderDeadline,
            }));
            router.push(`/results?type=${projectType}`);
          }}
          style={{
            padding: '10px 24px',
            borderRadius: '8px',
            border: 'none',
            background: '#3b82f6',
            color: '#fff',
            fontSize: '13px',
            cursor: 'pointer',
            fontWeight: 600,
          }}
        >
          RUN ANALYSIS
        </button>
      </div>
    </div>
  );
}

export default function AnalysisPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', background: '#1F1F1E' }} />}>
      <AnalysisContent />
    </Suspense>
  );
}
