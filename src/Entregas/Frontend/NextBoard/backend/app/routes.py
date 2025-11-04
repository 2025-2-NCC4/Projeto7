from flask import Blueprint, jsonify
from app import services

bp = Blueprint('routes', __name__)

@bp.route('/')
def index():
    metricas = services.calcular_metricas_financeiras()  # 🔹 CORREÇÃO: chamar uma vez só
    categorias = services.top_categorias()


    return jsonify({
        "msg": "API PicMoney - Banco unificado de Excel",
        "ticket_medio": metricas["ticket_medio"],
        "receita_total_picmoney": metricas["receita_total_picmoney"],
        "repasse_total_picmoney": metricas["repasse_total_picmoney"],
        "receita_liquida": metricas["receita_liquida"],
        "top_categorias": categorias,
        "endpoints": ["/cadastro", "/transacoes", "/pedestres", "/teste", "/metricas_financeiras", "/top_categorias"]
    })

@bp.route('/cadastro')
def get_cadastro():
    return jsonify(services.listar_cadastro())

@bp.route('/transacoes')
def get_transacoes():
    return jsonify(services.listar_transacoes())

@bp.route('/pedestres')
def get_simulador():
    return jsonify(services.listar_simulador())

@bp.route('/teste')
def get_teste():
    return jsonify(services.listar_teste())

# Ticket médio, 
@bp.route('/metricas_financeiras')
def get_metricas_financeiras():
    return jsonify(services.calcular_metricas_financeiras())

@bp.route("/top_categorias", methods=["GET"])
def get_top_categorias():
    return jsonify(services.top_categorias)

@bp.route("/usuarios_unicos", methods=["GET"])
def get_usuarios_unicos():
    return jsonify({"usuarios_unicos": services.calcular_usuarios_unicos()})

@bp.route("/metricas_ceo")
def get_metricas_ceo():
    return jsonify(services.calcular_metricas_ceo())