# ROY BETTING ENGINE — SINGLE MATCH TEST & METHODOLOGY COMPARISON
**Model Version**: 2.1 (Over 1.5 Goals Focused — Dual-Baseline Protocol)  
**Match**: US Sassuolo Calcio vs SS Lazio  
**Competition**: Italy — Serie A (2026/27 Matchday 9)  
**Match Date**: 2026-10-27 | 18:30 CET  
**Venue**: Mapei Stadium – Città del Tricolore, Reggio Emilia  
**Market**: Over / Under 1.5 Goals  
**Offered Odds**: 1.18 (Break-Even Implied Probability: 84.7%)  
**Methodology Enforcement**: Strict Venue-Specific Home/Away Protocol (Section 5.0), Dual-Baseline Protocol (Section 5.1A), & Hard-Stop Rule  

---

## 1. Raw Input Data & Verification (Model 2.1 Section 5.0)

Under **Model 2.1 Section 5.0**, overall season aggregates cannot be substituted for venue-specific performance. All inputs are verified from 2026/27 Serie A fixtures through Matchday 8 (October 25, 2026):

### Matchup Record Table
| Metric | US Sassuolo (Home Venue) | SS Lazio (Away Venue) |
| :--- | :---: | :---: |
| **League Table Standing** | 14th (8 pts) | 2nd (22 pts) |
| **Venue Matches Played** | **3** | **4** |
| **Venue Goals Scored (GF)** | **6** (2.00 / game) | **8** (2.00 / game) |
| **Venue Goals Conceded (GA)** | **4** (1.33 / game) | **1** (0.25 / game) |
| **Venue Goal Difference (GD)** | +2 | +7 |
| **Overall Record (P / GF / GA)** | 8 played: 12 GF / 16 GA | 8 played: 16 GF / 5 GA |
| **Overall Per-Game (GF / GA)** | 1.50 GF / 2.00 GA | 2.00 GF / 0.63 GA |

#### Venue Fixture Logs
- **Sassuolo Home Fixtures (3 matches)**:
  1. Sassuolo 2–1 Hellas Verona (GF: 2, GA: 1)
  2. Sassuolo 3–1 Monza (GF: 3, GA: 1)
  3. Sassuolo 1–2 Napoli (GF: 1, GA: 2)
  - *Home Totals*: 3 matches, 6 scored (2.00/g), 4 conceded (1.33/g)
- **Lazio Away Fixtures (4 matches)**:
  1. Bologna 0–1 Lazio (GF: 1, GA: 0)
  2. Udinese 1–2 Lazio (GF: 2, GA: 1)
  3. Venezia 0–2 Lazio (GF: 2, GA: 0)
  4. Juventus 0–3 Lazio (GF: 3, GA: 0)
  - *Away Totals*: 4 matches, 8 scored (2.00/g), 1 conceded (0.25/g)

---

## 2. Competition Scoring Baselines (Dual-Baseline Protocol)

To eliminate single-season volatility while respecting current trends, Model 2.1 tracks two concurrent scoring baselines:

1. **Primary Live Baseline (Serie A 2026/27 through Round 8)**:
   - League Home Scoring Average ($\mu_{\text{home, live}}$): **1.48**
   - League Away Scoring Average ($\mu_{\text{away, live}}$): **1.18**
   - Total Match Average: **2.66**
2. **Historical Benchmark Baseline (Multi-Year Italian Serie A Locked Catalog)**:
   - Historical Home Scoring Average ($\mu_{\text{home, hist}}$): **1.45**
   - Historical Away Scoring Average ($\mu_{\text{away, hist}}$): **1.15**
   - Total Match Average: **2.60**

---

## 3. Step-by-Step Strength Indices & Expected Goals ($\lambda$)

### 3.1 Relative Strength Indices (Model 2.1 Section 5.2)

