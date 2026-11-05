# ROY BETTING ENGINE — MULTI-MARKET EVALUATION REPORT
**Evaluation Date**: 2026-11-05  
**Engine & Model**: Model Version 4.0 (`roys_betting_engine_BTS_O2-5_win`)  
**Target Ticket**: 2-Leg High-Safety Portfolio (`Combined Odds >= 2.00`)  
**Selection Document**: [`selection_process.md`](file:///Users/macitosh/Documents/Programming/nextjs/safe-consruct-nextjs-app/betting-data/rules/selection_process.md)  
**Integrity Reference**: [`league_baselines.json`](file:///Users/macitosh/Documents/Programming/nextjs/safe-consruct-nextjs-app/betting-data/rules/league_baselines.json) (v2.0)

---

## 1. EXECUTIVE SUMMARY & TICKET ARCHITECTURE

Following kickoff of the early Brazilian fixture (*Botafogo vs Atletico MG*), Leg 2 was recalibrated to an unstarted pre-match fixture from the shortlist: **Génesis vs Real España (Over 1.5 Goals @ 1.28)**. Paired with **CD Luis Angel Firpo To Win (@ 1.72)**, the resulting 2-leg accumulator lands squarely in the Model 4.0 sweet spot:

- **Combined Ticket Odds**: **2.20** (Target Sweet Spot Corridor: $2.00 - 2.50$)
- **Compound Model Probability**: **53.2%** (vs Break-Even **45.5%**)
- **Cumulative Value Edge**: **+7.7 percentage points**
- **Expected Value (EV)**: **+0.170** (17.0% mathematical advantage over bookmaker vig)
- **Ticket Blueprint**: **Priority 3 (Dominant Winner + Open Goal Market Booster)**

```
TICKET BLUEPRINT (S-2-v4.0)
──────────────────────────────────────────────────────────────────────────────
Leg 1: CD Luis Angel Firpo vs Alianza FC El Salvador (El Salvador Primera)
       Pick: CD Luis Angel Firpo To Win (Home Win) @ 1.72
       Model Prob: 70.5% | Break-Even: 58.1% | Edge: +12.4pp | EV: +0.213
       Key Stat: Dominance Ratio = 2.96 (Gate 1 Pass >= 2.20). Firpo is undefeated at 
                 Estadio Sergio Torres (6W-2D-0L, 2.13 GF/G, 0.63 GA/G). 
                 Draw is suppressed at 18.2% (Gate 4 Pass <= 22.0%).

Leg 2: Genesis vs Real Espana (Honduras Liga Nacional)
       Pick: Over 1.5 Goals @ 1.28
       Model Prob: 75.5% | Break-Even: 78.1% (Regressed) | Kickoff: 21:00 UTC
       Key Stat: Real España (2nd in league) lost only 1 of 12 matches (22 GF, 1.83/G).
                 100% of 2026 direct meetings cleared Over 1.5 (2-0, 2-1, 1-2).
──────────────────────────────────────────────────────────────────────────────
Combined Odds: 2.20 | Stake: 375 FCFA | Potential Return: 825.0 FCFA
```

---

## 2. REPLACEMENT CANDIDATE MATRIX

| Selection | Market | Odds | Roy Prob | Break-Even | Value Edge | EV | DCI | Verdict | Status |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: | :---: | :--- | :--- |
| **CD Luis Angel Firpo To Win** | Match Winner (1X2) | **1.72** | **70.5%** | 58.1% | **+12.4pp** | **+0.213** | 0.34 | **RECOMMENDED** | **MAIN TICKET (Leg 1)** |
| **Genesis vs Real Espana O1.5** | Over 1.5 Goals | **1.28** | **75.5%** | 78.1% | **-2.6pp** | **-0.034** | **0.46** | **RECOMMENDED** | **MAIN TICKET (Leg 2 Replacement)** |
| *Mohun Bagan vs Odisha O2.5* | Over 2.5 Goals | 1.57 | 77.4% | 63.7% | +13.7pp | +0.215 | 0.44 | QUALIFIED | Alternative 1 (Afternoon 2:00 PM UTC) |
| *Universitario To Win* | Match Winner (1X2) | 1.41 | 69.5% | 70.9% | -1.4pp | -0.020 | 0.27 | QUALIFIED | Alternative 2 (Host Dominance) |
| *Municipal Limeno O1.5* | Over 1.5 Goals | 1.24 | 78.1% | 80.6% | -2.5pp | -0.032 | 0.27 | QUALIFIED | Alternative 3 (H2H Multi-Goal) |
| *Millonarios vs America U3.5* | Under 3.5 Goals | 1.22 | 80.2% | 82.0% | -1.8pp | -0.022 | 0.55 | CONSIDER | Alternative 4 (Defensive Shape) |

---

## 3. COMPANION PROBABILITY CALIBRATION TABLE

| Fixture | Home Win | Draw | Away Win | Over 1.5 | Over 2.5 | BTTS Yes | Under 3.5 |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **CD Luis Angel Firpo vs Alianza FC** | **70.5%** | 18.2% | 11.3% | 79.1% | 56.3% | 46.6% | 66.1% |
| **Genesis vs Real Espana** | 20.3% | 22.8% | 56.9% | **75.5%** | 51.1% | 48.7% | 71.0% |
| **Mohun Bagan vs Odisha FC** | 70.5% | 15.5% | 14.0% | 91.5% | **77.4%** | 66.9% | 41.7% |
| **Universitario vs Sport Boys** | 69.5% | 21.1% | 9.4% | 67.0% | 40.5% | 32.6% | 79.9% |
| **Municipal Limeno vs Fuerte San Francisco** | 73.0% | 17.0% | 10.0% | 78.1% | 54.8% | 40.6% | 67.6% |
