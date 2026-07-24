import os
import sys

# Ensure app package is in path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from app.database import init_db

if __name__ == "__main__":
    schema_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "schema.sql")
    print(f"Initializing database with schema from {schema_path}...")
    init_db(schema_path)
    print("Database setup complete!")
