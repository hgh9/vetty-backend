# 동물병원 예약 시스템 (vetty)

# 서버 주소

[스웨거 주소](http://20.196.196.241:3001/swagger)

# TODO

# 기능 목록

1.  고객

- 회원가입 (100%)
- 고객정보 조회
- 반려 동물 등록하기 (100%)

2.  예약 서비스

- 예약하기 (80%)
- 예약취소하기 (95%)
- 예약 내역 조회 (90%)

3.  진료 서비스

- 접수하기 (30%)
- 진료진행 (30%)
- 진료완료 (30%)
- 진료 내역 조회 (0%)

4.  서비스 3rdParty

- 결제 (80%)
- 알림 (0%)

## Monitoring Service

1. AZURE Application Insights

   - 라이브러리 설치 및 연결
   - INSTRUMENT_KEY 입력 후 call stack 확인

2. winston 라이브러리와 함께 사용

3. Metric 모니터링 서비스는 준비중 


## Exception handling

1. Exception.util.ts

   - service 또는 repository에서 발생하는 에러를 처리 하기 위해 만든 util 입니다.
   - 대체로 http 요청은 성공했으나 파라미터가 잘못 들어왔거나 다른 validation을 위해 사용됩니다.
   - 필요한 Error 핸들링을 계속 추가하면서 재활용 하시면됩니다.
   - TODO : 세부적인 에러내용들은 interceptor를 통해 winston logging으로 로컬에 저장하면서 동시에 cloudwatch로 보낼 수 있도록 합니다.

2. ExceptionService

   - controller에서 마지막 throw new httpexception을 토해내는 서비스입니다.
   - 대부분의 마지막 에러처리는 get, post, delete, update의 실패로 처리합니다.

3. 두가지 예제를 보려면 [app.controller.ts](https://github.com/hgh9/vetty-backend/blob/main/vet_nest/src/app.controller.ts) 또는 [app.service.ts](https://github.com/hgh9/vetty-backend/blob/main/vet_nest/src/app.service.ts)를 참고하시면 됩니다.

## CICD FLOW

1. docker hub login

   - 도커 허브에 로그인한다.

2. docker buildx

   - 최종적으로 머지된 main 브런치를 기준으로 build 한다 (linux/amd64)

3. docker push

   - docker hub에 최신 버전으로 push 한다

4. ssh connect

   - 서버에 접속한다.

5. docker pull

   - 최신버전의 docker hub를 pull 한다.

6. docker compose up -d

   - 최신버전 image를 가지고 build 한다.

## 완료된 항목

1. 기본 react, nestjs 셋팅 완료
2. typeorm 설정완료
3. socket io 기본 셋팅 완료
4. docker compose 설정 완료
5. swagger 셋팅 완료
6. winston 셋팅 완료

## how to install

1. 리눅스나 윈도우에 git, docker, docker compose 설치
2. git 클론해서 다운받는다

```bash
$ git clone git@github.com:hgh9/vetty-backend.git
$ cd vetty-backend
```

3. docker compose 한다 (version 2.2.3)

```bash
$ sudo docker compose up -d
```

4. Docker환경에서 개발

- 레포에서 클론을 했다면 vet_nest, vet_react 폴더가 있을 것이다.
- docker compose 한 폴더에서 vet_nest와 vet_react가 도커로 마운팅 되어 있다.
- vscode에서 docker extension을 이용해서 log를 확인하면서 코딩을 진행하면 된다.

## front spec

1. react
2. react query
3. redux 사용 예정
4. socket.io
5. chakraUi

## Backend spec

1. nestjs
2. typeorm
3. mariadb
4. redis
5. socketio
6. promethous

## docker compose

1. react
2. nestjs
3. redis
4. mariadb
5. grafana
