# Sol de Janeiro — Web Development Project

## Student Information
- **Student Name:** Wanga Tshidada
- **Student Number:** ST10476294
- **Module:** Web Development (Introduction) — WEDE5020
- **Assessment:** Portfolio of Evidence (POE), Parts 1–3
- **Live website:** https://st10476294.github.io/WEDE5020/ _(expected GitHub Pages URL — ACTION REQUIRED: confirm it works after enabling Pages)_
- **Repository:** https://github.com/ST10476294/WEDE5020

> This is a student project. It is not the official Sol de Janeiro website.

---

## Project Overview
A multi-page, responsive website for the beauty brand **Sol de Janeiro**. The site works as a digital storefront and information platform: it introduces the brand, showcases the Cheirosa fragrance collection and Brazilian Bum Bum Cream, teaches beauty rituals, handles product/newsletter/partnership enquiries, and lists UK stockists with interactive maps and a contact form.

## Organisation
Sol de Janeiro is a beauty and skincare brand inspired by the joyful, confident, sun-kissed culture of Brazil. It focuses on premium body care, fragrances and sensory beauty rituals. Its mission is to celebrate body confidence and self-expression through Brazilian-inspired products (Part 1 proposal, section 1).

## Website Goals
From the Part 1 proposal:
- Increase online engagement with a visually appealing, easy-to-navigate site.
- Educate visitors about fragrance layering, hydration and Brazilian beauty rituals.
- Encourage community growth through newsletter and enquiry forms.
- Improve access to product information and physical stockist locations.

**KPIs:** 500 unique visitors in the first 30 days; 10% newsletter conversion; average session over two minutes on the Beauty Rituals page.

## Target Audience
Gen Z and Millennials (about 16–35 years old) interested in premium beauty, skincare, self-care and fragrances, mostly browsing on mobile devices.

---

## Features

### Part 1 — Foundation (HTML structure)
- Six linked pages with semantic HTML5 (`header`, `nav`, `main`, `section`, `article`, `footer`).
- Consistent navigation on every page.
- Content for products, rituals, enquiries, contact and stockists.

### Part 2 — Visual Design (CSS)
- One external stylesheet (`style.css`) linked from every page.
- Colour palette: Golden Yellow `#F4B41A`, Warm Orange `#F58220`, Off-White `#FAF9F6`, Dark Grey `#333333` (CSS custom properties in `:root`).
- Typography: Montserrat (headings) and Open Sans (body) from Google Fonts.
- Flexbox card layouts, `:hover` / `:focus` pseudo-classes and transitions.
- Responsive breakpoints at 768px (tablet) and 480px (mobile); images and map iframes scale fluidly.

### Part 3 — Functionality and SEO
All JavaScript is vanilla and lives in one file, `script.js`.

| Feature | Page | What it does |
|---|---|---|
| **Mobile menu** (interactive element) | All pages | On screens ≤768px the navigation collapses behind a **Menu** button. `aria-expanded` is updated and Escape closes the menu. Without JavaScript the navigation stays visible. |
| **Show/hide layering steps** (accordion-style toggle) | `howto.html` | Button expands/collapses the fragrance-layering steps. The label and `aria-expanded` change with the state. |
| **Interactive maps** | `contact.html` | Two embedded Google Maps for Selfridges London (400 Oxford St) and Harvey Nichols Manchester (21 New Cathedral St). Each has a marker, zoom, pan and "Open in Maps", plus a descriptive `title` and a text link as an accessible fallback. No API key needed. |
| **Gallery lightbox** | `fragrance.html` | Clicking any product image opens it enlarged in a native `<dialog>` with a dark backdrop, caption, fade-in animation, Close button, Escape key and click-outside-to-close. Focus returns to the selected image afterwards. Aspect ratio is preserved (`object-fit: contain`) and it works on mobile. |
| **Dynamic content** | `fragrance.html` | The fragrance cards are read into a JavaScript array of objects (`products`), then re-rendered into the page with DOM methods every time the search or sort changes. |
| **Search and sort** | `fragrance.html` | Live, case-insensitive search over names and scent notes (e.g. "vanilla", "PISTACHIO"). A result count is announced to screen readers; an empty result shows a helpful no-results message; clearing the box shows everything again. A dropdown sorts Featured / A–Z / Z–A. |
| **Enquiry form** | `enquiry.html` | Validated form that **processes** the input and shows a personalised enquiry summary plus a response that depends on the enquiry type and product (availability and stockist guidance, newsletter information, partnership next steps), with a link to the most relevant next page. |
| **Contact form with email** | `contact.html` | Validated form that compiles the details into an email and sends it with **AJAX (`fetch`) to Formspree**, showing Sending… / success / error states. If sending fails, a copy of the message is kept on screen and an "email app" (mailto) fallback is offered to the recipient set in `script.js`. |
| **SEO** | All pages | Unique titles, meta descriptions and meta keywords, one H1 per page with logical H2/H3, descriptive image filenames and alt text, internal links, `robots.txt`, `sitemap.xml`, favicon. |

