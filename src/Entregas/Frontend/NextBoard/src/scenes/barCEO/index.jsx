// import { Box } from "@mui/material";
// import Header from "../../components/Header";
// import BarChart from "../../components/BarChart";

// const Bar = () => {
//   return (
//     <Box m="20px">
//       <Header title="Gráfico de Barras" subtitle="Gráfico de Barras gerado através da nossa base de dados" />
//       <Box height="75vh">
//         <BarChart />
//       </Box>
//     </Box>
//   );
// };

// export default Bar;


import React, { useState, useEffect } from "react"; 
import { Box } from "@mui/material";
import Header from "../../components/Header";
import BarChartPeriod from "../../components/BarChartPeriod"; 
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";

const Bar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [dados, setDados] = useState(null);

  // Buscar dados da API
  useEffect(() => {
    fetch("http://127.0.0.1:5001/metricas_ceo")
      .then((res) => res.json())
      .then((data) => setDados(data))
      .catch((err) => console.error("Erro ao buscar dados:", err));
  }, []);

  return (
    <Box m="20px">
      <Header title="Transações por Período do Dia" subtitle="Distribuição de transações por horário" />
      <Box height="75vh">
        {dados?.transacoes_por_periodo ? (
          <BarChartPeriod 
            data={dados.transacoes_por_periodo}  
            colors={colors}                       
          />
        ) : (
          <Box display="flex" justifyContent="center" alignItems="center" height="100%">
            Carregando dados...
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Bar;