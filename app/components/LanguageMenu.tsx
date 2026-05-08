'use client';

import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function LanguageMenu() {
  const [isHovered, setIsHovered] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  return (
    <div 
      style={{ position: 'relative' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          color: '#9ca3af',
          fontSize: '13px',
          cursor: 'pointer',
          padding: '10px 0'
        }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
          <path d="M2 12h20"/>
        </svg>
        {language}
      </div>

      {/* Dropdown Menu */}
      {isHovered && (
        <div 
          style={{
            position: 'absolute',
            top: '100%',
            right: '-10px',
            width: '120px',
            background: '#1F1F1E',
            border: '1px solid #3F403F',
            borderRadius: '8px',
            padding: '8px',
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
            zIndex: 50,
            boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
            animation: 'fadeIn 0.2s ease-out'
          }}
        >
          <button
            onClick={() => {
              setLanguage('EN');
              setIsHovered(false);
            }}
            style={{
              width: '100%',
              padding: '8px 12px',
              textAlign: 'left',
              background: language === 'EN' ? '#3F403F' : 'transparent',
              border: 'none',
              color: '#e0e0e0',
              fontSize: '13px',
              cursor: 'pointer',
              borderRadius: '4px',
              transition: 'background 0.2s'
            }}
            onMouseEnter={(e) => { if(language !== 'EN') e.currentTarget.style.background = '#3F403F' }}
            onMouseLeave={(e) => { if(language !== 'EN') e.currentTarget.style.background = 'transparent' }}
          >
            {t('english')}
          </button>
          <button
            onClick={() => {
              setLanguage('DE');
              setIsHovered(false);
            }}
            style={{
              width: '100%',
              padding: '8px 12px',
              textAlign: 'left',
              background: language === 'DE' ? '#3F403F' : 'transparent',
              border: 'none',
              color: '#e0e0e0',
              fontSize: '13px',
              cursor: 'pointer',
              borderRadius: '4px',
              transition: 'background 0.2s'
            }}
            onMouseEnter={(e) => { if(language !== 'DE') e.currentTarget.style.background = '#3F403F' }}
            onMouseLeave={(e) => { if(language !== 'DE') e.currentTarget.style.background = 'transparent' }}
          >
            {t('german')}
          </button>
        </div>
      )}
    </div>
  );
}
