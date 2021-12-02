from flask_restful import reqparse, Resource
from tokenpass import managertk
from models.despesas import DespesaModel
from flask_jwt_extended import jwt_required, get_jwt_identity
import json
from tokenpass import managertk

from flask_apispec import marshal_with, doc, use_kwargs
from flask_apispec.views import MethodResource

from schemas.despesas import DespesaRegisterSchema


class CadastraDespesa(MethodResource, Resource):
    @doc(description='Cadastra uma nova despesa.', tags=['Despesas'], params={
        'Authorization': {
            'description': 'Normalmente: Authorization: Bearer asdf.qwer.zxcv',
            'in': 'header',
            'type': 'string',
            'required': True
        }
    })
    @use_kwargs(DespesaRegisterSchema, location=('json'))
    @jwt_required
    def post(self, **kargs):
        cadastro = DespesaModel.cadastraDespesa(**kargs)

        if cadastro["message"] == "OK":

            freshAccessToken = managertk.createFreshToken()
            cadastro.update({"refreshToken": freshAccessToken})

            return cadastro, 200
        else:
            return cadastro, cadastro["status_code"]


class AtualizaDespesa(MethodResource, Resource):
    @doc(description='Atualiza uma despesa já cadastrada.', tags=['Despesas'], params={
        'Authorization': {
            'description': 'Normalmente: Authorization: Bearer asdf.qwer.zxcv',
            'in': 'header',
            'type': 'string',
            'required': True
        }
    })
    @use_kwargs(DespesaRegisterSchema, location=('json'))
    @jwt_required
    def put(self, despesa_id, **kargs):
        cadastro = DespesaModel.atualizaDespesa(despesa_id=despesa_id,**kargs)

        if cadastro["message"] == "OK":

            freshAccessToken = managertk.createFreshToken()
            cadastro.update({"refreshToken": freshAccessToken})

            return cadastro, 200
        else:
            return cadastro, cadastro["status_code"]





class Despesas(MethodResource, Resource):
    @doc(description='Consulta as despesas do mês do usuário', tags=['Despesas'], params={
        'Authorization': {
            'description': 'Normalmente: Authorization: Bearer asdf.qwer.zxcv',
            'in': 'header',
            'type': 'string',
            'required': True
        }
    })
    @jwt_required
    def get(self, user_id, mes, ano):

        despesas = DespesaModel.consultaDespesasMes(user_id, mes, ano)

        if despesas:
            if despesas["message"] == "OK":

                freshAccessToken = managertk.createFreshToken()
                despesas.update({"refreshToken": freshAccessToken})

                return despesas, 200
            else:
                return despesas, despesas["status_code"]

        return {"message": "Login ou senhas incorretos"}, 400



class DeletaDespesa(MethodResource, Resource):
    @doc(description='Deleta a despesas do usuário', tags=['Despesas'], params={
        'Authorization': {
            'description': 'Normalmente: Authorization: Bearer asdf.qwer.zxcv',
            'in': 'header',
            'type': 'string',
            'required': True
        }
    })
    @jwt_required
    def delete(self, despesa_id):

        despesas = DespesaModel.deletaDespesa(despesa_id)

        if despesas:
            if despesas["message"] == "OK":

                freshAccessToken = managertk.createFreshToken()
                despesas.update({"refreshToken": freshAccessToken})

                return despesas, 200
            else:
                return despesas, despesas["status_code"]

        return {"message": "Login ou senhas incorretos"}, 400



class CategoriasDespesas(MethodResource, Resource):
    @doc(description='Trás as categorias de despesas.', tags=['Despesas'], params={
        'Authorization': {
            'description': 'Normalmente: Authorization: Bearer asdf.qwer.zxcv',
            'in': 'header',
            'type': 'string',
            'required': True
        }
    })
    @jwt_required
    def get(self):

        categorias = DespesaModel.consultaTipos()

        if categorias:
            if categorias["message"] == "OK":

                freshAccessToken = managertk.createFreshToken()
                categorias.update({"refreshToken": freshAccessToken})

                return categorias, 200
            else:
                return categorias, categorias["status_code"]

        return {"message": "Login ou senhas incorretos"}, 400
