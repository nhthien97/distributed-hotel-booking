# distributed-hotel-booking
Distributed Hotel Booking System - Distributed Applications
cd /workspaces/distributed-hotel-booking
pwd

# CHẠY USER-SERVICE
cd services/user-service
./mvnw clean spring-boot:run
# TEST USER SERVICE
curl http://localhost:8081/users

curl -X POST http://localhost:8081/users \
-H "Content-Type: application/json" \
-d '{
  "username": "admin",
  "email": "admin@test.com",
  "password": "123456",
  "role": "ADMIN"
}'

# CHẠY AUTH-SERVICE
cd /workspaces/distributed-hotel-booking/services/auth-service
./mvnw clean spring-boot:run

curl -X POST http://localhost:8080/auth/login \
-H "Content-Type: application/json" \
-d '{"email":"admin@test.com","password":"123456"}'

# CHẠY API-GATEWAY
cd /workspaces/distributed-hotel-booking/services/api-gateway
pwd
ls
ls src/main/resources

./mvnw clean spring-boot:run

# LOGIN QUA API GATEWAY (LẤY TOKEN)

curl -X POST http://localhost:8088/api/auth/login \
-H "Content-Type: application/json" \
-d '{"email":"admin@test.com","password":"123456"}'

# GỌI USER SERVICE QUA GATEWAY (JWT)
curl http://localhost:8088/api/users \
-H "Authorization: Bearer <TOKEN>"


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

