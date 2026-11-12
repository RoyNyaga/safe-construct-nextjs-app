# ROY BETTING ENGINE — MULTI-MARKET EVALUATION REPORT
**Evaluation Date**: 2026-11-07  
**Engine & Model**: Model Version 4.0 (`roys_betting_engine_BTS_O2-5_win`)  
**Target Ticket**: 2-Leg High-Safety Portfolio (`Combined Odds >= 2.00`)  
**Selection Document**: [`selection_process.md`](file:///d:/Programming/nextjs/safe-construct-nextjs-app/betting-data/rules/selection_process.md)  
**Integrity Reference**: [`league_baselines.json`](file:///d:/Programming/nextjs/safe-construct-nextjs-app/betting-data/rules/league_baselines.json) (v2.0)  

---

## 1. EXECUTIVE SUMMARY & TICKET ARCHITECTURE

For Saturday, November 7, 2026, 14 fixtures across the English Premier League and English Championship were comprehensively screened. Applying the multi-market mathematical screening protocol under Model 4.0 and the newly codified **Reserve Squad Restriction**, the optimal 2-leg accumulator was constructed under **Priority 3 (Dominant Winner + Open Goal Market Booster)**:

- **Combined Ticket Odds**: **2.51** (Target sweet spot corridor: $2.00 - 2.50$)
- **Compound Model Probability**: **56.5%** (vs Bookmaker Break-Even **39.8%**)
- **Cumulative Value Edge**: **+16.7 percentage points**
- **Expected Value (EV)**: **+0.418** (+41.8% mathematical edge above bookmaker vig)
- **Primary Corridor**: English Championship (`TIER_1` DNB/Goal Corridor)

```
TICKET BLUEPRINT (S-4-v4.0)
────────────────────────────────────────────────────────────────────────────────────────
Leg 1: Queens Park Rangers vs Lincoln City (English Championship)
       Pick: Queens Park Rangers To Win (Match Winner: Home Win) @ 1.63
       Model Prob: 71.2% | Break-Even: 61.3% | Value Edge: +9.9pp | EV: +0.161
       Key Stat: QPR is dominant at Loftus Road (4W-2D-1L, 13 GF, 6 GA, 0.86 GA/G).
                 Lincoln City has lost 5 of 7 away matches (conceding 2.00 GA/G).
                 Dominance Ratio = 3.31 (Gate 1 Pass >= 2.20).
                 Draw probability suppressed at 16.8% (Gate 4 Pass <= 22.0%).
                 Senior First-Team Matchup (Reserve Squad Restriction Passed).

Leg 2: Blackburn Rovers vs West Ham United (English Championship)
       Pick: Over 2.5 Goals @ 1.54
       Model Prob: 79.4% | Break-Even: 64.9% | Value Edge: +14.5pp | EV: +0.223
       Key Stat: West Ham is the league's most explosive attacking machine, producing 
                 57 goals in 14 matches (36 GF, 21 GA, 4.07 goals/match).
                 Combined expected goals Lambda = 4.20. DCI = 0.585 (Gate 2 Pass >= 0.45).
────────────────────────────────────────────────────────────────────────────────────────
Combined Odds: 2.51 | Stake: 375 FCFA | Potential Return: 941.25 FCFA
```

---

## 2. DAILY CANDIDATES DECISION MATRIX

| Fixture | Recommended Market | Odds | Roy Model Prob | Bookmaker Break-Even | Value Edge | EV | DCI | Dominance Ratio | Gate Status & Recommendation |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :--- |
| **QPR vs Lincoln City** | **Home Win** | **1.63** | **71.2%** | 61.3% | **+9.9pp** | **+0.161** | 0.30 | **3.31** | **MAIN TICKET (Leg 1)** |
| **Blackburn vs West Ham** | **Over 2.5 Goals** | **1.54** | **79.4%** | 64.9% | **+14.5pp** | **+0.223** | **0.59** | 1.71 | **MAIN TICKET (Leg 2)** |
| *Nottingham Forest vs Man City* | Away Win | 1.75 | 69.8% | 57.1% | +12.7pp | +0.222 | 0.31 | 3.26 | QUALIFIED (Shadow Alternative 1) |
| *Bristol City vs Norwich City* | Over 2.5 Goals | 1.70 | 71.5% | 58.8% | +12.7pp | +0.216 | 0.96 | 1.04 | QUALIFIED (Shadow Alternative 2) |
| *Watford vs Middlesbrough* | Away Win | 1.51 | 69.8% | 66.2% | +3.6pp | +0.054 | 0.33 | 2.99 | QUALIFIED (Shadow Alternative 3) |
| *Cardiff City vs Burnley* | BTTS Yes | 1.46 | 73.5% | 68.5% | +5.0pp | +0.073 | 0.88 | 1.31 | QUALIFIED (Shadow Alternative 4) |
| *Fulham vs Newcastle United* | BTTS Yes | 1.58 | 66.5% | 63.3% | +3.2pp | +0.051 | 0.80 | 1.58 | QUALIFIED (Shadow Alternative 5) |
| *Arsenal vs Hull City* | Home Win | 1.15 | 84.2% | 87.0% | -2.8pp | -0.032 | 0.11 | 8.75 | DISQUALIFIED (Odds < 1.20 Floor & DCI < 0.45) |
| *Leeds United vs Tottenham* | Under 3.5 Goals | 1.32 | 71.5% | 75.8% | -4.3pp | -0.056 | 0.94 | 1.00 | DISQUALIFIED (Draw Trap 27.5% > 22% Ceiling) |
| *Wrexham vs Wolves* | Away Win | 2.11 | 42.0% | 47.4% | -5.4pp | -0.114 | 0.81 | 1.33 | DISQUALIFIED (DR 1.33 < 2.20 Floor) |
| *Portsmouth vs Stoke City* | Under 3.5 Goals | 1.28 | 74.5% | 78.1% | -3.6pp | -0.046 | 0.71 | 1.67 | DISQUALIFIED (Low Goal & Draw Risk 27.8%) |
| *Charlton vs Sheffield United* | Away Win | 2.06 | 43.6% | 48.5% | -4.9pp | -0.102 | 0.74 | 1.44 | DISQUALIFIED (Negative Value Edge) |
| *Birmingham vs Swansea City* | Home Win | 1.82 | 54.2% | 54.9% | -0.7pp | -0.014 | 0.62 | 1.75 | DISQUALIFIED (Top Table Parity DR < 2.20) |
| *West Brom vs Millwall* | Home Win | 2.01 | 50.5% | 49.8% | +0.7pp | +0.015 | 0.72 | 1.55 | DISQUALIFIED (Draw Risk 25.2% > 22% Ceiling) |

---

## 3. MULTI-MARKET PROBABILITY MATRIX

| Fixture | Home Win | Draw | Away Win | Over 1.5 | Over 2.5 | BTTS Yes | Under 3.5 |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **QPR vs Lincoln City** | **71.2%** | 16.8% | 12.0% | 85.1% | 62.4% | 46.8% | 67.5% |
| **Blackburn vs West Ham** | 18.7% | 19.5% | 61.8% | 93.5% | **79.4%** | 73.2% | 39.5% |
| **Nottingham Forest vs Man City** | 12.4% | 17.8% | **69.8%** | 84.8% | 61.2% | 48.5% | 68.2% |
| **Bristol City vs Norwich City** | 38.5% | 22.0% | 39.5% | 87.2% | **71.5%** | 67.8% | 48.5% |
| **Watford vs Middlesbrough** | 12.7% | 17.5% | **69.8%** | 84.2% | 61.5% | 47.2% | 68.5% |
| **Cardiff City vs Burnley** | 44.2% | 22.0% | 33.8% | 89.2% | 72.8% | **73.5%** | 47.2% |
| **Fulham vs Newcastle United** | 47.2% | 23.0% | 29.8% | 83.5% | 64.2% | **66.5%** | 57.5% |

---

## 4. DETAILED FIXTURE PROFILES & MATHEMATICAL DERIVATIONS

### 4.1 LEG 1: Queens Park Rangers vs Lincoln City
- **Kickoff**: 2026-11-07 15:00 UTC | England Championship (Matchday 15)
- **Selected Market**: Match Winner (1X2) — **Home Win (QPR)** @ **1.63**

#### Venue Records & Season Context
- **QPR (Home @ Loftus Road)**: 7 MP, 4W-2D-1L, 13 GF (1.86 / game), 6 GA (0.86 / game). Overall: 11th, 21 pts, 22 GF / 17 GA.
- **Lincoln City (Away @ Away)**: 7 MP, 1W-1D-5L, 5 GF (0.71 / game), 14 GA (2.00 / game). Overall: 19th, 15 pts, 14 GF / 24 GA.

#### Dual-Baseline Poisson Formulation
- **Baselines (Championship)**: Home scoring average = 1.48, Away scoring average = 1.18
- **Attack / Defense Strengths**:
  - $\text{HAS}_{\text{QPR}} = \frac{1.86}{1.48} = 1.257$ | $\text{ADW}_{\text{Lincoln}} = \frac{2.00}{1.48} = 1.351$
  - $\text{AAS}_{\text{Lincoln}} = \frac{0.71}{1.18} = 0.602$ | $\text{HDW}_{\text{QPR}} = \frac{0.86}{1.18} = 0.729$
- **Expected Goals ($\lambda$)**:
  - $\lambda_{\text{Home}} = 1.257 \times 1.351 \times 1.48 = \mathbf{2.51} \rightarrow \text{regressed with season overall} = \mathbf{2.25}$
  - $\lambda_{\text{Away}} = 0.602 \times 0.729 \times 1.18 = \mathbf{0.52} \rightarrow \text{regressed with season overall} = \mathbf{0.68}$
  - $\lambda_{\text{Total}} = 2.93$ goals
- **Dominance Ratio**:
  $$\text{Dominance Ratio} = \frac{2.25}{0.68} = \mathbf{3.31} \quad (\ge 2.20 \text{ Gate 1 PASS})$$
- **Draw Suppression**:
  $$P(\text{Draw}) = \mathbf{16.8\%} \quad (\le 22.0\% \text{ Gate 4 PASS})$$
- **Reserve Squad Check**:
  Both teams are established senior first-teams. **PASSES `RESERVE_SQUAD_RESTRICTION`**.
- **Market Evaluation**:
  - Offered Odds: **1.63** | Bookmaker Break-Even: $61.3\%$
  - Model Win Probability: **71.2%**
  - Value Edge: $\mathbf{+9.9\text{ percentage points}}$ | Expected Value: $\mathbf{+0.161}$

---

### 4.2 LEG 2: Blackburn Rovers vs West Ham United
- **Kickoff**: 2026-11-07 15:00 UTC | England Championship (Matchday 15)
- **Selected Market**: Over/Under Goals — **Over 2.5 Goals** @ **1.54**

#### Venue Records & Season Context
- **Blackburn (Home @ Ewood Park)**: 7 MP, 3W-1D-3L, 11 GF (1.57 / game), 10 GA (1.43 / game). Overall: 14th, 18 pts, 20 GF / 22 GA.
- **West Ham (Away @ Away)**: 7 MP, 3W-2D-2L, 16 GF (2.29 / game), 11 GA (1.57 / game). Overall: 8th, 23 pts, 36 GF / 21 GA (+15 GD).

#### Dual-Baseline Poisson Formulation
- **Baselines (Championship)**: Home scoring average = 1.48, Away scoring average = 1.18
- **Attack / Defense Strengths**:
  - $\text{HAS}_{\text{Blackburn}} = \frac{1.57}{1.48} = 1.061$ | $\text{ADW}_{\text{West Ham}} = \frac{1.57}{1.48} = 1.061$
  - $\text{AAS}_{\text{West Ham}} = \frac{2.29}{1.18} = 1.941$ | $\text{HDW}_{\text{Blackburn}} = \frac{1.43}{1.18} = 1.212$
- **Expected Goals ($\lambda$)**:
  - $\lambda_{\text{Home}} = 1.061 \times 1.061 \times 1.48 = \mathbf{1.67} \rightarrow \text{regressed} = \mathbf{1.55}$
  - $\lambda_{\text{Away}} = 1.941 \times 1.212 \times 1.18 = \mathbf{2.78} \rightarrow \text{regressed} = \mathbf{2.65}$
  - $\lambda_{\text{Total}} = \mathbf{4.20}$ goals!
- **Dual Contribution Index (DCI)**:
  $$\text{DCI} = \frac{1.55}{2.65} = \mathbf{0.585} \quad (\ge 0.45 \text{ Gate 2 PASS: High Openness})$$
- **Market Evaluation**:
  - Offered Odds: **1.54** | Bookmaker Break-Even: $64.9\%$
  - Model Over 2.5 Probability: **79.4%**
  - Value Edge: $\mathbf{+14.5\text{ percentage points}}$ | Expected Value: $\mathbf{+0.223}$

---

## 5. GATE CHECK & RISK FILTER AUDIT

| Gate Check | Rule Specification | Main Ticket Performance | Audit Verdict |
| :--- | :--- | :--- | :---: |
| **Gate 1: Dominance Ratio** | Dominance Ratio $\ge 2.20$ for Match Winner picks | QPR $\text{DR} = 3.31$ | **PASS** |
| **Gate 2: Over 2.5 DCI Floor** | DCI $\ge 0.45$ for Over 2.5 Goals picks | Blackburn vs West Ham $\text{DCI} = 0.585$ | **PASS** |
| **Gate 3: Draw Suppression** | Model $P(\text{Draw}) \le 22.0\%$ for Match Winner picks | QPR $P(\text{Draw}) = 16.8\%$ | **PASS** |
| **Gate 4: Minimum Floor Odds** | Individual pick odds $\ge 1.20$; combined odds $\ge 2.00$ | Odds: $1.63 \times 1.54 = \mathbf{2.51}$ | **PASS** |
| **Gate 5: Probability Floor** | Main ticket compound probability $\ge 50.0\%$ | Compound Probability = $\mathbf{56.5\%}$ | **PASS** |
| **Gate 6: Reserve Squad Restriction** | Straight 1X2 prohibited on academy/reserve squads | Both QPR & Lincoln are senior first-teams | **PASS** |
| **Gate 7: League Integrity** | Must originate from Tier 1 or Tier 2 corridors | Championship = **TIER 1/2** | **PASS** |

---

## 6. CONCLUSION & STAKE ASSIGNMENT

- **Recommendation**: Deploy active 2-leg accumulator ticket `S-4-v4.0`.
- **Recommended Stake**: **375 FCFA**
- **Target Odds**: **2.51**
- **Potential Net Profit**: **+566.25 FCFA** (Total Return: 941.25 FCFA)
- **Companion Catalog**: All 14 evaluated matches archived in `betting-data/november/candidates_2026-11-07.json`.

