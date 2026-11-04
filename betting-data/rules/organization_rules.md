# BETTING DATA & TICKET ORGANIZATION RULES

## 1. DIRECTORY STRUCTURE

All betting analytics, model specifications, prompt guidelines, and generated ticket payloads must be organized under the `betting-data/` root directory using the following standardized architecture:

```
betting-data/
├── rules/
│   ├── model_4.0.md                   # Active: Roy Betting Engine BTS, Over 2.5 & Win Specification (v4.0)
│   ├── model_3.0.md                   # Archived: Roy Betting Engine BTS & Over 2.5 Specification (v3.0)
│   ├── model_2.1.md                   # Archived: Roy Betting Engine Over 1.5 Specification (v2.1)
│   ├── selection_process.md           # Automated selection rules, DCI openness, and 2-leg portfolio logic
│   ├── organization_rules.md          # File & directory organization rules (this document)
│   ├── prompting_guide.md             # Standardized prompting guide for all workflow levels
│   ├── import_ticket_sample_data.md   # Schema reference for ticket import
│   ├── export_ticket_sample_data.md   # Schema reference for ticket post-match export
│   └── export_warnings_sample_data.md # Schema reference for warning post-match requests
├── scripts/
│   └── calculate_model.py             # Deterministic Model 4.0 Multi-Market & Match Winner Poisson calculator
├── january/
├── february/
├── march/
├── april/
├── may/
├── june/
├── july/
├── august/
├── september/
├── october/
├── november/
│   ├── evaluation_2026-11-01.md       # Pre-match evaluation & Poisson stats breakdown
│   ├── ticket_2026-11-01_001.json     # Ready-to-import ticket (Main Selections + Shadow Tracking Alternatives)
│   └── candidates_2026-11-01.json     # All qualified/promising matches of the day for review & training
└── december/
```

---

## 2. MONTHLY TICKET & DATA STORAGE RULE

1. **Dedicated Monthly Folders**:
   - Tickets, evaluations, and candidates must **never** be stored directly in the root `betting-data/` folder.
   - Every generated file must be saved in its respective month directory, named in full lowercase:
     - `january/`, `february/`, `march/`, `april/`, `may/`, `june/`, `july/`, `august/`, `september/`, `october/`, `november/`, `december/`.
2. **Month Mapping**:
   - The month is determined by the fixture / ticket date (ISO `YYYY-MM-DD`).
   - Example: A ticket created on `2026-11-02` must be saved in:
     `betting-data/november/ticket_2026-11-02_001.json`

---

## 3. FILE NAMING CONVENTIONS

### 3.1 Ticket Files
Ticket JSON files must follow this standardized pattern:
```
ticket_<YYYY-MM-DD>_<INDEX>.json
```
- `<YYYY-MM-DD>`: Match/ticket date (e.g., `2026-11-02`).
- `<INDEX>`: 3-digit sequential index for that day, starting at `001` (e.g., `ticket_2026-11-02_001.json`).

### 3.2 Candidates Catalog Files ("All Good Matches")
Every daily evaluation generates a companion candidates file:
```
candidates_<YYYY-MM-DD>.json
```
- Stores **every qualified/promising match evaluated that day** that did not make the main ticket or top alternatives.
- Purpose: Cross-examination, personal comparison, model training, and quick 5-second swaps.

### 3.3 Evaluation Markdown Files
```
evaluation_<YYYY-MM-DD>.md
```
- Comprehensive markdown report containing venue stats, DCI openness, 4-market Poisson calculations, warnings, and summary decision matrix.

### 3.4 Model Specification & Rules Files
- Reside strictly in `betting-data/rules/`:
  - `model_<VERSION>.md` (e.g., `model_3.0.md`, `model_2.1.md`)
  - `selection_process.md`

---

## 4. TICKET NUMBER ATTRIBUTE FORMAT

Inside every ticket JSON payload, the `"ticket_number"` attribute must strictly adhere to the automated formula:

$$\text{(Abbreviation)} - \text{(Total Count} + 1\text{)} - \text{(Active Model Version)}$$

