from pymongo import MongoClient

from swarmstar.utils.data.kv_operations.mongodb import mongodb_set_kv
def clear_swarm_space(mongodb_uri: str) -> None:
    """
    Goes through every collection in a MongoDB except for the one named 'config',
    and deletes all documents in those collections.

    :param mongodb_uri: MongoDB URI for connecting to the instance.
    """
    client = MongoClient(mongodb_uri)

    db = client['swarmstar_interface_tests']
    collection_names = db.list_collection_names()

    for collection_name in collection_names:
        if collection_name == 'users' or collection_name == 'user_profiles':
            continue
        db[collection_name].delete_many({})

    users_collection = db['users']
    for user in users_collection.find():
        user["swarm_ids"] = {}
        user["current_swarm_id"] = None
        user["current_chat_id"] = None
        user["current_node_id"] = None
        users_collection.update_one({"_id": user["_id"]}, {"$set": user})
        print(f"User: {user['username']} with ID: {user['_id']}")
    print("Cleared all documents from swarmstar_interface_tests database")

clear_swarm_space('mongodb://localhost:27017/')