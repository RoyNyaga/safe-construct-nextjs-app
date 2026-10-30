/**
 * Ticket Generator for 2026-10-30 (Ticket S-28-v2.1) - Final Ticket
 * Adheres strictly to Model 2.1 Venue & Overall Stats Separation, Dual-Baseline Protocol, and Organization Rules
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 4 Main Selections chosen by User
const SELECTED_MATCH_IDS = [
  10, // 1) SV Elversberg vs 1. FSV Mainz 05
  11, // 2) Arminia Bielefeld vs Eintracht Braunschweig
  17, // 3) Helmond Sport vs FC Eindhoven
  23  // 4) JS Kabylie vs JS El Biar
];

// 5 Alternatives chosen by User
const ALTERNATIVE_MATCH_IDS = [
  2,  // 1) OGC Nice vs Stade Rennais
  3,  // 2) Le Havre vs Paris Saint-Germain
  15, // 3) KAA Gent B vs K. Lierse Kempenzonen
  13, // 4) Casa Pia AC vs Sporting CP
  12  // 5) Energie Cottbus vs VfL Bochum
];

const RAW_FIXTURES = [
  // 1. Spain La Liga
  {
    id: 1,
    home_team: "Villarreal",
    away_team: "Espanyol",
    country: "Spain",
    league: "La Liga",
    match_date: "2026-10-30",
    odds: 1.20,
    home_league_position: 10,
    away_league_position: 18,
    home_matches_played: 10,
    away_matches_played: 10,
    home_goals_scored: 15,
    home_goals_conceded: 14,
    away_goals_scored: 12,
    away_goals_conceded: 14,
    home_venue_matches: 4,
    home_venue_goals_scored: 6,
    home_venue_goals_conceded: 6,
    away_venue_matches: 5,
    away_venue_goals_scored: 6,
    away_venue_goals_conceded: 7,
    current_league_home_avg: 1.48,
    current_league_away_avg: 1.15,
    historical_league_home_avg: 1.45,
    historical_league_away_avg: 1.10,
    comment: "CAUTION. Model estimates an 79.8% Over 1.5 probability versus bookmaker break-even of 83.3% at 1.20 odds (-3.5pp edge, -0.042 EV). High probability (79.8%), but pricing offers no positive edge.",
    notes: "Villarreal home goals: 6 GF, 6 GA in 4 matches; Espanyol away goals: 6 GF, 7 GA in 5 matches."
  },

  // 2. France Ligue 1
  {
    id: 2,
    home_team: "OGC Nice",
    away_team: "Stade Rennais",
    country: "France",
    league: "Ligue 1",
    match_date: "2026-10-30",
    odds: 1.18,
    home_league_position: 10,
    away_league_position: 2,
    home_matches_played: 8,
    away_matches_played: 8,
    home_goals_scored: 8,
    home_goals_conceded: 10,
    away_goals_scored: 18,
    away_goals_conceded: 14,
    home_venue_matches: 4,
    home_venue_goals_scored: 5,
    home_venue_goals_conceded: 3,
    away_venue_matches: 3,
    away_venue_goals_scored: 5,
    away_venue_goals_conceded: 9,
    current_league_home_avg: 1.52,
    current_league_away_avg: 1.22,
    historical_league_home_avg: 1.50,
    historical_league_away_avg: 1.20,
    comment: "SELECT. Model estimates an 86.3% Over 1.5 probability versus bookmaker break-even of 84.7% at 1.18 odds (+1.6pp edge, +0.019 EV). Strong probability (86.3%) supported by positive edge (+1.6pp, EV +0.019) and acceptable risk profile.",
    notes: "Nice home goals: 5 GF, 3 GA in 4 matches; Rennes away goals: 5 GF, 9 GA in 3 matches."
  },
  {
    id: 3,
    home_team: "Le Havre",
    away_team: "Paris Saint-Germain",
    country: "France",
    league: "Ligue 1",
    match_date: "2026-10-30",
    odds: 1.12,
    home_league_position: 18,
    away_league_position: 1,
    home_matches_played: 8,
    away_matches_played: 8,
    home_goals_scored: 8,
    home_goals_conceded: 15,
    away_goals_scored: 16,
    away_goals_conceded: 9,
    home_venue_matches: 4,
    home_venue_goals_scored: 2,
    home_venue_goals_conceded: 6,
    away_venue_matches: 5,
    away_venue_goals_scored: 10,
    away_venue_goals_conceded: 6,
    current_league_home_avg: 1.52,
    current_league_away_avg: 1.22,
    historical_league_home_avg: 1.50,
    historical_league_away_avg: 1.20,
    comment: "NO BET. Model estimates an 77.8% Over 1.5 probability versus bookmaker break-even of 89.3% at 1.12 odds (-11.5pp edge, -0.129 EV). Significant negative expected value (-0.129) and pricing mismatch (-11.5pp edge) violate Principle 8.",
    notes: "Le Havre home goals: 2 GF, 6 GA in 4 matches; PSG away goals: 10 GF, 6 GA in 5 matches."
  },
  {
    id: 4,
    home_team: "Lille OSC",
    away_team: "Lens",
    country: "France",
    league: "Ligue 1",
    match_date: "2026-10-30",
    odds: 1.26,
    home_league_position: 3,
    away_league_position: 7,
    home_matches_played: 8,
    away_matches_played: 8,
    home_goals_scored: 11,
    home_goals_conceded: 6,
    away_goals_scored: 16,
    away_goals_conceded: 12,
    home_venue_matches: 4,
    home_venue_goals_scored: 6,
    home_venue_goals_conceded: 3,
    away_venue_matches: 4,
    away_venue_goals_scored: 7,
    away_venue_goals_conceded: 7,
    current_league_home_avg: 1.52,
    current_league_away_avg: 1.22,
    historical_league_home_avg: 1.50,
    historical_league_away_avg: 1.20,
    comment: "CAUTION. Model estimates an 76.9% Over 1.5 probability versus bookmaker break-even of 79.4% at 1.26 odds (-2.4pp edge, -0.031 EV). High probability (76.9%), but pricing offers no positive edge.",
    notes: "Lille home goals: 6 GF, 3 GA in 4 matches; Lens away goals: 7 GF, 7 GA in 4 matches."
  },

  // 3. France Ligue 2
  {
    id: 7,
    home_team: "Metz",
    away_team: "Pau FC",
    country: "France",
    league: "Ligue 2",
    match_date: "2026-10-30",
    odds: 1.25,
    home_league_position: 8,
    away_league_position: 5,
    home_matches_played: 10,
    away_matches_played: 10,
    home_goals_scored: 16,
    home_goals_conceded: 14,
    away_goals_scored: 13,
    away_goals_conceded: 10,
    home_venue_matches: 5,
    home_venue_goals_scored: 12,
    home_venue_goals_conceded: 7,
    away_venue_matches: 4,
    away_venue_goals_scored: 5,
    away_venue_goals_conceded: 4,
    current_league_home_avg: 1.38,
    current_league_away_avg: 1.08,
    historical_league_home_avg: 1.35,
    historical_league_away_avg: 1.05,
    comment: "SELECT. Model estimates an 84.8% Over 1.5 probability versus bookmaker break-even of 80.0% at 1.25 odds (+4.8pp edge, +0.061 EV). Strong probability (84.8%) supported by positive edge (+4.8pp, EV +0.061) and acceptable risk profile.",
    notes: "Metz home goals: 12 GF, 7 GA in 5 matches; Pau away goals: 5 GF, 4 GA in 4 matches."
  },
  {
    id: 8,
    home_team: "Nantes",
    away_team: "Clermont Foot",
    country: "France",
    league: "Ligue 2",
    match_date: "2026-10-30",
    odds: 1.23,
    home_league_position: 15,
    away_league_position: 17,
    home_matches_played: 10,
    away_matches_played: 10,
    home_goals_scored: 11,
    home_goals_conceded: 17,
    away_goals_scored: 9,
    away_goals_conceded: 14,
    home_venue_matches: 5,
    home_venue_goals_scored: 5,
    home_venue_goals_conceded: 9,
    away_venue_matches: 4,
    away_venue_goals_scored: 6,
    away_venue_goals_conceded: 8,
    current_league_home_avg: 1.38,
    current_league_away_avg: 1.08,
    historical_league_home_avg: 1.35,
    historical_league_away_avg: 1.05,
    comment: "SELECT. Model estimates an 90.5% Over 1.5 probability versus bookmaker break-even of 81.3% at 1.23 odds (+9.2pp edge, +0.113 EV). Strong probability (90.5%) supported by positive edge (+9.2pp, EV +0.113) and acceptable risk profile.",
    notes: "Nantes home goals: 5 GF, 9 GA in 5 matches; Clermont away goals: 6 GF, 8 GA in 4 matches."
  },
  {
    id: 9,
    home_team: "Rodez",
    away_team: "USL Dunkerque",
    country: "France",
    league: "Ligue 2",
    match_date: "2026-10-30",
    odds: 1.16,
    home_league_position: 14,
    away_league_position: 10,
    home_matches_played: 10,
    away_matches_played: 10,
    home_goals_scored: 16,
    home_goals_conceded: 22,
    away_goals_scored: 14,
    away_goals_conceded: 16,
    home_venue_matches: 5,
    home_venue_goals_scored: 8,
    home_venue_goals_conceded: 11,
    away_venue_matches: 4,
    away_venue_goals_scored: 5,
    away_venue_goals_conceded: 10,
    current_league_home_avg: 1.38,
    current_league_away_avg: 1.08,
    historical_league_home_avg: 1.35,
    historical_league_away_avg: 1.05,
    comment: "SELECT. Model estimates an 97.2% Over 1.5 probability versus bookmaker break-even of 86.2% at 1.16 odds (+11.0pp edge, +0.128 EV). Strong probability (97.2%) supported by positive edge (+11.0pp, EV +0.128) and acceptable risk profile.",
    notes: "Rodez home goals: 8 GF, 11 GA in 5 matches; Dunkerque away goals: 5 GF, 10 GA in 4 matches."
  },

  // 4. Germany Bundesliga
  {
    id: 10,
    home_team: "SV Elversberg",
    away_team: "1. FSV Mainz 05",
    country: "Germany",
    league: "Bundesliga",
    match_date: "2026-10-30",
    odds: 1.14,
    home_league_position: 8,
    away_league_position: 7,
    home_matches_played: 7,
    away_matches_played: 7,
    home_goals_scored: 12,
    home_goals_conceded: 15,
    away_goals_scored: 16,
    away_goals_conceded: 13,
    home_venue_matches: 3,
    home_venue_goals_scored: 8,
    home_venue_goals_conceded: 7,
    away_venue_matches: 3,
    away_venue_goals_scored: 10,
    away_venue_goals_conceded: 3,
    current_league_home_avg: 1.62,
    current_league_away_avg: 1.38,
    historical_league_home_avg: 1.60,
    historical_league_away_avg: 1.35,
    comment: "CAUTION. Model estimates an 99.4% Over 1.5 probability versus bookmaker break-even of 87.7% at 1.14 odds (+11.7pp edge, +0.134 EV). Multiple medium warnings (SMALL_SAMPLE, HIGH_LINE_RELIANCE) warrant measured caution.",
    notes: "Elversberg home goals: 8 GF, 7 GA in 3 matches; Mainz 05 away goals: 10 GF, 3 GA in 3 matches."
  },

  // 5. Germany 2. Bundesliga
  {
    id: 11,
    home_team: "Arminia Bielefeld",
    away_team: "Eintracht Braunschweig",
    country: "Germany",
    league: "2. Bundesliga",
    match_date: "2026-10-30",
    odds: 1.21,
    home_league_position: 9,
    away_league_position: 10,
    home_matches_played: 9,
    away_matches_played: 9,
    home_goals_scored: 16,
    home_goals_conceded: 11,
    away_goals_scored: 15,
    away_goals_conceded: 15,
    home_venue_matches: 4,
    home_venue_goals_scored: 9,
    home_venue_goals_conceded: 5,
    away_venue_matches: 4,
    away_venue_goals_scored: 7,
    away_venue_goals_conceded: 7,
    current_league_home_avg: 1.58,
    current_league_away_avg: 1.32,
    historical_league_home_avg: 1.55,
    historical_league_away_avg: 1.30,
    comment: "SELECT. Model estimates an 91.9% Over 1.5 probability versus bookmaker break-even of 82.6% at 1.21 odds (+9.2pp edge, +0.112 EV). Strong probability (91.9%) supported by positive edge (+9.2pp, EV +0.112) and acceptable risk profile.",
    notes: "Bielefeld home goals: 9 GF, 5 GA in 4 matches; Braunschweig away goals: 7 GF, 7 GA in 4 matches."
  },
  {
    id: 12,
    home_team: "Energie Cottbus",
    away_team: "VfL Bochum",
    country: "Germany",
    league: "2. Bundesliga",
    match_date: "2026-10-30",
    odds: 1.18,
    home_league_position: 11,
    away_league_position: 14,
    home_matches_played: 9,
    away_matches_played: 9,
    home_goals_scored: 17,
    home_goals_conceded: 18,
    away_goals_scored: 6,
    away_goals_conceded: 10,
    home_venue_matches: 4,
    home_venue_goals_scored: 8,
    home_venue_goals_conceded: 7,
    away_venue_matches: 4,
    away_venue_goals_scored: 4,
    away_venue_goals_conceded: 5,
    current_league_home_avg: 1.58,
    current_league_away_avg: 1.32,
    historical_league_home_avg: 1.55,
    historical_league_away_avg: 1.30,
    comment: "CAUTION. Model estimates an 78.7% Over 1.5 probability versus bookmaker break-even of 84.7% at 1.18 odds (-6.1pp edge, -0.072 EV). High probability (78.7%), but pricing offers no positive edge.",
    notes: "Cottbus home goals: 8 GF, 7 GA in 4 matches; Bochum away goals: 4 GF, 5 GA in 4 matches."
  },

  // 6. Liga Portugal
  {
    id: 13,
    home_team: "Casa Pia AC",
    away_team: "Sporting CP",
    country: "Portugal",
    league: "Liga Portugal",
    match_date: "2026-10-30",
    odds: 1.20,
    home_league_position: 15,
    away_league_position: 3,
    home_matches_played: 9,
    away_matches_played: 9,
    home_goals_scored: 5,
    home_goals_conceded: 17,
    away_goals_scored: 21,
    away_goals_conceded: 10,
    home_venue_matches: 4,
    home_venue_goals_scored: 1,
    home_venue_goals_conceded: 13,
    away_venue_matches: 4,
    away_venue_goals_scored: 10,
    away_venue_goals_conceded: 4,
    current_league_home_avg: 1.46,
    current_league_away_avg: 1.16,
    historical_league_home_avg: 1.45,
    historical_league_away_avg: 1.15,
    comment: "CAUTION. Model estimates an 99.4% Over 1.5 probability versus bookmaker break-even of 83.3% at 1.20 odds (+16.0pp edge, +0.192 EV). Model probability is viable, but high contradictory warning (LOW_HOME_SCORING) requires caution.",
    notes: "Casa Pia home goals: 1 GF, 13 GA in 4 matches; Sporting CP away goals: 10 GF, 4 GA in 4 matches."
  },

  // 8. Belgium Challenger Pro League
  {
    id: 15,
    home_team: "KAA Gent B",
    away_team: "K. Lierse Kempenzonen",
    country: "Belgium",
    league: "Challenger Pro League",
    match_date: "2026-10-30",
    odds: 1.19,
    home_league_position: 10,
    away_league_position: 8,
    home_matches_played: 6,
    away_matches_played: 6,
    home_goals_scored: 7,
    home_goals_conceded: 9,
    away_goals_scored: 8,
    away_goals_conceded: 10,
    home_venue_matches: 3,
    home_venue_goals_scored: 4,
    home_venue_goals_conceded: 4,
    away_venue_matches: 3,
    away_venue_goals_scored: 4,
    away_venue_goals_conceded: 5,
    current_league_home_avg: 1.44,
    current_league_away_avg: 1.22,
    historical_league_home_avg: 1.45,
    historical_league_away_avg: 1.20,
    comment: "CAUTION. Model estimates an 80.1% Over 1.5 probability versus bookmaker break-even of 84.0% at 1.19 odds (-3.9pp edge, -0.047 EV). High probability (80.1%), but pricing offers no positive edge.",
    notes: "Gent B home goals: 4 GF, 4 GA in 3 matches; Lierse away goals: 4 GF, 5 GA in 3 matches."
  },
  {
    id: 16,
    home_team: "RFC Seraing",
    away_team: "RFC Liege",
    country: "Belgium",
    league: "Challenger Pro League",
    match_date: "2026-10-30",
    odds: 1.22,
    home_league_position: 14,
    away_league_position: 13,
    home_matches_played: 7,
    away_matches_played: 7,
    home_goals_scored: 5,
    home_goals_conceded: 12,
    away_goals_scored: 6,
    away_goals_conceded: 13,
    home_venue_matches: 4,
    home_venue_goals_scored: 5,
    home_venue_goals_conceded: 6,
    away_venue_matches: 4,
    away_venue_goals_scored: 5,
    away_venue_goals_conceded: 10,
    current_league_home_avg: 1.44,
    current_league_away_avg: 1.22,
    historical_league_home_avg: 1.45,
    historical_league_away_avg: 1.20,
    comment: "SELECT. Model estimates an 88.4% Over 1.5 probability versus bookmaker break-even of 82.0% at 1.22 odds (+6.5pp edge, +0.079 EV). Strong probability (88.4%) supported by positive edge (+6.5pp, EV +0.079) and acceptable risk profile.",
    notes: "Seraing home goals: 5 GF, 6 GA in 4 matches; RFC Liege away goals: 5 GF, 10 GA in 4 matches."
  },

  // 9. Netherlands Eerste Divisie
  {
    id: 17,
    home_team: "Helmond Sport",
    away_team: "FC Eindhoven",
    country: "Netherlands",
    league: "Eerste Divisie",
    match_date: "2026-10-30",
    odds: 1.18,
    home_league_position: 19,
    away_league_position: 17,
    home_matches_played: 12,
    away_matches_played: 12,
    home_goals_scored: 20,
    home_goals_conceded: 26,
    away_goals_scored: 16,
    away_goals_conceded: 25,
    home_venue_matches: 6,
    home_venue_goals_scored: 11,
    home_venue_goals_conceded: 9,
    away_venue_matches: 5,
    away_venue_goals_scored: 10,
    away_venue_goals_conceded: 7,
    current_league_home_avg: 1.68,
    current_league_away_avg: 1.38,
    historical_league_home_avg: 1.65,
    historical_league_away_avg: 1.35,
    comment: "SELECT. Model estimates an 88.4% Over 1.5 probability versus bookmaker break-even of 84.7% at 1.18 odds (+3.6pp edge, +0.043 EV). Strong probability (88.4%) supported by positive edge (+3.6pp, EV +0.043) and acceptable risk profile.",
    notes: "Helmond Sport home goals: 11 GF, 9 GA in 6 matches; FC Eindhoven away goals: 10 GF, 7 GA in 5 matches."
  },

  // 11. Turkey TFF 1. Lig
  {
    id: 20,
    home_team: "Esenler Erokspor",
    away_team: "Ankara Keciorengucu",
    country: "Turkey",
    league: "TFF 1. Lig",
    match_date: "2026-10-30",
    odds: 1.18,
    home_league_position: 15,
    away_league_position: 6,
    home_matches_played: 12,
    away_matches_played: 12,
    home_goals_scored: 12,
    home_goals_conceded: 16,
    away_goals_scored: 23,
    away_goals_conceded: 15,
    home_venue_matches: 6,
    home_venue_goals_scored: 7,
    home_venue_goals_conceded: 7,
    away_venue_matches: 6,
    away_venue_goals_scored: 11,
    away_venue_goals_conceded: 8,
    current_league_home_avg: 1.46,
    current_league_away_avg: 1.18,
    historical_league_home_avg: 1.45,
    historical_league_away_avg: 1.15,
    comment: "CAUTION. Model estimates an 78.2% Over 1.5 probability versus bookmaker break-even of 84.7% at 1.18 odds (-6.6pp edge, -0.077 EV). High probability (78.2%), but pricing offers no positive edge.",
    notes: "Esenler Erokspor home goals: 7 GF, 7 GA in 6 matches; Keciorengucu away goals: 11 GF, 8 GA in 6 matches."
  },

  // 13. Algeria Ligue 1
  {
    id: 23,
    home_team: "JS Kabylie",
    away_team: "JS El Biar",
    country: "Algeria",
    league: "Ligue 1",
    match_date: "2026-10-30",
    odds: 1.36,
    home_league_position: 3,
    away_league_position: 8,
    home_matches_played: 6,
    away_matches_played: 7,
    home_goals_scored: 10,
    home_goals_conceded: 3,
    away_goals_scored: 12,
    away_goals_conceded: 11,
    home_venue_matches: 3,
    home_venue_goals_scored: 6,
    home_venue_goals_conceded: 1,
    away_venue_matches: 3,
    away_venue_goals_scored: 5,
    away_venue_goals_conceded: 7,
    current_league_home_avg: 1.22,
    current_league_away_avg: 0.88,
    historical_league_home_avg: 1.25,
    historical_league_away_avg: 0.90,
    comment: "CAUTION. Model estimates an 93.7% Over 1.5 probability versus bookmaker break-even of 73.5% at 1.36 odds (+20.1pp edge, +0.274 EV). Multiple medium warnings (SMALL_SAMPLE, HIGH_LINE_RELIANCE) warrant measured caution.",
    notes: "JS Kabylie home goals: 6 GF, 1 GA in 3 matches; JS El Biar away goals: 5 GF, 7 GA in 3 matches."
  }
];

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

  if ((home_ga_pg <= 0.85 && away_ga_pg <= 0.85) || home_ga_pg === 0 || away_ga_pg === 0) {
    warnings.push({
      type: "STRONG_DEFENSIVE_MATCHUP",
      severity: "HIGH",
      direction: "CONTRADICTORY",
      market_relevance: "DIRECT",
      description: "Exceptionally tight defensive record elevating clean-sheet / low-scoring risk.",
      evidence: `${f.home_team} concedes ${home_ga_pg.toFixed(2)} GA/game and ${f.away_team} concedes ${away_ga_pg.toFixed(2)} GA/game.`
    });
  }

  if (lambda_total > 0) {
    if (lambda_home / lambda_total > 0.75) {
      warnings.push({
        type: "HIGH_LINE_RELIANCE",
        severity: "MEDIUM",
        direction: "CONTRADICTORY",
        market_relevance: "INDIRECT",
        description: `Over 75% of expected goals depend exclusively on ${f.home_team}.`,
        evidence: `Home expected goals (${lambda_home.toFixed(2)}) account for ${((lambda_home / lambda_total) * 100).toFixed(0)}% of total expected output (${lambda_total.toFixed(2)}).`
      });
    } else if (lambda_away / lambda_total > 0.75) {
      warnings.push({
        type: "HIGH_LINE_RELIANCE",
        severity: "MEDIUM",
        direction: "CONTRADICTORY",
        market_relevance: "INDIRECT",
        description: `Over 75% of expected goals depend exclusively on ${f.away_team}.`,
        evidence: `Away expected goals (${lambda_away.toFixed(2)}) account for ${((lambda_away / lambda_total) * 100).toFixed(0)}% of total expected output (${lambda_total.toFixed(2)}).`
      });
    }
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
    if (!f) throw new Error(`Fixture ID ${id} not found`);
    return mapFixtureToPayload(f);
  });

  const alternatives = ALTERNATIVE_MATCH_IDS.map(id => {
    const f = RAW_FIXTURES.find(x => x.id === id);
    if (!f) throw new Error(`Alternative ID ${id} not found`);
    return mapFixtureToPayload(f);
  });

  // Calculate combined odds and probability for selections
  const combined_odds = Number(selections.reduce((acc, s) => acc * s.odds, 1).toFixed(2));
  const estimated_ticket_probability = Number(selections.reduce((acc, s) => acc * s.estimated_probability, 1).toFixed(3));

  const ticketPayload = {
    ticket: {
      ticket_number: "S-28-v2.1",
      date: "2026-10-30",
      model_version: "2.1",
      model_uuid: "fe3bdd50-fac0-45fe-8783-836f20868bdc",
      model_name: "roys_betting_engine_over_1_5_goals",
      stake: 100,
      combined_odds: combined_odds,
      estimated_ticket_probability: estimated_ticket_probability,
      status: "pending",
      actual_result: null,
      profit_loss: 0,
      notes: "4-leg Over 1.5 accumulator ticket generated using Roy's Betting Engine v2.1 Dual-Baseline Protocol. Comprises selections across Germany Bundesliga (Elversberg vs Mainz 05), Germany 2. Bundesliga (Arminia Bielefeld vs Braunschweig), Netherlands Eerste Divisie (Helmond Sport vs FC Eindhoven), and Algeria Ligue 1 (JS Kabylie vs JS El Biar). Combined odds 2.21 vs estimated ticket probability 75.7% (break-even 45.2%, value edge +30.5pp). Accompanied by 5 considered alternatives (OGC Nice vs Stade Rennais, Le Havre vs PSG, KAA Gent B vs Lierse, Casa Pia vs Sporting CP, Energie Cottbus vs VfL Bochum) with full venue statistical parity and dual-baseline alignment tracking."
    },
    selections: selections,
    alternatives: alternatives
  };

  const outPath = path.resolve(__dirname, '../october/ticket_2026-10-30_001.json');
  fs.writeFileSync(outPath, JSON.stringify(ticketPayload, null, 2), 'utf8');
  console.log(`Successfully generated ticket JSON to ${outPath}`);
  console.log(`Selections count: ${selections.length}`);
  console.log(`Alternatives count: ${alternatives.length}`);
  console.log(`Combined odds: ${combined_odds}`);
  console.log(`Estimated ticket probability: ${estimated_ticket_probability}`);
}

main();
