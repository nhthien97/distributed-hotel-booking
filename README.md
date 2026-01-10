# distributed-hotel-booking
Distributed Hotel Booking System - Distributed Applications


# Terminal 1 – User Service (port 8081)
cd services/user-service
./mvnw spring-boot:run
# Terminal 2 – Auth Service (port 8080)
cd services/auth-service
./mvnw spring-boot:run

# SAU KHI CHẠY XONG – TEST NHANH
1️⃣ Tạo user
curl -X POST http://localhost:8081/users \
-H "Content-Type: application/json" \
-d '{"username":"admin","email":"admin@test.com","password":"123456","role":"ADMIN"}'

2️⃣ Login lấy JWT
curl -X POST http://localhost:8080/auth/login \
-H "Content-Type: application/json" \
-d '{"email":"admin@test.com","password":"123456"}'

# Mở H2 Console
http://localhost:8081/h2-console

SELECT * FROM users;


cd ~/distributed-hotel-booking
# Terminal 1
cd services/user-service && ./mvnw spring-boot:run
# Terminal 2
cd services/auth-service && ./mvnw spring-boot:run
