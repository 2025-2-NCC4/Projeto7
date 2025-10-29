from app.models import query_db

def listar_cadastro():
    return query_db("SELECT * FROM cadastro")

def listar_transacoes():
    return query_db("SELECT * FROM transacoes")

def listar_simulador():
    return query_db("SELECT * FROM pedestres")

def listar_teste():
    return query_db("SELECT * FROM teste")

# Calcular ticket médio
def calcular_ticket_medio():
    query = """
        SELECT 
            AVG(valor_cupom) AS ticket_medio
        FROM transacoes
        WHERE valor_cupom IS NOT NULL
    """
    resultado = query_db(query)
    return resultado[0] if resultado else {"ticket_medio": 0}