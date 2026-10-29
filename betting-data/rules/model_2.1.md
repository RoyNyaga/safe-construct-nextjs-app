# BETTING MODEL VERSION 2.1 — OVER 1.5 FOCUSED

## MODEL NAME

Roy Betting Engine — Over 1.5 Focus


## 1. OBJECTIVE

Identify football selections with the highest statistically supported probability of finishing with at least two total goals, using Over 1.5 Goals as the primary market.

The model must distinguish historical performance from expected goals and from the probability of the next match producing at least two goals.

The goal is to improve decision quality through reliable statistics, reproducible calculations, explicit risk assessment, and continuous calibration against actual results.


## 2. CORE PRINCIPLES

1. Probability of winning is the primary selection criterion.
2. Evidence quality and statistical reliability must be assessed before trusting a probability.
3. Historical goals, expected goals (λ), and Over 1.5 probability are three separate concepts.
4. Expected goals must be calculated using a documented and repeatable methodology.
5. The same expected-goals inputs must always produce the same raw Poisson probability.
6. Contextual factors must not be used to justify arbitrary probability adjustments.
7. Market odds, break-even probability, probability edge, and expected value must be reported.
8. Do not select a weak-probability match simply because its odds offer apparent value.
9. Do not reject a strong-probability selection solely because its calculated EV is negative, but clearly report the pricing disadvantage.
10. Never force selections to reach a target combined odd.
11. If the data is unreliable or no sufficiently strong selections exist, return NO BET.
12. No prediction is guaranteed to win.
13. Every material warning must be recorded using a standardized warning type.
14. Warning types must be consistent across matches so they can be filtered, counted, compared, and evaluated during model learning.
15. Warnings are evidence about risk or uncertainty; they must not automatically change the numerical probability.
16. A warning may justify CAUTION or NO BET when its severity and unresolved evidence materially weaken the suitability of the selection.
17. Human-readable comments must explain the warning, while structured warning fields must preserve it in a machine-readable form.
18. Post-match analysis must evaluate whether important warnings were confirmed, not confirmed, or inconclusive.
19. The warning system must be used to improve decision quality without changing the underlying probability calculations unless a separately validated numerical adjustment method exists.
20. The model must distinguish between a warning caused by poor data quality and a warning caused by evidence that directly challenges the Over 1.5 probability.


## 3. FIXTURE AND DATA VERIFICATION

Before analysing a match:

- Verify the teams, competition, date, venue, and home/away designation.
- Confirm that the fixture is a league match wherever possible.
- Prioritize current-season league statistics.
- Identify the number of matches played by each team.
- Separate home and away statistics.
- Verify that the statistics belong to the correct competition and season.
- Check that the goals scored, goals conceded, match counts, and recent results are internally consistent.
- Identify the source and date of important statistics where possible.
- Check whether the match is postponed, completed, or otherwise unsuitable for pre-match analysis.

Do not silently combine statistics from different seasons, competitions, or teams.

If sources disagree, investigate the discrepancy. If it cannot be resolved, mark the analysis PROVISIONAL, explain the conflict, and reduce confidence in the estimate.

Do not invent missing statistics or treat an unavailable injury report as confirmation that all players are fit.


## 4. THE THREE CORE CONCEPTS

### 4.1 Historical goals

Historical goals describe what has already happened.

Record, wherever available:

- Total league matches played.
- Total goals scored and conceded.
- Goals scored and conceded per match.
- Home matches played, goals scored, goals conceded, and corresponding averages.
- Away matches played, goals scored, goals conceded, and corresponding averages.
- Recent 5–10 league-match results.
- Recent Over 1.5 frequency.
- League average goals per match.
- Strength of the opponents faced.

Historical goals are evidence for estimating future performance. They are not the probability of the next match producing Over 1.5.


### 4.2 Expected goals (λ)

Expected goals represent the estimated number of goals each team will score in the specific upcoming match.

Calculate:

- λ_home: expected goals for the home team.
- λ_away: expected goals for the away team.
- λ_total = λ_home + λ_away.

Expected goals must reflect the teams' attacking strengths, defensive weaknesses, home/away performance, league scoring environment, and opponent strength.

A team's season goal total must never be substituted directly for its expected goals in the upcoming fixture.


### 4.3 Over 1.5 probability

This is the estimated probability that the match finishes with at least two total goals.

Calculate it from λ_total using the Poisson model described below.

The probability is an estimate, not a guarantee. Its reliability depends on the quality of the inputs, the suitability of the model assumptions, and historical calibration.


## 5. EXPECTED-GOALS CALCULATION METHOD

This section is mandatory for every analysed match.


### 5.0 MANDATORY VENUE-SPECIFIC INPUT PROTOCOL & HARD-STOP RULE

To prevent deceptive sample distortion (e.g., teams that score heavily at home but average very few goals away), the expected-goals calculation must **strictly and exclusively** use venue-specific performance:

1. **Home Team at Home (Schema: `home_matches_played`, `home_goals_scored`, `home_goals_conceded`, `home_goals_per_game`, `home_conceded_per_game`)**:
   - `home_matches_played`: Matches played strictly as host.
   - `home_goals_scored`: Goals scored strictly at home ground.
   - `home_goals_conceded`: Goals conceded strictly at home ground.
   - `home_goals_per_game` = `home_goals_scored` ÷ `home_matches_played`
   - `home_conceded_per_game` = `home_goals_conceded` ÷ `home_matches_played`

2. **Away Team Away (Schema: `away_matches_played`, `away_goals_scored`, `away_goals_conceded`, `away_goals_per_game`, `away_conceded_per_game`)**:
   - `away_matches_played`: Matches played strictly as visitor.
   - `away_goals_scored`: Goals scored strictly on the road.
   - `away_goals_conceded`: Goals conceded strictly on the road.
   - `away_goals_per_game` = `away_goals_scored` ÷ `away_matches_played`
   - `away_conceded_per_game` = `away_goals_conceded` ÷ `away_matches_played`

> [!CAUTION]
> **CRITICAL HARD-STOP RULE**:
> - If ANY of the 6 venue-specific values listed above are missing or cannot be verified, the model/agent **MUST NOT PROCEED WITH ANY PROBABILITY OR EXPECTED VALUE CALCULATIONS**.
> - Full-season overall aggregates must **NEVER** be substituted as a mathematical proxy for venue performance.
> - The analyst/agent must immediately halt the calculation for that match, assign the status **INSUFFICIENT DATA / MISSING VENUE DATA**, and report to the user:
>   *"Could not calculate probabilities for [Match Name] due to missing venue-specific home/away statistics."*

> [!IMPORTANT]
> **ALTERNATIVE PARITY RULE & VENUE VS. OVERALL STATS SEPARATION**:
> All betting alternatives (`betting_alternatives`) are considered-and-rejected betting options that require the exact same depth of statistical tracking as primary selections. Omitting venue or overall statistics from alternatives is strictly prohibited.
> Both selections and alternatives must record two clearly separated statistical baselines:
> 1. **Venue Performance Metrics (Direct Poisson Engine Inputs)**:
>    - `home_league_position`, `away_league_position`
>    - `home_matches_played`, `away_matches_played` (Strictly venue matches: home @ home, away @ away)
>    - `home_goals_scored`, `home_goals_conceded` (Strictly venue goals)
>    - `away_goals_scored`, `away_goals_conceded` (Strictly venue goals)
>    - `home_goals_per_game`, `home_conceded_per_game` (`home_goals_scored ÷ home_matches_played`)
>    - `away_goals_per_game`, `away_conceded_per_game` (`away_goals_scored ÷ away_matches_played`)
>    *Mathematical Invariant: Venue goals ÷ matches played must equal the per-game rate (±0.05 rounding).*
> 2. **Season Overall Metrics (All Venues Combined — Contextual Form Record)**:
>    - `home_overall_matches_played`, `away_overall_matches_played` (Total games across all venues)
>    - `home_overall_goals_scored`, `home_overall_goals_conceded` (Total season goals)
>    - `away_overall_goals_scored`, `away_overall_goals_conceded` (Total season goals)
>    - `home_overall_goals_per_game`, `home_overall_conceded_per_game` (Season-wide rate)
>    - `away_overall_goals_per_game`, `away_overall_conceded_per_game` (Season-wide rate)
>    *Note: Poisson calculations strictly use venue-specific per-game rates; season-overall metrics provide macro context and do not distort venue expected goals.*


### 5.1 Establish league scoring baselines

Calculate, from the same league and relevant season:

- League home scoring average: average goals scored by home teams per league match.
- League away scoring average: average goals scored by away teams per league match.


### 5.1A Dual-Baseline Protocol (Current Primary vs. Historical Benchmark)

To balance early-season sample volatility against cross-model determinism, Model 2.1 employs a **Dual-Baseline Framework**:

1. **Primary Model (Current-Season Live Averages)**:
   - Sourced from actual goals scored across all division matches in the active season (`current_league_home_avg`, `current_league_away_avg`).
   - Drives all operational metrics: $\lambda_{\text{primary}}$, **Estimated Probability**, **Break-Even Probability**, **Value Edge**, **Expected Value (EV)**, and all warnings/verdicts (`SELECT` / `CAUTION` / `NO BET`).
2. **Historical Benchmark (Competition Baseline Reference)**:
   - Sourced from locked multi-year averages in `betting-data/rules/league_baselines.json` (`historical_league_home_avg`, `historical_league_away_avg`).
   - Computes companion expected goals and **`historical_estimated_probability`**.
   - Acts as an objective cross-check against early-season volatility without altering the primary verdict.
3. **Alignment Metric & Consensus Classification (`alignment_delta_pp` & `alignment_remark`)**:
   - $\text{Delta} = |P_{\text{primary}} - P_{\text{historical}}| \times 100$ (measured in absolute percentage points, $\ge 0$).
   - Standard 5-tier consensus categories:
     - **Very High Alignment** (`very_high`, $\Delta \le 1.5$ pp): Optimal mathematical consensus; historical benchmark strongly corroborates live signal.
     - **High Alignment** (`high`, $1.6 \le \Delta \le 3.0$ pp): Strong statistical agreement; historical baseline reinforces primary model.
     - **Medium Alignment** (`medium`, $3.1 \le \Delta \le 5.0$ pp): Moderate divergence; typical mid-season transition drift or shifting team dynamics.
     - **Low Alignment** (`low`, $5.1 \le \Delta \le 7.0$ pp): Substantial divergence; significant tension between historical trend and active season output.
     - **Very Low Alignment** (`very_low`, $\Delta > 7.0$ pp): Severe divergence; extreme early-season distortion, blowout bias, or structural change; exercise heightened scrutiny.
   - Both `alignment_delta_pp` and `alignment_remark` are persisted in the database schema (`betting_selections` and `betting_alternatives`) and exported in ticket payloads to facilitate long-term consensus analysis.


