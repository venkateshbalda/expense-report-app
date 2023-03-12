import { useEffect } from "react";
import { accountsApi } from "./accountsApi";
import { config } from "./config";
import { GetAccounts } from "./GetAccounts";

export function DeleteAccount(props){
    const deleteAccountData = async () => {
        let apiurl = config.deleteAccountApiUrl;
        let method = "DELETE";
        let requestBody;
        let requestId=props.id;
        const data = await accountsApi(apiurl, method, requestBody, requestId);
        console.log(data);
        props.refreshGetAccounts();
    }
    return(
            <button onClick={deleteAccountData}>delete</button>
    );
}