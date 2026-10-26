#!/usr/bin/env python3
"""
Roy Betting Engine — Over 1.5 Focus (Model Version 2.1)
Deterministic Statistical Engine & Poisson Value Calculator

Complies strictly with:
- betting-data/rules/model_2.1.md
- betting-data/rules/organization_rules.md
- src/types/betting.ts (TicketImportJSON & Warnings)
"""

import math
import json
import sys
import os
import argparse
from typing import Dict, List, Any, Optional, Tuple

MODEL_NAME = "roys_betting_engine_over_1_5_goals"
MODEL_VERSION = "2.1"
DEFAULT_MODEL_UUID = "fe3bdd50-fac0-45fe-8783-836f20868bdc"

# Default league scoring baselines if unspecified
DEFAULT_LEAGUE_HOME_GF = 1.50
DEFAULT_LEAGUE_AWAY_GF = 1.20


def lookup_historical_baseline(league_name: Optional[str]) -> Tuple[float, float]:
    """
    Look up competition baseline from betting-data/rules/league_baselines.json.
    Falls back to (1.45, 1.15) if not found.
    """
    if not league_name:
        return 1.45, 1.15

    norm = league_name.lower().replace(" ", "_").replace("-", "_").replace("—", "_")
    base_file = os.path.join(os.path.dirname(__file__), "..", "rules", "league_baselines.json")
    if os.path.exists(base_file):
        try:
            with open(base_file, "r") as f:
                data = json.load(f)
                comps = data.get("competitions", {})
                for key, val in comps.items():
                    if key in norm or norm in key or val.get("name", "").lower() in league_name.lower():
                        return float(val.get("historical_home_avg", 1.45)), float(val.get("historical_away_avg", 1.15))
        except Exception:
            pass

    return 1.45, 1.15


def get_confidence_label(prob: float) -> str:
    """
    Model 2.1 Section 14: Probability Confidence Labels
    """
    if prob >= 0.90:
        return "Extremely strong"
    elif prob >= 0.85:
        return "Very strong"
    elif prob >= 0.80:
        return "Strong"
    elif prob >= 0.75:
        return "Good"
    elif prob >= 0.70:
        return "Moderate"
    else:
        return "Weak for the Over 1.5-focused strategy"


def classify_alignment(delta_pp: float) -> str:
    """
    Model 2.1 Section 5.1A: 5-Tier Model Alignment Classification
    Delta is the absolute difference in percentage points between
    Primary live model and Historical benchmark: |P_primary - P_hist| * 100
    - very_high: Delta <= 1.5 pp
    - high:      1.6 <= Delta <= 3.0 pp
    - medium:    3.1 <= Delta <= 5.0 pp
    - low:       5.1 <= Delta <= 7.0 pp
    - very_low:  Delta > 7.0 pp
    """
    if delta_pp <= 1.5:
        return "very_high"
    elif delta_pp <= 3.0:
        return "high"
    elif delta_pp <= 5.0:
        return "medium"
    elif delta_pp <= 7.0:
        return "low"
    else:
        return "very_low"


def classify_edge(edge_pp: float) -> str:
    """
    Model 2.1 Section 15: 5-Tier Value Edge Classification
    Edge is the difference between estimated probability and break-even:
    (P_est - P_breakeven) * 100
    - very_high: Edge > 15.0 pp
    - high:      5.0 < Edge <= 15.0 pp
    - medium:    0.0 <= Edge <= 5.0 pp
    - low:       -10.0 <= Edge < 0.0 pp
    - very_low:  Edge < -10.0 pp
    """
    if edge_pp > 15.0:
        return "very_high"
    elif edge_pp > 5.0:
        return "high"
    elif edge_pp >= 0.0:
        return "medium"
    elif edge_pp >= -10.0:
        return "low"
    else:
        return "very_low"


def calculate_poisson_probabilities(lambda_home: float, lambda_away: float) -> Dict[str, float]:
    """
    Model 2.1 Section 6: Poisson Probability Calculation
    P(0 goals) = e^(-lambda_total)
    P(1 goal)  = lambda_total * e^(-lambda_total)
    P(Over 1.5) = 1 - e^(-lambda_total) * (1 + lambda_total)
    """
    lambda_total = lambda_home + lambda_away

    # Guard against invalid lambda
    if lambda_total <= 0:
        return {
            "lambda_home": 0.0,
            "lambda_away": 0.0,
            "lambda_total": 0.0,
            "p_0": 1.0,
            "p_1": 0.0,
            "p_over_1_5": 0.0,
            "p_under_1_5": 1.0,
            "p_over_2_5": 0.0,
            "p_under_2_5": 1.0,
            "p_over_3_5": 0.0,
            "p_under_3_5": 1.0,
            "p_btts_yes": 0.0,
            "p_btts_no": 1.0,
        }

    exp_neg_lambda = math.exp(-lambda_total)

    # Exact probabilities
    p_0 = exp_neg_lambda
    p_1 = lambda_total * exp_neg_lambda
    p_2 = (lambda_total ** 2 / 2.0) * exp_neg_lambda
    p_3 = (lambda_total ** 3 / 6.0) * exp_neg_lambda

    # Over / Under
    p_over_1_5 = 1.0 - (p_0 + p_1)
    p_under_1_5 = p_0 + p_1

    p_over_2_5 = 1.0 - (p_0 + p_1 + p_2)
    p_under_2_5 = p_0 + p_1 + p_2

    p_over_3_5 = 1.0 - (p_0 + p_1 + p_2 + p_3)
    p_under_3_5 = p_0 + p_1 + p_2 + p_3

    # BTTS
    p_home_scores = 1.0 - math.exp(-lambda_home) if lambda_home > 0 else 0.0
    p_away_scores = 1.0 - math.exp(-lambda_away) if lambda_away > 0 else 0.0
    p_btts_yes = p_home_scores * p_away_scores
    p_btts_no = 1.0 - p_btts_yes

    return {
        "lambda_home": round(lambda_home, 4),
        "lambda_away": round(lambda_away, 4),
        "lambda_total": round(lambda_total, 4),
        "p_0": round(p_0, 4),
        "p_1": round(p_1, 4),
        "p_over_1_5": round(p_over_1_5, 4),
        "p_under_1_5": round(p_under_1_5, 4),
        "p_over_2_5": round(p_over_2_5, 4),
        "p_under_2_5": round(p_under_2_5, 4),
        "p_over_3_5": round(p_over_3_5, 4),
        "p_under_3_5": round(p_under_3_5, 4),
        "p_btts_yes": round(p_btts_yes, 4),
        "p_btts_no": round(p_btts_no, 4),
    }


