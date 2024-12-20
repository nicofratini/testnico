import React from 'react';
import { Globe } from 'lucide-react';

interface LanguageToggleProps {
  value: 'fr' | 'en';
  onChange: (lang: 'fr' | 'en') => void;
}

export function LanguageToggle({ value, onChange }: LanguageToggleProps) {
  return (
    <div className="flex items-center gap-2">
      <Globe className="w-4 h-4 text-gray-500" />
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as 'fr' | 'en')}
        className="text-sm bg-transparent border-none focus:ring-0 text-gray-700 font-medium"
      >
        <option value="fr">Français</option>
        <option value="en">English</option>
      </select>
    </div>
  );
}