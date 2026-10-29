/**
 * Model 2.1 Dual-Baseline Match Evaluation Generator for 2026-10-29
 * Implements strict Section 5.0 Venue-Specific Protocol, 5.1A Dual-Baseline, & Decoupling Principle
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const FIXTURES_DATA = [
  // 1. Italy Serie A
  {
    id: 1,
    home_team: "Frosinone Calcio",
    away_team: "Lecce",
    country: "Italy",
    league: "Serie A",
    match_date: "2026-10-29",
    odds: 1.12,
    home_league_position: 6,
    away_league_position: 13,
    home_matches_played: 8,
    away_matches_played: 8,
    home_goals_scored: 17,
    home_goals_conceded: 13,
    away_goals_scored: 7,
    away_goals_conceded: 16,
    home_venue_matches: 4,
    home_venue_goals_scored: 9,
    home_venue_goals_conceded: 5,
    away_venue_matches: 4,
    away_venue_goals_scored: 3,
    away_venue_goals_conceded: 6,
    current_league_home_avg: 1.48,
    current_league_away_avg: 1.18,
    historical_league_home_avg: 1.45,
    historical_league_away_avg: 1.15,
    notes: "Frosinone has been prolific at Stadio Benito Stirpe (2.25 GF/G, 1.25 GA/G). Lecce on the road scores only 0.75 GF/G while conceding 1.50 GA/G."
  },
  {
    id: 2,
    home_team: "Fiorentina",
    away_team: "Atalanta",
    country: "Italy",
    league: "Serie A",
    match_date: "2026-10-29",
    odds: 1.16,
    home_league_position: 18,
    away_league_position: 11,
    home_matches_played: 8,
    away_matches_played: 8,
    home_goals_scored: 9,
    home_goals_conceded: 19,
    away_goals_scored: 14,
    away_goals_conceded: 15,
    home_venue_matches: 4,
    home_venue_goals_scored: 3,
    home_venue_goals_conceded: 9,
    away_venue_matches: 3,
    away_venue_goals_scored: 3,
    away_venue_goals_conceded: 7,
    current_league_home_avg: 1.48,
    current_league_away_avg: 1.18,
    historical_league_home_avg: 1.45,
    historical_league_away_avg: 1.15,
    notes: "Fiorentina is struggling defensively at Stadio Artemio Franchi, leaking 2.25 GA/G. Atalanta away matches feature high volatility (1.00 GF / 2.33 GA per game)."
  },

  // 2. Brazil Serie A
  {
    id: 3,
    home_team: "Atletico MG",
    away_team: "Cruzeiro EC",
    country: "Brazil",
    league: "Serie A",
    match_date: "2026-10-29",
    odds: 1.24,
    home_league_position: 6,
    away_league_position: 3,
    home_matches_played: 32,
    away_matches_played: 32,
    home_goals_scored: 44,
    home_goals_conceded: 38,
    away_goals_scored: 51,
    away_goals_conceded: 46,
    home_venue_matches: 16,
    home_venue_goals_scored: 27,
    home_venue_goals_conceded: 17,
    away_venue_matches: 16,
    away_venue_goals_scored: 24,
    away_venue_goals_conceded: 30,
    current_league_home_avg: 1.38,
    current_league_away_avg: 1.02,
    historical_league_home_avg: 1.40,
    historical_league_away_avg: 1.00,
    notes: "Clássico Mineiro at Arena MRV. High sample reliability (16 vs 16 venue matches). Atletico MG scores 1.69 GF/G at home; Cruzeiro boasts a potent road offense (1.50 GF/G) but concedes 1.88 GA/G away."
  },

  // 3. Finland Veikkausliiga
  {
    id: 4,
    home_team: "Inter Turku",
    away_team: "HJK Helsinki",
    country: "Finland",
    league: "Veikkausliiga",
    match_date: "2026-10-29",
    odds: 1.23,
    home_league_position: 1,
    away_league_position: 2,
    home_matches_played: 29,
    away_matches_played: 29,
    home_goals_scored: 35,
    home_goals_conceded: 20,
    away_goals_scored: 55,
    away_goals_conceded: 34,
    home_venue_matches: 14,
    home_venue_goals_scored: 22,
    home_venue_goals_conceded: 8,
    away_venue_matches: 14,
    away_venue_goals_scored: 23,
    away_venue_goals_conceded: 17,
    current_league_home_avg: 1.45,
    current_league_away_avg: 1.25,
    historical_league_home_avg: 1.45,
    historical_league_away_avg: 1.25,
    notes: "Top-of-the-table championship decider at Veritas Stadion. Inter Turku averages 1.57 GF/G at home; HJK possesses the league's top away scoring rate at 1.64 GF/G."
  },
  {
    id: 5,
    home_team: "KuPS Kuopio",
    away_team: "IF Gnistan",
    country: "Finland",
    league: "Veikkausliiga",
    match_date: "2026-10-29",
    odds: 1.23,
    home_league_position: 3,
    away_league_position: 5,
    home_matches_played: 29,
    away_matches_played: 29,
    home_goals_scored: 45,
    home_goals_conceded: 28,
    away_goals_scored: 40,
    away_goals_conceded: 37,
    home_venue_matches: 14,
    home_venue_goals_scored: 23,
    home_venue_goals_conceded: 15,
    away_venue_matches: 14,
    away_venue_goals_scored: 17,
    away_venue_goals_conceded: 18,
    current_league_home_avg: 1.45,
    current_league_away_avg: 1.25,
    historical_league_home_avg: 1.45,
    historical_league_away_avg: 1.25,
    notes: "Championship group clash at Väre Areena. KuPS averages 1.64 GF/G and 1.07 GA/G at home; Gnistan away fixtures average 2.50 total goals (1.21 GF / 1.29 GA per game)."
  },

  // 4. Peru Liga 1
  {
    id: 6,
    home_team: "Sporting Cristal",
    away_team: "Alianza Lima",
    country: "Peru",
    league: "Liga 1",
    match_date: "2026-10-29",
    odds: 1.27,
    home_league_position: 4,
    away_league_position: 7,
    home_matches_played: 13,
    away_matches_played: 13,
    home_goals_scored: 26,
    home_goals_conceded: 15,
    away_goals_scored: 20,
    away_goals_conceded: 12,
    home_venue_matches: 6,
    home_venue_goals_scored: 19,
    home_venue_goals_conceded: 4,
    away_venue_matches: 5,
    away_venue_goals_scored: 7,
    away_venue_goals_conceded: 5,
    current_league_home_avg: 1.45,
    current_league_away_avg: 1.05,
    historical_league_home_avg: 1.45,
    historical_league_away_avg: 1.05,
    notes: "Clásico Moderno at Estadio Alberto Gallardo. Sporting Cristal is lethal at home (3.17 GF/G, 0.67 GA/G). Alianza Lima away matches average 2.40 total goals (1.40 GF / 1.00 GA per game)."
  },

  // 5. Montenegro First League
  {
    id: 7,
    home_team: "FK Sutjeska Niksic",
    away_team: "FK Jezero Plav",
    country: "Montenegro",
    league: "First League",
    match_date: "2026-10-29",
    odds: 1.33,
    home_league_position: 4,
    away_league_position: 9,
    home_matches_played: 12,
    away_matches_played: 12,
    home_goals_scored: 15,
    home_goals_conceded: 8,
    away_goals_scored: 13,
    away_goals_conceded: 20,
    home_venue_matches: 6,
    home_venue_goals_scored: 13,
    home_venue_goals_conceded: 6,
    away_venue_matches: 6,
    away_venue_goals_scored: 5,
    away_venue_goals_conceded: 15,
    current_league_home_avg: 1.30,
    current_league_away_avg: 1.00,
    historical_league_home_avg: 1.30,
    historical_league_away_avg: 1.00,
    notes: "Sutjeska averages 2.17 GF/G at Stadion Kraj Bistrice. Jezero Plav has leaked 2.50 goals per away match across 6 road trips."
  },

  // 6. Bulgaria Second League
  {
    id: 8,
    home_team: "FC Yantra 2019 Gabrovo",
    away_team: "FK Hebar Pazardzhik",
    country: "Bulgaria",
    league: "Second League",
    match_date: "2026-10-29",
    odds: 1.26,
    home_league_position: 7,
    away_league_position: 6,
    home_matches_played: 13,
    away_matches_played: 13,
    home_goals_scored: 16,
    home_goals_conceded: 14,
    away_goals_scored: 29,
    away_goals_conceded: 21,
    home_venue_matches: 7,
    home_venue_goals_scored: 10,
    home_venue_goals_conceded: 5,
    away_venue_matches: 7,
    away_venue_goals_scored: 18,
    away_venue_goals_conceded: 13,
    current_league_home_avg: 1.35,
    current_league_away_avg: 1.10,
    historical_league_home_avg: 1.35,
    historical_league_away_avg: 1.05,
    notes: "Hebar Pazardzhik away fixtures are high-scoring spectacles, averaging 4.43 total goals (2.57 GF / 1.86 GA per match). Yantra Gabrovo averages 1.43 GF/G at home."
  },

  // 7. Guatemala Liga Nacional
  {
    id: 9,
    home_team: "FC Deportivo Mixco",
    away_team: "Xelaju MC",
    country: "Guatemala",
    league: "Liga Nacional",
    match_date: "2026-10-29",
    odds: 1.25,
    home_league_position: 4,
    away_league_position: 5,
    home_matches_played: 16,
    away_matches_played: 16,
    home_goals_scored: 27,
    home_goals_conceded: 24,
    away_goals_scored: 28,
    away_goals_conceded: 20,
    home_venue_matches: 8,
    home_venue_goals_scored: 18,
    home_venue_goals_conceded: 7,
    away_venue_matches: 8,
    away_venue_goals_scored: 9,
    away_venue_goals_conceded: 12,
    current_league_home_avg: 1.55,
    current_league_away_avg: 1.05,
    historical_league_home_avg: 1.55,
    historical_league_away_avg: 1.05,
    notes: "Mixco is prolific at Estadio Santo Domingo de Guzmán (2.25 GF/G). Xelaju concedes 1.50 GA/G on their travels."
  },

  // 8. Egypt Premier League
  {
    id: 10,
    home_team: "Pyramids FC",
    away_team: "Wadi Degla FC",
    country: "Egypt",
    league: "Premier League",
    match_date: "2026-10-29",
    odds: 1.24,
    home_league_position: 1,
    away_league_position: 14,
    home_matches_played: 7,
    away_matches_played: 7,
    home_goals_scored: 17,
    home_goals_conceded: 3,
    away_goals_scored: 7,
    away_goals_conceded: 8,
    home_venue_matches: 3,
    home_venue_goals_scored: 7,
    home_venue_goals_conceded: 1,
    away_venue_matches: 3,
    away_venue_goals_scored: 6,
    away_venue_goals_conceded: 3,
    current_league_home_avg: 1.25,
    current_league_away_avg: 0.95,
    historical_league_home_avg: 1.25,
    historical_league_away_avg: 0.95,
    notes: "League leaders Pyramids FC are dominant at 30 June Stadium (2.33 GF/G, 0.33 GA/G). Wadi Degla away matches have produced 3.00 goals per game, but sample size is limited to 3 venue matches."
  },
  {
    id: 11,
    home_team: "Modern Sport FC",
    away_team: "Al Ahly Cairo",
    country: "Egypt",
    league: "Premier League",
    match_date: "2026-10-29",
    odds: 1.33,
    home_league_position: 5,
    away_league_position: 2,
    home_matches_played: 7,
    away_matches_played: 7,
    home_goals_scored: 12,
    home_goals_conceded: 9,
    away_goals_scored: 14,
    away_goals_conceded: 6,
    home_venue_matches: 3,
    home_venue_goals_scored: 7,
    home_venue_goals_conceded: 3,
    away_venue_matches: 3,
    away_venue_goals_scored: 5,
    away_venue_goals_conceded: 1,
    current_league_home_avg: 1.25,
    current_league_away_avg: 0.95,
    historical_league_home_avg: 1.25,
    historical_league_away_avg: 0.95,
    notes: "Modern Sport averages 2.33 GF/G at home. Al Ahly road defense is stingy (0.33 GA/G). Sample size is limited to 3 venue matches."
  },

  // 9. Iran Pro League
  {
    id: 12,
    home_team: "Fajr Sepasi Shiraz FC",
    away_team: "Tractor",
    country: "Iran",
    league: "Pro League",
    match_date: "2026-10-29",
    odds: 1.45,
    home_league_position: 8,
    away_league_position: 3,
    home_matches_played: 10,
    away_matches_played: 9,
    home_goals_scored: 10,
    home_goals_conceded: 12,
    away_goals_scored: 12,
    away_goals_conceded: 2,
    home_venue_matches: 5,
    home_venue_goals_scored: 6,
    home_venue_goals_conceded: 3,
    away_venue_matches: 4,
    away_venue_goals_scored: 4,
    away_venue_goals_conceded: 1,
    current_league_home_avg: 1.15,
    current_league_away_avg: 0.85,
    historical_league_home_avg: 1.20,
    historical_league_away_avg: 0.90,
    notes: "Extremely low-scoring Iranian league profile. Tractor has conceded only 1 goal in 4 away matches (0.25 GA/G). Fajr Sepasi concedes 0.60 GA/G at home."
  },

  // 10. Tunisia Ligue 1
  {
    id: 13,
    home_team: "CS Sfaxien",
    away_team: "Esperance Tunis",
    country: "Tunisia",
    league: "Ligue 1",
    match_date: "2026-10-29",
    odds: 1.23,
    home_league_position: 5,
    away_league_position: 2,
    home_matches_played: 5,
    away_matches_played: 5,
    home_goals_scored: 6,
    home_goals_conceded: 4,
    away_goals_scored: 10,
    away_goals_conceded: 7,
    home_venue_matches: 3,
    home_venue_goals_scored: 4,
    home_venue_goals_conceded: 1,
    away_venue_matches: 2,
    away_venue_goals_scored: 3,
    away_venue_goals_conceded: 2,
    current_league_home_avg: 1.20,
    current_league_away_avg: 0.85,
    historical_league_home_avg: 1.20,
    historical_league_away_avg: 0.85,
    notes: "Tunisian classic at Stade Taïeb Mhiri. Limited sample size (3 vs 2 matches). Sfaxien concedes only 0.33 GA/G at home; Esperance scores 1.50 GF/G away."
  },

  // 11. Morocco Botola 1
  {
    id: 14,
    home_team: "MAS Maghreb Fes",
    away_team: "RS Berkane",
    country: "Morocco",
    league: "Botola 1",
    match_date: "2026-10-29",
    odds: 1.52,
    home_league_position: 6,
    away_league_position: 14,
    home_matches_played: 4,
    away_matches_played: 3,
    home_goals_scored: 5,
    home_goals_conceded: 4,
    away_goals_scored: 2,
    away_goals_conceded: 2,
    home_venue_matches: 2,
    home_venue_goals_scored: 3,
    home_venue_goals_conceded: 2,
    away_venue_matches: 1,
    away_venue_goals_scored: 1,
    away_venue_goals_conceded: 1,
    current_league_home_avg: 1.25,
    current_league_away_avg: 0.90,
    historical_league_home_avg: 1.25,
    historical_league_away_avg: 0.90,
    notes: "Critical small-sample distortion: RS Berkane has played only 1 away fixture in Botola Pro. Model signals extreme sample unreliability."
  }
];

const SKIPPED_FIXTURES = [
  {
    fixture: "Township Rollers FC vs Tonota FC",
    league: "Botswana Premier League",
    offered_odds: 1.50,
    reason: "Newly promoted Tonota FC in debut top-flight campaign with under 2 recorded matches; complete absence of verified venue-split goal data.",
    rule: "Section 5.0 Hard-Stop Rule (Missing Venue Data)"
  },
  {
    fixture: "Envigado FC vs Independiente Yumbo",
    league: "Colombia Primera B",
    offered_odds: 1.45,
    reason: "Discrepancy in club franchise relocation/rebranding (Independiente Valle del Cauca) and lack of verified independent venue splits for the cuadrangulares stage.",
    rule: "Section 5.0 Hard-Stop Rule (Missing Venue Data)"
  },
  {
    fixture: "Boca Juniors de Cali vs Club Union Magdalena",
    league: "Colombia Primera B",
    offered_odds: 1.40,
    reason: "Conflicting aggregate goal tracking across multi-stage Torneo BetPlay phases; missing verified home/away venue breakdowns.",
    rule: "Section 5.0 Hard-Stop Rule (Missing Venue Data)"
  },
  {
    fixture: "Tigres FC vs Real Cartagena",
    league: "Colombia Primera B",
    offered_odds: 1.36,
    reason: "Unverified venue-specific goals conceded and scored tallies in cuadrangulares group stage.",
    rule: "Section 5.0 Hard-Stop Rule (Missing Venue Data)"
  },
  {
    fixture: "Al Mosul SC vs Al Jolan SC",
    league: "Iraq Stars League",
    offered_odds: 1.43,
    reason: "Absence of standardized, independently verifiable venue home/away goal statistics across Iraqi league databases.",
    rule: "Section 5.0 Hard-Stop Rule (Missing Venue Data)"
  },
  {
    fixture: "Al Naft Baghdad vs Al Kahraba",
    league: "Iraq Stars League",
    offered_odds: 1.47,
    reason: "Absence of standardized venue-split scoring tables for Al Naft (host) and Al Kahraba (visitor).",
    rule: "Section 5.0 Hard-Stop Rule (Missing Venue Data)"
  },
  {
    fixture: "Al Quwa Al Jawiya vs Al Minaa SC",
    league: "Iraq Stars League",
    offered_odds: 1.39,
    reason: "Missing verified venue-split statistics; full-season totals cannot be substituted as proxy per Section 5.0.",
    rule: "Section 5.0 Hard-Stop Rule (Missing Venue Data)"
  },
  {
    fixture: "Al Salt vs Al Jazeera Amman",
    league: "Jordan Pro League",
    offered_odds: 1.32,
    reason: "Insufficient venue breakdown stability in early-season Jordanian league tracking.",
    rule: "Section 5.0 Hard-Stop Rule (Missing Venue Data)"
  },
  {
    fixture: "Mathare United FC vs Tusker FC",
    league: "Kenya Premier League",
    offered_odds: 1.20,
    reason: "Extreme sample distortion: Tusker FC has played only 1 recorded match; Mathare United 3 matches; missing venue breakdown.",
    rule: "Section 5.0 Hard-Stop Rule (Extreme Sample Distortion < 2 matches)"
  },
  {
    fixture: "Kenya Police vs Ulinzi Stars FC",
    league: "Kenya Premier League",
    offered_odds: 1.52,
    reason: "Unreliable venue goal tracking and severe early-season fixture backlog in FKF Premier League.",
    rule: "Section 5.0 Hard-Stop Rule (Missing Venue Data)"
  }
];

function getConfidenceLabel(prob) {
  if (prob >= 0.90) return "Extremely strong";
  if (prob >= 0.85) return "Very strong";
  if (prob >= 0.80) return "Strong";
  if (prob >= 0.75) return "Good";
  if (prob >= 0.70) return "Moderate";
  return "Weak for the Over 1.5-focused strategy";
}

function classifyAlignment(delta_pp) {
  if (delta_pp <= 1.5) return "very_high";
  if (delta_pp <= 3.0) return "high";
  if (delta_pp <= 5.0) return "medium";
  if (delta_pp <= 7.0) return "low";
  return "very_low";
}

function classifyEdge(edge_pp) {
  if (edge_pp > 15.0) return "very_high";
  if (edge_pp > 5.0) return "high";
  if (edge_pp >= 0.0) return "medium";
  if (edge_pp >= -10.0) return "low";
  return "very_low";
}

function calculatePoissonOver15(lambda_total) {
  if (lambda_total <= 0) return 0.0;
  const exp_neg = Math.exp(-lambda_total);
  const p_0 = exp_neg;
  const p_1 = lambda_total * exp_neg;
  return 1.0 - (p_0 + p_1);
}

function formatPos(p) {
  if (!p) return 'N/A';
  const num = parseInt(p, 10);
  if (num % 100 >= 11 && num % 100 <= 13) return `${num}th`;
  if (num % 10 === 1) return `${num}st`;
  if (num % 10 === 2) return `${num}nd`;
  if (num % 10 === 3) return `${num}rd`;
  return `${num}th`;
}

function evaluateFixture(f) {
  const home_v_m = f.home_venue_matches;
  const home_v_gf = f.home_venue_goals_scored;
  const home_v_ga = f.home_venue_goals_conceded;
  const away_v_m = f.away_venue_matches;
  const away_v_gf = f.away_venue_goals_scored;
  const away_v_ga = f.away_venue_goals_conceded;

  const home_gf_pg = home_v_gf / home_v_m;
  const home_ga_pg = home_v_ga / home_v_m;
  const away_gf_pg = away_v_gf / away_v_m;
  const away_ga_pg = away_v_ga / away_v_m;

  const home_ov_m = f.home_matches_played;
  const home_ov_gf = f.home_goals_scored;
  const home_ov_ga = f.home_goals_conceded;
  const away_ov_m = f.away_matches_played;
  const away_ov_gf = f.away_goals_scored;
  const away_ov_ga = f.away_goals_conceded;

  const home_ov_gf_pg = home_ov_gf / home_ov_m;
  const home_ov_ga_pg = home_ov_ga / home_ov_m;
  const away_ov_gf_pg = away_ov_gf / away_ov_m;
  const away_ov_ga_pg = away_ov_ga / away_ov_m;

  const l_h_avg = f.current_league_home_avg;
  const l_a_avg = f.current_league_away_avg;
  const hist_h_avg = f.historical_league_home_avg;
  const hist_a_avg = f.historical_league_away_avg;

  // Strength Ratios
  const home_atk_str = home_gf_pg / l_h_avg;
  const away_def_weak = away_ga_pg / l_h_avg;
  const away_atk_str = away_gf_pg / l_a_avg;
  const home_def_weak = home_ga_pg / l_a_avg;

  // Primary Lambdas
  const lambda_home = (home_gf_pg * away_ga_pg) / l_h_avg;
  const lambda_away = (away_gf_pg * home_ga_pg) / l_a_avg;
  const lambda_total = lambda_home + lambda_away;
  const p_over_1_5 = calculatePoissonOver15(lambda_total);

  // Historical Benchmark Lambdas
  const hist_lambda_home = (home_gf_pg * away_ga_pg) / hist_h_avg;
  const hist_lambda_away = (away_gf_pg * home_ga_pg) / hist_a_avg;
  const hist_lambda_total = hist_lambda_home + hist_lambda_away;
  const hist_p_over_1_5 = calculatePoissonOver15(hist_lambda_total);

  // Alignment
  const delta_pp = Math.abs(p_over_1_5 - hist_p_over_1_5) * 100;
  const align_rem = classifyAlignment(delta_pp);

  // Value & Market
  const be_prob = 1.0 / f.odds;
  const edge_pp = (p_over_1_5 - be_prob) * 100;
  const ev = (p_over_1_5 * f.odds) - 1.0;
  const edge_rem = classifyEdge(edge_pp);

  // Warnings Detection
  const warnings = [];
  const min_matches = Math.min(home_v_m, away_v_m);

  if (min_matches <= 2) {
    warnings.push({
      type: "SMALL_SAMPLE",
      severity: "CRITICAL",
      direction: "CONTRADICTORY",
      market_relevance: "DIRECT",
      description: `Extreme small-sample distortion: only ${min_matches} match(es) played by one or both teams in this venue.`,
      evidence: `${f.home_team} played ${home_v_m} venue matches; ${f.away_team} played ${away_v_m} venue matches.`
    });
  } else if (min_matches < 5) {
    warnings.push({
      type: "SMALL_SAMPLE",
      severity: "MEDIUM",
      direction: "CONTRADICTORY",
      market_relevance: "INDIRECT",
      description: `Limited sample size of only ${min_matches} matches.`,
      evidence: `Sample size below the 5-match threshold for statistical stability (${home_v_m} vs ${away_v_m}).`
    });
  }

  if (away_gf_pg < 0.85) {
    warnings.push({
      type: "LOW_AWAY_SCORING",
      severity: away_gf_pg < 0.50 ? "HIGH" : "MEDIUM",
      direction: "CONTRADICTORY",
      market_relevance: "DIRECT",
      description: `${f.away_team} averages only ${away_gf_pg.toFixed(2)} goals per game away, increasing shutout risk.`,
      evidence: `${f.away_team} away scoring average is ${away_gf_pg.toFixed(2)} GF/game, placing heavy reliance on ${f.home_team} to produce goals.`
    });
  }

  if (home_gf_pg < 1.0) {
    warnings.push({
      type: "LOW_HOME_SCORING",
      severity: home_gf_pg < 0.60 ? "HIGH" : "MEDIUM",
      direction: "CONTRADICTORY",
      market_relevance: "DIRECT",
      description: `${f.home_team} home scoring rate is low (${home_gf_pg.toFixed(2)} GF/game).`,
      evidence: `${f.home_team} averages under 1.0 goal scored per home match across observed fixtures.`
    });
  }

  if (home_ga_pg <= 0.85 && away_ga_pg <= 0.85) {
    warnings.push({
      type: "STRONG_DEFENSIVE_MATCHUP",
      severity: "HIGH",
      direction: "CONTRADICTORY",
      market_relevance: "DIRECT",
      description: "Both teams maintain exceptionally tight defensive records.",
      evidence: `${f.home_team} concedes ${home_ga_pg.toFixed(2)} GA/game and ${f.away_team} concedes ${away_ga_pg.toFixed(2)} GA/game, elevating 0-0 and 1-0 probability.`
    });
  }

  // Team news warning (standard neutral low)
  warnings.push({
    type: "TEAM_NEWS_UNVERIFIED",
    severity: "LOW",
    direction: "NEUTRAL",
    market_relevance: "CONTEXTUAL",
    description: "Pre-match team news and confirmed starting lineups remain unverified.",
    evidence: "Lineups have not been locked in; rotation or late injury risk unconfirmed."
  });

  // Determine Verdict
  let verdict = "CAUTION";
  let comment = "";

  const critical_warnings = warnings.filter(w => w.severity === "CRITICAL");
  const high_contradictory = warnings.filter(w => w.severity === "HIGH" && w.direction === "CONTRADICTORY");
  const medium_warnings = warnings.filter(w => w.severity === "MEDIUM");

  if (critical_warnings.length > 0 || min_matches <= 2) {
    verdict = "NO BET";
    comment = `NO BET. Extreme small-sample distortion (${min_matches} venue matches) renders the statistical signal uncalibrated. Violated minimum sample requirements.`;
  } else if (p_over_1_5 < 0.70) {
    verdict = "NO BET";
    comment = `NO BET. Model estimates an ${(p_over_1_5 * 100).toFixed(1)}% Over 1.5 probability versus bookmaker break-even of ${(be_prob * 100).toFixed(1)}% at ${f.odds} odds (${edge_pp >= 0 ? '+' : ''}${edge_pp.toFixed(1)} edge, ${ev >= 0 ? '+' : ''}${ev.toFixed(3)} EV). Estimated Over 1.5 probability (${(p_over_1_5 * 100).toFixed(1)}%) is well below the 70% threshold for the Over 1.5 strategy.`;
  } else if (ev < -0.10 || edge_pp < -10.0) {
    verdict = "NO BET";
    comment = `NO BET. Model estimates an ${(p_over_1_5 * 100).toFixed(1)}% Over 1.5 probability versus bookmaker break-even of ${(be_prob * 100).toFixed(1)}% at ${f.odds} odds (${edge_pp >= 0 ? '+' : ''}${edge_pp.toFixed(1)} edge, ${ev >= 0 ? '+' : ''}${ev.toFixed(3)} EV). Significant negative expected value (${ev.toFixed(3)}) and pricing mismatch (${edge_pp.toFixed(1)}pp edge) violate Principle 8.`;
  } else if (high_contradictory.length > 0) {
    verdict = "CAUTION";
    comment = `CAUTION. Model estimates an ${(p_over_1_5 * 100).toFixed(1)}% Over 1.5 probability versus bookmaker break-even of ${(be_prob * 100).toFixed(1)}% at ${f.odds} odds (${edge_pp >= 0 ? '+' : ''}${edge_pp.toFixed(1)} edge, ${ev >= 0 ? '+' : ''}${ev.toFixed(3)} EV). Model probability is viable, but high contradictory warning (${high_contradictory[0].type}) requires caution.`;
  } else if (medium_warnings.length >= 2) {
    verdict = "CAUTION";
    comment = `CAUTION. Model estimates an ${(p_over_1_5 * 100).toFixed(1)}% Over 1.5 probability versus bookmaker break-even of ${(be_prob * 100).toFixed(1)}% at ${f.odds} odds (${edge_pp >= 0 ? '+' : ''}${edge_pp.toFixed(1)} edge, ${ev >= 0 ? '+' : ''}${ev.toFixed(3)} EV). Multiple medium warnings (${medium_warnings.map(w => w.type).join(', ')}) warrant measured caution.`;
  } else if (edge_pp < 0) {
    verdict = "CAUTION";
    comment = `CAUTION. Model estimates an ${(p_over_1_5 * 100).toFixed(1)}% Over 1.5 probability versus bookmaker break-even of ${(be_prob * 100).toFixed(1)}% at ${f.odds} odds (${edge_pp.toFixed(1)} edge, ${ev.toFixed(3)} EV). High probability (${(p_over_1_5 * 100).toFixed(1)}%), but pricing offers no positive edge (${edge_pp.toFixed(1)}pp). Disclosed under Principle 9.`;
  } else if (p_over_1_5 >= 0.80 && edge_pp >= 0) {
    verdict = "SELECT";
    comment = `SELECT. Model estimates an ${(p_over_1_5 * 100).toFixed(1)}% Over 1.5 probability versus bookmaker break-even of ${(be_prob * 100).toFixed(1)}% at ${f.odds} odds (+${edge_pp.toFixed(1)} edge, +${ev.toFixed(3)} EV). Strong probability (${(p_over_1_5 * 100).toFixed(1)}%) supported by positive edge (+${edge_pp.toFixed(1)}pp, EV +${ev.toFixed(3)}) and acceptable risk profile.`;
  } else {
    verdict = "CAUTION";
    comment = `CAUTION. Model estimates an ${(p_over_1_5 * 100).toFixed(1)}% Over 1.5 probability versus bookmaker break-even of ${(be_prob * 100).toFixed(1)}% at ${f.odds} odds (+${edge_pp.toFixed(1)} edge, +${ev.toFixed(3)} EV). Viable probability (${(p_over_1_5 * 100).toFixed(1)}%), but edge is modest (+${edge_pp.toFixed(1)}pp) and requires risk awareness.`;
  }

  return {
    ...f,
    home_gf_pg,
    home_ga_pg,
    away_gf_pg,
    away_ga_pg,
    home_ov_gf_pg,
    home_ov_ga_pg,
    away_ov_gf_pg,
    away_ov_ga_pg,
    home_atk_str,
    away_def_weak,
    away_atk_str,
    home_def_weak,
    lambda_home,
    lambda_away,
    lambda_total,
    p_over_1_5,
    hist_lambda_total,
    hist_p_over_1_5,
    delta_pp,
    align_rem,
    be_prob,
    edge_pp,
    ev,
    edge_rem,
    warnings,
    verdict,
    comment
  };
}

function main() {
  const evaluated = FIXTURES_DATA.map(evaluateFixture);

  const lines = [];
  lines.push("# ROY BETTING ENGINE — MATCH EVALUATION REPORT");
  lines.push("**Model Version**: 2.1 (Over 1.5 Goals Focused — Dual-Baseline Protocol)");
  lines.push("**Evaluation Date**: 2026-10-29");
  lines.push(`**Total Fixtures Evaluated**: ${evaluated.length} matches analyzed (${SKIPPED_FIXTURES.length} skipped under Section 5.0 Hard-Stop)`);
  lines.push("**Market**: Over 1.5 Goals");
  lines.push("**Methodology Enforcement**: Strict Venue-Specific Home/Away Protocol (Section 5.0), Dual-Baseline Protocol (Section 5.1A), & Hard-Stop Rule");
  lines.push("");
  lines.push("---");
  lines.push("");

  for (const e of evaluated) {
    lines.push(`## ${e.id}. ${e.home_team} vs ${e.away_team}`);
    lines.push(`- **Fixture**: ${e.country} — ${e.league} | Date: ${e.match_date}`);
    lines.push(`- **Data Quality**: **Verified (Dual-Baseline Venue-Specific & Season-Overall Analysis)**`);
    lines.push("");
    lines.push("### Pre-Match Statistical Matchup Comparison");
    lines.push("");
    lines.push("#### Venue Form (Used by Model Engine)");
    lines.push(`| Metric | ${e.home_team} (Home @ Home) | ${e.away_team} (Away @ Away) |`);
    lines.push("| :--- | :---: | :---: |");
    lines.push(`| **League Standing** | ${formatPos(e.home_league_position)} | ${formatPos(e.away_league_position)} |`);
    lines.push(`| **Venue Matches Played** | ${e.home_venue_matches} | ${e.away_venue_matches} |`);
    lines.push(`| **Venue Goals Scored (GF)** | ${e.home_venue_goals_scored} (${e.home_gf_pg.toFixed(2)} / game) | ${e.away_venue_goals_scored} (${e.away_gf_pg.toFixed(2)} / game) |`);
    lines.push(`| **Venue Goals Conceded (GA)** | ${e.home_venue_goals_conceded} (${e.home_ga_pg.toFixed(2)} / game) | ${e.away_venue_goals_conceded} (${e.away_ga_pg.toFixed(2)} / game) |`);
    lines.push("");
    lines.push("#### Season Overall (Macro Contextual Record)");
    lines.push(`| Metric | ${e.home_team} (Overall) | ${e.away_team} (Overall) |`);
    lines.push("| :--- | :---: | :---: |");
    lines.push(`| **Overall Matches Played** | ${e.home_matches_played} | ${e.away_matches_played} |`);
    lines.push(`| **Overall Goals Scored (GF)** | ${e.home_goals_scored} (${e.home_ov_gf_pg.toFixed(2)} / game) | ${e.away_goals_scored} (${e.away_ov_gf_pg.toFixed(2)} / game) |`);
    lines.push(`| **Overall Goals Conceded (GA)** | ${e.home_goals_conceded} (${e.home_ov_ga_pg.toFixed(2)} / game) | ${e.away_goals_conceded} (${e.away_ov_ga_pg.toFixed(2)} / game) |`);
    lines.push("");
    lines.push("### Goal Profiles & Strength Indices (Dual-Baseline)");
    lines.push(`- **Primary Live Baselines (${e.league})**: Home scoring avg ${e.current_league_home_avg.toFixed(2)}, Away scoring avg ${e.current_league_away_avg.toFixed(2)}`);
    lines.push(`  - Home Attacking Strength: ${e.home_atk_str.toFixed(2)}`);
    lines.push(`  - Away Defensive Weakness: ${e.away_def_weak.toFixed(2)}`);
    lines.push(`  - Away Attacking Strength: ${e.away_atk_str.toFixed(2)}`);
    lines.push(`  - Home Defensive Weakness: ${e.home_def_weak.toFixed(2)}`);
    lines.push(`- **Historical Benchmark Baselines**: Home scoring avg ${e.historical_league_home_avg.toFixed(2)}, Away scoring avg ${e.historical_league_away_avg.toFixed(2)}`);
    lines.push("");
    lines.push("### Expected Goals (Lambda) & Poisson Formulation");
    lines.push("- **Primary Live Model**:");
    lines.push(`  - Lambda Home: ${e.lambda_home.toFixed(4)} | Lambda Away: ${e.lambda_away.toFixed(4)} | **Total Expected Goals (Lambda): ${e.lambda_total.toFixed(4)}**`);
    lines.push(`  - **Poisson P(Over 1.5)**: **${(e.p_over_1_5 * 100).toFixed(1)}%** (${getConfidenceLabel(e.p_over_1_5)})`);
    lines.push(`  - Poisson P(Under 1.5): ${((1 - e.p_over_1_5) * 100).toFixed(1)}%`);
    lines.push("- **Companion Historical Benchmark**:");
    lines.push(`  - Historical Total Expected Goals: ${e.hist_lambda_total.toFixed(4)}`);
    lines.push(`  - **Historical P(Over 1.5)**: **${(e.hist_p_over_1_5 * 100).toFixed(1)}%**`);
    lines.push(`- **Dual-Baseline Alignment**: \`[${e.align_rem.toUpperCase()} ALIGNMENT]\` (${e.delta_pp.toFixed(2)} pp delta)`);
    lines.push("");
    lines.push("### Market Pricing & Value Analysis");
    lines.push(`- **Offered Odds**: ${e.odds.toFixed(2)}`);
    lines.push(`- **Bookmaker Break-Even Probability**: ${(e.be_prob * 100).toFixed(1)}%`);
    lines.push(`- **Value Edge**: ${e.edge_pp >= 0 ? '+' : ''}${e.edge_pp.toFixed(1)} percentage points (\`[${e.edge_rem.toUpperCase()} EDGE]\`)`);
    lines.push(`- **Expected Value (EV)**: ${e.ev >= 0 ? '+' : ''}${e.ev.toFixed(3)} per unit staked`);
    lines.push("");
    lines.push("### Warnings & Negative Checks");
    for (const w of e.warnings) {
      lines.push(`- **\`${w.type}\`** [${w.severity}] (${w.direction} / ${w.market_relevance}): ${w.description}`);
      lines.push(`  - *Evidence*: ${w.evidence}`);
    }
    lines.push("");
    lines.push(`### Final Decision Verdict: **${e.verdict}**`);
    lines.push(`> ${e.comment}`);
    lines.push("");
    lines.push("---");
    lines.push("");
  }

  // Section for Skipped Matches under Hard-Stop Rule
  lines.push("## SKIPPED FIXTURES — SECTION 5.0 HARD-STOP PROTOCOL");
  lines.push("Per **Model 2.1 Section 5.0**, if venue-specific home/away breakdown cannot be verified with complete statistical integrity, the engine strictly prohibits using overall season aggregates as mathematical proxies. The following match options were halted:");
  lines.push("");
  lines.push("| # | Fixture | League | Offered Odds | Reason for Exclusion | Enforcement Rule |");
  lines.push("| :---: | :--- | :--- | :---: | :--- | :--- |");
  SKIPPED_FIXTURES.forEach((s, idx) => {
    lines.push(`| ${idx + 1} | ${s.fixture} | ${s.league} | ${s.offered_odds.toFixed(2)} | ${s.reason} | ${s.rule} |`);
  });
  lines.push("");
  lines.push("---");
  lines.push("");

  // Executive Summary Table
  lines.push("## EXECUTIVE SUMMARY TABLE (2026-10-29)");
  lines.push("| ID | Fixture | League | Odds | Break-Even | Live Prob | Hist Prob | Align Delta | Edge (pp) | EV | Warnings | Verdict |");
  lines.push("| :---: | :--- | :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |");
  for (const e of evaluated) {
    const verdictFormatted = e.verdict === "SELECT" ? `**${e.verdict}**` : e.verdict;
    lines.push(`| ${e.id} | ${e.home_team} vs ${e.away_team} | ${e.league} | ${e.odds.toFixed(2)} | ${(e.be_prob * 100).toFixed(1)}% | ${(e.p_over_1_5 * 100).toFixed(1)}% | ${(e.hist_p_over_1_5 * 100).toFixed(1)}% | ${e.delta_pp.toFixed(1)}pp | ${e.edge_pp >= 0 ? '+' : ''}${e.edge_pp.toFixed(1)}pp | ${e.ev >= 0 ? '+' : ''}${e.ev.toFixed(3)} | ${e.warnings.length} | ${verdictFormatted} |`);
  }
  lines.push("");

  const outPath = path.resolve(__dirname, '../october/evaluation_2026-10-29.md');
  fs.writeFileSync(outPath, lines.join('\n'), 'utf8');
  console.log(`Successfully generated evaluation report to ${outPath}`);
}

main();