### 5.2 Calculate attacking and defensive strength

For the home team:

Home attacking strength =
Home team's goals scored per home match ÷ League home scoring average.

Away defensive weakness =
Away team's goals conceded per away match ÷ League home scoring average.

For the away team:

Away attacking strength =
Away team's goals scored per away match ÷ League away scoring average.

Home defensive weakness =
Home team's goals conceded per home match ÷ League away scoring average.

A strength or weakness index above 1.00 indicates a rate above the corresponding league baseline; below 1.00 indicates a rate below it.

These ratios are initial indicators, not definitive measures of team quality. They must be checked against overall performance, sample size, and opponent strength.


### 5.3 Calculate baseline expected goals

When the required league and team data is available:

λ_home_base =
League home scoring average × Home attacking strength × Away defensive weakness.

λ_away_base =
League away scoring average × Away attacking strength × Home defensive weakness.

λ_total_base = λ_home_base + λ_away_base.

This is a reproducible baseline calculation, not a complete prediction by itself. When Dual-Baseline Protocol is active, this equation is computed for both the primary baseline and the historical benchmark baseline.


### 5.4 Account for sample size and reliability

Home/away records can be misleading when a team has played only a few matches at that venue.

Therefore:

- Give greater weight to relevant home/away performance when the sample is sufficiently large.
- Compare home/away rates against the team's overall performance.
- Consider the league average as a stabilizing baseline when team samples are small.
- Use recent 5–10 match statistics as supporting evidence, not as an independent extra sample that can be added without adjustment.
- Do not overreact to a short winning or losing streak.
- Flag promoted teams, newly reorganized leagues, major coaching changes, or unusual seasons when historical comparisons may be unreliable.

Where possible, blend team estimates with the league baseline using a documented weighting or statistical shrinkage method. Record the method and weights used.

If no validated weighting method is available, do not pretend the inputs are more precise than they are. Report the provisional estimate and its limitations.


### 5.5 Opponent-strength adjustment

The model must consider the quality of the teams faced when interpreting attacking and defensive statistics.

Check:

- Opponents' defensive strength when evaluating a team's scoring record.
- Opponents' attacking strength when evaluating a team's goals conceded.
- Home/away differences in the opposition faced.
- League position and performance indicators where relevant.
- Whether recent goal totals were inflated by unusually weak opponents.

Do not apply arbitrary numerical corrections for opponent strength. Use a documented statistical adjustment if available; otherwise, describe the evidence qualitatively and flag the remaining uncertainty.


### 5.6 Recent form

Review recent league matches, normally the last 5–10 games.

Record goals scored, goals conceded, Over 1.5 frequency, clean sheets, and relevant attacking or defensive changes.

Recent form should help detect a change in performance, not automatically override a larger season sample. Avoid double-counting the same matches in both season and recent-form calculations.


### 5.7 Expected-goals output

Every analysis must display:

- λ_home_base.
- λ_away_base.
- λ_total_base.
- The key statistics used to calculate each value.
- The method used to account for small samples and opponent strength.
- Any missing or unreliable inputs.

Never accept an expected-goals figure from an external preview as the model's own calculated value without identifying its source and methodology.


## 6. POISSON PROBABILITY CALCULATION

Assuming total match goals follow a Poisson distribution with mean λ_total:

P(0 goals) = e^(-λ_total).

P(1 goal) = λ_total × e^(-λ_total).

Therefore:

P(Over 1.5) = 1 − e^(-λ_total) × (1 + λ_total).

The raw probability must be calculated directly from the recorded λ_total.

For example, when λ_total = 2.37:

Raw Over 1.5 probability ≈ 68.5%.

If two matches use the same λ_total, they must have the same raw Poisson probability. Any difference in their final assessments must be explained separately.

The model must never change the raw probability to match a desired confidence label or bookmaker price.


## 7. RAW PROBABILITY, CONTEXT, AND FINAL ESTIMATE

Every analysis must distinguish:

1. Baseline expected goals and raw Poisson probability.
2. Verified contextual evidence that may change the assessment.
3. Final estimated probability, or an explicitly provisional estimate where uncertainty is substantial.

Review the following:

- Current-season league statistics.
- Home/away statistics.
- Recent form and sample size.
- Opponent strength.
- Head-to-head results.
- Injuries and suspensions.
- Tactical and match context.
- League scoring environment.
- Data quality and source consistency.


### Rules for contextual adjustments

Do not add or subtract arbitrary percentage points because a team has injuries, poor form, a particular H2H record, or other contextual factors.

When a contextual factor can be translated into a defensible numerical adjustment, document the evidence, adjustment method, and resulting change in expected goals. Recalculate the probability from the adjusted λ_total.

Only use numerical adjustment coefficients that are supported by a documented statistical method or validated historical data.

If a factor cannot be quantified reliably:

- Keep the raw Poisson probability unchanged.
- Report the factor as a standardized warning or supporting signal.
- Explain how it affects confidence in the estimate.
- Use a provisional status or uncertainty range when justified.
- Do not convert the warning into an arbitrary probability reduction.

Warnings therefore operate primarily as an evidence and decision-quality layer, not as an automatic probability-adjustment mechanism.

