'use client';

import { useLanguage } from '../context/LanguageContext';

export default function SupportLink() {
  const { t } = useLanguage();

  return (
    <a
      href="#"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        color: '#9ca3af',
        textDecoration: 'none',
        fontSize: '13px',
      }}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
        <circle cx="12" cy="7" r="4"/>
      </svg>
      {t('support')}
    </a>
  );
}
