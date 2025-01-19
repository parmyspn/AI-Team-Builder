export const createClass = async (data: any) => {
    const url = "www.jafar.ca"
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      return await response.json(); // Return the response from the server
    } catch (error) {
      console.error("Error in sending POST request:", error);
      throw error;
    }
  };
  