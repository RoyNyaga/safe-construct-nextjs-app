# ROY BETTING ENGINE — MATCH EVALUATION REPORT
**Model Version**: 3.0 (`roys_betting_engine_BTS_O2-5`)  
**Evaluation Date**: 2026-11-02  
**Evaluation Methodology**: Multi-Market Dual-Baseline Poisson Framework (`model_3.0.md` & `selection_process.md`)  
**Markets Evaluated**: Over 1.5 Goals, Over 2.5 Goals, Both Teams to Score (BTTS Yes), Under 3.5 Goals  
**Candidate Policy**: High-Quality Filtering (Low-probability and one-sided low-DCI fixtures strictly excluded)

---

## 1. Evaluation Decision & Comparison Matrix

| Rank | Match | Market & Odds | Model Prob | Break-Even | Value Edge | EV | DCI (Openness) | Verdict | Selection Role |
| :---: | :--- | :--- | :---: | :---: | :---: | :---: | :---: | :---: | :--- |
| **1** | **Jong FC Utrecht vs FC Dordrecht** | **Over 2.5 @ 1.43** | **93.7%** | 69.9% | **+23.8 pp** | **+0.340** | **0.94** | **SELECT** | **MAIN SELECTION 1** |
| **2** | **Sassuolo vs ACF Fiorentina** | **BTTS Yes @ 1.45** | **87.9%** | 69.0% | **+18.9 pp** | **+0.275** | **0.80** | **SELECT** | **MAIN SELECTION 2** |
| **3** | **Stade Reims vs Sochaux** | **Over 1.5 @ 1.23** | **93.2%** | 81.3% | **+11.9 pp** | **+0.146** | **0.58** | **SELECT** | **Top Alternative 1** |
| **4** | **Real Oviedo vs UD Las Palmas** | **Over 1.5 @ 1.27** | **88.8%** | 78.7% | **+10.1 pp** | **+0.128** | **0.60** | **SELECT** | **Top Alternative 2** |
| **5** | **Red Star FC vs Nancy Lorraine** | **Over 1.5 @ 1.29** | **86.3%** | 77.5% | **+8.8 pp** | **+0.113** | **0.91** | **SELECT** | **Top Alternative 3** |
| **6** | **Portland Timbers vs Houston Dynamo** | **BTTS Yes @ 1.58** | **68.1%** | 63.3% | **+4.8 pp** | **+0.076** | **0.96** | **SELECT** | **Top Alternative 4** |

---

## 2. In-Depth Match Statistical Breakdowns

### Match 1: Jong FC Utrecht vs FC Dordrecht
- **Competition**: Netherlands — Eerste Divisie | Date: 2026-11-02
- **Venue Form**:
  - Jong FC Utrecht (Home @ Home): 6 matches | 11 GF (1.83 / game) | 16 GA (2.67 / game)
  - FC Dordrecht (Away @ Away): 6 matches | 9 GF (1.50 / game) | 17 GA (2.83 / game)
- **Season Overall (Macro)**:
  - Jong FC Utrecht: 12 matches | 19 GF (1.58 / game) | 31 GA (2.58 / game)
  - FC Dordrecht: 12 matches | 16 GF (1.33 / game) | 31 GA (2.58 / game)
- **Poisson Formulation**:
  - Live Baselines (Eerste Divisie): Home avg 1.68, Away avg 1.38
  - Lambda Home: 3.083 | Lambda Away: 2.902 | **Total Expected Goals: 5.985**
  - **Dual Contribution Index (DCI)**: **0.94** *(Near-Perfect Balance)*
- **Multi-Market Matrix**:
  - Over 1.5 Goals: **98.2%** (Historical: 98.4%, Delta: 0.2 pp `very_high`)
  - **Over 2.5 Goals**: **93.7%** vs Break-Even 69.9% @ 1.43 odds (**Edge +23.8 pp, EV +0.340**)
  - Both Teams to Score (BTTS Yes): **90.2%** vs Break-Even 72.5% @ 1.38 odds (**Edge +17.7 pp, EV +0.245**)
  - Under 3.5 Goals: 15.2% (Toxic)
