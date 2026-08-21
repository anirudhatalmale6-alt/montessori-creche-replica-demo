# Montessori crèche site — front-end replica (demo)

A hand-built front-end replica of the hero and about sections of
`lenfant-roi.lu`, produced as a work sample before the full build.

## What is in here

```
index.html                     the page
assets/css/main.css            all styles, design tokens at the top
assets/js/main.js              scroll-linked media reveal + in-view animations
assets/img/hero-placeholder.jpg  placeholder photo (gets replaced)
```

No build step, no dependencies. Open `index.html` or serve the folder.

## Design tokens

Colours, type scale and metrics were read off the original's computed styles
rather than eyeballed — see the `:root` block in `main.css`.

| token | value |
| --- | --- |
| primary (gold) | `#d7a33d` |
| secondary (navy) | `#02162a` |
| text | `#1d1d1b` |
| header height | `100px` |
| media corner radius | `3em` |

## Fonts

The original uses two licensed faces. Free stand-ins are wired in:

| original | licensed? | used here |
| --- | --- | --- |
| Poppins | no, free | Poppins (identical) |
| Caslon CP | yes | Libre Caslon Display |
| Din Medium | yes | Archivo |

Swap the two `--font-family-*` values in `main.css` if the licensed
originals are purchased.

## Placeholders

The brand lettering (logo, hero title, wordmark) and the hero photo are
placeholders standing in for the new client's own assets.
