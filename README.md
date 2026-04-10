# 🔥 RoastMyPR

**The code reviewer that gives a damn about your users.**

RoastMyPR is an AI-powered code review and accessibility auditing tool that uses Claude (Anthropic) to deliver brutally honest, funny, and genuinely expert feedback on your pull requests and live websites. It catches bugs, security flaws, and accessibility violations, all with a side of snark.

![RoastMyPR Homepage](https://github.com/user-attachments/assets/402c1f59-1dc4-4930-bbd5-05dfd62324a6)

---

## ✨ Features

### 🔥 Roast PR Mode

Paste a PR diff or provide a GitHub PR URL and get an instant AI-powered review covering:

- **Code Review** — Bugs, logic errors, security issues (SQL injection, XSS, exposed secrets), performance problems, error handling gaps, and style issues.
- **Accessibility Audit** — Missing alt text, missing ARIA labels, form label issues, heading hierarchy problems, color contrast concerns, missing focus styles, keyboard trap risks, and inaccessible click handlers.
- **Severity Ratings** — Every finding is categorized as `CRITICAL`, `WARNING`, or `INFO`.
- **Snarky One-Liners** — Each issue comes with a technically relevant roast comment.
- **Overall Score** — A 1–10 score with emoji and a summary burn.
- **Concrete Fixes** — Expandable fix suggestions with code snippets for every finding.

Two input methods are supported:

| Input Method | Description |
|---|---|
| **Paste Diff** | Paste any `git diff` output directly into the text area |
| **GitHub URL** | Provide a GitHub PR URL (e.g. `https://github.com/owner/repo/pull/123`) and the diff is fetched automatically |

Built-in demo diffs are available to try instantly:
- **Bad React Component (a11y)** — A `ProductCard` with accessibility violations
- **API Route (security)** — A login route with SQL injection and hardcoded secrets

![Demo diff loaded in Roast PR mode](https://github.com/user-attachments/assets/723fda46-e323-4058-9b90-41d2f1013201)

### 🌐 Test Live Site Mode

Enter any URL and get a comprehensive accessibility audit of the live page:

- **WCAG Compliance Check** — Missing alt text, ARIA labels, form labels, heading hierarchy, contrast ratios, keyboard navigation, focus indicators, and semantic HTML usage.
- **Dyslexia Readability Report** — Goes beyond standard WCAG with checks for font choice, line height, letter spacing, word spacing, paragraph width, text alignment, background colour, italic usage, ALL CAPS blocks, and paragraph length.
- **Live Site Preview** — An embedded iframe preview of the analyzed site with accessibility overlay tools.
- **Readability Preview** — Side-by-side comparison of the page text in its original rendering vs. a dyslexia-friendly optimized view (using the OpenDyslexic font, increased spacing, warm background tint).
- **Disability Simulations** — See your site through different eyes with built-in simulations for dyslexia, low vision, and color blindness (protanopia).

![Test Live Site mode](https://github.com/user-attachments/assets/888ca9a1-db47-40be-8f87-241eb7e12712)

### 🛠️ Accessibility Overlay Tools

The live site preview panel includes interactive overlay controls:

| Tool | Description |
|---|---|
| **Colour Tint** | Apply coloured overlays (Peach, Yellow, Blue, Green, Rose) over the page — helpful for users who benefit from tinted backgrounds |
| **Opacity Slider** | Adjust the tint intensity (5%–40%) |
| **Reading Ruler** | A horizontal ruler that follows the mouse to help track lines of text |
| **Focus Strip** | A narrow strip that highlights only the current line, dimming the rest of the page |

---

## 🏗️ Tech Stack

| Technology | Purpose |
|---|---|
| [React 19](https://react.dev) | UI framework |
| [Vite 8](https://vite.dev) | Build tool and dev server |
| [Tailwind CSS 4](https://tailwindcss.com) | Utility-first styling |
| [Anthropic Claude API](https://docs.anthropic.com) | AI-powered code review and accessibility analysis |
| [GitHub REST API](https://docs.github.com/en/rest) | Fetching PR diffs |
| [Vercel](https://vercel.com) | Deployment (serverless API routes) |
| [JetBrains Mono](https://www.jetbrains.com/lp/mono/) | Monospace font |
| [Instrument Serif](https://fonts.google.com/specimen/Instrument+Serif) | Display serif font |
| [OpenDyslexic](https://opendyslexic.org/) | Dyslexia-friendly font for readability previews |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ and **npm**
- An **Anthropic API key** ([get one here](https://console.anthropic.com/))
- *(Optional)* A **GitHub personal access token** to avoid rate limits when fetching PR diffs

### Installation

```bash
# Clone the repository
git clone https://github.com/Cruxcodes/cursor-london.git
cd cursor-london

# Install dependencies
npm install
```

### Environment Setup

Create a `.env` file in the project root:

```env
VITE_ANTHROPIC_API_KEY=your-anthropic-api-key-here
GITHUB_TOKEN=your-github-token-here   # Optional — increases GitHub API rate limit
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

The Vite dev server includes local API proxy middleware for `/api/proxy` and `/api/github-diff`, so everything works out of the box during development.

---

## 🤝 How It Works

1. **Roast PR Mode**: The user provides a PR diff (pasted or fetched from GitHub). The diff is sent to the Anthropic Claude API with a detailed system prompt that instructs it to perform both a code review and an accessibility audit. The response is structured JSON with scores, findings, fixes, and roasts.

2. **Test Live Site Mode**: The user enters a URL. The app fetches the page HTML through a proxy server (to avoid CORS issues), then sends the HTML to Claude with a system prompt focused on WCAG compliance and dyslexia readability. The results include scores, findings, a detailed dyslexia report, and extracted text for the readability preview.

---

## 📄 License

This project is open source. See the repository for license details.
