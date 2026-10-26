# ROY BETTING ENGINE — MATCH EVALUATION REPORT
**Model Version**: 2.1 (Over 1.5 Goals Focused — Dual-Baseline Protocol)
**Evaluation Date**: 2026-10-26
**Total Fixtures Evaluated**: 26 matches
**Source Odds Provider**: Betmomo
**Methodology Enforcement**: Strict Venue-Specific Home/Away Protocol (Section 5.0), Dual-Baseline Protocol (Section 5.1A), & Hard-Stop Rule

---

## 1. Walsall vs Salford City
- **Fixture**: England — League Two | Date: 2026-10-26
- **Data Quality**: **Verified (Dual-Baseline Venue-Specific Analysis)**

### Pre-Match Statistical Matchup Comparison
| Metric | Walsall (Home Venue) | Salford City (Away Venue) |
| :--- | :---: | :---: |
| **League Standing** | 5th | 1st |
| **Venue Matches Played** | 5 | 6 |
| **Overall Matches Played** | 11 | 12 |
| **Venue Goals Scored (GF)** | 8 (1.60 / game) | 12 (2.00 / game) |
| **Venue Goals Conceded (GA)** | 2 (0.40 / game) | 9 (1.50 / game) |
| **Venue Goal Difference (GD)** | +6 | +3 |
| **Overall Record (GF / GA)** | 16 GF / 7 GA | 19 GF / 12 GA |

### Goal Profiles & Strength Indices (Dual-Baseline)
- **Primary Live Baselines (England League Two 2026/27)**: Home scoring avg 1.52, Away scoring avg 1.06
  - **Home Attacking Strength**: 1.60 ÷ 1.52 = 1.05
  - **Away Defensive Weakness**: 1.50 ÷ 1.52 = 0.99
  - **Away Attacking Strength**: 2.00 ÷ 1.06 = 1.89
  - **Home Defensive Weakness**: 0.40 ÷ 1.06 = 0.38
- **Historical Benchmark Baselines (Locked Catalog)**: Home scoring avg 1.45, Away scoring avg 1.15

### Expected Goals (λ) & Poisson Formulation
- **Primary Live Model**:
  - λ_home: 1.5789 | λ_away: 0.7547 | **λ_total: 2.3337**
  - **Poisson P(Over 1.5)**: **67.7%** (Weak for the Over 1.5-focused strategy)
  - Poisson P(Under 1.5): 32.3%
- **Companion Historical Benchmark**:
  - Hist λ_home: 1.6552 | Hist λ_away: 0.6957 | **Hist λ_total: 2.3508**
  - **Historical P(Over 1.5)**: **68.1%**
- **Dual-Baseline Alignment**: `[VERY HIGH ALIGNMENT]` (0.39 pp delta)
  - *Interpretation*: Near-perfect consensus between live season and historical multi-year benchmark (Delta ≤ 1.5 pp). Maximum statistical stability.

### Market Pricing & Value Analysis
- **Offered Odds**: 1.20
- **Bookmaker Break-Even Probability**: 83.3%
- **Value Edge**: -15.7 percentage points (`[VERY LOW EDGE]`)
- **Expected Value (EV)**: -0.188 per unit staked

### Warnings & Negative Checks
- **`TEAM_NEWS_UNVERIFIED`** [LOW] (NEUTRAL / CONTEXTUAL): Pre-match team news and confirmed starting lineups remain unverified.
  - *Evidence*: Lineups have not been locked in; rotation or late injury risk unconfirmed.

### Final Decision Verdict: **NO BET**
> NO BET. Model estimates an 67.7% Over 1.5 probability versus bookmaker break-even of 83.3% at 1.2 odds (-15.7 edge, -0.188 EV). Estimated Over 1.5 probability (67.7%) is well below the 70% threshold for the Over 1.5 strategy.

---

## 2. Sevilla vs Osasuna
- **Fixture**: Spain — La Liga | Date: 2026-10-26
- **Data Quality**: **Verified (Dual-Baseline Venue-Specific Analysis)**

### Pre-Match Statistical Matchup Comparison
| Metric | Sevilla (Home Venue) | Osasuna (Away Venue) |
| :--- | :---: | :---: |
| **League Standing** | 6th | 10th |
| **Venue Matches Played** | 4 | 4 |
| **Overall Matches Played** | 9 | 9 |
| **Venue Goals Scored (GF)** | 5 (1.25 / game) | 6 (1.50 / game) |
| **Venue Goals Conceded (GA)** | 7 (1.75 / game) | 15 (3.75 / game) |
| **Venue Goal Difference (GD)** | -2 | -9 |
| **Overall Record (GF / GA)** | 14 GF / 16 GA | 10 GF / 18 GA |

### Goal Profiles & Strength Indices (Dual-Baseline)
- **Primary Live Baselines (Spain La Liga 2026/27)**: Home scoring avg 1.42, Away scoring avg 1.12
  - **Home Attacking Strength**: 1.25 ÷ 1.42 = 0.88
  - **Away Defensive Weakness**: 3.75 ÷ 1.42 = 2.64
  - **Away Attacking Strength**: 1.50 ÷ 1.12 = 1.34
  - **Home Defensive Weakness**: 1.75 ÷ 1.12 = 1.56
- **Historical Benchmark Baselines (Locked Catalog)**: Home scoring avg 1.45, Away scoring avg 1.10

### Expected Goals (λ) & Poisson Formulation
- **Primary Live Model**:
  - λ_home: 3.3011 | λ_away: 2.3437 | **λ_total: 5.6448**
  - **Poisson P(Over 1.5)**: **97.7%** (Extremely strong)
  - Poisson P(Under 1.5): 2.3%
- **Companion Historical Benchmark**:
  - Hist λ_home: 3.2328 | Hist λ_away: 2.3864 | **Hist λ_total: 5.6191**
  - **Historical P(Over 1.5)**: **97.6%**
- **Dual-Baseline Alignment**: `[VERY HIGH ALIGNMENT]` (0.05 pp delta)
  - *Interpretation*: Near-perfect consensus between live season and historical multi-year benchmark (Delta ≤ 1.5 pp). Maximum statistical stability.

### Market Pricing & Value Analysis
- **Offered Odds**: 1.38
- **Bookmaker Break-Even Probability**: 72.5%
- **Value Edge**: +25.2 percentage points (`[VERY HIGH EDGE]`)
- **Expected Value (EV)**: +0.348 per unit staked

### Warnings & Negative Checks
- **`SMALL_SAMPLE`** [MEDIUM] (CONTRADICTORY / INDIRECT): Limited sample size of only 4 matches.
  - *Evidence*: Sample size below the 5-match threshold for statistical stability (4 vs 4).
- **`TEAM_NEWS_UNVERIFIED`** [LOW] (NEUTRAL / CONTEXTUAL): Pre-match team news and confirmed starting lineups remain unverified.
  - *Evidence*: Lineups have not been locked in; rotation or late injury risk unconfirmed.

### Final Decision Verdict: **SELECT**
> SELECT. Model estimates an 97.7% Over 1.5 probability versus bookmaker break-even of 72.5% at 1.38 odds (+25.2 edge, +0.348 EV). Strong probability (97.7%) supported by positive edge (+25.2pp, EV +0.348) and acceptable risk profile.

---

## 3. FC Andorra vs Burgos CF
- **Fixture**: Spain — Segunda División | Date: 2026-10-26
- **Data Quality**: **Verified (Dual-Baseline Venue-Specific Analysis)**

### Pre-Match Statistical Matchup Comparison
| Metric | FC Andorra (Home Venue) | Burgos CF (Away Venue) |
| :--- | :---: | :---: |
| **League Standing** | 14th | 11th |
| **Venue Matches Played** | 5 | 4 |
| **Overall Matches Played** | 9 | 10 |
| **Venue Goals Scored (GF)** | 8 (1.60 / game) | 3 (0.75 / game) |
| **Venue Goals Conceded (GA)** | 8 (1.60 / game) | 4 (1.00 / game) |
| **Venue Goal Difference (GD)** | +0 | -1 |
| **Overall Record (GF / GA)** | 13 GF / 15 GA | 13 GF / 10 GA |

### Goal Profiles & Strength Indices (Dual-Baseline)
- **Primary Live Baselines (Spain Segunda División 2026/27)**: Home scoring avg 1.30, Away scoring avg 0.95
  - **Home Attacking Strength**: 1.60 ÷ 1.30 = 1.23
  - **Away Defensive Weakness**: 1.00 ÷ 1.30 = 0.77
  - **Away Attacking Strength**: 0.75 ÷ 0.95 = 0.79
  - **Home Defensive Weakness**: 1.60 ÷ 0.95 = 1.68
- **Historical Benchmark Baselines (Locked Catalog)**: Home scoring avg 1.35, Away scoring avg 1.00

### Expected Goals (λ) & Poisson Formulation
- **Primary Live Model**:
  - λ_home: 1.2308 | λ_away: 1.2632 | **λ_total: 2.4939**
  - **Poisson P(Over 1.5)**: **71.2%** (Moderate)
  - Poisson P(Under 1.5): 28.8%
- **Companion Historical Benchmark**:
  - Hist λ_home: 1.1852 | Hist λ_away: 1.2000 | **Hist λ_total: 2.3852**
  - **Historical P(Over 1.5)**: **68.8%**
- **Dual-Baseline Alignment**: `[HIGH ALIGNMENT]` (2.32 pp delta)
  - *Interpretation*: Strong agreement between live season and historical benchmark (Delta ≤ 3.0 pp). High mathematical confidence.

### Market Pricing & Value Analysis
- **Offered Odds**: 1.30
- **Bookmaker Break-Even Probability**: 76.9%
- **Value Edge**: -5.8 percentage points (`[LOW EDGE]`)
- **Expected Value (EV)**: -0.075 per unit staked

### Warnings & Negative Checks
- **`SMALL_SAMPLE`** [MEDIUM] (CONTRADICTORY / INDIRECT): Limited sample size of only 4 matches.
  - *Evidence*: Sample size below the 5-match threshold for statistical stability (5 vs 4).
- **`LOW_AWAY_SCORING`** [MEDIUM] (CONTRADICTORY / DIRECT): Burgos CF averages only 0.75 goals per game, increasing shutout risk.
  - *Evidence*: Burgos CF away scoring average is 0.75 GF/game, placing heavy reliance on FC Andorra to produce goals.
- **`TEAM_NEWS_UNVERIFIED`** [LOW] (NEUTRAL / CONTEXTUAL): Pre-match team news and confirmed starting lineups remain unverified.
  - *Evidence*: Lineups have not been locked in; rotation or late injury risk unconfirmed.

### Final Decision Verdict: **CAUTION**
> CAUTION. Model estimates an 71.2% Over 1.5 probability versus bookmaker break-even of 76.9% at 1.3 odds (-5.8 edge, -0.075 EV). Multiple medium warnings (SMALL_SAMPLE, LOW_AWAY_SCORING) warrant measured caution.

---

## 4. Paris Saint-Germain vs Olympique Lyonnais
- **Fixture**: France — Ligue 1 | Date: 2026-10-26
- **Data Quality**: **Verified (Dual-Baseline Venue-Specific Analysis)**

### Pre-Match Statistical Matchup Comparison
| Metric | Paris Saint-Germain (Home Venue) | Olympique Lyonnais (Away Venue) |
| :--- | :---: | :---: |
| **League Standing** | 2nd | 4th |
| **Venue Matches Played** | 2 | 3 |
| **Overall Matches Played** | 7 | 7 |
| **Venue Goals Scored (GF)** | 4 (2.00 / game) | 3 (1.00 / game) |
| **Venue Goals Conceded (GA)** | 3 (1.50 / game) | 2 (0.67 / game) |
| **Venue Goal Difference (GD)** | +1 | +1 |
| **Overall Record (GF / GA)** | 14 GF / 9 GA | 13 GF / 5 GA |

### Goal Profiles & Strength Indices (Dual-Baseline)
- **Primary Live Baselines (France Ligue 1 2026/27)**: Home scoring avg 1.62, Away scoring avg 1.28
  - **Home Attacking Strength**: 2.00 ÷ 1.62 = 1.23
  - **Away Defensive Weakness**: 0.67 ÷ 1.62 = 0.41
  - **Away Attacking Strength**: 1.00 ÷ 1.28 = 0.78
  - **Home Defensive Weakness**: 1.50 ÷ 1.28 = 1.17
