# ROY BETTING ENGINE — MATCH EVALUATION REPORT
**Model Version**: 2.1 (Over 1.5 Goals Focused — Dual-Baseline Protocol)
**Evaluation Date**: 2026-10-29
**Total Fixtures Evaluated**: 14 matches analyzed (10 skipped under Section 5.0 Hard-Stop)
**Market**: Over 1.5 Goals
**Methodology Enforcement**: Strict Venue-Specific Home/Away Protocol (Section 5.0), Dual-Baseline Protocol (Section 5.1A), & Hard-Stop Rule

---

## 1. Frosinone Calcio vs Lecce
- **Fixture**: Italy — Serie A | Date: 2026-10-29
- **Data Quality**: **Verified (Dual-Baseline Venue-Specific & Season-Overall Analysis)**

### Pre-Match Statistical Matchup Comparison

#### Venue Form (Used by Model Engine)
| Metric | Frosinone Calcio (Home @ Home) | Lecce (Away @ Away) |
| :--- | :---: | :---: |
| **League Standing** | 6th | 13th |
| **Venue Matches Played** | 4 | 4 |
| **Venue Goals Scored (GF)** | 9 (2.25 / game) | 3 (0.75 / game) |
| **Venue Goals Conceded (GA)** | 5 (1.25 / game) | 6 (1.50 / game) |

#### Season Overall (Macro Contextual Record)
| Metric | Frosinone Calcio (Overall) | Lecce (Overall) |
| :--- | :---: | :---: |
| **Overall Matches Played** | 8 | 8 |
| **Overall Goals Scored (GF)** | 17 (2.13 / game) | 7 (0.88 / game) |
| **Overall Goals Conceded (GA)** | 13 (1.63 / game) | 16 (2.00 / game) |

### Goal Profiles & Strength Indices (Dual-Baseline)
- **Primary Live Baselines (Serie A)**: Home scoring avg 1.48, Away scoring avg 1.18
  - Home Attacking Strength: 1.52
  - Away Defensive Weakness: 1.01
  - Away Attacking Strength: 0.64
  - Home Defensive Weakness: 1.06
- **Historical Benchmark Baselines**: Home scoring avg 1.45, Away scoring avg 1.15

### Expected Goals (Lambda) & Poisson Formulation
- **Primary Live Model**:
  - Lambda Home: 2.2804 | Lambda Away: 0.7945 | **Total Expected Goals (Lambda): 3.0749**
  - **Poisson P(Over 1.5)**: **81.2%** (Strong)
  - Poisson P(Under 1.5): 18.8%
- **Companion Historical Benchmark**:
  - Historical Total Expected Goals: 3.1428
  - **Historical P(Over 1.5)**: **82.1%**
- **Dual-Baseline Alignment**: `[VERY_HIGH ALIGNMENT]` (0.94 pp delta)

### Market Pricing & Value Analysis
- **Offered Odds**: 1.12
- **Bookmaker Break-Even Probability**: 89.3%
- **Value Edge**: -8.1 percentage points (`[LOW EDGE]`)
- **Expected Value (EV)**: -0.091 per unit staked

### Warnings & Negative Checks
- **`SMALL_SAMPLE`** [MEDIUM] (CONTRADICTORY / INDIRECT): Limited sample size of only 4 matches.
  - *Evidence*: Sample size below the 5-match threshold for statistical stability (4 vs 4).
- **`LOW_AWAY_SCORING`** [MEDIUM] (CONTRADICTORY / DIRECT): Lecce averages only 0.75 goals per game away, increasing shutout risk.
  - *Evidence*: Lecce away scoring average is 0.75 GF/game, placing heavy reliance on Frosinone Calcio to produce goals.
- **`TEAM_NEWS_UNVERIFIED`** [LOW] (NEUTRAL / CONTEXTUAL): Pre-match team news and confirmed starting lineups remain unverified.
  - *Evidence*: Lineups have not been locked in; rotation or late injury risk unconfirmed.

### Final Decision Verdict: **CAUTION**
> CAUTION. Model estimates an 81.2% Over 1.5 probability versus bookmaker break-even of 89.3% at 1.12 odds (-8.1 edge, -0.091 EV). Multiple medium warnings (SMALL_SAMPLE, LOW_AWAY_SCORING) warrant measured caution.

---

## 2. Fiorentina vs Atalanta
- **Fixture**: Italy — Serie A | Date: 2026-10-29
- **Data Quality**: **Verified (Dual-Baseline Venue-Specific & Season-Overall Analysis)**

### Pre-Match Statistical Matchup Comparison

#### Venue Form (Used by Model Engine)
| Metric | Fiorentina (Home @ Home) | Atalanta (Away @ Away) |
| :--- | :---: | :---: |
| **League Standing** | 18th | 11th |
| **Venue Matches Played** | 4 | 3 |
| **Venue Goals Scored (GF)** | 3 (0.75 / game) | 3 (1.00 / game) |
| **Venue Goals Conceded (GA)** | 9 (2.25 / game) | 7 (2.33 / game) |

#### Season Overall (Macro Contextual Record)
| Metric | Fiorentina (Overall) | Atalanta (Overall) |
| :--- | :---: | :---: |
| **Overall Matches Played** | 8 | 8 |
| **Overall Goals Scored (GF)** | 9 (1.13 / game) | 14 (1.75 / game) |
| **Overall Goals Conceded (GA)** | 19 (2.38 / game) | 15 (1.88 / game) |

### Goal Profiles & Strength Indices (Dual-Baseline)
- **Primary Live Baselines (Serie A)**: Home scoring avg 1.48, Away scoring avg 1.18
  - Home Attacking Strength: 0.51
  - Away Defensive Weakness: 1.58
  - Away Attacking Strength: 0.85
  - Home Defensive Weakness: 1.91
- **Historical Benchmark Baselines**: Home scoring avg 1.45, Away scoring avg 1.15

### Expected Goals (Lambda) & Poisson Formulation
- **Primary Live Model**:
  - Lambda Home: 1.1824 | Lambda Away: 1.9068 | **Total Expected Goals (Lambda): 3.0892**
  - **Poisson P(Over 1.5)**: **81.4%** (Strong)
  - Poisson P(Under 1.5): 18.6%
- **Companion Historical Benchmark**:
  - Historical Total Expected Goals: 3.1634
  - **Historical P(Over 1.5)**: **82.4%**
- **Dual-Baseline Alignment**: `[VERY_HIGH ALIGNMENT]` (1.02 pp delta)

### Market Pricing & Value Analysis
- **Offered Odds**: 1.16
- **Bookmaker Break-Even Probability**: 86.2%
- **Value Edge**: -4.8 percentage points (`[LOW EDGE]`)
- **Expected Value (EV)**: -0.056 per unit staked

