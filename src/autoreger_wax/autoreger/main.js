import {autoreger} from "./registr/autoreger.js";
import {GenerateUseragent} from "../../util/generate/useragent/GenerateUseragent.js";
import {session} from "./login/session.js";
import {get_address} from "./send_wax/get_address.js";
import {login_session} from "../../cookie/cookie.js";
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

let language = 'kk-KZ,kk;q=0.9,en-US;q=0.8,en;q=0.7'
let useragent = GenerateUseragent()
// let proxy = ''

const headers = {
    'accept_language': language,
    'sec_ch_ua': useragent.sec_ch_ua,
    'brand': useragent.brand,
    'user_agent': useragent.useragent,
}

async function autoreger_wax (email, password, password_email, proxy) {
    // let reger = await autoreger(email, headers, password, password, password_email, proxy)
    let reger = await login_session(headers)
    let ses = await session(email, password, reger, headers, proxy)
    let address = await get_address(reger, headers, proxy)
    let account_wax = address.info_acc.account
    console.log(account_wax)
}
autoreger_wax('fauspatron_2000@outlook.com', 'zalPasdgasf124dsa+g', 'jioipoas214sa', 'http://gXvAGygp:JCBqyXTZ@138.124.111.33:62564')