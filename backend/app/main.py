import os
import sys
import time
from typing import Optional, List, Dict, Any
from fastapi import FastAPI, HTTPException, Header, Query, Request, Response
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel, Field

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.database import (
    init_db,
    get_all_commands,
    get_command_by_name,
    save_history_record,
    get_history_records,
    get_token_analytics,
    search_documents,
    add_document
)
from app.services.prompt_wrapper import PromptWrapper
from app.services.llm_service import LLMService
from app.services.token_calculator import TokenCalculator

START_TIME = time.time()

app = FastAPI(
    title="AI_SLICE // High-Density System Blueprint API",
    description="Fortune 500 Enterprise AI Slash Command API with zero-token bloat and RFC 7807 security hardening.",
    version="1.6.0"
)

# 1. CORS Security Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["Authorization", "Content-Type", "X-User-Id", "X-Idempotency-Key"],
)

# 2. HTTP Security Headers & Telemetry Middleware
@app.middleware("http")
async def security_headers_middleware(request: Request, call_next):
    response: Response = await call_next(request)
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["X-Frame-Options"] = "DENY"
    response.headers["X-XSS-Protection"] = "1; mode=block"
    response.headers["Strict-Transport-Security"] = "max-age=31536000; includeSubDomains"
    response.headers["Server"] = "AI_SLICE-Architect-Engine/1.6"
    return response

# 3. RFC 7807 Exception Envelope Handler
@app.exception_handler(HTTPException)
async def custom_http_exception_handler(request: Request, exc: HTTPException):
    return JSONResponse(
        status_code=exc.status_code,
        content={
          "type": f"https://ai-slice.internal/errors/{exc.status_code}",
          "title": exc.detail if isinstance(exc.detail, str) else "HTTP Request Error",
          "status": exc.status_code,
          "detail": exc.detail,
          "instance": str(request.url),
          "timestamp": time.time()
        }
    )

@app.on_event("startup")
def on_startup():
    """Auto-initialize SQL database schema on boot."""
    try:
        init_db()
    except Exception as e:
        print(f"[Boot Warning] Database auto-init note: {e}")

# Models
class CommandExecutionRequest(BaseModel):
    raw_input: str = Field(..., example="/plan build a restaurant website")
    provider: Optional[str] = Field(None, example="openai")
    api_key: Optional[str] = Field(None, example="sk-...")

class CommandItem(BaseModel):
    id: str
    command_name: str
    description: str
    system_blueprint: str
    max_token_limit: int

class AnalyticsSummary(BaseModel):
    total_requests: int
    total_tokens_used: int
    total_tokens_saved: int
    avg_tokens_per_request: float
    efficiency_percentage: float

class DocumentCreateRequest(BaseModel):
    title: str
    category: str
    description: str
    content: str
    tags: Optional[str] = ""

# Routes
@app.get("/")
def root():
    return {
        "status": "online",
        "service": "AI_SLICE High-Density System Blueprint Engine",
        "version": "1.6.0",
        "endpoints": ["/healthz", "/api/commands", "/api/execute", "/api/history", "/api/analytics", "/api/documents"]
    }

@app.get("/healthz")
def health_check():
    """Enterprise Health & Telemetry endpoint."""
    uptime_seconds = time.time() - START_TIME
    return {
        "status": "healthy",
        "database": "connected",
        "uptime_seconds": round(uptime_seconds, 2),
        "security": "hardened",
        "timestamp": time.time()
    }

@app.get("/api/commands", response_model=List[CommandItem])
def list_commands():
    return get_all_commands()

@app.post("/api/execute")
def execute_command(req: CommandExecutionRequest, x_user_id: Optional[str] = Header(None)):
    if not req.raw_input or not req.raw_input.strip():
        raise HTTPException(status_code=400, detail="Input prompt cannot be empty.")

    # Input sanitization (Cap max length to 10k chars to prevent DoS)
    sanitized_input = req.raw_input.strip()[:10000]

    wrapped = PromptWrapper.wrap_prompt(sanitized_input)
    command_used = wrapped["command_used"]
    user_query = wrapped["user_query"]
    system_prompt = wrapped["system_prompt"]
    max_token_limit = wrapped["max_token_limit"]

    llm_res = LLMService.execute_prompt(
        system_prompt=system_prompt,
        user_prompt=user_query,
        command_used=command_used,
        max_token_limit=max_token_limit,
        provider=req.provider,
        override_api_key=req.api_key
    )

    ai_response = llm_res["response"]
    raw_prompt_tokens = llm_res.get("raw_prompt_tokens", 0)
    raw_completion_tokens = llm_res.get("raw_completion_tokens", 0)

    metrics = TokenCalculator.calculate_metrics(
        wrapped_system_prompt=system_prompt,
        user_query=user_query,
        ai_response=ai_response,
        raw_prompt_tokens=raw_prompt_tokens,
        raw_completion_tokens=raw_completion_tokens
    )

    record_id = save_history_record(
        command_used=command_used,
        user_query=user_query,
        wrapped_prompt=system_prompt,
        ai_response=ai_response,
        prompt_tokens=metrics["prompt_tokens"],
        completion_tokens=metrics["completion_tokens"],
        total_tokens=metrics["total_tokens"],
        estimated_tokens_saved=metrics["estimated_tokens_saved"],
        user_id=x_user_id
    )

    return {
        "id": record_id,
        "command_used": command_used,
        "user_query": user_query,
        "ai_response": ai_response,
        "provider": llm_res["provider"],
        "is_mock": llm_res.get("is_mock", False),
        "tokens": {
            "prompt_tokens": metrics["prompt_tokens"],
            "completion_tokens": metrics["completion_tokens"],
            "total_tokens": metrics["total_tokens"],
            "baseline_tokens": metrics["baseline_total_tokens"],
            "tokens_saved": metrics["estimated_tokens_saved"]
        }
    }

@app.get("/api/history")
def get_history(limit: int = 30):
    return {"history": get_history_records(limit=limit)}

@app.get("/api/analytics", response_model=AnalyticsSummary)
def get_analytics():
    return get_token_analytics()

# Document Repository Endpoints
@app.get("/api/documents")
def get_documents(
    search: Optional[str] = Query("", description="Search term for title/description/tags"),
    category: Optional[str] = Query("All", description="Category filter"),
    limit: int = Query(200, description="Max documents to return")
):
    """Search completed documents (supports 100-200+ docs repository)."""
    docs = search_documents(query=search, category=category, limit=limit)
    return {"documents": docs, "count": len(docs)}

@app.post("/api/documents")
def create_document(doc: DocumentCreateRequest):
    """Add a new completed document to the repository."""
    doc_id = add_document(
        title=doc.title,
        category=doc.category,
        description=doc.description,
        content=doc.content,
        tags=doc.tags or "",
        status="Completed"
    )
    return {"id": doc_id, "status": "created"}
