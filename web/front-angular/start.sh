#!/bin/bash

docker stop FinanceiroFront ; docker rm FinanceiroFront

docker build -t financeirofront:latest .


# MANUAL
# docker run -ti -p 0.0.0.0:4200:4200 -v /Users/davi/repos/controle-financeiro/web/front-angular/:/app node:16-bullseye-slim /bin/sh

# AUTOMATICO

docker run -d --restart always --name FinanceiroFront -d -p 0.0.0.0:4201:4200 -v /Users/davi/repos/controle-financeiro/web/front-angular:/app financeirofront:latest

docker logs FinanceiroFront -f --tail 100
