/**
 * Google Sheets data fetcher.
 *
 * Data is stored in a single public Google Spreadsheet with one tab per dataset.
 * The Sheet ID is configured via NEXT_PUBLIC_GOOGLE_SHEET_ID.
 *
 * Works in both server components (benefits from Next.js fetch caching) and
 * client components (called inside useEffect; the `next` option is ignored by browsers).
 */

const SHEET_ID = process.env.NEXT_PUBLIC_GOOGLE_SHEET_ID;

function parseGviz(text: string): Record<string, string>[] {
  const start = text.indexOf('{');
  const end = text.lastIndexOf('}');
  if (start === -1 || end === -1)
    throw new Error('Unexpected gviz response format');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const json: any = JSON.parse(text.slice(start, end + 1));
  const cols: string[] = json.table.cols.map((c: { label: string }) => c.label);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return json.table.rows.map((row: { c: Array<{ v: unknown } | null> }) => {
    const obj: Record<string, string> = {};
    row.c.forEach((cell, i) => {
      if (cols[i]) obj[cols[i]] = cell?.v?.toString() ?? '';
    });
    return obj;
  });
}

async function fetchTab(
  tab: string,
  sheetId = SHEET_ID,
): Promise<Record<string, string>[]> {
  if (!sheetId)
    throw new Error('NEXT_PUBLIC_GOOGLE_SHEET_ID is not configured');
  const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json&sheet=${encodeURIComponent(tab)}&headers=1`;
  // `next.revalidate` is a Next.js server-side fetch extension (ignored in browsers).
  const res = await fetch(url, { next: { revalidate: 60 } } as RequestInit);
  if (!res.ok)
    throw new Error(`Failed to fetch sheet "${tab}": HTTP ${res.status}`);
  return parseGviz(await res.text());
}

// ── Typed loaders ──────────────────────────────────────────────────────────────

export async function fetchStudentExperience(sheetId?: string) {
  const rows = await fetchTab('Student Experience', sheetId);
  return rows.map((r) => ({
    id: r.id,
    tag: r.tag,
    title: r.title,
    description: r.description,
    imageUrl: r.imageUrl || undefined,
    imageAlt: r.imageAlt || undefined,
    reverse: r.reverse?.toLowerCase() === 'true',
    ctaText: r.ctaText || undefined,
    ctaLink: r.ctaLink || undefined,
  }));
}

export async function fetchTestimonials(sheetId?: string) {
  const rows = await fetchTab('Testimonials', sheetId);
  return rows.map((r, i) => ({
    id: Number(r.id) || i,
    name: r.name || undefined,
    role: r.role,
    content: r.content,
    avatar: r.avatar || undefined,
  }));
}

export async function fetchGradeGroups(sheetId?: string) {
  const rows = await fetchTab('Grade Groups', sheetId);
  return rows.map((r) => ({
    grade: Number(r.grade),
    whatsappUrl: r.whatsappUrl,
    groupImageUrl: r.groupImageUrl,
    // roomParents stored as comma-separated names, e.g. "Yi Wang, Manique Bloom"
    roomParents: r.roomParents
      .split(',')
      .map((name) => ({ name: name.trim() }))
      .filter((p) => p.name),
  }));
}

export async function fetchEvents(sheetId?: string) {
  const rows = await fetchTab('Events', sheetId);
  return rows.map((r) => ({
    id: r.id,
    title: r.title,
    summary: r.summary,
    description: r.description,
    eventDate: r.eventDate,
    expirationDate: r.expirationDate,
    category: r.category,
    imageUrl: r.imageUrl || undefined,
  }));
}

export async function fetchFAQ(sheetId?: string) {
  const rows = await fetchTab('faq', sheetId);
  return rows.map((r) => ({
    question: r.question,
    answer: r.answer,
  }));
}

export async function fetchParentAmbassador(sheetId?: string) {
  const rows = await fetchTab('parent-ambassadors', sheetId);
  const r = rows[0];
  if (!r) return null;
  return {
    id: r.id || 'parent-ambassadors',
    title: r.title,
    description: r.description,
    imageUrl: r.imageUrl,
    imageAlt: r.imageAlt,
    reverse: r.reverse?.toLowerCase() === 'true',
    ctaText: r.ctaText || undefined,
    ctaLink: r.ctaLink || undefined,
  };
}

export async function fetchQuickLinks(sheetId?: string) {
  const rows = await fetchTab('Quick Links', sheetId);
  return rows.map((r) => ({
    id: r.id,
    label: r.label,
    url: r.url,
    iconName: r.icon,
    description: r.description || undefined,
  }));
}
