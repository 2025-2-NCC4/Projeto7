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
  Legend,
  Filler
} from 'chart.js';

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

const AreaChartTicketMedio = ({ data, colors }) => {
  if (!data || data.length === 0) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="200px">
        <Typography color={colors.grey[300]}>
          Carregando dados...
        </Typography>
      </Box>
    );
  }

  const chartData = {
    labels: data.map(item => {
      // Traduzir tipos de loja
      const tipos = {
        'restaurante': 'Restaurante',
        'vestuário': 'Vestuário',
        'mercado': 'Mercado',
        'móveis': 'Móveis',
        'outros': 'Outros'
      };
      return tipos[item.tipo_loja] || item.tipo_loja;
    }),
    datasets: [
      {
        label: 'Ticket Médio (R$)',
        data: data.map(item => item.ticket_medio_compra),
        borderColor: colors.greenAccent[500],
        backgroundColor: `${colors.greenAccent[500]}40`,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: colors.greenAccent[500],
        pointBorderColor: colors.primary[100],
        pointBorderWidth: 2,
      }
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const item = data[context.dataIndex];
            return [
              `Ticket Médio: R$ ${context.raw.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
              `Transações: ${item.total_transacoes}`
            ];
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
          font: {
            size: 11
          }
        }
      },
      y: {
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
    },
  };

  return (
    <Box height="200px" width="100%">
      <Line data={chartData} options={options} />
    </Box>
  );
};

export default AreaChartTicketMedio;