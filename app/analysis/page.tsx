'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { useLanguage } from '../context/LanguageContext';

const tabs = [
  'Required AOVs',
  'Time of Day',
  'Location',
  'Required Mood',
  'Frame Range',
  'Render TimeFrame',
];

const artists = ['Beauty', 'Diffuse', 'Specular', 'Shadow', 'Depth', 'Motion Vector'];

function AnalysisContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { t } = useLanguage();
  const projectType = searchParams.get('type') || 'vfx';

  const [activeTab, setActiveTab] = useState(0);
  const [selectedArtists, setSelectedArtists] = useState<string[]>([]);
  const [timeOfDay, setTimeOfDay] = useState<'day' | 'night' | null>(null);
  const [location, setLocation] = useState<'interior' | 'exterior' | null>(null);
  const [moodText, setMoodText] = useState('');
  const [startFrame, setStartFrame] = useState('1');
  const [endFrame, setEndFrame] = useState('120');
  const [renderDeadline, setRenderDeadline] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

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
                  background: selectedArtists.includes(a) ? 'rgba(75,141,188,0.1)' : 'transparent',
                  borderBottom: selectedArtists.includes(a) ? '2px solid #4B8DBC' : '2px solid transparent',
                  transition: 'background 0.15s',
                }}
              >
                <div
                  style={{
                    width: '18px',
                    height: '18px',
                    borderRadius: '4px',
                    border: selectedArtists.includes(a)
                      ? '2px solid #4B8DBC'
                      : '2px solid rgba(255, 255, 255, 0.3)',
                    background: selectedArtists.includes(a) ? '#4B8DBC' : 'transparent',
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
                <span style={{ color: '#ffffff', fontSize: '14px' }}>{a}</span>
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
                  border: timeOfDay === t ? '2px solid #4B8DBC' : '2px solid rgba(255, 255, 255, 0.3)',
                  background: timeOfDay === t ? '#4B8DBC' : '#3F403F',
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
                  border: location === l ? '2px solid #4B8DBC' : '2px solid rgba(255, 255, 255, 0.3)',
                  background: location === l ? '#4B8DBC' : '#3F403F',
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
                border: '1px solid rgba(255, 255, 255, 0.3)',
                background: '#3F403F',
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
                border: '2px dashed rgba(255, 255, 255, 0.3)',
                borderRadius: '8px',
                background: '#1F1F1E',
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
              <label style={{ color: '#6b7280', fontSize: '11px', display: 'block', marginBottom: '6px' }}>{t('start_frame')}</label>
              <input
                type="number"
                value={startFrame}
                onChange={(e) => setStartFrame(e.target.value)}
                style={{
                  width: '160px',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  background: '#3F403F',
                  color: '#e0e0e0',
                  fontSize: '13px',
                  outline: 'none',
                }}
              />
            </div>
            <div>
              <label style={{ color: '#6b7280', fontSize: '11px', display: 'block', marginBottom: '6px' }}>{t('end_frame')}</label>
              <input
                type="number"
                value={endFrame}
                onChange={(e) => setEndFrame(e.target.value)}
                style={{
                  width: '160px',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  background: '#3F403F',
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
            <label style={{ color: '#6b7280', fontSize: '11px', display: 'block', marginBottom: '6px' }}>{t('render_time_limit')}</label>
            <input
              type="text"
              value={renderDeadline}
              onChange={(e) => setRenderDeadline(e.target.value)}
              placeholder="3hrs"
              style={{
                width: '200px',
                padding: '8px 12px',
                borderRadius: '6px',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                background: '#3F403F',
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
          borderBottom: '1px solid rgba(255, 255, 255, 0.3)',
          padding: '0 24px',
          background: '#2b2b2b',
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
              color: activeTab === i ? '#ffffff' : '#ffffff',
              background: 'none',
              border: 'none',
              borderBottom: activeTab === i ? '2px solid #4B8DBC' : '2px solid transparent',
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
              border: '1px solid rgba(255, 255, 255, 0.3)',
              background: '#3F403F',
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
          borderTop: '1px solid rgba(255, 255, 255, 0.3)',
        }}
      >
        <button
          onClick={() => router.push(`/project?type=${projectType}`)}
          style={{
            padding: '10px 24px',
            borderRadius: '8px',
            border: '1px solid rgba(255, 255, 255, 0.3)',
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
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#2b2b2b' }} />
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#2b2b2b' }} />
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'rgba(255, 255, 255, 0.3)' }} />
        </div>

        <button
          disabled={isAnalyzing}
          onClick={async () => {
            setIsAnalyzing(true);
            const settings = {
              artists: selectedArtists,
              timeOfDay,
              location,
              mood: moodText,
              startFrame,
              endFrame,
              renderDeadline,
            };
            sessionStorage.setItem('rendereval_settings', JSON.stringify(settings));

            try {
              const imageBase64 = sessionStorage.getItem('rendereval_image');
              if (imageBase64) {
                const response = await fetch('/api/analyze', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    imageBase64,
                    projectType,
                    settings
                  }),
                });

                if (response.ok) {
                  const data = await response.json();
                  sessionStorage.setItem('rendereval_results', JSON.stringify(data));
                }
              }
            } catch (error) {
              console.error('Analysis failed:', error);
            } finally {
              setIsAnalyzing(false);
              router.push(`/results?type=${projectType}`);
            }
          }}
          style={{
            padding: '10px 24px',
            borderRadius: '8px',
            border: 'none',
            background: isAnalyzing ? '#4a4a60' : '#2b2b2b',
            color: '#fff',
            fontSize: '13px',
            cursor: isAnalyzing ? 'not-allowed' : 'pointer',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          {isAnalyzing ? (
            <>
              <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12a9 9 0 1 1-6.219-8.56" />
              </svg>
              ANALYZING...
            </>
          ) : (
            'RUN ANALYSIS'
          )}
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
