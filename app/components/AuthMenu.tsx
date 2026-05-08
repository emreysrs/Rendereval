'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function AuthMenu() {
  const { t } = useLanguage();
  const [isHovered, setIsHovered] = useState(false);
  const [modalType, setModalType] = useState<'none' | 'login' | 'register'>('none');
  const [user, setUser] = useState<{ email: string } | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Load user from local storage
  useEffect(() => {
    const storedUser = localStorage.getItem('rendereval_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      const newUser = { email };
      localStorage.setItem('rendereval_user', JSON.stringify(newUser));
      setUser(newUser);
      setModalType('none');
      setEmail('');
      setPassword('');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('rendereval_user');
    setUser(null);
  };

  return (
    <>
      <div 
        style={{ position: 'relative' }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {user ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ color: '#e0e0e0', fontSize: '13px' }}>{user.email.split('@')[0]}</span>
            <button
              onClick={handleLogout}
              style={{
                background: 'none',
                border: 'none',
                color: '#ef4444',
                fontSize: '13px',
                cursor: 'pointer',
                padding: 0
              }}
            >
              {t('sign_out')}
            </button>
          </div>
        ) : (
          <>
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
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
              {t('account')}
            </div>

            {/* Dropdown Menu */}
            {isHovered && (
              <div 
                style={{
                  position: 'absolute',
                  top: '100%',
                  right: 0,
                  width: '140px',
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
                  onClick={() => setModalType('login')}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    textAlign: 'left',
                    background: 'transparent',
                    border: 'none',
                    color: '#e0e0e0',
                    fontSize: '13px',
                    cursor: 'pointer',
                    borderRadius: '4px',
                    transition: 'background 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = '#3F403F'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                >
                  {t('sign_in')}
                </button>
                <button
                  onClick={() => setModalType('register')}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    textAlign: 'left',
                    background: 'transparent',
                    border: 'none',
                    color: '#e0e0e0',
                    fontSize: '13px',
                    cursor: 'pointer',
                    borderRadius: '4px',
                    transition: 'background 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = '#3F403F'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                >
                  {t('register')}
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Modal */}
      {modalType !== 'none' && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.7)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 100,
          backdropFilter: 'blur(4px)'
        }}>
          <div style={{
            background: '#1F1F1E',
            border: '1px solid #3F403F',
            borderRadius: '12px',
            padding: '32px',
            width: '100%',
            maxWidth: '360px',
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)'
          }}>
            <h2 style={{ color: '#fff', fontSize: '20px', fontWeight: 600, marginBottom: '24px', textAlign: 'center' }}>
              {modalType === 'login' ? t('welcome_back') : t('create_account')}
            </h2>
            
            <form onSubmit={handleAuth} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ color: '#9ca3af', fontSize: '11px', display: 'block', marginBottom: '6px' }}>{t('email_address')}</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '6px',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    background: '#3F403F',
                    color: '#fff',
                    fontSize: '13px',
                    outline: 'none'
                  }}
                />
              </div>
              
              <div>
                <label style={{ color: '#9ca3af', fontSize: '11px', display: 'block', marginBottom: '6px' }}>{t('password')}</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '6px',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    background: '#3F403F',
                    color: '#fff',
                    fontSize: '13px',
                    outline: 'none'
                  }}
                />
              </div>

              <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
                <button
                  type="button"
                  onClick={() => setModalType('none')}
                  style={{
                    flex: 1,
                    padding: '10px',
                    borderRadius: '6px',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    background: 'transparent',
                    color: '#fff',
                    cursor: 'pointer',
                    fontSize: '13px'
                  }}
                >
                  {t('cancel')}
                </button>
                <button
                  type="submit"
                  style={{
                    flex: 1,
                    padding: '10px',
                    borderRadius: '6px',
                    border: 'none',
                    background: '#4B8DBC',
                    color: '#fff',
                    cursor: 'pointer',
                    fontSize: '13px',
                    fontWeight: 600
                  }}
                >
                  {modalType === 'login' ? t('sign_in') : t('register')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
