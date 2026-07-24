import os
import re
from typing import Tuple, Dict, Any, Optional
from app.database import get_command_by_name

BLUEPRINTS_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "blueprints")

def load_blueprint_file(command_name: str) -> Optional[str]:
    """Load blueprint markdown file from app/blueprints directory if present."""
    clean_name = command_name.lstrip("/").lower()
    file_path = os.path.join(BLUEPRINTS_DIR, f"{clean_name}.md")
    if os.path.exists(file_path):
        try:
            with open(file_path, "r", encoding="utf-8") as f:
                return f.read()
        except Exception as e:
            print(f"[Blueprint Error] Failed to read {file_path}: {e}")
    return None

class PromptWrapper:
    @staticmethod
    def parse_command(raw_input: str) -> Tuple[str, str]:
        """
        Parses raw user input into (command_name, query_text).
        e.g., "/plan build a coffee business website" -> ("/plan", "build a coffee business website")
        """
        trimmed = raw_input.strip()
        match = re.match(r"^(/[\w\-]+)\s*(.*)", trimmed, re.DOTALL)
        if match:
            cmd = match.group(1).lower()
            query = match.group(2).strip()
            return cmd, query
        return "/plan", trimmed  # Default to /plan if no slash provided

    @classmethod
    def wrap_prompt(cls, raw_input: str) -> Dict[str, Any]:
        """
        Wraps user input into the associated System Blueprint markdown file instructions.
        """
        command_name, query_text = cls.parse_command(raw_input)
        
        # 1. Authoritative check for standalone .md file (e.g. blueprints/plan.md, error.md, api.md, ui.md)
        blueprint_content = load_blueprint_file(command_name)
        
        # 2. Database lookup
        cmd_db = get_command_by_name(command_name)
        
        if blueprint_content:
            system_blueprint = blueprint_content
            max_token_limit = cmd_db.get("max_token_limit", 600) if cmd_db else 600
            description = cmd_db.get("description", f"Blueprint {command_name}") if cmd_db else f"Blueprint {command_name}"
        elif cmd_db:
            system_blueprint = cmd_db.get("system_blueprint", "")
            max_token_limit = cmd_db.get("max_token_limit", 400)
            description = cmd_db.get("description", "")
        else:
            description = f"Command {command_name}"
            max_token_limit = 400
            system_blueprint = (
                "You are an ultra-concise technical AI assistant. "
                "Provide ONLY direct code or high-density bullet points. "
                "Zero conversational intro, zero polite fluff, zero conclusion."
            )

        formatted_system_prompt = (
            f"{system_blueprint}\n\n"
            "[STRICT DIRECTIVE: Respond with MAX EFFICIENCY using the blueprint instructions above. "
            "Eliminate all pleasantries, greetings, introductory sentences, and concluding conversational chatter.]"
        )

        return {
            "command_used": command_name,
            "user_query": query_text if query_text else raw_input,
            "system_prompt": formatted_system_prompt,
            "user_prompt": query_text if query_text else raw_input,
            "max_token_limit": max_token_limit,
            "description": description
        }
