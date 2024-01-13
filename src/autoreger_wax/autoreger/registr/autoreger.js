import fetch from "node-fetch";
import {HeadersJson} from "../../../util/headers/HeadersJson.js";
import {login_session} from "../../../cookie/cookie.js";
import {ReCaptcha} from "../../../recaptcha/captcha.js";
import {IMAP} from "../../imap/imap.js";
import {redirect_login} from "./redirect_login.js";

async function sleep (ms) {
    new Promise(resolve => setTimeout(resolve, ms))
}

export async function autoreger (email, headers, password, repassword, password_email, proxy) {

    let cookie = await login_session(headers)
    let captcha = await ReCaptcha(headers.user_agent)

    let POST = new HeadersJson().POST(cookie, headers.user_agent, headers.sec_ch_ua, headers.accept_language)

    POST['origin'] = 'https://www.mycloudwallet.com'
    POST['referer'] = 'https://www.mycloudwallet.com/'
    POST['host'] = 'login-api.mycloudwallet.com'
    const data = {
        "email": email,
        "password": password,
        "repassword": repassword,
        "captcha": captcha,
    }
    const response = await fetch('https://login-api.mycloudwallet.com/v1/wcw/register', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: POST
    })
   if (response.status === 201) {
       await sleep(6000)
       let token = await IMAP(email, password_email, proxy)
       console.log(token)
       // await redirect_login(headers, token)
       return cookie
   } else if (response.status !== 201) {
       throw await response.json()
   } else throw 'Ошибка при регистрации акка'

}
