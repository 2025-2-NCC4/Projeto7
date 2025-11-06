import { useEffect, useState, useRef } from "react";
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Header from "../../components/Header";
import LineChartTopReceita from "../../components/LineChartTopReceita";
import PieChartMargem from "../../components/PieChartMargem";
import AreaChartTicketMedio from "../../components/AreaChartTicketMedio";
import BarChartDiaSemana from "../../components/BarChartDiaSemana";
import StatBox from "../../components/StatBox";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const DashboardCFO = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [dados, setDados] = useState(null);
  const rootRef = useRef(null);

  // Requisição para buscar os cálculos do backend Flask
  useEffect(() => {
    fetch("http://127.0.0.1:5001/metricas_financeiras")
      .then((res) => res.json())
      .then((data) => setDados(data))
      .catch((err) => console.error("Erro ao buscar dados:", err));
  }, []);

  const formatarMoeda = (valor) =>
    valor
      ? valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
      : "Carregando...";

  const formatarPercentual = (valor) => {
    if (valor === null || valor === undefined) return "Carregando...";
    return `${valor.toFixed(1)}%`;
  };

  // 🔹 Função que gera PDF do dashboard
  const handleDownload = async () => {
    if (!rootRef.current) {
      console.error("Elemento root não encontrado para captura.");
      return;
    }

    try {
      const canvas = await html2canvas(rootRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
        windowWidth: document.documentElement.scrollWidth,
        windowHeight: document.documentElement.scrollHeight,
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * pdfWidth) / canvas.width;

      let position = 0;

      // Quebra em múltiplas páginas, se necessário
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

      pdf.save(`dashboardCFO-${Date.now()}.pdf`);
    } catch (error) {
      console.error("Erro ao gerar PDF:", error);
    }
  };

  return (
    <Box m="20px" ref={rootRef}>
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD FINANCEIRO" />

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
            title={formatarMoeda(dados?.receita_total_picmoney)}
            subtitle="Receita total"
            progress="0.50"
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
            title={formatarMoeda(dados?.repasse_total_picmoney)}
            subtitle="Repasse total"
            progress="0.75"
            increase="+21%"
            icon={
              <AttachMoneyIcon
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
            title={formatarPercentual(dados?.margem_lucro_percentual)}
            subtitle="Margem de Lucro"
            progress="0.30"
            increase="+5%"
            icon={
              <TrendingUpIcon
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
            title={formatarMoeda(dados?.ticket_medio)}
            subtitle="Ticket médio"
            progress="0.80"
            increase="+45%"
            icon={
              <ShoppingCartIcon
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
            <Typography variant="h4" fontWeight="600" color={colors.grey[100]}>
              Ranking - Estabelecimentos com maior faturamento
            </Typography>
          </Box>

          <Box height="250px" m="-10px 20px 0 20px">
            {dados?.top10_receita && dados.top10_receita.length > 0 ? (
              <LineChartTopReceita data={dados.top10_receita} colors={colors} />
            ) : (
              <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                <Typography color={colors.grey[300]}>
                  {dados?.top10_receita ? "Nenhum dado disponível" : "Carregando dados..."}
                </Typography>
              </Box>
            )}
          </Box>
        </Box>

        {/* COLUNA DIREITA */}
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[600]}
          overflow="auto"
          borderRadius="20px"
          p="12px"
        >
          <Typography
            color={colors.grey[100]}
            variant="h4"
            fontWeight="600"
            sx={{ mb: 1 }}
          >
            Valor médio por cupom
          </Typography>

          {dados && dados.valor_medio_por_tipo ? (
            Object.entries(dados.valor_medio_por_tipo).map(([tipo, valor], i) => (
              <Box
                key={`${tipo}-${i}`}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                p="8px 15px"
                sx={{
                  borderBottom: `1px solid ${colors.primary[400]}`,
                  mb: "8px",
                }}
              >
                <Typography
                  color={colors.greenAccent[500]}
                  variant="h5"
                  fontWeight="600"
                >
                  {tipo}
                </Typography>

                <Box
                  sx={{
                    backgroundColor: colors.greenAccent[500],
                    p: "8px 16px",
                    borderRadius: "4px",
                    color: colors.primary[900],
                    fontWeight: "bold",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    minWidth: "120px",
                  }}
                >
                  <Typography variant="h5" fontWeight="bold">
                    {formatarMoeda(valor)}
                  </Typography>
                </Box>
              </Box>
            ))
          ) : (
            <Typography color={colors.grey[300]} p="20px">
              Carregando dados...
            </Typography>
          )}
        </Box>

        {/* ROW 3 */}
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[600]}
          p="12px"
          borderRadius="20px"
        >
          <Typography variant="h5" fontWeight="600" color={colors.grey[100]} sx={{ mb: 2 }}>
            Receita por Tipo de Cupom
          </Typography>
          <PieChartMargem data={dados?.margem_tipo_cupom} colors={colors} />
        </Box>

        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[600]}
          borderRadius="20px"
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "20px 20px 0 20px" }}
            color={colors.grey[100]}
          >
            Receita por Dia da Semana
          </Typography>
          <Box height="200px" mt="35px" p="0 15px">
            <BarChartDiaSemana data={dados?.receita_dia_semana} colors={colors} />
          </Box>
        </Box>

        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[600]}
          borderRadius="20px"
        >
          <Typography
            variant="h6"
            fontWeight="600"
            sx={{ padding: "20px 15px 10px 15px" }}
            color={colors.grey[100]}
          >
            Ticket Médio por Categoria
          </Typography>
          <Box height="180px" p="0 10px">
            <AreaChartTicketMedio data={dados?.ticket_medio_tipo_loja} colors={colors} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardCFO;