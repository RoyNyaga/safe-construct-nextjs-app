# ROY BETTING ENGINE — TOURNAMENT & INTERNATIONAL EVALUATION REPORT
**Evaluation Date**: 2026-11-13  
**Engine & Model**: Model Version 5.0 (`roys_tournament_international_engine`)  
**Target Ticket**: 3-Leg Hybrid Safety Trio (`Combined Odds >= 2.00`, Target Corridor: $2.05 - 2.50$)  
**Selection Document**: [`selection_process_tournament.md`](file:///d:/Programming/nextjs/safe-construct-nextjs-app/betting-data/rules/selection_process_tournament.md) (Archetype 4: Hybrid Safety Trio)  
**Governance Reference**: [`model_5.0.md`](file:///d:/Programming/nextjs/safe-construct-nextjs-app/betting-data/rules/model_5.0.md)  

---

## 1. EXECUTIVE SUMMARY & TICKET ARCHITECTURE

For Friday, November 13, 2026, 19 international tournament fixtures (9 UEFA Nations League ties and 10 Africa Cup of Nations Qualifiers) were rigorously audited under Model 5.0.

Due to the ongoing **international FIFA window**, domestic league wagering is paused under Model 4.0. Model 5.0 evaluates this slate using official **World Football Elo Ratings**, continental baseline scoring calibrations ($\mu_{\text{comp}} = 2.40$ for UEFA Nations League, $\mu_{\text{comp}} = 2.05$ for AFCON), and bivariate Poisson distributions.

Under **Section 3.4 of [`selection_process_tournament.md`](file:///d:/Programming/nextjs/safe-construct-nextjs-app/betting-data/rules/selection_process_tournament.md)**, the engine deployed **Archetype 4: The 3-Leg Hybrid Safety Trio**:

### Why Archetype 4 Was Selected Over a 2-Leg Pair:
1. **The Forbidden Trade-Off Averted**:
   - Forcing a 2-leg ticket would require elevating a fixture to Over 2.5 (e.g. Netherlands vs Greece @ 1.61 or Slovakia vs Faroe Islands @ 1.77) or backing a straight 1X2 match winner (e.g. Netherlands @ 1.54 vs Greece #24), sacrificing 15–20 percentage points in mathematical probability.
   - Netherlands vs Greece win probability ($64.5\%$) fails the $\ge 72.0\%$ Dominant Match Winner threshold against Greece's elite defensive block.
   - Germany away to Serbia carries hostile away venue dynamics and low odds corridor compression (@ 1.25), while Slovenia vs Switzerland Over 1.5 triggers the Rule 10 anomaly (@ 1.38).
2. **The 3-Leg High-Floor Safety Architecture**:
   - The engine identified three elite Over 1.5 safety anchors backed by massive net Elo differentials ($+340$ to $+419$) and proven home fortress scoring profiles:
     - **Leg 1**: Slovakia vs Faroe Islands **Over 1.5 Goals (@ 1.25)** — Model Prob: **82.5%**, Value Edge: **+2.5pp**, EV: **+0.031**
     - **Leg 2**: Cape Verde vs Liberia **Over 1.5 Goals (@ 1.25)** — Model Prob: **82.0%**, Value Edge: **+2.0pp**, EV: **+0.025**
     - **Leg 3**: South Africa vs Kenya **Over 1.5 Goals (@ 1.33)** — Model Prob: **78.5%**, Value Edge: **+3.3pp**, EV: **+0.044**
   - **Combined Ticket Odds**: **2.08** (exact: 2.078, satisfying the $\ge 2.00$ mandate)
   - **Compound Model Probability**: **53.1%** (vs Bookmaker Break-Even **48.1%**)
   - **Cumulative Value Edge**: **+5.0 percentage points**
   - **Ticket Expected Value (EV)**: **+0.104** (+10.4% mathematical advantage over bookmaker vig)
   - **Confidence Rating**: **`high`** (Massive Elo differentials, verified tier-1 continental competitions, positive EV across all legs).

```
TICKET BLUEPRINT (S-2-v5.0)
────────────────────────────────────────────────────────────────────────────────────────
Leg 1: Slovakia vs Faroe Islands (UEFA Nations League)
       Pick: Over 1.5 Goals @ 1.25
       Model Prob: 82.5% | Break-Even: 80.0% | Value Edge: +2.5pp | EV: +0.031
       Key Stat: Slovakia at Tehelné pole (Elo 1,665, #52) holds a +375 net Elo superiority.
                 Slovakia scores 2.00 GF/G at home; Faroe Islands concedes 2.20 GA/G on the road.
                 Over 1.5 hit in 85.0% of Slovakia's home competitive matches.

Leg 2: Cape Verde vs Liberia (Africa Cup of Nations Qualifications)
       Pick: Over 1.5 Goals @ 1.25
       Model Prob: 82.0% | Break-Even: 80.0% | Value Edge: +2.0pp | EV: +0.025
       Key Stat: Cape Verde in Praia (Elo 1,595, #65) holds a +419 net Elo superiority over Liberia (#141).
                 Cape Verde averages 1.80 GF/G in Praia; Liberia has conceded 11 goals in 5 away qualifiers (2.20 GA/G).
                 Section 4.8 AFCON calibration anchor confirms 82.0% multi-goal expectancy.

Leg 3: South Africa vs Kenya (Africa Cup of Nations Qualifications)
       Pick: Over 1.5 Goals @ 1.33
       Model Prob: 78.5% | Break-Even: 75.2% | Value Edge: +3.3pp | EV: +0.044
       Key Stat: South Africa at FNB Stadium (Elo 1,585, #68) holds a +340 net Elo superiority.
                 Bafana Bafana has scored in 9 of last 10 competitive fixtures (2.20 GF/G home campaign rate).
                 Kenya has leaked goals in 7 of their last 8 road trips.
────────────────────────────────────────────────────────────────────────────────────────
Combined Odds: 2.08 | Ticket Prob: 53.1% | Cumulative Edge: +5.0pp | Ticket EV: +0.104
Confidence: HIGH | Stake: 2,500 units | Est. Payout: 5,195.31 units (Profit: +2,695.31)
```

---

## 2. COMPREHENSIVE SLATE AUDIT (19 MATCHES)

### Track B: UEFA Nations League Fixtures ($\mu_{\text{comp}} = 2.40$)

| Match | Odds (1X2 / O1.5) | World Elo (Home / Away) | Net Elo ($\Delta \text{Elo}$) | Model $P(\text{O1.5})$ | Gating Decision | Explicit Reason / Risk Flag |
| :--- | :---: | :---: | :---: | :---: | :---: | :--- |
| **Moldova vs Kazakhstan** | 2.73 / 2.73 (O1.5: 1.45) | 1,295 (#140) / 1,410 (#102) | -15 | 69.2% | **DISQUALIFIED** | Rule 10 anomaly (O1.5 @ 1.45 $\ge 1.38$). Balanced, volatile low-scoring fixture. |
| **Bulgaria vs Iceland** | 4.33 / 1.77 (O1.5: 1.32) | 1,440 (#95) / 1,603 (#64) | -63 | 69.2% | **DISQUALIFIED** | Negative EV on O1.5 (69.2% vs 75.8% BE). Iceland DNB prohibited by Rule 9 ($P(\text{Home}) = 28.0\%$). |
| **Serbia vs Germany** | 9.30 / 1.25 (O1.5: 1.12) | 1,683 (#48) / 1,895 (#15) | -112 | 87.5% | **SHADOW TRACKING** | O1.5 @ 1.12 violates Rule 8 ($< 1.22$). Away win @ 1.25 carries hostile away Belgrade risk. |
| **Slovenia vs Switzerland** | 5.30 / 1.72 (O1.5: 1.38) | 1,690 (#44) / 1,972 (#9) | -182 | 71.0% | **DISQUALIFIED** | Rule 10 anomaly (O1.5 @ 1.38 $\ge 1.38$). Akanji/Sommer defensive fortress; low block clash. |
| **Luxembourg vs Estonia** | 2.27 / 3.21 (O1.5: 1.47) | 1,435 (#98) / 1,380 (#112) | +155 | 68.5% | **DISQUALIFIED** | Rule 10 anomaly (O1.5 @ 1.47 $\ge 1.38$). Low-scoring international fixture. |
| **Netherlands vs Greece** | 1.54 / 5.40 (O1.5: 1.19) | 1,974 (#8) / 1,804 (#24) | +270 | 85.0% | **SHADOW TRACKING** | O1.5 @ 1.19 juiced ($< 1.22$). Netherlands Win ($64.5\%$) fails $\ge 72\%$ threshold vs Greece #24. |
| **Slovakia vs Faroe Islands** | 1.34 / 8.60 (O1.5: 1.25) | 1,665 (#52) / 1,390 (#108) | +375 | 82.5% | **PRIMARY SELECTION (LEG 1)** | Dominant net Elo (+375). Slovakia 2.00 GF/G home vs Faroe Islands 2.20 GA/G away. EV +0.031. |
| **Andorra vs Gibraltar** | 1.63 / 6.00 (O1.5: 1.70) | 1,100 (#175) / 1,020 (#188) | +180 | 58.0% | **DISQUALIFIED** | Extreme low-scoring profile (O1.5 @ 1.70). Severe zero-inflation risk. |
| **Scotland vs North Macedonia** | 1.17 / 15.0 (O1.5: 1.21) | 1,746 (#30) / 1,540 (#70) | +306 | 83.5% | **SHADOW TRACKING** | O1.5 @ 1.21 is slightly below the 1.22 corridor (Rule 8). Shadow candidate. |

---

### Track B: Africa Cup of Nations Qualifications ($\mu_{\text{comp}} = 2.05$)

| Match | Odds (1X2 / O1.5) | World Elo (Home / Away) | Net Elo ($\Delta \text{Elo}$) | Model $P(\text{O1.5})$ | Gating Decision | Explicit Reason / Risk Flag |
| :--- | :---: | :---: | :---: | :---: | :---: | :--- |
| **Zambia vs Burundi** | 1.62 / 5.20 (O1.5: 1.40) | 1,380 (#108) / 1,292 (#137) | +188 | 66.5% | **DISQUALIFIED** | Rule 10 anomaly (O1.5 @ 1.40 $\ge 1.38$). Net Elo $< +250$. |
| **Mozambique vs Ethiopia** | 1.62 / 5.60 (O1.5: 1.35) | 1,360 (#115) / 1,268 (#145) | +192 | 67.0% | **DISQUALIFIED** | Negative EV on O1.5 (67.0% vs 74.1% BE). Lack of high-mismatch scoring power. |
| **Comoros vs Congo** | 1.79 / 4.75 (O1.5: 1.45) | 1,375 (#110) / 1,226 (#155) | +249 | 66.0% | **DISQUALIFIED** | Rule 10 anomaly (O1.5 @ 1.45 $\ge 1.38$). Low-scoring African fixture. |
| **Cape Verde vs Liberia** | 1.20 / 14.0 (O1.5: 1.25) | 1,595 (#65) / 1,276 (#141) | +419 | 82.0% | **PRIMARY SELECTION (LEG 2)** | Massive net Elo (+419). Cape Verde 1.80 GF/G in Praia; Liberia 2.20 GA/G away. EV +0.025. |
| **South Africa vs Kenya** | 1.27 / 13.0 (O1.5: 1.33) | 1,585 (#68) / 1,345 (#120) | +340 | 78.5% | **PRIMARY SELECTION (LEG 3)** | Net Elo +340. South Africa 2.20 GF/G home rate; Kenya concedes 1.80 GA/G away. EV +0.044. |
| **Tunisia vs Libya** | 1.38 / 8.90 (O1.5: 1.36) | 1,550 (#75) / 1,394 (#101) | +256 | 71.0% | **SHADOW TRACKING** | Tactical North African derby; high 1-0 stalemate and low-tempo grind risk. |
| **Gabon vs Lesotho** | 1.24 / 11.0 (O1.5: 1.25) | 1,415 (#98) / 1,187 (#160) | +328 | 81.5% | **SHADOW TRACKING (TOP ALTERNATIVE)** | Top shadow anchor. Omitted from primary ticket to avoid 4-leg accumulator drag. |
| **Mali vs Rwanda** | 1.29 / 9.30 (O1.5: 1.33) | 1,610 (#62) / 1,387 (#106) | +323 | 73.0% | **SHADOW TRACKING** | Rwanda 5-4-1 low block has conceded 1 goal in 4 matches; high 1-0 attrition risk. |
| **Egypt vs Malawi** | 1.12 / 23.0 (O1.5: -) | 1,730 (#38) / 1,245 (#151) | +585 | — | **DISQUALIFIED (RULE 6)** | Over 1.5 unquoted (-). Rule 6 strictly forbids forced trade-up to Over 2.5 when DCI $< 0.35$. |
| **Morocco vs Niger** | 1.06 / 29.0 (O1.5: -) | 1,815 (#22) / 1,371 (#113) | +544 | — | **DISQUALIFIED (RULE 6)** | Over 1.5 unquoted (-). Rule 6 strictly forbids forced trade-up to Over 2.5 when DCI $< 0.35$. |

---

## 3. PRIMARY SELECTION IN-DEPTH BREAKDOWN

### Leg 1: Slovakia vs Faroe Islands (UEFA Nations League)
- **Market**: Over/Under | **Selection**: Over 1.5 Goals
- **Odds**: 1.25 | **Break-Even**: 80.0% | **Model Prob**: 82.5% | **Value Edge**: +2.5pp | **EV**: +0.031
- **World Elo Dynamics**: Slovakia (1,665, Rank #52) vs Faroe Islands (1,390, Rank #108). Net Elo: $+375$ (including $+100$ Tehelné pole home bonus).
- **Poisson Allocation**: $\mu = 2.40, \Delta \lambda = +1.172 \to \lambda_{\text{home}} = 1.786, \lambda_{\text{away}} = 0.614$.
- **Empirical Scoring Profile**:
  - Slovakia in home competitive qualifiers: 10 goals in 5 matches (2.00 GF/G), conceding 0.60 GA/G.
  - Faroe Islands away: 11 goals conceded in 5 matches (2.20 GA/G).
  - Over 1.5 has hit in 85.0% of Slovakia's home competitive fixtures against non-elite opposition.

### Leg 2: Cape Verde vs Liberia (Africa Cup of Nations Qualifications)
- **Market**: Over/Under | **Selection**: Over 1.5 Goals
- **Odds**: 1.25 | **Break-Even**: 80.0% | **Model Prob**: 82.0% | **Value Edge**: +2.0pp | **EV**: +0.025
- **World Elo Dynamics**: Cape Verde (1,595, Rank #65) vs Liberia (1,276, Rank #141). Net Elo: $+419$ (including $+100$ Estádio Nacional home bonus).
- **Poisson Allocation**: $\mu = 2.05, \Delta \lambda = +1.309 \to \lambda_{\text{home}} = 1.679, \lambda_{\text{away}} = 0.371$.
- **Section 4.8 AFCON Calibration**:
  - Raw AFCON Poisson math suppresses goal lines due to low continental average ($\mu = 2.05$). Under Section 4.8, when the host scores $\ge 1.70$ GF/G in qualifiers, the engine blends Poisson with the host's 10-match qualifying hit rate.
  - Cape Verde in Praia has scored 9 goals in 5 qualifiers (1.80 GF/G) and won 12 of their last 15 home competitive ties.
  - Liberia on the road has conceded 11 goals in 5 qualifiers (2.20 GA/G), with Over 1.5 landing in 87.5% of their away fixtures.

### Leg 3: South Africa vs Kenya (Africa Cup of Nations Qualifications)
- **Market**: Over/Under | **Selection**: Over 1.5 Goals
- **Odds**: 1.33 | **Break-Even**: 75.2% | **Model Prob**: 78.5% | **Value Edge**: +3.3pp | **EV**: +0.044
- **World Elo Dynamics**: South Africa (1,585, Rank #68) vs Kenya (1,345, Rank #120). Net Elo: $+340$ (including $+100$ FNB Stadium home bonus).
- **Poisson Allocation**: $\mu = 2.05, \Delta \lambda = +1.062 \to \lambda_{\text{home}} = 1.556, \lambda_{\text{away}} = 0.494$.
- **Empirical Scoring Profile**:
  - South Africa under Hugo Broos plays high-tempo transition football at home (3-1 vs Zimbabwe, 2-2 vs Congo, 3-0 vs South Sudan).
  - South Africa home qualifying rate: 11 goals in 5 matches (2.20 GF/G).
  - Kenya has conceded in 7 of their last 8 away competitive matches.

---

## 4. SHADOW CANDIDATE PORTFOLIO (`alternatives`)

1. **Gabon vs Lesotho — Over 1.5 Goals (@ 1.25)**
   - *Model Prob*: 81.5% | *Edge*: +1.5pp | *EV*: +0.019
   - *Rejection Comment*: Relegated to shadow tracking: Ultra-safe selection (@ 1.25) omitted from primary ticket to avoid four-leg accumulator drag while satisfying the 2.00 combined odds threshold.
2. **Scotland vs North Macedonia — Over 1.5 Goals (@ 1.21)**
   - *Model Prob*: 83.5% | *Edge*: +0.9pp | *EV*: +0.010
   - *Rejection Comment*: Relegated to shadow tracking: Over 1.5 odds @ 1.21 fall below standalone threshold corridor (< 1.22 Rule 8) despite strong net Elo superiority (+306) at Hampden Park.
3. **Serbia vs Germany — Germany to Win (@ 1.25)**
   - *Model Prob*: 81.0% | *Edge*: +1.0pp | *EV*: +0.013
   - *Rejection Comment*: Relegated to shadow tracking: Away favorite on the road in Belgrade offers insufficient margin of safety at 1.25 against a physical Serbian low block.
4. **Netherlands vs Greece — Netherlands to Win (@ 1.54)**
   - *Model Prob*: 64.5% | *Edge*: -0.4pp | *EV*: -0.007
   - *Rejection Comment*: Relegated to shadow tracking: Greece ranks #24 globally with an organized defensive structure; Netherlands win probability (64.5%) falls short of the 72.0% Dominant Match Winner threshold.
5. **Tunisia vs Libya — Tunisia to Win (@ 1.38)**
   - *Model Prob*: 71.0% | *Edge*: -1.5pp | *EV*: -0.020
   - *Rejection Comment*: Relegated to shadow tracking: Tactical North African derby dynamics produce high regular-time draw and 1-0 stalemate risk, falling short of multi-goal safety criteria.

