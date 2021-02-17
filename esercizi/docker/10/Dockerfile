FROM alpine
RUN apk add --update nodejs npm   
COPY server.js /app/
COPY package.json /app/
WORKDIR /app
RUN npm install
EXPOSE 3000
ENTRYPOINT ["node", "server.js"]
