const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require('playwright');

const baseUrl = process.env.CAPTURE_BASE_URL || 'https://ankitparekh007.github.io/angular-ai-copilot-starter/';
const outputDir = process.env.CAPTURE_OUTPUT_DIR || path.join(process.cwd(), 'public-proof-captures');
fs.mkdirSync(outputDir, { recursive: true });

const manifest = [];

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: 'light', reducedMotion: 'reduce' });
  const page = await context.newPage();

  async function open() {
    const response = await page.goto(baseUrl, { waitUntil: 'domcontentloaded', timeout: 45000 });
    await page.waitForTimeout(1200);
    return response;
  }

  async function screenshot(name) {
    const file = path.join(outputDir, `${name}.png`);
    await page.screenshot({ path: file, fullPage: true });
    manifest.push({ name, file: path.basename(file), url: page.url() });
  }

  async function scenario(name, matcher) {
    await open();
    const control = page.getByRole('button', { name: matcher }).first();
    if (!(await control.count())) {
      manifest.push({ name, skipped: true, reason: `No button matched ${matcher}` });
      return;
    }
    await control.click();
    await page.waitForTimeout(900);
    await screenshot(name);
  }

  const response = await open();
  await screenshot('copilot-default');
  manifest[manifest.length - 1].status = response ? response.status() : null;

  await scenario('copilot-stalled-stream', /(stalled stream|stall.*stream)/i);
  await scenario('copilot-retrieval-failure', /(retrieval failure|retrieval.*fail)/i);
  await scenario('copilot-failed-tool', /failed tool/i);
  await scenario('copilot-approval-rejection', /(approval rejection|reject.*approval|rejected approval)/i);
  await scenario('copilot-recovery-retry', /(retry|recover)/i);

  fs.writeFileSync(path.join(outputDir, 'manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`);
  await browser.close();
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
