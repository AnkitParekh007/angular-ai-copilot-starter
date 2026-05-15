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

1. `hero.png`
   - light theme
   - three-panel shell fully visible
   - use the most recruiter-friendly state with messages, sources, and timeline all populated

2. `copilot-shell-light.png`
   - default light theme
   - full three-panel shell

3. `copilot-shell-dark.png`
   - toggle dark theme
   - full three-panel shell

4. `ask-mode.png`
   - Ask mode
   - click **Run Demo Flow**
   - capture while the assistant message is streaming

5. `plan-mode.png`
   - Plan mode selected
   - show the proposed plan and right-side supporting context

6. `rag-source-cards.png`
   - Plan mode
   - wait until RAG sources appear
   - capture the right panel

7. `tool-call-timeline.png`
   - Execute mode
   - wait until tool calls appear
   - capture the timeline section

8. `approval-card.png`
   - Execute mode
   - focus on the approval card with action summary, risk, and approve/reject controls

9. `action-approval-flow.png`
   - Execute mode
   - capture before approving or rejecting

10. `responsive-mobile.png`
   - resize browser to 390x844
   - capture the responsive layout

11. `demo-walkthrough.gif`
   - 12 to 20 seconds
   - sequence: Ask mode -> Plan mode -> RAG cards -> Execute mode -> approval card -> tool timeline
   - keep the cursor movement deliberate and minimal

## Save location

Save all PNG files to:

```text
docs/assets/screenshots/
```
