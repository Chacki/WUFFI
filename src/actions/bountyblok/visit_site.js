
import fetch from "node-fetch";
import {login_session} from "../../cookie/cookie.js";
import {HeadersJson} from "../../util/headers/HeadersJson.js";
import {GenerateUseragent} from "../../util/generate/useragent/GenerateUseragent.js";
import {proxy} from "../../util/proxy/proxy.js";

let language = 'kk-KZ,kk;q=0.9,en-US;q=0.8,en;q=0.7'
let useragent = GenerateUseragent()
// let proxy = ''

const headers = {
    'accept_language': language,
    'sec_ch_ua': useragent.sec_ch_ua,
    'brand': useragent.brand,
    'user_agent': useragent.useragent,
}

async function visit_site (wallet) {


    let POST = new HeadersJson().POST('', headers.user_agent, headers.sec_ch_ua, headers.accept_language)
    delete POST.cookie
    POST['origin'] = 'https://wax.contest.bountyblok.io'
    POST['referer'] = 'https://wax.contest.bountyblok.io/'

    const data = {
        "Username": wallet,
        "ActionType": 12,
        "ContestGuid": "86e7e425-f549-4f54-a0e9-e675b7da9271",
        "Referrer": "",
        "TaskGuid": "5b5983be-e188-4c4d-b62d-91e84de47a5d"
    }
    const response = await fetch('https://app-backend.bountyblok.io/publiccontest/logtask', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: POST,
        agent: proxy
    })

    const json = await response.json()
    if (json.isSuccess === true && json.errorMessage === null) {
        console.log('Успешно')
    } else console.log(json.errorMessage)

}

console.log(await visit_site('j.xoy.c.wam'))

