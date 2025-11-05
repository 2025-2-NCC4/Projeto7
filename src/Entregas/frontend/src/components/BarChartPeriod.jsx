// components/charts/BarChartPeriod.js
import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChartPeriod = ({ data, colors }) => {
  if (!data || data.length === 0) {
    return <div>Nenhum dado disponível</div>;
  }

  const safeColors = colors ? {
    primary: colors.greenAccent?.[500] || '#4CC9F0',
    text: colors.grey?.[100] || '#FFFFFF',
    grid: colors.primary?.[400] || '#424242'
  } : {
    primary: '#4CC9F0',
    text: '#FFFFFF', 
    grid: '#424242'
  };

  const chartData = {
    labels: data.map(item => item.periodo),
    datasets: [
      {
        label: 'Transações',
        data: data.map(item => item.total_transacoes),
        backgroundColor: safeColors.primary,
        borderColor: safeColors.primary,
        borderWidth: 1,
        borderRadius: 4,
      }
    ]
  };

  const options = {
    indexAxis: 'x', // Sempre vertical para período
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x: {
        grid: { color: safeColors.grid },
        ticks: { color: safeColors.text }
      },
      y: {
        grid: { color: safeColors.grid },
        ticks: { color: safeColors.text }
      }
    }
  };

  return <Bar data={chartData} options={options} />;
};

export default BarChartPeriod;