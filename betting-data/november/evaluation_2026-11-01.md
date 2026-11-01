# ROY BETTING ENGINE — MATCH EVALUATION REPORT
**Model Version**: 2.1 (Over 1.5 Goals Focused — Dual-Baseline Protocol)
**Evaluation Date**: 2026-11-01
**Total Fixtures Evaluated**: 23 matches analyzed (0 skipped under Section 5.0 Hard-Stop)
**Market**: Over 1.5 Goals
**Methodology Enforcement**: Strict Venue-Specific Home/Away Protocol (Section 5.0), Dual-Baseline Protocol (Section 5.1A), & Hard-Stop Rule

---

## 1. Liverpool vs Arsenal
- **Fixture**: England — Premier League | Date: 2026-11-01
- **Data Quality**: **Verified (Dual-Baseline Venue-Specific & Season-Overall Analysis)**

### Pre-Match Statistical Matchup Comparison

#### Venue Form (Used by Model Engine)
| Metric | Liverpool (Home @ Home) | Arsenal (Away @ Away) |
| :--- | :---: | :---: |
| **League Standing** | 4th | 2nd |
| **Venue Matches Played** | 4 | 4 |
| **Venue Goals Scored (GF)** | 4 (1.00 / game) | 4 (1.00 / game) |
| **Venue Goals Conceded (GA)** | 5 (1.25 / game) | 3 (0.75 / game) |

#### Season Overall (Macro Contextual Record)
| Metric | Liverpool (Overall) | Arsenal (Overall) |
| :--- | :---: | :---: |
| **Overall Matches Played** | 8 | 8 |
| **Overall Goals Scored (GF)** | 11 (1.38 / game) | 13 (1.63 / game) |
| **Overall Goals Conceded (GA)** | 8 (1.00 / game) | 5 (0.63 / game) |

### Goal Profiles & Strength Indices (Dual-Baseline)
- **Primary Live Baselines (Premier League)**: Home scoring avg 1.58, Away scoring avg 1.28
  - Home Attacking Strength: 0.63
  - Away Defensive Weakness: 0.47
  - Away Attacking Strength: 0.78
  - Home Defensive Weakness: 0.98
- **Historical Benchmark Baselines**: Home scoring avg 1.55, Away scoring avg 1.25

### Expected Goals (Lambda) & Poisson Formulation
- **Primary Live Model**:
  - Lambda Home: 0.4747 | Lambda Away: 0.9766 | **Total Expected Goals (Lambda): 1.4513**
  - **Poisson P(Over 1.5)**: **42.6%** (Weak for the Over 1.5-focused strategy)
  - Poisson P(Under 1.5): 57.4%
- **Companion Historical Benchmark**:
  - Historical Total Expected Goals: 1.4839
  - **Historical P(Over 1.5)**: **43.7%**
- **Dual-Baseline Alignment**: `[VERY_HIGH ALIGNMENT]` (1.13 pp delta)

### Market Pricing & Value Analysis
- **Offered Odds**: 1.25
- **Bookmaker Break-Even Probability**: 80.0%
- **Value Edge**: -37.4 percentage points (`[VERY_LOW EDGE]`)
- **Expected Value (EV)**: -0.468 per unit staked

### Warnings & Negative Checks
- **`SMALL_SAMPLE`** [MEDIUM] (CONTRADICTORY / INDIRECT): Limited sample size of only 4 matches.
  - *Evidence*: Sample size below the 5-match threshold for statistical stability (4 vs 4).
- **`STRONG_DEFENSIVE_MATCHUP`** [HIGH] (CONTRADICTORY / DIRECT): Tight defensive record elevating clean-sheet / low-scoring risk.
  - *Evidence*: Liverpool concedes 1.25 GA/game at home and Arsenal concedes 0.75 GA/game away.
- **`TEAM_NEWS_UNVERIFIED`** [LOW] (NEUTRAL / CONTEXTUAL): Pre-match team news and confirmed starting lineups remain unverified.
  - *Evidence*: Lineups have not been locked in; rotation or late injury risk unconfirmed.

### Final Decision Verdict: **NO BET**
> NO BET. Model estimates an 42.6% Over 1.5 probability versus bookmaker break-even of 80.0% at 1.25 odds (-37.4 edge, -0.468 EV). Estimated Over 1.5 probability (42.6%) is well below the 70% threshold for the Over 1.5 strategy.

---

## 2. Getafe vs Sevilla
- **Fixture**: Spain — La Liga | Date: 2026-11-01
- **Data Quality**: **Verified (Dual-Baseline Venue-Specific & Season-Overall Analysis)**

### Pre-Match Statistical Matchup Comparison

#### Venue Form (Used by Model Engine)
| Metric | Getafe (Home @ Home) | Sevilla (Away @ Away) |
| :--- | :---: | :---: |
| **League Standing** | 18th | 6th |
| **Venue Matches Played** | 5 | 5 |
| **Venue Goals Scored (GF)** | 5 (1.00 / game) | 9 (1.80 / game) |
| **Venue Goals Conceded (GA)** | 3 (0.60 / game) | 9 (1.80 / game) |

#### Season Overall (Macro Contextual Record)
| Metric | Getafe (Overall) | Sevilla (Overall) |
| :--- | :---: | :---: |
| **Overall Matches Played** | 10 | 10 |
| **Overall Goals Scored (GF)** | 5 (0.50 / game) | 16 (1.60 / game) |
| **Overall Goals Conceded (GA)** | 15 (1.50 / game) | 16 (1.60 / game) |

### Goal Profiles & Strength Indices (Dual-Baseline)
- **Primary Live Baselines (La Liga)**: Home scoring avg 1.48, Away scoring avg 1.15
  - Home Attacking Strength: 0.68
  - Away Defensive Weakness: 1.22
  - Away Attacking Strength: 1.57
  - Home Defensive Weakness: 0.52
- **Historical Benchmark Baselines**: Home scoring avg 1.45, Away scoring avg 1.10

### Expected Goals (Lambda) & Poisson Formulation
- **Primary Live Model**:
  - Lambda Home: 1.2162 | Lambda Away: 0.9391 | **Total Expected Goals (Lambda): 2.1553**
  - **Poisson P(Over 1.5)**: **63.4%** (Weak for the Over 1.5-focused strategy)
  - Poisson P(Under 1.5): 36.6%
- **Companion Historical Benchmark**:
  - Historical Total Expected Goals: 2.2232
  - **Historical P(Over 1.5)**: **65.1%**
- **Dual-Baseline Alignment**: `[HIGH ALIGNMENT]` (1.67 pp delta)

### Market Pricing & Value Analysis
- **Offered Odds**: 1.52
- **Bookmaker Break-Even Probability**: 65.8%
- **Value Edge**: -2.4 percentage points (`[LOW EDGE]`)
- **Expected Value (EV)**: -0.036 per unit staked

### Warnings & Negative Checks
- **`STRONG_DEFENSIVE_MATCHUP`** [HIGH] (CONTRADICTORY / DIRECT): Tight defensive record elevating clean-sheet / low-scoring risk.
  - *Evidence*: Getafe concedes only 0.60 GA/game at home.
- **`TEAM_NEWS_UNVERIFIED`** [LOW] (NEUTRAL / CONTEXTUAL): Pre-match team news and confirmed starting lineups remain unverified.
  - *Evidence*: Lineups have not been locked in; rotation or late injury risk unconfirmed.

### Final Decision Verdict: **NO BET**
> NO BET. Model estimates an 63.4% Over 1.5 probability versus bookmaker break-even of 65.8% at 1.52 odds (-2.4 edge, -0.036 EV). Estimated Over 1.5 probability (63.4%) is well below the 70% threshold for the Over 1.5 strategy.

---

## 3. Elche CF vs Valencia
- **Fixture**: Spain — La Liga | Date: 2026-11-01
- **Data Quality**: **Verified (Dual-Baseline Venue-Specific & Season-Overall Analysis)**

### Pre-Match Statistical Matchup Comparison

#### Venue Form (Used by Model Engine)
| Metric | Elche CF (Home @ Home) | Valencia (Away @ Away) |
| :--- | :---: | :---: |
| **League Standing** | 15th | 19th |
| **Venue Matches Played** | 4 | 4 |
| **Venue Goals Scored (GF)** | 4 (1.00 / game) | 5 (1.25 / game) |
| **Venue Goals Conceded (GA)** | 11 (2.75 / game) | 8 (2.00 / game) |

#### Season Overall (Macro Contextual Record)
| Metric | Elche CF (Overall) | Valencia (Overall) |
| :--- | :---: | :---: |
| **Overall Matches Played** | 10 | 10 |
| **Overall Goals Scored (GF)** | 14 (1.40 / game) | 7 (0.70 / game) |
| **Overall Goals Conceded (GA)** | 17 (1.70 / game) | 17 (1.70 / game) |

### Goal Profiles & Strength Indices (Dual-Baseline)
- **Primary Live Baselines (La Liga)**: Home scoring avg 1.48, Away scoring avg 1.15
  - Home Attacking Strength: 0.68
  - Away Defensive Weakness: 1.35
  - Away Attacking Strength: 1.09
  - Home Defensive Weakness: 2.39
- **Historical Benchmark Baselines**: Home scoring avg 1.45, Away scoring avg 1.10

### Expected Goals (Lambda) & Poisson Formulation
- **Primary Live Model**:
  - Lambda Home: 1.3514 | Lambda Away: 2.9891 | **Total Expected Goals (Lambda): 4.3405**
  - **Poisson P(Over 1.5)**: **93.0%** (Extremely strong)
  - Poisson P(Under 1.5): 7.0%
- **Companion Historical Benchmark**:
  - Historical Total Expected Goals: 4.5043
  - **Historical P(Over 1.5)**: **93.9%**
- **Dual-Baseline Alignment**: `[VERY_HIGH ALIGNMENT]` (0.86 pp delta)

### Market Pricing & Value Analysis
- **Offered Odds**: 1.27
- **Bookmaker Break-Even Probability**: 78.7%
- **Value Edge**: +14.3 percentage points (`[HIGH EDGE]`)
- **Expected Value (EV)**: +0.181 per unit staked

### Warnings & Negative Checks
- **`SMALL_SAMPLE`** [MEDIUM] (CONTRADICTORY / INDIRECT): Limited sample size of only 4 matches.
  - *Evidence*: Sample size below the 5-match threshold for statistical stability (4 vs 4).
- **`TEAM_NEWS_UNVERIFIED`** [LOW] (NEUTRAL / CONTEXTUAL): Pre-match team news and confirmed starting lineups remain unverified.
  - *Evidence*: Lineups have not been locked in; rotation or late injury risk unconfirmed.

### Final Decision Verdict: **SELECT**
> SELECT. Model estimates an 93.0% Over 1.5 probability versus bookmaker break-even of 78.7% at 1.27 odds (+14.3 edge, +0.181 EV). Strong probability (93.0%) supported by positive edge (+14.3pp, EV +0.181) and acceptable risk profile.

---

