# AUTOMATED SELECTION PROCESS & PORTFOLIO RULES (`selection_process.md`)

> **Model Compatibility**: Designed for **Model 4.0 (`roys_betting_engine_BTS_O2-5_win`)** and beyond.  
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
5. **The Smart Probability-Odds Trade-Off (Graceful Degradation)**:
   - **The Forbidden Trade-Off**: Never sacrifice double-digit probability to chase odds. It is strictly unacceptable to drop from an $85\%+$ win rate down into the $60\% - 70\%$ high-variance zone just to force a 2-leg ticket over 2.00 odds.
   - **The Permitted Trade-Off (Graceful Degradation)**: Trading within the elite tier is encouraged. Leaving a $95\%$ pick for a $90\% - 94\%$ pick (e.g. from 1.15 to 1.43) is an intelligent trade-off because it captures meaningful odds while preserving elite reliability.
6. **Transparency & User Sovereignty**:
   - **Negative EV matches are never discarded automatically**. Edge and EV are calculated and displayed transparently so the bettor retains final discretion.
7. **The Two-Tier Portfolio Architecture (Active Capital vs. Shadow Tracking Portfolio)**:
   - **Tier 1: Active Capital Portfolio (`selections`)**:
     - Strictly restricted to **1 to 3 matches** (default: 2 legs, combined odds $\ge 2.00$).
     - Real wagers are placed exclusively on these fixtures. This shields capital from multi-match fluke risks, referee errors, and accumulator drag.
   - **Tier 2: Shadow Tracking Portfolio (`alternatives`)**:
     - The top **3 to 5 next-best selections** that met all Poisson, DCI, and EV qualifications but were not included in the main ticket.
     - **Treated with Identical Statistical Rigor**: Alternatives are never filler; they are evaluated with the exact same mathematical scrutiny, DCI verification, and market selection as main legs.
     - **Purpose: Zero-Risk Empirical Benchmarking**: Alternatives are officially saved in the database to track multi-game prediction accuracy above 3 games without risking capital. If long-term post-match tracking shows that alternatives consistently achieve an elite win rate ($\ge 85\%$), the bettor can confidently expand ticket size or place secondary tickets on select high-quality slates.

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

#### 3.1.1 Over 1.5 Odds Realities & The Smart Trade-Up Check
In real-world bookmaker pricing, fixtures with hyper-dominant offensive tempo often price Over 1.5 heavily below $1.25$ (e.g. $1.12 - 1.18$).
- **Tier 1: Viable Standalone Corridor ($1.24 - 1.36$)**:
  In competitive or moderately open fixtures (e.g. Reims vs Sochaux @ $1.23$, Oviedo vs Las Palmas @ $1.27$, Red Star vs Nancy @ $1.29$), Over 1.5 provides huge safety ($86\% - 93\%$) while moving the needle toward our combined odds floor. These are prime candidates for 2-leg and 3-leg portfolios.
- **Tier 2: Heavily Juiced Corridor ($< 1.22$)**:
  When Over 1.5 odds drop below $1.22$ (e.g. $1.12 - 1.18$), multiplying three of them cannot reach the $2.00$ combined floor ($1.15^3 = 1.52$).
  - **The Smart Trade-Up Check**: If Over 1.5 is $< 1.22$, inspect the same fixture's **Over 2.5** (if $\text{DCI} \ge 0.45$) or **BTTS Yes** (if $\text{DCI} \ge 0.50$). If Over 2.5 or BTTS probability remains **$\ge 88\% - 94\%$** (as seen in Jong Utrecht vs FC Dordrecht: O1.5 was $98.2\%$ @ $1.12$, but O2.5 was $93.7\%$ @ $1.43$), **trade up to the higher market**. Sacrificing only 4–5pp of probability captures a massive leap in odds.
  - **The Safety Hold Rule**: If trading up to Over 2.5 causes the probability to plummet into the high-variance zone ($< 80\%$), **DO NOT trade up**. Either pair the Over 1.5 in a 3-leg hybrid ticket with a higher anchor or discard the fixture.

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

