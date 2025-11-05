// import { Box } from "@mui/material";
// import Header from "../../components/Header";
// import LineChart from "../../components/LineChart";

// const Line = () => {
//   return (
//     <Box m="20px">
//       <Header title="Gráfico de Linhas" subtitle="Gráfico de Linhas gerado através da nossa base de dados" />
//       <Box height="75vh">
//         <LineChart />
//       </Box>
//     </Box>
//   );
// };

// export default Line;


import React, { useState, useEffect } from "react"; // 🔹 Importe do React
import { Box } from "@mui/material"; // 🔹 Só Box do MUI
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";

const Line = () => {
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
      <Header title="Evolução de Receita - Julho 2025" subtitle="Receita diária e transações ao longo do mês" />
      <Box height="75vh">
        {dados?.evolucao_receita ? (
          <LineChart 
            data={dados.evolucao_receita}
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

export default Line;