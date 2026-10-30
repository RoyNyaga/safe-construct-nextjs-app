# ROY BETTING ENGINE — MATCH EVALUATION REPORT
**Model Version**: 2.1 (Over 1.5 Goals Focused — Dual-Baseline Protocol)
**Evaluation Date**: 2026-10-30
**Total Fixtures Evaluated**: 24 matches analyzed (0 skipped under Section 5.0 Hard-Stop)
**Market**: Over 1.5 Goals
**Methodology Enforcement**: Strict Venue-Specific Home/Away Protocol (Section 5.0), Dual-Baseline Protocol (Section 5.1A), & Hard-Stop Rule

---

## 1. Villarreal vs Espanyol
- **Fixture**: Spain — La Liga | Date: 2026-10-30
- **Data Quality**: **Verified (Dual-Baseline Venue-Specific & Season-Overall Analysis)**

### Pre-Match Statistical Matchup Comparison

#### Venue Form (Used by Model Engine)
| Metric | Villarreal (Home @ Home) | Espanyol (Away @ Away) |
| :--- | :---: | :---: |
| **League Standing** | 10th | 18th |
| **Venue Matches Played** | 4 | 5 |
| **Venue Goals Scored (GF)** | 6 (1.50 / game) | 6 (1.20 / game) |
| **Venue Goals Conceded (GA)** | 6 (1.50 / game) | 7 (1.40 / game) |

#### Season Overall (Macro Contextual Record)
| Metric | Villarreal (Overall) | Espanyol (Overall) |
| :--- | :---: | :---: |
| **Overall Matches Played** | 10 | 10 |
| **Overall Goals Scored (GF)** | 15 (1.50 / game) | 12 (1.20 / game) |
| **Overall Goals Conceded (GA)** | 14 (1.40 / game) | 14 (1.40 / game) |

### Goal Profiles & Strength Indices (Dual-Baseline)
- **Primary Live Baselines (La Liga)**: Home scoring avg 1.48, Away scoring avg 1.15
  - Home Attacking Strength: 1.01
  - Away Defensive Weakness: 0.95
  - Away Attacking Strength: 1.04
  - Home Defensive Weakness: 1.30
- **Historical Benchmark Baselines**: Home scoring avg 1.45, Away scoring avg 1.10

### Expected Goals (Lambda) & Poisson Formulation
- **Primary Live Model**:
  - Lambda Home: 1.4189 | Lambda Away: 1.5652 | **Total Expected Goals (Lambda): 2.9841**
  - **Poisson P(Over 1.5)**: **79.8%** (Good)
  - Poisson P(Under 1.5): 20.2%
- **Companion Historical Benchmark**:
  - Historical Total Expected Goals: 3.0846
  - **Historical P(Over 1.5)**: **81.3%**
- **Dual-Baseline Alignment**: `[VERY_HIGH ALIGNMENT]` (1.47 pp delta)

### Market Pricing & Value Analysis
- **Offered Odds**: 1.20
- **Bookmaker Break-Even Probability**: 83.3%
- **Value Edge**: -3.5 percentage points (`[LOW EDGE]`)
- **Expected Value (EV)**: -0.042 per unit staked

### Warnings & Negative Checks
- **`SMALL_SAMPLE`** [MEDIUM] (CONTRADICTORY / INDIRECT): Limited sample size of only 4 matches.
  - *Evidence*: Sample size below the 5-match threshold for statistical stability (4 vs 5).
- **`TEAM_NEWS_UNVERIFIED`** [LOW] (NEUTRAL / CONTEXTUAL): Pre-match team news and confirmed starting lineups remain unverified.
  - *Evidence*: Lineups have not been locked in; rotation or late injury risk unconfirmed.

### Final Decision Verdict: **CAUTION**
> CAUTION. Model estimates an 79.8% Over 1.5 probability versus bookmaker break-even of 83.3% at 1.2 odds (-3.5 edge, -0.042 EV). High probability (79.8%), but pricing offers no positive edge (-3.5pp). Disclosed under Principle 9.

---

## 2. OGC Nice vs Stade Rennais
- **Fixture**: France — Ligue 1 | Date: 2026-10-30
- **Data Quality**: **Verified (Dual-Baseline Venue-Specific & Season-Overall Analysis)**

### Pre-Match Statistical Matchup Comparison

#### Venue Form (Used by Model Engine)
| Metric | OGC Nice (Home @ Home) | Stade Rennais (Away @ Away) |
| :--- | :---: | :---: |
| **League Standing** | 10th | 2nd |
| **Venue Matches Played** | 4 | 3 |
| **Venue Goals Scored (GF)** | 5 (1.25 / game) | 5 (1.67 / game) |
| **Venue Goals Conceded (GA)** | 3 (0.75 / game) | 9 (3.00 / game) |

#### Season Overall (Macro Contextual Record)
| Metric | OGC Nice (Overall) | Stade Rennais (Overall) |
| :--- | :---: | :---: |
| **Overall Matches Played** | 8 | 8 |
| **Overall Goals Scored (GF)** | 8 (1.00 / game) | 18 (2.25 / game) |
| **Overall Goals Conceded (GA)** | 10 (1.25 / game) | 14 (1.75 / game) |

### Goal Profiles & Strength Indices (Dual-Baseline)
- **Primary Live Baselines (Ligue 1)**: Home scoring avg 1.52, Away scoring avg 1.22
  - Home Attacking Strength: 0.82
  - Away Defensive Weakness: 1.97
  - Away Attacking Strength: 1.37
  - Home Defensive Weakness: 0.61
- **Historical Benchmark Baselines**: Home scoring avg 1.50, Away scoring avg 1.20

### Expected Goals (Lambda) & Poisson Formulation
- **Primary Live Model**:
  - Lambda Home: 2.4671 | Lambda Away: 1.0246 | **Total Expected Goals (Lambda): 3.4917**
  - **Poisson P(Over 1.5)**: **86.3%** (Very strong)
  - Poisson P(Under 1.5): 13.7%
- **Companion Historical Benchmark**:
  - Historical Total Expected Goals: 3.5417
  - **Historical P(Over 1.5)**: **86.8%**
- **Dual-Baseline Alignment**: `[VERY_HIGH ALIGNMENT]` (0.52 pp delta)

### Market Pricing & Value Analysis
- **Offered Odds**: 1.18
- **Bookmaker Break-Even Probability**: 84.7%
- **Value Edge**: +1.6 percentage points (`[MEDIUM EDGE]`)
- **Expected Value (EV)**: +0.019 per unit staked

### Warnings & Negative Checks
- **`SMALL_SAMPLE`** [MEDIUM] (CONTRADICTORY / INDIRECT): Limited sample size of only 3 matches.
  - *Evidence*: Sample size below the 5-match threshold for statistical stability (4 vs 3).
- **`TEAM_NEWS_UNVERIFIED`** [LOW] (NEUTRAL / CONTEXTUAL): Pre-match team news and confirmed starting lineups remain unverified.
  - *Evidence*: Lineups have not been locked in; rotation or late injury risk unconfirmed.

### Final Decision Verdict: **SELECT**
> SELECT. Model estimates an 86.3% Over 1.5 probability versus bookmaker break-even of 84.7% at 1.18 odds (+1.6 edge, +0.019 EV). Strong probability (86.3%) supported by positive edge (+1.6pp, EV +0.019) and acceptable risk profile.

---

## 3. Le Havre vs Paris Saint-Germain
- **Fixture**: France — Ligue 1 | Date: 2026-10-30
- **Data Quality**: **Verified (Dual-Baseline Venue-Specific & Season-Overall Analysis)**

### Pre-Match Statistical Matchup Comparison

#### Venue Form (Used by Model Engine)
| Metric | Le Havre (Home @ Home) | Paris Saint-Germain (Away @ Away) |
| :--- | :---: | :---: |
| **League Standing** | 18th | 1st |
| **Venue Matches Played** | 4 | 5 |
| **Venue Goals Scored (GF)** | 2 (0.50 / game) | 10 (2.00 / game) |
| **Venue Goals Conceded (GA)** | 6 (1.50 / game) | 6 (1.20 / game) |

#### Season Overall (Macro Contextual Record)
| Metric | Le Havre (Overall) | Paris Saint-Germain (Overall) |
| :--- | :---: | :---: |
| **Overall Matches Played** | 8 | 8 |
| **Overall Goals Scored (GF)** | 8 (1.00 / game) | 16 (2.00 / game) |
| **Overall Goals Conceded (GA)** | 15 (1.88 / game) | 9 (1.13 / game) |

### Goal Profiles & Strength Indices (Dual-Baseline)
- **Primary Live Baselines (Ligue 1)**: Home scoring avg 1.52, Away scoring avg 1.22
  - Home Attacking Strength: 0.33
  - Away Defensive Weakness: 0.79
  - Away Attacking Strength: 1.64
  - Home Defensive Weakness: 1.23
- **Historical Benchmark Baselines**: Home scoring avg 1.50, Away scoring avg 1.20

### Expected Goals (Lambda) & Poisson Formulation
- **Primary Live Model**:
  - Lambda Home: 0.3947 | Lambda Away: 2.4590 | **Total Expected Goals (Lambda): 2.8538**
  - **Poisson P(Over 1.5)**: **77.8%** (Good)
  - Poisson P(Under 1.5): 22.2%
- **Companion Historical Benchmark**:
  - Historical Total Expected Goals: 2.9000
  - **Historical P(Over 1.5)**: **78.5%**
- **Dual-Baseline Alignment**: `[VERY_HIGH ALIGNMENT]` (0.75 pp delta)

### Market Pricing & Value Analysis
- **Offered Odds**: 1.12
- **Bookmaker Break-Even Probability**: 89.3%
- **Value Edge**: -11.5 percentage points (`[VERY_LOW EDGE]`)
- **Expected Value (EV)**: -0.129 per unit staked

### Warnings & Negative Checks
- **`SMALL_SAMPLE`** [MEDIUM] (CONTRADICTORY / INDIRECT): Limited sample size of only 4 matches.
  - *Evidence*: Sample size below the 5-match threshold for statistical stability (4 vs 5).
- **`LOW_HOME_SCORING`** [HIGH] (CONTRADICTORY / DIRECT): Le Havre home scoring rate is low (0.50 GF/game).
  - *Evidence*: Le Havre averages under 1.0 goal scored per home match across observed fixtures.
- **`HIGH_LINE_RELIANCE`** [MEDIUM] (CONTRADICTORY / INDIRECT): Over 75% of expected goals depend exclusively on Paris Saint-Germain.
  - *Evidence*: Away expected goals (2.46) account for 86% of total expected output (2.85).
- **`TEAM_NEWS_UNVERIFIED`** [LOW] (NEUTRAL / CONTEXTUAL): Pre-match team news and confirmed starting lineups remain unverified.
  - *Evidence*: Lineups have not been locked in; rotation or late injury risk unconfirmed.

### Final Decision Verdict: **NO BET**
> NO BET. Model estimates an 77.8% Over 1.5 probability versus bookmaker break-even of 89.3% at 1.12 odds (-11.5 edge, -0.129 EV). Significant negative expected value (-0.129) and pricing mismatch (-11.5pp edge) violate Principle 8.

---

## 4. Lille OSC vs Lens
- **Fixture**: France — Ligue 1 | Date: 2026-10-30
- **Data Quality**: **Verified (Dual-Baseline Venue-Specific & Season-Overall Analysis)**

### Pre-Match Statistical Matchup Comparison

#### Venue Form (Used by Model Engine)
| Metric | Lille OSC (Home @ Home) | Lens (Away @ Away) |
| :--- | :---: | :---: |
| **League Standing** | 3rd | 7th |
| **Venue Matches Played** | 4 | 4 |
| **Venue Goals Scored (GF)** | 6 (1.50 / game) | 7 (1.75 / game) |
| **Venue Goals Conceded (GA)** | 3 (0.75 / game) | 7 (1.75 / game) |

#### Season Overall (Macro Contextual Record)
| Metric | Lille OSC (Overall) | Lens (Overall) |
| :--- | :---: | :---: |
| **Overall Matches Played** | 8 | 8 |
| **Overall Goals Scored (GF)** | 11 (1.38 / game) | 16 (2.00 / game) |
| **Overall Goals Conceded (GA)** | 6 (0.75 / game) | 12 (1.50 / game) |

### Goal Profiles & Strength Indices (Dual-Baseline)
- **Primary Live Baselines (Ligue 1)**: Home scoring avg 1.52, Away scoring avg 1.22
  - Home Attacking Strength: 0.99
  - Away Defensive Weakness: 1.15
  - Away Attacking Strength: 1.43
  - Home Defensive Weakness: 0.61
- **Historical Benchmark Baselines**: Home scoring avg 1.50, Away scoring avg 1.20

### Expected Goals (Lambda) & Poisson Formulation
- **Primary Live Model**:
  - Lambda Home: 1.7270 | Lambda Away: 1.0758 | **Total Expected Goals (Lambda): 2.8028**
  - **Poisson P(Over 1.5)**: **76.9%** (Good)
  - Poisson P(Under 1.5): 23.1%
- **Companion Historical Benchmark**:
  - Historical Total Expected Goals: 2.8438
  - **Historical P(Over 1.5)**: **77.6%**
- **Dual-Baseline Alignment**: `[VERY_HIGH ALIGNMENT]` (0.69 pp delta)

### Market Pricing & Value Analysis
- **Offered Odds**: 1.26
- **Bookmaker Break-Even Probability**: 79.4%
- **Value Edge**: -2.4 percentage points (`[LOW EDGE]`)
- **Expected Value (EV)**: -0.031 per unit staked

### Warnings & Negative Checks
- **`SMALL_SAMPLE`** [MEDIUM] (CONTRADICTORY / INDIRECT): Limited sample size of only 4 matches.
  - *Evidence*: Sample size below the 5-match threshold for statistical stability (4 vs 4).
- **`TEAM_NEWS_UNVERIFIED`** [LOW] (NEUTRAL / CONTEXTUAL): Pre-match team news and confirmed starting lineups remain unverified.
  - *Evidence*: Lineups have not been locked in; rotation or late injury risk unconfirmed.

### Final Decision Verdict: **CAUTION**
> CAUTION. Model estimates an 76.9% Over 1.5 probability versus bookmaker break-even of 79.4% at 1.26 odds (-2.4 edge, -0.031 EV). High probability (76.9%), but pricing offers no positive edge (-2.4pp). Disclosed under Principle 9.

---

## 5. Grenoble Foot 38 vs Dijon
- **Fixture**: France — Ligue 2 | Date: 2026-10-30
- **Data Quality**: **Verified (Dual-Baseline Venue-Specific & Season-Overall Analysis)**

### Pre-Match Statistical Matchup Comparison

#### Venue Form (Used by Model Engine)
| Metric | Grenoble Foot 38 (Home @ Home) | Dijon (Away @ Away) |
| :--- | :---: | :---: |
| **League Standing** | 16th | 9th |
| **Venue Matches Played** | 4 | 5 |
| **Venue Goals Scored (GF)** | 2 (0.50 / game) | 6 (1.20 / game) |
| **Venue Goals Conceded (GA)** | 5 (1.25 / game) | 9 (1.80 / game) |

#### Season Overall (Macro Contextual Record)
| Metric | Grenoble Foot 38 (Overall) | Dijon (Overall) |
| :--- | :---: | :---: |
| **Overall Matches Played** | 10 | 10 |
| **Overall Goals Scored (GF)** | 9 (0.90 / game) | 17 (1.70 / game) |
| **Overall Goals Conceded (GA)** | 17 (1.70 / game) | 18 (1.80 / game) |

### Goal Profiles & Strength Indices (Dual-Baseline)
- **Primary Live Baselines (Ligue 2)**: Home scoring avg 1.38, Away scoring avg 1.08
  - Home Attacking Strength: 0.36
  - Away Defensive Weakness: 1.30
  - Away Attacking Strength: 1.11
  - Home Defensive Weakness: 1.16
- **Historical Benchmark Baselines**: Home scoring avg 1.35, Away scoring avg 1.05

### Expected Goals (Lambda) & Poisson Formulation
- **Primary Live Model**:
  - Lambda Home: 0.6522 | Lambda Away: 1.3889 | **Total Expected Goals (Lambda): 2.0411**
  - **Poisson P(Over 1.5)**: **60.5%** (Weak for the Over 1.5-focused strategy)
  - Poisson P(Under 1.5): 39.5%
- **Companion Historical Benchmark**:
  - Historical Total Expected Goals: 2.0952
  - **Historical P(Over 1.5)**: **61.9%**
- **Dual-Baseline Alignment**: `[VERY_HIGH ALIGNMENT]` (1.42 pp delta)

### Market Pricing & Value Analysis
- **Offered Odds**: 1.28
- **Bookmaker Break-Even Probability**: 78.1%
- **Value Edge**: -17.6 percentage points (`[VERY_LOW EDGE]`)
- **Expected Value (EV)**: -0.226 per unit staked

### Warnings & Negative Checks
- **`SMALL_SAMPLE`** [MEDIUM] (CONTRADICTORY / INDIRECT): Limited sample size of only 4 matches.
  - *Evidence*: Sample size below the 5-match threshold for statistical stability (4 vs 5).
- **`LOW_HOME_SCORING`** [HIGH] (CONTRADICTORY / DIRECT): Grenoble Foot 38 home scoring rate is low (0.50 GF/game).
  - *Evidence*: Grenoble Foot 38 averages under 1.0 goal scored per home match across observed fixtures.
- **`TEAM_NEWS_UNVERIFIED`** [LOW] (NEUTRAL / CONTEXTUAL): Pre-match team news and confirmed starting lineups remain unverified.
  - *Evidence*: Lineups have not been locked in; rotation or late injury risk unconfirmed.

### Final Decision Verdict: **NO BET**
> NO BET. Model estimates an 60.5% Over 1.5 probability versus bookmaker break-even of 78.1% at 1.28 odds (-17.6 edge, -0.226 EV). Estimated Over 1.5 probability (60.5%) is well below the 70% threshold for the Over 1.5 strategy.

---

## 6. Stade Lavallois vs US Boulogne
- **Fixture**: France — Ligue 2 | Date: 2026-10-30
- **Data Quality**: **Verified (Dual-Baseline Venue-Specific & Season-Overall Analysis)**

### Pre-Match Statistical Matchup Comparison

#### Venue Form (Used by Model Engine)
| Metric | Stade Lavallois (Home @ Home) | US Boulogne (Away @ Away) |
| :--- | :---: | :---: |
| **League Standing** | 18th | 13th |
| **Venue Matches Played** | 5 | 5 |
| **Venue Goals Scored (GF)** | 7 (1.40 / game) | 2 (0.40 / game) |
| **Venue Goals Conceded (GA)** | 10 (2.00 / game) | 1 (0.20 / game) |

#### Season Overall (Macro Contextual Record)
| Metric | Stade Lavallois (Overall) | US Boulogne (Overall) |
| :--- | :---: | :---: |
| **Overall Matches Played** | 10 | 10 |
| **Overall Goals Scored (GF)** | 13 (1.30 / game) | 7 (0.70 / game) |
| **Overall Goals Conceded (GA)** | 21 (2.10 / game) | 7 (0.70 / game) |

### Goal Profiles & Strength Indices (Dual-Baseline)
- **Primary Live Baselines (Ligue 2)**: Home scoring avg 1.38, Away scoring avg 1.08
  - Home Attacking Strength: 1.01
  - Away Defensive Weakness: 0.14
  - Away Attacking Strength: 0.37
  - Home Defensive Weakness: 1.85
- **Historical Benchmark Baselines**: Home scoring avg 1.35, Away scoring avg 1.05

### Expected Goals (Lambda) & Poisson Formulation
- **Primary Live Model**:
  - Lambda Home: 0.2029 | Lambda Away: 0.7407 | **Total Expected Goals (Lambda): 0.9436**
  - **Poisson P(Over 1.5)**: **24.4%** (Weak for the Over 1.5-focused strategy)
  - Poisson P(Under 1.5): 75.6%
- **Companion Historical Benchmark**:
  - Historical Total Expected Goals: 0.9693
  - **Historical P(Over 1.5)**: **25.3%**
- **Dual-Baseline Alignment**: `[VERY_HIGH ALIGNMENT]` (0.94 pp delta)

### Market Pricing & Value Analysis
- **Offered Odds**: 1.38
- **Bookmaker Break-Even Probability**: 72.5%
- **Value Edge**: -48.1 percentage points (`[VERY_LOW EDGE]`)
- **Expected Value (EV)**: -0.664 per unit staked

### Warnings & Negative Checks
- **`LOW_AWAY_SCORING`** [HIGH] (CONTRADICTORY / DIRECT): US Boulogne averages only 0.40 goals per game away, increasing shutout risk.
  - *Evidence*: US Boulogne away scoring average is 0.40 GF/game, placing heavy reliance on Stade Lavallois to produce goals.
- **`HIGH_LINE_RELIANCE`** [MEDIUM] (CONTRADICTORY / INDIRECT): Over 75% of expected goals depend exclusively on US Boulogne.
  - *Evidence*: Away expected goals (0.74) account for 78% of total expected output (0.94).
- **`TEAM_NEWS_UNVERIFIED`** [LOW] (NEUTRAL / CONTEXTUAL): Pre-match team news and confirmed starting lineups remain unverified.
  - *Evidence*: Lineups have not been locked in; rotation or late injury risk unconfirmed.

### Final Decision Verdict: **NO BET**
> NO BET. Model estimates an 24.4% Over 1.5 probability versus bookmaker break-even of 72.5% at 1.38 odds (-48.1 edge, -0.664 EV). Estimated Over 1.5 probability (24.4%) is well below the 70% threshold for the Over 1.5 strategy.

---

## 7. Metz vs Pau FC
- **Fixture**: France — Ligue 2 | Date: 2026-10-30
- **Data Quality**: **Verified (Dual-Baseline Venue-Specific & Season-Overall Analysis)**

### Pre-Match Statistical Matchup Comparison

#### Venue Form (Used by Model Engine)
| Metric | Metz (Home @ Home) | Pau FC (Away @ Away) |
| :--- | :---: | :---: |
| **League Standing** | 8th | 5th |
| **Venue Matches Played** | 5 | 4 |
| **Venue Goals Scored (GF)** | 12 (2.40 / game) | 5 (1.25 / game) |
| **Venue Goals Conceded (GA)** | 7 (1.40 / game) | 4 (1.00 / game) |

