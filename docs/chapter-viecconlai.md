CÔNG VIỆC TIẾP THEO ĐỂ HOÀN THIỆN DỰ ÁN
1️⃣ API Gateway

Tạo API Gateway làm cổng vào duy nhất

Kiểm tra JWT token

Định tuyến request đến User / Auth / Hotel / Booking Service

👉 Hoàn thiện kiến trúc hệ thống phân tán

2️⃣ Hotel Service

Quản lý khách sạn, phòng

Tìm kiếm phòng trống theo ngày

Cung cấp API cho frontend

3️⃣ Booking Service + Đồng bộ hóa

Xử lý đặt phòng

Áp dụng Distributed Lock (Redis) để tránh đặt trùng

Hoàn thiện Chương 6 – Synchronization

4️⃣ Payment Service (Bất đồng bộ)

Xử lý thanh toán

Gửi event PAYMENT_SUCCESS

Áp dụng Event-driven architecture

5️⃣ Docker Compose

Docker hóa từng service

1 lệnh chạy toàn bộ hệ thống

Chuẩn production-ready

6️⃣ Monitoring & Fault Tolerance

Health check cho các service

Theo dõi trạng thái hệ thống

Mô phỏng lỗi service



Giữ nguyên UI mô phỏng

 Chỉ cần làm thêm Booking Service + Redis Lock

 hương 1 – Mở đầu (2 điểm)

Đã làm được:

Xây dựng hệ thống phân tán dạng microservice cho bài toán hotel booking.

Có tài liệu README + docs/ mô tả hệ thống.

Có sơ đồ kiến trúc, class diagram, sequence diagram trong thư mục docs/diagrams.

➡️ Đạt ~1.5 – 2 / 2

Chương 2 – Kiến trúc (2 điểm)

Đã làm được:

Áp dụng Microservices Architecture:

user-service

auth-service

api-gateway

Giao tiếp giữa các service bằng REST API

Phân tách rõ authentication và business logic

➡️ Đạt ~2 / 2

Chương 3 – Tiến trình & Luồng (1 điểm)

Đã làm được:

Mỗi service chạy như một tiến trình độc lập (Spring Boot + Tomcat)

Xử lý request theo mô hình multi-threaded web server (Tomcat thread pool mặc định)

⚠️ Chưa custom thread / async rõ ràng

➡️ Đạt ~0.5 / 1

Chương 4 – Trao đổi thông tin (1 điểm)

Đã làm được:

Giao tiếp RESTful API giữa các node

Auth-service gọi user-service thông qua HTTP

JSON request/response chuẩn

⚠️ Chưa có message queue / gRPC

➡️ Đạt ~1 / 1

Chương 5 – Định danh (1 điểm)

Đã làm được:

Định danh user bằng JWT (Token Authentication)

Định danh tài nguyên bằng URI /users, /auth/login

Định danh service bằng host + port

➡️ Đạt ~1 / 1

Chương 6 – Đồng bộ hóa (1 điểm)

Đã làm được:

Đồng bộ dữ liệu thông qua Database transaction (JPA/Hibernate)

Tránh xung đột bằng ID + unique constraint

⚠️ Chưa có distributed lock / CQRS

➡️ Đạt ~0.5 / 1

Chương 7 – Sao lưu (1 điểm)

Đã làm được:

Có thể backup dữ liệu bằng H2 SQL export

Dữ liệu tách biệt theo service

⚠️ Chưa có backup tự động / replication

➡️ Đạt ~0.5 / 1

Chương 8 – Tính chịu lỗi (1 điểm)

Đã làm được:

Service độc lập, lỗi service này không làm sập service khác

Có exception handling

Có thể restart từng service riêng

⚠️ Chưa có circuit breaker / monitoring

➡️ Đạt ~0.5 / 1