# ROY BETTING ENGINE — MATCH EVALUATION REPORT
**Model Version**: 2.1 (Over 1.5 Goals Focused)
**Evaluation Date**: 2026-10-25
**Total Fixtures Evaluated**: 11 matches
**Source Odds Provider**: Betmomo
**Methodology Enforcement**: Strict Venue-Specific Home/Away Protocol (Section 5.0)

---

## 1. CA River Plate vs Racing Club
- **Fixture**: Argentina — Liga Profesional | Date: 2026-10-25
- **Data Quality**: Verified (Venue-Specific Home/Away Analysis)

### Historical Statistics & Goal Profiles
- **CA River Plate (Home Venue)**: 7 home matches, 9 GF (1.29 GF/G), 7 GA (1.00 GA/G) *(Overall: 12 matches, 15 GF, 13 GA)*
- **Racing Club (Away Venue)**: 5 away matches, 5 GF (1.00 GF/G), 8 GA (1.60 GA/G) *(Overall: 12 matches, 13 GF, 19 GA)*
- **League Baselines**: Home scoring avg 1.30, Away scoring avg 1.05
- **Strength Indices**:
  - CA River Plate Home Attack Strength: 1.29 ÷ 1.30 = 0.99
  - Racing Club Away Defensive Weakness: 1.60 ÷ 1.30 = 1.23
  - Racing Club Away Attack Strength: 1.00 ÷ 1.05 = 0.95
  - CA River Plate Home Defensive Weakness: 1.00 ÷ 1.05 = 0.95

### Expected Goals (λ) & Poisson Formulation
- **λ_home**: 1.5877
- **λ_away**: 0.9524
- **λ_total**: 2.5401
- **Poisson P(Over 1.5)**: 72.1% (Moderate)
- **Poisson P(Under 1.5)**: 27.9%

### Market Pricing & Value Analysis
- **Offered Odds**: 1.25
- **Bookmaker Break-Even Probability**: 80.0%
- **Value Edge**: -7.9 percentage points
- **Expected Value (EV)**: -0.099 per unit staked

### Warnings & Negative Checks
- **`TEAM_NEWS_UNVERIFIED`** [LOW] (NEUTRAL / CONTEXTUAL): Pre-match team news and confirmed starting lineups remain unverified.
  - *Evidence*: Lineups have not been locked in; rotation or late injury risk unconfirmed.

### Final Decision Verdict: **CAUTION**
> CAUTION. Model estimates an 72.1% Over 1.5 probability versus bookmaker break-even of 80.0% at 1.25 odds (-7.9 edge, -0.099 EV). High probability (72.1%), but pricing offers no positive edge (-7.9pp). Disclosed under Principle 9.

---

## 2. AD San Carlos vs Deportivo Saprissa
- **Fixture**: Costa Rica — Primera División | Date: 2026-10-25
- **Data Quality**: Verified (Venue-Specific Home/Away Analysis)

### Historical Statistics & Goal Profiles
- **AD San Carlos (Home Venue)**: 5 home matches, 5 GF (1.00 GF/G), 4 GA (0.80 GA/G) *(Overall: 12 matches, 13 GF, 14 GA)*
- **Deportivo Saprissa (Away Venue)**: 6 away matches, 6 GF (1.00 GF/G), 7 GA (1.17 GA/G) *(Overall: 12 matches, 26 GF, 12 GA)*
- **League Baselines**: Home scoring avg 1.46, Away scoring avg 1.24
- **Strength Indices**:
  - AD San Carlos Home Attack Strength: 1.00 ÷ 1.46 = 0.68
  - Deportivo Saprissa Away Defensive Weakness: 1.17 ÷ 1.46 = 0.80
  - Deportivo Saprissa Away Attack Strength: 1.00 ÷ 1.24 = 0.81
  - AD San Carlos Home Defensive Weakness: 0.80 ÷ 1.24 = 0.65

