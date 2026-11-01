# ROY BETTING ENGINE — MATCH EVALUATION REPORT
**Model Version**: 2.1 (Over 1.5 Goals Focused — Dual-Baseline Protocol)
**Evaluation Date**: 2026-10-31
**Total Fixtures Evaluated**: 22 matches analyzed (0 skipped under Section 5.0 Hard-Stop)
**Market**: Over 1.5 Goals
**Methodology Enforcement**: Strict Venue-Specific Home/Away Protocol (Section 5.0), Dual-Baseline Protocol (Section 5.1A), & Hard-Stop Rule

---

## 1. Chelsea vs Manchester United
- **Fixture**: England — Premier League | Date: 2026-10-31
- **Data Quality**: **Verified (Dual-Baseline Venue-Specific & Season-Overall Analysis)**

### Pre-Match Statistical Matchup Comparison

#### Venue Form (Used by Model Engine)
| Metric | Chelsea (Home @ Home) | Manchester United (Away @ Away) |
| :--- | :---: | :---: |
| **League Standing** | 5th | 16th |
| **Venue Matches Played** | 4 | 4 |
| **Venue Goals Scored (GF)** | 8 (2.00 / game) | 4 (1.00 / game) |
| **Venue Goals Conceded (GA)** | 5 (1.25 / game) | 7 (1.75 / game) |

#### Season Overall (Macro Contextual Record)
| Metric | Chelsea (Overall) | Manchester United (Overall) |
| :--- | :---: | :---: |
| **Overall Matches Played** | 8 | 8 |
| **Overall Goals Scored (GF)** | 14 (1.75 / game) | 9 (1.13 / game) |
| **Overall Goals Conceded (GA)** | 12 (1.50 / game) | 12 (1.50 / game) |

### Goal Profiles & Strength Indices (Dual-Baseline)
- **Primary Live Baselines (Premier League)**: Home scoring avg 1.58, Away scoring avg 1.28
  - Home Attacking Strength: 1.27
  - Away Defensive Weakness: 1.11
  - Away Attacking Strength: 0.78
  - Home Defensive Weakness: 0.98
- **Historical Benchmark Baselines**: Home scoring avg 1.55, Away scoring avg 1.25

### Expected Goals (Lambda) & Poisson Formulation
- **Primary Live Model**:
  - Lambda Home: 2.2152 | Lambda Away: 0.9766 | **Total Expected Goals (Lambda): 3.1918**
  - **Poisson P(Over 1.5)**: **82.8%** (Strong)
  - Poisson P(Under 1.5): 17.2%
- **Companion Historical Benchmark**:
  - Historical Total Expected Goals: 3.2581
  - **Historical P(Over 1.5)**: **83.6%**
- **Dual-Baseline Alignment**: `[VERY_HIGH ALIGNMENT]` (0.87 pp delta)

### Market Pricing & Value Analysis
- **Offered Odds**: 1.20
- **Bookmaker Break-Even Probability**: 83.3%
- **Value Edge**: -0.5 percentage points (`[LOW EDGE]`)
- **Expected Value (EV)**: -0.006 per unit staked

### Warnings & Negative Checks
- **`SMALL_SAMPLE`** [MEDIUM] (CONTRADICTORY / INDIRECT): Limited sample size of only 4 matches.
  - *Evidence*: Sample size below the 5-match threshold for statistical stability (4 vs 4).
- **`TEAM_NEWS_UNVERIFIED`** [LOW] (NEUTRAL / CONTEXTUAL): Pre-match team news and confirmed starting lineups remain unverified.
  - *Evidence*: Lineups have not been locked in; rotation or late injury risk unconfirmed.

### Final Decision Verdict: **CAUTION**
> CAUTION. Model estimates an 82.8% Over 1.5 probability versus bookmaker break-even of 83.3% at 1.20 odds (-0.5 edge, -0.006 EV). High probability (82.8%), but pricing offers no positive edge (-0.5pp). Disclosed under Principle 9.

---

## 2. Bournemouth vs Leeds United
- **Fixture**: England — Premier League | Date: 2026-10-31
- **Data Quality**: **Verified (Dual-Baseline Venue-Specific & Season-Overall Analysis)**

### Pre-Match Statistical Matchup Comparison

#### Venue Form (Used by Model Engine)
| Metric | Bournemouth (Home @ Home) | Leeds United (Away @ Away) |
| :--- | :---: | :---: |
| **League Standing** | 13th | 7th |
| **Venue Matches Played** | 4 | 4 |
| **Venue Goals Scored (GF)** | 6 (1.50 / game) | 5 (1.25 / game) |
| **Venue Goals Conceded (GA)** | 5 (1.25 / game) | 4 (1.00 / game) |

#### Season Overall (Macro Contextual Record)
| Metric | Bournemouth (Overall) | Leeds United (Overall) |
| :--- | :---: | :---: |
| **Overall Matches Played** | 8 | 8 |
| **Overall Goals Scored (GF)** | 10 (1.25 / game) | 11 (1.38 / game) |
| **Overall Goals Conceded (GA)** | 11 (1.38 / game) | 8 (1.00 / game) |

### Goal Profiles & Strength Indices (Dual-Baseline)
- **Primary Live Baselines (Premier League)**: Home scoring avg 1.58, Away scoring avg 1.28
  - Home Attacking Strength: 0.95
  - Away Defensive Weakness: 0.63
  - Away Attacking Strength: 0.98
  - Home Defensive Weakness: 0.98
- **Historical Benchmark Baselines**: Home scoring avg 1.55, Away scoring avg 1.25

### Expected Goals (Lambda) & Poisson Formulation
- **Primary Live Model**:
  - Lambda Home: 0.9494 | Lambda Away: 1.2207 | **Total Expected Goals (Lambda): 2.1701**
  - **Poisson P(Over 1.5)**: **63.8%** (Weak for the Over 1.5-focused strategy)
  - Poisson P(Under 1.5): 36.2%
- **Companion Historical Benchmark**:
  - Historical Total Expected Goals: 2.2177
  - **Historical P(Over 1.5)**: **65.1%**
- **Dual-Baseline Alignment**: `[VERY_HIGH ALIGNMENT]` (1.26 pp delta)

### Market Pricing & Value Analysis
- **Offered Odds**: 1.28
- **Bookmaker Break-Even Probability**: 78.1%
- **Value Edge**: -14.3 percentage points (`[VERY_LOW EDGE]`)
- **Expected Value (EV)**: -0.183 per unit staked

### Warnings & Negative Checks
- **`SMALL_SAMPLE`** [MEDIUM] (CONTRADICTORY / INDIRECT): Limited sample size of only 4 matches.
  - *Evidence*: Sample size below the 5-match threshold for statistical stability (4 vs 4).
- **`TEAM_NEWS_UNVERIFIED`** [LOW] (NEUTRAL / CONTEXTUAL): Pre-match team news and confirmed starting lineups remain unverified.
  - *Evidence*: Lineups have not been locked in; rotation or late injury risk unconfirmed.

### Final Decision Verdict: **NO BET**
> NO BET. Model estimates an 63.8% Over 1.5 probability versus bookmaker break-even of 78.1% at 1.28 odds (-14.3 edge, -0.183 EV). Estimated Over 1.5 probability (63.8%) is well below the 70% threshold for the Over 1.5 strategy.

---

## 3. Brentford vs Nottingham Forest
- **Fixture**: England — Premier League | Date: 2026-10-31
- **Data Quality**: **Verified (Dual-Baseline Venue-Specific & Season-Overall Analysis)**

### Pre-Match Statistical Matchup Comparison

#### Venue Form (Used by Model Engine)
| Metric | Brentford (Home @ Home) | Nottingham Forest (Away @ Away) |
| :--- | :---: | :---: |
| **League Standing** | 6th | 18th |
| **Venue Matches Played** | 4 | 4 |
| **Venue Goals Scored (GF)** | 8 (2.00 / game) | 2 (0.50 / game) |
| **Venue Goals Conceded (GA)** | 4 (1.00 / game) | 6 (1.50 / game) |

#### Season Overall (Macro Contextual Record)
| Metric | Brentford (Overall) | Nottingham Forest (Overall) |
| :--- | :---: | :---: |
| **Overall Matches Played** | 8 | 8 |
| **Overall Goals Scored (GF)** | 14 (1.75 / game) | 6 (0.75 / game) |
| **Overall Goals Conceded (GA)** | 9 (1.13 / game) | 10 (1.25 / game) |

### Goal Profiles & Strength Indices (Dual-Baseline)
- **Primary Live Baselines (Premier League)**: Home scoring avg 1.58, Away scoring avg 1.28
  - Home Attacking Strength: 1.27
  - Away Defensive Weakness: 0.95
  - Away Attacking Strength: 0.39
  - Home Defensive Weakness: 0.78
- **Historical Benchmark Baselines**: Home scoring avg 1.55, Away scoring avg 1.25

### Expected Goals (Lambda) & Poisson Formulation
- **Primary Live Model**:
  - Lambda Home: 1.8987 | Lambda Away: 0.3906 | **Total Expected Goals (Lambda): 2.2893**
  - **Poisson P(Over 1.5)**: **66.7%** (Weak for the Over 1.5-focused strategy)
  - Poisson P(Under 1.5): 33.3%
- **Companion Historical Benchmark**:
  - Historical Total Expected Goals: 2.3355
  - **Historical P(Over 1.5)**: **67.9%**
- **Dual-Baseline Alignment**: `[VERY_HIGH ALIGNMENT]` (1.23 pp delta)

### Market Pricing & Value Analysis
- **Offered Odds**: 1.22
- **Bookmaker Break-Even Probability**: 82.0%
- **Value Edge**: -15.3 percentage points (`[VERY_LOW EDGE]`)
- **Expected Value (EV)**: -0.186 per unit staked

### Warnings & Negative Checks
- **`SMALL_SAMPLE`** [MEDIUM] (CONTRADICTORY / INDIRECT): Limited sample size of only 4 matches.
  - *Evidence*: Sample size below the 5-match threshold for statistical stability (4 vs 4).
- **`LOW_AWAY_SCORING`** [MEDIUM] (CONTRADICTORY / DIRECT): Nottingham Forest averages only 0.50 goals per game away, increasing shutout risk.
  - *Evidence*: Nottingham Forest away scoring average is 0.50 GF/game, placing heavy reliance on Brentford to produce goals.
- **`HIGH_LINE_RELIANCE`** [MEDIUM] (CONTRADICTORY / INDIRECT): Over 75% of expected goals depend exclusively on Brentford.
  - *Evidence*: Home expected goals (1.90) account for 83% of total expected output (2.29).
