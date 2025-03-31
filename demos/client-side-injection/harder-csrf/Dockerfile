FROM python:3.12

RUN apt update && apt install -y sqlite3

WORKDIR /app

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY ./src ./

RUN echo 'CREATE TABLE users (username TEXT, password TEXT, balance INTEGER, has_flag BOOLEAN);' | sqlite3 users.db
RUN sqlite3 users.db -line "INSERT INTO users (username, password, balance, has_flag) VALUES ('admin', 'SUCH_A_LONG_PASSWORD_ITLL_NEVER_BE_BRUTEFORCED', 9999, FALSE);"
RUN chmod 777 users.db

ENTRYPOINT ["python", "-u", "app.py"]
