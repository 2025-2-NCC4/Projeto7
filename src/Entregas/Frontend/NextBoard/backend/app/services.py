from app.models import query_db

def listar_cadastro():
    return query_db("SELECT * FROM cadastro")

def listar_transacoes():
    return query_db("SELECT * FROM transacoes")

def listar_simulador():
    return query_db("SELECT * FROM pedestres")

def listar_teste():
    return query_db("SELECT * FROM teste")

def top_categorias():
    query_top_categorias = """
    SELECT 
        categoria_estabelecimento as categoria,
        SUM(valor_cupom) as receita_total,
        COUNT(*) as total_vendas
    FROM transacoes 
    WHERE categoria_estabelecimento IS NOT NULL 
      AND categoria_estabelecimento != ''
    GROUP BY categoria_estabelecimento
    ORDER BY receita_total DESC
    LIMIT 10
    """
    categorias = query_db(query_top_categorias)
    return categorias 

def calcular_metricas_financeiras():
    query = """
        SELECT
            AVG(valor_cupom) AS ticket_medio,
            SUM(valor_cupom) AS receita_total_picmoney,
            SUM(repasse_picmoney) AS repasse_total_picmoney,
            SUM(valor_cupom - repasse_picmoney) AS receita_liquida
        FROM transacoes
        WHERE valor_cupom IS NOT NULL
    """
    geral = query_db(query)[0]

    query_por_tipo = """
        SELECT 
            tipo_cupom,
            AVG(valor_cupom) AS valor_medio
        FROM transacoes
        WHERE valor_cupom IS NOT NULL
        GROUP BY tipo_cupom
    """

    ##Top 10 Estabelecimentos por Receita
    query_top10_receita = """
    SELECT 
        nome_estabelecimento,
        SUM(valor_cupom) as receita_total,
        COUNT(*) as total_transacoes,
        AVG(valor_cupom) as ticket_medio,
        (SUM(repasse_picmoney) / SUM(valor_cupom)) * 100 as margem_percentual 
    FROM transacoes
    WHERE nome_estabelecimento IS NOT NULL 
      AND nome_estabelecimento != ''
    GROUP BY nome_estabelecimento
    ORDER BY receita_total DESC
    LIMIT 10
    """

    ##Margem por Tipo de Cupom
    query_margem_tipo_cupom = """
        SELECT 
            tipo_cupom,
            COUNT(*) as total_transacoes,
            SUM(valor_cupom) as receita_bruta,
            SUM(repasse_picmoney) as receita_picmoney,
            SUM(valor_cupom - repasse_picmoney) as valor_repasse_estabelecimento,
            (SUM(repasse_picmoney) / SUM(valor_cupom)) * 100 as margem_percentual
        FROM transacoes 
        WHERE tipo_cupom IS NOT NULL 
          AND valor_cupom > 0
        GROUP BY tipo_cupom
        ORDER BY receita_bruta DESC
    """

    # Evolução Mensal da Receita vs Margem
    query_evolucao_mensal = """
    SELECT 
    STRFTIME('%Y-%m', 
        SUBSTR(data, 7, 4) || '-' || SUBSTR(data, 4, 2) || '-' || SUBSTR(data, 1, 2)
    ) as mes,
    SUM(valor_cupom) as receita_bruta,
    SUM(repasse_picmoney) as receita_liquida,
    (SUM(repasse_picmoney) / SUM(valor_cupom)) * 100 as margem_mensal,
    COUNT(*) as total_transacoes
    FROM transacoes
    WHERE data IS NOT NULL 
    AND valor_cupom > 0
    GROUP BY mes
    ORDER BY mes
    """

    # Receita por Dia da Semana
    query_receita_dia_semana = """
    SELECT 
    CASE CAST(STRFTIME('%w', 
            SUBSTR(data, 7, 4) || '-' || SUBSTR(data, 4, 2) || '-' || SUBSTR(data, 1, 2)
        ) AS INTEGER)
        WHEN 0 THEN 'Domingo'
        WHEN 1 THEN 'Segunda-feira'
        WHEN 2 THEN 'Terça-feira' 
        WHEN 3 THEN 'Quarta-feira'
        WHEN 4 THEN 'Quinta-feira'
        WHEN 5 THEN 'Sexta-feira'
        WHEN 6 THEN 'Sábado'
    END as dia_semana,
    SUM(valor_cupom) as receita_total,
    COUNT(*) as total_transacoes,
    AVG(valor_cupom) as ticket_medio
    FROM transacoes
    WHERE data IS NOT NULL
    GROUP BY dia_semana
    ORDER BY 
    CASE dia_semana
        WHEN 'Segunda-feira' THEN 1
        WHEN 'Terça-feira' THEN 2
        WHEN 'Quarta-feira' THEN 3
        WHEN 'Quinta-feira' THEN 4
        WHEN 'Sexta-feira' THEN 5
        WHEN 'Sábado' THEN 6
        WHEN 'Domingo' THEN 7
    END
"""

