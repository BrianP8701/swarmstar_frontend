import sqlite3
import json 

def create_sqlite_db(db_path: str) -> None:
    try:
        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()
        cursor.execute('CREATE TABLE IF NOT EXISTS kv_store (key TEXT PRIMARY KEY, value TEXT)')
        conn.commit()
    except Exception as e:
        raise ValueError(f'Failed to create or open kv store db: {str(e)}')
    
def get_sqlite_db(db_path: str) -> sqlite3.Connection:
    try:
        conn = sqlite3.connect(db_path)
        return conn
    except Exception as e:
        raise ValueError(f'Failed to create or open kv store db: {str(e)}')
    
def add_to_kv_store(db_path: str, key: str, value: dict) -> None:
    try:
        conn = get_sqlite_db(db_path)
        cursor = conn.cursor()
        cursor.execute('INSERT INTO kv_store (key, value) VALUES (?, ?)', (key, json.dumps(value)))
        conn.commit()
    except Exception as e:
        raise ValueError(f'Failed to add to kv store: {str(e)}')
    
def get_from_kv_store(db_path: str, key: str) -> dict:
    try:
        conn = get_sqlite_db(db_path)
        cursor = conn.cursor()
        cursor.execute('SELECT value FROM kv_store WHERE key = ?', (key,))
        value = cursor.fetchone()
        if value is None:
            raise ValueError(f'Key not found in kv store: {key}')
        return json.loads(value[0])
    except Exception as e:
        raise ValueError(f'Failed to get from kv store: {str(e)}')
    
def delete_from_kv_store(db_path: str, key: str) -> None:
    try:
        conn = get_sqlite_db(db_path)
        cursor = conn.cursor()
        cursor.execute('DELETE FROM kv_store WHERE key = ?', (key,))
        conn.commit()
    except Exception as e:
        raise ValueError(f'Failed to delete from kv store: {str(e)}')
