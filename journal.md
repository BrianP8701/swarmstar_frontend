# interaction between aga_swarm package and frontend

to render swarmstate visualiztion request SwarmState object

if we want a slider to like change the time of the visualization we can request the SwarmHistory object

Everytime an agent from the backend needs user input, lets think step by step what happens. A user interaction action cannot be embedded inside another action. Every user interaction needs to be a standalone action, because of the nature of user interactions. serverless functions cant be left to sit and wait for user responses. a user interaction node needs to send a request for user input, and each response back to the user must also be decoupled. 

Backend -> Initiate conversation: Node, FirstMessage
loop
    Frontend -> User response
    Backend -> (if answer is not sufficient) SecondMessage
loop
Backend -> (If answer is good) LastMessage, or just ghost them and close the convo lmao?

mkay easy enough. most of this logic goes on the backend. the weird thing here is putting as much as possible IN the package, but keeping it interoperable

Every user needs to have a user profile. We ought to define the database schema thats what we ought to do.

{
    swarm_blueprint: {
        stage: SwarmStage, 
        swarm_space: SwarmSpace,
        action_space_metadata: ActionSpaceMetadata,
        memory_space_metadata: MemorySpaceMetadata,
        history: SwarmHistory,
        state: SwarmState
    },
    user_credentials: {
        username: {
            user_id: string,
            password: bcrypt(string)
        }, 
        ... more users
    },
    users: {
        user_id: {
            username: string,
            password: string,
            users_swarms: {
                swarm_id: {
                    goal: string,
                    stage: SwarmStage, 
                    swarm_space: SwarmSpace,
                    action_space_metadata: ActionSpaceMetadata,
                    memory_space_metadata: MemorySpaceMetadata,
                    history: SwarmHistory,
                    state: SwarmState,
                    action_space: {

                    }, 
                    memory_space: {

                    },
                    agent: {
                        agentID: {
                            alive: boolean,
                            conversation: Conversation,
                            node_id: string
                        }
                    }
                }, 
                ... more of the users swarms
            }
        },
        ... more users
    }
}

Store singular copy of this
swarm_blueprint: {
    stage: SwarmStage, 
    swarm_space: SwarmSpace,
    action_space_metadata: ActionSpaceMetadata,
    memory_space_metadata: MemorySpaceMetadata,
    history: SwarmHistory,
    state: SwarmState
}

cosmodb cant support all that. we need to use a combination of cosmodb and blob storage. thats also not scalable. in the future, if we do scale we can we use some load balancers etc but thats for another time.

One cosmo db holds this: (If we scale this can be something else instead of cosmo)
CosmoDB: Partition Key[username]
user_credentials: {
    username: {
        user_id: string,
        password: bcrypt(string)
    }, 
    ... more users
}
Each user has their own entry in cosmo db. this just contains metadata and strings, nothing big.
CosmoDB: Partition Key[user_id]
{
    user_id: {
        users_swarms: {
            swarm_id: {
                goal: string,
                stage: SwarmStage, 
                swarm_space: SwarmSpace,
                agent: {
                    agentID: {
                        alive: boolean,
                        conversation: conversation_id,
                        node_id: string
                    }
                }
            }, 
            ... more of the users swarms
        }
    },
    ... more users
}
SwarmSpace in the cosmodb above contains pointers to these in blob storage. this stuff belongs in blob cuz these files can get big
{
    user_id: {
        swarm_id: {
            action_space_metadata: ActionSpaceMetadata,
            memory_space_metadata: MemorySpaceMetadata,
            history: SwarmHistory,
            state: SwarmState,
            action_space: {

            }, 
            memory_space: {

            },
            conversations: {
                conversation_id: {
                    messages: List[Message]
                }
            }
        },
        ... more of the users swarms
    },
    ... more users
}


frontend api methods:

- authenticateUser(username, password) -> userId
- get_swarms(user_id: string) -> List[swarm_id]
- get_swarm(user_id: string, swarm_id: string) -> Swarm


# getting backend integrations and tests
okay now ive actually got most of the frontend built out. i just need to actually make the backend integrations work. lets make a clear plan for all the parts i need to test and get working.

We can get it working interacting with our local sqlite databases first then we can just swap in the cloud version later on it shouldnt be too hard.

## Login and Setup
1. Signup
Let user make an account and make sure this works reliably. after signup make sure the frontend gets the necessary info
2. Login 
Make sure the user gets all the initial info they need on the frontend

This is mostly done already. but i really need to clean up the code and standardize the interactions.

## Spawn section
1. Display swarms
For testing i need to make sure that the backend and frontend swarms are aligned when we add and create swarms. The goal should display and whether the swarm is spawned or not. I need to create an artificial spawned swarm in the backend database and see if it displays the way i want it to. i should also create a filler spawn backend route that wont actually spawn the swarm but simulate it

## Chat Section
1. I need to simulate from the backend conversation intiation and agent replies. make sure this aligns with the package schemas. 


okay basically ive really just been hacking this frontend together. now i actually understand it and im gonna need to do a cleanup and standardize interactions between the front and backend and make proper testing. cleanup time. uh my brains not ready for this. fuck here we go. i need to do this.

