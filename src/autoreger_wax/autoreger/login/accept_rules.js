
import fetch from "node-fetch";
import {HeadersJson} from "../../../util/headers/HeadersJson.js";
import {ReCaptcha} from "../../../recaptcha/captcha.js";


export async function accept_rules (token, cookie, headers, proxy) {

    let POST = new HeadersJson().POST(cookie, headers.user_agent, headers.sec_ch_ua, headers.accept_language)

    POST['origin'] = 'https://www.mycloudwallet.com'
    POST['referer'] = 'https://www.mycloudwallet.com/'

    const data = {
        "tos_id": 35,
        "age_accepted": true,
        "tos_accepted": true,
        "singleUseToken": token,
        "captcha": await ReCaptcha(headers.user_agent)
    }
    const response = await fetch('https://login-api.mycloudwallet.com/v1/wcw/tos', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: POST
    })

    let json = await response.text()
    console.log(json)

}

