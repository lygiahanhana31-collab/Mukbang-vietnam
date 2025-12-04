// 1. MOBILE MENU TOGGLE
var header = document.getElementById('header');
var mobileMenu = document.getElementById('mobile-menu');
var headerHeight = header.clientHeight;

mobileMenu.onclick = function() {
    var isClosed = header.clientHeight === headerHeight;
    if (isClosed) {
        header.style.height = 'auto'; // Mở menu
    } else {
        header.style.height = null; // Đóng menu
    }
}

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
    }
}

// 2. MODAL LOGIC
const buyBtns = document.querySelectorAll('.js-view-detail')
const modal = document.querySelector('.js-modal')
const modalContainer = document.querySelector('.js-modal-container')
const modalClose = document.querySelector('.js-modal-close')

function showBuyTickets() {
    modal.classList.add('open')
}

function hideBuyTickets() {
    modal.classList.remove('open')
}

for (const buyBtn of buyBtns) {
    buyBtn.addEventListener('click', showBuyTickets)
}

modalClose.addEventListener('click', hideBuyTickets)
modal.addEventListener('click', hideBuyTickets)
modalContainer.addEventListener('click', function (event) {
    event.stopPropagation()
})
