export function normalizeType(value) {
    if (!value) return null;
    return String(value).trim().toLowerCase();
}

export function isValidEmail(courriel) {
    return typeof courriel === "string" && /.+@.+\..+/.test(courriel);
}