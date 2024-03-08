import React, { useState } from 'react';
import Tree from 'react-d3-tree';
import { useSelector, useDispatch } from 'react-redux';
import { RootStateType } from '@models/rootstate';
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@components/ui/sheet';
import useSetCurrentNode from '@hooks/tree/setCurrentNode';


const SwarmTree = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const treeData = useSelector((state: RootStateType) => state.tree.swarmState);
  const isSwarmActive = useSelector((state: RootStateType) => state.swarm.active);
  const node_logs = useSelector((state: RootStateType) => state.tree.node_logs);
  const { setCurrentNode } = useSetCurrentNode();

  console.log("node_logs", node_logs)

  const handleNodeClick = (nodeDatum: any) => {
    setIsSheetOpen(true);
    setCurrentNode(nodeDatum.attributes?.node_id);
  };

  const renderCustomNodeElement = ({ nodeDatum, toggleNode }: any) => (
    <g>
      <circle
        r="20"
        fill="#fff"
        onClick={(event) => {
          toggleNode
          event.stopPropagation();
          handleNodeClick(nodeDatum);
        }} />
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

  const handleSheetClose = () => {
    setIsSheetOpen(false);
  };

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
        separation={{ siblings: 1, nonSiblings: 1.3 }}
        translate={{ x: window.innerWidth / 2, y: 50 }}
        nodeSize={{ x: 450, y: 250 }}
        pathFunc="straight"
        renderCustomNodeElement={renderCustomNodeElement}
        collapsible={false}
      />
      <Sheet open={isSheetOpen} onOpenChange={handleSheetClose}>
        <SheetContent style={{ width: '600px', maxWidth: '100%' }}>
          <SheetHeader>
            <SheetDescription>
              {node_logs.map((log, index) => (
                <div key={index} className="mb-4 bg-gray-900 p-4 rounded">
                  <p className="font-bold mb-2 pl-2">{log.role}</p>
                  <p className="pl-2 whitespace-pre-wrap">{log.content}</p>
                </div>
              ))}
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default SwarmTree;