def calculate_market_value(prob: float, odds: float) -> Dict[str, float]:
    """
    Model 2.1 Section 15: Bookmaker Odds and Market Value
    - Break-even probability = 1 / Decimal odds
    - Probability edge (pp) = (Model probability - Break-even probability) * 100
    - Expected value per unit staked = (Model probability * Decimal odds) - 1
    """
    if odds <= 1.0:
        return {
            "odds": odds,
            "breakeven_probability": 1.0,
            "edge_percentage_points": 0.0,
            "expected_value": -1.0,
        }

    be_prob = 1.0 / odds
    edge_pp = (prob - be_prob) * 100.0
    ev = (prob * odds) - 1.0

    return {
        "odds": round(odds, 2),
        "breakeven_probability": round(be_prob, 3),
        "edge_percentage_points": round(edge_pp, 1),
        "expected_value": round(ev, 3),
    }


def calculate_expected_goals(
    home_gf_per_game: float,
    away_ga_per_game: float,
    away_gf_per_game: float,
    home_ga_per_game: float,
    league_home_avg: float = DEFAULT_LEAGUE_HOME_GF,
    league_away_avg: float = DEFAULT_LEAGUE_AWAY_GF,
) -> Tuple[float, float, float, Dict[str, float]]:
    """
    Model 2.1 Section 5: Expected Goals Calculation Method
    - Home attacking strength = Home GF / League home avg
    - Away defensive weakness = Away GA / League home avg
    - lambda_home_base = League home avg * Home atk str * Away def weak
                       = (Home GF * Away GA) / League home avg
    - Away attacking strength = Away GF / League away avg
    - Home defensive weakness = Home GA / League away avg
    - lambda_away_base = League away avg * Away atk str * Home def weak
                       = (Away GF * Home GA) / League away avg
    """
    if league_home_avg <= 0:
        league_home_avg = DEFAULT_LEAGUE_HOME_GF
    if league_away_avg <= 0:
        league_away_avg = DEFAULT_LEAGUE_AWAY_GF

    home_atk_str = home_gf_per_game / league_home_avg
    away_def_weak = away_ga_per_game / league_home_avg
    lambda_home_base = (home_gf_per_game * away_ga_per_game) / league_home_avg

    away_atk_str = away_gf_per_game / league_away_avg
    home_def_weak = home_ga_per_game / league_away_avg
    lambda_away_base = (away_gf_per_game * home_ga_per_game) / league_away_avg

    lambda_total_base = lambda_home_base + lambda_away_base

    ratios = {
        "home_attacking_strength": round(home_atk_str, 2),
        "away_defensive_weakness": round(away_def_weak, 2),
        "away_attacking_strength": round(away_atk_str, 2),
        "home_defensive_weakness": round(home_def_weak, 2),
        "league_home_scoring_avg": round(league_home_avg, 2),
        "league_away_scoring_avg": round(league_away_avg, 2),
    }

    return lambda_home_base, lambda_away_base, lambda_total_base, ratios


