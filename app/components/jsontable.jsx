export default function JsonTable({ data }) {
    // Initialize an empty object to store the grouped data
    const groupedData = {};
  
    // Iterate over the keys in the data object
    Object.keys(data).forEach((key) => {
      // Define a regular expression to match keys like "Start Station 1 1" and "Stop FNA 1 1"
      const regex = /^(.+)\s\d+$/;
  
      // Test the key against the regular expression
      const match = key.match(regex);
  
      // If the key matches the regular expression
      if (match) {
        // Extract the group name, e.g., "Start Station 1" or "Stop FNA 1"
        const groupName = match[1];
  
        // If the group name is not already a key in the groupedData object, initialize an empty array for it
        if (!groupedData[groupName]) {
          groupedData[groupName] = [];
        }
  
        // Append the value for the current key to the array for the group name
        groupedData[groupName].push(data[key]);
      } else {
        // If the key does not match the regular expression, add it directly to the groupedData object
        groupedData[key] = [data[key]];
      }
    });
  
    // Generate an array of keys from the groupedData object
    const keys = Object.keys(groupedData);
  
    return (
      <table className="table-auto border-collapse border border-gray-300">
        <thead>
          <tr>
            {keys.map((key, index) => (
              <th key={index} className="border border-gray-300 px-4 py-2">
                {key}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* Calculate the maximum number of rows needed to display all values in the groupedData object */}
          {Array.from({ length: Math.max(...keys.map((key) => groupedData[key].length)) }).map((_, rowIndex) => (
            <tr key={rowIndex}>
              {keys.map((key, cellIndex) => (
                <td key={cellIndex} className="border border-gray-300 px-4 py-2">
                  {groupedData[key][rowIndex]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }