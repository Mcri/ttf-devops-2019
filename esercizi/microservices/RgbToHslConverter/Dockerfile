FROM node:current-alpine
COPY /dist /API/dist
WORKDIR /API/dist
RUN npm install
WORKDIR /API/dist/RgbToHslConverter/src
EXPOSE 3000
CMD ["node", "HttpServer.js"]
