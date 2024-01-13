


export class HeadersHtml {
    GET (cookie, user_agent, sec_ch_ua, accept_language)  {
        return {
            'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': accept_language,
            'referer': '',
            'cookie': cookie,
            'sec-ch-ua': sec_ch_ua,
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'document',
            'sec-fetch-mode': 'navigate',
            'sec-fetch-site': 'none',
            'user-agent': user_agent,
        }
    };

    POST (cookie, user_agent, sec_ch_ua, accept_language) {
        return {
            'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': accept_language,
            'content-type': 'application/x-www-form-urlencoded',
            'referer': '',
            'origin': '',
            'cookie': cookie,
            'sec-ch-ua': sec_ch_ua,
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'document',
            'sec-fetch-mode': 'navigate',
            'sec-fetch-site': 'same-site',
            'user-agent': user_agent,
        }
    };
}