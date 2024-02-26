from pymongo import MongoClient
import pymongo
import dotenv
import os
dotenv.load_dotenv()

uri = os.getenv('MONGODB_URI')

def create_client(uri: str) -> MongoClient:
    try:
        client = MongoClient(uri)
        return client
    except Exception as e:
        raise ValueError(f'Failed to create MongoDB client: {str(e)}')
    
def create_collection(db_name: str, collection_name: str) -> None:
    client = create_client(uri)
    db = client[db_name]
    collection = db[collection_name]
    collection.create_index([('key', pymongo.ASCENDING)], unique=True)

def add_kv(collection_name: str, key: str, value: dict) -> None:
    try:
        client = create_client(uri)
        db = client['swarm_interface']
        collection = db[collection_name]
        document = {"key": key, **value}
        collection.insert_one(document)
    except pymongo.errors.DuplicateKeyError as e:
        raise ValueError(f'A document with key {key} already exists.')
    except Exception as e:
        raise ValueError(f'Failed to add to MongoDB collection: {str(e)}')

def get_kv(collection_name: str, key: str) -> dict:
    try:    
        client = create_client(uri)
        db = client['swarm_interface']
        collection = db[collection_name]
        result = collection.find_one({"key": key})
        if result is None:
            raise ValueError(f'Key {key} not found in MongoDB collection {collection_name}.')
        return clean(result)
    except Exception as e:
        raise ValueError(f'Failed to get from MongoDB collection: {str(e)}')

def delete_kv(collection_name: str, key: str) -> None:
    try:
        client = create_client(uri)
        db = client['swarm_interface']
        collection = db[collection_name]
        result = collection.delete_one({"key": key})
        if result.deleted_count == 0:
            raise ValueError(f'Key {key} not found in MongoDB collection.')
    except Exception as e:
        raise ValueError(f'Failed to delete from MongoDB collection: {str(e)}')

def update_kv(collection_name: str, key: str, update_value: dict) -> None:
    try:
        client = create_client(uri)
        db = client['swarm_interface']
        collection = db[collection_name]
        # Fetch the document to retain its _id
        existing_document = collection.find_one({"key": key})
        if existing_document is None:
            raise ValueError(f'Key {key} not found in MongoDB collection {collection_name}.')
        # Ensure the update retains the original _id and key
        update_value_with_id = {"_id": existing_document["_id"], "key": key, **update_value}
        result = collection.replace_one({"_id": existing_document["_id"]}, update_value_with_id)
        if result.matched_count == 0:
            raise ValueError(f'Failed to update document with key {key} in MongoDB collection.')
    except Exception as e:
        raise ValueError(f'Failed to update MongoDB collection: {str(e)}')

def clean(value: dict) -> dict:
    value.pop('key', None) 
    value.pop('_id', None)
    return value