def detect_standard_warnings(
    home_team: str,
    away_team: str,
    home_matches_played: int,
    away_matches_played: int,
    home_gf_per_game: float,
    away_gf_per_game: float,
    home_ga_per_game: float,
    away_ga_per_game: float,
    h2h_notes: Optional[str] = None,
    team_news_verified: bool = False,
    extra_warnings: Optional[List[Dict[str, Any]]] = None,
) -> List[Dict[str, Any]]:
    """
    Model 2.1 Section 16 & 16A: Automated Standardized Warnings Detection
    Adheres strictly to the Decoupling Principle:
    Warnings operate as an evidence layer and verdict filter,
    and DO NOT modify the numerical Poisson probability.
    """
    warnings: List[Dict[str, Any]] = []

    # 1. Sample Size Check
    min_matches = min(home_matches_played, away_matches_played)
    if min_matches <= 2:
        warnings.append({
            "type": "SMALL_SAMPLE",
            "severity": "CRITICAL",
            "market_relevance": "DIRECT",
            "direction": "CONTRADICTORY",
            "description": f"Extreme small-sample distortion: only {min_matches} matches played by one or both teams.",
            "evidence": f"{home_team} played {home_matches_played} matches; {away_team} played {away_matches_played} matches.",
            "verified": True,
            "numerical_adjustment": False,
            "pre_match_status": "PENDING",
            "post_match_status": "PENDING",
            "review_notes": None,
        })
    elif min_matches < 5:
        warnings.append({
            "type": "SMALL_SAMPLE",
            "severity": "MEDIUM",
            "market_relevance": "INDIRECT",
            "direction": "CONTRADICTORY",
            "description": f"Limited sample size of only {min_matches} matches.",
            "evidence": f"Sample size below the 5-match threshold for statistical stability ({home_matches_played} vs {away_matches_played}).",
            "verified": True,
            "numerical_adjustment": False,
            "pre_match_status": "PENDING",
            "post_match_status": "PENDING",
            "review_notes": None,
        })

    # 2. Low Away Scoring Check
    if away_gf_per_game < 0.85:
        warnings.append({
            "type": "LOW_AWAY_SCORING",
            "severity": "HIGH" if away_gf_per_game < 0.50 else "MEDIUM",
            "market_relevance": "DIRECT",
            "direction": "CONTRADICTORY",
            "description": f"{away_team} averages only {away_gf_per_game:.2f} goals per game, increasing shutout risk.",
            "evidence": f"{away_team} away scoring average is {away_gf_per_game:.2f} GF/game, placing heavy reliance on {home_team} to produce goals.",
            "verified": True,
            "numerical_adjustment": False,
            "pre_match_status": "PENDING",
            "post_match_status": "PENDING",
            "review_notes": None,
        })

    # 3. Low Home Scoring Check
    if home_gf_per_game < 1.0:
        warnings.append({
            "type": "LOW_HOME_SCORING",
            "severity": "HIGH" if home_gf_per_game < 0.60 else "MEDIUM",
            "market_relevance": "DIRECT",
            "direction": "CONTRADICTORY",
            "description": f"{home_team} home scoring rate is low ({home_gf_per_game:.2f} GF/game).",
            "evidence": f"{home_team} averages under 1.0 goal scored per match across the observed fixtures.",
            "verified": True,
            "numerical_adjustment": False,
            "pre_match_status": "PENDING",
            "post_match_status": "PENDING",
            "review_notes": None,
        })

    # 4. Strong Defensive Matchup Check
    if home_ga_per_game <= 0.85 and away_ga_per_game <= 0.85:
        warnings.append({
            "type": "STRONG_DEFENSIVE_MATCHUP",
            "severity": "HIGH",
            "market_relevance": "DIRECT",
            "direction": "CONTRADICTORY",
            "description": "Both teams maintain exceptionally tight defensive records.",
            "evidence": f"{home_team} concedes {home_ga_per_game:.2f} GA/game and {away_team} concedes {away_ga_per_game:.2f} GA/game, elevating 0-0 and 1-0 probability.",
            "verified": True,
            "numerical_adjustment": False,
            "pre_match_status": "PENDING",
            "post_match_status": "PENDING",
            "review_notes": None,
        })

    # 5. H2H Check if notes provide evidence
    if h2h_notes and any(term in h2h_notes.lower() for term in ["low-scoring", "0-0", "1-0", "tight", "tactical"]):
        warnings.append({
            "type": "H2H_LOW_GOALS",
            "severity": "MEDIUM",
            "market_relevance": "DIRECT",
            "direction": "CONTRADICTORY",
            "description": "Historical head-to-head fixtures show a recurring low-goal pattern.",
            "evidence": h2h_notes,
            "verified": True,
            "numerical_adjustment": False,
            "pre_match_status": "PENDING",
            "post_match_status": "PENDING",
            "review_notes": None,
        })

    # 6. Team News Check
    if not team_news_verified:
        warnings.append({
            "type": "TEAM_NEWS_UNVERIFIED",
            "severity": "LOW",
            "market_relevance": "CONTEXTUAL",
            "direction": "NEUTRAL",
            "description": "Pre-match team news and confirmed starting lineups remain unverified.",
            "evidence": "Lineups have not been locked in; rotation or late injury risk unconfirmed.",
            "verified": False,
            "numerical_adjustment": False,
            "pre_match_status": "PENDING",
            "post_match_status": "PENDING",
            "review_notes": None,
        })

    # 7. Append any extra contextual warnings passed from user analysis
    if extra_warnings:
        for ew in extra_warnings:
            warnings.append({
                "type": ew.get("type", "DATA_CONFLICT"),
                "severity": ew.get("severity", "MEDIUM"),
                "market_relevance": ew.get("market_relevance", "DIRECT"),
                "direction": ew.get("direction", "CONTRADICTORY"),
                "description": ew.get("description", ""),
                "evidence": ew.get("evidence", ""),
                "verified": ew.get("verified", True),
                "numerical_adjustment": False,
                "pre_match_status": "PENDING",
                "post_match_status": "PENDING",
                "review_notes": None,
            })

    return warnings


