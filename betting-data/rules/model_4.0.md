# BETTING MODEL VERSION 4.0 — MULTI-MARKET & MATCH WINNER ENGINE (BTTS, OVER 2.5 & WIN FOCUS)

## MODEL NAME

`roys_betting_engine_BTS_O2-5_win`


## 1. OBJECTIVE & EXECUTIVE PHILOSOPHY

Identify football betting opportunities with high statistically supported probability and positive expected value (EV) across core goal markets and rigorous match winner markets:
1. **Both Teams to Score (BTTS Yes / BTTS No)** — typical market odds: 1.65 to 2.15
2. **Over 2.5 Goals** — typical market odds: 1.65 to 2.30
3. **Under 3.5 Goals** — typical market odds: 1.35 to 1.65
4. **Over 1.5 Goals** — typical market odds: 1.12 to 1.30 (retained as situational anchor)
5. **Match Winner / "To Win" (Home Win / Away Win / 1X2)** — typical market odds: 1.40 to 2.05 (gated by strict 5-pillar dominance)
6. **Draw No Bet (DNB / Asian Handicap 0)** — typical market odds: 1.28 to 1.75 (safety valve against draw attrition)
7. **Double Chance (1X / X2)** — typical market odds: 1.18 to 1.35 (resilience anchor)

### 1.1 Resolution of Accumulator Drag (The Compound Probability Trap)
Model 2.1 demonstrated a critical structural bottleneck: because Over 1.5 individual odds are low (1.12–1.25), constructing a target ticket odd of 2.00–2.50 required stacking 4 to 6 matches. Even with individual leg win rates of ~85%, the compounding probability $(0.85)^5 \approx 44.3\%$ and compounded bookmaker vig $(0.94)^5 \approx 26.6\%$ ensured that at least 1 leg failed in over 55% of played tickets.

Model 4.0 solves this by targeting higher-odds markets (1.45–2.10) where **2 legs (or at most 3 legs)** yield combined ticket odds of 2.00 to 4.50. This eliminates failure points, preserves individual leg value edge, and lowers the required break-even threshold from ~45% down to ~25–35%.

### 1.2 Separation of Statistical Calculation from Selection
The model is a deterministic statistical measurement instrument. It computes objective expected goals ($\lambda$), bivariate Poisson probabilities, break-even probabilities, value edges, and standardized warnings across **all candidate markets** for every fixture. 

The model does **not** hardcode subjective selection rules or restrict user flexibility. Selection preferences are applied dynamically via prompt workflows or human discretion, without modifying the underlying statistical engine.


## 2. CORE PRINCIPLES

1. **Probability first, value always**: Every selection must be supported by verifiable statistical probability and pricing evaluation.
2. **Elimination of accumulator drag**: Recommend short 2-leg accumulators (maximum 3 legs) to prevent failure-point proliferation. (The application and database remain flexible and unconstrained).
3. **Multi-market transparency**: For every analysed match, calculate and record probabilities for Over 1.5, Over 2.5, BTTS Yes, Under 3.5, Home Win, Draw, and Away Win simultaneously.
4. **Permanent probability tracking**: All companion probabilities (`prob_over_1_5`, `prob_over_2_5`, `prob_btts_yes`, `prob_under_3_5`, `prob_home_win`, `prob_away_win`, `prob_draw`) and full market evaluation matrices (`market_evaluations`) must be permanently recorded in the database for post-match calibration.
5. **Strict venue performance isolation**: Poisson calculations must strictly use venue-specific records (home team at home, away team away).
6. **Dual-Baseline Framework**: Every match must be evaluated against both active-season live baselines and multi-year historical competition baselines.
7. **No arbitrary probability adjustments**: Qualitative warnings (e.g., injuries, H2H patterns, tactical styles) operate as an evidence layer and risk filter; they must never alter mathematical Poisson parameters unless a validated adjustment method is approved.
8. **Decoupled selection layer**: The engine provides objective numbers and standardized warnings; selection criteria remain decoupled so the model specification never needs rewriting when bettor preferences evolve.
9. **No forced bets**: If data is incomplete or no market offers acceptable statistical support, return `INSUFFICIENT DATA` or `NO BET`.
10. **Evidence integrity**: Never invent missing statistics or substitute full-season overall averages for venue-specific data.


