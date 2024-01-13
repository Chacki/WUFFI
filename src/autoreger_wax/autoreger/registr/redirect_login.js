import fetch from "node-fetch";
import {HeadersHtml} from "../../../util/headers/HeadersHtml.js";


export async function redirect_login (headers, token) {
    let GET = new HeadersHtml().GET('cookie', headers.user_agent, headers.sec_ch_ua, headers.accept_language)


    delete GET.referer
    delete GET.origin
    delete GET.cookie
    GET['Upgrade-Insecure-Requests'] = '1'
    GET['host'] = 'api-login.wax.io'
    GET['Sec-Fetch-User'] = '?1'
    console.log(token)
    const response = await fetch('https://api-login.wax.io/v1/register/verify?token=' + token, {
        method: 'GET',
        headers: GET,
        redirect: "manual"
    })

    const url = response.headers.get('location')

    GET['host'] = 'www.mycloudwallet.com'
    const signin = await fetch(url, {
        method: 'GET',
        headers: GET,
    })
    let text = await signin.text()
    console.log(text)
}