from flask_restful import reqparse, Resource
from tokenpass import managertk
from models.relatorios import relatorioAnual,relatorioMensal
from flask_jwt_extended import jwt_required, get_jwt_identity
import json
from tokenpass import managertk

from flask_apispec import marshal_with, doc, use_kwargs
from flask_apispec.views import MethodResource


class RelatorioAnual(MethodResource, Resource):
    @doc(description='Trás varias informações financeiras sobre o ano', tags=['Relatorios'], params={
        'Authorization': {
            'description': 'Normalmente: Authorization: Bearer asdf.qwer.zxcv',
            'in': 'header',
            'type': 'string',
            'required': True
        }
    })
    @jwt_required
    def get(self, user_id,ano):

        if user_id != json.loads(managertk.decodedPayload(get_jwt_identity()))["user"]["user_id"]:
            return {"message": "Usuários divergentes"},400
        relatorio = relatorioAnual(user_id, ano)

        if relatorio:
            if relatorio["message"] == "OK":

                freshAccessToken = managertk.createFreshToken()
                relatorio.update({"refreshToken": freshAccessToken})

                return relatorio, 200
            else:
                return relatorio, relatorio["status_code"]

        return {"message": "Login ou senhas incorretos"}, 400


class RelatorioMensal(MethodResource, Resource):
    @doc(description='Trás varias informações financeiras sobre o mes', tags=['Relatorios'], params={
        'Authorization': {
            'description': 'Normalmente: Authorization: Bearer asdf.qwer.zxcv',
            'in': 'header',
            'type': 'string',
            'required': True
        }
    })
    @jwt_required
    def get(self, user_id,ano,mes):

        if user_id != json.loads(managertk.decodedPayload(get_jwt_identity()))["user"]["user_id"]:
            return {"message": "Usuários divergentes"},400
        relatorio = relatorioMensal(user_id, ano, mes)

        if relatorio:
            if relatorio["message"] == "OK":

                freshAccessToken = managertk.createFreshToken()
                relatorio.update({"refreshToken": freshAccessToken})

                return relatorio, 200
            else:
                return relatorio, relatorio["status_code"]

        return {"message": "Login ou senhas incorretos"}, 400
