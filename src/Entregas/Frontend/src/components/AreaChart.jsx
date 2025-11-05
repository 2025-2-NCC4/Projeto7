// components/AreaChart.js
import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const AreaChart = ({ data, colors }) => {
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

  const safeColors = colors ? {
    area: colors.greenAccent?.[500] || '#4CC9F0',
    line: colors.greenAccent?.[600] || '#4895EF', 
    text: colors.grey?.[100] || '#FFFFFF',
    grid: colors.primary?.[400] || '#424242'
  } : {
    area: '#4CC9F0',
    line: '#4895EF',
    text: '#FFFFFF',
    grid: '#424242'
  };

  const chartData = {
    labels: data.map(item => item.bairro),
    datasets: [
      {
        label: 'Transações',
        data: data.map(item => item.total_transacoes),
        borderColor: safeColors.line,
        backgroundColor: safeColors.area + '80', // 80 = 50% opacity
        tension: 0.4,
        fill: true,
        pointBackgroundColor: safeColors.line,
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: { color: safeColors.grid },
        ticks: { 
          color: safeColors.text,
          maxRotation: 45,
          minRotation: 45
        }
      },
      y: {
        grid: { color: safeColors.grid },
        ticks: { color: safeColors.text },
        beginAtZero: true
      }
    }
  };

  return <Line data={chartData} options={options} />;
};

export default AreaChart;