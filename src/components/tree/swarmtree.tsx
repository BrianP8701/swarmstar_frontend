import React, { useState } from 'react';
import Tree from 'react-d3-tree';
import { useSelector, useDispatch } from 'react-redux';
import { RootStateType } from '@models/rootstate';
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@components/ui/sheet';
import useSetCurrentNode from '@hooks/tree/setCurrentNode';
import { NodeLog, NodeLogList } from '@redux/treeSlice';

const SwarmTree = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const treeData = useSelector((state: RootStateType) => state.tree.swarmState);
  const isSwarmActive = useSelector((state: RootStateType) => state.swarm.active);
  const node_logs = useSelector((state: RootStateType) => state.tree.node_logs);
  const { setCurrentNode } = useSetCurrentNode();

  const handleNodeClick = (nodeDatum: any) => {
    setIsSheetOpen(true);
    setCurrentNode(nodeDatum.attributes?.node_id);
  };

  const renderCustomNodeElement = ({ nodeDatum, toggleNode }: any) => {
    let circleColor = '#fff'; // Default color is white

    if (nodeDatum.attributes?.status === 'terminated') {
      circleColor = '#f06060'; // Light red for 'terminated'
    } else if (nodeDatum.attributes?.status === 'active') {
      circleColor = '#6cf060'; // Light green for 'alive'
    } else if (nodeDatum.attributes?.status === 'waiting') {
      circleColor = '#f0f0f0'; // Light grey for 'waiting'
    }

    return (
      <g>
        <circle
          r="20"
          fill={circleColor}
          onClick={(event) => {
            toggleNode;
            event.stopPropagation();
            handleNodeClick(nodeDatum);
          }}
        />
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
  };

  const renderNodeLogs = (logs: unknown, depth = 0): JSX.Element[] | JSX.Element => {
    if (!Array.isArray(logs)) {
      return renderLog(logs as NodeLog);
    }

    return logs.map((log, index) => (
      <div key={`${depth}-${index}`} style={{ margin: '4px', padding: '4px', border: depth > 0 ? '1px solid black' : 'none' }}>
        {Array.isArray(log) ? renderNodeLogs(log, depth + 1) : renderLog(log as NodeLog)}
      </div>
    ));
  };

  const renderLog = (log: NodeLog): JSX.Element => (
    <div className="mb-4 bg-gray-900 text-white p-4 rounded">
      <p className="font-bold mb-2 pl-2">{log.role}</p>
      <p className="pl-2 whitespace-pre-wrap">{log.content}</p>
    </div>
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
              {renderNodeLogs(node_logs)}
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default SwarmTree;