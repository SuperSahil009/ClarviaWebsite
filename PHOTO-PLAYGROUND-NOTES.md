# Clarvia personal-photo experiment (review branch only)

This branch experiments with the **approved** use of original personal photographs and a warmer, photography-led palette. It is NOT approved for production merge.

## Intended image placements

- `assets/images/clarvia-personal/pool-sunset-meditation.webp` — a meditation slide in the homepage hero and the main illustration beside “Healing happens in layers”
- `assets/images/clarvia-personal/beach-reflection.webp` — a reflective second personal photograph in the hero slideshow
- `assets/images/clarvia-personal/shala-wide-meditation.webp` — the wide wooden shala photograph behind the closing “You do not have to figure everything out alone” CTA

These image files were prepared from the owner’s uploaded photographs, including the corrected original infinity-pool-at-sunset photo for the layers section, but **are not yet checked into GitHub** because the available repository write integration accepts only UTF-8 text or text-encoded blobs, not the local binary files directly. An asset zip has been delivered in the ChatGPT conversation. For the design preview to show the owner’s photographs, extract that zip at the repository root, preserving the paths above, and commit the images to **this branch only**. Until then, existing images load as fallbacks.

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

## New approved trauma-and-healing section (21 Nov 2026)

The homepage's former five-layer "Healing happens in layers" panel is now redesigned as **"Trauma happens in layers. And healing does too."** It retains a real uploaded photograph of Shree at the infinity pool at sunset and adds six transparent onion-like arc layers using **live inline SVG** rather than baking words or a recreated person into the image. This ensures the original photograph remains authentic and the educational text stays crisp and accessible.

The six clickable, native-`details` explanations cover family/generational patterns, environment and upbringing, relational/attachment experiences, emotional experiences, thoughts/beliefs, and body/stress responses. Each item explains a possible influence and a suitable coping or self-understanding direction. This is a **conceptual educational model**, not six scientifically established trauma stages, nor a promise of specialist trauma treatment. No mandatory order is implied.

New CSS lives in `css/clarvia-photo-playground.css`. The three actual photograph assets are in `clarvia-final-review-photo-assets.zip` supplied in the ChatGPT conversation; the ZIP must be extracted and checked into this branch for a real-photo browser preview. Do **not** merge or deploy `main` until these images are installed and the owner approves desktop/mobile appearance.
