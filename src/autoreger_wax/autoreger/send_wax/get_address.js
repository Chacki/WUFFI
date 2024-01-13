import {HeadersJson} from "../../../util/headers/HeadersJson.js";
import fetch from "node-fetch";

export async function get_address(cookie, headers, proxy) {

    let GET = new HeadersJson().GET(cookie, headers.user_agent, headers.sec_ch_ua, headers.accept_language)

    GET['origin'] = 'https://www.mycloudwallet.com'
    GET['referer'] = 'https://www.mycloudwallet.com/'

    const response = await fetch('https://login-api.mycloudwallet.com/v1/wcw/session', {
        method: 'GET',
        headers: GET,
        // agent: proxy,
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
}
