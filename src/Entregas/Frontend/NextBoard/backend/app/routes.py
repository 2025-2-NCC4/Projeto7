from flask import Blueprint, jsonify
from app import services

bp = Blueprint('routes', __name__)

@bp.route('/')
def index():
    ticket_medio = services.calcular_ticket_medio()
    return jsonify({
        "msg": "API PicMoney - Banco unificado de Excel",
        "ticket_medio": ticket_medio["ticket_medio"],
        "endpoints": ["/cadastro", "/transacoes", "/pedestres", "/teste", "/ticket_medio"]
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

# Ticket médio
@bp.route('/ticket_medio')
def get_ticket_medio():
    return jsonify(services.calcular_ticket_medio())
