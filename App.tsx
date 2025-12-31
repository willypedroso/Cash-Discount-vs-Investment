
import React, { useState, useMemo, useEffect } from 'react';
import { FinancialInput } from './types';
import { calculateComparison, formatCurrency } from './services/calculator';
import ComparisonChart from './components/ComparisonChart';
import { translations, Language } from './translations';
import { 
  Calculator, 
  TrendingUp, 
  CreditCard, 
  ChevronDown, 
  ChevronUp,
  Info, 
  CheckCircle2,
  XCircle,
  PiggyBank,
  ArrowRightLeft,
  Calendar,
  DollarSign,
  Languages,
  Sun,
  Moon
} from 'lucide-react';

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('en');
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const t = translations[lang];

  const [inputs, setInputs] = useState<FinancialInput>({
    totalDebt: 5000,
    discountMode: 'percentage',
    discountValue: 10,
    installmentsCount: 12,
    returnMode: 'annual',
    returnValue: 11.25,
  });

  const [showDetails, setShowDetails] = useState(false);

  const results = useMemo(() => calculateComparison(inputs), [inputs]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs(prev => ({
      ...prev,
      [name]: parseFloat(value) || 0
    }));
  };

  const toggleDiscountMode = () => {
    setInputs(prev => ({
      ...prev,
      discountMode: prev.discountMode === 'percentage' ? 'fixed' : 'percentage',
      discountValue: 0
    }));
  };

  const toggleReturnMode = () => {
    setInputs(prev => ({
      ...prev,
      returnMode: prev.returnMode === 'monthly' ? 'annual' : 'monthly',
      returnValue: prev.returnMode === 'monthly' ? 11.25 : 0.9
    }));
  };

  const handleLangChange = (newLang: Language) => {
    setLang(newLang);
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <div className={`min-h-screen pb-20 transition-colors duration-500 ${theme === 'dark' ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      {/* Top Header Background */}
      <div className={`fixed top-0 left-0 w-full h-[32rem] -z-10 overflow-hidden transition-colors duration-500 ${theme === 'dark' ? 'bg-slate-950' : 'bg-white'}`}>
        <div className={`absolute inset-0 transition-opacity duration-500 ${theme === 'dark' ? 'opacity-100' : 'opacity-0'} bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950`}></div>
        <div className={`absolute inset-0 transition-opacity duration-500 ${theme === 'light' ? 'opacity-100' : 'opacity-0'} bg-gradient-to-b from-indigo-50/80 via-white to-white`}></div>
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-500/10 blur-[120px] rounded-full"></div>
        <div className={`absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t transition-colors duration-500 ${theme === 'dark' ? 'from-slate-900' : 'from-slate-50'} to-transparent`}></div>
      </div>

      {/* Control Bar */}
      <div className="fixed top-4 right-4 z-50 flex items-center gap-3">
        {/* Theme Switcher */}
        <button
          onClick={toggleTheme}
          className={`p-2.5 backdrop-blur-md border rounded-2xl transition-all shadow-lg ${
            theme === 'dark' 
            ? 'bg-white/10 border-white/20 text-white hover:bg-white/20' 
            : 'bg-white/80 border-slate-200 text-slate-900 hover:bg-white shadow-slate-200/50'
          }`}
          aria-label="Toggle Theme"
        >
          {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
        </button>

        {/* Language Switcher */}
        <div className={`flex items-center gap-2 backdrop-blur-md border p-1.5 rounded-2xl shadow-lg transition-colors ${
          theme === 'dark' ? 'bg-white/10 border-white/20' : 'bg-white/80 border-slate-200'
        }`}>
          <div className={`p-2 transition-colors ${theme === 'dark' ? 'text-white/60' : 'text-slate-400'}`}>
            <Languages className="w-5 h-5" />
          </div>
          {(['pt', 'en', 'es'] as Language[]).map((l) => (
            <button
              key={l}
              onClick={() => handleLangChange(l)}
              className={`px-3 py-1.5 rounded-xl font-black text-xs transition-all uppercase ${
                lang === l 
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/40' 
                : theme === 'dark' ? 'text-white/70 hover:bg-white/5' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {l}
            </button>
          ))}
        </div>
      </div>

      <header className="pt-12 pb-16 px-4 text-center">
        <div className="max-w-5xl mx-auto">
          <div className={`inline-flex items-center justify-center p-4 rounded-3xl border mb-6 backdrop-blur-sm transition-colors ${
            theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-indigo-600/10 border-indigo-200'
          }`}>
            <Calculator className={`w-10 h-10 drop-shadow-[0_0_8px_rgba(129,140,248,0.5)] ${theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600'}`} />
          </div>
          <h1 className={`text-4xl md:text-6xl font-display font-black mb-4 tracking-tight transition-colors duration-500 ${
            theme === 'dark' ? 'text-white drop-shadow-md' : 'text-slate-950'
          }`}>
            {t.title}
          </h1>
          <p className={`text-lg md:text-2xl max-w-2xl mx-auto font-semibold transition-colors duration-500 ${
            theme === 'dark' ? 'text-indigo-100 drop-shadow-sm' : 'text-indigo-900/70'
          }`}>
            {t.subtitle}
          </p>
          <div className="mt-4 flex justify-center">
            <div className={`h-1.5 w-24 rounded-full transition-all duration-500 shadow-[0_0_15px_rgba(99,102,241,0.6)] ${
              theme === 'dark' ? 'bg-indigo-500' : 'bg-indigo-600'
            }`}></div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-8 -mt-4">
        {/* Input Panel */}
        <section className="lg:col-span-4 space-y-6">
          <div className={`rounded-[1.5rem] shadow-2xl border transition-all duration-300 p-7 ${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
            <div className="flex items-center gap-3 mb-6">
              <div className={`p-2 rounded-lg shadow-lg ${theme === 'dark' ? 'bg-indigo-600' : 'bg-slate-950'}`}>
                <ArrowRightLeft className="w-5 h-5 text-indigo-400" />
              </div>
              <h2 className={`text-xl font-display font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-950'}`}>{t.dataEntry}</h2>
            </div>
            
            <div className="space-y-5">
              <div className="group">
                <label className={`block text-[13px] font-extrabold uppercase tracking-wider mb-2 transition-colors ${theme === 'dark' ? 'text-slate-400 group-focus-within:text-indigo-400' : 'text-slate-700 group-focus-within:text-indigo-700'}`}>
                  {t.totalDebt}
                </label>
                <div className="relative">
                  <span className={`absolute left-4 top-1/2 -translate-y-1/2 font-black ${theme === 'dark' ? 'text-white' : 'text-slate-950'}`}>
                    {lang === 'pt' ? 'R$' : lang === 'es' ? '€' : '$'}
                  </span>
                  <input 
                    type="number"
                    name="totalDebt"
                    value={inputs.totalDebt}
                    onChange={handleInputChange}
                    className={`w-full pl-12 pr-4 py-4 border-2 rounded-xl transition-all outline-none text-xl font-black ${
                      theme === 'dark' 
                      ? 'bg-slate-900 border-slate-700 text-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10' 
                      : 'bg-slate-50 border-slate-200 text-slate-950 focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100'
                    }`}
                  />
                </div>
              </div>

              <div className="group">
                <div className="flex items-center justify-between mb-2">
                  <label className={`text-[13px] font-extrabold uppercase tracking-wider flex items-center gap-1 transition-colors ${theme === 'dark' ? 'text-slate-400 group-focus-within:text-indigo-400' : 'text-slate-700 group-focus-within:text-indigo-700'}`}>
                    {t.cashDiscount}
                  </label>
                  <button 
                    onClick={toggleDiscountMode}
                    className={`text-[11px] px-3 py-1.5 rounded-lg font-black uppercase transition-all shadow-sm ${
                      theme === 'dark' 
                      ? 'bg-slate-700 text-indigo-300 hover:bg-indigo-600 hover:text-white' 
                      : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-600 hover:text-white'
                    }`}
                  >
                    {t.changeTo} {inputs.discountMode === 'percentage' ? (lang === 'pt' ? 'R$' : lang === 'es' ? '€' : '$') : '%'}
                  </button>
                </div>
                <div className="relative">
                  {inputs.discountMode === 'fixed' && (
                    <span className={`absolute left-4 top-1/2 -translate-y-1/2 font-black ${theme === 'dark' ? 'text-white' : 'text-slate-950'}`}>
                      {lang === 'pt' ? 'R$' : lang === 'es' ? '€' : '$'}
                    </span>
                  )}
                  <input 
                    type="number"
                    name="discountValue"
                    value={inputs.discountValue}
                    onChange={handleInputChange}
                    className={`w-full ${inputs.discountMode === 'fixed' ? 'pl-12' : 'px-4'} pr-12 py-4 border-2 rounded-xl transition-all outline-none font-black text-xl ${
                      theme === 'dark' 
                      ? 'bg-slate-900 border-slate-700 text-white focus:border-indigo-500' 
                      : 'bg-slate-50 border-slate-200 text-slate-950 focus:bg-white focus:border-indigo-600'
                    }`}
                  />
                  <span className={`absolute right-4 top-1/2 -translate-y-1/2 font-black text-xl ${theme === 'dark' ? 'text-slate-500' : 'text-slate-600'}`}>
                    {inputs.discountMode === 'percentage' ? '%' : <DollarSign className="w-6 h-6 text-indigo-600" />}
                  </span>
                </div>
              </div>

              <div className="group">
                <label className={`block text-[13px] font-extrabold uppercase tracking-wider mb-2 flex items-center gap-1 transition-colors ${theme === 'dark' ? 'text-slate-400 group-focus-within:text-indigo-400' : 'text-slate-700 group-focus-within:text-indigo-700'}`}>
                  <Calendar className="w-5 h-5 text-indigo-600" /> {t.monthsToPay}
                </label>
                <input 
                  type="number"
                  name="installmentsCount"
                  value={inputs.installmentsCount}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-4 border-2 rounded-xl transition-all outline-none font-black text-xl ${
                    theme === 'dark' 
                    ? 'bg-slate-900 border-slate-700 text-white focus:border-indigo-500' 
                    : 'bg-slate-50 border-slate-200 text-slate-950 focus:bg-white focus:border-indigo-600'
                  }`}
                />
              </div>

              <div className="group">
                <div className="flex items-center justify-between mb-2">
                  <label className={`text-[13px] font-extrabold uppercase tracking-wider flex items-center gap-1 transition-colors ${theme === 'dark' ? 'text-slate-400 group-focus-within:text-indigo-400' : 'text-slate-700 group-focus-within:text-indigo-700'}`}>
                    <PiggyBank className="w-5 h-5 text-indigo-600" /> {t.investmentRate}
                  </label>
                  <button 
                    onClick={toggleReturnMode}
                    className={`text-[11px] px-3 py-1.5 rounded-lg font-black uppercase transition-all shadow-sm ${
                      theme === 'dark' 
                      ? 'bg-slate-700 text-indigo-300 hover:bg-indigo-600 hover:text-white' 
                      : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-600 hover:text-white'
                    }`}
                  >
                    {t.useRate} {inputs.returnMode === 'monthly' ? t.annual : t.monthly}
                  </button>
                </div>
                <div className="relative">
                  <input 
                    type="number"
                    name="returnValue"
                    step="0.01"
                    value={inputs.returnValue}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-4 border-2 rounded-xl transition-all outline-none text-xl font-black ${
                      theme === 'dark' 
                      ? 'bg-slate-900 border-slate-700 text-white focus:border-indigo-500' 
                      : 'bg-slate-50 border-slate-200 text-slate-950 focus:bg-white focus:border-indigo-600'
                    }`}
                  />
                  <span className={`absolute right-4 top-1/2 -translate-y-1/2 font-black text-base px-2 py-1 rounded-md ${theme === 'dark' ? 'bg-slate-700 text-slate-300' : 'bg-slate-200 text-slate-700'}`}>
                    % {inputs.returnMode === 'monthly' ? 'a.m.' : 'a.a.'}
                  </span>
                </div>
                <div className="mt-3 bg-indigo-600 p-3 rounded-xl border-l-4 border-indigo-300 shadow-md">
                  <p className="text-[12px] text-white font-bold flex justify-between items-center">
                    <span>{t.realMonthlyRate}</span>
                    <span className="text-lg">{results.appliedMonthlyRate.toFixed(4)}%</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className={`rounded-[1.5rem] p-6 shadow-2xl border transition-colors duration-300 ${theme === 'dark' ? 'bg-slate-800 border-indigo-500/20 text-white' : 'bg-slate-950 text-white border-transparent'}`}>
            <h3 className="text-indigo-400 font-display font-black text-lg mb-3 flex items-center gap-2">
              <TrendingUp className="w-6 h-6" /> {t.warningTitle}
            </h3>
            <p className={`text-sm leading-relaxed font-bold ${theme === 'dark' ? 'text-slate-300' : 'text-slate-200'}`}>
              {t.warningText}
            </p>
          </div>
        </section>

        {/* Results Panel */}
        <section className="lg:col-span-8 space-y-6">
          <div className={`rounded-[1.5rem] shadow-2xl border-2 transition-all duration-300 overflow-hidden ${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
            <div className={`p-10 border-b-[8px] transition-all duration-500 ${results.isInstallmentBetter ? (theme === 'dark' ? 'bg-emerald-950/20 border-emerald-600' : 'bg-emerald-50 border-emerald-600') : (theme === 'dark' ? 'bg-orange-950/20 border-orange-600' : 'bg-orange-50 border-orange-600')}`}>
              <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                <div className={`w-24 h-24 rounded-3xl flex items-center justify-center shrink-0 shadow-2xl ${results.isInstallmentBetter ? 'bg-emerald-600 text-white' : 'bg-orange-600 text-white'}`}>
                  {results.isInstallmentBetter ? <CheckCircle2 className="w-14 h-14" /> : <XCircle className="w-14 h-14" />}
                </div>
                
                <div className="flex-1 text-center md:text-left">
                  <div className={`text-[12px] font-black uppercase tracking-[0.2em] mb-2 opacity-60 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>{t.verdictTitle}</div>
                  <h2 className={`text-3xl md:text-5xl font-display font-black mb-3 leading-tight ${theme === 'dark' ? 'text-white' : 'text-slate-950'}`}>
                    {results.isInstallmentBetter ? t.installmentBetter : t.cashBetter}
                  </h2>
                  <p className={`text-xl md:text-2xl font-bold leading-relaxed ${theme === 'dark' ? 'text-slate-300' : 'text-slate-800'}`}>
                    {t.savingsMessage} <span className={`inline-block px-3 py-1 rounded-xl border-2 font-black shadow-sm ${
                      theme === 'dark' 
                      ? 'bg-slate-900 border-slate-700 ' + (results.isInstallmentBetter ? 'text-emerald-400' : 'text-orange-400') 
                      : 'bg-white ' + (results.isInstallmentBetter ? 'text-emerald-700 border-emerald-200' : 'text-orange-700 border-orange-200')
                    }`}>{formatCurrency(Math.abs(results.netGain), lang)}</span>
                  </p>
                </div>
              </div>
            </div>

            <div className={`p-8 md:p-10 grid grid-cols-1 md:grid-cols-3 gap-6 transition-colors duration-300 ${theme === 'dark' ? 'bg-slate-900/50' : 'bg-slate-50/50'}`}>
              <div className={`space-y-1 p-5 border-2 rounded-2xl shadow-sm transition-all ${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100'}`}>
                <span className={`text-[11px] font-black uppercase tracking-widest ${theme === 'dark' ? 'text-slate-500' : 'text-slate-500'}`}>{t.cashPrice}</span>
                <div className={`text-2xl font-display font-black ${theme === 'dark' ? 'text-white' : 'text-slate-950'}`}>{formatCurrency(results.cashPrice, lang)}</div>
              </div>
              <div className={`space-y-1 p-5 border-2 rounded-2xl shadow-sm transition-all ${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100'}`}>
                <span className={`text-[11px] font-black uppercase tracking-widest ${theme === 'dark' ? 'text-slate-500' : 'text-slate-500'}`}>{t.totalInstallments}</span>
                <div className={`text-2xl font-display font-black ${theme === 'dark' ? 'text-white' : 'text-slate-950'}`}>{formatCurrency(results.totalInstallments, lang)}</div>
              </div>
              <div className={`space-y-1 p-5 rounded-2xl shadow-xl md:text-right transition-all ${theme === 'dark' ? 'bg-indigo-900 border border-indigo-500/30' : 'bg-indigo-950'}`}>
                <span className={`text-[11px] font-black uppercase tracking-widest ${theme === 'dark' ? 'text-indigo-300' : 'text-indigo-300'}`}>{t.netGain}</span>
                <div className={`text-3xl font-display font-black ${results.isInstallmentBetter ? (theme === 'dark' ? 'text-emerald-400' : 'text-emerald-400') : (theme === 'dark' ? 'text-orange-400' : 'text-orange-400')}`}>
                  {results.netGain > 0 ? '+' : ''}{formatCurrency(results.netGain, lang)}
                </div>
              </div>
            </div>

            <div className="px-8 md:px-10 pb-10">
              <div className={`flex items-center justify-between mb-6 border-b-2 pb-4 ${theme === 'dark' ? 'border-slate-700' : 'border-slate-100'}`}>
                <h3 className={`text-[14px] font-black uppercase tracking-widest ${theme === 'dark' ? 'text-white' : 'text-slate-950'}`}>{t.projectionTitle}</h3>
                <div className={`flex items-center gap-3 px-3 py-1.5 rounded-full border transition-all ${theme === 'dark' ? 'bg-slate-900 border-slate-700' : 'bg-indigo-50 border-indigo-100'}`}>
                  <div className="w-4 h-4 rounded-full bg-indigo-600"></div>
                  <span className={`text-[12px] font-black uppercase ${theme === 'dark' ? 'text-slate-300' : 'text-indigo-900'}`}>{t.accumulatedCapital}</span>
                </div>
              </div>
              <ComparisonChart data={results.history} theme={theme} />
            </div>
          </div>

          <div className={`rounded-[1.5rem] shadow-2xl border transition-all duration-300 overflow-hidden ${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
            <button 
              onClick={() => setShowDetails(!showDetails)}
              className={`w-full px-8 py-7 flex items-center justify-between transition-all group ${theme === 'dark' ? 'hover:bg-slate-700' : 'hover:bg-slate-50'}`}
            >
              <div className={`flex items-center gap-4 font-display font-black text-xl tracking-tight ${theme === 'dark' ? 'text-white' : 'text-slate-950'}`}>
                <div className="p-3 bg-indigo-600 text-white rounded-2xl shadow-lg shadow-indigo-200 transition-all group-hover:scale-110">
                  <CreditCard className="w-7 h-7" />
                </div>
                {t.tableTitle}
              </div>
              <div className={`p-3 rounded-full transition-all ${theme === 'dark' ? 'bg-slate-700 text-white group-hover:bg-indigo-600' : 'bg-slate-200 text-slate-950 group-hover:bg-slate-950 group-hover:text-white'}`}>
                {showDetails ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6" />}
              </div>
            </button>

            {showDetails && (
              <div className={`overflow-x-auto border-t-4 animate-in fade-in slide-in-from-top-2 ${theme === 'dark' ? 'border-slate-700' : 'border-slate-100'}`}>
                <table className="w-full text-left text-sm border-collapse">
                  <thead>
                    <tr className={`${theme === 'dark' ? 'bg-slate-950' : 'bg-slate-950'} text-white font-black text-[12px] uppercase tracking-widest`}>
                      <th className="px-8 py-5">{t.month}</th>
                      <th className="px-4 py-5 text-right">{t.prevBalance}</th>
                      <th className="px-4 py-5 text-right text-emerald-400">{t.yield}</th>
                      <th className="px-4 py-5 text-right text-orange-400">{t.payment}</th>
                      <th className="px-8 py-5 text-right">{t.currentBalance}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y-2 font-bold transition-all duration-300">
                    {results.history.map((m) => (
                      <tr key={m.month} className={`transition-colors border-b-2 last:border-none ${
                        theme === 'dark' 
                        ? 'hover:bg-indigo-900/30 border-slate-700/50' 
                        : 'hover:bg-indigo-50/60 border-slate-50'
                      }`}>
                        <td className={`px-8 py-5 font-black text-lg ${theme === 'dark' ? 'text-white' : 'text-slate-950'}`}>{m.month}º</td>
                        <td className={`px-4 py-5 text-right font-medium ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>{formatCurrency(m.initialBalance, lang)}</td>
                        <td className="px-4 py-5 text-right text-emerald-500 font-bold">+{formatCurrency(m.interestEarned, lang)}</td>
                        <td className="px-4 py-5 text-right text-orange-500 font-bold">-{formatCurrency(m.payment, lang)}</td>
                        <td className={`px-8 py-5 text-right font-black text-lg ${
                          theme === 'dark' ? 'text-white bg-slate-700/30' : 'text-slate-950 bg-slate-50/80'
                        }`}>{formatCurrency(m.finalBalance, lang)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </section>
      </main>

      <footer className="max-w-4xl mx-auto mt-20 px-4 text-center">
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className={`h-0.5 w-full transition-colors duration-300 ${theme === 'dark' ? 'bg-slate-800' : 'bg-slate-200'}`}></div>
          <Info className={`w-6 h-6 shrink-0 transition-colors duration-300 ${theme === 'dark' ? 'text-slate-600' : 'text-slate-300'}`} />
          <div className={`h-0.5 w-full transition-colors duration-300 ${theme === 'dark' ? 'bg-slate-800' : 'bg-slate-200'}`}></div>
        </div>
        <p className={`font-black tracking-tight text-xl mb-2 transition-colors duration-300 ${theme === 'dark' ? 'text-white' : 'text-slate-950'}`}>{t.footerTitle}</p>
        <p className={`text-base font-bold leading-relaxed max-w-2xl mx-auto transition-colors duration-300 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
          {t.footerText}
        </p>
      </footer>
    </div>
  );
};

export default App;