### Expected Goals (λ) & Poisson Formulation
- **λ_home**: 0.8014
- **λ_away**: 0.6452
- **λ_total**: 1.4465
- **Poisson P(Over 1.5)**: 42.4% (Weak for the Over 1.5-focused strategy)
- **Poisson P(Under 1.5)**: 57.6%

### Market Pricing & Value Analysis
- **Offered Odds**: 1.29
- **Bookmaker Break-Even Probability**: 77.5%
- **Value Edge**: -35.1 percentage points
- **Expected Value (EV)**: -0.453 per unit staked

### Warnings & Negative Checks
- **`TEAM_NEWS_UNVERIFIED`** [LOW] (NEUTRAL / CONTEXTUAL): Pre-match team news and confirmed starting lineups remain unverified.
  - *Evidence*: Lineups have not been locked in; rotation or late injury risk unconfirmed.
- **`SMALL_SAMPLE`** [MEDIUM] (CONTRADICTORY / INDIRECT): Limited venue sample size of only 5 home matches for San Carlos and 6 away matches for Saprissa.
  - *Evidence*: Saprissa's high season goal production (26 GF) is heavily skewed by home fixtures (20 GF in 6 games); away from home, Saprissa produces only 1.00 GF/G.
- **`LOW_AWAY_SCORING`** [MEDIUM] (CONTRADICTORY / DIRECT): Saprissa scores only 1.00 goal per game in away fixtures.
  - *Evidence*: Reliance on San Carlos to produce goals against a solid defense is unsupported.

### Final Decision Verdict: **NO BET**
> NO BET. Model estimates an 42.4% Over 1.5 probability versus bookmaker break-even of 77.5% at 1.29 odds (-35.1 edge, -0.453 EV). Estimated Over 1.5 probability (42.4%) is well below the 70% threshold for the Over 1.5 strategy.

---

## 3. SD Aucas vs Barcelona SC
- **Fixture**: Ecuador — Serie A | Date: 2026-10-25
- **Data Quality**: Verified (Venue-Specific Home/Away Analysis)

### Historical Statistics & Goal Profiles
- **SD Aucas (Home Venue)**: 15 home matches, 19 GF (1.27 GF/G), 16 GA (1.07 GA/G) *(Overall: 30 matches, 33 GF, 28 GA)*
- **Barcelona SC (Away Venue)**: 15 away matches, 11 GF (0.73 GF/G), 17 GA (1.13 GA/G) *(Overall: 30 matches, 32 GF, 25 GA)*
- **League Baselines**: Home scoring avg 1.35, Away scoring avg 1.05
- **Strength Indices**:
  - SD Aucas Home Attack Strength: 1.27 ÷ 1.35 = 0.94
  - Barcelona SC Away Defensive Weakness: 1.13 ÷ 1.35 = 0.84
  - Barcelona SC Away Attack Strength: 0.73 ÷ 1.05 = 0.70
  - SD Aucas Home Defensive Weakness: 1.07 ÷ 1.05 = 1.02

### Expected Goals (λ) & Poisson Formulation
- **λ_home**: 1.0630
- **λ_away**: 0.7439
- **λ_total**: 1.8069
- **Poisson P(Over 1.5)**: 53.9% (Weak for the Over 1.5-focused strategy)
- **Poisson P(Under 1.5)**: 46.1%

### Market Pricing & Value Analysis
- **Offered Odds**: 1.38
- **Bookmaker Break-Even Probability**: 72.5%
- **Value Edge**: -18.5 percentage points
- **Expected Value (EV)**: -0.256 per unit staked

### Warnings & Negative Checks
- **`LOW_AWAY_SCORING`** [MEDIUM] (CONTRADICTORY / DIRECT): Barcelona SC averages only 0.73 goals per game, increasing shutout risk.
  - *Evidence*: Barcelona SC away scoring average is 0.73 GF/game, placing heavy reliance on SD Aucas to produce goals.