- **Historical Benchmark Baselines (Locked Catalog)**: Home scoring avg 1.50, Away scoring avg 1.20

### Expected Goals (λ) & Poisson Formulation
- **Primary Live Model**:
  - λ_home: 0.8272 | λ_away: 1.1719 | **λ_total: 1.9990**
  - **Poisson P(Over 1.5)**: **59.4%** (Weak for the Over 1.5-focused strategy)
  - Poisson P(Under 1.5): 40.6%
- **Companion Historical Benchmark**:
  - Hist λ_home: 0.8889 | Hist λ_away: 1.2500 | **Hist λ_total: 2.1433**
  - **Historical P(Over 1.5)**: **63.1%**
- **Dual-Baseline Alignment**: `[MEDIUM ALIGNMENT]` (3.77 pp delta)
  - *Interpretation*: Moderate drift reflecting expected mid-season scoring environment evolution. Operational decisions remain anchored to the primary model.

### Market Pricing & Value Analysis
- **Offered Odds**: 1.11
- **Bookmaker Break-Even Probability**: 90.1%
- **Value Edge**: -30.7 percentage points (`[VERY LOW EDGE]`)
- **Expected Value (EV)**: -0.341 per unit staked

### Warnings & Negative Checks
- **`SMALL_SAMPLE`** [CRITICAL] (CONTRADICTORY / DIRECT): Extreme small-sample distortion: only 2 matches played by one or both teams.
  - *Evidence*: Paris Saint-Germain played 2 matches; Olympique Lyonnais played 3 matches.
- **`TEAM_NEWS_UNVERIFIED`** [LOW] (NEUTRAL / CONTEXTUAL): Pre-match team news and confirmed starting lineups remain unverified.
  - *Evidence*: Lineups have not been locked in; rotation or late injury risk unconfirmed.

### Final Decision Verdict: **NO BET**
> NO BET. Model estimates an 59.4% Over 1.5 probability versus bookmaker break-even of 90.1% at 1.11 odds (-30.7 edge, -0.341 EV). Extreme small-sample distortion or critical unresolved risk renders the statistical signal uncalibrated.

---

## 5. Montpellier vs Red Star FC
- **Fixture**: France — Ligue 2 | Date: 2026-10-26
- **Data Quality**: **Verified (Dual-Baseline Venue-Specific Analysis)**

### Pre-Match Statistical Matchup Comparison
| Metric | Montpellier (Home Venue) | Red Star FC (Away Venue) |
| :--- | :---: | :---: |
| **League Standing** | 8th | 6th |
| **Venue Matches Played** | 4 | 5 |
| **Overall Matches Played** | 9 | 9 |
| **Venue Goals Scored (GF)** | 3 (0.75 / game) | 10 (2.00 / game) |
| **Venue Goals Conceded (GA)** | 1 (0.25 / game) | 5 (1.00 / game) |
| **Venue Goal Difference (GD)** | +2 | +5 |
| **Overall Record (GF / GA)** | 11 GF / 5 GA | 12 GF / 10 GA |

### Goal Profiles & Strength Indices (Dual-Baseline)
- **Primary Live Baselines (France Ligue 2 2026/27)**: Home scoring avg 1.32, Away scoring avg 1.08
  - **Home Attacking Strength**: 0.75 ÷ 1.32 = 0.57
  - **Away Defensive Weakness**: 1.00 ÷ 1.32 = 0.76
  - **Away Attacking Strength**: 2.00 ÷ 1.08 = 1.85
  - **Home Defensive Weakness**: 0.25 ÷ 1.08 = 0.23
- **Historical Benchmark Baselines (Locked Catalog)**: Home scoring avg 1.35, Away scoring avg 1.05

### Expected Goals (λ) & Poisson Formulation
- **Primary Live Model**:
  - λ_home: 0.5682 | λ_away: 0.4630 | **λ_total: 1.0311**
  - **Poisson P(Over 1.5)**: **27.6%** (Weak for the Over 1.5-focused strategy)
  - Poisson P(Under 1.5): 72.4%
- **Companion Historical Benchmark**:
  - Hist λ_home: 0.5556 | Hist λ_away: 0.4762 | **Hist λ_total: 1.0317**
  - **Historical P(Over 1.5)**: **27.6%**
- **Dual-Baseline Alignment**: `[VERY HIGH ALIGNMENT]` (0.02 pp delta)
  - *Interpretation*: Near-perfect consensus between live season and historical multi-year benchmark (Delta ≤ 1.5 pp). Maximum statistical stability.

### Market Pricing & Value Analysis
- **Offered Odds**: 1.25
- **Bookmaker Break-Even Probability**: 80.0%
- **Value Edge**: -52.4 percentage points (`[VERY LOW EDGE]`)
- **Expected Value (EV)**: -0.655 per unit staked

### Warnings & Negative Checks
- **`SMALL_SAMPLE`** [MEDIUM] (CONTRADICTORY / INDIRECT): Limited sample size of only 4 matches.
  - *Evidence*: Sample size below the 5-match threshold for statistical stability (4 vs 5).
- **`LOW_HOME_SCORING`** [MEDIUM] (CONTRADICTORY / DIRECT): Montpellier home scoring rate is low (0.75 GF/game).
  - *Evidence*: Montpellier averages under 1.0 goal scored per match across the observed fixtures.
- **`TEAM_NEWS_UNVERIFIED`** [LOW] (NEUTRAL / CONTEXTUAL): Pre-match team news and confirmed starting lineups remain unverified.
  - *Evidence*: Lineups have not been locked in; rotation or late injury risk unconfirmed.

### Final Decision Verdict: **NO BET**
> NO BET. Model estimates an 27.6% Over 1.5 probability versus bookmaker break-even of 80.0% at 1.25 odds (-52.4 edge, -0.655 EV). Estimated Over 1.5 probability (27.6%) is well below the 70% threshold for the Over 1.5 strategy.

---

## 6. US Boulogne vs Stade de Reims
- **Fixture**: France — Ligue 2 | Date: 2026-10-26
- **Data Quality**: **Verified (Dual-Baseline Venue-Specific Analysis)**

### Pre-Match Statistical Matchup Comparison
| Metric | US Boulogne (Home Venue) | Stade de Reims (Away Venue) |
| :--- | :---: | :---: |
| **League Standing** | 16th | 3rd |
| **Venue Matches Played** | 4 | 4 |
| **Overall Matches Played** | 9 | 9 |
| **Venue Goals Scored (GF)** | 2 (0.50 / game) | 6 (1.50 / game) |
| **Venue Goals Conceded (GA)** | 3 (0.75 / game) | 4 (1.00 / game) |
| **Venue Goal Difference (GD)** | -1 | +2 |
| **Overall Record (GF / GA)** | 6 GF / 6 GA | 19 GF / 11 GA |

### Goal Profiles & Strength Indices (Dual-Baseline)
- **Primary Live Baselines (France Ligue 2 2026/27)**: Home scoring avg 1.32, Away scoring avg 1.08
  - **Home Attacking Strength**: 0.50 ÷ 1.32 = 0.38
  - **Away Defensive Weakness**: 1.00 ÷ 1.32 = 0.76
  - **Away Attacking Strength**: 1.50 ÷ 1.08 = 1.39
  - **Home Defensive Weakness**: 0.75 ÷ 1.08 = 0.69
- **Historical Benchmark Baselines (Locked Catalog)**: Home scoring avg 1.35, Away scoring avg 1.05

### Expected Goals (λ) & Poisson Formulation
- **Primary Live Model**:
  - λ_home: 0.3788 | λ_away: 1.0417 | **λ_total: 1.4205**
  - **Poisson P(Over 1.5)**: **41.5%** (Weak for the Over 1.5-focused strategy)
  - Poisson P(Under 1.5): 58.5%
- **Companion Historical Benchmark**:
  - Hist λ_home: 0.3704 | Hist λ_away: 1.0714 | **Hist λ_total: 1.4418**
  - **Historical P(Over 1.5)**: **42.2%**
- **Dual-Baseline Alignment**: `[VERY HIGH ALIGNMENT]` (0.73 pp delta)
  - *Interpretation*: Near-perfect consensus between live season and historical multi-year benchmark (Delta ≤ 1.5 pp). Maximum statistical stability.

### Market Pricing & Value Analysis
- **Offered Odds**: 1.33
- **Bookmaker Break-Even Probability**: 75.2%
- **Value Edge**: -33.7 percentage points (`[VERY LOW EDGE]`)
- **Expected Value (EV)**: -0.448 per unit staked

### Warnings & Negative Checks
- **`SMALL_SAMPLE`** [MEDIUM] (CONTRADICTORY / INDIRECT): Limited sample size of only 4 matches.
  - *Evidence*: Sample size below the 5-match threshold for statistical stability (4 vs 4).
- **`LOW_HOME_SCORING`** [HIGH] (CONTRADICTORY / DIRECT): US Boulogne home scoring rate is low (0.50 GF/game).
  - *Evidence*: US Boulogne averages under 1.0 goal scored per match across the observed fixtures.
- **`TEAM_NEWS_UNVERIFIED`** [LOW] (NEUTRAL / CONTEXTUAL): Pre-match team news and confirmed starting lineups remain unverified.
  - *Evidence*: Lineups have not been locked in; rotation or late injury risk unconfirmed.

### Final Decision Verdict: **NO BET**
> NO BET. Model estimates an 41.5% Over 1.5 probability versus bookmaker break-even of 75.2% at 1.33 odds (-33.7 edge, -0.448 EV). Estimated Over 1.5 probability (41.5%) is well below the 70% threshold for the Over 1.5 strategy.

---

## 7. Santa Clara vs SL Benfica
- **Fixture**: Portugal — Liga Portugal | Date: 2026-10-26
- **Data Quality**: **Verified (Dual-Baseline Venue-Specific Analysis)**

### Pre-Match Statistical Matchup Comparison
| Metric | Santa Clara (Home Venue) | SL Benfica (Away Venue) |
| :--- | :---: | :---: |
| **League Standing** | 5th | 2nd |
| **Venue Matches Played** | 4 | 4 |
| **Overall Matches Played** | 8 | 8 |
| **Venue Goals Scored (GF)** | 7 (1.75 / game) | 15 (3.75 / game) |
| **Venue Goals Conceded (GA)** | 2 (0.50 / game) | 3 (0.75 / game) |
| **Venue Goal Difference (GD)** | +5 | +12 |
| **Overall Record (GF / GA)** | 13 GF / 6 GA | 22 GF / 6 GA |

### Goal Profiles & Strength Indices (Dual-Baseline)
- **Primary Live Baselines (Portugal Liga Portugal 2026/27)**: Home scoring avg 1.42, Away scoring avg 1.18
  - **Home Attacking Strength**: 1.75 ÷ 1.42 = 1.23
  - **Away Defensive Weakness**: 0.75 ÷ 1.42 = 0.53
  - **Away Attacking Strength**: 3.75 ÷ 1.18 = 3.18
  - **Home Defensive Weakness**: 0.50 ÷ 1.18 = 0.42
- **Historical Benchmark Baselines (Locked Catalog)**: Home scoring avg 1.45, Away scoring avg 1.15

### Expected Goals (λ) & Poisson Formulation
- **Primary Live Model**:
  - λ_home: 0.9243 | λ_away: 1.5890 | **λ_total: 2.5133**
  - **Poisson P(Over 1.5)**: **71.5%** (Moderate)
  - Poisson P(Under 1.5): 28.5%
- **Companion Historical Benchmark**:
  - Hist λ_home: 0.9052 | Hist λ_away: 1.6304 | **Hist λ_total: 2.5356**
  - **Historical P(Over 1.5)**: **72.0%**
- **Dual-Baseline Alignment**: `[VERY HIGH ALIGNMENT]` (0.45 pp delta)
  - *Interpretation*: Near-perfect consensus between live season and historical multi-year benchmark (Delta ≤ 1.5 pp). Maximum statistical stability.

### Market Pricing & Value Analysis
- **Offered Odds**: 1.27
- **Bookmaker Break-Even Probability**: 78.7%
- **Value Edge**: -7.2 percentage points (`[LOW EDGE]`)
- **Expected Value (EV)**: -0.091 per unit staked

### Warnings & Negative Checks
- **`SMALL_SAMPLE`** [MEDIUM] (CONTRADICTORY / INDIRECT): Limited sample size of only 4 matches.
  - *Evidence*: Sample size below the 5-match threshold for statistical stability (4 vs 4).