## 4. Athletic Bilbao vs Real Sociedad
- **Fixture**: Spain — La Liga | Date: 2026-11-01
- **Data Quality**: **Verified (Dual-Baseline Venue-Specific & Season-Overall Analysis)**

### Pre-Match Statistical Matchup Comparison

#### Venue Form (Used by Model Engine)
| Metric | Athletic Bilbao (Home @ Home) | Real Sociedad (Away @ Away) |
| :--- | :---: | :---: |
| **League Standing** | 8th | 5th |
| **Venue Matches Played** | 5 | 5 |
| **Venue Goals Scored (GF)** | 9 (1.80 / game) | 12 (2.40 / game) |
| **Venue Goals Conceded (GA)** | 4 (0.80 / game) | 11 (2.20 / game) |

#### Season Overall (Macro Contextual Record)
| Metric | Athletic Bilbao (Overall) | Real Sociedad (Overall) |
| :--- | :---: | :---: |
| **Overall Matches Played** | 9 | 10 |
| **Overall Goals Scored (GF)** | 12 (1.33 / game) | 19 (1.90 / game) |
| **Overall Goals Conceded (GA)** | 9 (1.00 / game) | 18 (1.80 / game) |

### Goal Profiles & Strength Indices (Dual-Baseline)
- **Primary Live Baselines (La Liga)**: Home scoring avg 1.48, Away scoring avg 1.15
  - Home Attacking Strength: 1.22
  - Away Defensive Weakness: 1.49
  - Away Attacking Strength: 2.09
  - Home Defensive Weakness: 0.70
- **Historical Benchmark Baselines**: Home scoring avg 1.45, Away scoring avg 1.10

### Expected Goals (Lambda) & Poisson Formulation
- **Primary Live Model**:
  - Lambda Home: 2.6757 | Lambda Away: 1.6696 | **Total Expected Goals (Lambda): 4.3453**
  - **Poisson P(Over 1.5)**: **93.1%** (Extremely strong)
  - Poisson P(Under 1.5): 6.9%
- **Companion Historical Benchmark**:
  - Historical Total Expected Goals: 4.4765
  - **Historical P(Over 1.5)**: **93.8%**
- **Dual-Baseline Alignment**: `[VERY_HIGH ALIGNMENT]` (0.70 pp delta)

### Market Pricing & Value Analysis
- **Offered Odds**: 1.20
- **Bookmaker Break-Even Probability**: 83.3%
- **Value Edge**: +9.8 percentage points (`[HIGH EDGE]`)
- **Expected Value (EV)**: +0.117 per unit staked

### Warnings & Negative Checks
- **`TEAM_NEWS_UNVERIFIED`** [LOW] (NEUTRAL / CONTEXTUAL): Pre-match team news and confirmed starting lineups remain unverified.
  - *Evidence*: Lineups have not been locked in; rotation or late injury risk unconfirmed.

### Final Decision Verdict: **SELECT**
> SELECT. Model estimates an 93.1% Over 1.5 probability versus bookmaker break-even of 83.3% at 1.20 odds (+9.8 edge, +0.117 EV). Strong probability (93.1%) supported by positive edge (+9.8pp, EV +0.117) and acceptable risk profile.

---

## 5. AD Ceuta FC vs Sporting Gijon
- **Fixture**: Spain — Segunda Division | Date: 2026-11-01
- **Data Quality**: **Verified (Dual-Baseline Venue-Specific & Season-Overall Analysis)**

### Pre-Match Statistical Matchup Comparison

#### Venue Form (Used by Model Engine)
| Metric | AD Ceuta FC (Home @ Home) | Sporting Gijon (Away @ Away) |
| :--- | :---: | :---: |
| **League Standing** | 21st | 8th |
| **Venue Matches Played** | 6 | 5 |
| **Venue Goals Scored (GF)** | 6 (1.00 / game) | 5 (1.00 / game) |
| **Venue Goals Conceded (GA)** | 10 (1.67 / game) | 7 (1.40 / game) |

#### Season Overall (Macro Contextual Record)
| Metric | AD Ceuta FC (Overall) | Sporting Gijon (Overall) |
| :--- | :---: | :---: |
| **Overall Matches Played** | 11 | 11 |
| **Overall Goals Scored (GF)** | 10 (0.91 / game) | 11 (1.00 / game) |
| **Overall Goals Conceded (GA)** | 25 (2.27 / game) | 13 (1.18 / game) |

### Goal Profiles & Strength Indices (Dual-Baseline)
- **Primary Live Baselines (Segunda Division)**: Home scoring avg 1.38, Away scoring avg 1.04
  - Home Attacking Strength: 0.72
  - Away Defensive Weakness: 1.01
  - Away Attacking Strength: 0.96
  - Home Defensive Weakness: 1.60
- **Historical Benchmark Baselines**: Home scoring avg 1.35, Away scoring avg 1.00

### Expected Goals (Lambda) & Poisson Formulation
- **Primary Live Model**:
  - Lambda Home: 1.0145 | Lambda Away: 1.6026 | **Total Expected Goals (Lambda): 2.6171**
  - **Poisson P(Over 1.5)**: **73.6%** (Moderate)
  - Poisson P(Under 1.5): 26.4%
- **Companion Historical Benchmark**:
  - Historical Total Expected Goals: 2.7037
  - **Historical P(Over 1.5)**: **75.3%**
- **Dual-Baseline Alignment**: `[HIGH ALIGNMENT]` (1.73 pp delta)

### Market Pricing & Value Analysis
- **Offered Odds**: 1.24
- **Bookmaker Break-Even Probability**: 80.6%
- **Value Edge**: -7.0 percentage points (`[LOW EDGE]`)
- **Expected Value (EV)**: -0.087 per unit staked

### Warnings & Negative Checks
- **`TEAM_NEWS_UNVERIFIED`** [LOW] (NEUTRAL / CONTEXTUAL): Pre-match team news and confirmed starting lineups remain unverified.
  - *Evidence*: Lineups have not been locked in; rotation or late injury risk unconfirmed.

### Final Decision Verdict: **CAUTION**
> CAUTION. Model estimates an 73.6% Over 1.5 probability versus bookmaker break-even of 80.6% at 1.24 odds (-7.0 edge, -0.087 EV). High probability (73.6%), but pricing offers no positive edge (-7.0pp). Disclosed under Principle 9.

---

## 6. Burgos CF vs CD Castellon
- **Fixture**: Spain — Segunda Division | Date: 2026-11-01
- **Data Quality**: **Verified (Dual-Baseline Venue-Specific & Season-Overall Analysis)**

### Pre-Match Statistical Matchup Comparison

#### Venue Form (Used by Model Engine)
| Metric | Burgos CF (Home @ Home) | CD Castellon (Away @ Away) |
| :--- | :---: | :---: |
| **League Standing** | 6th | 1st |
| **Venue Matches Played** | 6 | 6 |
| **Venue Goals Scored (GF)** | 10 (1.67 / game) | 10 (1.67 / game) |
| **Venue Goals Conceded (GA)** | 6 (1.00 / game) | 3 (0.50 / game) |

#### Season Overall (Macro Contextual Record)
| Metric | Burgos CF (Overall) | CD Castellon (Overall) |
| :--- | :---: | :---: |
| **Overall Matches Played** | 11 | 11 |
| **Overall Goals Scored (GF)** | 16 (1.45 / game) | 22 (2.00 / game) |
| **Overall Goals Conceded (GA)** | 12 (1.09 / game) | 4 (0.36 / game) |

### Goal Profiles & Strength Indices (Dual-Baseline)
- **Primary Live Baselines (Segunda Division)**: Home scoring avg 1.38, Away scoring avg 1.04
  - Home Attacking Strength: 1.21
  - Away Defensive Weakness: 0.36
  - Away Attacking Strength: 1.60
  - Home Defensive Weakness: 0.96
- **Historical Benchmark Baselines**: Home scoring avg 1.35, Away scoring avg 1.00

### Expected Goals (Lambda) & Poisson Formulation
- **Primary Live Model**:
  - Lambda Home: 0.6039 | Lambda Away: 1.6026 | **Total Expected Goals (Lambda): 2.2065**
  - **Poisson P(Over 1.5)**: **64.7%** (Weak for the Over 1.5-focused strategy)
  - Poisson P(Under 1.5): 35.3%
- **Companion Historical Benchmark**:
  - Historical Total Expected Goals: 2.2840
  - **Historical P(Over 1.5)**: **66.6%**
- **Dual-Baseline Alignment**: `[HIGH ALIGNMENT]` (1.93 pp delta)

### Market Pricing & Value Analysis
- **Offered Odds**: 1.24
- **Bookmaker Break-Even Probability**: 80.6%
- **Value Edge**: -15.9 percentage points (`[VERY_LOW EDGE]`)
- **Expected Value (EV)**: -0.198 per unit staked

### Warnings & Negative Checks
- **`STRONG_DEFENSIVE_MATCHUP`** [HIGH] (CONTRADICTORY / DIRECT): Tight defensive record elevating clean-sheet / low-scoring risk.
  - *Evidence*: CD Castellon concedes only 0.50 GA/game away from home.
- **`TEAM_NEWS_UNVERIFIED`** [LOW] (NEUTRAL / CONTEXTUAL): Pre-match team news and confirmed starting lineups remain unverified.
  - *Evidence*: Lineups have not been locked in; rotation or late injury risk unconfirmed.

### Final Decision Verdict: **NO BET**
> NO BET. Model estimates an 64.7% Over 1.5 probability versus bookmaker break-even of 80.6% at 1.24 odds (-15.9 edge, -0.198 EV). Estimated Over 1.5 probability (64.7%) is well below the 70% threshold for the Over 1.5 strategy.

---

## 7. CD Tenerife vs FC Andorra
- **Fixture**: Spain — Segunda Division | Date: 2026-11-01
- **Data Quality**: **Verified (Dual-Baseline Venue-Specific & Season-Overall Analysis)**

### Pre-Match Statistical Matchup Comparison

#### Venue Form (Used by Model Engine)
| Metric | CD Tenerife (Home @ Home) | FC Andorra (Away @ Away) |
| :--- | :---: | :---: |
| **League Standing** | 12th | 19th |
| **Venue Matches Played** | 5 | 5 |
| **Venue Goals Scored (GF)** | 5 (1.00 / game) | 5 (1.00 / game) |
| **Venue Goals Conceded (GA)** | 3 (0.60 / game) | 9 (1.80 / game) |

#### Season Overall (Macro Contextual Record)
| Metric | CD Tenerife (Overall) | FC Andorra (Overall) |
| :--- | :---: | :---: |
| **Overall Matches Played** | 11 | 11 |
| **Overall Goals Scored (GF)** | 13 (1.18 / game) | 15 (1.36 / game) |
| **Overall Goals Conceded (GA)** | 15 (1.36 / game) | 20 (1.82 / game) |

