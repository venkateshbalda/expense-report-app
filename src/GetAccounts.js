import { useEffect, useState } from "react";
import { accountsApi } from "./accountsApi";
import { config } from "./config.js"
import { DeleteAccount } from "./DeleteAccount.js";
import { UpdateAccount } from "./UpdateAccout";
import { UpdateAccountForm } from "./UpdateAccoutForm";
import { GetTotalAmount } from "./GetTotalAmount";
import { AddAccount } from "./AddAccount";

export function GetAccounts(props){
    const [accountsData, setAccountsData] = useState([]);
    const [updateaccountData, setUpdateAccountData] = useState({id:'',amount: '', account_name :''});
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [isButtonVisible, setIsButtonVisible] = useState(false);
    const [selectedAccount, setSelectedAccount] = useState(null);
    const [refreshData, setRefreshData] = useState(null)


    const handleUpdateClick = (account) => {
        if (selectedAccount && selectedAccount.id === account.id) {
            // if the same account is clicked again, deselect it
            setSelectedAccount(null);
        } else {
            setSelectedAccount(account);
        }
        console.log("selected Account :", {selectedAccount});
    };

    const getaccountsdata = async () => {
        let mapping = "GET";
        let apiurl = config.getAccountsApiUrl;
        let requestBody;
        let requestId;
        const data = await accountsApi(apiurl, mapping, requestBody, requestId);
        console.log(data);
        setAccountsData(data);
    }

    useEffect(() => {
        getaccountsdata();
    },[]);

    useEffect(() => {
        getaccountsdata();
    },[props.refreshData]);


    const refreshGetAccounts = () => {
        getaccountsdata();
        props.refreshTotalAmount();
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(e.target[0].value);
    } 




    return(
        <div>
            <h2>Account info onLoad</h2>
            {accountsData && (
                <div>
                    {accountsData.map((account) => (
                        <div key={account.id}>
                            <div onClick={() => handleUpdateClick(account)}>
                                {account.amount}, {account.account_name}
                            </div>
                            { selectedAccount && selectedAccount.id === account.id && (
                                <div>
                                    <UpdateAccountForm account={account} refreshGetAccounts={refreshGetAccounts}/>
                                    <DeleteAccount id={account.id} refreshGetAccounts={refreshGetAccounts}/>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
            <AddAccount refreshGetAccounts={refreshGetAccounts}/>
        </div>
    );
}