- **Selection Recommendation**: **Over 2.5 @ 1.43** (or BTTS Yes @ 1.38). Unmatched offensive tempo and dual defensive vulnerability.

---

### Match 2: US Sassuolo vs ACF Fiorentina
- **Competition**: Italy — Serie A | Date: 2026-11-02
- **Venue Form**:
  - Sassuolo (Home @ Home): 4 matches | 7 GF (1.75 / game) | 9 GA (2.25 / game)
  - Fiorentina (Away @ Away): 4 matches | 5 GF (1.25 / game) | 10 GA (2.50 / game)
- **Season Overall (Macro)**:
  - Sassuolo: 9 matches | 14 GF (1.56 / game) | 22 GA (2.44 / game)
  - Fiorentina: 9 matches | 11 GF (1.22 / game) | 21 GA (2.33 / game)
- **Poisson Formulation**:
  - Live Baselines (Serie A): Home avg 1.40, Away avg 1.12
  - Lambda Home: 3.125 | Lambda Away: 2.511 | **Total Expected Goals: 5.636**
  - **Dual Contribution Index (DCI)**: **0.80** *(Outstanding Dual Scoring Threat)*
- **Multi-Market Matrix**:
  - Over 1.5 Goals: **97.6%** @ 1.15 odds
  - Over 2.5 Goals: **92.0%** @ 1.52 odds (**Edge +26.2 pp, EV +0.398**)
  - **Both Teams to Score (BTTS Yes)**: **87.9%** vs Break-Even 69.0% @ 1.45 odds (**Edge +18.9 pp, EV +0.275**)
  - Under 3.5 Goals: 18.5%
- **Selection Recommendation**: **BTTS Yes @ 1.45** (or Over 2.5 @ 1.52). Both teams possess severe defensive instability, conceding over 2.2 goals per match while regularly scoring.

---

### Match 3: Stade Reims vs Sochaux Montbeliard
- **Competition**: France — Ligue 2 | Date: 2026-11-02
- **Venue Form**:
  - Reims (Home @ Home): 5 matches | 10 GF (2.00 / game) | 6 GA (1.20 / game)
  - Sochaux (Away @ Away): 5 matches | 7 GF (1.40 / game) | 9 GA (1.80 / game)
- **Poisson Formulation**:
  - Live Baselines: Home avg 1.30, Away avg 1.05
  - Lambda Home: 2.769 | Lambda Away: 1.600 | **Total Expected Goals: 4.369**
  - **Dual Contribution Index (DCI)**: **0.58**
- **Multi-Market Matrix**:
  - **Over 1.5 Goals**: **93.2%** vs Break-Even 81.3% @ 1.23 odds (**Edge +11.9 pp, EV +0.146**)
  - Over 2.5 Goals: 80.4% vs Break-Even 57.8% @ 1.73 odds (**Edge +22.6 pp, EV +0.391**)
  - BTTS Yes: 74.8% @ 1.70 odds (**Edge +16.0 pp, EV +0.272**)
- **Selection Recommendation**: Held as **Top Alternative 1** (Over 1.5 @ 1.23).

---

### Match 4: Real Oviedo vs UD Las Palmas
- **Competition**: Spain — Segunda División | Date: 2026-11-02
- **Venue Form**:
  - Real Oviedo (Home @ Home): 5 matches | 8 GF (1.60 / game) | 5 GA (1.00 / game)
  - UD Las Palmas (Away @ Away): 6 matches | 8 GF (1.33 / game) | 11 GA (1.83 / game)
- **Poisson Formulation**:
  - Live Baselines: Home avg 1.25, Away avg 0.95
  - Lambda Home: 2.342 | Lambda Away: 1.400 | **Total Expected Goals: 3.742**
  - **Dual Contribution Index (DCI)**: **0.60**
- **Multi-Market Matrix**:
  - **Over 1.5 Goals**: **88.8%** vs Break-Even 78.7% @ 1.27 odds (**Edge +10.1 pp, EV +0.128**)
  - Over 2.5 Goals: 72.2% vs Break-Even 54.1% @ 1.85 odds (**Edge +18.1 pp, EV +0.336**)
  - BTTS Yes: 68.1% vs Break-Even 53.2% @ 1.88 odds (**Edge +14.9 pp, EV +0.280**)