### Goal Profiles & Strength Indices (Dual-Baseline)
- **Primary Live Baselines (Segunda Division)**: Home scoring avg 1.38, Away scoring avg 1.04
  - Home Attacking Strength: 0.72
  - Away Defensive Weakness: 1.30
  - Away Attacking Strength: 0.96
  - Home Defensive Weakness: 0.58
- **Historical Benchmark Baselines**: Home scoring avg 1.35, Away scoring avg 1.00

### Expected Goals (Lambda) & Poisson Formulation
- **Primary Live Model**:
  - Lambda Home: 1.3043 | Lambda Away: 0.5769 | **Total Expected Goals (Lambda): 1.8812**
  - **Poisson P(Over 1.5)**: **56.1%** (Weak for the Over 1.5-focused strategy)
  - Poisson P(Under 1.5): 43.9%
- **Companion Historical Benchmark**:
  - Historical Total Expected Goals: 1.9333
  - **Historical P(Over 1.5)**: **57.6%**
- **Dual-Baseline Alignment**: `[VERY_HIGH ALIGNMENT]` (1.50 pp delta)

### Market Pricing & Value Analysis
- **Offered Odds**: 1.32
- **Bookmaker Break-Even Probability**: 75.8%
- **Value Edge**: -19.7 percentage points (`[VERY_LOW EDGE]`)
- **Expected Value (EV)**: -0.260 per unit staked

### Warnings & Negative Checks
- **`STRONG_DEFENSIVE_MATCHUP`** [HIGH] (CONTRADICTORY / DIRECT): Tight defensive record elevating clean-sheet / low-scoring risk.
  - *Evidence*: CD Tenerife concedes only 0.60 GA/game at home.
- **`TEAM_NEWS_UNVERIFIED`** [LOW] (NEUTRAL / CONTEXTUAL): Pre-match team news and confirmed starting lineups remain unverified.
  - *Evidence*: Lineups have not been locked in; rotation or late injury risk unconfirmed.

### Final Decision Verdict: **NO BET**
> NO BET. Model estimates an 56.1% Over 1.5 probability versus bookmaker break-even of 75.8% at 1.32 odds (-19.7 edge, -0.260 EV). Estimated Over 1.5 probability (56.1%) is well below the 70% threshold for the Over 1.5 strategy.

---

## 8. FC Como vs Venezia
- **Fixture**: Italy — Serie A | Date: 2026-11-01
- **Data Quality**: **Verified (Dual-Baseline Venue-Specific & Season-Overall Analysis)**

### Pre-Match Statistical Matchup Comparison

#### Venue Form (Used by Model Engine)
| Metric | FC Como (Home @ Home) | Venezia (Away @ Away) |
| :--- | :---: | :---: |
| **League Standing** | 4th | 20th |
| **Venue Matches Played** | 4 | 4 |
| **Venue Goals Scored (GF)** | 5 (1.25 / game) | 3 (0.75 / game) |
| **Venue Goals Conceded (GA)** | 1 (0.25 / game) | 9 (2.25 / game) |

#### Season Overall (Macro Contextual Record)
| Metric | FC Como (Overall) | Venezia (Overall) |
| :--- | :---: | :---: |
| **Overall Matches Played** | 9 | 9 |
| **Overall Goals Scored (GF)** | 17 (1.89 / game) | 6 (0.67 / game) |
| **Overall Goals Conceded (GA)** | 8 (0.89 / game) | 19 (2.11 / game) |

### Goal Profiles & Strength Indices (Dual-Baseline)
- **Primary Live Baselines (Serie A)**: Home scoring avg 1.48, Away scoring avg 1.18
  - Home Attacking Strength: 0.84
  - Away Defensive Weakness: 1.52
  - Away Attacking Strength: 0.64
  - Home Defensive Weakness: 0.21
- **Historical Benchmark Baselines**: Home scoring avg 1.45, Away scoring avg 1.15

### Expected Goals (Lambda) & Poisson Formulation
- **Primary Live Model**:
  - Lambda Home: 1.8995 | Lambda Away: 0.1589 | **Total Expected Goals (Lambda): 2.0584**
  - **Poisson P(Over 1.5)**: **61.0%** (Weak for the Over 1.5-focused strategy)
  - Poisson P(Under 1.5): 39.0%
- **Companion Historical Benchmark**:
  - Historical Total Expected Goals: 2.1027
  - **Historical P(Over 1.5)**: **62.1%**
- **Dual-Baseline Alignment**: `[VERY_HIGH ALIGNMENT]` (1.17 pp delta)

### Market Pricing & Value Analysis
- **Offered Odds**: 1.12
- **Bookmaker Break-Even Probability**: 89.3%
- **Value Edge**: -28.3 percentage points (`[VERY_LOW EDGE]`)
- **Expected Value (EV)**: -0.317 per unit staked

### Warnings & Negative Checks
- **`SMALL_SAMPLE`** [MEDIUM] (CONTRADICTORY / INDIRECT): Limited sample size of only 4 matches.
  - *Evidence*: Sample size below the 5-match threshold for statistical stability (4 vs 4).
- **`LOW_AWAY_SCORING`** [MEDIUM] (CONTRADICTORY / DIRECT): Venezia averages only 0.75 goals per game away, increasing shutout risk.
  - *Evidence*: Venezia away scoring average is 0.75 GF/game, placing heavy reliance on FC Como to produce goals.
- **`STRONG_DEFENSIVE_MATCHUP`** [HIGH] (CONTRADICTORY / DIRECT): Tight defensive record elevating clean-sheet / low-scoring risk.
  - *Evidence*: FC Como concedes only 0.25 GA/game at home.
- **`HIGH_LINE_RELIANCE`** [MEDIUM] (CONTRADICTORY / INDIRECT): Over 75% of expected goals depend exclusively on FC Como.
  - *Evidence*: Home expected goals (1.90) account for 92% of total expected output (2.06).
- **`TEAM_NEWS_UNVERIFIED`** [LOW] (NEUTRAL / CONTEXTUAL): Pre-match team news and confirmed starting lineups remain unverified.
  - *Evidence*: Lineups have not been locked in; rotation or late injury risk unconfirmed.

### Final Decision Verdict: **NO BET**
> NO BET. Model estimates an 61.0% Over 1.5 probability versus bookmaker break-even of 89.3% at 1.12 odds (-28.3 edge, -0.317 EV). Estimated Over 1.5 probability (61.0%) is well below the 70% threshold for the Over 1.5 strategy.

---

## 9. Frosinone Calcio vs Torino
- **Fixture**: Italy — Serie A | Date: 2026-11-01
- **Data Quality**: **Verified (Dual-Baseline Venue-Specific & Season-Overall Analysis)**

### Pre-Match Statistical Matchup Comparison

#### Venue Form (Used by Model Engine)
| Metric | Frosinone Calcio (Home @ Home) | Torino (Away @ Away) |
| :--- | :---: | :---: |
| **League Standing** | 6th | 9th |
| **Venue Matches Played** | 5 | 4 |
| **Venue Goals Scored (GF)** | 14 (2.80 / game) | 5 (1.25 / game) |
| **Venue Goals Conceded (GA)** | 6 (1.20 / game) | 4 (1.00 / game) |

#### Season Overall (Macro Contextual Record)
| Metric | Frosinone Calcio (Overall) | Torino (Overall) |
| :--- | :---: | :---: |
| **Overall Matches Played** | 9 | 9 |
| **Overall Goals Scored (GF)** | 22 (2.44 / game) | 14 (1.56 / game) |
| **Overall Goals Conceded (GA)** | 14 (1.56 / game) | 14 (1.56 / game) |

### Goal Profiles & Strength Indices (Dual-Baseline)
- **Primary Live Baselines (Serie A)**: Home scoring avg 1.48, Away scoring avg 1.18
  - Home Attacking Strength: 1.89
  - Away Defensive Weakness: 0.68
  - Away Attacking Strength: 1.06
  - Home Defensive Weakness: 1.02
- **Historical Benchmark Baselines**: Home scoring avg 1.45, Away scoring avg 1.15

### Expected Goals (Lambda) & Poisson Formulation
- **Primary Live Model**:
  - Lambda Home: 1.8919 | Lambda Away: 1.2712 | **Total Expected Goals (Lambda): 3.1631**
  - **Poisson P(Over 1.5)**: **82.4%** (Strong)
  - Poisson P(Under 1.5): 17.6%
- **Companion Historical Benchmark**:
  - Historical Total Expected Goals: 3.2353
  - **Historical P(Over 1.5)**: **83.3%**
- **Dual-Baseline Alignment**: `[VERY_HIGH ALIGNMENT]` (0.87 pp delta)

### Market Pricing & Value Analysis
- **Offered Odds**: 1.10
- **Bookmaker Break-Even Probability**: 90.9%
- **Value Edge**: -8.5 percentage points (`[LOW EDGE]`)
- **Expected Value (EV)**: -0.094 per unit staked

### Warnings & Negative Checks
- **`SMALL_SAMPLE`** [MEDIUM] (CONTRADICTORY / INDIRECT): Limited sample size of only 4 matches.
  - *Evidence*: Sample size below the 5-match threshold for statistical stability (5 vs 4).
- **`TEAM_NEWS_UNVERIFIED`** [LOW] (NEUTRAL / CONTEXTUAL): Pre-match team news and confirmed starting lineups remain unverified.
  - *Evidence*: Lineups have not been locked in; rotation or late injury risk unconfirmed.

### Final Decision Verdict: **CAUTION**
> CAUTION. Model estimates an 82.4% Over 1.5 probability versus bookmaker break-even of 90.9% at 1.10 odds (-8.5 edge, -0.094 EV). High probability (82.4%), but pricing offers no positive edge (-8.5pp). Disclosed under Principle 9.

---

## 10. Lazio vs Cagliari
- **Fixture**: Italy — Serie A | Date: 2026-11-01
- **Data Quality**: **Verified (Dual-Baseline Venue-Specific & Season-Overall Analysis)**

### Pre-Match Statistical Matchup Comparison

#### Venue Form (Used by Model Engine)
| Metric | Lazio (Home @ Home) | Cagliari (Away @ Away) |
| :--- | :---: | :---: |
| **League Standing** | 2nd | 10th |
| **Venue Matches Played** | 4 | 4 |
| **Venue Goals Scored (GF)** | 8 (2.00 / game) | 4 (1.00 / game) |
| **Venue Goals Conceded (GA)** | 4 (1.00 / game) | 5 (1.25 / game) |

#### Season Overall (Macro Contextual Record)
| Metric | Lazio (Overall) | Cagliari (Overall) |
| :--- | :---: | :---: |
| **Overall Matches Played** | 9 | 9 |
| **Overall Goals Scored (GF)** | 22 (2.44 / game) | 8 (0.89 / game) |
| **Overall Goals Conceded (GA)** | 7 (0.78 / game) | 13 (1.44 / game) |

### Goal Profiles & Strength Indices (Dual-Baseline)
- **Primary Live Baselines (Serie A)**: Home scoring avg 1.48, Away scoring avg 1.18
  - Home Attacking Strength: 1.35
  - Away Defensive Weakness: 0.84
  - Away Attacking Strength: 0.85
  - Home Defensive Weakness: 0.85
