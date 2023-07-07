FROM node:18-alpine

WORKDIR /app
RUN 
    

COPY . /app/

COPY package*.json /app/

RUN npm install \
    && npm run build 

COPY ./ ./

EXPOSE 3001 


# 개발 환경에서는 start:dev로 주석을 해제
# 배포 환경에서는 start:pod을 주석 해제

CMD [ "npm", "run", "start:dev" ]
# CMD [ "yarn", "run", "start:prod" ]