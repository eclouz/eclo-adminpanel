import {getCookie} from "./CookieHelper";
export  function  getToken():string
{
    return getCookie("access_token");
}