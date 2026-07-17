/* -- ELEMENTOS DE NAVEGACIÓN -- */

const navigationLinks = Array.from(
    document.querySelectorAll(".sidebar__link")
);

const navigationSections = navigationLinks
    .map((link) => {
        const sectionId = link.getAttribute("href");

        if (!sectionId?.startsWith("#")) {
            return null;
        }

        return document.querySelector(sectionId);
    })
    .filter(Boolean);


/* -- ESTADO ACTIVO -- */

function setActiveLink(sectionId) {
    navigationLinks.forEach((link) => {
        const isActive = link.getAttribute("href") === `#${sectionId}`;

        link.classList.toggle("sidebar__link--active", isActive);

        if (isActive) {
            link.setAttribute("aria-current", "page");
        } else {
            link.removeAttribute("aria-current");
        }
    });
}


/* -- DETECCIÓN DE SECCIONES -- */

const visibleSections = new Map();

const sectionObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                visibleSections.set(entry.target.id, entry.intersectionRatio);
            } else {
                visibleSections.delete(entry.target.id);
            }
        });

        if (visibleSections.size === 0) {
            return;
        }

        const activeSectionId = Array.from(visibleSections.entries())
            .sort((firstSection, secondSection) => {
                return secondSection[1] - firstSection[1];
            })[0][0];

        setActiveLink(activeSectionId);
    },
    {
        root: null,
        rootMargin: "-20% 0px -55% 0px",
        threshold: [0, 0.1, 0.25, 0.5, 0.75]
    }
);


/* -- OBSERVACIÓN -- */

navigationSections.forEach((section) => {
    sectionObserver.observe(section);
});


/* -- NAVEGACIÓN POR CLIC -- */

navigationLinks.forEach((link) => {
    link.addEventListener("click", () => {
        const sectionId = link
            .getAttribute("href")
            ?.replace("#", "");

        if (sectionId) {
            setActiveLink(sectionId);
        }
    });
});