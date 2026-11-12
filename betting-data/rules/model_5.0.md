# BETTING MODEL VERSION 5.0 — TOURNAMENT & INTERNATIONAL ENGINE (CONTINENTAL CLUBS & NATIONAL TEAMS)

## MODEL NAME

`roys_tournament_international_engine`

## MODEL METADATA

- **Model Version**: `5.0`
- **Model UUID**: `f1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d`
- **Engine Purpose**: Specialized probability, bivariate Poisson, and World Football Elo evaluation engine for Continental Club Competitions and National Team Tournaments.
- **Independence Guarantee**: Strictly coexists alongside Model 4.0 (`roys_betting_engine_BTS_O2-5_win`) without modifying, overriding, or replacing domestic league calculations.

---

## 1. OBJECTIVE & EXECUTIVE PHILOSOPHY

### 1.1 The Operational Mandate
During international FIFA breaks, international tournament finals (AFCON, UEFA Euro, Copa América, FIFA World Cup), and continental club competition matchdays (UEFA Champions League, Europa League, CAF Champions League), standard domestic league betting halts. 

Model 4.0 explicitly halts calculations for these fixtures under Section 3 and Section 5.0 because it requires domestic venue statistics ($MP_{\text{venue}} \ge 5$) and shared domestic league baselines.

**Model 5.0 solves this operational void by providing a mathematically sound, cross-border predictive framework:**
1. **Continental Club Competitions**: Replaces naive domestic goal rates with normalized scoring metrics weighted by the **Competition Strength Index (CSI)**.
2. **National Team Competitions**: Derives expected goal margins directly from the **World Football Elo Rating system** and tournament-specific baseline scoring averages.
3. **Tournament Risk Gating**: Protects capital against tournament-specific risks: regular-time draw attrition in knockouts, dead-rubber 3rd group fixtures, and neutral venue distortions.

### 1.2 Core Target Markets
1. **Over 1.5 Goals (The Universal Safety Anchor)** — typical market odds: $1.20 - 1.35$ (Probability $\ge 82\%$)
2. **Draw No Bet (DNB / Asian Handicap 0) — The Draw Attrition Shield** — typical market odds: $1.30 - 1.65$ (Safety against regular-time draws)
3. **Double Chance (1X / X2) — Resilience Anchor** — typical market odds: $1.20 - 1.40$ (Combined Prob $\ge 80\%$)
4. **Dominant Match Winner (1X2)** — typical market odds: $1.35 - 1.85$ (Gated by $\Delta \text{Elo} \ge 250$ or Dominance Ratio $\ge 3.0$)
5. **Under 3.5 Goals — Knockout Fortress** — typical market odds: $1.30 - 1.55$ (High-stakes tactical knockouts)
6. **Both Teams to Score (BTTS Yes)** — typical market odds: $1.65 - 2.10$ (Restricted to closely matched competitive pairings)
7. **Over 2.5 Goals** — typical market odds: $1.60 - 2.20$ (Restricted to high-tempo group matches with proven offensive balance)

---

## 2. CORE PRINCIPLES

