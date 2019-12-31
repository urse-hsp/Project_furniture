    import axios from 'axios'

export const api = {
    read(method,url,data){
        return axios({
            method:method,
            url:url,
            data:data
        }).then(res=>{
            return res.data
        })

    }
};
