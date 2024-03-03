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

def add_kv(db_name: str, collection_name: str, _id: str, value: dict) -> None:
    """
    Add a _id-value pair to the collection with an initial version number.
    """
    try:
        client = create_client(uri)
        db = client[db_name]
        collection = db[collection_name]
        # Initialize the document with a version number
        value.pop('id', None)  # Remove the id field if it exists
        document = {"_id": _id, "version": 1, **value}
        collection.insert_one(document)
    except pymongo.errors.Duplicate_idError:
        raise ValueError(f'A document with _id {_id} already exists.')
    except Exception as e:
        raise ValueError(f'Failed to add to MongoDB collection: {str(e)}')

def get_kv(db_name: str, collection_name: str, _id: str) -> dict:
    """
    Retrieve a document by _id from the collection.
    
    Note:
        MongoDB uses the _id field as the primary key by default.
        Pydantic models ignore fields that start with an underscore.
        So on the MongoDB side, the _id field is used, but in our code
        we always just switch the key _id to id.
    """
    try:    
        client = create_client(uri)
        db = client[db_name]
        collection = db[collection_name]
        result = collection.find_one({"_id": _id})
        if result is None:
            raise ValueError(f'_id {_id} not found in MongoDB collection {collection_name}.')
        id = result.pop('_id')
        result['id'] = id
        return result
    except Exception as e:
        raise ValueError(f'Failed to get from MongoDB collection: {str(e)}')

def delete_kv(db_name: str, collection_name: str, _id: str) -> None:
    try:
        client = create_client(uri)
        db = client[db_name]
        collection = db[collection_name]
        result = collection.delete_one({"_id": _id})
        if result.deleted_count == 0:
            raise ValueError(f'_id {_id} not found in MongoDB collection.')
    except Exception as e:
        raise ValueError(f'Failed to delete from MongoDB collection: {str(e)}')

def update_kv(db_name: str, collection_name: str, _id: str, updated_values: dict) -> None:
    """
    Update specified fields of a document and increment its version, ensuring optimistic concurrency control.
    """
    try:
        client = create_client(uri)
        db = client[db_name]
        collection = db[collection_name]
        updated_values.pop('id', None)  # Remove the id field if it exists
        
        retries = 3
        for attempt in range(retries):
            # Fetch the current document
            current_document = collection.find_one({"_id": _id})
            if current_document is None:
                raise ValueError(f'_id {_id} not found in MongoDB collection {collection_name}.')

            # Prepare the update
            new_version = current_document.get("version", 0) + 1
            update_fields = {"version": new_version}
            for field, value in updated_values.items():
                if field not in current_document:
                    raise KeyError(f"Field '{field}' does not exist in the document.")
                update_fields[field] = value

            # Attempt to update the document if the version hasn't changed
            result = collection.update_one(
                {"_id": _id, "version": current_document["version"]},
                {"$set": update_fields}
            )

            if result.matched_count:
                break  # Update was successful
            elif attempt == retries - 1:
                raise Exception("Failed to update document due to concurrent modification.")
            # If the document was updated elsewhere, retry the operation
    except Exception as e:
        raise ValueError(f"Failed to update MongoDB collection: {str(e)}")

def set_kv(db_name: str, collection_name: str, _id: str, new_value: dict) -> None:
    """
    Replace the value of a document with the new value provided, ensuring optimistic concurrency control.
    """
    try:
        client = create_client(uri)  # Assume create_client is defined elsewhere
        db = client[db_name]
        collection = db[collection_name]

        retries = 5
        for attempt in range(retries):
            # Fetch the current document
            current_document = collection.find_one({"_id": _id})
            if current_document is None:
                raise ValueError(f'_id {_id} not found in MongoDB collection {collection_name}.')

            # Prepare the new document with incremented version
            new_version = current_document.get("version", 0) + 1
            new_document = new_value.copy()  # Make a copy to avoid mutating the original argument
            new_document["version"] = new_version

            # Attempt to replace the document if the version hasn't changed
            result = collection.replace_one(
                {"_id": _id, "version": current_document["version"]},
                new_document
            )

            if result.matched_count:
                break  # Update was successful
            elif attempt == retries - 1:
                raise Exception("Failed to replace document due to concurrent modification.")
            # If the document was updated elsewhere, retry the operation
    except Exception as e:
        raise ValueError(f"Failed to replace document in MongoDB collection: {str(e)}")

def append_to_list(db_name: str, collection_name: str, _id: str, key: str, value) -> None:
    """
    Append a value to a list within a document identified by _id, creating the document or list if they do not exist.
    """
    try:
        client = create_client(uri)
        db = client[db_name]
        collection = db[collection_name]
        
        if collection.count_documents({"_id": _id}) > 0:
            collection.update_one({"_id": _id}, {"$push": {key: value}}, upsert=True)
        else:
            add_kv(db_name, collection_name, _id, {key: [value]})
            
    except Exception as e:
        raise ValueError(f"Failed to append value {value} to list in MongoDB collection {collection_name}: {str(e)}")

def remove_from_list_by_value(db_name: str, collection_name: str, _id: str, key: str, value) -> None:
    """
    Remove a value from a list within a document identified by _id, raising an error if the document or value does not exist.
    """
    try:
        client = create_client(uri)
        db = client[db_name]
        collection = db[collection_name]
        
        # Check if the document exists
        if collection.count_documents({"_id": _id}) == 0:
            raise ValueError(f"Document with _id {_id} not found in MongoDB collection {collection_name}.")
        
        # Attempt to remove the value from the list
        result = collection.update_one({"_id": _id}, {"$pull": {key: value}})
        
        # If no document was modified, the value was not found in the list
        if result.modified_count == 0:
            raise ValueError(f"Value {value} not found in list {key} in MongoDB collection {collection_name} at _id {_id}.")
            
    except Exception as e:
        raise ValueError(f"Failed to remove value {value} from list in MongoDB collection {collection_name}: {str(e)}")


def get_element_by_index(db_name: str, collection_name: str, _id: str, index: int) -> any:
    """
    Retrieve an element by index from a list within a document without retrieving the whole list.
    """
    try:
        client = create_client(uri)
        db = client[db_name]
        collection = db[collection_name]
        
        result = collection.find_one({"_id": _id}, {"data": {"$slice": [index, 1]}})
        if result and "data" in result and len(result["data"]) > 0:
            return result["data"][0]
        else:
            raise ValueError(f"Element at index {index} not found in MongoDB collection {collection_name} at _id {_id}.")
    except Exception as e:
        raise ValueError(f"Failed to retrieve element by index: {str(e)}")

def get_list_length(db_name: str, collection_name: str, _id: str) -> int:
    """
    Get the length of a list within a document without retrieving the list itself.
    """
    try:
        client = create_client(uri)
        db = client[db_name]
        collection = db[collection_name]
        
        pipeline = [
            {"$match": {"_id": _id}},
            {"$project": {"length": {"$size": "$data"}}}
        ]
        result = list(collection.aggregate(pipeline))
        if result and len(result) > 0:
            return result[0]["length"]
        else:
            raise ValueError(f"_id {_id} not found or list is empty in MongoDB collection {collection_name}.")
    except Exception as e:
        raise ValueError(f"Failed to get list length: {str(e)}")