- **Selection Recommendation**: Held as **Top Alternative 2** (Over 1.5 @ 1.27).

---

### Match 5: Red Star FC vs AS Nancy-Lorraine
- **Competition**: France — Ligue 2 | Date: 2026-11-02
- **Venue Form**:
  - Red Star FC (Home @ Home): 5 matches | 9 GF (1.80 / game) | 6 GA (1.20 / game)
  - AS Nancy (Away @ Away): 5 matches | 8 GF (1.60 / game) | 6 GA (1.20 / game)
- **Poisson Formulation**:
  - Live Baselines: Home avg 1.30, Away avg 1.05
  - Lambda Home: 1.662 | Lambda Away: 1.829 | **Total Expected Goals: 3.491**
  - **Dual Contribution Index (DCI)**: **0.91** *(Extremely Open)*
- **Multi-Market Matrix**:
  - **Over 1.5 Goals**: **86.3%** vs Break-Even 77.5% @ 1.29 odds (**Edge +8.8 pp, EV +0.113**)
  - Over 2.5 Goals: 67.7% vs Break-Even 53.5% @ 1.87 odds (**Edge +14.2 pp, EV +0.266**)
  - BTTS Yes: 68.0% vs Break-Even 57.1% @ 1.75 odds (**Edge +10.9 pp, EV +0.190**)
- **Selection Recommendation**: Held as **Top Alternative 3** (Over 1.5 @ 1.29).

---

### Match 6: Portland Timbers vs Houston Dynamo
- **Competition**: USA — Major League Soccer | Date: 2026-11-02
- **Venue Form**:
  - Portland (Home @ Home): 16 matches | 34 GF (2.13 / game) | 26 GA (1.63 / game)
  - Houston (Away @ Away): 16 matches | 21 GF (1.31 / game) | 22 GA (1.38 / game)
- **Poisson Formulation**:
  - Live Baselines: Home avg 1.65, Away avg 1.25
  - Lambda Home: 1.782 | Lambda Away: 1.708 | **Total Expected Goals: 3.490**
  - **Dual Contribution Index (DCI)**: **0.96** *(Balanced High-Tempo)*
- **Multi-Market Matrix**:
  - Over 1.5 Goals: **86.3%** @ 1.18 odds
  - **Both Teams to Score (BTTS Yes)**: **68.1%** vs Break-Even 63.3% @ 1.58 odds (**Edge +4.8 pp, EV +0.076**)
  - Over 2.5 Goals: 68.3% @ 1.57 odds (**Edge +4.6 pp, EV +0.072**)
- **Selection Recommendation**: Held as **Top Alternative 4** (BTTS Yes @ 1.58).

---

## 3. Excluded Matches & Rejection Audits

Per your directive to **omit low-probability and unviable matches from the candidate catalog**, the following fixtures were disqualified:
- **Newcastle vs Everton**: $\text{DCI} = 0.40$ (below 0.45 floor for O2.5). Everton low away scoring ($1.00$ GF/G). Over 1.5 @ 1.22 has negative edge (-6.8 pp).
- **Benfica vs Alverca**: $\text{DCI} = 0.15$ (severe one-sided asymmetry). Benfica carries $87\%$ of expected goals. Over 1.5 priced at only 1.09.
- **Gil Vicente vs Vitoria Guimaraes**: Extreme low scoring (Gil Vicente 0.89 GF/G, 0.78 GA/G). `STRONG_DEFENSIVE_MATCHUP` risk.
- **Argentina Liga Profesional (Lanus, Defensa y Justicia, Platense)**: League scoring average is extremely suppressed ($<1.95$ total goals/match), rendering Over/BTTS markets mathematically disadvantageous.
- **Real Valladolid vs Leganes**: Leganes averages only $0.64$ GF/G (`LOW_AWAY_SCORING`). Low DCI ($0.31$).

