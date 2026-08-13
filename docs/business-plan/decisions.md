# Decisions log — Global Medical Diagnostics

## 2026-08-13 — Domain / email updated to globalmedicaldx.com

- **Domain:** globalmedicaldx.com
- **Email:** info@globalmedicaldx.com (updated sitewide from the prior domain email)

**Rationale:** Owner confirmed live domain; all site pages, scripts, and business-plan docs updated to the new address.

## 2026-08-12 — Marketing site scaffolded

- **Site type:** Plain static HTML/CSS/JS (no build step)
- **Pages:** Home, Services, For Providers, Patient Prep/FAQ, About, Contact
- **Primary CTA:** Refer a patient (mailto referral form + phone)
- **Location:** Repo root (`index.html`, `css/`, `js/`)

**Rationale:** Implement approved `website-content.md` as the first public marketing surface for Global Medical Diagnostics.

## 2026-08-01 — Core positioning locked

- **Business name:** Global Medical Diagnostics
- **Service area:** Southern California and Arizona
- **Delivery model:** Mobile service
- **Offer scope:** Clinical-only (no performance/athlete consumer line for now)
- **Payment:** Insurance billing and cash-pay
- **Stage:** Already operating (live)

**Rationale:** Confirmed by owner during business-plan drafting. Plan and website messaging updated to match.

## 2026-08-01 — Contact, metros, SLA, pricing, and volume plan

- **Email:** info@globalmedicaldx.com
- **Phone:** (480) 806-9044
- **Priority metros:** Los Angeles, Orange County, San Diego, Phoenix, Tucson
- **Report turnaround:** 3 days
- **Cash-pay price:** $450
- **Blended planning revenue / test:** $250
- **Volume / revenue targets:**
  - Year 1: 4,000 tests → $1,000,000
  - Year 2: 6,000 tests → $1,500,000
  - Year 3: 9,000 tests → $2,250,000
  - Year 4: 12,000 tests → $3,000,000
  - Year 5: 15,000 tests → $3,750,000

**Rationale:** Owner-provided operating and commercial inputs. Note: cash-pay list price ($450) differs from blended revenue assumption ($250) used in the multi-year plan.

## 2026-08-01 — Year 1 cost structure + website status

- **Per-test variable costs (total $120):**
  - Technician payroll: $30
  - Medical supplies: $15
  - Interpretation professional fees: $50
  - Transportation: $10
  - Reports: $10
  - Insurance: $5
- **Unit economics:** $250 revenue − $120 variable = **$130 contribution / test (52%)**
- **Year 1 at 4,000 tests:** $1,000,000 revenue − $480,000 variable costs = **$520,000 contribution** (before fixed overhead)
- **Website:** Under construction

**Rationale:** Owner-provided cost stack and site status. Multi-year contribution projection assumes the same $120/test structure until updated.

## 2026-08-01 — Fixed overhead added

- **Fixed overhead:** $35 per test
- **Fully loaded cost / test:** $120 variable + $35 fixed = **$155**
- **Net margin / test:** $250 − $155 = **$95 (38%)**
- **Year 1 at 4,000 tests:** $140,000 fixed overhead → **$380,000 net** *(superseded by volume revision below)*
- **Year 5 at 15,000 tests (same rates):** $525,000 fixed overhead → **$1,425,000 net** *(superseded by volume revision below)*

**Rationale:** Owner-provided fixed overhead rate. Multi-year net assumes $35/test continues to scale with volume.

## 2026-08-01 — Volume targets revised upward

| Year | Prior tests | New tests | Revenue (@ $250) | Net (@ $95/test) |
| --- | ---: | ---: | ---: | ---: |
| Year 1 | 4,000 | 5,500 | $1,375,000 | $522,500 |
| Year 2 | 6,000 | 8,500 | $2,125,000 | $807,500 |
| Year 3 | 9,000 | 12,000 | $3,000,000 | $1,140,000 |
| Year 4 | 12,000 | 16,000 | $4,000,000 | $1,520,000 |
| Year 5 | 15,000 | 20,000 | $5,000,000 | $1,900,000 |

**Rationale:** Owner-requested volume increase. Year 5 destination confirmed as 20,000 (prior plan was 15,000). Unit economics unchanged: $250 revenue, $120 variable, $35 fixed overhead, $95 net per test.
