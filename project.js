const projects = {
  everesting: {
    title: 'Everesting',
    client: 'Théodetienne',
    format: { fr: 'Capsule vidéo', en: 'Short film' },
    directors: 'Corentin Boullard · Guenael Winkler',
    description: { fr: 'Capsule vidéo pour Théodetienne.', en: 'A short film for Théodetienne.' },
    embed: 'https://www.youtube.com/embed/dancQaFmk1g?autoplay=1&mute=1&controls=1&loop=1&playlist=dancQaFmk1g&playsinline=1&rel=0&cc_load_policy=3&iv_load_policy=3',
    youtube: 'https://youtu.be/dancQaFmk1g?si=d3Wct8oNI5aUmXuZ',
    next: 'lyon-sainte-lyon',
  },
  naak: {
    title: 'Nutrition the Key to Flow',
    client: 'NÄAK',
    format: { fr: 'Campagne vidéo', en: 'Video campaign' },
    directors: 'Corentin Boullard · Guenael Winkler',
    description: { fr: 'Campagne vidéo autour de Noé Chaufferin.', en: 'A video campaign featuring Noé Chaufferin.' },
    embed: 'https://www.youtube.com/embed/1ZE7xjDqzbY?autoplay=1&mute=1&controls=1&loop=1&playlist=1ZE7xjDqzbY&playsinline=1&rel=0&cc_load_policy=3&iv_load_policy=3',
    youtube: 'https://youtu.be/1ZE7xjDqzbY?si=ES-Cx8uaawZgF_rr',
    next: 'pyrene',
  },
  pyrene: {
    title: { fr: 'La meilleure nutrition c’est celle qui s’oublie', en: 'The Best Nutrition Is the One You Forget About' },
    client: 'Pyrene',
    format: { fr: 'Campagne produit', en: 'Product campaign' },
    directors: 'Corentin Boullard · Guenael Winkler',
    description: { fr: 'Campagne produit pour Pyrene avec l’athlète Noé Chaufferin.', en: 'A product campaign for Pyrene featuring athlete Noé Chaufferin.' },
    embed: 'https://www.youtube.com/embed/3moZA3CL6kc?autoplay=1&mute=1&controls=1&loop=1&playlist=3moZA3CL6kc&playsinline=1&rel=0&cc_load_policy=3&iv_load_policy=3',
    youtube: 'https://youtube.com/shorts/3moZA3CL6kc?si=cXAwnvbvn7HgztnX',
    next: 'nat-form',
  },
  'nat-form': {
    title: '',
    client: 'Nat&Form',
    format: { fr: 'Campagne vidéo', en: 'Video campaign' },
    detailAspect: 'four-three',
    directors: 'Corentin Boullard · Guenael Winkler',
    description: { fr: 'Campagne pour Nat&Form sur l’Ultra Marin avec Noé Chaufferin.', en: 'A campaign for Nat&Form at the Ultra Marin featuring Noé Chaufferin.' },
    embed: 'https://www.youtube.com/embed/F0Kpj2BeIug?autoplay=1&mute=1&controls=1&loop=1&playlist=F0Kpj2BeIug&playsinline=1&rel=0&cc_load_policy=3&iv_load_policy=3',
    youtube: 'https://youtu.be/F0Kpj2BeIug',
    next: 'everesting',
  },
  'stellar-equipement': {
    title: 'Out of the City',
    client: 'Stellar Equipement',
    format: { fr: 'Film de marque', en: 'Brand film' },
    directors: 'Corentin Boullard · Guenael Winkler',
    description: { fr: 'Film Out of the City pour Stellar Equipement.', en: 'Out of the City, a film for Stellar Equipement.' },
    embed: 'https://www.youtube.com/embed/SGx2-TlMPHw?autoplay=1&mute=1&controls=1&loop=1&playlist=SGx2-TlMPHw&playsinline=1&rel=0&cc_load_policy=3&iv_load_policy=3',
    youtube: 'https://youtu.be/SGx2-TlMPHw?si=ioJzynezRzyc3Lkt',
    next: 'boo-johnson',
  },
  'boo-johnson': {
    title: 'Life Is a Beautiful Struggle',
    client: 'Boo Johnson',
    format: { fr: 'Capsule vidéo', en: 'Short film' },
    directors: 'Corentin Boullard · Guenael Winkler',
    description: { fr: 'Capsule vidéo pour Boo Johnson.', en: 'A short film for Boo Johnson.' },
    embed: 'https://www.youtube.com/embed/GyIuSzdbdpY?autoplay=1&mute=1&controls=1&loop=1&playlist=GyIuSzdbdpY&playsinline=1&rel=0&cc_load_policy=3&iv_load_policy=3',
    youtube: 'https://youtu.be/GyIuSzdbdpY?si=tW1QSrOqleJz6W0P',
    next: 'naak',
  },
  'lyon-sainte-lyon': {
    title: 'LyonSaintéLyon',
    client: 'Casquette Verte',
    format: { fr: 'Film documentaire', en: 'Documentary film' },
    directors: 'Corentin Boullard · Guenael Winkler',
    description: { fr: 'Film documentaire sur la LyonSaintéLyon de Casquette Verte.', en: 'A documentary film about Casquette Verte’s LyonSaintéLyon.' },
    embed: 'https://www.youtube.com/embed/gQh4ofhJFeA?autoplay=1&mute=1&controls=1&loop=1&playlist=gQh4ofhJFeA&start=0&end=30&playsinline=1&rel=0&cc_load_policy=3&iv_load_policy=3',
    youtube: 'https://youtu.be/gQh4ofhJFeA?si=Zc5jKADfOKNKppSA',
    segmentDuration: 30,
    next: 'stellar-equipement',
  },
};