Do not count the same evidence twice. For example, if a missing striker has already influenced a validated attacking estimate, do not apply a second arbitrary penalty for the same absence.

Where the model has not been calibrated sufficiently to justify contextual adjustments, present the raw Poisson probability as the primary numerical estimate and keep the qualitative assessment separate.

A warning may affect the final VERDICT even when it does not change the numerical probability.


## 8. HOME/AWAY ANALYSIS

For every match, report:

- Home team's home matches played, goals scored, goals conceded, and averages.
- Away team's away matches played, goals scored, goals conceded, and averages.
- Overall league performance for both teams.
- The number of matches in each sample.

Home/away statistics should be weighted according to relevance and reliability, not automatically given full priority when the sample is small.


## 9. RECENT FORM

Analyse recent league matches, normally the last 5–10 games.

Record:

- Results and opponents.
- Goals scored and conceded.
- Over 1.5 and Under 1.5 frequencies.
- Home/away context where relevant.
- Evidence of genuine attacking or defensive changes.
- Whether recent results may reflect unusually weak or strong opposition.

Do not use a short recent streak as definitive proof of future performance.


## 10. HEAD-TO-HEAD ANALYSIS

H2H is supporting evidence, not the primary predictor.

Review:

- Recent meetings and their dates.
- Number of meetings considered.
- Over 1.5 frequency.
- Frequency of 0–0, 1–0, and 0–1 results.
- Average goals.
- Whether managers, squads, tactical systems, or competition circumstances have changed.

A repeated low-scoring pattern can trigger the standardized warning type:

`H2H_LOW_GOALS`

A H2H warning must explain:

- The observed low-scoring pattern.
- The number of relevant meetings.
- Why the pattern is relevant to Over 1.5.
- Whether the H2H evidence directly conflicts with the current-season statistical signal.
- Whether the H2H evidence is still relevant given squad, manager, tactical, or competition changes.

Old or weakly relevant H2H evidence should not be treated as a strong warning.

H2H warnings must not automatically change λ or the raw Poisson probability.

Old H2H results must not automatically override stronger current-season evidence.

If the H2H pattern is materially contradictory to the model signal, record it as a warning and consider whether the final verdict should be CAUTION or NO BET.


## 11. INJURIES, SUSPENSIONS, AND TEAM NEWS

Check the availability of:

- Main strikers and high-scoring attackers.
- Creative midfielders and key chance creators.
- Starting goalkeepers.
- Key defenders.
- Multiple players absent from the same position.

Assess the likely impact on goal production or goals conceded rather than simply counting unavailable players.

Examples:

- Missing main striker: possible reduction in attacking expectation.
- Missing several important defenders: possible increase in the opponent's scoring expectation.
- Weak backup goalkeeper: possible defensive concern.
- Multiple attacking absences: possible reduction in expected goals.

State the source and verification status where possible.

If reliable team news is unavailable, explicitly write:

`Injuries/team news not verified.`

When team news creates a material concern but cannot be quantified using a validated method, record a standardized warning such as:

`TEAM_NEWS_UNVERIFIED`

or, where a verified absence creates a material goal-related concern:

`KEY_ATTACKER_ABSENCE`

`KEY_DEFENDER_ABSENCE`

`GOALKEEPER_ABSENCE`

`MULTIPLE_ATTACKING_ABSENCES`

`MULTIPLE_DEFENSIVE_ABSENCES`

Do not make numerical changes without a defensible adjustment method.

A team-news warning does not automatically reduce the model probability. It affects the evidence quality and final decision assessment unless a validated numerical adjustment is available.


## 12. TACTICAL AND MATCH CONTEXT

Review relevant factors, including:

- Promotion, relegation, or playoff pressure.
- Rotation and fixture congestion.
- Defensive or attacking tactical approaches.
- Whether a team is likely to protect a narrow lead.
- Motivation and competition circumstances.
- Weather or pitch conditions when genuinely relevant.

These factors support the statistical assessment; they do not replace it.

Record material unquantified concerns using standardized warning types.

Possible tactical/context warnings include:

`TACTICAL_LOW_GOAL_RISK`

`ROTATION_RISK`

`FIXTURE_CONGESTION`

`MOTIVATION_RISK`

`COMPETITION_CONTEXT`

`WEATHER_PITCH_RISK`

`DEFENSIVE_APPROACH`

`LEAD_PROTECTION_RISK`

Do not create a warning merely because a contextual factor exists.

A warning should only be recorded when there is a reasonable explanation for why the factor could materially affect the Over 1.5 market or the reliability of the model estimate.

Do not use these warnings to justify arbitrary probability adjustments.

When the factor cannot be quantified reliably, keep the numerical probability unchanged and document the concern separately.


## 13. DATA QUALITY AND UNCERTAINTY

Before recommending a match, assess whether the model has enough reliable information.

Flag:

- Missing home/away splits.
- Very small samples.
- Conflicting sources.
- Unverified injuries or suspensions.
- Uncertain league averages.
- Recent coaching or tactical changes.
- Missing or inconsistent results.
- Statistics from different seasons or competitions.

Use standardized data-quality warning types where applicable:

`SMALL_SAMPLE`

`MISSING_HOME_AWAY_DATA`

`CONFLICTING_SOURCES`

`TEAM_NEWS_UNVERIFIED`

`UNCERTAIN_LEAGUE_BASELINE`

`RECENT_COACHING_CHANGE`

`INCONSISTENT_RESULTS`

