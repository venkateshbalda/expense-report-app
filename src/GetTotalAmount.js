
import { useEffect, useState } from "react";
import { accountsApi } from "./accountsApi.js";
import { config } from "./config.js"

export function GetTotalAmount(props){
    
    const [totalAmount, setTotalAmount] = useState(null);

    const getTotalAmount = async () => {
        let mapping = "GET";
        let apiurl = config.getTotalAmountApiUrl;
        let requestBody;
        let requestId = config.currentLoggedinUserId;
        const data = await accountsApi(apiurl, mapping, requestBody, requestId);
        console.log(data);
        setTotalAmount(data)
    }

    useEffect(() => {
        getTotalAmount();
    },[props.refreshData]);
    return(
        <div>
            Total Amount in hand : {totalAmount}
        </div>
    );
}