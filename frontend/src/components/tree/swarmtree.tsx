import React from 'react';
import Tree from 'react-d3-tree';
import { useSelector } from 'react-redux';
import { RootStateType } from '@models/rootstate';

const renderCustomNodeElement = ({ nodeDatum, toggleNode }: any) => (
  <g>
    <circle r="20" fill="#fff" onClick={toggleNode} />
    <text fill="#000" strokeWidth="1" x="40" y="-10" onClick={toggleNode}>
      {nodeDatum.name}
    </text>
    <foreignObject x="-200" y="40" width="400" height="150">
      <div style={{ backgroundColor: '#202123', padding: '5px', borderRadius: '5px', height: '150px', overflow: 'hidde', position: 'relative' }}>
        <p style={{ margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 6, WebkitBoxOrient: 'vertical', maxHeight: '100%' }}>
          {nodeDatum.attributes?.directive}
        </p>
      </div>
    </foreignObject>
  </g>
);

const SwarmTree = () => {
  const treeData = useSelector((state: RootStateType) => state.tree.swarmState);
  const isSwarmActive = useSelector((state: RootStateType) => state.swarm.active);

  console.log('treeData:', treeData);

  if (!treeData) {
    if (isSwarmActive) {
      return (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            fontSize: '18px',
          }}
        >
          Loading...
        </div>
      );
    } else {
      return (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            fontSize: '18px',
          }}
        >
          No active swarm
        </div>
      );
    }
  }

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Tree
        data={treeData}
        orientation="vertical"
        translate={{ x: window.innerWidth / 2, y: 50 }}
        nodeSize={{ x: 450, y: 250 }}
        pathFunc="straight"
        renderCustomNodeElement={renderCustomNodeElement}
      />
    </div>
  );
};

export default SwarmTree;