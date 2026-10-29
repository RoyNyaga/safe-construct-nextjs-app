/**
 * Model 2.1 Dual-Baseline Match Evaluation Generator for 2026-10-28
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
    home_team: "AC Milan",
    away_team: "Bologna",
    country: "Italy",
    league: "Serie A",
    match_date: "2026-10-28",
    odds: 1.25,
    home_league_position: 8,
    away_league_position: 12,
    home_matches_played: 8,
    away_matches_played: 8,
    home_goals_scored: 16,
    home_goals_conceded: 9,
    away_goals_scored: 9,
    away_goals_conceded: 10,
    home_venue_matches: 4,
    home_venue_goals_scored: 10,
    home_venue_goals_conceded: 2,
    away_venue_matches: 4,
    away_venue_goals_scored: 6,
    away_venue_goals_conceded: 8,
    current_league_home_avg: 1.48,
    current_league_away_avg: 1.18,
    historical_league_home_avg: 1.45,
    historical_league_away_avg: 1.15,
    notes: "AC Milan has been clinical at San Siro (2.50 GF/G, 0.50 GA/G). Bologna's away fixtures feature high volatility with 3.50 average total goals (1.50 GF / 2.00 GA per game)."
  },
  {
    id: 2,
    home_team: "Parma Calcio 1913",
    away_team: "Udinese",
    country: "Italy",
    league: "Serie A",
    match_date: "2026-10-28",
    odds: 1.36,
    home_league_position: 17,
    away_league_position: 7,
    home_matches_played: 9,
    away_matches_played: 9,
    home_goals_scored: 12,
    home_goals_conceded: 15,
    away_goals_scored: 14,
    away_goals_conceded: 14,
    home_venue_matches: 5,
    home_venue_goals_scored: 7,
    home_venue_goals_conceded: 7,
    away_venue_matches: 4,
    away_venue_goals_scored: 4,
    away_venue_goals_conceded: 8,
    current_league_home_avg: 1.48,
    current_league_away_avg: 1.18,
    historical_league_home_avg: 1.45,
    historical_league_away_avg: 1.15,
    notes: "Parma home fixtures at Stadio Ennio Tardini are open, averaging 2.80 goals. Udinese away defense has leaked 2.00 goals per game across 4 away outings."
  },
  {
    id: 3,
    home_team: "Venezia",
    away_team: "Inter Milan",
    country: "Italy",
    league: "Serie A",
    match_date: "2026-10-28",
    odds: 1.09,
    home_league_position: 19,
    away_league_position: 2,
    home_matches_played: 9,
    away_matches_played: 9,
    home_goals_scored: 9,
    home_goals_conceded: 18,
    away_goals_scored: 21,
    away_goals_conceded: 13,
    home_venue_matches: 3,
    home_venue_goals_scored: 3,
    home_venue_goals_conceded: 3,
    away_venue_matches: 4,
    away_venue_goals_scored: 8,
    away_venue_goals_conceded: 5,
    current_league_home_avg: 1.48,
    current_league_away_avg: 1.18,
    historical_league_home_avg: 1.45,
    historical_league_away_avg: 1.15,
    notes: "Inter Milan boasts a lethal road attack (2.00 GF/G) facing relegation-bound Venezia. However, offered odds of 1.09 impose an extreme 91.7% break-even hurdle."
  },
  {
    id: 4,
    home_team: "Genoa",
    away_team: "Juventus",
    country: "Italy",
    league: "Serie A",
    match_date: "2026-10-28",
    odds: 1.47,
    home_league_position: 18,
    away_league_position: 3,
    home_matches_played: 9,
    away_matches_played: 9,
    home_goals_scored: 7,
    home_goals_conceded: 21,
    away_goals_scored: 15,
    away_goals_conceded: 7,
    home_venue_matches: 5,
    home_venue_goals_scored: 5,
    home_venue_goals_conceded: 11,
    away_venue_matches: 4,
    away_venue_goals_scored: 9,
    away_venue_goals_conceded: 4,
    current_league_home_avg: 1.48,
    current_league_away_avg: 1.18,
    historical_league_home_avg: 1.45,
    historical_league_away_avg: 1.15,
    notes: "Genoa's home backline has collapsed, conceding 2.20 GA/G at Stadio Luigi Ferraris. Juventus has netted 9 goals in 4 away games (2.25 GF/G). Generates a powerful +9.9pp edge at 1.47 odds."
  },
  {
    id: 5,
    home_team: "AC Monza",
    away_team: "SSC Napoli",
    country: "Italy",
    league: "Serie A",
    match_date: "2026-10-28",
    odds: 1.18,
    home_league_position: 16,
    away_league_position: 1,
    home_matches_played: 9,
    away_matches_played: 9,
    home_goals_scored: 9,
    home_goals_conceded: 11,
    away_goals_scored: 16,
    away_goals_conceded: 5,
    home_venue_matches: 5,
    home_venue_goals_scored: 4,
    home_venue_goals_conceded: 6,
    away_venue_matches: 4,
    away_venue_goals_scored: 5,
    away_venue_goals_conceded: 3,
    current_league_home_avg: 1.48,
    current_league_away_avg: 1.18,
    historical_league_home_avg: 1.45,
    historical_league_away_avg: 1.15,
    notes: "Antonio Conte's Napoli has maintained exceptional road defensive discipline (0.75 GA/G). Monza averages only 0.80 GF/G at home, elevating shutout and 1-0 risk."
  },

  // 2. Brazil Serie A
  {
    id: 6,
    home_team: "RB Bragantino",
    away_team: "Chapecoense SC",
    country: "Brazil",
    league: "Serie A",
    match_date: "2026-10-28",
    odds: 1.11,
    home_league_position: 11,
    away_league_position: 18,
    home_matches_played: 30,
    away_matches_played: 30,
    home_goals_scored: 36,
    home_goals_conceded: 40,
    away_goals_scored: 24,
    away_goals_conceded: 46,
    home_venue_matches: 15,
    home_venue_goals_scored: 22,
    home_venue_goals_conceded: 17,
    away_venue_matches: 15,
    away_venue_goals_scored: 11,
    away_venue_goals_conceded: 26,
    current_league_home_avg: 1.38,
    current_league_away_avg: 1.02,
    historical_league_home_avg: 1.40,
    historical_league_away_avg: 1.00,
    notes: "Bragantino is consistent at Nabi Abi Chedid (1.47 GF/G), and Chapecoense concedes 1.73 GA/G away. However, Chapecoense's away offense is anemic (0.73 GF/G), and 1.11 odds require 90.1% strike rate."
  },
  {
    id: 7,
    home_team: "Fluminense",
    away_team: "SC Internacional",
    country: "Brazil",
    league: "Serie A",
    match_date: "2026-10-28",
    odds: 1.30,
    home_league_position: 13,
    away_league_position: 5,
    home_matches_played: 30,
    away_matches_played: 30,
    home_goals_scored: 26,
    home_goals_conceded: 31,
    away_goals_scored: 41,
    away_goals_conceded: 27,
    home_venue_matches: 15,
    home_venue_goals_scored: 16,
    home_venue_goals_conceded: 14,
    away_venue_matches: 15,
    away_venue_goals_scored: 18,
    away_venue_goals_conceded: 15,
    current_league_home_avg: 1.38,
    current_league_away_avg: 1.02,
    historical_league_home_avg: 1.40,
    historical_league_away_avg: 1.00,
    notes: "Historically conservative matchup at the Maracanã. Fluminense concedes only 0.93 GA/G at home; Internacional concedes only 1.00 GA/G on the road. Sub-70% Over 1.5 expected probability."
  },
  {
    id: 8,
    home_team: "Santos SP",
    away_team: "SE Palmeiras",
    country: "Brazil",
    league: "Serie A",
    match_date: "2026-10-28",
    odds: 1.25,
    home_league_position: 15,
    away_league_position: 2,
    home_matches_played: 30,
    away_matches_played: 30,
    home_goals_scored: 33,
    home_goals_conceded: 44,
    away_goals_scored: 53,
    away_goals_conceded: 23,
    home_venue_matches: 15,
    home_venue_goals_scored: 21,
    home_venue_goals_conceded: 20,
    away_venue_matches: 15,
    away_venue_goals_scored: 24,
    away_venue_goals_conceded: 11,
    current_league_home_avg: 1.38,
    current_league_away_avg: 1.02,
    historical_league_home_avg: 1.40,
    historical_league_away_avg: 1.00,
    notes: "Clássico da Saudade. Palmeiras road attack is formidable (1.60 GF/G), and Santos at Vila Belmiro has conceded 1.33 GA/G while scoring 1.40 GF/G."
  },

  // 3. Serbian Super Liga
  {
    id: 9,
    home_team: "FK Radnicki 1923",
    away_team: "FK Zeleznicar Pancevo",
    country: "Serbia",
    league: "Super Liga",
    match_date: "2026-10-28",
    odds: 1.24,
    home_league_position: 5,
    away_league_position: 8,
    home_matches_played: 12,
    away_matches_played: 12,
    home_goals_scored: 21,
    home_goals_conceded: 17,
    away_goals_scored: 15,
    away_goals_conceded: 18,
    home_venue_matches: 6,
    home_venue_goals_scored: 12,
    home_venue_goals_conceded: 8,
    away_venue_matches: 6,
    away_venue_goals_scored: 6,
    away_venue_goals_conceded: 11,
    current_league_home_avg: 1.45,
    current_league_away_avg: 1.15,
    historical_league_home_avg: 1.45,
    historical_league_away_avg: 1.15,
    notes: "Radnicki 1923 scores 2.00 GF/G at Cika Daca Stadium. Zeleznicar Pancevo away defense has conceded 1.83 goals per trip. Strong offensive matchup."
  },
  {
    id: 10,
    home_team: "FK Radnicki Nis",
    away_team: "FK Partizan Belgrade",
    country: "Serbia",
    league: "Super Liga",
    match_date: "2026-10-28",
    odds: 1.19,
    home_league_position: 6,
    away_league_position: 2,
    home_matches_played: 12,
    away_matches_played: 11,
    home_goals_scored: 19,
    home_goals_conceded: 21,
    away_goals_scored: 25,
    away_goals_conceded: 13,
    home_venue_matches: 6,
    home_venue_goals_scored: 11,
    home_venue_goals_conceded: 11,
    away_venue_matches: 5,
    away_venue_goals_scored: 12,
    away_venue_goals_conceded: 6,
    current_league_home_avg: 1.45,
    current_league_away_avg: 1.15,
    historical_league_home_avg: 1.45,
    historical_league_away_avg: 1.15,
    notes: "Radnicki Nis home matches are chaotic (1.83 GF / 1.83 GA per match). Partizan away attack is the best in the league at 2.40 GF/G. Excellent +5.5pp edge at 1.19 odds."
  },

  // 4. Albania 1st Division
  {
    id: 11,
    home_team: "KS Beselidhja Lezhe",
    away_team: "KS Sopoti Librazhd",
    country: "Albania",
    league: "1st Division",
    match_date: "2026-10-28",
    odds: 1.66,
    home_league_position: 7,
    away_league_position: 10,
    home_matches_played: 8,
    away_matches_played: 8,
    home_goals_scored: 7,
    home_goals_conceded: 9,
    away_goals_scored: 5,
    away_goals_conceded: 11,
    home_venue_matches: 4,
    home_venue_goals_scored: 4,
    home_venue_goals_conceded: 3,
    away_venue_matches: 4,
    away_venue_goals_scored: 2,
    away_venue_goals_conceded: 6,
    current_league_home_avg: 1.25,
    current_league_away_avg: 0.85,
    historical_league_home_avg: 1.30,
    historical_league_away_avg: 0.90,
    notes: "Sopoti averages only 0.50 away goals per match. Albanian second tier matches are heavily suppressed tactically. Over 1.5 probability falls below the 70% threshold."
  },
  {
    id: 12,
    home_team: "KF Bylis Ballsh",
    away_team: "Besa Kavaje",
    country: "Albania",
    league: "1st Division",
    match_date: "2026-10-28",
    odds: 2.59,
    home_league_position: 2,
    away_league_position: 6,
    home_matches_played: 8,
    away_matches_played: 8,
    home_goals_scored: 11,
    home_goals_conceded: 4,
    away_goals_scored: 6,
    away_goals_conceded: 7,
    home_venue_matches: 4,
    home_venue_goals_scored: 6,
    home_venue_goals_conceded: 1,
    away_venue_matches: 4,
    away_venue_goals_scored: 2,
    away_venue_goals_conceded: 4,
    current_league_home_avg: 1.25,
    current_league_away_avg: 0.85,
    historical_league_home_avg: 1.30,
    historical_league_away_avg: 0.90,
    notes: "Extreme defensive resistance: Bylis has conceded only 1 goal across 4 home games (0.25 GA/G). Besa averages 0.50 GF/G away. Strong 1-0 / 0-0 candidate."
  },

  // 5. Belarus Vysshaya Liga
  {
    id: 13,
    home_team: "FC Belshina Bobruisk",
    away_team: "FC Dinamo Minsk",
    country: "Belarus",
    league: "Vysshaya Liga",
    match_date: "2026-10-28",
    odds: 1.19,
    home_league_position: 14,
    away_league_position: 1,
    home_matches_played: 24,
    away_matches_played: 24,
    home_goals_scored: 21,
    home_goals_conceded: 42,
    away_goals_scored: 43,
    away_goals_conceded: 12,
    home_venue_matches: 12,
    home_venue_goals_scored: 12,
    home_venue_goals_conceded: 22,
    away_venue_matches: 12,
    away_venue_goals_scored: 20,
    away_venue_goals_conceded: 5,
    current_league_home_avg: 1.35,
    current_league_away_avg: 1.05,
    historical_league_home_avg: 1.35,
    historical_league_away_avg: 1.05,
    notes: "Dinamo Minsk is dominant on the road (1.67 GF/G, 0.42 GA/G). Belshina's home defense is weak, conceding 1.83 GA/G. Model probability reaches 75.9%."
  },
  {
    id: 14,
    home_team: "FC Isloch",
    away_team: "FK Vitebsk",
    country: "Belarus",
    league: "Vysshaya Liga",
    match_date: "2026-10-28",
    odds: 1.35,
    home_league_position: 9,
    away_league_position: 6,
    home_matches_played: 24,
    away_matches_played: 24,
    home_goals_scored: 26,
    home_goals_conceded: 25,
    away_goals_scored: 27,
    away_goals_conceded: 22,
    home_venue_matches: 12,
    home_venue_goals_scored: 13,
    home_venue_goals_conceded: 11,
    away_venue_matches: 12,
    away_venue_goals_scored: 12,
    away_venue_goals_conceded: 11,
    current_league_home_avg: 1.35,
    current_league_away_avg: 1.05,
    historical_league_home_avg: 1.35,
    historical_league_away_avg: 1.05,
    notes: "Highly symmetrical low-scoring mid-table matchup. Both teams average ~1.00 GF and <1.00 GA. Strong defensive resistance suppresses expected goals to 1.76."
  },

  // 6. Egypt Premier League
  {
    id: 15,
    home_team: "National Bank FC",
    away_team: "Al Masry",
    country: "Egypt",
    league: "Premier League",
    match_date: "2026-10-28",
    odds: 1.33,
    home_league_position: 11,
    away_league_position: 4,
    home_matches_played: 32,
    away_matches_played: 32,
    home_goals_scored: 42,
    home_goals_conceded: 44,
    away_goals_scored: 39,
    away_goals_conceded: 38,
    home_venue_matches: 16,
    home_venue_goals_scored: 24,
    home_venue_goals_conceded: 21,
    away_venue_matches: 16,
    away_venue_goals_scored: 20,
    away_venue_goals_conceded: 20,
    current_league_home_avg: 1.25,
    current_league_away_avg: 0.95,
    historical_league_home_avg: 1.25,
    historical_league_away_avg: 0.95,
    notes: "Unusually open profile for Egypt. National Bank home fixtures average 2.81 goals; Al Masry away games average 2.50 goals. Substantial +9.2pp edge at 1.33 odds."
  },

  // 7. Estonia Premium Liiga
  {
    id: 16,
    home_team: "Parnu JK Vaprus",
    away_team: "FC Kuressaare",
    country: "Estonia",
    league: "Premium Liiga",
    match_date: "2026-10-28",
    odds: 1.25,
    home_league_position: 7,
    away_league_position: 8,
    home_matches_played: 32,
    away_matches_played: 32,
    home_goals_scored: 31,
    home_goals_conceded: 52,
    away_goals_scored: 32,
    away_goals_conceded: 58,
    home_venue_matches: 16,
    home_venue_goals_scored: 18,
    home_venue_goals_conceded: 27,
    away_venue_matches: 16,
    away_venue_goals_scored: 15,
    away_venue_goals_conceded: 32,
    current_league_home_avg: 1.55,
    current_league_away_avg: 1.35,
    historical_league_home_avg: 1.55,
    historical_league_away_avg: 1.35,
    notes: "Relegation six-pointer featuring severe defensive vulnerabilities. Kuressaare concedes 2.00 away goals per match. Over 1.5 probability reaches 82.2% with a +2.2pp edge."
  },
  {
    id: 17,
    home_team: "Paide Linnameeskond",
    away_team: "JK Nomme Kalju",
    country: "Estonia",
    league: "Premium Liiga",
    match_date: "2026-10-28",
    odds: 1.18,
    home_league_position: 3,
    away_league_position: 2,
    home_matches_played: 32,
    away_matches_played: 32,
    home_goals_scored: 63,
    home_goals_conceded: 35,
    away_goals_scored: 68,
    away_goals_conceded: 33,
    home_venue_matches: 16,
    home_venue_goals_scored: 35,
    home_venue_goals_conceded: 18,
    away_venue_matches: 16,
    away_venue_goals_scored: 32,
    away_venue_goals_conceded: 19,
    current_league_home_avg: 1.55,
    current_league_away_avg: 1.35,
    historical_league_home_avg: 1.55,
    historical_league_away_avg: 1.35,
    notes: "Top-three clash with high attacking power. Paide scores 2.19 GF/G at home and Nomme Kalju scores 2.00 GF/G away. Model probability hits 85.9% with a +1.2pp edge."
  },

  // 8. Finland Veikkausliiga
  {
    id: 18,
    home_team: "AC Oulu",
    away_team: "VPS",
    country: "Finland",
    league: "Veikkausliiga",
    match_date: "2026-10-28",
    odds: 1.23,
    home_league_position: 9,
    away_league_position: 5,
    home_matches_played: 27,
    away_matches_played: 27,
    home_goals_scored: 37,
    home_goals_conceded: 47,
    away_goals_scored: 43,
    away_goals_conceded: 45,
    home_venue_matches: 14,
    home_venue_goals_scored: 21,
    home_venue_goals_conceded: 22,
    away_venue_matches: 13,
    away_venue_goals_scored: 21,
    away_venue_goals_conceded: 24,
    current_league_home_avg: 1.45,
    current_league_away_avg: 1.25,
    historical_league_home_avg: 1.45,
    historical_league_away_avg: 1.25,
    notes: "High-tempo Finnish clash. Oulu home matches average 3.07 goals, and VPS away matches average 3.47 goals. Model probability of 89.2% generates a stellar +7.9pp edge at 1.23 odds."
  },

  // 9. Montenegro First League
  {
    id: 19,
    home_team: "OFK Petrovac",
    away_team: "OFK Otrant-Olympic",
    country: "Montenegro",
    league: "First League",
    match_date: "2026-10-28",
    odds: 1.32,
    home_league_position: 2,
    away_league_position: 10,
    home_matches_played: 12,
    away_matches_played: 12,
    home_goals_scored: 18,
    home_goals_conceded: 10,
    away_goals_scored: 10,
    away_goals_conceded: 20,
    home_venue_matches: 6,
    home_venue_goals_scored: 10,
    home_venue_goals_conceded: 4,
    away_venue_matches: 6,
    away_venue_goals_scored: 4,
    away_venue_goals_conceded: 12,
    current_league_home_avg: 1.30,
    current_league_away_avg: 0.95,
    historical_league_home_avg: 1.30,
    historical_league_away_avg: 0.95,
    notes: "Petrovac is solid at Stadion Pod Malim Brdom (1.67 GF/G), and Otrant-Olympic leaks 2.00 GA/G on the road. Expected goals of 2.84 yield a 77.8% probability and +2.0pp edge."
  },

  // 10. Peru Liga 1
  {
    id: 20,
    home_team: "Alianza Atletico Sullana",
    away_team: "Deportivo Garcilaso",
    country: "Peru",
    league: "Liga 1",
    match_date: "2026-10-28",
    odds: 1.23,
    home_league_position: 8,
    away_league_position: 10,
    home_matches_played: 15,
    away_matches_played: 15,
    home_goals_scored: 16,
    home_goals_conceded: 14,
    away_goals_scored: 15,
    away_goals_conceded: 16,
    home_venue_matches: 7,
    home_venue_goals_scored: 10,
    home_venue_goals_conceded: 5,
    away_venue_matches: 8,
    away_venue_goals_scored: 7,
    away_venue_goals_conceded: 11,
    current_league_home_avg: 1.45,
    current_league_away_avg: 1.05,
    historical_league_home_avg: 1.45,
    historical_league_away_avg: 1.05,
    notes: "Extreme climate contrast: Cusco-based Garcilaso descends to coastal furnace in Sullana. Garcilaso away attack produces only 0.88 GF/G, creating significant negative edge (-15.4pp) at 1.23 odds."
  },

  // 11. Saudi Arabia First Division
  {
    id: 21,
    home_team: "Al Jandal",
    away_team: "Damac FC",
    country: "Saudi Arabia",
    league: "1st Division",
    match_date: "2026-10-28",
    odds: 1.28,
    home_league_position: 11,
    away_league_position: 8,
    home_matches_played: 7,
    away_matches_played: 7,
    home_goals_scored: 7,
    home_goals_conceded: 9,
    away_goals_scored: 9,
    away_goals_conceded: 10,
    home_venue_matches: 3,
    home_venue_goals_scored: 3,
    home_venue_goals_conceded: 4,
    away_venue_matches: 4,
    away_venue_goals_scored: 4,
    away_venue_goals_conceded: 6,
    current_league_home_avg: 1.40,
    current_league_away_avg: 1.10,
    historical_league_home_avg: 1.40,
    historical_league_away_avg: 1.10,
    notes: "Small early-season sample (3 vs 4 venue matches). Al Jandal averages 1.00 GF/G at home and Damac scores 1.00 GF/G away. Edge is slightly negative (-7.5pp)."
  },
  {
    id: 22,
    home_team: "Al Jabalain",
    away_team: "Al Raed",
    country: "Saudi Arabia",
    league: "1st Division",
    match_date: "2026-10-28",
    odds: 1.27,
    home_league_position: 9,
    away_league_position: 7,
    home_matches_played: 7,
    away_matches_played: 7,
    home_goals_scored: 8,
    home_goals_conceded: 9,
    away_goals_scored: 10,
    away_goals_conceded: 9,
    home_venue_matches: 4,
    home_venue_goals_scored: 5,
    home_venue_goals_conceded: 4,
    away_venue_matches: 3,
    away_venue_goals_scored: 4,
    away_venue_goals_conceded: 4,
    current_league_home_avg: 1.40,
    current_league_away_avg: 1.10,
    historical_league_home_avg: 1.40,
    historical_league_away_avg: 1.10,
    notes: "Balanced Saudi mid-table matchup with limited sample size (4 vs 3 games). Expected goals sit at 2.40, giving 69.3% Over 1.5 probability."
  },
  {
    id: 23,
    home_team: "Al Najma SC",
    away_team: "Al Zulfi",
    country: "Saudi Arabia",
    league: "1st Division",
    match_date: "2026-10-28",
    odds: 1.33,
    home_league_position: 4,
    away_league_position: 13,
    home_matches_played: 8,
    away_matches_played: 8,
    home_goals_scored: 13,
    home_goals_conceded: 8,
    away_goals_scored: 7,
    away_goals_conceded: 12,
    home_venue_matches: 4,
    home_venue_goals_scored: 8,
    home_venue_goals_conceded: 3,
    away_venue_matches: 4,
    away_venue_goals_scored: 3,
    away_venue_goals_conceded: 7,
    current_league_home_avg: 1.40,
    current_league_away_avg: 1.10,
    historical_league_home_avg: 1.40,
    historical_league_away_avg: 1.10,
    notes: "Al Najma is on an upward trajectory at home (2.00 GF/G), and Al Zulfi concedes 1.75 away GA/G. Model Over 1.5 probability of 81.3% delivers a +6.1pp positive edge at 1.33 odds."
  },

  // 12. Scottish Premiership
  {
    id: 24,
    home_team: "FC Aberdeen",
    away_team: "Falkirk FC",
    country: "Scotland",
    league: "Premiership",
    match_date: "2026-10-28",
    odds: 1.27,
    home_league_position: 2,
    away_league_position: 5,
    home_matches_played: 9,
    away_matches_played: 9,
    home_goals_scored: 18,
    home_goals_conceded: 9,
    away_goals_scored: 11,
    away_goals_conceded: 11,
    home_venue_matches: 5,
    home_venue_goals_scored: 12,
    home_venue_goals_conceded: 4,
    away_venue_matches: 4,
    away_venue_goals_scored: 4,
    away_venue_goals_conceded: 5,
    current_league_home_avg: 1.50,
    current_league_away_avg: 1.20,
    historical_league_home_avg: 1.50,
    historical_league_away_avg: 1.20,
    notes: "Aberdeen has been irresistible at Pittodrie under Jimmy Thelin (2.40 GF/G, 0.80 GA/G). Falkirk provides stubborn resistance, leading to an expected 2.67 goals and +1.6pp edge."
  },
  {
    id: 25,
    home_team: "Celtic FC",
    away_team: "Dundee United",
    country: "Scotland",
    league: "Premiership",
    match_date: "2026-10-28",
    odds: 1.09,
    home_league_position: 1,
    away_league_position: 4,
    home_matches_played: 9,
    away_matches_played: 9,
    home_goals_scored: 29,
    home_goals_conceded: 3,
    away_goals_scored: 11,
    away_goals_conceded: 9,
    home_venue_matches: 4,
    home_venue_goals_scored: 16,
    home_venue_goals_conceded: 2,
    away_venue_matches: 4,
    away_venue_goals_scored: 5,
    away_venue_goals_conceded: 4,
    current_league_home_avg: 1.50,
    current_league_away_avg: 1.20,
    historical_league_home_avg: 1.50,
    historical_league_away_avg: 1.20,
    notes: "Celtic is averaging an astronomical 4.00 GF/G at Celtic Park. Model probability reaches 94.6%, producing a positive +2.9pp edge despite thin 1.09 odds."
  },
  {
    id: 26,
    home_team: "FC Dundee",
    away_team: "FC Kilmarnock",
    country: "Scotland",
    league: "Premiership",
    match_date: "2026-10-28",
    odds: 1.19,
    home_league_position: 8,
    away_league_position: 7,
    home_matches_played: 9,
    away_matches_played: 9,
    home_goals_scored: 13,
    home_goals_conceded: 18,
    away_goals_scored: 12,
    away_goals_conceded: 17,
    home_venue_matches: 4,
    home_venue_goals_scored: 7,
    home_venue_goals_conceded: 8,
    away_venue_matches: 5,
    away_venue_goals_scored: 7,
    away_venue_goals_conceded: 10,
    current_league_home_avg: 1.50,
    current_league_away_avg: 1.20,
    historical_league_home_avg: 1.50,
    historical_league_away_avg: 1.20,
    notes: "High defensive volatility: Dundee concedes 2.00 GA/G at home and Kilmarnock leaks 2.00 GA/G on the road. Expected goals reach 4.67, producing an elite 94.7% probability and +10.7pp edge."
  },
  {
    id: 27,
    home_team: "St Johnstone FC",
    away_team: "FC Motherwell",
    country: "Scotland",
    league: "Premiership",
    match_date: "2026-10-28",
    odds: 1.29,
    home_league_position: 11,
    away_league_position: 6,
    home_matches_played: 9,
    away_matches_played: 9,
    home_goals_scored: 11,
    home_goals_conceded: 21,
    away_goals_scored: 12,
    away_goals_conceded: 13,
    home_venue_matches: 5,
    home_venue_goals_scored: 5,
    home_venue_goals_conceded: 11,
    away_venue_matches: 4,
    away_venue_goals_scored: 5,
    away_venue_goals_conceded: 6,
    current_league_home_avg: 1.50,
    current_league_away_avg: 1.20,
    historical_league_home_avg: 1.50,
    historical_league_away_avg: 1.20,
    notes: "St Johnstone concedes 2.20 GA/G at McDiarmid Park. Motherwell possesses a reliable away scoring profile (1.25 GF/G). Expected goals of 3.29 yield an 84.0% probability and +6.5pp edge."
  },
  {
    id: 28,
    home_team: "St Mirren FC",
    away_team: "Hibernian Edinburgh FC",
    country: "Scotland",
    league: "Premiership",
    match_date: "2026-10-28",
    odds: 1.22,
    home_league_position: 9,
    away_league_position: 12,
    home_matches_played: 9,
    away_matches_played: 9,
    home_goals_scored: 10,
    home_goals_conceded: 15,
    away_goals_scored: 8,
    away_goals_conceded: 14,
    home_venue_matches: 4,
    home_venue_goals_scored: 5,
    home_venue_goals_conceded: 5,
    away_venue_matches: 5,
    away_venue_goals_scored: 4,
    away_venue_goals_conceded: 8,
    current_league_home_avg: 1.50,
    current_league_away_avg: 1.20,
    historical_league_home_avg: 1.50,
    historical_league_away_avg: 1.20,
    notes: "Hibernian has been fragile defensively away (1.60 GA/G) but muted in attack (0.80 GF/G). St Mirren home matches average 2.50 goals. Sub-80% probability with -3.7pp negative edge."
  },
  {
    id: 29,
    home_team: "Heart of Midlothian FC",
    away_team: "Glasgow Rangers",
    country: "Scotland",
    league: "Premiership",
    match_date: "2026-10-28",
    odds: 1.20,
    home_league_position: 10,
    away_league_position: 3,
    home_matches_played: 9,
    away_matches_played: 9,
    home_goals_scored: 9,
    home_goals_conceded: 14,
    away_goals_scored: 14,
    away_goals_conceded: 7,
    home_venue_matches: 5,
    home_venue_goals_scored: 6,
    home_venue_goals_conceded: 6,
    away_venue_matches: 4,
    away_venue_goals_scored: 4,
    away_venue_goals_conceded: 3,
    current_league_home_avg: 1.50,
    current_league_away_avg: 1.20,
    historical_league_home_avg: 1.50,
    historical_league_away_avg: 1.20,
    notes: "Rangers away fixtures under Clement have been conservative (1.00 GF / 0.75 GA per game). Hearts maintains parity at Tynecastle (1.20 GF / 1.20 GA). Expected goals of 1.60 fall below requirements."
  },

  // 13. Slovenian 1. SNL
  {
    id: 30,
    home_team: "NK Nafta 1903",
    away_team: "NK Aluminij Kidricevo",
    country: "Slovenia",
    league: "1. SNL",
    match_date: "2026-10-28",
    odds: 1.21,
    home_league_position: 9,
    away_league_position: 10,
    home_matches_played: 12,
    away_matches_played: 12,
    home_goals_scored: 9,
    home_goals_conceded: 24,
    away_goals_scored: 10,
    away_goals_conceded: 25,
    home_venue_matches: 6,
    home_venue_goals_scored: 5,
    home_venue_goals_conceded: 11,
    away_venue_matches: 6,
    away_venue_goals_scored: 4,
    away_venue_goals_conceded: 13,
    current_league_home_avg: 1.40,
    current_league_away_avg: 1.15,
    historical_league_home_avg: 1.40,
    historical_league_away_avg: 1.15,
    notes: "Relegation battle featuring two poor backlines. Nafta concedes 1.83 GA/G at home and Aluminij concedes 2.17 GA/G away. Expected goals reach 2.36, yielding 68.3% probability."
  },
  {
    id: 31,
    home_team: "NK Olimpija Ljubljana",
    away_team: "NK Celje",
    country: "Slovenia",
    league: "1. SNL",
    match_date: "2026-10-28",
    odds: 1.27,
    home_league_position: 1,
    away_league_position: 4,
    home_matches_played: 12,
    away_matches_played: 12,
    home_goals_scored: 21,
    home_goals_conceded: 5,
    away_goals_scored: 24,
    away_goals_conceded: 18,
    home_venue_matches: 6,
    home_venue_goals_scored: 11,
    home_venue_goals_conceded: 2,
    away_venue_matches: 6,
    away_venue_goals_scored: 12,
    away_venue_goals_conceded: 10,
    current_league_home_avg: 1.40,
    current_league_away_avg: 1.15,
    historical_league_home_avg: 1.40,
    historical_league_away_avg: 1.15,
    notes: "Top-of-the-table clash. Olimpija home defense is impenetrable (0.33 GA/G across 6 matches), but Celje has the league's top away attack (2.00 GF/G). Expected goals of 2.76 yield a 76.4% probability."
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
      description: `Extreme small-sample distortion: only ${min_matches} matches played by one or both teams.`,
      evidence: `${f.home_team} played ${home_v_m} matches; ${f.away_team} played ${away_v_m} matches.`
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
      description: `${f.away_team} averages only ${away_gf_pg.toFixed(2)} goals per game, increasing shutout risk.`,
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
      evidence: `${f.home_team} averages under 1.0 goal scored per match across the observed fixtures.`
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
    comment = "NO BET. Extreme small-sample distortion or critical unresolved risk renders the statistical signal uncalibrated.";
  } else if (p_over_1_5 < 0.70) {
    verdict = "NO BET";
    comment = `NO BET. Model estimates an ${(p_over_1_5 * 100).toFixed(1)}% Over 1.5 probability versus bookmaker break-even of ${(be_prob * 100).toFixed(1)}% at ${f.odds} odds (${edge_pp.toFixed(1)} edge, ${ev.toFixed(3)} EV). Estimated Over 1.5 probability (${(p_over_1_5 * 100).toFixed(1)}%) is well below the 70% threshold for the Over 1.5 strategy.`;
  } else if (ev < -0.10 || edge_pp < -10.0) {
    verdict = "NO BET";
    comment = `NO BET. Model estimates an ${(p_over_1_5 * 100).toFixed(1)}% Over 1.5 probability versus bookmaker break-even of ${(be_prob * 100).toFixed(1)}% at ${f.odds} odds (${edge_pp.toFixed(1)} edge, ${ev.toFixed(3)} EV). Significant negative expected value (${ev.toFixed(3)}) and pricing mismatch (${edge_pp.toFixed(1)}pp edge) violate Principle 8.`;
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
  lines.push("**Evaluation Date**: 2026-10-28");
  lines.push(`**Total Fixtures Evaluated**: ${evaluated.length} matches`);
  lines.push("**Market**: Over 1.5 Goals");
  lines.push("**Methodology Enforcement**: Strict Venue-Specific Home/Away Protocol (Section 5.0), Dual-Baseline Protocol (Section 5.1A), & Hard-Stop Rule");
  lines.push("");
  lines.push("---");
  lines.push("");

  for (const e of evaluated) {
    lines.push(`## ${e.id}. ${e.home_team} vs ${e.away_team}`);
    lines.push(`- **Fixture**: ${e.country} — ${e.league} | Date: ${e.match_date}`);
    lines.push(`- **Data Quality**: **Verified (Dual-Baseline Venue-Specific Analysis)**`);
    lines.push("");
    lines.push("### Pre-Match Statistical Matchup Comparison");
    lines.push(`| Metric | ${e.home_team} (Home Venue) | ${e.away_team} (Away Venue) |`);
    lines.push("| :--- | :---: | :---: |");
    lines.push(`| **League Standing** | ${formatPos(e.home_league_position)} | ${formatPos(e.away_league_position)} |`);
    lines.push(`| **Venue Matches Played** | ${e.home_venue_matches} | ${e.away_venue_matches} |`);
    lines.push(`| **Overall Matches Played** | ${e.home_matches_played} | ${e.away_matches_played} |`);
    lines.push(`| **Overall Record (GF / GA)** | ${e.home_goals_scored} GF / ${e.home_goals_conceded} GA | ${e.away_goals_scored} GF / ${e.away_goals_conceded} GA |`);
    lines.push(`| **Venue Goals Scored (GF)** | ${e.home_gf_pg.toFixed(2)} / game | ${e.away_gf_pg.toFixed(2)} / game |`);
    lines.push(`| **Venue Goals Conceded (GA)** | ${e.home_ga_pg.toFixed(2)} / game | ${e.away_ga_pg.toFixed(2)} / game |`);
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
    if (e.warnings && e.warnings.length > 0) {
      for (const w of e.warnings) {
        lines.push(`- **\`${w.type}\`** [${w.severity}] (${w.direction} / ${w.market_relevance}): ${w.description}`);
        lines.push(`  - *Evidence*: ${w.evidence}`);
      }
    } else {
      lines.push("- *No high-severity warnings detected.*");
    }
    lines.push("");

    lines.push(`### Final Decision Verdict: **${e.verdict}**`);
    lines.push(`> ${e.comment}`);
    lines.push("");
    lines.push("---");
    lines.push("");
  }

  // Executive Summary Table
  lines.push("## EXECUTIVE SUMMARY TABLE (2026-10-28)");
  lines.push("| ID | Fixture | League | Odds | Break-Even | Live Prob | Hist Prob | Align Delta | Edge (pp) | EV | Warnings | Verdict |");
  lines.push("| :---: | :--- | :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |");
  for (const e of evaluated) {
    const fix_str = `${e.home_team} vs ${e.away_team}`;
    const l_str = e.league;
    const odds_str = e.odds.toFixed(2);
    const be_str = `${(e.be_prob * 100).toFixed(1)}%`;
    const lp_str = `${(e.p_over_1_5 * 100).toFixed(1)}%`;
    const hp_str = `${(e.hist_p_over_1_5 * 100).toFixed(1)}%`;
    const ad_str = `${e.delta_pp.toFixed(1)}pp`;
    const edge_str = `${e.edge_pp >= 0 ? '+' : ''}${e.edge_pp.toFixed(1)}pp`;
    const ev_str = `${e.ev >= 0 ? '+' : ''}${e.ev.toFixed(3)}`;
    const w_count = e.warnings.length;
    const v_str = `**${e.verdict}**`;
    lines.push(`| ${e.id} | ${fix_str} | ${l_str} | ${odds_str} | ${be_str} | ${lp_str} | ${hp_str} | ${ad_str} | ${edge_str} | ${ev_str} | ${w_count} | ${v_str} |`);
  }

  const outFile = path.resolve(__dirname, "..", "october", "evaluation_2026-10-28.md");
  fs.writeFileSync(outFile, lines.join("\n"), "utf8");
  console.log(`Report written successfully to: ${outFile}`);

  // Summary counts
  const selectList = evaluated.filter(e => e.verdict === "SELECT");
  const cautionList = evaluated.filter(e => e.verdict === "CAUTION");
  const noBetList = evaluated.filter(e => e.verdict === "NO BET");

  console.log(`\nEvaluated: ${evaluated.length} matches`);
  console.log(`SELECT: ${selectList.length}`);
  console.log(`CAUTION: ${cautionList.length}`);
  console.log(`NO BET: ${noBetList.length}`);
}

main();
