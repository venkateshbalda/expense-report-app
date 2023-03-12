import { useEffect } from "react";
import { accountsApi } from "./accountsApi";
import { config } from "./config";
import { GetAccounts } from "./GetAccounts";

export function AddAccount(props){
    const addAccountdata = async (e) => {
        e.preventDefault();
        let apiurl = config.addAccountApiUrl;
        let mapping = "POST";
        let requestBody = {
            "amount": parseFloat(e.target[1].value),
            "account_name":e.target[0].value,
            "userPojo":{
                "id":config.currentLoggedinUserId
            }
        };
        requestBody = JSON.stringify(requestBody);
        let requestId;
        let data = await accountsApi(apiurl, mapping, requestBody, requestId);
        console.log(data);
        props.refreshGetAccounts();
        
    };


    return(
        <div>
            <form onSubmit={addAccountdata}>
                Account name : <input type="text"></input>
                Amount : <input type="number"></input>
                <button type="submit">save</button>
            </form>
        </div>
    );
}