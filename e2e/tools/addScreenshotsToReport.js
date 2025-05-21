const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const reportPath = '../reports/report.html';
const screenshotRootDir = '../artifacts';

const getFormattedDate = () => {
  const now = new Date();
  const pad = (num) => String(num).padStart(2, '0');
  return `${pad(now.getDate())}-${pad(now.getMonth() + 1)}-${now.getFullYear()}${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
};

const normalize = str =>
  str
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s]/gi, '')
    .replace(/\s+/g, ' ')
    .trim();

// Read the original report and create a new instance
const html = fs.readFileSync(reportPath, 'utf8');
const $ = cheerio.load(html);

// Process each test result
$('.test-result').each((_, el) => {
  const titleEl = $(el).find('.test-title');
  const testTitleRaw = titleEl.text();
  const testTitleNorm = normalize(testTitleRaw);

  const sessions = fs.readdirSync(screenshotRootDir);
  let found = false;

  for (const session of sessions) {
    const sessionPath = path.join(screenshotRootDir, session);
    if (!fs.lstatSync(sessionPath).isDirectory()) continue;

    const testDirs = fs.readdirSync(sessionPath);
    for (const testDir of testDirs) {
      const testDirNorm = normalize(testDir);
      if (testDirNorm.includes(testTitleNorm)) {
        const testDirPath = path.join(sessionPath, testDir);
        const screenshots = fs.readdirSync(testDirPath)
          .filter(file => file.toLowerCase().endsWith('.png'))
          .sort((a, b) => {
            const aLower = a.toLowerCase();
            const bLower = b.toLowerCase();
            if (aLower.includes('start')) return -1;
            if (bLower.includes('start')) return 1;
            if (aLower.includes('done')) return 1;
            if (bLower.includes('done')) return -1;
            return aLower.localeCompare(bLower);
          });

        if (screenshots.length > 0) {
          const imgContainer = $('<div style="display: flex; gap: 16px; justify-content: center; margin-top: 10px; flex-wrap: wrap;"></div>');

          screenshots.forEach((filename) => {
            const screenshotPath = path.join(testDirPath, filename);
            const relativeImgPath = path.relative(path.dirname(reportPath), screenshotPath);
            
            // Generate a user-friendly label
            const label = filename
              .replace('.png', '')
              .replace(/([A-Z])/g, ' $1')
              .replace(/^./, str => str.toUpperCase())
              .trim();

            const imgBlock = `
              <div style="text-align: center; margin: 8px;">
                <div style="font-weight: bold; margin-bottom: 4px;">${label}</div>
                <img src="${relativeImgPath}" width="300" style="border: 1px solid #ccc; border-radius: 4px;" />
              </div>
            `;

            imgContainer.append(imgBlock);
            found = true;
          });

          if (found) {
            $(el).append(imgContainer);
            console.log(`✅ Imágenes insertadas (${screenshots.length}) para: ${testTitleRaw}`);
            break;
          }
        }
      }
    }
    if (found) break;
  }

  if (!found) {
    console.warn(`⚠️ No se encontraron imágenes para: ${testTitleRaw}`);
  }
});

// Create new report with screenshots while preserving the original
const formattedDate = getFormattedDate();
// const newReportPath = path.join(path.dirname(reportPath), `report-with-screenshots-${formattedDate}.html`);
const newReportPath = path.join(path.dirname(reportPath), `report.html`);

// Save the new report
fs.writeFileSync(newReportPath, $.html());
console.log(`✅ Nuevo reporte HTML creado con imágenes: ${newReportPath}`);