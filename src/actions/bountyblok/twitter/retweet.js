
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

    let POST = new HeadersJson().POST('', headers.user_agent, headers.sec_ch_ua, headers.accept_language)
    delete POST.cookie
    POST['origin'] = 'https://wax.contest.bountyblok.io'
    POST['referer'] = 'https://wax.contest.bountyblok.io/'

    const data = {
        "Username": wallet,
        "ActionType": 2,
        "ContestGuid": "86e7e425-f549-4f54-a0e9-e675b7da9271",
        "Referrer": "",
        "Session": session,
        "TaskGuid": "826a1271-0123-42e0-8e79-187a4706388a"
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



