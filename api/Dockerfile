FROM python:3.7.7-slim-buster

WORKDIR '/api'
COPY requirements.txt .
RUN pip3 install -r requirements.txt
COPY . .



EXPOSE 5001

# COMMAND PROD
#CMD ["/bin/sh", "-c", "NEW_RELIC_CONFIG_FILE=newrelic.ini newrelic-admin run-python app.py"]

# COMMAND DEV
CMD ["python3", "app.py"]

