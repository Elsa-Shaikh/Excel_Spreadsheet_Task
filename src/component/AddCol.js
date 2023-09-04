import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";

const AddCol = (props) => {
  let initTableData;
  const [tableData, setTable] = useState([initTableData]);
  const [colData, setCol] = useState([initTableData]);
  const [data, setData] = useState({
    cell_A: "",
    cell: "",
  });

  let id;

  let name, value;
  const handleChange = (onChnageValue, i) => {
    const inputData = [...tableData];
    inputData[i] = onChnageValue.target.value;
    setTable(inputData);
    name = onChnageValue.target.name;
    value = onChnageValue.target.value;
    setData({ ...data, [name]: value });
  };

  console.log("data", tableData);

  const onAddRow = () => {
    //     console.log("Adding a Row");
    const addRow = [...tableData, []];
    setTable(addRow);
  };
  const onAddColumn = () => {
    //     console.log("Adding a Column");
    const addcol = [...colData, []];
    setCol(addcol);
  };

  const onRemoveRow = () => {
    //     console.log("Removing a Row");
    id = tableData.length - 1;
    const remove = [...tableData];
    remove.splice(id);
    setTable(remove);
    localStorage.setItem("tableData", JSON.stringify(tableData));
  };

  const onRemoveColumn = () => {
    //     console.log("Removing a Column");
    id = colData.length - 1;
    const remove = [...colData];
    remove.splice(id);
    setCol(remove);
    localStorage.setItem("colData", JSON.stringify(colData));
  };

  useEffect(() => {
    localStorage.setItem("tableData", JSON.stringify(tableData));
  }, [tableData]);
  useEffect(() => {
    localStorage.setItem("tableData", JSON.stringify(colData));
  }, [colData]);

  return (
    <>
      <div className="container my-3">
        <table>
          <thead>
            <tr>
              <th colSpan={colData.length + 2} className="ttitle border">
                {" "}
                {props.title}
              </th>
            </tr>
            <tr>
              <th colSpan={colData.length + 2} className="insideT border">
                <span>fx </span> <input type="text" className="border" />
              </th>
            </tr>
            <tr>
              <th className="out border">
                {" "}
                <input type="text" disabled />{" "}
              </th>
              <th className="style border">A</th>
              {colData.map((data, i) => {
                i++;
                return <th className="style border">Col-{i}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            {tableData.map((data, i) => {
              i++;
              return (
                <tr>
                  <td className="style border">Row-{i}</td>
                  <td className="border">
                    <input
                      type="text"
                      name="cell_A"
                      className="border-none"
                      onChange={(e) => handleChange(e, i)}
                    />
                  </td>
                  {colData.map((data, i) => {
                    i++;
                    return (
                      <td className="border">
                        <input
                          type="text"
                          name="cell"
                          className="border-none"
                          onChange={(e) => handleChange(e, i)}
                        />
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={colData.length + 2} className="blank">
                {" "}
              </td>
            </tr>
            <tr>
              <td colSpan={colData.length + 2} className="border">
                <button className="btn-custom" onClick={onAddRow}>
                  Add Row
                </button>
                <button className="btn-custom" onClick={onRemoveRow}>
                  Remove Row
                </button>
                <button className="btn-custom" onClick={onAddColumn}>
                  Add Column
                </button>
                <button className="btn-custom" onClick={onRemoveColumn}>
                  Remove Column
                </button>
                <input type="text" className="box" disabled />
                <span>Enter Row: </span>
                <input type="text" className="box" disabled />
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </>
  );
};

export default AddCol;
AddCol.propTypes = {
  title: PropTypes.string.isRequired,
};

AddCol.defaultProps = {
  title: "Set Your Title Here",
};
