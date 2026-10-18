const menuButton = document.querySelector("[data-menu-toggle]");
const navigation = document.querySelector("[data-site-nav]");
const year = document.querySelector("[data-year]");

if (year) {
  year.textContent = new Date().getFullYear();
}

const setMenuState = (isOpen) => {
  if (!menuButton || !navigation) return;
  menuButton.setAttribute("aria-expanded", String(isOpen));
  navigation.classList.toggle("is-open", isOpen);
  document.body.classList.toggle("menu-open", isOpen);
};

menuButton?.addEventListener("click", () => {
  setMenuState(menuButton.getAttribute("aria-expanded") !== "true");
});

navigation?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => setMenuState(false));
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    setMenuState(false);
    menuButton?.focus();
  }
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 980) setMenuState(false);
});

const homePage = document.querySelector(".home-page");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

if (!homePage && !document.querySelector(".site-mobile-cta")) {
  const mobileBookingLink = document.createElement("a");
  mobileBookingLink.className = "site-mobile-cta";
  mobileBookingLink.href = "https://calendly.com/shreegaur/30min";
  mobileBookingLink.target = "_blank";
  mobileBookingLink.rel = "noopener noreferrer";
  mobileBookingLink.textContent = "Book Free Intro Call";
  mobileBookingLink.setAttribute("aria-label", "Book a free introductory call with Clarvia Wellness");
  document.body.append(mobileBookingLink);
}

if (homePage && !reduceMotion.matches) {
  homePage.classList.add("motion-enabled");
}

const pathwayCards = [...document.querySelectorAll(".home-pathway")];
const touchPointer = window.matchMedia("(hover: none), (pointer: coarse)");

pathwayCards.forEach((card) => {
  card.addEventListener("click", (event) => {
    if (!touchPointer.matches || card.classList.contains("is-active")) return;
    event.preventDefault();
    pathwayCards.forEach((item) => item.classList.remove("is-active"));
    card.classList.add("is-active");
  });
});

document.addEventListener("pointerdown", (event) => {
  if (!event.target.closest(".home-pathway")) {
    pathwayCards.forEach((card) => card.classList.remove("is-active"));
  }
});

const serviceCards = [...document.querySelectorAll(".home-service")];
serviceCards.forEach((card, index) => card.style.setProperty("--service-delay", `${index * 90}ms`));

if (serviceCards.length && "IntersectionObserver" in window && !reduceMotion.matches) {
  const serviceObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-in-view");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.18 });

  serviceCards.forEach((card) => serviceObserver.observe(card));
} else {
  serviceCards.forEach((card) => card.classList.add("is-in-view"));
}

const approachSection = document.querySelector(".home-approach");
const approachSteps = [...document.querySelectorAll("[data-approach-step]")];
let approachFrame;

const updateApproach = () => {
  approachFrame = undefined;
  if (!approachSection || reduceMotion.matches) return;

  const bounds = approachSection.getBoundingClientRect();
  const rawProgress = (window.innerHeight - bounds.top) / (window.innerHeight + bounds.height);
  const progress = Math.min(1, Math.max(0, rawProgress));
  const scale = 1.035 + (progress * 0.028);
  const shift = (progress - 0.5) * -18;
  const activeIndex = progress < 0.36 ? 0 : progress < 0.66 ? 1 : 2;

  approachSection.style.setProperty("--approach-scale", scale.toFixed(3));
  approachSection.style.setProperty("--approach-shift", `${shift.toFixed(1)}px`);
  approachSteps.forEach((step, index) => step.classList.toggle("is-active", index === activeIndex));
};

const requestApproachUpdate = () => {
  if (approachFrame) return;
  approachFrame = window.requestAnimationFrame(updateApproach);
};

if (approachSection) {
  approachSteps[0]?.classList.add("is-active");
  updateApproach();
  window.addEventListener("scroll", requestApproachUpdate, { passive: true });
  window.addEventListener("resize", requestApproachUpdate);
}

const availabilityDialog = document.querySelector("[data-availability-dialog]");
const availabilityHost = document.querySelector("[data-calendly-host]");
const availabilityStatus = document.querySelector("[data-availability-status]");
const availabilityOpeners = document.querySelectorAll("[data-open-availability]");
const availabilityCloser = document.querySelector("[data-close-availability]");
let calendlyPromise;
let calendlyLoaded = false;

const loadCalendly = () => {
  if (window.Calendly) return Promise.resolve(window.Calendly);
  if (calendlyPromise) return calendlyPromise;

  calendlyPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    script.addEventListener("load", () => resolve(window.Calendly));
    script.addEventListener("error", () => reject(new Error("Calendly could not be loaded")));
    document.head.append(script);
  });

  return calendlyPromise;
};

const initialiseCalendly = async () => {
  if (!availabilityHost || calendlyLoaded) return;

  try {
    const Calendly = await loadCalendly();
    if (!Calendly?.initInlineWidget) throw new Error("Calendly embed is unavailable");

    availabilityHost.innerHTML = "";
    Calendly.initInlineWidget({
      url: availabilityHost.dataset.calendlyUrl,
      parentElement: availabilityHost,
    });
    calendlyLoaded = true;
    availabilityDialog?.classList.add("is-loaded");
  } catch (error) {
    if (availabilityStatus) {
      availabilityStatus.innerHTML = "Live times could not be loaded. Please use the Calendly link below.";
    }
  }
};

const openAvailability = () => {
  if (!availabilityDialog) return;

  if (typeof availabilityDialog.showModal === "function") {
    if (!availabilityDialog.open) availabilityDialog.showModal();
  } else {
    availabilityDialog.setAttribute("open", "");
  }

  document.body.classList.add("availability-open");
  initialiseCalendly();
};

const closeAvailability = () => {
  if (!availabilityDialog) return;
  if (typeof availabilityDialog.close === "function" && availabilityDialog.open) {
    availabilityDialog.close();
  } else {
    availabilityDialog.removeAttribute("open");
  }
  document.body.classList.remove("availability-open");
};

availabilityOpeners.forEach((button) => button.addEventListener("click", openAvailability));
availabilityCloser?.addEventListener("click", closeAvailability);
availabilityDialog?.addEventListener("close", () => document.body.classList.remove("availability-open"));
availabilityDialog?.addEventListener("click", (event) => {
  if (event.target === availabilityDialog) closeAvailability();
});

window.addEventListener("message", (event) => {
  if (!event.origin.endsWith("calendly.com") || !event.data?.event?.startsWith("calendly.")) return;

  if (event.data.event === "calendly.page_height" && event.data.payload?.height && availabilityHost) {
    const height = Math.min(760, Math.max(620, Number(event.data.payload.height)));
    availabilityHost.style.height = `${height}px`;
  }

  if (event.data.event === "calendly.event_scheduled") {
    const heading = document.querySelector("#availability-title");
    if (heading) heading.textContent = "Your introductory call is booked.";
  }
});