- **`TEAM_NEWS_UNVERIFIED`** [LOW] (NEUTRAL / CONTEXTUAL): Pre-match team news and confirmed starting lineups remain unverified.
  - *Evidence*: Lineups have not been locked in; rotation or late injury risk unconfirmed.

### Final Decision Verdict: **NO BET**
> NO BET. Model estimates an 53.9% Over 1.5 probability versus bookmaker break-even of 72.5% at 1.38 odds (-18.5 edge, -0.256 EV). Estimated Over 1.5 probability (53.9%) is well below the 70% threshold for the Over 1.5 strategy.

---

## 4. Waterhouse FC vs Dunbeholden FC
- **Fixture**: Jamaica — Premier League | Date: 2026-10-25
- **Data Quality**: Verified (Venue-Specific Home/Away Analysis)

### Historical Statistics & Goal Profiles
- **Waterhouse FC (Home Venue)**: 3 home matches, 4 GF (1.33 GF/G), 1 GA (0.33 GA/G) *(Overall: 6 matches, 15 GF, 2 GA)*
- **Dunbeholden FC (Away Venue)**: 3 away matches, 0 GF (0.00 GF/G), 8 GA (2.67 GA/G) *(Overall: 6 matches, 2 GF, 11 GA)*
- **League Baselines**: Home scoring avg 1.35, Away scoring avg 1.05
- **Strength Indices**:
  - Waterhouse FC Home Attack Strength: 1.33 ÷ 1.35 = 0.99
  - Dunbeholden FC Away Defensive Weakness: 2.67 ÷ 1.35 = 1.98
  - Dunbeholden FC Away Attack Strength: 0.00 ÷ 1.05 = 0.00
  - Waterhouse FC Home Defensive Weakness: 0.33 ÷ 1.05 = 0.31

### Expected Goals (λ) & Poisson Formulation
- **λ_home**: 2.6304
- **λ_away**: 0.0000
- **λ_total**: 2.6304
- **Poisson P(Over 1.5)**: 73.8% (Moderate)
- **Poisson P(Under 1.5)**: 26.2%

### Market Pricing & Value Analysis
- **Offered Odds**: 1.24
- **Bookmaker Break-Even Probability**: 80.6%
- **Value Edge**: -6.8 percentage points
- **Expected Value (EV)**: -0.084 per unit staked

### Warnings & Negative Checks
- **`SMALL_SAMPLE`** [MEDIUM] (CONTRADICTORY / INDIRECT): Limited sample size of only 3 matches.
  - *Evidence*: Sample size below the 5-match threshold for statistical stability (3 vs 3).
- **`LOW_AWAY_SCORING`** [HIGH] (CONTRADICTORY / DIRECT): Dunbeholden FC averages only 0.00 goals per game, increasing shutout risk.
  - *Evidence*: Dunbeholden FC away scoring average is 0.00 GF/game, placing heavy reliance on Waterhouse FC to produce goals.
- **`TEAM_NEWS_UNVERIFIED`** [LOW] (NEUTRAL / CONTEXTUAL): Pre-match team news and confirmed starting lineups remain unverified.
  - *Evidence*: Lineups have not been locked in; rotation or late injury risk unconfirmed.

### Final Decision Verdict: **CAUTION**
> CAUTION. Model estimates an 73.8% Over 1.5 probability versus bookmaker break-even of 80.6% at 1.24 odds (-6.8 edge, -0.084 EV). Model probability (73.8%) is viable, but high contradictory warning (LOW_AWAY_SCORING) requires caution.

---

## 5. Atlas vs Puebla
- **Fixture**: Mexico — Liga MX | Date: 2026-10-25
- **Data Quality**: Verified (Venue-Specific Home/Away Analysis)

