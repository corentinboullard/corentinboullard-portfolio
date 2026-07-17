(() => {
  const translations = {
    fr: {
      meta: {
        homeTitle: 'Corentin Boullard — Réalisateur',
        homeDescription: 'Portfolio de Corentin Boullard — réalisateur et créateur de contenu vidéo.',
        projectTitle: 'Projet vidéo — Corentin Boullard',
        projectDescription: 'Projet vidéo — Corentin Boullard.',
      },
      language: { aria: 'Choisir la langue' },
      navigation: { aria: 'Navigation principale', home: 'Accueil', backHome: 'Retour à l’accueil' },
      nav: { work: 'Projets', about: 'À propos', contact: 'Contact' },
      hero: {
        line1: 'Réalisateur & créateur de contenu vidéo.',
        line2: 'Films, campagnes ads & histoires humaines.',
        line3: 'Disponible partout.',
      },
      work: { heading: 'Derniers projets', ariaTitle: 'Corentin Boullard — derniers projets', viewProject: 'Voir le projet' },
      about: {
        eyebrow: 'À propos',
        title: 'Je réalise des films et des campagnes ads centrés sur le mouvement, l’effort et les histoires humaines.',
        noteLine1: 'Basé en France, disponible partout.',
        noteLine2: 'Campagnes ads, direction, image & récit.',
      },
      contact: { eyebrow: 'Échangeons' },
      localFile: {
        aria: 'Lecture des vidéos',
        lead: 'Pour lire les films :',
        link: 'ouvrir le portfolio via localhost',
      },
      project: {
        filmAria: 'Film du projet',
        info: 'Infos',
        client: 'Client',
        project: 'Projet',
        format: 'Format',
        directors: 'Réalisateurs',
        fullFilm: 'Voir le film complet',
        nextProject: 'Projet suivant',
        linksAria: 'Liens du projet',
      },
      projects: { pyrene: { title: 'La meilleure nutrition c’est celle qui s’oublie' } },
    },
    en: {
      meta: {
        homeTitle: 'Corentin Boullard — Director',
        homeDescription: 'Portfolio of Corentin Boullard — film director and video content creator.',
        projectTitle: 'Video project — Corentin Boullard',
        projectDescription: 'Video project — Corentin Boullard.',
      },
      language: { aria: 'Choose language' },
      navigation: { aria: 'Main navigation', home: 'Home', backHome: 'Back to home' },
      nav: { work: 'Work', about: 'About', contact: 'Contact' },
      hero: {
        line1: 'Film director & video content creator.',
        line2: 'Films, ad campaigns & human stories.',
        line3: 'Available worldwide.',
      },
      work: { heading: 'Latest work', ariaTitle: 'Corentin Boullard — latest work', viewProject: 'View project' },
      about: {
        eyebrow: 'About',
        title: 'I direct films and ad campaigns centered on movement, effort and human stories.',
        noteLine1: 'Based in France, available worldwide.',
        noteLine2: 'Ad campaigns, direction, cinematography & storytelling.',
      },
      contact: { eyebrow: 'Start a conversation' },
      localFile: {
        aria: 'Video playback',
        lead: 'To play the films:',
        link: 'open the portfolio via localhost',
      },
      project: {
        filmAria: 'Project film',
        info: 'Details',
        client: 'Client',
        project: 'Project',
        format: 'Format',
        directors: 'Directors',
        fullFilm: 'Watch the full film',
        nextProject: 'Next project',
        linksAria: 'Project links',
      },
      projects: { pyrene: { title: 'The Best Nutrition Is the One You Forget About' } },
    },
  };

  const storageKey = 'corentin-boullard-language';
  let language = 'fr';

  try {
    const savedLanguage = window.localStorage.getItem(storageKey);
    if (savedLanguage === 'en' || savedLanguage === 'fr') language = savedLanguage;
  } catch {
    // La langue française reste la valeur par défaut si le stockage est indisponible.
  }

  const translate = (key, selectedLanguage = language) => key.split('.').reduce((value, part) => value?.[part], translations[selectedLanguage]) || key;

  const applyPageMetadata = () => {
    const page = document.body?.dataset.page;
    const description = document.querySelector('meta[name="description"]');

    if (page === 'home') {
      document.title = translate('meta.homeTitle');
      if (description) description.setAttribute('content', translate('meta.homeDescription'));
    }

    if (page === 'project') {
      document.title = translate('meta.projectTitle');
      if (description) description.setAttribute('content', translate('meta.projectDescription'));
    }
  };

  const applyTranslations = () => {
    document.documentElement.lang = language;
    document.documentElement.dataset.language = language;

    document.querySelectorAll('[data-i18n]').forEach((element) => {
      element.textContent = translate(element.dataset.i18n);
    });

    document.querySelectorAll('[data-i18n-aria]').forEach((element) => {
      element.setAttribute('aria-label', translate(element.dataset.i18nAria));
    });

    document.querySelectorAll('[data-i18n-title]').forEach((element) => {
      element.setAttribute('title', translate(element.dataset.i18nTitle));
    });

    document.querySelectorAll('[data-language]').forEach((button) => {
      button.setAttribute('aria-pressed', String(button.dataset.language === language));
    });

    applyPageMetadata();
  };

  const setLanguage = (nextLanguage) => {
    if (nextLanguage !== 'fr' && nextLanguage !== 'en') return;

    language = nextLanguage;
    try {
      window.localStorage.setItem(storageKey, language);
    } catch {
      // Le changement reste actif pendant la visite si le stockage est indisponible.
    }

    applyTranslations();
    window.dispatchEvent(new CustomEvent('portfolio:languagechange', { detail: { language } }));
  };

  window.portfolioLanguage = { getLanguage: () => language, setLanguage, t: translate };

  document.querySelectorAll('[data-language]').forEach((button) => {
    button.addEventListener('click', () => setLanguage(button.dataset.language));
  });

  applyTranslations();
})();