### 3.5 Market 5: Dominant Match Winner ("To Win" / 1X2)
- **Role**: Capitalize on massive attacking and defensive asymmetry when odds offer positive expected value.
- **Typical Odds**: $1.40 - 2.05$.
- **Qualifications (The 7-Gate Checklist)**:
  1. **Dominance Ratio**: $\text{DR} = \frac{\lambda_{\text{favored}}}{\lambda_{\text{underdog}}} \ge 2.20$.
  2. **Expected Goals Levels**: Favored team venue expected goals $\ge 1.75\text{ GF/G}$; Underdog venue expected goals $\le 0.85\text{ GF/G}$.
  3. **Venue Isolation Record & Venue Asymmetry Protocol (`AWAY_FAVORITE_RESTRICTION`)**:
     - **Dominant Home Win (Primary 1X2 Standard)**: Home team home win rate $\ge 65.0\%$; Away opponent road loss rate $\ge 50.0\%$. Home venue advantage (crowd momentum, turf familiarity, pitch dimensions, referee psychological bias) provides essential structural stability against draw congestion.
     - **Straight Away Win Prohibition on Main Capital Tickets (`AWAY_FAVORITE_RESTRICTION`)**:
       - Straight **1X2 Away Win selections are STRICTLY PROHIBITED on Main Capital Tickets (`selections`)**.
       - *Tactical Rationale*: Away favorites at short odds ($1.40 - 1.75$) face asymmetric downside from home underdog low blocks (e.g. Watford 0–0 Middlesbrough), hostile venue counter-attacks (e.g. Nottingham Forest 3–1 Man City), and travel fatigue. Standard Poisson models underestimate the fat-tail draw trap in these environments.
       - *Mandatory DNB / Double Chance Fallback*: If a dominant away favorite passes all numerical criteria ($\text{DR} \ge 2.20$, $P(\text{Win}) \ge 65\%$), it may ONLY be wagered on main tickets via **Draw No Bet (DNB / Asian Handicap 0)** or **Double Chance (X2)**. A draw voids the leg (or wins the DC), preserving accumulator capital!
       - *Shadow Portfolio Tracking*: Statistically qualified straight Away Win picks may still be tracked in the **Shadow Tracking Portfolio (`alternatives`)** for model calibration, but real capital must never be risked on them.
     - **The Goal Market Conversion Principle**:
       - When an away favorite boasts high offensive output ($\ge 1.80\text{ GF/G}$), **prioritize Goal Markets (Over 1.5, Over 2.5, or BTTS Yes) over match winner markets**. Goal markets capture the team's offensive output without incurring the binary risk of an unexpected draw or upset (as proven by Norwich Over 2.5 @ 1.70 winning 5-0 while Middlesbrough Away Win @ 1.51 failed 0-0).
  4. **Poisson Floor & Draw Suppression**: $P(\text{Win}) \ge 70.0\%$ (or $66.0\% - 69.9\%$ if Edge $\ge +5.0\text{pp}$), and **$P(\text{Draw}) \le 22.0\%$**. If draw probability exceeds $22\%$, straight win is prohibited.
  5. **Clean Sheet / Outscore Resilience**: If the favorite regularly concedes at venue ($\text{GA/G} > 1.15$), venue scoring must exceed $2.30\text{ GF/G}$.
  6. **The Reserve / Academy Squad Disqualification Rule (`RESERVE_SQUAD_RESTRICTION`)**:
     - **Strict Disqualification**: If either team in the fixture is a reserve, youth academy, or development squad (e.g. Dutch *"Jong"* teams, Spanish *"B"* or *"Castilla"* teams, German *"II"* teams, Austrian *"Liefering"*), straight **1X2 Match Winner picks are STRICTLY PROHIBITED on Main Capital Tickets (`selections`)**.
     - **Mathematical Rationale**: Development squads experience extreme weekly roster turnover (senior team bench call-ups, youth rotations) and compete without standard promotional/relegation incentives. While their goal volume is predictable, their match outcome variance generates fat-tail draw and upset risks that Poisson distributions understate (as evidenced by VVV-Venlo 1–1 Jong PSV).
     - **Required Action**: The match's high openness ($\text{DCI} \ge 0.50$) must be captured via **Goal Markets (Over 1.5, Over 2.5, BTTS Yes)**.
     - **Shock Absorber Fallback**: If a favorite *must* be backed against a reserve squad, the selection **must use Market 6 (Draw No Bet / DNB)** so that a draw voids the selection rather than killing the accumulator.
  7. **Contextual Gate**: Disqualified if key spine players are injured, fixture follows exhausting midweek European travel, or match is a local derby.

### 3.6 Market 6: Draw No Bet (DNB / Asian Handicap 0) — Shock Absorber
- **Role**: Exploits high win probability while insulating the accumulator against draw attrition.
- **Typical Odds**: $1.28 - 1.75$.
- **Qualifications**:
  - Strong Favorite: $P(\text{Win}) \ge 60.0\%$ and Dominance Ratio $\text{DR} \ge 1.80$.
  - Low Loss Risk: Underdog win probability $P(\text{Loss}) \le 16.0\%$.
  - Draw Buffer: Match has moderate draw risk ($22\% - 28\%$). Under DNB, a draw settles as **`void`** (stake preserved, effective combined odds recalculate), keeping the ticket alive!

### 3.7 Gate 6: League-Market Integrity Filter (LMI Matrix Gate)
- **Role**: Disqualify fat-tail league traps where macro tactical metas or cynical defense suppress market hit rates regardless of individual fixture Poisson stats.
- **Rules & Restrictions**:
  - **Tier 1 (High Reliability)**: Green light for main ticket wagers (e.g. Netherlands Eerste Divisie on Over 1.5/2.5; Germany 2. Bundesliga on Over 1.5; Japan J1 on Under 3.5).
  - **Tier 2 (Moderate / Controlled)**: Permitted on main ticket only if DCI and probability exceed primary thresholds with positive edge.
  - **Tier 3 (Restricted / Fat-Tail Trap)**: **STRICTLY DISQUALIFIED from Main Tickets (`selections`)**.
    - *Examples*: Japan J1 League on Over 1.5 / Over 2.5 (28% 0-0/1-0 rate); France Ligue 2 on Over 1.5 / Over 2.5; Argentina Primera on Over 1.5; Spain Segunda on Over 1.5.
    - *Action*: Divert candidate fixture exclusively to the **Shadow Tracking Portfolio (`alternatives`)**. Real money capital must never be risked on a Tier 3 market corridor.

---

## 4. TICKET PORTFOLIO CONSTRUCTION LOGIC

### Step 1: Filter & Classify Candidates
- Disqualify fixtures missing venue data (Hard-Stop Rule).
- Apply Section 2.2 Small-Sample Regression Anchor ($N \le 5$).
- Compute DCI and enforce the $\text{DCI} \ge 0.45$ floor for Over 2.5 and $\text{DCI} \ge 0.50$ for BTTS Yes.
- **Enforce Gate 6 (League-Market Integrity)**: Check `league_baselines.json` and in-app empirical LMI matrix. If the match falls in a **`TIER_3`** corridor for that market, **divert to shadow alternatives immediately**.
- **Enforce the Reserve Squad Restriction (`RESERVE_SQUAD_RESTRICTION`)**: If either team is a reserve/academy squad ("Jong", "B", "II"), strictly prohibit straight 1X2 Match Winner picks from main tickets. Re-channel selection into Goal Markets or Draw No Bet (DNB).
- **Enforce the Away Favorite Restriction (`AWAY_FAVORITE_RESTRICTION`)**: Strictly prohibit straight 1X2 Away Win picks from main tickets. Re-channel candidate fixtures into Goal Markets (Over 1.5, Over 2.5, BTTS) or require Draw No Bet (DNB) as a mandatory shock absorber against low-block draw traps.
- Disqualify fixtures with unverified critical lineup absences or dead-rubber game state.
- Retain all other fixtures regardless of positive or negative EV.

### Step 2: Try 2-Leg Combinations First (Default Target)
- Search for the highest-probability pair whose combined odds meet:
  $$\text{Combined Odds} = \text{Odds}_1 \times \text{Odds}_2 \ge 2.00 \quad (\text{ideal corridor: } 2.00 - 2.50)$$
- **Priority 1: Elite High-Probability Pair (The Gold Standard)**:
  - Two legs with single-leg probability $\ge 85\%$ and odds $1.40 - 1.52$.
  - Yields combined odds $\approx 2.05 - 2.25$ with compound probability $> 80\%$ (Break-even $\approx 48\%$, Edge $> +30\text{pp}$).
  - *Example (Ticket S-2-v3.0)*: Utrecht vs Dordrecht (O2.5 @ 1.43, 93.7%) $\times$ Sassuolo vs Fiorentina (BTTS @ 1.45, 87.9%) = **Combined Odds 2.07 @ 82.4% Probability (WON)**.