## 3. FIXTURE AND DATA VERIFICATION

Before analysing any match:
- Verify teams, competition, kickoff date, venue, and home/away designations.
- Confirm fixture is a standard league match (cup and playoff fixtures carry structural volatility).
- Prioritize current-season league statistics.
- Verify match counts ($MP \ge 5$ preferred for statistical stability).
- Isolate home-at-home and away-at-away records.
- Verify internal consistency: goals scored + conceded must match table totals; goals per game must match $GF / MP$.
- If sources disagree or venue data is unavailable, halt calculation under Section 5.0.


## 4. CORE CONCEPTS

### 4.1 Historical Goals
Past scoring records across venue matches and overall season matches. Historical goals provide evidence for modeling future rates; they are not future probabilities.

### 4.2 Expected Goals ($\lambda$)
The expected number of goals each team will score in the specific fixture:
- $\lambda_{\text{home}}$: Expected goals for the home team.
- $\lambda_{\text{away}}$: Expected goals for the away team.
- $\lambda_{\text{total}} = \lambda_{\text{home}} + \lambda_{\text{away}}$: Expected total match goals.

### 4.3 Poisson Goal Distributions
The mathematical probability of achieving exact goal counts ($k \in \{0, 1, 2, 3, \dots\}$) derived from expected goals $\lambda$.


## 5. EXPECTED-GOALS CALCULATION METHOD

### 5.0 MANDATORY VENUE-SPECIFIC INPUT PROTOCOL & HARD-STOP RULE

To prevent deceptive sample distortion (e.g., teams that score heavily at home but average very few goals away), the expected-goals calculation must **strictly and exclusively** use venue-specific performance:

1. **Home Team at Home (Schema: `home_matches_played`, `home_goals_scored`, `home_goals_conceded`, `home_goals_per_game`, `home_conceded_per_game`)**:
   - `home_matches_played`: Matches played strictly as host.
   - `home_goals_scored`: Goals scored strictly at home ground.
   - `home_goals_conceded`: Goals conceded strictly at home ground.
   - `home_goals_per_game` = `home_goals_scored` ÷ `home_matches_played`
   - `home_conceded_per_game` = `home_goals_conceded` ÷ `home_matches_played`

2. **Away Team Away (Schema: `away_matches_played`, `away_goals_scored`, `away_goals_conceded`, `away_goals_per_game`, `away_conceded_per_game`)**:
   - `away_matches_played`: Matches played strictly as visitor.
   - `away_goals_scored`: Goals scored strictly on the road.
   - `away_goals_conceded`: Goals conceded strictly on the road.
   - `away_goals_per_game` = `away_goals_scored` ÷ `away_matches_played`
   - `away_conceded_per_game` = `away_goals_conceded` ÷ `away_matches_played`

> [!CAUTION]
> **CRITICAL HARD-STOP RULE**:
> - If ANY of the 6 venue-specific values listed above are missing or cannot be verified, the model/agent **MUST NOT PROCEED WITH ANY PROBABILITY OR EXPECTED VALUE CALCULATIONS**.
> - Full-season overall aggregates must **NEVER** be substituted as a mathematical proxy for venue performance.
> - The analyst/agent must immediately halt the calculation for that match, assign the status **INSUFFICIENT DATA / MISSING VENUE DATA**, and report to the user:
>   *"Could not calculate probabilities for [Match Name] due to missing venue-specific home/away statistics."*