- **Historical Benchmark Baselines**: Home scoring avg 1.45, Away scoring avg 1.15

### Expected Goals (Lambda) & Poisson Formulation
- **Primary Live Model**:
  - Lambda Home: 1.6892 | Lambda Away: 0.8475 | **Total Expected Goals (Lambda): 2.5367**
  - **Poisson P(Over 1.5)**: **72.0%** (Moderate)
  - Poisson P(Under 1.5): 28.0%
- **Companion Historical Benchmark**:
  - Historical Total Expected Goals: 2.5937
  - **Historical P(Over 1.5)**: **73.1%**
- **Dual-Baseline Alignment**: `[VERY_HIGH ALIGNMENT]` (1.07 pp delta)

### Market Pricing & Value Analysis
- **Offered Odds**: 1.23
- **Bookmaker Break-Even Probability**: 81.3%
- **Value Edge**: -9.3 percentage points (`[LOW EDGE]`)
- **Expected Value (EV)**: -0.114 per unit staked

### Warnings & Negative Checks
- **`SMALL_SAMPLE`** [MEDIUM] (CONTRADICTORY / INDIRECT): Limited sample size of only 4 matches.
  - *Evidence*: Sample size below the 5-match threshold for statistical stability (4 vs 4).
- **`TEAM_NEWS_UNVERIFIED`** [LOW] (NEUTRAL / CONTEXTUAL): Pre-match team news and confirmed starting lineups remain unverified.
  - *Evidence*: Lineups have not been locked in; rotation or late injury risk unconfirmed.

### Final Decision Verdict: **NO BET**
> NO BET. Model estimates an 72.0% Over 1.5 probability versus bookmaker break-even of 81.3% at 1.23 odds (-9.3 edge, -0.114 EV). Significant negative expected value (-0.114) and pricing mismatch (-9.3pp edge) violate Principle 8.

---

## 11. Lecce vs Genoa
- **Fixture**: Italy — Serie A | Date: 2026-11-01
- **Data Quality**: **Verified (Dual-Baseline Venue-Specific & Season-Overall Analysis)**

### Pre-Match Statistical Matchup Comparison

#### Venue Form (Used by Model Engine)
| Metric | Lecce (Home @ Home) | Genoa (Away @ Away) |
| :--- | :---: | :---: |
| **League Standing** | 14th | 13th |
| **Venue Matches Played** | 5 | 4 |
| **Venue Goals Scored (GF)** | 6 (1.20 / game) | 2 (0.50 / game) |
| **Venue Goals Conceded (GA)** | 9 (1.80 / game) | 7 (1.75 / game) |

#### Season Overall (Macro Contextual Record)
| Metric | Lecce (Overall) | Genoa (Overall) |
| :--- | :---: | :---: |
| **Overall Matches Played** | 9 | 9 |
| **Overall Goals Scored (GF)** | 10 (1.11 / game) | 8 (0.89 / game) |
| **Overall Goals Conceded (GA)** | 19 (2.11 / game) | 13 (1.44 / game) |

### Goal Profiles & Strength Indices (Dual-Baseline)
- **Primary Live Baselines (Serie A)**: Home scoring avg 1.48, Away scoring avg 1.18
  - Home Attacking Strength: 0.81
  - Away Defensive Weakness: 1.18
  - Away Attacking Strength: 0.42
  - Home Defensive Weakness: 1.53
- **Historical Benchmark Baselines**: Home scoring avg 1.45, Away scoring avg 1.15

### Expected Goals (Lambda) & Poisson Formulation
- **Primary Live Model**:
  - Lambda Home: 1.4189 | Lambda Away: 0.7627 | **Total Expected Goals (Lambda): 2.1816**
  - **Poisson P(Over 1.5)**: **64.1%** (Weak for the Over 1.5-focused strategy)
  - Poisson P(Under 1.5): 35.9%
- **Companion Historical Benchmark**:
  - Historical Total Expected Goals: 2.2309
  - **Historical P(Over 1.5)**: **65.3%**
- **Dual-Baseline Alignment**: `[VERY_HIGH ALIGNMENT]` (1.23 pp delta)

### Market Pricing & Value Analysis
- **Offered Odds**: 1.42
- **Bookmaker Break-Even Probability**: 70.4%
- **Value Edge**: -6.3 percentage points (`[LOW EDGE]`)
- **Expected Value (EV)**: -0.090 per unit staked

### Warnings & Negative Checks
- **`SMALL_SAMPLE`** [MEDIUM] (CONTRADICTORY / INDIRECT): Limited sample size of only 4 matches.
  - *Evidence*: Sample size below the 5-match threshold for statistical stability (5 vs 4).
- **`LOW_AWAY_SCORING`** [MEDIUM] (CONTRADICTORY / DIRECT): Genoa averages only 0.50 goals per game away, increasing shutout risk.
  - *Evidence*: Genoa away scoring average is 0.50 GF/game, placing heavy reliance on Lecce to produce goals.
- **`TEAM_NEWS_UNVERIFIED`** [LOW] (NEUTRAL / CONTEXTUAL): Pre-match team news and confirmed starting lineups remain unverified.
  - *Evidence*: Lineups have not been locked in; rotation or late injury risk unconfirmed.

### Final Decision Verdict: **NO BET**
> NO BET. Model estimates an 64.1% Over 1.5 probability versus bookmaker break-even of 70.4% at 1.42 odds (-6.3 edge, -0.090 EV). Estimated Over 1.5 probability (64.1%) is well below the 70% threshold for the Over 1.5 strategy.

---

## 12. Juventus vs SSC Napoli
- **Fixture**: Italy — Serie A | Date: 2026-11-01
- **Data Quality**: **Verified (Dual-Baseline Venue-Specific & Season-Overall Analysis)**

### Pre-Match Statistical Matchup Comparison

#### Venue Form (Used by Model Engine)
| Metric | Juventus (Home @ Home) | SSC Napoli (Away @ Away) |
| :--- | :---: | :---: |
| **League Standing** | 8th | 7th |
| **Venue Matches Played** | 4 | 5 |
| **Venue Goals Scored (GF)** | 5 (1.25 / game) | 9 (1.80 / game) |
| **Venue Goals Conceded (GA)** | 4 (1.00 / game) | 6 (1.20 / game) |

#### Season Overall (Macro Contextual Record)
| Metric | Juventus (Overall) | SSC Napoli (Overall) |
| :--- | :---: | :---: |
| **Overall Matches Played** | 9 | 9 |
| **Overall Goals Scored (GF)** | 11 (1.22 / game) | 17 (1.89 / game) |
| **Overall Goals Conceded (GA)** | 10 (1.11 / game) | 11 (1.22 / game) |

### Goal Profiles & Strength Indices (Dual-Baseline)
- **Primary Live Baselines (Serie A)**: Home scoring avg 1.48, Away scoring avg 1.18
  - Home Attacking Strength: 0.84
  - Away Defensive Weakness: 0.81
  - Away Attacking Strength: 1.53
  - Home Defensive Weakness: 0.85
- **Historical Benchmark Baselines**: Home scoring avg 1.45, Away scoring avg 1.15

### Expected Goals (Lambda) & Poisson Formulation
- **Primary Live Model**:
  - Lambda Home: 1.0135 | Lambda Away: 1.5254 | **Total Expected Goals (Lambda): 2.5389**
  - **Poisson P(Over 1.5)**: **72.1%** (Moderate)
  - Poisson P(Under 1.5): 27.9%
- **Companion Historical Benchmark**:
  - Historical Total Expected Goals: 2.5997
  - **Historical P(Over 1.5)**: **73.2%**
- **Dual-Baseline Alignment**: `[VERY_HIGH ALIGNMENT]` (1.17 pp delta)

### Market Pricing & Value Analysis
- **Offered Odds**: 2.18
- **Bookmaker Break-Even Probability**: 45.9%
- **Value Edge**: +26.2 percentage points (`[VERY_HIGH EDGE]`)
- **Expected Value (EV)**: +0.571 per unit staked

### Warnings & Negative Checks
- **`SMALL_SAMPLE`** [MEDIUM] (CONTRADICTORY / INDIRECT): Limited sample size of only 4 matches.
  - *Evidence*: Sample size below the 5-match threshold for statistical stability (4 vs 5).
- **`TEAM_NEWS_UNVERIFIED`** [LOW] (NEUTRAL / CONTEXTUAL): Pre-match team news and confirmed starting lineups remain unverified.
  - *Evidence*: Lineups have not been locked in; rotation or late injury risk unconfirmed.

### Final Decision Verdict: **CAUTION**
> CAUTION. Model estimates an 72.1% Over 1.5 probability versus bookmaker break-even of 45.9% at 2.18 odds (+26.2 edge, +0.571 EV). Viable probability (72.1%) with massive positive pricing edge (+26.2pp, EV +0.571), though Over 1.5 probability falls below the 80% primary threshold. Excellent alternative accumulator candidate.

---

## 13. SS Arezzo vs Ascoli FC
- **Fixture**: Italy — Serie B | Date: 2026-11-01
- **Data Quality**: **Verified (Dual-Baseline Venue-Specific & Season-Overall Analysis)**

### Pre-Match Statistical Matchup Comparison

#### Venue Form (Used by Model Engine)
| Metric | SS Arezzo (Home @ Home) | Ascoli FC (Away @ Away) |
| :--- | :---: | :---: |
| **League Standing** | 14th | 3rd |
| **Venue Matches Played** | 4 | 4 |
| **Venue Goals Scored (GF)** | 3 (0.75 / game) | 8 (2.00 / game) |
| **Venue Goals Conceded (GA)** | 10 (2.50 / game) | 3 (0.75 / game) |

#### Season Overall (Macro Contextual Record)
| Metric | SS Arezzo (Overall) | Ascoli FC (Overall) |
| :--- | :---: | :---: |
| **Overall Matches Played** | 9 | 9 |
| **Overall Goals Scored (GF)** | 9 (1.00 / game) | 16 (1.78 / game) |
| **Overall Goals Conceded (GA)** | 19 (2.11 / game) | 6 (0.67 / game) |

### Goal Profiles & Strength Indices (Dual-Baseline)
- **Primary Live Baselines (Serie B)**: Home scoring avg 1.36, Away scoring avg 1.06
  - Home Attacking Strength: 0.55
  - Away Defensive Weakness: 0.55
  - Away Attacking Strength: 1.89
  - Home Defensive Weakness: 2.36
- **Historical Benchmark Baselines**: Home scoring avg 1.35, Away scoring avg 1.05

### Expected Goals (Lambda) & Poisson Formulation
- **Primary Live Model**:
  - Lambda Home: 0.4136 | Lambda Away: 4.7170 | **Total Expected Goals (Lambda): 5.1306**
  - **Poisson P(Over 1.5)**: **96.4%** (Extremely strong)
  - Poisson P(Under 1.5): 3.6%
- **Companion Historical Benchmark**:
  - Historical Total Expected Goals: 5.1786
  - **Historical P(Over 1.5)**: **96.6%**
