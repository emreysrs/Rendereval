"""
Image Analysis Module for RENDEREVAL
OpenRouter vision model based render analysis.
"""

import base64
import json
import os
from typing import Any, Dict, List

import requests


class RenderAnalyzer:
    """OpenRouter-backed render image analyzer"""

    def __init__(self):
        self.openrouter_api_key = os.getenv("OPENROUTER_API_KEY", "")
        self.openrouter_base_url = os.getenv(
            "OPENROUTER_API_URL",
            "https://openrouter.ai/api/v1/chat/completions",
        )
        self.model_name = os.getenv("OPENROUTER_MODEL", "Nemotron Nano 12B 2 VL")
        self.site_url = os.getenv("OPENROUTER_SITE_URL", "http://localhost:5000")
        self.site_name = os.getenv("OPENROUTER_SITE_NAME", "RENDEREVAL")
        self.analysis_history = []

    def analyze_image(self, image_data: bytes, analysis_type: str = 'vfx') -> Dict[str, Any]:
        """Analyze image via OpenRouter vision model and normalize response."""
        try:
            if not self.openrouter_api_key:
                return {
                    "success": False,
                    "error": "OPENROUTER_API_KEY is not set",
                    "overall_score": 0,
                }

            ai_result = self._request_openrouter_analysis(image_data, analysis_type)
            overall_score = int(ai_result.get("overall_score", 0))
            result = {
                "success": True,
                "overall_score": overall_score,
                "status": ai_result.get("status", self._get_status(overall_score)),
                "analysis_type": analysis_type,
                "metrics": ai_result.get("metrics", {}),
                "details": ai_result.get("details", {}),
                "recommendations": ai_result.get("recommendations", []),
                "model": self.model_name,
            }

            self.analysis_history.append(result)
            print(f"[ANALYSIS] OpenRouter complete - Score: {overall_score}/100 - Status: {result['status']}")
            return result

        except Exception as e:
            print(f"[ERROR] Analysis failed: {str(e)}")
            return {'success': False, 'error': str(e), 'overall_score': 0}

    def _request_openrouter_analysis(self, image_data: bytes, analysis_type: str) -> Dict[str, Any]:
        """Send image to OpenRouter and parse model output as strict JSON."""
        image_b64 = base64.b64encode(image_data).decode("utf-8")
        mime_type = "image/jpeg"
        user_prompt = (
            f"Analyze this {analysis_type} render image.\n"
            "Return ONLY valid JSON with this schema:\n"
            "{"
            "\"overall_score\": <int 0-100>,"
            "\"status\": \"APPROVED\"|\"REVISION_REQUIRED\"|\"REJECTED\","
            "\"metrics\": {"
            "\"technical\": {\"resolution\": <int>, \"noise\": <int>, \"contrast\": <int>, \"sharpness\": <int>},"
            "\"color\": {\"grading\": <int>, \"balance\": <int>, \"saturation\": <int>},"
            "\"composition\": {\"composition\": <int>, \"balance\": <int>, \"focus\": <int>},"
            "\"artifacts\": {\"general\": <int>, \"banding\": <int>, \"compression\": <int>},"
            "\"advanced\": {\"dynamic_range\": <int>, \"lighting\": <int>, \"type_quality\": <int>}"
            "},"
            "\"details\": {\"analysis_notes\": <string>},"
            "\"recommendations\": [<string>, ...]"
            "}"
        )

        payload = {
            "model": self.model_name,
            "temperature": 0.1,
            "messages": [
                {
                    "role": "system",
                    "content": "You are a strict image quality reviewer. Return JSON only.",
                },
                {
                    "role": "user",
                    "content": [
                        {"type": "text", "text": user_prompt},
                        {"type": "image_url", "image_url": {"url": f"data:{mime_type};base64,{image_b64}"}},
                    ],
                },
            ],
        }
        headers = {
            "Authorization": f"Bearer {self.openrouter_api_key}",
            "Content-Type": "application/json",
            "HTTP-Referer": self.site_url,
            "X-Title": self.site_name,
        }

        response = requests.post(
            self.openrouter_base_url,
            json=payload,
            headers=headers,
            timeout=120,
        )
        response.raise_for_status()
        response_json = response.json()

        content = response_json["choices"][0]["message"]["content"]
        parsed = self._extract_json(content)
        return self._normalize_ai_result(parsed)

    def _extract_json(self, content: str) -> Dict[str, Any]:
        """Extract JSON object from model output."""
        content = content.strip()
        if content.startswith("```"):
            first_brace = content.find("{")
            last_brace = content.rfind("}")
            if first_brace != -1 and last_brace != -1:
                content = content[first_brace:last_brace + 1]
        return json.loads(content)

    def _normalize_ai_result(self, parsed: Dict[str, Any]) -> Dict[str, Any]:
        """Normalize nullable or missing model fields for API stability."""
        overall_score = int(parsed.get("overall_score", 0))
        status = parsed.get("status") or self._get_status(overall_score)
        metrics = parsed.get("metrics") or {}
        details = parsed.get("details") or {}
        recommendations = parsed.get("recommendations") or []
        if not isinstance(recommendations, list):
            recommendations = [str(recommendations)]

        return {
            "overall_score": max(0, min(100, overall_score)),
            "status": status,
            "metrics": metrics,
            "details": details,
            "recommendations": [str(item) for item in recommendations][:10],
        }

    def _get_status(self, score: int) -> str:
        """Get status"""
        if score >= 85:
            return 'APPROVED'
        elif score >= 70:
            return 'REVISION_REQUIRED'
        else:
            return 'REJECTED'
