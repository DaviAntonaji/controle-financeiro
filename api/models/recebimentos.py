from tokenpass import managertk
from database.connection import connectionDb
from calendar import monthrange


class RecebimentoModel(object):

    def __init__(self, obj):
        self.recebimento_id = obj[0]
        self.user_id = obj[1]
        self.recebimento_descricao = obj[2]
        self.recebimento_valor = obj[3]
        self.recebimento_data = str(obj[4])


    def json(self):
        return {
            "recebimento_id": managertk.encodedPayload(str(self.recebimento_id)),
            "user_id": managertk.encodedPayload(str(self.user_id)),
            "recebimento_descricao": self.recebimento_descricao,
            "recebimento_valor": self.recebimento_valor,
            "recebimento_data": self.recebimento_data
        }


    def deletaRecebimento(recebimento_id):
        conexao = connectionDb.connect()
        cursor = conexao.cursor()
        try:
            recebimento_id = managertk.decodedPayload(recebimento_id)

            cursor.execute("DELETE FROM recebimentos WHERE recebimento_id=%s", (recebimento_id))
            return {"message": "OK"}

        except Exception as e:

            return {"message": "Requisição incorreta", "status_code": 400, "error": str(e)}

        finally:
            cursor.close()
            conexao.close()

    def atuatualizaRecebimento(recebimento_id,user_id, descricao, valor, data):
        conexao = connectionDb.connect()
        cursor = conexao.cursor()
        try:
            recebimento_id = managertk.decodedPayload(recebimento_id)
            user_id = managertk.decodedPayload(user_id)

            cursor.execute("UPDATE recebimentos SET user_id=%s, recebimento_descricao=%s, recebimento_valor=%s, recebimento_data=%s WHERE recebimento_id=%s", (user_id, descricao,valor,data,categoria,recebimento_id))
            return {"message": "OK"}

        except Exception as e:

            return {"message": "Requisição incorreta", "status_code": 400, "error": str(e)}

        finally:
            cursor.close()
            conexao.close()
    def cadastraRecebimento(user_id, descricao, valor, data):
        conexao = connectionDb.connect()
        cursor = conexao.cursor()
        try:
            user_id = managertk.decodedPayload(user_id)

            cursor.execute("INSERT INTO recebimentos VALUES (NULL,%s, %s, %s, %s, %s)", (user_id, descricao,valor,data))
            return {"message": "OK"}

        except Exception as e:

            return {"message": "Requisição incorreta", "status_code": 400, "error": str(e)}

        finally:
            cursor.close()
            conexao.close()

    def consultaRecebimentosMes(user_id, mes, ano):
        num_days = monthrange(int(ano), int(mes))[1]
        if int(mes) < 10:
            mes = str(mes).zfill(1)
        conexao = connectionDb.connect()
        cursor = conexao.cursor()
        try:
            where = f"WHERE user_id = {managertk.decodedPayload(user_id)} AND recebimento_data >= '{ano}-{mes}-01 00:00:00' AND recebimento_data <= '{ano}-{mes}-{num_days} 23:59:59'"
            sql = "SELECT * FROM recebimentos " + where

            cursor.execute(sql)
            recebimentos = []
            for recebimento in cursor.fetchall():
                recebimentos.append(RecebimentoModel(recebimento).json())

            return {"message": "OK", "recebimentos": recebimentos}

        except Exception as e:

            return {"message": "Requisição incorreta", "status_code": 400, "error": str(e)}

        finally:
            cursor.close()
            conexao.close()
