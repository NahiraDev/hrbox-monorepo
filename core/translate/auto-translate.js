// scripts/auto-translate.js
const fs = require('fs-extra');
const glob = require('glob');
const fetch = require('node-fetch');

const GOOGLE_API_KEY = process.env.GOOGLE_TRANSLATE_API_KEY; // set in CI/env
const TARGET = 'fa';

async function translateText(text) {
  const url = `https://translation.googleapis.com/language/translate/v2?key=${GOOGLE_API_KEY}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({ q: text, target: TARGET, format: 'text' })
  });
  const j = await res.json();
  return j.data && j.data.translations && j.data.translations[0].translatedText;
}

function flatten(obj, prefix = '') {
  const out = {};
  for (const k of Object.keys(obj)) {
    const v = obj[k];
    const key = prefix ? `${prefix}.${k}` : k;
    if (v && typeof v === 'object' && !Array.isArray(v)) {
      Object.assign(out, flatten(v, key));
    } else {
      out[key] = v;
    }
  }
  return out;
}

function unflatten(flat) {
  const result = {};
  for (const key of Object.keys(flat)) {
    const parts = key.split('.');
    let cur = result;
    for (let i=0;i<parts.length;i++){
      const p = parts[i];
      if (i === parts.length-1) cur[p] = flat[key];
      else cur[p] = cur[p] || {};
      cur = cur[p];
    }
  }
  return result;
}

(async () => {
  const files = glob.sync('locales/en/**/*.json');
  for (const file of files) {
    const en = await fs.readJson(file);
    const flat = flatten(en);
    const out = {};
    for (const k of Object.keys(flat)) {
      try {
        const translated = await translateText(String(flat[k]));
        out[k] = translated;
        console.log(`T ${k} -> ${translated}`);
      } catch (e) {
        console.error('translate error', e);
        out[k] = flat[k]; // fallback
      }
    }
    const nested = unflatten(out);
    const targetFile = file.replace('/en/', `/${TARGET}/`);
    await fs.ensureDir(require('path').dirname(targetFile));
    await fs.writeJson(targetFile, nested, { spaces: 2 });
    console.log('Wrote', targetFile);
  }
})();
