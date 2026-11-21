# Clarvia personal-photo experiment (review branch only)

This branch experiments with the **approved** use of original personal photographs and a warmer, photography-led palette. It is NOT approved for production merge.

## Intended image placements

- `assets/images/clarvia-personal/pool-sunset-meditation.webp` — a meditation slide in the homepage hero and the main illustration beside “Healing happens in layers”
- `assets/images/clarvia-personal/beach-reflection.webp` — a reflective second personal photograph in the hero slideshow
- `assets/images/clarvia-personal/shala-wide-meditation.webp` — the wide wooden shala photograph behind the closing “You do not have to figure everything out alone” CTA

These image files were prepared from the owner’s uploaded photographs, but **are not yet checked into GitHub** because the available repository write integration accepts only UTF-8 text or text-encoded blobs, not the local binary files directly. An asset zip has been delivered in the ChatGPT conversation. For the design preview to show the owner’s photographs, extract that zip at the repository root, preserving the paths above, and commit the images to **this branch only**. Until then, existing images load as fallbacks.

## Visual system

- Ivory `#F8F5EC`
- Warm sand `#E8D9C3`
- Sage `#9CAF88`
- Deep olive `#5E6F52`
- Ocean blue accent `#7FA4B2`
- Sunset gold accent `#E8A86B`

The overrides live in `css/clarvia-photo-playground.css`. The previous content, counselling/AOD/NDIS imagery, footer links and booking functionality remain otherwise unchanged.

## Test before any merge

Confirm images load and crop correctly on narrow mobile and widescreen desktop; verify contrast on the photo banner; test all slideshow controls and reduced-motion preference; check business claims and prices; verify Calendly links. Do not merge into `main` until the owner explicitly asks.
