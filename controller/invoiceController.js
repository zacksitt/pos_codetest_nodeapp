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

let get_report_data = async function(req,res){
    
    try {
        let timerange = req.body.timerange;
        console.log(timerange);
        let group = {};
        if(timerange == "daily"){
            group = {_id:{$dateToString:{format:"%Y-%m-%d",date:"$date"}},count:{$sum:"$total_amount"}};
        
        }else if(timerange == "weekly"){

            group = {_id:{$dateToString:{format:"%U %Y",date:"$date"}},weekNumber:{$first:{$dateToString:{format:"%U",date:"$date"}}},count:{$sum:"$total_amount"}};

        }else{
            group = {_id:{$dateToString:{format:"%m",date:"$date"}},createdDate:{$first:{$dateToString:{format:"%Y-%m-%d",date:"$date"}}},count:{$sum:"$total_amount"}};
        }

        let data = await invoiceMdl.aggregate([
          
            {
                $group:group
                //$group:{_id:{$dateToString:{format:"%Y-%m-%d",date:"$date"}},count:{$sum:"$total_amount"}}
                //$group:{_id:{$dayOfWeek:"$date"},count:{$sum:"$total_amount"}}
            },
            {
                $sort:{_id:1}
            }
        ]);
        
        res.send({

            status: true,
            data:data
        });
        
    } catch (err) {
    
        res.status(500).send(err);
        console.error(err);
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
    add,
    get_report_data
}