---

## Technologies Used
- **HTML5:** semantic structure, form controls and HTML5 validation attributes, native `<dialog>`.
- **CSS3:** custom properties, Flexbox, media queries, transitions, keyframe animation, `prefers-reduced-motion`.
- **Vanilla JavaScript (ES6):** `querySelector`, `addEventListener`, arrays and objects, `filter` and `sort`, `createElement`, `textContent`, `fetch`, `FormData`, `AbortController`.
- **External services:** Google Fonts, Google Maps embed, Formspree (contact email delivery).
- **Hosting:** GitHub Pages (static; no build step, backend or framework).

## Project Structure
```text
Sol de janeiro/
├── index.html              # Home: hero, calls to action, featured review
├── fragrance.html          # Fragrance collection, search/sort, lightbox gallery, Bum Bum Cream
├── howto.html              # Beauty rituals and fragrance-layering steps (toggle)
├── testimonials.html       # Customer reviews
├── enquiry.html            # Product / newsletter / partnership enquiry form
├── contact.html            # General contact form (Formspree AJAX) and stockist maps
├── style.css               # Single stylesheet (Part 2 design + Part 3 component styles)
├── script.js               # All Part 3 JavaScript
├── robots.txt              # Crawler rules + sitemap location
├── sitemap.xml             # List of public pages for search engines
├── .nojekyll               # Tells GitHub Pages to serve files as-is
├── .gitignore              # Ignores .DS_Store, .idea/, node_modules/
├── README.md               # This document (single source of documentation)
├── images/                 # Six optimised, descriptively named JPEGs
│   ├── brazilian-bum-bum-cream.jpeg
│   ├── cheirosa-40-fragrance.jpeg
│   ├── cheirosa-62-fragrance.jpeg
│   ├── sol-de-janeiro-beauty-products.jpeg
│   ├── sol-de-janeiro-fragrance-collection.jpeg
│   └── sol-de-janeiro-stockist-display.jpeg
├── icons/                  # Decorative SVG icons (sun icon is also the favicon)
│   ├── ocean-waves-svgrepo-com.svg
│   └── sun-2-svgrepo-com.svg
└── docs/screenshots/       # Testing evidence screenshots
```

## How to Run Locally
1. Download or clone the repository.
2. Open the folder in VS Code and right-click `index.html` → **Open with Live Server** (recommended), or just double-click `index.html`.
3. No installation or build step is needed. The maps and the contact email need an internet connection.

---

## Responsive Design
- **Desktop (>768px):** full horizontal navigation, multi-column product and stockist cards.
- **Tablet (≤768px):** navigation collapses behind the Menu button; smaller headings and form padding.
- **Mobile (≤480px):** stacked navigation and cards, full-width buttons and links, smaller lightbox padding.
- Images use `max-width: 100%` with intrinsic `width`/`height` to avoid layout shift. Map iframes are 100% wide.
- Tested at 1440px, 768px, 390px and 320px (1 November) and re-tested at 375px mobile and desktop after the 2 November changes, with no horizontal overflow (see Testing).

## Accessibility
- "Skip to content" link, visible `:focus-visible` outlines and improved text contrast.
- Every form field has a `<label>`, `id`, `name`, an appropriate `type` and an inline error linked with `aria-describedby`; invalid fields get `aria-invalid="true"`.
- Status messages use `role="status"` / `aria-live="polite"` so screen readers announce results.
- The lightbox uses native `<dialog>` (focus trap and Escape key) and restores focus on close.
- Decorative icons use `alt=""`; meaningful images have descriptive alt text.
- Animations are disabled for users who choose reduced motion.

