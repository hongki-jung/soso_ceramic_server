FROM keymetrics/pm2:10-alpine
# FROM node:7.8

# RUN apt-get update && apt-get install -y build-essential python

ARG NODE_ENV
ENV NODE_ENV $NODE_ENV


EXPOSE 4000:4000


WORKDIR /app

COPY ./package*.json ./
# RUN npm i --production
# RUN sudo apt-get update
# RUN sudo apt-get install -y build-essential python
RUN npm i --production
RUN apk update && apk add --no-cache ffmpeg
# RUN pip install -r requirements.txt
# RUN pip uninstall -y ffmpeg-python==0.2.0
# RUN pip install ffmpeg-python==0.2.0

COPY ./server ./server


# COPY ./client ./client
# COPY ./admin ./admin

CMD ["sh", "-c", "NODE_ENV=$NODE_ENV node ./server/bin/www"]

# CMD ["sh", "-c", "NODE_ENV=$NODE_ENV node ./server/bin/www & node ./admin/bin/www & node ./landing/bin/www"]

