import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

export default function Spreadsheet(props) {
    let initTableData;
    const [tableData, setTable] = useState([initTableData]);

    let id;

    if(localStorage.getItem("tableData")===null){
      initTableData =[];
    }
    else{
      initTableData = JSON.parse(localStorage.getItem("tableData"));
    }

    const handleChange=(onChnageValue,i)=>{
    const inputData = [...tableData]
       inputData[i] = onChnageValue.target.value;
       setTable(inputData);
    }    
    console.log("data",tableData);
    
    const onAdd = ()=>{
//     console.log("Adding a Row");
     const addRow = [...tableData,[]]
     setTable(addRow)
    }
    useEffect(()=>{
        localStorage.setItem("tableData",JSON.stringify(tableData));
      },[tableData]);
    
    const onRemove = ()=>{
  //      console.log("Removing a Row");
        id = tableData.length-1;
    //    console.log(id);
        const remove = [...tableData]
        remove.splice(id);
        setTable(remove);
        localStorage.setItem("tableData",JSON.stringify(tableData));
    }
   


    return (
        <>
        <div className="container my-3">
          <table>
            <thead>
            <tr>
                <th colSpan={6} className="ttitle border"> {props.title}</th>
            </tr>
            <tr>
                <th colSpan={6} className="insideT border"><span>fx </span> <input type="text" className="border" /></th>
            </tr>
             <tr>
               <th className="out border"> <input type="text" disabled />  </th>
               <th className="style border">A</th>
               <th className="style border">B</th>
               <th className="style border">C</th>
               <th className="style border">D</th>
               <th className="style border">E</th>
                </tr>
                </thead>
                <tbody>
                    {
                        tableData.map((data,i)=>{
                            i++;
                            return(
                    <tr>
                    <td className="style border">{i}</td>
                    <td className="border"><input type="text" className="border-none" onChange={e=>handleChange(e,i)} /></td>
                    <td className="border"><input type="text" className="border-none" onChange={e=>handleChange(e,i)} /></td>
                    <td className="border"><input type="text" className="border-none" onChange={e=>handleChange(e,i)}/></td>
                    <td className="border"><input type="text" className="border-none" onChange={e=>handleChange(e,i)}/></td>
                    <td className="border"><input type="text" className="border-none" onChange={e=>handleChange(e,i)}/></td>
                     </tr>)
        })
    }
                </tbody>
                <tfoot>
                <tr>
                    <td colSpan={6} className="blank"> </td>
                </tr>
                <tr>
                    <td colSpan={6} className='border'>
                   
                    <button className="btn-custom" onClick={onAdd}>Add</button>
                    <button className="btn-custom" onClick={onRemove}>Remove</button>
                   
                    <input type="text" className="box" disabled />
                    <span>Enter Row: </span>
                    <input type="text" className="box" disabled/>
                    </td>
                </tr>
                </tfoot>
          </table>     
            
        </div>  
        </>
      )
    
}


Spreadsheet.propTypes = {
    title: PropTypes.string.isRequired,
}

Spreadsheet.defaultProps = {
    title: "Set Your Title Here",
}
