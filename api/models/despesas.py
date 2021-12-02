from tokenpass import managertk
from database.connection import connectionDb
from calendar import monthrange


class DespesaModel(object):

    def __init__(self, obj):
        self.despesa_id = obj[0]
        self.user_id = obj[1]
        self.despesa_descricao = obj[2]
        self.despesa_valor = obj[3]
        self.despesa_data = str(obj[4])
        self.despesa_categoria_id = obj[5]
        self.despesa_categoria_nome = obj[7]

    def json(self):
        return {
            "despesa_id": managertk.encodedPayload(str(self.despesa_id)),
            "user_id": managertk.encodedPayload(str(self.user_id)),
            "despesa_descricao": self.despesa_descricao,
            "despesa_valor": self.despesa_valor,
            "despesa_data": self.despesa_data,
            "despesa_categoria_id":  managertk.encodedPayload(str(self.despesa_categoria_id)),
            "despesa_categoria_nome": self.despesa_categoria_nome
        }


    def deletaDespesa(despesa_id):
        conexao = connectionDb.connect()
        cursor = conexao.cursor()
        try:
            despesa_id = managertk.decodedPayload(despesa_id)

            cursor.execute("DELETE FROM despesas WHERE despesa_id=%s", (despesa_id))
            return {"message": "OK"}

        except Exception as e:

            return {"message": "Requisição incorreta", "status_code": 400, "error": str(e)}

        finally:
            cursor.close()
            conexao.close()

    def atualizaDespesa(despesa_id,user_id, descricao, valor, data, categoria):
        conexao = connectionDb.connect()
        cursor = conexao.cursor()
        try:
            despesa_id = managertk.decodedPayload(despesa_id)
            user_id = managertk.decodedPayload(user_id)
            categoria = managertk.decodedPayload(categoria)
            cursor.execute("UPDATE despesas SET user_id=%s, despesa_descricao=%s, despesa_valor=%s, despesa_data=%s, despesa_categoria_id=%s WHERE despesa_id=%s", (user_id, descricao,valor,data,categoria,despesa_id))
            return {"message": "OK"}

        except Exception as e:

            return {"message": "Requisição incorreta", "status_code": 400, "error": str(e)}

        finally:
            cursor.close()
            conexao.close()
    def cadastraDespesa(user_id, descricao, valor, data, categoria):
        conexao = connectionDb.connect()
        cursor = conexao.cursor()
        try:
            user_id = managertk.decodedPayload(user_id)
            categoria = managertk.decodedPayload(categoria)
            cursor.execute("INSERT INTO despesas VALUES (NULL,%s, %s, %s, %s, %s)", (user_id, descricao,valor,data,categoria))
            return {"message": "OK"}

        except Exception as e:

            return {"message": "Requisição incorreta", "status_code": 400, "error": str(e)}

        finally:
            cursor.close()
            conexao.close()

    def consultaDespesasMes(user_id, mes, ano):
        num_days = monthrange(int(ano), int(mes))[1]
        conexao = connectionDb.connect()
        cursor = conexao.cursor()
        try:
            where = f"WHERE user_id = {managertk.decodedPayload(user_id)} AND despesa_data >= '{ano}-{mes}-01 00:00:00' AND despesa_data <= '{ano}-{mes}-{num_days} 23:59:59'"
            sql = "SELECT * FROM despesas INNER JOIN despesa_categoria ON despesas.despesa_categoria_id = despesa_categoria.despesa_categoria_id " + where

            cursor.execute(sql)
            despesas = []
            for despesa in cursor.fetchall():
                despesas.append(DespesaModel(despesa).json())

            return {"message": "OK", "despesas": despesas}

        except Exception as e:

            return {"message": "Requisição incorreta", "status_code": 400, "error": str(e)}

        finally:
            cursor.close()
            conexao.close()

    def consultaTipos():

        conexao = connectionDb.connect()
        cursor = conexao.cursor()
        try:

            cursor.execute("SELECT * FROM despesa_categoria")
            categorias = []
            for categoria in cursor.fetchall():
                categorias.append({"despesa_categoria_id": managertk.encodedPayload(
                    str(categoria[0])), "despesa_categoria_nome": categoria[1]})

            return {"message": "OK", "categorias": categorias}

        except Exception as e:

            return {"message": "Requisição incorreta", "status_code": 400, "error": str(e)}

        finally:
            cursor.close()
            conexao.close()
