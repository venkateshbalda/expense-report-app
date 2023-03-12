import { useEffect } from "react";
import { config } from "./config";
import { expensesApi } from "./expensesApi";

export function UpdateExpenseForm(props){

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("expense update form submit");
        let mapping="POST";
        let apiurl;
        let updateExpenseApiUrl=config.updateExpenseApiUrl;
        let updateIncomeApiUrl=config.updateIncomeApiUrl;
        let date = new Date().toISOString().slice(0, 10);
        let type=e.target[3].value;
        //let type="expense"
        if(type === "expense"){
            apiurl = updateExpenseApiUrl;
        }else{
            apiurl = updateIncomeApiUrl;
        }
        let requestId;
        let requestBody = {
            "id":parseInt(e.target[0].value),
            "accountid":parseInt(e.target[1].value),
            "amount":parseFloat(e.target[2].value),
            "type": type,
            "description": e.target[4].value,
            "category": e.target[5].value,
            "date": date,
            "userPojo":{
                "id":config.currentLoggedinUserId
            }
        };
        /*let requestBody={
            "id": 1,
            "accountid": 0,
            "amount": 100,
            "date": "2023-03-04",
            "type": "",
            "description": "tea",
            "category": "beverages",
            "userPojo": {
              "id": 1,
              "username": "venky",
              "password": "1234",
              "role": "admin"
            }
          };*/
        requestBody = JSON.stringify(requestBody);
        const data = await expensesApi(apiurl, mapping, requestBody, requestId);
        console.log(data);
        props.refreshGetExpenses();
    };


    return(
        <div>
            
            <form onSubmit={handleSubmit}>
                <input type="hidden" defaultValue={props.expense.id}></input>
                <input type="number" defaultValue={props.expense.accountid}></input>
                <input type="number" defaultValue={props.expense.amount}></input>
                <input type="text" defaultValue={props.expense.type}></input>
                <input type="text" defaultValue={props.expense.description}></input>
                <input type="text" defaultValue={props.expense.category}></input>
                <button type="submit">Save</button>
            </form>
        </div>
    );
}