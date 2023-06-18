FROM node:18.2.0

WORKDIR /app

COPY . /app/

COPY package*.json /app/

COPY ./ ./

RUN yarn \
    && yarn run build 

EXPOSE 3001 


# 개발 환경에서는 start:dev로 주석을 해제
# 배포 환경에서는 start:prod을 주석 해제

CMD [ "yarn", "run", "start:dev" ]
# CMD [ "yarn", "run", "start:prod" ]