### Warnings & Negative Checks
- **`SMALL_SAMPLE`** [MEDIUM] (CONTRADICTORY / INDIRECT): Limited sample size of only 3 matches.
  - *Evidence*: Sample size below the 5-match threshold for statistical stability (4 vs 3).
- **`LOW_HOME_SCORING`** [MEDIUM] (CONTRADICTORY / DIRECT): Fiorentina home scoring rate is low (0.75 GF/game).
  - *Evidence*: Fiorentina averages under 1.0 goal scored per home match across observed fixtures.
- **`TEAM_NEWS_UNVERIFIED`** [LOW] (NEUTRAL / CONTEXTUAL): Pre-match team news and confirmed starting lineups remain unverified.
  - *Evidence*: Lineups have not been locked in; rotation or late injury risk unconfirmed.

### Final Decision Verdict: **CAUTION**
> CAUTION. Model estimates an 81.4% Over 1.5 probability versus bookmaker break-even of 86.2% at 1.16 odds (-4.8 edge, -0.056 EV). Multiple medium warnings (SMALL_SAMPLE, LOW_HOME_SCORING) warrant measured caution.

---

## 3. Atletico MG vs Cruzeiro EC
- **Fixture**: Brazil — Serie A | Date: 2026-10-29
- **Data Quality**: **Verified (Dual-Baseline Venue-Specific & Season-Overall Analysis)**

### Pre-Match Statistical Matchup Comparison

#### Venue Form (Used by Model Engine)
| Metric | Atletico MG (Home @ Home) | Cruzeiro EC (Away @ Away) |
| :--- | :---: | :---: |
| **League Standing** | 6th | 3rd |
| **Venue Matches Played** | 16 | 16 |
| **Venue Goals Scored (GF)** | 27 (1.69 / game) | 24 (1.50 / game) |
| **Venue Goals Conceded (GA)** | 17 (1.06 / game) | 30 (1.88 / game) |

#### Season Overall (Macro Contextual Record)
| Metric | Atletico MG (Overall) | Cruzeiro EC (Overall) |
| :--- | :---: | :---: |
| **Overall Matches Played** | 32 | 32 |
| **Overall Goals Scored (GF)** | 44 (1.38 / game) | 51 (1.59 / game) |
| **Overall Goals Conceded (GA)** | 38 (1.19 / game) | 46 (1.44 / game) |

### Goal Profiles & Strength Indices (Dual-Baseline)
- **Primary Live Baselines (Serie A)**: Home scoring avg 1.38, Away scoring avg 1.02
  - Home Attacking Strength: 1.22
  - Away Defensive Weakness: 1.36
  - Away Attacking Strength: 1.47
  - Home Defensive Weakness: 1.04
- **Historical Benchmark Baselines**: Home scoring avg 1.40, Away scoring avg 1.00

### Expected Goals (Lambda) & Poisson Formulation
- **Primary Live Model**:
  - Lambda Home: 2.2928 | Lambda Away: 1.5625 | **Total Expected Goals (Lambda): 3.8553**
  - **Poisson P(Over 1.5)**: **89.7%** (Very strong)
  - Poisson P(Under 1.5): 10.3%
- **Companion Historical Benchmark**:
  - Historical Total Expected Goals: 3.8538
  - **Historical P(Over 1.5)**: **89.7%**
- **Dual-Baseline Alignment**: `[VERY_HIGH ALIGNMENT]` (0.01 pp delta)

### Market Pricing & Value Analysis
- **Offered Odds**: 1.24
- **Bookmaker Break-Even Probability**: 80.6%
- **Value Edge**: +9.1 percentage points (`[HIGH EDGE]`)
- **Expected Value (EV)**: +0.113 per unit staked

### Warnings & Negative Checks
- **`TEAM_NEWS_UNVERIFIED`** [LOW] (NEUTRAL / CONTEXTUAL): Pre-match team news and confirmed starting lineups remain unverified.
  - *Evidence*: Lineups have not been locked in; rotation or late injury risk unconfirmed.

### Final Decision Verdict: **SELECT**
> SELECT. Model estimates an 89.7% Over 1.5 probability versus bookmaker break-even of 80.6% at 1.24 odds (+9.1 edge, +0.113 EV). Strong probability (89.7%) supported by positive edge (+9.1pp, EV +0.113) and acceptable risk profile.

---

## 4. Inter Turku vs HJK Helsinki
- **Fixture**: Finland — Veikkausliiga | Date: 2026-10-29
- **Data Quality**: **Verified (Dual-Baseline Venue-Specific & Season-Overall Analysis)**

### Pre-Match Statistical Matchup Comparison

#### Venue Form (Used by Model Engine)
| Metric | Inter Turku (Home @ Home) | HJK Helsinki (Away @ Away) |
| :--- | :---: | :---: |
| **League Standing** | 1st | 2nd |
| **Venue Matches Played** | 14 | 14 |
| **Venue Goals Scored (GF)** | 22 (1.57 / game) | 23 (1.64 / game) |
| **Venue Goals Conceded (GA)** | 8 (0.57 / game) | 17 (1.21 / game) |

#### Season Overall (Macro Contextual Record)
| Metric | Inter Turku (Overall) | HJK Helsinki (Overall) |
| :--- | :---: | :---: |
| **Overall Matches Played** | 29 | 29 |
| **Overall Goals Scored (GF)** | 35 (1.21 / game) | 55 (1.90 / game) |
| **Overall Goals Conceded (GA)** | 20 (0.69 / game) | 34 (1.17 / game) |

### Goal Profiles & Strength Indices (Dual-Baseline)
- **Primary Live Baselines (Veikkausliiga)**: Home scoring avg 1.45, Away scoring avg 1.25
  - Home Attacking Strength: 1.08
  - Away Defensive Weakness: 0.84
  - Away Attacking Strength: 1.31
  - Home Defensive Weakness: 0.46
- **Historical Benchmark Baselines**: Home scoring avg 1.45, Away scoring avg 1.25

### Expected Goals (Lambda) & Poisson Formulation
- **Primary Live Model**:
  - Lambda Home: 1.3160 | Lambda Away: 0.7510 | **Total Expected Goals (Lambda): 2.0670**
  - **Poisson P(Over 1.5)**: **61.2%** (Weak for the Over 1.5-focused strategy)
  - Poisson P(Under 1.5): 38.8%
- **Companion Historical Benchmark**:
  - Historical Total Expected Goals: 2.0670
  - **Historical P(Over 1.5)**: **61.2%**
- **Dual-Baseline Alignment**: `[VERY_HIGH ALIGNMENT]` (0.00 pp delta)

### Market Pricing & Value Analysis
- **Offered Odds**: 1.23
- **Bookmaker Break-Even Probability**: 81.3%
- **Value Edge**: -20.1 percentage points (`[VERY_LOW EDGE]`)
- **Expected Value (EV)**: -0.247 per unit staked

