// import { Box, useTheme } from "@mui/material";
// import GeographyChart from "../../components/GeographyChart";
// import Header from "../../components/Header";
// import { tokens } from "../../theme";

// const Geography = () => {
//   const theme = useTheme();
//   const colors = tokens(theme.palette.mode);
//   return (
//     <Box m="20px">
//       <Header title="Gráfico de Geográfico" subtitle="Gráfico de Geográfico gerado através da nossa base de dados" />

//       <Box
//         height="75vh"
//         border={`1px solid ${colors.grey[100]}`}
//         borderRadius="4px"
//       >
//         <GeographyChart />
//       </Box>
//     </Box>
//   );
// };

// export default Geography;


import React, { useState, useEffect } from "react"; 
import { Box, useTheme } from "@mui/material";
import AreaChart from "../../components/AreaChart"; 
import Header from "../../components/Header";
import { tokens } from "../../theme";

const Geography = () => {
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
      <Header title="Transações por Bairro" subtitle="Distribuição de transações por região geográfica" />
      <Box
        height="75vh"
        border={`1px solid ${colors.grey[100]}`}
        borderRadius="4px"
        p="20px"
      >
        {dados?.top_bairros ? (
          <AreaChart 
            data={dados.top_bairros}  
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

export default Geography;