- **Dual-Baseline Alignment**: `[VERY_HIGH ALIGNMENT]` (0.24 pp delta)

### Market Pricing & Value Analysis
- **Offered Odds**: 1.27
- **Bookmaker Break-Even Probability**: 78.7%
- **Value Edge**: +17.7 percentage points (`[VERY_HIGH EDGE]`)
- **Expected Value (EV)**: +0.224 per unit staked

### Warnings & Negative Checks
- **`SMALL_SAMPLE`** [MEDIUM] (CONTRADICTORY / INDIRECT): Limited sample size of only 4 matches.
  - *Evidence*: Sample size below the 5-match threshold for statistical stability (4 vs 4).
- **`LOW_HOME_SCORING`** [MEDIUM] (CONTRADICTORY / DIRECT): SS Arezzo home scoring rate is low (0.75 GF/game).
  - *Evidence*: SS Arezzo averages under 1.0 goal scored per home match across observed fixtures.
- **`HIGH_LINE_RELIANCE`** [MEDIUM] (CONTRADICTORY / INDIRECT): Over 75% of expected goals depend exclusively on Ascoli FC.
  - *Evidence*: Away expected goals (4.72) account for 92% of total expected output (5.13).
- **`TEAM_NEWS_UNVERIFIED`** [LOW] (NEUTRAL / CONTEXTUAL): Pre-match team news and confirmed starting lineups remain unverified.
  - *Evidence*: Lineups have not been locked in; rotation or late injury risk unconfirmed.

### Final Decision Verdict: **CAUTION**
> CAUTION. Model estimates an 96.4% Over 1.5 probability versus bookmaker break-even of 78.7% at 1.27 odds (+17.7 edge, +0.224 EV). Exceptional probability (96.4%) and high edge (+17.7pp), but multiple medium warnings (SMALL_SAMPLE, LOW_HOME_SCORING, HIGH_LINE_RELIANCE) warrant measured caution. Top candidate for alternative selection.

---

## 14. US Avellino vs AC Pisa
- **Fixture**: Italy — Serie B | Date: 2026-11-01
- **Data Quality**: **Verified (Dual-Baseline Venue-Specific & Season-Overall Analysis)**

### Pre-Match Statistical Matchup Comparison

#### Venue Form (Used by Model Engine)
| Metric | US Avellino (Home @ Home) | AC Pisa (Away @ Away) |
| :--- | :---: | :---: |
| **League Standing** | 10th | 5th |
| **Venue Matches Played** | 5 | 4 |
| **Venue Goals Scored (GF)** | 9 (1.80 / game) | 9 (2.25 / game) |
| **Venue Goals Conceded (GA)** | 5 (1.00 / game) | 3 (0.75 / game) |

#### Season Overall (Macro Contextual Record)
| Metric | US Avellino (Overall) | AC Pisa (Overall) |
| :--- | :---: | :---: |
| **Overall Matches Played** | 9 | 9 |
| **Overall Goals Scored (GF)** | 13 (1.44 / game) | 18 (2.00 / game) |
| **Overall Goals Conceded (GA)** | 10 (1.11 / game) | 13 (1.44 / game) |

### Goal Profiles & Strength Indices (Dual-Baseline)
- **Primary Live Baselines (Serie B)**: Home scoring avg 1.36, Away scoring avg 1.06
  - Home Attacking Strength: 1.32
  - Away Defensive Weakness: 0.55
  - Away Attacking Strength: 2.12
  - Home Defensive Weakness: 0.94
- **Historical Benchmark Baselines**: Home scoring avg 1.35, Away scoring avg 1.05

### Expected Goals (Lambda) & Poisson Formulation
- **Primary Live Model**:
  - Lambda Home: 0.9926 | Lambda Away: 2.1226 | **Total Expected Goals (Lambda): 3.1152**
  - **Poisson P(Over 1.5)**: **81.7%** (Strong)
  - Poisson P(Under 1.5): 18.3%
- **Companion Historical Benchmark**:
  - Historical Total Expected Goals: 3.1429
  - **Historical P(Over 1.5)**: **82.2%**
- **Dual-Baseline Alignment**: `[VERY_HIGH ALIGNMENT]` (0.47 pp delta)

### Market Pricing & Value Analysis
- **Offered Odds**: 1.30
- **Bookmaker Break-Even Probability**: 76.9%
- **Value Edge**: +4.8 percentage points (`[MEDIUM EDGE]`)
- **Expected Value (EV)**: +0.063 per unit staked

### Warnings & Negative Checks
- **`SMALL_SAMPLE`** [MEDIUM] (CONTRADICTORY / INDIRECT): Limited sample size of only 4 matches.
  - *Evidence*: Sample size below the 5-match threshold for statistical stability (5 vs 4).
- **`STRONG_DEFENSIVE_MATCHUP`** [HIGH] (CONTRADICTORY / DIRECT): Tight defensive record elevating clean-sheet / low-scoring risk.
  - *Evidence*: AC Pisa concedes only 0.75 GA/game away from home.
- **`TEAM_NEWS_UNVERIFIED`** [LOW] (NEUTRAL / CONTEXTUAL): Pre-match team news and confirmed starting lineups remain unverified.
  - *Evidence*: Lineups have not been locked in; rotation or late injury risk unconfirmed.

### Final Decision Verdict: **CAUTION**
> CAUTION. Model estimates an 81.7% Over 1.5 probability versus bookmaker break-even of 76.9% at 1.30 odds (+4.8 edge, +0.063 EV). Model probability is viable, but high contradictory warning (STRONG_DEFENSIVE_MATCHUP) requires caution.

---

## 15. Empoli FC vs SS Juve Stabia
- **Fixture**: Italy — Serie B | Date: 2026-11-01
- **Data Quality**: **Verified (Dual-Baseline Venue-Specific & Season-Overall Analysis)**

### Pre-Match Statistical Matchup Comparison

#### Venue Form (Used by Model Engine)
| Metric | Empoli FC (Home @ Home) | SS Juve Stabia (Away @ Away) |
| :--- | :---: | :---: |
| **League Standing** | 19th | 17th |
| **Venue Matches Played** | 4 | 4 |
| **Venue Goals Scored (GF)** | 3 (0.75 / game) | 4 (1.00 / game) |
| **Venue Goals Conceded (GA)** | 7 (1.75 / game) | 4 (1.00 / game) |

#### Season Overall (Macro Contextual Record)
| Metric | Empoli FC (Overall) | SS Juve Stabia (Overall) |
| :--- | :---: | :---: |
| **Overall Matches Played** | 9 | 9 |
| **Overall Goals Scored (GF)** | 8 (0.89 / game) | 9 (1.00 / game) |
| **Overall Goals Conceded (GA)** | 15 (1.67 / game) | 9 (1.00 / game) |

### Goal Profiles & Strength Indices (Dual-Baseline)
- **Primary Live Baselines (Serie B)**: Home scoring avg 1.36, Away scoring avg 1.06
  - Home Attacking Strength: 0.55
  - Away Defensive Weakness: 0.74
  - Away Attacking Strength: 0.94
  - Home Defensive Weakness: 1.65
- **Historical Benchmark Baselines**: Home scoring avg 1.35, Away scoring avg 1.05

### Expected Goals (Lambda) & Poisson Formulation
- **Primary Live Model**:
  - Lambda Home: 0.5515 | Lambda Away: 1.6509 | **Total Expected Goals (Lambda): 2.2024**
  - **Poisson P(Over 1.5)**: **64.6%** (Weak for the Over 1.5-focused strategy)
  - Poisson P(Under 1.5): 35.4%
- **Companion Historical Benchmark**:
  - Historical Total Expected Goals: 2.2222
  - **Historical P(Over 1.5)**: **65.1%**
- **Dual-Baseline Alignment**: `[VERY_HIGH ALIGNMENT]` (0.50 pp delta)

### Market Pricing & Value Analysis
- **Offered Odds**: 1.27
- **Bookmaker Break-Even Probability**: 78.7%
- **Value Edge**: -14.1 percentage points (`[VERY_LOW EDGE]`)
- **Expected Value (EV)**: -0.180 per unit staked

### Warnings & Negative Checks
- **`SMALL_SAMPLE`** [MEDIUM] (CONTRADICTORY / INDIRECT): Limited sample size of only 4 matches.
  - *Evidence*: Sample size below the 5-match threshold for statistical stability (4 vs 4).
- **`LOW_HOME_SCORING`** [MEDIUM] (CONTRADICTORY / DIRECT): Empoli FC home scoring rate is low (0.75 GF/game).
  - *Evidence*: Empoli FC averages under 1.0 goal scored per home match across observed fixtures.
- **`HIGH_LINE_RELIANCE`** [MEDIUM] (CONTRADICTORY / INDIRECT): Over 75% of expected goals depend exclusively on SS Juve Stabia.
  - *Evidence*: Away expected goals (1.65) account for 75% of total expected output (2.20).
- **`TEAM_NEWS_UNVERIFIED`** [LOW] (NEUTRAL / CONTEXTUAL): Pre-match team news and confirmed starting lineups remain unverified.
  - *Evidence*: Lineups have not been locked in; rotation or late injury risk unconfirmed.

### Final Decision Verdict: **NO BET**
> NO BET. Model estimates an 64.6% Over 1.5 probability versus bookmaker break-even of 78.7% at 1.27 odds (-14.1 edge, -0.180 EV). Estimated Over 1.5 probability (64.6%) is well below the 70% threshold for the Over 1.5 strategy.

---

## 16. Hellas Verona vs Carrarese
- **Fixture**: Italy — Serie B | Date: 2026-11-01
- **Data Quality**: **Verified (Dual-Baseline Venue-Specific & Season-Overall Analysis)**

### Pre-Match Statistical Matchup Comparison

#### Venue Form (Used by Model Engine)
| Metric | Hellas Verona (Home @ Home) | Carrarese (Away @ Away) |
| :--- | :---: | :---: |
| **League Standing** | 9th | 13th |
| **Venue Matches Played** | 5 | 4 |
| **Venue Goals Scored (GF)** | 11 (2.20 / game) | 3 (0.75 / game) |
| **Venue Goals Conceded (GA)** | 6 (1.20 / game) | 5 (1.25 / game) |

#### Season Overall (Macro Contextual Record)
| Metric | Hellas Verona (Overall) | Carrarese (Overall) |
| :--- | :---: | :---: |
| **Overall Matches Played** | 9 | 9 |
| **Overall Goals Scored (GF)** | 16 (1.78 / game) | 9 (1.00 / game) |
| **Overall Goals Conceded (GA)** | 13 (1.44 / game) | 10 (1.11 / game) |

### Goal Profiles & Strength Indices (Dual-Baseline)
- **Primary Live Baselines (Serie B)**: Home scoring avg 1.36, Away scoring avg 1.06
  - Home Attacking Strength: 1.62
  - Away Defensive Weakness: 0.92
  - Away Attacking Strength: 0.71
  - Home Defensive Weakness: 1.13
- **Historical Benchmark Baselines**: Home scoring avg 1.35, Away scoring avg 1.05

### Expected Goals (Lambda) & Poisson Formulation
- **Primary Live Model**:
  - Lambda Home: 2.0221 | Lambda Away: 0.8491 | **Total Expected Goals (Lambda): 2.8711**
  - **Poisson P(Over 1.5)**: **78.1%** (Good)
  - Poisson P(Under 1.5): 21.9%
- **Companion Historical Benchmark**:
  - Historical Total Expected Goals: 2.8942
  - **Historical P(Over 1.5)**: **78.5%**
- **Dual-Baseline Alignment**: `[VERY_HIGH ALIGNMENT]` (0.40 pp delta)

### Market Pricing & Value Analysis
- **Offered Odds**: 1.20
- **Bookmaker Break-Even Probability**: 83.3%
- **Value Edge**: -5.2 percentage points (`[LOW EDGE]`)
- **Expected Value (EV)**: -0.063 per unit staked

### Warnings & Negative Checks
- **`SMALL_SAMPLE`** [MEDIUM] (CONTRADICTORY / INDIRECT): Limited sample size of only 4 matches.
  - *Evidence*: Sample size below the 5-match threshold for statistical stability (5 vs 4).
- **`LOW_AWAY_SCORING`** [MEDIUM] (CONTRADICTORY / DIRECT): Carrarese averages only 0.75 goals per game away, increasing shutout risk.
  - *Evidence*: Carrarese away scoring average is 0.75 GF/game, placing heavy reliance on Hellas Verona to produce goals.
- **`TEAM_NEWS_UNVERIFIED`** [LOW] (NEUTRAL / CONTEXTUAL): Pre-match team news and confirmed starting lineups remain unverified.
  - *Evidence*: Lineups have not been locked in; rotation or late injury risk unconfirmed.

### Final Decision Verdict: **CAUTION**
> CAUTION. Model estimates an 78.1% Over 1.5 probability versus bookmaker break-even of 83.3% at 1.20 odds (-5.2 edge, -0.063 EV). High probability (78.1%), but pricing offers no positive edge (-5.2pp). Disclosed under Principle 9.

---

## 17. Palermo vs LR Vicenza
- **Fixture**: Italy — Serie B | Date: 2026-11-01
- **Data Quality**: **Verified (Dual-Baseline Venue-Specific & Season-Overall Analysis)**

### Pre-Match Statistical Matchup Comparison

#### Venue Form (Used by Model Engine)
| Metric | Palermo (Home @ Home) | LR Vicenza (Away @ Away) |
| :--- | :---: | :---: |
| **League Standing** | 1st | 16th |
| **Venue Matches Played** | 4 | 4 |
| **Venue Goals Scored (GF)** | 10 (2.50 / game) | 4 (1.00 / game) |
| **Venue Goals Conceded (GA)** | 3 (0.75 / game) | 9 (2.25 / game) |

#### Season Overall (Macro Contextual Record)
| Metric | Palermo (Overall) | LR Vicenza (Overall) |
| :--- | :---: | :---: |
| **Overall Matches Played** | 9 | 9 |
| **Overall Goals Scored (GF)** | 21 (2.33 / game) | 12 (1.33 / game) |
| **Overall Goals Conceded (GA)** | 11 (1.22 / game) | 17 (1.89 / game) |

### Goal Profiles & Strength Indices (Dual-Baseline)
- **Primary Live Baselines (Serie B)**: Home scoring avg 1.36, Away scoring avg 1.06
  - Home Attacking Strength: 1.84
  - Away Defensive Weakness: 1.65
  - Away Attacking Strength: 0.94
  - Home Defensive Weakness: 0.71
- **Historical Benchmark Baselines**: Home scoring avg 1.35, Away scoring avg 1.05

### Expected Goals (Lambda) & Poisson Formulation
- **Primary Live Model**:
  - Lambda Home: 4.1360 | Lambda Away: 0.7075 | **Total Expected Goals (Lambda): 4.8436**
  - **Poisson P(Over 1.5)**: **95.4%** (Extremely strong)
  - Poisson P(Under 1.5): 4.6%
- **Companion Historical Benchmark**:
  - Historical Total Expected Goals: 4.8810
  - **Historical P(Over 1.5)**: **95.6%**
- **Dual-Baseline Alignment**: `[VERY_HIGH ALIGNMENT]` (0.21 pp delta)

### Market Pricing & Value Analysis
- **Offered Odds**: 1.15
- **Bookmaker Break-Even Probability**: 87.0%
- **Value Edge**: +8.4 percentage points (`[HIGH EDGE]`)
- **Expected Value (EV)**: +0.097 per unit staked

### Warnings & Negative Checks
- **`SMALL_SAMPLE`** [MEDIUM] (CONTRADICTORY / INDIRECT): Limited sample size of only 4 matches.
  - *Evidence*: Sample size below the 5-match threshold for statistical stability (4 vs 4).
- **`HIGH_LINE_RELIANCE`** [MEDIUM] (CONTRADICTORY / INDIRECT): Over 75% of expected goals depend exclusively on Palermo.
  - *Evidence*: Home expected goals (4.14) account for 85% of total expected output (4.84).
- **`TEAM_NEWS_UNVERIFIED`** [LOW] (NEUTRAL / CONTEXTUAL): Pre-match team news and confirmed starting lineups remain unverified.
  - *Evidence*: Lineups have not been locked in; rotation or late injury risk unconfirmed.

### Final Decision Verdict: **SELECT**
> SELECT. Model estimates an 95.4% Over 1.5 probability versus bookmaker break-even of 87.0% at 1.15 odds (+8.4 edge, +0.097 EV). Strong probability (95.4%) supported by positive edge (+8.4pp, EV +0.097) and acceptable risk profile.

---

## 18. RC Strasbourg Alsace vs AJ Auxerre
- **Fixture**: France — Ligue 1 | Date: 2026-11-01
- **Data Quality**: **Verified (Dual-Baseline Venue-Specific & Season-Overall Analysis)**

### Pre-Match Statistical Matchup Comparison

#### Venue Form (Used by Model Engine)
| Metric | RC Strasbourg Alsace (Home @ Home) | AJ Auxerre (Away @ Away) |
| :--- | :---: | :---: |
| **League Standing** | 16th | 12th |
| **Venue Matches Played** | 4 | 4 |
| **Venue Goals Scored (GF)** | 4 (1.00 / game) | 3 (0.75 / game) |
| **Venue Goals Conceded (GA)** | 8 (2.00 / game) | 10 (2.50 / game) |

#### Season Overall (Macro Contextual Record)
| Metric | RC Strasbourg Alsace (Overall) | AJ Auxerre (Overall) |
| :--- | :---: | :---: |
| **Overall Matches Played** | 8 | 8 |
| **Overall Goals Scored (GF)** | 12 (1.50 / game) | 12 (1.50 / game) |
| **Overall Goals Conceded (GA)** | 18 (2.25 / game) | 18 (2.25 / game) |

### Goal Profiles & Strength Indices (Dual-Baseline)
- **Primary Live Baselines (Ligue 1)**: Home scoring avg 1.52, Away scoring avg 1.22
  - Home Attacking Strength: 0.66
  - Away Defensive Weakness: 1.64
  - Away Attacking Strength: 0.61
  - Home Defensive Weakness: 1.64
- **Historical Benchmark Baselines**: Home scoring avg 1.50, Away scoring avg 1.20

### Expected Goals (Lambda) & Poisson Formulation
- **Primary Live Model**:
  - Lambda Home: 1.6447 | Lambda Away: 1.2295 | **Total Expected Goals (Lambda): 2.8742**
  - **Poisson P(Over 1.5)**: **78.1%** (Good)
  - Poisson P(Under 1.5): 21.9%
- **Companion Historical Benchmark**:
  - Historical Total Expected Goals: 2.9167
  - **Historical P(Over 1.5)**: **78.8%**
- **Dual-Baseline Alignment**: `[VERY_HIGH ALIGNMENT]` (0.64 pp delta)

### Market Pricing & Value Analysis
- **Offered Odds**: 1.16
- **Bookmaker Break-Even Probability**: 86.2%
- **Value Edge**: -8.1 percentage points (`[LOW EDGE]`)
- **Expected Value (EV)**: -0.094 per unit staked

### Warnings & Negative Checks
- **`SMALL_SAMPLE`** [MEDIUM] (CONTRADICTORY / INDIRECT): Limited sample size of only 4 matches.
  - *Evidence*: Sample size below the 5-match threshold for statistical stability (4 vs 4).
- **`LOW_AWAY_SCORING`** [MEDIUM] (CONTRADICTORY / DIRECT): AJ Auxerre averages only 0.75 goals per game away, increasing shutout risk.
  - *Evidence*: AJ Auxerre away scoring average is 0.75 GF/game, placing heavy reliance on RC Strasbourg Alsace to produce goals.
- **`TEAM_NEWS_UNVERIFIED`** [LOW] (NEUTRAL / CONTEXTUAL): Pre-match team news and confirmed starting lineups remain unverified.
  - *Evidence*: Lineups have not been locked in; rotation or late injury risk unconfirmed.

### Final Decision Verdict: **CAUTION**
> CAUTION. Model estimates an 78.1% Over 1.5 probability versus bookmaker break-even of 86.2% at 1.16 odds (-8.1 edge, -0.094 EV). High probability (78.1%), but pricing offers no positive edge (-8.1pp). Disclosed under Principle 9.

---

## 19. Paris FC vs AS Monaco
- **Fixture**: France — Ligue 1 | Date: 2026-11-01
- **Data Quality**: **Verified (Dual-Baseline Venue-Specific & Season-Overall Analysis)**

### Pre-Match Statistical Matchup Comparison

#### Venue Form (Used by Model Engine)
| Metric | Paris FC (Home @ Home) | AS Monaco (Away @ Away) |
| :--- | :---: | :---: |
| **League Standing** | 6th | 4th |
| **Venue Matches Played** | 4 | 4 |
| **Venue Goals Scored (GF)** | 7 (1.75 / game) | 5 (1.25 / game) |
| **Venue Goals Conceded (GA)** | 4 (1.00 / game) | 4 (1.00 / game) |

#### Season Overall (Macro Contextual Record)
| Metric | Paris FC (Overall) | AS Monaco (Overall) |
| :--- | :---: | :---: |
| **Overall Matches Played** | 8 | 8 |
| **Overall Goals Scored (GF)** | 13 (1.63 / game) | 11 (1.38 / game) |
| **Overall Goals Conceded (GA)** | 9 (1.13 / game) | 7 (0.88 / game) |

### Goal Profiles & Strength Indices (Dual-Baseline)
- **Primary Live Baselines (Ligue 1)**: Home scoring avg 1.52, Away scoring avg 1.22
  - Home Attacking Strength: 1.15
  - Away Defensive Weakness: 0.66
  - Away Attacking Strength: 1.02
  - Home Defensive Weakness: 0.82
