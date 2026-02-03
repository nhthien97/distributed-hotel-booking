let bookedRoomIds = [];
let currentRooms = [];

/* 🔐 CHECK LOGIN */
document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");

  if (!token) {
    alert("Vui lòng đăng nhập");
    location.replace("index.html");
  }
});

/* SEARCH */
function searchRooms() {
    const capacity = document.getElementById("capacity").value;
    const checkIn = document.getElementById("checkIn").value;
    const checkOut = document.getElementById("checkOut").value;

    if (!checkIn || !checkOut) {
        alert("Vui lòng chọn ngày check-in và check-out");
        return;
    }

   const url = `https://ominous-trout-v67rqxvv9j4v2w7rr-8088.app.github.dev/api/rooms/search?capacity=${capacity}&checkIn=${checkIn}&checkOut=${checkOut}`;

    fetch(url)
        .then(res => res.json())
        .then(data => {
            console.log("ROOMS:", data);
            currentRooms = data;  
            renderRooms(data);
        })
        .catch(err => {
            console.error(err);
            alert("Không tìm được phòng");
        });
}

function renderRooms(rooms) {
    const roomList = document.getElementById("roomList");
    roomList.innerHTML = "";

    if (rooms.length === 0) {
        roomList.innerHTML = "<p>Không có phòng phù hợp</p>";
        return;
    }

    rooms.forEach(room => {
    const isBooked = bookedRoomIds.includes(room.id);
    const images = roomImages[room.id] || [
        "https://via.placeholder.com/400x220?text=No+Image"
    ];

    const imageHtml = images.map((src, i) =>
    `<img src="${src}" class="${i === 0 ? 'active' : ''}" onclick="openRoomModal(${room.id})">`
).join("");

    const card = document.createElement("div");
    card.className = "room-card";

    card.innerHTML = `
        <div class="room-slider">
            ${imageHtml}
            <button class="prev" onclick="prevImage(this)">‹</button>
            <button class="next" onclick="nextImage(this)">›</button>
        </div>

        <div class="room-body">
            <div class="room-header">
                <h3>${room.name}</h3>
            </div>

            <div class="room-info">
                <span>👤 ${room.capacity} người</span>
            </div>

            <div class="room-footer">
    <div class="price">${room.price}đ <span>/ đêm</span></div>

    <div class="actions">
        <button class="btn-outline" onclick="openRoomModal(${room.id})">
            Xem chi tiết
        </button>

        ${
            isBooked
            ? `<button class="btn-outline" disabled>Đã được booking</button>`
            : `<button class="btn-solid" onclick="bookRoom(${room.id})">Đặt phòng</button>`
        }
    </div>
</div>

    `;

    roomList.appendChild(card);
});

}

/* BOOK ROOM */
function bookRoom(roomId) {
    const checkIn = document.getElementById("checkIn").value;
    const checkOut = document.getElementById("checkOut").value;
    const token = localStorage.getItem("token");

    if (!checkIn || !checkOut) {
        alert("Thiếu ngày check-in hoặc check-out");
        return;
    }
        fetch("https://ominous-trout-v67rqxvv9j4v2w7rr-8088.app.github.dev/api/bookings", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
        body: JSON.stringify({
            roomId: roomId,
            checkIn: checkIn,
            checkOut: checkOut,
            userEmail: localStorage.getItem("email")
        })
    })
    .then(res => {
        if (!res.ok) {
            throw new Error("Booking failed: " + res.status);
        }
        return res.json();
    })
    .then(data => {
    alert("✅ Đặt phòng thành công\nMã booking: " + data.id);
    localStorage.setItem("lastBookingId", data.id);
    window.location.href = "history.html";
})
    .catch(err => {
        console.error(err);
        alert("❌ Đặt phòng thất bại");
    });
}

