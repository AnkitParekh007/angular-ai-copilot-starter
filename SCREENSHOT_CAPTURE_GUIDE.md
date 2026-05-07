# Screenshot Capture Guide

## Run The App

```bash
npm install
npm start
```

Open the local Angular URL printed by the CLI.

## Recommended Sizes

- README hero: 1600x900
- Feature screenshots: 1200x800
- Mobile screenshot: 390x844
- GIF demo: 8-12 seconds

## App States To Capture

1. `copilot-shell-light.png`
   - Use the default light theme.
   - Capture the full three-panel shell.

2. `copilot-shell-dark.png`
   - Toggle dark theme.
   - Capture the full three-panel shell.

3. `streaming-message.png`
   - Click **Run Demo Flow**.
   - Capture while the assistant message is streaming.

4. `rag-source-cards.png`
   - Wait until RAG sources appear.
   - Capture the right panel.

5. `tool-call-timeline.png`
   - Wait until tool calls appear.
   - Capture the timeline section.

6. `action-approval-flow.png`
   - Wait for the approval card.
   - Capture before approving or rejecting.

7. `responsive-mobile.png`
   - Resize browser to 390x844.
   - Capture the responsive layout.

## Save Location

Save all PNG files to:

```text
docs/assets/screenshots/
```

## Update README

The README already references these filenames. Replace the placeholder PNG files
with real captured screenshots using the same names.

## LinkedIn And Portfolio Usage

- Use `copilot-shell-light.png` as the LinkedIn hero image.
- Use `tool-call-timeline.png` for a post about MCP/tool execution UX.
- Use `action-approval-flow.png` for a post about enterprise guardrails.
- Use `responsive-mobile.png` to show frontend quality and polish.
