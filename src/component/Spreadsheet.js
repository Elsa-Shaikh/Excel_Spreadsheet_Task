import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

export default function Spreadsheet(props) {
    let initTableData;
    const [tableData, setTable] = useState([initTableData]);
    const [data, setData] = useState({
      cell_A: "",
      cell_B: "",
      cell_C: "",
      cell_D: "",
      cell_E: "",
    });

    let id;

    if(localStorage.getItem("tableData")===null){
      initTableData =[];
    }
    else{
      initTableData = JSON.parse(localStorage.getItem("tableData"));
    }
    let name,value;
    const handleChange=(onChnageValue,i)=>{
    const inputData = [...tableData]
       inputData[i] = onChnageValue.target.value;
       setTable(inputData);
       name= onChnageValue.target.name;
       value= onChnageValue.target.value;
       setData({...data, [name]:value});
       
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
    
    const insertData = async(e)=>{
       e.preventDefault();
       const {cell_A,cell_B,cell_C,cell_D,cell_E} = data;
       const res = await fetch("/api/sheet/addingsheetdata",{
        method :"POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify({
          cell_A,
          cell_B,
          cell_C,
          cell_D,
          cell_E
        })
       });
       const getData = await res.json();
       if(getData.status === 422 || !getData){
        alert("Failed To Insert!");
        console.log("Failed!!");
       } 
       else{
        alert("Inserted!");
        console.log("success!!");
       }
     }


    return (
        <>
        <div className="container my-3">
          <table>
            <thead>
            <tr>
                <th colSpan={7} className="ttitle border"> {props.title}</th>
            </tr>
            <tr>
                <th colSpan={7} className="insideT border"><span>fx </span> <input type="text" className="border" /></th>
            </tr>
             <tr>
               <th className="out border"> <input type="text" disabled />  </th>
               <th className="style border">A</th>
               <th className="style border">B</th>
               <th className="style border">C</th>
               <th className="style border">D</th>
               <th className="style border">E</th>           
               <th className='style border'>Action</th>
                </tr>
                </thead>
                <tbody>
                    
                    {
                        tableData.map((data,i)=>{
                            i++;
                            return(
                    <tr>
                    <td className="style border">{i}</td>
                    <td className="border"><input type="text" name='cell_A' className="border-none" onChange={e=>handleChange(e,i)} /></td>
                    <td className="border"><input type="text" name='cell_B' className="border-none" onChange={e=>handleChange(e,i)} /></td>
                    <td className="border"><input type="text" name='cell_C' className="border-none" onChange={e=>handleChange(e,i)}/></td>
                    <td className="border"><input type="text" name='cell_D' className="border-none" onChange={e=>handleChange(e,i)}/></td>
                    <td className="border"><input type="text" name='cell_E' className="border-none" onChange={e=>handleChange(e,i)}/></td>
                    <td><button type='button' className='btn btn-dark btn-sm' onClick={insertData}> Insert </button></td> 
                     </tr>)
        })
    }
    
                </tbody>
                <tfoot>
                <tr>
                    <td colSpan={7} className="blank"> </td>
                </tr>
                <tr>
                    <td colSpan={7} className='border'>
                   
                    <button className="btn-custom" onClick={onAdd}>Add Row</button>
                    <button className="btn-custom" onClick={onRemove}>Remove Row</button>
                   
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
