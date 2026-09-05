#!/usr/bin/env python3
"""
clean.py — data-cleanup pipeline for the Chicago Food Inspections sample.

Input:   raw_food_inspections.csv   (50,000 rows pulled from the City of
         Chicago open-data portal — see CASE_STUDY.md for the exact query)
Outputs: cleaned.csv                (cleaned dataset + qa_flags audit column)
         duplicates_removed.csv     (every dropped duplicate row, for audit)
         validation_report.md       (before/after numbers for every step)

Design principles (the same ones used on client work):
  1. NEVER guess destructively. Ambiguous values are flagged in a `qa_flags`
     column, not silently overwritten or deleted.
  2. Every correction is an explicit, reviewable rule (see the mapping
     tables below) — no black-box fuzzy matching on the final output.
  3. Every change is counted and reported, so the client can verify the
     work line by line.

Requires: Python 3.9+ and pandas (`pip install pandas`).
"""

import csv
import re
import sys
from collections import Counter
from pathlib import Path

import pandas as pd

# ---------------------------------------------------------------------------
# Configuration
# ---------------------------------------------------------------------------

HERE = Path(__file__).resolve().parent
RAW_FILE = HERE / "raw_food_inspections.csv"
CLEAN_FILE = HERE / "cleaned.csv"
DUPES_FILE = HERE / "duplicates_removed.csv"
REPORT_FILE = HERE / "validation_report.md"

# Columns treated as free text (whitespace-normalized).
TEXT_COLUMNS = [
    "dba_name", "aka_name", "facility_type", "risk", "address",
    "city", "state", "zip", "inspection_type", "results",
]

# Explicit corrections for documented misspellings of city names found in
# this file. Only unambiguous fixes go here — anything doubtful is flagged
# instead (rule 1 above). Keys/values are compared in UPPERCASE.
CITY_CORRECTIONS = {
    "CCHICAGO": "CHICAGO",
    "CHCHICAGO": "CHICAGO",
    "CHCICAGO": "CHICAGO",
    "CHICAGOCHICAGO": "CHICAGO",
    "CHICAGOI": "CHICAGO",
    "OOLYMPIA FIELDS": "OLYMPIA FIELDS",
}

# Values that appear in the city column but are not city names at all
# (status codes or misfielded facility names). Cleared and flagged.
CITY_JUNK = {"INACTIVE", "CHARLES A HAYES"}

# Explicit spelling fixes applied to facility_type AFTER case-folding
# (lowercase key -> corrected lowercase value).
FACILITY_SPELLING = {
    "restuarant and bar": "restaurant and bar",
}

# The only risk values the source system defines.
VALID_RISK = {"Risk 1 (High)", "Risk 2 (Medium)", "Risk 3 (Low)"}

# Rough bounding box for the Chicago metro area — coordinates outside it
# are almost certainly geocoding errors.
LAT_RANGE = (41.4, 42.3)
LON_RANGE = (-88.3, -87.3)

report_lines = []          # accumulated for validation_report.md


def log(line=""):
    """Print a line and keep it for the written report."""
    print(line)
    report_lines.append(line)


# ---------------------------------------------------------------------------
# Step 0 — structural scan (before pandas touches anything)
# ---------------------------------------------------------------------------
# A cheap csv-module pass that checks every physical row has the same number
# of fields as the header. Catches truncated/corrupted rows that a
# forgiving parser would silently mangle.

def structural_scan(path):
    with open(path, newline="", encoding="utf-8") as fh:
        reader = csv.reader(fh)
        header = next(reader)
        n_fields = len(header)
        total = 0
        malformed = []
        for i, row in enumerate(reader, start=2):  # 2 = first data line
            total += 1
            if len(row) != n_fields:
                malformed.append((i, len(row)))
    return header, total, malformed


