# Media Assets

Drop confirmed venue media into these folders. Update corresponding entries in `src/data/` to point to the new files.

## Recommended structure

```text
public/media/
├── brand/
│   └── logo.png                 # Wired in Navbar, Footer, Hero, Menu
├── hero/
│   ├── mainvideo.mp4            # Homepage intro video (plays first)
│   ├── main-2.png               # Still 1 after video (zoom-out)
│   ├── main3.png                # Still 2
│   └── main4.png                # Still 3
├── venue/
│   ├── hero.mp4                 # Venue page cinematic hero
│   ├── 1.png                    # Stage atmosphere
│   ├── 2.png                    # Floral canopy setup
│   ├── 3.png                    # Draped grandeur setup
│   ├── 4.png                    # Full hall / walkway
│   ├── entrance-1.jpg … 4.jpg   # Arrival / aisle moments
│   ├── dance-floor.jpg          # Dance floor
│   ├── dj.jpg                   # DJ setup
│   └── celebrity.jpg            # Live celebrity performance
├── experiences/
│   ├── hero.jpg                 # Night exterior (experiences hero)
│   ├── weddings.jpg
│   ├── mehndi.jpg
│   ├── walima.jpg
│   ├── engagements.jpg
│   ├── corporate.jpg
│   └── private.jpg
├── gallery/
├── decor/
└── og/
```

Homepage sequence is configured in `src/data/hero.ts`.
