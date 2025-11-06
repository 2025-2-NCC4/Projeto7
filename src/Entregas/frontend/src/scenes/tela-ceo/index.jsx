import { useEffect, useState, useRef } from "react";
import { Box, Button, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import StoreIcon from "@mui/icons-material/Store";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import GroupsIcon from "@mui/icons-material/Groups";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import BarChartIcon from "@mui/icons-material/BarChart";
import AreaChart from "../../components/AreaChart";
import PieChartComponent from "../../components/PieChart";
import BarChartPeriod from "../../components/BarChartPeriod";
import LineChartComponent from "../../components/LineChart";
import StatBox from "../../components/StatBox";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const DashboardCEO = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [dados, setDados] = useState(null);
  const rootRef = useRef(null); // ref para capturar o DOM do dashboard

  // Requisição para buscar os cálculos do backend Flask
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

  // 🔹 Função que tira screenshot e baixa como PDF
  const handleDownload = async () => {
    if (!rootRef.current) {
      console.error("Elemento root não encontrado para captura.");
      return;
    }

    try {
      // Captura o dashboard como imagem
      const canvas = await html2canvas(rootRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
        windowWidth: document.documentElement.scrollWidth,
        windowHeight: document.documentElement.scrollHeight,
      });

      const imgData = canvas.toDataURL("image/png");

      // Cria PDF A4
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * pdfWidth) / canvas.width;

      let position = 0;

      // Adiciona a imagem (ou quebra em múltiplas páginas se for muito longa)
      if (imgHeight <= pdfHeight) {
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      } else {
        let heightLeft = imgHeight;
        let y = 0;

        while (heightLeft > 0) {
          pdf.addImage(imgData, "PNG", 0, y, imgWidth, imgHeight);
          heightLeft -= pdfHeight;
          if (heightLeft > 0) {
            pdf.addPage();
            y = -pdfHeight * (pdf.internal.getNumberOfPages() - 1);
          }
        }
      }

      pdf.save(`dashboard-${Date.now()}.pdf`);
    } catch (error) {
      console.error("Erro ao gerar PDF:", error);
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
            Baixar Relatório (PDF)
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
            title={dados?.usuarios_ativos?.toLocaleString("pt-BR") || "Carregando..."}
            subtitle="Usuários únicos ativos"
            progress="0.50"
            increase="+21%"
            icon={
              <GroupsIcon sx={{ color: colors.yellowAccent[500], fontSize: "26px" }} />
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
            title={dados?.total_transacoes?.toLocaleString("pt-BR") || "Carregando.."}
            subtitle="Total de transações"
            progress="0.75"
            increase="+21%"
            icon={
              <BarChartIcon sx={{ color: colors.yellowAccent[500], fontSize: "26px" }} />
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
            title={`${dados?.top_estabelecimento || "Carregando... "} (${
              dados?.total_do_top?.toLocaleString("pt-BR") || ""
            } transações)`}
            subtitle="Estabelecimento mais ativo"
            progress="0.30"
            increase="+5%"
            icon={
              <StoreIcon sx={{ color: colors.yellowAccent[500], fontSize: "26px" }} />
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
              <EmojiEventsIcon
                sx={{ color: colors.yellowAccent[500], fontSize: "26px" }}
              />
            }
          />
        </Box>

        {/* ROW 2 */}
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
              <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.greenAccent[500]}
              >
                {formatarMoeda(
                  dados?.evolucao_receita?.reduce(
                    (total, item) => total + item.receita_diaria,
                    0
                  )
                )}
              </Typography>
            </Box>
          </Box>

          <Box height="250px" m="-10px 20px 0 20px">
            {dados?.evolucao_receita && dados.evolucao_receita.length > 0 ? (
              <LineChartComponent data={dados.evolucao_receita} colors={colors} />
            ) : (
              <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                <Typography color={colors.grey[300]}>
                  {dados?.evolucao_receita
                    ? "Nenhum dado disponível"
                    : "Carregando dados..."}
                </Typography>
              </Box>
            )}
          </Box>
        </Box>

        {/* ROW 3 - TOP TICKETS */}
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
                      borderRadius: "4px",
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
              <Typography color={colors.grey[300]}>Nenhum dado disponível</Typography>
            </Box>
          )}
        </Box>

        {/* ROW 4 - GRÁFICOS FINAIS */}
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[600]}
          borderRadius="20px"
          p="20px"
        >
          <Typography
            variant="h5"
            fontWeight="600"
            color={colors.grey[100]}
            sx={{ mb: 2 }}
          >
            Participação de mercado - Top 5 estabelecimentos
          </Typography>
          <Box height="200px">
            {dados?.market_share && dados.market_share.length > 0 ? (
              <PieChartComponent data={dados.market_share} colors={colors} />
            ) : (
              <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                <Typography color={colors.grey[300]}>
                  {dados?.market_share
                    ? "Nenhum dado disponível"
                    : "Carregando dados..."}
                </Typography>
              </Box>
            )}
          </Box>
        </Box>

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
            {dados?.transacoes_por_periodo &&
            dados.transacoes_por_periodo.length > 0 ? (
              <BarChartPeriod data={dados.transacoes_por_periodo} colors={colors} />
            ) : (
              <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                <Typography color={colors.grey[300]}>Carregando dados...</Typography>
              </Box>
            )}
          </Box>
        </Box>

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
              <AreaChart data={dados.top_bairros} colors={colors} />
            ) : (
              <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                <Typography color={colors.grey[300]}>Carregando dados...</Typography>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardCEO;