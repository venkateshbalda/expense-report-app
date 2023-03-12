import { useState } from "react";
import { accountsApi } from "./accountsApi";
import { config } from "./config";

export function UpdateAccountForm(props){

    const [updateAccountForm, setUpdateAccountForm] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("kochi kochi");
        let apiurl = config.updateAccountApiUrl;
        let mapping = "POST";
        let requestBody = {
            "id":parseFloat(e.target[0].value),
            "amount":parseFloat(e.target[2].value),
            "account_name":e.target[1].value
        };
        requestBody = JSON.stringify(requestBody);
        let requestId;
        const data = await accountsApi(apiurl, mapping, requestBody, requestId);
        console.log(data);
        props.refreshGetAccounts();
    };
    return(
        <div>
            <form onSubmit={handleSubmit}>
                <input type="hidden" defaultValue={props.account.id}></input>
                <input type="text" defaultValue={props.account.account_name}></input>
                <input type="number" defaultValue={props.account.amount}></input>
                <button type="submit">save</button>
            </form>
        </div>
    );
}