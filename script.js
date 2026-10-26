/* =========================================================
   Portfolio Hammadi Lachtouk : script
   - Bascule de langue FR / EN
   - Thème clair / sombre
   - Menu mobile et lien actif dans la navigation
   - Terminal PowerShell interactif
   - Filtre des projets
   - Boutons « Copier »
   ========================================================= */
(function () {
  "use strict";

  const root = document.documentElement;
  // Classe posée dans <head> : absente si l'utilisateur préfère réduire les animations
  const ANIM = root.classList.contains("anim");

  /* ---------- Stockage local (protégé si indisponible) ---------- */
  const store = {
    get(key) {
      try { return localStorage.getItem(key); } catch (e) { return null; }
    },
    set(key, value) {
      try { localStorage.setItem(key, value); } catch (e) { /* ignoré */ }
    }
  };

  /* =========================================================
     1. TRADUCTIONS
     ========================================================= */
  const I18N = {
    fr: {
      "nav.about": "À propos",
      "nav.skills": "Compétences",
      "nav.experience": "Expérience",
      "nav.projects": "Projets",
      "nav.education": "Formation",
      "nav.contact": "Contact",

      "ui.theme": "Changer de thème",
      "ui.menu": "Ouvrir le menu",
      "ui.menuClose": "Fermer le menu",
      "ui.palette": "Changer le style",
      "ui.photos": "Photos",
      "ui.paletteName": "Style",
      "pal.bleu": "Bleu réseau",
      "pal.sarcelle": "Sarcelle",
      "pal.orange": "Orange RJ45",
      "pal.violet": "Violet",
      "pal.framboise": "Framboise",
      "eng.3.alt2": "Tournage de l'interview de Rabea Ridaoui, ancienne présidente de Casamémoire",
      "eng.3.link1": "Publication Instagram 1",
      "eng.3.link2": "Publication Instagram 2",
      "ui.copy": "Copier",
      "ui.copied": "Copié",
      "ui.copyManual": "Ctrl+C",

      "hero.status": "Ouvert aux opportunités · Casablanca",
      "hero.role": "Technicien Informatique & Réseaux",
      "hero.roleShort": "Technicien IT & Réseaux",
      "hero.summary": "Technicien informatique et réseaux en formation, actuellement en stage de maintenance chez CBI. Compétent en administration Windows Server, en réseaux TCP/IP et en support aux utilisateurs. Fiable et autonome, je souhaite rejoindre une équipe IT pour mettre mes compétences en pratique et continuer à progresser.",
      "hero.cta.contact": "Me contacter",
      "hero.cta.projects": "Voir mes projets",
      "hero.cta.cv": "CV (PDF, anglais)",
      "hero.t568b": "Câblage RJ45, norme T568B",
      "hero.photoAlt": "Portrait de Hammadi Lachtouk",

      "console.title": "En ligne de commande",
      "console.intro": "Un petit terminal PowerShell pour découvrir mon profil. Tapez une commande ou utilisez les raccourcis.",
      "term.input": "Commande du terminal",
      "term.placeholder": "help",

      "skills.title": "Compétences",
      "skills.intro": "Les outils et domaines que je pratique en formation et en stage.",
      "skills.systems": "Systèmes",
      "skills.network": "Réseaux",
      "skills.virtual": "Virtualisation",
      "skills.maintenance": "Maintenance",
      "skills.m1": "Matériel",
      "skills.m2": "Installation",
      "skills.m3": "Diagnostic",
      "skills.m4": "Dépannage",
      "skills.m5": "Imprimantes",
      "skills.office": "Bureautique",
      "skills.design": "Design graphique",
      "skills.designArt": "Animation : un tracé à la plume se dessine sur un plan de travail",
      "skills.photo": "Photographie",
      "skills.video": "Vidéo",

      "lang.title": "Langues",
      "lang.ar": "Arabe",
      "lang.native": "Langue maternelle",
      "lang.fr": "Français",
      "lang.en": "Anglais",
      "lang.note": "Niveaux selon le Cadre européen commun de référence (CECRL).",

      "strengths.title": "Qualités",
      "strengths.1": "Organisé et méthodique",
      "strengths.2": "Fiable et responsable",
      "strengths.3": "Esprit d'équipe, empathique",

      "interests.title": "Centres d'intérêt",
      "interests.1": "Nouvelles technologies",
      "interests.2": "Photographie",
      "interests.3": "Football et sports collectifs",
      "interests.4": "Randonnée",

      "exp.title": "Expérience professionnelle",
      "exp.current": "En cours",
      "exp.1.date": "Sept. 2026 – aujourd'hui",
      "exp.1.role": "Technicien de maintenance d'imprimantes (stagiaire)",
      "exp.1.b1": "Diagnostiquer et réparer les pannes matérielles et logicielles des imprimantes",
      "exp.1.b2": "Assurer la maintenance préventive et corrective (nettoyage, remplacement de pièces, réglages)",
      "exp.1.b3": "Installer et configurer des imprimantes réseau (pilotes, adresses IP)",
      "exp.1.b4": "Intervenir sur site et suivre les demandes de réparation des clients",
      "exp.2.date": "2021 – aujourd'hui",
      "exp.2.role": "Professeur de français et d'anglais",
      "exp.2.org": "École de soutien scolaire",
      "exp.2.b1": "Préparer et animer des cours adaptés au niveau de chaque élève",
      "exp.2.b2": "Expliquer clairement des notions complexes et accompagner la progression des élèves",
      "exp.3.date": "Juin – août 2025",
      "exp.3.role": "Caissier",
      "exp.3.b1": "Accueillir les clients et gérer la caisse en respectant les procédures",

      "nav.engagement": "Engagement",
      "eng.title": "Engagement",
      "eng.intro": "Prises de parole, formations et activités avec le monde associatif.",
      "eng.1.alt": "Hammadi Lachtouk prend la parole au micro lors des PathwaysTalks",
      "eng.1.org": "Union européenne au Maroc",
      "eng.1.title": "Intervenant aux PathwaysTalks",
      "eng.1.session": "Session « Insertion des jeunes et employabilité »",
      "eng.1.date": "8 octobre 2026",
      "eng.2.date": "25 octobre 2026",
      "eng.3.date": "Depuis le 21 juillet 2026",
      "eng.1.text": "Invité en tant que bénéficiaire de l'association Al Jisr, j'ai représenté l'association sur scène lors des PathwaysTalks organisés par l'Union européenne au Maroc. J'y ai témoigné de mon parcours de formation et d'insertion professionnelle devant un public de jeunes, d'experts et de partenaires.",
      "eng.1.t1": "Insertion des jeunes",
      "eng.1.t2": "Employabilité",
      "eng.1.t3": "Formation professionnelle",
      "eng.1.t4": "Prise de parole",
      "eng.1.link": "Voir la publication sur Instagram",
      "eng.2.alt": "Hammadi Lachtouk reçoit son certificat du bootcamp CEET for NEET",
      "eng.2.tag": "Certificat obtenu · 25 oct. 2026",
      "eng.2.title": "Bootcamp CEET for NEET",
      "eng.2.session": "Insertion professionnelle des jeunes · Casablanca",
      "eng.2.text": "Bootcamp « Training Enhancing Capacities » consacré à l'entrée dans le monde du travail. J'y ai appris à rédiger un CV adapté aux attentes des recruteurs, à construire un portfolio professionnel et à créer, développer et animer un profil LinkedIn. Le programme couvrait aussi la préparation aux entretiens, les compétences digitales, l'usage de l'IA pour la recherche d'emploi et l'entrepreneuriat.",
      "eng.2.t1": "CV",
      "eng.2.t2": "Portfolio",
      "eng.2.t3": "Entretiens",
      "eng.2.t4": "Compétences digitales",
      "eng.3.alt": "Tournage d'une interview de la série « Personne inspirante »",
      "eng.3.alt3": "Rencontre avec Rabea Ridaoui de Casamémoire, le 21 juillet 2026",
      "eng.3.tag": "2 attestations obtenues",
      "eng.3.title": "Photographe et vidéaste bénévole",
      "eng.3.session": "Série d'interviews « Personne inspirante » · Casablanca",
      "eng.3.text": "Formé aux techniques audiovisuelles et à la réalisation d'interviews par Cinéastes Sans Frontières (projet Inspiring), j'ai filmé et mené les interviews du rendez-vous « Personne inspirante » de l'association Al Jisr. Avec Sami, autre bénéficiaire, j'ai notamment interviewé Rabea Ridaoui, membre et ancienne présidente de Casamémoire, le 21 juillet 2026, sur la sauvegarde du patrimoine architectural du Maroc, puis El Mehdi, doctorant passionné d'astronomie et fondateur du Club Assif.",
      "eng.3.t1": "Tournage d'interviews",
      "eng.3.t2": "Photographie",
      "eng.3.t3": "Patrimoine",
      "eng.3.t4": "Bénévolat",
      "eng.3.cert": "Attestation Cinéastes Sans Frontières, 6 août 2026 · Attestation Casamémoire",

      "proj.title": "Projets",
      "proj.intro": "Travaux pratiques réalisés en formation et missions de stage.",
      "proj.filter": "Filtrer les projets",
      "proj.f.all": "Tous",
      "proj.f.design": "Design",
      "proj.example": "Exemple",
      "proj.internship": "Stage CBI",
      "proj.1.title": "Domaine Active Directory en lab",
      "proj.1.text": "Contrôleur de domaine Windows Server sous VMware Workstation : unités d'organisation, comptes et groupes d'utilisateurs, stratégies de groupe (GPO) appliquées aux postes clients.",
      "proj.2.title": "Services DHCP et DNS",
      "proj.2.text": "Étendue DHCP avec exclusions et réservations, zones DNS directe et inverse, puis vérification de la résolution de noms depuis les postes clients.",
      "proj.3.title": "Plan d'adressage IPv4",
      "proj.3.text": "Découpage d'un réseau /24 en quatre sous-réseaux pour séparer les services d'une petite entreprise, avec tableau d'adressage et tests de connectivité.",
      "proj.4.title": "Mise en service d'imprimantes réseau",
      "proj.4.text": "Installation des pilotes, attribution des adresses IP et mise en service d'imprimantes réseau chez les clients, puis suivi des demandes de réparation.",
      "proj.4.spec": "Pilotes · Adresse IP fixe · Intervention sur site",
      "proj.5.title": "Remise en état d'un poste de travail",
      "proj.5.text": "Diagnostic d'un PC lent : contrôle du matériel, réinstallation de Windows, des pilotes et de la suite bureautique, puis restitution à l'utilisateur.",
      "proj.5.spec": "Matériel · Windows · Pilotes · Office",
      "proj.6.title": "Supports graphiques",
      "proj.6.text": "Affiches et visuels pour les réseaux sociaux réalisés pendant le diplôme de design graphique à l'ANIG.",

      "edu.title": "Formation",
      "edu.inprogress": "En cours",
      "edu.1.title": "Technicien Informatique & Réseaux",
      "edu.2.title": "Diplôme en design graphique",
      "edu.3.title": "Technicien spécialisé en gestion des entreprises",

      "contact.title": "Contact",
      "contact.intro": "Vous avez un stage ou un poste en informatique à pourvoir ? Écrivez-moi ou appelez-moi.",
      "contact.email": "E-mail",
      "contact.phone": "Téléphone",
      "contact.address": "Adresse",
      "contact.addressValue": "Hay El Masjid, Lissasfa, Casablanca, Maroc",

      "footer.made": "Site réalisé en HTML, CSS et JavaScript"
    },

    en: {
      "nav.about": "About",
      "nav.skills": "Skills",
      "nav.experience": "Experience",
      "nav.projects": "Projects",
      "nav.education": "Education",
      "nav.contact": "Contact",

      "ui.theme": "Switch theme",
      "ui.menu": "Open menu",
      "ui.menuClose": "Close menu",
      "ui.palette": "Change style",
      "ui.photos": "Photos",
      "ui.paletteName": "Style",
      "pal.bleu": "Network blue",
      "pal.sarcelle": "Teal",
      "pal.orange": "RJ45 orange",
      "pal.violet": "Violet",
      "pal.framboise": "Raspberry",
      "eng.3.alt2": "Filming the interview with Rabea Ridaoui, former president of Casamémoire",
      "eng.3.link1": "Instagram post 1",
      "eng.3.link2": "Instagram post 2",
      "ui.copy": "Copy",
      "ui.copied": "Copied",
      "ui.copyManual": "Ctrl+C",

      "hero.status": "Open to opportunities · Casablanca",
      "hero.role": "IT & Network Technician",
      "hero.roleShort": "IT & Network Technician",
      "hero.summary": "IT & Network Technician in training, currently completing a maintenance internship at CBI. Skilled in Windows Server administration, TCP/IP networking and user support. Reliable and self-driven, I am looking to join an IT team to apply my skills and keep growing.",
      "hero.cta.contact": "Contact me",
      "hero.cta.projects": "See my projects",
      "hero.cta.cv": "CV (PDF)",
      "hero.t568b": "RJ45 wiring, T568B standard",
      "hero.photoAlt": "Portrait of Hammadi Lachtouk",

      "console.title": "From the command line",
      "console.intro": "A small PowerShell terminal to explore my profile. Type a command or use the shortcuts.",
      "term.input": "Terminal command",
      "term.placeholder": "help",

      "skills.title": "Skills",
      "skills.intro": "The tools and fields I work with in training and on my internship.",
      "skills.systems": "Systems",
      "skills.network": "Networking",
      "skills.virtual": "Virtualization",
      "skills.maintenance": "Maintenance",
      "skills.m1": "Hardware",
      "skills.m2": "Installation",
      "skills.m3": "Diagnostics",
      "skills.m4": "Troubleshooting",
      "skills.m5": "Printers",
      "skills.office": "Office",
      "skills.design": "Graphic design",
      "skills.designArt": "Animation: a pen-tool path being drawn on an artboard",
      "skills.photo": "Photography",
      "skills.video": "Video",

      "lang.title": "Languages",
      "lang.ar": "Arabic",
      "lang.native": "Native",
      "lang.fr": "French",
      "lang.en": "English",
      "lang.note": "Levels based on the Common European Framework of Reference (CEFR).",

      "strengths.title": "Strengths",
      "strengths.1": "Organized and methodical",
      "strengths.2": "Reliable and responsible",
      "strengths.3": "Team player, empathetic",

      "interests.title": "Interests",
      "interests.1": "New technologies",
      "interests.2": "Photography",
      "interests.3": "Football and team sports",
      "interests.4": "Hiking",

      "exp.title": "Professional experience",
      "exp.current": "Current",
      "exp.1.date": "Sept. 2026 – Present",
      "exp.1.role": "Printer Maintenance Technician Intern",
      "exp.1.b1": "Diagnose and fix hardware and software printer faults",
      "exp.1.b2": "Perform preventive and corrective maintenance (cleaning, part replacement, adjustments)",
      "exp.1.b3": "Install and configure network printers (drivers, IP addresses)",
      "exp.1.b4": "Handle on-site interventions and follow up on customer repair requests",
      "exp.2.date": "2021 – Present",
      "exp.2.role": "French and English Teacher",
      "exp.2.org": "Tutoring school",
      "exp.2.b1": "Prepare and deliver lessons tailored to each student's level",
      "exp.2.b2": "Explain complex concepts clearly and support students' progress",
      "exp.3.date": "June – Aug. 2025",
      "exp.3.role": "Cashier",
      "exp.3.b1": "Welcomed customers and managed the cash register following procedures",

      "nav.engagement": "Community",
      "eng.title": "Community involvement",
      "eng.intro": "Public speaking, training and work with the non-profit sector.",
      "eng.1.alt": "Hammadi Lachtouk speaking on stage at PathwaysTalks",
      "eng.1.org": "European Union in Morocco",
      "eng.1.title": "Panelist at PathwaysTalks",
      "eng.1.session": "Session: \"Youth integration and employability\"",
      "eng.1.date": "October 8, 2026",
      "eng.2.date": "October 25, 2026",
      "eng.3.date": "Since July 21, 2026",
      "eng.1.text": "Invited as a beneficiary of the Al Jisr association, I represented the association on stage at the PathwaysTalks organized by the European Union in Morocco. I shared my journey through training and into work with an audience of young people, experts and partners.",
      "eng.1.t1": "Youth integration",
      "eng.1.t2": "Employability",
      "eng.1.t3": "Vocational training",
      "eng.1.t4": "Public speaking",
      "eng.1.link": "View the post on Instagram",
      "eng.2.alt": "Hammadi Lachtouk receiving his CEET for NEET bootcamp certificate",
      "eng.2.tag": "Certificate earned · Oct 25, 2026",
      "eng.2.title": "CEET for NEET bootcamp",
      "eng.2.session": "Youth employment readiness · Casablanca",
      "eng.2.text": "\"Training Enhancing Capacities\" bootcamp focused on entering the job market. I learned to write a CV that meets recruiters' expectations, build a professional portfolio, and create, grow and stay active on LinkedIn. The program also covered interview preparation, digital skills, using AI in the job search, and entrepreneurship.",
      "eng.2.t1": "CV",
      "eng.2.t2": "Portfolio",
      "eng.2.t3": "Interviews",
      "eng.2.t4": "Digital skills",
      "eng.3.alt": "Filming an interview for the \"Inspiring person\" series",
      "eng.3.alt3": "Meeting Rabea Ridaoui of Casamémoire on July 21, 2026",
      "eng.3.tag": "2 certificates earned",
      "eng.3.title": "Volunteer photographer and videographer",
      "eng.3.session": "\"Inspiring person\" interview series · Casablanca",
      "eng.3.text": "Trained in audiovisual techniques and interview production by Cinéastes Sans Frontières (Inspiring project), I filmed and conducted the interviews for the Al Jisr association's \"Inspiring person\" series. With Sami, another beneficiary, I interviewed Rabea Ridaoui, member and former president of Casamémoire, on July 21, 2026, about preserving Morocco's architectural heritage, and El Mehdi, a PhD student passionate about astronomy and founder of Club Assif.",
      "eng.3.t1": "Interview filming",
      "eng.3.t2": "Photography",
      "eng.3.t3": "Heritage",
      "eng.3.t4": "Volunteering",
      "eng.3.cert": "Cinéastes Sans Frontières certificate, Aug 6, 2026 · Casamémoire certificate",

      "proj.title": "Projects",
      "proj.intro": "Hands-on labs from my training and internship assignments.",
      "proj.filter": "Filter projects",
      "proj.f.all": "All",
      "proj.f.design": "Design",
      "proj.example": "Example",
      "proj.internship": "CBI internship",
      "proj.1.title": "Active Directory domain lab",
      "proj.1.text": "Windows Server domain controller on VMware Workstation: organizational units, user accounts and groups, Group Policy Objects (GPO) applied to client machines.",
      "proj.2.title": "DHCP and DNS services",
      "proj.2.text": "DHCP scope with exclusions and reservations, forward and reverse DNS zones, then name resolution checks from client machines.",
      "proj.3.title": "IPv4 addressing plan",
      "proj.3.text": "Splitting a /24 network into four subnets to separate a small company's departments, with an addressing table and connectivity tests.",
      "proj.4.title": "Network printer deployment",
      "proj.4.text": "Installing drivers, assigning IP addresses and commissioning network printers at customer sites, then following up on repair requests.",
      "proj.4.spec": "Drivers · Static IP · On-site support",
      "proj.5.title": "Workstation refurbishment",
      "proj.5.text": "Troubleshooting a slow PC: hardware check, clean Windows reinstall, drivers and office suite, then handover to the user.",
      "proj.5.spec": "Hardware · Windows · Drivers · Office",
      "proj.6.title": "Graphic design work",
      "proj.6.text": "Posters and social media visuals created during the graphic design diploma at ANIG.",

      "edu.title": "Education",
      "edu.inprogress": "In progress",
      "edu.1.title": "IT & Network Technician",
      "edu.2.title": "Diploma in Graphic Design",
      "edu.3.title": "Specialized Technician in Business Management",

      "contact.title": "Contact",
      "contact.intro": "Do you have an IT internship or job opening? Email or call me.",
      "contact.email": "Email",
      "contact.phone": "Phone",
      "contact.address": "Address",
      "contact.addressValue": "Hay El Masjid, Lissasfa, Casablanca, Morocco",

      "footer.made": "Built with HTML, CSS and JavaScript"
    }
  };

  let lang = store.get("lang") === "en" ? "en" : "fr";
  const t = (key) => (I18N[lang] && I18N[lang][key]) || I18N.fr[key] || key;

  function applyLang(next) {
    lang = next;
    root.lang = lang;

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const value = I18N[lang][el.dataset.i18n];
      if (value !== undefined) el.textContent = value;
    });

    // Attributs traduits : data-i18n-attr="aria-label:clé;placeholder:clé"
    document.querySelectorAll("[data-i18n-attr]").forEach((el) => {
      el.dataset.i18nAttr.split(";").forEach((pair) => {
        const [attr, key] = pair.split(":");
        const value = I18N[lang][key];
        if (attr && value !== undefined) el.setAttribute(attr, value);
      });
    });

    document.querySelectorAll(".lang-switch button").forEach((btn) => {
      btn.setAttribute("aria-pressed", String(btn.dataset.lang === lang));
    });

    updateMenuLabel();
    store.set("lang", lang);
    terminal.reset();
  }

  /* =========================================================
     2. THÈME CLAIR / SOMBRE
     ========================================================= */
  const savedTheme = store.get("theme");
  if (savedTheme === "light" || savedTheme === "dark") root.dataset.theme = savedTheme;

  function currentTheme() {
    if (root.dataset.theme === "light" || root.dataset.theme === "dark") return root.dataset.theme;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  document.getElementById("theme-toggle").addEventListener("click", () => {
    const next = currentTheme() === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    store.set("theme", next);
  });

  /* =========================================================
     2 bis. STYLE DE COULEUR : change à chaque visite
     ========================================================= */
  const PALETTES = ["bleu", "sarcelle", "orange", "violet", "framboise"];
  const toast = document.getElementById("palette-toast");
  let paletteIndex = 0;
  let toastTimer = null;

  function setPalette(i) {
    paletteIndex = (i + PALETTES.length) % PALETTES.length;
    const name = PALETTES[paletteIndex];
    if (name === "bleu") delete root.dataset.palette;
    else root.dataset.palette = name;
  }

  function showToast() {
    toast.textContent = t("ui.paletteName") + " : " + t("pal." + PALETTES[paletteIndex]);
    toast.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 1800);
  }

  // Nouvelle visite = style suivant (sinon un style au hasard si le stockage est bloqué)
  (function initPalette() {
    const last = parseInt(store.get("paletteIndex"), 10);
    const next = Number.isNaN(last) ? Math.floor(Math.random() * PALETTES.length) : last + 1;
    setPalette(next);
    store.set("paletteIndex", String(paletteIndex));
  })();

  document.getElementById("palette-toggle").addEventListener("click", (e) => {
    const nextIndex = paletteIndex + 1;
    const apply = () => setPalette(nextIndex);
    paletteIndex = (nextIndex + PALETTES.length) % PALETTES.length;
    root.style.setProperty("--wave-x", e.clientX + "px");
    root.style.setProperty("--wave-y", e.clientY + "px");
    if (ANIM && document.startViewTransition) document.startViewTransition(apply);
    else apply();
    store.set("paletteIndex", String(paletteIndex));
    showToast();
  });

  /* =========================================================
     3. MENU MOBILE + LIEN ACTIF
     ========================================================= */
  const menuBtn = document.getElementById("menu-toggle");
  const navList = document.getElementById("nav-list");

  function setMenu(open) {
    navList.classList.toggle("is-open", open);
    menuBtn.setAttribute("aria-expanded", String(open));
    updateMenuLabel();
  }
  function updateMenuLabel() {
    const open = menuBtn.getAttribute("aria-expanded") === "true";
    menuBtn.setAttribute("aria-label", t(open ? "ui.menuClose" : "ui.menu"));
  }

  menuBtn.addEventListener("click", () => {
    setMenu(menuBtn.getAttribute("aria-expanded") !== "true");
  });
  navList.addEventListener("click", (e) => {
    if (e.target.closest("a")) setMenu(false);
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setMenu(false);
  });
  window.addEventListener("resize", () => {
    if (window.innerWidth > 920) setMenu(false);
  });

  const navLinks = Array.from(navList.querySelectorAll("a"));
  const sections = navLinks
    .map((a) => document.querySelector(a.getAttribute("href")))
    .filter(Boolean);

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((a) => {
          a.classList.toggle("is-active", a.getAttribute("href") === "#" + entry.target.id);
        });
      });
    }, { rootMargin: "-40% 0px -55% 0px" });
    sections.forEach((s) => observer.observe(s));
  }

  /* =========================================================
     4. TERMINAL INTERACTIF
     ========================================================= */
  const terminal = (function () {
    const out = document.getElementById("term-out");
    const body = document.getElementById("term-body");
    const form = document.getElementById("term-form");
    const input = document.getElementById("term-input");
    const PROMPT = "PS C:\\Users\\Hammadi>";
    const history = [];
    let historyIndex = 0;

    // Textes du terminal dans les deux langues
    const TEXT = {
      fr: {
        intro: [
          ["cmd", "whoami"],
          ["", "casablanca\\hammadi · technicien informatique & réseaux"],
          ["cmd", "ping recruteur"],
          ["ok", "Réponse de hammadi : temps<1ms, disponible pour rejoindre une équipe IT"],
          ["dim", "Tapez help pour voir les commandes."]
        ],
        help: [
          ["head", "Commandes disponibles"],
          ["", "  whoami       qui suis-je"],
          ["", "  ipconfig     mon profil en bref"],
          ["", "  skills       compétences techniques"],
          ["", "  experience   parcours professionnel"],
          ["", "  contact      me joindre"],
          ["", "  lang en      passer le site en anglais"],
          ["", "  cls          effacer l'écran"]
        ],
        whoami: [["", "casablanca\\hammadi · technicien informatique & réseaux"]],
        ipconfig: [
          ["head", "Configuration de Hammadi Lachtouk"],
          ["", ""],
          ["", "   Poste recherché . . . . : technicien informatique & réseaux"],
          ["", "   Localisation  . . . . . : Casablanca, Maroc"],
          ["", "   Stage en cours  . . . . : CBI, maintenance d'imprimantes"],
          ["", "   Formation . . . . . . . : AJISR, technicien IT & réseaux"],
          ["", "   Langues . . . . . . . . : arabe, français B2, anglais B2"],
          ["ok", "   Statut  . . . . . . . . : ouvert aux opportunités"]
        ],
        skills: [
          ["", "Systèmes        Windows, Windows Server, Active Directory, GPO"],
          ["", "Réseaux         TCP/IP, IPv4, DNS, DHCP, LAN"],
          ["", "Virtualisation  VMware Workstation"],
          ["", "Maintenance     matériel, diagnostic, dépannage, imprimantes"],
          ["", "Bureautique     Word, Excel, PowerPoint"],
          ["", "Design          Photoshop, Illustrator, Canva"]
        ],
        experience: [
          ["", "2026 → auj.   Stagiaire maintenance d'imprimantes · CBI"],
          ["", "2021 → auj.   Professeur de français et d'anglais"],
          ["", "2025          Caissier · Pomme de Pain"],
          ["ok", "08/10/2026    Intervenant PathwaysTalks · UE au Maroc × Al Jisr"],
          ["ok", "2026          Certificat bootcamp CEET for NEET · Youth for Challenge"],
          ["ok", "2026          Interviews « Personne inspirante » · Al Jisr × Casamémoire"]
        ],
        contact: [
          ["", "E-mail      hammadi.lachtouk.work@gmail.com"],
          ["", "Téléphone   +212 633 98 92 29"],
          ["", "LinkedIn    linkedin.com/in/hammadi-lachtouk-8a3379430"]
        ],
        ping: [["ok", "Réponse de hammadi : temps<1ms, disponible pour rejoindre une équipe IT"]],
        unknown: (cmd) => [["err", "« " + cmd + " » n'est pas reconnu comme nom d'applet de commande. Tapez help."]]
      },
      en: {
        intro: [
          ["cmd", "whoami"],
          ["", "casablanca\\hammadi · IT & network technician"],
          ["cmd", "ping recruiter"],
          ["ok", "Reply from hammadi: time<1ms, available to join an IT team"],
          ["dim", "Type help to see the commands."]
        ],
        help: [
          ["head", "Available commands"],
          ["", "  whoami       who am I"],
          ["", "  ipconfig     my profile at a glance"],
          ["", "  skills       technical skills"],
          ["", "  experience   work history"],
          ["", "  contact      get in touch"],
          ["", "  lang fr      switch the site to French"],
          ["", "  cls          clear the screen"]
        ],
        whoami: [["", "casablanca\\hammadi · IT & network technician"]],
        ipconfig: [
          ["head", "Hammadi Lachtouk configuration"],
          ["", ""],
          ["", "   Target role . . . . . . : IT & network technician"],
          ["", "   Location  . . . . . . . : Casablanca, Morocco"],
          ["", "   Current internship  . . : CBI, printer maintenance"],
          ["", "   Training  . . . . . . . : AJISR, IT & network technician"],
          ["", "   Languages . . . . . . . : Arabic, French B2, English B2"],
          ["ok", "   Status  . . . . . . . . : open to opportunities"]
        ],
        skills: [
          ["", "Systems         Windows, Windows Server, Active Directory, GPO"],
          ["", "Networking      TCP/IP, IPv4, DNS, DHCP, LAN"],
          ["", "Virtualization  VMware Workstation"],
          ["", "Maintenance     hardware, diagnostics, troubleshooting, printers"],
          ["", "Office          Word, Excel, PowerPoint"],
          ["", "Design          Photoshop, Illustrator, Canva"]
        ],
        experience: [
          ["", "2026 → now    Printer maintenance intern · CBI"],
          ["", "2021 → now    French and English teacher"],
          ["", "2025          Cashier · Pomme de Pain"],
          ["ok", "10/08/2026    PathwaysTalks panelist · EU in Morocco × Al Jisr"],
          ["ok", "2026          CEET for NEET bootcamp certificate · Youth for Challenge"],
          ["ok", "2026          Inspiring person interviews · Al Jisr × Casamémoire"]
        ],
        contact: [
          ["", "Email       hammadi.lachtouk.work@gmail.com"],
          ["", "Phone       +212 633 98 92 29"],
          ["", "LinkedIn    linkedin.com/in/hammadi-lachtouk-8a3379430"]
        ],
        ping: [["ok", "Reply from hammadi: time<1ms, available to join an IT team"]],
        unknown: (cmd) => [["err", "The term '" + cmd + "' is not recognized as a cmdlet name. Type help."]]
      }
    };

    // Alias acceptés (français et anglais)
    const ALIASES = {
      help: "help", aide: "help", "?": "help",
      whoami: "whoami",
      ipconfig: "ipconfig", "ipconfig /all": "ipconfig",
      skills: "skills", competences: "skills", "compétences": "skills",
      experience: "experience", "expérience": "experience",
      contact: "contact",
      cls: "cls", clear: "cls", effacer: "cls"
    };

    function line(type, text) {
      const p = document.createElement("p");
      if (type === "cmd") {
        const span = document.createElement("span");
        span.className = "t-prompt";
        span.textContent = PROMPT;
        p.append(span, " " + text);
      } else {
        if (type) p.className = "t-" + type;
        p.textContent = text === "" ? "\u00a0" : text;
      }
      out.appendChild(p);
      return p;
    }

    // Affiche des lignes ; avec animation, elles apparaissent en cascade
    function print(lines, animate) {
      lines.forEach(([type, text], i) => {
        const p = line(type, text);
        if (animate && ANIM) {
          p.classList.add("new");
          p.style.animationDelay = i * 40 + "ms";
        }
      });
      body.scrollTop = body.scrollHeight;
    }

    // Introduction \u00ab tap\u00e9e \u00bb au clavier quand le terminal appara\u00eet
    let introToken = 0;
    let introPlaying = false;
    const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    async function playIntro() {
      const token = ++introToken;
      introPlaying = true;
      out.textContent = "";
      for (const [type, text] of TEXT[lang].intro) {
        if (token !== introToken) return;
        if (type === "cmd") {
          const node = line("cmd", "").lastChild;
          await wait(350);
          for (const ch of text) {
            if (token !== introToken) return;
            node.data += ch;
            await wait(45 + Math.random() * 50);
          }
          await wait(280);
        } else {
          print([[type, text]], true);
          await wait(160);
        }
        body.scrollTop = body.scrollHeight;
      }
      if (token === introToken) introPlaying = false;
    }

    function finishIntro() {
      introToken += 1;
      introPlaying = false;
      out.textContent = "";
      print(TEXT[lang].intro);
    }

    function run(raw) {
      const cmd = raw.trim();
      const key = cmd.toLowerCase();
      const text = TEXT[lang];

      if (introPlaying) finishIntro();
      line("cmd", cmd);
      if (!cmd) { body.scrollTop = body.scrollHeight; return; }

      history.push(cmd);
      historyIndex = history.length;

      if (key === "lang en" || key === "lang fr") {
        applyLang(key.slice(-2));
        return;
      }
      if (key.startsWith("ping")) { print(text.ping, true); return; }

      const action = ALIASES[key];
      if (action === "cls") { out.textContent = ""; return; }
      if (action) { print(text[action], true); return; }
      print(text.unknown(cmd), true);
    }

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      run(input.value);
      input.value = "";
    });

    input.addEventListener("keydown", (e) => {
      if (e.key === "ArrowUp" && historyIndex > 0) {
        historyIndex -= 1;
        input.value = history[historyIndex];
        e.preventDefault();
      } else if (e.key === "ArrowDown") {
        historyIndex = Math.min(history.length, historyIndex + 1);
        input.value = history[historyIndex] || "";
        e.preventDefault();
      }
    });

    // Un clic dans la console place le curseur dans le champ (sauf sélection de texte)
    body.addEventListener("click", () => {
      const selection = window.getSelection();
      if (!selection || selection.isCollapsed) input.focus({ preventScroll: true });
    });

    document.querySelectorAll(".term-chips [data-cmd]").forEach((btn) => {
      btn.addEventListener("click", () => run(btn.dataset.cmd));
    });

    return {
      reset: finishIntro,
      playIntro
    };
  })();

  /* =========================================================
     5. FILTRE DES PROJETS
     ========================================================= */
  const filterButtons = document.querySelectorAll(".filters [data-filter]");
  const projects = document.querySelectorAll(".project");

  const matches = (card, filter) => filter === "all" || card.dataset.cat === filter;
  let filterTimer = null;

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const filter = btn.dataset.filter;
      filterButtons.forEach((b) => b.setAttribute("aria-pressed", String(b === btn)));

      if (!ANIM) {
        projects.forEach((card) => { card.hidden = !matches(card, filter); });
        return;
      }

      // 1. Les cartes qui partent rétrécissent et s'effacent
      const leaving = Array.from(projects).filter((c) => !c.hidden && !matches(c, filter));
      leaving.forEach((card) => {
        card.animate(
          [{ opacity: 1, transform: "scale(1)" }, { opacity: 0, transform: "scale(0.9)" }],
          { duration: 170, easing: "ease-in", fill: "forwards" }
        );
      });

      // 2. Puis les cartes retenues réapparaissent en cascade
      clearTimeout(filterTimer);
      filterTimer = setTimeout(() => {
        let k = 0;
        projects.forEach((card) => {
          // annule l'effacement précédent (les animations CSS ont un animationName)
          card.getAnimations().forEach((a) => { if (!("animationName" in a)) a.cancel(); });
          card.hidden = !matches(card, filter);
          if (card.hidden) return;
          card.animate(
            [
              { opacity: 0, transform: "perspective(900px) translateY(18px) scale(0.94)" },
              { opacity: 1, transform: "perspective(900px) translateY(0) scale(1)" }
            ],
            { duration: 480, delay: k * 70, easing: "cubic-bezier(0.25, 1.3, 0.45, 1)", fill: "backwards" }
          );
          k += 1;
        });
      }, leaving.length ? 180 : 0);
    });
  });

  /* =========================================================
     5 bis. DIAPORAMA DES CARTES PHOTO
     ========================================================= */
  document.querySelectorAll(".event-media--slides").forEach((box) => {
    const slides = Array.from(box.querySelectorAll(".slide"));
    const dots = Array.from(box.querySelectorAll(".slide-dots button"));
    let current = 0;
    let timer = null;
    const show = (i) => {
      current = (i + slides.length) % slides.length;
      slides.forEach((s, k) => s.classList.toggle("is-active", k === current));
      dots.forEach((d, k) => d.setAttribute("aria-pressed", String(k === current)));
    };
    const start = () => {
      if (!ANIM) return;
      clearInterval(timer);
      timer = setInterval(() => show(current + 1), 4500);
    };
    dots.forEach((d, k) => d.addEventListener("click", () => { show(k); start(); }));
    box.addEventListener("pointerenter", () => clearInterval(timer));
    box.addEventListener("pointerleave", start);
    start();
  });

  /* =========================================================
     6. BOUTONS « COPIER »
     ========================================================= */
  function selectText(el) {
    const range = document.createRange();
    range.selectNodeContents(el);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
  }

  document.querySelectorAll(".copy-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const value = btn.dataset.copy;
      const target = btn.parentElement.querySelector(".contact-value");

      const done = (label) => {
        btn.textContent = t(label);
        btn.classList.toggle("is-done", label === "ui.copied");
        clearTimeout(btn._timer);
        btn._timer = setTimeout(() => {
          btn.textContent = t("ui.copy");
          btn.classList.remove("is-done");
        }, 2000);
      };
      const fallback = () => { if (target) selectText(target); done("ui.copyManual"); };

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(value).then(() => done("ui.copied")).catch(fallback);
      } else {
        fallback();
      }
    });
  });

  /* =========================================================
     7. ANIMATIONS
     ========================================================= */

  // Nom « décodé » : chaque lettre défile avant de se fixer
  function scramble(el, delay, duration) {
    const finalText = el.textContent;
    const UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&/<>";
    const LOWER = "abcdefghijklmnopqrstuvwxyz0123456789#%&/<>";
    const start = performance.now() + delay;
    let lastSwap = 0;

    function frame(now) {
      const t = now - start;
      if (t < 0) { requestAnimationFrame(frame); return; }
      if (t >= duration) { el.textContent = finalText; return; }
      if (now - lastSwap > 45) {
        lastSwap = now;
        let text = "";
        for (let i = 0; i < finalText.length; i++) {
          const settleAt = duration * 0.35 + (i / finalText.length) * duration * 0.65;
          const ch = finalText[i];
          if (t >= settleAt || ch === " ") {
            text += ch;
          } else {
            const set = ch === ch.toLowerCase() ? LOWER : UPPER;
            text += set[Math.floor(Math.random() * set.length)];
          }
        }
        el.textContent = text;
      }
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  // Texte tapé : la partie restante reste invisible pour éviter tout saut de mise en page
  function typeText(el, delay, speed) {
    const full = el.textContent;
    const typed = document.createElement("span");
    const ghost = document.createElement("span");
    typed.className = "typed";
    ghost.className = "ghost";
    ghost.textContent = full;
    el.textContent = "";
    el.append(typed, ghost);
    el.classList.add("is-typing");

    let i = 0;
    setTimeout(function step() {
      if (!typed.isConnected) { el.classList.remove("is-typing"); return; } // langue changée
      i += 1;
      typed.textContent = full.slice(0, i);
      ghost.textContent = full.slice(i);
      if (i < full.length) {
        setTimeout(step, speed);
      } else {
        setTimeout(() => {
          if (typed.isConnected) el.textContent = full;
          el.classList.remove("is-typing");
        }, 1200);
      }
    }, delay);
  }

  // Index utilisés par le CSS pour décaler les animations en cascade
  function setIndexes() {
    document.querySelectorAll("[data-reveal]").forEach((container) => {
      Array.from(container.children).forEach((child, i) => child.style.setProperty("--i", i));
    });
    document.querySelectorAll(".tags, .plain-list, .job-body ul, .cefr").forEach((list) => {
      Array.from(list.children).forEach((child, i) => child.style.setProperty("--t", i));
    });
    document.querySelectorAll(".cefr-list > li").forEach((li, i) => li.style.setProperty("--r", i));
  }

  // Apparition au défilement
  function setupReveal() {
    const targets = document.querySelectorAll("[data-reveal]");
    const show = (el) => {
      el.classList.add("is-in");
      if (el.id === "terminal") terminal.playIntro();
    };

    if (!("IntersectionObserver" in window)) {
      targets.forEach(show);
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        show(entry.target);
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -8% 0px" });
    targets.forEach((el) => observer.observe(el));
  }

  // Barre de progression de lecture (couleurs des paires RJ45)
  function setupProgress() {
    const header = document.querySelector(".site-header");
    let ticking = false;
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      header.style.setProperty("--progress", max > 0 ? Math.min(1, window.scrollY / max).toFixed(4) : 0);
      ticking = false;
    };
    window.addEventListener("scroll", () => {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }, { passive: true });
    update();
  }

  // Cartes projet : inclinaison 3D et halo qui suivent la souris
  function setupTilt() {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    projects.forEach((card) => {
      card.addEventListener("pointermove", (e) => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width;
        const y = (e.clientY - r.top) / r.height;
        card.style.setProperty("--ry", ((x - 0.5) * 8).toFixed(2) + "deg");
        card.style.setProperty("--rx", ((0.5 - y) * 8).toFixed(2) + "deg");
        card.style.setProperty("--mx", (x * 100).toFixed(1) + "%");
        card.style.setProperty("--my", (y * 100).toFixed(1) + "%");
      });
      card.addEventListener("pointerleave", () => {
        ["--rx", "--ry", "--mx", "--my"].forEach((p) => card.style.removeProperty(p));
      });
    });
  }

  /* =========================================================
     8. DÉMARRAGE
     ========================================================= */
  document.querySelectorAll(".lang-switch button").forEach((btn) => {
    btn.addEventListener("click", () => applyLang(btn.dataset.lang));
  });

  document.getElementById("year").textContent = new Date().getFullYear();
  applyLang(lang);

  if (ANIM) {
    setIndexes();
    setupReveal();
    setupProgress();
    setupTilt();
    document.querySelectorAll("[data-scramble]").forEach((el, i) => scramble(el, 350 + i * 180, 900));
    document.querySelectorAll("[data-typing]").forEach((el) => typeText(el, 900, 38));
  } else {
    setupProgress();
  }
  window.__animReady = true;
})();
