import os
from typing import Dict, Any
from app.config import settings

class LLMService:
    @staticmethod
    def _generate_mock_response(command_used: str, user_query: str) -> str:
        """High-density mock response for local testing without API keys."""
        cmd = command_used.lower()
        if cmd == "/plan":
            return (
                f"### Architecture & Execution Blueprint: {user_query}\n\n"
                "**1. Tech Stack**\n"
                "- Frontend: React + Tailwind CSS (Vite)\n"
                "- Backend: FastAPI (Python)\n"
                "- DB: SQLite / PostgreSQL\n\n"
                "**2. File Structure**\n"
                "```text\n"
                "project/\n"
                "├── backend/ (main.py, models.py, services/)\n"
                "└── frontend/ (src/components/, src/services/)\n"
                "```\n\n"
                "**3. Step-by-Step Flow**\n"
                "1. Initialize DB schema and backend endpoints.\n"
                "2. Implement frontend UI components.\n"
                "3. Wire API integration and verify."
            )
        elif cmd == "/error":
            return (
                "### Root Cause\n"
                "Null reference error due to uninitialized property access before state hydration.\n\n"
                "### Fixed Code\n"
                "```javascript\n"
                "const data = response?.data ?? [];\n"
                "```\n\n"
                "### Prevention\n"
                "- Always use optional chaining (`?.`) or nullish coalescing (`??`) for transient state."
            )
        elif cmd == "/api":
            return (
                "```typescript\n"
                "export interface UserSession {\n"
                "  id: string;\n"
                "  email: string;\n"
                "  createdAt: string;\n"
                "}\n\n"
                "export interface CommandExecutionRequest {\n"
                "  command: string;\n"
                "  query: string;\n"
                "  maxTokens?: number;\n"
                "}\n"
                "```"
            )
        elif cmd == "/ui":
            return (
                "```jsx\n"
                "export default function ActionCard({ title, onClick }) {\n"
                "  return (\n"
                "    <button \n"
                "      onClick={onClick}\n"
                "      className=\"px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-medium transition-all shadow-md\"\n"
                "    >\n"
                "      {title}\n"
                "    </button>\n"
                "  );\n"
                "}\n"
                "```"
            )
        else:
            return (
                f"### Result for: {user_query}\n"
                "- Compact output generated without conversational fluff.\n"
                "- High-density efficiency achieved."
            )

    @classmethod
    def execute_prompt(
        cls,
        system_prompt: str,
        user_prompt: str,
        command_used: str,
        max_token_limit: int = 400,
        provider: str = None,
        override_api_key: str = None
    ) -> Dict[str, Any]:
        """
        Executes prompt through OpenAI, Anthropic, or Mock fallback.
        """
        active_provider = (provider or settings.LLM_PROVIDER).lower()
        api_key = override_api_key or (
            settings.OPENAI_API_KEY if active_provider == "openai" else settings.ANTHROPIC_API_KEY
        )

        # If no API key is set, use Mock mode seamlessly
        if not api_key:
            response_text = cls._generate_mock_response(command_used, user_prompt)
            return {
                "response": response_text,
                "provider": f"{active_provider}-mock",
                "raw_prompt_tokens": 0,
                "raw_completion_tokens": 0,
                "is_mock": True
            }

        try:
            if active_provider == "openai":
                from openai import OpenAI
                client = OpenAI(api_key=api_key)
                completion = client.chat.completions.create(
                    model=settings.DEFAULT_OPENAI_MODEL,
                    messages=[
                        {"role": "system", "content": system_prompt},
                        {"role": "user", "content": user_prompt}
                    ],
                    max_tokens=max_token_limit,
                    temperature=0.2
                )
                response_text = completion.choices[0].message.content or ""
                usage = completion.usage
                return {
                    "response": response_text,
                    "provider": "openai",
                    "raw_prompt_tokens": usage.prompt_tokens if usage else 0,
                    "raw_completion_tokens": usage.completion_tokens if usage else 0,
                    "is_mock": False
                }

            elif active_provider == "anthropic":
                from anthropic import Anthropic
                client = Anthropic(api_key=api_key)
                message = client.messages.create(
                    model=settings.DEFAULT_ANTHROPIC_MODEL,
                    max_tokens=max_token_limit,
                    system=system_prompt,
                    messages=[
                        {"role": "user", "content": user_prompt}
                    ],
                    temperature=0.2
                )
                response_text = message.content[0].text if message.content else ""
                return {
                    "response": response_text,
                    "provider": "anthropic",
                    "raw_prompt_tokens": getattr(message.usage, "input_tokens", 0),
                    "raw_completion_tokens": getattr(message.usage, "output_tokens", 0),
                    "is_mock": False
                }
            else:
                response_text = cls._generate_mock_response(command_used, user_prompt)
                return {
                    "response": response_text,
                    "provider": "mock",
                    "raw_prompt_tokens": 0,
                    "raw_completion_tokens": 0,
                    "is_mock": True
                }
        except Exception as e:
            # Graceful fallback to mock on API error / quota limit
            fallback_text = (
                f"*(API call note: {str(e)})*\n\n" + 
                cls._generate_mock_response(command_used, user_prompt)
            )
            return {
                "response": fallback_text,
                "provider": f"{active_provider}-fallback",
                "raw_prompt_tokens": 0,
                "raw_completion_tokens": 0,
                "is_mock": True,
                "error": str(e)
            }
