import { Box, useTheme } from "@mui/material";
import Header from "../../components/Header";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { tokens } from "../../theme";

const FAQ = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box m="20px">
      <Header title="Perguntas Frequentes" subtitle="Respostas Rápidas para Decisões Inteligentes: Seu Guia Prático do Nextboard" />

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            1. Quais tipos de indicadores financeiros estão disponíveis no dashboard?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
Nosso dashboard oferece indicadores financeiros completos incluindo faturamento total, repasses para parceiros, quantidade de cupons vendidos e gasto médio por cupom. Todos os valores são atualizados em tempo real e apresentados em Reais (R$), com percentuais de crescimento para facilitar a análise de performance.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            2. Como posso visualizar as vendas por região geográfica?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Na seção "Vendas por bairro" do dashboard, você encontra um mapa georreferenciado que mostra a distribuição das vendas por localidade. Essa visualização ajuda a identificar áreas de maior concentração de cupons e oportunidades para expansão em regiões menos atendidas.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            3. O dashboard permite filtrar dados por período específico?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Sim! Nosso sistema possui filtros dinâmicos que permitem analisar dados por períodos personalizados (diário, semanal, mensal ou trimestral), além de filtros por região, campanha específica e parceiro comercial. Esses filtros estão disponíveis no topo de cada seção do dashboard.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
4. Como é a experiência de navegação e usabilidade do dashboard?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
Desenvolvemos o dashboard com foco total na usabilidade para executivos. A interface é intuitiva, com menu lateral de acesso rápido, visualização em cards organizados por prioridade e design responsivo que se adapta a desktops, tablets e smartphones. As cores foram cuidadosamente escolhidas para melhor contraste visual e os gráficos interativos permitem detalhamento com um clique.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            5. Posso exportar relatórios personalizados do dashboard?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
 Sim, utilizando o botão "Download Reports" no canto superior direito do dashboard, você pode exportar relatórios completos em formato PDF ou Excel, contendo todos os dados e gráficos visualizados na tela, perfeitos para apresentações executivas ou análises detalhadas.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default FAQ;
