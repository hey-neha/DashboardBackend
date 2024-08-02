const connection = require("../dbconnection/connection");

const xlsx = require('xlsx');
const moment = require('moment');

const fileUpload = async (req, res) => {
  try {

    const file = req.file;


    if (!file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    let xlFile = xlsx.readFile(file.path, {
      type: 'binary',
      cellDates: true,
      cellNF: false,
      cellText: false
    });
    let sheet = xlFile.Sheets[xlFile.SheetNames[1]];

    let xl_json = xlsx.utils.sheet_to_json(sheet, {
      raw: false,
    });
    console.log(xl_json);
    console.log("this is the data", xl_json)


    const book = xl_json.map((data) => {
      return {
        Month: data['Month']?? "--",
        SupplierName: data['Supplier Name']?? "--",
        GSTINUIN: data['GSTIN/UIN']?? "--",
        VchNo: data['Vch No.']?? "--",
        VchDate: moment(data['Vch Date']).format('DD-MM-YYYY')?? "--",
        VchType: data['Vch Type']?? "--",
        InvoiceNo: data['Invoice No']?? "--",
        INVDate: moment(data['INV Date']).format('DD-MM-YYYY')?? "--",
        InvoiceValue: data['Invoice Value']?? "--",
        POS: data['POS']?? "--",
        Type: data['Type']?? "--",
        RCM: data['RCM']?? "--",
        SupplyType: data['Supply Type']?? "--",
        TaxableValue: data['Taxable Value']?? "--",
        IGST: data['IGST']?? "--",
        CGST: data['CGST']?? "--",
        SGST: data['SGST']?? "--",
        UpdatedInvNo: data['Invoice No']?? "--",
        Status: 5
      };
    });

    const query = "INSERT INTO book (Month,SupplierName,GSTINUIN, VchNo,VchDate, VchType, InvoiceNo, INVDate, InvoiceValue, POS, Type, RCM, SupplyType, TaxableValue, IGST, CGST, SGST,UpdatedInvNo,Status ) VALUES ?";

    connection.query(query, [book.map((value) => Object.values(value))], (err, data) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({
        message: "Book data created successfully",
        gst: data,
      });
    });
  } catch (error) {
    console.error("An error occurred:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }


};


const postbookdata = (req, res) => {
  const data = {
    id: req.body.id ?? "--",
    Month: req.body.Month ?? "--",
    SupplierName: req.body.SupplierName ?? "--",
    GSTINUIN: req.body.GSTINUIN ?? "--",
    VchNo: req.body.VchNo ?? "--",
    VchDate: req.body.VchDate ?? "--",
    VchType: req.body.VchType ?? "--",
    InvoiceNo: req.body.InvoiceNo ?? "--",
    INVDate: req.body.INVDate ?? "--",
    InvoiceValue: req.body.InvoiceValue ?? "--",
    POS: req.body.POS ?? "--",
    Type: req.body.Type ?? "--",
    RCM: req.body.RCM ?? "--",
    SupplyType: req.body.SupplyType ?? "--",
    TaxableValue: req.body.TaxableValue ?? "--",
    IGST: req.body.IGST ?? "--",
    CGST: req.body.CGST ?? "--",
    SGST: req.body.SGST ?? "--"

  }
  const query = 'INSERT INTO book SET ?';
  connection.query(query, data, (err, data) => {
    console.log(req.body);
    if (err) {
      res.status(500).json({ error: err.message })
    }
    else {
      res.status(201).json({
        message: "BOOK data created successfully"
      })
    }
  })

}


const getbookdata = (req, res) => {
  let sql = 'SELECT book.* ,statuscode.value AS statusValue FROM book LEFT JOIN statuscode ON statuscode.code = book.Status ORDER BY book.id';
  connection.query(sql, (err, data) => {
    if (err) {
      res.status(200).json({ error: err.message });
    }
    res.status(200).json({
      message: "All records found",
      book: data

    });

  })

}


const deletebookdata = async (req, res) => {
  try {
    const { id } = req.params;
    let sql = 'DELETE FROM book WHERE id = ?';


    await connection.promise().query(sql, [id]);

    res.status(200).send('Book data deleted successfully');
  } catch (error) {
    res.status(500).send(`Failed to delete book data: ${error.message}`);
  }

}

  const updatebookdata = async (req, res) => {
    try {
      
      
        const { Month, SupplierName, GSTINUIN, VchNo, VchDate, VchType, InvoiceNo, INVDate, InvoiceValue, POS, Type, SupplyType, TaxableValue, IGST, CGST, SGST, Status } = req.params;
        let sql = 'UPDATE book SET Month=?, SupplierName=?, GSTINUIN=?, VchNo=?, VchDate=?, VchType=?, InvoiceNo=?, INVDate=?, InvoiceValue=?, POS=?, Type=?, SupplyType=?, TaxableValue=?, IGST=?, CGST=?, SGST=?, Status=? WHERE id = ?';
        
        await connection.promise().query(sql, [Month, SupplierName, GSTINUIN, VchNo, VchDate, VchType, InvoiceNo, INVDate, InvoiceValue, POS, Type, SupplyType, TaxableValue, IGST, CGST, SGST, Status]);
    
        res.status(200).send('Book data updated successfully');
      } catch (error) {
        res.status(500).send(`Failed to update book data: ${error.message}`);
      }
    

    
    

  }




module.exports = { getbookdata, postbookdata, fileUpload, deletebookdata, updatebookdata};