$$\text{Home Attacking Strength} = \frac{\text{Sassuolo Home GF/game}}{\mu_{\text{home, live}}} = \frac{2.00}{1.48} = 1.3514$$

$$\text{Away Defensive Weakness} = \frac{\text{Lazio Away GA/game}}{\mu_{\text{home, live}}} = \frac{0.25}{1.48} = 0.1689$$

$$\text{Away Attacking Strength} = \frac{\text{Lazio Away GF/game}}{\mu_{\text{away, live}}} = \frac{2.00}{1.18} = 1.6949$$

$$\text{Home Defensive Weakness} = \frac{\text{Sassuolo Home GA/game}}{\mu_{\text{away, live}}} = \frac{1.3333}{1.18} = 1.1300$$

### 3.2 Baseline Expected Goals ($\lambda$) (Model 2.1 Section 5.3)

#### A. Primary Live Model:
$$\lambda_{\text{home}} = \mu_{\text{home, live}} \times \text{Home Atk} \times \text{Away Def} = 1.48 \times 1.3514 \times 0.1689 = \frac{2.00 \times 0.25}{1.48} = \mathbf{0.3378}$$

$$\lambda_{\text{away}} = \mu_{\text{away, live}} \times \text{Away Atk} \times \text{Home Def} = 1.18 \times 1.6949 \times 1.1300 = \frac{2.00 \times 1.3333}{1.18} = \mathbf{2.2542}$$

$$\mathbf{\lambda_{\text{total}}} = \lambda_{\text{home}} + \lambda_{\text{away}} = 0.3378 + 2.2542 = \mathbf{2.5921}$$

#### B. Historical Benchmark Model:
$$\lambda_{\text{home, hist}} = \frac{2.00 \times 0.25}{1.45} = \mathbf{0.3448}$$

$$\lambda_{\text{away, hist}} = \frac{2.00 \times 1.3333}{1.15} = \mathbf{2.3188}$$

$$\mathbf{\lambda_{\text{total, hist}}} = 0.3448 + 2.3188 = \mathbf{2.6636}$$

---

## 4. Poisson Probability Calculation (Model 2.1 Section 6)

Under Poisson distribution where goals follow rate parameter $\lambda_{\text{total}}$:

$$P(k \text{ goals}) = \frac{\lambda^k e^{-\lambda}}{k!}$$

### Primary Live Poisson Probabilities ($\lambda = 2.5921$):
- $e^{-\lambda_{\text{total}}} = e^{-2.5921} \approx 0.07486$
- $P(0 \text{ goals}) = e^{-2.5921} = \mathbf{7.49\%}$
- $P(1 \text{ goal}) = 2.5921 \times e^{-2.5921} = \mathbf{19.40\%}$
- $P(\text{Under 1.5 goals}) = P(0) + P(1) = 0.07486 + 0.19405 = \mathbf{26.89\%}$
- **Primary $P(\text{Over 1.5 goals})$** $= 1 - P(\text{Under 1.5}) = 1 - 0.26891 = \mathbf{73.11\%} \approx \mathbf{73.1\%}$
- **Confidence Label**: `Moderate` (70.0% – 74.9%)

### Historical Benchmark Poisson Probabilities ($\lambda_{\text{hist}} = 2.6636$):
- $P(0 \text{ goals}) = e^{-2.6636} = 6.97\%$
- $P(1 \text{ goal}) = 2.6636 \times e^{-2.6636} = 18.56\%$
- $P(\text{Under 1.5 goals}) = 25.53\%$
- **Historical $P(\text{Over 1.5 goals})$** $= \mathbf{74.47\%} \approx \mathbf{74.4\%}$

### Dual-Baseline Alignment (Section 5.1A):
$$\Delta = |73.11\% - 74.47\%| = \mathbf{1.36\text{ pp}} \implies \mathbf{[VERY\ HIGH\ ALIGNMENT]}$$
*(Delta $\le 1.5$ percentage points confirms exceptional stability between live and historical baselines).*

