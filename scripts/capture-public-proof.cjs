const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require('playwright');

const baseUrl = process.env.CAPTURE_BASE_URL || 'https://ankitparekh007.github.io/angular-ai-copilot-starter/';
const outputDir = process.env.CAPTURE_OUTPUT_DIR || path.join(process.cwd(), 'public-proof-captures');
const viewport = { width: 1440, height: 900 };
fs.mkdirSync(outputDir, { recursive: true });

const manifest = [];
let browser;

(async () => {
  browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport, colorScheme: 'light', reducedMotion: 'reduce' });
  const page = await context.newPage();

  async function open() {
    const response = await page.goto(baseUrl, { waitUntil: 'domcontentloaded', timeout: 45000 });
    await page.getByRole('heading', { name: /copilot workspace/i }).waitFor({ state: 'visible', timeout: 30000 });
    return response;
  }

  async function screenshot(name) {
    const file = path.join(outputDir, `${name}.png`);
    await page.screenshot({ path: file, fullPage: false });
    manifest.push({ name, file: path.basename(file), url: page.url(), viewport });
  }

  async function openRecoveryShowcase() {
    await open();
    const heading = page.getByRole('heading', { name: /failure and recovery showcase/i }).first();
    await heading.waitFor({ state: 'visible', timeout: 30000 });
    await heading.scrollIntoViewIfNeeded();
    await page.waitForTimeout(200);
  }

  async function recoveryScenario(name, matcher, retry = false) {
    await openRecoveryShowcase();
    const control = page.getByRole('button', { name: matcher }).first();
    await control.waitFor({ state: 'visible', timeout: 10000 });
    await control.click();
    await page.waitForTimeout(300);
    if (retry) {
      const retryButton = page.getByRole('button', { name: /retry with prior context/i }).first();
      await retryButton.waitFor({ state: 'visible', timeout: 10000 });
      await retryButton.click();
      await page.waitForTimeout(450);
    }
    await screenshot(name);
  }

  const response = await open();
  await screenshot('copilot-default');
  manifest[manifest.length - 1].status = response ? response.status() : null;

  const runDemo = page.getByRole('button', { name: /^Run Demo Flow$/i }).first();
  await runDemo.waitFor({ state: 'visible', timeout: 10000 });
  await runDemo.click();
  await page.waitForTimeout(2600);
  await screenshot('copilot-happy-path');

  await recoveryScenario('copilot-retrieval-failure', /^Retrieval failure/i);
  await recoveryScenario('copilot-failed-tool', /^Failed tool/i);
  await recoveryScenario('copilot-approval-rejection', /^Rejected approval/i);
  await recoveryScenario('copilot-stalled-stream', /^Stalled stream/i);
  await recoveryScenario('copilot-recovery-retry', /^Stalled stream/i, true);

  fs.writeFileSync(path.join(outputDir, 'manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`);
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
}).finally(async () => {
  if (browser) await browser.close();
});
