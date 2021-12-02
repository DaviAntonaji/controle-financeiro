from flask_restful import reqparse, Resource
import json

from flask_apispec import marshal_with, doc
from flask_apispec.views import MethodResource
from marshmallow import Schema, fields



class StartResponseSchema(Schema):
    name = fields.Str(default='')
    version = fields.Str(default='')
    description = fields.Str(default='')
    authors = fields.List(fields.Str(default=''))

class Start(MethodResource):
    @doc(description='Demonstra informações sobre a API.', tags=['Home'])
    @marshal_with(StartResponseSchema)  
    def get(self):

      return {"name": "API CONTROLE FINANCEIRO", "version": "1.0", "authors": ["Davi Antonaji"], "description": "API DO SISTEMA DE CONTROLE FINANCEIRO"}, 200
