# Autonomous General Agent Swarm Interface

Interface to the repo at: [Autonomous General Agent Swarm Interface](https://github.com/BrianP8701/aga_swarm)

I'm going to create a version you can run locally for other developers.

I'm also going to make a proper deployed app for whoever would just like to use this.


brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb/brew/mongodb-community
create_collection_with_unique_index('swarm_interface', 'swarm_messages')
create_collection_with_unique_index('swarm_interface', 'swarm_chats')
create_collection_with_unique_index('swarm_interface', 'swarms')
create_collection_with_unique_index('swarm_interface', 'user_auth')
create_collection_with_unique_index('swarm_interface', 'user_info')
