FROM python:3.12-alpine

WORKDIR /app

COPY requirements.txt /app
RUN pip install -r requirements.txt && rm requirements.txt

COPY . .

EXPOSE 5000

ENTRYPOINT [ "sh", "./run.sh" ]
