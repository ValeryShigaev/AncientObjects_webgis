FROM python:3.9

ENV PYTHONUNBUFFERED 1

WORKDIR /usr/src/app

RUN pip install --upgrade pip

RUN apt update && apt install -y --no-install-recommends \
        libgdal-dev \
        gcc && \
        rm -rf /var/lib/apt/lists/*

COPY requirements.txt .

RUN pip install -r requirements.txt

COPY entrypoint.sh .

COPY . .


