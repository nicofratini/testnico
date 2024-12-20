import { DollarSign, TrendingUp, Home, PieChart, CreditCard } from 'lucide-react';
import type { Phase } from '../types';

export const phases: Phase[] = [
  {
    id: 1,
    title: "Investissement initial",
    icon: DollarSign,
    description: "Placement initial de 1M€ dans un produit financier offrant un rendement stable.",
    amount: 1000000,
    color: "bg-blue-500",
    impact: {
      value: "+5% par an",
      description: "Croissance projetée selon le niveau de risque choisi",
    },
  },
  {
    id: 2,
    title: "Effet de levier",
    icon: TrendingUp,
    description: "Utilisation de l'investissement initial comme garantie pour une ligne de crédit.",
    amount: 700000,
    color: "bg-purple-500",
    impact: {
      value: "x2.33",
      description: "Augmentation de la capacité d'investissement",
    },
  },
  {
    id: 3,
    title: "Investissement immobilier",
    icon: Home,
    description: "Utilisation progressive de la ligne de crédit pour investir dans l'immobilier.",
    amount: 700000,
    color: "bg-indigo-500",
    impact: {
      value: "+28%",
      description: "Valorisation estimée sur la revente",
    },
  },
  {
    id: 4,
    title: "Vente avec plus-value",
    icon: PieChart,
    description: "Vente des biens immobiliers avec un bénéfice net de 28%.",
    amount: 350000,
    color: "bg-green-500",
    impact: {
      value: "+350k€",
      description: "Bénéfice net réalisé",
    },
  },
  {
    id: 5,
    title: "Remboursement du crédit",
    icon: CreditCard,
    description: "Remboursement intégral de la ligne de crédit avec les gains de la vente.",
    amount: -700000,
    color: "bg-red-500",
    impact: {
      value: "1.35M€",
      description: "Capital net final disponible",
    },
  },
];