### Historical Statistics & Goal Profiles
- **Atlas (Home Venue)**: 7 home matches, 8 GF (1.14 GF/G), 14 GA (2.00 GA/G) *(Overall: 13 matches, 21 GF, 23 GA)*
- **Puebla (Away Venue)**: 7 away matches, 6 GF (0.86 GF/G), 7 GA (1.00 GA/G) *(Overall: 13 matches, 13 GF, 17 GA)*
- **League Baselines**: Home scoring avg 1.55, Away scoring avg 1.25
- **Strength Indices**:
  - Atlas Home Attack Strength: 1.14 ÷ 1.55 = 0.74
  - Puebla Away Defensive Weakness: 1.00 ÷ 1.55 = 0.65
  - Puebla Away Attack Strength: 0.86 ÷ 1.25 = 0.69
  - Atlas Home Defensive Weakness: 2.00 ÷ 1.25 = 1.60

### Expected Goals (λ) & Poisson Formulation
- **λ_home**: 0.7355
- **λ_away**: 1.3760
- **λ_total**: 2.1115
- **Poisson P(Over 1.5)**: 62.3% (Weak for the Over 1.5-focused strategy)
- **Poisson P(Under 1.5)**: 37.7%

### Market Pricing & Value Analysis
- **Offered Odds**: 1.23
- **Bookmaker Break-Even Probability**: 81.3%
- **Value Edge**: -19.0 percentage points
- **Expected Value (EV)**: -0.233 per unit staked

### Warnings & Negative Checks
- **`TEAM_NEWS_UNVERIFIED`** [LOW] (NEUTRAL / CONTEXTUAL): Pre-match team news and confirmed starting lineups remain unverified.
  - *Evidence*: Lineups have not been locked in; rotation or late injury risk unconfirmed.

### Final Decision Verdict: **NO BET**
> NO BET. Model estimates an 62.3% Over 1.5 probability versus bookmaker break-even of 81.3% at 1.23 odds (-19.0 edge, -0.233 EV). Estimated Over 1.5 probability (62.3%) is well below the 70% threshold for the Over 1.5 strategy.

---

## 6. Querétaro vs Cruz Azul
- **Fixture**: Mexico — Liga MX | Date: 2026-10-25
- **Data Quality**: Verified (Venue-Specific Home/Away Analysis)

### Historical Statistics & Goal Profiles
- **Querétaro (Home Venue)**: 5 home matches, 7 GF (1.40 GF/G), 6 GA (1.20 GA/G) *(Overall: 12 matches, 16 GF, 15 GA)*
- **Cruz Azul (Away Venue)**: 6 away matches, 12 GF (2.00 GF/G), 10 GA (1.67 GA/G) *(Overall: 13 matches, 29 GF, 22 GA)*
- **League Baselines**: Home scoring avg 1.55, Away scoring avg 1.25
- **Strength Indices**:
  - Querétaro Home Attack Strength: 1.40 ÷ 1.55 = 0.90
  - Cruz Azul Away Defensive Weakness: 1.67 ÷ 1.55 = 1.08
  - Cruz Azul Away Attack Strength: 2.00 ÷ 1.25 = 1.60
  - Querétaro Home Defensive Weakness: 1.20 ÷ 1.25 = 0.96

### Expected Goals (λ) & Poisson Formulation
- **λ_home**: 1.5084
- **λ_away**: 1.9200
- **λ_total**: 3.4284
- **Poisson P(Over 1.5)**: 85.6% (Very strong)
- **Poisson P(Under 1.5)**: 14.4%

### Market Pricing & Value Analysis
- **Offered Odds**: 1.20
- **Bookmaker Break-Even Probability**: 83.3%
- **Value Edge**: +2.3 percentage points
- **Expected Value (EV)**: +0.028 per unit staked

### Warnings & Negative Checks
- **`TEAM_NEWS_UNVERIFIED`** [LOW] (NEUTRAL / CONTEXTUAL): Pre-match team news and confirmed starting lineups remain unverified.
  - *Evidence*: Lineups have not been locked in; rotation or late injury risk unconfirmed.

