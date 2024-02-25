const dataSections = [
  "Our Servies",
  "Our Industries",
  "Our Global",
  "Our Contact",
];

const ul = document.querySelector(".list-items");
const bars = document.querySelector(".bars");
const navbar = document.querySelector(".nav-bar");
const scrollToTopBtn = document.getElementById("scrollToTopBtn");
const rootElement = document.documentElement;
const viewportHeight = window.innerHeight;

const scrollToTop = () => {
  rootElement.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};
// handle scroll bottom to top
scrollToTopBtn.addEventListener("click", scrollToTop);

const handleActiveCurrentNavBar = (sections) => {
  sections.forEach((section) => {
    section.addEventListener("click", (e) => {
      sections.forEach((link) => {
        link.classList.remove("active");
      });
      e.preventDefault();
      section.classList.add("active");
    });
  });
};

const handleNavItemClick = (event) => {
  event.preventDefault();
  const targetId = event.target.getAttribute("href").substring(1);
  const targetSection = document.getElementById(targetId);
  targetSection.scrollIntoView({ behavior: "smooth" });
};

const handleNavItemClickScroolIntoView = (sections) => {
  sections.forEach((link) => {
    link.addEventListener("click", handleNavItemClick);
  });
};
// active section navbar when scroll to section
window.onscroll = () => {
  const sections = document.querySelectorAll("article[id^='our-']");
  const navLinks = document.querySelectorAll(".nav-link");

  sections.forEach((sec) => {
    let top = window.scrollY;
    let offset = sec.offsetTop - 150;
    let height = sec.offsetHeight;
    let id = sec.getAttribute("id");
    const viewportTop = top;
    const viewportBottom = top + window.innerHeight;
    const sectionTop = offset;
    const sectionBottom = offset + height;

    if (
      (sectionTop >= viewportTop && sectionBottom <= viewportBottom) ||
      (sectionBottom >= viewportTop && sectionBottom <= viewportBottom)
    ) {
      navLinks.forEach((link) => {
        link.classList.remove("active");
      });
      const navLinkActive = document.querySelector(
        ".nav-link[href*='" + id + "']"
      );

      navLinkActive.classList.add("active");
    }
  });
};

const handleVisibleMenu = () => {
  ul.classList.toggle("visible");
};

bars.addEventListener("click", handleVisibleMenu);

const handleCloseMenu = () => {
  ul.classList.remove("visible");
};

// create nav-item append child to ul and handle active, scroll into view
window.addEventListener("DOMContentLoaded", () => {
  dataSections.forEach((section) => {
    const liItem = document.createElement("li");
    liItem.setAttribute("class", "nav-item");
    liItem.innerHTML = `<a href='#${section
      .split(" ")
      .join("-")
      .toLocaleLowerCase()}' class='nav-link'>${section}</a>`;
    ul.appendChild(liItem);
    const sections = document.querySelectorAll(".nav-link");
    handleActiveCurrentNavBar(sections);
    handleNavItemClickScroolIntoView(sections);
    const navLink = document.querySelectorAll(".nav-link");
    navLink.forEach((item) => item.addEventListener("click", handleCloseMenu));
  });
});
