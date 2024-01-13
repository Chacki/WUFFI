import fetch from "node-fetch";
import {GenerateUseragent} from "../../util/generate/useragent/GenerateUseragent.js";
import {HeadersHtml} from "../../util/headers/HeadersHtml.js";
let language = 'kk-KZ,kk;q=0.9,en-US;q=0.8,en;q=0.7'
let useragent = GenerateUseragent()
// let proxy = ''
// process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

const headers = {
    'accept_language': language,
    'sec_ch_ua': useragent.sec_ch_ua,
    'brand': useragent.brand,
    'user_agent': useragent.useragent,
}

export async function redirect_login (headers) {
    let GET = new HeadersHtml().GET('cookie', headers.user_agent, headers.sec_ch_ua, headers.accept_language)


    delete GET.referer
    delete GET.origin
    delete GET.cookie
    GET['Upgrade-Insecure-Requests'] = '1'
    GET['host'] = 'api-login.wax.io'
    GET['Sec-Fetch-User'] = '?1'
    const response = await fetch('https://api-login.wax.io/v1/register/verify?token=5200c3aaf32864813460c14439b3345db169a241de73e2ae3c1b5370b497cb12', {
        method: 'GET',
        headers: GET,
        // redirect: "manual"
    })
    console.log(response.status)
    // const url = response.headers.get('location')
    //
    // GET['host'] = 'www.mycloudwallet.com'
    // const signin = await fetch(url, {
    //     method: 'GET',
    //     headers: GET,
    // })
    // let text = await signin.text()
    // console.log(text)
}
redirect_login(headers)