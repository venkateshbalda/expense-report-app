import { useEffect } from "react";
import { accountsApi } from "./accountsApi";
import { config } from "./config";
import { GetAccounts } from "./GetAccounts";

export function UpdateAccount(props){

    const updateAccountdata = async () => {
        let apiurl = config.updateAccountApiUrl;
        let mapping = "POST";
        let requestBody = {
            "id":2,
            "amount":9332
        };
        requestBody = JSON.stringify(requestBody);
        let requestId;
        console.log(props.account);
        const data = await accountsApi(apiurl, mapping, requestBody, requestId);
        console.log(data);
    }

    return(
            <button onClick={updateAccountdata}>update</button>
            
    );
}