- **Historical Benchmark Baselines**: Home scoring avg 1.50, Away scoring avg 1.20

### Expected Goals (Lambda) & Poisson Formulation
- **Primary Live Model**:
  - Lambda Home: 1.1513 | Lambda Away: 1.0246 | **Total Expected Goals (Lambda): 2.1759**
  - **Poisson P(Over 1.5)**: **64.0%** (Weak for the Over 1.5-focused strategy)
  - Poisson P(Under 1.5): 36.0%
- **Companion Historical Benchmark**:
  - Historical Total Expected Goals: 2.2083
  - **Historical P(Over 1.5)**: **64.8%**
- **Dual-Baseline Alignment**: `[VERY_HIGH ALIGNMENT]` (0.87 pp delta)

### Market Pricing & Value Analysis
- **Offered Odds**: 1.23
- **Bookmaker Break-Even Probability**: 81.3%
- **Value Edge**: -17.3 percentage points (`[VERY_LOW EDGE]`)
- **Expected Value (EV)**: -0.213 per unit staked

### Warnings & Negative Checks
- **`SMALL_SAMPLE`** [MEDIUM] (CONTRADICTORY / INDIRECT): Limited sample size of only 4 matches.
  - *Evidence*: Sample size below the 5-match threshold for statistical stability (4 vs 4).
- **`TEAM_NEWS_UNVERIFIED`** [LOW] (NEUTRAL / CONTEXTUAL): Pre-match team news and confirmed starting lineups remain unverified.
  - *Evidence*: Lineups have not been locked in; rotation or late injury risk unconfirmed.

### Final Decision Verdict: **NO BET**
> NO BET. Model estimates an 64.0% Over 1.5 probability versus bookmaker break-even of 81.3% at 1.23 odds (-17.3 edge, -0.213 EV). Estimated Over 1.5 probability (64.0%) is well below the 70% threshold for the Over 1.5 strategy.

---

## 20. Olympique Lyonnais vs Angers SCO
- **Fixture**: France — Ligue 1 | Date: 2026-11-01
- **Data Quality**: **Verified (Dual-Baseline Venue-Specific & Season-Overall Analysis)**

### Pre-Match Statistical Matchup Comparison

#### Venue Form (Used by Model Engine)
| Metric | Olympique Lyonnais (Home @ Home) | Angers SCO (Away @ Away) |
| :--- | :---: | :---: |
| **League Standing** | 5th | 14th |
| **Venue Matches Played** | 4 | 4 |
| **Venue Goals Scored (GF)** | 8 (2.00 / game) | 3 (0.75 / game) |
| **Venue Goals Conceded (GA)** | 3 (0.75 / game) | 8 (2.00 / game) |

#### Season Overall (Macro Contextual Record)
| Metric | Olympique Lyonnais (Overall) | Angers SCO (Overall) |
| :--- | :---: | :---: |
| **Overall Matches Played** | 8 | 8 |
| **Overall Goals Scored (GF)** | 13 (1.63 / game) | 9 (1.13 / game) |
| **Overall Goals Conceded (GA)** | 7 (0.88 / game) | 15 (1.88 / game) |

### Goal Profiles & Strength Indices (Dual-Baseline)
- **Primary Live Baselines (Ligue 1)**: Home scoring avg 1.52, Away scoring avg 1.22
  - Home Attacking Strength: 1.32
  - Away Defensive Weakness: 1.32
  - Away Attacking Strength: 0.61
  - Home Defensive Weakness: 0.61
- **Historical Benchmark Baselines**: Home scoring avg 1.50, Away scoring avg 1.20

### Expected Goals (Lambda) & Poisson Formulation
- **Primary Live Model**:
  - Lambda Home: 2.6316 | Lambda Away: 0.4611 | **Total Expected Goals (Lambda): 3.0926**
  - **Poisson P(Over 1.5)**: **81.4%** (Strong)
  - Poisson P(Under 1.5): 18.6%
- **Companion Historical Benchmark**:
  - Historical Total Expected Goals: 3.1354
  - **Historical P(Over 1.5)**: **82.1%**
- **Dual-Baseline Alignment**: `[VERY_HIGH ALIGNMENT]` (0.63 pp delta)

### Market Pricing & Value Analysis
- **Offered Odds**: 1.15
- **Bookmaker Break-Even Probability**: 87.0%
- **Value Edge**: -5.6 percentage points (`[LOW EDGE]`)
- **Expected Value (EV)**: -0.064 per unit staked

### Warnings & Negative Checks
- **`SMALL_SAMPLE`** [MEDIUM] (CONTRADICTORY / INDIRECT): Limited sample size of only 4 matches.
  - *Evidence*: Sample size below the 5-match threshold for statistical stability (4 vs 4).
- **`LOW_AWAY_SCORING`** [MEDIUM] (CONTRADICTORY / DIRECT): Angers SCO averages only 0.75 goals per game away, increasing shutout risk.
  - *Evidence*: Angers SCO away scoring average is 0.75 GF/game, placing heavy reliance on Olympique Lyonnais to produce goals.
- **`STRONG_DEFENSIVE_MATCHUP`** [HIGH] (CONTRADICTORY / DIRECT): Tight defensive record elevating clean-sheet / low-scoring risk.
  - *Evidence*: Olympique Lyonnais concedes only 0.75 GA/game at home.
- **`HIGH_LINE_RELIANCE`** [MEDIUM] (CONTRADICTORY / INDIRECT): Over 75% of expected goals depend exclusively on Olympique Lyonnais.
  - *Evidence*: Home expected goals (2.63) account for 85% of total expected output (3.09).
- **`TEAM_NEWS_UNVERIFIED`** [LOW] (NEUTRAL / CONTEXTUAL): Pre-match team news and confirmed starting lineups remain unverified.
  - *Evidence*: Lineups have not been locked in; rotation or late injury risk unconfirmed.

### Final Decision Verdict: **CAUTION**
> CAUTION. Model estimates an 81.4% Over 1.5 probability versus bookmaker break-even of 87.0% at 1.15 odds (-5.6 edge, -0.064 EV). Model probability is viable, but high contradictory warning (STRONG_DEFENSIVE_MATCHUP) requires caution.

---

## 21. Olympique de Marseille vs Toulouse
- **Fixture**: France — Ligue 1 | Date: 2026-11-01
- **Data Quality**: **Verified (Dual-Baseline Venue-Specific & Season-Overall Analysis)**

### Pre-Match Statistical Matchup Comparison

#### Venue Form (Used by Model Engine)
| Metric | Olympique de Marseille (Home @ Home) | Toulouse (Away @ Away) |
| :--- | :---: | :---: |
| **League Standing** | 9th | 11th |
| **Venue Matches Played** | 4 | 4 |
| **Venue Goals Scored (GF)** | 10 (2.50 / game) | 5 (1.25 / game) |
| **Venue Goals Conceded (GA)** | 5 (1.25 / game) | 5 (1.25 / game) |

#### Season Overall (Macro Contextual Record)
| Metric | Olympique de Marseille (Overall) | Toulouse (Overall) |
| :--- | :---: | :---: |
| **Overall Matches Played** | 8 | 8 |
| **Overall Goals Scored (GF)** | 18 (2.25 / game) | 12 (1.50 / game) |
| **Overall Goals Conceded (GA)** | 13 (1.63 / game) | 11 (1.38 / game) |

### Goal Profiles & Strength Indices (Dual-Baseline)
- **Primary Live Baselines (Ligue 1)**: Home scoring avg 1.52, Away scoring avg 1.22
  - Home Attacking Strength: 1.64
  - Away Defensive Weakness: 0.82
  - Away Attacking Strength: 1.02
  - Home Defensive Weakness: 1.02
- **Historical Benchmark Baselines**: Home scoring avg 1.50, Away scoring avg 1.20

### Expected Goals (Lambda) & Poisson Formulation
- **Primary Live Model**:
  - Lambda Home: 2.0559 | Lambda Away: 1.2807 | **Total Expected Goals (Lambda): 3.3367**
  - **Poisson P(Over 1.5)**: **84.6%** (Strong)
  - Poisson P(Under 1.5): 15.4%
- **Companion Historical Benchmark**:
  - Historical Total Expected Goals: 3.3854
  - **Historical P(Over 1.5)**: **85.1%**
- **Dual-Baseline Alignment**: `[VERY_HIGH ALIGNMENT]` (0.56 pp delta)

### Market Pricing & Value Analysis
- **Offered Odds**: 1.15
- **Bookmaker Break-Even Probability**: 87.0%
- **Value Edge**: -2.4 percentage points (`[LOW EDGE]`)
- **Expected Value (EV)**: -0.027 per unit staked

### Warnings & Negative Checks
- **`SMALL_SAMPLE`** [MEDIUM] (CONTRADICTORY / INDIRECT): Limited sample size of only 4 matches.
  - *Evidence*: Sample size below the 5-match threshold for statistical stability (4 vs 4).
- **`TEAM_NEWS_UNVERIFIED`** [LOW] (NEUTRAL / CONTEXTUAL): Pre-match team news and confirmed starting lineups remain unverified.
  - *Evidence*: Lineups have not been locked in; rotation or late injury risk unconfirmed.

### Final Decision Verdict: **CAUTION**
> CAUTION. Model estimates an 84.6% Over 1.5 probability versus bookmaker break-even of 87.0% at 1.15 odds (-2.4 edge, -0.027 EV). High probability (84.6%), but pricing offers no positive edge (-2.4pp). Disclosed under Principle 9.

---

## 22. 1. FC Union Berlin vs 1. FC Koln
- **Fixture**: Germany — Bundesliga | Date: 2026-11-01
- **Data Quality**: **Verified (Dual-Baseline Venue-Specific & Season-Overall Analysis)**

### Pre-Match Statistical Matchup Comparison

#### Venue Form (Used by Model Engine)
| Metric | 1. FC Union Berlin (Home @ Home) | 1. FC Koln (Away @ Away) |
| :--- | :---: | :---: |
| **League Standing** | 17th | 14th |
| **Venue Matches Played** | 4 | 3 |
| **Venue Goals Scored (GF)** | 5 (1.25 / game) | 2 (0.67 / game) |
| **Venue Goals Conceded (GA)** | 6 (1.50 / game) | 7 (2.33 / game) |

#### Season Overall (Macro Contextual Record)
| Metric | 1. FC Union Berlin (Overall) | 1. FC Koln (Overall) |
| :--- | :---: | :---: |
| **Overall Matches Played** | 7 | 7 |
| **Overall Goals Scored (GF)** | 6 (0.86 / game) | 8 (1.14 / game) |
| **Overall Goals Conceded (GA)** | 18 (2.57 / game) | 11 (1.57 / game) |

### Goal Profiles & Strength Indices (Dual-Baseline)
- **Primary Live Baselines (Bundesliga)**: Home scoring avg 1.62, Away scoring avg 1.38
  - Home Attacking Strength: 0.77
  - Away Defensive Weakness: 1.44
  - Away Attacking Strength: 0.48
  - Home Defensive Weakness: 1.09
