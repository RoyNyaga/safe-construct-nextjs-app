# ROY BETTING ENGINE — MULTI-MARKET EVALUATION REPORT
**Evaluation Date**: 2026-11-12  
**Engine & Model**: Model Version 4.0 (`roys_betting_engine_BTS_O2-5_win`)  
**Target Ticket**: 3-Leg Ultra-Safe Hybrid Portfolio (`Combined Odds >= 2.00`, Target Corridor: $2.05 - 2.50$)  
**Selection Document**: [`selection_process.md`](file:///d:/Programming/nextjs/safe-construct-nextjs-app/betting-data/rules/selection_process.md) (Section 4 Step 3: Archetype B)  
**Integrity Reference**: [`league_baselines.json`](file:///d:/Programming/nextjs/safe-construct-nextjs-app/betting-data/rules/league_baselines.json) (v2.0)  

---

## 1. EXECUTIVE SUMMARY & TICKET ARCHITECTURE

For Thursday, November 12, 2026, 15 fixtures across 10 global divisions (Egypt Second Division A, Guatemala Liga Nacional, El Salvador Primera División, Brazil Serie B, Venezuela Primera División, Jamaica National Premier League, Jordan Division 1, Mexico Liga Premier, South Africa Second Division, and Algeria U20 League) were evaluated under Model 4.0.

Due to the **international FIFA break**, tier-1 domestic European leagues are paused. The active slate consists of lower-tier, Latin American, and Middle Eastern/African competitions. In this environment, forcing a 2-leg ticket with a high-variance single pick (such as a 1.70+ 1X2 match winner or Over 2.5 in unfamiliar defensive leagues) violates the core safety doctrine of Model 4.0.

Under **Section 4 Step 3 of [`selection_process.md`](file:///d:/Programming/nextjs/safe-construct-nextjs-app/betting-data/rules/selection_process.md)**, the engine automatically activated the **Automated 3-Leg Safety Trigger (Archetype B: Over 1.5 Triplet)**:

### Why the Engine Triggered the 3-Leg Safety Rule (Archetype B):
1. **The Forbidden Trade-Off Averted (Section 1 Rule 5)**:
   - Forcing a 2-leg ticket would require elevating a match to Over 2.5 or backing an away favorite (e.g. Operário-PR @ 1.56 away or Delta vs El Seka @ 2.04), sacrificing double-digit probability to chase odds.
   - Operário-PR is strictly barred from 1X2 on main tickets under the **`AWAY_FAVORITE_RESTRICTION`**, and holds a DCI of 0.405 (disqualifying Over 2.5).
   - In Venezuela, Academia Puerto Cabello vs Monagas SC is an end-of-group **dead-rubber match** (Deportivo Táchira has already won Group B with 15 pts), disqualifying it from main capital under Section 4 Step 1.
2. **The 3-Leg High-Floor Safety Architecture**:
   - The engine selected three verified, high-safety Over 1.5 selections with individual probabilities ranging from **$78.0\%$ to $85.0\%$**:
     - **Leg 1**: FC Masar vs Tersana SC **Over 1.5 Goals (@ 1.40)** — Model Prob: **78.0%**, Value Edge: **+6.6pp**, EV: **+0.092**
     - **Leg 2**: Aurora FC vs Deportivo Mixco **Over 1.5 Goals (@ 1.26)** — Model Prob: **83.0%**, Value Edge: **+3.6pp**, EV: **+0.046**
     - **Leg 3**: CD Águila vs CD Municipal Limeño **Over 1.5 Goals (@ 1.20)** — Model Prob: **85.0%**, Value Edge: **+1.7pp**, EV: **+0.020**
   - **Combined Ticket Odds**: **2.12** (perfectly within our $2.00 - 2.50$ sweet spot)
   - **Compound Model Probability**: **55.0%** (vs Bookmaker Break-Even **47.2%**)
   - **Cumulative Value Edge**: **+7.8 percentage points**
   - **Expected Value (EV)**: **+0.166** (+16.6% mathematical edge over bookmaker vig)

```
TICKET BLUEPRINT (S-7-v4.0)
────────────────────────────────────────────────────────────────────────────────────────
Leg 1: FC Masar vs Tersana SC (Egypt Second Division A)
       Pick: Over 1.5 Goals @ 1.40
       Model Prob: 78.0% | Break-Even: 71.4% | Value Edge: +6.6pp | EV: +0.092
       Key Stat: League leaders FC Masar (1st, 22 pts) average 1.83 goals scored per home match.
                 Tersana SC concedes 1.20 goals on the road. Total lambda = 2.55 goals.
                 Priced at 1.40, Over 1.5 captures an elite +6.6pp value edge.

Leg 2: Aurora FC vs Deportivo Mixco (Guatemala Liga Nacional)
       Pick: Over 1.5 Goals @ 1.26
       Model Prob: 83.0% | Break-Even: 79.4% | Value Edge: +3.6pp | EV: +0.046
       Key Stat: Aurora at Estadio Cementos Progreso scores 1.75 GF/G (7 wins in 9 home games).
                 Deportivo Mixco suffers from catastrophic road defense, conceding 20 goals in 9 away matches (2.22 GA/G).
                 The reverse fixture ended Mixco 3–2 Aurora (5 goals). Over 1.5 has hit in 88.9% of Mixco away fixtures.

Leg 3: CD Águila vs CD Municipal Limeño (El Salvador Primera División)
       Pick: Over 1.5 Goals @ 1.20
       Model Prob: 85.0% | Break-Even: 83.3% | Value Edge: +1.7pp | EV: +0.020
       Key Stat: Águila at Estadio Juan Francisco Barraza has scored 21 goals in 8 home matches (2.63 GF/G).
                 Municipal Limeño averages 1.50 goals scored and 1.50 conceded on the road.
                 Total lambda = 3.30 goals with DCI 0.571. Over 1.5 hit in 100% of Águila home games.
────────────────────────────────────────────────────────────────────────────────────────
Combined Odds: 2.12 | Stake: 2,500 FCFA | Potential Return: 5,292 FCFA (Net Profit: +2,792 FCFA)
```

---

## 2. DAILY CANDIDATES DECISION MATRIX

| Fixture | Recommended Market | Odds | Roy Model Prob | Bookmaker Break-Even | Value Edge | EV | DCI | Gate Status & Recommendation |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: | :---: | :--- |
| **FC Masar vs Tersana** | **Over 1.5 Goals** | **1.40** | **78.0%** | 71.4% | **+6.6pp** | **+0.092** | 0.46 | **MAIN TICKET (Leg 1)** |
| **Aurora vs Mixco** | **Over 1.5 Goals** | **1.26** | **83.0%** | 79.4% | **+3.6pp** | **+0.046** | 0.38 | **MAIN TICKET (Leg 2)** |
| **Águila vs Limeño** | **Over 1.5 Goals** | **1.20** | **85.0%** | 83.3% | **+1.7pp** | **+0.020** | **0.57** | **MAIN TICKET (Leg 3)** |
| *Águila vs Limeño* | Over 2.5 Goals | 1.70 | 61.5% | 58.8% | +2.7pp | +0.046 | 0.57 | QUALIFIED (Shadow Alt 1 / Aggressive Companion) |
| *Ponte Preta vs Operário* | Away Win | 1.56 | 65.5% | 64.1% | +1.4pp | +0.022 | 0.41 | QUALIFIED (Shadow Alt 2 - Away Favorite Restricted) |
| *Puerto Cabello vs Monagas* | Over 1.5 Goals | 1.22 | 81.5% | 82.0% | -0.5pp | -0.006 | 0.67 | QUALIFIED (Shadow Alt 3 - Dead-Rubber Match) |
| *Balboa vs CD Inca* | Over 1.5 Goals | 1.20 | 71.0% | 83.3% | -12.3pp| -0.148 | 0.79 | QUALIFIED (Shadow Alt 4 - Under Trap Disqualified) |
| *Delta vs El Seka* | Over 1.5 Goals | 1.35 | 77.0% | 74.1% | +2.9pp | +0.040 | 0.57 | QUALIFIED (Shadow Alt 5 - Away Favorite Restricted) |
| *Dayrout vs Proxy SC* | Over 1.5 Goals | 1.47 | 74.5% | 68.0% | +6.5pp | +0.095 | 0.43 | BENCH (Low Dayrout scoring 0.60 GF/G) |
| *Al Nasr vs Pharco FC* | Over 1.5 Goals | 1.42 | 76.5% | 70.4% | +6.1pp | +0.086 | 0.63 | BENCH (High competitive friction, 28% draw risk) |
| *El Entag vs Baladiyet* | Over 1.5 Goals | 1.30 | 76.0% | 76.9% | -0.9pp | -0.012 | 0.57 | DISQUALIFIED (Negative Value Edge) |
| *Mount Pleasant vs Portmore* | Over 1.5 Goals | 1.35 | 75.5% | 74.1% | +1.4pp | +0.019 | 0.88 | BENCH (Modest Edge, 29% draw probability) |
| *Tritones vs H2O Purepechas* | Over 1.5 Goals | 1.35 | 75.0% | 74.1% | +0.9pp | +0.013 | 0.55 | BENCH (Mexican 3rd tier semi-pro variance) |
| *Jordan Div 1 (3 Fixtures)* | Various | — | — | — | — | — | — | DISQUALIFIED (Over 1.5 odds not provided) |
| *Mohlabile vs Makotopong* | Over 1.5 Goals | 1.27 | — | 78.7% | — | — | — | DISQUALIFIED (Section 5.0 Hard-Stop: Missing venue data) |
| *Constantine U20 vs Setif U20* | BTTS Yes | 1.65 | — | 60.6% | — | — | — | DISQUALIFIED (Reserve Squad Restriction & missing O1.5 odds) |

---

## 3. MULTI-MARKET PROBABILITY MATRIX

| Fixture | Home Win | Draw | Away Win | Over 1.5 | Over 2.5 | BTTS Yes | Under 3.5 | Recommended Selection |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :--- |
| **FC Masar vs Tersana** | 62.5% | 23.0% | 14.5% | **78.0%** | 48.5% | 45.5% | 74.5% | **MAIN TICKET (Over 1.5 @ 1.40)** |
| **Aurora vs Mixco** | 65.5% | 20.5% | 14.0% | **83.0%** | 54.0% | 49.0% | 68.5% | **MAIN TICKET (Over 1.5 @ 1.26)** |
| **Águila vs Limeño** | 58.5% | 21.5% | 20.0% | **85.0%** | 61.5% | 61.3% | 61.0% | **MAIN TICKET (Over 1.5 @ 1.20)** |
| *Águila vs Limeño (Alt)* | 58.5% | 21.5% | 20.0% | 85.0% | **61.5%** | 61.3% | 61.0% | Shadow Alt 1 (Over 2.5 @ 1.70) |
| *Ponte Preta vs Operário* | 12.5% | 22.0% | **65.5%** | 78.5% | 51.5% | 44.5% | 73.0% | Shadow Alt 2 (Away Win @ 1.56) |
| *Puerto Cabello vs Monagas*| 61.5% | 22.0% | 16.5% | **81.5%** | 49.5% | 48.5% | 74.5% | Shadow Alt 3 (Over 1.5 @ 1.22) |
| *Balboa vs CD Inca* | 44.0% | 30.0% | 26.0% | 71.0% | 38.0% | 36.0% | **82.5%** | Shadow Alt 4 (Over 1.5 @ 1.20) |
| *Delta vs El Seka* | 22.0% | 25.5% | **52.5%** | **77.0%** | 46.5% | 43.5% | 76.5% | Shadow Alt 5 (Over 1.5 @ 1.35) |

---

## 4. DETAILED FIXTURE PROFILES & MATHEMATICAL DERIVATIONS

### Leg 1: FC Masar vs Tersana SC (Egypt Second Division A)
- **Venue**: Right to Dream Stadium, Cairo
- **Home Stats (FC Masar)**: 6 MP, 11 GF (1.83 GF/G), 5 GA (0.83 GA/G) | Overall: 11 MP, 17 GF, 7 GA (1st, 22 pts)
- **Away Stats (Tersana SC)**: 5 MP, 6 GF (1.20 GF/G), 6 GA (1.20 GA/G) | Overall: 11 MP, 13 GF, 12 GA (10th, 17 pts)
- **Expected Goals ($\lambda$)**:
  - $\lambda_{\text{home}} = \frac{1.83 \times 1.20}{0.95} \text{ (regressed: 1.75)}$
  - $\lambda_{\text{away}} = \frac{1.20 \times 0.83}{1.30} \text{ (regressed: 0.80)}$
  - $\lambda_{\text{total}} = 1.75 + 0.80 = \mathbf{2.55}$ goals | $\text{DCI} = \frac{0.80}{1.75} = \mathbf{0.457}$
- **Market Evaluation**:
  - Over 1.5 Goals (@ 1.40): Prob = **78.0%**, Break-Even = **71.4%**, Edge = **+6.6pp**, EV = **+0.092**
  - Home Win (@ 1.90): Prob = 62.5%, Edge = +9.9pp, but $P(\text{Draw}) = 23.0\%$ exceeds Gate 4 ceiling (22%).
  - Selection: **Over 1.5 Goals**.

### Leg 2: Aurora FC vs FC Deportivo Mixco (Guatemala Liga Nacional)
- **Venue**: Estadio Cementos Progreso, Guatemala City
- **Home Stats (Aurora FC)**: 8 MP, 14 GF (1.75 GF/G), 8 GA (1.00 GA/G) | Overall: 18 MP, 23 GF, 24 GA (7th, 25 pts)
- **Away Stats (Deportivo Mixco)**: 9 MP, 11 GF (1.22 GF/G), 20 GA (2.22 GA/G) | Overall: 19 MP, 26 GF, 29 GA (3rd, 31 pts)
- **Expected Goals ($\lambda$)**:
  - $\lambda_{\text{home}} = \frac{1.75 \times 2.22}{1.05} \text{ (regressed: 2.15)}$
  - $\lambda_{\text{away}} = \frac{1.22 \times 1.00}{1.50} \approx 0.81$
  - $\lambda_{\text{total}} = 2.15 + 0.81 = \mathbf{2.96}$ goals | $\text{DCI} = \frac{0.81}{2.15} = \mathbf{0.377}$
- **Market Evaluation**:
  - Over 1.5 Goals (@ 1.26): Prob = **83.0%**, Break-Even = **79.4%**, Edge = **+3.6pp**, EV = **+0.046**
  - Over 2.5 Goals (@ 1.81): Disqualified because DCI 0.377 is below the mandatory 0.45 floor.
  - Selection: **Over 1.5 Goals**.

### Leg 3: CD Águila vs CD Municipal Limeño (El Salvador Primera División)
- **Venue**: Estadio Juan Francisco Barraza, San Miguel
- **Home Stats (CD Águila)**: 8 MP, 21 GF (2.63 GF/G), 11 GA (1.38 GA/G) | Overall: 20 MP, 32 GF, 21 GA (4th, 30 pts)
- **Away Stats (Municipal Limeño)**: 10 MP, 15 GF (1.50 GF/G), 15 GA (1.50 GA/G) | Overall: 20 MP, 26 GF, 27 GA (8th, 23 pts)
- **Expected Goals ($\lambda$)**:
  - $\lambda_{\text{home}} = \frac{2.63 \times 1.50}{1.10} \text{ (regressed: 2.10)}$
  - $\lambda_{\text{away}} = \frac{1.50 \times 1.38}{1.45} \text{ (regressed: 1.20)}$
  - $\lambda_{\text{total}} = 2.10 + 1.20 = \mathbf{3.30}$ goals | $\text{DCI} = \frac{1.20}{2.10} = \mathbf{0.571}$
- **Market Evaluation**:
  - Over 1.5 Goals (@ 1.20): Prob = **85.0%**, Break-Even = **83.3%**, Edge = **+1.7pp**, EV = **+0.020**
  - Over 2.5 Goals (@ 1.70): Prob = 61.5%, Edge = +2.7pp, EV = +0.046 (assigned to Shadow Alt 1).
  - Selection: **Over 1.5 Goals**.

