
export interface FinancialInput {
  totalDebt: number;
  discountMode: 'percentage' | 'fixed';
  discountValue: number; // Percent or Fixed amount based on mode
  installmentsCount: number;
  returnMode: 'monthly' | 'annual';
  returnValue: number; // Monthly or Annual rate based on mode
}

export interface MonthDetail {
  month: number;
  initialBalance: number;
  interestEarned: number;
  payment: number;
  finalBalance: number;
}

export interface ComparisonResult {
  cashPrice: number;
  totalInstallments: number;
  netGain: number;
  isInstallmentBetter: boolean;
  history: MonthDetail[];
  appliedMonthlyRate: number;
}
