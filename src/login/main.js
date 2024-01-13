import {session} from "./login/session.js";
import {GenerateUseragent} from "../util/generate/useragent/GenerateUseragent.js";
import {approve} from "./login/approve.js";
import {proxy} from "../util/proxy/proxy.js";

let language = 'kk-KZ,kk;q=0.9,en-US;q=0.8,en;q=0.7'
let useragent = GenerateUseragent()


const headers = {
    'accept_language': language,
    'sec_ch_ua': useragent.sec_ch_ua,
    'brand': useragent.brand,
    'user_agent': useragent.useragent,
}




async function login (email, password_email, password_wax, headers, proxy) {
    let ses = await session(email, password_wax, password_email, headers, proxy)
    let account_wax = ses.info_acc.account
    console.log(account_wax)
    return  await approve(headers, ses.cookie, ses.info_acc)
}

console.log(await login('chertopolox999120@outlook.com', 'jioipoas214sa', 'zalPasdgasf124dsa+g', headers, proxy))