### Warnings & Negative Checks
- **`TEAM_NEWS_UNVERIFIED`** [LOW] (NEUTRAL / CONTEXTUAL): Pre-match team news and confirmed starting lineups remain unverified.
  - *Evidence*: Lineups have not been locked in; rotation or late injury risk unconfirmed.

### Final Decision Verdict: **NO BET**
> NO BET. Model estimates an 61.2% Over 1.5 probability versus bookmaker break-even of 81.3% at 1.23 odds (-20.1 edge, -0.247 EV). Estimated Over 1.5 probability (61.2%) is well below the 70% threshold for the Over 1.5 strategy.

---

## 5. KuPS Kuopio vs IF Gnistan
- **Fixture**: Finland — Veikkausliiga | Date: 2026-10-29
- **Data Quality**: **Verified (Dual-Baseline Venue-Specific & Season-Overall Analysis)**

### Pre-Match Statistical Matchup Comparison

#### Venue Form (Used by Model Engine)
| Metric | KuPS Kuopio (Home @ Home) | IF Gnistan (Away @ Away) |
| :--- | :---: | :---: |
| **League Standing** | 3rd | 5th |
| **Venue Matches Played** | 14 | 14 |
| **Venue Goals Scored (GF)** | 23 (1.64 / game) | 17 (1.21 / game) |
| **Venue Goals Conceded (GA)** | 15 (1.07 / game) | 18 (1.29 / game) |

#### Season Overall (Macro Contextual Record)
| Metric | KuPS Kuopio (Overall) | IF Gnistan (Overall) |
| :--- | :---: | :---: |
| **Overall Matches Played** | 29 | 29 |
| **Overall Goals Scored (GF)** | 45 (1.55 / game) | 40 (1.38 / game) |
| **Overall Goals Conceded (GA)** | 28 (0.97 / game) | 37 (1.28 / game) |

### Goal Profiles & Strength Indices (Dual-Baseline)
- **Primary Live Baselines (Veikkausliiga)**: Home scoring avg 1.45, Away scoring avg 1.25
  - Home Attacking Strength: 1.13
  - Away Defensive Weakness: 0.89
  - Away Attacking Strength: 0.97
  - Home Defensive Weakness: 0.86
- **Historical Benchmark Baselines**: Home scoring avg 1.45, Away scoring avg 1.25

### Expected Goals (Lambda) & Poisson Formulation
- **Primary Live Model**:
  - Lambda Home: 1.4567 | Lambda Away: 1.0408 | **Total Expected Goals (Lambda): 2.4975**
  - **Poisson P(Over 1.5)**: **71.2%** (Moderate)
  - Poisson P(Under 1.5): 28.8%
- **Companion Historical Benchmark**:
  - Historical Total Expected Goals: 2.4975
  - **Historical P(Over 1.5)**: **71.2%**
- **Dual-Baseline Alignment**: `[VERY_HIGH ALIGNMENT]` (0.00 pp delta)

### Market Pricing & Value Analysis
- **Offered Odds**: 1.23
- **Bookmaker Break-Even Probability**: 81.3%
- **Value Edge**: -10.1 percentage points (`[VERY_LOW EDGE]`)
- **Expected Value (EV)**: -0.124 per unit staked

### Warnings & Negative Checks
- **`TEAM_NEWS_UNVERIFIED`** [LOW] (NEUTRAL / CONTEXTUAL): Pre-match team news and confirmed starting lineups remain unverified.
  - *Evidence*: Lineups have not been locked in; rotation or late injury risk unconfirmed.

### Final Decision Verdict: **NO BET**
> NO BET. Model estimates an 71.2% Over 1.5 probability versus bookmaker break-even of 81.3% at 1.23 odds (-10.1 edge, -0.124 EV). Significant negative expected value (-0.124) and pricing mismatch (-10.1pp edge) violate Principle 8.

---

## 6. Sporting Cristal vs Alianza Lima
- **Fixture**: Peru — Liga 1 | Date: 2026-10-29
- **Data Quality**: **Verified (Dual-Baseline Venue-Specific & Season-Overall Analysis)**

### Pre-Match Statistical Matchup Comparison

#### Venue Form (Used by Model Engine)
| Metric | Sporting Cristal (Home @ Home) | Alianza Lima (Away @ Away) |
| :--- | :---: | :---: |
| **League Standing** | 4th | 7th |
| **Venue Matches Played** | 6 | 5 |
| **Venue Goals Scored (GF)** | 19 (3.17 / game) | 7 (1.40 / game) |
| **Venue Goals Conceded (GA)** | 4 (0.67 / game) | 5 (1.00 / game) |

#### Season Overall (Macro Contextual Record)
| Metric | Sporting Cristal (Overall) | Alianza Lima (Overall) |
| :--- | :---: | :---: |
| **Overall Matches Played** | 13 | 13 |
| **Overall Goals Scored (GF)** | 26 (2.00 / game) | 20 (1.54 / game) |
| **Overall Goals Conceded (GA)** | 15 (1.15 / game) | 12 (0.92 / game) |

### Goal Profiles & Strength Indices (Dual-Baseline)
- **Primary Live Baselines (Liga 1)**: Home scoring avg 1.45, Away scoring avg 1.05
  - Home Attacking Strength: 2.18
  - Away Defensive Weakness: 0.69
  - Away Attacking Strength: 1.33
  - Home Defensive Weakness: 0.63
- **Historical Benchmark Baselines**: Home scoring avg 1.45, Away scoring avg 1.05

### Expected Goals (Lambda) & Poisson Formulation
- **Primary Live Model**:
  - Lambda Home: 2.1839 | Lambda Away: 0.8889 | **Total Expected Goals (Lambda): 3.0728**
  - **Poisson P(Over 1.5)**: **81.1%** (Strong)
  - Poisson P(Under 1.5): 18.9%
- **Companion Historical Benchmark**:
  - Historical Total Expected Goals: 3.0728
  - **Historical P(Over 1.5)**: **81.1%**
- **Dual-Baseline Alignment**: `[VERY_HIGH ALIGNMENT]` (0.00 pp delta)

### Market Pricing & Value Analysis
- **Offered Odds**: 1.27
- **Bookmaker Break-Even Probability**: 78.7%
- **Value Edge**: +2.4 percentage points (`[MEDIUM EDGE]`)
- **Expected Value (EV)**: +0.031 per unit staked

### Warnings & Negative Checks
- **`TEAM_NEWS_UNVERIFIED`** [LOW] (NEUTRAL / CONTEXTUAL): Pre-match team news and confirmed starting lineups remain unverified.
  - *Evidence*: Lineups have not been locked in; rotation or late injury risk unconfirmed.