### Final Decision Verdict: **SELECT**
> SELECT. Model estimates an 85.6% Over 1.5 probability versus bookmaker break-even of 83.3% at 1.2 odds (+2.3 edge, +0.028 EV). Strong probability (85.6%) supported by positive edge (+2.3pp, EV +0.028) and acceptable risk profile.

---

## 7. Club América vs Pachuca
- **Fixture**: Mexico — Liga MX | Date: 2026-10-25
- **Data Quality**: Verified (Venue-Specific Home/Away Analysis)

### Historical Statistics & Goal Profiles
- **Club América (Home Venue)**: 5 home matches, 11 GF (2.20 GF/G), 3 GA (0.60 GA/G) *(Overall: 12 matches, 32 GF, 16 GA)*
- **Pachuca (Away Venue)**: 7 away matches, 10 GF (1.43 GF/G), 5 GA (0.71 GA/G) *(Overall: 13 matches, 20 GF, 18 GA)*
- **League Baselines**: Home scoring avg 1.55, Away scoring avg 1.25
- **Strength Indices**:
  - Club América Home Attack Strength: 2.20 ÷ 1.55 = 1.42
  - Pachuca Away Defensive Weakness: 0.71 ÷ 1.55 = 0.46
  - Pachuca Away Attack Strength: 1.43 ÷ 1.25 = 1.14
  - Club América Home Defensive Weakness: 0.60 ÷ 1.25 = 0.48

### Expected Goals (λ) & Poisson Formulation
- **λ_home**: 1.0077
- **λ_away**: 0.6864
- **λ_total**: 1.6941
- **Poisson P(Over 1.5)**: 50.5% (Weak for the Over 1.5-focused strategy)
- **Poisson P(Under 1.5)**: 49.5%

### Market Pricing & Value Analysis
- **Offered Odds**: 1.18
- **Bookmaker Break-Even Probability**: 84.7%
- **Value Edge**: -34.3 percentage points
- **Expected Value (EV)**: -0.404 per unit staked

### Warnings & Negative Checks
- **`STRONG_DEFENSIVE_MATCHUP`** [HIGH] (CONTRADICTORY / DIRECT): Both teams maintain exceptionally tight defensive records.
  - *Evidence*: Club América concedes 0.60 GA/game and Pachuca concedes 0.71 GA/game, elevating 0-0 and 1-0 probability.
- **`TEAM_NEWS_UNVERIFIED`** [LOW] (NEUTRAL / CONTEXTUAL): Pre-match team news and confirmed starting lineups remain unverified.
  - *Evidence*: Lineups have not been locked in; rotation or late injury risk unconfirmed.

### Final Decision Verdict: **NO BET**
> NO BET. Model estimates an 50.5% Over 1.5 probability versus bookmaker break-even of 84.7% at 1.18 odds (-34.3 edge, -0.404 EV). Estimated Over 1.5 probability (50.5%) is well below the 70% threshold for the Over 1.5 strategy.

---

## 8. Club Tijuana vs Santos Laguna
- **Fixture**: Mexico — Liga MX | Date: 2026-10-25
- **Data Quality**: Verified (Venue-Specific Home/Away Analysis)

### Historical Statistics & Goal Profiles
- **Club Tijuana (Home Venue)**: 7 home matches, 10 GF (1.43 GF/G), 6 GA (0.86 GA/G) *(Overall: 12 matches, 17 GF, 16 GA)*
- **Santos Laguna (Away Venue)**: 6 away matches, 9 GF (1.50 GF/G), 13 GA (2.17 GA/G) *(Overall: 13 matches, 19 GF, 16 GA)*
- **League Baselines**: Home scoring avg 1.55, Away scoring avg 1.25
- **Strength Indices**:
  - Club Tijuana Home Attack Strength: 1.43 ÷ 1.55 = 0.92
  - Santos Laguna Away Defensive Weakness: 2.17 ÷ 1.55 = 1.40
  - Santos Laguna Away Attack Strength: 1.50 ÷ 1.25 = 1.20
  - Club Tijuana Home Defensive Weakness: 0.86 ÷ 1.25 = 0.69