def determine_verdict(
    prob: float,
    edge_pp: float,
    ev: float,
    warnings: List[Dict[str, Any]],
    min_matches: int,
) -> Tuple[str, str]:
    """
    Model 2.1 Section 17: Final Decision Rule
    SELECT / CAUTION / NO BET
    """
    critical_warnings = [w for w in warnings if w.get("severity") == "CRITICAL"]
    high_contradictory = [
        w for w in warnings
        if w.get("severity") == "HIGH" and w.get("direction") == "CONTRADICTORY"
    ]
    medium_warnings = [w for w in warnings if w.get("severity") == "MEDIUM"]

    # Disqualifying conditions -> NO BET
    if critical_warnings or min_matches <= 2:
        return "NO BET", "Extreme small-sample distortion or critical unresolved risk renders the statistical signal uncalibrated."

    if prob < 0.70:
        return "NO BET", f"Estimated Over 1.5 probability ({prob*100:.1f}%) is well below the 70% threshold for the Over 1.5 strategy."

    if ev < -0.10 or edge_pp < -10.0:
        return "NO BET", f"Significant negative expected value ({ev:+.3f}) and pricing mismatch ({edge_pp:+.1f}pp edge) violate Principle 8."

    # Caution conditions
    if high_contradictory:
        return "CAUTION", f"Model probability ({prob*100:.1f}%) is viable, but high contradictory warning ({high_contradictory[0]['type']}) requires caution."

    if len(medium_warnings) >= 2:
        return "CAUTION", f"Multiple medium warnings ({', '.join(w['type'] for w in medium_warnings)}) warrant measured caution."

    if edge_pp < 0:
        return "CAUTION", f"High probability ({prob*100:.1f}%), but pricing offers no positive edge ({edge_pp:+.1f}pp). Disclosed under Principle 9."

    # Strong selections -> SELECT
    if prob >= 0.80 and edge_pp >= 0:
        return "SELECT", f"Strong probability ({prob*100:.1f}%) supported by positive edge (+{edge_pp:.1f}pp, EV {ev:+.3f}) and acceptable risk profile."

    return "CAUTION", f"Viable probability ({prob*100:.1f}%), but edge is modest (+{edge_pp:.1f}pp) and requires risk awareness."