## SEO Implementation
| Page | Title | Focus keywords |
|---|---|---|
| `index.html` | Brazilian Body Care & Fragrance \| Sol de Janeiro | Brazilian beauty, body care, Cheirosa fragrance, Bum Bum Cream |
| `fragrance.html` | Fragrance Collection \| Sol de Janeiro | Cheirosa 62, Cheirosa 40, scent notes, Bum Bum Cream |
| `howto.html` | Beauty Rituals \| Sol de Janeiro | beauty rituals, body hydration, sun protection, fragrance layering |
| `testimonials.html` | Customer Reviews \| Sol de Janeiro | customer reviews, Cheirosa 62 review |
| `enquiry.html` | Enquiries & Newsletter \| Sol de Janeiro | product enquiry, newsletter, brand partnership, availability |
| `contact.html` | Contact & Locations \| Sol de Janeiro | contact us, stockist locator, Selfridges London, Harvey Nichols Manchester |

- **Titles:** unique per page in the format *Page Topic | Organisation*.
- **Meta keywords:** included on every page because the WEDE5020 rubric awards them. They are relevant to each page and not stuffed.
- **Meta descriptions:** unique, around 120–160 characters, and written from the page content.
- **Headings:** one H1 per page, then H2 and H3 in order. In Part 3 the H3 headings on `howto.html` were changed to H2 so no level is skipped.
- **Images:** descriptive filenames (e.g. `cheirosa-62-fragrance.jpeg` instead of `collection_picture2.jpeg`), descriptive alt text, intrinsic dimensions, `loading="lazy"` below the fold and `fetchpriority="high"` for the hero image.
- **URLs:** short, lowercase, descriptive filenames.
- **Internal linking:** Home → Enquiry/Contact/Reviews; Fragrance → Enquiry/Rituals; Rituals → Fragrance/Enquiry; Reviews → Fragrance/Contact; enquiry responses link to the relevant next page.
- **Local SEO:** full street addresses and maps for the London and Manchester stockists.
- **robots.txt:** allows all crawlers and points to the sitemap.
- **sitemap.xml:** lists all six public pages (no CSS, JS, images or README).
- **Page speed:** JPEGs re-encoded and kept under about 55 KB each, a single CSS and JS file, deferred script, lazy-loaded images and maps.
- **Security:** no secrets or passwords in code; user input is shown with `textContent` (never `innerHTML`) and the code uses no `eval`. Only the public Formspree form ID is exposed, which is designed to be public.
- **Off-page SEO** (backlinks, social media) can't be done in code; see Manual Actions.

---

## Forms

### Enquiry form (`enquiry.html`)
**Purpose:** ask about a product, the newsletter, or a brand partnership/influencer collaboration.

**Controls:** Full name (text), Email (email), Enquiry type (select), Product of interest (select), Enquiry details (textarea), Submit button.

**Validation:** HTML5 attributes (`required`, `minlength`, `maxlength`, `type="email"`) plus JavaScript checks:
- empty or whitespace-only values;
- email format;
- minimum and maximum lengths;
- a valid select option.

Errors appear under the field on blur and on submit, and update as soon as the field is corrected. On submit the first invalid field is focused.

**Processing and response:** after validation the page builds an **enquiry summary** (name, email, enquiry type, product) and a tailored response:
- *Product enquiry:* the product is part of the range, and the response tells the user to contact the two listed stockists to confirm price and availability, with a link to the stockist maps.
- *Newsletter:* where newsletter offers are published, with product-specific guidance.
- *Partnership:* what details to prepare, with a link to the contact form.

No prices, stock levels or discounts are invented.

### Contact form (`contact.html`)
**Purpose:** send a general message to the organisation.

**Controls:** Full name, Email, Phone (optional; 7–15 digits, optional country code), Message type (General / Order / Website feedback), Full message, Send button.

**Validation:** same inline validation as the enquiry form, plus the phone-format check.

**Email processing:** the details are compiled into an email (subject `Sol de Janeiro website message: <type>` plus all fields) and submitted with **`fetch()` (AJAX) to Formspree**. The form `action` holds the Formspree URL. The page shows:
- **Sending…** while the button is disabled;
- **Success**, with the user's name and email, and the form resets;
- **Error**, with the message kept on screen, a retry option and a "Send with my email app" mailto link to the recipient stated in `script.js` (`contactRecipient`).

