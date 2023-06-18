# 항해 플러스 9조 스켈레톤

# 동물병원 예약 시스템 (vetty)

# TODO


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
  $ git clone https://github.com/diasm3/chatting_socket_io.git
  $ cd chatting_socket_io
  ```

3. docker compose 한다 (version 2.2.3)

  ```bash
  $ sudo docker compose up -d
  ```

4. Docker환경에서 개발
  - 레포에서 클론을 했다면 chat_nest, chat_react 폴더가 있을 것이다.
  - docker compose 한 폴더에서 chat_nest와 chat_react가 도커로 마운팅 되어 있다.
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


## docker compose
  1. react
  2. nestjs
  3. redis
  4. mariadb


## CICD
  1. git action

