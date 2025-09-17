FROM node:22

WORKDIR /app
COPY index.js .
COPY package.json .
COPY package-lock.json .
COPY start.sh .
RUN npm install
RUN chmod +x start.sh


CMD ["bash", "start.sh"]