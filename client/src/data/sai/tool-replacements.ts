import {
  Palette,
  FileSignature,
  FolderKanban,
  Calculator,
  Bot,
  Mail,
  Share2,
  Target,
  TrendingUp,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface ReplacementTool {
  id: string;
  name: string;
  category: string;
  monthlyPriceLow: number;
  monthlyPriceHigh: number;
  description: string;
  saiModule: string;
  icon: LucideIcon;
  popular?: boolean;
}

export const replacementTools: ReplacementTool[] = [
  {
    id: 'canva-pro',
    name: 'Canva Pro',
    category: 'Content Creation',
    monthlyPriceLow: 13,
    monthlyPriceHigh: 13,
    description: 'Create graphics, flyers, social posts',
    saiModule: 'Content Studio',
    icon: Palette,
    popular: true,
  },
  {
    id: 'docusign',
    name: 'DocuSign',
    category: 'Document Signing',
    monthlyPriceLow: 25,
    monthlyPriceHigh: 45,
    description: 'Electronic document signing',
    saiModule: 'The Office',
    icon: FileSignature,
    popular: true,
  },
  {
    id: 'dotloop',
    name: 'Dotloop',
    category: 'Transaction Management',
    monthlyPriceLow: 31,
    monthlyPriceHigh: 59,
    description: 'Transaction workflows',
    saiModule: 'The Office',
    icon: FolderKanban,
    popular: true,
  },
  {
    id: 'quickbooks',
    name: 'QuickBooks',
    category: 'Expense Tracking',
    monthlyPriceLow: 30,
    monthlyPriceHigh: 30,
    description: 'Accounting & expenses',
    saiModule: 'Taxes & Expenses',
    icon: Calculator,
    popular: true,
  },
  {
    id: 'chatgpt-plus',
    name: 'ChatGPT Plus',
    category: 'AI Assistance',
    monthlyPriceLow: 20,
    monthlyPriceHigh: 20,
    description: 'AI writing assistant',
    saiModule: 'SAI Assistant',
    icon: Bot,
    popular: true,
  },
  {
    id: 'mailchimp',
    name: 'Mailchimp',
    category: 'Email Marketing',
    monthlyPriceLow: 20,
    monthlyPriceHigh: 50,
    description: 'Email campaigns',
    saiModule: 'Content Studio',
    icon: Mail,
  },
  {
    id: 'buffer-hootsuite',
    name: 'Buffer/Hootsuite',
    category: 'Social Media',
    monthlyPriceLow: 15,
    monthlyPriceHigh: 50,
    description: 'Social scheduling',
    saiModule: 'Content Studio',
    icon: Share2,
  },
  {
    id: 'lead-gen-tools',
    name: 'Lead Gen Tools',
    category: 'Lead Generation',
    monthlyPriceLow: 50,
    monthlyPriceHigh: 200,
    description: 'Lead capture & nurturing',
    saiModule: 'CRM',
    icon: Target,
  },
  {
    id: 'market-analytics',
    name: 'Market Analytics',
    category: 'Market Data',
    monthlyPriceLow: 30,
    monthlyPriceHigh: 100,
    description: 'Property & market data',
    saiModule: 'REID',
    icon: TrendingUp,
  },
];

export const SAI_MONTHLY_PRICE = 499;

export const calculateTotalCost = (selectedIds: string[]): { low: number; high: number } => {
  const selected = replacementTools.filter((t) => selectedIds.includes(t.id));
  return {
    low: selected.reduce((sum, t) => sum + t.monthlyPriceLow, 0),
    high: selected.reduce((sum, t) => sum + t.monthlyPriceHigh, 0),
  };
};

export const getPopularToolIds = (): string[] => {
  return replacementTools.filter((t) => t.popular).map((t) => t.id);
};
