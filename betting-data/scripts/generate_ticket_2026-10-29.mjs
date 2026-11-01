/**
 * Ticket Generator for 2026-10-29 (Ticket S-27-v2.1)
 * Adheres strictly to Model 2.1 Venue & Overall Stats Separation, Dual-Baseline Protocol, and Organization Rules
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import the evaluation data generator functions
const evalScriptPath = path.resolve(__dirname, 'generate_evaluation_report_2026-10-29.mjs');

// 3 Main Selections chosen by User
const SELECTED_MATCH_IDS = [
  8,  // 1. FC Yantra 2019 Gabrovo vs FK Hebar Pazardzhik
  6,  // 2. Sporting Cristal vs Alianza Lima
  10  // 3. Pyramids FC vs Wadi Degla FC
];

// 6 Alternatives chosen by User
const ALTERNATIVE_MATCH_IDS = [
  2,  // 1. Fiorentina vs Atalanta
  3,  // 2. Atletico MG vs Cruzeiro EC
  1,  // 3. Frosinone Calcio vs Lecce
  11, // 4. Modern Sport FC vs Al Ahly Cairo
  7,  // 5. FK Sutjeska Niksic vs FK Jezero Plav
  9   // 6. FC Deportivo Mixco vs Xelaju MC
];

const RAW_FIXTURES = [
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
    comment: "CAUTION. Model estimates an 81.2% Over 1.5 probability versus bookmaker break-even of 89.3% at 1.12 odds (-8.1pp edge, -0.091 EV). Strong probability (81.2%), but thin market price offers negative value.",
    notes: "Frosinone home goals: 9 GF, 5 GA in 4 matches; Lecce away goals: 3 GF, 6 GA in 4 matches."
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
    comment: "CAUTION. Model estimates an 81.4% Over 1.5 probability versus bookmaker break-even of 86.2% at 1.16 odds (-4.8pp edge, -0.056 EV). High probability (81.4%), but pricing offers no positive edge.",
    notes: "Fiorentina home goals: 3 GF, 9 GA in 4 matches; Atalanta away goals: 3 GF, 7 GA in 3 matches."
  },
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
    comment: "SELECT. Model estimates an 89.7% Over 1.5 probability versus bookmaker break-even of 80.6% at 1.24 odds (+9.1pp edge, +0.113 EV). Exceptional 32-game verified sample with strong positive value.",
    notes: "Atletico MG home goals: 27 GF, 17 GA in 16 matches; Cruzeiro away goals: 24 GF, 30 GA in 16 matches."
  },
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
    comment: "NO BET. Model estimates a 61.2% Over 1.5 probability versus bookmaker break-even of 81.3% at 1.23 odds (-20.1pp edge, -0.247 EV). Inter Turku's resolute home defense suppresses total expected goals.",
    notes: "Inter Turku home goals: 22 GF, 8 GA in 14 matches; HJK away goals: 23 GF, 17 GA in 14 matches."
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
    comment: "NO BET. Model estimates a 71.2% Over 1.5 probability versus bookmaker break-even of 81.3% at 1.23 odds (-10.1pp edge, -0.124 EV). Negative expected value violates Principle 8.",
    notes: "KuPS home goals: 23 GF, 15 GA in 14 matches; Gnistan away goals: 17 GF, 18 GA in 14 matches."
  },
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
    comment: "SELECT. Model estimates an 81.1% Over 1.5 probability versus bookmaker break-even of 78.7% at 1.27 odds (+2.4pp edge, +0.031 EV). Sporting Cristal is potent at Estadio Alberto Gallardo (3.17 GF/G).",
    notes: "Sporting Cristal home goals: 19 GF, 4 GA in 6 matches; Alianza Lima away goals: 7 GF, 5 GA in 5 matches."
  },
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
    comment: "SELECT. Model estimates a 96.0% Over 1.5 probability versus bookmaker break-even of 75.2% at 1.33 odds (+20.8pp edge, +0.276 EV). Outstanding statistical mismatch with Sutjeska scoring 2.17 GF/G and Jezero conceding 2.50 GA/G away.",
    notes: "Sutjeska home goals: 13 GF, 6 GA in 6 matches; Jezero away goals: 5 GF, 15 GA in 6 matches."
  },
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
    comment: "SELECT. Model estimates an 87.8% Over 1.5 probability versus bookmaker break-even of 79.4% at 1.26 odds (+8.4pp edge, +0.106 EV). Hebar away fixtures average 4.43 total goals per game.",
    notes: "Yantra Gabrovo home goals: 10 GF, 5 GA in 7 matches; Hebar Pazardzhik away goals: 18 GF, 13 GA in 7 matches."
  },
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
    comment: "SELECT. Model estimates an 81.7% Over 1.5 probability versus bookmaker break-even of 80.0% at 1.25 odds (+1.7pp edge, +0.022 EV). Mixco scores 2.25 GF/G at home and Xelaju concedes 1.50 GA/G away.",
    notes: "Mixco home goals: 18 GF, 7 GA in 8 matches; Xelaju away goals: 9 GF, 12 GA in 8 matches."
  },
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
    comment: "CAUTION. Model estimates a 72.6% Over 1.5 probability versus bookmaker break-even of 80.6% at 1.24 odds (-8.0pp edge, -0.099 EV). High probability (72.6%), but pricing offers no positive edge.",
    notes: "Pyramids home goals: 7 GF, 1 GA in 3 matches; Wadi Degla away goals: 6 GF, 3 GA in 3 matches."
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
    comment: "NO BET. Model estimates a 68.6% Over 1.5 probability versus bookmaker break-even of 75.2% at 1.33 odds (-6.5pp edge, -0.087 EV). Sub-70% probability and negative EV.",
    notes: "Modern Sport home goals: 7 GF, 3 GA in 3 matches; Al Ahly away goals: 5 GF, 1 GA in 3 matches."
  },
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
    comment: "NO BET. Model estimates a 25.2% Over 1.5 probability versus bookmaker break-even of 69.0% at 1.45 odds (-43.8pp edge, -0.635 EV). Severe negative EV; ultra-defensive match profile.",
    notes: "Fajr Sepasi home goals: 6 GF, 3 GA in 5 matches; Tractor away goals: 4 GF, 1 GA in 4 matches."
  },
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
    comment: "NO BET. Model estimates a 50.7% Over 1.5 probability versus bookmaker break-even of 81.3% at 1.23 odds (-30.6pp edge, -0.377 EV). Critical small sample and poor pricing value.",
    notes: "CS Sfaxien home goals: 4 GF, 1 GA in 3 matches; Esperance Tunis away goals: 3 GF, 2 GA in 2 matches."
  },
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
    comment: "NO BET. Extreme small-sample distortion (1 venue matches) renders the statistical signal uncalibrated. Violated minimum sample requirements.",
    notes: "MAS Fes home goals: 3 GF, 2 GA in 2 matches; RS Berkane away goals: 1 GF, 1 GA in 1 match."
  }
];

function calculatePoissonOver15(lambda_total) {
  if (lambda_total <= 0) return 0.0;
  const exp_neg = Math.exp(-lambda_total);
  const p_0 = exp_neg;
  const p_1 = lambda_total * exp_neg;
  return 1.0 - (p_0 + p_1);
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

function mapFixtureToPayload(f) {
  const home_v_m = f.home_venue_matches;
  const home_v_gf = f.home_venue_goals_scored;
  const home_v_ga = f.home_venue_goals_conceded;
  const away_v_m = f.away_venue_matches;
  const away_v_gf = f.away_venue_goals_scored;
  const away_v_ga = f.away_venue_goals_conceded;

  const home_gf_pg = Number((home_v_gf / home_v_m).toFixed(2));
  const home_ga_pg = Number((home_v_ga / home_v_m).toFixed(2));
  const away_gf_pg = Number((away_v_gf / away_v_m).toFixed(2));
  const away_ga_pg = Number((away_v_ga / away_v_m).toFixed(2));

  const home_ov_m = f.home_matches_played;
  const home_ov_gf = f.home_goals_scored;
  const home_ov_ga = f.home_goals_conceded;
  const away_ov_m = f.away_matches_played;
  const away_ov_gf = f.away_goals_scored;
  const away_ov_ga = f.away_goals_conceded;

  const home_ov_gf_pg = Number((home_ov_gf / home_ov_m).toFixed(2));
  const home_ov_ga_pg = Number((home_ov_ga / home_ov_m).toFixed(2));
  const away_ov_gf_pg = Number((away_ov_gf / away_ov_m).toFixed(2));
  const away_ov_ga_pg = Number((away_ov_ga / away_ov_m).toFixed(2));

  const l_h_avg = f.current_league_home_avg;
  const l_a_avg = f.current_league_away_avg;
  const hist_h_avg = f.historical_league_home_avg;
  const hist_a_avg = f.historical_league_away_avg;

  const lambda_home = (home_gf_pg * away_ga_pg) / l_h_avg;
  const lambda_away = (away_gf_pg * home_ga_pg) / l_a_avg;
  const lambda_total = lambda_home + lambda_away;
  const p_over_1_5 = calculatePoissonOver15(lambda_total);

  const hist_lambda_home = (home_gf_pg * away_ga_pg) / hist_h_avg;
  const hist_lambda_away = (away_gf_pg * home_ga_pg) / hist_a_avg;
  const hist_lambda_total = hist_lambda_home + hist_lambda_away;
  const hist_p_over_1_5 = calculatePoissonOver15(hist_lambda_total);

  const delta_pp = Number((Math.abs(p_over_1_5 - hist_p_over_1_5) * 100).toFixed(1));
  const align_rem = classifyAlignment(delta_pp);

  const be_prob = Number((1.0 / f.odds).toFixed(3));
  const edge_pp = Number(((p_over_1_5 - be_prob) * 100).toFixed(1));
  const ev = Number(((p_over_1_5 * f.odds) - 1.0).toFixed(3));
  const edge_rem = classifyEdge(edge_pp);

  // Warnings
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

  warnings.push({
    type: "TEAM_NEWS_UNVERIFIED",
    severity: "LOW",
    direction: "NEUTRAL",
    market_relevance: "CONTEXTUAL",
    description: "Pre-match team news and confirmed starting lineups remain unverified.",
    evidence: "Lineups have not been locked in; rotation or late injury risk unconfirmed."
  });

  return {
    match_date: f.match_date,
    country: f.country,
    league: f.league,
    home_team: f.home_team,
    away_team: f.away_team,
    home_league_position: f.home_league_position,
    away_league_position: f.away_league_position,
    home_matches_played: home_v_m,
    away_matches_played: away_v_m,
    home_goals_scored: home_v_gf,
    home_goals_conceded: home_v_ga,
    away_goals_scored: away_v_gf,
    away_goals_conceded: away_v_ga,
    home_goals_per_game: home_gf_pg,
    home_conceded_per_game: home_ga_pg,
    away_goals_per_game: away_gf_pg,
    away_conceded_per_game: away_ga_pg,
    market: "Over/Under",
    selection: "Over 1.5",
    odds: f.odds,
    estimated_probability: Number(p_over_1_5.toFixed(3)),
    breakeven_probability: be_prob,
    edge_percentage_points: edge_pp,
    edge_remark: edge_rem,
    expected_value: ev,
    current_league_home_avg: l_h_avg,
    current_league_away_avg: l_a_avg,
    historical_league_home_avg: hist_h_avg,
    historical_league_away_avg: hist_a_avg,
    historical_estimated_probability: Number(hist_p_over_1_5.toFixed(3)),
    alignment_delta_pp: delta_pp,
    alignment_remark: align_rem,
    actual_home_score: null,
    actual_away_score: null,
    result: "pending",
    comment: f.comment,
    notes: f.notes,
    warnings: warnings,
    home_overall_matches_played: home_ov_m,
    home_overall_goals_scored: home_ov_gf,
    home_overall_goals_conceded: home_ov_ga,
    home_overall_goals_per_game: home_ov_gf_pg,
    home_overall_conceded_per_game: home_ov_ga_pg,
    away_overall_matches_played: away_ov_m,
    away_overall_goals_scored: away_ov_gf,
    away_overall_goals_conceded: away_ov_ga,
    away_overall_goals_per_game: away_ov_gf_pg,
    away_overall_conceded_per_game: away_ov_ga_pg
  };
}

function main() {
  const selections = SELECTED_MATCH_IDS.map(id => {
    const f = RAW_FIXTURES.find(x => x.id === id);
    return mapFixtureToPayload(f);
  });

  const alternatives = ALTERNATIVE_MATCH_IDS.map(id => {
    const f = RAW_FIXTURES.find(x => x.id === id);
    return mapFixtureToPayload(f);
  });

  // Calculate combined odds and probability for selections
  const combined_odds = Number(selections.reduce((acc, s) => acc * s.odds, 1).toFixed(2));
  const estimated_ticket_probability = Number(selections.reduce((acc, s) => acc * s.estimated_probability, 1).toFixed(3));

  const ticketPayload = {
    ticket: {
      ticket_number: "S-27-v2.1",
      date: "2026-10-29",
      model_version: "2.1",
      model_uuid: "fe3bdd50-fac0-45fe-8783-836f20868bdc",
      model_name: "roys_betting_engine_over_1_5_goals",
      stake: 100,
      combined_odds: combined_odds,
      estimated_ticket_probability: estimated_ticket_probability,
      status: "pending",
      actual_result: null,
      profit_loss: 0,
      notes: "3-leg Over 1.5 accumulator ticket generated using Roy's Betting Engine v2.1 Dual-Baseline Protocol. Comprises selections across Bulgaria Second League (Yantra vs Hebar Pazardzhik), Peru Liga 1 (Sporting Cristal vs Alianza Lima), and Egypt Premier League (Pyramids vs Wadi Degla). Combined odds 1.98 vs estimated ticket probability 51.7% (break-even 50.5%, value edge +1.2pp). Accompanied by 6 considered alternatives (Fiorentina vs Atalanta, Atletico MG vs Cruzeiro, Frosinone vs Lecce, Modern Sport vs Al Ahly, Sutjeska vs Jezero, Mixco vs Xelaju) with full venue statistical parity and dual-baseline alignment tracking."
    },
    selections: selections,
    alternatives: alternatives
  };

  const outPath = path.resolve(__dirname, '../october/ticket_2026-10-29_001.json');
  fs.writeFileSync(outPath, JSON.stringify(ticketPayload, null, 2), 'utf8');
  console.log(`Successfully generated ticket JSON to ${outPath}`);
  console.log(`Selections count: ${selections.length}`);
  console.log(`Alternatives count: ${alternatives.length}`);
  console.log(`Combined odds: ${combined_odds}`);
  console.log(`Estimated ticket probability: ${estimated_ticket_probability}`);
}

main();

