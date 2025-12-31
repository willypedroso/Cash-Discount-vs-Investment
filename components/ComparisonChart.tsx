
import React from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';
import { MonthDetail } from '../types';

interface Props {
  data: MonthDetail[];
  theme?: 'light' | 'dark';
}

const ComparisonChart: React.FC<Props> = ({ data, theme = 'light' }) => {
  const chartData = data.map(d => ({
    name: `${d.month}`,
    saldo: Number(d.finalBalance.toFixed(2)),
  }));

  const gridColor = theme === 'dark' ? '#334155' : '#cbd5e1';
  const axisColor = theme === 'dark' ? '#94a3b8' : '#64748b';
  const tickColor = theme === 'dark' ? '#cbd5e1' : '#475569';

  return (
    <div className="h-72 w-full mt-6">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorSaldo" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.4}/>
              <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
          <XAxis 
            dataKey="name" 
            fontSize={12} 
            tickLine={true} 
            axisLine={true} 
            stroke={axisColor}
            tick={{ fill: tickColor, fontWeight: 700 }}
          />
          <YAxis 
            fontSize={12} 
            tickLine={true} 
            axisLine={true} 
            stroke={axisColor}
            tick={{ fill: tickColor, fontWeight: 700 }}
            tickFormatter={(value) => `${value}`} 
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: theme === 'dark' ? '#1e293b' : '#ffffff', 
              borderRadius: '12px', 
              border: `2px solid ${theme === 'dark' ? '#334155' : '#e2e8f0'}`, 
              boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.5)' 
            }}
            itemStyle={{ fontSize: '14px', fontWeight: 900, color: '#6366f1' }}
            labelStyle={{ fontSize: '12px', fontWeight: 800, color: theme === 'dark' ? '#f1f5f9' : '#1e293b', marginBottom: '6px', textTransform: 'uppercase' }}
            formatter={(value: number) => [`${value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`, 'Balance']}
            labelFormatter={(label) => `Mês ${label}`}
          />
          <Area 
            type="monotone" 
            dataKey="saldo" 
            stroke="#6366f1" 
            strokeWidth={5}
            fillOpacity={1} 
            fill="url(#colorSaldo)" 
            animationDuration={1000}
          />
          <ReferenceLine y={0} stroke={theme === 'dark' ? '#64748b' : '#94a3b8'} strokeWidth={2} strokeDasharray="5 5" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ComparisonChart;
