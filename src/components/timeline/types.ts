import { LucideIcon } from 'lucide-react';

export interface Phase {
  icon: LucideIcon;
  title: string;
  amount: number;
  description: string;
  color: string;
  details: string[];
}