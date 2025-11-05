// import { Box } from "@mui/material";
// import Header from "../../components/Header";
// import PieChart from "../../components/PieChart";

// const Pie = () => {
//   return (
//     <Box m="20px">
//       <Header title="Gráfico de Pizza" subtitle="Gráfico de Pizza gerado através da nossa base de dados" />
//       <Box height="75vh">
//         <PieChart />
//       </Box>
//     </Box>
//   );
// };

// export default Pie;


import React, { useState, useEffect } from "react"; // 🔹 Importe do React
import { Box } from "@mui/material"; // 🔹 Só Box do MUI
import Header from "../../components/Header";
import PieChart from "../../components/PieChart";
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";

const Pie = () => {
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
      <Header title="Market Share - Top Estabelecimentos" subtitle="Distribuição por market share" />
      <Box height="75vh">
        {dados?.market_share ? (
          <PieChart 
            data={dados.market_share}
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

export default Pie;