- **`STRONG_DEFENSIVE_MATCHUP`** [HIGH] (CONTRADICTORY / DIRECT): Both teams maintain exceptionally tight defensive records.
  - *Evidence*: Santa Clara concedes 0.50 GA/game and SL Benfica concedes 0.75 GA/game, elevating 0-0 and 1-0 probability.
- **`TEAM_NEWS_UNVERIFIED`** [LOW] (NEUTRAL / CONTEXTUAL): Pre-match team news and confirmed starting lineups remain unverified.
  - *Evidence*: Lineups have not been locked in; rotation or late injury risk unconfirmed.

### Final Decision Verdict: **CAUTION**
> CAUTION. Model estimates an 71.5% Over 1.5 probability versus bookmaker break-even of 78.7% at 1.27 odds (-7.2 edge, -0.091 EV). Model probability (71.5%) is viable, but high contradictory warning (STRONG_DEFENSIVE_MATCHUP) requires caution.

---

## 8. SCU Torreense vs Amarante FC
- **Fixture**: Portugal — Liga Portugal 2 | Date: 2026-10-26
- **Data Quality**: **Verified (Dual-Baseline Venue-Specific Analysis)**

### Pre-Match Statistical Matchup Comparison
| Metric | SCU Torreense (Home Venue) | Amarante FC (Away Venue) |
| :--- | :---: | :---: |
| **League Standing** | 10th | 15th |
| **Venue Matches Played** | 3 | 3 |
| **Overall Matches Played** | 7 | 7 |
| **Venue Goals Scored (GF)** | 2 (0.67 / game) | 2 (0.67 / game) |
| **Venue Goals Conceded (GA)** | 5 (1.67 / game) | 5 (1.67 / game) |
| **Venue Goal Difference (GD)** | -3 | -3 |
| **Overall Record (GF / GA)** | 7 GF / 10 GA | 6 GF / 10 GA |

### Goal Profiles & Strength Indices (Dual-Baseline)
- **Primary Live Baselines (Portugal Liga Portugal 2 2026/27)**: Home scoring avg 1.30, Away scoring avg 1.08
  - **Home Attacking Strength**: 0.67 ÷ 1.30 = 0.51
  - **Away Defensive Weakness**: 1.67 ÷ 1.30 = 1.28
  - **Away Attacking Strength**: 0.67 ÷ 1.08 = 0.62
  - **Home Defensive Weakness**: 1.67 ÷ 1.08 = 1.54
- **Historical Benchmark Baselines (Locked Catalog)**: Home scoring avg 1.35, Away scoring avg 1.10

### Expected Goals (λ) & Poisson Formulation
- **Primary Live Model**:
  - λ_home: 0.8607 | λ_away: 1.0360 | **λ_total: 1.8967**
  - **Poisson P(Over 1.5)**: **56.5%** (Weak for the Over 1.5-focused strategy)
  - Poisson P(Under 1.5): 43.5%
- **Companion Historical Benchmark**:
  - Hist λ_home: 0.8230 | Hist λ_away: 1.0101 | **Hist λ_total: 1.8460**
  - **Historical P(Over 1.5)**: **55.1%**
- **Dual-Baseline Alignment**: `[VERY HIGH ALIGNMENT]` (1.46 pp delta)
  - *Interpretation*: Near-perfect consensus between live season and historical multi-year benchmark (Delta ≤ 1.5 pp). Maximum statistical stability.

### Market Pricing & Value Analysis
- **Offered Odds**: 1.32
- **Bookmaker Break-Even Probability**: 75.8%
- **Value Edge**: -19.2 percentage points (`[VERY LOW EDGE]`)
- **Expected Value (EV)**: -0.254 per unit staked

### Warnings & Negative Checks
- **`SMALL_SAMPLE`** [MEDIUM] (CONTRADICTORY / INDIRECT): Limited sample size of only 3 matches.
  - *Evidence*: Sample size below the 5-match threshold for statistical stability (3 vs 3).
- **`LOW_AWAY_SCORING`** [MEDIUM] (CONTRADICTORY / DIRECT): Amarante FC averages only 0.67 goals per game, increasing shutout risk.
  - *Evidence*: Amarante FC away scoring average is 0.67 GF/game, placing heavy reliance on SCU Torreense to produce goals.
- **`LOW_HOME_SCORING`** [MEDIUM] (CONTRADICTORY / DIRECT): SCU Torreense home scoring rate is low (0.67 GF/game).
  - *Evidence*: SCU Torreense averages under 1.0 goal scored per match across the observed fixtures.
- **`TEAM_NEWS_UNVERIFIED`** [LOW] (NEUTRAL / CONTEXTUAL): Pre-match team news and confirmed starting lineups remain unverified.
  - *Evidence*: Lineups have not been locked in; rotation or late injury risk unconfirmed.

### Final Decision Verdict: **NO BET**
> NO BET. Model estimates an 56.5% Over 1.5 probability versus bookmaker break-even of 75.8% at 1.32 odds (-19.2 edge, -0.254 EV). Estimated Over 1.5 probability (56.5%) is well below the 70% threshold for the Over 1.5 strategy.

---

## 9. Coritiba vs Grêmio
- **Fixture**: Brazil — Série A | Date: 2026-10-26
- **Data Quality**: **Verified (Dual-Baseline Venue-Specific Analysis)**

### Pre-Match Statistical Matchup Comparison
| Metric | Coritiba (Home Venue) | Grêmio (Away Venue) |
| :--- | :---: | :---: |
| **League Standing** | 12th | 18th |
| **Venue Matches Played** | 15 | 15 |
| **Overall Matches Played** | 31 | 31 |
| **Venue Goals Scored (GF)** | 20 (1.33 / game) | 9 (0.60 / game) |
| **Venue Goals Conceded (GA)** | 20 (1.33 / game) | 23 (1.53 / game) |
| **Venue Goal Difference (GD)** | +0 | -14 |
| **Overall Record (GF / GA)** | 38 GF / 49 GA | 34 GF / 44 GA |

### Goal Profiles & Strength Indices (Dual-Baseline)
- **Primary Live Baselines (Brazil Série A 2026/27)**: Home scoring avg 1.38, Away scoring avg 0.98
  - **Home Attacking Strength**: 1.33 ÷ 1.38 = 0.97
  - **Away Defensive Weakness**: 1.53 ÷ 1.38 = 1.11
  - **Away Attacking Strength**: 0.60 ÷ 0.98 = 0.61
  - **Home Defensive Weakness**: 1.33 ÷ 0.98 = 1.36
- **Historical Benchmark Baselines (Locked Catalog)**: Home scoring avg 1.40, Away scoring avg 1.00

### Expected Goals (λ) & Poisson Formulation
- **Primary Live Model**:
  - λ_home: 1.4746 | λ_away: 0.8143 | **λ_total: 2.2889**
  - **Poisson P(Over 1.5)**: **66.7%** (Weak for the Over 1.5-focused strategy)
  - Poisson P(Under 1.5): 33.3%
- **Companion Historical Benchmark**:
  - Hist λ_home: 1.4603 | Hist λ_away: 0.8000 | **Hist λ_total: 2.2515**
  - **Historical P(Over 1.5)**: **65.8%**
- **Dual-Baseline Alignment**: `[VERY HIGH ALIGNMENT]` (0.88 pp delta)
  - *Interpretation*: Near-perfect consensus between live season and historical multi-year benchmark (Delta ≤ 1.5 pp). Maximum statistical stability.

### Market Pricing & Value Analysis
- **Offered Odds**: 1.28
- **Bookmaker Break-Even Probability**: 78.1%
- **Value Edge**: -11.5 percentage points (`[VERY LOW EDGE]`)
- **Expected Value (EV)**: -0.147 per unit staked

### Warnings & Negative Checks
- **`LOW_AWAY_SCORING`** [MEDIUM] (CONTRADICTORY / DIRECT): Grêmio averages only 0.60 goals per game, increasing shutout risk.
  - *Evidence*: Grêmio away scoring average is 0.60 GF/game, placing heavy reliance on Coritiba to produce goals.
- **`TEAM_NEWS_UNVERIFIED`** [LOW] (NEUTRAL / CONTEXTUAL): Pre-match team news and confirmed starting lineups remain unverified.
  - *Evidence*: Lineups have not been locked in; rotation or late injury risk unconfirmed.

### Final Decision Verdict: **NO BET**
> NO BET. Model estimates an 66.7% Over 1.5 probability versus bookmaker break-even of 78.1% at 1.28 odds (-11.5 edge, -0.147 EV). Estimated Over 1.5 probability (66.7%) is well below the 70% threshold for the Over 1.5 strategy.

---

## 10. CA Unión de Santa Fe vs Estudiantes de La Plata
- **Fixture**: Argentina — Liga Profesional | Date: 2026-10-26
- **Data Quality**: **Verified (Dual-Baseline Venue-Specific Analysis)**

### Pre-Match Statistical Matchup Comparison
| Metric | CA Unión de Santa Fe (Home Venue) | Estudiantes de La Plata (Away Venue) |
| :--- | :---: | :---: |
| **League Standing** | 11th | 10th |
| **Venue Matches Played** | 6 | 6 |
| **Overall Matches Played** | 13 | 13 |
| **Venue Goals Scored (GF)** | 11 (1.83 / game) | 3 (0.50 / game) |
| **Venue Goals Conceded (GA)** | 10 (1.67 / game) | 10 (1.67 / game) |
| **Venue Goal Difference (GD)** | +1 | -7 |
| **Overall Record (GF / GA)** | 18 GF / 22 GA | 16 GF / 15 GA |

### Goal Profiles & Strength Indices (Dual-Baseline)
- **Primary Live Baselines (Argentina Liga Profesional 2026/27)**: Home scoring avg 1.28, Away scoring avg 1.02
  - **Home Attacking Strength**: 1.83 ÷ 1.28 = 1.43
  - **Away Defensive Weakness**: 1.67 ÷ 1.28 = 1.30
  - **Away Attacking Strength**: 0.50 ÷ 1.02 = 0.49
  - **Home Defensive Weakness**: 1.67 ÷ 1.02 = 1.63
- **Historical Benchmark Baselines (Locked Catalog)**: Home scoring avg 1.30, Away scoring avg 1.05

### Expected Goals (λ) & Poisson Formulation
- **Primary Live Model**:
  - λ_home: 2.3876 | λ_away: 0.8186 | **λ_total: 3.2062**
  - **Poisson P(Over 1.5)**: **83.0%** (Strong)
  - Poisson P(Under 1.5): 17.0%
- **Companion Historical Benchmark**:
  - Hist λ_home: 2.3504 | Hist λ_away: 0.7937 | **Hist λ_total: 3.1461**
  - **Historical P(Over 1.5)**: **82.2%**
- **Dual-Baseline Alignment**: `[VERY HIGH ALIGNMENT]` (0.80 pp delta)
  - *Interpretation*: Near-perfect consensus between live season and historical multi-year benchmark (Delta ≤ 1.5 pp). Maximum statistical stability.

### Market Pricing & Value Analysis
- **Offered Odds**: 1.38
- **Bookmaker Break-Even Probability**: 72.5%
- **Value Edge**: +10.5 percentage points (`[HIGH EDGE]`)
- **Expected Value (EV)**: +0.145 per unit staked

### Warnings & Negative Checks
- **`LOW_AWAY_SCORING`** [MEDIUM] (CONTRADICTORY / DIRECT): Estudiantes de La Plata averages only 0.50 goals per game, increasing shutout risk.
  - *Evidence*: Estudiantes de La Plata away scoring average is 0.50 GF/game, placing heavy reliance on CA Unión de Santa Fe to produce goals.
- **`TEAM_NEWS_UNVERIFIED`** [LOW] (NEUTRAL / CONTEXTUAL): Pre-match team news and confirmed starting lineups remain unverified.
  - *Evidence*: Lineups have not been locked in; rotation or late injury risk unconfirmed.

### Final Decision Verdict: **SELECT**
> SELECT. Model estimates an 83.0% Over 1.5 probability versus bookmaker break-even of 72.5% at 1.38 odds (+10.5 edge, +0.145 EV). Strong probability (83.0%) supported by positive edge (+10.5pp, EV +0.145) and acceptable risk profile.

---

