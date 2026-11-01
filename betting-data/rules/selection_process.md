# AUTOMATED SELECTION PROCESS & PORTFOLIO RULES (`selection_process.md`)

> **Model Compatibility**: Designed for **Model 3.0 (`roys_betting_engine_BTS_O2-5`)** and beyond.  
> **Primary Purpose**: Automate the transition from raw match shortlists into a finalized, high-safety **2-leg (maximum 3-leg)** betting ticket with combined odds $\ge 2.00$, while cataloging all other promising matches in a companion candidates file for user review and model training.

---

## 1. CORE PHILOSOPHY & OBJECTIVES

1. **Eliminate Accumulator Drag**:
   - The primary cause of sub-50% ticket win rates is the compound probability penalty of 4–5 leg accumulators ($0.85^5 \approx 44.3\%$).
   - We target **2-leg tickets** as the default sweet spot, with an occasional **3-leg fallback** when needed to preserve safety while hitting our odds target. Never 4 or more legs.
2. **Strict Combined Odds Floor**:
   - The combined odds of the main ticket must be **$\ge 2.00$** (sweet spot: **$2.00 - 2.50$**). We do not bet below 2.00.
3. **Safety Above All Else**:
   - Strike the balance between probability and odds. We only accept higher single-leg odds (e.g. $1.60 - 1.80$) when the statistical indicators (venue Poisson, dual scoring capacity) strongly support it.
   - If two safe legs cannot reach 2.00, we prefer a **3-leg ultra-safe ticket** over forcing a high-variance single pick.
4. **Solve the One-Sided Reliance Trap**:
   - Matches where only one team scores heavily carry high risk if that favorite hits a slump, rotates players, or meets a defensive low block. We evaluate **game openness** and the ability of **both teams** to contribute to the goal market.
5. **Transparency & User Sovereignty**:
   - **Negative EV matches are never discarded automatically**. Edge and EV are calculated and displayed transparently so the bettor retains final discretion.

---

## 2. THE DUAL CONTRIBUTION INDEX (DCI) & GAME OPENNESS

To evaluate whether a match has multi-directional goal momentum rather than one-sided dependence, the selection engine computes the **Dual Contribution Index (DCI)**:

$$\text{DCI} = \frac{\min(\lambda_{\text{home}}, \lambda_{\text{away}})}{\max(\lambda_{\text{home}}, \lambda_{\text{away}})}$$

Where:
- $\lambda_{\text{home}}$ = Venue-adjusted expected goals for the home team.
- $\lambda_{\text{away}}$ = Venue-adjusted expected goals for the away team.

### 2.1 DCI Classification & Market Matching

| DCI Range | Category | Market Suitability | Strategic Risk Note |
| :--- | :--- | :--- | :--- |
| **$\text{DCI} \ge 0.55$** | **Highly Open / Balanced** | **BTTS Yes**, **Over 2.5** | Both teams score and concede reliably. High resilience: even if the favorite underperforms, the opponent can score first or compensate. (e.g. Groningen vs Sparta 2-3 win, DCI 0.98). |
| **$0.45 \le \text{DCI} < 0.55$** | **Moderate Balance** | **Over 2.5**, **Over 1.5** | Valid for Over 2.5 if combined $\lambda_{\text{total}} \ge 2.70$. BTTS Yes requires individual scrutiny. |
| **$\text{DCI} < 0.45$** | **One-Sided Reliance** | **Over 1.5 ONLY** (Anchor) | Heavy favorite carries $> 70\%$ of the goal burden. **Over 2.5 and BTTS Yes are strictly DISQUALIFIED from main selections**. If favorite is held to 1 goal or wins 1-0/2-0, Over 2.5 fails (e.g. Arouca vs Nacional 1-0 loss, DCI 0.24). |

### 2.2 Venue Small-Sample Regression Anchor ($N \le 5$)

When early in a season or when a team has played $\le 5$ matches at their home or away venue, small-sample blowout noise (e.g. one 4-0 home win) can artificially balloon venue scoring rates.

- **Trigger**: When venue matches $N \le 5$, check whether venue scoring rate exceeds season-overall rate by $> 35\%$:
  $$\frac{\text{Venue GF/G}}{\text{Overall GF/G}} > 1.35$$
- **Regression Formula**: Blend the venue rate with the season-overall rate (50/50):
  $$\text{GF}_{\text{effective}} = 0.50 \times \text{Venue GF/G} + 0.50 \times \text{Overall GF/G}$$
