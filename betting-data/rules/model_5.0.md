# BETTING MODEL VERSION 5.1 — TOURNAMENT & INTERNATIONAL ENGINE (CONTINENTAL CLUBS, DOMESTIC CUPS & NATIONAL TEAMS)

## MODEL NAME

`roys_tournament_international_engine`

## MODEL METADATA

- **Model Version**: `5.1`
- **Model UUID**: `f1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d`
- **Engine Purpose**: Specialized probability, bivariate Poisson, World Football Elo, and Knockout Progression evaluation engine for Continental Club Competitions, Domestic Cup Knockout Ties, and National Team Tournaments.
- **Independence Guarantee**: Strictly coexists alongside Model 4.0 (`roys_betting_engine_BTS_O2-5_win`) without modifying, overriding, or replacing domestic league calculations.

---

## 1. OBJECTIVE & EXECUTIVE PHILOSOPHY

### 1.1 The Operational Mandate
During international FIFA breaks, international tournament finals (AFCON, UEFA Euro, Copa América, FIFA World Cup), and continental/domestic cup competition matchdays (UEFA Champions League, Europa League, CAF Champions League, Copa del Rey, FA Cup, Coupe de France), standard domestic league betting halts. 

Model 4.0 explicitly halts calculations for these fixtures under Section 3 and Section 5.0 because it requires domestic venue statistics ($MP_{\text{venue}} \ge 5$) and shared domestic league baselines.

**Model 5.1 solves this operational void by providing a mathematically sound, cross-border and knockout-aware predictive framework:**
1. **Continental & Domestic Cup Competitions (Track A)**: Replaces naive domestic goal rates with normalized scoring metrics weighted by the **Competition Strength Index (CSI)** and explicitly models tournament progression via the **`To Qualify`** pricing engine.
2. **National Team Competitions (Track B)**: Derives expected goal margins directly from the **World Football Elo Rating system** and tournament-specific baseline scoring averages.
3. **Tournament Risk Gating & Rotation Discipline**: Protects capital against tournament-specific risks: regular-time draw attrition in single-elimination ties, squad rotation by elite clubs in early cup rounds, dead-rubber group matches, and neutral venue distortions.

### 1.2 Core Target Markets
1. **Over 1.5 Goals (The Universal Safety Anchor)** — typical market odds: $1.20 - 1.35$ (Probability $\ge 82\%$, Minimum Edge Floor $\ge +3.0\text{pp}$)
2. **To Qualify (The Knockout Survival Shield)** — typical market odds: $1.20 - 1.45$ (Covers 90m wins, extra time, and penalty shootouts for dominant favorites)
3. **Draw No Bet (DNB / Asian Handicap 0) — The Draw Attrition Shield** — typical market odds: $1.30 - 1.65$ (Safety against regular-time draws)
4. **Double Chance (1X / X2) — Resilience Anchor** — typical market odds: $1.20 - 1.40$ (Combined Prob $\ge 80\%$)
5. **Dominant Match Winner (1X2)** — typical market odds: $1.35 - 1.85$ (Gated by $\Delta \text{Elo} \ge 250$ or Dominance Ratio $\ge 3.0$; strictly gated against rotated away favorites)
6. **Under 3.5 Goals — Knockout Fortress** — typical market odds: $1.30 - 1.55$ (High-stakes tactical knockouts)
7. **Both Teams to Score (BTTS Yes)** — typical market odds: $1.65 - 2.10$ (Restricted to closely matched competitive pairings)
8. **Over 2.5 Goals** — typical market odds: $1.30 - 2.20$ (Restricted to high-tempo group/league-phase matches with proven offensive balance; Edge $\ge +3.0\text{pp}$ when priced $\le 1.35$)

---

## 2. CORE PRINCIPLES