### Expected Goals (λ) & Poisson Formulation
- **λ_home**: 2.0020
- **λ_away**: 1.0320
- **λ_total**: 3.0340
- **Poisson P(Over 1.5)**: 80.6% (Strong)
- **Poisson P(Under 1.5)**: 19.4%

### Market Pricing & Value Analysis
- **Offered Odds**: 1.17
- **Bookmaker Break-Even Probability**: 85.5%
- **Value Edge**: -4.9 percentage points
- **Expected Value (EV)**: -0.057 per unit staked

### Warnings & Negative Checks
- **`TEAM_NEWS_UNVERIFIED`** [LOW] (NEUTRAL / CONTEXTUAL): Pre-match team news and confirmed starting lineups remain unverified.
  - *Evidence*: Lineups have not been locked in; rotation or late injury risk unconfirmed.

### Final Decision Verdict: **CAUTION**
> CAUTION. Model estimates an 80.6% Over 1.5 probability versus bookmaker break-even of 85.5% at 1.17 odds (-4.9 edge, -0.057 EV). High probability (80.6%), but pricing offers no positive edge (-4.9pp). Disclosed under Principle 9.

---

## 9. Sportivo San Lorenzo vs Cerro Porteño
- **Fixture**: Paraguay — Primera División | Date: 2026-10-25
- **Data Quality**: Verified (Venue-Specific Home/Away Analysis)

### Historical Statistics & Goal Profiles
- **Sportivo San Lorenzo (Home Venue)**: 11 home matches, 7 GF (0.64 GF/G), 19 GA (1.73 GA/G) *(Overall: 22 matches, 14 GF, 41 GA)*
- **Cerro Porteño (Away Venue)**: 11 away matches, 15 GF (1.36 GF/G), 16 GA (1.45 GA/G) *(Overall: 22 matches, 30 GF, 20 GA)*
- **League Baselines**: Home scoring avg 1.40, Away scoring avg 1.10
- **Strength Indices**:
  - Sportivo San Lorenzo Home Attack Strength: 0.64 ÷ 1.40 = 0.46
  - Cerro Porteño Away Defensive Weakness: 1.45 ÷ 1.40 = 1.04
  - Cerro Porteño Away Attack Strength: 1.36 ÷ 1.10 = 1.24
  - Sportivo San Lorenzo Home Defensive Weakness: 1.73 ÷ 1.10 = 1.57

### Expected Goals (λ) & Poisson Formulation
- **λ_home**: 0.6629
- **λ_away**: 2.1389
- **λ_total**: 2.8018
- **Poisson P(Over 1.5)**: 76.9% (Good)
- **Poisson P(Under 1.5)**: 23.1%

### Market Pricing & Value Analysis
- **Offered Odds**: 1.27
- **Bookmaker Break-Even Probability**: 78.7%
- **Value Edge**: -1.8 percentage points
- **Expected Value (EV)**: -0.023 per unit staked

### Warnings & Negative Checks
- **`LOW_HOME_SCORING`** [MEDIUM] (CONTRADICTORY / DIRECT): Sportivo San Lorenzo home scoring rate is low (0.64 GF/game).
  - *Evidence*: Sportivo San Lorenzo averages under 1.0 goal scored per match across the observed fixtures.
- **`TEAM_NEWS_UNVERIFIED`** [LOW] (NEUTRAL / CONTEXTUAL): Pre-match team news and confirmed starting lineups remain unverified.
  - *Evidence*: Lineups have not been locked in; rotation or late injury risk unconfirmed.

### Final Decision Verdict: **CAUTION**
> CAUTION. Model estimates an 76.9% Over 1.5 probability versus bookmaker break-even of 78.7% at 1.27 odds (-1.8 edge, -0.023 EV). High probability (76.9%), but pricing offers no positive edge (-1.8pp). Disclosed under Principle 9.

---

