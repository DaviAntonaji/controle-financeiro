from flask import Flask
from flask_cors import CORS
from flask_restful import Api

from flask import jsonify, request
from flask_jwt_extended import JWTManager

from resources.start import Start
from resources.despesas import AtualizaDespesa, Despesas, CategoriasDespesas, CadastraDespesa, DeletaDespesa
from resources.recebimentos import AtualizaRecebimento, Recebimentos, CadastraRecebimento, DeletaRecebimento
from resources.users import UserAuth, UserRegister

import os
from dotenv import load_dotenv


from apispec import APISpec
from apispec.ext.marshmallow import MarshmallowPlugin
from flask_apispec.extension import FlaskApiSpec

load_dotenv()


app = Flask(__name__)

app.config['JWT_SECRET_KEY'] = os.getenv(
    "JWT_SECRET_KEY")  # Chave de autenticação JWT
CORS(app)


api = Api(app)

jwt = JWTManager(app)

app.config.update({
    'APISPEC_SPEC': APISpec(
        title='API CONTROLE FINANCEIRO',
        version='v1',
        plugins=[MarshmallowPlugin()],
        openapi_version='2.0.0'
    ),
    'APISPEC_SWAGGER_URL': '/swagger/',  # URI to access API Doc JSON
    'APISPEC_SWAGGER_UI_URL': '/documentacao/'  # URI to access UI of API Doc
})

docs = FlaskApiSpec(app)


@jwt.revoked_token_loader
def token_de_acesso_invalidado():
    return {'message': 'Você foi desconectado.'}, 401  # unauthorized


api.add_resource(Start, "/")
docs.register(Start)
# Rotas de usuário
api.add_resource(UserAuth, "/user/auth")
docs.register(UserAuth)
api.add_resource(UserRegister, "/user/cadastrar")
docs.register(UserRegister)

# Rotas de despesas
api.add_resource(
    Despesas, "/despesas/<string:user_id>/<string:mes>/<string:ano>")
docs.register(Despesas)
api.add_resource(CadastraDespesa, "/despesas/cadastrar")
docs.register(CadastraDespesa)
api.add_resource(AtualizaDespesa, "/despesas/atualizar/<string:despesa_id>")
docs.register(AtualizaDespesa)
api.add_resource(CategoriasDespesas, "/despesas/categorias")
docs.register(CategoriasDespesas)
api.add_resource(DeletaDespesa, "/despesa/apagar/<string:despesa_id>/<string:user_id>")
docs.register(DeletaDespesa)


# Rotas de recebimentos
api.add_resource(AtualizaRecebimento, "/recebimento/atualizar/<string:recebimento_id>")
docs.register(AtualizaRecebimento)
api.add_resource(Recebimentos, "/recebimentos/<string:user_id>/<string:mes>/<string:ano>/<string:user_id>")
docs.register(Recebimentos)
api.add_resource(CadastraRecebimento, "/recebimentos/cadastrar")
docs.register(CadastraRecebimento)
api.add_resource(DeletaRecebimento, "/recebimentos/apagar/<string:recebimento_id>/<string:user_id>")
docs.register(DeletaRecebimento)

# Main Function
if __name__ == '__main__':
    print("API PYTHON INICIADA")
    # sendSlackBot(":white_check_mark: API iniciada com sucesso!")
    app.run(host='0.0.0.0', port=5001, debug=True)
