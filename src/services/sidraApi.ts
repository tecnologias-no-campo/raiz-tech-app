import axios from "axios";

const sidraApi = axios.create({
  baseURL: "https://apisidra.ibge.gov.br/values",
});


export { sidraApi };