export default function JsonTable({ data }) {
    const groupedData = {};
  
    Object.keys(data).forEach((key) => {
      if(key === "pk") return;
      const regex = /^(.+)\s\d+$/;
  
      const match = key.match(regex);
  
      if (match) {
        const groupName = match[1];
  
        if (!groupedData[groupName]) {
          groupedData[groupName] = [];
        }
  
        groupedData[groupName].push(data[key]);
      } else {
        groupedData[key] = [data[key]];
      }
    });
  
  const keys = Object.keys(groupedData).sort((a, b) => {
    if (a === 'patientName') return -1;
    if (b === 'patientName') return 1;
    return 0;
  });
  
    return (
      <div className="flex items-center justify-center min-h-screen">
      <table className="table-auto border-collapse border border-gray-300">
        <thead>
          <tr>
            {keys.map((key, index) => (
              <th key={index} className="border border-gray-300 px-4 py-2 bg-teal-500 text-white text-3xl">
                {key === 'patientName' ? 'Patient Name' : key}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: Math.max(...keys.map((key) => groupedData[key].length)) }).map((_, rowIndex) => (
            <tr key={rowIndex}>
              {keys.map((key, cellIndex) => (
                <td key={cellIndex} className="border border-gray-300 px-4 py-2 bg-slate-700 text-white text-2xl text-center">
                  {groupedData[key][rowIndex]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    );
  }