## 11. FC Ararat-Armenia vs FC Noah
- **Fixture**: Armenia — Premier League | Date: 2026-10-26
- **Data Quality**: **Verified (Dual-Baseline Venue-Specific Analysis)**

### Pre-Match Statistical Matchup Comparison
| Metric | FC Ararat-Armenia (Home Venue) | FC Noah (Away Venue) |
| :--- | :---: | :---: |
| **League Standing** | 2nd | 1st |
| **Venue Matches Played** | 5 | 4 |
| **Overall Matches Played** | 10 | 10 |
| **Venue Goals Scored (GF)** | 10 (2.00 / game) | 13 (3.25 / game) |
| **Venue Goals Conceded (GA)** | 2 (0.40 / game) | 4 (1.00 / game) |
| **Venue Goal Difference (GD)** | +8 | +9 |
| **Overall Record (GF / GA)** | 19 GF / 9 GA | 27 GF / 7 GA |

### Goal Profiles & Strength Indices (Dual-Baseline)
- **Primary Live Baselines (Armenia Premier League 2026/27)**: Home scoring avg 1.48, Away scoring avg 1.22
  - **Home Attacking Strength**: 2.00 ÷ 1.48 = 1.35
  - **Away Defensive Weakness**: 1.00 ÷ 1.48 = 0.68
  - **Away Attacking Strength**: 3.25 ÷ 1.22 = 2.66
  - **Home Defensive Weakness**: 0.40 ÷ 1.22 = 0.33
- **Historical Benchmark Baselines (Locked Catalog)**: Home scoring avg 1.45, Away scoring avg 1.15

### Expected Goals (λ) & Poisson Formulation
- **Primary Live Model**:
  - λ_home: 1.3514 | λ_away: 1.0656 | **λ_total: 2.4169**
  - **Poisson P(Over 1.5)**: **69.5%** (Weak for the Over 1.5-focused strategy)
  - Poisson P(Under 1.5): 30.5%
- **Companion Historical Benchmark**:
  - Hist λ_home: 1.3793 | Hist λ_away: 1.1304 | **Hist λ_total: 2.5097**
  - **Historical P(Over 1.5)**: **71.5%**
- **Dual-Baseline Alignment**: `[HIGH ALIGNMENT]` (1.95 pp delta)
  - *Interpretation*: Strong agreement between live season and historical benchmark (Delta ≤ 3.0 pp). High mathematical confidence.

### Market Pricing & Value Analysis
- **Offered Odds**: 1.28
- **Bookmaker Break-Even Probability**: 78.1%
- **Value Edge**: -8.6 percentage points (`[LOW EDGE]`)
- **Expected Value (EV)**: -0.110 per unit staked

### Warnings & Negative Checks
- **`SMALL_SAMPLE`** [MEDIUM] (CONTRADICTORY / INDIRECT): Limited sample size of only 4 matches.
  - *Evidence*: Sample size below the 5-match threshold for statistical stability (5 vs 4).
- **`TEAM_NEWS_UNVERIFIED`** [LOW] (NEUTRAL / CONTEXTUAL): Pre-match team news and confirmed starting lineups remain unverified.
  - *Evidence*: Lineups have not been locked in; rotation or late injury risk unconfirmed.

### Final Decision Verdict: **NO BET**
> NO BET. Model estimates an 69.5% Over 1.5 probability versus bookmaker break-even of 78.1% at 1.28 odds (-8.6 edge, -0.110 EV). Estimated Over 1.5 probability (69.5%) is well below the 70% threshold for the Over 1.5 strategy.

---

## 12. Busaiteen vs Bouri Cultural SC
- **Fixture**: Bahrain — Second Division | Date: 2026-10-26
- **Data Quality**: **INSUFFICIENT DATA** (Section 5.0 Hard-Stop Triggered)

### Historical Statistics & Goal Profiles
- **Busaiteen (Home)**: Early-season venue-specific statistics unverified across public statistical APIs.
- **Bouri Cultural SC (Away)**: Early-season venue-specific statistics unverified across public statistical APIs.
- **League Stage**: Round 4 (Total season sample of only 3 matches played per club at shared/neutral venues).

### Expected Goals (λ) & Poisson Formulation
- **Calculation Status**: **HALTED** per Model 2.1 Section 5.0 Hard-Stop Rule.
- **Reason**: Missing mandatory venue-specific splits (`home_venue_matches`, `home_venue_goals_scored`, `home_venue_goals_conceded`, `away_venue_matches`, `away_venue_goals_scored`, `away_venue_goals_conceded`). Overall season aggregates cannot be substituted as mathematical proxies for venue performance.

### Market Pricing & Value Analysis
- **Offered Odds**: 1.24
- **Bookmaker Break-Even Probability**: 80.6%
- **Value Edge**: N/A (Calculation Halted)
- **Expected Value (EV)**: N/A

### Warnings & Negative Checks
- **`MISSING_HOME_AWAY_DATA`** [CRITICAL] (CONTRADICTORY / DIRECT): Mandatory venue-specific statistics missing for Busaiteen vs Bouri Cultural SC.
  - *Evidence*: Unverified venue splits for early-season Round 4 match. Full season aggregates cannot be substituted for lambda under Section 5.0.
- **`TEAM_NEWS_UNVERIFIED`** [LOW] (NEUTRAL / CONTEXTUAL): Pre-match team news and confirmed starting lineups remain unverified.
  - *Evidence*: Lineups have not been locked in; rotation or late injury risk unconfirmed.

### Final Decision Verdict: **INSUFFICIENT DATA**
> INSUFFICIENT DATA. Calculation halted for Busaiteen vs Bouri Cultural SC: Missing venue-specific statistics (home_venue_matches, home_venue_goals_scored, home_venue_goals_conceded, away_venue_matches, away_venue_goals_scored, away_venue_goals_conceded). Under Model 2.1 Section 5.0 Hard-Stop Rule, full-season aggregates cannot be substituted for lambda.

---

## 13. Um Alhassam vs Al Budaiya
- **Fixture**: Bahrain — Second Division | Date: 2026-10-26
- **Data Quality**: **INSUFFICIENT DATA** (Section 5.0 Hard-Stop Triggered)

### Historical Statistics & Goal Profiles
- **Um Alhassam (Home)**: Early-season venue-specific statistics unverified across public statistical APIs.
- **Al Budaiya (Away)**: Early-season venue-specific statistics unverified across public statistical APIs.
- **League Stage**: Round 4 (Total season sample of only 3 matches played per club at shared/neutral venues).

### Expected Goals (λ) & Poisson Formulation
- **Calculation Status**: **HALTED** per Model 2.1 Section 5.0 Hard-Stop Rule.
- **Reason**: Missing mandatory venue-specific splits (`home_venue_matches`, `home_venue_goals_scored`, `home_venue_goals_conceded`, `away_venue_matches`, `away_venue_goals_scored`, `away_venue_goals_conceded`). Overall season aggregates cannot be substituted as mathematical proxies for venue performance.

### Market Pricing & Value Analysis
- **Offered Odds**: 1.29
- **Bookmaker Break-Even Probability**: 77.5%
- **Value Edge**: N/A (Calculation Halted)
- **Expected Value (EV)**: N/A

### Warnings & Negative Checks
- **`MISSING_HOME_AWAY_DATA`** [CRITICAL] (CONTRADICTORY / DIRECT): Mandatory venue-specific statistics missing for Um Alhassam vs Al Budaiya.
  - *Evidence*: Unverified venue splits for early-season Round 4 match. Full season aggregates cannot be substituted for lambda under Section 5.0.
- **`TEAM_NEWS_UNVERIFIED`** [LOW] (NEUTRAL / CONTEXTUAL): Pre-match team news and confirmed starting lineups remain unverified.
  - *Evidence*: Lineups have not been locked in; rotation or late injury risk unconfirmed.

### Final Decision Verdict: **INSUFFICIENT DATA**
> INSUFFICIENT DATA. Calculation halted for Um Alhassam vs Al Budaiya: Missing venue-specific statistics (home_venue_matches, home_venue_goals_scored, home_venue_goals_conceded, away_venue_matches, away_venue_goals_scored, away_venue_goals_conceded). Under Model 2.1 Section 5.0 Hard-Stop Rule, full-season aggregates cannot be substituted for lambda.

---

## 14. Al Shabab Manama vs Isa Town
- **Fixture**: Bahrain — Second Division | Date: 2026-10-26
- **Data Quality**: **INSUFFICIENT DATA** (Section 5.0 Hard-Stop Triggered)

### Historical Statistics & Goal Profiles
- **Al Shabab Manama (Home)**: Early-season venue-specific statistics unverified across public statistical APIs.
- **Isa Town (Away)**: Early-season venue-specific statistics unverified across public statistical APIs.
- **League Stage**: Round 4 (Total season sample of only 3 matches played per club at shared/neutral venues).

### Expected Goals (λ) & Poisson Formulation
- **Calculation Status**: **HALTED** per Model 2.1 Section 5.0 Hard-Stop Rule.
- **Reason**: Missing mandatory venue-specific splits (`home_venue_matches`, `home_venue_goals_scored`, `home_venue_goals_conceded`, `away_venue_matches`, `away_venue_goals_scored`, `away_venue_goals_conceded`). Overall season aggregates cannot be substituted as mathematical proxies for venue performance.

### Market Pricing & Value Analysis
- **Offered Odds**: 1.35
- **Bookmaker Break-Even Probability**: 74.1%
- **Value Edge**: N/A (Calculation Halted)
- **Expected Value (EV)**: N/A

### Warnings & Negative Checks
- **`MISSING_HOME_AWAY_DATA`** [CRITICAL] (CONTRADICTORY / DIRECT): Mandatory venue-specific statistics missing for Al Shabab Manama vs Isa Town.
  - *Evidence*: Unverified venue splits for early-season Round 4 match. Full season aggregates cannot be substituted for lambda under Section 5.0.
- **`TEAM_NEWS_UNVERIFIED`** [LOW] (NEUTRAL / CONTEXTUAL): Pre-match team news and confirmed starting lineups remain unverified.
  - *Evidence*: Lineups have not been locked in; rotation or late injury risk unconfirmed.

### Final Decision Verdict: **INSUFFICIENT DATA**
> INSUFFICIENT DATA. Calculation halted for Al Shabab Manama vs Isa Town: Missing venue-specific statistics (home_venue_matches, home_venue_goals_scored, home_venue_goals_conceded, away_venue_matches, away_venue_goals_scored, away_venue_goals_conceded). Under Model 2.1 Section 5.0 Hard-Stop Rule, full-season aggregates cannot be substituted for lambda.

---

## 15. CA Nacional Potosí vs Guabirá
- **Fixture**: Bolivia — División Profesional | Date: 2026-10-26
- **Data Quality**: **Verified (Dual-Baseline Venue-Specific Analysis)**

### Pre-Match Statistical Matchup Comparison
| Metric | CA Nacional Potosí (Home Venue) | Guabirá (Away Venue) |
| :--- | :---: | :---: |
| **League Standing** | 9th | 7th |
| **Venue Matches Played** | 11 | 11 |
| **Overall Matches Played** | 22 | 22 |
| **Venue Goals Scored (GF)** | 18 (1.64 / game) | 10 (0.91 / game) |
| **Venue Goals Conceded (GA)** | 15 (1.36 / game) | 33 (3.00 / game) |
| **Venue Goal Difference (GD)** | +3 | -23 |
| **Overall Record (GF / GA)** | 32 GF / 31 GA | 34 GF / 44 GA |

### Goal Profiles & Strength Indices (Dual-Baseline)
- **Primary Live Baselines (Bolivia División Profesional 2026/27)**: Home scoring avg 1.68, Away scoring avg 1.12
  - **Home Attacking Strength**: 1.64 ÷ 1.68 = 0.97
  - **Away Defensive Weakness**: 3.00 ÷ 1.68 = 1.79
  - **Away Attacking Strength**: 0.91 ÷ 1.12 = 0.81
  - **Home Defensive Weakness**: 1.36 ÷ 1.12 = 1.22
- **Historical Benchmark Baselines (Locked Catalog)**: Home scoring avg 1.70, Away scoring avg 1.05

### Expected Goals (λ) & Poisson Formulation
- **Primary Live Model**:
  - λ_home: 2.9286 | λ_away: 1.1050 | **λ_total: 4.0336**
  - **Poisson P(Over 1.5)**: **91.1%** (Extremely strong)
  - Poisson P(Under 1.5): 8.9%