const selectedSlug = new URLSearchParams(window.location.search).get('project');
const project = projects[selectedSlug] || projects.everesting;
const nextProject = projects[project.next];
const detailFilm = document.getElementById('detail-film');
const detailFrame = document.getElementById('detail-film-frame');
const projectTitle = document.getElementById('project-title');
const projectRow = document.getElementById('detail-project-row');
const detailNext = document.getElementById('detail-next');
const detailNextLabel = document.getElementById('detail-next-label');

const localize = (value, language) => typeof value === 'object' && value !== null ? value[language] || value.fr || '' : value;
const getLanguage = () => window.portfolioLanguage?.getLanguage?.() || 'fr';
const translate = (key) => window.portfolioLanguage?.t?.(key) || key;

detailFrame.classList.toggle('detail-film-frame--four-three', project.detailAspect === 'four-three');
detailFilm.src = project.embed;
detailNext.href = `project.html?project=${project.next}`;
document.getElementById('detail-youtube').href = project.youtube;

const renderProject = (language) => {
  const title = localize(project.title, language);
  const nextTitle = localize(nextProject.title, language);

  document.title = `${title || project.client} — Corentin Boullard`;
  detailFilm.title = title ? `${title} — ${project.client}` : project.client;
  document.getElementById('project-client').textContent = project.client;
  projectTitle.textContent = title;
  projectTitle.hidden = !title;
  document.querySelector('.detail-intro').classList.toggle('detail-intro--without-title', !title);
  document.getElementById('project-description').textContent = localize(project.description, language);
  document.getElementById('detail-client').textContent = project.client;
  document.getElementById('detail-project').textContent = title;
  projectRow.hidden = !title;
  document.querySelector('.detail-meta-list').classList.toggle('detail-meta-list--without-project', !title);
  document.getElementById('detail-format').textContent = localize(project.format, language);
  document.getElementById('detail-directors').textContent = project.directors;
  detailNextLabel.textContent = `${translate('project.nextProject')} — ${nextTitle || nextProject.client}`;
};

renderProject(getLanguage());
window.addEventListener('portfolio:languagechange', (event) => renderProject(event.detail.language));

if (project.segmentDuration) {
  window.setupYouTubeSegmentLoop?.('detail-film', project.segmentDuration);
}

document.getElementById('year').textContent = new Date().getFullYear();
