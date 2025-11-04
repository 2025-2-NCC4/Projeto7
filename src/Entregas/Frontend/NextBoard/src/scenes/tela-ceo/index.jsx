import { useEffect, useState, useRef } from "react";
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { mockTransactions } from "../../data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import AreaChart from "../../components/AreaChart";
import PieChartComponent from "../../components/PieChart";
import BarChartPeriod from "../../components/BarChartPeriod";
import LineChartComponent from '../../components/LineChart';
import GeographyChart from "../../components/GeographyChart";
import BarChart from "../../components/BarChart";
import StatBox from "../../components/StatBox";
import ProgressCircle from "../../components/ProgressCircle";
import html2canvas from "html2canvas";

const DashboardCEO = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
   const [dadosGrafico, setDadosGrafico] = useState([]);

  const [dados, setDados] = useState(null);
  const rootRef = useRef(null); // ref para capturar o DOM do dashboard

  // requisição para buscar os cálculos
  useEffect(() => {
    fetch("http://127.0.0.1:5001/metricas_ceo")
      .then((res) => res.json())
      .then((data) => setDados(data))
      .catch((err) => console.error("Erro ao buscar dados:", err));
  }, []);

  const formatarMoeda = (valor) =>
    valor
      ? valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
      : "Carregando...";

  // função que tira screenshot e baixa como PNG
  const handleDownload = async () => {
    if (!rootRef.current) {
      console.error("Elemento root não encontrado para captura.");
      return;
    }

    try {
      // aumenta scale para maior resolução da imagem
      const canvas = await html2canvas(rootRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
        windowWidth: document.documentElement.scrollWidth,
        windowHeight: document.documentElement.scrollHeight,
      });

      // converte para blob e força download
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.download = `dashboard-${Date.now()}.png`;
          document.body.appendChild(link);
          link.click();
          link.remove();
          URL.revokeObjectURL(url);
        } else {
          console.error("Falha ao gerar blob do canvas");
        }
      }, "image/png");
    } catch (error) {
      console.error("Erro ao gerar screenshot:", error);
    }
  };

  return (
    <Box m="20px" ref={rootRef}>
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" />

        <Box>
          <Button
            onClick={handleDownload}
            sx={{
              backgroundColor: colors.blueAccent[500],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
              "&:hover": {
                backgroundColor: colors.blueAccent[600],
              },
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Baixar Relatório
          </Button>
        </Box>
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[600]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius="20px"
        >
          <StatBox
            title={dados?.usuarios_ativos?.toLocaleString('pt-BR') || "Carregando..."}
            subtitle="Usuários únicos ativos"
            progress="0.50"
            increase="+21%"
            icon={
              <PointOfSaleIcon
                sx={{ color: colors.yellowAccent[500], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[600]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius="20px"
        >
          <StatBox
            title={dados?.total_transacoes?.toLocaleString('pt-BR') || "Carregando.."}
            subtitle="Total de transações"
            progress="0.75"
            increase="+21%"
            icon={
              <EmailIcon
                sx={{ color: colors.yellowAccent[500], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[600]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius="20px"
        >
          <StatBox
            title={`${dados?.top_estabelecimento || "Carregando... "} (${dados?.total_do_top?.toLocaleString('pt-BR') || ""} transações)`}
            subtitle="Estabelecimento mais ativo"
            progress="0.30"
            increase="+5%"
            icon={
              <PersonAddIcon
                sx={{ color: colors.yellowAccent[500], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[600]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius="20px"
        >
          <StatBox
            title={dados?.categoria_mais_lucrativa || "Carregando..."}
            subtitle="Categoria mais lucrativa"
            progress="0.80"
            increase="+45%"
            icon={
              <TrafficIcon
                sx={{ color: colors.yellowAccent[500], fontSize: "26px" }}
              />
            }
          />
        </Box>

        {/* ROW 2 */}

        {/* //CÓDIGO ANTIGO */}
        {/* <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={colors.primary[600]}
          borderRadius="20px"
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography variant="h5" fontWeight="600" color={colors.grey[100]}>
                Evolução de Receita Mensal - Julho 2025
              </Typography>
            </Box>
            <Box>
              <IconButton>
                <DownloadOutlinedIcon
                  sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                />
              </IconButton>
            </Box>
          </Box>
          <Box height="250px" m="-20px 0 0 0">
            <LineChart isDashboard={true} />
          </Box>
        </Box> */}
        {/* VAI ATÉ AQUI */}


{/* CÓDIGO NOVO */}
<Box
  gridColumn="span 8"
  gridRow="span 2"
  backgroundColor={colors.primary[600]}
  borderRadius="20px"
>
  <Box
    mt="25px"
    p="0 30px"
    display="flex"
    justifyContent="space-between"
    alignItems="center"
  >
    <Box>
      <Typography variant="h5" fontWeight="600" color={colors.grey[100]}>
        Evolução de Receita - Julho 2025
      </Typography>
      <Typography variant="h3" fontWeight="bold" color={colors.greenAccent[500]}>
        {formatarMoeda(dados?.evolucao_receita?.reduce((total, item) => total + item.receita_diaria, 0))}
      </Typography>
    </Box>
  </Box>
  
  <Box height="250px" m="-10px 20px 0 20px">
    {dados?.evolucao_receita && dados.evolucao_receita.length > 0 ? (
      <LineChartComponent 
        data={dados.evolucao_receita} 
        colors={colors} 
      />
    ) : (
      <Box display="flex" justifyContent="center" alignItems="center" height="100%">
        <Typography color={colors.grey[300]}>
          {dados?.evolucao_receita ? 'Nenhum dado disponível' : 'Carregando dados...'}
        </Typography>
      </Box>
    )}
  </Box>
</Box>
{/* VAI ATE AQUI */}

<Box
  gridColumn="span 4"
  gridRow="span 2"
  backgroundColor={colors.primary[600]}
  overflow="auto"
  borderRadius="20px"
>
  <Box
    display="flex"
    justifyContent="space-between"
    alignItems="center"
    borderBottom={`4px solid ${colors.primary[700]}`}
    colors={colors.grey[100]}
    p="15px"
  >
    <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
      Top 3 Maiores Tickets Médios
    </Typography>
  </Box>
  {dados?.top_tickets && dados.top_tickets.length > 0 ? (
    dados.top_tickets.map((estabelecimento, i) => (
      <Box
        key={`${estabelecimento.nome_estabelecimento}-${i}`}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        borderBottom={`4px solid ${colors.primary[700]}`}
        p="15px"
      >
        <Box>
          <Typography color={colors.greenAccent[500]} variant="h5" fontWeight="600">
            {estabelecimento.nome_estabelecimento}
          </Typography>
          <Typography color={colors.grey[100]}>
            {estabelecimento.total_transacoes} transações
          </Typography>
        </Box>
        
        {/* 🔹 TICKET MÉDIO BEM DESTACADO */}
        <Box textAlign="center">
          <Typography color={colors.grey[300]} variant="body2" sx={{ mb: 0.5 }}>
            Ticket Médio
          </Typography>
          <Typography 
            color={colors.yellowAccent[500]} 
            variant="h5" 
            fontWeight="bold"
            sx={{
              backgroundColor: colors.primary[700],
              p: "4px 12px",
              borderRadius: "4px"
            }}
          >
            {formatarMoeda(estabelecimento.ticket_medio)}
          </Typography>
        </Box>

        <Box color={colors.grey[100]} textAlign="right">
          <Typography variant="body2" color={colors.grey[300]}>
            Receita Total
          </Typography>
          <Typography variant="body1" fontWeight="600">
            {formatarMoeda(estabelecimento.receita_total)}
          </Typography>
        </Box>
      </Box>
    ))
  ) : (
    <Box display="flex" justifyContent="center" alignItems="center" p="20px">
      <Typography color={colors.grey[300]}>
        Nenhum dado disponível
      </Typography>
    </Box>
  )}
</Box>

        {/* COMEÇA AQUI CODIGO ANTIGO */}
        {/* <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[600]}
          overflow="auto"
          borderRadius="20px"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[700]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Últimos cupons vendidos
            </Typography>
          </Box>
          {mockTransactions.map((transaction, i) => (
            <Box
              key={`${transaction.txId}-${i}`}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[700]}`}
              p="15px"
            >
              <Box>
                <Typography color={colors.greenAccent[500]} variant="h5" fontWeight="600">
                  {transaction.txId}
                </Typography>
                <Typography color={colors.grey[100]}>
                  {transaction.user}
                </Typography>
              </Box>
              <Box color={colors.grey[100]}>{transaction.date}</Box>
              <Box
                backgroundColor={colors.greenAccent[500]}
                p="5px 10px"
                borderRadius="4px"
                color={colors.primary[900]}
                fontWeight="bold"
              >
                R${transaction.cost}
              </Box>
            </Box>
          ))}
        </Box> */}
        {/* TERMINA AQUI */}

        {/* ROW 3 */}


          {/* ROW 3 - NOVO (GRAFICO PIZZA) */}
          {/* CÓDIGO NOVO */}
<Box
  gridColumn="span 4"
  gridRow="span 2"
  backgroundColor={colors.primary[600]}
  borderRadius="20px"
  p="20px"
>
  <Typography variant="h5" fontWeight="600" color={colors.grey[100]} sx={{ mb: 2 }}>
    Participação de mercado - Top 5 estabelecimentos
  </Typography>
  <Box height="200px">
    {dados?.market_share && dados.market_share.length > 0 ? (
      <PieChartComponent 
        data={dados.market_share}
        colors={colors}
      />
    ) : (
      <Box display="flex" justifyContent="center" alignItems="center" height="100%">
        <Typography color={colors.grey[300]}>
          {dados?.market_share ? 'Nenhum dado disponível' : 'Carregando dados...'}
        </Typography>
      </Box>
    )}
  </Box>
</Box>
{/* TERMINA AQUI */}


        {/* CODIGO ANTIGO - COMEÇA AQUI */}
        {/* <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[600]}
          p="30px"
          borderRadius="20px"
        >
          <Typography variant="h5" fontWeight="600" color={colors.grey[100]}>
            Distribuição por tipo de cupom
          </Typography>
          <Box display="flex" flexDirection="column" alignItems="center" mt="25px">
            <ProgressCircle size="125" />
            <Typography variant="h5" color={colors.greenAccent[500]} sx={{ mt: "15px" }}>
              R$48.352,00 receita gerada
            </Typography>
            <Typography color={colors.grey[100]}>
              Inclui despesas e custos diversos
            </Typography>
          </Box>
        </Box> */}

        {/* TERMINA AQUI */}

          <Box
  gridColumn="span 4"
  gridRow="span 2"
  backgroundColor={colors.primary[600]}
  borderRadius="20px"
  p="15px"
  display="flex"
  flexDirection="column"
>
  <Typography variant="h5" fontWeight="600" color={colors.grey[100]} sx={{ mb: 1 }}>
    Transações por Período
  </Typography>
  <Box height="220px" flex="1">
    {dados?.transacoes_por_periodo && dados.transacoes_por_periodo.length > 0 ? (
      <BarChartPeriod 
        data={dados.transacoes_por_periodo}
        colors={colors}
      />
    ) : (
      <Box display="flex" justifyContent="center" alignItems="center" height="100%">
        <Typography color={colors.grey[300]}>
          Carregando dados...
        </Typography>
      </Box>
    )}
  </Box>
</Box>
        {/* código antigo */}
        {/* <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[600]}
          borderRadius="20px"
        >
          <Typography variant="h5" fontWeight="600" sx={{ padding: "30px 30px 0 30px" }} color={colors.grey[100]}>
            Líderes em vendas
          </Typography>
          <Box height="250px" mt="-20px">
            {/* <BarChart isDashboard={true} /> */}
          {/* </Box>
        </Box>  */}
        {/* termina aqui */}

              <Box
  gridColumn="span 4"
  gridRow="span 2"
  backgroundColor={colors.primary[600]}
  borderRadius="20px"
  p="15px"
  display="flex"
  flexDirection="column"
>
  <Typography variant="h5" fontWeight="600" color={colors.grey[100]} sx={{ mb: 1 }}>
    Transações por Bairro
  </Typography>
  <Box height="220px" flex="1">
    {dados?.top_bairros && dados.top_bairros.length > 0 ? (
      <AreaChart 
        data={dados.top_bairros}
        colors={colors}
      />
    ) : (
      <Box display="flex" justifyContent="center" alignItems="center" height="100%">
        <Typography color={colors.grey[300]}>
          Carregando dados...
        </Typography>
      </Box>
    )}
  </Box>
</Box>
            {/* CÓDIGO ANTIGO */}
        {/* <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[600]}
          padding="30px"
          borderRadius="20px"
        >
          <Typography variant="h5" fontWeight="600" sx={{ marginBottom: "15px" }} color={colors.grey[100]}>
            Vendas por bairro
          </Typography>
          <Box height="200px">
            <GeographyChart isDashboard={true} />
          </Box>
        </Box> */}
        {/* TERMINA AQUI */}

      </Box>
    </Box>
  );
};

export default DashboardCEO;
