// ===== Slideshow tự động – giống khung mẫu =====
let slideIndex = 0;
autoCarousel();

function autoCarousel() {
  const slides = document.getElementsByClassName("mySlides");
  if (!slides.length) return;

  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1;
  }

  slides[slideIndex - 1].style.display = "block";
  setTimeout(autoCarousel, 4000); // đổi ảnh mỗi 4 giây
}

// ===== Toggle menu mobile – giữ logic như myFunction() =====
function toggleNav() {
  const x = document.getElementById("navDemo");
  if (!x) return;
  if (x.className.indexOf("w3-show") === -1) {
    x.className += " w3-show";
  } else {
    x.className = x.className.replace(" w3-show", "");
  }
}

// ===== Modal combo mukbang (re-skin từ ticketModal) =====
function openTicketModal(regionName) {
  const modal = document.getElementById("ticketModal");
  const title = document.getElementById("modalTitle");
  const body = document.getElementById("modalBody");
  if (!modal || !title || !body) return;

  title.textContent = "Combo mukbang miền " + regionName;

  let content = "";

  if (regionName === "Bắc") {
    content = `
      <p><strong>Combo Bắc – Mâm cỗ Tết:</strong></p>
      <ul>
        <li>Bánh chưng, giò chả, nem rán, dưa hành.</li>
        <li>Gợi ý quay: góc top-view toàn mâm, thêm cận cảnh cắt bánh chưng, chấm nem.</li>
        <li>Không khí: ấm cúng, sum vầy, kể chuyện Tết gia đình.</li>
      </ul>
    `;
  } else if (regionName === "Trung") {
    content = `
      <p><strong>Combo Trung – Cay nồng Huế:</strong></p>
      <ul>
        <li>Bún bò Huế full topping, bánh bột lọc, nem lụi, rau sống.</li>
        <li>Gợi ý quay: zoom vào tô bún, cảnh chan nước dùng đỏ cam, close-up biểu cảm cay.</li>
        <li>Không khí: năng lượng, thử thách “ăn cay level max”.</li>
      </ul>
    `;
  } else if (regionName === "Nam") {
    content = `
      <p><strong>Combo Nam – Miền Tây no nê:</strong></p>
      <ul>
        <li>Lẩu mắm, cá linh, tôm, mực, rau đồng, kèm gỏi cuốn và chè.</li>
        <li>Gợi ý quay: bàn dài đầy món, bạn bè quây quần, nhiều cảnh gắp topping.</li>
        <li>Không khí: vui nhộn, thoải mái, “ăn cho đã cái nư”.</li>
      </ul>
    `;
  } else {
    content = "<p>Không tìm thấy combo. Hãy chọn một vùng miền cụ thể.</p>";
  }

  body.innerHTML = content;
  modal.style.display = "block";
}

function closeTicketModal() {
  const modal = document.getElementById("ticketModal");
  if (modal) {
    modal.style.display = "none";
  }
}

// Đóng modal khi click ra ngoài
window.onclick = function (event) {
  const modal = document.getElementById("ticketModal");
  if (event.target === modal) {
    modal.style.display = "none";
  }
};
