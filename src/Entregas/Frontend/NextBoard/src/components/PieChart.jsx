// import { ResponsivePie } from "@nivo/pie";
// import { tokens } from "../theme";
// import { useTheme } from "@mui/material";
// import { mockPieData as data } from "../data/mockData";

// const PieChart = () => {
//   const theme = useTheme();
//   const colors = tokens(theme.palette.mode);
//   return (
//     <ResponsivePie
//       data={data}
//       theme={{
//         axis: {
//           domain: {
//             line: {
//               stroke: colors.grey[100],
//             },
//           },
//           legend: {
//             text: {
//               fill: colors.grey[100],
//             },
//           },
//           ticks: {
//             line: {
//               stroke: colors.grey[100],
//               strokeWidth: 1,
//             },
//             text: {
//               fill: colors.grey[100],
//             },
//           },
//         },
//         legends: {
//           text: {
//             fill: colors.grey[100],
//           },
//         },
//       }}
//       margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
//       innerRadius={0.5}
//       padAngle={0.7}
//       cornerRadius={3}
//       activeOuterRadiusOffset={8}
//       borderColor={{
//         from: "color",
//         modifiers: [["darker", 0.2]],
//       }}
//       arcLinkLabelsSkipAngle={10}
//       arcLinkLabelsTextColor={colors.grey[100]}
//       arcLinkLabelsThickness={2}
//       arcLinkLabelsColor={{ from: "color" }}
//       enableArcLabels={false}
//       arcLabelsRadiusOffset={0.4}
//       arcLabelsSkipAngle={7}
//       arcLabelsTextColor={{
//         from: "color",
//         modifiers: [["darker", 2]],
//       }}
//       defs={[
//         {
//           id: "dots",
//           type: "patternDots",
//           background: "inherit",
//           color: "rgba(255, 255, 255, 0.3)",
//           size: 4,
//           padding: 1,
//           stagger: true,
//         },
//         {
//           id: "lines",
//           type: "patternLines",
//           background: "inherit",
//           color: "rgba(255, 255, 255, 0.3)",
//           rotation: -45,
//           lineWidth: 6,
//           spacing: 10,
//         },
//       ]}
//       legends={[
//         {
//           anchor: "bottom",
//           direction: "row",
//           justify: false,
//           translateX: 0,
//           translateY: 56,
//           itemsSpacing: 0,
//           itemWidth: 100,
//           itemHeight: 18,
//           itemTextColor: "#999",
//           itemDirection: "left-to-right",
//           itemOpacity: 1,
//           symbolSize: 18,
//           symbolShape: "circle",
//           effects: [
//             {
//               on: "hover",
//               style: {
//                 itemTextColor: "#000",
//               },
//             },
//           ],
//         },
//       ]}
//     />
//   );
// };

// export default PieChart;


// components/PieChart.js
// components/PieChart.js
import React from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChartComponent = ({ data, colors }) => {
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
  green: '#2E8B57',    // Sea Green - mais escuro
  blue: '#4169E1',     // Royal Blue - mais escuro  
  yellow: '#DAA520',   // Goldenrod - mais sóbrio
  purple: '#6A5ACD',   // Slate Blue - mais escuro
  orange: '#CD853F',   // Peru - tom terroso
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
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return `${label}: ${value} transações (${percentage}%)`;
          }
        }
      }
    }
  };

  return <Pie data={chartData} options={options} />;
};

export default PieChartComponent;