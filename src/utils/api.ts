export const createClass = async (data: any) => {
  const url =
    "https://ywb0tj6y31.execute-api.us-west-1.amazonaws.com/Testing/class";
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

export const fetchClassData = async (id: string) => {
  const url =
    "https://ywb0tj6y31.execute-api.us-west-1.amazonaws.com/Testing/class";
  try {
    const response = await fetch(`${url}/${id}?role=coordinator`);
    if (!response.ok) {
      throw new Error(`Failed to fetch class data: ${response.statusText}`);
    }
    return await response.json(); // Parse and return the JSON response
  } catch (error) {
    console.error("Error fetching class data:", error);
    throw error; // Re-throw the error for handling in the component
  }
};