`MIXED_SEASON_COMPETITION_DATA`

`OPPONENT_STRENGTH_UNCERTAINTY`

`DATA_CONFLICT`

Use these status labels:

- VERIFIED: All mandatory venue-specific statistics (Home GF/GA at home, Away GF/GA away) and league baselines are consistent and confirmed.
- PROVISIONAL: Venue statistics are verified but sample size is small (< 5 matches) or contextual factors (such as unverified lineups) create moderate uncertainty.
- INSUFFICIENT DATA: Mandatory venue-specific home/away statistics are missing or unverified. In this state, probability and value calculations MUST NOT be performed.

Do not display excessive decimal precision that the data does not support. A numerical probability is not automatically reliable just because a formula calculates it. Never substitute overall season averages when venue-specific splits are missing.

When justified by the evidence, report an uncertainty range. Clearly distinguish this from the raw Poisson probability.

Data-quality warnings must be distinguished from market-risk warnings.

A match where venue-specific statistics are missing MUST immediately receive INSUFFICIENT DATA status with no calculated probability.


## 14. PROBABILITY CONFIDENCE LABELS

Use these descriptive labels for the estimated Over 1.5 probability:

- 90% or higher: Extremely strong.
- 85–89%: Very strong.
- 80–84%: Strong.
- 75–79%: Good.
- 70–74%: Moderate.
- Below 70%: Weak for the Over 1.5-focused strategy.

These labels describe the estimated probability; they do not measure data quality or guarantee a win.

Always report data reliability separately. A high numerical estimate based on poor data must not be presented as a highly reliable selection.


## 15. BOOKMAKER ODDS AND MARKET VALUE

Record the actual available odds supplied or verified for the selection.

Calculate:

Break-even probability = 1 ÷ Decimal odds.

Probability edge (`edge_percentage_points`) = (Model probability − Break-even probability) × 100.

Expected value per unit staked = (Model probability × Decimal odds) − 1.

Express the edge in percentage points and EV as a percentage.

### 15.1 Value Edge Categorization (`edge_remark`)

To evaluate market edge systematically across historical archives, value edges are classified into 5 standardized tiers persisted under `edge_remark`:

- **Very High Edge** (`very_high`, $\text{Edge} > +15.0$ pp): Massive pricing inefficiency or significant model divergence in favor of the bettor.
- **High Edge** (`high`, $+5.0 < \text{Edge} \le +15.0$ pp): Strong, healthy positive value edge representing favorable market mispricing.
- **Medium Edge** (`medium`, $0.0 \le \text{Edge} \le +5.0$ pp): Modest to marginal positive value edge; fairly priced to slight advantage.
- **Low Edge** (`low`, $-10.0 \le \text{Edge} < 0.0$ pp): Mild negative expected value; absorbs standard bookmaker margin/vig.
- **Very Low Edge** (`very_low`, $\text{Edge} < -10.0$ pp): Severe pricing disadvantage / heavy negative expected value; strictly rejected under Model Principle 8.

Both `edge_percentage_points` and `edge_remark` are persisted across selections and alternatives in the database schema and export payloads.

Use the final model probability in these calculations and clearly identify whether it is provisional.

Market value is secondary to the model's primary objective of identifying strong probabilities, but it must remain visible. A high-probability selection with negative EV can still be reported, provided its pricing disadvantage is explicit.

Do not claim a selection has positive value merely because its estimated probability is high. Value depends on both probability and price.


## 16. NEGATIVE CHECKS AND WARNING SYSTEM

The model must actively search for evidence that may make the Over 1.5 probability misleading, unreliable, or less suitable for selection.

Warnings are a mandatory part of the pre-match analysis.

The analyst must not only search for evidence supporting the model probability. The analyst must actively search for contradictory evidence.


### 16.1 Warning categories

Warnings must use standardized types.

The following warning types are the approved core categories:


#### A. H2H WARNINGS

`H2H_LOW_GOALS`

Repeated low-scoring H2H results that directly create concern for Over 1.5.

`H2H_CONTRADICTORY`

H2H evidence materially conflicts with the current statistical signal but does not necessarily constitute a repeated low-goal pattern.


#### B. ATTACKING / SCORING WARNINGS

`LOW_ATTACKING_FORM`

Recent attacking performance is materially weaker than the broader statistical profile.

`LOW_HOME_SCORING`

The home team's relevant home scoring rate is unusually low.

`LOW_AWAY_SCORING`

The away team's relevant away scoring rate is unusually low.

`MULTIPLE_ATTACKING_ABSENCES`

Several important attacking players are unavailable.

`KEY_ATTACKER_ABSENCE`

A particularly important attacking player is unavailable.


#### C. DEFENSIVE / MATCHUP WARNINGS

`STRONG_DEFENSIVE_MATCHUP`

The matchup contains credible evidence of defensive resistance that may suppress total goals.

`KEY_DEFENDER_ABSENCE`

A key defender is unavailable and creates a potentially important change in the defensive profile.

`GOALKEEPER_ABSENCE`

A relevant goalkeeper absence may materially change defensive performance.

`MULTIPLE_DEFENSIVE_ABSENCES`

Several important defensive players are unavailable.

`DEFENSIVE_APPROACH`

There is credible evidence of an unusually defensive tactical approach.


#### D. SAMPLE / DATA WARNINGS

`SMALL_SAMPLE`

The relevant statistical sample is too small to provide strong confidence.

`MISSING_HOME_AWAY_DATA`

