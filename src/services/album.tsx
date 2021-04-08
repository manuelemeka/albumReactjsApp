import axios from "axios";

const BASE_URL = "http://localhost:4444/";

export const FetchDocumentService = async (payload:any) => {
  try{
    console.log(payload);
    let res = await axios.post(BASE_URL + "photos/list", payload,);
    return res.data;
  } catch (e) {
    throw handler(e);
  }
};

export const handler = ({err}:any) => {
    return err.response.data;
  };