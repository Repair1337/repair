// ============================================================
// МАССИВ ДАННЫХ
// Каждый объект — это один сервис со всеми нужными полями.
// Чтобы добавить новый сервис, достаточно добавить объект сюда —
// карточка появится на странице автоматически.
// ============================================================
const services = [
    {
        name:         'AutoPro Riga',
        address:      'ул. Бривибас 145',
        rating:       4.7,
        reviewsText:  '142 отзыва',      // склонение указано вручную
        tags:         ['Кузовной ремонт', 'Покраска', 'Toyota', 'Honda', 'Mazda'],
        starsDisplay: '★★★★★',           // строка со звёздочками как на странице
        detailsUrl:   'autopro.html'
    },
    {
        name:         'Mehanika 24',
        address:      'ул. Маскавас 312',
        rating:       4.5,
        reviewsText:  '98 отзывов',
        tags:         ['Двигатель', 'Дизель', 'Бензин', 'Volkswagen', 'Audi', 'Skoda'],
        starsDisplay: '★★★★½',
        detailsUrl:   'mehanika.html'
    },
    {
        name:         'GarageMaster',
        address:      'ул. Краста 87',
        rating:       4.9,
        reviewsText:  '217 отзывов',
        tags:         ['Тормоза', 'Подвеска', 'BMW', 'Mercedes', 'Opel'],
        starsDisplay: '★★★★★',
        detailsUrl:   'garagemaster.html'
    },
    {
        name:         'TopAuto Service',
        address:      'ул. Земитана 22',
        rating:       4.3,
        reviewsText:  '61 отзыв',
        tags:         ['Электрика', 'Диагностика', 'ТО', 'Ford', 'Renault', 'Hyundai'],
        starsDisplay: '★★★★☆',
        detailsUrl:   'topauto.html'
    }
];

// ============================================================
// ПОЛУЧАЕМ КОНТЕЙНЕР
// document.getElementById ищет элемент с нужным id в HTML.
// Мы сохраняем его в переменную, чтобы потом добавлять карточки.
// ============================================================
const container = document.getElementById('services-list');

// ============================================================
// ФУНКЦИЯ ОТРИСОВКИ КАРТОЧЕК
// Принимает параметр serviceList — массив сервисов для отображения.
// Это может быть весь массив services или его отфильтрованная часть.
// Вызывается при загрузке страницы и при каждом нажатии кнопки фильтра.
// ============================================================
function renderServices(serviceList) {

    // Очищаем контейнер перед новой отрисовкой.
    // Без этой строки каждый вызов функции добавлял бы карточки поверх старых.
    container.innerHTML = '';

    // Проходим по каждому сервису из переданного массива
    serviceList.forEach(function(service) {

        // --- Шаг 1: создаём теги для всех тегов специализации ---
        // map превращает массив строк ['Toyota', 'Honda'] в массив
        // готовых HTML-строк ['<span class="tag">Toyota</span>', ...]
        // join('') склеивает их в одну строку без разделителей.
        const tagsHTML = service.tags
            .map(function(tag) {
                return '<span class="tag">' + tag + '</span>';
            })
            .join('');

        // --- Шаг 2: создаём div для карточки ---
        // createElement создаёт новый элемент, но пока не добавляет его на страницу.
        const card = document.createElement('div');

        // --- Шаг 3: присваиваем класс ---
        // Это тот же класс, что был в HTML: <div class="card">
        // Благодаря ему карточка получит все нужные стили из CSS.
        card.className = 'card';

        // --- Шаг 4: записываем внутреннее содержимое карточки ---
        // innerHTML — это весь HTML внутри div.card.
        // Структура точно такая же, как была в оригинальном HTML:
        //   .card
        //   ├── .card-info
        //   │   ├── .card-name
        //   │   ├── .card-address
        //   │   ├── .card-rating
        //   │   │   ├── .stars
        //   │   │   ├── .rating-number
        //   │   │   └── .reviews
        //   │   └── .tags  (внутри — span.tag для каждого тега)
        //   └── .card-buttons
        //       ├── a.btn.btn-gray  → ссылка "Подробнее"
        //       └── a.btn.btn-red   → ссылка "Записаться"
        card.innerHTML =
            '<div class="card-info">' +
                '<div class="card-name">'    + service.name    + '</div>' +
                '<div class="card-address">' + service.address + '</div>' +
                '<div class="card-rating">' +
                    '<span class="stars">'         + service.starsDisplay + '</span>' +
                    '<span class="rating-number">' + service.rating       + '</span>' +
                    '<span class="reviews">'       + service.reviewsText  + '</span>' +
                '</div>' +
                '<div class="tags">' + tagsHTML + '</div>' +
            '</div>' +
            '<div class="card-buttons">' +
                '<a class="btn btn-gray" href="' + service.detailsUrl + '">Подробнее</a>' +
                '<a class="btn btn-red"  href="zapis.html">Записаться</a>' +
            '</div>';

        // --- Шаг 5: вставляем карточку в контейнер ---
        // appendChild добавляет готовый div в конец контейнера #services-list.
        container.appendChild(card);
    });
}

// ============================================================
// ПЕРВЫЙ ВЫЗОВ: отрисовываем все сервисы при загрузке страницы
// ============================================================
renderServices(services);

// ============================================================
// ОБРАБОТЧИКИ КНОПОК ФИЛЬТРАЦИИ
// addEventListener('click', ...) — говорит браузеру: "когда кнопка
// будет нажата, выполни эту функцию".
// ============================================================

// Получаем кнопки из HTML по их id
const btnFilterHigh = document.getElementById('filter-high');
const btnFilterAll  = document.getElementById('filter-all');

// Кнопка "Только с рейтингом выше 4.5"
// filter создаёт новый массив, оставляя только те объекты,
// для которых условие (service.rating > 4.5) возвращает true.
// Из четырёх сервисов пройдут: AutoPro Riga (4.7) и GarageMaster (4.9).
// Mehanika 24 (4.5) не пройдёт, так как 4.5 не больше 4.5 (строгое >).
btnFilterHigh.addEventListener('click', function() {
    const filtered = services.filter(function(service) {
        return service.rating >= 4.5;
    });
    renderServices(filtered);
});

// Кнопка "Показать все" — передаём полный массив services без фильтрации
btnFilterAll.addEventListener('click', function() {
    renderServices(services);
});
