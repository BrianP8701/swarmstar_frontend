const flaskConfig = {
    login_url: "http://lvh.me:5000/auth/login",
    signup_url: "http://lvh.me:5000/auth/signup",
    auth_token_url: "http://lvh.me:5000/auth/auth_token",
    create_swarm_url: "http://lvh.me:5000/swarm/create_swarm",
    delete_swarm_url: "http://lvh.me:5000/swarm/delete_swarm",
    spawn_swarm_url: "http://lvh.me:5000/swarm/spawn_swarm",
    get_chat_url: "http://lvh.me:5000/chat/get_chat",
    set_current_swarm_url: "http://lvh.me:5000/swarm/set_current_swarm",
    handle_user_message_url: "http://lvh.me:5000/chat/handle_user_message",
    backend_url: "http://lvh.me:5000",
    backend_ws_url: "ws://lvh.me:5000/ws",
    create_chat_url: "http://lvh.me:5000/chat/create_chat",
    get_messages_url: "http://lvh.me:5000/chat/get_messages",
    update_swarm_url: "http://lvh.me:5000/swarm/update_swarm",
    update_user_url: "http://lvh.me:5000/user/update_user",
    set_current_chat_url: "http://lvh.me:5000/chat/set_current_chat",
    set_current_node_url: "http://lvh.me:5000/tree/set_current_node",
    copy_swarm_url: "http://lvh.me:5000/swarm/copy_swarm",
    pause_swarm_url: "http://lvh.me:5000/swarm/pause_swarm",
};


export default flaskConfig;
