
import { FinancialInput, ComparisonResult, MonthDetail } from '../types';

export const calculateComparison = (input: FinancialInput): ComparisonResult => {
  const { totalDebt, discountMode, discountValue, installmentsCount, returnMode, returnValue } = input;
  
  // Calculate Cash Price
  let cashPrice = 0;
  if (discountMode === 'percentage') {
    cashPrice = totalDebt * (1 - discountValue / 100);
  } else {
    cashPrice = Math.max(0, totalDebt - discountValue);
  }

  // Calculate Monthly Rate
  let monthlyRate = 0;
  if (returnMode === 'monthly') {
    monthlyRate = returnValue / 100;
  } else {
    // Conversion from Annual Rate to Monthly Rate (Compounding formula)
    // r_monthly = (1 + r_annual)^(1/12) - 1
    monthlyRate = Math.pow(1 + returnValue / 100, 1 / 12) - 1;
  }

  const monthlyInstallment = totalDebt / installmentsCount;

  // Scenario: The user has the money for cash payment but invests it and pays installments.
  let currentBalance = cashPrice;
  const history: MonthDetail[] = [];

  for (let i = 1; i <= installmentsCount; i++) {
    const initialBalance = currentBalance;
    const interestEarned = currentBalance * monthlyRate;
    const payment = monthlyInstallment;
    
    // We assume earnings happen on the current balance before the installment is paid for the month.
    const balanceAfterInterest = initialBalance + interestEarned;
    currentBalance = balanceAfterInterest - payment;

    history.push({
      month: i,
      initialBalance,
      interestEarned,
      payment,
      finalBalance: currentBalance
    });
  }

  return {
    cashPrice,
    totalInstallments: totalDebt,
    netGain: currentBalance,
    isInstallmentBetter: currentBalance > 0,
    history,
    appliedMonthlyRate: monthlyRate * 100
  };
};

export const formatCurrency = (value: number, lang: string = 'en'): string => {
  const configs: Record<string, { locale: string, currency: string }> = {
    pt: { locale: 'pt-BR', currency: 'BRL' },
    en: { locale: 'en-US', currency: 'USD' },
    es: { locale: 'es-ES', currency: 'EUR' }
  };
  const { locale, currency } = configs[lang] || configs.en;

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
};
