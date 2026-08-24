
const projectData = {
    past: {
        tag: "PAST · FOUNDATIONS",
        title: "Looking Back, Moving Forward",
        image: "https://images.unsplash.com/photo-1517976547714-720226b864c1?auto=format&fit=crop&w=1600&q=85",
        text: "Our journey began with small experiments, late-night design sessions and a shared curiosity about flight. This chapter represents the early prototypes, first launches and lessons that became the foundation for Unity Space.",
        link: "https://example.com/projects/past"
    },
    present: {
        tag: "PRESENT · IN DEVELOPMENT",
        title: "Building Today, Launching Tomorrow",
        image: "https://images.unsplash.com/photo-1457364887197-9150188c107b?auto=format&fit=crop&w=1600&q=85",
        text: "Today we focus on practical engineering: propulsion research, structures, avionics, testing and documentation. Every iteration brings us closer to a reliable launch system.",
        link: "https://example.com/projects/present"
    },
    future: {
        tag: "FUTURE · THE VISION",
        title: "Dreaming Bigger, Reaching Further",
        image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=1600&q=85",
        text: "Our roadmap reaches beyond a single launch. We envision increasingly capable vehicles, student-built payloads, satellite missions and collaborations across the space ecosystem.",
        link: "https://example.com/projects/future"
    }
};
const $ = s => document.querySelector(s);
const modal = $("#projectModal");
if (modal) {
    const mi = $("#modalImage"), mt = $("#modalTag"), mti = $("#modalTitle"), mx = $("#modalText"), ml = $("#modalLink");
    document.querySelectorAll(".project-card").forEach(c => c.addEventListener("click", () => { const p = projectData[c.dataset.project]; mi.src = p.image; mi.alt = p.title; mt.textContent = p.tag; mti.textContent = p.title; mx.textContent = p.text; ml.href = p.link; modal.classList.add("open"); modal.setAttribute("aria-hidden", "false"); document.body.style.overflow = "hidden" }));
    document.querySelectorAll("[data-close-modal]").forEach(x => x.addEventListener("click", () => { modal.classList.remove("open"); modal.setAttribute("aria-hidden", "true"); document.body.style.overflow = "" }));
}
document.addEventListener("keydown", e => { if (e.key === "Escape" && modal?.classList.contains("open")) { modal.classList.remove("open"); document.body.style.overflow = "" } });
const menuToggle = $(".menu-toggle"), nav = $(".top-right-nav"), teamMenu = $(".team-menu"), teamTrigger = $(".nav-team-trigger");
menuToggle?.addEventListener("click", () => { const open = nav.classList.toggle("open"); menuToggle.setAttribute("aria-expanded", open) });
teamTrigger?.addEventListener("click", e => { e.stopPropagation(); teamMenu.classList.toggle("open") });
document.addEventListener("click", e => { if (teamMenu && !teamMenu.contains(e.target)) teamMenu.classList.remove("open") });
document.querySelectorAll(".top-right-nav a").forEach(a => a.addEventListener("click", () => { nav?.classList.remove("open"); teamMenu?.classList.remove("open") }));
const observer = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("visible"); observer.unobserve(e.target) } }), { threshold: .1 });
document.querySelectorAll(".reveal").forEach(x => observer.observe(x));
const subscribe = document.querySelector(".subscribe-form");
if (subscribe) subscribe.addEventListener("submit", e => { e.preventDefault(); const toast = $("#toast"); if (toast) { toast.textContent = "Thanks — you're on the Unity Space update list."; toast.classList.add("show"); setTimeout(() => toast.classList.remove("show"), 3000) } subscribe.reset() });

/* Smooth scrolling for anchor links */


