export interface CashFlowData {
  period: string;
  amount: number;
  type: 'funding' | 'sale' | 'interest';
  details?: string;
}

export interface FlowSummary {
  totalInflow: number;
  totalOutflow: number;
  netFlow: number;
}

export interface ChartConfig {
  data: ChartData;
  options: ChartOptions;
}

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string[];
    borderRadius: number;
    borderWidth: number;
    borderColor: string;
    hoverBorderColor: string;
    hoverBorderWidth: number;
  }[];
}

export interface ChartOptions {
  responsive: boolean;
  maintainAspectRatio: boolean;
  animation: {
    duration: number;
    easing: string;
  };
  plugins: {
    legend: {
      display: boolean;
    };
    tooltip: {
      backgroundColor: string;
      titleColor: string;
      bodyColor: string;
      borderColor: string;
      borderWidth: number;
      padding: number;
      cornerRadius: number;
      callbacks: {
        label: (context: any) => string;
      };
      titleFont: {
        size: number;
        weight: string;
      };
      bodyFont: {
        size: number;
      };
      displayColors: boolean;
    };
  };
  scales: {
    x: {
      grid: {
        display: boolean;
      };
      ticks: {
        font: {
          size: number;
        };
      };
    };
    y: {
      beginAtZero: boolean;
      grid: {
        color: string;
      };
      ticks: {
        callback: (value: number) => string;
        font: {
          size: number;
        };
      };
    };
  };
  hover: {
    mode: string;
    intersect: boolean;
  };
}