Required venue-specific statistics are unavailable.

`CONFLICTING_SOURCES`

Reliable sources provide materially different figures.

`DATA_CONFLICT`

Different available evidence produces a material conflict that cannot be fully resolved.

`INCONSISTENT_RESULTS`

The available historical results or statistics contain material inconsistencies.

`UNCERTAIN_LEAGUE_BASELINE`

The league scoring baseline is uncertain because of insufficient or unreliable data.

`MIXED_SEASON_COMPETITION_DATA`

The evidence combines seasons or competitions in a way that reduces reliability.


#### E. OPPONENT-STRENGTH WARNINGS

`OPPONENT_STRENGTH_UNCERTAINTY`

The team's scoring or defensive record may be materially influenced by the quality of opponents faced.

`WEAK_OPPONENT_INFLATION`

Recent goal production may be inflated by unusually weak opposition.

`STRONG_OPPONENT_SUPPRESSION`

Recent goal production may be suppressed by unusually strong opposition.


#### F. TEAM NEWS WARNINGS

`TEAM_NEWS_UNVERIFIED`

Relevant team news could not be reliably verified.

`KEY_LINEUP_UNCERTAINTY`

The likely lineup contains important uncertainty that may affect the goal environment.


#### G. TACTICAL / MATCH CONTEXT WARNINGS

`ROTATION_RISK`

Significant rotation is possible.

`FIXTURE_CONGESTION`

Fixture congestion may materially affect team performance.

`MOTIVATION_RISK`

There is credible uncertainty about motivation or competitive incentives.

`COMPETITION_CONTEXT`

The competition circumstances may create an unusual tactical or scoring environment.

`LEAD_PROTECTION_RISK`

A team may be likely to become significantly more defensive after taking a lead.

`TACTICAL_LOW_GOAL_RISK`

The expected tactical approach creates a specific risk to Over 1.5.

`WEATHER_PITCH_RISK`

Weather or pitch conditions may materially affect scoring.


### 16.2 Warning severity

Each warning must receive one severity level:

`LOW`

The warning is relevant but has limited evidence or limited expected importance.

`MEDIUM`

The warning is supported by meaningful evidence and should influence the final assessment.

`HIGH`

The warning is strongly supported, directly relevant to Over 1.5, or materially conflicts with the model signal.

Severity describes the strength of the warning evidence.

It does not represent a numerical probability reduction.


### 16.3 Market relevance

Each warning must also receive one market-relevance classification:

`DIRECT`

The warning has a clear and direct relationship with the probability of at least two goals.

Examples:

- Repeated 0–0 / 1–0 H2H pattern.
- Very low home scoring.
- Multiple important attacking absences.
- Strong defensive matchup.

`INDIRECT`

The warning may affect the reliability or interpretation of the model but does not directly determine the goal outcome.

Examples:

- Small sample.
- Opponent-strength uncertainty.
- Recent coaching change.

`DATA_QUALITY`

The warning primarily concerns whether the numerical estimate can be trusted.

Examples:

- Conflicting sources.
- Missing home/away data.
- Unverified statistics.


### 16.4 Warning documentation

Every material warning must contain:

- Warning type.
- Severity.
- Market relevance.
- Evidence.
- Why it matters.
- Whether it conflicts with the model signal.
- Whether it has caused a numerical adjustment.
- Whether the information is verified.

The default value for numerical adjustment is:

`false`

unless a separately validated adjustment method exists.


### 16.5 Warnings must not automatically change probability

A warning does not automatically reduce or increase the calculated probability.

For example:

A match may have:

- Raw Poisson probability: 88%
- H2H low-goal warning: HIGH
- Direct market relevance: DIRECT

The model must still report the 88% raw probability unless a validated numerical adjustment method exists.

The warning instead tells the decision system that the 88% estimate contains a material contradictory signal.


### 16.6 Warning conflict with model signal

Every material warning should be classified as either:

`SUPPORTING`

The evidence supports the model's Over 1.5 assessment.

`CONTRADICTORY`

The evidence challenges the model's Over 1.5 assessment.

`NEUTRAL`

The evidence does not materially support or contradict the probability but is relevant to reliability.

This classification is qualitative and does not modify λ or the Poisson calculation.


### 16.7 When warnings affect the verdict

Warnings do not automatically cancel a selection.

However:

- Multiple MEDIUM warnings may justify CAUTION.
- A HIGH DIRECT warning may justify CAUTION even when the numerical probability is strong.
- A major unresolved warning may justify NO BET when the reliability of the selection becomes unacceptable.
- A data-quality warning may cause PROVISIONAL or INSUFFICIENT DATA status.
- A contradictory warning must be explicitly considered before SELECT is issued.

The final verdict must therefore consider both:

1. The numerical probability.
2. The quality and direction of the evidence surrounding that probability.


### 16.8 No arbitrary warning penalties

Never convert warning severity into an arbitrary percentage reduction.

For example, do not use rules such as:

- HIGH warning = −10%.
- MEDIUM warning = −5%.
- LOW warning = −2%.

No such automatic numerical penalties are permitted.

The warning system is qualitative unless and until a separate validated statistical adjustment is developed and approved.


### 16.9 Mandatory negative check

Before a match can receive SELECT, explicitly ask:

"What evidence could make this Over 1.5 probability wrong?"

The analysis must actively search for:

