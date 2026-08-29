const actualitesList = document.querySelector("#actualites-list");
const actualitesEmpty = document.querySelector("#actualites-empty");

if (actualitesList && actualitesEmpty) {
  const actualites = Array.isArray(window.ACTUALITES) ? [...window.ACTUALITES] : [];

  actualites.sort((a, b) => String(b.dateISO || "").localeCompare(String(a.dateISO || "")));

  if (actualites.length === 0) {
    actualitesEmpty.hidden = false;
  } else {
    actualites.forEach((actualite) => {
      const article = document.createElement("article");
      article.className = "actualite-card reveal";

      if (actualite.image) {
        const image = document.createElement("img");
        image.className = "actualite-image";
        image.src = actualite.image;
        image.alt = actualite.imageAlt || "";
        article.appendChild(image);
      }

      const body = document.createElement("div");
      body.className = "actualite-body";

      const meta = document.createElement("p");
      meta.className = "actualite-meta";
      meta.textContent = [actualite.date, actualite.categorie].filter(Boolean).join(" · ");

      const title = document.createElement("h3");
      title.textContent = actualite.titre || "Actualité du club";

      const summary = document.createElement("p");
      summary.className = "actualite-resume";
      summary.textContent = actualite.resume || "";

      body.append(meta, title, summary);

      if (actualite.lien) {
        const link = document.createElement("a");
        link.className = "actualite-link";
        link.href = actualite.lien;
        link.textContent = "Lire l'actualité";
        link.setAttribute("aria-label", `Lire l'actualité : ${title.textContent}`);
        body.appendChild(link);
      }

      article.appendChild(body);
      actualitesList.appendChild(article);
    });
  }
}