### Final Decision Verdict: **SELECT**
> SELECT. Model estimates an 81.1% Over 1.5 probability versus bookmaker break-even of 78.7% at 1.27 odds (+2.4 edge, +0.031 EV). Strong probability (81.1%) supported by positive edge (+2.4pp, EV +0.031) and acceptable risk profile.

---

## 7. FK Sutjeska Niksic vs FK Jezero Plav
- **Fixture**: Montenegro — First League | Date: 2026-10-29
- **Data Quality**: **Verified (Dual-Baseline Venue-Specific & Season-Overall Analysis)**

### Pre-Match Statistical Matchup Comparison

#### Venue Form (Used by Model Engine)
| Metric | FK Sutjeska Niksic (Home @ Home) | FK Jezero Plav (Away @ Away) |
| :--- | :---: | :---: |
| **League Standing** | 4th | 9th |
| **Venue Matches Played** | 6 | 6 |
| **Venue Goals Scored (GF)** | 13 (2.17 / game) | 5 (0.83 / game) |
| **Venue Goals Conceded (GA)** | 6 (1.00 / game) | 15 (2.50 / game) |

#### Season Overall (Macro Contextual Record)
| Metric | FK Sutjeska Niksic (Overall) | FK Jezero Plav (Overall) |
| :--- | :---: | :---: |
| **Overall Matches Played** | 12 | 12 |
| **Overall Goals Scored (GF)** | 15 (1.25 / game) | 13 (1.08 / game) |
| **Overall Goals Conceded (GA)** | 8 (0.67 / game) | 20 (1.67 / game) |

### Goal Profiles & Strength Indices (Dual-Baseline)
- **Primary Live Baselines (First League)**: Home scoring avg 1.30, Away scoring avg 1.00
  - Home Attacking Strength: 1.67
  - Away Defensive Weakness: 1.92
  - Away Attacking Strength: 0.83
  - Home Defensive Weakness: 1.00
- **Historical Benchmark Baselines**: Home scoring avg 1.30, Away scoring avg 1.00

### Expected Goals (Lambda) & Poisson Formulation
- **Primary Live Model**:
  - Lambda Home: 4.1667 | Lambda Away: 0.8333 | **Total Expected Goals (Lambda): 5.0000**
  - **Poisson P(Over 1.5)**: **96.0%** (Extremely strong)
  - Poisson P(Under 1.5): 4.0%
- **Companion Historical Benchmark**:
  - Historical Total Expected Goals: 5.0000
  - **Historical P(Over 1.5)**: **96.0%**
- **Dual-Baseline Alignment**: `[VERY_HIGH ALIGNMENT]` (0.00 pp delta)

### Market Pricing & Value Analysis
- **Offered Odds**: 1.33
- **Bookmaker Break-Even Probability**: 75.2%
- **Value Edge**: +20.8 percentage points (`[VERY_HIGH EDGE]`)
- **Expected Value (EV)**: +0.276 per unit staked

### Warnings & Negative Checks
- **`LOW_AWAY_SCORING`** [MEDIUM] (CONTRADICTORY / DIRECT): FK Jezero Plav averages only 0.83 goals per game away, increasing shutout risk.
  - *Evidence*: FK Jezero Plav away scoring average is 0.83 GF/game, placing heavy reliance on FK Sutjeska Niksic to produce goals.
- **`TEAM_NEWS_UNVERIFIED`** [LOW] (NEUTRAL / CONTEXTUAL): Pre-match team news and confirmed starting lineups remain unverified.
  - *Evidence*: Lineups have not been locked in; rotation or late injury risk unconfirmed.

### Final Decision Verdict: **SELECT**
> SELECT. Model estimates an 96.0% Over 1.5 probability versus bookmaker break-even of 75.2% at 1.33 odds (+20.8 edge, +0.276 EV). Strong probability (96.0%) supported by positive edge (+20.8pp, EV +0.276) and acceptable risk profile.

---

## 8. FC Yantra 2019 Gabrovo vs FK Hebar Pazardzhik
- **Fixture**: Bulgaria — Second League | Date: 2026-10-29
- **Data Quality**: **Verified (Dual-Baseline Venue-Specific & Season-Overall Analysis)**

### Pre-Match Statistical Matchup Comparison

#### Venue Form (Used by Model Engine)
| Metric | FC Yantra 2019 Gabrovo (Home @ Home) | FK Hebar Pazardzhik (Away @ Away) |
| :--- | :---: | :---: |
| **League Standing** | 7th | 6th |
| **Venue Matches Played** | 7 | 7 |
| **Venue Goals Scored (GF)** | 10 (1.43 / game) | 18 (2.57 / game) |
| **Venue Goals Conceded (GA)** | 5 (0.71 / game) | 13 (1.86 / game) |

#### Season Overall (Macro Contextual Record)
| Metric | FC Yantra 2019 Gabrovo (Overall) | FK Hebar Pazardzhik (Overall) |
| :--- | :---: | :---: |
| **Overall Matches Played** | 13 | 13 |
| **Overall Goals Scored (GF)** | 16 (1.23 / game) | 29 (2.23 / game) |
| **Overall Goals Conceded (GA)** | 14 (1.08 / game) | 21 (1.62 / game) |

### Goal Profiles & Strength Indices (Dual-Baseline)
- **Primary Live Baselines (Second League)**: Home scoring avg 1.35, Away scoring avg 1.10
  - Home Attacking Strength: 1.06
  - Away Defensive Weakness: 1.38
  - Away Attacking Strength: 2.34
  - Home Defensive Weakness: 0.65
- **Historical Benchmark Baselines**: Home scoring avg 1.35, Away scoring avg 1.05

### Expected Goals (Lambda) & Poisson Formulation
- **Primary Live Model**:
  - Lambda Home: 1.9652 | Lambda Away: 1.6698 | **Total Expected Goals (Lambda): 3.6350**
  - **Poisson P(Over 1.5)**: **87.8%** (Very strong)
  - Poisson P(Under 1.5): 12.2%
- **Companion Historical Benchmark**:
  - Historical Total Expected Goals: 3.7145
  - **Historical P(Over 1.5)**: **88.5%**
- **Dual-Baseline Alignment**: `[VERY_HIGH ALIGNMENT]` (0.74 pp delta)

### Market Pricing & Value Analysis
- **Offered Odds**: 1.26
- **Bookmaker Break-Even Probability**: 79.4%
- **Value Edge**: +8.4 percentage points (`[HIGH EDGE]`)
- **Expected Value (EV)**: +0.106 per unit staked

### Warnings & Negative Checks
- **`TEAM_NEWS_UNVERIFIED`** [LOW] (NEUTRAL / CONTEXTUAL): Pre-match team news and confirmed starting lineups remain unverified.
  - *Evidence*: Lineups have not been locked in; rotation or late injury risk unconfirmed.