def evaluate_match(fixture: Dict[str, Any]) -> Dict[str, Any]:
    """
    Main evaluation pipeline for a single fixture according to Model 2.1.
    """
    home_team = fixture["home_team"]
    away_team = fixture["away_team"]
    odds = float(fixture.get("odds", 1.20))
    country = fixture.get("country", "Unknown")
    league = fixture.get("league", "League")
    match_date = fixture.get("match_date", "2026-10-25")
    market = fixture.get("market", "Over/Under")
    selection_type = fixture.get("selection", "Over 1.5")

    # Match counts (Overall)
    home_matches = int(fixture.get("home_matches_played", 10))
    away_matches = int(fixture.get("away_matches_played", 10))
    min_matches = min(home_matches, away_matches)

    # Goals (Overall)
    home_gf = float(fixture.get("home_goals_scored", 15))
    home_ga = float(fixture.get("home_goals_conceded", 12))
    away_gf = float(fixture.get("away_goals_scored", 14))
    away_ga = float(fixture.get("away_goals_conceded", 13))

    # Overall Averages (Contextual)
    overall_home_gf_per_game = round(home_gf / home_matches, 2) if home_matches > 0 else 1.5
    overall_home_ga_per_game = round(home_ga / home_matches, 2) if home_matches > 0 else 1.2
    overall_away_gf_per_game = round(away_gf / away_matches, 2) if away_matches > 0 else 1.2
    overall_away_ga_per_game = round(away_ga / away_matches, 2) if away_matches > 0 else 1.5

    # Venue-Specific Stats (Strict Requirement under Model 2.1 Section 5.0)
    has_venue_stats = (
        "home_venue_matches" in fixture and
        "home_venue_goals_scored" in fixture and
        "home_venue_goals_conceded" in fixture and
        "away_venue_matches" in fixture and
        "away_venue_goals_scored" in fixture and
        "away_venue_goals_conceded" in fixture
    )

    # HARD STOP RULE: Do not proceed if venue stats are missing
    if not has_venue_stats:
        missing_fields = [
            k for k in [
                "home_venue_matches", "home_venue_goals_scored", "home_venue_goals_conceded",
                "away_venue_matches", "away_venue_goals_scored", "away_venue_goals_conceded"
            ] if k not in fixture
        ]
        return {
            "match_date": match_date,
            "country": country,
            "league": league,
            "home_team": home_team,
            "away_team": away_team,
            "home_league_position": fixture.get("home_league_position"),
            "away_league_position": fixture.get("away_league_position"),
            "home_matches_played": home_matches,
            "away_matches_played": away_matches,
            "home_goals_scored": int(home_gf),
            "home_goals_conceded": int(home_ga),
            "away_goals_scored": int(away_gf),
            "away_goals_conceded": int(away_ga),
            "home_goals_per_game": overall_home_gf_per_game,
            "home_conceded_per_game": overall_home_ga_per_game,
            "away_goals_per_game": overall_away_gf_per_game,
            "away_conceded_per_game": overall_away_ga_per_game,
            "market": market,
            "selection": selection_type,
            "odds": odds,
            "lambda_home": None,
            "lambda_away": None,
            "lambda_total": None,
            "estimated_probability": None,
            "confidence_label": "Calculation Halted (Missing Venue Data)",
            "breakeven_probability": None,
            "edge_percentage_points": None,
            "expected_value": None,
            "actual_home_score": None,
            "actual_away_score": None,
            "result": "pending",
            "verdict": "INSUFFICIENT DATA",
            "comment": f"INSUFFICIENT DATA. Calculation halted for {home_team} vs {away_team}: Missing venue-specific statistics ({', '.join(missing_fields)}). Under Model 2.1 Section 5.0 Hard-Stop Rule, full-season aggregates cannot be substituted for lambda.",
            "notes": f"Missing venue-specific home/away stats. Calculation halted per Model 2.1 Section 5.0.",
            "ratios": {},
            "data_quality": "INSUFFICIENT DATA",
            "warnings": [
                {
                    "type": "MISSING_HOME_AWAY_DATA",
                    "severity": "CRITICAL",
                    "market_relevance": "DIRECT",
                    "direction": "CONTRADICTORY",
                    "description": f"Mandatory venue-specific statistics missing for {home_team} vs {away_team}.",
                    "evidence": f"Unverified fields: {', '.join(missing_fields)}. Overall season statistics cannot be used to calculate lambda.",
                    "verified": False,
                    "numerical_adjustment": False,
                    "pre_match_status": "PENDING",
                    "post_match_status": "PENDING",
                    "review_notes": None,
                }
            ],
        }

    # Venue stats confirmed -> proceed with calculation
    home_v_m = int(fixture["home_venue_matches"])
    home_v_gf = float(fixture["home_venue_goals_scored"])
    home_v_ga = float(fixture["home_venue_goals_conceded"])
    away_v_m = int(fixture["away_venue_matches"])
    away_v_gf = float(fixture["away_venue_goals_scored"])
    away_v_ga = float(fixture["away_venue_goals_conceded"])

    home_gf_per_game = round(home_v_gf / home_v_m, 2) if home_v_m > 0 else overall_home_gf_per_game
    home_ga_per_game = round(home_v_ga / home_v_m, 2) if home_v_m > 0 else overall_home_ga_per_game
    away_gf_per_game = round(away_v_gf / away_v_m, 2) if away_v_m > 0 else overall_away_gf_per_game
    away_ga_per_game = round(away_v_ga / away_v_m, 2) if away_v_m > 0 else overall_away_ga_per_game
    calc_min_matches = min(home_v_m, away_v_m)
    data_quality = "Verified"

    # League Baselines - Primary (Current-Season)
    league_home_avg = float(fixture.get("current_league_home_avg", fixture.get("league_home_scoring_avg", fixture.get("league_home_avg", DEFAULT_LEAGUE_HOME_GF))))
    league_away_avg = float(fixture.get("current_league_away_avg", fixture.get("league_away_scoring_avg", fixture.get("league_away_avg", DEFAULT_LEAGUE_AWAY_GF))))

    # 1. Expected Goals - Primary (Section 5)
    lambda_home, lambda_away, lambda_total, ratios = calculate_expected_goals(
        home_gf_per_game=home_gf_per_game,
        away_ga_per_game=away_ga_per_game,
        away_gf_per_game=away_gf_per_game,
        home_ga_per_game=home_ga_per_game,
        league_home_avg=league_home_avg,
        league_away_avg=league_away_avg,
    )

    # 1b. Expected Goals - Benchmark (Historical Competition Baselines)
    hist_home_avg = float(fixture.get("historical_league_home_avg", 0.0))
    hist_away_avg = float(fixture.get("historical_league_away_avg", 0.0))
    if hist_home_avg <= 0 or hist_away_avg <= 0:
        h_h, h_a = lookup_historical_baseline(league)
        if hist_home_avg <= 0:
            hist_home_avg = h_h
        if hist_away_avg <= 0:
            hist_away_avg = h_a

    hist_lambda_home, hist_lambda_away, hist_lambda_total, _ = calculate_expected_goals(
        home_gf_per_game=home_gf_per_game,
        away_ga_per_game=away_ga_per_game,
        away_gf_per_game=away_gf_per_game,
        home_ga_per_game=home_ga_per_game,
        league_home_avg=hist_home_avg,
        league_away_avg=hist_away_avg,
    )
    hist_poisson = calculate_poisson_probabilities(hist_lambda_home, hist_lambda_away)
    hist_target_prob = hist_poisson["p_over_1_5"]
    if selection_type == "Over 2.5":
        hist_target_prob = hist_poisson["p_over_2_5"]
    elif selection_type == "Under 2.5":
        hist_target_prob = hist_poisson["p_under_2_5"]
    elif selection_type == "Under 3.5":
        hist_target_prob = hist_poisson["p_under_3_5"]

    # 2. Poisson Probabilities (Section 6)
    poisson = calculate_poisson_probabilities(lambda_home, lambda_away)

    # 3. Market Selection Target Probability
    target_prob = poisson["p_over_1_5"]
    if selection_type == "Over 2.5":
        target_prob = poisson["p_over_2_5"]
    elif selection_type == "Under 2.5":
        target_prob = poisson["p_under_2_5"]
    elif selection_type == "Under 3.5":
        target_prob = poisson["p_under_3_5"]

    # 4. Market Value (Section 15)
    market_val = calculate_market_value(target_prob, odds)

    # 5. Warnings Detection (Section 16)
    h2h_notes = fixture.get("h2h_notes")
    team_news_verified = fixture.get("team_news_verified", False)
    extra_warnings = fixture.get("extra_warnings", [])

    warnings = detect_standard_warnings(
        home_team=home_team,
        away_team=away_team,
        home_matches_played=home_v_m,
        away_matches_played=away_v_m,
        home_gf_per_game=home_gf_per_game,
        away_gf_per_game=away_gf_per_game,
        home_ga_per_game=home_ga_per_game,
        away_ga_per_game=away_ga_per_game,
        h2h_notes=h2h_notes,
        team_news_verified=team_news_verified,
        extra_warnings=extra_warnings,
    )

    # 6. Final Verdict (Section 17)
    verdict, verdict_reason = determine_verdict(
        prob=target_prob,
        edge_pp=market_val["edge_percentage_points"],
        ev=market_val["expected_value"],
        warnings=warnings,
        min_matches=calc_min_matches,
    )

    # Human-readable commentary & notes
    comment = f"{verdict}. Model estimates an {target_prob*100:.1f}% {selection_type} probability versus bookmaker break-even of {market_val['breakeven_probability']*100:.1f}% at {odds} odds ({market_val['edge_percentage_points']:+.1f} edge, {market_val['expected_value']:+.3f} EV). {verdict_reason}"

    notes_parts = []
    if min_matches < 5:
        notes_parts.append(f"Small sample of {min_matches} matches")
    if away_gf_per_game < 0.85:
        notes_parts.append(f"{away_team} low away scoring rate ({away_gf_per_game:.2f} GF/G)")
    if h2h_notes:
        notes_parts.append(f"H2H context: {h2h_notes}")
    if not team_news_verified:
        notes_parts.append("Injuries/team news not verified")

    notes = "; ".join(notes_parts) if notes_parts else "Statistically stable sample with consistent goal output across leagues."

    # 7. Alignment & Edge Categorization (Model 2.1 Section 5.1A & 15)
    align_delta_pp = round(abs(target_prob - hist_target_prob) * 100.0, 2)
    align_rem = classify_alignment(align_delta_pp)
    edge_rem = classify_edge(market_val["edge_percentage_points"])

    return {
        "match_date": match_date,
        "country": country,
        "league": league,
        "home_team": home_team,
        "away_team": away_team,
        "home_league_position": fixture.get("home_league_position"),
        "away_league_position": fixture.get("away_league_position"),
        "home_matches_played": home_matches,
        "away_matches_played": away_matches,
        "home_goals_scored": int(home_gf),
        "home_goals_conceded": int(home_ga),
        "away_goals_scored": int(away_gf),
        "away_goals_conceded": int(away_ga),
        "home_goals_per_game": home_gf_per_game,
        "home_conceded_per_game": home_ga_per_game,
        "away_goals_per_game": away_gf_per_game,
        "away_conceded_per_game": away_ga_per_game,
        "market": market,
        "selection": selection_type,
        "odds": odds,
        "current_league_home_avg": league_home_avg,
        "current_league_away_avg": league_away_avg,
        "historical_league_home_avg": hist_home_avg,
        "historical_league_away_avg": hist_away_avg,
        "historical_estimated_probability": hist_target_prob,
        "alignment_delta_pp": align_delta_pp,
        "alignment_remark": align_rem,
        "edge_remark": edge_rem,
        "lambda_home": poisson["lambda_home"],
        "lambda_away": poisson["lambda_away"],
        "lambda_total": poisson["lambda_total"],
        "historical_lambda_total": hist_poisson["lambda_total"],
        "estimated_probability": target_prob,
        "confidence_label": get_confidence_label(target_prob),
        "breakeven_probability": market_val["breakeven_probability"],
        "edge_percentage_points": market_val["edge_percentage_points"],
        "expected_value": market_val["expected_value"],
        "actual_home_score": None,
        "actual_away_score": None,
        "result": "pending",
        "verdict": verdict,
        "comment": comment,
        "notes": notes,
        "ratios": ratios,
        "warnings": warnings,
    }


