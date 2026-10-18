# Clarvia Wellness redesign QA

Status date: 18 October 2026

This branch is a review build. It must not be merged to `main` or deployed until the owner approves it and the unresolved checks below are completed.

## Implemented in code

- [x] Eight approved homepage sections in the requested order
- [x] General Counselling & Emotional Wellbeing page
- [x] Disability & NDIS Support page with unregistered-provider disclosure
- [x] AOD Counselling and Family Support page with restrained group-counselling mention
- [x] About page with genuine portrait and no registered-psychologist claim
- [x] Mindfulness & Wellbeing page using existing water photography
- [x] Professional Referrals & Enquiries page with a minimal email pathway rather than an unsecured mock form
- [x] Booking page with approved prices and current known Calendly destinations
- [x] Separate Privacy, Booking & Cancellation, Terms, and Accessibility pages
- [x] Desktop dropdown and accessible expandable mobile navigation
- [x] Keyboard focus styles, skip links, reduced-motion support and responsive layouts
- [x] Unique titles, descriptions, canonical URLs, Open Graph metadata and updated sitemap
- [x] Existing logo, genuine practitioner portrait and existing approved-site assets preserved

## Automated checks

- [x] Internal-link, cross-page anchor and local-asset scan: passed for all 12 HTML pages
- [x] HTML structure/metadata scan: every page has a title, description, canonical URL, one H1, main landmark and skip link
- [x] JavaScript syntax check: passed with `node --check`
- [x] CSS brace and responsive-rule scan: balanced and reduced-motion rule present
- [x] Desktop/mobile browser smoke test: all 12 pages loaded at 1440px and 375px with no broken local images, horizontal overflow or console errors
- [x] Interaction smoke test: mobile menu, services disclosure, Escape handling, desktop navigation and FAQ disclosure passed
- [x] Static accessibility scan: all images have alt attributes; no empty links or duplicate IDs
- [x] `sitemap.xml` is well-formed XML
- [x] Full-page homepage screenshots visually inspected at desktop and mobile widths
- [x] `git diff --check`: passed (line-ending warnings only)
- [x] Public Google Form access: form opened without signing in and displayed the expected name, email, contact number, 18-or-older, and location fields
- [x] Connected Calendly account: all three known event types are active; individual and package-related events are marked paid

Update these items with the final results before opening the pull request.

## Owner or account-access checks required before launch

- [ ] Supply and approve the intended sunlit-interior hero image. The review build temporarily uses the existing journal image because the approved interior asset is not in the repository.
- [ ] Confirm exact qualification titles, Ahpra nursing registration wording/current status, insurance scope and any current postgraduate enrolment before publication.
- [ ] Confirm the published disability-related support list is within training, competence, insurance and current NDIS/funding requirements.
- [ ] Have the privacy, terms, consent and cancellation documents reviewed for applicable Australian and Victorian professional, privacy and consumer requirements.
- [ ] Confirm record-storage systems, authorised access, retention periods, backups, secure deletion, payment provider and data-breach response; then replace the transparent draft notes on the policy pages.
- [ ] Fix the introductory Calendly duration mismatch before launch: the live `/30min` event is currently named **15 Minute Clarity Call (Free)** and has a 15-minute duration, while the approved website and Google Form say 30 minutes.
- [ ] Verify the introductory Calendly event sends a confirmation, supplies Google Meet details, redirects to the new Google Form and sends the configured 24-hour reminder with real Calendly variables.
- [ ] Complete the remaining Google Form checks: submit a test response, verify under-18 branching, and confirm response storage/access. The public form opens and mentions a Clarvia privacy notice before the client-details section, but no clickable Clarvia privacy-policy link was exposed during the external check; add and verify that link before launch.
- [ ] Verify the $150 individual counselling Calendly/payment checkout from start to finish without completing a real charge unless a test mode is available. The event is active, 60 minutes and marked paid, but the price was not exposed by the available account check.
- [ ] Confirm how the $400 package takes one payment and schedules three appointments. Keep it enquiry-only until confirmed.
- [ ] Establish and review a separate secure paid-client intake and informed-consent workflow. Do not reuse the short introductory-call form as paid counselling intake.
- [ ] Decide on a secure referral form only if needed. Until then, retain the minimal email pathway and instruct referrers not to email sensitive clinical narratives.
- [ ] Test delivery of enquiry/referral emails to `care@clarviawellness.com`, including spam handling.
- [ ] Confirm Hostinger deploy status and inspect the live site only after owner-approved merge to `main`.

## Manual visual and accessibility review

- [ ] Review homepage and every page at approximately 1440px, 1024px, 768px and 375px widths.
- [ ] Navigate the entire site with keyboard only, including the services dropdown, mobile menu, FAQ items and external booking links.
- [ ] Test with a screen reader on at least one desktop or mobile platform.
- [ ] Confirm colour contrast with an accessibility testing tool.
- [ ] Check zoom at 200% and verify that content does not overlap or become unreachable.
- [ ] Confirm the portrait crop and all image alternatives with the owner.
