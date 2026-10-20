const projects = {
  solstice: {
    title: "Solstice Coffee",
    tags: "брендинг · упаковка",
    image: "assets/work-solstice.svg",
    text: "Айдентика обжарочной: знак солнца-кружки, тёплая палитра и линейка пакетов для трёх сортов. Система держится на крупной типографике и одном акценте.",
  },
  northline: {
    title: "Northline Festival",
    tags: "постер · айдентика",
    image: "assets/work-northline.svg",
    text: "Серия постеров для ночного фестиваля электронной музыки. Жёсткая сетка, неоновый контур и модульный логотип, который собирается из линий маршрута.",
  },
  atelier: {
    title: "Atelier 19",
    tags: "брендинг · типографика",
    image: "assets/work-atelier.svg",
    text: "Фирменный стиль архитектурной мастерской. Монограмма из цифры 19, спокойный кремовый фон и шрифтовая иерархия для чертежей и презентаций.",
  },
  orbit: {
    title: "Orbit Skincare",
    tags: "упаковка · айдентика",
    image: "assets/work-orbit.svg",
    text: "Линейка ухода: минимальные тубы и этикетки с орбитальными кольцами. Цвет кодирует продукт, форма знака остаётся общей для всей линейки.",
  },
  signal: {
    title: "Signal Press",
    tags: "постер · editorial",
    image: "assets/work-signal.svg",
    text: "Обложка и серия плакатов для независимого издательства. Красный сигнал на чёрном поле, рубленые заголовки, воздух вокруг текста.",
  },
  kora: {
    title: "Kora Studio",
    tags: "брендинг · digital",
    image: "assets/work-kora.svg",
    text: "Бренд продакт-студии: кора как слой интерфейса. Знак, гайдлайн и набор обложек для кейсов на сайте.",
  },
};

const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
const lightbox = document.querySelector("#lightbox");
const lightboxImage = document.querySelector("#lightbox-image");
const lightboxTitle = document.querySelector("#lightbox-title");
const lightboxTags = document.querySelector("#lightbox-tags");
const lightboxText = document.querySelector("#lightbox-text");
const form = document.querySelector("#contact-form");
const statusEl = document.querySelector("#form-status");

document.querySelector("#year").textContent = String(new Date().getFullYear());

navToggle.addEventListener("click", () => {
  const open = siteNav.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(open));
  navToggle.setAttribute("aria-label", open ? "Закрыть меню" : "Открыть меню");
});

siteNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    siteNav.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Открыть меню");
  });
});

document.querySelectorAll(".work-card").forEach((card) => {
  card.querySelector(".work-trigger").addEventListener("click", () => {
    const project = projects[card.dataset.project];
    if (!project) return;
    lightboxImage.src = project.image;
    lightboxImage.alt = project.title;
    lightboxTitle.textContent = project.title;
    lightboxTags.textContent = project.tags;
    lightboxText.textContent = project.text;
    lightbox.showModal();
  });
});

document.querySelector(".lightbox-close").addEventListener("click", () => {
  lightbox.close();
});

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) lightbox.close();
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  statusEl.textContent = "";

  const fields = [...form.querySelectorAll("input, textarea")];
  let valid = true;

  fields.forEach((field) => {
    field.classList.remove("error");
    if (!field.value.trim()) {
      valid = false;
      field.classList.add("error");
    }
    if (field.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)) {
      valid = false;
      field.classList.add("error");
    }
  });

  if (!valid) {
    statusEl.textContent = "Проверьте имя, email и сообщение.";
    return;
  }

  form.reset();
  statusEl.textContent = "Сообщение принято. Отправка на сервер настроена позже.";
});
