const film = document.querySelector<HTMLElement>("[data-switch-film]");
if (film) {
  const get = <T extends HTMLElement>(selector: string) => film.querySelector<T>(selector)!;
  const play = get<HTMLButtonElement>("[data-film-play]");
  const progress = get<HTMLInputElement>("[data-film-progress]");
  const caption = get<HTMLElement>("[data-film-caption]");
  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
  const duration = 12000;
  let provider: "codex" | "claude" = "codex";
  let account: "alex" | "sam" = "sam";
  let position = 0;
  let playing = false;
  let frame = 0;
  let previous = 0;
  let renderedStage = -1;
  const chapters = ["CHOOSE YOUR PROFILE", "THE HANDOFF", "LOAD THE IDENTITY", "YOUR NEXT SESSION"];
  const stageAt = (time: number) => time < 2200 ? 0 : time < 5700 ? 1 : time < 8600 ? 2 : 3;
  const messages = () => provider === "codex" ? [
    `Choose ${account}@example.com in VeyDock. The choice is always yours.`,
    "Save your work, then quit Codex normally. VeyDock waits for the Desktop handoff.",
    "The illustrated handoff loads the selected saved identity into the existing workspace.",
    `The simulated Codex workspace now displays ${account}@example.com. Real acceptance is pending.`,
  ] : [
    `Choose ${account}@example.com in VeyDock. Claude Code profiles stay separate.`,
    "VeyDock validates the selected profile and its configuration directory.",
    "Launch Claude Code in a Windows terminal with the selected CLAUDE_CONFIG_DIR.",
    `The simulated /status view displays ${account}@example.com. Real acceptance is pending.`,
  ];
  function render() {
    const stage = stageAt(position);
    film!.dataset.stage = String(stage);
    get(".film-idle").setAttribute("aria-hidden", String(stage !== 0));
    get(".film-arrival").setAttribute("aria-hidden", String(stage !== 3));
    get(".film-handoff").setAttribute("aria-hidden", String(stage !== 1 && stage !== 2));
    film!.dataset.provider = provider;
    progress.value = String(Math.round(position));
    get("[data-film-time]").textContent = `0:${String(Math.floor(position / 1000)).padStart(2, "0")} / 0:12`;
    play.textContent = playing ? "Ⅱ" : "▶";
    play.setAttribute("aria-label", playing ? "Pause walkthrough" : "Play walkthrough");
    if (stage !== renderedStage) {
      renderedStage = stage;
      get("[data-film-chapter]").textContent = chapters[stage];
      caption.textContent = messages()[stage];
      get("[data-film-step-number]").textContent = `0${stage + 1}`;
      get("[data-film-handoff-title]").textContent = provider === "codex"
        ? (stage === 1 ? "A clean handoff." : "Load the selected identity.")
        : (stage === 1 ? "Check the profile boundary." : "Open its own terminal.");
      get("[data-film-handoff-body]").textContent = messages()[stage];
    }
  }
  function pause() { playing = false; cancelAnimationFrame(frame); frame = 0; previous = 0; render(); }
  function tick(now: number) {
    if (!playing) return;
    if (previous) position = Math.min(duration, position + Math.min(now - previous, 100));
    previous = now;
    render();
    if (position >= duration) { pause(); return; }
    frame = requestAnimationFrame(tick);
  }
  function start() {
    if (position >= duration) position = 0;
    if (reducedMotion.matches) { position = [2200, 5700, 8600, duration].find(t => t > position) ?? 0; render(); return; }
    if (playing) return;
    playing = true; previous = 0; render(); frame = requestAnimationFrame(tick);
  }
  function reset() { pause(); position = 0; renderedStage = -1; render(); }
  function identity() {
    const email = `${account}@example.com`;
    get("[data-film-email]").textContent = email;
    get("[data-film-terminal-email]").textContent = email;
    get("[data-film-initial]").textContent = account === "alex" ? "A" : "S";
    film!.querySelectorAll<HTMLButtonElement>("[data-film-account]").forEach(button => {
      button.setAttribute("aria-pressed", String(button.dataset.filmAccount === account));
      button.setAttribute("aria-label", `Open ${provider === "codex" ? "Codex" : "Claude Code"} as ${button.dataset.filmAccount}@example.com in simulated demo`);
    });
  }
  film.querySelectorAll<HTMLButtonElement>("[data-film-account]").forEach(button => button.addEventListener("click", () => {
    account = button.dataset.filmAccount as typeof account;
    reset(); identity(); renderedStage = -1; start();
  }));
  film.querySelectorAll<HTMLButtonElement>("[data-film-provider]").forEach(button => button.addEventListener("click", () => {
    provider = button.dataset.filmProvider as typeof provider;
    reset(); identity(); renderedStage = -1;
    film!.querySelectorAll<HTMLButtonElement>("[data-film-provider]").forEach(b => b.setAttribute("aria-pressed", String(b === button)));
    get("[data-film-app-title]").textContent = provider === "codex" ? "Codex" : "Claude Code";
    const docs = get<HTMLAnchorElement>("[data-film-docs]");
    docs.href = provider === "codex" ? "/docs/providers/codex" : "/docs/providers/claude-code";
    docs.textContent = provider === "codex" ? "How the Codex handoff works ↗" : "How Claude Code profiles work ↗";
    render();
  }));
  play.addEventListener("click", () => playing ? pause() : start());
  get("[data-film-start]").addEventListener("click", start);
  get("[data-film-replay]").addEventListener("click", () => { reset(); start(); });
  get("[data-film-next]").addEventListener("click", () => { pause(); position = [2200, 5700, 8600, duration].find(t => t > position) ?? 0; render(); });
  progress.addEventListener("input", () => { const value = Number(progress.value); pause(); position = value; render(); });
  // Pause instead of consuming frames while hidden or off screen. Never auto-resume.
  document.addEventListener("visibilitychange", () => { if (document.hidden) pause(); });
  new IntersectionObserver(entries => { if (!entries[0].isIntersecting && playing) pause(); }, { threshold: 0 }).observe(film);
  reducedMotion.addEventListener("change", pause);
  identity(); render();
}