- **`TEAM_NEWS_UNVERIFIED`** [LOW] (NEUTRAL / CONTEXTUAL): Pre-match team news and confirmed starting lineups remain unverified.
  - *Evidence*: Lineups have not been locked in; rotation or late injury risk unconfirmed.

### Final Decision Verdict: **NO BET**
> NO BET. Model estimates an 66.7% Over 1.5 probability versus bookmaker break-even of 82.0% at 1.22 odds (-15.3 edge, -0.186 EV). Estimated Over 1.5 probability (66.7%) is well below the 70% threshold for the Over 1.5 strategy.

---

## 4. Coventry City vs Sunderland
- **Fixture**: England — Premier League | Date: 2026-10-31
- **Data Quality**: **Verified (Dual-Baseline Venue-Specific & Season-Overall Analysis)**

### Pre-Match Statistical Matchup Comparison

#### Venue Form (Used by Model Engine)
| Metric | Coventry City (Home @ Home) | Sunderland (Away @ Away) |
| :--- | :---: | :---: |
| **League Standing** | 19th | 20th |
| **Venue Matches Played** | 4 | 4 |
| **Venue Goals Scored (GF)** | 4 (1.00 / game) | 3 (0.75 / game) |
| **Venue Goals Conceded (GA)** | 7 (1.75 / game) | 8 (2.00 / game) |

#### Season Overall (Macro Contextual Record)
| Metric | Coventry City (Overall) | Sunderland (Overall) |
| :--- | :---: | :---: |
| **Overall Matches Played** | 8 | 8 |
| **Overall Goals Scored (GF)** | 7 (0.88 / game) | 6 (0.75 / game) |
| **Overall Goals Conceded (GA)** | 16 (2.00 / game) | 14 (1.75 / game) |

### Goal Profiles & Strength Indices (Dual-Baseline)
- **Primary Live Baselines (Premier League)**: Home scoring avg 1.58, Away scoring avg 1.28
  - Home Attacking Strength: 0.63
  - Away Defensive Weakness: 1.27
  - Away Attacking Strength: 0.59
  - Home Defensive Weakness: 1.37
- **Historical Benchmark Baselines**: Home scoring avg 1.55, Away scoring avg 1.25

### Expected Goals (Lambda) & Poisson Formulation
- **Primary Live Model**:
  - Lambda Home: 1.2658 | Lambda Away: 1.0254 | **Total Expected Goals (Lambda): 2.2912**
  - **Poisson P(Over 1.5)**: **66.7%** (Weak for the Over 1.5-focused strategy)
  - Poisson P(Under 1.5): 33.3%
- **Companion Historical Benchmark**:
  - Historical Total Expected Goals: 2.3403
  - **Historical P(Over 1.5)**: **68.0%**
- **Dual-Baseline Alignment**: `[VERY_HIGH ALIGNMENT]` (1.31 pp delta)

### Market Pricing & Value Analysis
- **Offered Odds**: 1.31
- **Bookmaker Break-Even Probability**: 76.3%
- **Value Edge**: -9.6 percentage points (`[LOW EDGE]`)
- **Expected Value (EV)**: -0.126 per unit staked

### Warnings & Negative Checks
- **`SMALL_SAMPLE`** [MEDIUM] (CONTRADICTORY / INDIRECT): Limited sample size of only 4 matches.
  - *Evidence*: Sample size below the 5-match threshold for statistical stability (4 vs 4).
- **`LOW_AWAY_SCORING`** [MEDIUM] (CONTRADICTORY / DIRECT): Sunderland averages only 0.75 goals per game away, increasing shutout risk.
  - *Evidence*: Sunderland away scoring average is 0.75 GF/game, placing heavy reliance on Coventry City to produce goals.
- **`TEAM_NEWS_UNVERIFIED`** [LOW] (NEUTRAL / CONTEXTUAL): Pre-match team news and confirmed starting lineups remain unverified.
  - *Evidence*: Lineups have not been locked in; rotation or late injury risk unconfirmed.

### Final Decision Verdict: **NO BET**
> NO BET. Model estimates an 66.7% Over 1.5 probability versus bookmaker break-even of 76.3% at 1.31 odds (-9.6 edge, -0.126 EV). Estimated Over 1.5 probability (66.7%) is well below the 70% threshold for the Over 1.5 strategy.

---

## 5. Hull City vs Ipswich Town
- **Fixture**: England — Premier League | Date: 2026-10-31
- **Data Quality**: **Verified (Dual-Baseline Venue-Specific & Season-Overall Analysis)**

### Pre-Match Statistical Matchup Comparison

#### Venue Form (Used by Model Engine)
| Metric | Hull City (Home @ Home) | Ipswich Town (Away @ Away) |
| :--- | :---: | :---: |
| **League Standing** | 10th | 12th |
| **Venue Matches Played** | 4 | 4 |
| **Venue Goals Scored (GF)** | 5 (1.25 / game) | 6 (1.50 / game) |
| **Venue Goals Conceded (GA)** | 4 (1.00 / game) | 9 (2.25 / game) |

#### Season Overall (Macro Contextual Record)
| Metric | Hull City (Overall) | Ipswich Town (Overall) |
| :--- | :---: | :---: |
| **Overall Matches Played** | 8 | 8 |
| **Overall Goals Scored (GF)** | 9 (1.13 / game) | 12 (1.50 / game) |
| **Overall Goals Conceded (GA)** | 8 (1.00 / game) | 16 (2.00 / game) |

### Goal Profiles & Strength Indices (Dual-Baseline)
- **Primary Live Baselines (Premier League)**: Home scoring avg 1.58, Away scoring avg 1.28
  - Home Attacking Strength: 0.79
  - Away Defensive Weakness: 1.42
  - Away Attacking Strength: 1.17
  - Home Defensive Weakness: 0.78
- **Historical Benchmark Baselines**: Home scoring avg 1.55, Away scoring avg 1.25

### Expected Goals (Lambda) & Poisson Formulation
- **Primary Live Model**:
  - Lambda Home: 1.7793 | Lambda Away: 1.1719 | **Total Expected Goals (Lambda): 2.9512**
  - **Poisson P(Over 1.5)**: **79.4%** (Good)
  - Poisson P(Under 1.5): 20.6%
- **Companion Historical Benchmark**:
  - Historical Total Expected Goals: 3.0145
  - **Historical P(Over 1.5)**: **80.3%**
- **Dual-Baseline Alignment**: `[VERY_HIGH ALIGNMENT]` (0.91 pp delta)

### Market Pricing & Value Analysis
- **Offered Odds**: 1.26
- **Bookmaker Break-Even Probability**: 79.4%
- **Value Edge**: +0.0 percentage points (`[MEDIUM EDGE]`)
- **Expected Value (EV)**: +0.000 per unit staked

### Warnings & Negative Checks
- **`SMALL_SAMPLE`** [MEDIUM] (CONTRADICTORY / INDIRECT): Limited sample size of only 4 matches.
  - *Evidence*: Sample size below the 5-match threshold for statistical stability (4 vs 4).
- **`TEAM_NEWS_UNVERIFIED`** [LOW] (NEUTRAL / CONTEXTUAL): Pre-match team news and confirmed starting lineups remain unverified.
  - *Evidence*: Lineups have not been locked in; rotation or late injury risk unconfirmed.

### Final Decision Verdict: **CAUTION**
> CAUTION. Model estimates an 79.4% Over 1.5 probability versus bookmaker break-even of 79.4% at 1.26 odds (+0.0 edge, +0.000 EV). Viable probability (79.4%), but edge is modest (+0.0pp) and requires risk awareness.

---

## 6. Manchester City vs Brighton and Hove Albion
- **Fixture**: England — Premier League | Date: 2026-10-31
- **Data Quality**: **Verified (Dual-Baseline Venue-Specific & Season-Overall Analysis)**

### Pre-Match Statistical Matchup Comparison

#### Venue Form (Used by Model Engine)
| Metric | Manchester City (Home @ Home) | Brighton and Hove Albion (Away @ Away) |
| :--- | :---: | :---: |
| **League Standing** | 1st | 3rd |
| **Venue Matches Played** | 4 | 4 |
| **Venue Goals Scored (GF)** | 11 (2.75 / game) | 9 (2.25 / game) |
| **Venue Goals Conceded (GA)** | 4 (1.00 / game) | 3 (0.75 / game) |

#### Season Overall (Macro Contextual Record)
| Metric | Manchester City (Overall) | Brighton and Hove Albion (Overall) |
| :--- | :---: | :---: |
| **Overall Matches Played** | 8 | 8 |
| **Overall Goals Scored (GF)** | 19 (2.38 / game) | 21 (2.63 / game) |
| **Overall Goals Conceded (GA)** | 8 (1.00 / game) | 5 (0.63 / game) |

### Goal Profiles & Strength Indices (Dual-Baseline)
- **Primary Live Baselines (Premier League)**: Home scoring avg 1.58, Away scoring avg 1.28
  - Home Attacking Strength: 1.74
  - Away Defensive Weakness: 0.47
  - Away Attacking Strength: 1.76
  - Home Defensive Weakness: 0.78
- **Historical Benchmark Baselines**: Home scoring avg 1.55, Away scoring avg 1.25

### Expected Goals (Lambda) & Poisson Formulation
- **Primary Live Model**:
  - Lambda Home: 1.3054 | Lambda Away: 1.7578 | **Total Expected Goals (Lambda): 3.0632**
  - **Poisson P(Over 1.5)**: **81.0%** (Strong)
  - Poisson P(Under 1.5): 19.0%
- **Companion Historical Benchmark**:
  - Historical Total Expected Goals: 3.1306
  - **Historical P(Over 1.5)**: **82.0%**
- **Dual-Baseline Alignment**: `[VERY_HIGH ALIGNMENT]` (0.95 pp delta)

### Market Pricing & Value Analysis
- **Offered Odds**: 1.13
- **Bookmaker Break-Even Probability**: 88.5%
- **Value Edge**: -7.5 percentage points (`[LOW EDGE]`)
- **Expected Value (EV)**: -0.085 per unit staked

### Warnings & Negative Checks
- **`SMALL_SAMPLE`** [MEDIUM] (CONTRADICTORY / INDIRECT): Limited sample size of only 4 matches.
  - *Evidence*: Sample size below the 5-match threshold for statistical stability (4 vs 4).
