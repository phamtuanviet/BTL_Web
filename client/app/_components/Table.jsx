import React from "react";

const Table = ({ columns, renderRow, data }) => {
  console.log(data);
  return (
    <table className="w-full md:w-[80%] mt-4">
      <thead>
        <tr className="text-left text-gray-500 text-sm">
          {columns.map((col) => (
            <th key={col.accessor} className={col.className}>
              {col.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>{data && data.map((item) => renderRow(item))}</tbody>
    </table>
  );
};

export default Table;