#### Season Overall (Macro Contextual Record)
| Metric | Metz (Overall) | Pau FC (Overall) |
| :--- | :---: | :---: |
| **Overall Matches Played** | 10 | 10 |
| **Overall Goals Scored (GF)** | 16 (1.60 / game) | 13 (1.30 / game) |
| **Overall Goals Conceded (GA)** | 14 (1.40 / game) | 10 (1.00 / game) |

### Goal Profiles & Strength Indices (Dual-Baseline)
- **Primary Live Baselines (Ligue 2)**: Home scoring avg 1.38, Away scoring avg 1.08
  - Home Attacking Strength: 1.74
  - Away Defensive Weakness: 0.72
  - Away Attacking Strength: 1.16
  - Home Defensive Weakness: 1.30
- **Historical Benchmark Baselines**: Home scoring avg 1.35, Away scoring avg 1.05

### Expected Goals (Lambda) & Poisson Formulation
- **Primary Live Model**:
  - Lambda Home: 1.7391 | Lambda Away: 1.6204 | **Total Expected Goals (Lambda): 3.3595**
  - **Poisson P(Over 1.5)**: **84.8%** (Strong)
  - Poisson P(Under 1.5): 15.2%
- **Companion Historical Benchmark**:
  - Historical Total Expected Goals: 3.4444
  - **Historical P(Over 1.5)**: **85.8%**
- **Dual-Baseline Alignment**: `[VERY_HIGH ALIGNMENT]` (0.96 pp delta)

### Market Pricing & Value Analysis
- **Offered Odds**: 1.25
- **Bookmaker Break-Even Probability**: 80.0%
- **Value Edge**: +4.8 percentage points (`[MEDIUM EDGE]`)
- **Expected Value (EV)**: +0.061 per unit staked

### Warnings & Negative Checks
- **`SMALL_SAMPLE`** [MEDIUM] (CONTRADICTORY / INDIRECT): Limited sample size of only 4 matches.
  - *Evidence*: Sample size below the 5-match threshold for statistical stability (5 vs 4).
- **`TEAM_NEWS_UNVERIFIED`** [LOW] (NEUTRAL / CONTEXTUAL): Pre-match team news and confirmed starting lineups remain unverified.
  - *Evidence*: Lineups have not been locked in; rotation or late injury risk unconfirmed.

### Final Decision Verdict: **SELECT**
> SELECT. Model estimates an 84.8% Over 1.5 probability versus bookmaker break-even of 80.0% at 1.25 odds (+4.8 edge, +0.061 EV). Strong probability (84.8%) supported by positive edge (+4.8pp, EV +0.061) and acceptable risk profile.

---

## 8. Nantes vs Clermont Foot
- **Fixture**: France — Ligue 2 | Date: 2026-10-30
- **Data Quality**: **Verified (Dual-Baseline Venue-Specific & Season-Overall Analysis)**

### Pre-Match Statistical Matchup Comparison

#### Venue Form (Used by Model Engine)
| Metric | Nantes (Home @ Home) | Clermont Foot (Away @ Away) |
| :--- | :---: | :---: |
| **League Standing** | 15th | 17th |
| **Venue Matches Played** | 5 | 4 |
| **Venue Goals Scored (GF)** | 5 (1.00 / game) | 6 (1.50 / game) |
| **Venue Goals Conceded (GA)** | 9 (1.80 / game) | 8 (2.00 / game) |

#### Season Overall (Macro Contextual Record)
| Metric | Nantes (Overall) | Clermont Foot (Overall) |
| :--- | :---: | :---: |
| **Overall Matches Played** | 10 | 10 |
| **Overall Goals Scored (GF)** | 11 (1.10 / game) | 9 (0.90 / game) |
| **Overall Goals Conceded (GA)** | 17 (1.70 / game) | 14 (1.40 / game) |

### Goal Profiles & Strength Indices (Dual-Baseline)
- **Primary Live Baselines (Ligue 2)**: Home scoring avg 1.38, Away scoring avg 1.08
  - Home Attacking Strength: 0.72
  - Away Defensive Weakness: 1.45
  - Away Attacking Strength: 1.39
  - Home Defensive Weakness: 1.67
- **Historical Benchmark Baselines**: Home scoring avg 1.35, Away scoring avg 1.05

### Expected Goals (Lambda) & Poisson Formulation
- **Primary Live Model**:
  - Lambda Home: 1.4493 | Lambda Away: 2.5000 | **Total Expected Goals (Lambda): 3.9493**
  - **Poisson P(Over 1.5)**: **90.5%** (Extremely strong)
  - Poisson P(Under 1.5): 9.5%
- **Companion Historical Benchmark**:
  - Historical Total Expected Goals: 4.0529
  - **Historical P(Over 1.5)**: **91.2%**
- **Dual-Baseline Alignment**: `[VERY_HIGH ALIGNMENT]` (0.76 pp delta)

### Market Pricing & Value Analysis
- **Offered Odds**: 1.23
- **Bookmaker Break-Even Probability**: 81.3%
- **Value Edge**: +9.2 percentage points (`[HIGH EDGE]`)
- **Expected Value (EV)**: +0.113 per unit staked

### Warnings & Negative Checks
- **`SMALL_SAMPLE`** [MEDIUM] (CONTRADICTORY / INDIRECT): Limited sample size of only 4 matches.
  - *Evidence*: Sample size below the 5-match threshold for statistical stability (5 vs 4).
- **`TEAM_NEWS_UNVERIFIED`** [LOW] (NEUTRAL / CONTEXTUAL): Pre-match team news and confirmed starting lineups remain unverified.
  - *Evidence*: Lineups have not been locked in; rotation or late injury risk unconfirmed.

### Final Decision Verdict: **SELECT**
> SELECT. Model estimates an 90.5% Over 1.5 probability versus bookmaker break-even of 81.3% at 1.23 odds (+9.2 edge, +0.113 EV). Strong probability (90.5%) supported by positive edge (+9.2pp, EV +0.113) and acceptable risk profile.

---

## 9. Rodez vs USL Dunkerque
- **Fixture**: France — Ligue 2 | Date: 2026-10-30
- **Data Quality**: **Verified (Dual-Baseline Venue-Specific & Season-Overall Analysis)**

### Pre-Match Statistical Matchup Comparison

#### Venue Form (Used by Model Engine)
| Metric | Rodez (Home @ Home) | USL Dunkerque (Away @ Away) |
| :--- | :---: | :---: |
| **League Standing** | 14th | 10th |
| **Venue Matches Played** | 5 | 4 |
| **Venue Goals Scored (GF)** | 8 (1.60 / game) | 5 (1.25 / game) |
| **Venue Goals Conceded (GA)** | 11 (2.20 / game) | 10 (2.50 / game) |

#### Season Overall (Macro Contextual Record)
| Metric | Rodez (Overall) | USL Dunkerque (Overall) |
| :--- | :---: | :---: |
| **Overall Matches Played** | 10 | 10 |
| **Overall Goals Scored (GF)** | 16 (1.60 / game) | 14 (1.40 / game) |
| **Overall Goals Conceded (GA)** | 22 (2.20 / game) | 16 (1.60 / game) |

### Goal Profiles & Strength Indices (Dual-Baseline)
- **Primary Live Baselines (Ligue 2)**: Home scoring avg 1.38, Away scoring avg 1.08
  - Home Attacking Strength: 1.16
  - Away Defensive Weakness: 1.81
  - Away Attacking Strength: 1.16
  - Home Defensive Weakness: 2.04
- **Historical Benchmark Baselines**: Home scoring avg 1.35, Away scoring avg 1.05

### Expected Goals (Lambda) & Poisson Formulation
- **Primary Live Model**:
  - Lambda Home: 2.8986 | Lambda Away: 2.5463 | **Total Expected Goals (Lambda): 5.4448**
  - **Poisson P(Over 1.5)**: **97.2%** (Extremely strong)
  - Poisson P(Under 1.5): 2.8%
- **Companion Historical Benchmark**:
  - Historical Total Expected Goals: 5.5820
  - **Historical P(Over 1.5)**: **97.5%**
- **Dual-Baseline Alignment**: `[VERY_HIGH ALIGNMENT]` (0.31 pp delta)

### Market Pricing & Value Analysis
- **Offered Odds**: 1.16
- **Bookmaker Break-Even Probability**: 86.2%
- **Value Edge**: +11.0 percentage points (`[HIGH EDGE]`)
- **Expected Value (EV)**: +0.128 per unit staked

### Warnings & Negative Checks
- **`SMALL_SAMPLE`** [MEDIUM] (CONTRADICTORY / INDIRECT): Limited sample size of only 4 matches.
  - *Evidence*: Sample size below the 5-match threshold for statistical stability (5 vs 4).
- **`TEAM_NEWS_UNVERIFIED`** [LOW] (NEUTRAL / CONTEXTUAL): Pre-match team news and confirmed starting lineups remain unverified.
  - *Evidence*: Lineups have not been locked in; rotation or late injury risk unconfirmed.

### Final Decision Verdict: **SELECT**
> SELECT. Model estimates an 97.2% Over 1.5 probability versus bookmaker break-even of 86.2% at 1.16 odds (+11.0 edge, +0.128 EV). Strong probability (97.2%) supported by positive edge (+11.0pp, EV +0.128) and acceptable risk profile.

---

## 10. SV Elversberg vs 1. FSV Mainz 05
- **Fixture**: Germany — Bundesliga | Date: 2026-10-30
- **Data Quality**: **Verified (Dual-Baseline Venue-Specific & Season-Overall Analysis)**

### Pre-Match Statistical Matchup Comparison

#### Venue Form (Used by Model Engine)
| Metric | SV Elversberg (Home @ Home) | 1. FSV Mainz 05 (Away @ Away) |
| :--- | :---: | :---: |
| **League Standing** | 8th | 7th |
| **Venue Matches Played** | 3 | 3 |
| **Venue Goals Scored (GF)** | 8 (2.67 / game) | 10 (3.33 / game) |
| **Venue Goals Conceded (GA)** | 7 (2.33 / game) | 3 (1.00 / game) |

#### Season Overall (Macro Contextual Record)
| Metric | SV Elversberg (Overall) | 1. FSV Mainz 05 (Overall) |
| :--- | :---: | :---: |
| **Overall Matches Played** | 7 | 7 |
| **Overall Goals Scored (GF)** | 12 (1.71 / game) | 16 (2.29 / game) |
| **Overall Goals Conceded (GA)** | 15 (2.14 / game) | 13 (1.86 / game) |

### Goal Profiles & Strength Indices (Dual-Baseline)
- **Primary Live Baselines (Bundesliga)**: Home scoring avg 1.62, Away scoring avg 1.38
  - Home Attacking Strength: 1.65
  - Away Defensive Weakness: 0.62
  - Away Attacking Strength: 2.42
  - Home Defensive Weakness: 1.69
- **Historical Benchmark Baselines**: Home scoring avg 1.60, Away scoring avg 1.35

### Expected Goals (Lambda) & Poisson Formulation
- **Primary Live Model**:
  - Lambda Home: 1.6461 | Lambda Away: 5.6361 | **Total Expected Goals (Lambda): 7.2822**
  - **Poisson P(Over 1.5)**: **99.4%** (Extremely strong)
  - Poisson P(Under 1.5): 0.6%