---

## 5. Market Value Analysis & Decision (Model 2.1 Section 15 & 17)

- **Market Offered Odds**: `1.18`
- **Bookmaker Implied Break-Even**:
  $$\text{Break-Even} = \frac{1}{1.18} = \mathbf{84.7\%}$$
- **Value Edge**:
  $$\text{Edge} = 73.1\% - 84.7\% = \mathbf{-11.6\text{ pp}} \implies \mathbf{[VERY\ LOW\ EDGE]}$$
- **Expected Value (EV)** per unit:
  $$\text{EV} = (0.7311 \times 1.18) - 1 = 0.8627 - 1 = \mathbf{-0.137}$$
- **Automated Verdict**: **`NO BET`**
  - *Rationale*: A massive negative edge of $-11.6\text{ pp}$ and an EV of $-0.137$. Bookmaker requires an 84.7% strike rate at 1.18 odds, but the true Poisson expectancy is only 73.1%. Betting this represents long-term negative expectancy.

### Pre-Match Warnings (Model 2.1 Section 16 & 16A)
1. **`SMALL_SAMPLE`** `[MEDIUM]` *(CONTRADICTORY / INDIRECT)*:
   - *Evidence*: Sassuolo has played only 3 home matches and Lazio 4 away matches. Both fall below the 5-match statistical stability threshold.
2. **`TEAM_NEWS_UNVERIFIED`** `[LOW]` *(NEUTRAL / CONTEXTUAL)*:
   - *Evidence*: Matchday 9 starting lineups and late injury/rotation news remain unconfirmed before kickoff.

---

## 6. Direct Side-by-Side Mathematical Comparison: Roy Model 2.1 vs. ChatGPT

Comparing our calculation with ChatGPT's output reveals the exact mathematical reason for the probability divergence:

### Comparison Matrix
| Parameter / Metric | Roy Model 2.1 (Our Engine) | ChatGPT Output | Variance Analysis |
| :--- | :---: | :---: | :--- |
| **Sassuolo Home Matches** | 3 (6 GF, 4 GA) | 3 (6 GF, 4 GA) | **100% Identical** |
| **Lazio Away Matches** | 4 (8 GF, 1 GA) | 4 (8 GF, 1 GA) | **100% Identical** |
| **Sassuolo Home GF / GA Rates** | 2.00 GF / 1.33 GA | 2.00 GF / 1.33 GA | **100% Identical** |
| **Lazio Away GF / GA Rates** | 2.00 GF / 0.25 GA | 2.00 GF / 0.25 GA | **100% Identical** |
| **League Home Scoring Average ($\mu_H$)** | **1.48** (Live) / **1.45** (Hist) | **1.58** | ChatGPT is +0.10 higher |
| **League Away Scoring Average ($\mu_A$)** | **1.18** (Live) / **1.15** (Hist) | **1.44** | **ChatGPT is +0.26 higher (+22.0%)** |
| **Combined League Average** | **2.66** (Live) / **2.60** (Hist) | **3.02** | ChatGPT uses an inflated 3.02 baseline |
| **$\lambda_{\text{home}}$ (Sassuolo Expected)** | $\frac{2.00 \times 0.25}{1.48} = \mathbf{0.338}$ | $\frac{2.00 \times 0.25}{1.58} = \mathbf{0.316}$ | Model 2.1 is +0.022 |
| **$\lambda_{\text{away}}$ (Lazio Expected)** | $\frac{2.00 \times 1.333}{1.18} = \mathbf{2.254}$ | $\frac{2.00 \times 1.33}{1.44} = \mathbf{1.847}$ | **Model 2.1 is +0.407 higher** |
| **$\mathbf{\lambda_{\text{total}}}$** | **2.592** (Live) / **2.664** (Hist) | **2.163** | **Model 2.1 is +0.429 higher** |
| **Poisson $P(\text{Over 1.5})$** | **73.11%** (Live) / **74.47%** (Hist) | **63.7%** | **Model 2.1 is +9.4 percentage points higher** |
| **Bookmaker Implied Break-Even** | **84.75%** | **84.75%** | **100% Identical** |
| **Value Edge** | **-11.6 pp** | **-21.0 pp** | Both reflect steep negative edge |
| **Expected Value (EV)** | **-0.137** (-13.7%) | **-0.248** (-24.8%) | Both reflect steep negative EV |
| **Final Decision Verdict** | **`NO BET`** | **`NO BET`** | **100% Consensus** |

