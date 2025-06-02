import fs from 'fs';
import path from 'path';

function fixFile(filePath) {
  let code = fs.readFileSync(filePath, 'utf8');
  let originalCode = code;

  // Match exactly: "src":"/https:/... (note: single colon after https)
  code = code.replace(/"src":"\/https:\//g, (match) => {
    console.log(`[fix-asset-urls] Replaced in ${filePath}: ${match}`);
    return '"src":"https://';
  });

  // Also try: 'src':'/https:/...
  code = code.replace(/'src':'\/https:\//g, (match) => {
    console.log(`[fix-asset-urls] Replaced in ${filePath}: ${match}`);
    return "'src':'https://";
  });

  // Write file only if changes were made
  if (code !== originalCode) {
    console.log(`[fix-asset-urls] Fixed file: ${filePath}`);
    fs.writeFileSync(filePath, code, 'utf8');
  }
}

function walk(dir) {
  if (!fs.existsSync(dir)) {
    console.log(`[fix-asset-urls] Directory not found: ${dir}`);
    return;
  }
  
  for (const entry of fs.readdirSync(dir)) {
    const fullPath = path.join(dir, entry);
    if (fs.statSync(fullPath).isDirectory()) {
      walk(fullPath);
    } else if (fullPath.endsWith('.js') || fullPath.endsWith('.mjs')) {
      console.log(`[fix-asset-urls] Checking file: ${fullPath}`);
      fixFile(fullPath);
    }
  }
}

console.log('[fix-asset-urls] Starting...');
walk('./dist/_worker.js/pages');
console.log('[fix-asset-urls] Done.');