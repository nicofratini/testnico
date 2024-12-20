import React from 'react';
import { Globe, Settings } from 'lucide-react';
import { useTranslation } from '../i18n';
import { CycleSettings } from './parameters/CycleSettings';
import type { SimulationParameters } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  lang: 'fr' | 'en';
  onLanguageChange: (lang: 'fr' | 'en') => void;
  parameters: SimulationParameters;
  onParametersChange: (params: Partial<SimulationParameters>) => void;
}

export function Layout({ 
  children, 
  lang, 
  onLanguageChange,
  parameters,
  onParametersChange
}: LayoutProps) {
  const { t } = useTranslation(lang);
  const [showCycleSettings, setShowCycleSettings] = React.useState(false);

  const handleCycleSettingsSave = (updates: Partial<SimulationParameters>) => {
    onParametersChange(updates);
    setShowCycleSettings(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <header className="fixed top-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-lg border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
          <h1 className="text-xl font-semibold text-gray-800">
            {t('common.title')}
          </h1>
          
          <div className="flex items-center gap-4">
            {/* Cycle Settings Button */}
            <button
              onClick={() => setShowCycleSettings(true)}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
            >
              <Settings className="w-4 h-4" />
              {t('parameters.cycleSettings')}
            </button>

            {/* Language Selector */}
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-gray-500" />
              <select
                value={lang}
                onChange={(e) => onLanguageChange(e.target.value as 'fr' | 'en')}
                className="text-sm bg-transparent border-none focus:ring-0 text-gray-700 font-medium"
              >
                <option value="fr">Français</option>
                <option value="en">English</option>
              </select>
            </div>
          </div>
        </div>
      </header>

      <main className="pt-24 pb-16 px-4">
        {children}
      </main>

      {/* Cycle Settings Modal */}
      {showCycleSettings && (
        <CycleSettings
          onClose={() => setShowCycleSettings(false)}
          onSave={handleCycleSettingsSave}
          lang={lang}
          cycleDuration={parameters.cycleDuration}
          saleMargin={parameters.saleMargin}
          fundingPhases={parameters.fundingPhases}
        />
      )}
    </div>
  );
}