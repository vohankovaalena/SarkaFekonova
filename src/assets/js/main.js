/* =========================================================================
   Šárka Fekoňová — chování webu
   ========================================================================= */

/* -------------------------------------------------------------------------
   NASTAVENÍ — vyplňte před spuštěním webu
   ------------------------------------------------------------------------- */
const SITE = {
  /* Endpoint, kam se odesílají poptávkové formuláře.
     Např. Formspree: "https://formspree.io/f/xxxxxxxx"
     Když zůstane prázdný, formulář otevře předvyplněný e-mail. */
  formEndpoint: "",
  /* E-mail pro záložní odeslání formuláře. */
  email: "info@sarkafekonova.cz"
};

/* ------------------------------------------------------------ Mobilní menu */
(function initNav() {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector("#hlavni-menu");
  if (!toggle || !nav) return;

  const setOpen = (open) => {
    toggle.setAttribute("aria-expanded", String(open));
    nav.dataset.open = String(open);
  };

  toggle.addEventListener("click", () => {
    setOpen(toggle.getAttribute("aria-expanded") !== "true");
  });

  nav.addEventListener("click", (e) => {
    if (e.target.closest("a")) setOpen(false);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
      setOpen(false);
      toggle.focus();
    }
  });

  const mq = window.matchMedia("(min-width: 62rem)");
  mq.addEventListener("change", () => setOpen(false));
})();

/* ------------------------------------------------------------ Aktuální rok */
document.querySelectorAll("[data-year]").forEach((el) => {
  el.textContent = String(new Date().getFullYear());
});

/* --------------------------------------- Otočné hexagony „Pro koho tančím“ */
/* Na zařízeních bez hoveru (dotykové displeje) otočí hexagon až první klepnutí
   — teprve druhé (na už otočeném hexagonu) proklikne na cílovou stránku. */
(function initHexFlip() {
  if (window.matchMedia("(hover: hover)").matches) return;

  const hexagony = document.querySelectorAll(".hexnav .hexa");
  if (!hexagony.length) return;

  hexagony.forEach((hexa) => {
    hexa.addEventListener("click", (e) => {
      if (hexa.classList.contains("is-flipped")) return;
      e.preventDefault();
      hexagony.forEach((other) => { if (other !== hexa) other.classList.remove("is-flipped"); });
      hexa.classList.add("is-flipped");
    });
  });

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".hexnav .hexa")) {
      hexagony.forEach((hexa) => hexa.classList.remove("is-flipped"));
    }
  });
})();

/* --------------------------------------------------------------- Video */
document.querySelectorAll("[data-video]").forEach((frame) => {
  frame.addEventListener("click", () => {
    const id = frame.dataset.video;
    if (!id || id === "VIDEO_ID") {
      const note = frame.querySelector(".video-frame__note");
      if (note) note.textContent = "Video zatím není nahrané";
      return;
    }
    const iframe = document.createElement("iframe");
    iframe.src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`;
    iframe.title = "Video – Šárka Fekoňová";
    iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture";
    iframe.allowFullscreen = true;
    frame.replaceChildren(iframe);
  });
});

/* ------------------------------------------------------------- Formuláře */
document.querySelectorAll("form[data-form]").forEach((form) => {
  const status = form.querySelector(".form__status");

  const setError = (field, message) => {
    field.dataset.invalid = "true";
    const slot = field.querySelector(".field__error");
    if (slot) slot.textContent = message;
    const input = field.querySelector("input, textarea, select");
    if (input) input.setAttribute("aria-invalid", "true");
  };

  const clearError = (field) => {
    delete field.dataset.invalid;
    const input = field.querySelector("input, textarea, select");
    if (input) input.removeAttribute("aria-invalid");
  };

  const validate = () => {
    let firstBad = null;
    form.querySelectorAll(".field").forEach((field) => {
      const input = field.querySelector("input, textarea, select");
      if (!input) return;
      clearError(field);
      if (input.required && !input.value.trim()) {
        setError(field, "Tuhle položku prosím vyplňte.");
        firstBad = firstBad || input;
      } else if (input.type === "email" && input.value && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(input.value)) {
        setError(field, "Zkontrolujte prosím tvar e-mailu.");
        firstBad = firstBad || input;
      }
    });
    const consent = form.querySelector(".consent input[required]");
    if (consent && !consent.checked) {
      firstBad = firstBad || consent;
      if (status) {
        status.dataset.state = "error";
        status.textContent = "Bez souhlasu se zpracováním údajů vám bohužel nemůžeme odpovědět.";
      }
    }
    return firstBad;
  };

  const mailtoFallback = () => {
    const data = new FormData(form);
    const lines = [];
    form.querySelectorAll(".field").forEach((field) => {
      const input = field.querySelector("input, textarea, select");
      const label = field.querySelector("label");
      if (input && label && input.value.trim()) {
        lines.push(`${label.textContent.replace("*", "").trim()}: ${input.value.trim()}`);
      }
    });
    const subject = data.get("_subject") || "Poptávka z webu";
    window.location.href =
      `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
    if (status) {
      status.dataset.state = "ok";
      status.textContent = "Otevřeli jsme vám předvyplněný e-mail. Stačí ho odeslat a ozvu se vám.";
    }
  };

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (status) { status.dataset.state = ""; status.textContent = ""; }

    const bad = validate();
    if (bad) { bad.focus(); return; }

    if (!SITE.formEndpoint) { mailtoFallback(); return; }

    const button = form.querySelector("button[type='submit']");
    const original = button ? button.textContent : "";
    if (button) { button.disabled = true; button.textContent = "Odesílám…"; }

    try {
      const res = await fetch(SITE.formEndpoint, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form)
      });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      if (status) {
        status.dataset.state = "ok";
        status.textContent = "Děkuju za zprávu! Ozvu se vám nejpozději do dvou pracovních dnů.";
      }
    } catch (err) {
      if (status) {
        status.dataset.state = "error";
        status.textContent = `Odeslání se nepovedlo. Napište mi prosím přímo na ${SITE.email}.`;
      }
    } finally {
      if (button) { button.disabled = false; button.textContent = original; }
    }
  });

  form.querySelectorAll(".field input, .field textarea, .field select").forEach((input) => {
    input.addEventListener("input", () => {
      const field = input.closest(".field");
      if (field && field.dataset.invalid) clearError(field);
    });
  });
});
