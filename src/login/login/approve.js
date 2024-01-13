
import fetch from "node-fetch";
import {HeadersJson} from "../../util/headers/HeadersJson.js";


export async function approve (headers, cookie, data, proxy) {

    let POST = new HeadersJson().POST('', headers.user_agent, headers.sec_ch_ua, headers.accept_language)

    delete POST.cookie
    POST['origin'] = 'https://www.mycloudwallet.com'
    POST['referer'] = 'https://www.mycloudwallet.com/'
    POST['originDapp'] = 'https://wax.contest.bountyblok.io/'
    POST['host'] = 'login-api.mycloudwallet.com'
    POST['sessionToken'] = cookie.sessionToken.split('session_token=')[1]
    const id_account = data.user_id

    const response = await fetch(`https://login-api.mycloudwallet.com/v1/wcw/accounts/${id_account}/whitelist/login`, {
        method: 'POST',
        headers: POST,
        agent: proxy
    })

    const json = await response.json()
    if (response.status === 200 && json.created ) {
        return 'Login wax success'
    } else if (response.status !== 200 && !json.created) throw 'Error Approve'

}