- **`STRONG_DEFENSIVE_MATCHUP`** [HIGH] (CONTRADICTORY / DIRECT): Tight defensive record elevating clean-sheet / low-scoring risk.
  - *Evidence*: Manchester City concedes 1.00 GA/game and Brighton and Hove Albion concedes 0.75 GA/game.
- **`TEAM_NEWS_UNVERIFIED`** [LOW] (NEUTRAL / CONTEXTUAL): Pre-match team news and confirmed starting lineups remain unverified.
  - *Evidence*: Lineups have not been locked in; rotation or late injury risk unconfirmed.

### Final Decision Verdict: **CAUTION**
> CAUTION. Model estimates an 81.0% Over 1.5 probability versus bookmaker break-even of 88.5% at 1.13 odds (-7.5 edge, -0.085 EV). Model probability is viable, but high contradictory warning (STRONG_DEFENSIVE_MATCHUP) requires caution.

---

## 7. Tottenham Hotspur vs Crystal Palace
- **Fixture**: England — Premier League | Date: 2026-10-31
- **Data Quality**: **Verified (Dual-Baseline Venue-Specific & Season-Overall Analysis)**

### Pre-Match Statistical Matchup Comparison

#### Venue Form (Used by Model Engine)
| Metric | Tottenham Hotspur (Home @ Home) | Crystal Palace (Away @ Away) |
| :--- | :---: | :---: |
| **League Standing** | 14th | 17th |
| **Venue Matches Played** | 4 | 4 |
| **Venue Goals Scored (GF)** | 6 (1.50 / game) | 2 (0.50 / game) |
| **Venue Goals Conceded (GA)** | 5 (1.25 / game) | 9 (2.25 / game) |

#### Season Overall (Macro Contextual Record)
| Metric | Tottenham Hotspur (Overall) | Crystal Palace (Overall) |
| :--- | :---: | :---: |
| **Overall Matches Played** | 8 | 8 |
| **Overall Goals Scored (GF)** | 10 (1.25 / game) | 5 (0.63 / game) |
| **Overall Goals Conceded (GA)** | 12 (1.50 / game) | 15 (1.88 / game) |

### Goal Profiles & Strength Indices (Dual-Baseline)
- **Primary Live Baselines (Premier League)**: Home scoring avg 1.58, Away scoring avg 1.28
  - Home Attacking Strength: 0.95
  - Away Defensive Weakness: 1.42
  - Away Attacking Strength: 0.39
  - Home Defensive Weakness: 0.98
- **Historical Benchmark Baselines**: Home scoring avg 1.55, Away scoring avg 1.25

### Expected Goals (Lambda) & Poisson Formulation
- **Primary Live Model**:
  - Lambda Home: 2.1361 | Lambda Away: 0.4883 | **Total Expected Goals (Lambda): 2.6244**
  - **Poisson P(Over 1.5)**: **73.7%** (Moderate)
  - Poisson P(Under 1.5): 26.3%
- **Companion Historical Benchmark**:
  - Historical Total Expected Goals: 2.6774
  - **Historical P(Over 1.5)**: **74.8%**
- **Dual-Baseline Alignment**: `[VERY_HIGH ALIGNMENT]` (1.02 pp delta)

### Market Pricing & Value Analysis
- **Offered Odds**: 1.18
- **Bookmaker Break-Even Probability**: 84.7%
- **Value Edge**: -11.0 percentage points (`[VERY_LOW EDGE]`)
- **Expected Value (EV)**: -0.130 per unit staked

### Warnings & Negative Checks
- **`SMALL_SAMPLE`** [MEDIUM] (CONTRADICTORY / INDIRECT): Limited sample size of only 4 matches.
  - *Evidence*: Sample size below the 5-match threshold for statistical stability (4 vs 4).
- **`LOW_AWAY_SCORING`** [MEDIUM] (CONTRADICTORY / DIRECT): Crystal Palace averages only 0.50 goals per game away, increasing shutout risk.
  - *Evidence*: Crystal Palace away scoring average is 0.50 GF/game, placing heavy reliance on Tottenham Hotspur to produce goals.
- **`HIGH_LINE_RELIANCE`** [MEDIUM] (CONTRADICTORY / INDIRECT): Over 75% of expected goals depend exclusively on Tottenham Hotspur.
  - *Evidence*: Home expected goals (2.14) account for 81% of total expected output (2.62).
- **`TEAM_NEWS_UNVERIFIED`** [LOW] (NEUTRAL / CONTEXTUAL): Pre-match team news and confirmed starting lineups remain unverified.
  - *Evidence*: Lineups have not been locked in; rotation or late injury risk unconfirmed.

### Final Decision Verdict: **NO BET**
> NO BET. Model estimates an 73.7% Over 1.5 probability versus bookmaker break-even of 84.7% at 1.18 odds (-11.0 edge, -0.130 EV). Significant negative expected value (-0.130) and pricing mismatch (-11.0pp edge) violate Principle 8.

---

## 8. Aston Villa vs Fulham
- **Fixture**: England — Premier League | Date: 2026-10-31
- **Data Quality**: **Verified (Dual-Baseline Venue-Specific & Season-Overall Analysis)**

### Pre-Match Statistical Matchup Comparison

#### Venue Form (Used by Model Engine)
| Metric | Aston Villa (Home @ Home) | Fulham (Away @ Away) |
| :--- | :---: | :---: |
| **League Standing** | 9th | 15th |
| **Venue Matches Played** | 4 | 4 |
| **Venue Goals Scored (GF)** | 6 (1.50 / game) | 3 (0.75 / game) |
| **Venue Goals Conceded (GA)** | 6 (1.50 / game) | 6 (1.50 / game) |

#### Season Overall (Macro Contextual Record)
| Metric | Aston Villa (Overall) | Fulham (Overall) |
| :--- | :---: | :---: |
| **Overall Matches Played** | 8 | 8 |
| **Overall Goals Scored (GF)** | 10 (1.25 / game) | 8 (1.00 / game) |
| **Overall Goals Conceded (GA)** | 13 (1.63 / game) | 10 (1.25 / game) |

### Goal Profiles & Strength Indices (Dual-Baseline)
- **Primary Live Baselines (Premier League)**: Home scoring avg 1.58, Away scoring avg 1.28
  - Home Attacking Strength: 0.95
  - Away Defensive Weakness: 0.95
  - Away Attacking Strength: 0.59
  - Home Defensive Weakness: 1.17
- **Historical Benchmark Baselines**: Home scoring avg 1.55, Away scoring avg 1.25

### Expected Goals (Lambda) & Poisson Formulation
- **Primary Live Model**:
  - Lambda Home: 1.4241 | Lambda Away: 0.8789 | **Total Expected Goals (Lambda): 2.3030**
  - **Poisson P(Over 1.5)**: **67.0%** (Weak for the Over 1.5-focused strategy)
  - Poisson P(Under 1.5): 33.0%
- **Companion Historical Benchmark**:
  - Historical Total Expected Goals: 2.3516
  - **Historical P(Over 1.5)**: **68.2%**
- **Dual-Baseline Alignment**: `[VERY_HIGH ALIGNMENT]` (1.22 pp delta)

### Market Pricing & Value Analysis
- **Offered Odds**: 1.20
- **Bookmaker Break-Even Probability**: 83.3%
- **Value Edge**: -16.3 percentage points (`[VERY_LOW EDGE]`)
- **Expected Value (EV)**: -0.196 per unit staked

### Warnings & Negative Checks
- **`SMALL_SAMPLE`** [MEDIUM] (CONTRADICTORY / INDIRECT): Limited sample size of only 4 matches.
  - *Evidence*: Sample size below the 5-match threshold for statistical stability (4 vs 4).
- **`LOW_AWAY_SCORING`** [MEDIUM] (CONTRADICTORY / DIRECT): Fulham averages only 0.75 goals per game away, increasing shutout risk.
  - *Evidence*: Fulham away scoring average is 0.75 GF/game, placing heavy reliance on Aston Villa to produce goals.
- **`TEAM_NEWS_UNVERIFIED`** [LOW] (NEUTRAL / CONTEXTUAL): Pre-match team news and confirmed starting lineups remain unverified.
  - *Evidence*: Lineups have not been locked in; rotation or late injury risk unconfirmed.

### Final Decision Verdict: **NO BET**
> NO BET. Model estimates an 67.0% Over 1.5 probability versus bookmaker break-even of 83.3% at 1.20 odds (-16.3 edge, -0.196 EV). Estimated Over 1.5 probability (67.0%) is well below the 70% threshold for the Over 1.5 strategy.

---

## 9. Levante vs Atletico Madrid
- **Fixture**: Spain — La Liga | Date: 2026-10-31
- **Data Quality**: **Verified (Dual-Baseline Venue-Specific & Season-Overall Analysis)**

### Pre-Match Statistical Matchup Comparison

#### Venue Form (Used by Model Engine)
| Metric | Levante (Home @ Home) | Atletico Madrid (Away @ Away) |
| :--- | :---: | :---: |
| **League Standing** | 14th | 2nd |
| **Venue Matches Played** | 5 | 5 |
| **Venue Goals Scored (GF)** | 6 (1.20 / game) | 9 (1.80 / game) |
| **Venue Goals Conceded (GA)** | 8 (1.60 / game) | 4 (0.80 / game) |

#### Season Overall (Macro Contextual Record)
| Metric | Levante (Overall) | Atletico Madrid (Overall) |
| :--- | :---: | :---: |
| **Overall Matches Played** | 10 | 10 |
| **Overall Goals Scored (GF)** | 11 (1.10 / game) | 21 (2.10 / game) |
| **Overall Goals Conceded (GA)** | 17 (1.70 / game) | 7 (0.70 / game) |

### Goal Profiles & Strength Indices (Dual-Baseline)
- **Primary Live Baselines (La Liga)**: Home scoring avg 1.48, Away scoring avg 1.15
  - Home Attacking Strength: 0.81
  - Away Defensive Weakness: 0.54
  - Away Attacking Strength: 1.57
  - Home Defensive Weakness: 1.39
- **Historical Benchmark Baselines**: Home scoring avg 1.45, Away scoring avg 1.10

### Expected Goals (Lambda) & Poisson Formulation
- **Primary Live Model**:
  - Lambda Home: 0.6486 | Lambda Away: 2.5043 | **Total Expected Goals (Lambda): 3.1529**
  - **Poisson P(Over 1.5)**: **82.3%** (Strong)
  - Poisson P(Under 1.5): 17.7%
