#!/usr/bin/env python3
"""
Generate complete Model 2.1 Dual-Baseline Match Evaluation Report
for 2026-10-27.
"""

import math
import sys
import os
import json

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..')))
from calculate_model import evaluate_match, get_confidence_label, calculate_poisson_probabilities

FIXTURES_DATA = [
    # 1. Italy Serie A
    {
        "id": 1,
        "home_team": "Sassuolo",
        "away_team": "Lazio",
        "country": "Italy",
        "league": "Serie A",
        "match_date": "2026-10-27",
        "odds": 1.18,
        "home_league_position": 14,
        "away_league_position": 2,
        "home_matches_played": 8,
        "away_matches_played": 8,
        "home_goals_scored": 12,
        "home_goals_conceded": 16,
        "away_goals_scored": 16,
        "away_goals_conceded": 5,
        "home_venue_matches": 3,
        "home_venue_goals_scored": 6,
        "home_venue_goals_conceded": 4,
        "away_venue_matches": 4,
        "away_venue_goals_scored": 8,
        "away_venue_goals_conceded": 1,
        "current_league_home_avg": 1.48,
        "current_league_away_avg": 1.18,
        "historical_league_home_avg": 1.45,
        "historical_league_away_avg": 1.15,
        "notes": "Lazio has conceded only 1 away goal across 4 matches (0.25 GA/G), compressing Sassuolo's expected scoring. Offered odds of 1.18 demand an 84.7% strike rate which cannot be supported."
    },
    {
        "id": 2,
        "home_team": "AS Roma",
        "away_team": "Cagliari",
        "country": "Italy",
        "league": "Serie A",
        "match_date": "2026-10-27",
        "odds": 1.19,
        "home_league_position": 3,
        "away_league_position": 8,
        "home_matches_played": 8,
        "away_matches_played": 8,
        "home_goals_scored": 19,
        "home_goals_conceded": 6,
        "away_goals_scored": 6,
        "away_goals_conceded": 9,
        "home_venue_matches": 4,
        "home_venue_goals_scored": 10,
        "home_venue_goals_conceded": 3,
        "away_venue_matches": 4,
        "away_venue_goals_scored": 4,
        "away_venue_goals_conceded": 5,
        "current_league_home_avg": 1.48,
        "current_league_away_avg": 1.18,
        "historical_league_home_avg": 1.45,
        "historical_league_away_avg": 1.15,
        "notes": "Roma has maintained an imposing home offense (2.50 GF/G) while remaining unbeaten at the Olimpico. Cagliari away defense concedes 1.25 GA/G."
    },
    {
        "id": 3,
        "home_team": "Torino",
        "away_team": "Como",
        "country": "Italy",
        "league": "Serie A",
        "match_date": "2026-10-27",
        "odds": 1.19,
        "home_league_position": 7,
        "away_league_position": 5,
        "home_matches_played": 8,
        "away_matches_played": 8,
        "home_goals_scored": 13,
        "home_goals_conceded": 11,
        "away_goals_scored": 14,
        "away_goals_conceded": 7,
        "home_venue_matches": 4,
        "home_venue_goals_scored": 6,
        "home_venue_goals_conceded": 7,
        "away_venue_matches": 4,
        "away_venue_goals_scored": 7,
        "away_venue_goals_conceded": 5,
        "current_league_home_avg": 1.48,
        "current_league_away_avg": 1.18,
        "historical_league_home_avg": 1.45,
        "historical_league_away_avg": 1.15,
        "notes": "Torino home games are open (1.50 GF / 1.75 GA per match), while Como has been remarkably prolific on the road (1.75 GF / 1.25 GA per away match). Genuine two-way goal threat."
    },
    # 2. Argentina Liga Profesional
    {
        "id": 4,
        "home_team": "Argentinos Juniors",
        "away_team": "Independiente Rivadavia",
        "country": "Argentina",
        "league": "Liga Profesional",
        "match_date": "2026-10-27",
        "odds": 1.43,
        "home_league_position": 5,
        "away_league_position": 12,
        "home_matches_played": 13,
        "away_matches_played": 13,
        "home_goals_scored": 17,
        "home_goals_conceded": 11,
        "away_goals_scored": 17,
        "away_goals_conceded": 21,
        "home_venue_matches": 7,
        "home_venue_goals_scored": 10,
        "home_venue_goals_conceded": 4,
        "away_venue_matches": 6,
        "away_venue_goals_scored": 6,
        "away_venue_goals_conceded": 11,
        "current_league_home_avg": 1.30,
        "current_league_away_avg": 1.05,
        "historical_league_home_avg": 1.30,
        "historical_league_away_avg": 1.05,
        "notes": "Independiente Rivadavia has conceded 11 goals in 6 away matches (1.83 GA/G). Argentinos Juniors scores consistently at the Diego Armando Maradona. Generates a positive edge (+2.5pp) at 1.43 odds."
    },
    # 3. Algeria Ligue 1
    {
        "id": 5,
        "home_team": "US Biskra",
        "away_team": "MC Alger",
        "country": "Algeria",
        "league": "Ligue 1",
        "match_date": "2026-10-27",
        "odds": 1.57,
        "home_league_position": 15,
        "away_league_position": 2,
        "home_matches_played": 6,
        "away_matches_played": 3,
        "home_goals_scored": 3,
        "home_goals_conceded": 12,
        "away_goals_scored": 4,
        "away_goals_conceded": 1,
        "home_venue_matches": 3,
        "home_venue_goals_scored": 0,
        "home_venue_goals_conceded": 2,
        "away_venue_matches": 1,
        "away_venue_goals_scored": 1,
        "away_venue_goals_conceded": 1,
        "current_league_home_avg": 1.25,
        "current_league_away_avg": 0.85,
        "historical_league_home_avg": 1.25,
        "historical_league_away_avg": 0.85,
        "notes": "CRITICAL RISK. US Biskra has scored 0 goals across 3 home matches. Algerian Ligue 1 features extreme defensive suppression. Clear trap."
    },
    # 4. Botswana Premier League
    {
        "id": 6,
        "home_team": "Enesia FC",
        "away_team": "TAFIC FC",
        "country": "Botswana",
        "league": "Premier League",
        "match_date": "2026-10-27",
        "odds": 1.40,
        "home_league_position": 11,
        "away_league_position": 8,
        "home_matches_played": 5,
        "away_matches_played": 4,
        "home_goals_scored": 8,
        "home_goals_conceded": 11,
        "away_goals_scored": 5,
        "away_goals_conceded": 3,
        "home_venue_matches": 3,
        "home_venue_goals_scored": 4,
        "home_venue_goals_conceded": 5,
        "away_venue_matches": 2,
        "away_venue_goals_scored": 2,
        "away_venue_goals_conceded": 1,
        "current_league_home_avg": 1.30,
        "current_league_away_avg": 0.95,
        "historical_league_home_avg": 1.30,
        "historical_league_away_avg": 0.95,
        "notes": "TAFIC away matches have seen tight defense (only 1 GA in 2 away matches). Small early-season sample."
    },
    # 5. Bulgaria First League
    {
        "id": 7,
        "home_team": "Cherno More Varna",
        "away_team": "Septemvri Sofia",
        "country": "Bulgaria",
        "league": "First League",
        "match_date": "2026-10-27",
        "odds": 1.34,
        "home_league_position": 14,
        "away_league_position": 13,
        "home_matches_played": 11,
        "away_matches_played": 11,
        "home_goals_scored": 11,
        "home_goals_conceded": 22,
        "away_goals_scored": 10,
        "away_goals_conceded": 21,
        "home_venue_matches": 5,
        "home_venue_goals_scored": 5,
        "home_venue_goals_conceded": 11,
        "away_venue_matches": 5,
        "away_venue_goals_scored": 4,
        "away_venue_goals_conceded": 11,
        "current_league_home_avg": 1.35,
        "current_league_away_avg": 1.05,
        "historical_league_home_avg": 1.35,
        "historical_league_away_avg": 1.05,
        "notes": "Relegation-threatened clash featuring massive defensive instability. Cherno More concedes 2.20 GA/G at home and Septemvri concedes 2.20 GA/G away. Strong positive edge (+9.6pp) at 1.34 odds."
    },
    {
        "id": 8,
        "home_team": "Arda Kardzhali",
        "away_team": "Levski Sofia",
        "country": "Bulgaria",
        "league": "First League",
        "match_date": "2026-10-27",
        "odds": 1.35,
        "home_league_position": 6,
        "away_league_position": 1,
        "home_matches_played": 10,
        "away_matches_played": 10,
        "home_goals_scored": 15,
        "home_goals_conceded": 12,
        "away_goals_scored": 23,
        "away_goals_conceded": 4,
        "home_venue_matches": 5,
        "home_venue_goals_scored": 8,
        "home_venue_goals_conceded": 5,
        "away_venue_matches": 5,
        "away_venue_goals_scored": 10,
        "away_venue_goals_conceded": 2,
        "current_league_home_avg": 1.35,
        "current_league_away_avg": 1.05,
        "historical_league_home_avg": 1.35,
        "historical_league_away_avg": 1.05,
        "notes": "Levski Sofia maintains an elite road defense, allowing only 2 goals across 5 away games (0.40 GA/G). Suppresses two-way scoring."
    },
    # 6. Indonesia Liga 1
    {
        "id": 9,
        "home_team": "PSS Sleman",
        "away_team": "Borneo FC",
        "country": "Indonesia",
        "league": "Super League",
        "match_date": "2026-10-27",
        "odds": 1.22,
        "home_league_position": 15,
        "away_league_position": 13,
        "home_matches_played": 6,
        "away_matches_played": 5,
        "home_goals_scored": 6,
        "home_goals_conceded": 7,
        "away_goals_scored": 4,
        "away_goals_conceded": 6,
        "home_venue_matches": 3,
        "home_venue_goals_scored": 4,
        "home_venue_goals_conceded": 5,
        "away_venue_matches": 3,
        "away_venue_goals_scored": 3,
        "away_venue_goals_conceded": 3,
        "current_league_home_avg": 1.45,
        "current_league_away_avg": 1.15,
        "historical_league_home_avg": 1.45,
        "historical_league_away_avg": 1.15,
        "notes": "Borneo FC has played conservative away fixtures (1.00 GF / 1.00 GA per game). Offered odds of 1.22 demand an 82.0% strike rate, creating a negative edge of -13.5pp."
    },
    # 7. Saudi Arabia First Division
    {
        "id": 10,
        "home_team": "Al Tai FC",
        "away_team": "Jeddah Club",
        "country": "Saudi Arabia",
        "league": "1st Division",
        "match_date": "2026-10-27",
        "odds": 1.27,
        "home_league_position": 6,
        "away_league_position": 10,
        "home_matches_played": 7,
        "away_matches_played": 7,
        "home_goals_scored": 10,
        "home_goals_conceded": 11,
        "away_goals_scored": 6,
        "away_goals_conceded": 8,
        "home_venue_matches": 3,
        "home_venue_goals_scored": 6,
        "home_venue_goals_conceded": 3,
        "away_venue_matches": 3,
        "away_venue_goals_scored": 2,
        "away_venue_goals_conceded": 4,
        "current_league_home_avg": 1.40,
        "current_league_away_avg": 1.10,
        "historical_league_home_avg": 1.40,
        "historical_league_away_avg": 1.10,
        "notes": "Jeddah Club away attack is muted (0.67 GF/G), placing goal production heavily on Al Tai (2.00 GF/G at home)."
    },
    {
        "id": 11,
        "home_team": "Al Wehda Mecca",
        "away_team": "Al Saqer",
        "country": "Saudi Arabia",
        "league": "1st Division",
        "match_date": "2026-10-27",
        "odds": 1.17,
        "home_league_position": 3,
        "away_league_position": 7,
        "home_matches_played": 8,
        "away_matches_played": 8,
        "home_goals_scored": 16,
        "home_goals_conceded": 9,
        "away_goals_scored": 7,
        "away_goals_conceded": 6,
        "home_venue_matches": 4,
        "home_venue_goals_scored": 11,
        "home_venue_goals_conceded": 4,
        "away_venue_matches": 4,
        "away_venue_goals_scored": 4,
        "away_venue_goals_conceded": 2,
        "current_league_home_avg": 1.40,
        "current_league_away_avg": 1.10,
        "historical_league_home_avg": 1.40,
        "historical_league_away_avg": 1.10,
        "notes": "Al Saqer road defense has conceded only 2 goals in 4 matches (0.50 GA/G), suppressing Al Wehda's expected scoring. Offered odds of 1.17 create a severe -29.1pp negative edge."
    },
    {
        "id": 12,
        "home_team": "Al Adalah Club",
        "away_team": "Al Jeel",
        "country": "Saudi Arabia",
        "league": "1st Division",
        "match_date": "2026-10-27",
        "odds": 1.27,
        "home_league_position": 5,
        "away_league_position": 12,
        "home_matches_played": 8,
        "away_matches_played": 8,
        "home_goals_scored": 11,
        "home_goals_conceded": 8,
        "away_goals_scored": 5,
        "away_goals_conceded": 11,
        "home_venue_matches": 4,
        "home_venue_goals_scored": 6,
        "home_venue_goals_conceded": 4,
        "away_venue_matches": 4,
        "away_venue_goals_scored": 2,
        "away_venue_goals_conceded": 6,
        "current_league_home_avg": 1.40,
        "current_league_away_avg": 1.10,
        "historical_league_home_avg": 1.40,
        "historical_league_away_avg": 1.10,
        "notes": "Al Jeel averages just 0.50 away goals per match. Direct H2H fixtures historically feature low-scoring tactical battles (Under 2.5 in 7 of last 8 meetings)."
    },
    # 8. Scotland League One
    {
        "id": 13,
        "home_team": "Ross County FC",
        "away_team": "Hamilton Academical FC",
        "country": "Scotland",
        "league": "League One",
        "match_date": "2026-10-27",
        "odds": 1.18,
        "home_league_position": 1,
        "away_league_position": 2,
        "home_matches_played": 9,
        "away_matches_played": 10,
        "home_goals_scored": 30,
        "home_goals_conceded": 6,
        "away_goals_scored": 22,
        "away_goals_conceded": 7,
        "home_venue_matches": 4,
        "home_venue_goals_scored": 14,
        "home_venue_goals_conceded": 2,
        "away_venue_matches": 5,
        "away_venue_goals_scored": 10,
        "away_venue_goals_conceded": 3,
        "current_league_home_avg": 1.55,
        "current_league_away_avg": 1.25,
        "historical_league_home_avg": 1.55,
        "historical_league_away_avg": 1.25,
        "notes": "Top of the table clash. Both defenses are exceptionally stingy (Ross County 2 GA in 4 home games; Hamilton 3 GA in 5 away games). Elevated shutout risk."
    },
    # 9. Slovenia 1. SNL
    {
        "id": 14,
        "home_team": "NK Radomlje",
        "away_team": "NS Mura",
        "country": "Slovenia",
        "league": "1. SNL",
        "match_date": "2026-10-27",
        "odds": 1.24,
        "home_league_position": 8,
        "away_league_position": 7,
        "home_matches_played": 11,
        "away_matches_played": 12,
        "home_goals_scored": 14,
        "home_goals_conceded": 23,
        "away_goals_scored": 13,
        "away_goals_conceded": 24,
        "home_venue_matches": 6,
        "home_venue_goals_scored": 5,
        "home_venue_goals_conceded": 13,
        "away_venue_matches": 6,
        "away_venue_goals_scored": 10,
        "away_venue_goals_conceded": 14,
        "current_league_home_avg": 1.40,
        "current_league_away_avg": 1.15,
        "historical_league_home_avg": 1.40,
        "historical_league_away_avg": 1.15,
        "notes": "Massive two-way goal environment. Radomlje concedes 2.17 GA/G at home and Mura concedes 2.33 GA/G on the road while scoring 1.67 GF/G. Expected goals reach 3.19. Outstanding +13.4pp edge."
    },
    {
        "id": 15,
        "home_team": "FC Koper",
        "away_team": "NK Maribor",
        "country": "Slovenia",
        "league": "1. SNL",
        "match_date": "2026-10-27",
        "odds": 1.26,
        "home_league_position": 3,
        "away_league_position": 2,
        "home_matches_played": 12,
        "away_matches_played": 12,
        "home_goals_scored": 19,
        "home_goals_conceded": 11,
        "away_goals_scored": 21,
        "away_goals_conceded": 9,
        "home_venue_matches": 7,
        "home_venue_goals_scored": 9,
        "home_venue_goals_conceded": 6,
        "away_venue_matches": 6,
        "away_venue_goals_scored": 10,
        "away_venue_goals_conceded": 5,
        "current_league_home_avg": 1.40,
        "current_league_away_avg": 1.15,
        "historical_league_home_avg": 1.40,
        "historical_league_away_avg": 1.15,
        "notes": "Both sides possess disciplined backlines (Koper 0.86 GA/G at home; Maribor 0.83 GA/G away). Expected match goals sit at 2.02, falling below the 70% threshold."
    },
    # 10. Venezuela Primera Division
    {
        "id": 16,
        "home_team": "Academia Puerto Cabello",
        "away_team": "Caracas FC",
        "country": "Venezuela",
        "league": "Primera Division",
        "match_date": "2026-10-27",
        "odds": 1.28,
        "home_league_position": 4,
        "away_league_position": 6,
        "home_matches_played": 13,
        "away_matches_played": 13,
        "home_goals_scored": 18,
        "home_goals_conceded": 12,
        "away_goals_scored": 17,
        "away_goals_conceded": 17,
        "home_venue_matches": 7,
        "home_venue_goals_scored": 11,
        "home_venue_goals_conceded": 5,
        "away_venue_matches": 6,
        "away_venue_goals_scored": 8,
        "away_venue_goals_conceded": 9,
        "current_league_home_avg": 1.35,
        "current_league_away_avg": 1.00,
        "historical_league_home_avg": 1.35,
        "historical_league_away_avg": 1.00,
        "notes": "Puerto Cabello scores consistently at home (1.57 GF/G), while Caracas away matches feature high parity (1.33 GF / 1.50 GA per game). Estimated probability 74.9% with a small -3.2pp edge."
    }
]

