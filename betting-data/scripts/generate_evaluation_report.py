#!/usr/bin/env python3
"""
Script to generate the complete Model 2.1 Dual-Baseline Match Evaluation Report
for 2026-10-26.
"""

import math
import sys
import os

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..')))
from calculate_model import evaluate_match, get_confidence_label, calculate_poisson_probabilities

FIXTURES_DATA = [
    {
        "id": 1,
        "home_team": "Walsall",
        "away_team": "Salford City",
        "odds": 1.20,
        "country": "England",
        "league": "League Two",
        "match_date": "2026-10-26",
        "home_league_position": 5,
        "away_league_position": 1,
        "home_matches_played": 11,
        "away_matches_played": 12,
        "home_goals_scored": 16,
        "home_goals_conceded": 7,
        "away_goals_scored": 19,
        "away_goals_conceded": 12,
        "home_venue_matches": 5,
        "home_venue_goals_scored": 8,
        "home_venue_goals_conceded": 2,
        "away_venue_matches": 6,
        "away_venue_goals_scored": 12,
        "away_venue_goals_conceded": 9,
        "current_league_home_avg": 1.52,
        "current_league_away_avg": 1.06,
        "historical_league_home_avg": 1.45,
        "historical_league_away_avg": 1.15,
        "notes": "Top-table clash in League Two. Walsall has maintained an exceptionally tight defensive record at Bescot Stadium (only 2 GA in 5 matches), while Salford boasts the most prolific road attack in the division (12 GF in 6 away matches)."
    },
    {
        "id": 2,
        "home_team": "Sevilla",
        "away_team": "Osasuna",
        "odds": 1.38,
        "country": "Spain",
        "league": "La Liga",
        "match_date": "2026-10-26",
        "home_league_position": 6,
        "away_league_position": 10,
        "home_matches_played": 9,
        "away_matches_played": 9,
        "home_goals_scored": 14,
        "home_goals_conceded": 16,
        "away_goals_scored": 10,
        "away_goals_conceded": 18,
        "home_venue_matches": 4,
        "home_venue_goals_scored": 5,
        "home_venue_goals_conceded": 7,
        "away_venue_matches": 4,
        "away_venue_goals_scored": 6,
        "away_venue_goals_conceded": 15,
        "current_league_home_avg": 1.42,
        "current_league_away_avg": 1.12,
        "historical_league_home_avg": 1.45,
        "historical_league_away_avg": 1.10,
        "notes": "Osasuna's road defense has suffered extreme breakdown, conceding 15 goals across their first 4 away fixtures (3.75 GA/G). Sevilla has conceded 7 goals in 4 home games, yielding an unusually elevated two-way scoring environment."
    },
    {
        "id": 3,
        "home_team": "FC Andorra",
        "away_team": "Burgos CF",
        "odds": 1.30,
        "country": "Spain",
        "league": "Segunda División",
        "match_date": "2026-10-26",
        "home_league_position": 14,
        "away_league_position": 11,
        "home_matches_played": 9,
        "away_matches_played": 10,
        "home_goals_scored": 13,
        "home_goals_conceded": 15,
        "away_goals_scored": 13,
        "away_goals_conceded": 10,
        "home_venue_matches": 5,
        "home_venue_goals_scored": 8,
        "home_venue_goals_conceded": 8,
        "away_venue_matches": 4,
        "away_venue_goals_scored": 3,
        "away_venue_goals_conceded": 4,
        "current_league_home_avg": 1.30,
        "current_league_away_avg": 0.95,
        "historical_league_home_avg": 1.35,
        "historical_league_away_avg": 1.00,
        "notes": "Burgos CF operates with an ultra-conservative away profile (0.75 GF/G, 1.00 GA/G across 4 away games). Andorra's home matches feature high parity (8 GF, 8 GA in 5 matches)."
    },
    {
        "id": 4,
        "home_team": "Paris Saint-Germain",
        "away_team": "Olympique Lyonnais",
        "odds": 1.11,
        "country": "France",
        "league": "Ligue 1",
        "match_date": "2026-10-26",
        "home_league_position": 2,
        "away_league_position": 4,
        "home_matches_played": 7,
        "away_matches_played": 7,
        "home_goals_scored": 14,
        "home_goals_conceded": 9,
        "away_goals_scored": 13,
        "away_goals_conceded": 5,
        "home_venue_matches": 2,
        "home_venue_goals_scored": 4,
        "home_venue_goals_conceded": 3,
        "away_venue_matches": 3,
        "away_venue_goals_scored": 3,
        "away_venue_goals_conceded": 2,
        "current_league_home_avg": 1.62,
        "current_league_away_avg": 1.28,
        "historical_league_home_avg": 1.50,
        "historical_league_away_avg": 1.20,
        "notes": "Extreme small sample size on venue splits (PSG only 2 home matches, Lyon 3 away matches). Bookmaker offered odds of 1.11 require a 90.1% break-even probability, which is unsupportable."
    },
    {
        "id": 5,
        "home_team": "Montpellier",
        "away_team": "Red Star FC",
        "odds": 1.25,
        "country": "France",
        "league": "Ligue 2",
        "match_date": "2026-10-26",
        "home_league_position": 8,
        "away_league_position": 6,
        "home_matches_played": 9,
        "away_matches_played": 9,
        "home_goals_scored": 11,
        "home_goals_conceded": 5,
        "away_goals_scored": 12,
        "away_goals_conceded": 10,
        "home_venue_matches": 4,
        "home_venue_goals_scored": 3,
        "home_venue_goals_conceded": 1,
        "away_venue_matches": 5,
        "away_venue_goals_scored": 10,
        "away_venue_goals_conceded": 5,
        "current_league_home_avg": 1.32,
        "current_league_away_avg": 1.08,
        "historical_league_home_avg": 1.35,
        "historical_league_away_avg": 1.05,
        "notes": "Montpellier has conceded only 1 goal in 4 home matches (0.25 GA/G) and scored only 3 (0.75 GF/G), creating a heavy low-scoring environment despite Red Star's away goal tally."
    },
    {
        "id": 6,
        "home_team": "US Boulogne",
        "away_team": "Stade de Reims",
        "odds": 1.33,
        "country": "France",
        "league": "Ligue 2",
        "match_date": "2026-10-26",
        "home_league_position": 16,
        "away_league_position": 3,
        "home_matches_played": 9,
        "away_matches_played": 9,
        "home_goals_scored": 6,
        "home_goals_conceded": 6,
        "away_goals_scored": 19,
        "away_goals_conceded": 11,
        "home_venue_matches": 4,
        "home_venue_goals_scored": 2,
        "home_venue_goals_conceded": 3,
        "away_venue_matches": 4,
        "away_venue_goals_scored": 6,
        "away_venue_goals_conceded": 4,
        "current_league_home_avg": 1.32,
        "current_league_away_avg": 1.08,
        "historical_league_home_avg": 1.35,
        "historical_league_away_avg": 1.05,
        "notes": "Boulogne is severely goal-deprived at home, scoring only 2 goals in 4 matches (0.50 GF/G). Reims has conceded 4 goals in 4 away games."
    },
    {
        "id": 7,
        "home_team": "Santa Clara",
        "away_team": "SL Benfica",
        "odds": 1.27,
        "country": "Portugal",
        "league": "Liga Portugal",
        "match_date": "2026-10-26",
        "home_league_position": 5,
        "away_league_position": 2,
        "home_matches_played": 8,
        "away_matches_played": 8,
        "home_goals_scored": 13,
        "home_goals_conceded": 6,
        "away_goals_scored": 22,
        "away_goals_conceded": 6,
        "home_venue_matches": 4,
        "home_venue_goals_scored": 7,
        "home_venue_goals_conceded": 2,
        "away_venue_matches": 4,
        "away_venue_goals_scored": 15,
        "away_venue_goals_conceded": 3,
        "current_league_home_avg": 1.42,
        "current_league_away_avg": 1.18,
        "historical_league_home_avg": 1.45,
        "historical_league_away_avg": 1.15,
        "notes": "Strong clash between Santa Clara's elite home defense (2 GA in 4 matches, 0.50 GA/G) and Benfica's explosive away attack (15 GF in 4 matches, skewed by a 7-0 victory). Warning STRONG_DEFENSIVE_MATCHUP flagged."
    },
    {
        "id": 8,
        "home_team": "SCU Torreense",
        "away_team": "Amarante FC",
        "odds": 1.32,
        "country": "Portugal",
        "league": "Liga Portugal 2",
        "match_date": "2026-10-26",
        "home_league_position": 10,
        "away_league_position": 15,
        "home_matches_played": 7,
        "away_matches_played": 7,
        "home_goals_scored": 7,
        "home_goals_conceded": 10,
        "away_goals_scored": 6,
        "away_goals_conceded": 10,
        "home_venue_matches": 3,
        "home_venue_goals_scored": 2,
        "home_venue_goals_conceded": 5,
        "away_venue_matches": 3,
        "away_venue_goals_scored": 2,
        "away_venue_goals_conceded": 5,
        "current_league_home_avg": 1.30,
        "current_league_away_avg": 1.08,
        "historical_league_home_avg": 1.35,
        "historical_league_away_avg": 1.10,
        "notes": "Both teams have scored only 2 goals across their 3 venue matches (0.67 GF/G each), suffering severe offensive stagnation."
    },
    {
        "id": 9,
        "home_team": "Coritiba",
        "away_team": "Grêmio",
        "odds": 1.28,
        "country": "Brazil",
        "league": "Série A",
        "match_date": "2026-10-26",
        "home_league_position": 12,
        "away_league_position": 18,
        "home_matches_played": 31,
        "away_matches_played": 31,
        "home_goals_scored": 38,
        "home_goals_conceded": 49,
        "away_goals_scored": 34,
        "away_goals_conceded": 44,
        "home_venue_matches": 15,
        "home_venue_goals_scored": 20,
        "home_venue_goals_conceded": 20,
        "away_venue_matches": 15,
        "away_venue_goals_scored": 9,
        "away_venue_goals_conceded": 23,
        "current_league_home_avg": 1.38,
        "current_league_away_avg": 0.98,
        "historical_league_home_avg": 1.40,
        "historical_league_away_avg": 1.00,
        "notes": "Late-season matchday 32 fixture with extensive 15-match venue samples. Grêmio averages only 0.60 GF/G on the road (9 GF in 15 away matches), producing significant shutout exposure."
    },
    {
        "id": 10,
        "home_team": "CA Unión de Santa Fe",
        "away_team": "Estudiantes de La Plata",
        "odds": 1.38,
        "country": "Argentina",
        "league": "Liga Profesional",
        "match_date": "2026-10-26",
        "home_league_position": 11,
        "away_league_position": 10,
        "home_matches_played": 13,
        "away_matches_played": 13,
        "home_goals_scored": 18,
        "home_goals_conceded": 22,
        "away_goals_scored": 16,
        "away_goals_conceded": 15,
        "home_venue_matches": 6,
        "home_venue_goals_scored": 11,
        "home_venue_goals_conceded": 10,
        "away_venue_matches": 6,
        "away_venue_goals_scored": 3,
        "away_venue_goals_conceded": 10,
        "current_league_home_avg": 1.28,
        "current_league_away_avg": 1.02,
        "historical_league_home_avg": 1.30,
        "historical_league_away_avg": 1.05,
        "notes": "Unión Santa Fe exhibits porous defensive structure at home (10 GA in 6 matches, 1.67 GA/G) paired with active scoring (11 GF, 1.83 GF/G). Estudiantes has conceded 10 goals in 6 away fixtures."
    },
    {
        "id": 11,
        "home_team": "FC Ararat-Armenia",
        "away_team": "FC Noah",
        "odds": 1.28,
        "country": "Armenia",
        "league": "Premier League",
        "match_date": "2026-10-26",
        "home_league_position": 2,
        "away_league_position": 1,
        "home_matches_played": 10,
        "away_matches_played": 10,
        "home_goals_scored": 19,
        "home_goals_conceded": 9,
        "away_goals_scored": 27,
        "away_goals_conceded": 7,
        "home_venue_matches": 5,
        "home_venue_goals_scored": 10,
        "home_venue_goals_conceded": 2,
        "away_venue_matches": 4,
        "away_venue_goals_scored": 13,
        "away_venue_goals_conceded": 4,
        "current_league_home_avg": 1.48,
        "current_league_away_avg": 1.22,
        "historical_league_home_avg": 1.45,
        "historical_league_away_avg": 1.15,
        "notes": "Title showdown in Armenia. Noah is prolific (13 away GF in 4 matches), but Ararat-Armenia has conceded only 2 goals in 5 home matches (0.40 GA/G), suppressing expected goals below the 70% threshold."
    },
    {
        "id": 12,
        "home_team": "Busaiteen",
        "away_team": "Bouri Cultural SC",
        "odds": 1.24,
        "country": "Bahrain",
        "league": "Second Division",
        "match_date": "2026-10-26",
        "is_halted": True
    },
    {
        "id": 13,
        "home_team": "Um Alhassam",
        "away_team": "Al Budaiya",
        "odds": 1.29,
        "country": "Bahrain",
        "league": "Second Division",
        "match_date": "2026-10-26",
        "is_halted": True
    },
    {
        "id": 14,
        "home_team": "Al Shabab Manama",
        "away_team": "Isa Town",
        "odds": 1.35,
        "country": "Bahrain",
        "league": "Second Division",
        "match_date": "2026-10-26",
        "is_halted": True
    },
    {
        "id": 15,
        "home_team": "CA Nacional Potosí",
        "away_team": "Guabirá",
        "odds": 1.12,
        "country": "Bolivia",
        "league": "División Profesional",
        "match_date": "2026-10-26",
        "home_league_position": 9,
        "away_league_position": 7,
        "home_matches_played": 22,
        "away_matches_played": 22,
        "home_goals_scored": 32,
        "home_goals_conceded": 31,
        "away_goals_scored": 34,
        "away_goals_conceded": 44,
        "home_venue_matches": 11,
        "home_venue_goals_scored": 18,
        "home_venue_goals_conceded": 15,
        "away_venue_matches": 11,
        "away_venue_goals_scored": 10,
        "away_venue_goals_conceded": 33,
        "current_league_home_avg": 1.68,
        "current_league_away_avg": 1.12,
        "historical_league_home_avg": 1.70,
        "historical_league_away_avg": 1.05,
        "notes": "Classic high-altitude Bolivian fixture. Guabirá has conceded an astounding 33 goals in 11 away games (3.00 GA/G), while Nacional Potosí scores 1.64 GF/G and concedes 1.36 GA/G at home."
    },
    {
        "id": 16,
        "home_team": "Lokomotiv Plovdiv",
        "away_team": "PFK Slavia Sofia",
        "odds": 1.50,
        "country": "Bulgaria",
        "league": "First League",
        "match_date": "2026-10-26",
        "home_league_position": 11,
        "away_league_position": 8,
        "home_matches_played": 11,
        "away_matches_played": 11,
        "home_goals_scored": 6,
        "home_goals_conceded": 14,
        "away_goals_scored": 9,
        "away_goals_conceded": 9,
        "home_venue_matches": 5,
        "home_venue_goals_scored": 5,
        "home_venue_goals_conceded": 5,
        "away_venue_matches": 5,
        "away_venue_goals_scored": 5,
        "away_venue_goals_conceded": 3,
        "current_league_home_avg": 1.38,
        "current_league_away_avg": 1.02,
        "historical_league_home_avg": 1.35,
        "historical_league_away_avg": 1.05,
        "notes": "Low-scoring Bulgarian league fixture. Lokomotiv scores 1.00 GF/G at home while Slavia Sofia concedes only 0.60 GA/G on the road."
    },
    {
        "id": 17,
        "home_team": "CSKA Sofia",
        "away_team": "PFC Ludogorets Razgrad",
        "odds": 1.27,
        "country": "Bulgaria",
        "league": "First League",
        "match_date": "2026-10-26",
        "home_league_position": 2,
        "away_league_position": 3,
        "home_matches_played": 11,
        "away_matches_played": 10,
        "home_goals_scored": 27,
        "home_goals_conceded": 9,
        "away_goals_scored": 21,
        "away_goals_conceded": 7,
        "home_venue_matches": 5,
        "home_venue_goals_scored": 16,
        "home_venue_goals_conceded": 3,
        "away_venue_matches": 4,
        "away_venue_goals_scored": 10,
        "away_venue_goals_conceded": 3,
        "current_league_home_avg": 1.38,
        "current_league_away_avg": 1.02,
        "historical_league_home_avg": 1.35,
        "historical_league_away_avg": 1.05,
        "notes": "Top-tier summit clash. While both attacks are prolific (CSKA 3.20 home GF/G, Ludogorets 2.50 away GF/G), both possess elite defenses conceding only 0.60 and 0.75 GA/G. Warning STRONG_DEFENSIVE_MATCHUP applies."
    }
]

