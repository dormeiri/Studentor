FROM python:alpine3.8

COPY ./requirements.txt .
RUN pip install -r requirements.txt
COPY ./app /app

WORKDIR /app

CMD ["python", "-u", "main.py"]