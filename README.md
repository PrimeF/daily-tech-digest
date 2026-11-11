# Tech Digest

Personal news site for the daily tech digest, built by GitHub Pages with Jekyll. No build step or GitHub Action is needed: pushing to `main` publishes.

## Adding a digest

Add one file per day to `_posts/`, named `YYYY-MM-DD-digest.md`:

```markdown
---
date: 2026-11-12 09:30:00 -0800
coverage: "10–12 Nov 2026"
headlines:
  - First top story in one line
  - Second top story in one line
---

## Top Stories

### 1. Headline
...

## AI & Agentic AI
...

## Sources
1. [Title](https://example.com)
```

- `date` sets the URL (`/2026/11/12/`) and ordering. The page title is generated from it, so the body has no `#` heading.
- `headlines` (2 to 5 short lines) are shown in the archive and searched by the archive filter.
- `coverage` is optional.
- Every `##` heading becomes an entry in the section index. Text in brackets at the end of a heading is left out of the index.
- The `## Top Stories` section is shown as a highlighted panel. A `## Sources` list is shown in a smaller font.

Existing posts are never edited or deleted.

## Files

| Path | Purpose |
| --- | --- |
| `_config.yml` | Site title, `baseurl`, Markdown settings |
| `_layouts/default.html` | Page shell: header, navigation |
| `_includes/digest.html` | One digest: date, section index, day navigation |
| `index.html` | Home page, shows the latest digest |
| `archive.html` | All digests grouped by month, with keyword filter |
| `assets/style.css` | All styles, light and dark mode |
| `assets/site.js` | Section index, arrow-key navigation, archive filter |

RSS feed: `/feed.xml` (jekyll-feed).

## Local preview

```sh
gem install jekyll -v 3.10.0 kramdown-parser-gfm jekyll-feed webrick
jekyll serve
```
