
import fetch from "node-fetch";
import {login_session} from "../../cookie/cookie.js";
import {HeadersJson} from "../../util/headers/HeadersJson.js";
import {GenerateUseragent} from "../../util/generate/useragent/GenerateUseragent.js";
import {track} from "./track_analytics.js";

let language = 'kk-KZ,kk;q=0.9,en-US;q=0.8,en;q=0.7'
let useragent = GenerateUseragent()

const headers = {
    'accept_language': language,
    'sec_ch_ua': useragent.sec_ch_ua,
    'brand': useragent.brand,
    'user_agent': useragent.useragent,
}

async function wuf_pack (email, wallet) {


    let POST = new HeadersJson().POST('', headers.user_agent, headers.sec_ch_ua, headers.accept_language)
    delete POST.cookie
    POST['origin'] = 'https://www.wuffi.io'
    POST['referer'] = 'https://www.wuffi.io/'
    POST['x-klaviyo-onsite'] = '1'
    POST['revision'] = '2023-06-15'
    POST['sec-fetch-site'] = 'cross-site'
    POST['accept'] = 'application/json'

    const profiles = await fetch('https://a.klaviyo.com/client/profiles/?company_id=XQ6vwv', {
        method: 'POST',
        body: JSON.stringify({
            "data": {
                "type": "profile",
                "attributes": {
                    "email": email,
                    "properties": {
                        "$referrer": {
                            "ts": Math.floor(Date.now() / 1000),
                            "value": "https://wax.contest.bountyblok.io/",
                            "first_page": "https://www.wuffi.io/"
                        },
                        "$last_referrer": {
                            "ts": Math.floor(Date.now() / 1000),
                            "value": "https://wax.contest.bountyblok.io/",
                            "first_page": "https://www.wuffi.io/"
                        },
                        "Wallet": wallet
                    }
                }
            }
        }),
        headers: POST
    })
    console.log(profiles.status)
    const json = await profiles.json()
    const exchange_id = json.meta.exchange_id

    POST["Access-Control-Allow-Headers"] = '*'
    POST["accept"] = '*/*'
    delete POST["x-klaviyo-onsite"]
    const subscriptions = await fetch('https://a.klaviyo.com/client/subscriptions/?company_id=XQ6vwv', {
        method: 'POST',
        body: JSON.stringify({
            "data": {
                "type": "subscription",
                "attributes": {
                    "list_id": "WQcjad",
                    "email": email,
                    "properties": {
                        "Wallet": wallet,
                        "$consent_method": "Klaviyo Form",
                        "$consent_form_id": "VN2YNC",
                        "$consent_form_version": 12043947,
                        "$timezone_offset": 3 //посмотреть откуда берётся
                    }
                }
            }
        }),
        headers: POST
    })
    console.log(subscriptions.status)

    delete POST["Access-Control-Allow-Headers"]
    POST['x-klaviyo-onsite'] = '1'
    POST['accept'] = 'application/json'

    const events = await fetch('https://a.klaviyo.com/client/events/?company_id=XQ6vwv', {
        method: 'POST',
        body: JSON.stringify({
            "data": {
                "type": "event",
                "attributes": {
                    "metric": {
                        "name": "__activity__"
                    },
                    "profile": {
                        "$referrer": {
                            "ts": Math.floor(Date.now() / 1000),
                            "value": "",
                            "first_page": "https://www.wuffi.io/"
                        },
                        "$last_referrer": {
                            "ts": Math.floor(Date.now() / 1000),
                            "value": "",
                            "first_page": "https://www.wuffi.io/"
                        },
                        "Wallet": wallet,
                        "$exchange_id": exchange_id
                    },
                    "properties": {
                        "page": "https://www.wuffi.io/",
                        "browser": "Chrome",
                        "os": "Windows",
                        "$use_ip": true,
                        "$is_session_activity": true
                    }
                }
            }
        }),
        headers: POST
    })
    console.log(events.status)
    await track(email, wallet, headers)
}



wuf_pack('pro100_lox1@outlook.com', 'j.xoy.c.wam')