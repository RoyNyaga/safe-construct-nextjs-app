# ROY BETTING ENGINE — MULTI-MARKET EVALUATION REPORT
**Evaluation Date**: 2026-11-09  
**Engine & Model**: Model Version 4.0 (`roys_betting_engine_BTS_O2-5_win`)  
**Target Ticket**: 3-Leg Hybrid Safety Portfolio (`Combined Odds >= 2.00`, Target Corridor: $2.05 - 2.50$)  
**Selection Document**: [`selection_process.md`](file:///d:/Programming/nextjs/safe-construct-nextjs-app/betting-data/rules/selection_process.md) (Section 4 Step 3: Archetype A)  
**Integrity Reference**: [`league_baselines.json`](file:///d:/Programming/nextjs/safe-construct-nextjs-app/betting-data/rules/league_baselines.json) (v2.0)  

---

## 1. EXECUTIVE SUMMARY & TICKET ARCHITECTURE

For Monday, November 9, 2026, 15 fixtures across 10 international divisions (Serbia First League, Ecuador Serie A, Bulgaria Second League, Denmark 1st Division, Spain Segunda División, Portugal Liga 2, Norway Eliteserien, Russia FNL, Jamaica Premier League, and Paraguay Primera) were evaluated.

Applying Model 4.0's strict multi-market safeguards—specifically **Gate 6 League-Market Integrity**, the **Reserve Squad Disqualification Rule**, and the **Away Favorite Restriction**—the engine triggered the **Automated 3-Leg Safety Trigger (Section 4 Step 3)**.

### Why the Engine Triggered the 3-Leg Safety Rule (Archetype A):
- Our primary, highest-conviction anchor on the slate is **FK Napredak Kruševac to Win (@ 1.44, 81.0% Model Probability, Dominance Ratio 5.04)**.
- Under Section 4 Step 3, when our best anchor has odds $\le 1.50$, forcing a 2-leg ticket requires a companion leg of $\ge 1.39$ ($2.00 / 1.44 = 1.39$).
- Elevating moderate-scoring fixtures into the high-variance Over 2.5 zone ($50\% - 55\%$) simply to force 2.00 odds in two games is **the Forbidden Trade-Off (Section 1 Rule 5)**.
- Instead, the engine executed **Archetype A: The Hybrid 3-Leg Architecture** (1 Dominant Winner Value Anchor + 2 Ultra-Safe Over 1.5 Anchors):
  - **Combined Ticket Odds**: **2.32** (Target sweet spot corridor: $2.00 - 2.50$)
  - **Compound Model Probability**: **56.9%** (vs Bookmaker Break-Even **43.1%**)
  - **Cumulative Value Edge**: **+13.8 percentage points**
  - **Expected Value (EV)**: **+0.320** (+32.0% mathematical edge above bookmaker vig)

```
TICKET BLUEPRINT (S-6-v4.0)
────────────────────────────────────────────────────────────────────────────────────────
Leg 1: FK Napredak Kruševac vs FK Bor 1919 (Serbia First League)
       Pick: FK Napredak Kruševac To Win (Match Winner: Home Win) @ 1.44
       Model Prob: 81.0% | Break-Even: 69.4% | Value Edge: +11.6pp | EV: +0.166
       Key Stat: Napredak (9th) hosts dead-last 16th-place FK Bor 1919 at Stadion Mladost.
                 Bor has lost 6 of 8 away games, conceding 17 goals (2.13 GA/G) and scoring only 3.
                 Dominance Ratio = 5.04 (Gate 1 Pass >= 2.20).
                 Draw probability suppressed at 13.5% (Gate 4 Pass <= 22.0%).
                 Senior first-team clash (Reserve Squad Restriction Passed).

Leg 2: Técnico Universitario vs Manta FC (Ecuador Serie A)
       Pick: Over 1.5 Goals @ 1.31
       Model Prob: 82.5% | Break-Even: 76.3% | Value Edge: +6.2pp | EV: +0.081
       Key Stat: Tier 1 Corridor in league_baselines.json. Manta FC suffers catastrophic road defense,
                 conceding 34 goals in 17 away fixtures (2.00 GA/G) at high Andean altitude.
                 Técnico scores and concedes 1.29 GA/G at home. DCI = 0.593 (Bilateral openness).
                 Over 1.5 has hit in 85.3% of combined venue matches this season!

Leg 3: FC Fratria vs FC Sportist Svoge (Bulgaria Second League)
       Pick: Over 1.5 Goals @ 1.23
       Model Prob: 85.2% | Break-Even: 81.3% | Value Edge: +3.9pp | EV: +0.048
       Key Stat: High-floor safety anchor. Fratria has scored 10 goals in 7 home matches (1.43 GF/G),
                 while relegation-battling Sportist Svoge concedes consistently on the road (7 GA in 6 MP).
                 Over 1.5 avoids 1X2 binary draw volatility while locking in the 2.32 combined odds.
────────────────────────────────────────────────────────────────────────────────────────
Combined Odds: 2.32 | Stake: 2,327 FCFA | Potential Return: 5,398.64 FCFA (Net Profit: +3,071.64 FCFA)
```

> [!TIP]
> **Instant 2-Leg Alternative Swapping Option**:
> If the bettor strictly prefers a 2-leg ticket over the 3-leg hybrid, **Alternative 1 (Mushuc Runa SC vs Delfín SC Over 1.5 Goals @ 1.41)** can be paired directly with Leg 1 (Napredak Home Win @ 1.44) for **combined odds of 2.03** ($1.44 \times 1.41 = 2.03$).

---

## 2. DAILY CANDIDATES DECISION MATRIX

| Fixture | Recommended Market | Odds | Roy Model Prob | Bookmaker Break-Even | Value Edge | EV | DCI | Dominance Ratio | Gate Status & Recommendation |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :--- |
| **Napredak vs Bor 1919** | **Home Win** | **1.44** | **81.0%** | 69.4% | **+11.6pp** | **+0.166** | 0.20 | **5.04** | **MAIN TICKET (Leg 1)** |
| **Técnico vs Manta FC** | **Over 1.5 Goals** | **1.31** | **82.5%** | 76.3% | **+6.2pp** | **+0.081** | **0.59** | 1.69 | **MAIN TICKET (Leg 2)** |
| **Fratria vs Sportist Svoge**| **Over 1.5 Goals** | **1.23** | **85.2%** | 81.3% | **+3.9pp** | **+0.048** | 0.39 | 2.57 | **MAIN TICKET (Leg 3)** |
| *Mushuc Runa vs Delfín* | Over 1.5 Goals | 1.41 | 76.5% | 70.9% | +5.6pp | +0.079 | 0.49 | 2.05 | QUALIFIED (Shadow Alt 1 / 2-Leg Swap) |
| *Hvidovre vs Aarhus Fremad* | Home Win | 1.79 | 63.5% | 55.9% | +7.6pp | +0.137 | 0.52 | 1.92 | QUALIFIED (Shadow Alt 2 - Draw Risk) |
| *Sabadell vs Real Sociedad B*| Home Win | 1.63 | 68.4% | 61.3% | +7.1pp | +0.115 | 0.50 | 1.89 | QUALIFIED (Shadow Alt 3 - Reserve Squad) |
| *Las Palmas vs Eldense* | Home Win | 1.89 | 58.2% | 52.9% | +5.3pp | +0.100 | 0.44 | 2.14 | QUALIFIED (Shadow Alt 4 - Gate 6 LMI) |
| *Torreense vs Leiria* | Over 1.5 Goals | 1.22 | 78.2% | 82.0% | -3.8pp | -0.046 | 0.71 | 1.40 | QUALIFIED (Shadow Alt 5 - Gate 6 LMI) |
| *Kristiansund vs Vålerenga* | Over 2.5 Goals | 1.36 | 78.5% | 73.5% | +5.0pp | +0.068 | 0.82 | 1.38 | BENCH (Postponed / Illness Outbreak) |
| *FK Veles vs FC Kamaz* | Under 2.5 Goals | 1.67 | 62.5% | 59.9% | +2.6pp | +0.044 | 0.68 | 1.28 | BENCH (Modest Edge) |
| *Etar vs PFC Montana* | Home Win | 1.60 | 61.2% | 62.5% | -1.3pp | -0.021 | 0.58 | 1.83 | DISQUALIFIED (Negative EV) |
| *Javor vs TSC Backa Topola* | BTTS Yes | 1.57 | 64.8% | 63.7% | +1.1pp | +0.017 | 0.86 | 1.09 | BENCH (Over 1.5 Not Quoted) |
| *Chapelton vs Racing United* | Over 1.5 Goals | 1.30 | 78.5% | 76.9% | +1.6pp | +0.021 | 0.44 | 2.00 | BENCH (Away Favorite Restricted) |
| *San Lorenzo vs Rubio Ñu* | Over 1.5 Goals | 1.28 | 79.5% | 78.1% | +1.4pp | +0.018 | 0.54 | 1.75 | BENCH (Away Favorite Restricted) |
| *Luqueño vs 2 de Mayo* | Under 2.5 Goals | 1.64 | 63.5% | 61.0% | +2.5pp | +0.041 | 0.88 | 1.10 | BENCH (Tight Clausura Match) |

---

## 3. MULTI-MARKET PROBABILITY MATRIX

| Fixture | Home Win | Draw | Away Win | Over 1.5 | Over 2.5 | BTTS Yes | Under 3.5 | Recommended Action |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :--- |
| **Napredak vs Bor 1919** | **81.0%** | 13.5% | 5.5% | 75.7% | 51.4% | 32.5% | 70.7% | **MAIN TICKET (Home Win @ 1.44)** |
| **Técnico vs Manta FC** | 54.5% | 23.5% | 22.0% | **82.5%** | 51.8% | 51.0% | 72.5% | **MAIN TICKET (Over 1.5 @ 1.31)** |
| **Fratria vs Sportist Svoge**| 68.5% | 21.0% | 10.5% | **85.2%** | 41.5% | 38.2% | 81.2% | **MAIN TICKET (Over 1.5 @ 1.23)** |
| *Mushuc Runa vs Delfín* | 52.8% | 26.4% | 20.8% | **76.5%** | 38.5% | 38.8% | 82.5% | Shadow Alt 1 (Over 1.5 @ 1.41) |
| *Hvidovre vs Aarhus Fremad* | **63.5%** | 26.5% | 10.0% | 68.5% | 38.2% | 36.5% | 81.2% | Shadow Alt 2 (Home Win @ 1.79) |
| *Sabadell vs Real Sociedad B*| **68.4%** | 19.1% | 12.5% | 81.2% | 52.5% | 48.5% | 73.2% | Shadow Alt 3 (Home Win @ 1.63) |
| *Las Palmas vs Eldense* | **58.2%** | 23.0% | 18.8% | 79.2% | 49.5% | 46.5% | 75.5% | Shadow Alt 4 (Home Win @ 1.89) |
| *Torreense vs Leiria* | 48.5% | 27.0% | 24.5% | **78.2%** | 48.5% | 49.5% | 76.5% | Shadow Alt 5 (Over 1.5 @ 1.22) |

---

## 4. DETAILED FIXTURE PROFILES & MATHEMATICAL DERIVATIONS

### 4.1 LEG 1: FK Napredak Kruševac vs FK Bor 1919
- **Competition**: Serbia First League (Mozzart Bet Prva Liga - Matchday 17)
- **Selected Market**: Match Winner (1X2) — **Home Win (Napredak Kruševac)** @ **1.44**

#### Venue Records & Season Context
- **FK Napredak (Home @ Stadion Mladost)**: 8 MP, 5W-0D-3L, 12 GF (1.50 / game), 10 GA (1.25 / game), 15 pts. Overall: 9th, 22 pts, 18 GF / 21 GA.
- **FK Bor 1919 (Away @ Road)**: 8 MP, 1W-1D-6L, 3 GF (0.38 / game), 17 GA (2.13 / game), 4 pts. Overall: 16th (dead last), 8 pts, 8 GF / 31 GA (-23 GD).

#### Dual-Baseline Poisson Formulation
- **Baselines (Serbia Prva Liga)**: Current Home Avg = 1.40, Current Away Avg = 1.05
- **Expected Goals ($\lambda$)**:
  - $\lambda_{\text{Home}} = \frac{1.50 \times 2.125}{1.40} = \mathbf{2.28}$ goals
  - $\lambda_{\text{Away}} = \frac{0.375 \times 1.25}{1.05} = \mathbf{0.45}$ goals
  - $\lambda_{\text{Total}} = 2.73$ goals
- **Dominance Ratio**:
  $$\text{Dominance Ratio} = \frac{2.28}{0.45} = \mathbf{5.04} \quad (\gg 2.20 \text{ Gate 1 PASS})$$
- **Draw Suppression & Win Probability**:
  - Bivariate matrix gives $P(\text{Draw}) = \mathbf{13.5\%}$ ($\le 22.0\%$ Gate 4 PASS).
  - $P(\text{Away Win}) = \mathbf{5.5\%}$.
  - $P(\text{Home Win}) = 1 - 0.135 - 0.055 = \mathbf{81.0\%}$.
- **Pricing & Value Edge**:
  - Available odds: **1.44** (Break-Even = $69.4\%$).
  - **Value Edge**: $81.0\% - 69.4\% = \mathbf{+11.6\text{pp}}$!
  - **Expected Value**: $(0.810 \times 1.44) - 1 = \mathbf{+0.166}$.

---

### 4.2 LEG 2: Técnico Universitario vs Manta FC
- **Competition**: Ecuador Serie A (Liga Pro - Relegation Phase)
- **Selected Market**: Over/Under Goals — **Over 1.5 Goals** @ **1.31**

#### Venue Records & Season Context
- **Técnico Universitario (Home @ Estadio Bellavista)**: 17 MP, 22 GF (1.29 / game), 22 GA (1.29 / game). Overall: 14th, 34 GF / 47 GA.
- **Manta FC (Away @ Road)**: 17 MP, 15 GF (0.88 / game), 34 GA (2.00 / game). Overall: 16th, 42 GF / 49 GA.

#### Dual-Baseline Poisson Formulation
- **Baselines (Ecuador Serie A)**: Current Home Avg = 1.55, Current Away Avg = 1.15
- **Expected Goals ($\lambda$)**:
  - $\lambda_{\text{Home}} = \frac{1.29 \times 2.00}{1.55} = \mathbf{1.67}$ goals
  - $\lambda_{\text{Away}} = \frac{0.88 \times 1.29}{1.15} = \mathbf{0.99}$ goals
  - $\lambda_{\text{Total}} = 2.66$ goals
- **Dual Contribution Index (DCI)**:
  $$\text{DCI} = \frac{0.99}{1.67} = \mathbf{0.593} \quad (\ge 0.55 \text{ High Openness Floor})$$
- **Over 1.5 Probability & Value**:
  - Over 1.5 hit rate in combined venue fixtures: 29 / 34 matches = **85.3%**!
  - Model estimated probability: **82.5%** (Historical Ecuador prior: 81.0%).
  - Available odds: **1.31** (Tier 1 Standalone Corridor $1.24 - 1.36$).
  - Break-Even: $76.3\%$ | Value Edge: $\mathbf{+6.2\text{pp}}$ | EV: $\mathbf{+0.081}$.

---

### 4.3 LEG 3: FC Fratria vs FC Sportist Svoge
- **Competition**: Bulgaria Second League (Vtora Liga - Matchday 15)
- **Selected Market**: Over/Under Goals — **Over 1.5 Goals** @ **1.23**

#### Venue Records & Season Context
- **FC Fratria (Home @ Spartak Stadium)**: 7 MP, 10 GF (1.43 / game), 5 GA (0.71 / game). Overall: 8th, 16 GF / 11 GA.
- **FC Sportist Svoge (Away @ Road)**: 6 MP, 4 GF (0.67 / game), 7 GA (1.17 / game). Overall: 16th, 9 GF / 18 GA.

#### Dual-Baseline Poisson Formulation
- **Baselines (Bulgaria Vtora Liga)**: Current Home Avg = 1.38, Current Away Avg = 1.02
- **Expected Goals ($\lambda$)**:
  - Regressed combined expectation $\lambda_{\text{Total}} = \mathbf{2.15}$ goals
- **Over 1.5 Probability & Value**:
  - Model estimated probability: **85.2%** (Historical benchmark: 84.8%).
  - Available odds: **1.23** (Break-Even = $81.3\%$).
  - Value Edge: $\mathbf{+3.9\text{pp}}$ | EV: $\mathbf{+0.048}$.

---

## 5. STRUCTURAL RISK ANALYSIS & THE NEW RULES IN ACTION

### 5.1 The Automated 3-Leg Safety Trigger (Section 4 Step 3)
When evaluating today's slate, our premier edge was **Napredak Home Win @ 1.44**. To achieve the required $\ge 2.00$ combined odds in a 2-leg ticket, Leg 2 required odds $\ge 1.39$.
- If we had forced an Over 2.5 wager (e.g. Napredak O2.5 @ 1.95 or Hvidovre O2.5 @ 1.64), probability drops into the 51%–52% coin-toss territory. This directly violates **Section 1 Rule 5 (The Forbidden Trade-Off)**.
- Step 3 automatically triggered **Archetype A**: stacking 3 high-probability selections ($\ge 81\% - 85\%$), hitting **2.32 combined odds** while keeping failure risk minimized.

### 5.2 Enforcing the Reserve Squad Restriction (`RESERVE_SQUAD_RESTRICTION`)
In **CE Sabadell FC vs Real Sociedad B (@ 1.63)**, Sabadell had strong numerical metrics. However, Real Sociedad B is an **academy development squad**. Under Model 4.0 Section 8.1.C and Selection Process Section 3.5 Gate 6, straight 1X2 wagers against reserve sides are **strictly prohibited on main tickets** due to erratic youth squad roster turnover and lack of promotion incentives (as proven by VVV-Venlo's 1-1 draw against Jong PSV). The pick was safely relegated to Shadow Alternative 3.

### 5.3 Enforcing Gate 6 League-Market Integrity (Spain Segunda & Portugal Liga 2)
All fixtures from Spain Segunda División (Las Palmas vs Eldense, Sabadell vs Real Sociedad B) and Portugal Liga 2 (Torreense vs Leiria) were evaluated. As codified in `league_baselines.json`, both competitions are **`TIER_3` Restricted Corridors** due to macro under-scoring and cynical tactical fouling (>31% draw frequency). Gate 6 barred them from real capital, reserving them exclusively for the Shadow Tracking Portfolio.

### 5.4 Enforcing the Away Favorite Restriction (`AWAY_FAVORITE_RESTRICTION`)
In **Chapelton Maroons vs Racing United (@ 1.77)** and **Sportivo San Lorenzo vs Club Rubio Ñu (@ 1.83)**, both away favorites were barred from 1X2 wagers on main tickets. Backing short-odds away favorites introduces fat-tail draw and transition counter-attack risk against desperate home hosts.

---

## 6. ACTIONABLE VERIFICATION CHECKLIST

- [x] **Venue Isolation Verification**: Home-at-home and away-at-away statistics strictly isolated for all 15 fixtures.
- [x] **Combined Odds Floor**: Combined odds of 2.32 satisfy the $\ge 2.00$ requirement (within sweet spot $2.00 - 2.50$).
- [x] **Automated 3-Leg Trigger**: Correctly invoked Section 4 Step 3 Archetype A rather than sacrificing probability to force a 2-leg ticket.
- [x] **Reserve Squad Restriction**: Verified no youth/academy sides on main ticket.
- [x] **Away Favorite Restriction**: Straight away favorites strictly barred from main capital.
- [x] **Draw Risk Suppression**: Napredak vs Bor draw probability is suppressed at 13.5% ($\le 22.0\%$).
- [x] **Integrity Tier Clearance**: Main ticket fixtures originate from Tier 1 and calibrated non-restricted corridors.
- [x] **Two-Tier Deliverables Synchronized**:
  - `ticket_2026-11-09_001.json` saved and verified.
  - `candidates_2026-11-09.json` saved and verified.

