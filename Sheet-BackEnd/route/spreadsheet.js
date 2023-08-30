const express = require("express");
const router = express.Router();
const Sheet = require("../model/Sheet");

//Route 1 for sheet data: insert sheet data into mongodb : POST '/api/sheet/addingdata'.
router.post(
  "/addingsheetdata",async (req, res) => {
    try { 

    //   console.log(req.body);
  //  const sheet = Sheet(req.body);
  //   sheet.save();     
  //   res.send(req.body);

    const {cell_A,cell_B,cell_C,cell_D,cell_E} = req.body;  
    const sheet = new Sheet({
         cell_A,
         cell_B,
         cell_C,
         cell_D,
         cell_E
      });

     const saveData = await sheet.save();
     res.json(saveData);

      //insert sheet data
    //   let sheet = await Sheet.create({
    //      cell_A: req.body.cell_A,
    //      cell_B: req.body.cell_B,
    //      cell_C: req.body.cell_C,
    //      cell_D: req.body.cell_D,
    //      cell_E: req.body.cell_E,
    // });
    //    res.json(sheet);
     // res.send("hello")
   
      } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error!");
    }
  }
);

module.exports = router;

