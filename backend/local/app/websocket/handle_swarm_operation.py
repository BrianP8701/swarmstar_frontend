'''
If the user's current swarm or chat id matches
the processed swarm operation, push a websocket
event to the user's interface to update the UI.
'''
from utils.mongodb import get_kv, add_kv, append_to_list_with_versioning

def handle_swarm_operation(swarm_id, operation):
    swarm = get_kv('swarms', swarm_id)
    username = swarm['owner']
    user = get_kv('users', username)
    user = get_kv('user_profiles', user['user_id'])
    
    if user['current_swarm_id'] == swarm_id:
        websocket_event = {
            'event': 'swarm_operation',
            'data': {'operation': operation}
        }
        append_to_list_with_versioning('users', username, 'websocket_events', websocket_event)
        