- **Companion Historical Benchmark**:
  - Historical Total Expected Goals: 3.2802
  - **Historical P(Over 1.5)**: **83.9%**
- **Dual-Baseline Alignment**: `[VERY_HIGH ALIGNMENT]` (1.61 pp delta)

### Market Pricing & Value Analysis
- **Offered Odds**: 1.16
- **Bookmaker Break-Even Probability**: 86.2%
- **Value Edge**: -3.9 percentage points (`[LOW EDGE]`)
- **Expected Value (EV)**: -0.045 per unit staked

### Warnings & Negative Checks
- **`HIGH_LINE_RELIANCE`** [MEDIUM] (CONTRADICTORY / INDIRECT): Over 75% of expected goals depend exclusively on Atletico Madrid.
  - *Evidence*: Away expected goals (2.50) account for 79% of total expected output (3.15).
- **`TEAM_NEWS_UNVERIFIED`** [LOW] (NEUTRAL / CONTEXTUAL): Pre-match team news and confirmed starting lineups remain unverified.
  - *Evidence*: Lineups have not been locked in; rotation or late injury risk unconfirmed.

### Final Decision Verdict: **CAUTION**
> CAUTION. Model estimates an 82.3% Over 1.5 probability versus bookmaker break-even of 86.2% at 1.16 odds (-3.9 edge, -0.045 EV). High probability (82.3%), but pricing offers no positive edge (-3.9pp). Disclosed under Principle 9.

---

## 10. Rayo Vallecano vs Celta de Vigo
- **Fixture**: Spain — La Liga | Date: 2026-10-31
- **Data Quality**: **Verified (Dual-Baseline Venue-Specific & Season-Overall Analysis)**

### Pre-Match Statistical Matchup Comparison

#### Venue Form (Used by Model Engine)
| Metric | Rayo Vallecano (Home @ Home) | Celta de Vigo (Away @ Away) |
| :--- | :---: | :---: |
| **League Standing** | 16th | 9th |
| **Venue Matches Played** | 5 | 5 |
| **Venue Goals Scored (GF)** | 7 (1.40 / game) | 4 (0.80 / game) |
| **Venue Goals Conceded (GA)** | 11 (2.20 / game) | 4 (0.80 / game) |

#### Season Overall (Macro Contextual Record)
| Metric | Rayo Vallecano (Overall) | Celta de Vigo (Overall) |
| :--- | :---: | :---: |
| **Overall Matches Played** | 9 | 10 |
| **Overall Goals Scored (GF)** | 12 (1.33 / game) | 10 (1.00 / game) |
| **Overall Goals Conceded (GA)** | 20 (2.22 / game) | 7 (0.70 / game) |

### Goal Profiles & Strength Indices (Dual-Baseline)
- **Primary Live Baselines (La Liga)**: Home scoring avg 1.48, Away scoring avg 1.15
  - Home Attacking Strength: 0.95
  - Away Defensive Weakness: 0.54
  - Away Attacking Strength: 0.70
  - Home Defensive Weakness: 1.91
- **Historical Benchmark Baselines**: Home scoring avg 1.45, Away scoring avg 1.10

### Expected Goals (Lambda) & Poisson Formulation
- **Primary Live Model**:
  - Lambda Home: 0.7568 | Lambda Away: 1.5304 | **Total Expected Goals (Lambda): 2.2872**
  - **Poisson P(Over 1.5)**: **66.6%** (Weak for the Over 1.5-focused strategy)
  - Poisson P(Under 1.5): 33.4%
- **Companion Historical Benchmark**:
  - Historical Total Expected Goals: 2.3724
  - **Historical P(Over 1.5)**: **68.6%**
- **Dual-Baseline Alignment**: `[HIGH ALIGNMENT]` (2.03 pp delta)

### Market Pricing & Value Analysis
- **Offered Odds**: 1.35
- **Bookmaker Break-Even Probability**: 74.1%
- **Value Edge**: -7.5 percentage points (`[LOW EDGE]`)
- **Expected Value (EV)**: -0.101 per unit staked

### Warnings & Negative Checks
- **`LOW_AWAY_SCORING`** [MEDIUM] (CONTRADICTORY / DIRECT): Celta de Vigo averages only 0.80 goals per game away, increasing shutout risk.
  - *Evidence*: Celta de Vigo away scoring average is 0.80 GF/game, placing heavy reliance on Rayo Vallecano to produce goals.
- **`TEAM_NEWS_UNVERIFIED`** [LOW] (NEUTRAL / CONTEXTUAL): Pre-match team news and confirmed starting lineups remain unverified.
  - *Evidence*: Lineups have not been locked in; rotation or late injury risk unconfirmed.

### Final Decision Verdict: **NO BET**
> NO BET. Model estimates an 66.6% Over 1.5 probability versus bookmaker break-even of 74.1% at 1.35 odds (-7.5 edge, -0.101 EV). Estimated Over 1.5 probability (66.6%) is well below the 70% threshold for the Over 1.5 strategy.

---

## 11. Real Betis vs Malaga CF
- **Fixture**: Spain — La Liga | Date: 2026-10-31
- **Data Quality**: **Verified (Dual-Baseline Venue-Specific & Season-Overall Analysis)**

### Pre-Match Statistical Matchup Comparison

#### Venue Form (Used by Model Engine)
| Metric | Real Betis (Home @ Home) | Malaga CF (Away @ Away) |
| :--- | :---: | :---: |
| **League Standing** | 4th | 20th |
| **Venue Matches Played** | 5 | 5 |
| **Venue Goals Scored (GF)** | 11 (2.20 / game) | 2 (0.40 / game) |
| **Venue Goals Conceded (GA)** | 3 (0.60 / game) | 10 (2.00 / game) |

#### Season Overall (Macro Contextual Record)
| Metric | Real Betis (Overall) | Malaga CF (Overall) |
| :--- | :---: | :---: |
| **Overall Matches Played** | 10 | 10 |
| **Overall Goals Scored (GF)** | 18 (1.80 / game) | 6 (0.60 / game) |
| **Overall Goals Conceded (GA)** | 9 (0.90 / game) | 18 (1.80 / game) |

### Goal Profiles & Strength Indices (Dual-Baseline)
- **Primary Live Baselines (La Liga)**: Home scoring avg 1.48, Away scoring avg 1.15
  - Home Attacking Strength: 1.49
  - Away Defensive Weakness: 1.35
  - Away Attacking Strength: 0.35
  - Home Defensive Weakness: 0.52
- **Historical Benchmark Baselines**: Home scoring avg 1.45, Away scoring avg 1.10

### Expected Goals (Lambda) & Poisson Formulation
- **Primary Live Model**:
  - Lambda Home: 2.9730 | Lambda Away: 0.2087 | **Total Expected Goals (Lambda): 3.1817**
  - **Poisson P(Over 1.5)**: **82.6%** (Strong)
  - Poisson P(Under 1.5): 17.4%
- **Companion Historical Benchmark**:
  - Historical Total Expected Goals: 3.2527
  - **Historical P(Over 1.5)**: **83.5%**
- **Dual-Baseline Alignment**: `[VERY_HIGH ALIGNMENT]` (0.87 pp delta)

### Market Pricing & Value Analysis
- **Offered Odds**: 1.13
- **Bookmaker Break-Even Probability**: 88.5%
- **Value Edge**: -5.9 percentage points (`[LOW EDGE]`)
- **Expected Value (EV)**: -0.067 per unit staked

### Warnings & Negative Checks
- **`LOW_AWAY_SCORING`** [HIGH] (CONTRADICTORY / DIRECT): Malaga CF averages only 0.40 goals per game away, increasing shutout risk.
  - *Evidence*: Malaga CF away scoring average is 0.40 GF/game, placing heavy reliance on Real Betis to produce goals.
- **`STRONG_DEFENSIVE_MATCHUP`** [HIGH] (CONTRADICTORY / DIRECT): Tight defensive record elevating clean-sheet / low-scoring risk.
  - *Evidence*: Real Betis concedes 0.60 GA/game and Malaga CF concedes 2.00 GA/game.
- **`HIGH_LINE_RELIANCE`** [MEDIUM] (CONTRADICTORY / INDIRECT): Over 75% of expected goals depend exclusively on Real Betis.
  - *Evidence*: Home expected goals (2.97) account for 93% of total expected output (3.18).
- **`TEAM_NEWS_UNVERIFIED`** [LOW] (NEUTRAL / CONTEXTUAL): Pre-match team news and confirmed starting lineups remain unverified.
  - *Evidence*: Lineups have not been locked in; rotation or late injury risk unconfirmed.

### Final Decision Verdict: **CAUTION**
> CAUTION. Model estimates an 82.6% Over 1.5 probability versus bookmaker break-even of 88.5% at 1.13 odds (-5.9 edge, -0.067 EV). Model probability is viable, but high contradictory warning (LOW_AWAY_SCORING) requires caution.

---

## 12. Real Sociedad B vs Girona FC
- **Fixture**: Spain — Segunda Division | Date: 2026-10-31
- **Data Quality**: **Verified (Dual-Baseline Venue-Specific & Season-Overall Analysis)**

### Pre-Match Statistical Matchup Comparison

#### Venue Form (Used by Model Engine)
| Metric | Real Sociedad B (Home @ Home) | Girona FC (Away @ Away) |
| :--- | :---: | :---: |
| **League Standing** | 20th | 4th |
| **Venue Matches Played** | 5 | 5 |
| **Venue Goals Scored (GF)** | 5 (1.00 / game) | 10 (2.00 / game) |
| **Venue Goals Conceded (GA)** | 9 (1.80 / game) | 5 (1.00 / game) |

#### Season Overall (Macro Contextual Record)
| Metric | Real Sociedad B (Overall) | Girona FC (Overall) |
| :--- | :---: | :---: |
| **Overall Matches Played** | 11 | 11 |
| **Overall Goals Scored (GF)** | 10 (0.91 / game) | 22 (2.00 / game) |
| **Overall Goals Conceded (GA)** | 21 (1.91 / game) | 10 (0.91 / game) |

### Goal Profiles & Strength Indices (Dual-Baseline)
- **Primary Live Baselines (Segunda Division)**: Home scoring avg 1.38, Away scoring avg 1.04
  - Home Attacking Strength: 0.72
  - Away Defensive Weakness: 0.72
  - Away Attacking Strength: 1.92
  - Home Defensive Weakness: 1.73
- **Historical Benchmark Baselines**: Home scoring avg 1.35, Away scoring avg 1.00

