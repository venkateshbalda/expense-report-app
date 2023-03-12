import { useEffect } from "react";
import { accountsApi } from "./accountsApi";
import { config } from "./config";
import { expensesApi } from "./expensesApi";

export function DeleteExpense(props){
    const deleteExpenseData = async () => {
        console.log("expense id :", props.id);
        let apiurl = config.deleteExpenseApiUrl;
        let mapping = "DELETE";
        let requestBody;
        let requestId=props.id;
        const data = await expensesApi(apiurl, mapping, requestBody, requestId);
        console.log(data);
        props.refreshGetExpenses();
    }
    return(
            <button onClick={deleteExpenseData}>delete</button>
    );
}