## 10. Nacional Montevideo vs Liverpool Montevideo
- **Fixture**: Uruguay — Primera División | Date: 2026-10-25
- **Data Quality**: Verified (Venue-Specific Home/Away Analysis)

### Historical Statistics & Goal Profiles
- **Nacional Montevideo (Home Venue)**: 6 home matches, 12 GF (2.00 GF/G), 8 GA (1.33 GA/G) *(Overall: 11 matches, 17 GF, 11 GA)*
- **Liverpool Montevideo (Away Venue)**: 5 away matches, 9 GF (1.80 GF/G), 6 GA (1.20 GA/G) *(Overall: 11 matches, 19 GF, 8 GA)*
- **League Baselines**: Home scoring avg 1.40, Away scoring avg 1.10
- **Strength Indices**:
  - Nacional Montevideo Home Attack Strength: 2.00 ÷ 1.40 = 1.43
  - Liverpool Montevideo Away Defensive Weakness: 1.20 ÷ 1.40 = 0.86
  - Liverpool Montevideo Away Attack Strength: 1.80 ÷ 1.10 = 1.64
  - Nacional Montevideo Home Defensive Weakness: 1.33 ÷ 1.10 = 1.21

### Expected Goals (λ) & Poisson Formulation
- **λ_home**: 1.7143
- **λ_away**: 2.1764
- **λ_total**: 3.8906
- **Poisson P(Over 1.5)**: 90.0% (Extremely strong)
- **Poisson P(Under 1.5)**: 10.0%

### Market Pricing & Value Analysis
- **Offered Odds**: 1.32
- **Bookmaker Break-Even Probability**: 75.8%
- **Value Edge**: +14.3 percentage points
- **Expected Value (EV)**: +0.188 per unit staked

### Warnings & Negative Checks
- **`TEAM_NEWS_UNVERIFIED`** [LOW] (NEUTRAL / CONTEXTUAL): Pre-match team news and confirmed starting lineups remain unverified.
  - *Evidence*: Lineups have not been locked in; rotation or late injury risk unconfirmed.

### Final Decision Verdict: **SELECT**
> SELECT. Model estimates an 90.0% Over 1.5 probability versus bookmaker break-even of 75.8% at 1.32 odds (+14.3 edge, +0.188 EV). Strong probability (90.0%) supported by positive edge (+14.3pp, EV +0.188) and acceptable risk profile.

---

## 11. Portuguesa FC vs Carabobo FC
- **Fixture**: Venezuela — Primera División | Date: 2026-10-25
- **Data Quality**: Verified (Venue-Specific Home/Away Analysis)

### Historical Statistics & Goal Profiles
- **Portuguesa FC (Home Venue)**: 6 home matches, 7 GF (1.17 GF/G), 4 GA (0.67 GA/G) *(Overall: 13 matches, 14 GF, 12 GA)*
- **Carabobo FC (Away Venue)**: 6 away matches, 6 GF (1.00 GF/G), 8 GA (1.33 GA/G) *(Overall: 13 matches, 15 GF, 10 GA)*
- **League Baselines**: Home scoring avg 1.30, Away scoring avg 1.00
- **Strength Indices**:
  - Portuguesa FC Home Attack Strength: 1.17 ÷ 1.30 = 0.90
  - Carabobo FC Away Defensive Weakness: 1.33 ÷ 1.30 = 1.02
  - Carabobo FC Away Attack Strength: 1.00 ÷ 1.00 = 1.00
  - Portuguesa FC Home Defensive Weakness: 0.67 ÷ 1.00 = 0.67

### Expected Goals (λ) & Poisson Formulation
- **λ_home**: 1.1970
- **λ_away**: 0.6700
- **λ_total**: 1.8670
- **Poisson P(Over 1.5)**: 55.7% (Weak for the Over 1.5-focused strategy)
- **Poisson P(Under 1.5)**: 44.3%

### Market Pricing & Value Analysis
- **Offered Odds**: 1.31
- **Bookmaker Break-Even Probability**: 76.3%
- **Value Edge**: -20.7 percentage points
- **Expected Value (EV)**: -0.271 per unit staked

