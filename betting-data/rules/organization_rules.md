# BETTING DATA & TICKET ORGANIZATION RULES

## 1. DIRECTORY STRUCTURE

All betting analytics, model specifications, prompt guidelines, and generated ticket payloads must be organized under the `betting-data/` root directory using the following standardized architecture:

```
betting-data/
├── rules/
│   ├── model_2.1.md                   # Core Roy Betting Engine Over 1.5 specification
│   ├── organization_rules.md          # File & directory organization rules (this document)
│   └── prompting_guide.md             # Standardized prompting guide for all 5 workflow levels
├── scripts/
│   └── calculate_model.py             # Deterministic Model 2.1 Poisson & EV calculator
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
│   └── ticket_2026-10-24_001.json     # Monthly tickets stored by match/creation date
├── november/
└── december/
```

---

## 2. MONTHLY TICKET STORAGE RULE

1. **Dedicated Monthly Folders**:
   - Tickets must **never** be stored directly in the root `betting-data/` folder.
   - Every generated ticket JSON file must be saved in its respective month directory, named in full lowercase:
     - `january/`, `february/`, `march/`, `april/`, `may/`, `june/`, `july/`, `august/`, `september/`, `october/`, `november/`, `december/`.
2. **Month Mapping**:
   - The month is determined by the fixture / ticket date (ISO `YYYY-MM-DD`).
   - Example: A ticket created on `2026-10-24` or `2026-10-25` must be saved in:
     `betting-data/october/`

---

## 3. FILE NAMING CONVENTIONS

### 3.1 Ticket Files
Ticket JSON files must follow this standardized pattern:
```
ticket_<YYYY-MM-DD>_<INDEX>.json
```
- `<YYYY-MM-DD>`: Match/ticket date (e.g., `2026-10-24`).
- `<INDEX>`: 3-digit sequential index for that day, starting at `001` (e.g., `ticket_2026-10-24_001.json`).

### 3.2 Model Specification Files
- Model documents must reside strictly in `betting-data/rules/`.
- Format: `model_<VERSION>.md` (e.g., `model_2.1.md`, `model_2.0.md`, `model_1.0.md`).

---

## 4. TICKET NUMBER ATTRIBUTE FORMAT

Inside every ticket JSON payload, the `"ticket_number"` attribute must strictly adhere to the automated formula:

$$\text{(Abbreviation)} - \text{(Total Count} + 1\text{)} - \text{(Active Model Version)}$$

### 4.1 Selection Tickets (`S`)
- Abbreviation: `S` (stands for `betting_selection`)
- Count: Total number of existing betting selections under the active model + 1
- Version: Active model version prefixed with `v` (e.g., `v2.1`)
- **Example**: `S-21-v2.1` (where 20 selections already exist in the database for model v2.1).

### 4.2 Alternative Tickets (`A`)
- Abbreviation: `A` (stands for `betting_alternative`)
- Count: Total number of existing betting alternatives under the active model + 1
- Version: Active model version prefixed with `v` (e.g., `v2.1`)
- **Example**: `A-8-v2.1` (where 7 alternatives already exist in the database for model v2.1).

---

## 5. PROMPT GUIDELINES & WORKFLOW INTEGRATION

When instructing an AI agent or analyst to generate a betting ticket:
1. **Model Source**: Read instructions from `betting-data/rules/model_<version>.md`.
2. **JSON Compliance**: The output must adhere strictly to the JSON schema defined in `src/types/betting.ts` (`TicketImportJSON`).
3. **Storage Destination**: Save the output to `betting-data/<month>/ticket_<YYYY-MM-DD>_<INDEX>.json`.
4. **Mandatory Probabilities, Value & Consensus Metrics**:
   - Every selection and alternative must include:
     - `estimated_probability` (0.000 to 1.000, derived from current-season baselines)
     - `historical_estimated_probability` (0.000 to 1.000, derived from historical baselines)
     - `alignment_delta_pp` ($|P_{\text{primary}} - P_{\text{historical}}| \times 100$)
     - `alignment_remark` (`very_high`, `high`, `medium`, `low`, `very_low`)
     - `odds` (decimal)
     - `breakeven_probability` ($1 / \text{odds}$)
     - `edge_percentage_points` ($(\text{prob} - \text{break\_even}) \times 100$)
     - `edge_remark` (`very_high`, `high`, `medium`, `low`, `very_low`)
     - `expected_value` ($(\text{prob} \times \text{odds}) - 1$)
5. **Full Schema Parity for Alternatives**:
   - Alternatives (`betting_alternatives`) are considered-and-rejected betting options that must match primary selections attribute-for-attribute.
   - Every alternative must populate all 10 venue statistical attributes (`home_league_position`, `away_league_position`, `home_matches_played`, `away_matches_played`, `home_goals_scored`, `home_goals_conceded`, `away_goals_scored`, `away_goals_conceded`, `home_goals_per_game`, `home_conceded_per_game`, `away_goals_per_game`, `away_conceded_per_game`) alongside all 8 dual-baseline and value-edge attributes (`current_league_home_avg`, `current_league_away_avg`, `historical_league_home_avg`, `historical_league_away_avg`, `historical_estimated_probability`, `alignment_delta_pp`, `alignment_remark`, `edge_remark`).
6. **Dual-Baseline Recording**:
   - Both selections and alternatives must record the league scoring baselines used:
     - `current_league_home_avg`, `current_league_away_avg` (live table)
     - `historical_league_home_avg`, `historical_league_away_avg` (from `betting-data/rules/league_baselines.json`)
7. **Decoupling Principle**: Qualitative warnings (e.g., `H2H_LOW_GOALS`, `SMALL_SAMPLE`, `LOW_AWAY_SCORING`) operate as an evidence layer and verdict filter (`SELECT` / `CAUTION` / `NO BET`). They must never apply arbitrary percentage point penalties to the mathematical Poisson probability.