### Expected Goals (Lambda) & Poisson Formulation
- **Primary Live Model**:
  - Lambda Home: 0.7246 | Lambda Away: 3.4615 | **Total Expected Goals (Lambda): 4.1861**
  - **Poisson P(Over 1.5)**: **92.1%** (Extremely strong)
  - Poisson P(Under 1.5): 7.9%
- **Companion Historical Benchmark**:
  - Historical Total Expected Goals: 4.3407
  - **Historical P(Over 1.5)**: **93.1%**
- **Dual-Baseline Alignment**: `[VERY_HIGH ALIGNMENT]` (1.00 pp delta)

### Market Pricing & Value Analysis
- **Offered Odds**: 1.20
- **Bookmaker Break-Even Probability**: 83.3%
- **Value Edge**: +8.8 percentage points (`[HIGH EDGE]`)
- **Expected Value (EV)**: +0.105 per unit staked

### Warnings & Negative Checks
- **`HIGH_LINE_RELIANCE`** [MEDIUM] (CONTRADICTORY / INDIRECT): Over 75% of expected goals depend exclusively on Girona FC.
  - *Evidence*: Away expected goals (3.46) account for 83% of total expected output (4.19).
- **`TEAM_NEWS_UNVERIFIED`** [LOW] (NEUTRAL / CONTEXTUAL): Pre-match team news and confirmed starting lineups remain unverified.
  - *Evidence*: Lineups have not been locked in; rotation or late injury risk unconfirmed.

### Final Decision Verdict: **SELECT**
> SELECT. Model estimates an 92.1% Over 1.5 probability versus bookmaker break-even of 83.3% at 1.20 odds (+8.8 edge, +0.105 EV). Strong probability (92.1%) supported by positive edge (+8.8pp, EV +0.105) and acceptable risk profile.

---

## 13. Eibar vs UD Almeria
- **Fixture**: Spain — Segunda Division | Date: 2026-10-31
- **Data Quality**: **Verified (Dual-Baseline Venue-Specific & Season-Overall Analysis)**

### Pre-Match Statistical Matchup Comparison

#### Venue Form (Used by Model Engine)
| Metric | Eibar (Home @ Home) | UD Almeria (Away @ Away) |
| :--- | :---: | :---: |
| **League Standing** | 3rd | 2nd |
| **Venue Matches Played** | 6 | 5 |
| **Venue Goals Scored (GF)** | 13 (2.17 / game) | 9 (1.80 / game) |
| **Venue Goals Conceded (GA)** | 6 (1.00 / game) | 5 (1.00 / game) |

#### Season Overall (Macro Contextual Record)
| Metric | Eibar (Overall) | UD Almeria (Overall) |
| :--- | :---: | :---: |
| **Overall Matches Played** | 11 | 11 |
| **Overall Goals Scored (GF)** | 20 (1.82 / game) | 22 (2.00 / game) |
| **Overall Goals Conceded (GA)** | 13 (1.18 / game) | 9 (0.82 / game) |

### Goal Profiles & Strength Indices (Dual-Baseline)
- **Primary Live Baselines (Segunda Division)**: Home scoring avg 1.38, Away scoring avg 1.04
  - Home Attacking Strength: 1.57
  - Away Defensive Weakness: 0.72
  - Away Attacking Strength: 1.73
  - Home Defensive Weakness: 0.96
- **Historical Benchmark Baselines**: Home scoring avg 1.35, Away scoring avg 1.00

### Expected Goals (Lambda) & Poisson Formulation
- **Primary Live Model**:
  - Lambda Home: 1.5700 | Lambda Away: 1.7308 | **Total Expected Goals (Lambda): 3.3008**
  - **Poisson P(Over 1.5)**: **84.2%** (Strong)
  - Poisson P(Under 1.5): 15.8%
- **Companion Historical Benchmark**:
  - Historical Total Expected Goals: 3.4049
  - **Historical P(Over 1.5)**: **85.3%**
- **Dual-Baseline Alignment**: `[VERY_HIGH ALIGNMENT]` (1.17 pp delta)

### Market Pricing & Value Analysis
- **Offered Odds**: 1.20
- **Bookmaker Break-Even Probability**: 83.3%
- **Value Edge**: +0.9 percentage points (`[MEDIUM EDGE]`)
- **Expected Value (EV)**: +0.010 per unit staked

### Warnings & Negative Checks
- **`TEAM_NEWS_UNVERIFIED`** [LOW] (NEUTRAL / CONTEXTUAL): Pre-match team news and confirmed starting lineups remain unverified.
  - *Evidence*: Lineups have not been locked in; rotation or late injury risk unconfirmed.

### Final Decision Verdict: **SELECT**
> SELECT. Model estimates an 84.2% Over 1.5 probability versus bookmaker break-even of 83.3% at 1.20 odds (+0.9 edge, +0.010 EV). Strong probability (84.2%) supported by positive edge (+0.9pp, EV +0.010) and acceptable risk profile.

---

## 14. Celta de Vigo B vs Cordoba CF
- **Fixture**: Spain — Segunda Division | Date: 2026-10-31
- **Data Quality**: **Verified (Dual-Baseline Venue-Specific & Season-Overall Analysis)**

### Pre-Match Statistical Matchup Comparison

#### Venue Form (Used by Model Engine)
| Metric | Celta de Vigo B (Home @ Home) | Cordoba CF (Away @ Away) |
| :--- | :---: | :---: |
| **League Standing** | 15th | 12th |
| **Venue Matches Played** | 5 | 5 |
| **Venue Goals Scored (GF)** | 7 (1.40 / game) | 5 (1.00 / game) |
| **Venue Goals Conceded (GA)** | 7 (1.40 / game) | 7 (1.40 / game) |

#### Season Overall (Macro Contextual Record)
| Metric | Celta de Vigo B (Overall) | Cordoba CF (Overall) |
| :--- | :---: | :---: |
| **Overall Matches Played** | 10 | 11 |
| **Overall Goals Scored (GF)** | 12 (1.20 / game) | 13 (1.18 / game) |
| **Overall Goals Conceded (GA)** | 16 (1.60 / game) | 14 (1.27 / game) |

### Goal Profiles & Strength Indices (Dual-Baseline)
- **Primary Live Baselines (Segunda Division)**: Home scoring avg 1.38, Away scoring avg 1.04
  - Home Attacking Strength: 1.01
  - Away Defensive Weakness: 1.01
  - Away Attacking Strength: 0.96
  - Home Defensive Weakness: 1.35
- **Historical Benchmark Baselines**: Home scoring avg 1.35, Away scoring avg 1.00

### Expected Goals (Lambda) & Poisson Formulation
- **Primary Live Model**:
  - Lambda Home: 1.4203 | Lambda Away: 1.3462 | **Total Expected Goals (Lambda): 2.7665**
  - **Poisson P(Over 1.5)**: **76.3%** (Good)
  - Poisson P(Under 1.5): 23.7%
- **Companion Historical Benchmark**:
  - Historical Total Expected Goals: 2.8519
  - **Historical P(Over 1.5)**: **77.8%**
- **Dual-Baseline Alignment**: `[HIGH ALIGNMENT]` (1.52 pp delta)

### Market Pricing & Value Analysis
- **Offered Odds**: 1.13
- **Bookmaker Break-Even Probability**: 88.5%
- **Value Edge**: -12.2 percentage points (`[VERY_LOW EDGE]`)
- **Expected Value (EV)**: -0.138 per unit staked

### Warnings & Negative Checks
- **`TEAM_NEWS_UNVERIFIED`** [LOW] (NEUTRAL / CONTEXTUAL): Pre-match team news and confirmed starting lineups remain unverified.
  - *Evidence*: Lineups have not been locked in; rotation or late injury risk unconfirmed.

### Final Decision Verdict: **NO BET**
> NO BET. Model estimates an 76.3% Over 1.5 probability versus bookmaker break-even of 88.5% at 1.13 odds (-12.2 edge, -0.138 EV). Significant negative expected value (-0.138) and pricing mismatch (-12.2pp edge) violate Principle 8.

---

## 15. Albacete Balompie vs CE Sabadell FC
- **Fixture**: Spain — Segunda Division | Date: 2026-10-31
- **Data Quality**: **Verified (Dual-Baseline Venue-Specific & Season-Overall Analysis)**

### Pre-Match Statistical Matchup Comparison

#### Venue Form (Used by Model Engine)
| Metric | Albacete Balompie (Home @ Home) | CE Sabadell FC (Away @ Away) |
| :--- | :---: | :---: |
| **League Standing** | 22nd | 10th |
| **Venue Matches Played** | 5 | 5 |
| **Venue Goals Scored (GF)** | 3 (0.60 / game) | 4 (0.80 / game) |
| **Venue Goals Conceded (GA)** | 10 (2.00 / game) | 4 (0.80 / game) |

#### Season Overall (Macro Contextual Record)
| Metric | Albacete Balompie (Overall) | CE Sabadell FC (Overall) |
| :--- | :---: | :---: |
| **Overall Matches Played** | 11 | 11 |
| **Overall Goals Scored (GF)** | 6 (0.55 / game) | 12 (1.09 / game) |
| **Overall Goals Conceded (GA)** | 23 (2.09 / game) | 9 (0.82 / game) |

### Goal Profiles & Strength Indices (Dual-Baseline)
- **Primary Live Baselines (Segunda Division)**: Home scoring avg 1.38, Away scoring avg 1.04
  - Home Attacking Strength: 0.43
  - Away Defensive Weakness: 0.58
  - Away Attacking Strength: 0.77
  - Home Defensive Weakness: 1.92
- **Historical Benchmark Baselines**: Home scoring avg 1.35, Away scoring avg 1.00

### Expected Goals (Lambda) & Poisson Formulation
- **Primary Live Model**:
  - Lambda Home: 0.3478 | Lambda Away: 1.5385 | **Total Expected Goals (Lambda): 1.8863**
  - **Poisson P(Over 1.5)**: **56.2%** (Weak for the Over 1.5-focused strategy)
  - Poisson P(Under 1.5): 43.8%
- **Companion Historical Benchmark**:
  - Historical Total Expected Goals: 1.9556
  - **Historical P(Over 1.5)**: **58.2%**
- **Dual-Baseline Alignment**: `[HIGH ALIGNMENT]` (1.98 pp delta)

### Market Pricing & Value Analysis
- **Offered Odds**: 1.37
- **Bookmaker Break-Even Probability**: 73.0%
- **Value Edge**: -16.8 percentage points (`[VERY_LOW EDGE]`)
- **Expected Value (EV)**: -0.230 per unit staked