### Warnings & Negative Checks
- **`H2H_LOW_GOALS`** [MEDIUM] (CONTRADICTORY / DIRECT): Historical head-to-head fixtures show a recurring low-goal pattern.
  - *Evidence*: Previous 2026 meetings ended 0-0 and 1-0. Historical low-scoring affair.
- **`TEAM_NEWS_UNVERIFIED`** [LOW] (NEUTRAL / CONTEXTUAL): Pre-match team news and confirmed starting lineups remain unverified.
  - *Evidence*: Lineups have not been locked in; rotation or late injury risk unconfirmed.

### Final Decision Verdict: **NO BET**
> NO BET. Model estimates an 55.7% Over 1.5 probability versus bookmaker break-even of 76.3% at 1.31 odds (-20.7 edge, -0.271 EV). Estimated Over 1.5 probability (55.7%) is well below the 70% threshold for the Over 1.5 strategy.

---

## Summary Decision Table

| Match | Market & Odds | Roy's Prob | Break-Even | Edge (pp) | EV | Verdict | Warnings Summary |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **CA River Plate vs Racing Club** | Over 1.5 @ 1.25 | 72.1% | 80.0% | -7.9 | -0.099 | **CAUTION** | `TEAM_NEWS_UNVERIFIED` |
| **AD San Carlos vs Deportivo Saprissa** | Over 1.5 @ 1.29 | 42.4% | 77.5% | -35.1 | -0.453 | **NO BET** | `TEAM_NEWS_UNVERIFIED`, `SMALL_SAMPLE`, `LOW_AWAY_SCORING` |
| **SD Aucas vs Barcelona SC** | Over 1.5 @ 1.38 | 53.9% | 72.5% | -18.5 | -0.256 | **NO BET** | `LOW_AWAY_SCORING`, `TEAM_NEWS_UNVERIFIED` |
| **Waterhouse FC vs Dunbeholden FC** | Over 1.5 @ 1.24 | 73.8% | 80.6% | -6.8 | -0.084 | **CAUTION** | `SMALL_SAMPLE`, `LOW_AWAY_SCORING`, `TEAM_NEWS_UNVERIFIED` |
| **Atlas vs Puebla** | Over 1.5 @ 1.23 | 62.3% | 81.3% | -19.0 | -0.233 | **NO BET** | `TEAM_NEWS_UNVERIFIED` |
| **Querétaro vs Cruz Azul** | Over 1.5 @ 1.20 | 85.6% | 83.3% | +2.3 | +0.028 | **SELECT** | `TEAM_NEWS_UNVERIFIED` |
| **Club América vs Pachuca** | Over 1.5 @ 1.18 | 50.5% | 84.7% | -34.3 | -0.404 | **NO BET** | `STRONG_DEFENSIVE_MATCHUP`, `TEAM_NEWS_UNVERIFIED` |
| **Club Tijuana vs Santos Laguna** | Over 1.5 @ 1.17 | 80.6% | 85.5% | -4.9 | -0.057 | **CAUTION** | `TEAM_NEWS_UNVERIFIED` |
| **Sportivo San Lorenzo vs Cerro Porteño** | Over 1.5 @ 1.27 | 76.9% | 78.7% | -1.8 | -0.023 | **CAUTION** | `LOW_HOME_SCORING`, `TEAM_NEWS_UNVERIFIED` |
| **Nacional Montevideo vs Liverpool Montevideo** | Over 1.5 @ 1.32 | 90.0% | 75.8% | +14.3 | +0.188 | **SELECT** | `TEAM_NEWS_UNVERIFIED` |
| **Portuguesa FC vs Carabobo FC** | Over 1.5 @ 1.31 | 55.7% | 76.3% | -20.7 | -0.271 | **NO BET** | `H2H_LOW_GOALS`, `TEAM_NEWS_UNVERIFIED` |