def generate_ticket_payload(
    ticket_number: str,
    selections: List[Dict[str, Any]],
    alternatives: Optional[List[Dict[str, Any]]] = None,
    stake: float = 100.0,
    ticket_date: str = "2026-10-25",
    ticket_notes: Optional[str] = None,
) -> Dict[str, Any]:
    """
    Builds the TicketImportJSON structure adhering strictly to src/types/betting.ts
    """
    if alternatives is None:
        alternatives = []

    # Combined odds and aggregate estimated probability: Prod(P_i)
    combined_odds = 1.0
    agg_prob = 1.0
    for s in selections:
        combined_odds *= float(s.get("odds", 1.0))
        agg_prob *= float(s.get("estimated_probability", 0.85))

    combined_odds = round(combined_odds, 2)
    agg_prob = round(agg_prob, 3)

    if not ticket_notes:
        ticket_notes = (
            f"{len(selections)}-leg ticket evaluated with Roy's Betting Engine Over 1.5 Focus v2.1. "
            f"Combined odds: {combined_odds}; aggregate estimated probability: {agg_prob} vs "
            f"break-even probability: {round(1.0/combined_odds, 3) if combined_odds > 0 else 0}."
        )

    # Format selections for app import
    def clean_selection(item: Dict[str, Any]) -> Dict[str, Any]:
        return {
            "match_date": item.get("match_date"),
            "country": item.get("country"),
            "league": item.get("league"),
            "home_team": item.get("home_team"),
            "away_team": item.get("away_team"),
            "home_league_position": item.get("home_league_position"),
            "away_league_position": item.get("away_league_position"),
            "home_matches_played": item.get("home_matches_played"),
            "away_matches_played": item.get("away_matches_played"),
            "home_goals_scored": item.get("home_goals_scored"),
            "home_goals_conceded": item.get("home_goals_conceded"),
            "away_goals_scored": item.get("away_goals_scored"),
            "away_goals_conceded": item.get("away_goals_conceded"),
            "home_goals_per_game": item.get("home_goals_per_game"),
            "home_conceded_per_game": item.get("home_conceded_per_game"),
            "away_goals_per_game": item.get("away_goals_per_game"),
            "away_conceded_per_game": item.get("away_conceded_per_game"),
            "market": item.get("market", "Over/Under"),
            "selection": item.get("selection", "Over 1.5"),
            "odds": item.get("odds"),
            "estimated_probability": item.get("estimated_probability"),
            "breakeven_probability": item.get("breakeven_probability"),
            "edge_percentage_points": item.get("edge_percentage_points"),
            "expected_value": item.get("expected_value"),
            "current_league_home_avg": item.get("current_league_home_avg"),
            "current_league_away_avg": item.get("current_league_away_avg"),
            "historical_league_home_avg": item.get("historical_league_home_avg"),
            "historical_league_away_avg": item.get("historical_league_away_avg"),
            "historical_estimated_probability": item.get("historical_estimated_probability"),
            "alignment_delta_pp": item.get("alignment_delta_pp"),
            "alignment_remark": item.get("alignment_remark"),
            "edge_remark": item.get("edge_remark"),
            "actual_home_score": None,
            "actual_away_score": None,
            "result": "pending",
            "comment": item.get("comment"),
            "notes": item.get("notes"),
            "warnings": [
                {
                    "type": w["type"],
                    "severity": w.get("severity", "MEDIUM"),
                    "market_relevance": w.get("market_relevance", "DIRECT"),
                    "direction": w.get("direction", "CONTRADICTORY"),
                    "description": w.get("description", ""),
                    "evidence": w.get("evidence", ""),
                }
                for w in item.get("warnings", [])
            ],
        }

    return {
        "ticket": {
            "ticket_number": ticket_number,
            "date": ticket_date,
            "model_version": MODEL_VERSION,
            "model_uuid": DEFAULT_MODEL_UUID,
            "model_name": MODEL_NAME,
            "stake": stake,
            "combined_odds": combined_odds,
            "estimated_ticket_probability": agg_prob,
            "status": "pending",
            "actual_result": None,
            "profit_loss": 0,
            "notes": ticket_notes,
        },
        "selections": [clean_selection(s) for s in selections],
        "alternatives": [clean_selection(a) for a in alternatives],
    }