> [!IMPORTANT]
> **ALTERNATIVE PARITY RULE & VENUE VS. OVERALL STATS SEPARATION**:
> All betting alternatives (`betting_alternatives`) are considered-and-rejected betting options that require the exact same depth of statistical tracking as primary selections. Omitting venue or overall statistics from alternatives is strictly prohibited.
> Both selections and alternatives must record two clearly separated statistical baselines:
> 1. **Venue Performance Metrics (Direct Poisson Engine Inputs)**:
>    - `home_league_position`, `away_league_position`
>    - `home_matches_played`, `away_matches_played` (Strictly venue matches: home @ home, away @ away)
>    - `home_goals_scored`, `home_goals_conceded` (Strictly venue goals)
>    - `away_goals_scored`, `away_goals_conceded` (Strictly venue goals)
>    - `home_goals_per_game`, `home_conceded_per_game` (`home_goals_scored ÷ home_matches_played`)
>    - `away_goals_per_game`, `away_conceded_per_game` (`away_goals_scored ÷ away_matches_played`)
>    *Mathematical Invariant: Venue goals ÷ matches played must equal the per-game rate (±0.05 rounding).*
> 2. **Season Overall Metrics (All Venues Combined — Contextual Form Record)**:
>    - `home_overall_matches_played`, `away_overall_matches_played` (Total games across all venues)
>    - `home_overall_goals_scored`, `home_overall_goals_conceded` (Total season goals)
>    - `away_overall_goals_scored`, `away_overall_goals_conceded` (Total season goals)
>    - `home_overall_goals_per_game`, `home_overall_conceded_per_game` (Season-wide rate)
>    - `away_overall_goals_per_game`, `away_overall_conceded_per_game` (Season-wide rate)

### 5.1 Establish League Scoring Baselines
From the same league and season:
- `current_league_home_avg`: Average goals scored by home teams per league match.
- `current_league_away_avg`: Average goals scored by away teams per league match.

### 5.1A Dual-Baseline Protocol (Current Primary vs. Historical Benchmark)
To balance early-season sample volatility against cross-model determinism, Model 4.0 maintains the Dual-Baseline Framework:
1. **Primary Model (Current-Season Live Averages)**: Sourced from active season division matches (`current_league_home_avg`, `current_league_away_avg`). Drives all live market probability calculations.
2. **Historical Benchmark (Competition Baseline Reference)**: Sourced from `betting-data/rules/league_baselines.json` (`historical_league_home_avg`, `historical_league_away_avg`). Computes companion expected goals and benchmark probabilities.
3. **Alignment Metric & Consensus Classification (`alignment_delta_pp` & `alignment_remark`)**:
   - $\text{Delta} = |P_{\text{primary}} - P_{\text{historical}}| \times 100$
   - 5-Tier Consensus:
     - **Very High Alignment** (`very_high`, $\Delta \le 1.5$ pp)
     - **High Alignment** (`high`, $1.6 \le \Delta \le 3.0$ pp)
     - **Medium Alignment** (`medium`, $3.1 \le \Delta \le 5.0$ pp)
     - **Low Alignment** (`low`, $5.1 \le \Delta \le 7.0$ pp)
     - **Very Low Alignment** (`very_low`, $\Delta > 7.0$ pp)

### 5.2 Calculate Attacking and Defensive Strength
$$\text{Home Attacking Strength} = \frac{\text{Home Venue GF/Game}}{\text{League Home Scoring Avg}}$$
$$\text{Away Defensive Weakness} = \frac{\text{Away Venue GA/Game}}{\text{League Home Scoring Avg}}$$
$$\text{Away Attacking Strength} = \frac{\text{Away Venue GF/Game}}{\text{League Away Scoring Avg}}$$
$$\text{Home Defensive Weakness} = \frac{\text{Home Venue GA/Game}}{\text{League Away Scoring Avg}}$$