- **Companion Historical Benchmark**:
  - Hist λ_home: 2.8877 | Hist λ_away: 1.1806 | **Hist λ_total: 4.0728**
  - **Historical P(Over 1.5)**: **91.4%**
- **Dual-Baseline Alignment**: `[VERY HIGH ALIGNMENT]` (0.27 pp delta)
  - *Interpretation*: Near-perfect consensus between live season and historical multi-year benchmark (Delta ≤ 1.5 pp). Maximum statistical stability.

### Market Pricing & Value Analysis
- **Offered Odds**: 1.12
- **Bookmaker Break-Even Probability**: 89.3%
- **Value Edge**: +1.8 percentage points (`[MEDIUM EDGE]`)
- **Expected Value (EV)**: +0.020 per unit staked

### Warnings & Negative Checks
- **`TEAM_NEWS_UNVERIFIED`** [LOW] (NEUTRAL / CONTEXTUAL): Pre-match team news and confirmed starting lineups remain unverified.
  - *Evidence*: Lineups have not been locked in; rotation or late injury risk unconfirmed.

### Final Decision Verdict: **SELECT**
> SELECT. Model estimates an 91.1% Over 1.5 probability versus bookmaker break-even of 89.3% at 1.12 odds (+1.8 edge, +0.020 EV). Strong probability (91.1%) supported by positive edge (+1.8pp, EV +0.020) and acceptable risk profile.

---

## 16. Lokomotiv Plovdiv vs PFK Slavia Sofia
- **Fixture**: Bulgaria — First League | Date: 2026-10-26
- **Data Quality**: **Verified (Dual-Baseline Venue-Specific Analysis)**

### Pre-Match Statistical Matchup Comparison
| Metric | Lokomotiv Plovdiv (Home Venue) | PFK Slavia Sofia (Away Venue) |
| :--- | :---: | :---: |
| **League Standing** | 11th | 8th |
| **Venue Matches Played** | 5 | 5 |
| **Overall Matches Played** | 11 | 11 |
| **Venue Goals Scored (GF)** | 5 (1.00 / game) | 5 (1.00 / game) |
| **Venue Goals Conceded (GA)** | 5 (1.00 / game) | 3 (0.60 / game) |
| **Venue Goal Difference (GD)** | +0 | +2 |
| **Overall Record (GF / GA)** | 6 GF / 14 GA | 9 GF / 9 GA |

### Goal Profiles & Strength Indices (Dual-Baseline)
- **Primary Live Baselines (Bulgaria First League 2026/27)**: Home scoring avg 1.38, Away scoring avg 1.02
  - **Home Attacking Strength**: 1.00 ÷ 1.38 = 0.72
  - **Away Defensive Weakness**: 0.60 ÷ 1.38 = 0.43
  - **Away Attacking Strength**: 1.00 ÷ 1.02 = 0.98
  - **Home Defensive Weakness**: 1.00 ÷ 1.02 = 0.98
- **Historical Benchmark Baselines (Locked Catalog)**: Home scoring avg 1.35, Away scoring avg 1.05

### Expected Goals (λ) & Poisson Formulation
- **Primary Live Model**:
  - λ_home: 0.4348 | λ_away: 0.9804 | **λ_total: 1.4152**
  - **Poisson P(Over 1.5)**: **41.3%** (Weak for the Over 1.5-focused strategy)
  - Poisson P(Under 1.5): 58.7%
- **Companion Historical Benchmark**:
  - Hist λ_home: 0.4444 | Hist λ_away: 0.9524 | **Hist λ_total: 1.3968**
  - **Historical P(Over 1.5)**: **40.7%**
- **Dual-Baseline Alignment**: `[VERY HIGH ALIGNMENT]` (0.63 pp delta)
  - *Interpretation*: Near-perfect consensus between live season and historical multi-year benchmark (Delta ≤ 1.5 pp). Maximum statistical stability.

### Market Pricing & Value Analysis
- **Offered Odds**: 1.50
- **Bookmaker Break-Even Probability**: 66.7%
- **Value Edge**: -25.3 percentage points (`[VERY LOW EDGE]`)
- **Expected Value (EV)**: -0.380 per unit staked

### Warnings & Negative Checks
- **`TEAM_NEWS_UNVERIFIED`** [LOW] (NEUTRAL / CONTEXTUAL): Pre-match team news and confirmed starting lineups remain unverified.
  - *Evidence*: Lineups have not been locked in; rotation or late injury risk unconfirmed.

### Final Decision Verdict: **NO BET**
> NO BET. Model estimates an 41.3% Over 1.5 probability versus bookmaker break-even of 66.7% at 1.5 odds (-25.3 edge, -0.380 EV). Estimated Over 1.5 probability (41.3%) is well below the 70% threshold for the Over 1.5 strategy.

---

## 17. CSKA Sofia vs PFC Ludogorets Razgrad
- **Fixture**: Bulgaria — First League | Date: 2026-10-26
- **Data Quality**: **Verified (Dual-Baseline Venue-Specific Analysis)**

### Pre-Match Statistical Matchup Comparison
| Metric | CSKA Sofia (Home Venue) | PFC Ludogorets Razgrad (Away Venue) |
| :--- | :---: | :---: |
| **League Standing** | 2nd | 3rd |
| **Venue Matches Played** | 5 | 4 |
| **Overall Matches Played** | 11 | 10 |
| **Venue Goals Scored (GF)** | 16 (3.20 / game) | 10 (2.50 / game) |
| **Venue Goals Conceded (GA)** | 3 (0.60 / game) | 3 (0.75 / game) |
| **Venue Goal Difference (GD)** | +13 | +7 |
| **Overall Record (GF / GA)** | 27 GF / 9 GA | 21 GF / 7 GA |

### Goal Profiles & Strength Indices (Dual-Baseline)
- **Primary Live Baselines (Bulgaria First League 2026/27)**: Home scoring avg 1.38, Away scoring avg 1.02
  - **Home Attacking Strength**: 3.20 ÷ 1.38 = 2.32
  - **Away Defensive Weakness**: 0.75 ÷ 1.38 = 0.54
  - **Away Attacking Strength**: 2.50 ÷ 1.02 = 2.45
  - **Home Defensive Weakness**: 0.60 ÷ 1.02 = 0.59
- **Historical Benchmark Baselines (Locked Catalog)**: Home scoring avg 1.35, Away scoring avg 1.05

### Expected Goals (λ) & Poisson Formulation
- **Primary Live Model**:
  - λ_home: 1.7391 | λ_away: 1.4706 | **λ_total: 3.2097**
  - **Poisson P(Over 1.5)**: **83.0%** (Strong)
  - Poisson P(Under 1.5): 17.0%
- **Companion Historical Benchmark**:
  - Hist λ_home: 1.7778 | Hist λ_away: 1.4286 | **Hist λ_total: 3.2063**
  - **Historical P(Over 1.5)**: **83.0%**
- **Dual-Baseline Alignment**: `[VERY HIGH ALIGNMENT]` (0.05 pp delta)
  - *Interpretation*: Near-perfect consensus between live season and historical multi-year benchmark (Delta ≤ 1.5 pp). Maximum statistical stability.

### Market Pricing & Value Analysis
- **Offered Odds**: 1.27
- **Bookmaker Break-Even Probability**: 78.7%
- **Value Edge**: +4.3 percentage points (`[MEDIUM EDGE]`)
- **Expected Value (EV)**: +0.054 per unit staked

### Warnings & Negative Checks
- **`SMALL_SAMPLE`** [MEDIUM] (CONTRADICTORY / INDIRECT): Limited sample size of only 4 matches.
  - *Evidence*: Sample size below the 5-match threshold for statistical stability (5 vs 4).
- **`STRONG_DEFENSIVE_MATCHUP`** [HIGH] (CONTRADICTORY / DIRECT): Both teams maintain exceptionally tight defensive records.
  - *Evidence*: CSKA Sofia concedes 0.60 GA/game and PFC Ludogorets Razgrad concedes 0.75 GA/game, elevating 0-0 and 1-0 probability.
- **`TEAM_NEWS_UNVERIFIED`** [LOW] (NEUTRAL / CONTEXTUAL): Pre-match team news and confirmed starting lineups remain unverified.
  - *Evidence*: Lineups have not been locked in; rotation or late injury risk unconfirmed.

### Final Decision Verdict: **CAUTION**
> CAUTION. Model estimates an 83.0% Over 1.5 probability versus bookmaker break-even of 78.7% at 1.27 odds (+4.3 edge, +0.054 EV). Model probability (83.0%) is viable, but high contradictory warning (STRONG_DEFENSIVE_MATCHUP) requires caution.

---

## 18. Nea Salamina vs Pafos FC
- **Fixture**: Cyprus — 1. Division | Date: 2026-10-26
- **Data Quality**: **Verified (Dual-Baseline Venue-Specific Analysis)**

### Pre-Match Statistical Matchup Comparison
| Metric | Nea Salamina (Home Venue) | Pafos FC (Away Venue) |
| :--- | :---: | :---: |
| **League Standing** | 13th | 1st |
| **Venue Matches Played** | 3 | 4 |
| **Overall Matches Played** | 7 | 7 |
| **Venue Goals Scored (GF)** | 2 (0.67 / game) | 10 (2.50 / game) |
| **Venue Goals Conceded (GA)** | 7 (2.33 / game) | 2 (0.50 / game) |
| **Venue Goal Difference (GD)** | -5 | +8 |
| **Overall Record (GF / GA)** | 5 GF / 17 GA | 19 GF / 4 GA |

### Goal Profiles & Strength Indices (Dual-Baseline)
- **Primary Live Baselines (Cyprus 1. Division 2026/27)**: Home scoring avg 1.40, Away scoring avg 1.18
  - **Home Attacking Strength**: 0.67 ÷ 1.40 = 0.48
  - **Away Defensive Weakness**: 0.50 ÷ 1.40 = 0.36
  - **Away Attacking Strength**: 2.50 ÷ 1.18 = 2.12
  - **Home Defensive Weakness**: 2.33 ÷ 1.18 = 1.98
- **Historical Benchmark Baselines (Locked Catalog)**: Home scoring avg 1.45, Away scoring avg 1.15

### Expected Goals (λ) & Poisson Formulation
- **Primary Live Model**:
  - λ_home: 0.2393 | λ_away: 4.9364 | **λ_total: 5.1757**
  - **Poisson P(Over 1.5)**: **96.5%** (Extremely strong)
  - Poisson P(Under 1.5): 3.5%
- **Companion Historical Benchmark**:
  - Hist λ_home: 0.2299 | Hist λ_away: 5.0725 | **Hist λ_total: 5.2963**
  - **Historical P(Over 1.5)**: **96.9%**
- **Dual-Baseline Alignment**: `[VERY HIGH ALIGNMENT]` (0.34 pp delta)
  - *Interpretation*: Near-perfect consensus between live season and historical multi-year benchmark (Delta ≤ 1.5 pp). Maximum statistical stability.

### Market Pricing & Value Analysis
- **Offered Odds**: 1.21
- **Bookmaker Break-Even Probability**: 82.6%
- **Value Edge**: +13.9 percentage points (`[HIGH EDGE]`)
- **Expected Value (EV)**: +0.168 per unit staked

### Warnings & Negative Checks
- **`SMALL_SAMPLE`** [MEDIUM] (CONTRADICTORY / INDIRECT): Limited sample size of only 3 matches.
  - *Evidence*: Sample size below the 5-match threshold for statistical stability (3 vs 4).
- **`LOW_HOME_SCORING`** [MEDIUM] (CONTRADICTORY / DIRECT): Nea Salamina home scoring rate is low (0.67 GF/game).
  - *Evidence*: Nea Salamina averages under 1.0 goal scored per match across the observed fixtures.
- **`TEAM_NEWS_UNVERIFIED`** [LOW] (NEUTRAL / CONTEXTUAL): Pre-match team news and confirmed starting lineups remain unverified.
  - *Evidence*: Lineups have not been locked in; rotation or late injury risk unconfirmed.

### Final Decision Verdict: **CAUTION**
> CAUTION. Model estimates an 96.5% Over 1.5 probability versus bookmaker break-even of 82.6% at 1.21 odds (+13.9 edge, +0.168 EV). Multiple medium warnings (SMALL_SAMPLE, LOW_HOME_SCORING) warrant measured caution.

---

