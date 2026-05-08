'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'EN' | 'DE';

const translations = {
  EN: {
    'title': 'RENDEREVAL — AI-Powered Render Evaluation',
    'description': 'AI-powered render evaluation for professional pipelines',
    'vfx': 'VFX',
    'animation': 'ANIMATION',
    'continue': 'Continue',
    'account': 'Account',
    'sign_in': 'Sign In',
    'sign_out': 'Sign Out',
    'register': 'Register',
    'welcome_back': 'Welcome Back',
    'create_account': 'Create Account',
    'email_address': 'Email Address',
    'password': 'Password',
    'cancel': 'Cancel',
    'support': 'Support',
    'english': 'English (EN)',
    'german': 'Deutsch (DE)',
    'project_setup': 'Project Setup',
    'summary': 'Summary',
    'analysis': 'Analysis',
    'results': 'Results',
    'project_name': 'Project Name *',
    'sequence': 'Sequence *',
    'total_frames': 'Total Frames *',
    'shot_description': 'Shot Description',
    'embeddable_settings': 'Embeddable Shot Settings',
    'start_frame': 'Start Frame',
    'end_frame': 'End Frame',
    'render_time_limit': 'Render Time Limit',
    'criteria': 'Criteria',
    'ai_evaluation_brief': 'AI EVALUATION BRIEF',
    'ai_confidence_score': 'AI Confidence Score',
    'required': 'Required',
    'generate_report': 'Generate Full Report',
    'processing': 'Processing...',
    'upload_image': 'Click or Drag Image Here',
    'evaluating': 'Evaluating frame criteria...',
    'previous_shot': 'Previous Shot',
    'main_shot': 'Main Shot',
    'next_shot': 'Next Shot',
    'enter_project_name': 'Enter project name',
    'eg_sequence': 'E.g. INT_006',
    'start_analysis': 'Start Analysis',
  },
  DE: {
    'title': 'RENDEREVAL — KI-gestützte Renderbewertung',
    'description': 'KI-gestützte Renderbewertung für professionelle Pipelines',
    'vfx': 'VFX',
    'animation': 'ANIMATION',
    'continue': 'Weiter',
    'account': 'Konto',
    'sign_in': 'Anmelden',
    'sign_out': 'Abmelden',
    'register': 'Registrieren',
    'welcome_back': 'Willkommen zurück',
    'create_account': 'Konto erstellen',
    'email_address': 'E-Mail Adresse',
    'password': 'Passwort',
    'cancel': 'Abbrechen',
    'support': 'Unterstützung',
    'english': 'Englisch (EN)',
    'german': 'Deutsch (DE)',
    'project_setup': 'Projekteinrichtung',
    'summary': 'Zusammenfassung',
    'analysis': 'Analyse',
    'results': 'Ergebnisse',
    'project_name': 'Projektname *',
    'sequence': 'Sequenz *',
    'total_frames': 'Gesamte Frames *',
    'shot_description': 'Shot Beschreibung',
    'embeddable_settings': 'Einbettbare Shot-Einstellungen',
    'start_frame': 'Start Frame',
    'end_frame': 'End Frame',
    'render_time_limit': 'Renderzeit Limit',
    'criteria': 'Kriterien',
    'ai_evaluation_brief': 'KI BEWERTUNGSBERICHT',
    'ai_confidence_score': 'KI Vertrauenswert',
    'required': 'Erforderlich',
    'generate_report': 'Vollständigen Bericht generieren',
    'processing': 'Verarbeitung...',
    'upload_image': 'Klicken oder Bild hierher ziehen',
    'evaluating': 'Rahmenkriterien werden bewertet...',
    'previous_shot': 'Vorheriger Shot',
    'main_shot': 'Haupt-Shot',
    'next_shot': 'Nächster Shot',
    'enter_project_name': 'Projektname eingeben',
    'eg_sequence': 'Z.B. INT_006',
    'start_analysis': 'Analyse starten',
  }
};

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof typeof translations['EN']) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('EN');

  const t = (key: keyof typeof translations['EN']) => {
    return translations[language][key] || translations['EN'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