1. **Strict Model Decoupling**: Model 5.0 operates independently from Model 4.0. Tickets generated under Model 5.0 carry ticket prefix `S-X-v5.0` (or `A-X-v5.0` for shadow alternatives) and are recorded with `model_version: "5.0"` in the database.
2. **Bivariate Poisson Foundation**: All goal market and match outcome probabilities are mathematically computed via Poisson distributions from objective expected goals ($\lambda_A, \lambda_B$).
3. **Cross-Border Normalization over Raw Goal Rates**: Raw domestic goals from weak leagues are never compared directly against raw domestic goals from elite leagues. Domestic rates must be normalized using the Competition Strength Index (CSI).
4. **World Football Elo Ratings for National Teams**: National team expected goals are anchored by official World Football Elo ratings, not FIFA commercial ranking points.
5. **Neutral Venue Protocol**: Major tournament fixtures played at neutral venues receive zero venue bonus ($H_{\text{venue}} = 0$). Only genuine host nations playing in their home stadiums receive host advantage ($H_{\text{venue}} = +100$).
6. **Knockout Stage Regular-Time Discipline**: All betting markets settle strictly in regular time (90 minutes + stoppage time). Model 5.0 applies the Knockout Compression Factor ($K_s = 0.88$) to account for single-elimination risk aversion.
7. **No Arbitrary Probability Tweaks**: Qualitative warnings serve as an evidence layer and risk gating filter; they do not arbitrarily alter mathematical calculations without verified protocols.
8. **Permanent companion probability logging**: For every analysed tournament fixture, companion probabilities (`prob_over_1_5`, `prob_over_2_5`, `prob_btts_yes`, `prob_under_3_5`, `prob_home_win`, `prob_away_win`, `prob_draw`) and complete market evaluation matrices must be recorded.

---

## 3. TRACK A: CONTINENTAL CLUB TOURNAMENTS (UCL, UEL, CAF CL)

### 3.1 The Competition Strength Index (CSI)
To accurately model clubs from different domestic leagues meeting in continental competition, leagues are assigned a standardized **Competition Strength Index (CSI)** based on official 5-year country coefficients:

#### European Club Competitions (UEFA Champions League, Europa League, Conference League)
| League Tier | Competitions Included | CSI Multiplier |
| :--- | :--- | :--- |
| **Tier 1 (Elite)** | English Premier League, Spanish La Liga, Italian Serie A, German Bundesliga | **$1.00$** |
| **Tier 2 (High Tier)** | French Ligue 1, Portuguese Primeira Liga, Dutch Eredivisie | **$0.85$** |
| **Tier 3 (Upper Mid)** | Belgian Pro League, Turkish Süper Lig, Scottish Premiership, Czech First League | **$0.72$** |
| **Tier 4 (Lower Mid)** | Swiss Super League, Austrian Bundesliga, Greek Super League, Danish Superliga | **$0.60$** |
| **Tier 5 (Periphery)** | Croatian HNL, Serbian SuperLiga, Bulgarian First League, Romanian Liga I, etc. | **$0.50$** |

#### African Club Competitions (CAF Champions League, CAF Confederation Cup)
| League Tier | Competitions Included | CSI Multiplier |
| :--- | :--- | :--- |
| **Tier 1 (Elite)** | Egypt Premier League, Morocco Botola Pro, Algeria Ligue 1, South Africa PSL, Tunisia Ligue 1 | **$1.00$** |
| **Tier 2 (High Tier)** | DR Congo Linafoot, Tanzania Ligi Kuu Bara, Angola Girabola, Sudan Premier League | **$0.80$** |
| **Tier 3 (Emerging)** | Rest of African Domestic Leagues (Ghana, Nigeria, Kenya, Zambia, Cameroon, etc.) | **$0.65$** |

### 3.2 Domestic Scoring Normalization
Before calculating expected goals, a club's domestic statistics are normalized:

$$\text{GF}_{\text{norm}} = \text{GF}_{\text{domestic}} \times \text{CSI}_{\text{league}}$$

$$\text{GA}_{\text{norm}} = \text{GA}_{\text{domestic}} \times \left(2.0 - \text{CSI}_{\text{league}}\right)$$

*Interpretation*: A team scoring 2.80 goals/game in a Tier 5 league (CSI 0.50) has a normalized attack against Tier 1 opposition of $2.80 \times 0.50 = 1.40$ goals/game. A team conceding 0.60 goals/game in a Tier 5 league has a normalized concession rate of $0.60 \times 1.50 = 0.90$ goals/game.

### 3.3 Continental Campaign Form Blending
When clubs have played $\ge 2$ matches in the active continental tournament (e.g. Champions League group stage / league phase):

$$\lambda_{\text{home}} = 0.50 \times \lambda_{\text{domestic, norm}} + 0.50 \times \lambda_{\text{continental campaign}}$$