- **Impact**: In FC Arouca (4 home games, 8 GF = $2.00$/G vs 9 overall games, 12 GF = $1.33$/G), the unregressed $2.00$ venue rate produced an inflated $66.2\%$ Over 2.5 probability. Applying the regression anchor drops effective GF to $\mathbf{1.66}$, reducing Over 2.5 probability to $54.8\%$ and correctly preventing it from qualifying.

---

## 3. MARKET SELECTION PROFILES & SAFETY THRESHOLDS

The engine selects from four standard goal markets, applying specific statistical qualifications:

### 3.1 Market 1: The Ultra-Safe Anchor (Over 1.5 Goals)
- **Role**: Probability anchor to pair with a higher-odds companion leg.
- **Typical Odds**: $1.20 - 1.38$.
- **Qualifications**:
  - Model Estimated Probability: $\ge 82\%$.
  - Combined Venue Goals: $\lambda_{\text{total}} \ge 2.35$.
  - Zero defensive asphyxiation warnings (`STRONG_DEFENSIVE_MATCHUP`).
  - If $\text{DCI} < 0.40$ (underdog rarely scores), the favorite must have conceded in at least $35\%$ of home fixtures or average $\ge 2.10$ goals scored.

### 3.2 Market 2: Balanced Both Teams to Score (BTTS Yes)
- **Role**: Primary odds booster with balanced game dynamics.
- **Typical Odds**: $1.58 - 1.82$.
- **Qualifications**:
  - Model Estimated Probability: $\ge 60\%$.
  - Openness: $\text{DCI} \ge 0.50$ (both teams capable of scoring).
  - Venue Scoring Rates: Home scores $\ge 1.15$ at home; Away scores $\ge 1.05$ away.
  - Venue Concession Rates: Home concedes $\ge 1.00$ at home; Away concedes $\ge 1.20$ away.

### 3.3 Market 3: High-Yield Over 2.5 Goals
- **Role**: High-yield selection for fixtures with strong offensive tempo and proven dual participation.
- **Typical Odds**: $1.58 - 1.85$.
- **Qualifications**:
  - Model Estimated Probability: $\ge 60\%$.
  - Combined Expected Goals: $\lambda_{\text{total}} \ge 2.70$.
  - **MANDATORY HARD DCI FLOOR**: $\mathbf{\text{DCI} \ge 0.45}$.
  - **One-Sided Disqualification Rule**: If $\text{DCI} < 0.45$, Over 2.5 is **strictly disqualified from main selections**, even if Poisson probability exceeds $65\%$. Requiring a single team to score 3 goals alone when an opponent is shut out introduces unacceptable fragility (as demonstrated in Ticket S-1-v3.0 where Arouca won 1-0 against scoreless Nacional). In low-DCI fixtures, downgrade to **Over 1.5** only.

### 3.4 Market 4: Tactical Under 3.5 Goals
- **Role**: High-probability pick for cagey tactical battles or intense derbies.
- **Typical Odds**: $1.28 - 1.48$.
- **Qualifications**:
  - Model Estimated Probability: $\ge 74\%$.
  - Combined Expected Goals: $\lambda_{\text{total}} \le 2.45$.
  - Defenses: Both teams conceding $\le 1.10$ goals/game at venue.

---

## 4. TICKET PORTFOLIO CONSTRUCTION LOGIC

### Step 1: Filter & Classify Candidates
- Disqualify fixtures missing venue data (Hard-Stop Rule).
- Apply Section 2.2 Small-Sample Regression Anchor ($N \le 5$).
- Compute DCI and enforce the $\text{DCI} \ge 0.45$ floor for Over 2.5 and $\text{DCI} \ge 0.50$ for BTTS Yes.
- Disqualify fixtures with unverified critical lineup absences or dead-rubber game state.
- Retain all other fixtures regardless of positive or negative EV.

### Step 2: Try 2-Leg Combinations First (Default Target)
- Search for the highest-probability pair whose combined odds meet:
  $$\text{Combined Odds} = \text{Odds}_1 \times \text{Odds}_2 \ge 2.00 \quad (\text{ideal corridor: } 2.00 - 2.50)$$
- **Optimal Template A (Anchor + Value)**:
  - Leg 1: Ultra-Safe Over 1.5 @ $1.25 - 1.35$ ($P \ge 84\%$)
  - Leg 2: Balanced BTTS Yes or Over 2.5 ($\text{DCI} \ge 0.45$) @ $1.58 - 1.75$ ($P \ge 62\%$)
  - Result: Combined Odds $\approx 2.00 - 2.36$, Aggregate Probability $\approx 52 - 55\%$.
