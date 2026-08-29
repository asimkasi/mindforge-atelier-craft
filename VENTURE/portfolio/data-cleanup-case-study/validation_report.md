# Validation report — Chicago Food Inspections cleanup

Input file: `raw_food_inspections.csv`

## Step 0 — structural integrity scan

- Physical data rows read: **50,000**
- Columns declared by header: **15**
- Rows with a wrong field count (corrupted/truncated): **0**
- The file parsed cleanly; no rows needed quarantining.

## Step 1 — whitespace normalization

- `dba_name`: **1,185** cells had leading/trailing or doubled internal whitespace — normalized
- `aka_name`: **1,237** cells had leading/trailing or doubled internal whitespace — normalized
- `facility_type`: **3** cells had leading/trailing or doubled internal whitespace — normalized
- `address`: **46,526** cells had leading/trailing or doubled internal whitespace — normalized
- Total cells fixed: **48,951**

## Step 2 — date standardization

- All dates rewritten from `YYYY-MM-DDTHH:MM:SS.mmm` timestamps to plain `YYYY-MM-DD`
- Unparseable dates: **0**
- Date range after cleaning: **2010-01-04** to **2012-09-13**

## Step 3 — city standardization

- Distinct city spellings before: **43** — after: **30**
- Casing unified to UPPERCASE (**114** cells changed case only)
- Documented misspellings corrected (**25** cells):
  - CCHICAGO -> CHICAGO: 14
  - CHCHICAGO -> CHICAGO: 4
  - CHCICAGO -> CHICAGO: 2
  - CHICAGOCHICAGO -> CHICAGO: 2
  - CHICAGOI -> CHICAGO: 2
  - OOLYMPIA FIELDS -> OLYMPIA FIELDS: 1
- Non-city junk values cleared and flagged (**11** cells): CHARLES A HAYES, INACTIVE

## Step 4 — state and ZIP validation

- ZIPs failing the 5-digit check: **0** (flagged)
- Missing states filled with `IL` from a 60xxx ZIP and flagged: **2**

## Step 5 — risk category validation

- Valid values: Risk 1 (High), Risk 2 (Medium), Risk 3 (Low)
- Out-of-vocabulary values cleared and flagged: **3** ('All')

## Step 6 — category canonicalization

- `facility_type`: **290** distinct spellings -> **263** canonical labels (86 cells rewritten, 4 of them via the explicit spelling-fix table)
- `inspection_type`: **98** distinct spellings -> **88** canonical labels (40 cells rewritten, 0 of them via the explicit spelling-fix table)

  Compound labels like `Grocery/Restaurant` vs `Restaurant/Grocery` are left as-is: merging them changes meaning, so on client work they ship as a review list, not a silent merge.

## Step 7 — license number placeholders

- `0` used as a fake license number: **235** rows — cleared and flagged

## Step 8 — coordinate sanity check

- Coordinates present but outside the Chicago-area bounding box (lat (41.4, 42.3), lon (-88.3, -87.3)) or non-numeric: **0** rows (flagged, not altered)

## Step 9 — duplicate removal

- Exact duplicate records (identical in all 14 content columns, only the row ID differs): **113** removed — each one written to `duplicates_removed.csv` for audit
- Near-duplicates (same license + date + inspection type, other fields differ): **571** rows flagged `possible_duplicate_review` — NOT removed, because resolving them needs business context

## Summary — before / after

| Metric | Before | After |
|---|---|---|
| Rows | 50,000 | 49,887 |
| Exact duplicate records | 113 | 0 |
| Cells with stray whitespace | 48,951 | 0 |
| Distinct `city` spellings | 43 | 30 |
| Distinct `facility_type` labels | 290 | 263 |
| Distinct `inspection_type` labels | 98 | 88 |
| Invalid `risk` values | 3 | 0 |
| Placeholder license numbers (`0`) | 235 | 0 |
| Date format | ISO timestamp w/ fake midnight time | `YYYY-MM-DD` |

Rows carrying at least one `qa_flags` entry for client review: **815** (1.6%)

### Missing values in the cleaned file (reported, not invented)

| Column | Missing | % |
|---|---|---|
| aka_name | 944 | 1.89% |
| license_ | 235 | 0.47% |
| facility_type | 2,254 | 4.52% |
| risk | 36 | 0.07% |
| city | 37 | 0.07% |
| zip | 14 | 0.03% |
| latitude | 187 | 0.37% |
| longitude | 187 | 0.37% |

Flag vocabulary used in `qa_flags`: see Step 3-9 above. Every flagged row is intact in `cleaned.csv`; nothing ambiguous was deleted.