## 19. AEK Larnaca vs Omonia Nicosia
- **Fixture**: Cyprus — 1. Division | Date: 2026-10-26
- **Data Quality**: **Verified (Dual-Baseline Venue-Specific Analysis)**

### Pre-Match Statistical Matchup Comparison
| Metric | AEK Larnaca (Home Venue) | Omonia Nicosia (Away Venue) |
| :--- | :---: | :---: |
| **League Standing** | 3rd | 6th |
| **Venue Matches Played** | 3 | 3 |
| **Overall Matches Played** | 7 | 7 |
| **Venue Goals Scored (GF)** | 5 (1.67 / game) | 4 (1.33 / game) |
| **Venue Goals Conceded (GA)** | 3 (1.00 / game) | 4 (1.33 / game) |
| **Venue Goal Difference (GD)** | +2 | +0 |
| **Overall Record (GF / GA)** | 12 GF / 8 GA | 13 GF / 8 GA |

### Goal Profiles & Strength Indices (Dual-Baseline)
- **Primary Live Baselines (Cyprus 1. Division 2026/27)**: Home scoring avg 1.40, Away scoring avg 1.18
  - **Home Attacking Strength**: 1.67 ÷ 1.40 = 1.19
  - **Away Defensive Weakness**: 1.33 ÷ 1.40 = 0.95
  - **Away Attacking Strength**: 1.33 ÷ 1.18 = 1.13
  - **Home Defensive Weakness**: 1.00 ÷ 1.18 = 0.85
- **Historical Benchmark Baselines (Locked Catalog)**: Home scoring avg 1.45, Away scoring avg 1.15

### Expected Goals (λ) & Poisson Formulation
- **Primary Live Model**:
  - λ_home: 1.5865 | λ_away: 1.1271 | **λ_total: 2.7136**
  - **Poisson P(Over 1.5)**: **75.4%** (Good)
  - Poisson P(Under 1.5): 24.6%
- **Companion Historical Benchmark**:
  - Hist λ_home: 1.5326 | Hist λ_away: 1.1594 | **Hist λ_total: 2.6883**
  - **Historical P(Over 1.5)**: **74.9%**
- **Dual-Baseline Alignment**: `[VERY HIGH ALIGNMENT]` (0.46 pp delta)
  - *Interpretation*: Near-perfect consensus between live season and historical multi-year benchmark (Delta ≤ 1.5 pp). Maximum statistical stability.

### Market Pricing & Value Analysis
- **Offered Odds**: 1.23
- **Bookmaker Break-Even Probability**: 81.3%
- **Value Edge**: -5.9 percentage points (`[LOW EDGE]`)
- **Expected Value (EV)**: -0.073 per unit staked

### Warnings & Negative Checks
- **`SMALL_SAMPLE`** [MEDIUM] (CONTRADICTORY / INDIRECT): Limited sample size of only 3 matches.
  - *Evidence*: Sample size below the 5-match threshold for statistical stability (3 vs 3).
- **`TEAM_NEWS_UNVERIFIED`** [LOW] (NEUTRAL / CONTEXTUAL): Pre-match team news and confirmed starting lineups remain unverified.
  - *Evidence*: Lineups have not been locked in; rotation or late injury risk unconfirmed.

### Final Decision Verdict: **CAUTION**
> CAUTION. Model estimates an 75.4% Over 1.5 probability versus bookmaker break-even of 81.3% at 1.23 odds (-5.9 edge, -0.073 EV). High probability (75.4%), but pricing offers no positive edge (-5.9pp). Disclosed under Principle 9.

---

## 20. FC Copenhagen vs Odense BK
- **Fixture**: Denmark — Superliga | Date: 2026-10-26
- **Data Quality**: **Verified (Dual-Baseline Venue-Specific Analysis)**

### Pre-Match Statistical Matchup Comparison
| Metric | FC Copenhagen (Home Venue) | Odense BK (Away Venue) |
| :--- | :---: | :---: |
| **League Standing** | 2nd | 7th |
| **Venue Matches Played** | 5 | 5 |
| **Overall Matches Played** | 11 | 11 |
| **Venue Goals Scored (GF)** | 12 (2.40 / game) | 4 (0.80 / game) |
| **Venue Goals Conceded (GA)** | 4 (0.80 / game) | 9 (1.80 / game) |
| **Venue Goal Difference (GD)** | +8 | -5 |
| **Overall Record (GF / GA)** | 25 GF / 11 GA | 10 GF / 15 GA |

### Goal Profiles & Strength Indices (Dual-Baseline)
- **Primary Live Baselines (Denmark Superliga 2026/27)**: Home scoring avg 1.58, Away scoring avg 1.25
  - **Home Attacking Strength**: 2.40 ÷ 1.58 = 1.52
  - **Away Defensive Weakness**: 1.80 ÷ 1.58 = 1.14
  - **Away Attacking Strength**: 0.80 ÷ 1.25 = 0.64
  - **Home Defensive Weakness**: 0.80 ÷ 1.25 = 0.64
- **Historical Benchmark Baselines (Locked Catalog)**: Home scoring avg 1.52, Away scoring avg 1.28

### Expected Goals (λ) & Poisson Formulation
- **Primary Live Model**:
  - λ_home: 2.7342 | λ_away: 0.5120 | **λ_total: 3.2462**
  - **Poisson P(Over 1.5)**: **83.5%** (Strong)
  - Poisson P(Under 1.5): 16.5%
- **Companion Historical Benchmark**:
  - Hist λ_home: 2.8421 | Hist λ_away: 0.5000 | **Hist λ_total: 3.3421**
  - **Historical P(Over 1.5)**: **84.7%**
- **Dual-Baseline Alignment**: `[VERY HIGH ALIGNMENT]` (1.18 pp delta)
  - *Interpretation*: Near-perfect consensus between live season and historical multi-year benchmark (Delta ≤ 1.5 pp). Maximum statistical stability.

### Market Pricing & Value Analysis
- **Offered Odds**: 1.17
- **Bookmaker Break-Even Probability**: 85.5%
- **Value Edge**: -2.0 percentage points (`[LOW EDGE]`)
- **Expected Value (EV)**: -0.023 per unit staked

### Warnings & Negative Checks
- **`LOW_AWAY_SCORING`** [MEDIUM] (CONTRADICTORY / DIRECT): Odense BK averages only 0.80 goals per game, increasing shutout risk.
  - *Evidence*: Odense BK away scoring average is 0.80 GF/game, placing heavy reliance on FC Copenhagen to produce goals.
- **`TEAM_NEWS_UNVERIFIED`** [LOW] (NEUTRAL / CONTEXTUAL): Pre-match team news and confirmed starting lineups remain unverified.
  - *Evidence*: Lineups have not been locked in; rotation or late injury risk unconfirmed.

### Final Decision Verdict: **CAUTION**
> CAUTION. Model estimates an 83.5% Over 1.5 probability versus bookmaker break-even of 85.5% at 1.17 odds (-2.0 edge, -0.023 EV). High probability (83.5%), but pricing offers no positive edge (-2.0pp). Disclosed under Principle 9.

---

## 21. Mosta FC vs Hibernians FC
- **Fixture**: Malta — Premier League | Date: 2026-10-26
- **Data Quality**: **Verified (Dual-Baseline Venue-Specific Analysis)**

### Pre-Match Statistical Matchup Comparison
| Metric | Mosta FC (Home Venue) | Hibernians FC (Away Venue) |
| :--- | :---: | :---: |
| **League Standing** | 7th | 4th |
| **Venue Matches Played** | 4 | 4 |
| **Overall Matches Played** | 8 | 8 |
| **Venue Goals Scored (GF)** | 4 (1.00 / game) | 6 (1.50 / game) |
| **Venue Goals Conceded (GA)** | 5 (1.25 / game) | 4 (1.00 / game) |
| **Venue Goal Difference (GD)** | -1 | +2 |
| **Overall Record (GF / GA)** | 8 GF / 11 GA | 12 GF / 7 GA |

### Goal Profiles & Strength Indices (Dual-Baseline)
- **Primary Live Baselines (Malta Premier League 2026/27)**: Home scoring avg 1.35, Away scoring avg 1.15
  - **Home Attacking Strength**: 1.00 ÷ 1.35 = 0.74
  - **Away Defensive Weakness**: 1.00 ÷ 1.35 = 0.74
  - **Away Attacking Strength**: 1.50 ÷ 1.15 = 1.30
  - **Home Defensive Weakness**: 1.25 ÷ 1.15 = 1.09
- **Historical Benchmark Baselines (Locked Catalog)**: Home scoring avg 1.40, Away scoring avg 1.10

### Expected Goals (λ) & Poisson Formulation
- **Primary Live Model**:
  - λ_home: 0.7407 | λ_away: 1.6304 | **λ_total: 2.3712**
  - **Poisson P(Over 1.5)**: **68.5%** (Weak for the Over 1.5-focused strategy)
  - Poisson P(Under 1.5): 31.5%
- **Companion Historical Benchmark**:
  - Hist λ_home: 0.7143 | Hist λ_away: 1.7045 | **Hist λ_total: 2.4188**
  - **Historical P(Over 1.5)**: **69.6%**
- **Dual-Baseline Alignment**: `[VERY HIGH ALIGNMENT]` (1.04 pp delta)
  - *Interpretation*: Near-perfect consensus between live season and historical multi-year benchmark (Delta ≤ 1.5 pp). Maximum statistical stability.

### Market Pricing & Value Analysis
- **Offered Odds**: 1.25
- **Bookmaker Break-Even Probability**: 80.0%
- **Value Edge**: -11.5 percentage points (`[VERY LOW EDGE]`)
- **Expected Value (EV)**: -0.143 per unit staked

### Warnings & Negative Checks
- **`SMALL_SAMPLE`** [MEDIUM] (CONTRADICTORY / INDIRECT): Limited sample size of only 4 matches.
  - *Evidence*: Sample size below the 5-match threshold for statistical stability (4 vs 4).
- **`TEAM_NEWS_UNVERIFIED`** [LOW] (NEUTRAL / CONTEXTUAL): Pre-match team news and confirmed starting lineups remain unverified.
  - *Evidence*: Lineups have not been locked in; rotation or late injury risk unconfirmed.

### Final Decision Verdict: **NO BET**
> NO BET. Model estimates an 68.5% Over 1.5 probability versus bookmaker break-even of 80.0% at 1.25 odds (-11.5 edge, -0.143 EV). Estimated Over 1.5 probability (68.5%) is well below the 70% threshold for the Over 1.5 strategy.

---

## 22. Warta Poznan vs LKS Lodz
- **Fixture**: Poland — I Liga | Date: 2026-10-26
- **Data Quality**: **Verified (Dual-Baseline Venue-Specific Analysis)**

### Pre-Match Statistical Matchup Comparison
| Metric | Warta Poznan (Home Venue) | LKS Lodz (Away Venue) |
| :--- | :---: | :---: |
| **League Standing** | 7th | 8th |
| **Venue Matches Played** | 5 | 5 |
| **Overall Matches Played** | 11 | 11 |
| **Venue Goals Scored (GF)** | 10 (2.00 / game) | 6 (1.20 / game) |
| **Venue Goals Conceded (GA)** | 6 (1.20 / game) | 5 (1.00 / game) |
| **Venue Goal Difference (GD)** | +4 | +1 |
| **Overall Record (GF / GA)** | 19 GF / 15 GA | 14 GF / 11 GA |

### Goal Profiles & Strength Indices (Dual-Baseline)
- **Primary Live Baselines (Poland I Liga 2026/27)**: Home scoring avg 1.48, Away scoring avg 1.18
  - **Home Attacking Strength**: 2.00 ÷ 1.48 = 1.35
  - **Away Defensive Weakness**: 1.00 ÷ 1.48 = 0.68
  - **Away Attacking Strength**: 1.20 ÷ 1.18 = 1.02
  - **Home Defensive Weakness**: 1.20 ÷ 1.18 = 1.02
- **Historical Benchmark Baselines (Locked Catalog)**: Home scoring avg 1.45, Away scoring avg 1.15

### Expected Goals (λ) & Poisson Formulation
- **Primary Live Model**:
  - λ_home: 1.3514 | λ_away: 1.2203 | **λ_total: 2.5717**
  - **Poisson P(Over 1.5)**: **72.7%** (Moderate)
  - Poisson P(Under 1.5): 27.3%
