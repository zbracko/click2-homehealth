#!/usr/bin/env node
/**
 * ═══════════════════════════════════════════════════════════════
 *  Senior Trusted Home Care — SEO Micro-Page Generator v2
 * ═══════════════════════════════════════════════════════════════
 *
 *  Each micro-page is a FULL COPY of the main index.html with
 *  targeted text replacements for SEO (title, meta, hero, schema).
 *  Same wizard, same forms, same JS, same CSS — everything works.
 *
 *  MATRIX:
 *    8 services  ×  44 locations  =  352 service-city pages
 *    44 city-only pages  (area hub pages)
 *    8 service-only pages
 *    8 audiences × 19 major cities = 152 audience-city pages
 *    2 hub pages (services index, areas index)
 *    ─────────────────────────────────────
 *    558 total pages + sitemap.xml + robots.txt
 *
 *  USAGE:
 *    node generate.cjs
 *
 *  OUTPUT:  ../dist/
 * ═══════════════════════════════════════════════════════════════
 */

const fs = require('fs');
const path = require('path');

// ─── CONFIG ─────────────────────────────────────────────────
const DOMAIN = 'https://zbracko.github.io/click2-homehealth';
const DIST = path.join(__dirname, '..', 'dist');
const TEMPLATE_PATH = path.join(__dirname, '..', 'index.html');
const PHONE = '561-621-5700';
const COMPANY = 'Senior Trusted Home Care';

// ─── SERVICES ───────────────────────────────────────────────
const SERVICES = [
  {
    slug: 'companionship-care',
    name: 'Companionship & Support',
    shortName: 'Companionship Care',
    heroTitle: 'Compassionate Companionship',
    description: 'Genuine companionship and emotional support to help seniors feel valued, connected, and engaged.',
    subtitle: 'friendly conversation, activity companionship, and emotional support — reducing loneliness and bringing joy every day',
  },
  {
    slug: 'personal-care',
    name: 'Personal Care',
    shortName: 'Personal Care',
    heroTitle: 'Dignified Personal Care',
    description: 'Personalized assistance with bathing, grooming, dressing, toileting, and mobility.',
    subtitle: 'bathing, grooming, dressing, and mobility assistance — delivered with dignity, patience, and respect',
  },
  {
    slug: 'light-housekeeping',
    name: 'Light Household Help',
    shortName: 'Light Housekeeping',
    heroTitle: 'Reliable Household Help',
    description: 'Light cleaning, laundry, meal preparation, and dishwashing so clients can live safely at home.',
    subtitle: 'light cleaning, laundry, grocery shopping, and nutritious meal preparation — keeping your loved one\'s home safe and comfortable',
  },
  {
    slug: 'medication-reminders',
    name: 'Medication Reminders & Safety Checks',
    shortName: 'Medication Reminders',
    heroTitle: 'Medication Reminders & Home Safety',
    description: 'Timely medication reminders and safety checks to help seniors stay on schedule and maintain a secure living environment.',
    subtitle: 'medication schedule management, pill organization, and regular home safety assessments — preventing missed doses and hazards',
  },
  {
    slug: 'memory-care',
    name: 'Memory Loss Care',
    shortName: 'Memory Care',
    heroTitle: 'Compassionate Memory Care',
    description: 'Gentle, structured support for individuals living with Alzheimer\'s or other forms of dementia.',
    subtitle: 'specialized Alzheimer\'s and dementia support with trained caregivers — structured routines, cognitive stimulation, and family respite',
  },
  {
    slug: 'facility-care',
    name: 'Personal Care in Facilities',
    shortName: 'Facility Care',
    heroTitle: 'Enhanced Facility Care',
    description: 'Personalized care for residents in assisted living or nursing facilities who need extra support.',
    subtitle: 'one-on-one supplemental care inside assisted living and nursing facilities — companionship, personal care, and family advocacy',
  },
  {
    slug: 'post-surgery-care',
    name: 'Post Surgery Care',
    shortName: 'Post-Surgery Care',
    heroTitle: 'Post-Surgery Recovery Care',
    description: 'Smooth, comfortable recovery at home with assistance for mobility, wound care reminders, and medication support.',
    subtitle: 'mobility assistance, wound care reminders, medication management, and nutritious meals — accelerating recovery and preventing complications',
  },
  {
    slug: '24-hour-live-in-care',
    name: '24-Hour Live-In Care',
    shortName: '24/7 Live-In Care',
    heroTitle: 'Round-the-Clock Live-In Care',
    description: 'Continuous support with a dedicated caregiver on-site day and night.',
    subtitle: 'a dedicated caregiver on-site 24 hours a day — personal care, meals, medication reminders, and emergency assistance around the clock',
  },
];

