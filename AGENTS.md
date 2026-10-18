# Architecture rules
- Keep the public Cyvance site separate from the protected team application; shared public navigation and CTA styling live in site components so internal routes remain unchanged.
- Use original uploaded branding via a CDN asset pointer and a local square favicon; never redraw the supplied logo.
- Keep security visualizations local and explicitly demonstrative, separate from operational services, so sample interactions cannot be mistaken for live analysis.
- Centralize site colors, surfaces and motion in global semantic CSS tokens and Button variants for consistent theming and accessible interaction states.
- Use lightweight intersection-based reveals and CSS motion with reduced-motion fallbacks instead of adding animation dependencies.