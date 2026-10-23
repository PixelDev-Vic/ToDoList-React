# Daybook — To-do list

A small React to-do app for the DCIT 26 Laboratory 3 assignment. It uses client-side routes, Tailwind CSS, Solar Icons, browser local storage, and the platform system font stack. On Apple devices the stack uses San Francisco when available; on Windows it falls back to Segoe UI. The app starts with no groups or tasks. Items you add are saved in this browser on this device.

## Requirements

- Node.js with npm
- A current browser

## Install and run

From the project folder:

```bash
npm install
npm run dev
```

Open the local URL printed by Vite. To make and preview a production build:

```bash
npm run build
npm run preview
```

## Project structure

```text
src/
  components/  Shared navigation, layout, task form/list, group cards, notes editor, delete dialog, and summary
  data/        ID generation
  pages/       Dashboard, groups, group tasks, guide, developers, and fallback pages
  App.jsx      Shared React state and BrowserRouter route definitions
  main.jsx     React entry point
  index.css    Tailwind import, color tokens, focus styles, and motion preferences
public/
  _redirects  Netlify fallback for client-side routes
vercel.json   Vercel rewrite for client-side routes
```

## How it works

- **Workspace data:** `App.jsx` starts with empty groups and tasks, then saves user-entered data to local storage. Dashboard totals are derived from tasks, so additions, completion changes, reopening, and deletion update the counts automatically.
- **Event handling:** Forms validate trimmed input before adding items. Selecting a task opens a notepad-style editor for its description and optional time; changes save automatically. Task buttons toggle completion or delete a task. Groups can be deleted from the Groups page or their detail page; deleting a group also deletes its tasks after a confirmation that shows the task count. Undo restores a deleted task or restores a deleted group with its tasks.
- **Reusable components:** `TaskForm`, `TaskList`, `GroupCard`, `StatSummary`, and the shared app shell keep repeated UI consistent.
- **Routing:** `BrowserRouter`, `Routes`, `Route`, `Link`, and `NavLink` provide the required paths and client-side navigation. `/groups/:groupId` filters tasks by the route ID and displays a helpful state for unknown IDs.
- **Solar Icons:** Components use narrow, Linear-style imports from `@solar-icons/react`; controls have visible text or accessible labels.
- **Visual style:** The app uses the platform system font stack with a white, pale blue, and royal blue palette.
- **Developers:** The page includes explicit placeholders because member names and contributions were not supplied. Duplicate the member entry for each person and replace both bracketed fields with accurate details.

## Assignment verification checklist

- [ ] Open `/` and confirm the dashboard shows total, completed, and pending counts and links to the other pages.
- [ ] Open `/groups`, create a group, and confirm the new group appears.
- [ ] Refresh the page and confirm user-created groups and tasks remain available.
- [ ] Open each group and confirm only its tasks appear.
- [ ] Add a task to one group and confirm it does not appear in another group.
- [ ] Toggle a task from Not done to Done and back; confirm the dashboard counts change.
- [ ] Open a task in the notepad editor, add a description and time, then confirm the details appear on both task lists.
- [ ] Delete a task, use Undo, and confirm it is restored.
- [ ] Delete a group with tasks, confirm the task count, and use Undo to restore the group and its tasks.
- [ ] Cancel a group deletion and confirm the group and its tasks remain.
- [ ] Submit blank group/task forms and confirm inline validation appears.
- [ ] Open `/guide` and `/developers`; confirm all required instructions and name/role placeholders are present.
- [ ] Open an unknown group URL and an unknown page URL; confirm both show helpful recovery links.
- [ ] Use navigation and forms with a keyboard; confirm visible focus and accessible control labels.
- [ ] Check a narrow mobile viewport and a desktop viewport.
- [ ] Run `npm run build` and directly refresh a nested group URL in the deployed site.

## Deployment

Build the site with `npm run build`; Vite writes deployable files to `dist/`.

### Vercel

Import the repository in Vercel and use `npm run build` as the build command with `dist` as the output directory. The included `vercel.json` rewrites app paths to `index.html`, so `BrowserRouter` routes work on direct refresh.

### Netlify

Import the repository in Netlify and use `npm run build` as the build command with `dist` as the publish directory. The included `public/_redirects` file is copied into `dist` and sends app routes to `index.html`.

Deployment is not included in this project work; no site has been published.
