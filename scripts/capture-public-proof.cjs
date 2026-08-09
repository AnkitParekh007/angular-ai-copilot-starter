const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require('playwright');

const baseUrl = process.env.CAPTURE_BASE_URL || 'https://ankitparekh007.github.io/angular-ai-copilot-starter/';
const outputDir = process.env.CAPTURE_OUTPUT_DIR || path.join(process.cwd(), 'public-proof-captures');
const viewport = { width: 1440, height: 900 };
fs.mkdirSync(outputDir, { recursive: true });

const manifest = [];

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport, colorScheme: 'light', reducedMotion: 'reduce' });
  const page = await context.newPage();

  async function open() {
    const response = await page.goto(baseUrl, { waitUntil: 'domcontentloaded', timeout: 45000 });
    await page.waitForTimeout(1200);
    return response;
  }

  async function screenshot(name) {
    const file = path.join(outputDir, `${name}.png`);
    await page.screenshot({ path: file, fullPage: false });
    manifest.push({ name, file: path.basename(file), url: page.url(), viewport });
  }

  async function scenario(name, matcher, waitMs = 1000) {
    await open();
    const control = page.getByRole('button', { name: matcher }).first();
    if (!(await control.count())) {
      manifest.push({ name, skipped: true, reason: `No button matched ${matcher}` });
      return;
    }
    await control.click();
    await page.waitForTimeout(waitMs);
    await screenshot(name);
  }

  const response = await open();
  await screenshot('copilot-default');
  manifest[manifest.length - 1].status = response ? response.status() : null;

  await scenario('copilot-happy-path', /(run demo flow|run demo|start demo)/i, 2600);
  await scenario('copilot-retrieval-failure', /^Retrieval failure/i);
  await scenario('copilot-failed-tool', /^Failed tool/i);
  await scenario('copilot-approval-rejection', /^Rejected approval/i);
  await scenario('copilot-stalled-stream', /^Stalled stream/i);

  await open();
  const stalled = page.getByRole('button', { name: /^Stalled stream/i }).first();
  if (await stalled.count()) {
    await stalled.click();
    await page.waitForTimeout(250);
    const retry = page.getByRole('button', { name: /retry with prior context/i }).first();
    if (await retry.count()) {
      await retry.click();
      await page.waitForTimeout(550);
      await screenshot('copilot-recovery-retry');
    } else {
      manifest.push({ name: 'copilot-recovery-retry', skipped: true, reason: 'Retry control unavailable' });
    }
  }

  fs.writeFileSync(path.join(outputDir, 'manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`);
  await browser.close();
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
