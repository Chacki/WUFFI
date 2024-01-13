
import fetch from "node-fetch";
import {GenerateUseragent} from "../../../util/generate/useragent/GenerateUseragent.js";
import {HeadersJson} from "../../../util/headers/HeadersJson.js";


let language = 'kk-KZ,kk;q=0.9,en-US;q=0.8,en;q=0.7'
let useragent = GenerateUseragent()

const headers = {
    'accept_language': language,
    'sec_ch_ua': useragent.sec_ch_ua,
    'brand': useragent.brand,
    'user_agent': useragent.useragent,
}

async function follow (wallet) {

    // const session = ''
    let session = "PoN8nHf6W9edkPGzazqvCvoLyLi2T2kkYHEHE7NQI0ClRY+BvFuxz/62RyLAVXvXRtrVwbqK9n3WdC4jrhNxhVz5NSDCx9N2zxoOKucOEmdXb6S26M7kjdGt1VR4gcfltNUCrBvyFmEgyD/0pjZg+xZstdbd6Vg8+xchNit2Uxjd4p+GbBZoaiGqYS9tbquuIPMsQyN8zg4eyrxBzYgi3IhtZtQJ1wwnL4R4I3PjsnqQsVzBZZdJzjAEs+7jgcRv"
    // let task = "b3362c2b-2b23-4330-8ffb-ab3572c10c2e"
    // let task = "1417364e-da93-4a9d-95d8-1f38701c70ae"
    // let task = "77093f3e-c82b-48ee-a216-84f9ea118002"
    // let task = "15d98d60-1966-49d3-bed1-04a5bbc31783"
    // let task = "e6f970b2-22c7-462b-9367-5f265cfa441c"
    let task = "f553b6c1-1c2f-4ee1-b116-fff4876f23db"

    let POST = new HeadersJson().POST('', headers.user_agent, headers.sec_ch_ua, headers.accept_language)
    delete POST.cookie
    POST['origin'] = 'https://wax.contest.bountyblok.io'
    POST['referer'] = 'https://wax.contest.bountyblok.io/'

    const data = {
        "Username": wallet,
        "ActionType": 3,
        "ContestGuid": "86e7e425-f549-4f54-a0e9-e675b7da9271",
        "Referrer": "",
        "Session": session,
        "TaskGuid": task
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


follow('k5ugu.wam')