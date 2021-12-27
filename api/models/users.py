from tokenpass import managertk
from database.connection import connectionDb

class UserModel(object):
    
    def __init__(self, obj):

        self.user_id = obj[0]
        self.user_name = obj[1]
        self.user_login = obj[2]
        
        self.user_status = obj[4]
        self.user_photo = obj[5]
        
    def json(self):
        return {
            "user_id": managertk.encodedPayload(str(self.user_id)),
            "user_name": self.user_name,
            "user_login": self.user_login,
            "user_status": self.user_status,
            "user_photo": self.user_photo,
        }


    @staticmethod
    def register(name,login,password,user_photo=None):
        conexao = connectionDb.connect()
        cursor = conexao.cursor()
        
        try:
            
            if user_photo == None:
                user_photo = ""
            cursor.execute( "SELECT * FROM usuarios WHERE user_login = %s", (login))
            exist = cursor.fetchone()
            if exist:
                return {"message": "Login já cadastrado", "status_code": 400}
            else:
                cursor.execute("INSERT INTO usuarios VALUES (NULL,%s,%s, md5(%s), 1, %s)", (name, login, password, user_photo))

                conexao.commit()
                return {"message": "OK"}
        except Exception as e:
            
            return {"message": "Requisição incorreta", "status_code": 400, "error": str(e)}

        finally:
            cursor.close()
            conexao.close()
            
    
    @staticmethod
    def auth(login,password):
        conexao = connectionDb.connect()
        cursor = conexao.cursor()
        
        try:
            
            cursor.execute( "SELECT * FROM usuarios WHERE user_login = %s AND user_password=md5(%s) AND user_status=1", (login, password))

            user = cursor.fetchone()

            if user:
                model = UserModel(user).json()

                return {"message": "OK", "user": model}
            return {"message": "User not found", "status_code": 404}

        except Exception as e:
            
            return {"message": "Requisição incorreta", "status_code": 400, "error": str(e)}

        finally:
            cursor.close()
            conexao.close()
            
            
            