# distributed-hotel-booking
Distributed Hotel Booking System - Distributed Applications
cd /workspaces/distributed-hotel-booking
pwd
# CHẠY BOOKING SERVICE
cd /workspaces/distributed-hotel-booking
cd services/booking-service
mvn spring-boot:run

curl -X POST http://localhost:8082/bookings \
-H "Content-Type: application/json" \
-d '{
  "roomId": 900,
  "userEmail": "admin@test.com",
  "checkIn": "2026-07-10",
  "checkOut": "2026-07-12"
}'

curl -X POST http://localhost:8088/api/bookings \
-H "Content-Type: application/json" \
-d '{
  "roomId": 901,
  "userEmail": "admin@test.com",
  "checkIn": "2026-07-15",
  "checkOut": "2026-07-17"
}'

curl http://localhost:8082/actuator/health

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

cd /workspaces/distributed-hotel-booking/frontend
python3 -m http.server 5500

# Mở H2 Console
http://localhost:8081/h2-console
jdbc:h2:mem:bookingdb

SELECT * FROM users;
SELECT * FROM BOOKING;


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

