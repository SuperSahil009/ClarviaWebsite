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


/* Approved Clarvia visual storytelling interactions */
(() => {
  const stories = [
    {
      title: "Everything feels like too much", eyebrow: "Stress, anxiety & overwhelm",
      image: "assets/images/clarity-call.jpeg", alt: "A quiet moment of reflection indoors",
      first: "You might be holding a lot at once—overthinking, emotional exhaustion or the pressure to keep going. Sometimes it feels like anxiety; other times it can be difficult to switch off.",
      second: "Together, we can make space to understand what you're experiencing and explore practical ways to feel more grounded.",
      help: ["Individual general counselling","Emotional regulation tools","Mindfulness and grounding practices","Understanding stress patterns"],
      url: "general-counselling.html", button: "Explore General Counselling"
    },
    {
      title: "Life feels uncertain right now", eyebrow: "Life transitions & loneliness",
      image: "assets/images/clarvia-personal/beach-reflection.webp", alt: "A person looking out across the coastline",
      first: "A move, a relationship change or simply feeling disconnected can leave you unsure of where you belong. Even positive changes can bring grief, doubt or loneliness.",
      second: "We can explore what this transition means for you and find practical ways to feel steadier while you navigate it.",
      help: ["Space to make sense of change","Support with loneliness and connection","Boundaries and self-understanding","Gentle coping strategies"],
      url: "general-counselling.html", button: "Explore General Counselling"
    },
    {
      title: "Something I use to cope is becoming a concern", eyebrow: "Alcohol or other drug concerns",
      image: "assets/images/clarvia-service-aod.webp", alt: "Adult reflecting quietly on alcohol use at home",
      first: "Maybe alcohol or another substance has started taking up more space in your life than you want. You may feel uncertain, worried or simply curious about your patterns.",
      second: "There is room to talk openly, without judgement or pressure to have all the answers. We can look at the role substance use plays and possible next steps.",
      help: ["Understanding patterns and triggers","Motivation and behaviour change","Harm-reduction strategies","Recovery-oriented support and referrals"],
      url: "aod-counselling.html", button: "Explore AOD Counselling"
    },
    {
      title: "I'm worried about someone I care about", eyebrow: "Family support & guidance",
      image: "assets/images/compassionate-conversation.webp", alt: "A supportive moment between people",
      first: "When someone you love is struggling, you might feel worried, helpless or exhausted by trying to find the right thing to say.",
      second: "Your wellbeing matters too. We can explore boundaries, communication and ways to support someone without losing sight of yourself.",
      help: ["Family and loved-one guidance","Communication and boundary setting","Support pathways and options","Looking after your own wellbeing"],
      url: "aod-counselling.html#family-support", button: "Explore Family Support"
    },
    {
      title: "I want support that fits my daily life", eyebrow: "Disability & everyday wellbeing",
      image: "assets/images/clarvia-service-disability.webp", alt: "Wheelchair user preparing food alongside a supportive companion",
      first: "Support should reflect your own goals, routines and preferences—not a one-size-fits-all idea of what wellbeing looks like.",
      second: "We can discuss what matters to you and whether Clarvia's individual support is a suitable fit. Funding options need to be checked separately.",
      help: ["Person-centred goal exploration","Everyday coping and routines","Confidence and self-advocacy","Individual suitability and funding discussion"],
      url: "ndis-support.html", button: "Explore Disability Support"
    },
    {
      title: "I need help managing my emotions", eyebrow: "Emotional regulation & coping",
      image: "assets/images/clarvia-personal/shree-mindfulness-by-water.webp", alt: "A peaceful mindfulness moment beside water",
      first: "Sometimes feelings arrive quickly, linger longer than expected or feel difficult to name. You might notice yourself shutting down, reacting strongly or carrying tension.",
      second: "Together we can gently explore what your emotions are telling you and practise tools that fit your everyday life.",
      help: ["Noticing patterns and triggers","Grounding and mindfulness options","Practical emotional regulation tools","Self-understanding and coping skills"],
      url: "general-counselling.html", button: "Explore Coping Support"
    },
    {
      title: "I don't know where to begin", eyebrow: "Find your first step",
      image: "assets/images/australian-riverside-dawn.webp", alt: "A peaceful Australian riverside at dawn",
      first: "You may know something feels difficult without knowing what kind of help would be right. There is no perfect way to begin.",
      second: "A free introductory conversation can help you ask questions, hear what Clarvia offers and work out whether a session here—or another service—might suit.",
      help: ["A no-pressure first conversation","Space to ask questions","Clarifying support options","Understanding suitable next steps"],
      url: "https://calendly.com/shreegaur/30min", button: "Book a Free Introductory Call"
    }
  ];
  const choices = [...document.querySelectorAll("[data-cw-choice]")];
  const panel = document.querySelector("#cw-support-panel");
  const layout = document.querySelector("[data-cw-story-layout]");
  const list = layout?.querySelector(".cw-carry-list");
  const mobile = window.matchMedia("(max-width: 760px)");
  let selected = 0;
  const arrangePanel = () => {
    if (!panel || !list || !layout || !choices[selected]) return;
    if (mobile.matches) choices[selected].after(panel);
    else layout.append(panel);
  };
  const showStory = (index, moveFocus = false) => {
    if (!panel || !choices[index]) return;
    selected = index;
    choices.forEach((choice, i) => {
      const current = i === index;
      choice.setAttribute("aria-expanded", String(current));
      choice.classList.toggle("is-selected", current);
    });
    const story = stories[index];
    const photo = panel.querySelector("[data-cw-panel-image]");
    photo.src = story.image;
    photo.alt = story.alt;
    panel.querySelector("[data-cw-panel-eyebrow]").textContent = story.eyebrow;
    panel.querySelector("[data-cw-panel-title]").textContent = story.title;
    panel.querySelector("[data-cw-panel-copy]").textContent = story.first;
    panel.querySelector("[data-cw-panel-secondary]").textContent = story.second;
    const help = panel.querySelector("[data-cw-panel-help]");
    help.replaceChildren(...story.help.map((line) => {
      const item = document.createElement("li");
      item.textContent = line;
      return item;
    }));
    const link = panel.querySelector("[data-cw-panel-link]");
    link.href = story.url;
    link.replaceChildren(document.createTextNode(story.button + " "));
    const arrow = document.createElement("span");
    arrow.setAttribute("aria-hidden", "true");
    arrow.textContent = "→";
    link.append(arrow);
    panel.setAttribute("aria-labelledby", choices[index].id);
    arrangePanel();
    if (moveFocus) choices[index].focus();
  };
  choices.forEach((choice, index) => {
    choice.addEventListener("click", () => showStory(index));
    choice.addEventListener("keydown", (event) => {
      if (!["ArrowDown","ArrowUp","Home","End"].includes(event.key)) return;
      event.preventDefault();
      const next = event.key === "Home" ? 0 : event.key === "End" ? choices.length - 1 :
        (index + (event.key === "ArrowDown" ? 1 : -1) + choices.length) % choices.length;
      showStory(next, true);
    });
  });
  mobile.addEventListener?.("change", arrangePanel);
  showStory(0);
  const root=document.querySelector("[data-cw-slideshow]");
  if(!root)return;
  const slides=[...root.querySelectorAll("[data-cw-slide]")];
  const dots=[...root.querySelectorAll("[data-cw-dot]")];
  const counter=root.querySelector("[data-cw-slide-count]");
  const slideName=root.querySelector("[data-cw-slide-name]");
  const toggle=root.querySelector("[data-cw-toggle]");
  const names=["Mindfulness and grounding","A calming space","Online counselling","Alcohol awareness","Space to reflect on substance use","Disability and everyday goals"];
  const prefersReduced=window.matchMedia("(prefers-reduced-motion: reduce)");
  let index=0,paused=prefersReduced.matches,timer=null;
  const show=n=>{
    index=(n+slides.length)%slides.length;
    slides.forEach((el,i)=>el.classList.toggle("is-current",i===index));
    dots.forEach((el,i)=>el.setAttribute("aria-current",String(i===index)));
    if(counter)counter.textContent=String(index+1).padStart(2,"0")+" / "+String(slides.length).padStart(2,"0");
    if(slideName)slideName.textContent=names[index];
  };
  const stop=()=>{if(timer)window.clearInterval(timer);timer=null};
  const start=()=>{stop();if(!paused&&!document.hidden)timer=window.setInterval(()=>show(index+1),7500)};
  const setPaused=value=>{
    paused=value;
    if(toggle){toggle.textContent=paused?"Play":"Pause";toggle.setAttribute("aria-label",paused?"Play background slideshow":"Pause background slideshow")}
    start();
  };
  dots.forEach((dot,i)=>dot.addEventListener("click",()=>{show(i);start()}));
  toggle?.addEventListener("click",()=>setPaused(!paused));
  document.addEventListener("visibilitychange",()=>{if(document.hidden)stop();else start()});
  prefersReduced.addEventListener?.("change",e=>setPaused(e.matches));
  show(0);setPaused(paused);
})();