### Final Decision Verdict: **SELECT**
> SELECT. Model estimates an 87.8% Over 1.5 probability versus bookmaker break-even of 79.4% at 1.26 odds (+8.4 edge, +0.106 EV). Strong probability (87.8%) supported by positive edge (+8.4pp, EV +0.106) and acceptable risk profile.

---

## 9. FC Deportivo Mixco vs Xelaju MC
- **Fixture**: Guatemala — Liga Nacional | Date: 2026-10-29
- **Data Quality**: **Verified (Dual-Baseline Venue-Specific & Season-Overall Analysis)**

### Pre-Match Statistical Matchup Comparison

#### Venue Form (Used by Model Engine)
| Metric | FC Deportivo Mixco (Home @ Home) | Xelaju MC (Away @ Away) |
| :--- | :---: | :---: |
| **League Standing** | 4th | 5th |
| **Venue Matches Played** | 8 | 8 |
| **Venue Goals Scored (GF)** | 18 (2.25 / game) | 9 (1.13 / game) |
| **Venue Goals Conceded (GA)** | 7 (0.88 / game) | 12 (1.50 / game) |

#### Season Overall (Macro Contextual Record)
| Metric | FC Deportivo Mixco (Overall) | Xelaju MC (Overall) |
| :--- | :---: | :---: |
| **Overall Matches Played** | 16 | 16 |
| **Overall Goals Scored (GF)** | 27 (1.69 / game) | 28 (1.75 / game) |
| **Overall Goals Conceded (GA)** | 24 (1.50 / game) | 20 (1.25 / game) |

### Goal Profiles & Strength Indices (Dual-Baseline)
- **Primary Live Baselines (Liga Nacional)**: Home scoring avg 1.55, Away scoring avg 1.05
  - Home Attacking Strength: 1.45
  - Away Defensive Weakness: 0.97
  - Away Attacking Strength: 1.07
  - Home Defensive Weakness: 0.83
- **Historical Benchmark Baselines**: Home scoring avg 1.55, Away scoring avg 1.05

### Expected Goals (Lambda) & Poisson Formulation
- **Primary Live Model**:
  - Lambda Home: 2.1774 | Lambda Away: 0.9375 | **Total Expected Goals (Lambda): 3.1149**
  - **Poisson P(Over 1.5)**: **81.7%** (Strong)
  - Poisson P(Under 1.5): 18.3%
- **Companion Historical Benchmark**:
  - Historical Total Expected Goals: 3.1149
  - **Historical P(Over 1.5)**: **81.7%**
- **Dual-Baseline Alignment**: `[VERY_HIGH ALIGNMENT]` (0.00 pp delta)

### Market Pricing & Value Analysis
- **Offered Odds**: 1.25
- **Bookmaker Break-Even Probability**: 80.0%
- **Value Edge**: +1.7 percentage points (`[MEDIUM EDGE]`)
- **Expected Value (EV)**: +0.022 per unit staked

### Warnings & Negative Checks
- **`TEAM_NEWS_UNVERIFIED`** [LOW] (NEUTRAL / CONTEXTUAL): Pre-match team news and confirmed starting lineups remain unverified.
  - *Evidence*: Lineups have not been locked in; rotation or late injury risk unconfirmed.

### Final Decision Verdict: **SELECT**
> SELECT. Model estimates an 81.7% Over 1.5 probability versus bookmaker break-even of 80.0% at 1.25 odds (+1.7 edge, +0.022 EV). Strong probability (81.7%) supported by positive edge (+1.7pp, EV +0.022) and acceptable risk profile.

---

## 10. Pyramids FC vs Wadi Degla FC
- **Fixture**: Egypt — Premier League | Date: 2026-10-29
- **Data Quality**: **Verified (Dual-Baseline Venue-Specific & Season-Overall Analysis)**

### Pre-Match Statistical Matchup Comparison

#### Venue Form (Used by Model Engine)
| Metric | Pyramids FC (Home @ Home) | Wadi Degla FC (Away @ Away) |
| :--- | :---: | :---: |
| **League Standing** | 1st | 14th |
| **Venue Matches Played** | 3 | 3 |
| **Venue Goals Scored (GF)** | 7 (2.33 / game) | 6 (2.00 / game) |
| **Venue Goals Conceded (GA)** | 1 (0.33 / game) | 3 (1.00 / game) |

#### Season Overall (Macro Contextual Record)
| Metric | Pyramids FC (Overall) | Wadi Degla FC (Overall) |
| :--- | :---: | :---: |
| **Overall Matches Played** | 7 | 7 |
| **Overall Goals Scored (GF)** | 17 (2.43 / game) | 7 (1.00 / game) |
| **Overall Goals Conceded (GA)** | 3 (0.43 / game) | 8 (1.14 / game) |

### Goal Profiles & Strength Indices (Dual-Baseline)
- **Primary Live Baselines (Premier League)**: Home scoring avg 1.25, Away scoring avg 0.95
  - Home Attacking Strength: 1.87
  - Away Defensive Weakness: 0.80
  - Away Attacking Strength: 2.11
  - Home Defensive Weakness: 0.35
- **Historical Benchmark Baselines**: Home scoring avg 1.25, Away scoring avg 0.95

### Expected Goals (Lambda) & Poisson Formulation
- **Primary Live Model**:
  - Lambda Home: 1.8667 | Lambda Away: 0.7018 | **Total Expected Goals (Lambda): 2.5684**
  - **Poisson P(Over 1.5)**: **72.6%** (Moderate)
  - Poisson P(Under 1.5): 27.4%
- **Companion Historical Benchmark**:
  - Historical Total Expected Goals: 2.5684
  - **Historical P(Over 1.5)**: **72.6%**
- **Dual-Baseline Alignment**: `[VERY_HIGH ALIGNMENT]` (0.00 pp delta)

### Market Pricing & Value Analysis
- **Offered Odds**: 1.24
- **Bookmaker Break-Even Probability**: 80.6%
- **Value Edge**: -8.0 percentage points (`[LOW EDGE]`)
- **Expected Value (EV)**: -0.099 per unit staked

### Warnings & Negative Checks
- **`SMALL_SAMPLE`** [MEDIUM] (CONTRADICTORY / INDIRECT): Limited sample size of only 3 matches.
  - *Evidence*: Sample size below the 5-match threshold for statistical stability (3 vs 3).
- **`TEAM_NEWS_UNVERIFIED`** [LOW] (NEUTRAL / CONTEXTUAL): Pre-match team news and confirmed starting lineups remain unverified.
  - *Evidence*: Lineups have not been locked in; rotation or late injury risk unconfirmed.

### Final Decision Verdict: **CAUTION**
> CAUTION. Model estimates an 72.6% Over 1.5 probability versus bookmaker break-even of 80.6% at 1.24 odds (-8.0 edge, -0.099 EV). High probability (72.6%), but pricing offers no positive edge (-8.0pp). Disclosed under Principle 9.

---

