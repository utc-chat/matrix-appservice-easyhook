FROM node:14

COPY . /

RUN cd / \ 
    && npm install \
    && cd client \
    && npm install \
    && cd .. \
    && npm install -g pm2 \
    && npm install -g nodemon \
    && npm install -g react-scripts

WORKDIR /
CMD /docker-start.sh