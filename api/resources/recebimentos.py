from flask_restful import reqparse, Resource
from tokenpass import managertk
from models.recebimentos import RecebimentoModel
from flask_jwt_extended import jwt_required, get_jwt_identity
import json
from tokenpass import managertk

from flask_apispec import marshal_with, doc, use_kwargs
from flask_apispec.views import MethodResource

from schemas.recebimentos import RecebimentoRegisterSchema


class CadastraRecebimento(MethodResource, Resource):
    @doc(description='Cadastra um novo recebimento.', tags=['Recebimentos'], params={
        'Authorization': {
            'description': 'Normalmente: Authorization: Bearer asdf.qwer.zxcv',
            'in': 'header',
            'type': 'string',
            'required': True
        }
    })
    @use_kwargs(RecebimentoRegisterSchema, location=('json'))
    @jwt_required
    def post(self, **kargs):
        cadastro = RecebimentoModel.cadastraRecebimento(**kargs)

        if cadastro["message"] == "OK":

            freshAccessToken = managertk.createFreshToken()
            cadastro.update({"refreshToken": freshAccessToken})

            return cadastro, 200
        else:
            return cadastro, cadastro["status_code"]


class AtualizaRecebimento(MethodResource, Resource):
    @doc(description='Atualiza um recebimento já cadastrado.', tags=['Recebimentos'], params={
        'Authorization': {
            'description': 'Normalmente: Authorization: Bearer asdf.qwer.zxcv',
            'in': 'header',
            'type': 'string',
            'required': True
        }
    })
    @use_kwargs(RecebimentoRegisterSchema, location=('json'))
    @jwt_required
    def put(self, recebimento_id, **kargs):
        cadastro = RecebimentoModel.atuatualizaRecebimento(recebimento_id=recebimento_id,**kargs)

        if cadastro["message"] == "OK":

            freshAccessToken = managertk.createFreshToken()
            cadastro.update({"refreshToken": freshAccessToken})

            return cadastro, 200
        else:
            return cadastro, cadastro["status_code"]





class Recebimentos(MethodResource, Resource):
    @doc(description='Consulta os recebimentos do mês do usuário', tags=['Recebimentos'], params={
        'Authorization': {
            'description': 'Normalmente: Authorization: Bearer asdf.qwer.zxcv',
            'in': 'header',
            'type': 'string',
            'required': True
        }
    })
    @jwt_required
    def get(self, user_id, mes, ano):

        recebimentos = RecebimentoModel.consultaRecebimentosMes(user_id, mes, ano)

        if recebimentos:
            if recebimentos["message"] == "OK":

                freshAccessToken = managertk.createFreshToken()
                recebimentos.update({"refreshToken": freshAccessToken})

                return recebimentos, 200
            else:
                return recebimentos, recebimentos["status_code"]

        return {"message": "Login ou senhas incorretos"}, 400



class DeletaRecebimento(MethodResource, Resource):
    @doc(description='Deleta o recebimento do usuário', tags=['Recebimentos'], params={
        'Authorization': {
            'description': 'Normalmente: Authorization: Bearer asdf.qwer.zxcv',
            'in': 'header',
            'type': 'string',
            'required': True
        }
    })
    @jwt_required
    def delete(self, recebimento_id):

        recebimentos = RecebimentoModel.deletaRecebimento(recebimento_id)

        if recebimentos:
            if recebimentos["message"] == "OK":

                freshAccessToken = managertk.createFreshToken()
                recebimentos.update({"refreshToken": freshAccessToken})

                return recebimentos, 200
            else:
                return recebimentos, recebimentos["status_code"]

        return {"message": "Login ou senhas incorretos"}, 400
