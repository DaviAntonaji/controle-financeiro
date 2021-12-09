# Build da API
docker build -t financeiroapi .

# Iniciar API
docker run -d --restart always --name FinanceiroAPI -p 0.0.0.0:5001:5001 -v /Users/davi/repos/controle-financeiro/api/:/api financeiroapi:latest


# MySQL

# MySQL 5.7
docker run -d --restart always -p 0.0.0.0:3306:3306 \
	-e TIMEZONE=America/Sao_Paulo \
	-v /tmp:/tmp \
	-v /var/lib/mysql:/var/lib/mysql \
	-v /var/log/mysql:/var/log/mysql \
	-v /var/sock/mysqld:/var/sock/mysqld \
	-e MYSQL_ROOT_PASSWORD=123123 \
	-e MYSQL_GENERAL_LOG=1 \
	-e MYSQL_SOCKET_DIR=/var/sock/mysqld/  \
	--name mysql57 cytopia/mysql-5.7

