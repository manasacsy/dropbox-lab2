import {reactLocalStorage} from 'reactjs-localstorage';
const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:3005';

const headers = {
    'Accept': 'application/json'
};  

export const doLogin = (payload) =>
    fetch(`${api}/loginAction`, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }).then(res => {
        return res.json();
    })
        .catch(error => {
            console.log("This is error");
            return error;
        });

export const doSignup = (payload) =>
    fetch(`${api}/signUp`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }).then(res => {
        return res.json();
    })
        .catch(error => {
            console.log("This is error");
            return error;
        });


export const uploadFileGroup = (payload,groupId) =>    fetch(`${api}/uploadFileGroup/`+groupId + "/" +reactLocalStorage.get('userid') , {
        method: 'POST',
        body: payload
    }).then(res => {
        return res.json();
    }).catch(error => {
            console.log("This is error");
            return error;
        });

export const uploadFile = (payload,currentFolder) =>
    fetch(`${api}/files/upload/`+currentFolder+"/"+reactLocalStorage.get('userid'), {
        method: 'POST',
        body: payload
    }).then(res => {
        return res.json();
    }).catch(error => {
            console.log("This is error");
            return error;
        });


export const getImages = () =>
    fetch(`${api}/files/`+reactLocalStorage.get('userid'))
        .then(res => res.json())
        .catch(error => {
            console.log("This is error.");
            return error;
        });

export const starFile = (data) =>
    fetch(`${api}/starFile/` + reactLocalStorage.get('userid'),{
        method: 'POST',
         headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
         body: JSON.stringify(data)
    }
        )
        .then(res => res.json())
        .catch(error => {
            console.log("This is error.");
            return error;
        });
export const unstarFile = (id) =>
    fetch(`${api}/unstarFile/` + id,{
        method: 'POST'})
        .then(res => res.json())
        .catch(error => {
            console.log("This is error.");
            return error;
        });

export const getUserInfo = () =>
    fetch(`${api}/userInformation/` + reactLocalStorage.get('userid'))
        .then(res => res.json())
        .catch(error => {
            console.log("This is error.");
            return error;
        });

export const setUserInfo = (data) =>
    fetch(`${api}/setuserInformation/` + reactLocalStorage.get('userid'),{
        method: 'POST',
     headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
         body: JSON.stringify(data)
    })
        .then(res => res.json())
        .catch(error => {
            console.log("This is error.");
            return error;
        });

export const createFolder = (name, inFolder) =>
    fetch(`${api}/createFolder/` + name +"/" + inFolder +"/"+reactLocalStorage.get('userid') ,{
        method: 'POST'})
        .then(res => res.json())
        .catch(error => {
            console.log("This is error."+error);
            return error;
        });

export const getFolderData = (folderid) =>
    fetch(`${api}/getFolderData/` + folderid+"/"+reactLocalStorage.get('userid'))
        .then(res => res.json())
        .catch(error => {
            console.log("This is error."+error);
            return error;
        });

export const share = (userid,dataToShare, fileType) =>
    fetch(`${api}/share/` + userid+"/"+fileType,{
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
      body:  JSON.stringify(dataToShare)})
        .then(res => res.json())
        .catch(error => {
            console.log("This is error."+error);
            return error;
        });

export const deleteRes = (userfileid, type, fileid, filename) =>
    fetch(`${api}/delete/` + userfileid+"/"+reactLocalStorage.get('userid')+"/"+type+"/"+ fileid +"/"+filename,{
        method: 'POST'})
        .then(res => res.json())
        .catch(error => {
            console.log("This is error."+error);
            return error;
        });

export const creategroup = (groupname) =>
    fetch(`${api}/creategroup/` +reactLocalStorage.get('userid')+"/"+groupname,{
        method: 'POST'})
        .then(res => res.json())
        .catch(error => {
            console.log("This is error."+error);
            return error;
        });

export const getgroups = () =>
    fetch(`${api}/getgroups/` +reactLocalStorage.get('userid'),{
        method: 'GET'})
        .then(res => res.json())
        .catch(error => {
            console.log("This is error."+error);
            return error;
        });
export const getuseractivity = () =>
    fetch(`${api}/getuseractivity/` +reactLocalStorage.get('userid'))
        .then(res => res.json())
        .catch(error => {
            console.log("This is error."+error);
            return error;
        });