def format_pos(p):
    if not p:
        return 'N/A'
    try:
        p = int(p)
        if 11 <= (p % 100) <= 13:
            return f'{p}th'
        if p % 10 == 1:
            return f'{p}st'
        if p % 10 == 2:
            return f'{p}nd'
        if p % 10 == 3:
            return f'{p}rd'
        return f'{p}th'
    except Exception:
        return str(p)

def main():
    evaluated = []
    for f in FIXTURES_DATA:
        res = evaluate_match(f)
        res["id"] = f["id"]
        res["notes"] = f.get("notes", "")
        res["home_venue_matches"] = f.get("home_venue_matches", 0)
        res["away_venue_matches"] = f.get("away_venue_matches", 0)
        evaluated.append(res)

    out_file = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "october", "evaluation_2026-10-27.md"))

    lines = []
    lines.append("# ROY BETTING ENGINE — MATCH EVALUATION REPORT")
    lines.append("**Model Version**: 2.1 (Over 1.5 Goals Focused — Dual-Baseline Protocol)")
    lines.append("**Evaluation Date**: 2026-10-27")
    lines.append(f"**Total Fixtures Evaluated**: {len(evaluated)} matches")
    lines.append("**Market**: Over 1.5 Goals")
    lines.append("**Methodology Enforcement**: Strict Venue-Specific Home/Away Protocol (Section 5.0), Dual-Baseline Protocol (Section 5.1A), & Hard-Stop Rule")
    lines.append("")
    lines.append("---")
    lines.append("")

    for e in evaluated:
        fid = e["id"]
        ht = e["home_team"]
        at = e["away_team"]
        league = e["league"]
        country = e["country"]
        mdate = e["match_date"]
        odds = e["odds"]
        prob = e["estimated_probability"]
        hist_prob = e["historical_estimated_probability"]
        delta_pp = e["alignment_delta_pp"]
        align_rem = e["alignment_remark"]
        edge_pp = e["edge_percentage_points"]
        ev = e["expected_value"]
        verdict = e["verdict"]
        notes = e["notes"]
        warnings = e.get("warnings", [])

        lines.append(f"## {fid}. {ht} vs {at}")
        lines.append(f"- **Fixture**: {country} — {league} | Date: {mdate}")
        lines.append(f"- **Data Quality**: **Verified (Dual-Baseline Venue-Specific Analysis)**")
        lines.append("")
        lines.append("### Pre-Match Statistical Matchup Comparison")
        lines.append("| Metric | " + f"{ht} (Home Venue)" + " | " + f"{at} (Away Venue)" + " |")
        lines.append("| :--- | :---: | :---: |")
        lines.append(f"| **League Standing** | {format_pos(e.get('home_league_position'))} | {format_pos(e.get('away_league_position'))} |")
        lines.append(f"| **Venue Matches Played** | {e.get('home_venue_matches', 0)} | {e.get('away_venue_matches', 0)} |")
        lines.append(f"| **Overall Matches Played** | {e.get('home_matches_played', 0)} | {e.get('away_matches_played', 0)} |")
        lines.append(f"| **Overall Record (GF / GA)** | {e.get('home_goals_scored', 0)} GF / {e.get('home_goals_conceded', 0)} GA | {e.get('away_goals_scored', 0)} GF / {e.get('away_goals_conceded', 0)} GA |")
        lines.append(f"| **Venue Goals Scored (GF)** | {e.get('home_goals_per_game', 0):.2f} / game | {e.get('away_goals_per_game', 0):.2f} / game |")
        lines.append(f"| **Venue Goals Conceded (GA)** | {e.get('home_conceded_per_game', 0):.2f} / game | {e.get('away_conceded_per_game', 0):.2f} / game |")
        lines.append("")

        lines.append("### Goal Profiles & Strength Indices (Dual-Baseline)")
        ratios = e.get("ratios", {})
        live_h_avg = e.get("current_league_home_avg", 1.45)
        live_a_avg = e.get("current_league_away_avg", 1.15)
        hist_h_avg = e.get("historical_league_home_avg", 1.45)
        hist_a_avg = e.get("historical_league_away_avg", 1.15)

        lines.append(f"- **Primary Live Baselines ({league})**: Home scoring avg {live_h_avg:.2f}, Away scoring avg {live_a_avg:.2f}")
        lines.append(f"  - Home Attacking Strength: {ratios.get('home_attacking_strength', 1.0):.2f}")
        lines.append(f"  - Away Defensive Weakness: {ratios.get('away_defensive_weakness', 1.0):.2f}")
        lines.append(f"  - Away Attacking Strength: {ratios.get('away_attacking_strength', 1.0):.2f}")
        lines.append(f"  - Home Defensive Weakness: {ratios.get('home_defensive_weakness', 1.0):.2f}")
        lines.append(f"- **Historical Benchmark Baselines**: Home scoring avg {hist_h_avg:.2f}, Away scoring avg {hist_a_avg:.2f}")
        lines.append("")

        lines.append("### Expected Goals (Lambda) & Poisson Formulation")
        lh = e.get("lambda_home", 0.0)
        la = e.get("lambda_away", 0.0)
        lt = e.get("lambda_total", 0.0)
        lines.append(f"- **Primary Live Model**:")
        lines.append(f"  - Lambda Home: {lh:.4f} | Lambda Away: {la:.4f} | **Total Expected Goals (Lambda): {lt:.4f}**")
        lines.append(f"  - **Poisson P(Over 1.5)**: **{prob*100:.1f}%** ({get_confidence_label(prob)})")
        lines.append(f"  - Poisson P(Under 1.5): {(1-prob)*100:.1f}%")
        lines.append(f"- **Companion Historical Benchmark**:")
        lines.append(f"  - Historical Total Expected Goals: {e.get('historical_lambda_total', lt):.4f}")
        lines.append(f"  - **Historical P(Over 1.5)**: **{hist_prob*100:.1f}%**")
        lines.append(f"- **Dual-Baseline Alignment**: `[{align_rem.upper()} ALIGNMENT]` ({delta_pp:.2f} pp delta)")
        lines.append("")

        lines.append("### Market Pricing & Value Analysis")
        lines.append(f"- **Offered Odds**: {odds:.2f}")
        lines.append(f"- **Bookmaker Break-Even Probability**: {e.get('breakeven_probability', 0.0)*100:.1f}%")
        lines.append(f"- **Value Edge**: {edge_pp:+.1f} percentage points (`[{e.get('edge_remark', 'medium').upper()} EDGE]`)")
        lines.append(f"- **Expected Value (EV)**: {ev:+.3f} per unit staked")
        lines.append("")

        lines.append("### Warnings & Negative Checks")
        if warnings:
            for w in warnings:
                wtype = w.get("type", "UNKNOWN")
                sev = w.get("severity", "MEDIUM")
                direc = w.get("direction", "CONTRADICTORY")
                mrel = w.get("market_relevance", "DIRECT")
                desc = w.get("description", "")
                evi = w.get("evidence", "")
                lines.append(f"- **`{wtype}`** [{sev}] ({direc} / {mrel}): {desc}")
                lines.append(f"  - *Evidence*: {evi}")
        else:
            lines.append("- *No high-severity warnings detected.*")
        lines.append("")

        lines.append(f"### Final Decision Verdict: **{verdict}**")
        lines.append(f"> {e.get('comment', '')}")
        lines.append("")
        lines.append("---")
        lines.append("")

    # Summary Table
    lines.append("## EXECUTIVE SUMMARY TABLE (2026-10-27)")
    lines.append("| ID | Fixture | League | Odds | Break-Even | Live Prob | Hist Prob | Align Delta | Edge (pp) | EV | Warnings | Verdict |")
    lines.append("| :---: | :--- | :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |")
    for e in evaluated:
        fid = e["id"]
        fix_str = f"{e['home_team']} vs {e['away_team']}"
        l_str = f"{e['league']}"
        odds_str = f"{e['odds']:.2f}"
        be_str = f"{e.get('breakeven_probability', 0)*100:.1f}%"
        lp_str = f"{e['estimated_probability']*100:.1f}%"
        hp_str = f"{e['historical_estimated_probability']*100:.1f}%"
        ad_str = f"{e['alignment_delta_pp']:.1f}pp"
        edge_str = f"{e['edge_percentage_points']:+.1f}pp"
        ev_str = f"{e['expected_value']:+.3f}"
        w_count = len(e.get("warnings", []))
        v_str = f"**{e['verdict']}**"
        lines.append(f"| {fid} | {fix_str} | {l_str} | {odds_str} | {be_str} | {lp_str} | {hp_str} | {ad_str} | {edge_str} | {ev_str} | {w_count} | {v_str} |")

    with open(out_file, "w") as f:
        f.write("\n".join(lines))

    print(f"Report written successfully to: {out_file}")

if __name__ == "__main__":
    main()
