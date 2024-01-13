import fetch from "node-fetch";
import {HeadersJson} from "../util/headers/HeadersJson.js";



export async function login_session (headers, proxy) {

    //доделать эти куки
    let cookie = '_ga_NVJJDR9LZE=GS1.1.1704936117.1.1.1704936164.0.0.0; _ga_MEM1PFF0DJ=GS1.1.1704935811.2.1.1704936164.0.0.0'
    let GET = new HeadersJson().GET(cookie, headers.user_agent, headers.sec_ch_ua, headers.accept_language)

    GET['origin'] = 'https://www.mycloudwallet.com'
    GET['referer'] = 'https://www.mycloudwallet.com/'
    const response = await fetch('https://login-api.mycloudwallet.com/v1/wcw/session', {
        method: 'GET',
        headers: GET,
        agent: proxy
    })
    return  'login_session=' + response.headers.get('set-cookie').split('login_session=')[1].split(';')[0]

}