### 5.3 Calculate Baseline Expected Goals
$$\lambda_{\text{home}} = \text{League Home Scoring Avg} \times \text{Home Attacking Strength} \times \text{Away Defensive Weakness} = \frac{\text{Home Venue GF/G} \times \text{Away Venue GA/G}}{\text{League Home Scoring Avg}}$$
$$\lambda_{\text{away}} = \text{League Away Scoring Avg} \times \text{Away Attacking Strength} \times \text{Home Defensive Weakness} = \frac{\text{Away Venue GF/G} \times \text{Home Venue GA/G}}{\text{League Away Scoring Avg}}$$
$$\lambda_{\text{total}} = \lambda_{\text{home}} + \lambda_{\text{away}}$$


## 6. MULTI-MARKET POISSON PROBABILITY FORMULAS

Using $\lambda_{\text{home}}$, $\lambda_{\text{away}}$, and $\lambda_{\text{total}}$:

### 6.1 Individual Total Goal Probabilities
$$P(0\text{ goals}) = e^{-\lambda_{\text{total}}}$$
$$P(1\text{ goal}) = \lambda_{\text{total}} e^{-\lambda_{\text{total}}}$$
$$P(2\text{ goals}) = \frac{\lambda_{\text{total}}^2}{2} e^{-\lambda_{\text{total}}}$$
$$P(3\text{ goals}) = \frac{\lambda_{\text{total}}^3}{6} e^{-\lambda_{\text{total}}}$$

### 6.2 Over 1.5 Goals Probability (`prob_over_1_5`)
$$P(\text{Over } 1.5) = 1 - [P(0) + P(1)] = 1 - e^{-\lambda_{\text{total}}} (1 + \lambda_{\text{total}})$$

### 6.3 Over 2.5 Goals Probability (`prob_over_2_5`)
$$P(\text{Under } 2.5) = P(0) + P(1) + P(2) = e^{-\lambda_{\text{total}}} \left(1 + \lambda_{\text{total}} + \frac{\lambda_{\text{total}}^2}{2}\right)$$
$$P(\text{Over } 2.5) = 1 - P(\text{Under } 2.5)$$

### 6.4 Under 3.5 Goals Probability (`prob_under_3_5`)
$$P(\text{Under } 3.5) = P(0) + P(1) + P(2) + P(3) = e^{-\lambda_{\text{total}}} \left(1 + \lambda_{\text{total}} + \frac{\lambda_{\text{total}}^2}{2} + \frac{\lambda_{\text{total}}^3}{6}\right)$$

### 6.5 Both Teams to Score Probabilities (`prob_btts_yes`)
Assuming independent scoring processes between home and away teams:
$$P(\text{Home scores } \ge 1) = 1 - e^{-\lambda_{\text{home}}}$$
$$P(\text{Away scores } \ge 1) = 1 - e^{-\lambda_{\text{away}}}$$
$$P(\text{BTTS Yes}) = (1 - e^{-\lambda_{\text{home}}}) \times (1 - e^{-\lambda_{\text{away}}})$$
$$P(\text{BTTS No}) = 1 - P(\text{BTTS Yes})$$

### 6.6 Dual Contribution Index (DCI) & Game Openness
$$\text{DCI} = \frac{\min(\lambda_{\text{home}}, \lambda_{\text{away}})}{\max(\lambda_{\text{home}}, \lambda_{\text{away}})}$$
- **BTTS Yes Hard Floor**: $\text{DCI} \ge 0.50$ (Both sides must reliably generate goal threats).
- **Over 2.5 Hard Floor**: $\text{DCI} \ge 0.45$ (Disqualifies one-sided fixtures where a shutout forces one side to score 3 goals alone).
- **Small-Sample Venue Regression Anchor ($N \le 5$)**: When venue sample is $\le 5$ matches and venue scoring rate exceeds season-overall rate by $> 35\%$, regress $\text{GF}_{\text{effective}} = 0.50 \times \text{Venue GF/G} + 0.50 \times \text{Overall GF/G}$.

