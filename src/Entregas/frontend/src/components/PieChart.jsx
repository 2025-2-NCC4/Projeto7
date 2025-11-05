import React from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChartComponent = ({ data, colors, totalGeral = 100000 }) => {
  if (!data || data.length === 0) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100%',
        color: '#999'
      }}>
        Nenhum dado disponível
      </div>
    );
  }

  // Cores padrão seguras
  const defaultColors = {
    green: '#2E8B57',
    blue: '#4169E1', 
    yellow: '#DAA520',
    purple: '#6A5ACD',
    orange: '#CD853F',
    text: '#FFFFFF',
    grid: '#424242'
  };

  // Usa cores padrão se colors for undefined
  const safeColors = colors ? {
    green: colors.greenAccent?.[500] || defaultColors.green,
    blue: colors.blueAccent?.[500] || defaultColors.blue,
    yellow: colors.yellowAccent?.[500] || defaultColors.yellow,
    purple: colors.purpleAccent?.[500] || defaultColors.purple,
    orange: colors.orangeAccent?.[500] || defaultColors.orange,
    text: colors.grey?.[100] || defaultColors.text,
    grid: colors.primary?.[400] || defaultColors.grid
  } : defaultColors;

  const chartData = {
    labels: data.map(item => item.nome_estabelecimento),
    datasets: [
      {
        data: data.map(item => item.total_transacoes),
        backgroundColor: [
          safeColors.green,
          safeColors.blue,
          safeColors.yellow,
          safeColors.purple,
          safeColors.orange,
        ],
        borderColor: safeColors.grid,
        borderWidth: 2,
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          color: safeColors.text,
          font: { size: 11 },
          padding: 10,
          boxWidth: 12
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const label = context.label || '';
            const value = context.parsed;
            // Agora usa o totalGeral em vez do total do dataset
            const percentage = ((value / totalGeral) * 100).toFixed(1);
            return `${label}: ${value} transações (${percentage}%)`;
          }
        }
      }
    }
  };

  return <Pie data={chartData} options={options} />;
};

export default PieChartComponent;