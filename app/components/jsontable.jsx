export default function JsonTable({ data }) {
  const groupedData = {};
  Object.keys(data).forEach((key) => {

    const nonTableKeys = ["patientName", "pk", "Date", 'mrd', 'pseudo_name', 'org'];
    if (nonTableKeys.includes(key)) return;
    
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
    if (a === "Start Procedure") return -1;
    if (a === "Stop Procedure" && b !== "Start Procedure") return -1;
    if (b === "Start Procedure") return 1;
    if (b === "Stop Procedure" && a !== "Start Procedure") return 1;

    const groupRegex = /^(Start|Stop) (Procedure|Liver)\s(\d+)$/;
    const aMatch = a.match(groupRegex);
    const bMatch = b.match(groupRegex);

    if (aMatch && bMatch) {
      const aGroup = aMatch[2];
      const bGroup = bMatch[2];
      const aNum = parseInt(aMatch[3], 10);
      const bNum = parseInt(bMatch[3], 10);

      if (aGroup === bGroup) {
        if (aNum === bNum) {
          return a.localeCompare(b);
        }
        return aNum - bNum;
      }
      return aGroup.localeCompare(bGroup);
    } else if (aMatch) {
      return -1;
    } else if (bMatch) {
      return 1;
    }

    return a.localeCompare(b);
  });



  return (
    <div className="w-full mt-5 mb-1 flex justify-center">
      <div className="w-full overflow-x-auto md:overflow-x-visible">
        <table className="table-auto min-w-full text-center bg-white rounded-md overflow-hidden">
        <thead>
          <tr>
            {keys.map((key, index) => (
              <th key={index} className="border border-gray-300 px-4 md:px-2 py-2 bg-teal-500 text-white text-xl">
                {key === 'patientName' ? 'Patient Name' : key}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: Math.max(...keys.map((key) => groupedData[key].length)) }).map((_, rowIndex) => (
            <tr key={rowIndex}>
              {keys.map((key, cellIndex) => (
                <td key={cellIndex} className="border border-gray-300 px-4 md:px-2 py-2 bg-slate-700 text-white text-2xl text-center">
                  {groupedData[key][rowIndex]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
}