import axios from 'axios'
/*
    Rodar com IpV4: json-server --watch -d 180 --host 192.168.0.44 db.json
*/

const api = axios.create({
    baseURL: 'http://192.168.0.44:3000/'
})

export default api; 
