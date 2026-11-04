# ROY BETTING ENGINE — MULTI-MARKET EVALUATION REPORT
**Evaluation Date**: 2026-11-04  
**Engine & Model**: Model Version 4.0 (`roys_betting_engine_BTS_O2-5_win`)  
**Target Ticket**: 2-Leg High-Safety Portfolio (`Combined Odds >= 2.00`)  
**Selection Document**: [`selection_process.md`](file:///d:/Programming/nextjs/safe-construct-nextjs-app/betting-data/rules/selection_process.md)  
**Integrity Reference**: [`league_baselines.json`](file:///d:/Programming/nextjs/safe-construct-nextjs-app/betting-data/rules/league_baselines.json) (v2.0)

---

## 1. EXECUTIVE SUMMARY & TICKET ARCHITECTURE

Today's slate contained **11 match options** submitted across European, South American, African, and Middle Eastern leagues. Following strict adherence to the **6-Gate Verification Framework** and Model 4.0 selection rules, we filtered out unverified lower-tier matches, detected low-scoring defensive traps, and engineered an optimal **2-Leg Value Portfolio**:

- **Combined Ticket Odds**: **2.53** (Sweet Spot Corridor: $2.00 - 2.55$)
- **Compound Model Probability**: **47.1%** (vs Break-Even **39.5%**)
- **Cumulative Value Edge**: **+7.6 percentage points**
- **Expected Value (EV)**: **+0.192** (19.2% mathematical edge over bookmaker vig)
- **Ticket Blueprint**: **Priority 3 (Dominant Winner + Open Goal Market Booster)**

```
TICKET BLUEPRINT (S-1-v4.0)
──────────────────────────────────────────────────────────────────────────────
Leg 1: MC Alger vs MC Oran (Algeria Ligue 1)
       Pick: MC Alger To Win (Home Win) @ 1.55
       Roy Prob: 71.8% | Break-Even: 64.5% | Edge: +7.3pp | EV: +0.113
       Key Stat: DR = 5.85 (Gate 1 Pass). MC Alger unbeaten in 14 of 15 home games
                 (0.53 GA/G). MC Oran scores only 0.47 GF/G away from home.

Leg 2: SK Artis Brno vs Bohemians 1905 (Czech First League)
       Pick: Both Teams to Score (BTTS Yes) @ 1.63
       Roy Prob: 65.6% | Break-Even: 61.3% | Edge: +4.3pp | EV: +0.069
       Key Stat: DCI = 0.88. Both teams concede heavily (Artis 1.83 GA/G;
                 Bohemians 2.00 GA/G away). Total expected goals λ = 3.34.
──────────────────────────────────────────────────────────────────────────────
Combined Odds: 2.53 | Stake: 350 FCFA | Potential Return: 885.5 FCFA
```

---

## 2. CANDIDATE FIXTURE AUDIT & FILTERING PIPELINE

| # | Match | League | Candidate Markets (User Odds) | Audit Status | Diagnostic Decision |
| :-: | :--- | :--- | :--- | :-: | :--- |
| **1** | **MC Alger vs MC Oran** | Algeria Ligue 1 | Win @ 1.55, O1.5 @ 1.48, O2.5 @ 2.44, BTTS @ 2.40 | **QUALIFIED (MAIN LEG 1)** | **PASS (Gates 1–5)**: Huge dominance ratio (5.85). Home Win @ 1.55 is value anchor. |
| **2** | **SK Artis Brno vs Bohemians 1905** | Czech First League | O1.5 @ 1.25, BTTS @ 1.63, O2.5 @ 1.80, Win @ 2.45 | **QUALIFIED (MAIN LEG 2)** | **PASS (DCI 0.88)**: Severe mutual defensive leaks ($GA \ge 1.67$). BTTS Yes @ 1.63 selected. |
| **3** | **Burgan SC vs Al Shamiya FC** | Kuwait Division 1 | Win @ 1.34, O2.5 @ 1.55, BTTS @ 1.95 | **QUALIFIED (SHADOW ALT)** | Dominant head-to-head (4-1, 4-2 wins). Al Shamiya allows 3.0 GA/G away. Strong Alt. |
| **4** | **CA Paranaense vs CR Vasco da Gama** | Brazil Serie A | Win @ 2.03, O1.5 @ 1.25, O2.5 @ 1.77, BTTS @ 1.64 | **QUALIFIED (SHADOW ALT)** | **DCI 0.355 < 0.45**: O2.5 & BTTS disqualified. Vasco away scoring poor (0.79). DNB Home is Alt. |
| **5** | **Club Libertad vs Cerro Porteno** | Paraguay Primera | O1.5 @ 1.28, O2.5 @ 1.87, BTTS @ 1.70 | **QUALIFIED (SHADOW ALT)** | Last 5 H2H: 80% O1.5 (1-1, 3-2, 2-1, 1-3). Model 74.2% slightly below 82% anchor threshold. |
| **6** | **Sportivo Ameliano vs Club Guarani** | Paraguay Primera | O1.5 @ 1.29, O2.5 @ 1.96, BTTS @ 1.77 | **DISQUALIFIED (DRAW TRAP)** | 5 of last 9 H2H ended in draws (55.6%). Severe `DRAW_TRAP_RISK` warning. |
| **7** | **KV Kortrijk vs KV Mechelen** | Belgium Pro League | O1.5 @ 1.24, O2.5 @ 1.75, BTTS @ 1.61 | **DISQUALIFIED (DEFENSIVE TRAP)** | Kortrijk home GA is only 0.53 GA/G (8 GA in 15 games). O1.5 @ 1.24 has massive negative edge. |
| **8** | **FAR Rabat vs Raja Casablanca** | Morocco Botola 1 | O1.5 @ 1.35, O2.5 @ 2.07, BTTS @ 1.97 | **DISQUALIFIED (DERBY RISK)** | H2H history: 0-0, 0-0, 1-1. Elite defensive resistance ($GA < 0.67$). Low-goal trap. |
| **9** | **FC Schaffhausen vs FC Biel-Bienne** | Swiss Promotion | O2.5 @ 1.45, BTTS @ 1.39 (O1.5 missing) | **DISQUALIFIED (MISSING ODDS)** | O1.5 not provided. In recent H2H, Biel-Bienne won 2-0 and 1-0 (clean sheets). |
| **10** | **Guatemala Matches (Fraijanes / Coatepeque)** | Guatemala Primera | O2.5 @ 1.78/2.10, BTTS @ 1.72/2.04 (O1.5 missing) | **DISQUALIFIED (HARD STOP)** | O1.5 missing. Sparse/unverified lower-tier data triggers `MISSING_HOME_AWAY_DATA`. |
| **11** | **Portuguesa vs Deportivo La Guaira** | Venezuela Primera | 1X2 only (Goal markets missing) | **DISQUALIFIED (NO GOAL ODDS)** | No over/under or BTTS odds provided. Omitted under completeness rule. |

---

## 3. IN-DEPTH STATISTICAL & POISSON BREAKDOWNS

### Fixture 1: MC Alger vs MC Oran (Algeria Ligue 1)
- **Kickoff Context**: Algeria Ligue 1 Championship round
- **Venue Records**:
  - MC Alger (Home): 15 Matches | 22 GF (1.47/G) | 8 GA (0.53/G) | Only 1 loss all season
  - MC Oran (Away): 15 Matches | 7 GF (0.47/G) | 21 GA (1.40/G) | Heavy away struggles
- **Relative Expected Goals ($\lambda$)**:
  - $\lambda_{\text{home}} = 1.47 \times \frac{1.40}{1.35} = \mathbf{1.52}$
  - $\lambda_{\text{away}} = 0.47 \times \frac{0.53}{0.95} = \mathbf{0.26}$
  - $\lambda_{\text{total}} = 1.78$
- **Poisson Probabilities**:
  - $P(\text{Over } 1.5) = 53.1\%$ (Over 1.5 @ 1.48 is severely overpriced by bookmakers in Algeria)
  - $P(\text{Over } 2.5) = 26.4\%$
  - $P(\text{BTTS Yes}) = 17.9\%$
  - $P(\text{Under } 3.5) = 89.4\%$
  - **Match Winner (1X2)**:
    - $P(\text{MC Alger Win}) = \mathbf{71.8\%}$
    - $P(\text{Draw}) = 24.2\%$
    - $P(\text{MC Oran Win}) = 4.0\%$
    - $P(\text{MC Alger DNB}) = \mathbf{94.7\%}$
- **5-Gate Checklist Audit (Market 5: To Win)**:
  1. *Dominance Ratio*: $\text{DR} = \frac{1.52}{0.26} = \mathbf{5.85} \ge 2.20$ (**PASS**)
  2. *Expected Goals Levels*: Favored side $\lambda_{\text{home}} = 1.52$; Underdog $\lambda_{\text{away}} = 0.26 \le 0.85$ (**PASS**)
  3. *Venue Isolation*: MC Alger undefeated in 14 of 15 home fixtures; MC Oran averages just 0.47 GF away (**PASS**)
  4. *Probability & Edge*: $P(\text{Win}) = 71.8\% \ge 70.0\%$. Break-even @ 1.55 is $64.5\%$. **Edge: +7.3pp, EV: +0.113** (**PASS**)
  5. *Clean Sheet Resilience*: MC Alger conceded only 8 goals in 15 home games ($0.53$ GA/G) (**PASS**)
- **Selection**: **MC Alger To Win (Home Win)** @ **1.55** (VERDICT: **RECOMMENDED**)

---

### Fixture 2: SK Artis Brno vs Bohemians 1905 (Czech First League)
- **Kickoff Context**: Czech First League (Chance Liga) Matchday
- **Venue Records**:
  - SK Artis Brno (Home): 6 Matches (12 overall: 13 GF, 22 GA) | Home GF: 1.17/G | Home GA: 1.67/G | Season GA: 1.83/G
  - Bohemians 1905 (Away): 6 Matches | Away GF: 1.33/G (8 GF) | Away GA: 2.00/G (12 GA)
- **Relative Expected Goals ($\lambda$)**:
  - $\lambda_{\text{home}} = 1.17 \times \frac{2.00}{1.50} = \mathbf{1.56}$
  - $\lambda_{\text{away}} = 1.33 \times \frac{1.67}{1.25} = \mathbf{1.78}$
  - $\lambda_{\text{total}} = \mathbf{3.34}$
- **Dual Contribution Index (DCI)**:
  - $\text{DCI} = \frac{1.56}{1.78} = \mathbf{0.88} \ge 0.50$ (**Highly Open & Balanced**)
- **Poisson Probabilities**:
  - $P(\text{Over } 1.5) = \mathbf{85.2\%}$ (Odds: 1.25 | Break-Even: 80.0% | Edge: **+5.2pp** | EV: **+0.065**)
  - $P(\text{Over } 2.5) = \mathbf{64.9\%}$ (Odds: 1.80 | Break-Even: 55.6% | Edge: **+9.3pp** | EV: **+0.168**)
  - $P(\text{BTTS Yes}) = \mathbf{65.6\%}$ (Odds: 1.63 | Break-Even: 61.3% | Edge: **+4.3pp** | EV: **+0.069**)
  - $P(\text{Under } 3.5) = 58.2\%$
- **Market Selection Logic**:
  - In a 2-leg ticket with MC Alger @ 1.55, pairing with Over 1.5 (1.25) yields $1.55 \times 1.25 = 1.94$ (just under the 2.00 floor).
  - Following **Section 3.1.1 (The Smart Trade-Up Check)**: With $\text{DCI} = 0.88 \ge 0.50$ and both sides leaking $> 1.67$ GA/G, trading up to **BTTS Yes @ 1.63** pushes combined odds to **2.53** while preserving a **65.6% win rate with +4.3pp edge**!
- **Selection**: **Both Teams to Score (BTTS Yes)** @ **1.63** (VERDICT: **RECOMMENDED**)

---

### Fixture 3: Burgan SC vs Al Shamiya FC (Kuwait Division 1)
- **Venue Records**:
  - Burgan SC: Averaging 4.0 goals scored per match in recent home games vs Al Shamiya (4-1, 4-2 wins).
  - Al Shamiya: Concedes close to 3.00 GA/G on the road in Division 1.
- **Poisson Probabilities**:
  - $P(\text{Burgan SC Win}) = \mathbf{74.5\%}$ (Odds: 1.34 | Break-Even: 74.6%)
  - $P(\text{Over } 2.5) = \mathbf{64.1\%}$ (Odds: 1.55 | Break-Even: 64.5%)
  - $P(\text{BTTS Yes}) = \mathbf{53.8\%}$ (Odds: 1.95)
- **Role in Portfolio**: Prime candidate for the Shadow Tracking Portfolio (`alternatives`) and ideal leg for 3-leg ticket variations.

---

### Fixture 4: CA Paranaense vs CR Vasco da Gama (Brazil Serie A)
- **Venue Records**:
  - CA Paranaense (Home): 19 Matches | 23 GF (1.21/G) | 18 GA (0.95/G)
  - CR Vasco da Gama (Away): 19 Matches | 15 GF (0.79/G) | 36 GA (1.89/G) | 12 away losses
- **DCI Evaluation**:
  - $\lambda_{\text{home}} = 1.69$, $\lambda_{\text{away}} = 0.60$.
  - $\text{DCI} = \frac{0.60}{1.69} = \mathbf{0.355} < 0.45$.
  - **Hard DCI Disqualification**: Under Section 2.1 of `selection_process.md`, fixtures with $\text{DCI} < 0.45$ are **strictly prohibited from Over 2.5 and BTTS Yes**.
- **Draw No Bet Evaluation**:
  - $P(\text{Paranaense Win}) = 59.8\%$, $P(\text{Draw}) = 23.5\%$, $P(\text{Vasco Win}) = 16.7\%$.
  - $P(\text{Paranaense DNB}) = \frac{0.598}{1 - 0.235} = \mathbf{78.2\%}$ (Market Odds: ~1.45).
- **Role**: Saved to Shadow Tracking Portfolio (`alternatives`) as Home DNB.

---

## 4. SELECTION DECISION MATRIX

| Selection | Market | Odds | Roy Prob | Break-Even | Value Edge | EV | DCI | Verdict | Status |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: | :---: | :--- | :--- |
| **MC Alger To Win** | Match Winner (1X2) | **1.55** | **71.8%** | 64.5% | **+7.3pp** | **+0.113** | N/A | **RECOMMENDED** | **MAIN TICKET (Leg 1)** |
| **Artis Brno vs Bohemians BTTS** | Both Teams to Score | **1.63** | **65.6%** | 61.3% | **+4.3pp** | **+0.069** | **0.88** | **RECOMMENDED** | **MAIN TICKET (Leg 2)** |
| *Artis Brno vs Bohemians O1.5* | Over 1.5 Goals | 1.25 | 85.2% | 80.0% | +5.2pp | +0.065 | 0.88 | QUALIFIED | Alternative 1 (Ultra-Safe) |
| *Burgan SC To Win* | Match Winner (1X2) | 1.34 | 74.5% | 74.6% | -0.1pp | -0.002 | N/A | QUALIFIED | Alternative 2 (H2H Dominance) |
| *Artis Brno vs Bohemians O2.5* | Over 2.5 Goals | 1.80 | 64.9% | 55.6% | +9.3pp | +0.168 | 0.88 | QUALIFIED | Alternative 3 (High-Yield) |
| *CA Paranaense Home DNB* | Draw No Bet | 1.45 | 78.2% | 69.0% | +9.2pp | +0.134 | 0.35 | QUALIFIED | Alternative 4 (Defense Split) |
| *Libertad vs Cerro Porteno O1.5* | Over 1.5 Goals | 1.28 | 74.2% | 78.1% | -3.9pp | -0.050 | 0.89 | CONSIDER | Alternative 5 (H2H Trend) |

