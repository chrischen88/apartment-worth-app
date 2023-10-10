FROM node:18-alpine

WORKDIR /apartment-worth-frontend


COPY src/ /apartment-worth-frontend/src
COPY public/ /apartment-worth-frontend/public
COPY package*.json /apartment-worth-frontend
COPY tsconfig.json /apartment-worth-frontend
COPY next-env.d.ts /apartment-worth-frontend
COPY next.config.js /apartment-worth-frontend

RUN npm install
RUN npm run build

CMD ["npm", "start"]