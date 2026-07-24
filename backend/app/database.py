import os
import sqlite3
from typing import Dict, Any, List, Optional
import uuid

DB_PATH = os.getenv("DATABASE_PATH", "prompt_app.db")

def get_db_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def init_db(schema_file_path: str = "schema.sql"):
    """Initialize SQLite database with schema DDL."""
    if not os.path.exists(schema_file_path):
        base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        schema_file_path = os.path.join(base_dir, "schema.sql")

    if os.path.exists(schema_file_path):
        with open(schema_file_path, "r", encoding="utf-8") as f:
            sql_script = f.read()
        conn = get_db_connection()
        conn.executescript(sql_script)
        conn.commit()
        conn.close()
        print(f"[DB] Initialized database successfully from {schema_file_path}")
    else:
        print(f"[DB Warning] Schema file not found at {schema_file_path}")

def get_all_commands() -> List[Dict[str, Any]]:
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT id, command_name, description, system_blueprint, max_token_limit FROM commands")
    rows = cursor.fetchall()
    conn.close()
    return [dict(row) for row in rows]

def get_command_by_name(command_name: str) -> Optional[Dict[str, Any]]:
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM commands WHERE command_name = ?", (command_name,))
    row = cursor.fetchone()
    conn.close()
    return dict(row) if row else None

def save_history_record(
    command_used: str,
    user_query: str,
    wrapped_prompt: str,
    ai_response: str,
    prompt_tokens: int,
    completion_tokens: int,
    total_tokens: int,
    estimated_tokens_saved: int,
    user_id: Optional[str] = None
) -> str:
    record_id = f"hist-{uuid.uuid4().hex[:12]}"
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("""
        INSERT INTO history (
            id, user_id, command_used, user_query, wrapped_prompt, ai_response,
            prompt_tokens, completion_tokens, total_tokens, estimated_tokens_saved
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, (
        record_id, user_id, command_used, user_query, wrapped_prompt, ai_response,
        prompt_tokens, completion_tokens, total_tokens, estimated_tokens_saved
    ))
    conn.commit()
    conn.close()
    return record_id

def get_history_records(limit: int = 50) -> List[Dict[str, Any]]:
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("""
        SELECT id, user_id, command_used, user_query, ai_response,
               prompt_tokens, completion_tokens, total_tokens, estimated_tokens_saved, created_at
        FROM history
        ORDER BY created_at DESC
        LIMIT ?
    """, (limit,))
    rows = cursor.fetchall()
    conn.close()
    return [dict(row) for row in rows]

def get_token_analytics() -> Dict[str, Any]:
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("""
        SELECT 
            COUNT(*) as total_requests,
            COALESCE(SUM(total_tokens), 0) as total_tokens_used,
            COALESCE(SUM(estimated_tokens_saved), 0) as total_tokens_saved,
            COALESCE(AVG(total_tokens), 0) as avg_tokens_per_request
        FROM history
    """)
    row = cursor.fetchone()
    conn.close()
    data = dict(row) if row else {}
    total_used = data.get("total_tokens_used", 0)
    total_saved = data.get("total_tokens_saved", 0)
    baseline_tokens = total_used + total_saved
    efficiency_percentage = round((total_saved / baseline_tokens * 100), 1) if baseline_tokens > 0 else 0.0
    data["efficiency_percentage"] = efficiency_percentage
    return data

# Document Store Search Functions
def search_documents(query: str = "", category: str = "All", limit: int = 200) -> List[Dict[str, Any]]:
    conn = get_db_connection()
    cursor = conn.cursor()
    
    sql = "SELECT * FROM documents WHERE 1=1"
    params = []
    
    if category and category.lower() != "all":
        sql += " AND LOWER(category) = LOWER(?)"
        params.append(category)
        
    if query and query.strip():
        q_wildcard = f"%{query.strip().lower()}%"
        sql += " AND (LOWER(title) LIKE ? OR LOWER(description) LIKE ? OR LOWER(tags) LIKE ? OR LOWER(content) LIKE ?)"
        params.extend([q_wildcard, q_wildcard, q_wildcard, q_wildcard])
        
    sql += " ORDER BY created_at DESC LIMIT ?"
    params.append(limit)
    
    cursor.execute(sql, params)
    rows = cursor.fetchall()
    conn.close()
    return [dict(row) for row in rows]

def add_document(title: str, category: str, description: str, content: str, tags: str = "", status: str = "Completed") -> str:
    doc_id = f"doc-{uuid.uuid4().hex[:8]}"
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("""
        INSERT INTO documents (id, title, category, description, content, tags, status)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    """, (doc_id, title, category, description, content, tags, status))
    conn.commit()
    conn.close()
    return doc_id
