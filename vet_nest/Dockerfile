FROM node:18-alpine as base 

WORKDIR /app

COPY . /app/
COPY package*.json /app/

RUN yarn \
    && yarn run build 
COPY ./ ./

EXPOSE 3001 

FROM base as test
CMD ["yarn", "test"]


FROM base as prod 
CMD [ "yarn", "run", "start:dev" ]

# 개발 환경에서는 start:dev로 주석을 해제
# 배포 환경에서는 start:pod을 주석 해제
# CMD [ "yarn", "run", "start:prod" ]