## 11. Modern Sport FC vs Al Ahly Cairo
- **Fixture**: Egypt — Premier League | Date: 2026-10-29
- **Data Quality**: **Verified (Dual-Baseline Venue-Specific & Season-Overall Analysis)**

### Pre-Match Statistical Matchup Comparison

#### Venue Form (Used by Model Engine)
| Metric | Modern Sport FC (Home @ Home) | Al Ahly Cairo (Away @ Away) |
| :--- | :---: | :---: |
| **League Standing** | 5th | 2nd |
| **Venue Matches Played** | 3 | 3 |
| **Venue Goals Scored (GF)** | 7 (2.33 / game) | 5 (1.67 / game) |
| **Venue Goals Conceded (GA)** | 3 (1.00 / game) | 1 (0.33 / game) |

#### Season Overall (Macro Contextual Record)
| Metric | Modern Sport FC (Overall) | Al Ahly Cairo (Overall) |
| :--- | :---: | :---: |
| **Overall Matches Played** | 7 | 7 |
| **Overall Goals Scored (GF)** | 12 (1.71 / game) | 14 (2.00 / game) |
| **Overall Goals Conceded (GA)** | 9 (1.29 / game) | 6 (0.86 / game) |

### Goal Profiles & Strength Indices (Dual-Baseline)
- **Primary Live Baselines (Premier League)**: Home scoring avg 1.25, Away scoring avg 0.95
  - Home Attacking Strength: 1.87
  - Away Defensive Weakness: 0.27
  - Away Attacking Strength: 1.75
  - Home Defensive Weakness: 1.05
- **Historical Benchmark Baselines**: Home scoring avg 1.25, Away scoring avg 0.95

### Expected Goals (Lambda) & Poisson Formulation
- **Primary Live Model**:
  - Lambda Home: 0.6222 | Lambda Away: 1.7544 | **Total Expected Goals (Lambda): 2.3766**
  - **Poisson P(Over 1.5)**: **68.6%** (Weak for the Over 1.5-focused strategy)
  - Poisson P(Under 1.5): 31.4%
- **Companion Historical Benchmark**:
  - Historical Total Expected Goals: 2.3766
  - **Historical P(Over 1.5)**: **68.6%**
- **Dual-Baseline Alignment**: `[VERY_HIGH ALIGNMENT]` (0.00 pp delta)

### Market Pricing & Value Analysis
- **Offered Odds**: 1.33
- **Bookmaker Break-Even Probability**: 75.2%
- **Value Edge**: -6.5 percentage points (`[LOW EDGE]`)
- **Expected Value (EV)**: -0.087 per unit staked

### Warnings & Negative Checks
- **`SMALL_SAMPLE`** [MEDIUM] (CONTRADICTORY / INDIRECT): Limited sample size of only 3 matches.
  - *Evidence*: Sample size below the 5-match threshold for statistical stability (3 vs 3).
- **`TEAM_NEWS_UNVERIFIED`** [LOW] (NEUTRAL / CONTEXTUAL): Pre-match team news and confirmed starting lineups remain unverified.
  - *Evidence*: Lineups have not been locked in; rotation or late injury risk unconfirmed.

### Final Decision Verdict: **NO BET**
> NO BET. Model estimates an 68.6% Over 1.5 probability versus bookmaker break-even of 75.2% at 1.33 odds (-6.5 edge, -0.087 EV). Estimated Over 1.5 probability (68.6%) is well below the 70% threshold for the Over 1.5 strategy.

---

## 12. Fajr Sepasi Shiraz FC vs Tractor
- **Fixture**: Iran — Pro League | Date: 2026-10-29
- **Data Quality**: **Verified (Dual-Baseline Venue-Specific & Season-Overall Analysis)**

### Pre-Match Statistical Matchup Comparison

#### Venue Form (Used by Model Engine)
| Metric | Fajr Sepasi Shiraz FC (Home @ Home) | Tractor (Away @ Away) |
| :--- | :---: | :---: |
| **League Standing** | 8th | 3rd |
| **Venue Matches Played** | 5 | 4 |
| **Venue Goals Scored (GF)** | 6 (1.20 / game) | 4 (1.00 / game) |
| **Venue Goals Conceded (GA)** | 3 (0.60 / game) | 1 (0.25 / game) |

#### Season Overall (Macro Contextual Record)
| Metric | Fajr Sepasi Shiraz FC (Overall) | Tractor (Overall) |
| :--- | :---: | :---: |
| **Overall Matches Played** | 10 | 9 |
| **Overall Goals Scored (GF)** | 10 (1.00 / game) | 12 (1.33 / game) |
| **Overall Goals Conceded (GA)** | 12 (1.20 / game) | 2 (0.22 / game) |

### Goal Profiles & Strength Indices (Dual-Baseline)
- **Primary Live Baselines (Pro League)**: Home scoring avg 1.15, Away scoring avg 0.85
  - Home Attacking Strength: 1.04
  - Away Defensive Weakness: 0.22
  - Away Attacking Strength: 1.18
  - Home Defensive Weakness: 0.71
- **Historical Benchmark Baselines**: Home scoring avg 1.20, Away scoring avg 0.90

### Expected Goals (Lambda) & Poisson Formulation
- **Primary Live Model**:
  - Lambda Home: 0.2609 | Lambda Away: 0.7059 | **Total Expected Goals (Lambda): 0.9668**
  - **Poisson P(Over 1.5)**: **25.2%** (Weak for the Over 1.5-focused strategy)
  - Poisson P(Under 1.5): 74.8%
- **Companion Historical Benchmark**:
  - Historical Total Expected Goals: 0.9167
  - **Historical P(Over 1.5)**: **23.4%**
- **Dual-Baseline Alignment**: `[HIGH ALIGNMENT]` (1.84 pp delta)

### Market Pricing & Value Analysis
- **Offered Odds**: 1.45
- **Bookmaker Break-Even Probability**: 69.0%
- **Value Edge**: -43.8 percentage points (`[VERY_LOW EDGE]`)
- **Expected Value (EV)**: -0.635 per unit staked

### Warnings & Negative Checks
- **`SMALL_SAMPLE`** [MEDIUM] (CONTRADICTORY / INDIRECT): Limited sample size of only 4 matches.
  - *Evidence*: Sample size below the 5-match threshold for statistical stability (5 vs 4).
- **`STRONG_DEFENSIVE_MATCHUP`** [HIGH] (CONTRADICTORY / DIRECT): Both teams maintain exceptionally tight defensive records.
  - *Evidence*: Fajr Sepasi Shiraz FC concedes 0.60 GA/game and Tractor concedes 0.25 GA/game, elevating 0-0 and 1-0 probability.
- **`TEAM_NEWS_UNVERIFIED`** [LOW] (NEUTRAL / CONTEXTUAL): Pre-match team news and confirmed starting lineups remain unverified.
  - *Evidence*: Lineups have not been locked in; rotation or late injury risk unconfirmed.