// ─── LOCATIONS ──────────────────────────────────────────────
const LOCATIONS = [
  { slug: 'west-palm-beach', name: 'West Palm Beach', county: 'Palm Beach', region: 'West Palm Beach' },
  { slug: 'northwood', name: 'Northwood', county: 'Palm Beach', region: 'West Palm Beach' },
  { slug: 'el-cid', name: 'El Cid', county: 'Palm Beach', region: 'West Palm Beach' },
  { slug: 'flamingo-park', name: 'Flamingo Park', county: 'Palm Beach', region: 'West Palm Beach' },
  { slug: 'grandview-heights', name: 'Grandview Heights', county: 'Palm Beach', region: 'West Palm Beach' },
  { slug: 'south-end', name: 'South End', county: 'Palm Beach', region: 'West Palm Beach' },
  { slug: 'prospect-park', name: 'Prospect Park', county: 'Palm Beach', region: 'West Palm Beach' },
  { slug: 'palm-beach-lakes', name: 'Palm Beach Lakes', county: 'Palm Beach', region: 'West Palm Beach' },
  { slug: 'westgate', name: 'Westgate', county: 'Palm Beach', region: 'West Palm Beach' },
  { slug: 'century-village', name: 'Century Village', county: 'Palm Beach', region: 'West Palm Beach' },
  { slug: 'village-of-palm-springs', name: 'Village of Palm Springs', county: 'Palm Beach', region: 'West Palm Beach Area' },
  { slug: 'palm-beach-gardens', name: 'Palm Beach Gardens', county: 'Palm Beach', region: 'North Palm Beach' },
  { slug: 'palm-beach', name: 'Palm Beach', county: 'Palm Beach', region: 'Town of Palm Beach' },
  { slug: 'lake-worth-beach', name: 'Lake Worth Beach', county: 'Palm Beach', region: 'Central County' },
  { slug: 'lantana', name: 'Lantana', county: 'Palm Beach', region: 'Central County' },
  { slug: 'boynton-beach', name: 'Boynton Beach', county: 'Palm Beach', region: 'South County' },
  { slug: 'delray-beach', name: 'Delray Beach', county: 'Palm Beach', region: 'South County' },
  { slug: 'boca-raton', name: 'Boca Raton', county: 'Palm Beach', region: 'South County' },
  { slug: 'jupiter', name: 'Jupiter', county: 'Palm Beach', region: 'North County' },
  { slug: 'juno-beach', name: 'Juno Beach', county: 'Palm Beach', region: 'North County' },
  { slug: 'tequesta', name: 'Tequesta', county: 'Palm Beach', region: 'North County' },
  { slug: 'north-palm-beach', name: 'North Palm Beach', county: 'Palm Beach', region: 'North County' },
  { slug: 'royal-palm-beach', name: 'Royal Palm Beach', county: 'Palm Beach', region: 'Western Communities' },
  { slug: 'wellington', name: 'Wellington', county: 'Palm Beach', region: 'Western Communities' },
  { slug: 'greenacres', name: 'Greenacres', county: 'Palm Beach', region: 'Central County' },
  { slug: 'riviera-beach', name: 'Riviera Beach', county: 'Palm Beach', region: 'Central County' },
  { slug: 'lake-park', name: 'Lake Park', county: 'Palm Beach', region: 'North County' },
  { slug: 'loxahatchee', name: 'Loxahatchee', county: 'Palm Beach', region: 'Western Communities' },
  { slug: 'fort-lauderdale', name: 'Fort Lauderdale', county: 'Broward', region: 'Central Broward' },
  { slug: 'pompano-beach', name: 'Pompano Beach', county: 'Broward', region: 'North Broward' },
  { slug: 'deerfield-beach', name: 'Deerfield Beach', county: 'Broward', region: 'North Broward' },
  { slug: 'coral-springs', name: 'Coral Springs', county: 'Broward', region: 'West Broward' },
  { slug: 'coconut-creek', name: 'Coconut Creek', county: 'Broward', region: 'North Broward' },
  { slug: 'margate', name: 'Margate', county: 'Broward', region: 'North Broward' },
  { slug: 'parkland', name: 'Parkland', county: 'Broward', region: 'West Broward' },
  { slug: 'plantation', name: 'Plantation', county: 'Broward', region: 'Central Broward' },
  { slug: 'sunrise', name: 'Sunrise', county: 'Broward', region: 'Central Broward' },
  { slug: 'hollywood', name: 'Hollywood', county: 'Broward', region: 'South Broward' },
  { slug: 'pembroke-pines', name: 'Pembroke Pines', county: 'Broward', region: 'South Broward' },
  { slug: 'davie', name: 'Davie', county: 'Broward', region: 'Central Broward' },
  { slug: 'weston', name: 'Weston', county: 'Broward', region: 'West Broward' },
  { slug: 'miramar', name: 'Miramar', county: 'Broward', region: 'South Broward' },
  { slug: 'hallandale-beach', name: 'Hallandale Beach', county: 'Broward', region: 'South Broward' },
  { slug: 'tamarac', name: 'Tamarac', county: 'Broward', region: 'North Broward' },
];

