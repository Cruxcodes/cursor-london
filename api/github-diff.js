export default async function handler(req, res) {
  const { owner, repo, pull } = req.query;

  if (!owner || !repo || !pull) {
    return res.status(400).json({ error: "Missing owner, repo, or pull parameter" });
  }

  try {
    const headers = {
      Accept: "application/vnd.github.v3.diff",
      "User-Agent": "RoastMyPR/1.0",
    };

    if (process.env.GITHUB_TOKEN) {
      headers.Authorization = `token ${process.env.GITHUB_TOKEN}`;
    }

    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/pulls/${pull}`,
      { headers }
    );

    if (!response.ok) {
      const body = await response.text().catch(() => "");
      return res.status(response.status).json({
        error: `GitHub API returned ${response.status}. ${
          response.status === 403
            ? "Rate limit exceeded — try pasting the diff directly."
            : "Check the PR URL and try again."
        }`,
        details: body,
      });
    }

    const diff = await response.text();
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate");
    return res.status(200).send(diff);
  } catch (err) {
    return res.status(502).json({ error: err.message });
  }
}
