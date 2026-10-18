# Clarvia Wellness

A responsive static website for [clarviawellness.com](https://clarviawellness.com), built with plain HTML, CSS and JavaScript.

## Pages

- `index.html` — eight-section homepage
- `general-counselling.html` — general counselling and emotional wellbeing
- `aod-counselling.html` — alcohol and other drug counselling and family support
- `ndis-support.html` — disability and NDIS-related support enquiries
- `mindfulness.html` — optional mindfulness and wellbeing practices
- `about.html` — practitioner story and professional background
- `referrals.html` — direct and professional referral pathways
- `book.html` — fees and verified booking destinations
- `privacy.html`, `booking-policy.html`, `terms.html`, `accessibility.html` — service information pages
- `QA-CHECKLIST.md` — automated results and owner checks required before launch

## Preview locally

From this folder, run:

```powershell
python -m http.server 8080
```

Then open `http://localhost:8080/` in a browser. Review at desktop width and at a narrow mobile width. No build step or dependency installation is required.

## Owner review

1. Open the homepage and use every item in the desktop and mobile navigation.
2. Review all professional titles, qualifications, experience statements and service descriptions.
3. Review the legal/privacy drafts and every item marked unresolved in `QA-CHECKLIST.md`.
4. Test booking, confirmation, reminder, payment and form workflows using test details.
5. Request any copy or design changes on the development branch.
6. Approve merging to `main` only after the unresolved launch checks are complete.

## Deployment

Production currently deploys from `main` through Hostinger. Do not merge the redesign branch into `main` until owner approval and launch QA are complete.

In Hostinger, the deployment route is **Websites → Dashboard → Advanced → Git**. The deployment root should contain `index.html` directly (normally `public_html`, without an extra nested project folder).
