<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

## What Lovable manages

Rules outside this block are the project's own. Change the pieces below in
Lovable, not by hand. With the [Lovable MCP](https://mcp.lovable.dev)
connected, `send_message` asks Lovable to do it; otherwise ask the user to
use the editor.

- **Database.** Do not add or edit `supabase/migrations/` or `drizzle/`.
  Ask Lovable to change the schema.
- **Generated files.** Do not edit a file whose header says it is automatically
  generated.
- **AI gateway.** Keep model calls on Lovable's gateway, and keep
  `LOVABLE_API_KEY` out of browser code.
- **Connectors.** Lovable provides native connectors. `list_connectors` shows
  which are enabled; `add_connector` only returns the dashboard link. When a
  connector is enabled, calls go through the connector gateway and need
  `LOVABLE_API_KEY`. When Lovable does not provide one, users can bring their
  own key and store it in Secrets.
- **Secrets.** Lovable manages them. Do not put secret values in the repo.
<!-- LOVABLE:END -->

- Preserve the imported homepage at public/studio.html; build additional content pages with TanStack routes so the original experience stays intact.
- Share the Projects header and footer through SeaProjectShell; resolve detail pages from slug-keyed local project data, with explicit empty gallery slots for missing photos so unrelated or duplicated images are never substituted.
- Select the detail header treatment through SeaProjectShell's heroHeader prop and animate gallery captions in a mount-scoped GSAP context; this keeps the project index unchanged and cleans up slide transitions.
- Keep the project header transparent until its full gallery section leaves the viewport; avoid entrance transforms on the sticky gallery's ancestors because they disrupt pinning.
- Centralize confirmed contact locations and enquiry validation in the contact module; the frontend prepares an encoded email draft, never reports an enquiry as sent, and does not invent unknown office or project locations.
- Use the public-domain geographic India outline for the contact map; co-located office and project markers use concentric hit targets rather than fabricated coordinates.
- Scope About page tokens and layout under .sea-about; the imported homepage has its own independent design system.
- Initialize Three.js only after React mounts, dispose all scene resources on unmount, and keep text usable without WebGL so SSR and low-capability devices remain supported.
- Keep history stage boundaries in the shared history-sequence module, with separate schedules for About and its independent copy, so logo enlargement, caption, definition, and story reveals remain ordered and testable without changing the copy.
- Build the founder section as the coded FounderSection component with separate portrait and background-plate assets, descriptive alternative text on the portrait, and the heading, name and role in the right column; it has no journey link.
- Keep testimonials and team in SeaPeopleSections with .sea-people-scoped tokens; select the editorial testimonial variant only on About-copy so its layout changes never alter the original page's cards.
- Keep the original About principles in WhatDefinesUs without a decorative drawing; pin its scoped sequence only on tall desktop viewports so larger text stays readable without altering the independent About copy.