def format_markdown_summary_table(evaluated_fixtures: List[Dict[str, Any]]) -> str:
    """
    Renders the clean markdown summary comparison table with companion Historical Prob,
    Alignment Delta & Remark, and Value Edge & Remark columns.
    """
    lines = [
        "| Match | Market & Odds | Roy's Prob | Hist. Prob | Alignment (Delta & Remark) | Edge (pp) & Remark | EV | Verdict | Warnings Summary |",
        "| :--- | :--- | :---: | :---: | :---: | :---: | :---: | :---: | :--- |",
    ]

    for f in evaluated_fixtures:
        match_str = f"**{f['home_team']} vs {f['away_team']}**"
        market_str = f"{f['selection']} @ {f['odds']:.2f}"
        if f.get('estimated_probability') is not None:
            prob_str = f"**{f['estimated_probability']*100:.1f}%**"
            hist_str = f"{f['historical_estimated_probability']*100:.1f}%" if f.get('historical_estimated_probability') is not None else "—"
            delta_val = f.get('alignment_delta_pp')
            align_rem = f.get('alignment_remark')
            align_str = f"{delta_val:.1f} pp (`{align_rem}`)" if delta_val is not None else "—"
            edge_rem = f.get('edge_remark')
            edge_str = f"{f['edge_percentage_points']:+.1f} (`{edge_rem}`)" if edge_rem else f"{f['edge_percentage_points']:+.1f}"
            ev_str = f"{f['expected_value']:+.3f}"
        else:
            prob_str = "*Halted*"
            hist_str = "*N/A*"
            align_str = "*N/A*"
            edge_str = "*N/A*"
            ev_str = "*N/A*"
        verdict_str = f"**{f['verdict']}**"

        warn_list = [w['type'] for w in f.get('warnings', [])]
        warn_str = ", ".join(f"`{w}`" for w in warn_list) if warn_list else "_None_"

        lines.append(
            f"| {match_str} | {market_str} | {prob_str} | {hist_str} | {align_str} | {edge_str} | {ev_str} | {verdict_str} | {warn_str} |"
        )

    return "\n".join(lines)


# ─── SELF-TEST VERIFICATION ───────────────────────────────────────────────────

