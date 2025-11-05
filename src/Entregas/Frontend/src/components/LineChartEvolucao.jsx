import React from 'react';
import { Line } from 'react-chartjs-2';
import { Box, Typography } from '@mui/material';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChartEvolucao = ({ data, colors }) => {
  if (!data || data.length === 0) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="250px">
        <Typography color={colors.grey[300]}>
          Carregando dados...
        </Typography>
      </Box>
    );
  }

  const chartData = {
    labels: data.map(item => item.mes),
    datasets: [
      {
        label: 'Receita Bruta (R$)',
        data: data.map(item => item.receita_bruta),
        borderColor: colors.greenAccent[500],
        backgroundColor: colors.greenAccent[500],
        yAxisID: 'y',
        tension: 0.4
      },
      {
        label: 'Margem (%)',
        data: data.map(item => item.margem_mensal),
        borderColor: colors.blueAccent[500],
        backgroundColor: colors.blueAccent[500],
        yAxisID: 'y1',
        tension: 0.4
      }
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: colors.grey[100],
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.dataset.label.includes('Margem')) {
              label += context.raw.toFixed(1) + '%';
            } else {
              label += 'R$ ' + context.raw.toFixed(2);
            }
            return label;
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          color: colors.primary[400],
        },
        ticks: {
          color: colors.grey[100],
        }
      },
      y: {
        type: 'linear',
        display: true,
        position: 'left',
        grid: {
          color: colors.primary[400],
        },
        ticks: {
          color: colors.grey[100],
          callback: function(value) {
            return 'R$ ' + value.toLocaleString('pt-BR');
          }
        }
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',
        grid: {
          drawOnChartArea: false,
        },
        ticks: {
          color: colors.grey[100],
          callback: function(value) {
            return value.toFixed(1) + '%';
          }
        }
      },
    },
  };

  return (
    <Box height="250px" width="100%">
      <Line data={chartData} options={options} />
    </Box>
  );
};

export default LineChartEvolucao;