### 6.7 Bivariate Poisson Match Winner (1X2) & Draw No Bet Probabilities
Using the bivariate joint probability matrix $P(i, j) = \frac{\lambda_{\text{home}}^i e^{-\lambda_{\text{home}}}}{i!} \times \frac{\lambda_{\text{away}}^j e^{-\lambda_{\text{away}}}}{j!}$ for $0 \le i, j \le 8$:

1. **Home Win Probability (`prob_home_win`)**:
   $$P(\text{Home Win}) = \sum_{i > j} P(i, j)$$
2. **Away Win Probability (`prob_away_win`)**:
   $$P(\text{Away Win}) = \sum_{i < j} P(i, j)$$
3. **Draw Probability (`prob_draw`)**:
   $$P(\text{Draw}) = \sum_{i = j} P(i, j)$$
4. **Draw No Bet (DNB / Asian Handicap 0)**:
   $$P(\text{Home DNB}) = \frac{P(\text{Home Win})}{1 - P(\text{Draw})} = \frac{P(\text{Home Win})}{P(\text{Home Win}) + P(\text{Away Win})}$$
   $$P(\text{Away DNB}) = \frac{P(\text{Away Win})}{1 - P(\text{Draw})} = \frac{P(\text{Away Win})}{P(\text{Home Win}) + P(\text{Away Win})}$$
5. **Double Chance (1X / X2)**:
   $$P(1\text{X}) = P(\text{Home Win}) + P(\text{Draw})$$
   $$P(\text{X2}) = P(\text{Away Win}) + P(\text{Draw})$$

### 6.8 Dominance Ratio (DR) for "To Win" Qualification
$$\text{DR} = \frac{\lambda_{\text{favored}}}{\lambda_{\text{underdog}}}$$
- **Straight Win (1X2) Hard Threshold**: $\text{DR} \ge 2.20$, $\lambda_{\text{favored}} \ge 1.75\text{ GF/G}$, $\lambda_{\text{underdog}} \le 0.85\text{ GF/G}$, and $P(\text{Draw}) \le 22.0\%$.
- **Draw No Bet (DNB) Threshold**: $\text{DR} \ge 1.80$, $P(\text{Win}) \ge 60.0\%$, and $P(\text{Loss}) \le 16.0\%$. Draws void the leg.


## 7. BOOKMAKER PRICING, VALUE EDGE & EXPECTED VALUE (EV)

For each candidate market evaluated at available decimal odds $O$:
1. **Break-Even Probability**:
   $$P_{\text{breakeven}} = \frac{1}{O}$$
2. **Probability Edge (in percentage points)**:
   $$\text{Edge}_{\text{pp}} = (P_{\text{model}} - P_{\text{breakeven}}) \times 100$$
3. **Expected Value per Unit Staked**:
   $$\text{EV} = (P_{\text{model}} \times O) - 1$$
4. **Value Edge Categorization (`edge_remark`)**:
   - **Very High Edge** (`very_high`): $\text{Edge} > +15.0$ pp
   - **High Edge** (`high`): $+5.0 < \text{Edge} \le +15.0$ pp
   - **Medium Edge** (`medium`): $0.0 \le \text{Edge} \le +5.0$ pp
   - **Low Edge** (`low`): $-10.0 \le \text{Edge} < 0.0$ pp
   - **Very Low Edge** (`very_low`): $\text{Edge} < -10.0$ pp


## 8. STANDARDIZED WARNINGS SYSTEM

The model actively searches for evidence that challenges market viability. Warnings are qualitative evidence; they **never** alter numerical Poisson parameters.

### 8.1 Multi-Market Core Warning Categories

