# ROY'S BETTING ENGINE — ANTIGRAVITY WORKFLOW & PROMPTING GUIDE

This guide provides the exact prompts and workflow to follow at every level of the betting lifecycle. With this setup, Antigravity replaces ChatGPT, handles batch processing, runs deterministic calculations via `betting-data/scripts/calculate_model.py`, and automatically adheres to [`model_2.1.md`](file:///Users/macitosh/Documents/Programming/nextjs/safe-consruct-nextjs-app/betting-data/rules/model_2.1.md) and [`organization_rules.md`](file:///Users/macitosh/Documents/Programming/nextjs/safe-consruct-nextjs-app/betting-data/rules/organization_rules.md).

---

## Quick Prompt Cheat-Sheet

| Level | Goal | Copy-Paste Prompt Template |
| :--- | :--- | :--- |
| **Level 1** | **Batch Evaluate Matches** | `Evaluate today's matches according to Model 2.1: [Paste matches and Betmomo odds]. Save results and summary table to betting-data/<month>/evaluation_<date>.md.` |
| **Level 2** | **Generate Import Ticket** | `From evaluation_<date>.md, set selections: [Match A, Match B], alternatives: [Match C]. Stake: [e.g. 2000]. Generate ticket_<date>_001.json for app import.` |
| **Level 3** | **Check Scores** | `Check live/final scores for ticket [ticket_number or date].` |
| **Level 4** | **Ticket Review** | `Review our settled ticket [ticket_number or date]: [Paste exported ticket JSON]. Let's analyze model accuracy vs actuals.` |
| **Level 5** | **Batch Warnings Update** | `Evaluate these post-match warnings and generate the WarningBatchUpdateJSON: [Paste warnings export payload].` |

---

## LEVEL 1: Batch Match Pre-Screening & Evaluation

Instead of feeding games one by one into ChatGPT, gather all your shortlisted games and their Over 1.5 odds from Betmomo, and send them all at once.

### Option A: Direct Prompt (Recommended for 3–10 matches)
```text
Evaluate today's matches (2026-10-25) according to Model 2.1:

Barcelona vs Real Madrid | Over 1.5 @ 1.22
Chelsea vs Tottenham | Over 1.5 @ 1.17
Lazio vs Parma | Over 1.5 @ 1.26
Augsburg vs Union Berlin | Over 1.5 @ 1.12
Arsenal vs Everton | Over 1.5 @ 1.29

Please search for pre-match statistics, run calculate_model.py, and save the full evaluation and summary table to betting-data/october/evaluation_2026-10-25.md.
```

### Option B: File-Based (Recommended for 10+ matches)
1. Create or paste your list into `betting-data/<month>/matches_input_YYYY-MM-DD.txt`:
   ```text
   Barcelona vs Real Madrid | Over 1.5 @ 1.22
   Chelsea vs Tottenham | Over 1.5 @ 1.17
   Lazio vs Parma | Over 1.5 @ 1.26
   ...
   ```
2. Prompt Antigravity:
   ```text
   Please evaluate all matches in betting-data/october/matches_input_2026-10-25.txt according to Model 2.1 and generate betting-data/october/evaluation_2026-10-25.md.
   ```

### What Antigravity Does:
1. **Mandatory Two-Stage Research**:
   - Gathers both the overall league table AND the separate venue-specific splits (**Home record for the host**, **Away record for the visitor**).
2. **HARD STOP RULE**:
   - If venue-specific splits (`home_matches_at_home`, `home_gf_at_home`, `home_ga_at_home`, `away_matches_away`, `away_gf_away`, `away_ga_away`) are missing, Antigravity **MUST NOT proceed with calculating probabilities**.
   - It will mark the fixture as **INSUFFICIENT DATA** and explicitly alert you in chat that probabilities could not be calculated due to missing venue data.
3. Runs `betting-data/scripts/calculate_model.py` with verified venue splits to calculate exact Poisson Over 1.5 probabilities, break-even odds, edge, and EV.
4. Automatically detects standard warnings (`SMALL_SAMPLE`, `LOW_AWAY_SCORING`, `H2H_LOW_GOALS`, etc.) under the **Decoupling Principle** (warnings filter verdicts, but never arbitrarily subtract percentage points from Poisson).
5. Saves everything to `betting-data/<month>/evaluation_YYYY-MM-DD.md` and displays the **Summary Decision Table**:

| Match | Market & Odds | Roy's Prob | Hist. Prob | Break-Even | Edge (pp) | EV | Verdict | Warnings Summary |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: | :--- | :--- |
| **Chelsea vs Tottenham** | Over 1.5 @ 1.17 | 87.9% | 86.5% | 85.5% | +2.4 | +0.029 | **SELECT** | `TEAM_NEWS_UNVERIFIED` |
| **Lazio vs Parma** | Over 1.5 @ 1.26 | 76.0% | 75.4% | 79.4% | -3.3 | -0.042 | **CAUTION** | `LOW_AWAY_SCORING`, `TEAM_NEWS_UNVERIFIED` |
| **Arsenal vs Everton** | Over 1.5 @ 1.29 | 59.0% | 61.2% | 77.5% | -18.5 | -0.239 | **NO BET** | `STRONG_DEFENSIVE_MATCHUP` |

---

## LEVEL 2: Ticket Selection & App Import JSON Generation

After reviewing the Summary Table in `evaluation_YYYY-MM-DD.md`, decide which games are your primary **selections** and which are **alternatives**.

### The Prompt:
```text
From betting-data/october/evaluation_2026-10-25.md:
- Primary Selections: Chelsea vs Tottenham, Lazio vs Parma
- Alternatives: Arsenal vs Everton
- Stake: 2000 FCFA
- Ticket Date: 2026-10-25

Please generate the import ticket JSON according to our organization rules. Save it to betting-data/october/ticket_2026-10-25_001.json and output the JSON for me to paste into the app.
```

### What Antigravity Does:
1. Reads all stats and calculated probabilities directly from `evaluation_YYYY-MM-DD.md` (**Zero redundant web searches**).
2. Computes the combined ticket odds and aggregate probability $\prod P_i$.
3. Formats the ticket number using the automated convention (e.g. `S-22-v2.1`).
4. Generates both selections and alternatives with **100% schema parity** (all 10 venue performance attributes) and records the **5 dual-baseline attributes** (`current_league_home_avg`, `current_league_away_avg`, `historical_league_home_avg`, `historical_league_away_avg`, `historical_estimated_probability`).
5. Writes the payload directly to `betting-data/<month>/ticket_YYYY-MM-DD_001.json`.
6. Outputs the JSON in chat so you can paste it directly into your app at:
   `/admin/betting/import` -> **Validate** -> **Import Ticket**.

---

## LEVEL 3: Live & Post-Match Score Checking

While matches are in play or after they conclude, track the scores.

### The Prompt:
```text
Check the current scores for our ticket dated 2026-10-25 (ticket_2026-10-25_001.json).
```

### What Antigravity Does:
1. Queries the web for live/final scores of each match on that ticket.
2. Returns a clean score progress table:
   | Match | Current Score | Status | Over 1.5 Outcome |
   | :--- | :--- | :--- | :--- |
   | **Chelsea vs Tottenham** | 2 - 1 | FT | **WON** (3 goals) |
   | **Lazio vs Parma** | 1 - 1 | 75' | **WON** (2 goals) |
   | **Arsenal vs Everton** | 2 - 0 | FT | **WON** (2 goals) |
3. You enter the final scores into your app (`/admin/betting/tickets/<uuid>`), and the app automatically settles each leg and determines if the ticket won.

---

## LEVEL 4: Post-Match Ticket Review & Strategic Discussion

Once all scores are entered and the ticket is settled, export the ticket data from the app using the **Export ChatGPT JSON** button on the ticket detail page.

### The Prompt:
```text
Here is the settled ticket export from our app for ticket 004:

[PASTE EXPORTED TICKET JSON HERE]

Please review how our predictions performed:
1. Did the estimated probabilities align with the match dynamics?
2. Did positive EV selections deliver?
3. How did our cautionary warnings behave?
4. What can we learn for Model 2.1 calibration?
```

### What Antigravity Does:
1. Compares expected goals ($\lambda_{home}, \lambda_{away}$) against actual scorelines.
2. Evaluates whether positive edge selections were sound and dissects any surprises or unexpected clean sheets.
3. Provides an objective strategic post-mortem to track model calibration over time.

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
   - `review_notes`: Concise diagnostic explanation (e.g., *"Tottenham produced 0 away goals as feared; Chelsea conceded none, confirming LOW_AWAY_SCORING risk."*)
3. Generates the exact update payload adhering to `WarningBatchUpdateJSON`:
   ```json
   {
     "operation": "warning_post_match_update",
     "schema_version": "1.0",
     "updates": [
       {
         "warning_id": "a31a6732-b1ff-4774-99a1-679f18a31a3c",
         "post_match_status": "CONFIRMED",
         "evidence_assessment": "SUPPORTED",
         "confidence": "HIGH",
         "review_notes": "Tottenham away attack was held to zero goals, confirming the low away scoring vulnerability."
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
│   ├── model_2.1.md                   # Core Roy Betting Engine Over 1.5 specification
│   ├── organization_rules.md          # File & directory organization conventions
│   ├── prompting_guide.md             # This workflow & prompting guide
│   ├── import_ticket_sample_data.md   # Schema reference for ticket import
│   ├── export_ticket_sample_data.md   # Schema reference for ticket post-match export
│   └── export_warnings_sample_data.md # Schema reference for warning post-match requests
├── scripts/
│   └── calculate_model.py             # Deterministic Poisson, EV, Edge, and Warning calculator
└── <month>/ (e.g. october/)
    ├── evaluation_YYYY-MM-DD.md       # Pre-match stats snapshot & decision summary table
    ├── ticket_YYYY-MM-DD_001.json     # Ready-to-import ticket JSON
    └── warnings_update_YYYY-MM-DD.json# Post-match warning updates JSON
```
