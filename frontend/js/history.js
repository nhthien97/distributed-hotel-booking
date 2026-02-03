/* ===== TAB ===== */
function switchTab(i){
  document.querySelector(".tab-indicator").style.transform = `translateX(${i*100}%)`;
  document.getElementById("tabContent").style.transform = `translateX(-${i*50}%)`;
  document.querySelectorAll(".tab-btn").forEach(b=>b.classList.remove("active"));
  document.querySelectorAll(".tab-btn")[i].classList.add("active");
}

/* ===== AUTH ===== */
const email = localStorage.getItem("email");
document.getElementById("authArea").innerHTML = `
  <span style="color:white">👋 ${email}</span>
  <a href="#" class="login" onclick="logout()">Đăng xuất</a>
`;

function logout(){
  localStorage.clear();
  location.href="index.html";
}

/* ===== LOAD BOOKINGS ===== */
const token = localStorage.getItem("token");

fetch(`https://ominous-trout-v67rqxvv9j4v2w7rr-8088.app.github.dev/api/bookings/user?email=${email}`)

.then(r=>r.json())
.then(data=>{
  const active = data.filter(b=>b.status!=="CANCELLED");
  const cancelled = data.filter(b=>b.status==="CANCELLED");

  document.getElementById("activeList").innerHTML =
    active.length===0 ? "<p>Không có booking</p>" :
    active.map(b=>`
      <div class="card">
        <div>
          <h3>Phòng ${b.roomId}</h3>
          <p>${b.checkIn} → ${b.checkOut}</p>
          <span class="status active">Đang hoạt động</span>
        </div>
        <div>
          ${
  b.status === "PENDING_PAYMENT"
    ? `<button class="btn btn-pay" onclick="pay(${b.id})">Thanh toán</button>
       <button class="btn btn-cancel" onclick="cancel(${b.id})">Huỷ</button>`
  : b.status === "CONFIRMED"
    ? `<span>✅ Đã thanh toán</span>`
  : b.status === "CANCELLED"
    ? `<span style="color:#d32f2f">❌ Đã huỷ</span>`
  : ""
}

        </div>
      </div>
    `).join("");

  document.getElementById("cancelList").innerHTML =
    cancelled.length===0 ? "<p>Chưa có</p>" :
    cancelled.map(b=>`
      <div class="card">
        <div>
          <h3>Phòng ${b.roomId}</h3>
          <p>${b.checkIn} → ${b.checkOut}</p>
          <span class="status cancelled">Đã huỷ</span>
        </div>
      </div>
    `).join("");
});

function pay(id){
  localStorage.setItem("lastBookingId",id);
  location.href="payment.html";
}

function cancel(id){
  if(!confirm("Huỷ booking?")) return;
fetch(
  `https://ominous-trout-v67rqxvv9j4v2w7rr-8088.app.github.dev/api/bookings/${id}/cancel`,
  { method:"PUT" }
)
    .then(()=>location.reload());
}
