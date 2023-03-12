import { useEffect, useState } from "react";
import { AddExpense } from "./AddExpense";
import { config } from "./config";
import { DeleteAccount } from "./DeleteAccount";
import { DeleteExpense } from "./DeleteExpense";
import { expensesApi } from "./expensesApi";
import { UpdateExpenseForm } from "./UpdateExpenseForm";

export function GetExpenses(props){

    const [expenseData, setExpenseData] = useState([]);
    const [selectedExpense, setSelectedExpense] = useState(null);

    const handleUpdateClick = (expense) => {
        console.log("expense :", expense.id);
        if(selectedExpense && selectedExpense.id === expense.id){
            setSelectedExpense({});
        } else{
            setSelectedExpense(expense);
        }
        console.log("selectedExpense:", selectedExpense);
    };

    const getExpenses = async () => {
        let mapping = "GET";
        let apiurl = config.getAllExpensesApiUrl;
        let requestBody;
        let requestId;
        const data = await expensesApi(apiurl, mapping, requestBody, requestId);
        console.log(data);
        setExpenseData(data);
    }

    const refreshGetExpenses = () => {
        getExpenses();
        props.refreshTotalAmount();
    }

    useEffect(() => {
        getExpenses();
    },[]);

    useEffect(() => {
        getExpenses();
    },[props.refreshData]);

    return(
        <div>
            <h2>expense data</h2>
            {expenseData && (
                <div>
                    {expenseData.map((expense) => (
                        <div key={expense.id}>
                            <div onClick={() => handleUpdateClick(expense)}>
                                {expense.accountid}, {expense.amount},{expense.category},{expense.description},{expense.type},{expense.date}
                            </div>
                            {selectedExpense && selectedExpense.id === expense.id && (
                                <div>
                                    <UpdateExpenseForm expense={expense} refreshGetExpenses={refreshGetExpenses}></UpdateExpenseForm>
                                    <DeleteExpense id={expense.id} refreshGetExpenses={refreshGetExpenses}/>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
            <AddExpense refreshGetExpenses={refreshGetExpenses}/>
        </div>
    );
}