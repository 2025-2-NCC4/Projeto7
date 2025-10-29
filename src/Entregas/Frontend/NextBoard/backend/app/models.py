import pandas as pd
import sqlite3
import os

DB_PATH = "data.db"

def criar_banco():
    """Importa os Excels e cria o banco SQLite."""
    conn = sqlite3.connect(DB_PATH)

    if os.path.exists(DB_PATH):
        print("Banco já existe, pulando criação.")
        return

    arquivos = {
        "cadastro": "data/PicMoney-Base_Cadastral_de_Players-10_000 linhas (1).csv",
        "transacoes": "data/PicMoney-Base_de_Transa__es_-_Cupons_Capturados-100000 linhas.csv",
        "pedestres": "data/PicMoney-Base_Simulada_-_Pedestres_Av__Paulista-100000 linhas (1).csv",
        "teste": "data/PicMoney-Massa_de_Teste_com_Lojas_e_Valores-10000 linhas (1).csv"
    }

    for tabela, arquivo in arquivos.items():
        if os.path.exists(arquivo):
            print(f"📄 Importando {arquivo} ...")
            try:
                # tenta com ponto e vírgula
                df = pd.read_csv(arquivo, sep=';', encoding='utf-8')
            except Exception:
                try:
                    # tenta com vírgula
                    df = pd.read_csv(arquivo, sep=',', encoding='utf-8')
                except Exception as e:
                    print(f"Erro ao ler {arquivo}: {e}")
                    continue

            df.to_sql(tabela, conn, if_exists="replace", index=False)
            print(f"Tabela '{tabela}' criada com {len(df)} registros.")
        else:
            print(f"Arquivo não encontrado: {arquivo}")

    conn.close()
    print("Banco SQLite criado com sucesso: data.db")


def query_db(query):
    """Executa consultas SQL e retorna lista de dicionários."""
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    rows = conn.execute(query).fetchall()
    conn.close()
    return [dict(row) for row in rows]