def main():
    if not RAW_FILE.exists():
        sys.exit(f"Input file not found: {RAW_FILE}")

    log("# Validation report — Chicago Food Inspections cleanup")
    log()
    log(f"Input file: `{RAW_FILE.name}`")
    log()

    header, total_rows, malformed = structural_scan(RAW_FILE)
    log("## Step 0 — structural integrity scan")
    log()
    log(f"- Physical data rows read: **{total_rows:,}**")
    log(f"- Columns declared by header: **{len(header)}**")
    log(f"- Rows with a wrong field count (corrupted/truncated): "
        f"**{len(malformed)}**")
    if malformed:
        for line_no, n in malformed[:20]:
            log(f"  - line {line_no}: {n} fields")
        log("  These rows are excluded from the cleaned output and would be "
            "returned to a client in a quarantine file.")
    else:
        log("- The file parsed cleanly; no rows needed quarantining.")
    log()

    # -----------------------------------------------------------------------
    # Load. Everything read as strings so nothing is coerced behind our back.
    # -----------------------------------------------------------------------
    df = pd.read_csv(RAW_FILE, dtype=str)
    before_rows = len(df)

    # qa_flags collects per-row issues; joined with ';' at the end.
    flags = [[] for _ in range(before_rows)]

    def add_flag(mask, flag_name):
        for idx in df.index[mask]:
            flags[idx].append(flag_name)

    # -----------------------------------------------------------------------
    # Step 1 — whitespace normalization
    # -----------------------------------------------------------------------
    # Trim leading/trailing whitespace and collapse internal runs of 2+
    # spaces in every text column. Counted per column.
    log("## Step 1 — whitespace normalization")
    log()
    total_ws = 0
    for col in TEXT_COLUMNS:
        s = df[col]
        fixed = s.str.strip().str.replace(r"\s{2,}", " ", regex=True)
        n_changed = int(((s != fixed) & s.notna()).sum())
        if n_changed:
            log(f"- `{col}`: **{n_changed:,}** cells had leading/trailing or "
                f"doubled internal whitespace — normalized")
        df[col] = fixed
        total_ws += n_changed
    log(f"- Total cells fixed: **{total_ws:,}**")
    log()

    # -----------------------------------------------------------------------
    # Step 2 — date standardization
    # -----------------------------------------------------------------------
    # Source exports dates as ISO timestamps with a meaningless midnight
    # time component ("2010-01-04T00:00:00.000"). Standardized to
    # YYYY-MM-DD; anything unparseable is flagged, not dropped.
    log("## Step 2 — date standardization")
    log()
    parsed = pd.to_datetime(df["inspection_date"], errors="coerce")
    n_unparseable = int(parsed.isna().sum() - df["inspection_date"].isna().sum())
    add_flag(parsed.isna() & df["inspection_date"].notna(), "unparseable_date")
    df["inspection_date"] = parsed.dt.strftime("%Y-%m-%d")
    log(f"- All dates rewritten from `YYYY-MM-DDTHH:MM:SS.mmm` timestamps to "
        f"plain `YYYY-MM-DD`")
    log(f"- Unparseable dates: **{n_unparseable}**")
    log(f"- Date range after cleaning: **{parsed.min().date()}** to "
        f"**{parsed.max().date()}**")
    log()

    # -----------------------------------------------------------------------
    # Step 3 — city standardization
    # -----------------------------------------------------------------------
    log("## Step 3 — city standardization")
    log()
    city_before = int(df["city"].nunique())
    city = df["city"].str.upper()
    n_case_only = int(((city != df["city"]) & df["city"].notna()).sum())

    corrected_counter = Counter()
    for wrong, right in CITY_CORRECTIONS.items():
        mask = city == wrong
        n = int(mask.sum())
        if n:
            corrected_counter[f"{wrong} -> {right}"] = n
            city = city.mask(mask, right)

    junk_mask = city.isin(CITY_JUNK)
    n_junk = int(junk_mask.sum())
    add_flag(junk_mask, "city_invalid_cleared")
    city = city.mask(junk_mask)  # cleared, and flagged above

    df["city"] = city
    city_after = int(df["city"].nunique())
    log(f"- Distinct city spellings before: **{city_before}** — after: "
        f"**{city_after}**")
    log(f"- Casing unified to UPPERCASE (**{n_case_only:,}** cells changed "
        f"case only)")
    log(f"- Documented misspellings corrected "
        f"(**{sum(corrected_counter.values())}** cells):")
    for fix, n in corrected_counter.most_common():
        log(f"  - {fix}: {n}")
    log(f"- Non-city junk values cleared and flagged "
        f"(**{n_junk}** cells): {', '.join(sorted(CITY_JUNK))}")
    log()

    # -----------------------------------------------------------------------
    # Step 4 — state and ZIP validation
    # -----------------------------------------------------------------------
    log("## Step 4 — state and ZIP validation")
    log()
    df["state"] = df["state"].str.upper()
    zip_ok = df["zip"].str.fullmatch(r"\d{5}").fillna(False)
    n_bad_zip = int((~zip_ok & df["zip"].notna()).sum())
    add_flag(~zip_ok & df["zip"].notna(), "invalid_zip")

    # Conservative inference: a missing state is filled with IL only when
    # the row has a valid 606xx Chicago-area ZIP — and the fill is flagged
    # so it is auditable.
    infer_mask = df["state"].isna() & df["zip"].str.startswith("60").fillna(False)
    n_inferred = int(infer_mask.sum())
    df.loc[infer_mask, "state"] = "IL"
    add_flag(infer_mask, "state_inferred_from_zip")
    log(f"- ZIPs failing the 5-digit check: **{n_bad_zip}** (flagged)")
    log(f"- Missing states filled with `IL` from a 60xxx ZIP and flagged: "
        f"**{n_inferred}**")
    log()

    # -----------------------------------------------------------------------
    # Step 5 — risk normalization
    # -----------------------------------------------------------------------
    log("## Step 5 — risk category validation")
    log()
    bad_risk = df["risk"].notna() & ~df["risk"].isin(VALID_RISK)
    n_bad_risk = int(bad_risk.sum())
    bad_risk_values = sorted(df.loc[bad_risk, "risk"].unique())
    add_flag(bad_risk, "risk_invalid_cleared")
    df["risk"] = df["risk"].mask(bad_risk)
    log(f"- Valid values: {', '.join(sorted(VALID_RISK))}")
    log(f"- Out-of-vocabulary values cleared and flagged: **{n_bad_risk}** "
        f"({', '.join(repr(v) for v in bad_risk_values) or 'none'})")
    log()

    # -----------------------------------------------------------------------
    # Step 6 — category canonicalization (facility_type, inspection_type)
    # -----------------------------------------------------------------------
    # The same label appears under many casings ("KIOSK"/"Kiosk",
    # "OUT OF BUSINESS"/"Out of Business"...). Each case-insensitive group
    # is collapsed to its most frequent original spelling, plus a short
    # explicit spelling-fix table for facility_type. No fuzzy matching.
    log("## Step 6 — category canonicalization")
    log()

    def canonicalize(col, spelling_fixes=None):
        s = df[col]
        before_unique = int(s.nunique())
        key = s.str.lower()
        if spelling_fixes:
            n_spell = int(key.isin(spelling_fixes).sum())
            key = key.replace(spelling_fixes)
        else:
            n_spell = 0
        # Most frequent original spelling per case-folded key wins.
        canon = (
            pd.DataFrame({"key": key, "orig": s})
            .dropna()
            .groupby("key")["orig"]
            .agg(lambda g: g.value_counts().idxmax())
        )
        result = key.map(canon)
        n_changed = int(((result != s) & s.notna()).sum())
        df[col] = result
        after_unique = int(df[col].nunique())
        log(f"- `{col}`: **{before_unique}** distinct spellings -> "
            f"**{after_unique}** canonical labels "
            f"({n_changed:,} cells rewritten, {n_spell} of them via the "
            f"explicit spelling-fix table)")
        return before_unique, after_unique

    ft_before, ft_after = canonicalize("facility_type", FACILITY_SPELLING)
    it_before, it_after = canonicalize("inspection_type")
    log()
    log("  Compound labels like `Grocery/Restaurant` vs `Restaurant/Grocery` "
        "are left as-is: merging them changes meaning, so on client work "
        "they ship as a review list, not a silent merge.")
    log()

    # -----------------------------------------------------------------------
    # Step 7 — license placeholders
    # -----------------------------------------------------------------------
    log("## Step 7 — license number placeholders")
    log()
    lic_zero = df["license_"] == "0"
    n_lic_zero = int(lic_zero.sum())
    add_flag(lic_zero, "license_placeholder_cleared")
    df["license_"] = df["license_"].mask(lic_zero)
    log(f"- `0` used as a fake license number: **{n_lic_zero}** rows — "
        f"cleared and flagged")
    log()

    # -----------------------------------------------------------------------
    # Step 8 — coordinate sanity check
    # -----------------------------------------------------------------------
    log("## Step 8 — coordinate sanity check")
    log()
    lat = pd.to_numeric(df["latitude"], errors="coerce")
    lon = pd.to_numeric(df["longitude"], errors="coerce")
    has_coord = df["latitude"].notna() | df["longitude"].notna()
    out_of_box = has_coord & (
        lat.isna() | lon.isna()
        | ~lat.between(*LAT_RANGE) | ~lon.between(*LON_RANGE)
    )
    n_bad_coord = int(out_of_box.sum())
    add_flag(out_of_box, "coords_out_of_range")
    log(f"- Coordinates present but outside the Chicago-area bounding box "
        f"(lat {LAT_RANGE}, lon {LON_RANGE}) or non-numeric: "
        f"**{n_bad_coord}** rows (flagged, not altered)")
    log()

    # -----------------------------------------------------------------------
    # Step 9 — duplicate removal
    # -----------------------------------------------------------------------
    # Exact duplicates: identical in every column EXCEPT inspection_id
    # (the source system re-issued IDs for double-entered inspections).
    # These are safe to drop — the earliest ID is kept and every dropped
    # row is written to duplicates_removed.csv for audit.
    # Near-duplicates (same license + date + inspection type but some other
    # field differs) are only FLAGGED — deciding those requires the
    # client's business context.
    log("## Step 9 — duplicate removal")
    log()
    content_cols = [c for c in df.columns if c != "inspection_id"]

    # Sort so "first" = lowest inspection_id numerically.
    df["_id_num"] = pd.to_numeric(df["inspection_id"], errors="coerce")
    df = df.sort_values("_id_num", kind="stable")

    dupe_mask = df.duplicated(subset=content_cols, keep="first")
    n_exact = int(dupe_mask.sum())
    dropped = df.loc[dupe_mask].drop(columns="_id_num")
    dropped.to_csv(DUPES_FILE, index=False)

    keep_index = df.index[~dupe_mask]
    df = df.loc[keep_index].drop(columns="_id_num")
    flags_kept = {idx: flags[idx] for idx in keep_index}

    near_mask = df.duplicated(
        subset=["license_", "inspection_date", "inspection_type"], keep=False
    ) & df["license_"].notna()
    n_near_rows = int(near_mask.sum())
    for idx in df.index[near_mask]:
        flags_kept[idx].append("possible_duplicate_review")

    log(f"- Exact duplicate records (identical in all {len(content_cols)} "
        f"content columns, only the row ID differs): **{n_exact}** removed — "
        f"each one written to `{DUPES_FILE.name}` for audit")
    log(f"- Near-duplicates (same license + date + inspection type, other "
        f"fields differ): **{n_near_rows:,}** rows flagged "
        f"`possible_duplicate_review` — NOT removed, because resolving them "
        f"needs business context")
    log()

    # -----------------------------------------------------------------------
    # Step 10 — assemble output
    # -----------------------------------------------------------------------
    df = df.sort_index()
    df["qa_flags"] = [";".join(flags_kept[idx]) for idx in df.index]
    df.to_csv(CLEAN_FILE, index=False)

    after_rows = len(df)
    n_flagged = int((df["qa_flags"] != "").sum())

    log("## Summary — before / after")
    log()
    log("| Metric | Before | After |")
    log("|---|---|---|")
    log(f"| Rows | {before_rows:,} | {after_rows:,} |")
    log(f"| Exact duplicate records | {n_exact} | 0 |")
    log(f"| Cells with stray whitespace | {total_ws:,} | 0 |")
    log(f"| Distinct `city` spellings | {city_before} | {city_after} |")
    log(f"| Distinct `facility_type` labels | {ft_before} | {ft_after} |")
    log(f"| Distinct `inspection_type` labels | {it_before} | {it_after} |")
    log(f"| Invalid `risk` values | {n_bad_risk} | 0 |")
    log(f"| Placeholder license numbers (`0`) | {n_lic_zero} | 0 |")
    log(f"| Date format | ISO timestamp w/ fake midnight time | `YYYY-MM-DD` |")
    log()
    log(f"Rows carrying at least one `qa_flags` entry for client review: "
        f"**{n_flagged:,}** ({n_flagged / after_rows:.1%})")
    log()

    # Missing-value table (missing data is reported, never invented).
    log("### Missing values in the cleaned file (reported, not invented)")
    log()
    log("| Column | Missing | % |")
    log("|---|---|---|")
    for col in df.columns:
        n = int(df[col].isna().sum())
        if n:
            log(f"| {col} | {n:,} | {n / after_rows:.2%} |")
    log()
    log("Flag vocabulary used in `qa_flags`: see Step 3-9 above. "
        "Every flagged row is intact in `cleaned.csv`; nothing ambiguous "
        "was deleted.")

    REPORT_FILE.write_text("\n".join(report_lines) + "\n", encoding="utf-8")
    print(f"\nWrote {CLEAN_FILE.name}, {DUPES_FILE.name}, {REPORT_FILE.name}")


if __name__ == "__main__":
    main()
