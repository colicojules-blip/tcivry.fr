const homeActualiteLink = document.querySelector("#home-latest-actualite");
const homeActualiteTitle = document.querySelector("#home-news-title");
const homeActualiteSummary = document.querySelector("#home-news-summary");

if (homeActualiteLink && homeActualiteTitle && homeActualiteSummary) {
  const today = new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Paris", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());
  const actualites = (Array.isArray(window.ACTUALITES) ? window.ACTUALITES : [])
    .filter((item) => !item.archive && (!item.dateFin || item.dateFin >= today) && (!item.dateISO || item.dateISO <= today));

  actualites.sort((a, b) => String(b.dateISO || "").localeCompare(String(a.dateISO || "")));

  const latestActualite = actualites.find((item) => item.miseEnAvant) || actualites[0];

  if (latestActualite) {
    homeActualiteTitle.textContent = latestActualite.titre;
    homeActualiteSummary.textContent = latestActualite.resume;
    homeActualiteLink.href = latestActualite.lien || "actualites.html";
    homeActualiteLink.setAttribute(
      "aria-label",
      `Lire l'actualité : ${latestActualite.titre}`
    );
  }
}
