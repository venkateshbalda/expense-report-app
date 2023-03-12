import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

import { GetAccounts } from './GetAccounts';
import { UpdateAccount } from './UpdateAccout';
import { AddAccount } from './AddAccount';
import { DeleteAccount } from './DeleteAccount';
import { GetTotalAmount } from './GetTotalAmount';
import { GetExpenses } from './GetExpenses';
import { UpdateExpenseForm } from './UpdateExpenseForm';

function App() {

  const [refreshData, setRefreshData] = useState();
  const [refreshGetAllAccounts, setRefreshGetAllAccounts] = useState();

  return (
    <div className="App">
      <GetAccounts refreshTotalAmount={() => setRefreshData(Date.now())} refreshData={refreshData}/>
      <GetTotalAmount refreshData={refreshData}/>
      <br></br>
      <br></br>
      <GetExpenses refreshTotalAmount={() => setRefreshData(Date.now())} refreshData={refreshData}/>
    </div>
  );
}

export default App;
