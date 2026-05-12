# Karoo — Font Installation

## Self-hosted fonts required

Place your licensed font files in the folders below.
Montserrat and Poppins are loaded from Google Fonts (no files needed).

---

## Roslindale Variable Display

Folder: `fonts/roslindale/`

Expected filenames (rename your files to match):
- `RoslindaleVariable-Display.woff2`       ← variable font, normal
- `RoslindaleVariable-DisplayItalic.woff2` ← variable font, italic (optional)

Fallback if variable font not available:
- `Roslindale-Display-Regular.woff2`
- `Roslindale-Display-Bold.woff2`

Source: Hex Franklin / David Jonathan Ross foundry

---

## AKIRA EXPANDED

Folder: `fonts/akira/`

Expected filenames (rename your files to match):
- `AkiraExpanded.woff2`   ← primary
- `AkiraExpanded.ttf`     ← fallback (optional)

Weight used: 800 (Super Bold / ExtraBold)

Source: Typomoco (purchased licence)

---

## After adding font files

No code changes needed — the @font-face declarations in
`css/global.css` already reference these exact paths.

Open any page in a browser; the custom fonts will load immediately.
