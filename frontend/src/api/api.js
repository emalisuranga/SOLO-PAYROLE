// src/api/api.js
export const saveData = async (data) => {
    try {
      const response = await fetch('/api/saveData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        throw new Error('Failed to save data');
      }
  
      return await response.json();
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  };
  