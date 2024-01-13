
import fetch from "node-fetch";
import {accept_rules} from "./accept_rules.js";
import {HeadersJson} from "../../../util/headers/HeadersJson.js";



export async function session (email, password_wax, cookie, headers, proxy) {


    let POST = new HeadersJson().POST(cookie, headers.user_agent, headers.sec_ch_ua, headers.accept_language)

    POST['origin'] = 'https://www.mycloudwallet.com'
    POST['referer'] = 'https://www.mycloudwallet.com/'

    const data = {
        "password": password_wax,
        "username": email,
        "captcha": ""
    }
    const response = await fetch('https://login-api.mycloudwallet.com/v1/wcw/session', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: POST,
        // agent: proxy,
    })

    const json = await response.json()
    if (json.tandcToken) {
            await accept_rules(json.tandcToken, cookie, headers, proxy)
    } else throw 'Ошибка при получении токена tandcToken' + json
}