A 15-second timeout prevents a stuck "Sending…" state. Formspree emails each submission to the account owner.

> ⚠ **Until the Formspree ID is added, the form validates and compiles the message but tells the user honestly that it was not sent.**

---


## GitHub Pages Deployment — ACTION REQUIRED
The website files are at the **repository root**, so GitHub Pages serves from the root. All paths are relative and lowercase, so the site works under `https://st10476294.github.io/WEDE5020/`.

1. Complete the Formspree steps above.
2. Commit those changes and push them to the `main` branch of https://github.com/ST10476294/WEDE5020.
3. Open the repository on GitHub.
4. Go to **Settings**.
5. Select **Pages** in the left menu.
6. Under **Build and deployment → Source**, choose **Deploy from a branch**.
7. Choose branch **`main`** and folder **`/ (root)`**.
8. Click **Save**.
9. Wait 1–3 minutes until GitHub shows "Your site is live at https://st10476294.github.io/WEDE5020/". (If the repository is private, your GitHub plan must allow Pages for private repositories; otherwise ask your lecturer or use Netlify.)
10. Open every public page: Home, Fragrance, Rituals, Reviews, Enquiry, Contact.
11. Check that CSS, JavaScript, images, maps and favicon load (DevTools → Console shows no errors).
12. Copy the final URL.
13. `robots.txt`, `sitemap.xml` and the top of this README already use `https://st10476294.github.io/WEDE5020/`. If GitHub shows a different URL, replace it in those three files.
14. Commit and push any URL corrections (e.g. `seo: correct live URL in sitemap and robots`).
15. Wait for Pages to redeploy and recheck the site, including `/robots.txt` and `/sitemap.xml`.



---

## Part 3 Changelog

### 2 November 2026 — Rubric audit and repair
**Added**
- `contact.html` / `script.js`: the contact form now sends with Formspree over AJAX (`fetch`), with Sending/success/error states, a reset on success and a copy of the message kept on failure. The form `action` is the Formspree URL, with a `YOUR_FORM_ID` placeholder.
- `script.js`: a `contactRecipient` setting (the email recipient stated in the code) with a "Send with my email app" mailto fallback.
- `enquiry.html` / `script.js`: the enquiry is now processed into an on-page **enquiry summary** (name, email, type, product) plus a tailored response and a next-step link. Output is built with `createElement` / `textContent`.
- `style.css`: a result panel style for form responses and a fade/scale-in animation for the lightbox (disabled under reduced motion).
- All pages: a favicon (the existing sun icon), which removes the `favicon.ico` 404.
- Internal links: Home → Enquiry/Contact; Rituals → Fragrance/Enquiry; Reviews → Contact.

**Changed / Fixed**
- `howto.html`: the "Daily Sun Protection" and "Hydration Ritual" headings went from H3 to H2 (they skipped H2 after the H1). The CSS icon rule now also covers `h2 img`, and the icons gained a `height` attribute.
- `index.html`: the title became "Brazilian Body Care & Fragrance | Sol de Janeiro" (Topic | Organisation format), and the review link text became "Read customer reviews".
- All six pages: meta keywords expanded with relevant page-specific terms; meta descriptions rewritten to describe what each page does.
- `enquiry.html`, `contact.html`, `testimonials.html`: removed "demo / not sent / not verified" wording from public page text; honest status messages now come from JavaScript at the moment of submission. Buttons renamed "Submit enquiry" and "Send message".
- `robots.txt` / `sitemap.xml`: replaced the `example.invalid` draft with the GitHub Pages URL `https://st10476294.github.io/WEDE5020/`; `robots.txt` now includes the `Sitemap:` line; the sitemap root URL is `/`.
- `script.js`: removed the unused mailto-only email preparation path and the "Prepared email" wording; the email copy is shown only when the message was not sent. The input handler now hides any previous form response when the user edits a field.

**Moved**
- The website files moved from the `Sol de janeiro/` subfolder to the repository root, so GitHub Pages serves `index.html` at the site root (the URL has no space-encoded folder).

