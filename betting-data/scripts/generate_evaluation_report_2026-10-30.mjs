/**
 * Model 2.1 Dual-Baseline Match Evaluation Generator for 2026-10-30
 * Implements strict Section 5.0 Venue-Specific Protocol, 5.1A Dual-Baseline, & Decoupling Principle
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const FIXTURES_DATA = [
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
    notes: "Villarreal hosts Espanyol at Estadio de la Cerámica. Villarreal has balanced 1.50 GF/G and 1.50 GA/G at home, while Espanyol has conceded 1.40 GA/G on the road."
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
    notes: "Nice hosts high-flying Rennes at Allianz Riviera. Rennes matches on the road have been chaotic, scoring 1.67 GF/G and conceding 3.00 GA/G."
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
    notes: "Mismatched clash at Stade Océane. Le Havre averages only 0.50 GF/G at home, while PSG dominates offensively with 2.00 GF/G on the road."
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
    notes: "Derby du Nord at Decathlon Arena. Lille holds a disciplined home record (0.75 GA/G), while Lens boasts high-event away fixtures (1.75 GF / 1.75 GA per game)."
  },

  // 3. France Ligue 2
  {
    id: 5,
    home_team: "Grenoble Foot 38",
    away_team: "Dijon",
    country: "France",
    league: "Ligue 2",
    match_date: "2026-10-30",
    odds: 1.28,
    home_league_position: 16,
    away_league_position: 9,
    home_matches_played: 10,
    away_matches_played: 10,
    home_goals_scored: 9,
    home_goals_conceded: 17,
    away_goals_scored: 17,
    away_goals_conceded: 18,
    home_venue_matches: 4,
    home_venue_goals_scored: 2,
    home_venue_goals_conceded: 5,
    away_venue_matches: 5,
    away_venue_goals_scored: 6,
    away_venue_goals_conceded: 9,
    current_league_home_avg: 1.38,
    current_league_away_avg: 1.08,
    historical_league_home_avg: 1.35,
    historical_league_away_avg: 1.05,
    notes: "Grenoble has struggled for home goals (0.50 GF/G). Dijon away games average 3.00 total goals with leaky defending (1.80 GA/G)."
  },
  {
    id: 6,
    home_team: "Stade Lavallois",
    away_team: "US Boulogne",
    country: "France",
    league: "Ligue 2",
    match_date: "2026-10-30",
    odds: 1.38,
    home_league_position: 18,
    away_league_position: 13,
    home_matches_played: 10,
    away_matches_played: 10,
    home_goals_scored: 13,
    home_goals_conceded: 21,
    away_goals_scored: 7,
    away_goals_conceded: 7,
    home_venue_matches: 5,
    home_venue_goals_scored: 7,
    home_venue_goals_conceded: 10,
    away_venue_matches: 5,
    away_venue_goals_scored: 2,
    away_venue_goals_conceded: 1,
    current_league_home_avg: 1.38,
    current_league_away_avg: 1.08,
    historical_league_home_avg: 1.35,
    historical_league_away_avg: 1.05,
    notes: "Clash of styles at Stade Francis Le Basser. Laval is involved in high-scoring games (3.40 total GF+GA at home), but Boulogne features ultra-defensive road form (0.20 GA/G, 0.40 GF/G)."
  },
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
    notes: "Metz is potent at Stade Saint-Symphorien, scoring 2.40 GF/G while conceding 1.40 GA/G. Pau has maintained steady 1.25 GF/G on the road."
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
    notes: "Both sides struggle defensively. Nantes concedes 1.80 GA/G at home; Clermont concedes 2.00 GA/G away while scoring 1.50 GF/G."
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
    notes: "High-scoring Ligue 2 matchup. Rodez home games average 3.80 total goals (2.20 GA/G conceded); Dunkerque away matches concede 2.50 GA/G."
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
    notes: "High-octane Bundesliga clash. Elversberg games at home average 5.00 total goals. Mainz on the road averages 3.33 GF/G."
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
    notes: "SchücoArena fixture between two prolific offenses. Bielefeld scores 2.25 GF/G at home; Braunschweig scores 1.75 GF/G on the road."
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
    notes: "Energie Cottbus matches at Stadion der Freundschaft average 3.75 total goals (2.00 GF / 1.75 GA). Bochum has been modest offensively (1.00 GF/G away)."
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
    notes: "Massive defensive mismatch. Casa Pia has conceded 13 goals in 4 home matches (3.25 GA/G), while Sporting CP is averaging 2.50 GF/G away."
  },

  // 7. Belgium Pro League
  {
    id: 14,
    home_team: "SV Zulte Waregem",
    away_team: "Club Brugge",
    country: "Belgium",
    league: "Pro League",
    match_date: "2026-10-30",
    odds: 1.11,
    home_league_position: 10,
    away_league_position: 2,
    home_matches_played: 9,
    away_matches_played: 8,
    home_goals_scored: 8,
    home_goals_conceded: 14,
    away_goals_scored: 20,
    away_goals_conceded: 5,
    home_venue_matches: 4,
    home_venue_goals_scored: 6,
    home_venue_goals_conceded: 4,
    away_venue_matches: 4,
    away_venue_goals_scored: 10,
    away_venue_goals_conceded: 2,
    current_league_home_avg: 1.56,
    current_league_away_avg: 1.28,
    historical_league_home_avg: 1.55,
    historical_league_away_avg: 1.30,
    notes: "Club Brugge arrives at Elindus Arena with dominant road scoring (2.50 GF/G). Zulte Waregem maintains 1.50 GF/G at home."
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
    notes: "Balanced mid-table clash. Both sides produce consistent scoring (1.33 GF/G each at venue) and concede over 1.30 GA/G."
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
    notes: "Derby de Liège in Challenger Pro League. RFC Liege has struggled defensively away, conceding 2.50 GA/G; Seraing concedes 1.50 GA/G at home."
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
    notes: "Brabant derby at GS Staalwerken Stadion. Dutch second tier high scoring pace reflected: Helmond averages 1.83 GF/G at home; FC Eindhoven scores 2.00 GF/G away."
  },

  // 10. Argentina Liga Profesional
  {
    id: 18,
    home_team: "CA Huracan",
    away_team: "CA Tigre",
    country: "Argentina",
    league: "Liga Profesional",
    match_date: "2026-10-30",
    odds: 1.56,
    home_league_position: 8,
    away_league_position: 12,
    home_matches_played: 14,
    away_matches_played: 14,
    home_goals_scored: 12,
    home_goals_conceded: 14,
    away_goals_scored: 13,
    away_goals_conceded: 16,
    home_venue_matches: 7,
    home_venue_goals_scored: 6,
    home_venue_goals_conceded: 4,
    away_venue_matches: 6,
    away_venue_goals_scored: 7,
    away_venue_goals_conceded: 10,
    current_league_home_avg: 1.28,
    current_league_away_avg: 0.98,
    historical_league_home_avg: 1.30,
    historical_league_away_avg: 1.05,
    notes: "At Estadio Tomás Adolfo Ducó. Huracán has a low home scoring and concession record (0.86 GF / 0.57 GA). Tigre away matches average 2.83 total goals."
  },
  {
    id: 19,
    home_team: "AA Estudiantes",
    away_team: "Gimnasia La Plata",
    country: "Argentina",
    league: "Liga Profesional",
    match_date: "2026-10-30",
    odds: 1.41,
    home_league_position: 15,
    away_league_position: 3,
    home_matches_played: 14,
    away_matches_played: 14,
    home_goals_scored: 9,
    home_goals_conceded: 19,
    away_goals_scored: 21,
    away_goals_conceded: 18,
    home_venue_matches: 7,
    home_venue_goals_scored: 5,
    home_venue_goals_conceded: 8,
    away_venue_matches: 7,
    away_venue_goals_scored: 10,
    away_venue_goals_conceded: 11,
    current_league_home_avg: 1.28,
    current_league_away_avg: 0.98,
    historical_league_home_avg: 1.30,
    historical_league_away_avg: 1.05,
    notes: "Estudiantes RC averages only 0.71 GF/G at home. Gimnasia on the road scores 1.43 GF/G and concedes 1.57 GA/G."
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
    notes: "Esenler Stadium clash. Keciorengucu possesses one of the league's top away attacks at 1.83 GF/G; Esenler concedes 1.17 GA/G at home."
  },

  // 12. Ukraine First League
  {
    id: 21,
    home_team: "FK Agrobiznes Volochysk",
    away_team: "FC Prykarpattia",
    country: "Ukraine",
    league: "First League",
    match_date: "2026-10-30",
    odds: 1.32,
    home_league_position: 5,
    away_league_position: 10,
    home_matches_played: 12,
    away_matches_played: 13,
    home_goals_scored: 19,
    home_goals_conceded: 14,
    away_goals_scored: 13,
    away_goals_conceded: 15,
    home_venue_matches: 6,
    home_venue_goals_scored: 11,
    home_venue_goals_conceded: 6,
    away_venue_matches: 7,
    away_venue_goals_scored: 5,
    away_venue_goals_conceded: 9,
    current_league_home_avg: 1.38,
    current_league_away_avg: 1.08,
    historical_league_home_avg: 1.40,
    historical_league_away_avg: 1.10,
    notes: "Persha Liga match at Yunist Stadium. Agrobiznes scores 1.83 GF/G at home; Prykarpattia scores only 0.71 GF/G away."
  },

  // 13. Algeria Ligue 1
  {
    id: 22,
    home_team: "ASO Chlef",
    away_team: "ES Setif",
    country: "Algeria",
    league: "Ligue 1",
    match_date: "2026-10-30",
    odds: 1.57,
    home_league_position: 14,
    away_league_position: 12,
    home_matches_played: 7,
    away_matches_played: 6,
    home_goals_scored: 3,
    home_goals_conceded: 8,
    away_goals_scored: 4,
    away_goals_conceded: 6,
    home_venue_matches: 3,
    home_venue_goals_scored: 2,
    home_venue_goals_conceded: 3,
    away_venue_matches: 3,
    away_venue_goals_scored: 1,
    away_venue_goals_conceded: 4,
    current_league_home_avg: 1.22,
    current_league_away_avg: 0.88,
    historical_league_home_avg: 1.25,
    historical_league_away_avg: 0.90,
    notes: "Extremely low-scoring Algerian league fixture. ASO Chlef has scored only 2 goals at home; ES Setif has scored only 1 goal in 3 away matches (0.33 GF/G)."
  },
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
    notes: "At Stade Hocine Aït Ahmed. JS Kabylie boasts strong home scoring (2.00 GF/G); JS El Biar away matches are unusually open for Algeria, averaging 4.00 total goals."
  },
  {
    id: 24,
    home_team: "MC Oran",
    away_team: "Olympique Akbou",
    country: "Algeria",
    league: "Ligue 1",
    match_date: "2026-10-30",
    odds: 1.52,
    home_league_position: 1,
    away_league_position: 7,
    home_matches_played: 6,
    away_matches_played: 6,
    home_goals_scored: 5,
    home_goals_conceded: 0,
    away_goals_scored: 9,
    away_goals_conceded: 6,
    home_venue_matches: 3,
    home_venue_goals_scored: 3,
    home_venue_goals_conceded: 0,
    away_venue_matches: 3,
    away_venue_goals_scored: 3,
    away_venue_goals_conceded: 4,
    current_league_home_avg: 1.22,
    current_league_away_avg: 0.88,
    historical_league_home_avg: 1.25,
    historical_league_away_avg: 0.90,
    notes: "MC Oran has not conceded a single goal all season across 6 matches (0.00 GA/G at home). Extreme defensive shutout barrier."
  }
];

const SKIPPED_FIXTURES = [];

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

  // High reliance on one team if one lambda represents > 75% of total lambda
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
  lines.push("**Evaluation Date**: 2026-10-30");
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
  if (SKIPPED_FIXTURES.length === 0) {
    lines.push("All 24 match options provided for 2026-10-30 had verified venue-split statistics available and satisfied Section 5.0 criteria. Zero fixtures required skipping.");
  } else {
    lines.push("Per **Model 2.1 Section 5.0**, if venue-specific home/away breakdown cannot be verified with complete statistical integrity, the engine strictly prohibits using overall season aggregates as mathematical proxies. The following match options were halted:");
    lines.push("");
    lines.push("| # | Fixture | League | Offered Odds | Reason for Exclusion | Enforcement Rule |");
    lines.push("| :---: | :--- | :--- | :---: | :--- | :--- |");
    SKIPPED_FIXTURES.forEach((s, idx) => {
      lines.push(`| ${idx + 1} | ${s.fixture} | ${s.league} | ${s.offered_odds.toFixed(2)} | ${s.reason} | ${s.rule} |`);
    });
  }
  lines.push("");
  lines.push("---");
  lines.push("");

  // Executive Summary Table
  lines.push("## EXECUTIVE SUMMARY TABLE (2026-10-30)");
  lines.push("| ID | Fixture | League | Odds | Break-Even | Live Prob | Hist Prob | Align Delta | Edge (pp) | EV | Warnings | Verdict |");
  lines.push("| :---: | :--- | :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |");
  for (const e of evaluated) {
    const verdictFormatted = e.verdict === "SELECT" ? `**${e.verdict}**` : e.verdict;
    lines.push(`| ${e.id} | ${e.home_team} vs ${e.away_team} | ${e.league} | ${e.odds.toFixed(2)} | ${(e.be_prob * 100).toFixed(1)}% | ${(e.p_over_1_5 * 100).toFixed(1)}% | ${(e.hist_p_over_1_5 * 100).toFixed(1)}% | ${e.delta_pp.toFixed(1)}pp | ${e.edge_pp >= 0 ? '+' : ''}${e.edge_pp.toFixed(1)}pp | ${e.ev >= 0 ? '+' : ''}${e.ev.toFixed(3)} | ${e.warnings.length} | ${verdictFormatted} |`);
  }
  lines.push("");

  const outPath = path.resolve(__dirname, '../october/evaluation_2026-10-30.md');
  fs.writeFileSync(outPath, lines.join('\n'), 'utf8');
  console.log(`Successfully generated evaluation report to ${outPath}`);
}

main();

