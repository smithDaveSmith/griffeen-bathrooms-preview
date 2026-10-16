# Griffeen Bathrooms — GitHub Pages preview

This is the revised lavender/charcoal website, prepared from the completed version 6 concept. It includes all 11 HTML pages, 75 original project photos, local fonts, GSAP and ScrollTrigger. This export changes internal paths for GitHub project URLs and makes the error page self-contained. It does not change the existing hosted preview.

## Publish with the GitHub website

1. Unzip `Griffeen-Bathrooms-GitHub-Pages.zip` on your computer.
2. Create a new public repository. Suggested name: `griffeen-bathrooms-preview`. If GitHub asks for the initial branch, use `main`.
3. Open the repository's **Code** tab, then **Add file → Upload files**. Upload the extracted CONTENTS, including `index.html`, `assets`, and the page folders, to the repository root. Do not upload the ZIP itself or add an extra enclosing folder. Commit to `main`. If a browser upload cannot accept all files together, upload the assets in smaller batches while preserving their folders.
4. The package includes `.nojekyll`. On a Mac, Command+Shift+. shows it in Finder. Alternatively use **Add file → Create new file**, name it `.nojekyll`, leave it empty, and commit it.
5. Open **Settings → Pages**. Under **Build and deployment**, choose **Deploy from a branch**, then branch **main**, folder **/(root)**, and click **Save**.
6. Wait for GitHub's Pages deployment. The published URL appears in **Settings → Pages** when ready. The repository name can be different; internal paths are relative.

Use branch publishing for this package. There is no custom workflow file to configure and no manual Run workflow step. No build command, dependencies, environment variables, paid form service or business-domain access are required.

## What should be at the repository root

- `index.html`
- `assets/`
- `about/`, `THE-PROCESS/`, `recent-projects/`, `inspiration/`, `contact/`, `showroom/`, `privacy/`, `concept-notes/`, `category/`
- `404.html`, `robots.txt`, `.nojekyll`
- This `README.md`

## Preview behaviour

- The enquiry form prepares an explicitly unsent email draft. It has no live submission endpoint.
- The unofficial notice and noindex metadata remain on every page. The included robots.txt is not a substitute for noindex on a GitHub project URL: crawlers normally read robots.txt at the host root.
- Static assets are local. The three project-selection image URLs derive from the loaded script location so they also work under a repository URL.
- GitHub's custom 404 may be served for an arbitrarily deep unknown URL, so this export uses a self-contained error page with telephone, email and original-site alternatives.
- Static references and project selection were tested under root and nested deployment paths. GitHub deployment itself is not verified until you publish the repository. These packaging checks do not claim a new full browser/accessibility audit.

Official setup documentation: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

Keep this as an unofficial preview. The business owner must approve a production launch, branding/image use, current copy, legal policy and any real enquiry endpoint.
