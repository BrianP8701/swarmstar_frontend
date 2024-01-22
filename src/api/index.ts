// src/api/index.ts
export const postToRouter = async (data: Record<string, any>) => {
    const response = await fetch('YOUR_GCF_URL', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  
    if (!response.ok) {
      throw new Error('GCF request failed');
    }
  
    return response.json();
  };