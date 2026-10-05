const dialog = document.querySelector<HTMLDialogElement>("#command")!;
const input = document.querySelector<HTMLInputElement>("#command-search")!;
const list = document.querySelector<HTMLDivElement>("#commands")!;
const result = document.querySelector<HTMLParagraphElement>("#command-result")!;
let selected = 0;
const commands = [
  { label: "Open Codex: Plus 1", hint: "Codex profile demo" },
  { label: "Open Claude Code: Work", hint: "Claude beta profile demo" },
  { label: "Open Codex: Pro", hint: "Reserved profile demo" },
  { label: "Open project with Claude Code", hint: "Project demo" },
  { label: "View usage", hint: "Documentation", href: "/docs/usage-limits" },
  { label: "Download VeyDock", hint: "Windows x64", href: "/download" },
  {
    label: "Open GitHub",
    hint: "Source",
    href: "https://github.com/mithilkatkoria/VeyDock",
  },
];
function filtered() {
  return commands.filter((c) =>
    `${c.label} ${c.hint}`.toLowerCase().includes(input.value.toLowerCase()),
  );
}
function select(index: number) {
  const c = filtered()[index];
  if (!c) return;
  if (c.href) location.href = c.href;
  else
    result.textContent = `${c.label}: demonstration only. The website cannot launch local apps or switch your account.`;
}
function render() {
  const rows = filtered();
  selected = Math.max(0, Math.min(selected, rows.length - 1));
  list.replaceChildren();
  rows.forEach((c, i) => {
    const button = document.createElement("button");
    button.type = "button";
    button.setAttribute("role", "option");
    button.setAttribute("aria-selected", String(i === selected));
    button.id = `command-${i}`;
    button.textContent = c.label;
    const hint = document.createElement("small");
    hint.textContent = c.hint;
    button.append(hint);
    button.onclick = () => select(i);
    list.append(button);
  });
  input.setAttribute("aria-activedescendant", `command-${selected}`);
}
function open() {
  input.value = "";
  selected = 0;
  result.textContent = "";
  render();
  dialog.showModal();
  input.focus();
}
document
  .querySelectorAll("[data-command]")
  .forEach((button) => button.addEventListener("click", open));
document
  .querySelector("[data-close]")
  ?.addEventListener("click", () => dialog.close());
input.setAttribute("role", "combobox");
input.setAttribute("aria-controls", "commands");
input.setAttribute("aria-expanded", "true");
input.setAttribute("aria-autocomplete", "list");
input.addEventListener("input", () => {
  selected = 0;
  render();
});
input.addEventListener("keydown", (event) => {
  if (event.key === "ArrowDown" || event.key === "ArrowUp") {
    event.preventDefault();
    const count = filtered().length;
    if (count)
      selected =
        (selected + (event.key === "ArrowDown" ? 1 : -1) + count) % count;
    render();
  }
  if (event.key === "Enter") {
    event.preventDefault();
    select(selected);
  }
});
document.addEventListener("keydown", (event) => {
  if (
    (event.ctrlKey || event.metaKey) &&
    event.key.toLowerCase() === "k" &&
    !(event.target as HTMLElement)?.closest(
      'input,textarea,[contenteditable="true"]',
    )
  ) {
    event.preventDefault();
    if (!dialog.open) open();
  }
});
dialog.addEventListener("click", (event) => {
  if (event.target === dialog) {
    const b = dialog.getBoundingClientRect();
    if (
      event.clientX < b.left ||
      event.clientX > b.right ||
      event.clientY < b.top ||
      event.clientY > b.bottom
    )
      dialog.close();
  }
});
const media = document.querySelector<HTMLElement>(".sequence-media");
const captions = [
  "Configured profiles, without a fixed limit.",
  "Remaining allowance, reset times and freshness.",
  "Codex Desktop and Claude Code beta terminal profiles.",
  "A deliberate launch. Real switching acceptance is pending.",
  "Ctrl + K in the app. Try the website demonstration.",
];
if (media) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const n = (entry.target as HTMLElement).dataset.scene!;
          media.dataset.focus = n;
          document
            .querySelectorAll("[data-rail]")
            .forEach((link) =>
              link.classList.toggle(
                "active",
                (link as HTMLElement).dataset.rail === n,
              ),
            );
          document.querySelector("#scene-caption")!.textContent =
            captions[Number(n) - 1];
        }
      });
    },
    { rootMargin: "-25% 0px -35% 0px", threshold: 0 },
  );
  document
    .querySelectorAll("[data-scene]")
    .forEach((scene) => observer.observe(scene));
}
const consent = document.querySelector<HTMLElement>("#consent");
if (consent) {
  const config = JSON.parse(consent.dataset.config!);
  let enabled = false;
  function load() {
    if (enabled) return;
    enabled = true;
    if (/^G-[A-Z0-9]+$/.test(config.ga)) {
      const script = document.createElement("script");
      script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(config.ga)}`;
      document.head.append(script);
      const w = window as any;
      w.dataLayer = w.dataLayer || [];
      w.gtag = function () {
        w.dataLayer.push(arguments);
      };
      w.gtag("js", new Date());
      w.gtag("config", config.ga, { anonymize_ip: true });
    }
    if (/^[a-z0-9]+$/i.test(config.clarity)) {
      const w = window as any;
      w.clarity =
        w.clarity ||
        function () {
          (w.clarity.q = w.clarity.q || []).push(arguments);
        };
      const script = document.createElement("script");
      script.src = `https://www.clarity.ms/tag/${config.clarity}`;
      document.head.append(script);
      w.clarity("consentv2", {
        ad_Storage: "denied",
        analytics_Storage: "granted",
      });
    }
  }
  const saved = localStorage.getItem("veydock.analytics");
  if (saved === "yes") load();
  else if (!saved) consent.hidden = false;
  consent.querySelectorAll<HTMLButtonElement>("[data-consent]").forEach(
    (b) =>
      (b.onclick = () => {
        localStorage.setItem("veydock.analytics", b.dataset.consent!);
        consent.hidden = true;
        if (b.dataset.consent === "yes") load();
      }),
  );
  document.querySelectorAll<HTMLAnchorElement>("[data-download]").forEach((a) =>
    a.addEventListener("click", () => {
      if (!enabled) return;
      const payload = {
        event: "download_click",
        app: "VeyDock",
        platform: "windows",
        architecture: "x64",
        source_page: location.pathname,
        utm_campaign: new URLSearchParams(location.search).get("utm_campaign"),
      };
      (window as any).gtag?.("event", "download_click", payload);
      if (config.backplane)
        navigator.sendBeacon(config.backplane, JSON.stringify(payload));
    }),
  );
}