### 1 November 2026 — Part 3 implementation
**Added**
- `script.js`: mobile navigation, rituals toggle, dynamic fragrance rendering from an array, live search and A–Z/Z–A sorting.
- Native `<dialog>` gallery lightbox with keyboard close, focus restoration and responsive sizing.
- Field-level validation for both forms with inline errors; enquiry-specific responses; contact message compilation with a configurable Formspree AJAX path.
- Unique meta descriptions and keywords; page-specific H1 headings.
- `robots.txt`, `sitemap.xml`, `.nojekyll`.

**Fixed**
- Replaced invalid nested link/button controls on the home page with styled links.
- Improved text and button contrast, visible keyboard focus, skip link and small-screen containment.
- Added map `title` attributes and external map links (no new locations invented).
- Filled the empty `testimonials.html` page using the existing home-page review.
- Decorative icons given `alt=""`; repeated brand H1 changed to a styled paragraph so each page has one H1.

**Improved**
- Renamed all six JPEGs descriptively (`landing_page_img` → `sol-de-janeiro-beauty-products`, `collection_picture1` → `sol-de-janeiro-fragrance-collection`, `collection_picture2` → `cheirosa-62-fragrance`, `collection_picture3` → `cheirosa-40-fragrance`, `bumbum_cream` → `brazilian-bum-bum-cream`, `store_image2` → `sol-de-janeiro-stockist-display`) and updated every reference.
- Re-encoded the JPEGs, capped them at 1600px, and added intrinsic width/height and lazy loading.

## References
Harvard style (IIE adapted). Check the final formatting against the IIE Harvard referencing guide.

- Anthropic (2026) *Claude* [AI assistant, Claude Opus 5.5]. Used for the Part 3 rubric audit, debugging and documentation, 2 November 2026. Available at: https://claude.ai (Accessed: 2 November 2026).
- Formspree (n.d.) *HTML forms with no server code*. Available at: https://formspree.io/html/ (Accessed: 1 November 2026).
- Google (n.d.) *Build and submit a sitemap*. Available at: https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap (Accessed: 1 November 2026).
- Google (n.d.) *Google Fonts: Montserrat and Open Sans*. Available at: https://fonts.google.com (Accessed: 2 November 2026).
- Google (n.d.) *Google Maps embed*. Available at: https://www.google.com/maps (Accessed: 2 November 2026).
- GitHub (n.d.) *Configuring a publishing source for your GitHub Pages site*. Available at: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site (Accessed: 2 November 2026).
- Mozilla (n.d.-a) *The Dialog element*. Available at: https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dialog (Accessed: 1 November 2026).
- Mozilla (n.d.-b) *Client-side form validation*. Available at: https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Form_validation (Accessed: 1 November 2026).
- Mozilla (n.d.-c) *Using the Fetch API*. Available at: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch (Accessed: 2 November 2026).
- OpenAI (2026) *Codex* [AI coding assistant]. Used for Part 3 code review, implementation and testing, 1 November 2026.
- SVG Repo (n.d.) *Sun 2 SVG vector* and *Ocean waves SVG vector*. Available at: https://www.svgrepo.com (Accessed: 2 November 2026). _ACTION REQUIRED: add the exact icon page URLs and licence._
- The Independent Institute of Education (2026) *WEDE5020 Web Development (Introduction) Portfolio of Evidence*. Johannesburg: The IIE.



## AI Assistance Disclosure
AI tools were used in Part 3 as development assistants:
- **OpenAI Codex** (1 November 2026): code review, JavaScript implementation, testing and documentation drafting.
- **Anthropic Claude** (2 November 2026): rubric audit against the WEDE5020 POE, bug fixing, form processing/AJAX improvements, SEO refinements, browser testing and README consolidation.

The student reviewed the code and is responsible for understanding and explaining it.



## Explaining the Code
- `filter()` keeps products whose name or description contains the search text; `sort()` reorders them; the cards are then rebuilt in the page.
- `showModal()` opens the browser's dialog with focus containment; Escape closes it and focus returns to the clicked image.
- `validateField()` checks one field (required, email, phone, length, select) and writes the error next to it; the forms reuse it.
- `processEnquiry()` builds the summary and chooses a response object by enquiry type; `sendContact()` compiles the email and posts it with `fetch()`, handling success, failure and timeout.
- User input is only ever written with `textContent` or `value`, so it can't inject HTML.