// ─── AUDIENCE VARIATIONS ────────────────────────────────────
const AUDIENCES = [
  { slug: 'elderly-care', name: 'Elderly Care', heroTitle: 'Trusted Elderly Care', description: 'Compassionate home care services designed specifically for elderly adults who want to age safely and comfortably at home.', subtitle: 'dedicated caregivers for elderly adults — companionship, personal care, medication reminders, and safety support' },
  { slug: 'senior-care', name: 'Senior Care', heroTitle: 'Professional Senior Care', description: 'Professional in-home senior care services including companionship, personal care, and 24/7 support for aging adults.', subtitle: 'professional in-home senior care — from a few hours of companionship to full-time live-in support' },
  { slug: 'home-health-aide', name: 'Home Health Aide', heroTitle: 'Certified Home Health Aides', description: 'Certified, background-checked home health aides providing skilled assistance with daily living activities in your home.', subtitle: 'certified home health aides trained in bathing, grooming, medication reminders, mobility assistance, and more' },
  { slug: 'caregiver-services', name: 'Caregiver Services', heroTitle: 'Professional Caregiver Services', description: 'Licensed, insured, and bonded professional caregiver services for families across South Florida.', subtitle: 'licensed, bonded, and insured caregivers matched to your loved one\'s personality, needs, and schedule' },
  { slug: 'respite-care', name: 'Respite Care', heroTitle: 'Flexible Respite Care', description: 'Give yourself a break. Our respite care provides temporary relief for family caregivers while ensuring your loved one receives expert attention.', subtitle: 'temporary relief for family caregivers — a few hours, overnight, or extended stays so you can rest and recharge' },
  { slug: 'alzheimers-care', name: "Alzheimer's Care", heroTitle: "Specialized Alzheimer's Care", description: "Expert Alzheimer's and dementia care at home with trained caregivers who understand cognitive decline, behavioral changes, and family support needs.", subtitle: "trained Alzheimer's and dementia caregivers — structured routines, cognitive stimulation, behavioral management, and family support" },
  { slug: 'aging-in-place', name: 'Aging in Place', heroTitle: 'Aging in Place Support', description: 'Everything your loved one needs to safely age in the comfort of their own home — from daily living help to 24/7 live-in care.', subtitle: 'everything needed to safely age at home — daily living help, medication management, companionship, and 24/7 live-in care' },
  { slug: 'veteran-home-care', name: 'Veteran Home Care', heroTitle: 'Home Care for Veterans', description: 'Specialized home care services for veterans. We can help navigate VA Aid & Attendance benefits to cover the cost of in-home care.', subtitle: 'dedicated home care for veterans — we help navigate VA Aid & Attendance benefits to cover your care costs' },
];

const MAJOR_CITIES = [
  'west-palm-beach','boca-raton','delray-beach','boynton-beach','jupiter',
  'palm-beach-gardens','wellington','royal-palm-beach','lake-worth-beach',
  'fort-lauderdale','pompano-beach','coral-springs','hollywood','pembroke-pines',
  'plantation','coconut-creek','deerfield-beach','weston','parkland',
];

