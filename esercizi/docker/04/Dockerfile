FROM alpine
RUN apk update && apk add nodejs
COPY index.js /app/
CMD ["node", "app/index.js"]