### Final Decision Verdict: **NO BET**
> NO BET. Model estimates an 25.2% Over 1.5 probability versus bookmaker break-even of 69.0% at 1.45 odds (-43.8 edge, -0.635 EV). Estimated Over 1.5 probability (25.2%) is well below the 70% threshold for the Over 1.5 strategy.

---

## 13. CS Sfaxien vs Esperance Tunis
- **Fixture**: Tunisia — Ligue 1 | Date: 2026-10-29
- **Data Quality**: **Verified (Dual-Baseline Venue-Specific & Season-Overall Analysis)**

### Pre-Match Statistical Matchup Comparison

#### Venue Form (Used by Model Engine)
| Metric | CS Sfaxien (Home @ Home) | Esperance Tunis (Away @ Away) |
| :--- | :---: | :---: |
| **League Standing** | 5th | 2nd |
| **Venue Matches Played** | 3 | 2 |
| **Venue Goals Scored (GF)** | 4 (1.33 / game) | 3 (1.50 / game) |
| **Venue Goals Conceded (GA)** | 1 (0.33 / game) | 2 (1.00 / game) |

#### Season Overall (Macro Contextual Record)
| Metric | CS Sfaxien (Overall) | Esperance Tunis (Overall) |
| :--- | :---: | :---: |
| **Overall Matches Played** | 5 | 5 |
| **Overall Goals Scored (GF)** | 6 (1.20 / game) | 10 (2.00 / game) |
| **Overall Goals Conceded (GA)** | 4 (0.80 / game) | 7 (1.40 / game) |

### Goal Profiles & Strength Indices (Dual-Baseline)
- **Primary Live Baselines (Ligue 1)**: Home scoring avg 1.20, Away scoring avg 0.85
  - Home Attacking Strength: 1.11
  - Away Defensive Weakness: 0.83
  - Away Attacking Strength: 1.76
  - Home Defensive Weakness: 0.39
- **Historical Benchmark Baselines**: Home scoring avg 1.20, Away scoring avg 0.85

### Expected Goals (Lambda) & Poisson Formulation
- **Primary Live Model**:
  - Lambda Home: 1.1111 | Lambda Away: 0.5882 | **Total Expected Goals (Lambda): 1.6993**
  - **Poisson P(Over 1.5)**: **50.7%** (Weak for the Over 1.5-focused strategy)
  - Poisson P(Under 1.5): 49.3%
- **Companion Historical Benchmark**:
  - Historical Total Expected Goals: 1.6993
  - **Historical P(Over 1.5)**: **50.7%**
- **Dual-Baseline Alignment**: `[VERY_HIGH ALIGNMENT]` (0.00 pp delta)

### Market Pricing & Value Analysis
- **Offered Odds**: 1.23
- **Bookmaker Break-Even Probability**: 81.3%
- **Value Edge**: -30.6 percentage points (`[VERY_LOW EDGE]`)
- **Expected Value (EV)**: -0.377 per unit staked

### Warnings & Negative Checks
- **`SMALL_SAMPLE`** [CRITICAL] (CONTRADICTORY / DIRECT): Extreme small-sample distortion: only 2 match(es) played by one or both teams in this venue.
  - *Evidence*: CS Sfaxien played 3 venue matches; Esperance Tunis played 2 venue matches.
- **`TEAM_NEWS_UNVERIFIED`** [LOW] (NEUTRAL / CONTEXTUAL): Pre-match team news and confirmed starting lineups remain unverified.
  - *Evidence*: Lineups have not been locked in; rotation or late injury risk unconfirmed.

### Final Decision Verdict: **NO BET**
> NO BET. Extreme small-sample distortion (2 venue matches) renders the statistical signal uncalibrated. Violated minimum sample requirements.

---

## 14. MAS Maghreb Fes vs RS Berkane
- **Fixture**: Morocco — Botola 1 | Date: 2026-10-29
- **Data Quality**: **Verified (Dual-Baseline Venue-Specific & Season-Overall Analysis)**

### Pre-Match Statistical Matchup Comparison

#### Venue Form (Used by Model Engine)
| Metric | MAS Maghreb Fes (Home @ Home) | RS Berkane (Away @ Away) |
| :--- | :---: | :---: |
| **League Standing** | 6th | 14th |
| **Venue Matches Played** | 2 | 1 |
| **Venue Goals Scored (GF)** | 3 (1.50 / game) | 1 (1.00 / game) |
| **Venue Goals Conceded (GA)** | 2 (1.00 / game) | 1 (1.00 / game) |

#### Season Overall (Macro Contextual Record)
| Metric | MAS Maghreb Fes (Overall) | RS Berkane (Overall) |
| :--- | :---: | :---: |
| **Overall Matches Played** | 4 | 3 |
| **Overall Goals Scored (GF)** | 5 (1.25 / game) | 2 (0.67 / game) |
| **Overall Goals Conceded (GA)** | 4 (1.00 / game) | 2 (0.67 / game) |

### Goal Profiles & Strength Indices (Dual-Baseline)
- **Primary Live Baselines (Botola 1)**: Home scoring avg 1.25, Away scoring avg 0.90
  - Home Attacking Strength: 1.20
  - Away Defensive Weakness: 0.80
  - Away Attacking Strength: 1.11
  - Home Defensive Weakness: 1.11
- **Historical Benchmark Baselines**: Home scoring avg 1.25, Away scoring avg 0.90

### Expected Goals (Lambda) & Poisson Formulation
- **Primary Live Model**:
  - Lambda Home: 1.2000 | Lambda Away: 1.1111 | **Total Expected Goals (Lambda): 2.3111**
  - **Poisson P(Over 1.5)**: **67.2%** (Weak for the Over 1.5-focused strategy)
  - Poisson P(Under 1.5): 32.8%
- **Companion Historical Benchmark**:
  - Historical Total Expected Goals: 2.3111
  - **Historical P(Over 1.5)**: **67.2%**
- **Dual-Baseline Alignment**: `[VERY_HIGH ALIGNMENT]` (0.00 pp delta)

### Market Pricing & Value Analysis
- **Offered Odds**: 1.52
- **Bookmaker Break-Even Probability**: 65.8%
- **Value Edge**: +1.4 percentage points (`[MEDIUM EDGE]`)
- **Expected Value (EV)**: +0.021 per unit staked

### Warnings & Negative Checks
- **`SMALL_SAMPLE`** [CRITICAL] (CONTRADICTORY / DIRECT): Extreme small-sample distortion: only 1 match(es) played by one or both teams in this venue.
  - *Evidence*: MAS Maghreb Fes played 2 venue matches; RS Berkane played 1 venue matches.
