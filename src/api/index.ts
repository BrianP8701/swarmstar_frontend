// src/api/index.ts
export const postToGCF = async (swarmKey: string, goal: string) => {
    const response = await fetch('YOUR_GCF_URL', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ swarmKey, goal }),
    });
  
    if (!response.ok) {
      throw new Error('GCF request failed');
    }
  
    return response.json();
  };