// ─── HELPERS ────────────────────────────────────────────────
function mkdirp(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function escHtml(s) {
  return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function depthPrefix(depth) {
  return '../'.repeat(depth);
}

// ─── READ TEMPLATE ──────────────────────────────────────────
const TEMPLATE = fs.readFileSync(TEMPLATE_PATH, 'utf8');

/**
 * Build a micro-page by cloning the main index.html and replacing
 * key strings for SEO personalization.
 */
function buildPage(opts) {
  const prefix = depthPrefix(opts.depth);
  let html = TEMPLATE;

  // ── 1. Fix asset paths (CSS, logo) ──
  html = html.replace(/href="styles\.css/g, `href="${prefix}styles.css`);
  html = html.replace(/src="Logotext\.png"/g, `src="${prefix}Logotext.png"`);
  // Fix dist/ links to absolute
  html = html.replace(/href="dist\/sitemap\.xml"/g, `href="${DOMAIN}/dist/sitemap.xml"`);
  html = html.replace(/href="dist\/services\/"/g, `href="${DOMAIN}/dist/services/"`);
  html = html.replace(/href="dist\/areas\/"/g, `href="${DOMAIN}/dist/areas/"`);

  // ── 2. <title> ──
  html = html.replace(
    /<title>[^<]+<\/title>/,
    `<title>${escHtml(opts.pageTitle)}</title>`
  );

  // ── 3. Meta description ──
  html = html.replace(
    /<meta name="description" content="[^"]*">/,
    `<meta name="description" content="${escHtml(opts.metaDesc)}">`
  );

  // ── 4. OG tags ──
  html = html.replace(
    /<meta property="og:title" content="[^"]*">/,
    `<meta property="og:title" content="${escHtml(opts.ogTitle)}">`
  );
  html = html.replace(
    /<meta property="og:description" content="[^"]*">/,
    `<meta property="og:description" content="${escHtml(opts.metaDesc)}">`
  );

  // ── 5. Canonical URL ──
  if (!html.includes('rel="canonical"')) {
    html = html.replace(
      /<meta property="og:type" content="website">/,
      `<meta property="og:type" content="website">\n  <link rel="canonical" href="${opts.canonicalUrl}">`
    );
  }

  // ── 6. Hero badge text ──
  html = html.replace(
    /West Palm Beach&#39;s Trusted Home Care Provider|West Palm Beach's Trusted Home Care Provider/g,
    opts.heroBadge
  );

  // ── 7. Hero <h1> ──
  html = html.replace(
    /Compassionate Care<br>/,
    `${escHtml(opts.heroHeadline)}<br>`
  );

  // ── 8. Hero subtitle ──
  html = html.replace(
    /We provide <strong>personalized in-home care<\/strong> for seniors across South Florida &mdash; from companionship to 24\/7 live-in care &mdash; so your loved ones feel safe, supported, and valued every day\./,
    `We provide <strong>personalized in-home care</strong> &mdash; ${opts.heroSubtitle} &mdash; so your loved ones feel safe, supported, and valued every day.`
  );

  // ── 9. Geo meta ──
  if (opts.cityName) {
    html = html.replace(
      /<meta name="geo\.placename" content="[^"]*">/,
      `<meta name="geo.placename" content="${escHtml(opts.cityName)}, Florida">`
    );
  }

  // ── 10. Floating CTA city ──
  if (opts.cityName) {
    html = html.replace(
      /West Palm Beach &middot; 24\/7 Support/g,
      `${escHtml(opts.cityName)} &middot; 24/7 Support`
    );
  }

  // ── 11. Top bar text ──
  if (opts.cityName) {
    html = html.replace(
      /Compassionate care for South Florida seniors\./,
      `Compassionate care for ${escHtml(opts.cityName)} seniors.`
    );
  }

  // ── 12. Social proof toast — inject city ──
  if (opts.cityName) {
    html = html.replace(
      /city: 'West Palm Beach, FL', action: 'booked a free in-home consultation'/,
      `city: '${opts.cityName.replace(/'/g,"\\'")}', action: 'booked a free in-home consultation'`
    );
  }

  // ── 13. Area card click handler path fix ──
  html = html.replace(
    /window\.open\('dist\/areas\/' \+ slug \+ '\/'/g,
    `window.open('${prefix}dist/areas/' + slug + '/'`
  );

  return html;
}


// ═══════════════════════════════════════════════════════════════
//  GENERATION
// ═══════════════════════════════════════════════════════════════

