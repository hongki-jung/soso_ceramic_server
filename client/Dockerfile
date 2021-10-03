FROM keymetrics/pm2:12-alpine
# FROM node:alpine

ARG NODE_ENV
ENV NODE_ENV $NODE_ENV

WORKDIR /app
COPY . .

RUN npm i --production
RUN npm run build
EXPOSE 3000:3000

CMD ["npm", "run", "start"]
# CMD [ "pm2-runtime", "--json", "pm2Client.json"]

