'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const [selected, setSelected] = useState<'vfx' | 'animation' | null>(null);

  return (
    <div
      style={{
        minHeight: 'calc(100vh - 53px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 20px',
        background: '#1F1F1E',
      }}
    >
      {/* Title */}
      <h1
        style={{
          color: '#4ecdc4',
          fontSize: '32px',
          fontWeight: 700,
          letterSpacing: '6px',
          textTransform: 'uppercase',
          marginBottom: '40px',
        }}
      >
        RENDEREVAL
      </h1>

      {/* Selection Cards */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
        <button
          onClick={() => setSelected('vfx')}
          onMouseEnter={(e) => {
            if (selected !== 'vfx') {
              e.currentTarget.style.background = '#5B8BB8';
              e.currentTarget.style.borderColor = '#5B8BB8';
            }
          }}
          onMouseLeave={(e) => {
            if (selected !== 'vfx') {
              e.currentTarget.style.background = '#1F1F1E';
              e.currentTarget.style.borderColor = '#3a3a50';
            }
          }}
          style={{
            width: '220px',
            height: '140px',
            borderRadius: '12px',
            border: selected === 'vfx' ? '2px solid #3b82f6' : '2px solid #3a3a50',
            background: selected === 'vfx' ? '#3b82f6' : '#1F1F1E',
            color: '#fff',
            fontSize: '20px',
            fontWeight: 700,
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            letterSpacing: '2px',
          }}
        >
          VFX
        </button>
        <button
          onClick={() => setSelected('animation')}
          onMouseEnter={(e) => {
            if (selected !== 'animation') {
              e.currentTarget.style.background = '#5B8BB8';
              e.currentTarget.style.borderColor = '#5B8BB8';
            }
          }}
          onMouseLeave={(e) => {
            if (selected !== 'animation') {
              e.currentTarget.style.background = '#1F1F1E';
              e.currentTarget.style.borderColor = '#3a3a50';
            }
          }}
          style={{
            width: '220px',
            height: '140px',
            borderRadius: '12px',
            border: selected === 'animation' ? '2px solid #3b82f6' : '2px solid #3a3a50',
            background: selected === 'animation' ? '#3b82f6' : '#1F1F1E',
            color: '#fff',
            fontSize: '20px',
            fontWeight: 700,
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            letterSpacing: '2px',
          }}
        >
          ANIMATION
        </button>
      </div>

      {/* Subtitle */}
      <p
        style={{
          color: '#6b7280',
          fontSize: '12px',
          marginBottom: '32px',
          textAlign: 'center',
        }}
      >
        AI-powered render evaluation for professional pipelines.
      </p>

      {/* Continue Button */}
      {selected && (
        <button
          onClick={() => router.push(`/project?type=${selected}`)}
          style={{
            padding: '10px 32px',
            borderRadius: '8px',
            border: '1px solid #3b82f6',
            background: 'rgba(59, 130, 246, 0.15)',
            color: '#9ca3af',
            fontSize: '13px',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            fontWeight: 500,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(59, 130, 246, 0.3)';
            e.currentTarget.style.color = '#fff';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(59, 130, 246, 0.15)';
            e.currentTarget.style.color = '#9ca3af';
          }}
        >
          Continue
        </button>
      )}
    </div>
  );
}
