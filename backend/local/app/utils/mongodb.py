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
    """
    Add a key-value pair to the collection with an initial version number.
    """
    try:
        client = create_client(uri)
        db = client['swarm_interface']
        collection = db[collection_name]
        # Initialize the document with a version number
        document = {"key": key, "version": 1, **value}
        collection.insert_one(document)
    except pymongo.errors.DuplicateKeyError:
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

def update_kv(collection_name: str, key: str, updated_values: dict) -> None:
    """
    Update specified fields of a document and increment its version, ensuring optimistic concurrency control.
    """
    client = create_client(uri)
    db = client['swarm_interface']
    collection = db[collection_name]
    
    retries = 3
    for attempt in range(retries):
        # Fetch the current document
        current_document = collection.find_one({"key": key})
        if current_document is None:
            raise ValueError(f'Key {key} not found in MongoDB collection {collection_name}.')

        # Prepare the update
        new_version = current_document.get("version", 0) + 1
        update_fields = {"version": new_version}
        for field, value in updated_values.items():
            if field not in current_document:
                raise KeyError(f"Field '{field}' does not exist in the document.")
            update_fields[field] = value

        # Attempt to update the document if the version hasn't changed
        result = collection.update_one(
            {"key": key, "version": current_document["version"]},
            {"$set": update_fields}
        )

        if result.matched_count:
            break  # Update was successful
        elif attempt == retries - 1:
            raise Exception("Failed to update document due to concurrent modification.")
        # If the document was updated elsewhere, retry the operation

def append_to_list_with_versioning(collection_name: str, key: str, list_field: str, value_to_append) -> None:
    """
    Appends a value to a list within a document, using optimistic concurrency control to handle concurrent updates safely.

    :param collection_name: The name of the collection.
    :param key: The key identifying the document.
    :param list_field: The field within the document that contains the list to append to.
    :param value_to_append: The value to append to the list.
    """
    client = create_client(uri)
    db = client['swarm_interface']
    collection = db[collection_name]

    retries = 3
    for attempt in range(retries):
        # Fetch the current document
        current_document = collection.find_one({"key": key})
        if current_document is None:
            raise ValueError(f'Key {key} not found in MongoDB collection {collection_name}.')
        if list_field not in current_document:
            raise KeyError(f"Field '{list_field}' does not exist in the document. Ensure the field is initialized as a list.")

        # Prepare the update with an incremented version number
        new_version = current_document.get("version", 0) + 1
        updated_values = {"$push": {list_field: value_to_append}, "$set": {"version": new_version}}

        # Attempt to update the document if the version hasn't changed
        result = collection.update_one(
            {"key": key, "version": current_document["version"]},
            updated_values
        )

        if result.matched_count:
            break  # Update was successful
        elif attempt == retries - 1:
            raise Exception("Failed to update document due to concurrent modification.")
        # If the document was updated elsewhere, retry the operation

def add_to_dict_with_versioning(collection_name: str, key: str, dict_field: str, dict_key: str, dict_value) -> None:
    """
    Adds a key-value pair to a dictionary within a document, using optimistic concurrency control to handle concurrent updates safely.

    :param collection_name: The name of the collection.
    :param key: The key identifying the document.
    :param dict_field: The field within the document that contains the dictionary to add to.
    :param dict_key: The key to add to the dictionary.
    :param dict_value: The value to associate with the dict_key in the dictionary.
    """
    client = create_client(uri)
    db = client['swarm_interface']
    collection = db[collection_name]

    retries = 3
    for attempt in range(retries):
        # Fetch the current document
        current_document = collection.find_one({"key": key})
        if current_document is None:
            raise ValueError(f'Key {key} not found in MongoDB collection {collection_name}.')
        if dict_field not in current_document:
            raise KeyError(f"Field '{dict_field}' does not exist in the document. Ensure the field is initialized as a dictionary.")

        # Prepare the update with an incremented version number
        new_version = current_document.get("version", 0) + 1
        updated_values = {
            "$set": {
                f"{dict_field}.{dict_key}": dict_value,  # This adds or updates the key in the dictionary
                "version": new_version
            }
        }

        # Attempt to update the document if the version hasn't changed
        result = collection.update_one(
            {"key": key, "version": current_document["version"]},
            updated_values
        )

        if result.matched_count:
            break  # Update was successful
        elif attempt == retries - 1:
            raise Exception("Failed to update document due to concurrent modification.")
        # If the document was updated elsewhere, retry the operation


def clean(value: dict) -> dict:
    value.pop('key', None) 
    value.pop('_id', None)
    return value