- **Companion Historical Benchmark**:
  - Historical Total Expected Goals: 7.4280
  - **Historical P(Over 1.5)**: **99.5%**
- **Dual-Baseline Alignment**: `[VERY_HIGH ALIGNMENT]` (0.07 pp delta)

### Market Pricing & Value Analysis
- **Offered Odds**: 1.14
- **Bookmaker Break-Even Probability**: 87.7%
- **Value Edge**: +11.7 percentage points (`[HIGH EDGE]`)
- **Expected Value (EV)**: +0.134 per unit staked

### Warnings & Negative Checks
- **`SMALL_SAMPLE`** [MEDIUM] (CONTRADICTORY / INDIRECT): Limited sample size of only 3 matches.
  - *Evidence*: Sample size below the 5-match threshold for statistical stability (3 vs 3).
- **`HIGH_LINE_RELIANCE`** [MEDIUM] (CONTRADICTORY / INDIRECT): Over 75% of expected goals depend exclusively on 1. FSV Mainz 05.
  - *Evidence*: Away expected goals (5.64) account for 77% of total expected output (7.28).
- **`TEAM_NEWS_UNVERIFIED`** [LOW] (NEUTRAL / CONTEXTUAL): Pre-match team news and confirmed starting lineups remain unverified.
  - *Evidence*: Lineups have not been locked in; rotation or late injury risk unconfirmed.

### Final Decision Verdict: **CAUTION**
> CAUTION. Model estimates an 99.4% Over 1.5 probability versus bookmaker break-even of 87.7% at 1.14 odds (+11.7 edge, +0.134 EV). Multiple medium warnings (SMALL_SAMPLE, HIGH_LINE_RELIANCE) warrant measured caution.

---

## 11. Arminia Bielefeld vs Eintracht Braunschweig
- **Fixture**: Germany — 2. Bundesliga | Date: 2026-10-30
- **Data Quality**: **Verified (Dual-Baseline Venue-Specific & Season-Overall Analysis)**

### Pre-Match Statistical Matchup Comparison

#### Venue Form (Used by Model Engine)
| Metric | Arminia Bielefeld (Home @ Home) | Eintracht Braunschweig (Away @ Away) |
| :--- | :---: | :---: |
| **League Standing** | 9th | 10th |
| **Venue Matches Played** | 4 | 4 |
| **Venue Goals Scored (GF)** | 9 (2.25 / game) | 7 (1.75 / game) |
| **Venue Goals Conceded (GA)** | 5 (1.25 / game) | 7 (1.75 / game) |

#### Season Overall (Macro Contextual Record)
| Metric | Arminia Bielefeld (Overall) | Eintracht Braunschweig (Overall) |
| :--- | :---: | :---: |
| **Overall Matches Played** | 9 | 9 |
| **Overall Goals Scored (GF)** | 16 (1.78 / game) | 15 (1.67 / game) |
| **Overall Goals Conceded (GA)** | 11 (1.22 / game) | 15 (1.67 / game) |

### Goal Profiles & Strength Indices (Dual-Baseline)
- **Primary Live Baselines (2. Bundesliga)**: Home scoring avg 1.58, Away scoring avg 1.32
  - Home Attacking Strength: 1.42
  - Away Defensive Weakness: 1.11
  - Away Attacking Strength: 1.33
  - Home Defensive Weakness: 0.95
- **Historical Benchmark Baselines**: Home scoring avg 1.55, Away scoring avg 1.30

### Expected Goals (Lambda) & Poisson Formulation
- **Primary Live Model**:
  - Lambda Home: 2.4921 | Lambda Away: 1.6572 | **Total Expected Goals (Lambda): 4.1493**
  - **Poisson P(Over 1.5)**: **91.9%** (Extremely strong)
  - Poisson P(Under 1.5): 8.1%
- **Companion Historical Benchmark**:
  - Historical Total Expected Goals: 4.2230
  - **Historical P(Over 1.5)**: **92.3%**
- **Dual-Baseline Alignment**: `[VERY_HIGH ALIGNMENT]` (0.47 pp delta)

### Market Pricing & Value Analysis
- **Offered Odds**: 1.21
- **Bookmaker Break-Even Probability**: 82.6%
- **Value Edge**: +9.2 percentage points (`[HIGH EDGE]`)
- **Expected Value (EV)**: +0.112 per unit staked

### Warnings & Negative Checks
- **`SMALL_SAMPLE`** [MEDIUM] (CONTRADICTORY / INDIRECT): Limited sample size of only 4 matches.
  - *Evidence*: Sample size below the 5-match threshold for statistical stability (4 vs 4).
- **`TEAM_NEWS_UNVERIFIED`** [LOW] (NEUTRAL / CONTEXTUAL): Pre-match team news and confirmed starting lineups remain unverified.
  - *Evidence*: Lineups have not been locked in; rotation or late injury risk unconfirmed.

### Final Decision Verdict: **SELECT**
> SELECT. Model estimates an 91.9% Over 1.5 probability versus bookmaker break-even of 82.6% at 1.21 odds (+9.2 edge, +0.112 EV). Strong probability (91.9%) supported by positive edge (+9.2pp, EV +0.112) and acceptable risk profile.

---

## 12. Energie Cottbus vs VfL Bochum
- **Fixture**: Germany — 2. Bundesliga | Date: 2026-10-30
- **Data Quality**: **Verified (Dual-Baseline Venue-Specific & Season-Overall Analysis)**

### Pre-Match Statistical Matchup Comparison

#### Venue Form (Used by Model Engine)
| Metric | Energie Cottbus (Home @ Home) | VfL Bochum (Away @ Away) |
| :--- | :---: | :---: |
| **League Standing** | 11th | 14th |
| **Venue Matches Played** | 4 | 4 |
| **Venue Goals Scored (GF)** | 8 (2.00 / game) | 4 (1.00 / game) |
| **Venue Goals Conceded (GA)** | 7 (1.75 / game) | 5 (1.25 / game) |

#### Season Overall (Macro Contextual Record)
| Metric | Energie Cottbus (Overall) | VfL Bochum (Overall) |
| :--- | :---: | :---: |
| **Overall Matches Played** | 9 | 9 |
| **Overall Goals Scored (GF)** | 17 (1.89 / game) | 6 (0.67 / game) |
| **Overall Goals Conceded (GA)** | 18 (2.00 / game) | 10 (1.11 / game) |

### Goal Profiles & Strength Indices (Dual-Baseline)
- **Primary Live Baselines (2. Bundesliga)**: Home scoring avg 1.58, Away scoring avg 1.32
  - Home Attacking Strength: 1.27
  - Away Defensive Weakness: 0.79
  - Away Attacking Strength: 0.76
  - Home Defensive Weakness: 1.33
- **Historical Benchmark Baselines**: Home scoring avg 1.55, Away scoring avg 1.30

### Expected Goals (Lambda) & Poisson Formulation
- **Primary Live Model**:
  - Lambda Home: 1.5823 | Lambda Away: 1.3258 | **Total Expected Goals (Lambda): 2.9080**
  - **Poisson P(Over 1.5)**: **78.7%** (Good)
  - Poisson P(Under 1.5): 21.3%
- **Companion Historical Benchmark**:
  - Historical Total Expected Goals: 2.9591
  - **Historical P(Over 1.5)**: **79.5%**
- **Dual-Baseline Alignment**: `[VERY_HIGH ALIGNMENT]` (0.80 pp delta)

### Market Pricing & Value Analysis
- **Offered Odds**: 1.18
- **Bookmaker Break-Even Probability**: 84.7%
- **Value Edge**: -6.1 percentage points (`[LOW EDGE]`)
- **Expected Value (EV)**: -0.072 per unit staked

### Warnings & Negative Checks
- **`SMALL_SAMPLE`** [MEDIUM] (CONTRADICTORY / INDIRECT): Limited sample size of only 4 matches.
  - *Evidence*: Sample size below the 5-match threshold for statistical stability (4 vs 4).
- **`TEAM_NEWS_UNVERIFIED`** [LOW] (NEUTRAL / CONTEXTUAL): Pre-match team news and confirmed starting lineups remain unverified.
  - *Evidence*: Lineups have not been locked in; rotation or late injury risk unconfirmed.

### Final Decision Verdict: **CAUTION**
> CAUTION. Model estimates an 78.7% Over 1.5 probability versus bookmaker break-even of 84.7% at 1.18 odds (-6.1 edge, -0.072 EV). High probability (78.7%), but pricing offers no positive edge (-6.1pp). Disclosed under Principle 9.

---

## 13. Casa Pia AC vs Sporting CP
- **Fixture**: Portugal — Liga Portugal | Date: 2026-10-30
- **Data Quality**: **Verified (Dual-Baseline Venue-Specific & Season-Overall Analysis)**

### Pre-Match Statistical Matchup Comparison

#### Venue Form (Used by Model Engine)
| Metric | Casa Pia AC (Home @ Home) | Sporting CP (Away @ Away) |
| :--- | :---: | :---: |
| **League Standing** | 15th | 3rd |
| **Venue Matches Played** | 4 | 4 |
| **Venue Goals Scored (GF)** | 1 (0.25 / game) | 10 (2.50 / game) |
| **Venue Goals Conceded (GA)** | 13 (3.25 / game) | 4 (1.00 / game) |

#### Season Overall (Macro Contextual Record)
| Metric | Casa Pia AC (Overall) | Sporting CP (Overall) |
| :--- | :---: | :---: |
| **Overall Matches Played** | 9 | 9 |
| **Overall Goals Scored (GF)** | 5 (0.56 / game) | 21 (2.33 / game) |
| **Overall Goals Conceded (GA)** | 17 (1.89 / game) | 10 (1.11 / game) |

### Goal Profiles & Strength Indices (Dual-Baseline)
- **Primary Live Baselines (Liga Portugal)**: Home scoring avg 1.46, Away scoring avg 1.16
  - Home Attacking Strength: 0.17
  - Away Defensive Weakness: 0.68
  - Away Attacking Strength: 2.16
  - Home Defensive Weakness: 2.80
- **Historical Benchmark Baselines**: Home scoring avg 1.45, Away scoring avg 1.15

### Expected Goals (Lambda) & Poisson Formulation
- **Primary Live Model**:
  - Lambda Home: 0.1712 | Lambda Away: 7.0043 | **Total Expected Goals (Lambda): 7.1755**
  - **Poisson P(Over 1.5)**: **99.4%** (Extremely strong)
  - Poisson P(Under 1.5): 0.6%
- **Companion Historical Benchmark**:
  - Historical Total Expected Goals: 7.2376
  - **Historical P(Over 1.5)**: **99.4%**
- **Dual-Baseline Alignment**: `[VERY_HIGH ALIGNMENT]` (0.03 pp delta)

### Market Pricing & Value Analysis
- **Offered Odds**: 1.20
- **Bookmaker Break-Even Probability**: 83.3%
- **Value Edge**: +16.0 percentage points (`[VERY_HIGH EDGE]`)
- **Expected Value (EV)**: +0.192 per unit staked

### Warnings & Negative Checks
- **`SMALL_SAMPLE`** [MEDIUM] (CONTRADICTORY / INDIRECT): Limited sample size of only 4 matches.
  - *Evidence*: Sample size below the 5-match threshold for statistical stability (4 vs 4).