### Warnings & Negative Checks
- **`LOW_AWAY_SCORING`** [MEDIUM] (CONTRADICTORY / DIRECT): CE Sabadell FC averages only 0.80 goals per game away, increasing shutout risk.
  - *Evidence*: CE Sabadell FC away scoring average is 0.80 GF/game, placing heavy reliance on Albacete Balompie to produce goals.
- **`LOW_HOME_SCORING`** [MEDIUM] (CONTRADICTORY / DIRECT): Albacete Balompie home scoring rate is low (0.60 GF/game).
  - *Evidence*: Albacete Balompie averages under 1.0 goal scored per home match across observed fixtures.
- **`HIGH_LINE_RELIANCE`** [MEDIUM] (CONTRADICTORY / INDIRECT): Over 75% of expected goals depend exclusively on CE Sabadell FC.
  - *Evidence*: Away expected goals (1.54) account for 82% of total expected output (1.89).
- **`TEAM_NEWS_UNVERIFIED`** [LOW] (NEUTRAL / CONTEXTUAL): Pre-match team news and confirmed starting lineups remain unverified.
  - *Evidence*: Lineups have not been locked in; rotation or late injury risk unconfirmed.

### Final Decision Verdict: **NO BET**
> NO BET. Model estimates an 56.2% Over 1.5 probability versus bookmaker break-even of 73.0% at 1.37 odds (-16.8 edge, -0.230 EV). Estimated Over 1.5 probability (56.2%) is well below the 70% threshold for the Over 1.5 strategy.

---

## 16. Bologna vs AC Monza
- **Fixture**: Italy — Serie A | Date: 2026-10-31
- **Data Quality**: **Verified (Dual-Baseline Venue-Specific & Season-Overall Analysis)**

### Pre-Match Statistical Matchup Comparison

#### Venue Form (Used by Model Engine)
| Metric | Bologna (Home @ Home) | AC Monza (Away @ Away) |
| :--- | :---: | :---: |
| **League Standing** | 11th | 16th |
| **Venue Matches Played** | 4 | 4 |
| **Venue Goals Scored (GF)** | 6 (1.50 / game) | 3 (0.75 / game) |
| **Venue Goals Conceded (GA)** | 4 (1.00 / game) | 8 (2.00 / game) |

#### Season Overall (Macro Contextual Record)
| Metric | Bologna (Overall) | AC Monza (Overall) |
| :--- | :---: | :---: |
| **Overall Matches Played** | 9 | 9 |
| **Overall Goals Scored (GF)** | 11 (1.22 / game) | 8 (0.89 / game) |
| **Overall Goals Conceded (GA)** | 11 (1.22 / game) | 15 (1.67 / game) |

### Goal Profiles & Strength Indices (Dual-Baseline)
- **Primary Live Baselines (Serie A)**: Home scoring avg 1.48, Away scoring avg 1.18
  - Home Attacking Strength: 1.01
  - Away Defensive Weakness: 1.35
  - Away Attacking Strength: 0.64
  - Home Defensive Weakness: 0.85
- **Historical Benchmark Baselines**: Home scoring avg 1.45, Away scoring avg 1.15

### Expected Goals (Lambda) & Poisson Formulation
- **Primary Live Model**:
  - Lambda Home: 2.0270 | Lambda Away: 0.6356 | **Total Expected Goals (Lambda): 2.6626**
  - **Poisson P(Over 1.5)**: **74.5%** (Moderate)
  - Poisson P(Under 1.5): 25.5%
- **Companion Historical Benchmark**:
  - Historical Total Expected Goals: 2.7211
  - **Historical P(Over 1.5)**: **75.6%**
- **Dual-Baseline Alignment**: `[VERY_HIGH ALIGNMENT]` (1.06 pp delta)

### Market Pricing & Value Analysis
- **Offered Odds**: 1.28
- **Bookmaker Break-Even Probability**: 78.1%
- **Value Edge**: -3.6 percentage points (`[LOW EDGE]`)
- **Expected Value (EV)**: -0.046 per unit staked

### Warnings & Negative Checks
- **`SMALL_SAMPLE`** [MEDIUM] (CONTRADICTORY / INDIRECT): Limited sample size of only 4 matches.
  - *Evidence*: Sample size below the 5-match threshold for statistical stability (4 vs 4).
- **`LOW_AWAY_SCORING`** [MEDIUM] (CONTRADICTORY / DIRECT): AC Monza averages only 0.75 goals per game away, increasing shutout risk.
  - *Evidence*: AC Monza away scoring average is 0.75 GF/game, placing heavy reliance on Bologna to produce goals.
- **`HIGH_LINE_RELIANCE`** [MEDIUM] (CONTRADICTORY / INDIRECT): Over 75% of expected goals depend exclusively on Bologna.
  - *Evidence*: Home expected goals (2.03) account for 76% of total expected output (2.66).
- **`TEAM_NEWS_UNVERIFIED`** [LOW] (NEUTRAL / CONTEXTUAL): Pre-match team news and confirmed starting lineups remain unverified.
  - *Evidence*: Lineups have not been locked in; rotation or late injury risk unconfirmed.

### Final Decision Verdict: **CAUTION**
> CAUTION. Model estimates an 74.5% Over 1.5 probability versus bookmaker break-even of 78.1% at 1.28 odds (-3.6 edge, -0.046 EV). High probability (74.5%), but pricing offers no positive edge (-3.6pp). Disclosed under Principle 9.

---

## 17. Udinese vs AS Roma
- **Fixture**: Italy — Serie A | Date: 2026-10-31
- **Data Quality**: **Verified (Dual-Baseline Venue-Specific & Season-Overall Analysis)**

### Pre-Match Statistical Matchup Comparison

#### Venue Form (Used by Model Engine)
| Metric | Udinese (Home @ Home) | AS Roma (Away @ Away) |
| :--- | :---: | :---: |
| **League Standing** | 17th | 3rd |
| **Venue Matches Played** | 4 | 4 |
| **Venue Goals Scored (GF)** | 4 (1.00 / game) | 10 (2.50 / game) |
| **Venue Goals Conceded (GA)** | 7 (1.75 / game) | 4 (1.00 / game) |

#### Season Overall (Macro Contextual Record)
| Metric | Udinese (Overall) | AS Roma (Overall) |
| :--- | :---: | :---: |
| **Overall Matches Played** | 9 | 9 |
| **Overall Goals Scored (GF)** | 9 (1.00 / game) | 23 (2.56 / game) |
| **Overall Goals Conceded (GA)** | 18 (2.00 / game) | 8 (0.89 / game) |

### Goal Profiles & Strength Indices (Dual-Baseline)
- **Primary Live Baselines (Serie A)**: Home scoring avg 1.48, Away scoring avg 1.18
  - Home Attacking Strength: 0.68
  - Away Defensive Weakness: 0.68
  - Away Attacking Strength: 2.12
  - Home Defensive Weakness: 1.48
- **Historical Benchmark Baselines**: Home scoring avg 1.45, Away scoring avg 1.15

### Expected Goals (Lambda) & Poisson Formulation
- **Primary Live Model**:
  - Lambda Home: 0.6757 | Lambda Away: 3.7076 | **Total Expected Goals (Lambda): 4.3833**
  - **Poisson P(Over 1.5)**: **93.3%** (Extremely strong)
  - Poisson P(Under 1.5): 6.7%
- **Companion Historical Benchmark**:
  - Historical Total Expected Goals: 4.4940
  - **Historical P(Over 1.5)**: **93.9%**
- **Dual-Baseline Alignment**: `[VERY_HIGH ALIGNMENT]` (0.62 pp delta)

### Market Pricing & Value Analysis
- **Offered Odds**: 1.15
- **Bookmaker Break-Even Probability**: 87.0%
- **Value Edge**: +6.3 percentage points (`[HIGH EDGE]`)
- **Expected Value (EV)**: +0.073 per unit staked

### Warnings & Negative Checks
- **`SMALL_SAMPLE`** [MEDIUM] (CONTRADICTORY / INDIRECT): Limited sample size of only 4 matches.
  - *Evidence*: Sample size below the 5-match threshold for statistical stability (4 vs 4).
- **`HIGH_LINE_RELIANCE`** [MEDIUM] (CONTRADICTORY / INDIRECT): Over 75% of expected goals depend exclusively on AS Roma.
  - *Evidence*: Away expected goals (3.71) account for 85% of total expected output (4.38).
- **`TEAM_NEWS_UNVERIFIED`** [LOW] (NEUTRAL / CONTEXTUAL): Pre-match team news and confirmed starting lineups remain unverified.
  - *Evidence*: Lineups have not been locked in; rotation or late injury risk unconfirmed.

### Final Decision Verdict: **SELECT**
> SELECT. Model estimates an 93.3% Over 1.5 probability versus bookmaker break-even of 87.0% at 1.15 odds (+6.3 edge, +0.073 EV). Strong probability (93.3%) supported by positive edge (+6.3pp, EV +0.073) and acceptable risk profile.

---

## 18. AC Milan vs Inter Milan
- **Fixture**: Italy — Serie A | Date: 2026-10-31
- **Data Quality**: **Verified (Dual-Baseline Venue-Specific & Season-Overall Analysis)**

### Pre-Match Statistical Matchup Comparison

#### Venue Form (Used by Model Engine)
| Metric | AC Milan (Home @ Home) | Inter Milan (Away @ Away) |
| :--- | :---: | :---: |
| **League Standing** | 5th | 1st |
| **Venue Matches Played** | 4 | 4 |
| **Venue Goals Scored (GF)** | 9 (2.25 / game) | 11 (2.75 / game) |
| **Venue Goals Conceded (GA)** | 4 (1.00 / game) | 5 (1.25 / game) |

#### Season Overall (Macro Contextual Record)
| Metric | AC Milan (Overall) | Inter Milan (Overall) |
| :--- | :---: | :---: |
| **Overall Matches Played** | 9 | 9 |
| **Overall Goals Scored (GF)** | 18 (2.00 / game) | 25 (2.78 / game) |
| **Overall Goals Conceded (GA)** | 11 (1.22 / game) | 10 (1.11 / game) |

### Goal Profiles & Strength Indices (Dual-Baseline)
- **Primary Live Baselines (Serie A)**: Home scoring avg 1.48, Away scoring avg 1.18
  - Home Attacking Strength: 1.52
  - Away Defensive Weakness: 0.84
  - Away Attacking Strength: 2.33
  - Home Defensive Weakness: 0.85