def get_ordinal(n):
    if 11 <= (n % 100) <= 13:
        return f"{n}th"
    suffix = {1: 'st', 2: 'nd', 3: 'rd'}.get(n % 10, 'th')
    return f"{n}{suffix}"

def format_report():
    out = []
    out.append("# ROY BETTING ENGINE — MATCH EVALUATION REPORT")
    out.append("**Model Version**: 2.1 (Over 1.5 Goals Focused — Dual-Baseline Protocol)")
    out.append("**Evaluation Date**: 2026-10-26")
    out.append("**Total Fixtures Evaluated**: 17 matches")
    out.append("**Source Odds Provider**: Betmomo")
    out.append("**Methodology Enforcement**: Strict Venue-Specific Home/Away Protocol (Section 5.0), Dual-Baseline Protocol (Section 5.1A), & Hard-Stop Rule")
    out.append("\n---\n")

    summary_rows = []

    for item in FIXTURES_DATA:
        idx = item["id"]
        home = item["home_team"]
        away = item["away_team"]
        country = item["country"]
        league = item["league"]
        date = item["match_date"]
        odds = item["odds"]

        out.append(f"## {idx}. {home} vs {away}")
        out.append(f"- **Fixture**: {country} — {league} | Date: {date}")

        if item.get("is_halted"):
            out.append("- **Data Quality**: **INSUFFICIENT DATA** (Section 5.0 Hard-Stop Triggered)")
            out.append("\n### Historical Statistics & Goal Profiles")
            out.append(f"- **{home} (Home)**: Early-season venue-specific statistics unverified across public statistical APIs.")
            out.append(f"- **{away} (Away)**: Early-season venue-specific statistics unverified across public statistical APIs.")
            out.append("- **League Stage**: Round 4 (Total season sample of only 3 matches played per club at shared/neutral venues).")
            out.append("\n### Expected Goals (λ) & Poisson Formulation")
            out.append("- **Calculation Status**: **HALTED** per Model 2.1 Section 5.0 Hard-Stop Rule.")
            out.append("- **Reason**: Missing mandatory venue-specific splits (`home_venue_matches`, `home_venue_goals_scored`, `home_venue_goals_conceded`, `away_venue_matches`, `away_venue_goals_scored`, `away_venue_goals_conceded`). Overall season aggregates cannot be substituted as mathematical proxies for venue performance.")
            out.append("\n### Market Pricing & Value Analysis")
            be_prob = round(1.0 / odds * 100, 1)
            out.append(f"- **Offered Odds**: {odds:.2f}")
            out.append(f"- **Bookmaker Break-Even Probability**: {be_prob}%")
            out.append("- **Value Edge**: N/A (Calculation Halted)")
            out.append("- **Expected Value (EV)**: N/A")
            out.append("\n### Warnings & Negative Checks")
            out.append(f"- **`MISSING_HOME_AWAY_DATA`** [CRITICAL] (CONTRADICTORY / DIRECT): Mandatory venue-specific statistics missing for {home} vs {away}.")
            out.append(f"  - *Evidence*: Unverified venue splits for early-season Round 4 match. Full season aggregates cannot be substituted for lambda under Section 5.0.")
            out.append("- **`TEAM_NEWS_UNVERIFIED`** [LOW] (NEUTRAL / CONTEXTUAL): Pre-match team news and confirmed starting lineups remain unverified.")
            out.append("  - *Evidence*: Lineups have not been locked in; rotation or late injury risk unconfirmed.")
            out.append("\n### Final Decision Verdict: **INSUFFICIENT DATA**")
            out.append(f"> INSUFFICIENT DATA. Calculation halted for {home} vs {away}: Missing venue-specific statistics (home_venue_matches, home_venue_goals_scored, home_venue_goals_conceded, away_venue_matches, away_venue_goals_scored, away_venue_goals_conceded). Under Model 2.1 Section 5.0 Hard-Stop Rule, full-season aggregates cannot be substituted for lambda.\n")
            out.append("---\n")

            summary_rows.append({
                "match": f"**{home} vs {away}**",
                "market": f"Over 1.5 @ {odds:.2f}",
                "prob": "*Halted*",
                "hist": "*N/A*",
                "be": f"{be_prob}%",
                "edge": "N/A",
                "ev": "N/A",
                "verdict": "**INSUFFICIENT DATA**",
                "warnings": "`MISSING_HOME_AWAY_DATA`"
            })
            continue

        res = evaluate_match(item)
        out.append("- **Data Quality**: **Verified (Dual-Baseline Venue-Specific Analysis)**")

        # Table
        h_pos = item["home_league_position"]
        a_pos = item["away_league_position"]
        h_vm = item["home_venue_matches"]
        a_vm = item["away_venue_matches"]
        h_om = item["home_matches_played"]
        a_om = item["away_matches_played"]
        h_vgf = item["home_venue_goals_scored"]
        h_vga = item["home_venue_goals_conceded"]
        a_vgf = item["away_venue_goals_scored"]
        a_vga = item["away_venue_goals_conceded"]
        h_vgf_g = h_vgf / h_vm
        h_vga_g = h_vga / h_vm
        a_vgf_g = a_vgf / a_vm
        a_vga_g = a_vga / a_vm
        h_gd = h_vgf - h_vga
        a_gd = a_vgf - a_vga

        out.append("\n### Pre-Match Statistical Matchup Comparison")
        out.append(f"| Metric | {home} (Home Venue) | {away} (Away Venue) |")
        out.append("| :--- | :---: | :---: |")
        out.append(f"| **League Standing** | {get_ordinal(h_pos)} | {get_ordinal(a_pos)} |")
        out.append(f"| **Venue Matches Played** | {h_vm} | {a_vm} |")
        out.append(f"| **Overall Matches Played** | {h_om} | {a_om} |")
        out.append(f"| **Venue Goals Scored (GF)** | {h_vgf} ({h_vgf_g:.2f} / game) | {a_vgf} ({a_vgf_g:.2f} / game) |")
        out.append(f"| **Venue Goals Conceded (GA)** | {h_vga} ({h_vga_g:.2f} / game) | {a_vga} ({a_vga_g:.2f} / game) |")
        out.append(f"| **Venue Goal Difference (GD)** | {h_gd:+d} | {a_gd:+d} |")
        out.append(f"| **Overall Record (GF / GA)** | {item['home_goals_scored']} GF / {item['home_goals_conceded']} GA | {item['away_goals_scored']} GF / {item['away_goals_conceded']} GA |")

        # Historical Statistics & Goal Profiles
        cur_h_avg = item["current_league_home_avg"]
        cur_a_avg = item["current_league_away_avg"]
        hist_h_avg = item["historical_league_home_avg"]
        hist_a_avg = item["historical_league_away_avg"]

        h_atk_str = h_vgf_g / cur_h_avg
        a_def_weak = a_vga_g / cur_h_avg
        a_atk_str = a_vgf_g / cur_a_avg
        h_def_weak = h_vga_g / cur_a_avg

        out.append("\n### Goal Profiles & Strength Indices (Dual-Baseline)")
        out.append(f"- **Primary Live Baselines ({country} {league} 2026/27)**: Home scoring avg {cur_h_avg:.2f}, Away scoring avg {cur_a_avg:.2f}")
        out.append("  - **Home Attacking Strength**: " f"{h_vgf_g:.2f} ÷ {cur_h_avg:.2f} = {h_atk_str:.2f}")
        out.append("  - **Away Defensive Weakness**: " f"{a_vga_g:.2f} ÷ {cur_h_avg:.2f} = {a_def_weak:.2f}")
        out.append("  - **Away Attacking Strength**: " f"{a_vgf_g:.2f} ÷ {cur_a_avg:.2f} = {a_atk_str:.2f}")
        out.append("  - **Home Defensive Weakness**: " f"{h_vga_g:.2f} ÷ {cur_a_avg:.2f} = {h_def_weak:.2f}")
        out.append(f"- **Historical Benchmark Baselines (Locked Catalog)**: Home scoring avg {hist_h_avg:.2f}, Away scoring avg {hist_a_avg:.2f}")

        # Expected Goals & Poisson Formulation
        p_lambda_h = res["lambda_home"]
        p_lambda_a = res["lambda_away"]
        p_lambda_tot = res["lambda_total"]
        p_prob = res["estimated_probability"] * 100
        p_under = (1.0 - res["estimated_probability"]) * 100
        conf = res["confidence_label"]

        # Calculate hist lambda components
        hist_lh = (h_vgf_g * a_vga_g) / hist_h_avg
        hist_la = (a_vgf_g * h_vga_g) / hist_a_avg
        hist_ltot = res["historical_lambda_total"]
        hist_prob = res["historical_estimated_probability"] * 100

        align_delta = res["alignment_delta_pp"]
        align_rem = res["alignment_remark"]
        edge_rem = res["edge_remark"]

        align_badge_map = {
            "very_high": "`[VERY HIGH ALIGNMENT]`",
            "high": "`[HIGH ALIGNMENT]`",
            "medium": "`[MEDIUM ALIGNMENT]`",
            "low": "`[LOW ALIGNMENT]`",
            "very_low": "`[VERY LOW ALIGNMENT]`"
        }
        edge_badge_map = {
            "very_high": "`[VERY HIGH EDGE]`",
            "high": "`[HIGH EDGE]`",
            "medium": "`[MEDIUM EDGE]`",
            "low": "`[LOW EDGE]`",
            "very_low": "`[VERY LOW EDGE]`"
        }
        align_badge = align_badge_map.get(align_rem, f"`[{align_rem.upper()}]`")
        edge_badge = edge_badge_map.get(edge_rem, f"`[{edge_rem.upper()}]`")

        if align_rem == "very_high":
            align_interp = "Near-perfect consensus between live season and historical multi-year benchmark (Delta ≤ 1.5 pp). Maximum statistical stability."
        elif align_rem == "high":
            align_interp = "Strong agreement between live season and historical benchmark (Delta ≤ 3.0 pp). High mathematical confidence."
        elif align_rem == "medium":
            align_interp = "Moderate drift reflecting expected mid-season scoring environment evolution. Operational decisions remain anchored to the primary model."
        elif align_rem == "low":
            align_interp = "Noticeable divergence between current-season scoring rates and multi-year competition baselines. Review team venue form."
        else:
            align_interp = "Substantial macro scoring environment distortion between current season and long-term history. Heightened caution advised."

        out.append("\n### Expected Goals (λ) & Poisson Formulation")
        out.append(f"- **Primary Live Model**:")
        out.append(f"  - λ_home: {p_lambda_h:.4f} | λ_away: {p_lambda_a:.4f} | **λ_total: {p_lambda_tot:.4f}**")
        out.append(f"  - **Poisson P(Over 1.5)**: **{p_prob:.1f}%** ({conf})")
        out.append(f"  - Poisson P(Under 1.5): {p_under:.1f}%")
        out.append(f"- **Companion Historical Benchmark**:")
        out.append(f"  - Hist λ_home: {hist_lh:.4f} | Hist λ_away: {hist_la:.4f} | **Hist λ_total: {hist_ltot:.4f}**")
        out.append(f"  - **Historical P(Over 1.5)**: **{hist_prob:.1f}%**")
        out.append(f"- **Dual-Baseline Alignment**: {align_badge} ({align_delta:.2f} pp delta)")
        out.append(f"  - *Interpretation*: {align_interp}")

        # Market Pricing & Value Analysis
        be_prob = res["breakeven_probability"] * 100
        edge = res["edge_percentage_points"]
        ev = res["expected_value"]

        out.append("\n### Market Pricing & Value Analysis")
        out.append(f"- **Offered Odds**: {odds:.2f}")
        out.append(f"- **Bookmaker Break-Even Probability**: {be_prob:.1f}%")
        out.append(f"- **Value Edge**: {edge:+.1f} percentage points ({edge_badge})")
        out.append(f"- **Expected Value (EV)**: {ev:+.3f} per unit staked")

        # Warnings & Negative Checks
        out.append("\n### Warnings & Negative Checks")
        for w in res["warnings"]:
            out.append(f"- **`{w['type']}`** [{w['severity']}] ({w['direction']} / {w['market_relevance']}): {w['description']}")
            out.append(f"  - *Evidence*: {w['evidence']}")

        # Verdict
        verdict = res["verdict"]
        comment = res["comment"]
        out.append(f"\n### Final Decision Verdict: **{verdict}**")
        out.append(f"> {comment}\n")
        out.append("---\n")

        warn_str = ", ".join(f"`{w['type']}`" for w in res["warnings"]) if res["warnings"] else "_None_"
        summary_rows.append({
            "match": f"**{home} vs {away}**",
            "market": f"Over 1.5 @ {odds:.2f}",
            "prob": f"**{p_prob:.1f}%**",
            "hist": f"{hist_prob:.1f}%",
            "align": f"{align_delta:.1f} pp (`{align_rem}`)",
            "edge": f"{edge:+.1f} (`{edge_rem}`)",
            "ev": f"{ev:+.3f}",
            "verdict": f"**{verdict}**",
            "warnings": warn_str
        })

    # Summary table
    out.append("## Summary Decision Table (Dual-Baseline Overview)\n")
    out.append("| Match | Market & Odds | Roy's Prob (Cur) | Hist. Prob | Alignment (Delta & Remark) | Edge (pp) & Remark | EV | Verdict | Warnings Summary |")
    out.append("| :--- | :--- | :---: | :---: | :---: | :---: | :---: | :---: | :--- |")
    for r in summary_rows:
        out.append(f"| {r['match']} | {r['market']} | {r['prob']} | {r['hist']} | {r.get('align', '*N/A*')} | {r['edge']} | {r['ev']} | {r['verdict']} | {r['warnings']} |")

    return "\n".join(out)

