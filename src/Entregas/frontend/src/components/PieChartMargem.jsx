import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Box, Typography } from '@mui/material';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChartMargem = ({ data, colors }) => {
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
    labels: data.map(item => item.tipo_cupom),
    datasets: [
      {
        data: data.map(item => item.receita_bruta),
        backgroundColor: [
          colors.greenAccent[500],
          colors.blueAccent[500],
          colors.yellowAccent[500],
        ],
        borderColor: colors.primary[100],
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: colors.grey[100],
          font: {
            size: 12,
          },
          padding: 15
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const label = context.label || '';
            const value = context.raw || 0;
            const item = data.find(d => d.tipo_cupom === label);
            const transacoes = item ? item.total_transacoes : 0;
            const margem = item ? item.margem_percentual : 0;
            
            // FORMATAR VALORES
            const formatarMoeda = (valor) => {
              return valor.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
                minimumFractionDigits: 2
              });
            };
            
            return [
              `${label}`,
              `Receita Bruta: ${formatarMoeda(value)}`,
              `Transações: ${transacoes.toLocaleString('pt-BR')}`,
              `Margem: ${margem.toFixed(1)}%`
            ];
          }
        }
      }
    }
  };

  return (
    <Box height="250px" width="100%">
      <Pie data={chartData} options={options} />
    </Box>
  );
};

export default PieChartMargem;