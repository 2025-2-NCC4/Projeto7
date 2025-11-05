import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Box, Typography } from '@mui/material';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChartDiaSemana = ({ data, colors }) => {
  if (!data || data.length === 0) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="200px">
        <Typography color={colors.grey[300]}>
          Carregando dados...
        </Typography>
      </Box>
    );
  }

  // Abreviar os nomes dos dias
  const abreviarDia = (dia) => {
    const abreviacoes = {
      'Segunda-feira': 'Segunda',
      'Terça-feira': 'Terça', 
      'Quarta-feira': 'Quarta',
      'Quinta-feira': 'Quinta',
      'Sexta-feira': 'Sexta',
      'Sábado': 'Sábado',
      'Domingo': 'Domingo'
    };
    return abreviacoes[dia] || dia;
  };

  const chartData = {
    labels: data.map(item => abreviarDia(item.dia_semana)),
    datasets: [
      {
        label: 'Receita (R$)',
        data: data.map(item => item.receita_total),
        backgroundColor: colors.greenAccent[500],
        borderColor: colors.greenAccent[700],
        borderWidth: 1,
        borderRadius: 4,
        barPercentage: 0.6, // Barras mais finas
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
              `${item.dia_semana}: R$ ${context.raw.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
              `Transações: ${item.total_transacoes}`,
              `Ticket: R$ ${item.ticket_medio?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`
            ];
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false, // Remove grid vertical
        },
        ticks: {
          color: colors.grey[100],
          font: {
            size: 11 // Texto menor
          }
        }
      },
      y: {
        grid: {
          color: colors.primary[400],
        },
        ticks: {
          color: colors.grey[100],
          font: {
            size: 10
          },
          callback: function(value) {
            if (value >= 1000000) {
              return 'R$ ' + (value / 1000000).toFixed(1) + 'M';
            } else if (value >= 1000) {
              return 'R$ ' + (value / 1000).toFixed(0) + 'K';
            }
            return 'R$ ' + value;
          }
        }
      },
    },
  };

  return (
    <Box height="200px" width="100%">
      <Bar data={chartData} options={options} />
    </Box>
  );
};

export default BarChartDiaSemana;