- **Priority 2: Anchor + Value Pair**:
  - Leg 1: Ultra-Safe Over 1.5 @ $1.25 - 1.35$ ($P \ge 85\%$)
  - Leg 2: Balanced BTTS Yes or Over 2.5 ($\text{DCI} \ge 0.55$) @ $1.58 - 1.70$ ($P \ge 68\%$)
  - Yields combined odds $\approx 2.00 - 2.30$, compound probability $\approx 58 - 62\%$.
- **Priority 3: Dominant Winner + Anchor Pair (Model 4.0 Focus)**:
  - Leg 1: Dominant Home Win or Draw No Bet (DNB) @ $1.45 - 1.65$ ($P \ge 70\%$, Dominance Ratio $\ge 2.20$, $P(\text{Draw}) \le 22\%$).
    - *Reserve Squad Constraint*: Leg 1 Dominant Winner must be contested strictly between established senior first-teams (e.g. Heracles vs Roda JC 5-1). Straight 1X2 selections involving reserve/academy squads ("Jong", "B", "II") are strictly prohibited.
    - *Away Favorite Constraint*: Straight Away Win is strictly barred from Leg 1. Away favorites may only occupy Leg 1 if backed as **Draw No Bet (DNB)** with $\text{DR} \ge 2.20$ and $P(\text{Win}) \ge 65\%$.
  - Leg 2: Ultra-Safe Over 1.5 @ $1.25 - 1.35$ ($P \ge 85\%$)
  - Yields combined odds $\approx 2.00 - 2.25$, compound probability $\approx 60 - 68\%$.

### Step 3: Automated 3-Leg Safety Trigger (Crucial Protection Rule)
- **The "2-Leg Odds Pressure" Problem**:
  When our best qualifying pick has odds $\le 1.50$ (e.g. Groningen BTTS Yes @ 1.46), forcing a 2-leg ticket requires Leg 2 to have odds $\ge 1.37$ ($2.00 / 1.46 = 1.37$). If the remaining candidate slate only offers ultra-safe Over 1.5 picks (e.g. 1.22 – 1.32) and one-sided Over 2.5 picks, **never elevate a one-sided or low-probability game to Over 2.5 just to hit the 2.00 floor in 2 games**.
- **Automated 3-Leg Action**:
  The engine **automatically transitions to a 3-leg ticket** using only high-probability, high-safety picks ($\ge 80\%$ per leg):
  $$\text{Ticket Odds} = \text{Odds}_1 \times \text{Odds}_2 \times \text{Odds}_3 \ge 2.00 \quad (\text{target corridor: } 2.05 - 2.60)$$
- **3-Leg Portfolio Archetypes**:
  1. **Archetype A: The Hybrid 3-Leg (1 Value Anchor + 2 Over 1.5 Anchors)**:
     - Leg 1: High-openness BTTS Yes or Over 2.5 ($1.42 - 1.50$, $P \ge 85\%$)
     - Leg 2: Over 1.5 ($1.20 - 1.26$, $P \ge 88\%$)
     - Leg 3: Over 1.5 ($1.20 - 1.26$, $P \ge 88\%$)
     - *Example*: $1.45 \times 1.22 \times 1.22 = \mathbf{2.15}$ combined odds, compound probability $\approx \mathbf{72\%}$.
  2. **Archetype B: The Over 1.5 Triplet (High-Floor Safety)**:
     - 3 Over 1.5 selections from competitive leagues.
     - **Mathematical Constraint**: Individual legs must average at least **$1.26$** ($1.26^3 \approx 2.00$). If bookmakers price Over 1.5 below $1.24$, do not force a triplet of low odds—use the Hybrid or 2-Leg structure instead.
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
- **`selections`**: The primary 1 to 3 legs that form the official real-money betting ticket to be wagered.
- **`alternatives`**: The **Official Shadow Tracking Portfolio** (3 to 5 next-best qualified fixtures). These are imported into the app for formal settlement, warning tracking, and post-match audit to measure prediction accuracy above 3 games risk-free.

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

