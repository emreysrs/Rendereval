'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from './context/LanguageContext';

export default function Home() {
  const router = useRouter();
  const { t } = useLanguage();
  const [projectType, setProjectType] = useState<'VFX' | 'ANIMATION' | null>(null);

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
          color: '#ffffff',
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
      <div style={{ display: 'flex', gap: '24px', marginBottom: '24px' }}>
        <button
          onClick={() => setProjectType('VFX')}
          className="w-95 h-55 rounded-xl border-2 transition-all duration-200"
          style={{
            backgroundColor: projectType === 'VFX' ? '#4B8DBC' : '#3F403F',
            borderColor: projectType === 'VFX' ? '#4B8DBC' : '#595F61',
            boxShadow: projectType === 'VFX' ? 'inset 0 0 20px rgba(75, 141, 188, 0.3)' : 'none',
          }}
          onMouseEnter={(e) => {
            if (projectType !== 'VFX') {
              e.currentTarget.style.borderColor = '#4B8DBC';
              e.currentTarget.style.boxShadow = 'inset 0 0 15px rgba(75, 141, 188, 0.2)';
            }
          }}
          onMouseLeave={(e) => {
            if (projectType !== 'VFX') {
              e.currentTarget.style.borderColor = '#595F61';
              e.currentTarget.style.boxShadow = 'none';
            }
          }}
        >
          <div
            className="text-center"
            style={{
              fontSize: '28px',
              fontWeight: 'bold',
              color: projectType === 'VFX' ? '#FFFFFF' : '#CCCECB',
            }}
          >
            VFX
          </div>
        </button>

        <button
          onClick={() => setProjectType('ANIMATION')}
          className="w-95 h-55 rounded-xl border-2 transition-all duration-200"
          style={{
            backgroundColor: projectType === 'ANIMATION' ? '#4B8DBC' : '#3F403F',
            borderColor: projectType === 'ANIMATION' ? '#4B8DBC' : '#595F61',
            boxShadow: projectType === 'ANIMATION' ? 'inset 0 0 20px rgba(75, 141, 188, 0.3)' : 'none',
          }}
          onMouseEnter={(e) => {
            if (projectType !== 'ANIMATION') {
              e.currentTarget.style.borderColor = '#4B8DBC';
              e.currentTarget.style.boxShadow = 'inset 0 0 15px rgba(75, 141, 188, 0.2)';
            }
          }}
          onMouseLeave={(e) => {
            if (projectType !== 'ANIMATION') {
              e.currentTarget.style.borderColor = '#595F61';
              e.currentTarget.style.boxShadow = 'none';
            }
          }}
        >
          <div
            className="text-center"
            style={{
              fontSize: '28px',
              fontWeight: 'bold',
              color: projectType === 'ANIMATION' ? '#FFFFFF' : '#CCCECB',
            }}
          >
            ANIMATION
          </div>
        </button>
      </div>

      {/* Subtitle */}
      <p style={{ color: '#868686', fontSize: '14px', marginBottom: '32px' }}>
        {t('description')}
      </p>

      {/* Continue Button */}
      {projectType && (
        <button
          onClick={() => router.push(`/project?type=${projectType.toLowerCase()}`)}
          className="mt-12 px-8 py-3 rounded-xl bg-[#4B8DBC] text-white transition-opacity hover:opacity-90"
          style={{ fontSize: '14px' }}
        >
          {t('continue')}
        </button>
      )}
    </div>
  );
}