def run_self_tests():
    """
    Validates mathematical compliance against Model 2.1 specifications:
    - Section 5.0: Hard-Stop Rule halts calculation if venue splits are missing
    - Section 6: lambda=2.37 gives raw Over 1.5 prob ~= 68.5%
    - Section 15: break-even, edge, EV calculations
    - Clean Poisson sum formulation
    """
    # Test 1: Poisson formula with lambda = 2.37
    p = calculate_poisson_probabilities(1.20, 1.17)
    assert p["lambda_total"] == 2.37, f"Expected 2.37, got {p['lambda_total']}"
    assert abs(p["p_over_1_5"] - 0.685) < 0.001, f"Expected 0.685, got {p['p_over_1_5']}"

    # Test 2: Market value calculation with odds 1.17 and prob 0.865
    mv = calculate_market_value(0.865, 1.17)
    assert mv["breakeven_probability"] == 0.855, f"Expected 0.855, got {mv['breakeven_probability']}"
    assert mv["edge_percentage_points"] == 1.0, f"Expected 1.0, got {mv['edge_percentage_points']}"
    assert mv["expected_value"] == 0.012, f"Expected 0.012, got {mv['expected_value']}"

    # Test 3: Hard-stop check when venue splits are missing
    missing_venue_fixture = {
        "home_team": "Team A",
        "away_team": "Team B",
        "odds": 1.25,
        "home_matches_played": 10,
        "away_matches_played": 10,
    }
    halted_res = evaluate_match(missing_venue_fixture)
    assert halted_res["verdict"] == "INSUFFICIENT DATA", f"Expected INSUFFICIENT DATA, got {halted_res['verdict']}"
    assert halted_res["estimated_probability"] is None, "Expected probability to be None when halted"

    # Test 4: Fixture evaluation pipeline with verified venue stats
    test_fixture = {
        "home_team": "AD San Carlos",
        "away_team": "Deportivo Saprissa",
        "odds": 1.29,
        "country": "Costa Rica",
        "league": "Primera División",
        "home_matches_played": 12,
        "away_matches_played": 12,
        "home_venue_matches": 5,
        "home_venue_goals_scored": 5,
        "home_venue_goals_conceded": 4,
        "away_venue_matches": 6,
        "away_venue_goals_scored": 6,
        "away_venue_goals_conceded": 7,
        "league_home_scoring_avg": 1.46,
        "league_away_scoring_avg": 1.24,
    }
    res = evaluate_match(test_fixture)
    assert res["verdict"] == "NO BET"
    assert abs(res["estimated_probability"] - 0.424) < 0.005

    # Test 5: Dual-Baseline calculation & historical benchmark
    walsall_fixture = {
        "home_team": "Walsall",
        "away_team": "Salford City",
        "odds": 1.20,
        "country": "England",
        "league": "League Two",
        "home_matches_played": 11,
        "away_matches_played": 12,
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
    }
    walsall_res = evaluate_match(walsall_fixture)
    assert abs(walsall_res["estimated_probability"] - 0.677) < 0.005, f"Expected 0.677, got {walsall_res['estimated_probability']}"
    assert abs(walsall_res["historical_estimated_probability"] - 0.681) < 0.005, f"Expected 0.681, got {walsall_res['historical_estimated_probability']}"
    assert abs(walsall_res["alignment_delta_pp"] - 0.39) < 0.05, f"Expected ~0.39, got {walsall_res['alignment_delta_pp']}"
    assert walsall_res["alignment_remark"] == "very_high", f"Expected very_high, got {walsall_res['alignment_remark']}"
    assert walsall_res["edge_remark"] == "very_low", f"Expected very_low, got {walsall_res['edge_remark']}"

    # Test 6: Alignment and Edge classification tiers
    assert classify_alignment(0.4) == "very_high"
    assert classify_alignment(2.0) == "high"
    assert classify_alignment(4.0) == "medium"
    assert classify_alignment(6.0) == "low"
    assert classify_alignment(8.0) == "very_low"

    assert classify_edge(20.0) == "very_high"
    assert classify_edge(10.0) == "high"
    assert classify_edge(2.0) == "medium"
    assert classify_edge(-5.0) == "low"
    assert classify_edge(-15.0) == "very_low"

    print("✅ All Model 2.1 mathematical self-tests and Hard-Stop validations passed successfully!")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Roy Betting Engine Model 2.1 Calculation Script")
    parser.add_argument("--test", action="store_true", help="Run internal mathematical unit tests")
    parser.add_argument("--input", type=str, help="Path to JSON file containing list of fixtures to evaluate")
    parser.add_argument("--output-json", type=str, help="Path to output evaluated TicketImportJSON")
    parser.add_argument("--ticket-number", type=str, default="S-22-v2.1", help="Ticket number attribute")
    parser.add_argument("--stake", type=float, default=100.0, help="Stake in currency")

    args = parser.parse_args()

    if args.test:
        run_self_tests()
        sys.exit(0)

    if args.input:
        with open(args.input, "r", encoding="utf-8") as f:
            fixtures = json.load(f)

        evaluated = [evaluate_match(fx) for fx in fixtures]
        print(format_markdown_summary_table(evaluated))

        if args.output_json:
            ticket_payload = generate_ticket_payload(
                ticket_number=args.ticket_number,
                selections=evaluated,
                stake=args.stake,
            )
            with open(args.output_json, "w", encoding="utf-8") as out_f:
                json.dump(ticket_payload, out_f, indent=2)
            print(f"\nSaved TicketImportJSON to {args.output_json}")
    else:
        # Run self-test if called without arguments
        run_self_tests()
