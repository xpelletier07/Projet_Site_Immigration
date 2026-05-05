export const IconBuilding = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0b1f3a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="10" width="18" height="11" /><path d="M12 2L3 10h18L12 2z" />
    </svg>
);

export const IconBriefcase = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0b1f3a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
    </svg>
);

export const IconGraduate = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0b1f3a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
);

export const IconUsers = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0b1f3a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
);

export const IconCpu = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0b1f3a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="4" width="16" height="16" rx="2" /><rect x="9" y="9" width="6" height="6" /><line x1="9" y1="2" x2="9" y2="4" /><line x1="15" y1="2" x2="15" y2="4" /><line x1="9" y1="20" x2="9" y2="22" /><line x1="15" y1="20" x2="15" y2="22" /><line x1="20" y1="9" x2="22" y2="9" /><line x1="20" y1="14" x2="22" y2="14" /><line x1="2" y1="9" x2="4" y2="9" /><line x1="2" y1="14" x2="4" y2="14" />
    </svg>
);

export const IconShield = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0b1f3a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
);

export const IconHeadset = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0b1f3a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 18v-6a9 9 0 0 1 18 0v6" /><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3z" /><path d="M3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
    </svg>
);

export const IconBell = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
);

// eslint-disable-next-line react-refresh/only-export-components
export const pathways = [
    { icon: <IconBuilding />, title: "Résidence Permanente", desc: "Établissez-vous durablement et profitez de tous les droits civiques et sociaux de la nation.", delay: "8 – 12 Mois" },
    { icon: <IconBriefcase />, title: "Travail Temporaire", desc: "Contribuez à l'économie nationale par vos talents et votre expertise professionnelle.", delay: "4 – 6 Semaines" },
    { icon: <IconGraduate />, title: "Études & Recherche", desc: "Accédez à nos institutions d'élite pour vos recherches et votre formation supérieure.", delay: "3 – 5 Semaines" },
    { icon: <IconUsers />, title: "Regroupement Familial", desc: "Réunissez vos proches dans un environnement stable et sécurisé pour votre famille.", delay: "6 – 9 Mois" },
];