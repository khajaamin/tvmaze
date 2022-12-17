import axios from 'axios'
const headers = {
    "Content-Type":"application/json",
}

export async function get(url){
    return await axios.get(url,{headers:headers}).then((response)=>{
        return response.data;
    });
}