##Ticket Médio por Tipo de Loja (da tabela teste)
    query_ticket_medio_tipo_loja = """
        SELECT 
            tipo_loja,
            COUNT(*) as total_transacoes,
            AVG(valor_compra) as ticket_medio_compra,
            AVG(valor_cupom) as valor_pago_medio,
            SUM(valor_compra) as volume_total
        FROM teste
        WHERE tipo_loja IS NOT NULL 
          AND tipo_loja != ''
          AND valor_compra > 0
        GROUP BY tipo_loja
        ORDER BY ticket_medio_compra DESC
        LIMIT 6
    """

    query = """
        SELECT
            AVG(valor_cupom) AS ticket_medio,
            SUM(valor_cupom) AS receita_total_picmoney,
            SUM(repasse_picmoney) AS repasse_total_picmoney,
            SUM(valor_cupom - repasse_picmoney) AS receita_liquida,
            (SUM(repasse_picmoney) / SUM(valor_cupom)) * 100 AS margem_lucro_percentual
        FROM transacoes
        WHERE valor_cupom IS NOT NULL
    """
    geral = query_db(query)[0]

    receita_dia_semana = query_db(query_receita_dia_semana)
    evolucao_mensal = query_db(query_evolucao_mensal)
    top10_receita = query_db(query_top10_receita)
    por_tipo = query_db(query_por_tipo)
    categorias = top_categorias()
    margem_tipo_cupom = query_db(query_margem_tipo_cupom)
    ticket_medio_tipo_loja = query_db(query_ticket_medio_tipo_loja)

    # Converter em dicionário estruturado
    resultado = {
        "ticket_medio": geral["ticket_medio"],
        "receita_total_picmoney": geral["receita_total_picmoney"],
        "repasse_total_picmoney": geral["repasse_total_picmoney"],
        "receita_liquida": geral["receita_liquida"],
        "margem_lucro_percentual": geral["margem_lucro_percentual"],
        "valor_medio_por_tipo": {r["tipo_cupom"]: r["valor_medio"] for r in por_tipo},
        "top_categorias": categorias,
        "receita_total_geral": sum(item['receita_total'] for item in categorias),
        "top10_receita": top10_receita,
        "margem_tipo_cupom": margem_tipo_cupom,
        "evolucao_mensal": evolucao_mensal,
        "receita_dia_semana": receita_dia_semana,
        "ticket_medio_tipo_loja": ticket_medio_tipo_loja
    }
    return resultado


