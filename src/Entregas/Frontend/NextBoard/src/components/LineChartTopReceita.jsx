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
import { Line } from 'react-chartjs-2';  // ✅ CORRIGIDO

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

const LineChartTopReceita = ({ data, colors }) => {
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
    receita: colors.greenAccent?.[500] || '#4CC9F0',
    lucro: colors.yellowAccent?.[500] || '#F72585',
    text: colors.grey?.[100] || '#FFFFFF',
    grid: colors.primary?.[400] || '#424242'
  } : {
    receita: '#4CC9F0',
    lucro: '#F72585',
    text: '#FFFFFF',
    grid: '#424242'
  };

  // Ordena por receita para ter uma linha decrescente
  const sortedData = [...data].sort((a, b) => b.receita_total - a.receita_total);

  const chartData = {
    labels: sortedData.map(item => item.nome_estabelecimento),
    datasets: [
      {
        label: 'Receita Total',
        data: sortedData.map(item => item.receita_total),
        borderColor: safeColors.receita,
        backgroundColor: safeColors.receita + '40',
        tension: 0.4,
        fill: true,
        pointBackgroundColor: safeColors.receita,
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 4,
      },
      {
        label: 'Lucro PicMoney',
        data: sortedData.map(item => item.lucro_picmoney),
        borderColor: safeColors.lucro,
        backgroundColor: safeColors.lucro + '40',
        tension: 0.4,
        fill: true,
        borderDash: [5, 5],
        pointBackgroundColor: safeColors.lucro,
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 4,
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
          color: safeColors.text,
          font: { size: 12 }
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const item = sortedData[context.dataIndex];
            if (context.dataset.label === 'Receita Total') {
              return `Receita: ${context.parsed.y.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} | ${item.total_transacoes} transações`;
            } else {
              return `Lucro: ${context.parsed.y.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} | Margem: ${item.margem_percentual?.toFixed(1)}%`;
            }
          }
        }
      }
    },
    scales: {
      x: {
        grid: { color: safeColors.grid },
        ticks: { 
          color: safeColors.text,
          maxRotation: 45,
          minRotation: 45,
          font: { size: 10 }
        }
      },
      y: {
        grid: { color: safeColors.grid },
        ticks: { 
          color: safeColors.text,
          callback: function(value) {
            return 'R$ ' + (value / 1000).toFixed(0) + 'k';
          }
        }
      }
    }
  };

  return <Line data={chartData} options={options} />;
};

export default LineChartTopReceita;