- **`LOW_HOME_SCORING`** [HIGH] (CONTRADICTORY / DIRECT): Casa Pia AC home scoring rate is low (0.25 GF/game).
  - *Evidence*: Casa Pia AC averages under 1.0 goal scored per home match across observed fixtures.
- **`HIGH_LINE_RELIANCE`** [MEDIUM] (CONTRADICTORY / INDIRECT): Over 75% of expected goals depend exclusively on Sporting CP.
  - *Evidence*: Away expected goals (7.00) account for 98% of total expected output (7.18).
- **`TEAM_NEWS_UNVERIFIED`** [LOW] (NEUTRAL / CONTEXTUAL): Pre-match team news and confirmed starting lineups remain unverified.
  - *Evidence*: Lineups have not been locked in; rotation or late injury risk unconfirmed.

### Final Decision Verdict: **CAUTION**
> CAUTION. Model estimates an 99.4% Over 1.5 probability versus bookmaker break-even of 83.3% at 1.2 odds (+16.0 edge, +0.192 EV). Model probability is viable, but high contradictory warning (LOW_HOME_SCORING) requires caution.

---

## 14. SV Zulte Waregem vs Club Brugge
- **Fixture**: Belgium — Pro League | Date: 2026-10-30
- **Data Quality**: **Verified (Dual-Baseline Venue-Specific & Season-Overall Analysis)**

### Pre-Match Statistical Matchup Comparison

#### Venue Form (Used by Model Engine)
| Metric | SV Zulte Waregem (Home @ Home) | Club Brugge (Away @ Away) |
| :--- | :---: | :---: |
| **League Standing** | 10th | 2nd |
| **Venue Matches Played** | 4 | 4 |
| **Venue Goals Scored (GF)** | 6 (1.50 / game) | 10 (2.50 / game) |
| **Venue Goals Conceded (GA)** | 4 (1.00 / game) | 2 (0.50 / game) |

#### Season Overall (Macro Contextual Record)
| Metric | SV Zulte Waregem (Overall) | Club Brugge (Overall) |
| :--- | :---: | :---: |
| **Overall Matches Played** | 9 | 8 |
| **Overall Goals Scored (GF)** | 8 (0.89 / game) | 20 (2.50 / game) |
| **Overall Goals Conceded (GA)** | 14 (1.56 / game) | 5 (0.63 / game) |

### Goal Profiles & Strength Indices (Dual-Baseline)
- **Primary Live Baselines (Pro League)**: Home scoring avg 1.56, Away scoring avg 1.28
  - Home Attacking Strength: 0.96
  - Away Defensive Weakness: 0.32
  - Away Attacking Strength: 1.95
  - Home Defensive Weakness: 0.78
- **Historical Benchmark Baselines**: Home scoring avg 1.55, Away scoring avg 1.30

### Expected Goals (Lambda) & Poisson Formulation
- **Primary Live Model**:
  - Lambda Home: 0.4808 | Lambda Away: 1.9531 | **Total Expected Goals (Lambda): 2.4339**
  - **Poisson P(Over 1.5)**: **69.9%** (Weak for the Over 1.5-focused strategy)
  - Poisson P(Under 1.5): 30.1%
- **Companion Historical Benchmark**:
  - Historical Total Expected Goals: 2.4069
  - **Historical P(Over 1.5)**: **69.3%**
- **Dual-Baseline Alignment**: `[VERY_HIGH ALIGNMENT]` (0.58 pp delta)

### Market Pricing & Value Analysis
- **Offered Odds**: 1.11
- **Bookmaker Break-Even Probability**: 90.1%
- **Value Edge**: -20.2 percentage points (`[VERY_LOW EDGE]`)
- **Expected Value (EV)**: -0.224 per unit staked

### Warnings & Negative Checks
- **`SMALL_SAMPLE`** [MEDIUM] (CONTRADICTORY / INDIRECT): Limited sample size of only 4 matches.
  - *Evidence*: Sample size below the 5-match threshold for statistical stability (4 vs 4).
- **`HIGH_LINE_RELIANCE`** [MEDIUM] (CONTRADICTORY / INDIRECT): Over 75% of expected goals depend exclusively on Club Brugge.
  - *Evidence*: Away expected goals (1.95) account for 80% of total expected output (2.43).
- **`TEAM_NEWS_UNVERIFIED`** [LOW] (NEUTRAL / CONTEXTUAL): Pre-match team news and confirmed starting lineups remain unverified.
  - *Evidence*: Lineups have not been locked in; rotation or late injury risk unconfirmed.

### Final Decision Verdict: **NO BET**
> NO BET. Model estimates an 69.9% Over 1.5 probability versus bookmaker break-even of 90.1% at 1.11 odds (-20.2 edge, -0.224 EV). Estimated Over 1.5 probability (69.9%) is well below the 70% threshold for the Over 1.5 strategy.

---

## 15. KAA Gent B vs K. Lierse Kempenzonen
- **Fixture**: Belgium — Challenger Pro League | Date: 2026-10-30
- **Data Quality**: **Verified (Dual-Baseline Venue-Specific & Season-Overall Analysis)**

### Pre-Match Statistical Matchup Comparison

#### Venue Form (Used by Model Engine)
| Metric | KAA Gent B (Home @ Home) | K. Lierse Kempenzonen (Away @ Away) |
| :--- | :---: | :---: |
| **League Standing** | 10th | 8th |
| **Venue Matches Played** | 3 | 3 |
| **Venue Goals Scored (GF)** | 4 (1.33 / game) | 4 (1.33 / game) |
| **Venue Goals Conceded (GA)** | 4 (1.33 / game) | 5 (1.67 / game) |

#### Season Overall (Macro Contextual Record)
| Metric | KAA Gent B (Overall) | K. Lierse Kempenzonen (Overall) |
| :--- | :---: | :---: |
| **Overall Matches Played** | 6 | 6 |
| **Overall Goals Scored (GF)** | 7 (1.17 / game) | 8 (1.33 / game) |
| **Overall Goals Conceded (GA)** | 9 (1.50 / game) | 10 (1.67 / game) |

### Goal Profiles & Strength Indices (Dual-Baseline)
- **Primary Live Baselines (Challenger Pro League)**: Home scoring avg 1.44, Away scoring avg 1.22
  - Home Attacking Strength: 0.93
  - Away Defensive Weakness: 1.16
  - Away Attacking Strength: 1.09
  - Home Defensive Weakness: 1.09
- **Historical Benchmark Baselines**: Home scoring avg 1.45, Away scoring avg 1.20

### Expected Goals (Lambda) & Poisson Formulation
- **Primary Live Model**:
  - Lambda Home: 1.5432 | Lambda Away: 1.4572 | **Total Expected Goals (Lambda): 3.0004**
  - **Poisson P(Over 1.5)**: **80.1%** (Strong)
  - Poisson P(Under 1.5): 19.9%
- **Companion Historical Benchmark**:
  - Historical Total Expected Goals: 3.0140
  - **Historical P(Over 1.5)**: **80.3%**
- **Dual-Baseline Alignment**: `[VERY_HIGH ALIGNMENT]` (0.20 pp delta)

### Market Pricing & Value Analysis
- **Offered Odds**: 1.19
- **Bookmaker Break-Even Probability**: 84.0%
- **Value Edge**: -3.9 percentage points (`[LOW EDGE]`)
- **Expected Value (EV)**: -0.047 per unit staked

### Warnings & Negative Checks
- **`SMALL_SAMPLE`** [MEDIUM] (CONTRADICTORY / INDIRECT): Limited sample size of only 3 matches.
  - *Evidence*: Sample size below the 5-match threshold for statistical stability (3 vs 3).
- **`TEAM_NEWS_UNVERIFIED`** [LOW] (NEUTRAL / CONTEXTUAL): Pre-match team news and confirmed starting lineups remain unverified.
  - *Evidence*: Lineups have not been locked in; rotation or late injury risk unconfirmed.

### Final Decision Verdict: **CAUTION**
> CAUTION. Model estimates an 80.1% Over 1.5 probability versus bookmaker break-even of 84.0% at 1.19 odds (-3.9 edge, -0.047 EV). High probability (80.1%), but pricing offers no positive edge (-3.9pp). Disclosed under Principle 9.

---

## 16. RFC Seraing vs RFC Liege
- **Fixture**: Belgium — Challenger Pro League | Date: 2026-10-30
- **Data Quality**: **Verified (Dual-Baseline Venue-Specific & Season-Overall Analysis)**

### Pre-Match Statistical Matchup Comparison

#### Venue Form (Used by Model Engine)
| Metric | RFC Seraing (Home @ Home) | RFC Liege (Away @ Away) |
| :--- | :---: | :---: |
| **League Standing** | 14th | 13th |
| **Venue Matches Played** | 4 | 4 |
| **Venue Goals Scored (GF)** | 5 (1.25 / game) | 5 (1.25 / game) |
| **Venue Goals Conceded (GA)** | 6 (1.50 / game) | 10 (2.50 / game) |

#### Season Overall (Macro Contextual Record)
| Metric | RFC Seraing (Overall) | RFC Liege (Overall) |
| :--- | :---: | :---: |
| **Overall Matches Played** | 7 | 7 |
| **Overall Goals Scored (GF)** | 5 (0.71 / game) | 6 (0.86 / game) |
| **Overall Goals Conceded (GA)** | 12 (1.71 / game) | 13 (1.86 / game) |

### Goal Profiles & Strength Indices (Dual-Baseline)
- **Primary Live Baselines (Challenger Pro League)**: Home scoring avg 1.44, Away scoring avg 1.22
  - Home Attacking Strength: 0.87
  - Away Defensive Weakness: 1.74
  - Away Attacking Strength: 1.02
  - Home Defensive Weakness: 1.23
- **Historical Benchmark Baselines**: Home scoring avg 1.45, Away scoring avg 1.20

### Expected Goals (Lambda) & Poisson Formulation
- **Primary Live Model**:
  - Lambda Home: 2.1701 | Lambda Away: 1.5369 | **Total Expected Goals (Lambda): 3.7070**
  - **Poisson P(Over 1.5)**: **88.4%** (Very strong)
  - Poisson P(Under 1.5): 11.6%
- **Companion Historical Benchmark**:
  - Historical Total Expected Goals: 3.7177
  - **Historical P(Over 1.5)**: **88.5%**
- **Dual-Baseline Alignment**: `[VERY_HIGH ALIGNMENT]` (0.10 pp delta)

### Market Pricing & Value Analysis
- **Offered Odds**: 1.22
- **Bookmaker Break-Even Probability**: 82.0%
- **Value Edge**: +6.5 percentage points (`[HIGH EDGE]`)
- **Expected Value (EV)**: +0.079 per unit staked

### Warnings & Negative Checks
- **`SMALL_SAMPLE`** [MEDIUM] (CONTRADICTORY / INDIRECT): Limited sample size of only 4 matches.
  - *Evidence*: Sample size below the 5-match threshold for statistical stability (4 vs 4).
- **`TEAM_NEWS_UNVERIFIED`** [LOW] (NEUTRAL / CONTEXTUAL): Pre-match team news and confirmed starting lineups remain unverified.
  - *Evidence*: Lineups have not been locked in; rotation or late injury risk unconfirmed.

### Final Decision Verdict: **SELECT**
> SELECT. Model estimates an 88.4% Over 1.5 probability versus bookmaker break-even of 82.0% at 1.22 odds (+6.5 edge, +0.079 EV). Strong probability (88.4%) supported by positive edge (+6.5pp, EV +0.079) and acceptable risk profile.

