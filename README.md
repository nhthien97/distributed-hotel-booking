# distributed-hotel-booking
Distributed Hotel Booking System - Distributed Applications
cd /workspaces/distributed-hotel-booking
pwd
# CHẠY BOOKING SERVICE
cd /workspaces/distributed-hotel-booking
cd services/booking-service
mvn spring-boot:run

# CHẠY USER-SERVICE
cd services/user-service
./mvnw clean spring-boot:run

# CHẠY AUTH-SERVICE
cd /workspaces/distributed-hotel-booking/services/auth-service
./mvnw clean spring-boot:run

# CHẠY BOOKING SERVICE
cd /workspaces/distributed-hotel-booking
cd services/booking-service
mvn spring-boot:run

# CHẠY API-GATEWAY
cd /workspaces/distributed-hotel-booking/services/api-gateway
./mvnw clean spring-boot:run

# web
cd /workspaces/distributed-hotel-booking/frontend
python3 -m http.server 5500

# room-service
cd services/room-service
mvn spring-boot:run


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

