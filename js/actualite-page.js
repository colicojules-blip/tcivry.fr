const params = new URLSearchParams(window.location.search);
const requestedSlug = params.get("article");
const actualites = Array.isArray(window.ACTUALITES) ? window.ACTUALITES : [];
const actualite = actualites.find((item) => item.slug === requestedSlug);

const articleElement = document.querySelector("#actualite-article");
const notFoundElement = document.querySelector("#actualite-not-found");
const heroElement = document.querySelector("#actualite-hero");

if (actualite) {
  const meta = document.querySelector("#actualite-meta");
  const title = document.querySelector("#actualite-title");
  const summary = document.querySelector("#actualite-resume");
  const content = document.querySelector("#actualite-content");

  meta.textContent = [actualite.date, actualite.categorie].filter(Boolean).join(" · ");
  title.textContent = actualite.titre;
  summary.textContent = actualite.resume;
  document.title = `${actualite.titre} | Tennis Club d'Ivry`;

  const description = document.querySelector('meta[name="description"]');
  if (description) {
    description.content = actualite.resume;
  }

  if (actualite.image) {
    const image = document.createElement("img");
    image.className = "actualite-detail-image";
    image.src = actualite.image;
    image.alt = actualite.imageAlt || "";
    articleElement.insertBefore(image, content);
  }

  (actualite.contenu || []).forEach((paragraphText) => {
    const paragraph = document.createElement("p");
    paragraph.textContent = paragraphText;
    content.appendChild(paragraph);
  });
} else {
  articleElement.hidden = true;
  heroElement.hidden = true;
  notFoundElement.hidden = false;
}
