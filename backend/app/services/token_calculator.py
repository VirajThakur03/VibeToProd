import math
from typing import Dict, Any

class TokenCalculator:
    """
    Calculates token counts for prompts and completions,
    and estimates token savings compared to standard conversational AI chatter.
    """
    
    @staticmethod
    def estimate_tokens(text: str) -> int:
        """
        Fast token estimator (4 characters ~= 1 token on average for standard English/code).
        """
        if not text:
            return 0
        words = len(text.split())
        chars = len(text)
        # Hybrid formula combining word count and char count for higher precision
        return max(1, math.ceil((words * 1.3 + chars / 4) / 2))

    @classmethod
    def calculate_metrics(
        self,
        wrapped_system_prompt: str,
        user_query: str,
        ai_response: str,
        raw_prompt_tokens: int = 0,
        raw_completion_tokens: int = 0
    ) -> Dict[str, int]:
        """
        Calculates prompt, completion, total, and estimated tokens saved.
        
        Standard Conversational AI baseline:
        - Includes verbose greetings, explanations, pleasantries, step-by-step preamble (~350-800 extra tokens).
        - Conversational responses usually average ~600-1200 tokens.
        - Hyper-efficient command blueprints compress outputs by ~60-75%.
        """
        prompt_tokens = raw_prompt_tokens if raw_prompt_tokens > 0 else self.estimate_tokens(wrapped_system_prompt + user_query)
        completion_tokens = raw_completion_tokens if raw_completion_tokens > 0 else self.estimate_tokens(ai_response)
        total_tokens = prompt_tokens + completion_tokens

        # Baseline calculation for un-wrapped conversational AI response to the same query
        # Typical conversational AI chatter adds ~250 tokens in intro/outro + ~1.8x verbose explanation text
        baseline_completion_tokens = math.ceil(completion_tokens * 2.2 + 250)
        baseline_prompt_tokens = math.ceil(prompt_tokens * 1.5 + 150) # Standard multi-turn verbose prompt context
        baseline_total_tokens = baseline_prompt_tokens + baseline_completion_tokens

        estimated_tokens_saved = max(0, baseline_total_tokens - total_tokens)

        return {
            "prompt_tokens": prompt_tokens,
            "completion_tokens": completion_tokens,
            "total_tokens": total_tokens,
            "baseline_total_tokens": baseline_total_tokens,
            "estimated_tokens_saved": estimated_tokens_saved
        }
