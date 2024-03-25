FROM python:3.10

WORKDIR /app

COPY requirements.txt /requirements.txt
RUN pip install -r /requirements.txt

COPY ./app .

EXPOSE 8000

CMD ["gunicorn", "-b", "0.0.0.0:8000", "-c", "app:app", "--access-logfile", "-"]
