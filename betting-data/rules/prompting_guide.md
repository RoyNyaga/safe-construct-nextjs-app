# ROY'S BETTING ENGINE — ANTIGRAVITY WORKFLOW & PROMPTING GUIDE

This guide provides the exact prompts and workflow to follow at every level of the betting lifecycle. With this setup, Antigravity handles batch processing, runs deterministic calculations via `betting-data/scripts/calculate_model.py`, and automatically adheres to [`model_4.0.md`](file:///d:/Programming/nextjs/safe-construct-nextjs-app/betting-data/rules/model_4.0.md) and [`organization_rules.md`](file:///d:/Programming/nextjs/safe-construct-nextjs-app/betting-data/rules/organization_rules.md).

---

## Quick Prompt Cheat-Sheet

| Level | Goal | Copy-Paste Prompt Template |
| :--- | :--- | :--- |
| **One-Step Flow** | **Evaluate & Auto-Generate Ticket + Candidates** | `Evaluate today's matches for [DATE] according to our selection process: [Paste matches and Betmomo odds]. Stake: [e.g. 2000]. Generate evaluation_<date>.md, candidates_<date>.json, and ticket_<date>_001.json.` |
| **Level 1** | **Batch Multi-Market & 1X2 Evaluation Only** | `Evaluate today's matches according to Model 4.0: [Paste matches and market odds (Goals, 1X2, DNB)]. Save results and summary table to betting-data/<month>/evaluation_<date>.md.` |
| **Level 2** | **Manual Ticket Customization / Swap** | `From evaluation_<date>.md or candidates_<date>.json, swap [Selection X] with [Candidate Y] in ticket_<date>_001.json.` |
| **Level 3** | **Check Scores** | `Check live/final scores for ticket [ticket_number or date].` |
| **Level 4** | **Ticket Review** | `Review our settled ticket [ticket_number or date]: [Paste exported ticket JSON]. Let's analyze model calibration vs actuals across BTTS, Over 2.5, and Over 1.5.` |
| **Level 5** | **Batch Warnings Update** | `Evaluate these post-match warnings and generate the WarningBatchUpdateJSON: [Paste warnings export payload].` |

---

## LEVEL 1: Batch Match Pre-Screening & Evaluation

Gather shortlisted fixtures and their candidate market odds (BTTS Yes, Over 2.5, Over 1.5, Under 3.5, 1X2, DNB), and submit them together.

### Option A: Direct Prompt (Recommended for 3–10 matches)
```text
Evaluate today's matches (2026-11-04) according to Model 4.0:

Eintracht Frankfurt vs Hamburger SV | BTTS Yes @ 1.68 | Over 2.5 @ 1.72 | Over 1.5 @ 1.19
Olympique Lyonnais vs Angers SCO | Over 2.5 @ 1.64 | Home Win @ 1.52 | Over 1.5 @ 1.21
Athletic Bilbao vs Real Sociedad | Under 3.5 @ 1.33 | Home DNB @ 1.44 | Over 1.5 @ 1.40

Please search for pre-match statistics, run calculate_model.py, and save the full evaluation and summary table to betting-data/november/evaluation_2026-11-04.md.
```

### Option B: File-Based (Recommended for 10+ matches)
1. Create or paste your list into `betting-data/<month>/matches_input_YYYY-MM-DD.txt`.
2. Prompt Antigravity:
   ```text
   Please evaluate all matches in betting-data/november/matches_input_2026-11-04.txt according to Model 4.0 and generate betting-data/november/evaluation_2026-11-04.md.
   ```

### What Antigravity Does:
1. **Mandatory Two-Stage Research**:
   - Gathers both the overall league table AND separate venue-specific splits (**Home record for the host**, **Away record for the visitor**).
2. **HARD STOP RULE**:
   - If venue-specific splits (`home_matches_at_home`, `home_gf_at_home`, `home_ga_at_home`, `away_matches_away`, `away_gf_away`, `away_ga_away`) are missing, Antigravity **MUST NOT proceed with calculating probabilities**.
   - It marks the fixture as **INSUFFICIENT DATA** and explicitly alerts you in chat.
3. Runs `betting-data/scripts/calculate_model.py` with verified venue splits to calculate bivariate Poisson expected goals ($\lambda_{home}, \lambda_{away}$) across goal and match winner markets:
   - $P(\text{Over } 1.5)$
   - $P(\text{Over } 2.5)$
   - $P(\text{BTTS Yes})$
   - $P(\text{Under } 3.5)$
   - $P(\text{Home Win})$, $P(\text{Draw})$, $P(\text{Away Win})$
   - $P(\text{Draw No Bet})$ & $P(\text{Double Chance})$
4. Automatically detects standard multi-market warnings (`ONE_SIDED_SCORING_RISK`, `CLEAN_SHEET_DOMINANCE`, `STRONG_DEFENSIVE_MATCHUP`, `SMALL_SAMPLE`, etc.).
5. Saves everything to `betting-data/<month>/evaluation_YYYY-MM-DD.md` and displays the **Summary Decision Table**:

| Match | Pick & Odds | Roy's Prob | Break-Even | Edge (pp) | EV | Multi-Market Matrix | Verdict | Warnings Summary |
| :--- | :--- | :---: | :---: | :---: | :---: | :--- | :--- | :--- |
| **Frankfurt vs Hamburg** | BTTS Yes @ 1.68 | 65.8% | 59.5% | +6.3 | +0.105 | O1.5: 87% \| O2.5: 64% \| BTTS: 66% \| U3.5: 65% | **RECOMMENDED** | `None` |
| **Lyon vs Angers** | Over 2.5 @ 1.64 | 62.6% | 61.0% | +1.6 | +0.027 | O1.5: 85% \| O2.5: 63% \| BTTS: 61% \| U3.5: 67% | **RECOMMENDED** | `ONE_SIDED_SCORING_RISK` |
| **Bilbao vs Sociedad** | Under 3.5 @ 1.33 | 77.8% | 75.2% | +2.6 | +0.035 | O1.5: 74% \| O2.5: 46% \| BTTS: 51% \| U3.5: 78% | **CONSIDER** | `DERBY_MATCH_VOLATILITY` |

---

## THE AUTOMATED SELECTION WORKFLOW (RECOMMENDED)

You no longer need to manually shortlist games or do back-and-forth preview loops. Feed your match options and Betmomo odds to Antigravity in one single prompt.

### The Single-Step Automated Prompt:
```text
Evaluate today's matches (2026-11-02) according to our selection process:

Eintracht Frankfurt vs Hamburger SV | BTTS Yes @ 1.68 | Over 2.5 @ 1.72 | Over 1.5 @ 1.19
Olympique Lyonnais vs Angers SCO | Over 2.5 @ 1.64 | BTTS Yes @ 1.75 | Over 1.5 @ 1.21
Athletic Bilbao vs Real Sociedad | Under 3.5 @ 1.33 | BTTS Yes @ 2.05 | Over 1.5 @ 1.40
Hellas Verona vs Carrarese | Over 1.5 @ 1.28 | Over 2.5 @ 1.95
Juventus vs SSC Napoli | BTTS Yes @ 1.88 | Under 3.5 @ 1.25

Stake: 2000 FCFA. Please generate the full evaluation, ticket_2026-11-02_001.json, and candidates_2026-11-02.json according to selection_process.md.
```

### What Antigravity Produces in One Response:
1. **`evaluation_YYYY-MM-DD.md`**: Full venue statistics, DCI openness index, small-sample venue regression ($N \le 5$), and 4-market Poisson calculations for every fixture.
2. **`candidates_YYYY-MM-DD.json`**: The complete catalog of **all qualified matches of the day** formatted as a valid `TicketImportJSON` with root `"ticket"` (`#A-1-v3.0`). You can paste this directly into `/admin/betting/import` to inspect and preview all candidate fixtures, multi-market matrices, and warning flags in the app UI.
3. **`ticket_YYYY-MM-DD_001.json`**: The finalized ticket ready for 1-click import into the app:
   - **Main Selections**: The optimal 1 to 3 legs (default 2 legs) satisfying the strict $\ge 2.00$ combined odds floor with maximum safety, strictly enforcing the $\text{DCI} \ge 0.45$ floor on Over 2.5 and $\text{DCI} \ge 0.50$ on BTTS Yes. Real capital is wagered exclusively here.
   - **Alternatives (Shadow Tracking Portfolio)**: The top 3–5 next-best qualified contenders evaluated with the exact same Poisson, DCI, and EV rigor. These are imported to measure prediction accuracy beyond 3 games risk-free.
4. Outputs the **Decision Table** and ready-to-import JSON directly in chat.

---

## LEVEL 2: Instant Ticket Swap (Optional)

If, after reviewing the candidate catalog in `candidates_YYYY-MM-DD.json` or the summary table, you prefer a different match:

### The Prompt:
```text
In ticket_2026-11-02_001.json, swap Lyon vs Angers for Bilbao vs Sociedad (Under 3.5) from candidates.
```

Antigravity reads `candidates_YYYY-MM-DD.json`, updates the ticket JSON in 5 seconds, recalculates combined odds and ticket probability, and provides the updated JSON.

---

## LEVEL 3: Live & Post-Match Score Checking

While matches are in play or after they conclude, track the scores.

### The Prompt:
```text
Check the current scores for our ticket dated 2026-11-02 (ticket_2026-11-02_001.json).
```

### What Antigravity Does:
1. Queries the web for live/final scores of each match on that ticket.
2. Returns a clean score progress table showing all multi-market statuses:
   | Match | Current Score | Status | Pick Result | BTTS Status | O2.5 Status |
   | :--- | :--- | :--- | :--- | :--- | :--- |
   | **Frankfurt vs Hamburg** | 2 - 1 | FT | **WON** (BTTS Yes) | Both Scored | 3 Goals |
   | **Lyon vs Angers** | 3 - 0 | FT | **WON** (Over 2.5) | One-Sided | 3 Goals |
   | **Bilbao vs Sociedad** | 1 - 1 | FT | **WON** (Under 3.5) | Both Scored | 2 Goals |
3. You enter the final scores into your app (`/admin/betting/tickets/<uuid>`), and the app automatically settles each leg.

---

## LEVEL 4: Post-Match Ticket Review & Strategic Discussion

Once all scores are entered and the ticket is settled, export the ticket data from the app using the **Export ChatGPT JSON** button on the ticket detail page.

### The Prompt:
```text
Here is the settled ticket export from our app for ticket S-1-v3.0:

[PASTE EXPORTED TICKET JSON HERE]

Please review how our Model 3.0 predictions performed:
1. Did the estimated probabilities align with the match dynamics across BTTS and Over 2.5?
2. Did positive EV selections deliver?
3. How did our multi-market cautionary warnings behave (e.g., ONE_SIDED_SCORING_RISK)?
4. What can we learn for future market selection?
```

### What Antigravity Does:
1. Compares expected goals ($\lambda_{home}, \lambda_{away}$) against actual scorelines for all main selections and alternatives.
2. Evaluates whether picking BTTS vs Over 2.5 was optimal for each fixture.
3. Audits both the active ticket ROI and the Shadow Tracking Portfolio hit-rate to assess accuracy above 3 games without capital exposure.
4. Provides an objective strategic post-mortem to track model calibration over time.

---

## LEVEL 5: Post-Match Warnings Batch Update

To evaluate all pending pre-match warnings at once, navigate to `/admin/betting/warnings` (or the ticket warnings tab) and click **Export ChatGPT Warnings Prompt**.

### The Prompt:
```text
Evaluate the following pending post-match warnings and generate the WarningBatchUpdateJSON:

[PASTE WARNINGS EXPORT PAYLOAD HERE]
```

### What Antigravity Does:
1. Analyzes each warning against the final score and match events.
2. Evaluates the 4 required attributes:
   - `post_match_status`: `CONFIRMED` | `NOT_CONFIRMED` | `INCONCLUSIVE` | `NOT_APPLICABLE`
   - `evidence_assessment`: `SUPPORTED` | `CONTRADICTED` | `PARTIAL` | `INCONCLUSIVE`
   - `confidence`: `LOW` | `MEDIUM` | `HIGH`
   - `review_notes`: Concise diagnostic explanation.
3. Generates the exact update payload adhering to `WarningBatchUpdateJSON`:
   ```json
   {
     "operation": "warning_post_match_update",
     "schema_version": "1.0",
     "updates": [
       {
         "warning_id": "41c60205-0275-45d0-994d-7bc476717a60",
         "post_match_status": "CONFIRMED",
         "evidence_assessment": "SUPPORTED",
         "confidence": "HIGH",
         "review_notes": "Lyon produced all 3 goals in a 3-0 win alone, confirming ONE_SIDED_SCORING_RISK and vindicating Over 2.5 over BTTS Yes."
       }
     ]
   }
   ```
4. Saves a copy to `betting-data/<month>/warnings_update_YYYY-MM-DD.json`.
5. You paste this JSON into the **Bulk Warning Review** modal on `/admin/betting/warnings` to update all warnings in a single click!

---

## Summary of File Roles in `betting-data/`

```
betting-data/
├── rules/
│   ├── model_3.0.md                   # Active: Roy Betting Engine BTS & Over 2.5 specification (v3.0)
│   ├── model_2.1.md                   # Archived: Roy Betting Engine Over 1.5 specification (v2.1)
│   ├── organization_rules.md          # File & directory organization conventions
│   ├── prompting_guide.md             # This workflow & prompting guide
│   ├── import_ticket_sample_data.md   # Schema reference for ticket import (Model 3.0)
│   ├── export_ticket_sample_data.md   # Schema reference for ticket post-match export (Model 3.0)
│   └── export_warnings_sample_data.md # Schema reference for warning post-match requests (Model 3.0)
├── scripts/
│   └── calculate_model.py             # Deterministic Multi-Market Poisson, EV, Edge, and Warning calculator
└── <month>/ (e.g. november/)
    ├── evaluation_YYYY-MM-DD.md       # Pre-match stats snapshot & decision summary table
    ├── ticket_YYYY-MM-DD_001.json     # Ready-to-import ticket JSON
    └── warnings_update_YYYY-MM-DD.json# Post-match warning updates JSON
```