$$\lambda_{\text{away}} = 0.50 \times \lambda_{\text{domestic, norm}} + 0.50 \times \lambda_{\text{continental campaign}}$$

### 3.4 Continental Tournament Scoring Baselines ($\mu_{\text{tournament}}$)
- **UEFA Champions League**: $\mu_{\text{comp}} = 3.05$ (Home $\mu = 1.70$, Away $\mu = 1.35$)
- **UEFA Europa League**: $\mu_{\text{comp}} = 2.95$ (Home $\mu = 1.65$, Away $\mu = 1.30$)
- **CAF Champions League**: $\mu_{\text{comp}} = 2.15$ (Home $\mu = 1.35$, Away $\mu = 0.80$ — heavy home bias)

---

## 4. TRACK B: NATIONAL TEAM COMPETITIONS (AFCON, EURO, WORLD CUP, NATIONS LEAGUE)

### 4.1 World Football Elo Rating Sourcing
For all national team fixtures, team strength is anchored by official **World Football Elo Ratings** (retrieved from eloratings.net or current international Elo registries):

$$\Delta \text{Elo} = \text{Elo}_{\text{Team A}} - \text{Elo}_{\text{Team B}} + H_{\text{venue}}$$

### 4.2 Venue Advantage Calibration ($H_{\text{venue}}$)
- **$H_{\text{venue}} = 0$ (Neutral Ground)**: Applied to all tournament finals matches played in the host country when neither participant is the host nation (e.g., Senegal vs Egypt played in Morocco or Cameroon).
- **$H_{\text{venue}} = +100$ (True Host Ground)**: Applied when a national team plays inside their own country (e.g., Germany at Euro 2024, Côte d'Ivoire at AFCON 2023, France in Paris).
- **$H_{\text{venue}} = +40$ (Nominal Regional Host)**: Applied when a team plays in an immediately bordering territory with massive fan presence.

### 4.3 Expected Goal Margin Formula ($\Delta \lambda$)
Empirical regression across international competitive football demonstrates:

$$\Delta \lambda = \lambda_A - \lambda_B = \frac{\Delta \text{Elo}}{320}$$

### 4.4 Tournament Baseline Scoring Averages ($\mu_{\text{comp}}$)
- **FIFA World Cup & World Cup Qualifiers**: $\mu_{\text{comp}} = 2.50$
- **UEFA European Championship & Qualifiers / Nations League**: $\mu_{\text{comp}} = 2.40$
- **CAF Africa Cup of Nations (AFCON) & Qualifiers**: $\mu_{\text{comp}} = 2.05$
- **CONMEBOL Copa América & Qualifiers**: $\mu_{\text{comp}} = 2.25$

### 4.5 Team Expected Goal Allocation ($\lambda_A, \lambda_B$)
Team-specific Poisson expected goals are computed as:

$$\lambda_A = \max\left(0.20, \; \frac{\mu_{\text{comp}} \times K_s + \Delta \lambda}{2}\right)$$

$$\lambda_B = \max\left(0.20, \; \frac{\mu_{\text{comp}} \times K_s - \Delta \lambda}{2}\right)$$

### 4.6 The Competition Stage Factor ($K_s$)
- **Group Stage Matches & Multi-Round Qualifiers**: $K_s = 1.00$
- **Single-Leg Knockout Stage (Round of 16 through Final)**: $K_s = 0.88$ (**Knockout Compression Factor**)  
  *Rationale*: In single-elimination knockout matches, teams play conservatively in regular time (90 mins) to avoid catastrophic defensive errors, relying on extra time or penalties. The $0.88$ factor compresses expected goals to prevent overestimating goal markets.

---

## 5. STANDARDIZED GATED MARKETS & QUALIFICATION THRESHOLDS

Model 5.0 evaluates all standard markets but enforces specific gating tailored to tournament dynamics:

```
                            ┌───────────────────────────────────────────┐
                            │      Model 5.0 Gated Tournament Slate     │
                            └─────────────────────┬─────────────────────┘
                                                  │
                 ┌────────────────────────────────┼────────────────────────────────┐
                 ▼                                ▼                                ▼
   ┌───────────────────────────┐    ┌───────────────────────────┐    ┌───────────────────────────┐
   │    Safety Anchor (O1.5)   │    │  Draw Attrition Shield    │    │   Dominant Winner (1X2)   │
   │  Prob ≥ 82% | Odds 1.20+  │    │ (DNB / Double Chance 1X)  │    │  ΔElo ≥ 250 | Prob ≥ 72%  │
   │   Target: High-tempo favorites│    │   Mitigates 90-min draw   │    │   Disqualified in knockouts│
   └───────────────────────────┘    └───────────────────────────┘    └───────────────────────────┘
```

### 5.1 Market 1: Over 1.5 Goals (The Universal Safety Anchor)
- **Role**: Primary safety anchor for multi-leg tickets.
- **Target Odds**: $1.20 - 1.35$.
- **Qualifications**:
  - Model Estimated Probability: $\ge 82\%$.
  - Combined Expected Goals: $\lambda_{\text{total}} \ge 2.20$.
  - Valid in both Group Stages and Knockouts if favorite has an attacking $\lambda \ge 1.45$.

### 5.2 Market 2: Draw No Bet (DNB / Asian Handicap 0) — The Draw Attrition Shield
- **Role**: Value booster with complete regular-time draw protection.
- **Target Odds**: $1.30 - 1.65$.
- **Qualifications**:
  - Model Win Probability: $\ge 58\%$.
  - Model Draw Probability: $\ge 24\%$.
  - Expected Value (EV): $> +0.03$ (+3.0pp edge).
  - *Mechanism*: If the match finishes drawn at 90 minutes, the selection voids at odds 1.00, preserving ticket survival.

### 5.3 Market 3: Double Chance (1X / X2) — Resilience Anchor
- **Role**: Defensive anchor in tightly contested tournament fixtures.
- **Target Odds**: $1.20 - 1.40$.
- **Qualifications**:
  - Combined Probability $(P_{\text{win}} + P_{\text{draw}}): \ge 80\%$.
  - Target Team must not have suffered consecutive losses in active campaign.

### 5.4 Market 4: Dominant Match Winner (1X2)
- **Role**: High-odds leg for clear mismatches.
- **Target Odds**: $1.35 - 1.85$.
- **Qualifications**:
  - For National Teams: $\Delta \text{Elo} \ge 250$ points.
  - For Continental Clubs: Dominance Ratio $\ge 3.0$ with domestic CSI parity.
  - Model Win Probability: $\ge 72\%$.
  - **Knockout Stage Hard-Stop**: Match Winner 1X2 is **strictly forbidden in single-leg knockouts** between evenly matched teams ($|\Delta \text{Elo}| < 150$). Use DNB or Double Chance instead.

### 5.5 Market 5: Under 3.5 Goals — Knockout Fortress
- **Role**: Protective shield for defensive tournament clashes.
- **Target Odds**: $1.30 - 1.55$.
- **Qualifications**:
  - Competition: Single-Leg Knockout Stage or Low-Scoring Tournament (AFCON).
  - Combined Expected Goals: $\lambda_{\text{total}} \le 2.25$.
  - Model Under 3.5 Probability: $\ge 78\%$.
  - Both teams must exhibit solid defensive organization (normalized $\text{GA} \le 1.10$).

### 5.6 Market 6: Restricted Both Teams to Score (BTTS Yes)
- **Role**: High-yield market for proven open clashes.
- **Target Odds**: $1.65 - 2.10$.
- **Qualifications**:
  - Dual Contribution Index: $\text{DCI} \ge 0.55$.
  - National Teams: Must rank within $80$ Elo points of each other.
  - Both teams must have scored in at least $75\%$ of their last 6 competitive international matches.
  - *Warning*: Strictly disqualified in heavy mismatches ($\Delta \text{Elo} \ge 200$) due to high clean-sheet shutout frequency (e.g. 3-0, 4-0).

---

## 6. STANDARDIZED TOURNAMENT WARNINGS & RISK FLAGS

Model 5.0 introduces standardized tournament-specific risk warnings:

| Warning Type | Severity | Description | Pre-Match Action |
| :--- | :--- | :--- | :--- |
| `NEUTRAL_VENUE_DYNAMIC` | Moderate / Informational | Fixture is played at a neutral tournament ground; zero home advantage applied. | Confirms $H_{\text{venue}} = 0$. Disables home-crowd boost. |
| `TOURNAMENT_KNOCKOUT_AGGREGATE_DISTORTION` | High | In a 2-legged tie, the first leg result dictates an extreme game state in Leg 2 (e.g., trailing team must attack recklessly). | Disqualifies Under markets if trailing team is down $\ge 2$ goals. |
| `GROUP_STAGE_DEAD_RUBBER` | Critical | A team has already mathematically qualified or secured top spot; high risk of squad rotation. | Halts 1X2 bets on favorite; flags `RESTED_SQUAD_RESTRICTION`. |
| `TACTICAL_LOW_BLOCK_KNOCKOUT` | Moderate | Single-leg knockout match where both nations prioritize defensive structure in 90 mins. | Promotes Under 3.5 and DNB; disqualifies Over 2.5. |
| `HIGH_DRAW_PROPENSITY` | High | Computed regular-time draw probability exceeds $30.0\%$. | Disqualifies straight 1X2; redirects to DNB or Double Chance. |
| `NATIONAL_TEAM_ROSTER_DISRUPTION` | Critical | Top goalscorer or central defensive anchor is unavailable for international call-up. | Triggers manual probability discount or disqualifies pick. |

---

## 7. UNIVERSAL JSON TICKET & ALTERNATIVE CONTRACT

All tickets, selections, and shadow alternative candidates generated under Model 5.0 must adhere to this standardized JSON format:

```json
{
  "ticket": {
    "ticket_number": "S-1-v5.0",
    "date": "2026-11-15",
    "model_version": "5.0",
    "model_uuid": "f1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d",
    "model_name": "roys_tournament_international_engine",
    "stake": 2500,
    "combined_odds": 2.25,
    "estimated_ticket_probability": 0.620,
    "status": "pending",
    "actual_result": null,
    "profit_loss": 0,
    "notes": "Two-leg tournament accumulator constructed under Model 5.0 (roys_tournament_international_engine) and selection_process_tournament.md."
  },
  "selections": [
    {
      "match_date": "2026-11-15",
      "country": "International",
      "league": "UEFA Nations League",
      "home_team": "Team A",
      "away_team": "Team B",
      "market": "Draw No Bet",
      "selection": "Team A DNB",
      "odds": 1.45,
      "estimated_probability": 0.740,
      "breakeven_probability": 0.690,
      "edge_percentage_points": 5.0,
      "expected_value": 0.073,
      "prob_over_1_5": 0.820,
      "prob_over_2_5": 0.540,
      "prob_btts_yes": 0.460,
      "prob_under_3_5": 0.810,
      "prob_home_win": 0.580,
      "prob_away_win": 0.160,
      "prob_draw": 0.260,
      "actual_home_score": null,
      "actual_away_score": null,
      "result": "pending",
      "notes": "World Elo gap +180; neutral venue; Draw No Bet shields against 90-min draw attrition."
    }
  ],
  "alternatives": []
}
```

---

## 8. MODEL GOVERNANCE & RETIREMENT

- Model 5.0 operates in parallel with Model 4.0.
- When domestic leagues resume, slates are analyzed under Model 4.0.
- When continental mid-week ties or international breaks occur, slates are analyzed under Model 5.0.
- The bettor evaluates comparative performance at `/admin/betting/tickets` and `/admin/betting/statistics` to ensure both models sustain long-term positive expected value.

