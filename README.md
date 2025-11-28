# Markmap Taxonomy Visualizer

This project generates an interactive mindmap visualization from your `taxonomy.md` markdown file using [markmap](https://markmap.js.org/).

## Quick Start

### Generate Markmap (Online Mode - Default)

```bash
npm run generate-markmap
```

This generates `taxonomy.html` that uses CDN resources (requires internet connection).

### Generate Markmap (Offline Mode)

```bash
npm run generate-markmap:offline
```

This generates `taxonomy.html` with all assets bundled locally in the `assets/` folder. The HTML file will work completely offline.

## Workflow

1. **Edit your markdown file**: Update `taxonomy.md` as needed
2. **Regenerate the map**: Run `npm run generate-markmap` (or the offline version)
3. **View the result**: Open `taxonomy.html` in your browser

That's it! Every time you update `taxonomy.md`, just run the script again to regenerate the HTML.

## Frontmatter Options

Your `taxonomy.md` file supports frontmatter options:

```yaml
---
title: Problem Swath
markmap:
    colorFreezeLevel: 4
    initialExpandLevel: 2
---
```

- `initialExpandLevel`: Controls how many levels are expanded by default (default: all)
- `colorFreezeLevel`: Freezes colors at a specific depth level

## Files

- `taxonomy.md` - Your source markdown file
- `taxonomy.html` - Generated interactive mindmap (regenerated on each run)
- `assets/` - Local JavaScript files (created in offline mode)
- `generate-markmap.js` - Generation script

## Dependencies

- `markmap-lib` - Markdown to mindmap transformer
- `markmap-render` - HTML template generator

## Notes

- **Online mode**: HTML file is smaller but requires internet connection
- **Offline mode**: HTML file is self-contained but includes an `assets/` folder that must be kept with the HTML file
- The script automatically extracts frontmatter options from your markdown file

