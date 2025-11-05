from flask import Flask
from app.routes import bp as routes_bp
from app.models import criar_banco
from flask_cors import CORS

def create_app():
    app = Flask(__name__)
    CORS(app)
    app.register_blueprint(routes_bp)

    # Cria o banco se não existir
    criar_banco()

    return app