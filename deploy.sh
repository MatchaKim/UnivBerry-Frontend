#!/bin/bash

# 서버 정보
SERVER_USER="root"
SERVER_IP="49.247.25.154"
SERVER_PATH="/root/UnivBerry-Frontend"

# 프로젝트 루트 디렉토리 경로
LOCAL_PROJECT_PATH=$(pwd)
TAR_FILE_NAME="project.tar.gz"

# 프로젝트 파일 압축
echo "프로젝트 파일을 압축 중..."
tar -czvf $TAR_FILE_NAME -C $LOCAL_PROJECT_PATH .

# 서버로 압축 파일 전송
echo "압축 파일을 서버로 전송 중..."
scp $TAR_FILE_NAME $SERVER_USER@$SERVER_IP:$SERVER_PATH

# 서버에서 실행할 명령어들
REMOTE_COMMANDS="
cd $SERVER_PATH &&
echo '프로젝트 디렉토리로 이동 완료.' &&
tar -xzvf $TAR_FILE_NAME -C $SERVER_PATH &&
echo '압축 해제 완료.' &&
npm install &&
echo '의존성 설치 완료.' &&
npm run build &&
echo 'Nuxt.js 프로젝트 빌드 완료.' &&
pm2 start npm --name 'univberry-frontend' -- run start &&
echo 'PM2로 Nuxt.js 애플리케이션 시작 완료.' &&
pm2 save &&
pm2 startup &&
echo 'PM2 설정 저장 및 자동 시작 설정 완료.' &&
rm $TAR_FILE_NAME &&
echo '압축 파일 삭제 완료.'
"

# 서버에 접속하여 명령어 실행
echo "서버에 접속하여 명령어를 실행 중..."
ssh $SERVER_USER@$SERVER_IP "$REMOTE_COMMANDS"

# 로컬의 압축 파일 삭제
rm $TAR_FILE_NAME

echo "배포가 완료되었습니다."