---

## 17. Helmond Sport vs FC Eindhoven
- **Fixture**: Netherlands — Eerste Divisie | Date: 2026-10-30
- **Data Quality**: **Verified (Dual-Baseline Venue-Specific & Season-Overall Analysis)**

### Pre-Match Statistical Matchup Comparison

#### Venue Form (Used by Model Engine)
| Metric | Helmond Sport (Home @ Home) | FC Eindhoven (Away @ Away) |
| :--- | :---: | :---: |
| **League Standing** | 19th | 17th |
| **Venue Matches Played** | 6 | 5 |
| **Venue Goals Scored (GF)** | 11 (1.83 / game) | 10 (2.00 / game) |
| **Venue Goals Conceded (GA)** | 9 (1.50 / game) | 7 (1.40 / game) |

#### Season Overall (Macro Contextual Record)
| Metric | Helmond Sport (Overall) | FC Eindhoven (Overall) |
| :--- | :---: | :---: |
| **Overall Matches Played** | 12 | 12 |
| **Overall Goals Scored (GF)** | 20 (1.67 / game) | 16 (1.33 / game) |
| **Overall Goals Conceded (GA)** | 26 (2.17 / game) | 25 (2.08 / game) |

### Goal Profiles & Strength Indices (Dual-Baseline)
- **Primary Live Baselines (Eerste Divisie)**: Home scoring avg 1.68, Away scoring avg 1.38
  - Home Attacking Strength: 1.09
  - Away Defensive Weakness: 0.83
  - Away Attacking Strength: 1.45
  - Home Defensive Weakness: 1.09
- **Historical Benchmark Baselines**: Home scoring avg 1.65, Away scoring avg 1.35

### Expected Goals (Lambda) & Poisson Formulation
- **Primary Live Model**:
  - Lambda Home: 1.5278 | Lambda Away: 2.1739 | **Total Expected Goals (Lambda): 3.7017**
  - **Poisson P(Over 1.5)**: **88.4%** (Very strong)
  - Poisson P(Under 1.5): 11.6%
- **Companion Historical Benchmark**:
  - Historical Total Expected Goals: 3.7778
  - **Historical P(Over 1.5)**: **89.1%**
- **Dual-Baseline Alignment**: `[VERY_HIGH ALIGNMENT]` (0.68 pp delta)

### Market Pricing & Value Analysis
- **Offered Odds**: 1.18
- **Bookmaker Break-Even Probability**: 84.7%
- **Value Edge**: +3.6 percentage points (`[MEDIUM EDGE]`)
- **Expected Value (EV)**: +0.043 per unit staked

### Warnings & Negative Checks
- **`TEAM_NEWS_UNVERIFIED`** [LOW] (NEUTRAL / CONTEXTUAL): Pre-match team news and confirmed starting lineups remain unverified.
  - *Evidence*: Lineups have not been locked in; rotation or late injury risk unconfirmed.

### Final Decision Verdict: **SELECT**
> SELECT. Model estimates an 88.4% Over 1.5 probability versus bookmaker break-even of 84.7% at 1.18 odds (+3.6 edge, +0.043 EV). Strong probability (88.4%) supported by positive edge (+3.6pp, EV +0.043) and acceptable risk profile.

---

## 18. CA Huracan vs CA Tigre
- **Fixture**: Argentina — Liga Profesional | Date: 2026-10-30
- **Data Quality**: **Verified (Dual-Baseline Venue-Specific & Season-Overall Analysis)**

### Pre-Match Statistical Matchup Comparison

#### Venue Form (Used by Model Engine)
| Metric | CA Huracan (Home @ Home) | CA Tigre (Away @ Away) |
| :--- | :---: | :---: |
| **League Standing** | 8th | 12th |
| **Venue Matches Played** | 7 | 6 |
| **Venue Goals Scored (GF)** | 6 (0.86 / game) | 7 (1.17 / game) |
| **Venue Goals Conceded (GA)** | 4 (0.57 / game) | 10 (1.67 / game) |

#### Season Overall (Macro Contextual Record)
| Metric | CA Huracan (Overall) | CA Tigre (Overall) |
| :--- | :---: | :---: |
| **Overall Matches Played** | 14 | 14 |
| **Overall Goals Scored (GF)** | 12 (0.86 / game) | 13 (0.93 / game) |
| **Overall Goals Conceded (GA)** | 14 (1.00 / game) | 16 (1.14 / game) |

### Goal Profiles & Strength Indices (Dual-Baseline)
- **Primary Live Baselines (Liga Profesional)**: Home scoring avg 1.28, Away scoring avg 0.98
  - Home Attacking Strength: 0.67
  - Away Defensive Weakness: 1.30
  - Away Attacking Strength: 1.19
  - Home Defensive Weakness: 0.58
- **Historical Benchmark Baselines**: Home scoring avg 1.30, Away scoring avg 1.05

### Expected Goals (Lambda) & Poisson Formulation
- **Primary Live Model**:
  - Lambda Home: 1.1161 | Lambda Away: 0.6803 | **Total Expected Goals (Lambda): 1.7963**
  - **Poisson P(Over 1.5)**: **53.6%** (Weak for the Over 1.5-focused strategy)
  - Poisson P(Under 1.5): 46.4%
- **Companion Historical Benchmark**:
  - Historical Total Expected Goals: 1.7338
  - **Historical P(Over 1.5)**: **51.7%**
- **Dual-Baseline Alignment**: `[HIGH ALIGNMENT]` (1.89 pp delta)

### Market Pricing & Value Analysis
- **Offered Odds**: 1.56
- **Bookmaker Break-Even Probability**: 64.1%
- **Value Edge**: -10.5 percentage points (`[VERY_LOW EDGE]`)
- **Expected Value (EV)**: -0.164 per unit staked

### Warnings & Negative Checks
- **`LOW_HOME_SCORING`** [MEDIUM] (CONTRADICTORY / DIRECT): CA Huracan home scoring rate is low (0.86 GF/game).
  - *Evidence*: CA Huracan averages under 1.0 goal scored per home match across observed fixtures.
- **`TEAM_NEWS_UNVERIFIED`** [LOW] (NEUTRAL / CONTEXTUAL): Pre-match team news and confirmed starting lineups remain unverified.
  - *Evidence*: Lineups have not been locked in; rotation or late injury risk unconfirmed.

### Final Decision Verdict: **NO BET**
> NO BET. Model estimates an 53.6% Over 1.5 probability versus bookmaker break-even of 64.1% at 1.56 odds (-10.5 edge, -0.164 EV). Estimated Over 1.5 probability (53.6%) is well below the 70% threshold for the Over 1.5 strategy.

---

## 19. AA Estudiantes vs Gimnasia La Plata
- **Fixture**: Argentina — Liga Profesional | Date: 2026-10-30
- **Data Quality**: **Verified (Dual-Baseline Venue-Specific & Season-Overall Analysis)**

### Pre-Match Statistical Matchup Comparison

#### Venue Form (Used by Model Engine)
| Metric | AA Estudiantes (Home @ Home) | Gimnasia La Plata (Away @ Away) |
| :--- | :---: | :---: |
| **League Standing** | 15th | 3rd |
| **Venue Matches Played** | 7 | 7 |
| **Venue Goals Scored (GF)** | 5 (0.71 / game) | 10 (1.43 / game) |
| **Venue Goals Conceded (GA)** | 8 (1.14 / game) | 11 (1.57 / game) |

#### Season Overall (Macro Contextual Record)
| Metric | AA Estudiantes (Overall) | Gimnasia La Plata (Overall) |
| :--- | :---: | :---: |
| **Overall Matches Played** | 14 | 14 |
| **Overall Goals Scored (GF)** | 9 (0.64 / game) | 21 (1.50 / game) |
| **Overall Goals Conceded (GA)** | 19 (1.36 / game) | 18 (1.29 / game) |

### Goal Profiles & Strength Indices (Dual-Baseline)
- **Primary Live Baselines (Liga Profesional)**: Home scoring avg 1.28, Away scoring avg 0.98
  - Home Attacking Strength: 0.56
  - Away Defensive Weakness: 1.23
  - Away Attacking Strength: 1.46
  - Home Defensive Weakness: 1.17
- **Historical Benchmark Baselines**: Home scoring avg 1.30, Away scoring avg 1.05

### Expected Goals (Lambda) & Poisson Formulation
- **Primary Live Model**:
  - Lambda Home: 0.8769 | Lambda Away: 1.6660 | **Total Expected Goals (Lambda): 2.5429**
  - **Poisson P(Over 1.5)**: **72.1%** (Moderate)
  - Poisson P(Under 1.5): 27.9%
- **Companion Historical Benchmark**:
  - Historical Total Expected Goals: 2.4183
  - **Historical P(Over 1.5)**: **69.6%**
- **Dual-Baseline Alignment**: `[HIGH ALIGNMENT]` (2.59 pp delta)

### Market Pricing & Value Analysis
- **Offered Odds**: 1.41
- **Bookmaker Break-Even Probability**: 70.9%
- **Value Edge**: +1.2 percentage points (`[MEDIUM EDGE]`)
- **Expected Value (EV)**: +0.017 per unit staked

### Warnings & Negative Checks
- **`LOW_HOME_SCORING`** [MEDIUM] (CONTRADICTORY / DIRECT): AA Estudiantes home scoring rate is low (0.71 GF/game).
  - *Evidence*: AA Estudiantes averages under 1.0 goal scored per home match across observed fixtures.
- **`TEAM_NEWS_UNVERIFIED`** [LOW] (NEUTRAL / CONTEXTUAL): Pre-match team news and confirmed starting lineups remain unverified.
  - *Evidence*: Lineups have not been locked in; rotation or late injury risk unconfirmed.

### Final Decision Verdict: **CAUTION**
> CAUTION. Model estimates an 72.1% Over 1.5 probability versus bookmaker break-even of 70.9% at 1.41 odds (+1.2 edge, +0.017 EV). Viable probability (72.1%), but edge is modest (+1.2pp) and requires risk awareness.

---

## 20. Esenler Erokspor vs Ankara Keciorengucu
- **Fixture**: Turkey — TFF 1. Lig | Date: 2026-10-30
- **Data Quality**: **Verified (Dual-Baseline Venue-Specific & Season-Overall Analysis)**

### Pre-Match Statistical Matchup Comparison

#### Venue Form (Used by Model Engine)
| Metric | Esenler Erokspor (Home @ Home) | Ankara Keciorengucu (Away @ Away) |
| :--- | :---: | :---: |
| **League Standing** | 15th | 6th |
| **Venue Matches Played** | 6 | 6 |
| **Venue Goals Scored (GF)** | 7 (1.17 / game) | 11 (1.83 / game) |
| **Venue Goals Conceded (GA)** | 7 (1.17 / game) | 8 (1.33 / game) |

#### Season Overall (Macro Contextual Record)
| Metric | Esenler Erokspor (Overall) | Ankara Keciorengucu (Overall) |
| :--- | :---: | :---: |
| **Overall Matches Played** | 12 | 12 |
| **Overall Goals Scored (GF)** | 12 (1.00 / game) | 23 (1.92 / game) |
| **Overall Goals Conceded (GA)** | 16 (1.33 / game) | 15 (1.25 / game) |

