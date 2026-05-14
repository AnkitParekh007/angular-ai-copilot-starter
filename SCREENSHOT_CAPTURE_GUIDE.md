# Screenshot Capture Guide

## Run the app

```bash
npm install
npm start
```

Open the local Angular URL printed by the CLI.

## Recommended sizes

- README hero: 1600x900
- feature screenshots: 1200x800
- mobile screenshot: 390x844
- GIF demo: 12 to 20 seconds

## App states to capture

1. `copilot-shell-light.png`
   - default light theme
   - full three-panel shell

2. `copilot-shell-dark.png`
   - toggle dark theme
   - full three-panel shell

3. `streaming-message.png`
   - Ask mode
   - click **Run Demo Flow**
   - capture while the assistant message is streaming

4. `rag-source-cards.png`
   - Plan mode
   - wait until RAG sources appear
   - capture the right panel

5. `tool-call-timeline.png`
   - Execute mode
   - wait until tool calls appear
   - capture the timeline section

6. `action-approval-flow.png`
   - Execute mode
   - capture before approving or rejecting

7. `responsive-mobile.png`
   - resize browser to 390x844
   - capture the responsive layout

## Save location

Save all PNG files to:

```text
docs/assets/screenshots/
```
