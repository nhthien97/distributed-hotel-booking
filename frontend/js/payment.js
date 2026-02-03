const bookingId = localStorage.getItem("lastBookingId");

if (!bookingId) {
  alert("Không tìm thấy booking!");
  location.href = "booking.html";
}

document.getElementById("bookingId").innerText = bookingId;

function pay() {
  fetch("https://ominous-trout-v67rqxvv9j4v2w7rr-8088.app.github.dev/api/payments", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      bookingId: Number(bookingId)
    })
  })
  .then(async res => {
    if (!res.ok) {
      const msg = await res.text();
      throw new Error(msg || "❌ Không thể thanh toán");
    }
    return res.json(); // ✅ CHỈ parse JSON 1 LẦN
  })
  .then(data => {
    // ✅ HIỂN THỊ SỐ TIỀN ĐÚNG TỪ BACKEND
    document.getElementById("amount").innerText =
      data.amount.toLocaleString("vi-VN") + " VND";

    document.getElementById("successBox").classList.add("show");
    localStorage.removeItem("lastBookingId");

    setTimeout(() => {
      location.href = "history.html";
    }, 3000);
  })
  .catch(err => {
    alert(err.message);
    handle.style.left = "4px";
    fill.style.width = "0";
    text.style.opacity = "1";
    handle.style.pointerEvents = "auto";
  });
}

const slider = document.getElementById("slidePay");
const handle = document.getElementById("slideHandle");
const fill = document.getElementById("slideFill");
const text = slider.querySelector(".slide-text");

let isDragging = false;
let startX = 0;

handle.addEventListener("mousedown", startDrag);
document.addEventListener("mousemove", drag);
document.addEventListener("mouseup", endDrag);

handle.addEventListener("touchstart", startDrag);
document.addEventListener("touchmove", drag);
document.addEventListener("touchend", endDrag);

function startDrag(e) {
  isDragging = true;
  startX = e.touches ? e.touches[0].clientX : e.clientX;
}

function drag(e) {
  if (!isDragging) return;

  const x = e.touches ? e.touches[0].clientX : e.clientX;
  const delta = x - startX;
  const max = slider.offsetWidth - handle.offsetWidth - 8;

  let left = Math.min(Math.max(4, delta), max);

  handle.style.left = left + "px";

  const fillWidth = left + handle.offsetWidth / 2;
  fill.style.width = fillWidth + "px";

  // 🌊 wave phản ứng theo tốc độ kéo
  const waves = fill.querySelectorAll(".wave");
const speed = Math.min(Math.abs(delta) / 10, 8);

waves.forEach(wave => {
  wave.style.setProperty("--scale", 1 + speed / 12);
});

/* 💧 tạo giọt nước khi kéo nhanh */
if (speed > 5) {
  const drops = fill.querySelectorAll(".drop");
  const drop = drops[Math.floor(Math.random() * drops.length)];
  drop.classList.remove("active");
  void drop.offsetWidth; // reset animation
  drop.classList.add("active");
}

  if (left > max * 0.5) {
    text.style.opacity = "0";
  }
}


function endDrag() {
  if (!isDragging) return;
  isDragging = false;

  const max = slider.offsetWidth - handle.offsetWidth - 8;
  const current = parseInt(handle.style.left) || 0;

  if (current >= max * 0.9) {
    handle.style.left = max + "px";
    fill.style.width = "100%";
    confirmPayment();
  } else {
    handle.style.left = "4px";
    fill.style.width = "0";
    text.style.opacity = "1";
  }
}

function splashBurstEffect() {
  const drops = fill.querySelectorAll(".drop");

  drops.forEach(drop => {
    const angle = Math.random() * Math.PI * 2;
    const distance = 20 + Math.random() * 30;

    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance;

    drop.style.setProperty("--x", x + "px");
    drop.style.setProperty("--y", y + "px");

    drop.classList.remove("burst");
    void drop.offsetWidth; // reset animation
    drop.classList.add("burst");
  });
}

function confirmPayment() {
  // khóa kéo
  handle.style.pointerEvents = "none";

  // fill full
  fill.style.transition = "width 0.3s ease";
  fill.style.width = "100%";

  // 💥 giọt nước bắn tung
  splashBurstEffect();

  // ❌ BỎ TRẠNG THÁI CHỜ
  text.style.opacity = "0";

  // ✅ THANH TOÁN NGAY
  pay();
}
