import React, { useEffect, useState } from 'react';
import Tree from 'react-d3-tree';

const SwarmTree = () => {
  const [treeData, setTreeData] = useState(null);

  useEffect(() => {
    // Fetch the initial tree data from the backend API
    fetch('/api/tree-data')
      .then((response) => response.json())
      .then((data) => setTreeData(data));
  }, []);

  if (!treeData) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ width: '100%', height: '500px' }}>
      <Tree data={treeData} />
    </div>
  );
};

export default SwarmTree;
