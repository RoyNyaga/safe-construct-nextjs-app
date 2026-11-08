# ROY BETTING ENGINE — MULTI-MARKET EVALUATION REPORT
**Evaluation Date**: 2026-11-08  
**Engine & Model**: Model Version 4.0 (`roys_betting_engine_BTS_O2-5_win`)  
**Target Ticket**: 2-Leg High-Safety Portfolio (`Combined Odds >= 2.00`)  
**Selection Document**: [`selection_process.md`](file:///d:/Programming/nextjs/safe-construct-nextjs-app/betting-data/rules/selection_process.md)  
**Integrity Reference**: [`league_baselines.json`](file:///d:/Programming/nextjs/safe-construct-nextjs-app/betting-data/rules/league_baselines.json) (v2.0)  

---

## 1. EXECUTIVE SUMMARY & TICKET ARCHITECTURE

For Sunday, November 8, 2026, 17 fixtures across the English Premier League, Spanish La Liga, Spanish Segunda División, and Italian Serie A were comprehensively evaluated. Incorporating the newly codified **Away Favorite Restriction (`AWAY_FAVORITE_RESTRICTION`)** and the **League-Market Integrity Shield (Gate 6)**, the optimal 2-leg accumulator was constructed under **Priority 3 (Dominant Winner + High-Safety Anchor Pair)**:

- **Combined Ticket Odds**: **2.29** (Target sweet spot corridor: $2.00 - 2.50$)
- **Compound Model Probability**: **67.4%** (vs Bookmaker Break-Even **43.7%**)
- **Cumulative Value Edge**: **+23.7 percentage points**
- **Expected Value (EV)**: **+0.543** (+54.3% mathematical edge above bookmaker vig)
- **Primary Corridor**: English Premier League (`TIER_1` High Reliability)

```
TICKET BLUEPRINT (S-5-v4.0)
────────────────────────────────────────────────────────────────────────────────────────
Leg 1: Brighton and Hove Albion vs Brentford (English Premier League)
       Pick: Brighton and Hove Albion To Win (Match Winner: Home Win) @ 1.85
       Model Prob: 79.0% | Break-Even: 54.1% | Value Edge: +24.9pp | EV: +0.462
       Key Stat: Brighton is 3rd in the Premier League and undefeated at the Amex 
                 (4W-1D-0L, scoring 2.80 GF/G and conceding only 0.40 GA/G).
                 Dominance Ratio = 4.17 (Gate 1 Pass >= 2.20).
                 Draw probability suppressed at 14.2% (Gate 4 Pass <= 22.0%).
                 Senior first-team clash (Reserve Squad Restriction Passed).

Leg 2: Ipswich Town vs AFC Bournemouth (English Premier League)
       Pick: Over 1.5 Goals @ 1.24
       Model Prob: 85.3% | Break-Even: 80.6% | Value Edge: +4.7pp | EV: +0.058
       Key Stat: Symmetrical venue openness in the Tier 1 Standalone Corridor (1.24 - 1.36).
                 Ipswich scores 1.50 and concedes 1.75 GA/G at Portman Road.
                 Bournemouth scores 1.75 and concedes 1.75 GA/G away.
                 Dual Contribution Index = 0.838 (Flawless bilateral goal momentum).
────────────────────────────────────────────────────────────────────────────────────────
Combined Odds: 2.29 | Stake: 2,000 FCFA | Potential Return: 4,580.00 FCFA (Net Profit: +2,580.00 FCFA)
```

---

## 2. DAILY CANDIDATES DECISION MATRIX

| Fixture | Recommended Market | Odds | Roy Model Prob | Bookmaker Break-Even | Value Edge | EV | DCI | Dominance Ratio | Gate Status & Recommendation |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :--- |
| **Brighton vs Brentford** | **Home Win** | **1.85** | **79.0%** | 54.1% | **+24.9pp** | **+0.462** | 0.24 | **4.17** | **MAIN TICKET (Leg 1)** |
| **Ipswich vs Bournemouth** | **Over 1.5 Goals** | **1.24** | **85.3%** | 80.6% | **+4.7pp** | **+0.058** | **0.84** | 1.19 | **MAIN TICKET (Leg 2)** |
| *AC Monza vs Atalanta* | Over 2.5 Goals | 1.46 | 82.6% | 68.5% | +14.1pp | +0.206 | 0.88 | 1.14 | QUALIFIED (Shadow Alternative 1) |
| *Crystal Palace vs Liverpool* | Over 2.5 Goals | 1.47 | 73.5% | 68.0% | +5.5pp | +0.080 | 0.72 | 1.75 | QUALIFIED (Shadow Alternative 2) |
| *Villarreal vs Getafe* | Home Win | 1.53 | 71.4% | 65.4% | +6.0pp | +0.092 | 0.31 | 3.27 | QUALIFIED (Shadow Alternative 3) |
| *Real Sociedad vs Rayo* | Home Win | 1.78 | 68.2% | 56.2% | +12.0pp | +0.214 | 0.45 | 2.24 | QUALIFIED (Shadow Alternative 4) |
| *Girona vs UD Almeria* | Over 2.5 Goals | 1.76 | 70.8% | 56.8% | +14.0pp | +0.246 | 0.85 | 1.25 | QUALIFIED (Shadow Alt 5 - LMI Shield) |
| *Man United vs Aston Villa* | BTTS Yes | 1.46 | 69.2% | 68.5% | +0.7pp | +0.010 | 0.76 | 1.18 | BENCH (Modest Edge) |
| *Inter Milan vs Como* | Home Win | 2.01 | 64.5% | 49.8% | +14.7pp | +0.296 | 0.47 | 2.12 | BENCH (DR 2.12 < 2.20 Floor) |
| *Sunderland vs Chelsea* | Over 1.5 Goals | 1.26 | 81.5% | 79.4% | +2.1pp | +0.027 | 0.65 | 1.82 | BENCH (Away Win Restricted) |
| *Celta Vigo vs Levante* | Over 1.5 Goals | 1.28 | 80.5% | 78.1% | +2.4pp | +0.030 | 0.52 | 1.67 | BENCH (Over 1.5 Viable) |
| *Atletico vs Barcelona* | BTTS Yes | 1.37 | 78.5% | 73.0% | +5.5pp | +0.075 | 0.67 | 1.50 | BENCH (Odds 1.37 Juiced) |
| *Elche vs Real Betis* | BTTS Yes | 1.42 | 68.5% | 70.4% | -1.9pp | -0.027 | 0.88 | 1.14 | DISQUALIFIED (Negative EV) |
| *Genoa vs AC Milan* | Under 3.5 Goals | 1.33 | 75.5% | 75.2% | +0.3pp | +0.004 | 0.68 | 1.45 | BENCH (Away Win Restricted) |
| *Fiorentina vs Juventus* | Under 3.5 Goals | 1.32 | 74.8% | 75.8% | -1.0pp | -0.013 | 0.62 | 1.25 | DISQUALIFIED (Negative Value Edge) |
| *Sporting Gijon vs Valladolid* | Over 1.5 Goals | 1.34 | 79.2% | 74.6% | +4.6pp | +0.061 | 0.72 | 1.22 | DISQUALIFIED MAIN (Segunda Tier 3) |
| *Las Palmas vs Eldense* | Home Win | 1.98 | 58.2% | 50.5% | +7.7pp | +0.152 | 0.44 | 2.14 | DISQUALIFIED MAIN (Segunda Tier 3) |

---

## 3. MULTI-MARKET PROBABILITY MATRIX

| Fixture | Home Win | Draw | Away Win | Over 1.5 | Over 2.5 | BTTS Yes | Under 3.5 | Recommended Action |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :--- |
| **Brighton vs Brentford** | **79.0%** | 14.2% | 6.8% | 88.4% | 68.6% | 46.8% | 62.2% | **MAIN TICKET (Home Win @ 1.85)** |
| **Ipswich vs Bournemouth** | 35.4% | 21.8% | 42.8% | **85.3%** | 66.0% | 66.4% | 60.1% | **MAIN TICKET (Over 1.5 @ 1.24)** |
| **AC Monza vs Atalanta** | 37.5% | 19.0% | 43.5% | 94.5% | **82.6%** | 79.8% | 35.4% | Shadow Alt 1 (Over 2.5 @ 1.46) |
| **Crystal Palace vs Liverpool** | 16.2% | 17.3% | 66.5% | 90.2% | **73.5%** | 68.2% | 46.8% | Shadow Alt 2 (Over 2.5 @ 1.47) |
| **Villarreal vs Getafe** | **71.4%** | 20.8% | 7.8% | 74.2% | 48.5% | 38.5% | 76.5% | Shadow Alt 3 (Home Win @ 1.53) |
| **Real Sociedad vs Rayo** | **68.2%** | 18.0% | 13.8% | 86.5% | 66.0% | 58.2% | 58.8% | Shadow Alt 4 (Home Win @ 1.78) |
| **Girona vs UD Almeria** | 44.2% | 23.0% | 32.8% | 88.5% | **70.8%** | 65.2% | 51.2% | Shadow Alt 5 (LMI Shielded) |

---

## 4. DETAILED FIXTURE PROFILES & MATHEMATICAL DERIVATIONS

### 4.1 LEG 1: Brighton & Hove Albion vs Brentford
- **Competition**: England Premier League (Matchday 10)
- **Selected Market**: Match Winner (1X2) — **Home Win (Brighton)** @ **1.85**

#### Venue Records & Season Context
- **Brighton (Home @ The Amex)**: 5 MP, 4W-1D-0L, 14 GF (2.80 / game), 2 GA (0.40 / game). Overall: 3rd in Premier League, 19 pts, league-leading 24 GF / 7 GA.
- **Brentford (Away @ Away)**: 4 MP, 1W-1D-2L, 6 GF (1.50 / game), 6 GA (1.50 / game). Overall: 7th, 14 pts, 18 GF / 11 GA.

#### Dual-Baseline Poisson Formulation
- **Baselines (EPL)**: Current Home Avg = 1.58, Current Away Avg = 1.28
- **Attack / Defense Strengths**:
  - $\text{HAS}_{\text{Brighton}} = \frac{2.80}{1.58} = 1.772$ | $\text{ADW}_{\text{Brentford}} = \frac{1.50}{1.58} = 0.949$
  - $\text{AAS}_{\text{Brentford}} = \frac{1.50}{1.28} = 1.172$ | $\text{HDW}_{\text{Brighton}} = \frac{0.40}{1.28} = 0.313$
- **Expected Goals ($\lambda$)**:
  - $\lambda_{\text{Home}} = 1.58 \times 1.772 \times 0.949 = 2.66 \rightarrow \text{regressed with season overall} = \mathbf{2.50}$
  - $\lambda_{\text{Away}} = 1.28 \times 1.172 \times 0.313 = 0.47 \rightarrow \text{regressed with small-sample anchor} = \mathbf{0.60}$
  - $\lambda_{\text{Total}} = 3.10$ goals
- **Dominance Ratio**:
  $$\text{Dominance Ratio} = \frac{2.50}{0.60} = \mathbf{4.17} \quad (\ge 2.20 \text{ Gate 1 PASS})$$
- **Draw Suppression & Win Probability**:
  - Bivariate matrix gives $P(\text{Draw}) = \mathbf{14.2\%}$ (heavily suppressed, $\le 22.0\%$ Gate 4 PASS).
  - $P(\text{Away Win}) = \mathbf{6.8\%}$.
  - $P(\text{Home Win}) = 1 - 0.142 - 0.068 = \mathbf{79.0\%}$.
- **Pricing & Value Edge**:
  - Available odds: **1.85** (Break-Even = $54.1\%$).
  - **Value Edge**: $79.0\% - 54.1\% = \mathbf{+24.9\text{pp}}$!
  - **Expected Value**: $(0.790 \times 1.85) - 1 = \mathbf{+0.462}$.

---

### 4.2 LEG 2: Ipswich Town vs AFC Bournemouth
- **Competition**: England Premier League (Matchday 10)
- **Selected Market**: Over/Under Goals — **Over 1.5 Goals** @ **1.24**

#### Venue Records & Season Context
- **Ipswich Town (Home @ Portman Road)**: 4 MP, 6 GF (1.50 / game), 7 GA (1.75 / game). Overall: 14th, 11 pts, 11 GF / 15 GA.
- **Bournemouth (Away @ Away)**: 4 MP, 7 GF (1.75 / game), 7 GA (1.75 / game). Overall: 9th, 12 pts, 14 GF / 13 GA.

#### Dual-Baseline Poisson Formulation
- **Baselines (EPL)**: Current Home Avg = 1.58, Current Away Avg = 1.28
- **Attack / Defense Strengths**:
  - $\text{HAS}_{\text{Ipswich}} = \frac{1.50}{1.58} = 0.949$ | $\text{ADW}_{\text{Bournemouth}} = \frac{1.75}{1.58} = 1.108$
  - $\text{AAS}_{\text{Bournemouth}} = \frac{1.75}{1.28} = 1.367$ | $\text{HDW}_{\text{Ipswich}} = \frac{1.75}{1.28} = 1.367$
- **Expected Goals ($\lambda$)**:
  - $\lambda_{\text{Home}} = 1.58 \times 0.949 \times 1.108 = 1.66 \rightarrow \text{regressed} = \mathbf{1.55}$
  - $\lambda_{\text{Away}} = 1.28 \times 1.367 \times 1.367 = 2.39 \rightarrow \text{regressed} = \mathbf{1.85}$
  - $\lambda_{\text{Total}} = 3.40$ goals
- **Dual Contribution Index (DCI)**:
  $$\text{DCI} = \frac{1.55}{1.85} = \mathbf{0.838} \quad (\gg 0.45 \text{ Floor})$$
- **Over 1.5 Probability & Value**:
  - $P(\text{Over } 1.5) = 1 - e^{-3.40}(1 + 3.40) = 1 - 0.03337 \times 4.40 = \mathbf{0.853} \approx \mathbf{85.3\%}$.
  - Available odds: **1.24** (Tier 1 Standalone Corridor $1.24 - 1.36$).
  - Break-Even: $80.6\%$ | Value Edge: $\mathbf{+4.7\text{pp}}$ | EV: $\mathbf{+0.058}$.

---

## 5. STRUCTURAL RISK ANALYSIS & THE NEW RULES IN ACTION

### 5.1 Enforcing the Away Favorite Restriction (`AWAY_FAVORITE_RESTRICTION`)
Yesterday's slate provided empirical proof that backing away favorites (Watford 0–0 Middlesbrough, Forest 3–1 Man City) carries severe tail-risk. On today's slate, multiple away favorites appeared:
- **Liverpool away at Crystal Palace (@ 1.54)**: Disqualified from straight win on main ticket. Channeled into **Over 2.5 Goals (@ 1.47, 73.5% Model Prob, DCI 0.72)** in Shadow Alternative 2.
- **Chelsea away at Sunderland (@ 1.94)**: Disqualified from straight win. Sunderland will park a compact block at the Stadium of Light.
- **Atalanta away at Monza (@ 1.90)**: Disqualified from straight win. Instead, the fixture's immense goal volume was harvested via **Over 2.5 Goals (@ 1.46, 82.6% Model Prob, DCI 0.88)** in Shadow Alternative 1.
- **Real Betis away at Elche (@ 1.79)**: Disqualified from straight win.
- **AC Milan away at Genoa (@ 1.99)**: Disqualified from straight win.

### 5.2 Enforcing Gate 6 League-Market Integrity (Spain Segunda Protection)
All three Spanish Segunda División fixtures (Girona vs Almería, Sporting Gijón vs Valladolid, Las Palmas vs Eldense) were evaluated. While Girona vs Almería showed strong Poisson numbers (70.8% Over 2.5), **Gate 6 LMI Matrix strictly intervened**:
- Spain Segunda is marked as a **`TIER_3` Restricted Corridor** in `league_baselines.json` due to macro under-scoring trends and cynical game management.
- The fixture was diverted safely to the **Shadow Tracking Portfolio (Alternative 5)**, insulating real money capital from fat-tail risk.

---

## 6. ACTIONABLE VERIFICATION CHECKLIST

- [x] **Venue Isolation Verification**: Home-at-home and away-at-away statistics strictly isolated for all 17 fixtures.
- [x] **Reserve Squad Restriction**: Verified no academy/youth sides ("Jong", "B", "II") are selected for straight 1X2 wagers.
- [x] **Away Favorite Restriction**: Straight away favorites strictly barred from main capital tickets.
- [x] **DCI Hard Floor**: Ipswich vs Bournemouth DCI (0.838) comfortably exceeds the 0.45 safety floor.
- [x] **Draw Risk Suppression**: Brighton vs Brentford draw probability is suppressed at 14.2% ($\le 22.0\%$).
- [x] **Integrity Tier Clearance**: Both main ticket fixtures originate from Premier League (`TIER_1`).
- [x] **Compound Portfolio Metrics**: Combined odds 2.29 $\ge 2.00$, Compound probability 67.4%, Value Edge +23.7pp, EV +0.543.

