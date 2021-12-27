from tokenpass import managertk
from database.connection import connectionDb
from calendar import monthrange


def relatorioAnual(user_id, ano):
    conexao = connectionDb.connect()
    cursor = conexao.cursor()
    try:
        despesas = []
        recebimentos = []
        categoriasDespesasNome = []
        categoriasDespesasQtde = []
        lucros = []
        user_id = managertk.decodedPayload(user_id)
        sql = f"SELECT SUM(despesas.despesa_valor), despesa_categoria.despesa_categoria_nome FROM despesas INNER JOIN despesa_categoria ON. despesas.despesa_categoria_id = despesa_categoria.despesa_categoria_id AND despesas.despesa_data >= '{ano}-01-01 00:00:00' AND despesas.despesa_data <= '{ano}-12-31 23:59:59' AND despesas.user_id='{user_id}'  GROUP BY despesas.despesa_categoria_id"

        cursor.execute(sql)

        for cat in cursor.fetchall():
            print("CAT", cat)
            categoriasDespesasQtde.append(cat[0])
            categoriasDespesasNome.append(cat[1])
            

        for mes in range(1, 13):
            print("-"*30)
            print("MES", mes)
            num_days = monthrange(int(ano), int(mes))[1]
            if int(mes) < 10:
                mesStr = str(mes).zfill(1)
            else:
                mesStr = mes



            where = f"WHERE user_id = {user_id} AND recebimento_data >= '{ano}-{mes}-01 00:00:00' AND recebimento_data <= '{ano}-{mesStr}-{num_days} 23:59:59'"
            sql = "SELECT SUM(recebimento_valor) FROM recebimentos " + where
            cursor.execute(sql)
            print("SQL RECEBIMENTO ", sql)
            recebimentoDados = cursor.fetchone()
            if recebimentoDados:
                recebimento = recebimentoDados[0]
            else:
                recebimento = 0

            where = f"WHERE user_id = {user_id} AND despesa_data >= '{ano}-{mes}-01 00:00:00' AND despesa_data <= '{ano}-{mesStr}-{num_days} 23:59:59'"
            sql = "SELECT SUM(despesa_valor) FROM despesas " + where
            cursor.execute(sql)
            print("SQL DESPESA ", sql)
            despesaDados = cursor.fetchone()
            if despesaDados:
                despesa = despesaDados[0]
            else:
                despesa = 0

            
            if recebimento == None:
                recebimento = 0
            if despesa == None:
                despesa = 0

            lucro = recebimento - despesa

            recebimentos.append(recebimento)
            despesas.append(despesa)
            lucros.append(lucro)


        return {"message": "OK", "recebimentos": recebimentos, "despesas": despesas, "lucros": lucros, "categoria_despesas": {"nomes": categoriasDespesasNome, "qtde": categoriasDespesasQtde}}

    except Exception as e:

        return {"message": "Requisição incorreta", "status_code": 400, "error": str(e)}

    finally:
        cursor.close()
        conexao.close()


def relatorioMensal(user_id, ano, mes):
    conexao = connectionDb.connect()
    cursor = conexao.cursor()
    try:

        categoriasDespesasNome = []
        categoriasDespesasQtde = []
        num_days = monthrange(int(ano), int(mes))[1]

        if int(mes) < 10:
            mesStr = str(mes).zfill(1)
        else:
            mesStr = mes
        user_id = managertk.decodedPayload(user_id)
        sql = f"SELECT SUM(despesas.despesa_valor), despesa_categoria.despesa_categoria_nome FROM despesas INNER JOIN despesa_categoria ON. despesas.despesa_categoria_id = despesa_categoria.despesa_categoria_id AND despesas.despesa_data >= '{ano}-{mesStr}-01 00:00:00' AND despesas.despesa_data <= '{ano}-{mesStr}-{num_days} 23:59:59' AND despesas.user_id='{user_id}'  GROUP BY despesas.despesa_categoria_id"

        cursor.execute(sql)

        for cat in cursor.fetchall():
            print("CAT", cat)
            categoriasDespesasQtde.append(cat[0])
            categoriasDespesasNome.append(cat[1])
            


        print("-"*30)
        print("MES", mes)
        
        



        where = f"WHERE user_id = {user_id} AND recebimento_data >= '{ano}-{mes}-01 00:00:00' AND recebimento_data <= '{ano}-{mesStr}-{num_days} 23:59:59'"
        sql = "SELECT SUM(recebimento_valor) FROM recebimentos " + where
        print("SQL RECEBIMENTO ", sql)
        cursor.execute(sql)
        recebimentoDados = cursor.fetchone()
        print("recebimentoDados", recebimentoDados)
        if recebimentoDados:
            recebimento = recebimentoDados[0]
        else:
            recebimento = 0

        where = f"WHERE user_id = {user_id} AND despesa_data >= '{ano}-{mes}-01 00:00:00' AND despesa_data <= '{ano}-{mesStr}-{num_days} 23:59:59'"
        sql = "SELECT SUM(despesa_valor) FROM despesas " + where
        cursor.execute(sql)
        print("SQL DESPESA ", sql)
        despesaDados = cursor.fetchone()
        if despesaDados:
            despesa = despesaDados[0]
        else:
            despesa = 0
        if recebimento == None:
            recebimento = 0
        if despesa == None:
            despesa = 0
        lucro = recebimento - despesa





        return {"message": "OK", "recebimento": recebimento, "despesa": despesa, "lucro": lucro, "categoria_despesas": {"nomes": categoriasDespesasNome, "qtde": categoriasDespesasQtde}}

    except Exception as e:

        return {"message": "Requisição incorreta", "status_code": 400, "error": str(e)}
    

    finally:
        cursor.close()
        conexao.close()
