# interaction between aga_swarm package and frontend

to render swarmstate visualiztion request SwarmState object

if we want a slider to like change the time of the visualization we can request the SwarmHistory object

Everytime an agent from the backend needs user input, lets think step by step what happens. A user interaction action cannot be embedded inside another action. Every user interaction needs to be a standalone action, because of the nature of user interactions. serverless functions cant be left to sit and wait for user responses. a user interaction node needs to send a request for user input, and each response back to the user must also be decoupled. 

Backend -> Initiate chat: Node, FirstMessage
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
                            chat: chat,
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
                        chat: chat_id,
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
            chats: {
                chat_id: {
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
1. I need to simulate from the backend chat intiation and agent replies. make sure this aligns with the package schemas. 


okay basically ive really just been hacking this frontend together. now i actually understand it and im gonna need to do a cleanup and standardize interactions between the front and backend and make proper testing. cleanup time. uh my brains not ready for this. fuck here we go. i need to do this.

# Websockets
okay im gonna continue to use traditional request response from client->server for what exists now. but for chat, state and history updates im going to use websockets. on flask this uses the socketio lib. on azure this will be a little more complex, using azure web pubsub + azure functions. anyway it needs to be done so lets implement the flask websocket communication first. websocket begins when swarm spawns or resumes and dies when it pauses or when all nodes are at a user blocking operation for like lets say 10 minutes with no response. then when the user does say something we'll open up the websocket connection again i guess.

okay websockets are only used for sending server->client. Client->server is always http. okay lets get this done.

omg. okay listen up here. right when we finish this - the chat section - we're fucking done and can get away from frontend dev for a while. we can actually go back to working on the package which we really really fucking need to do.

we'll eventually come back to change the frontend for a few things in the future:
- add visualization of state, history, action and memory space
- add node info for each conversation
- add images/files to messages. add codeblocks markdown, latex etc.

and then even farther in the future we can even imagine adding more stuff but for now lets not overwhelm ourselves. lets just get this chat done. then we can go back to the package.




A question to ask is does every node have a single unique chat??? Based off how complex the chat with the user action was... yeah bro lets just say yes tbh.


# Managing swarms when testing frontend

Im gonna have different swarmconfigs with different configs. Each swarmconfig can have multiple root ids. how do i test on frontend?

Ill have one swarmconfig local mode. ill save in the database according with all swarm_ids pointing to the same swarmconfig obj, and each with their unique swarm id. for example ill make a run and itll be saved, and if i test. ah damn this is weird i actually gotta like implement the stuff now. fuck challenge challenge challenge. nah this is easy ive already prepared for this shit.

I need some sort of queue that takes swarm operations. from anywhere it doesent fuckin matter. it checks if that swarm is active. if it is run the op. if not store it. simple wimple this is how we pause and resume the swarm. 

# Updating user ui from swarm operations with websocket events
Now when i say updating the User's UI, what am i updating?
- The chat interface
- The swarm interface
- Something else?

It means i need to define what the redux store looks like. 
i already did this, but theres stuff i need to add its not complete.

spawn page showing goal and all swarm names
chat page showing all chat names and chat messages of currently selected chat.
chat page also showing more info about the currently selected chat. what info?
we want stuff close to the mush, we want to see the PROMPTS used. the english, simple, role content. in chat we can show just the journal, make it expandable

in the node visualization, lets call it treeviz: we display a tree representing each node, no words. a color representing its lifecycle. perhaps a symbol representing its action type. the chat journal has a button that can take you to the treeviz and highlight the node. you can click on a node and see developer logs. nice we got it. now lets modify the redux store to match this

# User message
We need to save the blocking operation (context, next_function_to_call) for when the user responds. 

all state history, node, journal and developer log handling happens INISDE the package