### Goal Profiles & Strength Indices (Dual-Baseline)
- **Primary Live Baselines (TFF 1. Lig)**: Home scoring avg 1.46, Away scoring avg 1.18
  - Home Attacking Strength: 0.80
  - Away Defensive Weakness: 0.91
  - Away Attacking Strength: 1.55
  - Home Defensive Weakness: 0.99
- **Historical Benchmark Baselines**: Home scoring avg 1.45, Away scoring avg 1.15

### Expected Goals (Lambda) & Poisson Formulation
- **Primary Live Model**:
  - Lambda Home: 1.0654 | Lambda Away: 1.8126 | **Total Expected Goals (Lambda): 2.8781**
  - **Poisson P(Over 1.5)**: **78.2%** (Good)
  - Poisson P(Under 1.5): 21.8%
- **Companion Historical Benchmark**:
  - Historical Total Expected Goals: 2.9327
  - **Historical P(Over 1.5)**: **79.1%**
- **Dual-Baseline Alignment**: `[VERY_HIGH ALIGNMENT]` (0.87 pp delta)

### Market Pricing & Value Analysis
- **Offered Odds**: 1.18
- **Bookmaker Break-Even Probability**: 84.7%
- **Value Edge**: -6.6 percentage points (`[LOW EDGE]`)
- **Expected Value (EV)**: -0.077 per unit staked

### Warnings & Negative Checks
- **`TEAM_NEWS_UNVERIFIED`** [LOW] (NEUTRAL / CONTEXTUAL): Pre-match team news and confirmed starting lineups remain unverified.
  - *Evidence*: Lineups have not been locked in; rotation or late injury risk unconfirmed.

### Final Decision Verdict: **CAUTION**
> CAUTION. Model estimates an 78.2% Over 1.5 probability versus bookmaker break-even of 84.7% at 1.18 odds (-6.6 edge, -0.077 EV). High probability (78.2%), but pricing offers no positive edge (-6.6pp). Disclosed under Principle 9.

---

## 21. FK Agrobiznes Volochysk vs FC Prykarpattia
- **Fixture**: Ukraine — First League | Date: 2026-10-30
- **Data Quality**: **Verified (Dual-Baseline Venue-Specific & Season-Overall Analysis)**

### Pre-Match Statistical Matchup Comparison

#### Venue Form (Used by Model Engine)
| Metric | FK Agrobiznes Volochysk (Home @ Home) | FC Prykarpattia (Away @ Away) |
| :--- | :---: | :---: |
| **League Standing** | 5th | 10th |
| **Venue Matches Played** | 6 | 7 |
| **Venue Goals Scored (GF)** | 11 (1.83 / game) | 5 (0.71 / game) |
| **Venue Goals Conceded (GA)** | 6 (1.00 / game) | 9 (1.29 / game) |

#### Season Overall (Macro Contextual Record)
| Metric | FK Agrobiznes Volochysk (Overall) | FC Prykarpattia (Overall) |
| :--- | :---: | :---: |
| **Overall Matches Played** | 12 | 13 |
| **Overall Goals Scored (GF)** | 19 (1.58 / game) | 13 (1.00 / game) |
| **Overall Goals Conceded (GA)** | 14 (1.17 / game) | 15 (1.15 / game) |

### Goal Profiles & Strength Indices (Dual-Baseline)
- **Primary Live Baselines (First League)**: Home scoring avg 1.38, Away scoring avg 1.08
  - Home Attacking Strength: 1.33
  - Away Defensive Weakness: 0.93
  - Away Attacking Strength: 0.66
  - Home Defensive Weakness: 0.93
- **Historical Benchmark Baselines**: Home scoring avg 1.40, Away scoring avg 1.10

### Expected Goals (Lambda) & Poisson Formulation
- **Primary Live Model**:
  - Lambda Home: 1.7081 | Lambda Away: 0.6614 | **Total Expected Goals (Lambda): 2.3695**
  - **Poisson P(Over 1.5)**: **68.5%** (Weak for the Over 1.5-focused strategy)
  - Poisson P(Under 1.5): 31.5%
- **Companion Historical Benchmark**:
  - Historical Total Expected Goals: 2.3330
  - **Historical P(Over 1.5)**: **67.7%**
- **Dual-Baseline Alignment**: `[VERY_HIGH ALIGNMENT]` (0.82 pp delta)

### Market Pricing & Value Analysis
- **Offered Odds**: 1.32
- **Bookmaker Break-Even Probability**: 75.8%
- **Value Edge**: -7.3 percentage points (`[LOW EDGE]`)
- **Expected Value (EV)**: -0.096 per unit staked

### Warnings & Negative Checks
- **`LOW_AWAY_SCORING`** [MEDIUM] (CONTRADICTORY / DIRECT): FC Prykarpattia averages only 0.71 goals per game away, increasing shutout risk.
  - *Evidence*: FC Prykarpattia away scoring average is 0.71 GF/game, placing heavy reliance on FK Agrobiznes Volochysk to produce goals.
- **`TEAM_NEWS_UNVERIFIED`** [LOW] (NEUTRAL / CONTEXTUAL): Pre-match team news and confirmed starting lineups remain unverified.
  - *Evidence*: Lineups have not been locked in; rotation or late injury risk unconfirmed.

### Final Decision Verdict: **NO BET**
> NO BET. Model estimates an 68.5% Over 1.5 probability versus bookmaker break-even of 75.8% at 1.32 odds (-7.3 edge, -0.096 EV). Estimated Over 1.5 probability (68.5%) is well below the 70% threshold for the Over 1.5 strategy.

---

## 22. ASO Chlef vs ES Setif
- **Fixture**: Algeria — Ligue 1 | Date: 2026-10-30
- **Data Quality**: **Verified (Dual-Baseline Venue-Specific & Season-Overall Analysis)**

### Pre-Match Statistical Matchup Comparison

#### Venue Form (Used by Model Engine)
| Metric | ASO Chlef (Home @ Home) | ES Setif (Away @ Away) |
| :--- | :---: | :---: |
| **League Standing** | 14th | 12th |
| **Venue Matches Played** | 3 | 3 |
| **Venue Goals Scored (GF)** | 2 (0.67 / game) | 1 (0.33 / game) |
| **Venue Goals Conceded (GA)** | 3 (1.00 / game) | 4 (1.33 / game) |

#### Season Overall (Macro Contextual Record)
| Metric | ASO Chlef (Overall) | ES Setif (Overall) |
| :--- | :---: | :---: |
| **Overall Matches Played** | 7 | 6 |
| **Overall Goals Scored (GF)** | 3 (0.43 / game) | 4 (0.67 / game) |
| **Overall Goals Conceded (GA)** | 8 (1.14 / game) | 6 (1.00 / game) |

### Goal Profiles & Strength Indices (Dual-Baseline)
- **Primary Live Baselines (Ligue 1)**: Home scoring avg 1.22, Away scoring avg 0.88
  - Home Attacking Strength: 0.55
  - Away Defensive Weakness: 1.09
  - Away Attacking Strength: 0.38
  - Home Defensive Weakness: 1.14
- **Historical Benchmark Baselines**: Home scoring avg 1.25, Away scoring avg 0.90

### Expected Goals (Lambda) & Poisson Formulation
- **Primary Live Model**:
  - Lambda Home: 0.7286 | Lambda Away: 0.3788 | **Total Expected Goals (Lambda): 1.1074**
  - **Poisson P(Over 1.5)**: **30.4%** (Weak for the Over 1.5-focused strategy)
  - Poisson P(Under 1.5): 69.6%
- **Companion Historical Benchmark**:
  - Historical Total Expected Goals: 1.0815
  - **Historical P(Over 1.5)**: **29.4%**
- **Dual-Baseline Alignment**: `[VERY_HIGH ALIGNMENT]` (0.95 pp delta)

### Market Pricing & Value Analysis
- **Offered Odds**: 1.57
- **Bookmaker Break-Even Probability**: 63.7%
- **Value Edge**: -33.3 percentage points (`[VERY_LOW EDGE]`)
- **Expected Value (EV)**: -0.523 per unit staked

### Warnings & Negative Checks
- **`SMALL_SAMPLE`** [MEDIUM] (CONTRADICTORY / INDIRECT): Limited sample size of only 3 matches.
  - *Evidence*: Sample size below the 5-match threshold for statistical stability (3 vs 3).
- **`LOW_AWAY_SCORING`** [HIGH] (CONTRADICTORY / DIRECT): ES Setif averages only 0.33 goals per game away, increasing shutout risk.
  - *Evidence*: ES Setif away scoring average is 0.33 GF/game, placing heavy reliance on ASO Chlef to produce goals.
- **`LOW_HOME_SCORING`** [MEDIUM] (CONTRADICTORY / DIRECT): ASO Chlef home scoring rate is low (0.67 GF/game).
  - *Evidence*: ASO Chlef averages under 1.0 goal scored per home match across observed fixtures.
- **`TEAM_NEWS_UNVERIFIED`** [LOW] (NEUTRAL / CONTEXTUAL): Pre-match team news and confirmed starting lineups remain unverified.
  - *Evidence*: Lineups have not been locked in; rotation or late injury risk unconfirmed.

### Final Decision Verdict: **NO BET**
> NO BET. Model estimates an 30.4% Over 1.5 probability versus bookmaker break-even of 63.7% at 1.57 odds (-33.3 edge, -0.523 EV). Estimated Over 1.5 probability (30.4%) is well below the 70% threshold for the Over 1.5 strategy.

---

## 23. JS Kabylie vs JS El Biar
- **Fixture**: Algeria — Ligue 1 | Date: 2026-10-30
- **Data Quality**: **Verified (Dual-Baseline Venue-Specific & Season-Overall Analysis)**

### Pre-Match Statistical Matchup Comparison

#### Venue Form (Used by Model Engine)
| Metric | JS Kabylie (Home @ Home) | JS El Biar (Away @ Away) |
| :--- | :---: | :---: |
| **League Standing** | 3rd | 8th |
| **Venue Matches Played** | 3 | 3 |
| **Venue Goals Scored (GF)** | 6 (2.00 / game) | 5 (1.67 / game) |
| **Venue Goals Conceded (GA)** | 1 (0.33 / game) | 7 (2.33 / game) |

#### Season Overall (Macro Contextual Record)
| Metric | JS Kabylie (Overall) | JS El Biar (Overall) |
| :--- | :---: | :---: |
| **Overall Matches Played** | 6 | 7 |
| **Overall Goals Scored (GF)** | 10 (1.67 / game) | 12 (1.71 / game) |
| **Overall Goals Conceded (GA)** | 3 (0.50 / game) | 11 (1.57 / game) |

### Goal Profiles & Strength Indices (Dual-Baseline)
- **Primary Live Baselines (Ligue 1)**: Home scoring avg 1.22, Away scoring avg 0.88
  - Home Attacking Strength: 1.64
  - Away Defensive Weakness: 1.91
  - Away Attacking Strength: 1.89
  - Home Defensive Weakness: 0.38
- **Historical Benchmark Baselines**: Home scoring avg 1.25, Away scoring avg 0.90

### Expected Goals (Lambda) & Poisson Formulation
- **Primary Live Model**:
  - Lambda Home: 3.8251 | Lambda Away: 0.6313 | **Total Expected Goals (Lambda): 4.4564**
  - **Poisson P(Over 1.5)**: **93.7%** (Extremely strong)
  - Poisson P(Under 1.5): 6.3%
