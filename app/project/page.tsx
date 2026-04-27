'use client';

import { useState, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function ProjectContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const projectType = searchParams.get('type') || 'vfx';

  const [projectName, setProjectName] = useState('');
  const [sequence, setSequence] = useState('');
  const [totalFrames, setTotalFrames] = useState('');
  const [shotDescription, setShotDescription] = useState('');

  const [mainShot, setMainShot] = useState<File | null>(null);
  const [prevShot, setPrevShot] = useState<File | null>(null);
  const [nextShot, setNextShot] = useState<File | null>(null);
  const [mainPreview, setMainPreview] = useState<string>('');
  const [dragTarget, setDragTarget] = useState<string | null>(null);

  const handleFileSet = useCallback((file: File, setter: (f: File) => void, isMain?: boolean) => {
    setter(file);
    if (isMain) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setMainPreview(result);
        // Store base64 for API call
        const base64 = result.split(',')[1];
        sessionStorage.setItem('rendereval_image', base64);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent, setter: (f: File) => void, zone: string, isMain?: boolean) => {
    e.preventDefault();
    e.stopPropagation();
    setDragTarget(null);
    const files = e.dataTransfer.files;
    if (files.length > 0) handleFileSet(files[0], setter, isMain);
  }, [handleFileSet]);

  const handleDragOver = useCallback((e: React.DragEvent, zone: string) => {
    e.preventDefault();
    e.stopPropagation();
    setDragTarget(zone);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragTarget(null);
  }, []);

  const handleFileSelect = (setter: (f: File) => void, isMain?: boolean) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*,video/*';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) handleFileSet(file, setter, isMain);
    };
    input.click();
  };

  const handleContinue = () => {
    // Store project details in sessionStorage
    sessionStorage.setItem('rendereval_project', JSON.stringify({
      projectName,
      sequence,
      totalFrames,
      shotDescription,
      projectType,
    }));
    router.push(`/analysis?type=${projectType}`);
  };

  const UploadZone = ({
    label,
    file,
    setter,
    zone,
    isMain,
    preview,
  }: {
    label: string;
    file: File | null;
    setter: (f: File) => void;
    zone: string;
    isMain?: boolean;
    preview?: string;
  }) => (
    <div
      onClick={() => handleFileSelect(setter, isMain)}
      onDragOver={(e) => handleDragOver(e, zone)}
      onDragLeave={handleDragLeave}
      onDrop={(e) => handleDrop(e, setter, zone, isMain)}
      style={{
        flex: isMain ? 2 : 1,
        minHeight: '160px',
        border: dragTarget === zone
          ? '2px solid #3b82f6'
          : isMain
            ? '2px dashed #4a4a60'
            : '2px dashed #3a3a50',
        borderRadius: '12px',
        background: dragTarget === zone ? 'rgba(59,130,246,0.08)' : '#1F1F1E',
        display: 'flex',
        flexDirection: 'column' as const,
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        transition: 'all 0.2s',
        gap: '8px',
        padding: '20px',
        position: 'relative' as const,
        overflow: 'hidden',
      }}
    >
      {preview ? (
        <img src={preview} alt="Preview" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.4, borderRadius: '10px' }} />
      ) : null}
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={file ? '#22c55e' : '#6b7280'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="17 8 12 3 7 8" />
          <line x1="12" y1="3" x2="12" y2="15" />
        </svg>
        <span style={{ color: file ? '#22c55e' : isMain ? '#3b82f6' : '#6b7280', fontSize: '13px', fontWeight: 500, textAlign: 'center' }}>
          {file ? file.name : label}
        </span>
        {isMain && !file && (
          <span style={{ color: '#4a4a60', fontSize: '11px' }}>Required</span>
        )}
      </div>
    </div>
  );

  return (
    <div style={{ display: 'flex', minHeight: 'calc(100vh - 53px)', background: '#1F1F1E' }}>
      {/* Main Content */}
      <div style={{ flex: 1, padding: '32px 40px', display: 'flex', flexDirection: 'column' }}>
        {/* Upload Zones */}
        <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
          <UploadZone label="Previous Shot" file={prevShot} setter={(f) => handleFileSet(f, setPrevShot)} zone="prev" />
          <UploadZone label="Main Shot" file={mainShot} setter={(f) => handleFileSet(f, setMainShot, true)} zone="main" isMain preview={mainPreview} />
          <UploadZone label="Next Shot" file={nextShot} setter={(f) => handleFileSet(f, setNextShot)} zone="next" />
        </div>

        {/* Embeddable Shot Settings */}
        <div
          style={{
            border: '2px dashed #3a3a50',
            borderRadius: '12px',
            padding: '24px',
            background: '#1F1F1E',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '8px' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
            <span style={{ color: '#9ca3af', fontSize: '13px', fontWeight: 500 }}>Embeddable Shot Settings</span>
          </div>
          <p style={{ color: '#6b7280', fontSize: '11px', textAlign: 'center' }}>
            Colorspace · Alpha and Proxy · M · 27
          </p>
        </div>

        {/* Bottom Navigation */}
        <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '32px' }}>
          <button
            onClick={() => router.push('/')}
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
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#3a3a50' }} />
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#3a3a50' }} />
          </div>

          <button
            onClick={handleContinue}
            style={{
              padding: '10px 24px',
              borderRadius: '8px',
              border: 'none',
              background: mainShot ? '#3b82f6' : '#2a2a3e',
              color: mainShot ? '#fff' : '#6b7280',
              fontSize: '13px',
              cursor: mainShot ? 'pointer' : 'not-allowed',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            Start Analysis →
          </button>
        </div>
      </div>

      {/* Right Sidebar */}
      <div
        style={{
          width: '280px',
          borderLeft: '1px solid #2a2a3e',
          padding: '24px',
          background: '#393D3D',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        }}
      >
        <h3 style={{ color: '#9ca3af', fontSize: '11px', fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase' }}>
          Project Details
        </h3>

        <div>
          <label style={{ color: '#6b7280', fontSize: '11px', display: 'block', marginBottom: '6px' }}>Project Name *</label>
          <input
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            placeholder="Enter project name"
            style={{
              width: '100%',
              padding: '8px 12px',
              borderRadius: '6px',
              border: '1px solid #3a3a50',
              background: '#1F1F1E',
              color: '#e0e0e0',
              fontSize: '13px',
              outline: 'none',
            }}
          />
        </div>

        <div>
          <label style={{ color: '#6b7280', fontSize: '11px', display: 'block', marginBottom: '6px' }}>Sequence *</label>
          <input
            value={sequence}
            onChange={(e) => setSequence(e.target.value)}
            placeholder="E.g. INT_006"
            style={{
              width: '100%',
              padding: '8px 12px',
              borderRadius: '6px',
              border: '1px solid #3a3a50',
              background: '#1F1F1E',
              color: '#e0e0e0',
              fontSize: '13px',
              outline: 'none',
            }}
          />
        </div>

        <div>
          <label style={{ color: '#6b7280', fontSize: '11px', display: 'block', marginBottom: '6px' }}>Total Frames *</label>
          <input
            value={totalFrames}
            onChange={(e) => setTotalFrames(e.target.value)}
            placeholder="0"
            type="number"
            style={{
              width: '100%',
              padding: '8px 12px',
              borderRadius: '6px',
              border: '1px solid #3a3a50',
              background: '#1F1F1E',
              color: '#e0e0e0',
              fontSize: '13px',
              outline: 'none',
            }}
          />
        </div>

        <div>
          <label style={{ color: '#6b7280', fontSize: '11px', display: 'block', marginBottom: '6px' }}>Shot Description</label>
          <textarea
            value={shotDescription}
            onChange={(e) => setShotDescription(e.target.value)}
            placeholder="Describe..."
            rows={3}
            style={{
              width: '100%',
              padding: '8px 12px',
              borderRadius: '6px',
              border: '1px solid #3a3a50',
              background: '#1F1F1E',
              color: '#e0e0e0',
              fontSize: '13px',
              outline: 'none',
              resize: 'vertical',
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default function ProjectPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', background: '#1F1F1E' }} />}>
      <ProjectContent />
    </Suspense>
  );
}
