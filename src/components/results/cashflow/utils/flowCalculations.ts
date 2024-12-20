import type { CashFlowData, FlowSummary } from '../types';

export function calculateFlowSummary(data: CashFlowData[]): FlowSummary {
  return data.reduce((summary, flow) => {
    if (flow.amount > 0) {
      summary.totalInflow += flow.amount;
    } else {
      summary.totalOutflow += Math.abs(flow.amount);
    }
    summary.netFlow = summary.totalInflow - summary.totalOutflow;
    return summary;
  }, {
    totalInflow: 0,
    totalOutflow: 0,
    netFlow: 0
  });
}

export function calculatePercentages(data: CashFlowData[]) {
  const maxAmount = Math.max(...data.map(flow => Math.abs(flow.amount)));
  return data.map(flow => ({
    ...flow,
    percentage: (Math.abs(flow.amount) / maxAmount) * 100
  }));
}