- **Optimal Template B (Two Moderate Value Legs)**:
  - Leg 1: BTTS Yes @ $1.50$ ($P \ge 66\%$, $\text{DCI} \ge 0.55$)
  - Leg 2: Over 2.5 / BTTS Yes @ $1.45 - 1.55$ ($P \ge 65\%$, $\text{DCI} \ge 0.45$)
  - Result: Combined Odds $\approx 2.18 - 2.33$, Aggregate Probability $\approx 43 - 48\%$.

### Step 3: Automated 3-Leg Safety Trigger (Crucial Protection Rule)
- **The "2-Leg Odds Pressure" Problem**:
  When our best qualifying pick has odds $\le 1.50$ (e.g. Groningen BTTS Yes @ 1.46), forcing a 2-leg ticket requires Leg 2 to have odds $\ge 1.37$ ($2.00 / 1.46 = 1.37$). If the remaining candidate slate only offers ultra-safe Over 1.5 picks (e.g. 1.25 – 1.32) and one-sided Over 2.5 picks, **never elevate a one-sided game to Over 2.5 just to hit the 2.00 floor in 2 games**.
- **Automated 3-Leg Action**:
  - The engine **automatically transitions to a 3-leg ticket** using only high-probability, high-safety picks ($\ge 78\%$ per leg):
    $$\text{Ticket Odds} = \text{Odds}_1 \times \text{Odds}_2 \times \text{Odds}_3 \ge 2.00 \quad (\text{target corridor: } 2.20 - 2.80)$$
  - **Empirical Proof (Ticket S-1-v3.0 Retrospective)**:
    - *Forced 2-Leg*: Groningen BTTS (1.46, won 2-3) $\times$ Arouca O2.5 (1.83, **lost 1-0**) = LOST.
    - *3-Leg Safety Solution*: Groningen BTTS (1.46, won 2-3) $\times$ Academico de Viseu O1.5 (1.29, **won 2-1**) $\times$ Braga O1.5 (1.32, **won 3-0**) = **Combined Odds 2.49, ALL 3 LEGS WON**.
- **Hard Cap**: Never expand beyond 3 legs under any circumstance. Maximum allowable legs on any ticket is strictly 3.

---

## 5. THE TWO-TIER DELIVERABLES SYSTEM

To save time while ensuring complete transparency and learning opportunities, every evaluation produces **two synchronized JSON payloads**:

```
betting-data/<month>/
├── evaluation_<YYYY-MM-DD>.md       # Human-readable markdown report with full Poisson breakdown
├── ticket_<YYYY-MM-DD>_001.json     # Ready-to-import app ticket (Main Selections + Top Alternatives)
└── candidates_<YYYY-MM-DD>.json     # ALL other qualified matches evaluated that day
```

### 5.1 File 1: `ticket_<YYYY-MM-DD>_001.json`
- **`selections`**: The primary 2 legs (or max 3) that form the official betting ticket to be wagered.
- **`alternatives`**: The top 3–5 nearest contenders that were almost selected. These are imported into the app for formal settlement, warning tracking, and post-match audit.

### 5.2 File 2: `candidates_<YYYY-MM-DD>.json`
- **Purpose**: A comprehensive watchlist of **all good matches evaluated for that day** that did not make the main ticket or top alternatives.
- **Why this exists**:
  1. **Cross-Examination**: Allows you to compare your personal instincts against Antigravity's selections.
  2. **Model Training & Feedback**: You can review why Antigravity ranked game X above game Y and provide corrective feedback.
  3. **Instant Swapping**: If you prefer a candidate from this file over a selection on the ticket, you can instruct Antigravity: *"Swap Selection 2 for Match C from candidates"*, and the ticket JSON is regenerated in seconds.
- **Schema**: Contains the same complete structure as ticket alternatives (venue stats, odds, all 4 market probabilities, DCI, and model comments).

---

## 6. ONE-STEP ANTIGRAVITY EXECUTION PROTOCOL

When the user provides match options:
```text
Evaluate today's matches for [DATE] according to our selection process:
[List of matches and Betmomo odds]
```

Antigravity executes the following in a single response:
1. Gathers venue-specific stats and runs `calculate_model.py`.
2. Computes DCI, market probabilities, edge, and EV across all 4 markets.
3. Automatically constructs the **optimal 2-leg (or 3-leg) ticket ($\ge 2.00$ odds)** based on safety and game openness.
4. Populates top alternatives and generates `candidates_<date>.json` with all other qualified matches.
5. Saves all three files:
   - `betting-data/<month>/evaluation_<date>.md`
   - `betting-data/<month>/candidates_<date>.json`
   - `betting-data/<month>/ticket_<date>_001.json`
6. Presents the **Selection Summary Table** in chat along with the ready-to-import ticket JSON.

