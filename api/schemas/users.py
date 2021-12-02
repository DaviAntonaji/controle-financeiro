from marshmallow import Schema, fields


############
# Requests #
############

class UserAuthSchema(Schema):
    login = fields.Str(required=True)
    password = fields.Str(required=True)

