# Writing covers

Every writing piece gets a cover drawn in code. There is no image file. `generateWritingCoverSvg` in `src/lib/writing-cover.ts` builds the SVG from the title, and the same drawing is used everywhere:

- The card on `/about/writing`, at 16:10.
- The header on the piece itself, at 2:1 on a phone and 2.2:1 on a wider screen.
- The social image, which uses the dark cover and lays the title over the bottom.

`WritingCover` renders the dark and light versions and shows the one that matches the reader's color scheme.

A cover should be readable at the size of a card, still quiet at the size of the article header, and obvious enough that someone can say what it shows in a few words.

## What to draw

Draw the one thing the piece is about. A house and a hostel. A person and the people near them. A page becoming separate modules. A file tree. If the drawing needs a caption to be understood, it is the wrong drawing.

Keep it small. Most covers are four to eight marks. One circle, a few lines, a couple of rectangles. Straight lines, circles, and rounded rectangles only. No text, no letters, no imported icons, no photographs, no shadows, and no extra frames around the drawing.

Give the cover one accent, and spend it on the subject: the lit window, the person kept close, the step not yet taken, the file that matters. A short accent line and a small accent mark can belong to the same idea, as the path and the window do on the home cover. Do not sprinkle the accent around.

Leave most of the frame empty. The quiet area is part of the look. If two pieces would get the same picture, change the drawing or the keywords until each one belongs to its piece.

## How the lines work

Every line has the same weight. `STROKE` is 4 on a 1600 wide canvas, which lands near 2px on a card. Do not set a stroke width yourself, and do not go thinner. Faint lines are already faint.

Importance comes from three ink levels, passed to the pen:

- `strong` is the subject.
- `mid` is the supporting shape.
- `faint` is structure: a ground line, a connector, a guide.

Dark and light are the same drawing. The pen picks the opacity for the theme, so a `faint` line has to survive on both the dark plate and the tinted paper. Check both before keeping a mark.

Draw only through the pen from `createPen`. The helpers are `line`, `path`, `rect`, `circle`, `accentRect`, `accentDot`, and `accentLine`. Hand-written stroke attributes drift, which is how the old covers ended up with a different weight on every piece.

## Stay inside the crop

The canvas is 1600 by 900, and the SVG uses `xMidYMid slice`, so each frame cuts off a different edge.

| Where it shows | Frame | What gets cut |
| --- | --- | --- |
| Card | 16:10 | 80px from each side |
| Article, phone | 2:1 | 50px from top and bottom |
| Article, wider | 2.2:1 | about 87px from top and bottom |
| Social image | 1200×630 | about 30px from top and bottom, then a dark gradient and the title over the lower half |

The region that survives every crop is roughly x 80 to 1520 and y 90 to 810. Keep the actual drawing tighter than that, near the center, so the frame stays quiet after cropping. Nothing important belongs in the bottom quarter: the social image covers it with the title.

Build coordinates from `cx` and `cy` (the center of the canvas) so a drawing stays centered when the canvas numbers change.

## How a title picks its cover

`inferWritingCoverMotif` tests the lowercased title against a list of patterns and returns the first match. Anything that matches nothing gets `growth`. Order matters, and a broad word steals later pieces. `know` already catches "knows" and would catch "knowledge". Put the specific pattern above the general one.

Current motifs, in match order:

| Motif | Matches | Palette | Used by |
| --- | --- | --- | --- |
| `home` | home, hostel, heart, house | brass | Finding Home Between Hostel and Heart |
| `company` | company, friend, greatness, together | rose | Finding Greatness in the Company We Keep |
| `uncertainty` | know, anything, uncertain, figured | iris | No One Knows Anything |
| `architecture` | architect, monolith, frontend, magazine | copper | From Magazines to Micro Frontends |
| `structure` | shape, codebase, folder, structure | slate | The Shape of a Codebase |
| `backend` | backend, server, request | teal | The Backend First Principle |
| `growth` | grow, learn, start, and the fallback | sage | nothing yet |
| `writing` | writ, essay, note | teal | nothing yet |

`writing` shares teal with `backend`. `growth` has sage to itself. Sharing a hue with one neighbor is fine. Avoid a third cover in the same hue, since the index shows them in a row.

## Adding a cover to a new piece

1. Read the title against the table above. If the right motif already matches, there is nothing to draw. Open the card and the article page and confirm it still reads.
2. If the title falls through to `growth` and that drawing is wrong, add a keyword to an existing motif before inventing a new one. Add the word to that motif's pattern in `inferWritingCoverMotif`, and keep the word specific enough that it will not claim a later title.
3. Add a motif only when no existing drawing can honestly stand for the piece.

## Adding a motif

1. Say, in one sentence, what the drawing is. That sentence becomes the comment above the case. If the sentence needs "and" more than once, the drawing is two ideas. Cut one.
2. Add the name to `WRITING_COVER_MOTIFS`.
3. Point it at a palette in `MOTIF_PALETTE`. Reuse one. Add a new palette only when every existing hue would sit next to a twin, and then add the same key to both `WRITING_COVER_PALETTES` and `WRITING_COVER_PALETTES_LIGHT`.
4. Add the keyword pattern above the fallback, and above any broader pattern it could lose to.
5. Add a `case` in `motifMarkup`. Use the pen, one accent, and the three ink levels. Keep the drawing inside the safe region above.
6. Look at it beside the existing covers, not on its own. A cover that looks fine alone can break the set by being busier, heavier, or a different kind of picture.

Do not add grain, glow, or a vignette inside a motif. `generateWritingCoverSvg` already paints a flat background, a faint white sheen, a soft accent glow behind the drawing, and a light grain. Those are shared, so the set stays one family. Filter ids go through `coverId`, which includes the theme and the slug, because both themes and several covers can sit in one page.

## Palettes

A palette has three colors:

- `bg` is the plate. Dark covers are a little lighter than the page, so they read as cards. Light covers are tinted paper, not pure white.
- `ink` is the line color.
- `accent` is used once.

The light palette is the same hue printed on paper: a warm background, dark ink, and a deeper accent so the mark still reads on a pale ground. Change a hue in both themes or the pair drifts apart.

## Check it

Any "no" means it is not done.

- You can say what the drawing shows without reading the title.
- It uses one accent, on the subject.
- Every line goes through the pen. No hand-written stroke width.
- The drawing sits near the center and loses nothing on the 16:10 card or the 2.2:1 header.
- The subject is not in the bottom quarter, where the social title lands.
- Faint lines are visible in dark and in light.
- Next to the other covers, it has the same weight and the same amount of quiet space.
- The keyword you added does not steal an existing title. Run the current titles through `inferWritingCoverMotif` and confirm each still returns the motif in the table.
