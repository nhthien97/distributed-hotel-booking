# distributed-hotel-booking
Distributed Hotel Booking System - Distributed Applications

cd /workspaces/distributed-hotel-booking
# CHẠY USER-SERVICE
cd services/user-service
chmod +x mvnw
./mvnw clean spring-boot:run

curl -X POST http://localhost:8081/users \
-H "Content-Type: application/json" \
-d '{
  "username": "admin",
  "email": "admin@test.com",
  "password": "123456",
  "role": "ADMIN"
}'

curl -i "http://localhost:8081/users/by-email?email=admin@test.com"
# CHẠY AUTH-SERVICE
cd /workspaces/distributed-hotel-booking/services/auth-service
chmod +x mvnw
./mvnw clean spring-boot:run

curl -X POST http://localhost:8080/auth/login \
-H "Content-Type: application/json" \
-d '{
  "email": "admin@test.com",
  "password": "123456"
}'
# CHẠY API-GATEWAY
cd /workspaces/distributed-hotel-booking/services/api-gateway
chmod +x mvnw
./mvnw clean spring-boot:run

curl http://localhost:8082/users \
-H "Authorization: Bearer <PASTE_TOKEN_HERE>"


# Mở H2 Console
http://localhost:8081/h2-console

SELECT * FROM users;


# Mở file shell config
nano ~/.bashrc

# Thêm cuối file
export JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64
export PATH=$JAVA_HOME/bin:$PATH

# Áp dụng
source ~/.bashrc

# Kiểm tra
java -version
mvn -version