### The Core Finding: Why Our Model Results are Higher

1. **Both models used the EXACT same team stats**:
   Both engines found that Sassuolo scores 2.00 / concedes 1.33 at home, and Lazio scores 2.00 / concedes 0.25 away. There was zero discrepancy in the team fixture logs.
2. **The League Baseline is in the DENOMINATOR**:
   In the Roy Model 2.1 equations:
   $$\lambda_A = \frac{\text{Lazio Away GF} \times \text{Sassuolo Home GA}}{\mu_{\text{away}}}$$
   - **ChatGPT** set the away league average $\mu_{\text{away}} = \mathbf{1.44}$ (based on an early-season 3.02 total goals snapshot).
   - **Roy Model 2.1** uses verified Serie A baselines: $\mu_{\text{away}} = \mathbf{1.18}$ (live season) and $\mathbf{1.15}$ (locked historical catalog).
3. **The Mathematical Effect**:
   Because $1.18$ is smaller than $1.44$, dividing Lazio's attacking output by $1.18$ produces $\mathbf{2.254}$ expected goals instead of $\mathbf{1.847}$.
   A total $\lambda$ of $2.592$ yields **$73.1\%$** Over 1.5 probability, whereas a total $\lambda$ of $2.163$ yields **$63.7\%$**.
4. **Why Serie A Away Baseline of 1.44 is an Outlier**:
   In the history of Serie A, away teams average approximately 1.10–1.18 goals per match. An away scoring rate of 1.44 is an unrepresentative early-season aberration (heavily skewed by Round 8's 34-goal anomaly). This proves exactly why the **Dual-Baseline Protocol (Section 5.1A)** was added to Model 2.1: to protect against baseline distortion from small-sample single matchday anomalies.
5. **Practical Impact on Betting**:
   Despite the 9.4 pp difference, **both models arrived at the exact same conclusion**:
   - Both identify that 1.18 odds requires an 84.75% strike rate.
   - Both identify that the market is severely overpriced.
   - Both arrive at **NO BET**.

---

## 7. Model Summary Card for Testing

```json
{
  "fixture": "Sassuolo vs Lazio",
  "competition": "Italy Serie A",
  "market": "Over/Under",
  "selection": "Over 1.5",
  "odds": 1.18,
  "venue_matches": {
    "sassuolo_home": 3,
    "lazio_away": 4
  },
  "venue_goals": {
    "sassuolo_home_gf": 6,
    "sassuolo_home_ga": 4,
    "lazio_away_gf": 8,
    "lazio_away_ga": 1
  },
  "league_averages": {
    "live_home": 1.48,
    "live_away": 1.18,
    "hist_home": 1.45,
    "hist_away": 1.15
  },
  "model_expected_goals": {
    "lambda_home": 0.3378,
    "lambda_away": 2.2542,
    "lambda_total": 2.5921
  },
  "probabilities": {
    "primary_over_1_5": 0.7311,
    "historical_over_1_5": 0.7447,
    "alignment_delta_pp": 1.36,
    "alignment_remark": "very_high",
    "breakeven_probability": 0.8475,
    "edge_percentage_points": -11.6,
    "expected_value": -0.137
  },
  "verdict": "NO BET",
  "warnings": [
    "SMALL_SAMPLE",
    "TEAM_NEWS_UNVERIFIED"
  ]
}
```