- Low-goal H2H patterns.
- Weak attacking form.
- Low home/away scoring.
- Strong defensive matchups.
- Important attacking absences.
- Tactical low-goal risks.
- Weak or misleading opposition samples.
- Small samples.
- Data conflicts.
- Unverified team news.
- Other material contradictory evidence.

If no meaningful warning is found, record:

`NO MATERIAL WARNING IDENTIFIED`

This is preferable to leaving the warning field blank.


## 16A. WARNING CLASSIFICATION AND POST-MATCH TRACKING

The warning system must preserve structured information that can later be filtered, counted, compared, and evaluated statistically.


### 16A.1 Standard warning structure

Each warning should follow this conceptual structure:

- `type`
- `severity`
- `market_relevance`
- `direction`
- `description`
- `evidence`
- `verified`
- `numerical_adjustment`
- `post_match_status`

Example:

"warnings": [
  {
    "type": "H2H_LOW_GOALS",
    "severity": "HIGH",
    "market_relevance": "DIRECT",
    "direction": "CONTRADICTORY",
    "description": "Recent H2H meetings show a recurring low-goal pattern.",
    "evidence": "Recent meetings include 0-0 and 1-0 results.",
    "verified": true,
    "numerical_adjustment": false,
    "post_match_status": "PENDING"
  }
]

This structure is conceptual model output. The application/database implementation is defined separately during the tracker architecture phase.


### 16A.2 Warning status before the match

Before the match, use:

`PENDING`

This means the warning has been identified but its predictive usefulness has not yet been evaluated.


### 16A.3 Post-match warning evaluation

After the match, evaluate each important warning using:

`CONFIRMED`

The match result provides evidence consistent with the warning.

`NOT_CONFIRMED`

The match result provides evidence that the warning did not materialize as expected.

`INCONCLUSIVE`

The match result does not provide enough information to determine whether the warning was genuinely useful.

`NOT_APPLICABLE`

The warning became irrelevant because the underlying circumstance changed before or during the match.


### 16A.4 Warning evaluation must not be outcome-only

A warning should not automatically be considered successful merely because the selection lost.

Likewise, a warning should not automatically be considered wrong merely because the selection won.

Evaluate whether the warning correctly identified the underlying risk.

Example:

If a HIGH `H2H_LOW_GOALS` warning was issued and the match finished 0–0, the warning may be classified `CONFIRMED`.

If the match finished 3–2, the warning may be classified `NOT_CONFIRMED`.

If a major lineup change occurred before kickoff and made the original warning irrelevant, it may be `NOT_APPLICABLE`.


### 16A.5 Warning learning

After sufficient observations, analyze:

- Frequency of each warning type.
- Win/loss rate when the warning was present.
- Warning performance by severity.
- Warning performance by market relevance.
- Warning performance when classified as contradictory.
- Warning performance by league.
- Warning performance by data-quality status.
- Whether certain warnings are consistently useful.
- Whether certain warnings create excessive false alarms.

Do not conclude that a warning is predictive from only a few matches.

The warning system must be evaluated over a sufficiently large sample.


### 16A.6 Warning and model probability remain separate

Warning statistics must not be used to silently modify the current probability calculation.

Any future numerical use of warning information requires a separately documented and validated statistical method.

Until such a method is validated, warnings remain a structured qualitative evidence layer.


## 17. FINAL DECISION RULE

Evaluate matches in this order:

1. Is the fixture and data verified?
2. What do the historical statistics show?
3. What are the calculated home and away expected goals?
4. What is the raw Poisson Over 1.5 probability?
5. What evidence supports the probability?
6. What contradictory evidence or warnings exist?
7. What is the severity and market relevance of each material warning?
8. How reliable is the estimate?
9. What are the bookmaker's break-even probability, edge, and EV?
10. Is the selection strong enough to recommend after considering both probability and warnings?

Before SELECT, explicitly complete the negative check:

`What evidence could make this probability wrong?`

Possible verdicts:

SELECT: Strong, evidence-supported probability with acceptable data reliability and no unresolved disqualifying concern.

CAUTION: Potentially viable, but important uncertainty, contradictory evidence, warnings, or incomplete evidence remain.

NO BET: The probability is insufficient, the data is unreliable, or the risks make the selection unsuitable.

A strong numerical probability does not automatically produce SELECT when a major unresolved warning exists.

A warning does not automatically produce NO BET.

The final verdict must reflect the combination of:

- Numerical probability.
- Data reliability.
- Positive evidence.
- Contradictory evidence.
- Warning severity.
- Warning market relevance.
- Market value.
- Remaining uncertainty.

Do not select a low-probability match solely because it has positive EV.

Do not automatically reject a strong-probability selection solely because its EV is negative.

Always disclose the trade-off.

Do not make arbitrary numerical changes because of warnings.


## 18. FINAL MATCH ANALYSIS FORMAT

Every analysed match must include:

FIXTURE:
Competition, date, venue, and verification status.

DATA QUALITY:
Verified, Provisional, or Insufficient Data.

HISTORICAL STATISTICS:
- League matches played.
- Total goals scored and conceded.
- Goals scored/conceded per match.
- Home and away match counts and rates.
- Recent form and sample size.
- League scoring baseline.

EXPECTED GOALS:
- λ_home_base.
- λ_away_base.
- λ_total_base.
- Method and supporting inputs.
- Any documented adjustment and its justification.

OVER 1.5 PROBABILITY:
- Raw Poisson probability.
- Final estimated probability, if a justified adjustment is available.
- Confidence label.
- Data reliability and uncertainty.