- **Companion Historical Benchmark**:
  - Hist λ_home: 1.3793 | Hist λ_away: 1.2522 | **Hist λ_total: 2.6315**
  - **Historical P(Over 1.5)**: **73.9%**
- **Dual-Baseline Alignment**: `[VERY HIGH ALIGNMENT]` (1.15 pp delta)
  - *Interpretation*: Near-perfect consensus between live season and historical multi-year benchmark (Delta ≤ 1.5 pp). Maximum statistical stability.

### Market Pricing & Value Analysis
- **Offered Odds**: 1.25
- **Bookmaker Break-Even Probability**: 80.0%
- **Value Edge**: -7.3 percentage points (`[LOW EDGE]`)
- **Expected Value (EV)**: -0.091 per unit staked

### Warnings & Negative Checks
- **`TEAM_NEWS_UNVERIFIED`** [LOW] (NEUTRAL / CONTEXTUAL): Pre-match team news and confirmed starting lineups remain unverified.
  - *Evidence*: Lineups have not been locked in; rotation or late injury risk unconfirmed.

### Final Decision Verdict: **CAUTION**
> CAUTION. Model estimates an 72.7% Over 1.5 probability versus bookmaker break-even of 80.0% at 1.25 odds (-7.3 edge, -0.091 EV). High probability (72.7%), but pricing offers no positive edge (-7.3pp). Disclosed under Principle 9.

---

## 23. ACS Sepsi OSK vs Universitatea Craiova
- **Fixture**: Romania — SuperLiga | Date: 2026-10-26
- **Data Quality**: **Verified (Dual-Baseline Venue-Specific Analysis)**

### Pre-Match Statistical Matchup Comparison
| Metric | ACS Sepsi OSK (Home Venue) | Universitatea Craiova (Away Venue) |
| :--- | :---: | :---: |
| **League Standing** | 12th | 3rd |
| **Venue Matches Played** | 6 | 6 |
| **Overall Matches Played** | 12 | 12 |
| **Venue Goals Scored (GF)** | 7 (1.17 / game) | 11 (1.83 / game) |
| **Venue Goals Conceded (GA)** | 8 (1.33 / game) | 4 (0.67 / game) |
| **Venue Goal Difference (GD)** | -1 | +7 |
| **Overall Record (GF / GA)** | 13 GF / 18 GA | 25 GF / 7 GA |

### Goal Profiles & Strength Indices (Dual-Baseline)
- **Primary Live Baselines (Romania SuperLiga 2026/27)**: Home scoring avg 1.38, Away scoring avg 1.10
  - **Home Attacking Strength**: 1.17 ÷ 1.38 = 0.85
  - **Away Defensive Weakness**: 0.67 ÷ 1.38 = 0.48
  - **Away Attacking Strength**: 1.83 ÷ 1.10 = 1.67
  - **Home Defensive Weakness**: 1.33 ÷ 1.10 = 1.21
- **Historical Benchmark Baselines (Locked Catalog)**: Home scoring avg 1.40, Away scoring avg 1.12

### Expected Goals (λ) & Poisson Formulation
- **Primary Live Model**:
  - λ_home: 0.5680 | λ_away: 2.2126 | **λ_total: 2.7807**
  - **Poisson P(Over 1.5)**: **76.6%** (Good)
  - Poisson P(Under 1.5): 23.4%
- **Companion Historical Benchmark**:
  - Hist λ_home: 0.5556 | Hist λ_away: 2.1825 | **Hist λ_total: 2.7331**
  - **Historical P(Over 1.5)**: **75.7%**
- **Dual-Baseline Alignment**: `[VERY HIGH ALIGNMENT]` (0.83 pp delta)
  - *Interpretation*: Near-perfect consensus between live season and historical multi-year benchmark (Delta ≤ 1.5 pp). Maximum statistical stability.

### Market Pricing & Value Analysis
- **Offered Odds**: 1.27
- **Bookmaker Break-Even Probability**: 78.7%
- **Value Edge**: -2.2 percentage points (`[LOW EDGE]`)
- **Expected Value (EV)**: -0.028 per unit staked

### Warnings & Negative Checks
- **`TEAM_NEWS_UNVERIFIED`** [LOW] (NEUTRAL / CONTEXTUAL): Pre-match team news and confirmed starting lineups remain unverified.
  - *Evidence*: Lineups have not been locked in; rotation or late injury risk unconfirmed.

### Final Decision Verdict: **CAUTION**
> CAUTION. Model estimates an 76.6% Over 1.5 probability versus bookmaker break-even of 78.7% at 1.27 odds (-2.2 edge, -0.028 EV). High probability (76.6%), but pricing offers no positive edge (-2.2pp). Disclosed under Principle 9.

---

## 24. Al Bukayriyah vs Hajer FC
- **Fixture**: Saudi Arabia — Division 1 | Date: 2026-10-26
- **Data Quality**: **Verified (Dual-Baseline Venue-Specific Analysis)**

### Pre-Match Statistical Matchup Comparison
| Metric | Al Bukayriyah (Home Venue) | Hajer FC (Away Venue) |
| :--- | :---: | :---: |
| **League Standing** | 17th | 16th |
| **Venue Matches Played** | 4 | 3 |
| **Overall Matches Played** | 8 | 7 |
| **Venue Goals Scored (GF)** | 2 (0.50 / game) | 2 (0.67 / game) |
| **Venue Goals Conceded (GA)** | 6 (1.50 / game) | 6 (2.00 / game) |
| **Venue Goal Difference (GD)** | -4 | -4 |
| **Overall Record (GF / GA)** | 5 GF / 14 GA | 6 GF / 11 GA |

### Goal Profiles & Strength Indices (Dual-Baseline)
- **Primary Live Baselines (Saudi Arabia Division 1 2026/27)**: Home scoring avg 1.30, Away scoring avg 1.05
  - **Home Attacking Strength**: 0.50 ÷ 1.30 = 0.38
  - **Away Defensive Weakness**: 2.00 ÷ 1.30 = 1.54
  - **Away Attacking Strength**: 0.67 ÷ 1.05 = 0.63
  - **Home Defensive Weakness**: 1.50 ÷ 1.05 = 1.43
- **Historical Benchmark Baselines (Locked Catalog)**: Home scoring avg 1.35, Away scoring avg 1.10

### Expected Goals (λ) & Poisson Formulation
- **Primary Live Model**:
  - λ_home: 0.7692 | λ_away: 0.9571 | **λ_total: 1.7264**
  - **Poisson P(Over 1.5)**: **51.5%** (Weak for the Over 1.5-focused strategy)
  - Poisson P(Under 1.5): 48.5%
- **Companion Historical Benchmark**:
  - Hist λ_home: 0.7407 | Hist λ_away: 0.9091 | **Hist λ_total: 1.6544**
  - **Historical P(Over 1.5)**: **49.2%**
- **Dual-Baseline Alignment**: `[HIGH ALIGNMENT]` (2.24 pp delta)
  - *Interpretation*: Strong agreement between live season and historical benchmark (Delta ≤ 3.0 pp). High mathematical confidence.

### Market Pricing & Value Analysis
- **Offered Odds**: 1.33
- **Bookmaker Break-Even Probability**: 75.2%
- **Value Edge**: -23.7 percentage points (`[VERY LOW EDGE]`)
- **Expected Value (EV)**: -0.315 per unit staked

### Warnings & Negative Checks
- **`SMALL_SAMPLE`** [MEDIUM] (CONTRADICTORY / INDIRECT): Limited sample size of only 3 matches.
  - *Evidence*: Sample size below the 5-match threshold for statistical stability (4 vs 3).
- **`LOW_AWAY_SCORING`** [MEDIUM] (CONTRADICTORY / DIRECT): Hajer FC averages only 0.67 goals per game, increasing shutout risk.
  - *Evidence*: Hajer FC away scoring average is 0.67 GF/game, placing heavy reliance on Al Bukayriyah to produce goals.
- **`LOW_HOME_SCORING`** [HIGH] (CONTRADICTORY / DIRECT): Al Bukayriyah home scoring rate is low (0.50 GF/game).
  - *Evidence*: Al Bukayriyah averages under 1.0 goal scored per match across the observed fixtures.
- **`TEAM_NEWS_UNVERIFIED`** [LOW] (NEUTRAL / CONTEXTUAL): Pre-match team news and confirmed starting lineups remain unverified.
  - *Evidence*: Lineups have not been locked in; rotation or late injury risk unconfirmed.

### Final Decision Verdict: **NO BET**
> NO BET. Model estimates an 51.5% Over 1.5 probability versus bookmaker break-even of 75.2% at 1.33 odds (-23.7 edge, -0.315 EV). Estimated Over 1.5 probability (51.5%) is well below the 70% threshold for the Over 1.5 strategy.

---

## 25. Al Anwar vs Al Akhdoud
- **Fixture**: Saudi Arabia — Division 1 | Date: 2026-10-26
- **Data Quality**: **Verified (Dual-Baseline Venue-Specific Analysis)**

### Pre-Match Statistical Matchup Comparison
| Metric | Al Anwar (Home Venue) | Al Akhdoud (Away Venue) |
| :--- | :---: | :---: |
| **League Standing** | 8th | 14th |
| **Venue Matches Played** | 4 | 4 |
| **Overall Matches Played** | 8 | 8 |
| **Venue Goals Scored (GF)** | 4 (1.00 / game) | 4 (1.00 / game) |
| **Venue Goals Conceded (GA)** | 2 (0.50 / game) | 9 (2.25 / game) |
| **Venue Goal Difference (GD)** | +2 | -5 |
| **Overall Record (GF / GA)** | 7 GF / 5 GA | 10 GF / 16 GA |

### Goal Profiles & Strength Indices (Dual-Baseline)
- **Primary Live Baselines (Saudi Arabia Division 1 2026/27)**: Home scoring avg 1.30, Away scoring avg 1.05
  - **Home Attacking Strength**: 1.00 ÷ 1.30 = 0.77
  - **Away Defensive Weakness**: 2.25 ÷ 1.30 = 1.73
  - **Away Attacking Strength**: 1.00 ÷ 1.05 = 0.95
  - **Home Defensive Weakness**: 0.50 ÷ 1.05 = 0.48
- **Historical Benchmark Baselines (Locked Catalog)**: Home scoring avg 1.35, Away scoring avg 1.10

### Expected Goals (λ) & Poisson Formulation
- **Primary Live Model**:
  - λ_home: 1.7308 | λ_away: 0.4762 | **λ_total: 2.2070**
  - **Poisson P(Over 1.5)**: **64.7%** (Weak for the Over 1.5-focused strategy)
  - Poisson P(Under 1.5): 35.3%
- **Companion Historical Benchmark**:
  - Hist λ_home: 1.6667 | Hist λ_away: 0.4545 | **Hist λ_total: 2.1212**
  - **Historical P(Over 1.5)**: **62.6%**
- **Dual-Baseline Alignment**: `[HIGH ALIGNMENT]` (2.13 pp delta)
  - *Interpretation*: Strong agreement between live season and historical benchmark (Delta ≤ 3.0 pp). High mathematical confidence.

### Market Pricing & Value Analysis
- **Offered Odds**: 1.28
- **Bookmaker Break-Even Probability**: 78.1%
- **Value Edge**: -13.4 percentage points (`[VERY LOW EDGE]`)
- **Expected Value (EV)**: -0.172 per unit staked

### Warnings & Negative Checks
- **`SMALL_SAMPLE`** [MEDIUM] (CONTRADICTORY / INDIRECT): Limited sample size of only 4 matches.
  - *Evidence*: Sample size below the 5-match threshold for statistical stability (4 vs 4).
- **`TEAM_NEWS_UNVERIFIED`** [LOW] (NEUTRAL / CONTEXTUAL): Pre-match team news and confirmed starting lineups remain unverified.
  - *Evidence*: Lineups have not been locked in; rotation or late injury risk unconfirmed.

### Final Decision Verdict: **NO BET**
> NO BET. Model estimates an 64.7% Over 1.5 probability versus bookmaker break-even of 78.1% at 1.28 odds (-13.4 edge, -0.172 EV). Estimated Over 1.5 probability (64.7%) is well below the 70% threshold for the Over 1.5 strategy.

---

## 26. Al Ula FC vs Al Orobah FC
- **Fixture**: Saudi Arabia — Division 1 | Date: 2026-10-26
- **Data Quality**: **Verified (Dual-Baseline Venue-Specific Analysis)**