/* Gracefully retain existing imagery until owner-approved photos are added. */
document.querySelectorAll("img[data-cw-fallback]").forEach((img) => {
  img.addEventListener("error", () => {
    const fallback = img.dataset.cwFallback;
    if (!fallback || img.src.endsWith(fallback)) return;
    img.src = fallback;
  }, { once: true });
  if (img.complete && img.naturalWidth === 0 && img.dataset.cwFallback) img.src = img.dataset.cwFallback;
});


/* Owner-only feedback carousel mockup: a real pause control for the moving cards. */
(() => {
  const section = document.querySelector("[data-cw-feedback]");
  if (!section) return;
  const button = section.querySelector("[data-cw-feedback-toggle]");
  const label = button?.querySelector("[data-cw-feedback-toggle-text]");
  const icon = button?.querySelector("[data-cw-feedback-toggle-icon]");
  if (!button) return;
  const sync = () => {
    const paused = section.classList.contains("is-paused");
    button.setAttribute("aria-pressed", String(paused));
    button.setAttribute("aria-label", paused ? "Resume moving sample cards" : "Pause moving sample cards");
    if (label) label.textContent = paused ? "Resume movement" : "Pause movement";
    if (icon) icon.textContent = paused ? "▶" : "Ⅱ";
  };
  button.addEventListener("click", () => {
    section.classList.toggle("is-paused");
    sync();
  });
  sync();
})();