1. **Strict Model Decoupling**: Model 5.1 operates independently from Model 4.0. Tickets generated under Model 5.1 carry ticket prefix `S-X-v5.1` (or `A-X-v5.1` for shadow alternatives) and are recorded with `model_version: "5.1"` in the database.
2. **Bivariate Poisson & Progression Foundation**: All 90-minute goal market and match outcome probabilities are mathematically computed via Poisson distributions from objective expected goals ($\lambda_A, \lambda_B$), and tournament progression is determined via the calibrated Extra-Time/Penalties sub-model.
3. **Cross-Border & Cross-Tier Normalization**: Raw domestic goals from weak leagues or lower tiers are never compared directly against raw domestic goals from elite leagues. Domestic rates must be normalized using the Competition Strength Index (CSI).
4. **World Football Elo Ratings for National Teams**: National team expected goals are anchored by official World Football Elo ratings, not FIFA commercial ranking points.
5. **Neutral Venue Protocol**: Major tournament fixtures played at neutral venues receive zero venue bonus ($H_{\text{venue}} = 0$). Only genuine host nations playing in their home stadiums receive host advantage ($H_{\text{venue}} = +100$).
6. **Knockout Stage Regular-Time Discipline**: All standard match markets settle strictly in regular time (90 minutes + stoppage time). Model 5.1 applies the Knockout Compression Factor ($K_s = 0.88$) to account for single-elimination risk aversion.
7. **Rotation Haircut Protocol**: When an elite club rotates $\ge 4$ starting players in an away cup match, `SQUAD_ROTATION_MONITORING` acts as a `DIRECT` penalty, transferring win probability to draw and home win.
8. **Anti-Odds-Chasing & Same-Match Safety Invariant**: Never downgrade a selection from a high-probability, positive-EV market (e.g. Over 1.5, Over 2.5, or To Qualify) to a lower-probability tri-state market (`1X2` straight win) merely to hit an arbitrary 2-leg ticket odds floor. Whenever a +EV Goal Market on the same match exceeds `P(1X2)` by $\ge 5.0\text{pp}$, the Goal Market strictly takes priority.
9. **Permanent Companion & Matrix Tracking**: For every analysed tournament fixture, companion probabilities and complete market evaluation matrices (`market_evaluations`) must be populated.

---

## 3. TRACK A: CONTINENTAL CLUB TOURNAMENTS & DOMESTIC CUP KNOCKOUTS

### 3.1 The Competition Strength Index (CSI)
To accurately model clubs from different domestic leagues or divisional tiers meeting in continental competition and domestic cup knockout ties, competitions are assigned a standardized **Competition Strength Index (CSI)** based on official country coefficients and domestic league pyramids:

#### European Club Competitions & Domestic Pyramids
| League Tier | Competitions & Divisions Included | CSI Multiplier | Domestic Baseline ($\mu_{\text{home}} / \mu_{\text{away}}$) |
| :--- | :--- | :---: | :---: |
| **Tier 1 (Elite Top-Flight)** | English Premier League, Spanish La Liga, Italian Serie A, German Bundesliga | **$1.00$** | $1.45$ / $1.10$ |
| **Tier 2 (High Tier / 2nd Div)** | French Ligue 1, Portuguese Primeira Liga, Dutch Eredivisie, Spanish Segunda División, English Championship | **$0.85$** | $1.35$ / $1.00$ |
| **Tier 3 (Upper Mid / 3rd Tier)** | Belgian Pro League, Turkish Süper Lig, Scottish Prem, Spanish Primera Federación (RFEF) | **$0.72$** | $1.30$ / $1.05$ |
| **Tier 4 (Lower Mid / 4th Tier)** | Swiss Super League, Austrian Bundesliga, Spanish Segunda Federación (RFEF) | **$0.60$** | $1.25$ / $0.95$ |
| **Tier 5 (Periphery / 5th Tier)** | Croatian HNL, Serbian SuperLiga, Spanish Tercera Federación (RFEF), Regional Divisions | **$0.50$** | $1.20$ / $0.90$ |

#### African Club Competitions (CAF Champions League, CAF Confederation Cup)
| League Tier | Competitions Included | CSI Multiplier |
| :--- | :--- | :--- |
| **Tier 1 (Elite)** | Egypt Premier League, Morocco Botola Pro, Algeria Ligue 1, South Africa PSL, Tunisia Ligue 1 | **$1.00$** |
| **Tier 2 (High Tier)** | DR Congo Linafoot, Tanzania Ligi Kuu Bara, Angola Girabola, Sudan Premier League | **$0.80$** |
| **Tier 3 (Emerging)** | Rest of African Domestic Leagues (Ghana, Nigeria, Kenya, Zambia, Cameroon, etc.) | **$0.65$** |

### 3.2 Domestic Scoring Normalization & Small-Sample Shrinkage
Before calculating expected goals, a club's domestic statistics are normalized:

$$\text{GF}_{\text{norm}} = \text{GF}_{\text{domestic, shrunk}} \times \text{CSI}_{\text{league}}$$

$$\text{GA}_{\text{norm}} = \text{GA}_{\text{domestic, shrunk}} \times \left(2.0 - \text{CSI}_{\text{league}}\right)$$

#### Sample-Size Shrinkage Protocol ($n < 12$)
In domestic cup ties where lower-tier clubs have only played a small sample of matches ($n < 12$), small-sample variance (e.g. one 4–1 blowout) can artificially distort observed goal rates. The engine applies Bayesian shrinkage toward the division average:

$$w = \frac{n}{n + 6}$$

$$\text{GF}_{\text{domestic, shrunk}} = w \times \text{GF}_{\text{observed}} + (1 - w) \times \mu_{\text{division, GF}}$$

$$\text{GA}_{\text{domestic, shrunk}} = w \times \text{GA}_{\text{observed}} + (1 - w) \times \mu_{\text{division, GA}}$$

### 3.3 Continental Campaign Form Blending
When clubs have played $\ge 2$ matches in the active continental tournament (e.g. Champions League group stage / league phase):

$$\lambda_{\text{home}} = 0.50 \times \lambda_{\text{domestic, norm}} + 0.50 \times \lambda_{\text{continental campaign}}$$

$$\lambda_{\text{away}} = 0.50 \times \lambda_{\text{domestic, norm}} + 0.50 \times \lambda_{\text{continental campaign}}$$

### 3.4 Continental Tournament Scoring Baselines ($\mu_{\text{tournament}}$)
- **UEFA Champions League**: $\mu_{\text{comp}} = 3.05$ (Home $\mu = 1.70$, Away $\mu = 1.35$)
- **UEFA Europa League**: $\mu_{\text{comp}} = 2.95$ (Home $\mu = 1.65$, Away $\mu = 1.30$)
- **CAF Champions League**: $\mu_{\text{comp}} = 2.15$ (Home $\mu = 1.35$, Away $\mu = 0.80$ — heavy home bias)

### 3.5 Tie-Format Metadata & Representation
Knockout ties must be explicitly typed in data ingestion and selection objects to prevent conflating single-leg elimination dynamics with multi-leg aggregate strategies:

```json
{
  "tie_format": "single_leg_knockout | two_leg_first | two_leg_second",
  "first_leg_margin_for_target": 0,
  "has_extra_time": true,
  "away_goals_rule": false
}
```

### 3.6 Mathematical Pricing Engine for $P(\text{To Qualify})$
`To Qualify` probabilities must never be estimated qualitatively. They are mathematically derived from calibrated regular-time 90-minute outcome probabilities ($P(\text{Win}_{90})$, $P(\text{Draw}_{90})$, $P(\text{Lose}_{90})$) and the calibrated Extra-Time/Penalties sub-model $P(\text{Win}_{\text{ET+Pens}})$:

#### 1. Single-Leg Knockout OR Tied 2nd Leg ($\text{first\_leg\_margin} = 0$):
$$P(\text{Qualify}) = P(\text{Win}_{90}) + P(\text{Draw}_{90}) \times P(\text{Win}_{\text{ET+Pens}})$$

#### 2. 2nd Leg — Target Team Leading by 1 Goal ($\text{first\_leg\_margin} = +1$):
$$P(\text{Qualify}) = P(\text{Win}_{90}) + P(\text{Draw}_{90}) + P(\text{Lose by 1}_{90}) \times P(\text{Win}_{\text{ET+Pens}})$$
*(Key Tactical Principle: In this state, `To Qualify` strictly dominates `1X2 Win`, because the leading team has zero tactical incentive to chase a 90-minute win when a 0–0 or 1–1 draw guarantees qualification.)*

#### 3. 2nd Leg — Target Team Trailing by 1 Goal ($\text{first\_leg\_margin} = -1$):
$$P(\text{Qualify}) = P(\text{Win by 2+}_{90}) + P(\text{Win by 1}_{90}) \times P(\text{Win}_{\text{ET+Pens}})$$
> [!WARNING]
> **Trailing-Team Trap**: Avoid `To Qualify` on a team trailing from Leg 1 unless bookmaker odds severely misprice it. If they win Leg 2 by `1–0`, a `1X2` win bet cashes immediately while `To Qualify` remains exposed to 30 minutes of extra-time attrition and coin-flip penalties.

#### 4. Extra-Time + Penalties Sub-Model ($P(\text{Win}_{\text{ET+Pens}})$)
Penalty shootouts heavily compress skill differentials. In extra time, fitness and substitution quality create an edge, but penalties remain high-entropy. The sub-model enforces strict probability caps:
- **Evenly matched ($|\Delta \text{Elo}| < 100$ or CSI parity)**: $0.50 - 0.54$ (slight home/bench edge)
- **Moderate favorite ($100 \le |\Delta \text{Elo}| < 250$ or 1-tier gap)**: $0.56 - 0.63$
- **Heavy tier mismatch ($|\Delta \text{Elo}| \ge 250$ or $\ge 2$-tier gap, e.g. Tier 1 vs Tier 4)**: $0.66 - 0.72$  
  *(Superior fitness and starter substitutions in 30 minutes of extra time drive the advantage; $P(\text{Win}_{\text{ET+Pens}})$ is hard-capped at $0.72$ due to penalty lottery variance.)*

