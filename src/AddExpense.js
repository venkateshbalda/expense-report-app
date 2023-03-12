import { config } from "./config";
import { expensesApi } from "./expensesApi";

export function AddExpense(props){

    const addExpense = async (e) => {
        e.preventDefault();
        console.log("add expense submit");
        let mapping="POST";
        let apiurl;
        let addExpenseApiUrl = config.addExpenseApiUrl;
        let addIncomeApiUrl = config.addIncomeApiUrl;
        let date = new Date().toISOString().slice(0, 10);
        let type=e.target[2].value;
        //let type="expense"
        if(type === "expense"){
            apiurl = addExpenseApiUrl;
        }else{
            apiurl = addIncomeApiUrl;
        }
        let requestId;
        let requestBody = {
            "accountid":parseInt(e.target[0].value),
            "amount":parseFloat(e.target[1].value),
            "type": type,
            "description": e.target[3].value,
            "category": e.target[4].value,
            "date": date,
            "userPojo":{
                "id":config.currentLoggedinUserId
            }
        };
        requestBody = JSON.stringify(requestBody);
        const data = await expensesApi(apiurl, mapping, requestBody, requestId);
        console.log(data);
        props.refreshGetExpenses();
    };

    return(
        <div>
            <form onSubmit={addExpense}>
                Account id :<input type="number"></input>
                Amount :<input type="number"></input>
                Type : <input type="text"></input>
                Description : <input type="text"></input>
                Category : <input type="text"></input>
                <button type="submit">Save</button>
            </form>
        </div>
    );
}