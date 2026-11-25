// Watches the official AWS pages behind tests/facts.json for changes.
// For every source URL: is the page still reachable? For every fact with a verbatim quote: is the quote still on
// that page? A missing quote usually means AWS changed the page (a new limit, a renamed service…), so that fact
// needs a human re-check. Needs network access; not part of `npm test`.
// Usage: node scripts/facts-watch.js [--report report.md]   (exit code 1 when something needs attention)
const fs = require('fs'), path = require('path');
const R = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'tests', 'facts.json'), 'utf8'));
const out = process.argv.includes('--report') ? process.argv[process.argv.indexOf('--report') + 1] : null;

const decode = s => s.replace(/&nbsp;|&#160;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
  .replace(/&quot;|&#34;/g, '"').replace(/&#39;|&apos;|&rsquo;|&lsquo;/g, "'").replace(/&ldquo;|&rdquo;/g, '"')
  .replace(/&ndash;|&mdash;/g, '-').replace(/&#(\d+);/g, (m, n) => String.fromCodePoint(+n));
// Compare text loosely: lower case, unify quotes/dashes, collapse whitespace and table separators
const norm = s => decode(s).toLowerCase().replace(/[“”„"]/g, '"').replace(/[‘’`]/g, "'").replace(/[–—−]/g, '-')
  .replace(/[|•·]/g, ' ').replace(/\s+/g, ' ').trim();
const pageText = html => norm(html.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/gi, ' ').replace(/<[^>]+>/g, ' '));
// A quote may be abridged with "…" or quote a table row with "|": every fragment of 3+ words must be on the page.
const fragments = q => norm(q).split(/\.\.\.|…| \| /).map(x => x.trim()).filter(x => x.split(' ').length >= 3);

async function get(url) {
  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      const res = await fetch(url, { redirect: 'follow', signal: AbortSignal.timeout(30000), headers: { 'User-Agent': 'Mozilla/5.0 (compatible; study-site-facts-watch)' } });
      const body = await res.text();
      return { status: res.status, finalUrl: res.url, text: res.ok ? pageText(body) : '' };
    } catch (e) {
      if (attempt === 2) return { status: 0, error: e.message, text: '' };
      await new Promise(r => setTimeout(r, 3000));
    }
  }
}

(async () => {
  const urls = [...new Set([...R.facts.flatMap(f => f.sources || []), ...R.deny.map(d => d.source)])];
  const pages = {};
  for (const u of urls) { pages[u] = await get(u); await new Promise(r => setTimeout(r, 300)); }
  const down = urls.filter(u => !(pages[u].status >= 200 && pages[u].status < 300));
  // watch: exact terms that must stay on the page (for quotes that summarize a list); otherwise the quote's fragments
  const quoted = R.facts.filter(f => f.quote || (f.watch || []).length);
  const missing = [];
  for (const f of quoted) {
    const u = f.sources[0], p = pages[u];
    if (!p.text) continue;   // already listed as unreachable
    const need = (f.watch || []).length ? f.watch.map(norm) : fragments(f.quote);
    const gone = need.filter(x => !p.text.includes(x));
    if (gone.length) missing.push({ f, u, gone });
  }
  const lines = [`Checked ${urls.length} source pages and ${quoted.length} verbatim quotes from \`tests/facts.json\`.`, ''];
  if (down.length) {
    lines.push(`### Pages that could not be loaded (${down.length})`, '');
    down.forEach(u => lines.push(`- ${u} (${pages[u].status ? 'HTTP ' + pages[u].status : pages[u].error})`));
    lines.push('');
  }
  if (missing.length) {
    lines.push(`### Quotes no longer found on their page (${missing.length})`, '', 'The page may have changed. Re-check the fact, fix the content if needed, and update the quote in `tests/facts.json`.', '');
    missing.forEach(({ f, u, gone }) => lines.push(`- **${f.id}** (${f.where}): "${f.quote || f.watch.join(', ')}" — missing: "${gone.slice(0, 3).join('", "').slice(0, 120)}" — ${u}`));
    lines.push('');
  }
  if (!down.length && !missing.length) lines.push('Everything was found. No action needed.');
  const report = lines.join('\n');
  console.log(report);
  if (out) fs.writeFileSync(out, report + '\n');
  process.exit(down.length || missing.length ? 1 : 0);
})();
