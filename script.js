// 1. MOBILE MENU TOGGLE
var header = document.getElementById('header');
var mobileMenu = document.getElementById('mobile-menu');
var headerHeight = header.clientHeight;

mobileMenu.onclick = function() {
    var isClosed = header.clientHeight === headerHeight;
    if (isClosed) {
        header.style.height = 'auto'; // Mở menu
    } else {
        header.style.height = null;   // Đóng menu
    }
};

// Tự động đóng menu khi chọn phần tử
var menuItems = document.querySelectorAll('#nav li a[href*="#"]');
for (var i = 0; i < menuItems.length; i++) {
    var menuItem = menuItems[i];

    menuItem.onclick = function(event) {
        var isParentMenu = this.nextElementSibling && this.nextElementSibling.classList.contains('subnav');
        if (isParentMenu) {
            event.preventDefault(); // Nếu là menu cha thì không đóng
        } else {
            header.style.height = null; // Đóng menu
        }
    };
}

// 2. MODAL LOGIC
const buyBtns = document.querySelectorAll('.js-view-detail');
const modal = document.querySelector('.js-modal');
const modalContainer = document.querySelector('.js-modal-container');
const modalClose = document.querySelector('.js-modal-close');
const modalBody = document.querySelector('.modal-body');

// Nội dung chi tiết cho từng món
const dishContent = {
    pho: `
        <h3>Phở Hà Nội</h3>
        <p>Phở là món ăn đại diện cho ẩm thực Việt Nam, nổi tiếng với nước dùng trong, ngọt tự nhiên từ xương và hương thơm của quế, hồi, gừng nướng.</p>
        <p><b>Đặc trưng:</b> Nước dùng thanh, không quá béo; bánh phở mềm mỏng; thịt bò tái/chín hoặc nạm, gầu; ít dùng gia vị mạnh để giữ sự tinh tế.</p>
        <p><b>Cách ăn gợi ý:</b> Thêm một ít chanh, ớt tươi và tiêu xay để cảm nhận đúng phong cách phở Hà Nội.</p>
    `,
    buncha: `
        <h3>Bún Chả</h3>
        <p>Bún chả là đặc sản Hà Nội với thịt nướng than hoa thơm lừng, ăn cùng bún tươi và nước chấm chua ngọt.</p>
        <p><b>Đặc trưng:</b> Thịt ba chỉ thái mỏng nướng giòn cạnh, chả viên mềm; nước mắm pha loãng có đu đủ xanh; rau sống tươi ăn kèm.</p>
        <p><b>Cách ăn gợi ý:</b> Gắp bún, thịt, rau cho vào bát rồi chan nước chấm, trộn đều và ăn từng miếng.</p>
    `,
    bundau: `
        <h3>Bún Đậu Mắm Tôm</h3>
        <p>Món ăn dân dã nhưng cực kỳ “gây nghiện” nhờ mắm tôm đậm mùi, đậu rán vàng giòn và chả cốm thơm.</p>
        <p><b>Đặc trưng:</b> Đậu khuôn chiên nóng giòn, chả cốm dẻo; có thể kèm dồi, thịt luộc; mắm tôm đánh với tắc, đường và dầu nóng.</p>
        <p><b>Cách ăn gợi ý:</b> Cuốn rau, bún, topping rồi chấm mắm tôm, ăn từng cuốn để cảm nhận đầy đủ vị mặn – béo – thơm.</p>
    `,
    bunbo: `
        <h3>Bún Bò Huế</h3>
        <p>Bún bò Huế là món ăn biểu tượng của cố đô, nổi tiếng với vị cay, đậm, thơm mùi sả và mắm ruốc.</p>
        <p><b>Đặc trưng:</b> Sợi bún to; nước dùng đỏ cam từ ớt và hạt điều; topping gồm chân giò, thịt bò, chả, huyết; vị đậm đà, hơi cay.</p>
        <p><b>Cách ăn gợi ý:</b> Thêm rau sống, chanh và ớt tươi để tăng độ “bốc” đúng chất Huế.</p>
    `,
    miquang: `
        <h3>Mì Quảng</h3>
        <p>Mì Quảng là đặc sản của Quảng Nam – Đà Nẵng, nổi bật bởi ít nước nhưng hương vị cực kỳ đậm đà.</p>
        <p><b>Đặc trưng:</b> Sợi mì vàng to bản; nước dùng ít nhưng thơm từ xương, tôm, nghệ; ăn kèm bánh đa và nhiều loại rau sống.</p>
        <p><b>Cách ăn gợi ý:</b> Trộn mì với nước sốt, rau và bánh đa, không chan ngập như phở hay bún.</p>
    `,
    banhbeo: `
        <h3>Bánh Bèo</h3>
        <p>Bánh bèo là món bánh nhỏ xinh của Huế, mềm mịn, ăn kèm tôm cháy và mỡ hành.</p>
        <p><b>Đặc trưng:</b> Bánh làm từ bột gạo hấp; phía trên rắc tôm cháy, da heo chiên giòn, mỡ hành; dùng nước mắm ngọt nhẹ, hơi cay.</p>
        <p><b>Cách ăn gợi ý:</b> Rưới nước mắm nóng lên mặt bánh, dùng muỗng xúc từng chén để cảm nhận độ mềm và hương tôm cháy.</p>
    `,
    comtam: `
        <h3>Cơm Tấm Sài Gòn</h3>
        <p>Cơm tấm là bữa sáng kinh điển của người Sài Gòn với hạt tấm tơi, sườn nướng mật ong và bì, chả ăn kèm.</p>
        <p><b>Đặc trưng:</b> Cơm tấm dẻo nhưng rời hạt; sườn nướng thơm mùi than; bì, chả trứng; nước mắm pha kiểu Nam Bộ hơi sệt, ngọt nhẹ.</p>
        <p><b>Cách ăn gợi ý:</b> Chan nước mắm đều lên cơm, ăn kèm mỡ hành, đồ chua và trứng ốp la để tăng độ béo.</p>
    `,
    hutieu: `
        <h3>Hủ Tiếu Nam Vang</h3>
        <p>Hủ tiếu Nam Vang có nguồn gốc từ Campuchia, được biến tấu thành món nước nổi tiếng ở miền Nam.</p>
        <p><b>Đặc trưng:</b> Nước dùng trong, ngọt xương; topping gồm tôm, thịt bằm, gan, trứng cút; có thể ăn nước hoặc khô.</p>
        <p><b>Cách ăn gợi ý:</b> Thêm tỏi phi, tóp mỡ, chanh và ớt để tăng hương thơm và độ “cuốn”.</p>
    `,
    banhxeo: `
        <h3>Bánh Xèo Miền Tây</h3>
        <p>Bánh xèo miền Tây nổi tiếng với chiếc bánh to, vỏ vàng giòn rụm và nhân tôm thịt giá đỗ.</p>
        <p><b>Đặc trưng:</b> Vỏ bánh mỏng, giòn; nhân đầy đặn; cuốn với nhiều loại rau rừng; chấm nước mắm chua ngọt.</p>
        <p><b>Cách ăn gợi ý:</b> Bẻ miếng bánh, cuốn cùng rau và dưa chua rồi chấm nước mắm để cảm nhận đủ vị giòn – béo – chua – mặn.</p>
    `
};

// Hàm mở modal và set nội dung theo món
function showDishDetail(dishKey) {
    const content = dishContent[dishKey];

    if (content) {
        modalBody.innerHTML = content +
            `<p style="margin-top: 16px; font-style: italic;">
                "Không có tình yêu nào chân thật hơn tình yêu đối với thức ăn."
              </p>`;
    } else {
        modalBody.innerHTML = `
            <p>Thông tin món ăn đang được cập nhật.</p>
            <p style="margin-top: 15px; font-style: italic;">
                "Không có tình yêu nào chân thật hơn tình yêu đối với thức ăn."
            </p>
        `;
    }

    modal.classList.add('open');
}

// Đóng / mở modal
function hideBuyTickets() {
    modal.classList.remove('open');
}

// Gán sự kiện cho các nút "Xem chi tiết"
for (const buyBtn of buyBtns) {
    buyBtn.addEventListener('click', function () {
        const dishKey = this.dataset.dish; // lấy giá trị data-dish
        showDishDetail(dishKey);
    });
}

modalClose.addEventListener('click', hideBuyTickets);
modal.addEventListener('click', hideBuyTickets);
modalContainer.addEventListener('click', function (event) {
    event.stopPropagation();
});
