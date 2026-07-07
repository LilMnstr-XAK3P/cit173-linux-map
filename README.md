# CIT 173 Linux+ Master Resource Crosswalk

Interactive course map for CIT 173 Introduction to Linux and CompTIA Linux+ XK0-006.

The site uses Blum's CompTIA Linux+ Study Guide as the primary outline, then aligns Total Seminars videos, optional Red Hat Academy readings, textbook exercises, video demos, Red Hat guided exercises, Red Hat labs, and CIT 173 catalog learning outcomes.

## Launch

Open `index.html` directly or serve the repository with GitHub Pages.

## Included Files

| File | Purpose |
|---|---|
| `index.html` | Interactive crosswalk website |
| `styles.css` | ADA-friendly visual styling |
| `app.js` | Crosswalk data, filters, semester maps, progress behavior |
| `scorm_api.js` | Minimal SCORM 1.2 API wrapper |
| `imsmanifest.xml` | SCORM package manifest |
| `master_crosswalk.md` | Markdown reference version of the same course map |

## SCORM Notes

The package reports SCORM completion when at least 80 percent of the 31 Blum chapter bundles are marked reviewed. The site also works outside an LMS and saves local progress in the browser.