#### A. Both Teams to Score Specific Warnings
- `ONE_SIDED_SCORING_RISK`: The fixture exhibits severe attacking asymmetry (e.g., $\lambda_{\text{home}} \ge 2.20$ but $\lambda_{\text{away}} \le 0.70$). While Over 2.5 may be strong, BTTS Yes carries high shutout risk.
- `CLEAN_SHEET_DOMINANCE`: One or both teams hold exceptionally high clean sheet percentages at venue ($> 50\%$).
- `LOW_AWAY_SCORING`: The away team averages $< 0.85$ GF/G away from home, endangering BTTS Yes.
- `LOW_HOME_SCORING`: The home team averages $< 1.00$ GF/G at home.

#### B. Over 2.5 / Total Goals Warnings
- `STRONG_DEFENSIVE_MATCHUP`: Both teams concede $\le 0.85$ GA/G at venue, creating high resistance to Over 2.5.
- `H2H_LOW_GOALS`: Recurring head-to-head fixtures produce repeated 0–0, 1–0, or Under 2.5 scorelines.
- `KEY_ATTACKER_ABSENCE`: Main goal-scorer or chance-creator verified absent.
- `TACTICAL_LOW_GOAL_RISK`: Conservative tactical approach or fixture context suppresses attacking ambition.

#### C. Match Winner / "To Win" Warnings
- `DRAW_TRAP_RISK`: Calculated draw probability exceeds 22.0% ($P(\text{Draw}) > 0.22$), or head-to-head history is heavily concentrated in draws.
- `UNDERDOG_RESILIENCE`: Away underdog concedes $\le 1.10$ GA/G away and has a draw rate $\ge 35\%$.
- `VENUE_INVERSION`: Favorite holds weak venue win record ($< 60\%$) despite high overall league table standing.
- `DERBY_MATCH_VOLATILITY`: Intense local derby introducing high-card and low-margin disruption.
- `RESERVE_SQUAD_VOLATILITY`: One of the participating clubs is a youth academy or reserve squad (e.g. Dutch *"Jong"*, Spanish *"B"*, German *"II"*). Development squads suffer from unpredictable weekly roster turnover, first-team drop-downs, and non-standard promotional incentives, introducing fat-tail draw and upset variance in 1X2 Match Winner markets. Disqualifies straight win picks from main tickets; re-channels selection into open goal markets or Draw No Bet.

#### D. Under 3.5 Warnings
- `HIGH_VOLATILITY_SCORING`: Both teams average $> 1.80$ GF/G and concede $> 1.60$ GA/G, elevating risk of explosive scorelines (3–2, 4–1, 2–2).

#### E. Data Quality Warnings
- `SMALL_SAMPLE`: Venue sample is $< 5$ matches ($< 3$ matches triggers CRITICAL / INSUFFICIENT DATA).
- `MISSING_HOME_AWAY_DATA`: Mandatory venue statistics missing (triggers mandatory Hard-Stop).
- `CONFLICTING_SOURCES`: Significant discrepancy between data providers.
- `TEAM_NEWS_UNVERIFIED`: Starting lineups not verified prior to match.

#### F. League-Market Integrity Warnings (Gate 6)
- `LEAGUE_INTEGRITY_RESTRICTED`: The competition is classified as `TIER_3` (Restricted / Fat-Tail Trap) for the targeted market in `league_baselines.json`. Disqualifies the fixture from Main Tickets and diverts it to the Shadow Tracking Portfolio.


## 9. RECOMMENDED ACCUMULATOR CONSTRUCTION (NON-RESTRICTIVE)

To eliminate accumulator drag while generating substantial positive return:
1. **Target Leg Count**: **2 legs** (ideal sweet spot) or **3 legs** (maximum recommended).
2. **Target Combined Odds**: **2.00 to 3.50**.
3. **Leg Market Diversity**: Accumulators can blend complementary markets (e.g., Leg 1: `BTTS Yes` @ 1.70 + Leg 2: `Home Win` @ 1.45 = combined odds 2.47).
4. **App Flexibility**: This rule is an empirical strategic recommendation. The Next.js tracker and database do **NOT** artificially block tickets with more legs, preserving full research and testing flexibility.


