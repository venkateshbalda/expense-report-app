
export const expensesApi = async (apiurl, mapping, requestBody, requestId) => {
    try{
        let url = apiurl;
        if(requestId){
            url = `${url}/${requestId}`;
        }
        console.log(url);
        console.log(mapping);
        console.log(requestBody);
        console.log(requestId);
        const response = await fetch(url,{
            method: mapping,
            headers:{
                "Content-Type":"application/json"
            },
            body: requestBody
        });
        const data = await response.json();
        console.log(data);
        return data;
    }catch(error){
        console.error(error);
    }
}