// import { ResponsiveLine } from "@nivo/line";
// import { useTheme } from "@mui/material";
// import { tokens } from "../theme";
// import { mockLineData as data } from "../data/mockData";

// const LineChart = ({ isCustomLineColors = false, isDashboard = false }) => {
//   const theme = useTheme();
//   const colors = tokens(theme.palette.mode);

//   return (
//     <ResponsiveLine
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
//         tooltip: {
//           container: {
//             color: colors.primary[500],
//           },
//         },
//       }}
//       colors={isDashboard ? { datum: "color" } : { scheme: "nivo" }} // added
//       margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
//       xScale={{ type: "point" }}
//       yScale={{
//         type: "linear",
//         min: "auto",
//         max: "auto",
//         stacked: true,
//         reverse: false,
//       }}
//       yFormat=" >-.2f"
//       curve="catmullRom"
//       axisTop={null}
//       axisRight={null}
//       axisBottom={{
//         orient: "bottom",
//         tickSize: 0,
//         tickPadding: 5,
//         tickRotation: 0,
//         legend: isDashboard ? undefined : "transportation", // added
//         legendOffset: 36,
//         legendPosition: "middle",
//       }}
//       axisLeft={{
//         orient: "left",
//         tickValues: 5, // added
//         tickSize: 3,
//         tickPadding: 5,
//         tickRotation: 0,
//         legend: isDashboard ? undefined : "count", // added
//         legendOffset: -40,
//         legendPosition: "middle",
//       }}
//       enableGridX={false}
//       enableGridY={false}
//       pointSize={8}
//       pointColor={{ theme: "background" }}
//       pointBorderWidth={2}
//       pointBorderColor={{ from: "serieColor" }}
//       pointLabelYOffset={-12}
//       useMesh={true}
//       legends={[
//         {
//           anchor: "bottom-right",
//           direction: "column",
//           justify: false,
//           translateX: 100,
//           translateY: 0,
//           itemsSpacing: 0,
//           itemDirection: "left-to-right",
//           itemWidth: 80,
//           itemHeight: 20,
//           itemOpacity: 0.75,
//           symbolSize: 12,
//           symbolShape: "circle",
//           symbolBorderColor: "rgba(0, 0, 0, .5)",
//           effects: [
//             {
//               on: "hover",
//               style: {
//                 itemBackground: "rgba(0, 0, 0, .03)",
//                 itemOpacity: 1,
//               },
//             },
//           ],
//         },
//       ]}
//     />
//   );
// };

// export default LineChart;


// components/LineChart.js
// components/LineChart.js
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