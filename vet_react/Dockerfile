FROM node:18.2.0

WORKDIR /app

COPY . /app/

COPY package*.json /app/

RUN yarn \
    && npx update-browserslist-db@latest  \
    && yarn run build  

COPY ./ ./

EXPOSE 3000 

# 개발 환경에서는 start로 주석을 해제
# 배포 환경에서는 start을 주석 해제
CMD [ "yarn", "run", "start" ]
# CMD [ "yarn", "run", "start" ]