FROM node:18

LABEL version="1.0"
LABEL description="Frontend runing on port 8080"
LABEL maintainer=["argoitze@gmail.com"]

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

# ENV PATH /client/node_modules/.bin:$PATH

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

CMD ["npm", "run", "serve"]