- **Historical Benchmark Baselines**: Home scoring avg 1.45, Away scoring avg 1.15

### Expected Goals (Lambda) & Poisson Formulation
- **Primary Live Model**:
  - Lambda Home: 1.9003 | Lambda Away: 2.3305 | **Total Expected Goals (Lambda): 4.2308**
  - **Poisson P(Over 1.5)**: **92.4%** (Extremely strong)
  - Poisson P(Under 1.5): 7.6%
- **Companion Historical Benchmark**:
  - Historical Total Expected Goals: 4.3310
  - **Historical P(Over 1.5)**: **93.0%**
- **Dual-Baseline Alignment**: `[VERY_HIGH ALIGNMENT]` (0.61 pp delta)

### Market Pricing & Value Analysis
- **Offered Odds**: 1.18
- **Bookmaker Break-Even Probability**: 84.7%
- **Value Edge**: +7.7 percentage points (`[HIGH EDGE]`)
- **Expected Value (EV)**: +0.090 per unit staked

### Warnings & Negative Checks
- **`SMALL_SAMPLE`** [MEDIUM] (CONTRADICTORY / INDIRECT): Limited sample size of only 4 matches.
  - *Evidence*: Sample size below the 5-match threshold for statistical stability (4 vs 4).
- **`TEAM_NEWS_UNVERIFIED`** [LOW] (NEUTRAL / CONTEXTUAL): Pre-match team news and confirmed starting lineups remain unverified.
  - *Evidence*: Lineups have not been locked in; rotation or late injury risk unconfirmed.

### Final Decision Verdict: **SELECT**
> SELECT. Model estimates an 92.4% Over 1.5 probability versus bookmaker break-even of 84.7% at 1.18 odds (+7.7 edge, +0.090 EV). Strong probability (92.4%) supported by positive edge (+7.7pp, EV +0.090) and acceptable risk profile.

---

## 19. US Cremonese vs Benevento Calcio
- **Fixture**: Italy — Serie B | Date: 2026-10-31
- **Data Quality**: **Verified (Dual-Baseline Venue-Specific & Season-Overall Analysis)**

### Pre-Match Statistical Matchup Comparison

#### Venue Form (Used by Model Engine)
| Metric | US Cremonese (Home @ Home) | Benevento Calcio (Away @ Away) |
| :--- | :---: | :---: |
| **League Standing** | 15th | 5th |
| **Venue Matches Played** | 4 | 4 |
| **Venue Goals Scored (GF)** | 4 (1.00 / game) | 5 (1.25 / game) |
| **Venue Goals Conceded (GA)** | 6 (1.50 / game) | 5 (1.25 / game) |

#### Season Overall (Macro Contextual Record)
| Metric | US Cremonese (Overall) | Benevento Calcio (Overall) |
| :--- | :---: | :---: |
| **Overall Matches Played** | 9 | 9 |
| **Overall Goals Scored (GF)** | 9 (1.00 / game) | 13 (1.44 / game) |
| **Overall Goals Conceded (GA)** | 14 (1.56 / game) | 10 (1.11 / game) |

### Goal Profiles & Strength Indices (Dual-Baseline)
- **Primary Live Baselines (Serie B)**: Home scoring avg 1.36, Away scoring avg 1.06
  - Home Attacking Strength: 0.74
  - Away Defensive Weakness: 0.92
  - Away Attacking Strength: 1.18
  - Home Defensive Weakness: 1.42
- **Historical Benchmark Baselines**: Home scoring avg 1.35, Away scoring avg 1.05

### Expected Goals (Lambda) & Poisson Formulation
- **Primary Live Model**:
  - Lambda Home: 0.9191 | Lambda Away: 1.7689 | **Total Expected Goals (Lambda): 2.6880**
  - **Poisson P(Over 1.5)**: **74.9%** (Moderate)
  - Poisson P(Under 1.5): 25.1%
- **Companion Historical Benchmark**:
  - Historical Total Expected Goals: 2.7116
  - **Historical P(Over 1.5)**: **75.4%**
- **Dual-Baseline Alignment**: `[VERY_HIGH ALIGNMENT]` (0.50 pp delta)

### Market Pricing & Value Analysis
- **Offered Odds**: 1.31
- **Bookmaker Break-Even Probability**: 76.3%
- **Value Edge**: -1.4 percentage points (`[LOW EDGE]`)
- **Expected Value (EV)**: -0.019 per unit staked

### Warnings & Negative Checks
- **`SMALL_SAMPLE`** [MEDIUM] (CONTRADICTORY / INDIRECT): Limited sample size of only 4 matches.
  - *Evidence*: Sample size below the 5-match threshold for statistical stability (4 vs 4).
- **`TEAM_NEWS_UNVERIFIED`** [LOW] (NEUTRAL / CONTEXTUAL): Pre-match team news and confirmed starting lineups remain unverified.
  - *Evidence*: Lineups have not been locked in; rotation or late injury risk unconfirmed.

### Final Decision Verdict: **CAUTION**
> CAUTION. Model estimates an 74.9% Over 1.5 probability versus bookmaker break-even of 76.3% at 1.31 odds (-1.4 edge, -0.019 EV). High probability (74.9%), but pricing offers no positive edge (-1.4pp). Disclosed under Principle 9.

---

## 20. FC Modena vs Mantova FC
- **Fixture**: Italy — Serie B | Date: 2026-10-31
- **Data Quality**: **Verified (Dual-Baseline Venue-Specific & Season-Overall Analysis)**

### Pre-Match Statistical Matchup Comparison

#### Venue Form (Used by Model Engine)
| Metric | FC Modena (Home @ Home) | Mantova FC (Away @ Away) |
| :--- | :---: | :---: |
| **League Standing** | 2nd | 4th |
| **Venue Matches Played** | 4 | 4 |
| **Venue Goals Scored (GF)** | 9 (2.25 / game) | 6 (1.50 / game) |
| **Venue Goals Conceded (GA)** | 3 (0.75 / game) | 5 (1.25 / game) |

#### Season Overall (Macro Contextual Record)
| Metric | FC Modena (Overall) | Mantova FC (Overall) |
| :--- | :---: | :---: |
| **Overall Matches Played** | 9 | 9 |
| **Overall Goals Scored (GF)** | 17 (1.89 / game) | 14 (1.56 / game) |
| **Overall Goals Conceded (GA)** | 9 (1.00 / game) | 10 (1.11 / game) |

### Goal Profiles & Strength Indices (Dual-Baseline)
- **Primary Live Baselines (Serie B)**: Home scoring avg 1.36, Away scoring avg 1.06
  - Home Attacking Strength: 1.65
  - Away Defensive Weakness: 0.92
  - Away Attacking Strength: 1.42
  - Home Defensive Weakness: 0.71
- **Historical Benchmark Baselines**: Home scoring avg 1.35, Away scoring avg 1.05

### Expected Goals (Lambda) & Poisson Formulation
- **Primary Live Model**:
  - Lambda Home: 2.0680 | Lambda Away: 1.0613 | **Total Expected Goals (Lambda): 3.1293**
  - **Poisson P(Over 1.5)**: **81.9%** (Strong)
  - Poisson P(Under 1.5): 18.1%
- **Companion Historical Benchmark**:
  - Historical Total Expected Goals: 3.1548
  - **Historical P(Over 1.5)**: **82.3%**
- **Dual-Baseline Alignment**: `[VERY_HIGH ALIGNMENT]` (0.36 pp delta)

### Market Pricing & Value Analysis
- **Offered Odds**: 1.19
- **Bookmaker Break-Even Probability**: 84.0%
- **Value Edge**: -2.1 percentage points (`[LOW EDGE]`)
- **Expected Value (EV)**: -0.025 per unit staked

### Warnings & Negative Checks
- **`SMALL_SAMPLE`** [MEDIUM] (CONTRADICTORY / INDIRECT): Limited sample size of only 4 matches.
  - *Evidence*: Sample size below the 5-match threshold for statistical stability (4 vs 4).
- **`STRONG_DEFENSIVE_MATCHUP`** [HIGH] (CONTRADICTORY / DIRECT): Tight defensive record elevating clean-sheet / low-scoring risk.
  - *Evidence*: FC Modena concedes 0.75 GA/game and Mantova FC concedes 1.25 GA/game.
- **`TEAM_NEWS_UNVERIFIED`** [LOW] (NEUTRAL / CONTEXTUAL): Pre-match team news and confirmed starting lineups remain unverified.
  - *Evidence*: Lineups have not been locked in; rotation or late injury risk unconfirmed.

### Final Decision Verdict: **CAUTION**
> CAUTION. Model estimates an 81.9% Over 1.5 probability versus bookmaker break-even of 84.0% at 1.19 odds (-2.1 edge, -0.025 EV). Model probability is viable, but high contradictory warning (STRONG_DEFENSIVE_MATCHUP) requires caution.

---

## 21. FC Sudtirol vs Cesena FC
- **Fixture**: Italy — Serie B | Date: 2026-10-31
- **Data Quality**: **Verified (Dual-Baseline Venue-Specific & Season-Overall Analysis)**

### Pre-Match Statistical Matchup Comparison

#### Venue Form (Used by Model Engine)
| Metric | FC Sudtirol (Home @ Home) | Cesena FC (Away @ Away) |
| :--- | :---: | :---: |
| **League Standing** | 7th | 11th |
| **Venue Matches Played** | 4 | 4 |
| **Venue Goals Scored (GF)** | 5 (1.25 / game) | 3 (0.75 / game) |
| **Venue Goals Conceded (GA)** | 3 (0.75 / game) | 6 (1.50 / game) |

#### Season Overall (Macro Contextual Record)
| Metric | FC Sudtirol (Overall) | Cesena FC (Overall) |
| :--- | :---: | :---: |
| **Overall Matches Played** | 8 | 9 |
| **Overall Goals Scored (GF)** | 9 (1.13 / game) | 10 (1.11 / game) |
| **Overall Goals Conceded (GA)** | 8 (1.00 / game) | 12 (1.33 / game) |

### Goal Profiles & Strength Indices (Dual-Baseline)
- **Primary Live Baselines (Serie B)**: Home scoring avg 1.36, Away scoring avg 1.06
  - Home Attacking Strength: 0.92
  - Away Defensive Weakness: 1.10
  - Away Attacking Strength: 0.71
  - Home Defensive Weakness: 0.71
- **Historical Benchmark Baselines**: Home scoring avg 1.35, Away scoring avg 1.05