#### 5. Bookmaker Vig (Margin) Guardrail for `To Qualify`
`To Qualify` markets frequently carry elevated bookmaker overrounds ($6\% - 10\%$). Before admitting any `To Qualify` selection:
$$\text{vig} = \left(\frac{1}{\text{odds}_A} + \frac{1}{\text{odds}_B}\right) - 1$$
**Hard Reject Rule**: If $\text{vig} > 0.075$ ($7.5\%$), the selection is disqualified from main tickets unless the calibrated model edge strictly exceeds $+5.0\text{pp}$.

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

### 4.7 National Team Statistical Ingestion Protocol (Uniform Data Mapping)
In the absence of closed domestic league tables, national team matches must map the following standard parameters into the database and JSON schema to ensure rich, uniform statistical snapshots for UI previews, modal drawers, and automated post-match calibration:
1. **`home_league_position` / `away_league_position`**: Formally mapped to the team's official **World Football Elo Global Ranking** (e.g. England `#3`, Croatia `#11`, Cameroon `#58`, Namibia `#135`).
2. **`home_matches_played` / `away_matches_played`**: Number of matches played in the **active competition / qualifying campaign window** (e.g. current Nations League or AFCON qualifying campaign).
3. **`home_goals_scored` / `home_goals_conceded` & `away_goals_scored` / `away_goals_conceded`**: Goals scored and conceded during the active campaign.
4. **`home_goals_per_game` & `home_conceded_per_game`**: Active campaign venue rates ($GF / MP, GA / MP$).
5. **`home_overall_matches_played` / `away_overall_matches_played`**: The nation's **calendar-year / past 10 competitive international matches** (capturing full-strength roster performance).
6. **`current_league_home_avg` / `current_league_away_avg`**: Official competition baseline scoring averages ($\mu_{\text{home}}, \mu_{\text{away}}$).
7. **`elo_home` / `elo_away`**: Exact World Football Elo ratings at kickoff.

