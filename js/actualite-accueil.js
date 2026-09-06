const homeActualiteLink = document.querySelector("#home-latest-actualite");
const homeActualiteTitle = document.querySelector("#home-news-title");
const homeActualiteSummary = document.querySelector("#home-news-summary");

if (homeActualiteLink && homeActualiteTitle && homeActualiteSummary) {
  const actualites = Array.isArray(window.ACTUALITES) ? [...window.ACTUALITES] : [];

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