const sitemapUrls = [];
let pageCount = 0;

function writePage(filePath, html) {
  const dir = path.dirname(filePath);
  mkdirp(dir);
  fs.writeFileSync(filePath, html);
  pageCount++;
}

// Clean old dist
if (fs.existsSync(DIST)) {
  fs.rmSync(DIST, { recursive: true, force: true });
}

console.log('\n🏠 Senior Trusted Home Care — SEO Micro-Page Generator v2');
console.log('  Each micro-page = full landing page (same as main index.html)');
console.log('══════════════════════════════════════════════════════\n');
const t0 = Date.now();

// ── 1. SERVICE × CITY combo pages (352) ────────────────────
SERVICES.forEach(svc => {
  LOCATIONS.forEach(loc => {
    const url = `${DOMAIN}/dist/${svc.slug}/${loc.slug}/`;
    const html = buildPage({
      pageTitle: `${svc.shortName} in ${loc.name}, FL — ${COMPANY}`,
      metaDesc: `${svc.description} ${COMPANY} provides trusted ${svc.shortName.toLowerCase()} services in ${loc.name}, ${loc.county} County, FL. Free consultation: ${PHONE}.`,
      heroBadge: `${loc.name}'s Trusted ${svc.shortName} Provider`,
      heroHeadline: `${svc.heroTitle} in ${loc.name}`,
      heroSubtitle: `${svc.subtitle} for families in ${loc.name} and across ${loc.county} County`,
      canonicalUrl: url,
      ogTitle: `${svc.shortName} in ${loc.name}, FL — ${COMPANY}`,
      depth: 3,
      cityName: loc.name,
      countyName: loc.county,
    });
    writePage(path.join(DIST, svc.slug, loc.slug, 'index.html'), html);
    sitemapUrls.push(url);
  });
});
console.log(`  ✓ ${SERVICES.length} services × ${LOCATIONS.length} locations = ${SERVICES.length * LOCATIONS.length} combo pages`);

// ── 2. CITY-ONLY pages (44) ────────────────────────────────
LOCATIONS.forEach(loc => {
  const url = `${DOMAIN}/dist/areas/${loc.slug}/`;
  const html = buildPage({
    pageTitle: `Home Care Services in ${loc.name}, FL — ${COMPANY}`,
    metaDesc: `${COMPANY} provides compassionate in-home care in ${loc.name}, ${loc.county} County, FL. Companionship, personal care, memory loss support, 24/7 live-in care & more. Free consultation: ${PHONE}.`,
    heroBadge: `${loc.name}'s Trusted Home Care Provider`,
    heroHeadline: `Compassionate Home Care in ${loc.name}`,
    heroSubtitle: `personalized in-home care for seniors in ${loc.name} — from companionship to 24/7 live-in care`,
    canonicalUrl: url,
    ogTitle: `Home Care in ${loc.name}, FL — ${COMPANY}`,
    depth: 3,
    cityName: loc.name,
    countyName: loc.county,
  });
  writePage(path.join(DIST, 'areas', loc.slug, 'index.html'), html);
  sitemapUrls.push(url);
});
console.log(`  ✓ ${LOCATIONS.length} city/area hub pages`);

// ── 3. SERVICE-ONLY pages (8) ──────────────────────────────
SERVICES.forEach(svc => {
  const url = `${DOMAIN}/dist/services/${svc.slug}/`;
  const html = buildPage({
    pageTitle: `${svc.name} — ${COMPANY} | South Florida`,
    metaDesc: `${svc.description} ${COMPANY} offers trusted ${svc.shortName.toLowerCase()} across West Palm Beach, Palm Beach County, and Broward County, FL. Free consultation: ${PHONE}.`,
    heroBadge: `South Florida's Trusted ${svc.shortName} Provider`,
    heroHeadline: svc.heroTitle,
    heroSubtitle: `${svc.subtitle} across West Palm Beach, Palm Beach County, and Broward County`,
    canonicalUrl: url,
    ogTitle: `${svc.name} — ${COMPANY}`,
    depth: 3,
  });
  writePage(path.join(DIST, 'services', svc.slug, 'index.html'), html);
  sitemapUrls.push(url);
});
console.log(`  ✓ ${SERVICES.length} service detail pages`);

