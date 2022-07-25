# pos_codetest_nodeapp

#Getting Start Wiht nodejs

### `pm2 start ecosystem.confit.js --env production`
Run node process with PM2 process manager


The page will reload when you make changes.\
You may also see any lint errors in the console.

POS Restful API

Domain : http://api.my-cmss.com

--------------------------------------------
	--- Invoice Create API --
--------------------------------------------

Url : BOTAPI + /auth/invoice
Desc: "This api create new invoice";

header: {
    "Content-Type":"application/json",
    “Authorization”: “Basic Y2xpZW50eDpUaEBSQFBAM1JPQERDQFM3”
}

Request Param: {
    "customer_name":"Ha ha",
    "saleperson_name":"Hoo",
    "date":"12/12/2022",
    "products":[
        {"name":"iPhone 13 Pro","image":"https://www.apple.com/v/iphone-13-pro/g/images/key-features/compare/compare_iphone_13_pro__ezrebuldmju6_large.jpg","price":999,"stock":2}
    ],
    total_amount: 999
}
Response: {
    "status": true,
    "msg": "Inseted new data successfully.",
    "data": {
        "_id": "62ddfccecce7ff35b118898e",
        "id": 8,
        "customer_name": "Ha ha",
        "saleperson_name": "Hoo",
        "date": "2022-12-12T00:00:00.000Z",
        "products": [
            {
                "name": "iPhone 13 Pro",
                "image": "https://www.apple.com/v/iphone-13-pro/g/images/key-features/compare/compare_iphone_13_pro__ezrebuldmju6_large.jpg",
                "price": 999,
                "stock": 2
            }
        ],
        "total_amount": 999,
        "created_at": "2022-07-25T02:15:42.602Z",
        "updated_at": "2022-07-25T02:15:42.602Z"
    }
}

--------------------------------------------
	--- Invoice Create API --
--------------------------------------------

Url : DOMAIN + /auth/invoice
Desc: "This api create new invoice";

header: {
    "Content-Type":"application/json",
    “Authorization”: “Basic Y2xpZW50eDpUaEBSQFBAM1JPQERDQFM3”
}

Request Param: {
    "customer_name":"Ha ha",
    "saleperson_name":"Hoo",
    "date":"12/12/2022",
    "products":[
        {"name":"iPhone 13 Pro","image":"https://www.apple.com/v/iphone-13-pro/g/images/key-features/compare/compare_iphone_13_pro__ezrebuldmju6_large.jpg","price":999,"stock":2}
    ],
    total_amount: 999
}


--------------------------------------------
	--- Invoice Fetch API --
--------------------------------------------

Url : DOMAIN + /auth/nvoices
Desc: "This api fetch invoices";

header: {
    "Content-Type":"application/json",
    “Authorization”: “Basic Y2xpZW50eDpUaEBSQFBAM1JPQERDQFM3”
}

Request Param: {
    "count":2,
    "pagenum":2
}
Response: {
    "status": true,
    "data": [
        {
            "_id": "62ddf843cce7ff35b1188986",
            "id": 7,
            "customer_name": "May",
            "saleperson_name": "ko ko",
            "date": "2022-07-23T00:00:00.000Z",
            "products": [
                {
                    "name": "iPhone 12",
                    "image": "https://www.apple.com/v/iphone-13-pro/g/images/key-features/compare/compare_iphone_12__fk7mpufyl1u2_large.jpg",
                    "price": 599,
                    "stock": 100
                }
            ],
            "total_amount": 599
        } ]
}

--------------------------------------------
	--- Invoice Chart Data API --
--------------------------------------------

Url : DOMAIN + /auth/nvoices
Desc: "This api fetch invoices";

header: {
    "Content-Type":"application/json",
    “Authorization”: “Basic Y2xpZW50eDpUaEBSQFBAM1JPQERDQFM3”
}

Request Param: {
    "timerange":"daily"
}

Response: {
   "status": true,
    "data": [
        {
            "_id": "2022-07-20",
            "count": 429
        }
     ]
}
