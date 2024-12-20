import React, { useState } from 'react';
import { CashFlowHeader } from './components/CashFlowHeader';
import { CashFlowChart } from './components/CashFlowChart';
import { CashFlowLegend } from './components/CashFlowLegend';
import { CashFlowSummary } from './components/CashFlowSummary';
import { FlowAnalytics } from './components/FlowAnalytics';
import { FlowTrends } from './components/FlowTrends';
import { FlowFilters } from './components/FlowFilters';
import { FlowDetails } from './components/FlowDetails';
import { useFilteredFlows } from './hooks/useFilteredFlows';
import type { CashFlowData } from './types';

interface ModernCashFlowTimelineProps {
  data: CashFlowData[];
  lang: 'fr' | 'en';
}

export function ModernCashFlowTimeline({ data, lang }: ModernCashFlowTimelineProps) {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const filteredData = useFilteredFlows(data, selectedTypes);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mt-8">
      <CashFlowHeader lang={lang} />
      <CashFlowSummary data={filteredData} lang={lang} />
      <FlowAnalytics data={filteredData} lang={lang} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <CashFlowChart data={filteredData} lang={lang} />
        <FlowTrends data={filteredData} lang={lang} />
      </div>
      <FlowFilters
        selectedTypes={selectedTypes}
        onTypeChange={setSelectedTypes}
        lang={lang}
      />
      <CashFlowLegend lang={lang} />
      <FlowDetails data={filteredData} lang={lang} />
    </div>
  );
}