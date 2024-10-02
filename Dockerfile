# Step 1: Node.js 이미지를 기반으로 함
FROM node:18

# Step 2: 작업 디렉토리를 만듦
WORKDIR /app

# Step 3: package.json과 package-lock.json 파일을 복사함
COPY package*.json ./

# Step 4: 의존성 설치
RUN npm install

# Step 5: 소스 코드를 복사함
COPY . .

# Step 6: 프로젝트 빌드
RUN npm run build

# Step 7: 빌드를 위한 포트 설정
EXPOSE 5173

# Step 8: 애플리케이션 실행 명령
CMD ["npm", "run", "preview"]