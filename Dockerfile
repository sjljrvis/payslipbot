
FROM mhart/alpine-node:8

WORKDIR /src
ADD . .
RUN npm install
EXPOSE 5555
CMD ["node", "index.js"]