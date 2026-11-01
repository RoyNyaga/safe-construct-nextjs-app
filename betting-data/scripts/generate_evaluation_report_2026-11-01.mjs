/**
 * Model 2.1 Dual-Baseline Match Evaluation Generator for 2026-11-01
 * Implements strict Section 5.0 Venue-Specific Protocol, 5.1A Dual-Baseline, & Decoupling Principle
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const FIXTURES_DATA = [
  // 1. English Premier League
  {
    id: 1,
    home_team: "Liverpool",
    away_team: "Arsenal",
    country: "England",
    league: "Premier League",
    match_date: "2026-11-01",
    odds: 1.25,
    home_league_position: 4,
    away_league_position: 2,
    home_matches_played: 8,
    away_matches_played: 8,
    home_goals_scored: 11,
    home_goals_conceded: 8,
    away_goals_scored: 13,
    away_goals_conceded: 5,
    home_venue_matches: 4,
    home_venue_goals_scored: 4,
    home_venue_goals_conceded: 5,
    away_venue_matches: 4,
    away_venue_goals_scored: 4,
    away_venue_goals_conceded: 3,
    current_league_home_avg: 1.58,
    current_league_away_avg: 1.28,
    historical_league_home_avg: 1.55,
    historical_league_away_avg: 1.25,
    notes: "Clash at Anfield. Both sides feature tight defenses in their respective venue splits (Liverpool conceding 1.25 GA/G at home; Arsenal conceding 0.75 GA/G away while scoring 1.00 GF/G)."
  },

  // 2. Spain La Liga
  {
    id: 2,
    home_team: "Getafe",
    away_team: "Sevilla",
    country: "Spain",
    league: "La Liga",
    match_date: "2026-11-01",
    odds: 1.52,
    home_league_position: 18,
    away_league_position: 6,
    home_matches_played: 10,
    away_matches_played: 10,
    home_goals_scored: 5,
    home_goals_conceded: 15,
    away_goals_scored: 16,
    away_goals_conceded: 16,
    home_venue_matches: 5,
    home_venue_goals_scored: 5,
    home_venue_goals_conceded: 3,
    away_venue_matches: 5,
    away_venue_goals_scored: 9,
    away_venue_goals_conceded: 9,
    current_league_home_avg: 1.48,
    current_league_away_avg: 1.15,
    historical_league_home_avg: 1.45,
    historical_league_away_avg: 1.10,
    notes: "At Coliseum Alfonso Pérez. Getafe is unbeaten at home (5 GF, 3 GA in 5 matches), while Sevilla plays open away fixtures (1.80 GF / 1.80 GA)."
  },
  {
    id: 3,
    home_team: "Elche CF",
    away_team: "Valencia",
    country: "Spain",
    league: "La Liga",
    match_date: "2026-11-01",
    odds: 1.27,
    home_league_position: 15,
    away_league_position: 19,
    home_matches_played: 10,
    away_matches_played: 10,
    home_goals_scored: 14,
    home_goals_conceded: 17,
    away_goals_scored: 7,
    away_goals_conceded: 17,
    home_venue_matches: 4,
    home_venue_goals_scored: 4,
    home_venue_goals_conceded: 11,
    away_venue_matches: 4,
    away_venue_goals_scored: 5,
    away_venue_goals_conceded: 8,
    current_league_home_avg: 1.48,
    current_league_away_avg: 1.15,
    historical_league_home_avg: 1.45,
    historical_league_away_avg: 1.10,
    notes: "At Estadio Manuel Martínez Valero. Elche has leaked 2.75 GA/G at home; Valencia concedes 2.00 GA/G on the road."
  },
  {
    id: 4,
    home_team: "Athletic Bilbao",
    away_team: "Real Sociedad",
    country: "Spain",
    league: "La Liga",
    match_date: "2026-11-01",
    odds: 1.20,
    home_league_position: 8,
    away_league_position: 5,
    home_matches_played: 9,
    away_matches_played: 10,
    home_goals_scored: 12,
    home_goals_conceded: 9,
    away_goals_scored: 19,
    away_goals_conceded: 18,
    home_venue_matches: 5,
    home_venue_goals_scored: 9,
    home_venue_goals_conceded: 4,
    away_venue_matches: 5,
    away_venue_goals_scored: 12,
    away_venue_goals_conceded: 11,
    current_league_home_avg: 1.48,
    current_league_away_avg: 1.15,
    historical_league_home_avg: 1.45,
    historical_league_away_avg: 1.10,
    notes: "Basque derby at San Mamés. Athletic scores 1.80 GF/G at home; Real Sociedad on the road averages 2.40 GF and 2.20 GA per game."
  },

  // 3. Spain Segunda Division
  {
    id: 5,
    home_team: "AD Ceuta FC",
    away_team: "Sporting Gijon",
    country: "Spain",
    league: "Segunda Division",
    match_date: "2026-11-01",
    odds: 1.24,
    home_league_position: 21,
    away_league_position: 8,
    home_matches_played: 11,
    away_matches_played: 11,
    home_goals_scored: 10,
    home_goals_conceded: 25,
    away_goals_scored: 11,
    away_goals_conceded: 13,
    home_venue_matches: 6,
    home_venue_goals_scored: 6,
    home_venue_goals_conceded: 10,
    away_venue_matches: 5,
    away_venue_goals_scored: 5,
    away_venue_goals_conceded: 7,
    current_league_home_avg: 1.38,
    current_league_away_avg: 1.04,
    historical_league_home_avg: 1.35,
    historical_league_away_avg: 1.00,
    notes: "At Estadio Municipal Alfonso Murube. Ceuta concedes 1.67 GA/G at home; Sporting Gijon averages 1.00 GF and 1.40 GA away."
  },
  {
    id: 6,
    home_team: "Burgos CF",
    away_team: "CD Castellon",
    country: "Spain",
    league: "Segunda Division",
    match_date: "2026-11-01",
    odds: 1.24,
    home_league_position: 6,
    away_league_position: 1,
    home_matches_played: 11,
    away_matches_played: 11,
    home_goals_scored: 16,
    home_goals_conceded: 12,
    away_goals_scored: 22,
    away_goals_conceded: 4,
    home_venue_matches: 6,
    home_venue_goals_scored: 10,
    home_venue_goals_conceded: 6,
    away_venue_matches: 6,
    away_venue_goals_scored: 10,
    away_venue_goals_conceded: 3,
    current_league_home_avg: 1.38,
    current_league_away_avg: 1.04,
    historical_league_home_avg: 1.35,
    historical_league_away_avg: 1.00,
    notes: "At El Plantío. Castellon is league leader (1.67 GF/G away, 0.50 GA/G); Burgos scores 1.67 GF/G at home."
  },
  {
    id: 7,
    home_team: "CD Tenerife",
    away_team: "FC Andorra",
    country: "Spain",
    league: "Segunda Division",
    match_date: "2026-11-01",
    odds: 1.32,
    home_league_position: 12,
    away_league_position: 19,
    home_matches_played: 11,
    away_matches_played: 11,
    home_goals_scored: 13,
    home_goals_conceded: 15,
    away_goals_scored: 15,
    away_goals_conceded: 20,
    home_venue_matches: 5,
    home_venue_goals_scored: 5,
    home_venue_goals_conceded: 3,
    away_venue_matches: 5,
    away_venue_goals_scored: 5,
    away_venue_goals_conceded: 9,
    current_league_home_avg: 1.38,
    current_league_away_avg: 1.04,
    historical_league_home_avg: 1.35,
    historical_league_away_avg: 1.00,
    notes: "At Heliodoro Rodríguez López. Tenerife plays defensively tight at home (1.00 GF / 0.60 GA); Andorra concedes 1.80 GA/G on travels."
  },

  // 4. Italy Serie A
  {
    id: 8,
    home_team: "FC Como",
    away_team: "Venezia",
    country: "Italy",
    league: "Serie A",
    match_date: "2026-11-01",
    odds: 1.12,
    home_league_position: 4,
    away_league_position: 20,
    home_matches_played: 9,
    away_matches_played: 9,
    home_goals_scored: 17,
    home_goals_conceded: 8,
    away_goals_scored: 6,
    away_goals_conceded: 19,
    home_venue_matches: 4,
    home_venue_goals_scored: 5,
    home_venue_goals_conceded: 1,
    away_venue_matches: 4,
    away_venue_goals_scored: 3,
    away_venue_goals_conceded: 9,
    current_league_home_avg: 1.48,
    current_league_away_avg: 1.18,
    historical_league_home_avg: 1.45,
    historical_league_away_avg: 1.15,
    notes: "At Stadio Giuseppe Sinigaglia. Como is 4th in Serie A conceding only 0.25 GA/G at home; bottom-placed Venezia concedes 2.25 GA/G on the road."
  },
  {
    id: 9,
    home_team: "Frosinone Calcio",
    away_team: "Torino",
    country: "Italy",
    league: "Serie A",
    match_date: "2026-11-01",
    odds: 1.10,
    home_league_position: 6,
    away_league_position: 9,
    home_matches_played: 9,
    away_matches_played: 9,
    home_goals_scored: 22,
    home_goals_conceded: 14,
    away_goals_scored: 14,
    away_goals_conceded: 14,
    home_venue_matches: 5,
    home_venue_goals_scored: 14,
    home_venue_goals_conceded: 6,
    away_venue_matches: 4,
    away_venue_goals_scored: 5,
    away_venue_goals_conceded: 4,
    current_league_home_avg: 1.48,
    current_league_away_avg: 1.18,
    historical_league_home_avg: 1.45,
    historical_league_away_avg: 1.15,
    notes: "At Stadio Benito Stirpe. Frosinone has an explosive home record averaging 2.80 GF/G; Torino concedes 1.00 GA/G away."
  },
  {
    id: 10,
    home_team: "Lazio",
    away_team: "Cagliari",
    country: "Italy",
    league: "Serie A",
    match_date: "2026-11-01",
    odds: 1.23,
    home_league_position: 2,
    away_league_position: 10,
    home_matches_played: 9,
    away_matches_played: 9,
    home_goals_scored: 22,
    home_goals_conceded: 7,
    away_goals_scored: 8,
    away_goals_conceded: 13,
    home_venue_matches: 4,
    home_venue_goals_scored: 8,
    home_venue_goals_conceded: 4,
    away_venue_matches: 4,
    away_venue_goals_scored: 4,
    away_venue_goals_conceded: 5,
    current_league_home_avg: 1.48,
    current_league_away_avg: 1.18,
    historical_league_home_avg: 1.45,
    historical_league_away_avg: 1.15,
    notes: "At Stadio Olimpico. Lazio scores 2.00 GF/G at home and concedes 1.00 GA/G; Cagliari scores 1.00 GF/G and concedes 1.25 GA/G away."
  },
  {
    id: 11,
    home_team: "Lecce",
    away_team: "Genoa",
    country: "Italy",
    league: "Serie A",
    match_date: "2026-11-01",
    odds: 1.42,
    home_league_position: 14,
    away_league_position: 13,
    home_matches_played: 9,
    away_matches_played: 9,
    home_goals_scored: 10,
    home_goals_conceded: 19,
    away_goals_scored: 8,
    away_goals_conceded: 13,
    home_venue_matches: 5,
    home_venue_goals_scored: 6,
    home_venue_goals_conceded: 9,
    away_venue_matches: 4,
    away_venue_goals_scored: 2,
    away_venue_goals_conceded: 7,
    current_league_home_avg: 1.48,
    current_league_away_avg: 1.18,
    historical_league_home_avg: 1.45,
    historical_league_away_avg: 1.15,
    notes: "At Stadio Via del Mare. Genoa struggles for away goals (0.50 GF/G), while Lecce concedes 1.80 GA/G at home."
  },
  {
    id: 12,
    home_team: "Juventus",
    away_team: "SSC Napoli",
    country: "Italy",
    league: "Serie A",
    match_date: "2026-11-01",
    odds: 2.18,
    home_league_position: 8,
    away_league_position: 7,
    home_matches_played: 9,
    away_matches_played: 9,
    home_goals_scored: 11,
    home_goals_conceded: 10,
    away_goals_scored: 17,
    away_goals_conceded: 11,
    home_venue_matches: 4,
    home_venue_goals_scored: 5,
    home_venue_goals_conceded: 4,
    away_venue_matches: 5,
    away_venue_goals_scored: 9,
    away_venue_goals_conceded: 6,
    current_league_home_avg: 1.48,
    current_league_away_avg: 1.18,
    historical_league_home_avg: 1.45,
    historical_league_away_avg: 1.15,
    notes: "Blockbuster clash at Allianz Stadium. Napoli scores 1.80 GF/G away; Juventus averages 1.25 GF/G at home. Bookmaker pricing at 2.18 implies an abnormally low 45.9% break-even."
  },

  // 5. Italy Serie B
  {
    id: 13,
    home_team: "SS Arezzo",
    away_team: "Ascoli FC",
    country: "Italy",
    league: "Serie B",
    match_date: "2026-11-01",
    odds: 1.27,
    home_league_position: 14,
    away_league_position: 3,
    home_matches_played: 9,
    away_matches_played: 9,
    home_goals_scored: 9,
    home_goals_conceded: 19,
    away_goals_scored: 16,
    away_goals_conceded: 6,
    home_venue_matches: 4,
    home_venue_goals_scored: 3,
    home_venue_goals_conceded: 10,
    away_venue_matches: 4,
    away_venue_goals_scored: 8,
    away_venue_goals_conceded: 3,
    current_league_home_avg: 1.36,
    current_league_away_avg: 1.06,
    historical_league_home_avg: 1.35,
    historical_league_away_avg: 1.05,
    notes: "At Stadio Città di Arezzo. Arezzo has conceded 2.50 GA/G at home; Ascoli's away attack is potent (2.00 GF/G)."
  },
  {
    id: 14,
    home_team: "US Avellino",
    away_team: "AC Pisa",
    country: "Italy",
    league: "Serie B",
    match_date: "2026-11-01",
    odds: 1.30,
    home_league_position: 10,
    away_league_position: 5,
    home_matches_played: 9,
    away_matches_played: 9,
    home_goals_scored: 13,
    home_goals_conceded: 10,
    away_goals_scored: 18,
    away_goals_conceded: 13,
    home_venue_matches: 5,
    home_venue_goals_scored: 9,
    home_venue_goals_conceded: 5,
    away_venue_matches: 4,
    away_venue_goals_scored: 9,
    away_venue_goals_conceded: 3,
    current_league_home_avg: 1.36,
    current_league_away_avg: 1.06,
    historical_league_home_avg: 1.35,
    historical_league_away_avg: 1.05,
    notes: "At Stadio Partenio-Adriano Lombardi. Avellino scores 1.80 GF/G at home; Pisa scores 2.25 GF/G away."
  },
  {
    id: 15,
    home_team: "Empoli FC",
    away_team: "SS Juve Stabia",
    country: "Italy",
    league: "Serie B",
    match_date: "2026-11-01",
    odds: 1.27,
    home_league_position: 19,
    away_league_position: 17,
    home_matches_played: 9,
    away_matches_played: 9,
    home_goals_scored: 8,
    home_goals_conceded: 15,
    away_goals_scored: 9,
    away_goals_conceded: 9,
    home_venue_matches: 4,
    home_venue_goals_scored: 3,
    home_venue_goals_conceded: 7,
    away_venue_matches: 4,
    away_venue_goals_scored: 4,
    away_venue_goals_conceded: 4,
    current_league_home_avg: 1.36,
    current_league_away_avg: 1.06,
    historical_league_home_avg: 1.35,
    historical_league_away_avg: 1.05,
    notes: "At Stadio Carlo Castellani. Empoli averages only 0.75 GF/G at home; Juve Stabia plays defensively compact (1.00 GF / 1.00 GA away)."
  },
  {
    id: 16,
    home_team: "Hellas Verona",
    away_team: "Carrarese",
    country: "Italy",
    league: "Serie B",
    match_date: "2026-11-01",
    odds: 1.20,
    home_league_position: 9,
    away_league_position: 13,
    home_matches_played: 9,
    away_matches_played: 9,
    home_goals_scored: 16,
    home_goals_conceded: 13,
    away_goals_scored: 9,
    away_goals_conceded: 10,
    home_venue_matches: 5,
    home_venue_goals_scored: 11,
    home_venue_goals_conceded: 6,
    away_venue_matches: 4,
    away_venue_goals_scored: 3,
    away_venue_goals_conceded: 5,
    current_league_home_avg: 1.36,
    current_league_away_avg: 1.06,
    historical_league_home_avg: 1.35,
    historical_league_away_avg: 1.05,
    notes: "At Stadio Marcantonio Bentegodi. Verona scores 2.20 GF/G at home; Carrarese scores 0.75 GF/G away."
  },
  {
    id: 17,
    home_team: "Palermo",
    away_team: "LR Vicenza",
    country: "Italy",
    league: "Serie B",
    match_date: "2026-11-01",
    odds: 1.15,
    home_league_position: 1,
    away_league_position: 16,
    home_matches_played: 9,
    away_matches_played: 9,
    home_goals_scored: 21,
    home_goals_conceded: 11,
    away_goals_scored: 12,
    away_goals_conceded: 17,
    home_venue_matches: 4,
    home_venue_goals_scored: 10,
    home_venue_goals_conceded: 3,
    away_venue_matches: 4,
    away_venue_goals_scored: 4,
    away_venue_goals_conceded: 9,
    current_league_home_avg: 1.36,
    current_league_away_avg: 1.06,
    historical_league_home_avg: 1.35,
    historical_league_away_avg: 1.05,
    notes: "At Stadio Renzo Barbera. League leaders Palermo score 2.50 GF/G at home; Vicenza concedes 2.25 GA/G away."
  },

  // 6. France Ligue 1
  {
    id: 18,
    home_team: "RC Strasbourg Alsace",
    away_team: "AJ Auxerre",
    country: "France",
    league: "Ligue 1",
    match_date: "2026-11-01",
    odds: 1.16,
    home_league_position: 16,
    away_league_position: 12,
    home_matches_played: 8,
    away_matches_played: 8,
    home_goals_scored: 12,
    home_goals_conceded: 18,
    away_goals_scored: 12,
    away_goals_conceded: 18,
    home_venue_matches: 4,
    home_venue_goals_scored: 4,
    home_venue_goals_conceded: 8,
    away_venue_matches: 4,
    away_venue_goals_scored: 3,
    away_venue_goals_conceded: 10,
    current_league_home_avg: 1.52,
    current_league_away_avg: 1.22,
    historical_league_home_avg: 1.50,
    historical_league_away_avg: 1.20,
    notes: "At Stade de la Meinau. Both teams struggle defensively (Strasbourg concedes 2.00 GA/G at home, Auxerre concedes 2.50 GA/G away)."
  },
  {
    id: 19,
    home_team: "Paris FC",
    away_team: "AS Monaco",
    country: "France",
    league: "Ligue 1",
    match_date: "2026-11-01",
    odds: 1.23,
    home_league_position: 6,
    away_league_position: 4,
    home_matches_played: 8,
    away_matches_played: 8,
    home_goals_scored: 13,
    home_goals_conceded: 9,
    away_goals_scored: 11,
    away_goals_conceded: 7,
    home_venue_matches: 4,
    home_venue_goals_scored: 7,
    home_venue_goals_conceded: 4,
    away_venue_matches: 4,
    away_venue_goals_scored: 5,
    away_venue_goals_conceded: 4,
    current_league_home_avg: 1.52,
    current_league_away_avg: 1.22,
    historical_league_home_avg: 1.50,
    historical_league_away_avg: 1.20,
    notes: "At Stade Charléty. Paris FC averages 1.75 GF/G at home; Monaco is well-balanced away (1.25 GF / 1.00 GA)."
  },
  {
    id: 20,
    home_team: "Olympique Lyonnais",
    away_team: "Angers SCO",
    country: "France",
    league: "Ligue 1",
    match_date: "2026-11-01",
    odds: 1.15,
    home_league_position: 5,
    away_league_position: 14,
    home_matches_played: 8,
    away_matches_played: 8,
    home_goals_scored: 13,
    home_goals_conceded: 7,
    away_goals_scored: 9,
    away_goals_conceded: 15,
    home_venue_matches: 4,
    home_venue_goals_scored: 8,
    home_venue_goals_conceded: 3,
    away_venue_matches: 4,
    away_venue_goals_scored: 3,
    away_venue_goals_conceded: 8,
    current_league_home_avg: 1.52,
    current_league_away_avg: 1.22,
    historical_league_home_avg: 1.50,
    historical_league_away_avg: 1.20,
    notes: "At Groupama Stadium. Lyon is strong at home (2.00 GF/G, 0.75 GA/G); Angers concedes 2.00 GA/G on the road."
  },
  {
    id: 21,
    home_team: "Olympique de Marseille",
    away_team: "Toulouse",
    country: "France",
    league: "Ligue 1",
    match_date: "2026-11-01",
    odds: 1.15,
    home_league_position: 9,
    away_league_position: 11,
    home_matches_played: 8,
    away_matches_played: 8,
    home_goals_scored: 18,
    home_goals_conceded: 13,
    away_goals_scored: 12,
    away_goals_conceded: 11,
    home_venue_matches: 4,
    home_venue_goals_scored: 10,
    home_venue_goals_conceded: 5,
    away_venue_matches: 4,
    away_venue_goals_scored: 5,
    away_venue_goals_conceded: 5,
    current_league_home_avg: 1.52,
    current_league_away_avg: 1.22,
    historical_league_home_avg: 1.50,
    historical_league_away_avg: 1.20,
    notes: "At Stade Vélodrome. Marseille scores 2.50 GF/G at home; Toulouse scores 1.25 GF and concedes 1.25 GA away."
  },

  // 7. Germany Bundesliga
  {
    id: 22,
    home_team: "1. FC Union Berlin",
    away_team: "1. FC Koln",
    country: "Germany",
    league: "Bundesliga",
    match_date: "2026-11-01",
    odds: 1.21,
    home_league_position: 17,
    away_league_position: 14,
    home_matches_played: 7,
    away_matches_played: 7,
    home_goals_scored: 6,
    home_goals_conceded: 18,
    away_goals_scored: 8,
    away_goals_conceded: 11,
    home_venue_matches: 4,
    home_venue_goals_scored: 5,
    home_venue_goals_conceded: 6,
    away_venue_matches: 3,
    away_venue_goals_scored: 2,
    away_venue_goals_conceded: 7,
    current_league_home_avg: 1.62,
    current_league_away_avg: 1.38,
    historical_league_home_avg: 1.60,
    historical_league_away_avg: 1.35,
    notes: "At Stadion An der Alten Försterei. Koln has conceded 2.33 GA/G away while scoring only 0.67 GF/G; Union Berlin scores 1.25 GF/G at home."
  },
  {
    id: 23,
    home_team: "Eintracht Frankfurt",
    away_team: "Hamburger SV",
    country: "Germany",
    league: "Bundesliga",
    match_date: "2026-11-01",
    odds: 1.11,
    home_league_position: 15,
    away_league_position: 13,
    home_matches_played: 7,
    away_matches_played: 7,
    home_goals_scored: 10,
    home_goals_conceded: 17,
    away_goals_scored: 6,
    away_goals_conceded: 16,
    home_venue_matches: 3,
    home_venue_goals_scored: 4,
    home_venue_goals_conceded: 6,
    away_venue_matches: 4,
    away_venue_goals_scored: 3,
    away_venue_goals_conceded: 10,
    current_league_home_avg: 1.62,
    current_league_away_avg: 1.38,
    historical_league_home_avg: 1.60,
    historical_league_away_avg: 1.35,
    notes: "At Deutsche Bank Park. Frankfurt leaks 2.00 GA/G at home; Hamburg concedes 2.50 GA/G on the road while scoring 0.75 GF/G."
  }
];

export const SKIPPED_FIXTURES = [];

export function getConfidenceLabel(prob) {
  if (prob >= 0.90) return "Extremely strong";
  if (prob >= 0.85) return "Very strong";
  if (prob >= 0.80) return "Strong";
  if (prob >= 0.75) return "Good";
  if (prob >= 0.70) return "Moderate";
  return "Weak for the Over 1.5-focused strategy";
}

export function classifyAlignment(delta_pp) {
  if (delta_pp <= 1.5) return "very_high";
  if (delta_pp <= 3.0) return "high";
  if (delta_pp <= 5.0) return "medium";
  if (delta_pp <= 7.0) return "low";
  return "very_low";
}

export function classifyEdge(edge_pp) {
  if (edge_pp > 15.0) return "very_high";
  if (edge_pp > 5.0) return "high";
  if (edge_pp >= 0.0) return "medium";
  if (edge_pp >= -10.0) return "low";
  return "very_low";
}

export function calculatePoissonOver15(lambda_total) {
  if (lambda_total <= 0) return 0.0;
  const exp_neg = Math.exp(-lambda_total);
  const p_0 = exp_neg;
  const p_1 = lambda_total * exp_neg;
  return 1.0 - (p_0 + p_1);
}

export function formatPos(p) {
  if (!p) return 'N/A';
  const num = parseInt(p, 10);
  if (num % 100 >= 11 && num % 100 <= 13) return `${num}th`;
  if (num % 10 === 1) return `${num}st`;
  if (num % 10 === 2) return `${num}nd`;
  if (num % 10 === 3) return `${num}rd`;
  return `${num}th`;
}

export function evaluateFixture(f) {
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

  if ((home_ga_pg <= 0.85 && away_ga_pg <= 0.85) || home_ga_pg <= 0.75 || away_ga_pg <= 0.75) {
    warnings.push({
      type: "STRONG_DEFENSIVE_MATCHUP",
      severity: "HIGH",
      direction: "CONTRADICTORY",
      market_relevance: "DIRECT",
      description: "Tight defensive record elevating clean-sheet / low-scoring risk.",
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
  } else if (medium_warnings.length >= 2 && edge_pp < 0) {
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

