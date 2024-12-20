import { DollarSign, TrendingUp, Home, PieChart, CreditCard } from 'lucide-react';

export const phases = [
  {
    id: 1,
    label: 'Investissement initial',
    icon: DollarSign,
    description: '1M€ investi dans un produit financier.',
    amount: 1000000,
    color: 'bg-green-500',
  },
  {
    id: 2,
    label: 'Effet de levier',
    icon: TrendingUp,
    description: '700k€ débloqués via une ligne de crédit.',
    amount: 700000,
    color: 'bg-blue-500',
  },
  {
    id: 3,
    label: 'Investissement immobilier',
    icon: Home,
    description: 'Investissement progressif dans l’immobilier.',
    amount: 1200000,
    color: 'bg-yellow-500',
  },
  {
    id: 4,
    label: 'Vente avec plus-value',
    icon: PieChart,
    description: 'Vente générant une plus-value de 28%.',
    amount: 350000,
    color: 'bg-purple-500',
  },
  {
    id: 5,
    label: 'Remboursement du crédit',
    icon: CreditCard,
    description: 'Remboursement des 700k€ avec intérêts.',
    amount: 700000,
    color: 'bg-red-500',
  },
];
