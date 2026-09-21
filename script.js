// База данных нашего меню (массив объектов)
const menuItems = [
    {
        id: 1,
        title: "Espresso",
        category: "hot",
        price: 3.00,
        img: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=400",
        desc: "Strong and bold classic coffee."
    },
    {
        id: 2,
        title: "Cappuccino",
        category: "hot",
        price: 4.50,
        img: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400",
        desc: "Espresso with hot steamed milk foam."
    },
    {
        id: 3,
        title: "Iced Latte",
        category: "cold",
        price: 5.00,
        img: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=400",
        desc: "Smooth espresso with cold milk and ice."
    },
    {
        id: 4,
        title: "Cold Brew",
        category: "cold",
        price: 4.00,
        img: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400",
        desc: "Slow-steeped cold coffee for 12 hours."
    },
    {
        id: 5,
        title: "Croissant",
        category: "pastry",
        price: 3.50,
        img: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400",
        desc: "Freshly baked buttery French croissant."
    },
    {
        id: 6,
        title: "Blueberry Muffin",
        category: "pastry",
        price: 4.00,
        img: "https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=400",
        desc: "Sweet muffin with fresh blueberries."
    }
];

// Пока просто проверим, что файл подключен
console.log("Меню загружено!", menuItems);
// 1. Находим элементы на странице
const menuContainer = document.getElementById('menu-container');
const filterBtns = document.querySelectorAll('.filter-btn');

// 2. Функция, которая создает HTML для каждой карточки
function displayMenuItems(menuItems) {
    // Превращаем массив объектов в одну длинную строку HTML
    let displayMenu = menuItems.map(function (item) {
        return `<article class="card">
                    <img src="${item.img}" alt="${item.title}" class="photo">
                    <div class="item-info">
                        <header>
                            <h4>${item.title}</h4>
                            <h4 class="price">$${item.price}</h4>
                        </header>
                        <p class="item-text">${item.desc}</p>
                        <button class="add-to-cart-btn" onclick="addToCart()">Add to Cart</button>
                    </div>
                </article>`;
    });

    // Объединяем массив строк в одну строку и вставляем в HTML
    displayMenu = displayMenu.join('');
    menuContainer.innerHTML = displayMenu;
}

// 3. Запускаем функцию при загрузке страницы (показываем всё меню)
window.addEventListener('DOMContentLoaded', function () {
    displayMenuItems(menuItems);
});

// 4. Логика фильтрации при клике на кнопки
filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function (e) {
        // Убираем класс 'active' у всех кнопок и добавляем нажатой
        filterBtns.forEach(b => b.classList.remove('active'));
        e.currentTarget.classList.add('active');

        // Получаем категорию из атрибута data-filter
        const category = e.currentTarget.dataset.filter;

        // Фильтруем массив
        const menuCategory = menuItems.filter(function (menuItem) {
            if (menuItem.category === category) {
                return menuItem;
            }
        });

        // Если нажали "All", показываем всё меню, иначе - отфильтрованное
        if (category === 'all') {
            displayMenuItems(menuItems);
        } else {
            displayMenuItems(menuCategory);
        }
    });
});

// 5. Простая логика корзины (счетчик)
let cartCount = 0;
const cartCountElement = document.getElementById('cart-count');

function addToCart() {
    cartCount++;
    cartCountElement.innerText = cartCount;

    // Маленькая анимация корзины при добавлении
    const cartIcon = document.querySelector('.cart-icon');
    cartIcon.style.transform = "scale(1.2)";
    setTimeout(() => {
        cartIcon.style.transform = "scale(1)";
    }, 200);
}