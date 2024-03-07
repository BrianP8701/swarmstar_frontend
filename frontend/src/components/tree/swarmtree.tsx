import React, { useEffect, useState } from 'react';
import Tree from 'react-d3-tree';
import { useSelector } from 'react-redux';
import { RootStateType } from '@models/rootstate';

const SwarmTree = () => {
  const treeData = useSelector((state: RootStateType) => state.tree.swarmState);
  const is_swarm_active = useSelector((state: RootStateType) => state.swarm.active);

  console.log('treeData:', treeData)

  if (!treeData) {
    if (is_swarm_active) {
      return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontSize: '18px' }}>
        Loading...
      </div>;
    }
    else {
      return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontSize: '18px' }}>
        No active swarm
      </div>;
    }
  }

  return (
    <div style={{ width: '100%', height: '500px' }}>
      <Tree data={treeData} />
    </div>
  );
};

export default SwarmTree;