### 4.8 Regional Goal Baseline Calibration (The AFCON Protocol)
In low-scoring continental tournaments (such as the Africa Cup of Nations and its qualifiers where continental average goals are structurally $\mu \approx 2.05$), raw bivariate Poisson math mathematically deflates Over 1.5 probabilities down into the $60\% - 68\%$ range.
- **The Empirical Reality**: Elite African home powerhouses (e.g. Cameroon in Yaoundé, DR Congo in Kinshasa, Cote d'Ivoire in Abidjan, Senegal in Diamniadio) win by 2+ goals in $78\% - 85\%$ of home qualifiers.
- **The Calibration Anchor**: When modeling home favorites in competitions with $\mu \le 2.10$, the engine blends the raw Elo Poisson probability with the host nation's 10-match home qualifying goal output when $GF_{\text{home}} \ge 1.70$:
  $$P(\text{Over } 1.5)_{\text{eff}} = 0.50 \times P_{\text{Poisson}} + 0.50 \times \text{HitRate}_{10\text{-match home}}$$
This prevents false-negative disqualification of genuine home fortress fixtures while preserving mathematical rigor.

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
  - **Minimum Edge Floor for Low-Odds Anchors ($\le 1.35$)**:
    - Any Over 1.5 selection with odds $\le 1.35$ **MUST carry an individual value edge of strictly $\ge +3.0\text{pp}$** ($\text{Edge}_{\text{pp}} \ge 3.0$).
    - *Rationale*: A paper-thin edge (e.g. $+1.0\text{pp}$ to $+2.0\text{pp}$) on small samples ($n \le 10$) is indistinguishable from estimation noise and bookmaker vig drag. Matches with edge $< +3.0\text{pp}$ are strictly disqualified from serving as primary anchors.
  - **The Dual-Threat Standard (Roy's Balanced Scoring Gate)**:
    - **Both participating teams should average $\ge 1.00\text{ GF/G}$** ($\text{GF}^* \ge 1.00$) at venue to qualify as a natural dual-threat pair.
    - If **Team A** averages $< 1.00\text{ GF/G}$ (or has been held scoreless in $\ge 40\%$ of recent matches), **Team B (the opposing favorite) MUST average strictly $\ge 2.00\text{ GF/G}$ alone** against an opponent conceding $\ge 1.50\text{ GA}^*$ to cover for Team A's scoring deficit (**The Solo-Overpower Exception**).
  - **The Shutout Resistance Gate (`ONE_SIDED_SCORING_RISK`)**:
    - **Hard Disqualification Condition**: If Team A does not score up to $1.00\text{ GF/G}$ AND Team B does not score up to $2.00\text{ GF/G}$ alone (e.g. Favorite averages $1.70 - 1.95\text{ GF/G}$, such as Benin $1.80$ away vs CAR $0.80$ home), `ONE_SIDED_SCORING_RISK` triggers **mandatory disqualification** from Over 1.5 on main tickets.
    - *Crucial Tactical Principle*: Leaky opposition defense ($\text{GA} \ge 2.00$) cannot substitute for the favorite's lack of a $\ge 2.00\text{ GF/G}$ solo rate. When the underdog is blanked, a sub-2.00 favorite will often score once, shut down the tempo, and freeze the game at 0–1.
    - *Actionable Routing*: Disqualified fixtures must be re-routed to **Draw No Bet (DNB)**, **Double Chance (1X/X2)**, or **To Qualify**.
  - Valid in both Group Stages and Knockouts if favorite has an attacking $\lambda \ge 1.45$.

### 5.2 Market 2: Draw No Bet (DNB / Asian Handicap 0) — The Draw Attrition Shield
- **Role**: Value booster with complete regular-time draw protection.
- **Target Odds**: $1.30 - 1.65$.
- **Qualifications**:
  - Model Win Probability: $\ge 58\%$.
  - Model Draw Probability: $\ge 24\%$.
  - Expected Value (EV): $> +0.03$ (+3.0pp edge).
  - *Mechanism*: If the match finishes drawn at 90 minutes, the selection voids at odds 1.00, preserving ticket survival.
  - **The Elite Away DNB Restriction**: Draw No Bet is **strictly prohibited on an away favorite** if the home nation ranks in the Global World Football Elo Top 25 or holds $P(\text{Home Win}) \ge 25.0\%$. DNB provides zero capital protection against a home defeat (it only voids on a draw). In such elite fixtures, the model must pivot to **Double Chance (X2)** or relegate the match to shadow tracking (`ELITE_AWAY_DNB_HAZARD`).

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
  - **Knockout Stage Hard-Stop**: Match Winner 1X2 is **strictly forbidden in single-leg knockouts** between evenly matched teams ($|\Delta \text{Elo}| < 150$). Use DNB, Double Chance, or To Qualify instead.
  - **Rotated Away Favorite Hard-Stop**: In single-leg domestic cup ties, straight 1X2 Away Win bets are **STRICTLY PROHIBITED** if the visiting favorite rotates $\ge 4$ regular starters (`SQUAD_ROTATION_MONITORING`). The selection must be rerouted to **To Qualify**, **Double Chance (X2)**, or **Over 1.5 Goals**.
  - **Shootout Underdog Hard-Stop (`HIGH_SCORING_UNDERDOG_DRAW_TRAP`)**: Straight `1X2 Home Win` is **STRICTLY DISQUALIFIED** if the visiting underdog averages $\ge 1.75\text{ GF/G}$ in the active tournament AND the home favorite concedes $\ge 1.00\text{ GA/G}$ in the active tournament (e.g. PSG vs AS Roma $2\text{--}2$). Reroute to **Over 2.5 Goals** (if Dual-Scoring Floor clears) or **Draw No Bet (DNB)**.
  - **Same-Match Market Safety Hierarchy (`SAME_MATCH_SAFETY_HIERARCHY`)**: If a positive-EV Goal Market (`Over 1.5` or `Over 2.5`, Edge $\ge +3.0\text{pp}$, odds $\ge 1.22$) on the same fixture exceeds `P(1X2)` by $\ge 5.0\text{pp}$, the Goal Market strictly overrides straight `1X2` for active capital (invoking the flexible $1.75 - 1.99$ combined odds floor when required).

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

### 5.7 Market 7: Over 2.5 Goals in Tournaments
- **Role**: High-yield or shootout-override selection for proven open group/league-phase matches and high-tempo continental clashes.
- **Target Odds**: $1.30 - 2.20$ (when priced $\le 1.35$, must strictly clear the $\ge +3.0\text{pp}$ Minimum Edge Floor).
- **Qualifications**:
  - Combined Expected Goals: $\lambda_{\text{total}} \ge 2.70$.
  - Dual Contribution Index: $\text{DCI} \ge 0.45$.
  - **Roy's Dual-Scoring Floor (`NO_SUB_1_SCORING_ON_O2_5`)**:
    - **Both participating teams must have normalized scoring rates $\text{GF}^* \ge 1.10$** and expected goals $\min(\lambda_A, \lambda_B) \ge 1.00$.
  - **The "Downgrade, Don't Discard" Rule (`ONE_SIDED_GOAL_BURDEN`)**:
    - If either club/nation averages $< 1.00\text{ GF}^*$ (or $\lambda < 1.00$), Over 2.5 is **strictly disqualified from main tickets** (triggering `ONE_SIDED_GOAL_BURDEN`).
    - *Required Action*: **Do not discard the fixture**. Automatically downgrade the selection to **Over 1.5 Goals** (if solo overpower criteria are met) or route to **Draw No Bet (DNB)**.
  - **The Elite Mismatch Exception**:
    - If an underdog scores $< 1.00\text{ GF}^*$, Over 2.5 is permitted *only* if the heavy favorite averages $\ge 2.50\text{ GF}^*$ alone and the underdog concedes $\ge 2.00\text{ GA}^*$ (e.g. Germany or Spain dismantling a minnow 4-0).

### 5.8 Market 8: To Qualify (The Knockout Survival Shield)
- **Role**: Primary progression anchor in single-leg knockouts and 2nd-leg cup ties where heavy favorites face regular-time draw attrition.
- **Target Odds**: $1.20 - 1.45$.
- **Qualifications**:
  - Model Calibrated Probability: $P(\text{To Qualify}) \ge 78.0\%$.
  - Minimum Value Edge: $\ge +3.0\text{pp}$ over break-even probability.
  - Bookmaker Overround Guardrail: Two-way $\text{vig} \le 0.075$ ($7.5\%$).
  - Target Team must possess superior fitness and bench depth ($|\Delta \text{Elo}| \ge 150$ or $\ge 1$-tier CSI gap).
  - *Mechanism*: Cashes regardless of whether the target team wins in 90 minutes, extra time (30 mins), or penalty shootouts, insulating against 0–0 and 1–1 regular-time stalemates.

---

## 6. STANDARDIZED TOURNAMENT WARNINGS & RISK FLAGS

Model 5.1 introduces standardized tournament-specific risk warnings:

| Warning Type | Severity | Description | Pre-Match Action |
| :--- | :--- | :--- | :--- |
| `NEUTRAL_VENUE_DYNAMIC` | Moderate / Informational | Fixture is played at a neutral tournament ground; zero home advantage applied. | Confirms $H_{\text{venue}} = 0$. Disables home-crowd boost. |
| `TOURNAMENT_KNOCKOUT_AGGREGATE_DISTORTION` | High | In a 2-legged tie, the first leg result dictates an extreme game state in Leg 2 (e.g., trailing team must attack recklessly). | Disqualifies Under markets if trailing team is down $\ge 2$ goals. |
| `GROUP_STAGE_DEAD_RUBBER` | Critical | A team has already mathematically qualified or secured top spot; high risk of squad rotation. | Halts 1X2 bets on favorite; flags `RESTED_SQUAD_RESTRICTION`. |
| `TACTICAL_LOW_BLOCK_KNOCKOUT` | Moderate | Single-leg knockout match where both nations prioritize defensive structure in 90 mins. | Promotes Under 3.5, DNB, and To Qualify; disqualifies Over 2.5. |
| `HIGH_DRAW_PROPENSITY` | High | Computed regular-time draw probability exceeds $30.0\%$. | Disqualifies straight 1X2; redirects to DNB, Double Chance, or To Qualify. |
| `NATIONAL_TEAM_ROSTER_DISRUPTION` | Critical | Top goalscorer or central defensive anchor is unavailable for international call-up. | Triggers manual probability discount or disqualifies pick. |
| `EXTERNAL_ODDS_INVERSION_WARNING` | Critical | Bookmaker pricing directly contradicts net Elo advantage by $\ge +120$ points (e.g. higher-rated home team priced as underdog). | Strictly halts and disqualifies fixture from active capital. |
| `UNQUOTED_ANCHOR_DISQUALIFICATION` | Critical | Heavy favorite ($\le 1.12$) where Over 1.5 is unquoted. | Prohibits forced trade-up to Over 2.5 when DCI $< 0.35$. Disqualifies match. |
| `LOW_BASELINE_AFCON` | Moderate | Continental competition baseline is $\mu \le 2.10$ goals per game. | Activates Home Fortress Form Anchor when host GF $\ge 1.70$. |
| `UNDERDOG_DEFENSIVE_BLOCK` | Moderate | Away underdog deploys an ultra-defensive low block (rarely attacks). | Disqualifies BTTS Yes; evaluates single-team goal lines. |
| `ODDS_CORRIDOR_COMPRESSION` | Low / Informational | Selection odds fall below standalone viability floor ($< 1.22$). | Disqualifies from 2-leg main ticket; relegates to shadow tracking. |
| `ELITE_AWAY_DNB_HAZARD` | High | Away favorite backed on DNB against a Top-25 Elo host ($P(\text{Home Win}) \ge 25\%$). | Disqualifies away DNB; pivots to Double Chance X2 or shadow relegation. |
| `H2H_UNDER_1_5_TRAP` | Critical | $\ge 50\%$ of past 3–5 competitive H2H meetings produced $\le 1$ goal (e.g. 0-0, 1-0). | Strictly bars fixture from Over 1.5 or Over 2.5 main ticket anchors; relegates to alternatives. |
| `RECENT_SCORING_DROUGHT` | High | National team or club failed to score in 3 of their last 5 competitive matches. | Strictly disqualifies Over 2.5 and BTTS Yes from main tickets. |
| `EARLY_SEASON_BLANK_RISK` | High | In small samples ($N \le 4$), either team was held scoreless in $\ge 50\%$ of games. | Disqualifies Over 2.5 and BTTS Yes; restricts Over 1.5 unless opposing favorite averages $\ge 2.20$ alone. |
| `LINEUP_SPINE_COMPROMISED` | Critical | Confirmed absence of top goalscorer ($\ge 35\%$ team goals) or starting goalkeeper/defensive anchor. | Strictly disqualifies 1X2 Match Winner and Over 2.5; backup GK disqualifies Under 3.5. |
| `ONE_SIDED_GOAL_BURDEN` | High | Either club/nation averages $< 1.00\text{ GF}^*$ (or $\lambda < 1.00$), forcing an asymmetric 3-goal solo burden for Over 2.5. | Strictly bars Over 2.5; mandates automatic downgrade to Over 1.5 Goals. |
| `ONE_SIDED_SCORING_RISK` | High | Team A averages $< 1.00\text{ GF}^*$ AND Team B (favorite) averages $< 2.00\text{ GF}^*$ alone (e.g. favorite is $1.70 - 1.95$). Opponent concession cannot compensate for lack of solo firepower. | Strictly bars Over 1.5 from main tickets; routes to DNB, Double Chance, or To Qualify. |
| `REVERSE_FIXTURE_CAUTION` | High | Teams meet for the 2nd time within 5 days after a blowout ($\ge 3$ goal margin). The losing side shifts to an emergency deep low block while the winner manages clock, causing severe low-scoring mean-reversion. | Strictly disqualifies Over 1.5 and Over 2.5; routes to Draw No Bet (DNB) or Double Chance (1X/X2). |
| `SQUAD_ROTATION_MONITORING` | Critical / High | Away cup favorite rotates $\ge 4$ regular starters in early knockout round. Market Relevance: **DIRECT** for 1X2, Asian Handicap, Team Totals. | **Mandatory Probability Haircut**: Deduct $-5.0\text{pp}$ to $-8.0\text{pp}$ from $P(\text{Away Win}_{90})$, transferring $+4.0\text{pp}$ to $+6.0\text{pp}$ to Draw and $+1.0\text{pp}$ to $+2.0\text{pp}$ to Home Win. Prohibits straight 1X2 away win; reroutes to `To Qualify`, `Double Chance (X2)`, or `Over 1.5`. |
| `KNOCKOUT_CAGEYNESS_RISK` | High | Single-elimination domestic cup tie meeting both: (1) regional/derby rivalry status, AND (2) competitive parity ($|\Delta \text{Elo}| \le 100$). Market Relevance: **DIRECT**. | Strictly bars Over 1.5 and Over 2.5 on main tickets. Prohibits `REGIONAL_CUP_MOMENTUM` from acting as a supportive override. Routes to `Under 3.5` or `Double Chance`. |
| `LOW_ODDS_EDGE_NOISE` | High | Selection odds $\le 1.35$ carry an estimated value edge $< +3.0\text{pp}$ on samples $n < 12$. | Strictly disqualifies pick from main tickets as statistical noise. Requires minimum $+3.0\text{pp}$ edge floor. |
| `QUALITATIVE_OVERRIDE_CAP` | Moderate / Guardrail | Narrative-only downward probability adjustment is applied without confirmed spine absences. | Caps qualitative-only downward haircuts to at most $-4.0\text{pp}$ from mathematical Poisson/Elo expectation. |
| `HIGH_SCORING_UNDERDOG_DRAW_TRAP` | High | Visiting underdog averages $\ge 1.75\text{ GF/G}$ in-tournament AND home favorite concedes $\ge 1.00\text{ GA/G}$ in-tournament. Market Relevance: **DIRECT** for 1X2. | Strictly disqualifies straight `1X2 Home Win` despite Elo/DR dominance; reroutes to `Over 2.5 Goals` or `Draw No Bet (DNB)`. |
| `SAME_MATCH_SAFETY_HIERARCHY` | Moderate / Guardrail | A positive-EV Goal Market (`Over 1.5` or `Over 2.5`, Edge $\ge +3.0\text{pp}$, odds $\ge 1.22$) on the same fixture exceeds `P(1X2)` by $\ge 5.0\text{pp}$. | Overrides straight `1X2` in favor of the higher-probability Goal Market, authorizing the flexible $1.75 - 1.99$ combined odds floor rather than chasing $2.00+$ odds. |

---

## 7. UNIVERSAL JSON TICKET & ALTERNATIVE CONTRACT

All tickets, selections, and shadow alternative candidates generated under Model 5.1 must adhere to this standardized JSON format:

```json
{
  "ticket": {
    "ticket_number": "S-1-v5.1",
    "date": "2026-11-25",
    "model_version": "5.1",
    "model_uuid": "f1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d",
    "model_name": "roys_tournament_international_engine",
    "stake": 2000,
    "combined_odds": 2.15,
    "estimated_ticket_probability": 0.580,
    "status": "pending",
    "actual_result": null,
    "profit_loss": 0,
    "confidence": "medium",
    "confidence_notes": "CONTROLLED STAKE (50% Allocation — 2,000 FCFA). High conviction knockout accumulator combining calibrated To Qualify progression with audited Over 1.5 anchors.",
    "notes": "Cup accumulator ticket constructed under Model 5.1 (roys_tournament_international_engine) and selection_process_tournament.md."
  },
  "selections": [
    {
      "match_date": "2026-11-25",
      "country": "Spain",
      "league": "Copa del Rey",
      "home_team": "Team A",
      "away_team": "Team B",
      "tie_format": "single_leg_knockout",
      "first_leg_margin_for_target": 0,
      "has_extra_time": true,
      "away_goals_rule": false,
      "market": "To Qualify",
      "selection": "Team B To Qualify",
      "odds": 1.25,
      "estimated_probability": 0.796,
      "breakeven_probability": 0.800,
      "edge_percentage_points": 3.6,
      "expected_value": 0.045,
      "prob_over_1_5": 0.832,
      "prob_over_2_5": 0.548,
      "prob_btts_yes": 0.495,
      "prob_under_3_5": 0.755,
      "prob_home_win": 0.135,
      "prob_away_win": 0.635,
      "prob_draw": 0.230,
      "market_evaluations": [
        {
          "market": "1X2",
          "selection": "Away Win",
          "odds": 1.54,
          "breakeven": 0.649,
          "model_prob": 0.635,
          "edge_pp": -1.4,
          "ev": -0.022,
          "vig": 0.048,
          "status": "REJECTED_ROTATION_HAIRCUT"
        },
        {
          "market": "To Qualify",
          "selection": "Away To Qualify",
          "odds": 1.25,
          "breakeven": 0.800,
          "model_prob": 0.796,
          "edge_pp": 3.6,
          "ev": 0.045,
          "vig": 0.065,
          "status": "APPROVED_PRIMARY"
        },
        {
          "market": "Over/Under",
          "selection": "Over 1.5",
          "odds": 1.27,
          "breakeven": 0.787,
          "model_prob": 0.832,
          "edge_pp": 4.5,
          "ev": 0.057,
          "vig": 0.052,
          "status": "APPROVED_ALTERNATIVE"
        }
      ],
      "actual_home_score": null,
      "actual_away_score": null,
      "result": "pending",
      "notes": "Single-leg tie; away favorite rotated starters; To Qualify covers extra-time progression."
    }
  ],
  "alternatives": []
}
```

---

## 8. MODEL GOVERNANCE & RETIREMENT

- Model 5.1 operates in parallel with Model 4.0.
- When domestic leagues resume, slates are analyzed under Model 4.0.
- When continental mid-week ties, domestic cup rounds, or international breaks occur, slates are analyzed under Model 5.1.
- Stake integrity validator enforces that `ticket.stake` and the monetary allocation mentioned in `ticket.confidence_notes` are always identical.
- The bettor evaluates comparative performance at `/admin/betting/tickets` and `/admin/betting/statistics` to ensure both models sustain long-term positive expected value.

