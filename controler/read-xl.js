const reader = require('xlsx')
const readXlsxFile = require('read-excel-file/node')
const fs = require('fs');
const path = require('path');
const db = require("../db/connection")
const productSeq = require('../modal/product')
exports.xlsx = function (req, res, next) {

    let xlxPath = path.join(__dirname, '../public/docs/product.xlsx')  // File path.
    db.authenticate().then(() => {
        console.log("AUTHORIZED")
        productSeq.products.findAll({ row: true }).then((rows) => {
            console.log(rows)
        }).catch((error) => {
            console.log(error)
        })
    })


    // 1st way to read the excel file 

    // readXlsxFile(xlxPath).then((rows) => {
    //     res.status(200).json({ data: rows, statusCode: 200 }) // `rows` is an array of rows & each row being an array of cells.
    // }).catch((err) => {
    //     res.status(400).json({ message: "unable to read", statusCode: 400 })
    // })

    // 2nd way to read the excel file 


    // Readable Stream.
    // readXlsxFile(fs.createReadStream(xlxPath), { sheet: 1 }).then((rows) => {

    //     res.status(200).json({ data: rows, statusCode: 200 })
    // }).catch((err) => {
    //     res.status(400).json({ message: "unable to read", statusCode: 400 })
    // })

    //sending xl file as response

    const workBook = reader.readFile(xlxPath)
    const worksheet = reader.utils.sheet_to_json(workBook.Sheets[workBook.SheetNames[0]])
    let data = []
    console.log(worksheet.length)
    worksheet.forEach((element, index) => {
        if (index != 0) {
            data.push(element)
        }
    })
    res.status(200).json(data)


}

