import React, { useState } from 'react';
import { CashFlowHeader } from './components/CashFlowHeader';
import { CashFlowChart } from './components/CashFlowChart';
import { FlowMetrics } from './components/FlowMetrics';
import { FlowDistribution } from './components/FlowDistribution';
import { FlowDisplayOptions } from './components/FlowDisplayOptions';
import { FlowAdvancedFilters } from './components/FlowAdvancedFilters';
import { FlowDetails } from './components/FlowDetails';
import { useFilteredData } from './hooks/useFilteredData';
import type { CashFlowData } from './types';

interface ModernCashFlowProps {
  data: CashFlowData[];
  lang: 'fr' | 'en';
}

export function ModernCashFlow({ data, lang }: ModernCashFlowProps) {
  const [view, setView] = useState<'bar' | 'line' | 'distribution'>('bar');
  const [showDetails, setShowDetails] = useState(false);
  const [filters, setFilters] = useState({
    types: [],
    minAmount: null,
    maxAmount: null,
    dateRange: [null, null]
  });

  const filteredData = useFilteredData(data, filters);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mt-8">
      <CashFlowHeader lang={lang} />
      
      <FlowDisplayOptions
        view={view}
        onViewChange={setView}
        showDetails={showDetails}
        onToggleDetails={() => setShowDetails(!showDetails)}
        lang={lang}
      />

      <FlowAdvancedFilters
        filters={filters}
        onFilterChange={setFilters}
        lang={lang}
      />

      <FlowMetrics data={filteredData} lang={lang} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <CashFlowChart 
          data={filteredData} 
          view={view}
          lang={lang} 
        />
        {view === 'distribution' && (
          <FlowDistribution data={filteredData} lang={lang} />
        )}
      </div>

      {showDetails && (
        <FlowDetails data={filteredData} lang={lang} />
      )}
    </div>
  );
}