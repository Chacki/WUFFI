
import fetch from "node-fetch";
import {login_session} from "../../reger_wax/cookie.js";
import {HeadersJson} from "../../util/headers/HeadersJson.js";
import {GenerateUseragent} from "../../util/generate/useragent/GenerateUseragent.js";

let language = 'kk-KZ,kk;q=0.9,en-US;q=0.8,en;q=0.7'
let useragent = GenerateUseragent()

const headers = {
    'accept_language': language,
    'sec_ch_ua': useragent.sec_ch_ua,
    'brand': useragent.brand,
    'user_agent': useragent.useragent,
}

async function follow (wallet) {

    let ses = "PoN8nHf6W9edkPGzazqvCvoLyLi2T2kkYHEHE7NQI0ClRY+BvFuxz/62RyLAVXvXRtrVwbqK9n3WdC4jrhNxhVz5NSDCx9N2zxoOKucOEmdXb6S26M7kjdGt1VR4gcfltNUCrBvyFmEgyD/0pjZg+xZstdbd6Vg8+xchNit2Uxjd4p+GbBZoaiGqYS9tbquuIPMsQyN8zg4eyrxBzYgi3IhtZtQJ1wwnL4R4I3PjsnqQsVzBZZdJzjAEs+7jgcRv"

    let POST = new HeadersJson().POST('', headers.user_agent, headers.sec_ch_ua, headers.accept_language)
    delete POST.cookie
    POST['origin'] = 'https://wax.contest.bountyblok.io'
    POST['referer'] = 'https://wax.contest.bountyblok.io/'

    const data = {
        "Username": wallet,
        "ActionType": 1,
        "ContestGuid": "86e7e425-f549-4f54-a0e9-e675b7da9271",
        "Referrer": "",
        "Session": "PoN8nHf6W9edkPGzazqvCpBrY2K9jTy/pVVuVMwet3Ooiz7w5yw17pqBKLTTG20KuFNLP+rQ4TtETR7cq3V5eTZG7xPuTdpT9U35KYSG1hkmB1QT1UGOeIRUj3ye7u7tr8N8EecdJErRkLJFidLVgG8Yx8zwgQp8UYb5ME27P33aShiaEKzKb0iJiXyiNxTEKoRqhe849Tw3r9kro3GxkD1ibgL4o2AHM26sm2YtV3qXHOnZ7X3pgER0il9i8Agx",
        "TaskGuid": "a3411280-cba4-4da1-a4c8-0c2e9f21ecaf"
    }
    const response = await fetch('https://app-backend.bountyblok.io/publiccontest/logtask', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: POST
    })

    const json = await response.json()
    if (json.isSuccess === true && json.errorMessage === null) {
        console.log('Успешно')
    } else console.log(json.errorMessage)

}

console.log(await login('rtxn4.c.wam'))

