import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthMenu from "./components/AuthMenu";
import LanguageMenu from "./components/LanguageMenu";
import SupportLink from "./components/SupportLink";
import { LanguageProvider } from "./context/LanguageContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "RENDEREVAL — AI-Powered Render Evaluation",
  description: "AI-powered render evaluation for professional VFX and animation pipelines",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col" style={{ background: '#000000' }}>
        <LanguageProvider>
          {/* Global Navbar */}
          <nav
            style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '12px 24px',
            background: '#000000',
            borderBottom: '1px solid rgba(255, 255, 255, 0.3)',
            position: 'sticky',
            top: 0,
            zIndex: 100,
          }}
        >
          <a href="/" style={{ textDecoration: 'none' }}>
            <span
              style={{
                color: '#4ecdc4',
                fontWeight: 700,
                fontSize: '14px',
                letterSpacing: '2px',
                textTransform: 'uppercase',
              }}
            >
              RENDEREVAL
            </span>
          </a>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <LanguageMenu />
            <div style={{ width: '1px', height: '14px', background: 'rgba(255, 255, 255, 0.2)' }} />
            <SupportLink />
            <div style={{ width: '1px', height: '14px', background: 'rgba(255, 255, 255, 0.2)' }} />
            <AuthMenu />
          </div>
        </nav>
        <main style={{ flex: 1 }}>{children}</main>
        </LanguageProvider>
      </body>
    </html>
  );
}
