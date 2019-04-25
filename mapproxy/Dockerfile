FROM amsterdam/python
MAINTAINER datapunt@amsterdam.nl

EXPOSE 8000

RUN adduser --system datapunt

RUN chown datapunt -R /app
WORKDIR /app

RUN pip install MapProxy==1.11.0

# Install Node.js
RUN curl -sL https://deb.nodesource.com/setup_11.x | sudo bash - \
  && sudo apt-get update \
  && sudo apt-get install -y curl software-properties-common \
  && sudo apt-get install -y nodejs=11.14.0-1nodesource1

COPY ./docker-entrypoint.sh /bin

COPY ./app/mapproxy.yaml /app
COPY ./app/seed.yaml /app
COPY ./app/app.py /app
COPY ./app/seed /app/seed

RUN cd /app/seed \
  && npm install \
  && npm link

USER datapunt

CMD /bin/docker-entrypoint.sh