- **`TEAM_NEWS_UNVERIFIED`** [LOW] (NEUTRAL / CONTEXTUAL): Pre-match team news and confirmed starting lineups remain unverified.
  - *Evidence*: Lineups have not been locked in; rotation or late injury risk unconfirmed.

### Final Decision Verdict: **NO BET**
> NO BET. Extreme small-sample distortion (1 venue matches) renders the statistical signal uncalibrated. Violated minimum sample requirements.

---

## SKIPPED FIXTURES — SECTION 5.0 HARD-STOP PROTOCOL
Per **Model 2.1 Section 5.0**, if venue-specific home/away breakdown cannot be verified with complete statistical integrity, the engine strictly prohibits using overall season aggregates as mathematical proxies. The following match options were halted:

| # | Fixture | League | Offered Odds | Reason for Exclusion | Enforcement Rule |
| :---: | :--- | :--- | :---: | :--- | :--- |
| 1 | Township Rollers FC vs Tonota FC | Botswana Premier League | 1.50 | Newly promoted Tonota FC in debut top-flight campaign with under 2 recorded matches; complete absence of verified venue-split goal data. | Section 5.0 Hard-Stop Rule (Missing Venue Data) |
| 2 | Envigado FC vs Independiente Yumbo | Colombia Primera B | 1.45 | Discrepancy in club franchise relocation/rebranding (Independiente Valle del Cauca) and lack of verified independent venue splits for the cuadrangulares stage. | Section 5.0 Hard-Stop Rule (Missing Venue Data) |
| 3 | Boca Juniors de Cali vs Club Union Magdalena | Colombia Primera B | 1.40 | Conflicting aggregate goal tracking across multi-stage Torneo BetPlay phases; missing verified home/away venue breakdowns. | Section 5.0 Hard-Stop Rule (Missing Venue Data) |
| 4 | Tigres FC vs Real Cartagena | Colombia Primera B | 1.36 | Unverified venue-specific goals conceded and scored tallies in cuadrangulares group stage. | Section 5.0 Hard-Stop Rule (Missing Venue Data) |
| 5 | Al Mosul SC vs Al Jolan SC | Iraq Stars League | 1.43 | Absence of standardized, independently verifiable venue home/away goal statistics across Iraqi league databases. | Section 5.0 Hard-Stop Rule (Missing Venue Data) |
| 6 | Al Naft Baghdad vs Al Kahraba | Iraq Stars League | 1.47 | Absence of standardized venue-split scoring tables for Al Naft (host) and Al Kahraba (visitor). | Section 5.0 Hard-Stop Rule (Missing Venue Data) |
| 7 | Al Quwa Al Jawiya vs Al Minaa SC | Iraq Stars League | 1.39 | Missing verified venue-split statistics; full-season totals cannot be substituted as proxy per Section 5.0. | Section 5.0 Hard-Stop Rule (Missing Venue Data) |
| 8 | Al Salt vs Al Jazeera Amman | Jordan Pro League | 1.32 | Insufficient venue breakdown stability in early-season Jordanian league tracking. | Section 5.0 Hard-Stop Rule (Missing Venue Data) |
| 9 | Mathare United FC vs Tusker FC | Kenya Premier League | 1.20 | Extreme sample distortion: Tusker FC has played only 1 recorded match; Mathare United 3 matches; missing venue breakdown. | Section 5.0 Hard-Stop Rule (Extreme Sample Distortion < 2 matches) |
| 10 | Kenya Police vs Ulinzi Stars FC | Kenya Premier League | 1.52 | Unreliable venue goal tracking and severe early-season fixture backlog in FKF Premier League. | Section 5.0 Hard-Stop Rule (Missing Venue Data) |

---

## EXECUTIVE SUMMARY TABLE (2026-10-29)
| ID | Fixture | League | Odds | Break-Even | Live Prob | Hist Prob | Align Delta | Edge (pp) | EV | Warnings | Verdict |
| :---: | :--- | :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| 1 | Frosinone Calcio vs Lecce | Serie A | 1.12 | 89.3% | 81.2% | 82.1% | 0.9pp | -8.1pp | -0.091 | 3 | CAUTION |
| 2 | Fiorentina vs Atalanta | Serie A | 1.16 | 86.2% | 81.4% | 82.4% | 1.0pp | -4.8pp | -0.056 | 3 | CAUTION |
| 3 | Atletico MG vs Cruzeiro EC | Serie A | 1.24 | 80.6% | 89.7% | 89.7% | 0.0pp | +9.1pp | +0.113 | 1 | **SELECT** |
| 4 | Inter Turku vs HJK Helsinki | Veikkausliiga | 1.23 | 81.3% | 61.2% | 61.2% | 0.0pp | -20.1pp | -0.247 | 1 | NO BET |
| 5 | KuPS Kuopio vs IF Gnistan | Veikkausliiga | 1.23 | 81.3% | 71.2% | 71.2% | 0.0pp | -10.1pp | -0.124 | 1 | NO BET |
| 6 | Sporting Cristal vs Alianza Lima | Liga 1 | 1.27 | 78.7% | 81.1% | 81.1% | 0.0pp | +2.4pp | +0.031 | 1 | **SELECT** |
| 7 | FK Sutjeska Niksic vs FK Jezero Plav | First League | 1.33 | 75.2% | 96.0% | 96.0% | 0.0pp | +20.8pp | +0.276 | 2 | **SELECT** |
| 8 | FC Yantra 2019 Gabrovo vs FK Hebar Pazardzhik | Second League | 1.26 | 79.4% | 87.8% | 88.5% | 0.7pp | +8.4pp | +0.106 | 1 | **SELECT** |
| 9 | FC Deportivo Mixco vs Xelaju MC | Liga Nacional | 1.25 | 80.0% | 81.7% | 81.7% | 0.0pp | +1.7pp | +0.022 | 1 | **SELECT** |
| 10 | Pyramids FC vs Wadi Degla FC | Premier League | 1.24 | 80.6% | 72.6% | 72.6% | 0.0pp | -8.0pp | -0.099 | 2 | CAUTION |
| 11 | Modern Sport FC vs Al Ahly Cairo | Premier League | 1.33 | 75.2% | 68.6% | 68.6% | 0.0pp | -6.5pp | -0.087 | 2 | NO BET |
| 12 | Fajr Sepasi Shiraz FC vs Tractor | Pro League | 1.45 | 69.0% | 25.2% | 23.4% | 1.8pp | -43.8pp | -0.635 | 3 | NO BET |
| 13 | CS Sfaxien vs Esperance Tunis | Ligue 1 | 1.23 | 81.3% | 50.7% | 50.7% | 0.0pp | -30.6pp | -0.377 | 2 | NO BET |
| 14 | MAS Maghreb Fes vs RS Berkane | Botola 1 | 1.52 | 65.8% | 67.2% | 67.2% | 0.0pp | +1.4pp | +0.021 | 2 | NO BET |
