from azure.cosmos import CosmosClient, PartitionKey, exceptions

def upload_document_to_cosmos(db_url, key, database_name, container_name, document):
    # Create a Cosmos client
    client = CosmosClient(db_url, credential=key)

    # Get the database and container
    database = client.get_database_client(database_name)
    container = database.get_container_client(container_name)

    # Add the document
    try:
        response = container.upsert_item(document)
        print("Document added. ID:", response['id'])
    except exceptions.CosmosHttpResponseError as e:
        print("Failed to add document:", e)


def retrieve_document_from_cosmos(db_url, key, database_name, container_name, document_id):
    # Create a Cosmos client
    client = CosmosClient(db_url, credential=key)

    # Get the database and container
    database = client.get_database_client(database_name)
    container = database.get_container_client(container_name)

    # Retrieve the document
    try:
        query = "SELECT * FROM c WHERE c.id = @id"
        parameters = [{"name": "@id", "value": document_id}]
        items = list(container.query_items(query=query, parameters=parameters, enable_cross_partition_query=True))

        if items:
            return items[0]
        else:
            print("Document not found.")
            return None
    except exceptions.CosmosHttpResponseError as e:
        print("Failed to retrieve document:", e)
        return None