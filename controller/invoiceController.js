const invoiceMdl = require("../model/invoice");
const mongo = require("../mongo")

let list = async function(req,res){
    
    try {

        let skip = req.body.count * (req.body.pagenum - 1);
        let totalCount = await invoiceMdl.find().count();
        
        let sort = {id:-1};
        let q = {};
        
        let data = await  invoiceMdl
                    .find(q,
                    ['id','products','customer_name','saleperson_name','date','total_amount'], // Columns to Return
                    {
                        skip:skip, // Starting Row
                        limit:req.body.count, // Ending Row
                        sort:sort
                    })
                    ;
        console.log("data",data);

        res.send({
            status: true,
            data:data,
            totalCount:totalCount

        });

        // let data = await invoiceMdl
        //             .find(q)
        //             .sort(sort)
        //             .skip(skip)
        //             .limit(req.body.count)
        //             .toArray();

        //send response
       
        
    } catch (err) {
    
        res.status(500).send(err);
        console.log(err);
    
    }
}

let add = async function(req,res){
    
    try {

        console.log(req.body);
        
        let invoice = new invoiceMdl();
        invoice.id = await mongo.getID("invoices");
        invoice.customer_name = req.body.customer_name;
        invoice.saleperson_name = req.body.saleperson_name;
        invoice.date = req.body.date;
        invoice.products = req.body.products;
        invoice.total_amount = req.body.total_amount;
        invoice.created_at = new Date();
        invoice.updated_at = new Date();
        invoice.save();
        
        console.log("Saved");

        //send response
        res.send({
            status: true,
            "msg": "Inseted new data successfully.",
            data:invoice
        });
        
    } catch (err) {
    
        res.status(500).send(err);
        console.log(err);
    
    }
}
module.exports = {
    list,
    add
}