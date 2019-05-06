FROM amsterdam/python3.6
MAINTAINER datapunt@amsterdam.nl

EXPOSE 8000

RUN adduser --system datapunt

RUN chown datapunt -R /app
WORKDIR /app

# Install MapProxy
RUN pip install MapProxy==1.11.0

# Install Node.js
RUN curl -sL https://deb.nodesource.com/setup_12.x | sudo bash - \
  && apt-get install -y software-properties-common \
  && (echo "Package: nodejs" ; echo "Pin: version 12.*" ; echo "Pin-Priority: 1000" ; echo "") >> /etc/apt/preferences.d/nodejs \
  && apt-get install -y nodejs

# Copy configuration files
COPY ./app/mapproxy.yaml /app
COPY ./app/seed.yaml /app
COPY ./app/app.py /app

# Install tile seed script
COPY ./app/seed /app/seed
RUN cd /app/seed \
  && npm install \
  && npm link

USER datapunt
