"use strict";

// El catálogo sigue siendo visible si JavaScript no está disponible.
const filterButtons = Array.from(document.querySelectorAll("[data-filter]"));
const projectRows = Array.from(document.querySelectorAll(".project-row"));
const filterStatus = document.querySelector("#filter-status");

filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const filter = button.dataset.filter;
        filterButtons.forEach((item) => {
            const active = item === button;
            item.classList.toggle("is-active", active);
            item.setAttribute("aria-pressed", String(active));
        });
        let visibleCount = 0;
        projectRows.forEach((row) => {
            const visible = filter === "all" || row.dataset.category === filter;
            row.hidden = !visible;
            if (visible) {
                visibleCount += 1;
            }
        });
        const label = visibleCount === 1 ? "proyecto seleccionado" : "proyectos seleccionados";
        filterStatus.textContent = `${visibleCount} ${label}`;
    });
});

const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#site-navigation");
const navigationLinks = Array.from(navigation.querySelectorAll(".nav-link"));
const studySectionHashes = new Set([
    "#certificados",
    "#tecnologias",
    "#formacion-academica"
]);

function closeMenu() {
    navigation.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
}

menuToggle.addEventListener("click", () => {
    const open = menuToggle.getAttribute("aria-expanded") !== "true";
    menuToggle.setAttribute("aria-expanded", String(open));
    navigation.classList.toggle("is-open", open);
});

function updateActiveLink() {
    const currentHash = window.location.hash || "#about";
    const hash = studySectionHashes.has(currentHash) ? "#estudios" : currentHash;

    navigationLinks.forEach((link) => {
        const active = link.getAttribute("href") === hash;
        link.classList.toggle("is-active", active);
        if (active) {
            link.setAttribute("aria-current", "location");
        } else {
            link.removeAttribute("aria-current");
        }
    });
}

navigationLinks.forEach((link) => link.addEventListener("click", closeMenu));
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
        closeMenu();
        menuToggle.focus();
    }
});
window.addEventListener("hashchange", updateActiveLink);
window.matchMedia("(min-width: 1051px)").addEventListener("change", closeMenu);

updateActiveLink();
