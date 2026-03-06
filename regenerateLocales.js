/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');

// Read English as source of truth
const en = JSON.parse(fs.readFileSync(path.join(__dirname, 'messages/en.json'), 'utf-8'));

// Get all keys from English
function getKeys(obj, prefix = '') {
    let keys = [];
    for (const [k, v] of Object.entries(obj)) {
        const full = prefix ? `${prefix}.${k}` : k;
        if (typeof v === 'object' && v !== null) {
            keys = keys.concat(getKeys(v, full));
        } else {
            keys.push(full);
        }
    }
    return keys;
}

// Set a nested value
function setNested(obj, path, value) {
    const parts = path.split('.');
    let cur = obj;
    for (let i = 0; i < parts.length - 1; i++) {
        if (!cur[parts[i]]) cur[parts[i]] = {};
        cur = cur[parts[i]];
    }
    cur[parts[parts.length - 1]] = value;
}

function getNested(obj, path) {
    return path.split('.').reduce((o, k) => o && o[k], obj);
}

// For each non-English locale, ensure it has all the same keys.
// Keep existing values where they exist and match the new structure.
// For missing keys, copy English.
const localeFiles = ['de', 'uz', 'ru', 'fr', 'es', 'ar', 'zh', 'ko', 'tr'];
const enKeys = getKeys(en);

for (const locale of localeFiles) {
    const filePath = path.join(__dirname, `messages/${locale}.json`);
    let existing = {};
    try {
        existing = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    } catch {
        // File doesn't exist or is invalid, start fresh
    }

    const result = {};
    for (const key of enKeys) {
        const existingVal = getNested(existing, key);
        // Use existing translation if available, otherwise fall back to English
        setNested(result, key, existingVal || getNested(en, key));
    }

    fs.writeFileSync(filePath, JSON.stringify(result, null, 2), 'utf-8');
    console.log(`✅ ${locale}.json — ${enKeys.length} keys synced`);
}

console.log(`\nDone! All locales synced with en.json structure (${enKeys.length} keys)`);