BOOKMAKER MARKET:
- Offered odds.
- Break-even probability.
- Probability edge.
- Expected value.

POSITIVE SIGNALS:
- Main evidence supporting Over 1.5.

WARNINGS:
For every material warning:
- Warning type.
- Severity.
- Market relevance.
- Direction: SUPPORTING / CONTRADICTORY / NEUTRAL.
- Evidence.
- Why it matters.
- Verification status.
- Whether a numerical adjustment was applied.

If no material warning exists, explicitly state:

`NO MATERIAL WARNING IDENTIFIED`

CONTEXT AND WARNINGS:
- Positive factors.
- Negative factors.
- H2H warning if relevant.
- Injury and suspension status.
- Tactical/context warnings if relevant.
- Unverified information.
- Remaining uncertainty.

FINAL VERDICT:
SELECT / CAUTION / NO BET.

Explain the principal reasons and the scenarios that could cause the selection to lose.

The numerical probability must remain distinguishable from the qualitative warning assessment.


## 19. TICKET JSON NOTES

The ticket's "notes" attribute must preserve the reasoning behind the selection.

Include:

- Estimated probability and whether it is raw, adjusted, or provisional.
- Expected-goals values and the calculation method.
- Main statistical evidence.
- Important positive factors.
- Structured warnings and unresolved uncertainties.
- Warning severity and market relevance.
- Whether warnings support or contradict the model signal.
- Injury/team-news verification status.
- Offered odds, break-even probability, probability edge, and EV.
- Final verdict.

Warnings should be preserved in structured form when the ticket format supports structured warning data.

The human-readable notes should still summarize the most important warnings in plain language.

Example conceptual structure:

"warnings": [
  {
    "type": "H2H_LOW_GOALS",
    "severity": "HIGH",
    "market_relevance": "DIRECT",
    "direction": "CONTRADICTORY",
    "description": "Recent H2H meetings show a recurring low-goal pattern.",
    "evidence": "Recent meetings include 0-0 and 1-0 results.",
    "verified": true,
    "numerical_adjustment": false,
    "post_match_status": "PENDING"
  }
]

The figures and warning example are illustrative, not a recommendation for a real match.

The warning structure defined here describes the model output. Database fields, API implementation, import/export behavior, filtering, and UI implementation are handled separately during the tracker architecture phase.


## 20. TICKET SELECTION PHILOSOPHY

The goal is to find the highest reliable probabilities, not the highest odds.

For multi-match tickets:

- Prefer two or three well-supported selections.
- Do not force a match to reach a target combined odd.
- Prefer verified league matches when suitable.
- Use the best-supported Over 1.5 candidates across relevant leagues.
- Consider single-match probability and data quality before combined ticket odds.
- Remember that the probability of all legs winning is generally lower than the probability of any individual leg winning.
- Do not assume that selections are independent when estimating combined ticket probability.
- Return NO BET when no suitable selection exists.


## 21. MODEL LEARNING AND CALIBRATION

Record each analysed selection, including selections not ultimately placed, when practical.

Track:

- Fixture and competition.
- Date and market.
- Offered odds.
- Historical sample sizes.
- λ_home, λ_away, and λ_total.
- Raw Poisson probability.
- Final estimated probability.
- Data quality status.
- Contextual adjustments and reasons.
- Break-even probability, edge, and EV.
- Verdict.
- Standardized warnings.
- Warning severity.
- Warning market relevance.
- Warning direction.
- Warning verification status.
- Post-match warning status.
- Actual match result.

Evaluate the model after accumulating sufficient observations.

Review:

- Actual win rate versus predicted probability.
- Calibration across probability bands.
- Brier score or another suitable probability scoring metric.
- Performance by league and data-quality status.
- Performance of adjusted versus unadjusted estimates.
- Results by odds range.
- Whether the model consistently overestimates or underestimates goal probability.
- Frequency of each warning type.
- Performance when each warning type is present.
- Performance by warning severity.
- Performance by warning market relevance.
- Performance of contradictory warnings.
- Frequency of false or unconfirmed warnings.
- Whether warnings improve final decision quality.

Do not recalibrate based on only a few wins or losses.

Do not conclude that a warning type is predictive from a small number of observations.

Use a sufficiently large sample and avoid changing the model merely to fit recent results.

Where enough data is available, use historical predictions to validate adjustment methods and estimate whether contextual factors genuinely improve accuracy.

Warning analysis must initially remain separate from the probability calculation.

A warning should only become a numerical model input after a separate statistical validation process demonstrates that its inclusion improves calibration or predictive performance.


## 22. CORE RULE

"Probability first. Evidence always. Expected goals calculated transparently. Context without arbitrary adjustments. Warnings structured and never ignored. Value reported honestly. Uncertainty preserved. Learn from every result."

The Roy Betting Engine is a statistical decision-support model.

It does not guarantee profits or winning selections.

Its purpose is to:

- Make estimates reproducible.
- Identify risks clearly.
- Distinguish numerical probability from qualitative evidence.
- Record contradictory signals consistently.
- Preserve warnings for post-match learning.
- Improve decision quality through evidence and ongoing calibration.

The warning system is an evidence layer, not an automatic probability-adjustment mechanism.

No warning may produce an arbitrary numerical probability penalty.

Any future numerical use of warning information must be supported by a separately documented and validated statistical method.