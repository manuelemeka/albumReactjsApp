import axios from "axios";

const BASE_URL = "http://localhost:4444/";

export const FetchDocumentService = async (payload:any) => {
  try{

    let res = await axios.post(BASE_URL + "photos/list", payload,);
    return res.data;
  } catch (e) {
    return e.response;
  }
};

export const uploadDocumentService = async (payload:any) => {
  try{
    const formData = new FormData();
    formData.append("album", payload.album);
    for (let i = 0 ; i < payload.files.length ; i++) {
      formData.append("documents", payload.files[i]);
  }
    let res = await axios.put(BASE_URL + "photos", formData,);
    return res;
  } catch (e) {
    return e.response;
    
  }
};

export const DeleteDocumentService = async (payload:any) => {
  try{
    console.log(payload)
    let res = await axios.delete(BASE_URL + "photos", {data:payload},);
    return res;
  } catch (e) {
    return e.response;
  }
};