## 10. EVALUATION REPORT FORMAT

For every analyzed match, the model generates a comprehensive multi-market report:

### Fixture Overview
- Match: Home Team vs Away Team
- League, Country, Date, Venue
- Data Quality Status (`Verified` / `Provisional` / `Insufficient Data`)

### Expected Goals & Baselines
- Venue Records: Home (MP, GF, GA, GF/G, GA/G) | Away (MP, GF, GA, GF/G, GA/G)
- League Scoring Baselines: Current Live vs Historical Benchmark
- Poisson Parameters: $\lambda_{\text{home}}$, $\lambda_{\text{away}}$, $\lambda_{\text{total}}$

### Multi-Market Comparison Matrix
| Market | Selection | Model Prob | Bookmaker Odds | Break-Even Prob | Value Edge (pp) | EV | Consensus (Delta) |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| Over 1.5 | Over 1.5 | $P(\text{O1.5})$ | $O_{\text{O1.5}}$ | $BE$ | $\text{Edge}$ | $\text{EV}$ | $\Delta$ (`remark`) |
| Over 2.5 | Over 2.5 | $P(\text{O2.5})$ | $O_{\text{O2.5}}$ | $BE$ | $\text{Edge}$ | $\text{EV}$ | $\Delta$ (`remark`) |
| BTTS | Both Teams to Score | $P(\text{BTTS})$ | $O_{\text{BTTS}}$ | $BE$ | $\text{Edge}$ | $\text{EV}$ | $\Delta$ (`remark`) |
| Under 3.5 | Under 3.5 | $P(\text{U3.5})$ | $O_{\text{U3.5}}$ | $BE$ | $\text{Edge}$ | $\text{EV}$ | $\Delta$ (`remark`) |
| Match Winner | Home Win | $P(\text{1})$ | $O_{\text{1}}$ | $BE$ | $\text{Edge}$ | $\text{EV}$ | $\Delta$ (`remark`) |
| Draw No Bet | Home DNB | $P(\text{DNB})$ | $O_{\text{DNB}}$ | $BE$ | $\text{Edge}$ | $\text{EV}$ | $\Delta$ (`remark`) |

### Standardized Warnings
Structured warning list detailing warning type, severity, market relevance, direction, and evidence.


## 11. DATABASE SCHEMA & PAYLOAD COMPLIANCE

Every imported ticket must preserve:
1. `ticket_number`: Formatted as `S-*-v4.0` for selections or `A-*-v4.0` for alternatives.
2. `model_version`: `'4.0'`
3. `model_name`: `'roys_betting_engine_BTS_O2-5_win'`
4. For every selection and alternative:
   - `prob_over_1_5`: Exact Poisson Over 1.5 probability (numeric 5,4).
   - `prob_over_2_5`: Exact Poisson Over 2.5 probability (numeric 5,4).
   - `prob_btts_yes`: Exact Poisson BTTS Yes probability (numeric 5,4).
   - `prob_under_3_5`: Exact Poisson Under 3.5 probability (numeric 5,4).
   - `prob_home_win`: Exact Poisson Home Win probability (numeric 5,4).
   - `prob_away_win`: Exact Poisson Away Win probability (numeric 5,4).
   - `prob_draw`: Exact Poisson Draw probability (numeric 5,4).
   - `market_evaluations`: JSONB object holding odds, break-even %, edges, and EVs for all evaluated markets.
   - All 12 venue-specific attributes and 10 season-overall attributes.
   - All 8 dual-baseline and alignment attributes.


## 12. CORE RULE SUMMARY

"Multi-market precision with 1X2 and Draw No Bet integration. Expected goals isolated by venue. Short 2–3 leg accumulators to defeat accumulator drag. Objective probabilities calculated for all markets; selection decoupled from engine. All companion probabilities permanently recorded in the database. Learn from every outcome."