### 4.1 Selection Tickets (`S`)
- Abbreviation: `S` (stands for `betting_selection`)
- Count: Total number of existing betting selections under the active model + 1
- Version: Active model version prefixed with `v` (e.g., `v3.0`)
- **Example**: `S-1-v3.0` (for the first selection ticket under Model 3.0).

### 4.2 Alternative Tickets (`A`)
- Abbreviation: `A` (stands for `betting_alternative`)
- Count: Total number of existing betting alternatives under the active model + 1
- Version: Active model version prefixed with `v` (e.g., `v3.0`)
- **Example**: `A-1-v3.0` (for the first alternative ticket under Model 3.0).

---

## 5. PROMPT GUIDELINES & WORKFLOW INTEGRATION

When instructing an AI agent or analyst to generate a betting ticket:
1. **Model Source**: Read instructions from `betting-data/rules/model_3.0.md` (`roys_betting_engine_BTS_O2-5`).
2. **Selection Logic**: Read rules from `betting-data/rules/selection_process.md`.
3. **JSON Compliance**: The output must adhere strictly to the JSON schema defined in `src/types/betting.ts` (`TicketImportJSON`).
4. **Storage Destination**: Save the output to `betting-data/<month>/ticket_<YYYY-MM-DD>_<INDEX>.json` and `candidates_<YYYY-MM-DD>.json`.
5. **Mandatory Multi-Market Probabilities & Permanent Tracking**:
   - Every selection and alternative must include all 4 companion market probabilities and full evaluation JSON:
     - `prob_over_1_5` (Poisson Over 1.5 Goals probability, 0.0000 to 1.0000)
     - `prob_over_2_5` (Poisson Over 2.5 Goals probability, 0.0000 to 1.0000)
     - `prob_btts_yes` (Poisson Both Teams to Score Yes probability, 0.0000 to 1.0000)
     - `prob_under_3_5` (Poisson Under 3.5 Goals probability, 0.0000 to 1.0000)
     - `market_evaluations` (JSONB matrix with odds, break-even %, edges, and EVs for all evaluated markets)
6. **Mandatory Selected Market, Value & Consensus Metrics**:
   - `estimated_probability` (staked market probability derived from current-season baselines)
   - `historical_estimated_probability` (staked market probability derived from historical baselines)
   - `alignment_delta_pp` ($|P_{\text{primary}} - P_{\text{historical}}| \times 100$)
   - `alignment_remark` (`very_high`, `high`, `medium`, `low`, `very_low`)
   - `odds` (decimal)
   - `breakeven_probability` ($1 / \text{odds}$)
   - `edge_percentage_points` ($(\text{prob} - \text{break\_even}) \times 100$)
   - `edge_remark` (`very_high`, `high`, `medium`, `low`, `very_low`)
   - `expected_value` ($(\text{prob} \times \text{odds}) - 1$)
7. **Negative EV Transparency Rule**:
   - Negative EV fixtures are **never** discarded automatically. All metrics are calculated and displayed for bettor discretion.
8. **Full Schema Parity for Shadow Tracking Alternatives & Venue vs Overall Separation**:
   - Alternatives (`betting_alternatives`) serve as the **Shadow Tracking Portfolio** (paper-trading 3 to 5 next-best picks to benchmark prediction accuracy beyond 3 games risk-free). They match primary selections attribute-for-attribute across all 12 venue attributes, 10 overall attributes, 8 dual-baseline metrics, and 5 multi-market tracking fields.
9. **Portfolio Construction & Combined Odds Floor**:
   - Tickets strictly enforce a **combined odds floor $\ge 2.00$** (ideal sweet spot: $2.00 - 2.50$).
   - Formed using **2 legs by default**. If safe 2-leg combinations cannot reach 2.00, a **3-leg ultra-safe combination** is used as a safety fallback. Never 4 or more legs.
10. **Decoupling Principle**: Qualitative warnings (e.g., `ONE_SIDED_SCORING_RISK`, `CLEAN_SHEET_DOMINANCE`, `H2H_LOW_GOALS`, `SMALL_SAMPLE`, `LOW_AWAY_SCORING`) operate as an evidence layer and risk filter. They must never apply arbitrary percentage point penalties to the mathematical Poisson probability.