/* IMAGES */
const roomImages = {
    1: ["images/images-room-1-1.jpg", "images/images-room-1-2.jpg", "images/images-room-1-3.jpg"],
    2: ["images/images-room-2-1.jpg", "images/images-room-2-2.jpg", "images/images-room-2-3.jpg"],
    3: ["images/images-room-3-1.jpg", "images/images-room-3-2.jpg", "images/images-room-3-3.jpg"],
    4: ["images/images-room-4-1.jpg", "images/images-room-4-2.jpg", "images/images-room-4-3.jpg"],
    5: ["images/images-room-5-1.jpg", "images/images-room-5-2.jpg", "images/images-room-5-3.jpg"],
    6: ["images/images-room-6-1.jpg", "images/images-room-6-2.jpg", "images/images-room-6-3.jpg"],
    7: ["images/images-room-7-1.jpg", "images/images-room-7-2.jpg", "images/images-room-7-3.jpg"],
    8: ["images/images-room-8-1.jpg", "images/images-room-8-2.jpg", "images/images-room-8-3.jpg"],
    9: ["images/images-room-9-1.jpg", "images/images-room-9-2.jpg", "images/images-room-9-3.jpg"],
    10: ["images/images-room-10-1.jpg", "images/images-room-10-2.jpg", "images/images-room-10-3.jpg"],
    11: ["images/images-room-11-1.jpg", "images/images-room-11-2.jpg", "images/images-room-11-3.jpg"],
    12: ["images/images-room-12-1.jpg", "images/images-room-12-2.jpg", "images/images-room-12-3.jpg"],
    13: ["images/images-room-13-1.jpg", "images/images-room-13-2.jpg", "images/images-room-13-3.jpg"],
    14: ["images/images-room-14-1.jpg", "images/images-room-14-2.jpg", "images/images-room-14-3.jpg"],
    15: ["images/images-room-15-1.jpg", "images/images-room-15-2.jpg", "images/images-room-15-3.jpg"],
    16: ["images/images-room-16-1.jpg", "images/images-room-16-2.jpg", "images/images-room-16-3.jpg"],
    17: ["images/images-room-17-1.jpg", "images/images-room-17-2.jpg", "images/images-room-17-3.jpg"],
    18: ["images/images-room-18-1.jpg", "images/images-room-18-2.jpg", "images/images-room-18-3.jpg"],
    19: ["images/images-room-19-1.jpg", "images/images-room-19-2.jpg", "images/images-room-19-3.jpg"],
    20: ["images/images-room-20-1.jpg", "images/images-room-20-2.jpg", "images/images-room-20-3.jpg"]
};

/* MODAL */
let modalImages = [];
let modalIndex = 0;
let modalRoom = null;

window.openRoomModal = function (roomId) {
    modalRoom = currentRooms.find(r => r.id === roomId);
    modalImages = roomImages[roomId] || [];
    modalIndex = 0;

    document.getElementById("modalImage").src = modalImages[0];
    document.getElementById("modalRoomName").innerText = modalRoom.name;
    document.getElementById("modalRoomCapacity").innerText = "👤 " + modalRoom.capacity + " người";
    document.getElementById("modalRoomPrice").innerText = modalRoom.price + "đ / đêm";

    const isBooked = bookedRoomIds.includes(roomId);
    document.getElementById("modalAction").innerHTML = isBooked
        ? `<button class="btn-outline" disabled>Đã được booking</button>`
        : `<button class="btn-solid" onclick="bookRoom(${roomId})">Đặt phòng</button>`;

    document.getElementById("roomModal").style.display = "block";
}

function closeRoomModal() {
    document.getElementById("roomModal").style.display = "none";
}

function prevModalImage() {
    modalIndex = (modalIndex - 1 + modalImages.length) % modalImages.length;
    document.getElementById("modalImage").src = modalImages[modalIndex];
}

function nextModalImage() {
    modalIndex = (modalIndex + 1) % modalImages.length;
    document.getElementById("modalImage").src = modalImages[modalIndex];
}

/* SLIDER */
let index = 0;
const slides = document.querySelectorAll(".slide");
setInterval(() => {
    slides[index].classList.remove("active");
    index = (index + 1) % slides.length;
    slides[index].classList.add("active");
}, 4000);

/* AUTH UI */
const email = localStorage.getItem("email");
document.getElementById("authArea").innerHTML = `
  <span style="color:white">👋 ${email}</span>
  <a href="#" class="login" onclick="logout()">Đăng xuất</a>
`;

function logout(){
  localStorage.clear();
  location.href="index.html";
}

/* LOAD ALL */
document.addEventListener("DOMContentLoaded", () => {
    loadAllRooms();
});

function loadAllRooms() {
    Promise.all([
        fetch("https://ominous-trout-v67rqxvv9j4v2w7rr-8088.app.github.dev/api/rooms")
            .then(res => res.json()),
        fetch("https://ominous-trout-v67rqxvv9j4v2w7rr-8088.app.github.dev/api/bookings/active")
            .then(res => res.json())
    ])
    .then(([rooms, bookings]) => {
        bookedRoomIds = bookings.map(b => b.roomId);
        currentRooms = rooms; 
        renderRooms(rooms);
    })
    .catch(err => console.error(err));
}

/* SLIDER BUTTONS */
function nextImage(btn) {
    const slider = btn.parentElement;
    const images = slider.querySelectorAll("img");
    let index = [...images].findIndex(img => img.classList.contains("active"));
    images[index].classList.remove("active");
    images[(index + 1) % images.length].classList.add("active");
}

function prevImage(btn) {
    const slider = btn.parentElement;
    const images = slider.querySelectorAll("img");
    let index = [...images].findIndex(img => img.classList.contains("active"));
    images[index].classList.remove("active");
    images[(index - 1 + images.length) % images.length].classList.add("active");
}