def calcular_metricas_ceo():
    query_total_transacoes = "SELECT COUNT(*) AS total_transacoes FROM transacoes"
    query_top_estabelecimento = """
        SELECT nome_estabelecimento, COUNT(*) AS total
        FROM transacoes
        GROUP BY nome_estabelecimento
        ORDER BY total DESC
        LIMIT 1
    """
    # Usuários únicos (ativos)
    query_usuarios_unicos = """
        SELECT COUNT(DISTINCT celular) AS usuarios_ativos
        FROM transacoes
        WHERE celular IS NOT NULL
          AND celular != ''
    """

    query_categoria_lucrativa = """
        SELECT 
            categoria_estabelecimento as categoria,
            SUM(valor_cupom) as receita_total
        FROM transacoes 
        WHERE categoria_estabelecimento IS NOT NULL 
          AND categoria_estabelecimento != ''
        GROUP BY categoria_estabelecimento
        ORDER BY receita_total DESC
        LIMIT 1
    """

        #Evolução Diária de Receita
    query_evolucao_diaria = """
SELECT 
    STRFTIME('%Y-%m-%d', 
        SUBSTR(data, 7, 4) || '-' || SUBSTR(data, 4, 2) || '-' || SUBSTR(data, 1, 2)
    ) AS dia,
    SUM(valor_cupom) AS receita_diaria,
    COUNT(*) AS transacoes_diarias
FROM transacoes
WHERE STRFTIME('%Y-%m-%d', 
        SUBSTR(data, 7, 4) || '-' || SUBSTR(data, 4, 2) || '-' || SUBSTR(data, 1, 2)
    ) BETWEEN '2025-07-01' AND '2025-07-31'
GROUP BY dia
ORDER BY dia;
    """

    query_market_share = """
        SELECT 
            nome_estabelecimento,
            COUNT(*) as total_transacoes,
            (COUNT(*) * 100.0 / (SELECT COUNT(*) FROM transacoes)) as percentual
        FROM transacoes
        WHERE nome_estabelecimento IS NOT NULL 
          AND nome_estabelecimento != ''
        GROUP BY nome_estabelecimento
        ORDER BY total_transacoes DESC
        LIMIT 5
    """
    
    query_transacoes_periodo = """
        SELECT 
            CASE 
                WHEN CAST(SUBSTR(hora, 1, 2) AS INTEGER) BETWEEN 6 AND 11 THEN 'Manhã (6h-12h)'
                WHEN CAST(SUBSTR(hora, 1, 2) AS INTEGER) BETWEEN 12 AND 17 THEN 'Tarde (12h-18h)'
                WHEN CAST(SUBSTR(hora, 1, 2) AS INTEGER) BETWEEN 18 AND 23 THEN 'Noite (18h-24h)'
                ELSE 'Madrugada (0h-6h)'
            END as periodo,
            COUNT(*) as total_transacoes,
            SUM(valor_cupom) as receita_total
        FROM transacoes
        WHERE hora IS NOT NULL
        GROUP BY periodo
        ORDER BY 
            CASE periodo
                WHEN 'Madrugada (0h-6h)' THEN 1
                WHEN 'Manhã (6h-12h)' THEN 2
                WHEN 'Tarde (12h-18h)' THEN 3
                WHEN 'Noite (18h-24h)' THEN 4
            END
    """
    query_top_bairros = """
        SELECT 
            bairro_estabelecimento as bairro,
            COUNT(*) as total_transacoes,
            SUM(valor_cupom) as receita_total
        FROM transacoes
        WHERE bairro_estabelecimento IS NOT NULL 
          AND bairro_estabelecimento != ''
        GROUP BY bairro_estabelecimento
        ORDER BY total_transacoes DESC
        LIMIT 8
    """

    query_top_tickets = """
        SELECT 
            nome_estabelecimento,
            AVG(valor_cupom) as ticket_medio,
            COUNT(*) as total_transacoes,
            SUM(valor_cupom) as receita_total
        FROM transacoes
        WHERE nome_estabelecimento IS NOT NULL 
          AND nome_estabelecimento != ''
          AND valor_cupom IS NOT NULL
        GROUP BY nome_estabelecimento
        HAVING COUNT(*) >= 3  -- Mínimo de transações para ser relevante
        ORDER BY ticket_medio DESC
        LIMIT 3
    """
    top_tickets = query_db(query_top_tickets)
    top_bairros = query_db(query_top_bairros)
    transacoes_por_periodo = query_db(query_transacoes_periodo)
    market_share = query_db(query_market_share)
    total_transacoes = query_db(query_total_transacoes)[0]["total_transacoes"]
    top_estab = query_db(query_top_estabelecimento)[0]
    usuarios_ativos = query_db(query_usuarios_unicos)[0]["usuarios_ativos"]
    categoria_lucrativa = query_db(query_categoria_lucrativa)[0]
    evolucao_diaria = query_db(query_evolucao_diaria)

    return {
        "total_transacoes": total_transacoes,
        "usuarios_ativos": usuarios_ativos,
        "top_estabelecimento": top_estab["nome_estabelecimento"],
        "categoria_mais_lucrativa": categoria_lucrativa["categoria"],
        "total_do_top": top_estab["total"],
        "evolucao_receita": evolucao_diaria,
        "market_share": market_share,
        "transacoes_por_periodo": transacoes_por_periodo,
        "top_bairros": top_bairros,
        "top_tickets": top_tickets
    }