### Expected Goals (Lambda) & Poisson Formulation
- **Primary Live Model**:
  - Lambda Home: 1.3787 | Lambda Away: 0.5307 | **Total Expected Goals (Lambda): 1.9094**
  - **Poisson P(Over 1.5)**: **56.9%** (Weak for the Over 1.5-focused strategy)
  - Poisson P(Under 1.5): 43.1%
- **Companion Historical Benchmark**:
  - Historical Total Expected Goals: 1.9246
  - **Historical P(Over 1.5)**: **57.3%**
- **Dual-Baseline Alignment**: `[VERY_HIGH ALIGNMENT]` (0.47 pp delta)

### Market Pricing & Value Analysis
- **Offered Odds**: 1.37
- **Bookmaker Break-Even Probability**: 73.0%
- **Value Edge**: -16.1 percentage points (`[VERY_LOW EDGE]`)
- **Expected Value (EV)**: -0.220 per unit staked

### Warnings & Negative Checks
- **`SMALL_SAMPLE`** [MEDIUM] (CONTRADICTORY / INDIRECT): Limited sample size of only 4 matches.
  - *Evidence*: Sample size below the 5-match threshold for statistical stability (4 vs 4).
- **`LOW_AWAY_SCORING`** [MEDIUM] (CONTRADICTORY / DIRECT): Cesena FC averages only 0.75 goals per game away, increasing shutout risk.
  - *Evidence*: Cesena FC away scoring average is 0.75 GF/game, placing heavy reliance on FC Sudtirol to produce goals.
- **`STRONG_DEFENSIVE_MATCHUP`** [HIGH] (CONTRADICTORY / DIRECT): Tight defensive record elevating clean-sheet / low-scoring risk.
  - *Evidence*: FC Sudtirol concedes 0.75 GA/game and Cesena FC concedes 1.50 GA/game.
- **`TEAM_NEWS_UNVERIFIED`** [LOW] (NEUTRAL / CONTEXTUAL): Pre-match team news and confirmed starting lineups remain unverified.
  - *Evidence*: Lineups have not been locked in; rotation or late injury risk unconfirmed.

### Final Decision Verdict: **NO BET**
> NO BET. Model estimates an 56.9% Over 1.5 probability versus bookmaker break-even of 73.0% at 1.37 odds (-16.1 edge, -0.220 EV). Estimated Over 1.5 probability (56.9%) is well below the 70% threshold for the Over 1.5 strategy.

---

## 22. Catanzaro vs Padova
- **Fixture**: Italy — Serie B | Date: 2026-10-31
- **Data Quality**: **Verified (Dual-Baseline Venue-Specific & Season-Overall Analysis)**

### Pre-Match Statistical Matchup Comparison

#### Venue Form (Used by Model Engine)
| Metric | Catanzaro (Home @ Home) | Padova (Away @ Away) |
| :--- | :---: | :---: |
| **League Standing** | 20th | 9th |
| **Venue Matches Played** | 4 | 4 |
| **Venue Goals Scored (GF)** | 5 (1.25 / game) | 4 (1.00 / game) |
| **Venue Goals Conceded (GA)** | 9 (2.25 / game) | 5 (1.25 / game) |

#### Season Overall (Macro Contextual Record)
| Metric | Catanzaro (Overall) | Padova (Overall) |
| :--- | :---: | :---: |
| **Overall Matches Played** | 9 | 9 |
| **Overall Goals Scored (GF)** | 10 (1.11 / game) | 9 (1.00 / game) |
| **Overall Goals Conceded (GA)** | 21 (2.33 / game) | 10 (1.11 / game) |

### Goal Profiles & Strength Indices (Dual-Baseline)
- **Primary Live Baselines (Serie B)**: Home scoring avg 1.36, Away scoring avg 1.06
  - Home Attacking Strength: 0.92
  - Away Defensive Weakness: 0.92
  - Away Attacking Strength: 0.94
  - Home Defensive Weakness: 2.12
- **Historical Benchmark Baselines**: Home scoring avg 1.35, Away scoring avg 1.05

### Expected Goals (Lambda) & Poisson Formulation
- **Primary Live Model**:
  - Lambda Home: 1.1489 | Lambda Away: 2.1226 | **Total Expected Goals (Lambda): 3.2715**
  - **Poisson P(Over 1.5)**: **83.8%** (Strong)
  - Poisson P(Under 1.5): 16.2%
- **Companion Historical Benchmark**:
  - Historical Total Expected Goals: 3.3003
  - **Historical P(Over 1.5)**: **84.2%**
- **Dual-Baseline Alignment**: `[VERY_HIGH ALIGNMENT]` (0.37 pp delta)

### Market Pricing & Value Analysis
- **Offered Odds**: 1.22
- **Bookmaker Break-Even Probability**: 82.0%
- **Value Edge**: +1.8 percentage points (`[MEDIUM EDGE]`)
- **Expected Value (EV)**: +0.022 per unit staked

### Warnings & Negative Checks
- **`SMALL_SAMPLE`** [MEDIUM] (CONTRADICTORY / INDIRECT): Limited sample size of only 4 matches.
  - *Evidence*: Sample size below the 5-match threshold for statistical stability (4 vs 4).
- **`TEAM_NEWS_UNVERIFIED`** [LOW] (NEUTRAL / CONTEXTUAL): Pre-match team news and confirmed starting lineups remain unverified.
  - *Evidence*: Lineups have not been locked in; rotation or late injury risk unconfirmed.

### Final Decision Verdict: **SELECT**
> SELECT. Model estimates an 83.8% Over 1.5 probability versus bookmaker break-even of 82.0% at 1.22 odds (+1.8 edge, +0.022 EV). Strong probability (83.8%) supported by positive edge (+1.8pp, EV +0.022) and acceptable risk profile.

---

## SKIPPED FIXTURES — SECTION 5.0 HARD-STOP PROTOCOL
All 22 match options provided for 2026-10-31 had verified venue-split statistics available and satisfied Section 5.0 criteria. Zero fixtures required skipping.

---

## EXECUTIVE SUMMARY TABLE (2026-10-31)
| ID | Fixture | League | Odds | Break-Even | Live Prob | Hist Prob | Align Delta | Edge (pp) | EV | Warnings | Verdict |
| :---: | :--- | :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| 1 | Chelsea vs Manchester United | Premier League | 1.20 | 83.3% | 82.8% | 83.6% | 0.9pp | -0.5pp | -0.006 | 2 | CAUTION |
| 2 | Bournemouth vs Leeds United | Premier League | 1.28 | 78.1% | 63.8% | 65.1% | 1.3pp | -14.3pp | -0.183 | 2 | NO BET |
| 3 | Brentford vs Nottingham Forest | Premier League | 1.22 | 82.0% | 66.7% | 67.9% | 1.2pp | -15.3pp | -0.186 | 4 | NO BET |
| 4 | Coventry City vs Sunderland | Premier League | 1.31 | 76.3% | 66.7% | 68.0% | 1.3pp | -9.6pp | -0.126 | 3 | NO BET |
| 5 | Hull City vs Ipswich Town | Premier League | 1.26 | 79.4% | 79.4% | 80.3% | 0.9pp | +0.0pp | +0.000 | 2 | CAUTION |
| 6 | Manchester City vs Brighton and Hove Albion | Premier League | 1.13 | 88.5% | 81.0% | 82.0% | 0.9pp | -7.5pp | -0.085 | 3 | CAUTION |
| 7 | Tottenham Hotspur vs Crystal Palace | Premier League | 1.18 | 84.7% | 73.7% | 74.8% | 1.0pp | -11.0pp | -0.130 | 4 | NO BET |
| 8 | Aston Villa vs Fulham | Premier League | 1.20 | 83.3% | 67.0% | 68.2% | 1.2pp | -16.3pp | -0.196 | 3 | NO BET |
| 9 | Levante vs Atletico Madrid | La Liga | 1.16 | 86.2% | 82.3% | 83.9% | 1.6pp | -3.9pp | -0.045 | 2 | CAUTION |
| 10 | Rayo Vallecano vs Celta de Vigo | La Liga | 1.35 | 74.1% | 66.6% | 68.6% | 2.0pp | -7.5pp | -0.101 | 2 | NO BET |
| 11 | Real Betis vs Malaga CF | La Liga | 1.13 | 88.5% | 82.6% | 83.5% | 0.9pp | -5.9pp | -0.067 | 4 | CAUTION |
| 12 | Real Sociedad B vs Girona FC | Segunda Division | 1.20 | 83.3% | 92.1% | 93.1% | 1.0pp | +8.8pp | +0.105 | 2 | **SELECT** |
| 13 | Eibar vs UD Almeria | Segunda Division | 1.20 | 83.3% | 84.2% | 85.3% | 1.2pp | +0.9pp | +0.010 | 1 | **SELECT** |
| 14 | Celta de Vigo B vs Cordoba CF | Segunda Division | 1.13 | 88.5% | 76.3% | 77.8% | 1.5pp | -12.2pp | -0.138 | 1 | NO BET |
| 15 | Albacete Balompie vs CE Sabadell FC | Segunda Division | 1.37 | 73.0% | 56.2% | 58.2% | 2.0pp | -16.8pp | -0.230 | 4 | NO BET |
| 16 | Bologna vs AC Monza | Serie A | 1.28 | 78.1% | 74.5% | 75.6% | 1.1pp | -3.6pp | -0.046 | 4 | CAUTION |
| 17 | Udinese vs AS Roma | Serie A | 1.15 | 87.0% | 93.3% | 93.9% | 0.6pp | +6.3pp | +0.073 | 3 | **SELECT** |
| 18 | AC Milan vs Inter Milan | Serie A | 1.18 | 84.7% | 92.4% | 93.0% | 0.6pp | +7.7pp | +0.090 | 2 | **SELECT** |
| 19 | US Cremonese vs Benevento Calcio | Serie B | 1.31 | 76.3% | 74.9% | 75.4% | 0.5pp | -1.4pp | -0.019 | 2 | CAUTION |
| 20 | FC Modena vs Mantova FC | Serie B | 1.19 | 84.0% | 81.9% | 82.3% | 0.4pp | -2.1pp | -0.025 | 3 | CAUTION |
| 21 | FC Sudtirol vs Cesena FC | Serie B | 1.37 | 73.0% | 56.9% | 57.3% | 0.5pp | -16.1pp | -0.220 | 4 | NO BET |
| 22 | Catanzaro vs Padova | Serie B | 1.22 | 82.0% | 83.8% | 84.2% | 0.4pp | +1.8pp | +0.022 | 2 | **SELECT** |

