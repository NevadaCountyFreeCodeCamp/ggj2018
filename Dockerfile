FROM node:alpine
ADD https://github.com/superpowers/superpowers-core/releases/download/v4.0.0/superpowers-core-v4.0.0.zip /
ADD https://github.com/superpowers/superpowers-game/releases/download/v4.0.3/superpowers-game-v4.0.3.zip /
RUN unzip /superpowers-core-v4.0.0.zip
RUN unzip /superpowers-game-v4.0.3.zip
RUN mv /superpowers-core-v4.0.0/ /superpowers/
RUN mkdir -p /superpowers/systems
RUN mv /superpowers-game-v4.0.3/ /superpowers/systems/game/
WORKDIR /superpowers
COPY config.json .
EXPOSE 4237 4238
CMD node server start
