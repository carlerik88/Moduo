import { type ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import type { DesignTheme } from '../../types';

interface PageWrapperProps {
  children: ReactNode;
  theme: DesignTheme;
}

const themeClasses: Record<DesignTheme, string> = {
  scandinavian: 'theme-scandinavian',
  craftsman: 'theme-craftsman',
  modern: 'theme-modern',
};

export default function PageWrapper({ children, theme }: PageWrapperProps) {
  return (
    <div className={`${themeClasses[theme]} min-h-screen flex flex-col`}>
      <Header theme={theme} />
      <main className="flex-1">{children}</main>
      <Footer theme={theme} />
    </div>
  );
}