// ── 4. AUDIENCE × MAJOR CITY pages (152) ───────────────────
const majorLocs = LOCATIONS.filter(l => MAJOR_CITIES.includes(l.slug));
AUDIENCES.forEach(aud => {
  majorLocs.forEach(loc => {
    const url = `${DOMAIN}/dist/${aud.slug}/${loc.slug}/`;
    const html = buildPage({
      pageTitle: `${aud.name} in ${loc.name}, FL — ${COMPANY}`,
      metaDesc: `${aud.description} Serving ${loc.name}, ${loc.county} County, FL. Free consultation: ${PHONE}.`,
      heroBadge: `${loc.name}'s Trusted ${aud.name} Provider`,
      heroHeadline: `${aud.heroTitle} in ${loc.name}`,
      heroSubtitle: `${aud.subtitle} for families in ${loc.name} and across ${loc.county} County`,
      canonicalUrl: url,
      ogTitle: `${aud.name} in ${loc.name}, FL — ${COMPANY}`,
      depth: 3,
      cityName: loc.name,
      countyName: loc.county,
    });
    writePage(path.join(DIST, aud.slug, loc.slug, 'index.html'), html);
    sitemapUrls.push(url);
  });
});
console.log(`  ✓ ${AUDIENCES.length} audiences × ${majorLocs.length} major cities = ${AUDIENCES.length * majorLocs.length} audience pages`);

// ── 5. HUB: Services index ─────────────────────────────────
{
  const url = `${DOMAIN}/dist/services/`;
  const html = buildPage({
    pageTitle: `All Home Care Services — ${COMPANY} | South Florida`,
    metaDesc: `Browse all home care services from ${COMPANY}: companionship, personal care, memory care, post-surgery recovery, medication reminders, 24/7 live-in care & more across South Florida.`,
    heroBadge: `South Florida's Full-Service Home Care Provider`,
    heroHeadline: 'All Our Home Care Services',
    heroSubtitle: 'companionship, personal care, memory care, post-surgery recovery, medication reminders, light housekeeping, facility care, and 24/7 live-in care',
    canonicalUrl: url,
    ogTitle: `All Services — ${COMPANY}`,
    depth: 2,
  });
  writePage(path.join(DIST, 'services', 'index.html'), html);
  sitemapUrls.push(url);
}

// ── 6. HUB: Areas index ────────────────────────────────────
{
  const url = `${DOMAIN}/dist/areas/`;
  const html = buildPage({
    pageTitle: `Service Areas — ${COMPANY} | Palm Beach & Broward County`,
    metaDesc: `${COMPANY} serves 44+ cities and neighborhoods across Palm Beach County and Broward County, FL. Find compassionate in-home care near you. Free consultation: ${PHONE}.`,
    heroBadge: `Serving 44+ Communities Across South Florida`,
    heroHeadline: 'Home Care Across South Florida',
    heroSubtitle: 'personalized in-home care across 44+ cities and neighborhoods in Palm Beach County and Broward County',
    canonicalUrl: url,
    ogTitle: `Service Areas — ${COMPANY}`,
    depth: 2,
  });
  writePage(path.join(DIST, 'areas', 'index.html'), html);
  sitemapUrls.push(url);
}

console.log(`  ✓ 2 hub pages (services + areas)`);

// ── 7. SITEMAP.XML ──────────────────────────────────────────
const today = new Date().toISOString().split('T')[0];
let sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
sitemap += `  <url><loc>${DOMAIN}/</loc><lastmod>${today}</lastmod><changefreq>weekly</changefreq><priority>1.0</priority></url>\n`;
sitemapUrls.forEach(u => {
  sitemap += `  <url><loc>${u}</loc><lastmod>${today}</lastmod><changefreq>monthly</changefreq><priority>0.7</priority></url>\n`;
});
sitemap += `</urlset>\n`;
fs.writeFileSync(path.join(DIST, 'sitemap.xml'), sitemap);

// ── 8. ROBOTS.TXT ───────────────────────────────────────────
fs.writeFileSync(path.join(DIST, 'robots.txt'),
  `User-agent: *\nAllow: /\n\nSitemap: ${DOMAIN}/dist/sitemap.xml\n`);

const elapsed = ((Date.now() - t0) / 1000).toFixed(1);
console.log(`\n✅ Generated ${pageCount} full landing pages in ${elapsed}s`);
console.log(`📄 Sitemap: ${sitemapUrls.length + 1} URLs`);
console.log(`📁 Output: ${DIST}\n`);
