
import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { ParameterCard } from './components/parameters/ParameterCard';
import { ResultsSummary } from './components/results/ResultsSummary';
import { InteractiveTimeline } from './components/timeline';
import { useSimulation } from './hooks/useSimulation';

export default function App() {
  const [lang, setLang] = useState<'fr' | 'en'>('fr');
  const { parameters, results, updateParameters } = useSimulation();

  return (
    <Layout 
      lang={lang} 
      onLanguageChange={setLang}
      parameters={parameters}
      onParametersChange={updateParameters}
    >
      <div className="max-w-7xl mx-auto space-y-8">
        <ParameterCard 
          parameters={parameters}
          onParametersChange={updateParameters}
          lang={lang}
        />
        
        <ResultsSummary 
          results={results}
          lang={lang}
        />

        <InteractiveTimeline lang={lang} />
      </div>
    </Layout>
  );
}