### Pre-Match Statistical Matchup Comparison
| Metric | Al Ula FC (Home Venue) | Al Orobah FC (Away Venue) |
| :--- | :---: | :---: |
| **League Standing** | 1st | 12th |
| **Venue Matches Played** | 3 | 3 |
| **Overall Matches Played** | 7 | 7 |
| **Venue Goals Scored (GF)** | 9 (3.00 / game) | 2 (0.67 / game) |
| **Venue Goals Conceded (GA)** | 1 (0.33 / game) | 2 (0.67 / game) |
| **Venue Goal Difference (GD)** | +8 | +0 |
| **Overall Record (GF / GA)** | 16 GF / 3 GA | 5 GF / 5 GA |

### Goal Profiles & Strength Indices (Dual-Baseline)
- **Primary Live Baselines (Saudi Arabia Division 1 2026/27)**: Home scoring avg 1.30, Away scoring avg 1.05
  - **Home Attacking Strength**: 3.00 ÷ 1.30 = 2.31
  - **Away Defensive Weakness**: 0.67 ÷ 1.30 = 0.51
  - **Away Attacking Strength**: 0.67 ÷ 1.05 = 0.63
  - **Home Defensive Weakness**: 0.33 ÷ 1.05 = 0.32
- **Historical Benchmark Baselines (Locked Catalog)**: Home scoring avg 1.35, Away scoring avg 1.10

### Expected Goals (λ) & Poisson Formulation
- **Primary Live Model**:
  - λ_home: 1.5462 | λ_away: 0.2106 | **λ_total: 1.7567**
  - **Poisson P(Over 1.5)**: **52.4%** (Weak for the Over 1.5-focused strategy)
  - Poisson P(Under 1.5): 47.6%
- **Companion Historical Benchmark**:
  - Hist λ_home: 1.4815 | Hist λ_away: 0.2020 | **Hist λ_total: 1.6899**
  - **Historical P(Over 1.5)**: **50.4%**
- **Dual-Baseline Alignment**: `[HIGH ALIGNMENT]` (2.06 pp delta)
  - *Interpretation*: Strong agreement between live season and historical benchmark (Delta ≤ 3.0 pp). High mathematical confidence.

### Market Pricing & Value Analysis
- **Offered Odds**: 1.22
- **Bookmaker Break-Even Probability**: 82.0%
- **Value Edge**: -29.5 percentage points (`[VERY LOW EDGE]`)
- **Expected Value (EV)**: -0.360 per unit staked

### Warnings & Negative Checks
- **`SMALL_SAMPLE`** [MEDIUM] (CONTRADICTORY / INDIRECT): Limited sample size of only 3 matches.
  - *Evidence*: Sample size below the 5-match threshold for statistical stability (3 vs 3).
- **`LOW_AWAY_SCORING`** [MEDIUM] (CONTRADICTORY / DIRECT): Al Orobah FC averages only 0.67 goals per game, increasing shutout risk.
  - *Evidence*: Al Orobah FC away scoring average is 0.67 GF/game, placing heavy reliance on Al Ula FC to produce goals.
- **`STRONG_DEFENSIVE_MATCHUP`** [HIGH] (CONTRADICTORY / DIRECT): Both teams maintain exceptionally tight defensive records.
  - *Evidence*: Al Ula FC concedes 0.33 GA/game and Al Orobah FC concedes 0.67 GA/game, elevating 0-0 and 1-0 probability.
- **`TEAM_NEWS_UNVERIFIED`** [LOW] (NEUTRAL / CONTEXTUAL): Pre-match team news and confirmed starting lineups remain unverified.
  - *Evidence*: Lineups have not been locked in; rotation or late injury risk unconfirmed.

### Final Decision Verdict: **NO BET**
> NO BET. Model estimates an 52.4% Over 1.5 probability versus bookmaker break-even of 82.0% at 1.22 odds (-29.5 edge, -0.360 EV). Estimated Over 1.5 probability (52.4%) is well below the 70% threshold for the Over 1.5 strategy.

---

## Summary Decision Table (Dual-Baseline Overview)

| Match | Market & Odds | Roy's Prob (Cur) | Hist. Prob | Alignment (Delta & Remark) | Edge (pp) & Remark | EV | Verdict | Warnings Summary |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: | :---: | :--- |
| **Walsall vs Salford City** | Over 1.5 @ 1.20 | **67.7%** | 68.1% | 0.4 pp (`very_high`) | -15.7 (`very_low`) | -0.188 | **NO BET** | `TEAM_NEWS_UNVERIFIED` |
| **Sevilla vs Osasuna** | Over 1.5 @ 1.38 | **97.7%** | 97.6% | 0.1 pp (`very_high`) | +25.2 (`very_high`) | +0.348 | **SELECT** | `SMALL_SAMPLE`, `TEAM_NEWS_UNVERIFIED` |
| **FC Andorra vs Burgos CF** | Over 1.5 @ 1.30 | **71.2%** | 68.8% | 2.3 pp (`high`) | -5.8 (`low`) | -0.075 | **CAUTION** | `SMALL_SAMPLE`, `LOW_AWAY_SCORING`, `TEAM_NEWS_UNVERIFIED` |
| **Paris Saint-Germain vs Olympique Lyonnais** | Over 1.5 @ 1.11 | **59.4%** | 63.1% | 3.8 pp (`medium`) | -30.7 (`very_low`) | -0.341 | **NO BET** | `SMALL_SAMPLE`, `TEAM_NEWS_UNVERIFIED` |
| **Montpellier vs Red Star FC** | Over 1.5 @ 1.25 | **27.6%** | 27.6% | 0.0 pp (`very_high`) | -52.4 (`very_low`) | -0.655 | **NO BET** | `SMALL_SAMPLE`, `LOW_HOME_SCORING`, `TEAM_NEWS_UNVERIFIED` |
| **US Boulogne vs Stade de Reims** | Over 1.5 @ 1.33 | **41.5%** | 42.2% | 0.7 pp (`very_high`) | -33.7 (`very_low`) | -0.448 | **NO BET** | `SMALL_SAMPLE`, `LOW_HOME_SCORING`, `TEAM_NEWS_UNVERIFIED` |
| **Santa Clara vs SL Benfica** | Over 1.5 @ 1.27 | **71.5%** | 72.0% | 0.5 pp (`very_high`) | -7.2 (`low`) | -0.091 | **CAUTION** | `SMALL_SAMPLE`, `STRONG_DEFENSIVE_MATCHUP`, `TEAM_NEWS_UNVERIFIED` |
| **SCU Torreense vs Amarante FC** | Over 1.5 @ 1.32 | **56.5%** | 55.1% | 1.5 pp (`very_high`) | -19.2 (`very_low`) | -0.254 | **NO BET** | `SMALL_SAMPLE`, `LOW_AWAY_SCORING`, `LOW_HOME_SCORING`, `TEAM_NEWS_UNVERIFIED` |
| **Coritiba vs Grêmio** | Over 1.5 @ 1.28 | **66.7%** | 65.8% | 0.9 pp (`very_high`) | -11.5 (`very_low`) | -0.147 | **NO BET** | `LOW_AWAY_SCORING`, `TEAM_NEWS_UNVERIFIED` |
| **CA Unión de Santa Fe vs Estudiantes de La Plata** | Over 1.5 @ 1.38 | **83.0%** | 82.2% | 0.8 pp (`very_high`) | +10.5 (`high`) | +0.145 | **SELECT** | `LOW_AWAY_SCORING`, `TEAM_NEWS_UNVERIFIED` |
| **FC Ararat-Armenia vs FC Noah** | Over 1.5 @ 1.28 | **69.5%** | 71.5% | 1.9 pp (`high`) | -8.6 (`low`) | -0.110 | **NO BET** | `SMALL_SAMPLE`, `TEAM_NEWS_UNVERIFIED` |
| **Busaiteen vs Bouri Cultural SC** | Over 1.5 @ 1.24 | *Halted* | *N/A* | *N/A* | N/A | N/A | **INSUFFICIENT DATA** | `MISSING_HOME_AWAY_DATA` |
| **Um Alhassam vs Al Budaiya** | Over 1.5 @ 1.29 | *Halted* | *N/A* | *N/A* | N/A | N/A | **INSUFFICIENT DATA** | `MISSING_HOME_AWAY_DATA` |
| **Al Shabab Manama vs Isa Town** | Over 1.5 @ 1.35 | *Halted* | *N/A* | *N/A* | N/A | N/A | **INSUFFICIENT DATA** | `MISSING_HOME_AWAY_DATA` |
| **CA Nacional Potosí vs Guabirá** | Over 1.5 @ 1.12 | **91.1%** | 91.4% | 0.3 pp (`very_high`) | +1.8 (`medium`) | +0.020 | **SELECT** | `TEAM_NEWS_UNVERIFIED` |
| **Lokomotiv Plovdiv vs PFK Slavia Sofia** | Over 1.5 @ 1.50 | **41.3%** | 40.7% | 0.6 pp (`very_high`) | -25.3 (`very_low`) | -0.380 | **NO BET** | `TEAM_NEWS_UNVERIFIED` |
| **CSKA Sofia vs PFC Ludogorets Razgrad** | Over 1.5 @ 1.27 | **83.0%** | 83.0% | 0.1 pp (`very_high`) | +4.3 (`medium`) | +0.054 | **CAUTION** | `SMALL_SAMPLE`, `STRONG_DEFENSIVE_MATCHUP`, `TEAM_NEWS_UNVERIFIED` |
| **Nea Salamina vs Pafos FC** | Over 1.5 @ 1.21 | **96.5%** | 96.9% | 0.3 pp (`very_high`) | +13.9 (`high`) | +0.168 | **CAUTION** | `SMALL_SAMPLE`, `LOW_HOME_SCORING`, `TEAM_NEWS_UNVERIFIED` |
| **AEK Larnaca vs Omonia Nicosia** | Over 1.5 @ 1.23 | **75.4%** | 74.9% | 0.5 pp (`very_high`) | -5.9 (`low`) | -0.073 | **CAUTION** | `SMALL_SAMPLE`, `TEAM_NEWS_UNVERIFIED` |
| **FC Copenhagen vs Odense BK** | Over 1.5 @ 1.17 | **83.5%** | 84.7% | 1.2 pp (`very_high`) | -2.0 (`low`) | -0.023 | **CAUTION** | `LOW_AWAY_SCORING`, `TEAM_NEWS_UNVERIFIED` |
| **Mosta FC vs Hibernians FC** | Over 1.5 @ 1.25 | **68.5%** | 69.6% | 1.0 pp (`very_high`) | -11.5 (`very_low`) | -0.143 | **NO BET** | `SMALL_SAMPLE`, `TEAM_NEWS_UNVERIFIED` |
| **Warta Poznan vs LKS Lodz** | Over 1.5 @ 1.25 | **72.7%** | 73.9% | 1.1 pp (`very_high`) | -7.3 (`low`) | -0.091 | **CAUTION** | `TEAM_NEWS_UNVERIFIED` |
| **ACS Sepsi OSK vs Universitatea Craiova** | Over 1.5 @ 1.27 | **76.6%** | 75.7% | 0.8 pp (`very_high`) | -2.2 (`low`) | -0.028 | **CAUTION** | `TEAM_NEWS_UNVERIFIED` |
| **Al Bukayriyah vs Hajer FC** | Over 1.5 @ 1.33 | **51.5%** | 49.2% | 2.2 pp (`high`) | -23.7 (`very_low`) | -0.315 | **NO BET** | `SMALL_SAMPLE`, `LOW_AWAY_SCORING`, `LOW_HOME_SCORING`, `TEAM_NEWS_UNVERIFIED` |
| **Al Anwar vs Al Akhdoud** | Over 1.5 @ 1.28 | **64.7%** | 62.6% | 2.1 pp (`high`) | -13.4 (`very_low`) | -0.172 | **NO BET** | `SMALL_SAMPLE`, `TEAM_NEWS_UNVERIFIED` |
| **Al Ula FC vs Al Orobah FC** | Over 1.5 @ 1.22 | **52.4%** | 50.4% | 2.1 pp (`high`) | -29.5 (`very_low`) | -0.360 | **NO BET** | `SMALL_SAMPLE`, `LOW_AWAY_SCORING`, `STRONG_DEFENSIVE_MATCHUP`, `TEAM_NEWS_UNVERIFIED` |