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
    
def create_collection_with_unique_index(db_name: str, collection_name: str) -> None:
    client = create_client(uri)
    db = client[db_name]
    collection = db[collection_name]
    collection.create_index([('key', pymongo.ASCENDING)], unique=True)

def add_key_value(collection_name: str, key: str, value: dict) -> None:
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

def get_by_key(collection_name: str, key: str) -> dict:
    try:    
        client = create_client(uri)
        db = client['swarm_interface']
        collection = db[collection_name]
        result = collection.find_one({"key": key})
        if result is None:
            raise ValueError(f'Key {key} not found in MongoDB collection.')
        return result
    except Exception as e:
        raise ValueError(f'Failed to get from MongoDB collection: {str(e)}')

def delete_by_key(collection_name: str, key: str) -> None:
    try:
        client = create_client(uri)
        db = client['swarm_interface']
        collection = db[collection_name]
        result = collection.delete_one({"key": key})
        if result.deleted_count == 0:
            raise ValueError(f'Key {key} not found in MongoDB collection.')
    except Exception as e:
        raise ValueError(f'Failed to delete from MongoDB collection: {str(e)}')

def update_by_key(collection_name: str, key: str, update_value: dict) -> None:
    try:
        client = create_client(uri)
        db = client['swarm_interface']
        collection = db[collection_name]
        result = collection.update_one({"key": key}, {"$set": update_value})
        if result.matched_count == 0:
            raise ValueError(f'Key {key} not found in MongoDB collection.')
    except Exception as e:
        raise ValueError(f'Failed to update MongoDB collection: {str(e)}')

create_collection_with_unique_index('swarm_interface', 'swarm_messages')