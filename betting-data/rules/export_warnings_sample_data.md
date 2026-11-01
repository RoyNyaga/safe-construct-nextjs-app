You are an expert sports betting methodology and risk analyst.
Evaluate the following pre-match warnings based on the final match outcomes and scores provided in the JSON payload below.

For each warning, determine:
1. "post_match_status":
   - "CONFIRMED": The documented risk materialized and noticeably influenced the market/selection outcome.
   - "NOT_CONFIRMED": The feared risk did not materialize and the match proceeded favorably unaffected.
   - "INCONCLUSIVE": Match events are ambiguous, contradictory, or insufficient data to definitively conclude.
   - "NOT_APPLICABLE": The match was postponed, voided, or the market was unaffected.
2. "evidence_assessment": "SUPPORTED" | "CONTRADICTED" | "PARTIAL" | "INCONCLUSIVE"
3. "confidence": "LOW" | "MEDIUM" | "HIGH"
4. "review_notes": 1-2 sentence concise diagnostic explanation of how the match unfolded relative to this warning.

CRITICAL INSTRUCTIONS:
- You MUST preserve each warning's exact "warning_id" (UUID from "warning_uuid").
- Output ONLY a single valid JSON object adhering strictly to this schema:
{
  "operation": "warning_post_match_update",
  "schema_version": "1.0",
  "updates": [
    {
      "warning_id": "<UUID from warning_uuid>",
      "post_match_status": "CONFIRMED",
      "evidence_assessment": "SUPPORTED",
      "confidence": "HIGH",
      "review_notes": "Diagnostic rationale..."
    }
  ]
}

DATA PAYLOAD:
{
  "export_type": "warning_post_match_evaluation_request",
  "ticket_uuid": "3a72d415-8f6a-49e2-b1d3-982fec349a11",
  "total_warnings": 3,
  "pending_warnings_count": 3,
  "generated_at": "2026-11-02T22:15:00.000Z",
  "warnings": [
    {
      "warning_uuid": "41c60205-0275-45d0-994d-7bc476717a60",
      "warning_type": "ONE_SIDED_SCORING_RISK",
      "severity": "LOW",
      "direction": "CONTRADICTORY",
      "market_relevance": "INDIRECT",
      "target_type": "selection",
      "ticket_number": "S-1-v3.0",
      "ticket_uuid": "3a72d415-8f6a-49e2-b1d3-982fec349a11",
      "match": {
        "home_team": "Olympique Lyonnais",
        "away_team": "Angers SCO",
        "country": "France",
        "league": "Ligue 1",
        "market": "Over/Under",
        "selection": "Over 2.5",
        "odds": 1.64,
        "estimated_probability": 0.626,
        "historical_estimated_probability": 0.618,
        "actual_home_score": 3,
        "actual_away_score": 0,
        "result": "won",
        "is_settled": true
      },
      "description": "Lyon holds the bulk of scoring expectation; Over 2.5 is more robust than BTTS Yes in case Angers fails to convert.",
      "pre_match_evidence": "Angers away goal average is 1.0/game with 2 scoreless away outings in recent weeks.",
      "pre_match_status": "PENDING",
      "current_post_match_status": "PENDING",
      "existing_review_notes": null
    },
    {
      "warning_uuid": "7cb4a810-e752-44f2-95e3-289b5c219a93",
      "warning_type": "DERBY_MATCH_VOLATILITY",
      "severity": "MEDIUM",
      "direction": "CONTRADICTORY",
      "market_relevance": "CONTEXTUAL",
      "target_type": "alternative",
      "ticket_number": "S-1-v3.0",
      "ticket_uuid": "3a72d415-8f6a-49e2-b1d3-982fec349a11",
      "match": {
        "home_team": "Athletic Bilbao",
        "away_team": "Real Sociedad",
        "country": "Spain",
        "league": "La Liga",
        "market": "Over/Under",
        "selection": "Under 3.5",
        "odds": 1.33,
        "estimated_probability": 0.778,
        "historical_estimated_probability": 0.771,
        "actual_home_score": 1,
        "actual_away_score": 1,
        "result": "won",
        "is_settled": true
      },
      "description": "High emotional intensity and tactical caution typical of Basque derbies.",
      "pre_match_evidence": "3 of last 4 head-to-head derbies stayed strictly under 2.5 total goals.",
      "pre_match_status": "PENDING",
      "current_post_match_status": "PENDING",
      "existing_review_notes": null
    },
    {
      "warning_uuid": "99e12f81-0182-4fa0-82a1-5912bb01c102",
      "warning_type": "CLEAN_SHEET_DOMINANCE",
      "severity": "HIGH",
      "direction": "CONTRADICTORY",
      "market_relevance": "DIRECT",
      "target_type": "alternative",
      "ticket_number": "S-1-v3.0",
      "ticket_uuid": "3a72d415-8f6a-49e2-b1d3-982fec349a11",
      "match": {
        "home_team": "Juventus",
        "away_team": "SSC Napoli",
        "country": "Italy",
        "league": "Serie A",
        "market": "Both Teams to Score",
        "selection": "BTTS Yes",
        "odds": 1.88,
        "estimated_probability": 0.485,
        "historical_estimated_probability": 0.492,
        "actual_home_score": 0,
        "actual_away_score": 0,
        "result": "lost",
        "is_settled": true
      },
      "description": "Both clubs possess top-tier defensive records conceding < 0.75 goals/game at venue.",
      "pre_match_evidence": "Juventus conceded only 4 goals at home in 8 matches; Napoli conceded 5 away.",
      "pre_match_status": "CONFIRMED",
      "current_post_match_status": "PENDING",
      "existing_review_notes": null
    }
  ]
}
