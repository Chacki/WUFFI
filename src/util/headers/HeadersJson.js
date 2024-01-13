
export class HeadersJson {
    GET (cookie, user_agent, sec_ch_ua, accept_language)  {
        return {
            'accept': 'application/json, text/plain, */*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': accept_language,
            'cookie': cookie,
            'origin': '',
            'referer': '',
            'sec-ch-ua': sec_ch_ua,
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent': user_agent,
        }
    };

    POST (cookie, user_agent, sec_ch_ua, accept_language)  {
        return {
            'accept': 'application/json, text/plain, */*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': accept_language,
            'content-type': 'application/json',
            'cookie': cookie,
            'origin': '',
            'referer': '',
            'sec-ch-ua': sec_ch_ua,
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent': user_agent,
        }
    };
}