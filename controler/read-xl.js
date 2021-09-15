const reader = require('xlsx')
const readXlsxFile = require('read-excel-file/node')
const fs = require('fs');
const path = require('path');
const db = require("../db/connection")
const productSeq = require('../modal/product')
const ExcelJs = require('exceljs')
const moment = require('moment')
exports.xlsx = function (req, res, next) {

    let xlxPath = path.join(__dirname, '../public/docs/product.xlsx')  // File path.

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

    // const workBook = reader.readFile(xlxPath)
    // const worksheet = reader.utils.sheet_to_json(workBook.Sheets[workBook.SheetNames[0]])
    // let data = []
    // console.log(worksheet.length)
    // worksheet.forEach((element, index) => {
    //     if (index != 0) {
    //         data.push(element)
    //     }
    // })
    // res.status(200).json(data)

    // exporting excel sheet data 

    const workBook = new ExcelJs.Workbook()
    const worksheet = workBook.addWorksheet('My Users')
    worksheet.columns = [
        { header: "product_id", key: "product_id", width: 20 },
        { header: "product_name", key: "product_name", width: 20 },
        { header: "description", key: "description", width: 20 },
        { header: "price", key: "price", width: 20 },
        { header: "image", key: "image", width: 20 },
        { header: "offer", key: "offer", width: 20 },
        { header: "createdBy", key: "createdBy", width: 20 },
        { header: "published", key: "published", width: 20 },
        { header: "createdAt", key: "createdAt", width: 20 },
        { header: "updatedAt", key: "updatedAt", width: 20 },
    ]
    db.authenticate().then(() => {
        const startDate = moment(new Date()).startOf('month').toDate();
        const endDate = moment(new Date()).endOf('month').toDate();
        console.log(startDate)
        productSeq.products.findAll({
            createdAt: {
                $gte: startDate,
                $lte: endDate
            }
        }, { rows: true }).then((result) => {
            console.log(JSON.stringify(result), "test")

            result.forEach((element) => {
                console.log("coming inside")
                worksheet.addRow(element)
            })
            worksheet.getRow(1).eachCell((cell) => {
                cell.font = { bold: true }
            })
            workBook.xlsx.writeFile("product.xlsx").then((result) => {
                console.log("done")
                // console.log(worksheet)
                var filePath = path.join(__dirname, '../product.xlsx'); // Or format the path using the `id` rest param
                var fileName = "product.xlsx"; // The default name the browser will use
                res.download(filePath, fileName);
                // res.status(200).json(result)
            }).catch((error) => {
                console.log(error)
            })

        }).catch((error) => {
            console.log(error)
        })
    })
    // console.log(worksheet)
}

