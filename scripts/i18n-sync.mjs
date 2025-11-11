import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';

const SRC_LANG = 'en';
const TARGET_LANGS = ['fa'];

const baseDir = path.resolve('core/translate');
const translateCache = new Map();

const GOOGLE_TRANSLATE_API_KEY = process.env.GOOGLE_TRANSLATE_API_KEY;
const IS_DEV = process.env.NODE_ENV === 'development';

async function translate(text, targetLang) {
  if (!text?.trim()) return text;
  if (translateCache.has(`${targetLang}:${text}`))
    return translateCache.get(`${targetLang}:${text}`);

  let translated = text;

  if (!GOOGLE_TRANSLATE_API_KEY) {
    // حالت develop بدون API key
    translated = `${text} (${targetLang})`;
  } else {
    try {
      const res = await fetch(
        `https://translation.googleapis.com/language/translate/v2?key=${GOOGLE_TRANSLATE_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ q: text, target: targetLang }),
        }
      );
      const data = await res.json();
      translated = data?.data?.translations?.[0]?.translatedText || text;
    } catch (err) {
      console.warn(`⚠️ Translation failed for "${text}" → ${err.message}`);
    }
  }

  translateCache.set(`${targetLang}:${text}`, translated);
  return translated;
}

async function syncLang(targetLang) {
  const srcPath = path.join(baseDir, SRC_LANG, 'common.json');
  const targetPath = path.join(baseDir, targetLang, 'common.json');

  if (!fs.existsSync(srcPath)) throw new Error(`Missing source ${srcPath}`);
  if (!fs.existsSync(targetPath)) fs.writeFileSync(targetPath, '{}', 'utf8');

  const en = JSON.parse(fs.readFileSync(srcPath, 'utf8'));
  const target = JSON.parse(fs.readFileSync(targetPath, 'utf8'));

  let changed = false;

  for (const [key, value] of Object.entries(en)) {
    if (!target[key]) {
      const t = await translate(value, targetLang);
      target[key] = t;
      changed = true;
      console.log(`🌐 ${SRC_LANG} → ${targetLang}: ${key} = "${t}"`);
    }
  }

  if (changed) {
    fs.writeFileSync(targetPath, JSON.stringify(target, null, 2), 'utf8');
    console.log(`✅ ${targetLang} translations updated`);
  } else {
    console.log(`✅ ${targetLang} up-to-date`);
  }
}

async function main() {
  try {
    console.log(`🔁 i18n Sync (${IS_DEV ? 'dev' : 'prod'})`);
    for (const lang of TARGET_LANGS) await syncLang(lang);
    console.log('✅ i18n sync completed');
  } catch (e) {
    console.error('❌ i18n sync failed:', e);
  }
}

main();