- **Historical Benchmark Baselines**: Home scoring avg 1.60, Away scoring avg 1.35

### Expected Goals (Lambda) & Poisson Formulation
- **Primary Live Model**:
  - Lambda Home: 1.7999 | Lambda Away: 0.7246 | **Total Expected Goals (Lambda): 2.5245**
  - **Poisson P(Over 1.5)**: **71.8%** (Moderate)
  - Poisson P(Under 1.5): 28.2%
- **Companion Historical Benchmark**:
  - Historical Total Expected Goals: 2.5637
  - **Historical P(Over 1.5)**: **72.6%**
- **Dual-Baseline Alignment**: `[VERY_HIGH ALIGNMENT]` (0.83 pp delta)

### Market Pricing & Value Analysis
- **Offered Odds**: 1.21
- **Bookmaker Break-Even Probability**: 82.6%
- **Value Edge**: -10.8 percentage points (`[VERY_LOW EDGE]`)
- **Expected Value (EV)**: -0.132 per unit staked

### Warnings & Negative Checks
- **`SMALL_SAMPLE`** [MEDIUM] (CONTRADICTORY / INDIRECT): Limited sample size of only 3 matches.
  - *Evidence*: Sample size below the 5-match threshold for statistical stability (4 vs 3).
- **`LOW_AWAY_SCORING`** [MEDIUM] (CONTRADICTORY / DIRECT): 1. FC Koln averages only 0.67 goals per game away, increasing shutout risk.
  - *Evidence*: 1. FC Koln away scoring average is 0.67 GF/game, placing heavy reliance on 1. FC Union Berlin to produce goals.
- **`TEAM_NEWS_UNVERIFIED`** [LOW] (NEUTRAL / CONTEXTUAL): Pre-match team news and confirmed starting lineups remain unverified.
  - *Evidence*: Lineups have not been locked in; rotation or late injury risk unconfirmed.

### Final Decision Verdict: **NO BET**
> NO BET. Model estimates an 71.8% Over 1.5 probability versus bookmaker break-even of 82.6% at 1.21 odds (-10.8 edge, -0.132 EV). Significant negative expected value (-0.132) and pricing mismatch (-10.8pp edge) violate Principle 8.

---

## 23. Eintracht Frankfurt vs Hamburger SV
- **Fixture**: Germany — Bundesliga | Date: 2026-11-01
- **Data Quality**: **Verified (Dual-Baseline Venue-Specific & Season-Overall Analysis)**

### Pre-Match Statistical Matchup Comparison

#### Venue Form (Used by Model Engine)
| Metric | Eintracht Frankfurt (Home @ Home) | Hamburger SV (Away @ Away) |
| :--- | :---: | :---: |
| **League Standing** | 15th | 13th |
| **Venue Matches Played** | 3 | 4 |
| **Venue Goals Scored (GF)** | 4 (1.33 / game) | 3 (0.75 / game) |
| **Venue Goals Conceded (GA)** | 6 (2.00 / game) | 10 (2.50 / game) |

#### Season Overall (Macro Contextual Record)
| Metric | Eintracht Frankfurt (Overall) | Hamburger SV (Overall) |
| :--- | :---: | :---: |
| **Overall Matches Played** | 7 | 7 |
| **Overall Goals Scored (GF)** | 10 (1.43 / game) | 6 (0.86 / game) |
| **Overall Goals Conceded (GA)** | 17 (2.43 / game) | 16 (2.29 / game) |

### Goal Profiles & Strength Indices (Dual-Baseline)
- **Primary Live Baselines (Bundesliga)**: Home scoring avg 1.62, Away scoring avg 1.38
  - Home Attacking Strength: 0.82
  - Away Defensive Weakness: 1.54
  - Away Attacking Strength: 0.54
  - Home Defensive Weakness: 1.45
- **Historical Benchmark Baselines**: Home scoring avg 1.60, Away scoring avg 1.35

### Expected Goals (Lambda) & Poisson Formulation
- **Primary Live Model**:
  - Lambda Home: 2.0576 | Lambda Away: 1.0870 | **Total Expected Goals (Lambda): 3.1446**
  - **Poisson P(Over 1.5)**: **82.1%** (Strong)
  - Poisson P(Under 1.5): 17.9%
- **Companion Historical Benchmark**:
  - Historical Total Expected Goals: 3.1944
  - **Historical P(Over 1.5)**: **82.8%**
- **Dual-Baseline Alignment**: `[VERY_HIGH ALIGNMENT]` (0.63 pp delta)

### Market Pricing & Value Analysis
- **Offered Odds**: 1.11
- **Bookmaker Break-Even Probability**: 90.1%
- **Value Edge**: -8.0 percentage points (`[LOW EDGE]`)
- **Expected Value (EV)**: -0.088 per unit staked

### Warnings & Negative Checks
- **`SMALL_SAMPLE`** [MEDIUM] (CONTRADICTORY / INDIRECT): Limited sample size of only 3 matches.
  - *Evidence*: Sample size below the 5-match threshold for statistical stability (3 vs 4).
- **`LOW_AWAY_SCORING`** [MEDIUM] (CONTRADICTORY / DIRECT): Hamburger SV averages only 0.75 goals per game away, increasing shutout risk.
  - *Evidence*: Hamburger SV away scoring average is 0.75 GF/game, placing heavy reliance on Eintracht Frankfurt to produce goals.
- **`TEAM_NEWS_UNVERIFIED`** [LOW] (NEUTRAL / CONTEXTUAL): Pre-match team news and confirmed starting lineups remain unverified.
  - *Evidence*: Lineups have not been locked in; rotation or late injury risk unconfirmed.

### Final Decision Verdict: **CAUTION**
> CAUTION. Model estimates an 82.1% Over 1.5 probability versus bookmaker break-even of 90.1% at 1.11 odds (-8.0 edge, -0.088 EV). High probability (82.1%), but pricing offers no positive edge (-8.0pp). Disclosed under Principle 9.

---

## SKIPPED FIXTURES — SECTION 5.0 HARD-STOP PROTOCOL
All 23 match options provided for 2026-11-01 had verified venue-split statistics available and satisfied Section 5.0 criteria. Zero fixtures required skipping.

---

## EXECUTIVE SUMMARY TABLE (2026-11-01)
| ID | Fixture | League | Odds | Break-Even | Live Prob | Hist Prob | Align Delta | Edge (pp) | EV | Warnings | Verdict |
| :---: | :--- | :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| 1 | Liverpool vs Arsenal | Premier League | 1.25 | 80.0% | 42.6% | 43.7% | 1.1pp | -37.4pp | -0.468 | 3 | NO BET |
| 2 | Getafe vs Sevilla | La Liga | 1.52 | 65.8% | 63.4% | 65.1% | 1.7pp | -2.4pp | -0.036 | 2 | NO BET |
| 3 | Elche CF vs Valencia | La Liga | 1.27 | 78.7% | 93.0% | 93.9% | 0.9pp | +14.3pp | +0.181 | 2 | **SELECT** |
| 4 | Athletic Bilbao vs Real Sociedad | La Liga | 1.20 | 83.3% | 93.1% | 93.8% | 0.7pp | +9.8pp | +0.117 | 1 | **SELECT** |
| 5 | AD Ceuta FC vs Sporting Gijon | Segunda Division | 1.24 | 80.6% | 73.6% | 75.3% | 1.7pp | -7.0pp | -0.087 | 1 | CAUTION |
| 6 | Burgos CF vs CD Castellon | Segunda Division | 1.24 | 80.6% | 64.7% | 66.6% | 1.9pp | -15.9pp | -0.198 | 2 | NO BET |
| 7 | CD Tenerife vs FC Andorra | Segunda Division | 1.32 | 75.8% | 56.1% | 57.6% | 1.5pp | -19.7pp | -0.260 | 2 | NO BET |
| 8 | FC Como vs Venezia | Serie A | 1.12 | 89.3% | 61.0% | 62.1% | 1.1pp | -28.3pp | -0.317 | 5 | NO BET |
| 9 | Frosinone Calcio vs Torino | Serie A | 1.10 | 90.9% | 82.4% | 83.3% | 0.9pp | -8.5pp | -0.094 | 2 | CAUTION |
| 10 | Lazio vs Cagliari | Serie A | 1.23 | 81.3% | 72.0% | 73.1% | 1.1pp | -9.3pp | -0.114 | 2 | NO BET |
| 11 | Lecce vs Genoa | Serie A | 1.42 | 70.4% | 64.1% | 65.3% | 1.2pp | -6.3pp | -0.090 | 3 | NO BET |
| 12 | Juventus vs SSC Napoli | Serie A | 2.18 | 45.9% | 72.1% | 73.2% | 1.1pp | +26.2pp | +0.571 | 2 | CAUTION |
| 13 | SS Arezzo vs Ascoli FC | Serie B | 1.27 | 78.7% | 96.4% | 96.6% | 0.2pp | +17.7pp | +0.224 | 4 | CAUTION |
| 14 | US Avellino vs AC Pisa | Serie B | 1.30 | 76.9% | 81.7% | 82.2% | 0.5pp | +4.8pp | +0.063 | 3 | CAUTION |
| 15 | Empoli FC vs SS Juve Stabia | Serie B | 1.27 | 78.7% | 64.6% | 65.1% | 0.5pp | -14.1pp | -0.180 | 4 | NO BET |
| 16 | Hellas Verona vs Carrarese | Serie B | 1.20 | 83.3% | 78.1% | 78.5% | 0.4pp | -5.2pp | -0.063 | 3 | CAUTION |
| 17 | Palermo vs LR Vicenza | Serie B | 1.15 | 87.0% | 95.4% | 95.6% | 0.2pp | +8.4pp | +0.097 | 3 | **SELECT** |
| 18 | RC Strasbourg Alsace vs AJ Auxerre | Ligue 1 | 1.16 | 86.2% | 78.1% | 78.8% | 0.7pp | -8.1pp | -0.094 | 3 | CAUTION |
| 19 | Paris FC vs AS Monaco | Ligue 1 | 1.23 | 81.3% | 64.0% | 64.8% | 0.8pp | -17.3pp | -0.213 | 2 | NO BET |
| 20 | Olympique Lyonnais vs Angers SCO | Ligue 1 | 1.15 | 87.0% | 81.4% | 82.1% | 0.7pp | -5.6pp | -0.064 | 5 | CAUTION |
| 21 | Olympique de Marseille vs Toulouse | Ligue 1 | 1.15 | 87.0% | 84.6% | 85.1% | 0.5pp | -2.4pp | -0.027 | 2 | CAUTION |
| 22 | 1. FC Union Berlin vs 1. FC Koln | Bundesliga | 1.21 | 82.6% | 71.8% | 72.6% | 0.8pp | -10.8pp | -0.132 | 3 | NO BET |
| 23 | Eintracht Frankfurt vs Hamburger SV | Bundesliga | 1.11 | 90.1% | 82.1% | 82.8% | 0.7pp | -8.0pp | -0.088 | 3 | CAUTION |

