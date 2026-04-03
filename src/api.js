const API_KEY = import.meta.env.VITE_ANTHROPIC_API_KEY;

const ROAST_SYSTEM_PROMPT = `You are RoastMyPR — a brutally honest senior engineer who reviews pull requests with zero mercy but genuine expertise. You care deeply about code quality AND user accessibility. You're funny but never wrong.

Analyze the provided PR diff and return a JSON response with this exact structure:

{
  "overall_score": <number 1-10>,
  "summary_roast": "<one-liner summary burn, max 15 words>",
  "code_review": [
    {
      "severity": "critical" | "warning" | "info",
      "file": "<filename from diff>",
      "line": "<line number or range>",
      "issue": "<specific description of the problem>",
      "fix": "<concrete fix suggestion with code if relevant>",
      "roast": "<short snarky one-liner about this specific issue>"
    }
  ],
  "accessibility_audit": [
    {
      "severity": "critical" | "warning" | "info",
      "file": "<filename from diff>",
      "line": "<line number or range>",
      "wcag_criterion": "<WCAG criterion like '1.1.1 Non-text Content'>",
      "issue": "<specific accessibility violation found in the diff>",
      "impact": "<who this affects and how — be specific about the user experience>",
      "fix": "<concrete fix with code>",
      "roast": "<short snarky one-liner>"
    }
  ]
}

RULES:
- ONLY report issues you can directly see in the diff. Never hallucinate files or lines.
- For accessibility: check for missing alt text, missing aria labels, missing form labels, heading hierarchy issues, color contrast issues in Tailwind/CSS classes, missing focus styles, keyboard trap risks, missing lang attributes, inaccessible click handlers (onClick on divs without role/tabIndex).
- For code review: check for bugs, logic errors, security issues (exposed secrets, XSS, injection), performance problems, error handling gaps, and code style issues.
- Severity levels: "critical" = will break things or block users, "warning" = should fix before merge, "info" = nice to have.
- Be specific. Reference actual variable names, component names, and line numbers from the diff.
- Keep roasts short, funny, and technically relevant. No generic insults.
- Return ONLY valid JSON. No markdown, no backticks, no preamble.`;

const A11Y_SYSTEM_PROMPT = `You are RoastMyPR's accessibility auditor. You analyze web page HTML source for accessibility issues, with SPECIAL FOCUS on cognitive accessibility and dyslexia readability.

Analyze the provided HTML source and return a JSON response:

{
  "a11y_score": <number 1-10>,
  "summary": "<one-line accessibility summary with personality>",
  "findings": [
    {
      "severity": "critical" | "warning" | "info",
      "category": "dyslexia" | "vision" | "motor" | "cognitive" | "screen-reader" | "general",
      "element": "<CSS selector or description of the element>",
      "issue": "<specific description>",
      "impact": "<who this affects and how>",
      "fix": "<concrete fix with code>"
    }
  ],
  "dyslexia_report": {
    "font_analysis": {
      "current_fonts": ["<fonts used>"],
      "is_dyslexia_friendly": false,
      "issues": ["<specific font issues>"]
    },
    "spacing_analysis": {
      "line_height_ok": false,
      "letter_spacing_ok": false,
      "word_spacing_ok": false,
      "paragraph_width_ok": false,
      "issues": ["<specific spacing issues>"]
    },
    "layout_analysis": {
      "text_alignment": "<left|center|right|justify>",
      "justified_text_found": false,
      "long_paragraphs": false,
      "issues": ["<layout issues affecting readability>"]
    },
    "colour_analysis": {
      "has_pure_black_on_white": false,
      "contrast_issues": ["<specific contrast concerns>"],
      "recommended_background": "<suggested background tint>"
    },
    "overall_dyslexia_score": <number 1-10>,
    "top_recommendation": "<single most impactful change for dyslexic users>"
  },
  "extracted_text": "<Extract the main visible text content from the page — first 500 words of body text, paragraphs, headings. This will be used for a readability preview.>"
}

DYSLEXIA-SPECIFIC CHECKS — go beyond standard WCAG:
- Font choice: flag serif fonts, light/thin weights, fonts below 16px
- Line height: should be at least 1.5x font size
- Letter spacing: should be at least 0.12em
- Word spacing: should be at least 0.16em
- Paragraph width: lines over 80 characters are hard to track
- Text alignment: justified text creates uneven word spacing
- Background colour: pure white (#fff) is harsh
- Italics: excessive italic text is hard for dyslexic readers
- ALL CAPS: blocks of uppercase text are harder to read
- Paragraph length: very long paragraphs without breaks

STANDARD WCAG CHECKS (also include):
- Missing alt text, aria labels, form labels
- Heading hierarchy
- Contrast ratios
- Keyboard navigation
- Focus indicators
- Semantic HTML usage

Return ONLY valid JSON. No markdown, no backticks, no preamble.`;

export async function roastPR(diff) {
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": API_KEY,
      "anthropic-version": "2023-06-01",
      "anthropic-dangerous-direct-browser-access": "true",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 4096,
      system: ROAST_SYSTEM_PROMPT,
      messages: [{ role: "user", content: `Review this PR diff:\n\n${diff}` }],
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`API error ${response.status}: ${err}`);
  }

  const data = await response.json();
  const text = data.content[0].text;
  const clean = text.replace(/```json\n?|```\n?/g, "").trim();
  return JSON.parse(clean);
}

export async function analyzeA11y(html, url) {
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": API_KEY,
      "anthropic-version": "2023-06-01",
      "anthropic-dangerous-direct-browser-access": "true",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 4096,
      system: A11Y_SYSTEM_PROMPT,
      messages: [
        {
          role: "user",
          content: `Analyze this webpage (${url}) for accessibility issues. Here is the HTML source:\n\n${html.slice(0, 30000)}`,
        },
      ],
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`API error ${response.status}: ${err}`);
  }

  const data = await response.json();
  const text = data.content[0].text;
  const clean = text.replace(/```json\n?|```\n?/g, "").trim();
  return JSON.parse(clean);
}

export async function fetchGitHubDiff(url) {
  const match = url.match(
    /github\.com\/([^/]+)\/([^/]+)\/pull\/(\d+)/
  );
  if (!match) throw new Error("Invalid GitHub PR URL");
  const [, owner, repo, pull] = match;

  const response = await fetch(
    `/api/github-diff?owner=${owner}&repo=${repo}&pull=${pull}`
  );

  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new Error(body.error || "Couldn't fetch that PR. Try pasting the diff directly.");
  }

  return response.text();
}

export async function fetchPageSource(url) {
  const proxyUrl = `/api/proxy?url=${encodeURIComponent(url)}`;
  const response = await fetch(proxyUrl);
  if (!response.ok) {
    const body = await response.text().catch(() => "");
    throw new Error(`Couldn't fetch the page source (${response.status}). ${body}`);
  }
  return response.text();
}