if __name__ == "__main__":
    import argparse
    import json
    from calculate_model import generate_ticket_payload

    parser = argparse.ArgumentParser(description="Generate 2026-10-26 Match Evaluation Report & Ticket Payload")
    parser.add_argument("--output-ticket-json", type=str, help="Path to write evaluated TicketImportJSON")
    args = parser.parse_args()

    report_content = format_report()
    target_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'october', 'evaluation_2026-10-26.md'))
    with open(target_path, "w", encoding="utf-8") as f:
        f.write(report_content)
    print(f"Report written successfully to {target_path} ({len(report_content)} bytes)")

    if args.output_ticket_json:
        # Separate qualified SELECT matches as selections, and CAUTION / rejected as alternatives
        evaluated_all = []
        for item in FIXTURES_DATA:
            if not item.get("is_halted"):
                evaluated_all.append(evaluate_match(item))

        selections = [m for m in evaluated_all if m["verdict"] == "SELECT"]
        alternatives = [m for m in evaluated_all if m["verdict"] != "SELECT"]

        ticket_payload = generate_ticket_payload(
            ticket_number="S-22-v2.1",
            selections=selections,
            alternatives=alternatives,
            stake=100.0,
            ticket_date="2026-10-26",
            ticket_notes="Evaluated with Roy's Betting Engine v2.1 Dual-Baseline Protocol. Contains 3 SELECT picks and 11 alternatives with full parity & alignment tracking."
        )
        with open(args.output_ticket_json, "w", encoding="utf-8") as out_f:
            json.dump(ticket_payload, out_f, indent=2)
        print(f"Saved TicketImportJSON to {args.output_ticket_json}")
