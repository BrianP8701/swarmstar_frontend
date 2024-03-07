import os
from dotenv import load_dotenv

from swarmstar.types import SwarmOperation, SwarmConfig, SwarmNode
from swarmstar.utils.swarmstar_space import get_swarm_node, get_swarm_operation, get_swarm_state, get_swarm_history, delete_swarmstar_space

from src.utils.database.mongodb import get_kv, delete_kv

load_dotenv()
swarmstar_space_db_name = os.getenv("SWARMSTAR_SPACE_DB_NAME")


def get_swarm_config(swarm_id: str) -> SwarmConfig:
    return SwarmConfig(**get_kv(swarmstar_space_db_name, "config", swarm_id))


"""
const orgChart = {
  name: 'CEO',
  children: [
    {
      name: 'Manager',
      attributes: {
        department: 'Production',
      },
      children: [
        {
          name: 'Foreman',
          attributes: {
            department: 'Fabrication',
          },
          children: [
            {
              name: 'Worker',
            },
          ],
        },
        {
          name: 'Foreman',
          attributes: {
            department: 'Assembly',
          },
          children: [
            {
              name: 'Worker',
            },
          ],
        },
      ],
    },
  ],
};
"""
def get_current_swarm_state_representation(swarm_config: SwarmConfig):
    swarm_state = get_swarm_state(swarm_config)
    root_node_id = swarm_state[0]
    root_node = get_swarm_node(swarm_config, root_node_id)
    swarm_state_representation = _convert_node_to_d3_tree_node_recursive(swarm_config, root_node)
    return swarm_state_representation

def _convert_node_to_d3_tree_node_recursive(swarm_config: SwarmConfig, node: SwarmNode):
    node_representation = {
        "name": node.name,
        "attributes": {
            "directive": node.message
        }
    }
    if len(node.children_ids) != 0:
        node_representation["children"] = []
        for child_id in node.children_ids:
            child_node = get_swarm_node(swarm_config, child_id)
            child_representation = _convert_node_to_d3_tree_node_recursive(swarm_config, child_node)
            node_representation["children"].append(child_representation)
    return node_representation