- **Companion Historical Benchmark**:
  - Historical Total Expected Goals: 4.3506
  - **Historical P(Over 1.5)**: **93.1%**
- **Dual-Baseline Alignment**: `[VERY_HIGH ALIGNMENT]` (0.57 pp delta)

### Market Pricing & Value Analysis
- **Offered Odds**: 1.36
- **Bookmaker Break-Even Probability**: 73.5%
- **Value Edge**: +20.1 percentage points (`[VERY_HIGH EDGE]`)
- **Expected Value (EV)**: +0.274 per unit staked

### Warnings & Negative Checks
- **`SMALL_SAMPLE`** [MEDIUM] (CONTRADICTORY / INDIRECT): Limited sample size of only 3 matches.
  - *Evidence*: Sample size below the 5-match threshold for statistical stability (3 vs 3).
- **`HIGH_LINE_RELIANCE`** [MEDIUM] (CONTRADICTORY / INDIRECT): Over 75% of expected goals depend exclusively on JS Kabylie.
  - *Evidence*: Home expected goals (3.83) account for 86% of total expected output (4.46).
- **`TEAM_NEWS_UNVERIFIED`** [LOW] (NEUTRAL / CONTEXTUAL): Pre-match team news and confirmed starting lineups remain unverified.
  - *Evidence*: Lineups have not been locked in; rotation or late injury risk unconfirmed.

### Final Decision Verdict: **CAUTION**
> CAUTION. Model estimates an 93.7% Over 1.5 probability versus bookmaker break-even of 73.5% at 1.36 odds (+20.1 edge, +0.274 EV). Multiple medium warnings (SMALL_SAMPLE, HIGH_LINE_RELIANCE) warrant measured caution.

---

## 24. MC Oran vs Olympique Akbou
- **Fixture**: Algeria — Ligue 1 | Date: 2026-10-30
- **Data Quality**: **Verified (Dual-Baseline Venue-Specific & Season-Overall Analysis)**

### Pre-Match Statistical Matchup Comparison

#### Venue Form (Used by Model Engine)
| Metric | MC Oran (Home @ Home) | Olympique Akbou (Away @ Away) |
| :--- | :---: | :---: |
| **League Standing** | 1st | 7th |
| **Venue Matches Played** | 3 | 3 |
| **Venue Goals Scored (GF)** | 3 (1.00 / game) | 3 (1.00 / game) |
| **Venue Goals Conceded (GA)** | 0 (0.00 / game) | 4 (1.33 / game) |

#### Season Overall (Macro Contextual Record)
| Metric | MC Oran (Overall) | Olympique Akbou (Overall) |
| :--- | :---: | :---: |
| **Overall Matches Played** | 6 | 6 |
| **Overall Goals Scored (GF)** | 5 (0.83 / game) | 9 (1.50 / game) |
| **Overall Goals Conceded (GA)** | 0 (0.00 / game) | 6 (1.00 / game) |

### Goal Profiles & Strength Indices (Dual-Baseline)
- **Primary Live Baselines (Ligue 1)**: Home scoring avg 1.22, Away scoring avg 0.88
  - Home Attacking Strength: 0.82
  - Away Defensive Weakness: 1.09
  - Away Attacking Strength: 1.14
  - Home Defensive Weakness: 0.00
- **Historical Benchmark Baselines**: Home scoring avg 1.25, Away scoring avg 0.90

### Expected Goals (Lambda) & Poisson Formulation
- **Primary Live Model**:
  - Lambda Home: 1.0929 | Lambda Away: 0.0000 | **Total Expected Goals (Lambda): 1.0929**
  - **Poisson P(Over 1.5)**: **29.8%** (Weak for the Over 1.5-focused strategy)
  - Poisson P(Under 1.5): 70.2%
- **Companion Historical Benchmark**:
  - Historical Total Expected Goals: 1.0667
  - **Historical P(Over 1.5)**: **28.9%**
- **Dual-Baseline Alignment**: `[VERY_HIGH ALIGNMENT]` (0.96 pp delta)

### Market Pricing & Value Analysis
- **Offered Odds**: 1.52
- **Bookmaker Break-Even Probability**: 65.8%
- **Value Edge**: -36.0 percentage points (`[VERY_LOW EDGE]`)
- **Expected Value (EV)**: -0.546 per unit staked

### Warnings & Negative Checks
- **`SMALL_SAMPLE`** [MEDIUM] (CONTRADICTORY / INDIRECT): Limited sample size of only 3 matches.
  - *Evidence*: Sample size below the 5-match threshold for statistical stability (3 vs 3).
- **`STRONG_DEFENSIVE_MATCHUP`** [HIGH] (CONTRADICTORY / DIRECT): Exceptionally tight defensive record elevating clean-sheet / low-scoring risk.
  - *Evidence*: MC Oran concedes 0.00 GA/game and Olympique Akbou concedes 1.33 GA/game.
- **`HIGH_LINE_RELIANCE`** [MEDIUM] (CONTRADICTORY / INDIRECT): Over 75% of expected goals depend exclusively on MC Oran.
  - *Evidence*: Home expected goals (1.09) account for 100% of total expected output (1.09).
- **`TEAM_NEWS_UNVERIFIED`** [LOW] (NEUTRAL / CONTEXTUAL): Pre-match team news and confirmed starting lineups remain unverified.
  - *Evidence*: Lineups have not been locked in; rotation or late injury risk unconfirmed.

### Final Decision Verdict: **NO BET**
> NO BET. Model estimates an 29.8% Over 1.5 probability versus bookmaker break-even of 65.8% at 1.52 odds (-36.0 edge, -0.546 EV). Estimated Over 1.5 probability (29.8%) is well below the 70% threshold for the Over 1.5 strategy.

---

## SKIPPED FIXTURES — SECTION 5.0 HARD-STOP PROTOCOL
All 24 match options provided for 2026-10-30 had verified venue-split statistics available and satisfied Section 5.0 criteria. Zero fixtures required skipping.

---

## EXECUTIVE SUMMARY TABLE (2026-10-30)
| ID | Fixture | League | Odds | Break-Even | Live Prob | Hist Prob | Align Delta | Edge (pp) | EV | Warnings | Verdict |
| :---: | :--- | :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| 1 | Villarreal vs Espanyol | La Liga | 1.20 | 83.3% | 79.8% | 81.3% | 1.5pp | -3.5pp | -0.042 | 2 | CAUTION |
| 2 | OGC Nice vs Stade Rennais | Ligue 1 | 1.18 | 84.7% | 86.3% | 86.8% | 0.5pp | +1.6pp | +0.019 | 2 | **SELECT** |
| 3 | Le Havre vs Paris Saint-Germain | Ligue 1 | 1.12 | 89.3% | 77.8% | 78.5% | 0.7pp | -11.5pp | -0.129 | 4 | NO BET |
| 4 | Lille OSC vs Lens | Ligue 1 | 1.26 | 79.4% | 76.9% | 77.6% | 0.7pp | -2.4pp | -0.031 | 2 | CAUTION |
| 5 | Grenoble Foot 38 vs Dijon | Ligue 2 | 1.28 | 78.1% | 60.5% | 61.9% | 1.4pp | -17.6pp | -0.226 | 3 | NO BET |
| 6 | Stade Lavallois vs US Boulogne | Ligue 2 | 1.38 | 72.5% | 24.4% | 25.3% | 0.9pp | -48.1pp | -0.664 | 3 | NO BET |
| 7 | Metz vs Pau FC | Ligue 2 | 1.25 | 80.0% | 84.8% | 85.8% | 1.0pp | +4.8pp | +0.061 | 2 | **SELECT** |
| 8 | Nantes vs Clermont Foot | Ligue 2 | 1.23 | 81.3% | 90.5% | 91.2% | 0.8pp | +9.2pp | +0.113 | 2 | **SELECT** |
| 9 | Rodez vs USL Dunkerque | Ligue 2 | 1.16 | 86.2% | 97.2% | 97.5% | 0.3pp | +11.0pp | +0.128 | 2 | **SELECT** |
| 10 | SV Elversberg vs 1. FSV Mainz 05 | Bundesliga | 1.14 | 87.7% | 99.4% | 99.5% | 0.1pp | +11.7pp | +0.134 | 3 | CAUTION |
| 11 | Arminia Bielefeld vs Eintracht Braunschweig | 2. Bundesliga | 1.21 | 82.6% | 91.9% | 92.3% | 0.5pp | +9.2pp | +0.112 | 2 | **SELECT** |
| 12 | Energie Cottbus vs VfL Bochum | 2. Bundesliga | 1.18 | 84.7% | 78.7% | 79.5% | 0.8pp | -6.1pp | -0.072 | 2 | CAUTION |
| 13 | Casa Pia AC vs Sporting CP | Liga Portugal | 1.20 | 83.3% | 99.4% | 99.4% | 0.0pp | +16.0pp | +0.192 | 4 | CAUTION |
| 14 | SV Zulte Waregem vs Club Brugge | Pro League | 1.11 | 90.1% | 69.9% | 69.3% | 0.6pp | -20.2pp | -0.224 | 3 | NO BET |
| 15 | KAA Gent B vs K. Lierse Kempenzonen | Challenger Pro League | 1.19 | 84.0% | 80.1% | 80.3% | 0.2pp | -3.9pp | -0.047 | 2 | CAUTION |
| 16 | RFC Seraing vs RFC Liege | Challenger Pro League | 1.22 | 82.0% | 88.4% | 88.5% | 0.1pp | +6.5pp | +0.079 | 2 | **SELECT** |
| 17 | Helmond Sport vs FC Eindhoven | Eerste Divisie | 1.18 | 84.7% | 88.4% | 89.1% | 0.7pp | +3.6pp | +0.043 | 1 | **SELECT** |
| 18 | CA Huracan vs CA Tigre | Liga Profesional | 1.56 | 64.1% | 53.6% | 51.7% | 1.9pp | -10.5pp | -0.164 | 2 | NO BET |
| 19 | AA Estudiantes vs Gimnasia La Plata | Liga Profesional | 1.41 | 70.9% | 72.1% | 69.6% | 2.6pp | +1.2pp | +0.017 | 2 | CAUTION |
| 20 | Esenler Erokspor vs Ankara Keciorengucu | TFF 1. Lig | 1.18 | 84.7% | 78.2% | 79.1% | 0.9pp | -6.6pp | -0.077 | 1 | CAUTION |
| 21 | FK Agrobiznes Volochysk vs FC Prykarpattia | First League | 1.32 | 75.8% | 68.5% | 67.7% | 0.8pp | -7.3pp | -0.096 | 2 | NO BET |
| 22 | ASO Chlef vs ES Setif | Ligue 1 | 1.57 | 63.7% | 30.4% | 29.4% | 0.9pp | -33.3pp | -0.523 | 4 | NO BET |
| 23 | JS Kabylie vs JS El Biar | Ligue 1 | 1.36 | 73.5% | 93.7% | 93.1% | 0.6pp | +20.1pp | +0.274 | 3 | CAUTION |
| 24 | MC Oran vs Olympique Akbou | Ligue 1 | 1.52 | 65.8% | 29.8% | 28.9% | 1.0pp | -36.0pp | -0.546 | 4 | NO BET |
