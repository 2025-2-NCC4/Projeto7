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

const LineChartComponent = ({ data, colors }) => {
  // Cores padrão caso colors não seja passado
  const defaultColors = {
    greenAccent: { 500: '#4CC9F0' },
    blueAccent: { 500: '#4361EE' },
    grey: { 100: '#FFFFFF', 300: '#B0B0B0' },
    primary: { 400: '#424242' }
  };

  const chartColors = colors || defaultColors;

  const safeData = Array.isArray(data) ? data : [];

  const sortedData = [...data].sort((a, b) => a.dia.localeCompare(b.dia));

  const chartData = {
    labels: sortedData.map(item => {
      const day = item.dia.split('-')[2]; // Extrai "01", "02", etc.
      return `${parseInt(day)}/Jul`; // Converte "01" para 1
    }),
    datasets: [
      {
        label: 'Receita Diária',
        data: sortedData.map(item => item.receita_diaria) || [],
        borderColor: chartColors.greenAccent[500],
        backgroundColor: chartColors.greenAccent[500] + '20',
        tension: 0.4,
        fill: true
      },
      {
        label: 'Transações',
        data: sortedData.map(item => item.transacoes_diarias) || [],
        borderColor: chartColors.blueAccent[500],
        backgroundColor: chartColors.blueAccent[500] + '20',
        tension: 0.4,
        fill: true
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: chartColors.grey[100],
          font: { size: 12 }
        }
      }
    },
    scales: {
      x: {
        grid: { color: chartColors.primary[400] },
        ticks: { color: chartColors.grey[300] }
      },
      y: {
        grid: { color: chartColors.primary[400] },
        ticks: { color: chartColors.grey[300] }
      }
    }
  };

  return <Line data={chartData} options={options} />;
};

export default LineChartComponent;