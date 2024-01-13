
import fetch from "node-fetch";
import {login_session} from "../../cookie/cookie.js";
import {HeadersJson} from "../../util/headers/HeadersJson.js";
import {send_code} from "./send_code.js";



export async function session (email, password_wax, password_email, headers, proxy) {

    let cookie = await login_session(headers, proxy)
    let POST = new HeadersJson().POST(cookie, headers.user_agent, headers.sec_ch_ua, headers.accept_language)

    POST['origin'] = 'https://www.mycloudwallet.com'
    POST['referer'] = 'https://www.mycloudwallet.com/'

    const data = {
        "password": password_wax,
        "username": email,
        "redirectTo": "https://www.mycloudwallet.com/cloud-wallet/login?origin=https%3A%2F%2Fwax.contest.bountyblok.io%2F",
        "captcha": ""
    }
    const response = await fetch('https://login-api.mycloudwallet.com/v1/wcw/session', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: POST,
        agent: proxy,
    })

    const json = await response.json()
    if (json.token) {

        let GET = new HeadersJson().GET(cookie, headers.user_agent, headers.sec_ch_ua, headers.accept_language)

        GET['origin'] = 'https://www.mycloudwallet.com'
        GET['referer'] = 'https://www.mycloudwallet.com/'

        const response = await fetch('https://login-api.mycloudwallet.com/v1/wcw/session', {
            method: 'GET',
            headers: GET,
            agent: proxy,
        })

        const json = await response.json()
        let sid = 'sid=' + response.headers.get('set-cookie').split('sid=')[1].split(';')[0]
        let session_token = 'session_token=' + response.headers.get('set-cookie').split('session_token=')[1].split(';')[0]
        return {
            info_acc: json,
            cookie: {
                login_session: cookie,
                sid: sid,
                sessionToken: session_token,
            }
        }
    } else if (json.challengeToken) {
        let code = await send_code(email, password_email, headers, cookie, json.challengeToken, proxy)
        return {
            info_acc: code.info_acc,
            cookie: code.cookie
        }
    } else throw 'Ошибка при получении токена' + json
}


