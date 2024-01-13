process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

import fetch from "node-fetch";
import {HeadersHtml} from "../../../../util/headers/HeadersHtml.js";
import {GenerateUseragent} from "../../../../util/generate/useragent/GenerateUseragent.js";
import {proxy} from "../../../../util/proxy/proxy.js";

let language = 'kk-KZ,kk;q=0.9,en-US;q=0.8,en;q=0.7'
let useragent = GenerateUseragent()


const headers = {
    'accept_language': language,
    'sec_ch_ua': useragent.sec_ch_ua,
    'brand': useragent.brand,
    'user_agent': useragent.useragent,
}

async function oauth (wallet) {


    let GET = new HeadersHtml().GET('', headers.user_agent, headers.sec_ch_ua, headers.accept_language)
    delete GET.cookie
    GET['origin'] = 'https://wax.contest.bountyblok.io'
    GET['referer'] = 'https://wax.contest.bountyblok.io/'
    GET['accept'] = 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9'
    GET['host'] = 'app-backend.bountyblok.io'
    GET['Upgrade-Insecure-Requests'] = '1'
    GET['Sec-Fetch-User'] = '?1'
    GET['sec-fetch-site'] = 'same-site'

    const isPublicContest = true
    const contestID = '86e7e425-f549-4f54-a0e9-e675b7da9271'
    const chainAccount = wallet
    const taskID = 'a3411280-cba4-4da1-a4c8-0c2e9f21ecaf'

    const token = await fetch(`https://app-backend.bountyblok.io/socialmedia/twitteroauth?isPublicContest=${isPublicContest}&contestID=${contestID}&action=1&chainAccount=${chainAccount}&referrer=&domain=13&taskID=${taskID}&isAuthorizerTask=false`, {
        method: 'GET',
        headers: GET,
        agent: proxy,
        redirect: "manual"
    })

    const url = token.headers.get('location')
    console.log(url)

    let cookie = 'lang=en; guest_id_marketing=v1%3A170504036660681708; guest_id_ads=v1%3A170504036660681708; guest_id=v1%3A170504036660681708; gt=1745691945429590047; _ga=GA1.2.1641224145.1705040371; _gid=GA1.2.1620872761.1705040371; _twitter_sess=BAh7CSIKZmxhc2hJQzonQWN0aW9uQ29udHJvbGxlcjo6Rmxhc2g6OkZsYXNo%250ASGFzaHsABjoKQHVzZWR7ADoPY3JlYXRlZF9hdGwrCKxnU%252FyMAToMY3NyZl9p%250AZCIlY2ZjNDc2ZjMzOTMyZDY4ZTc2ZDc2YmIzYmE5OTIzM2I6B2lkIiU3NTMz%250AOWQ4OTQzNWI0OTFlNTYyYmZhYzBlODg2MWIwZg%253D%253D--9703381d9cc141f5466147d657f7faad05efc07f; kdt=ezJqEavhKEiziQpIh7sFxAMPF6LyoExp9YD2Vrzn; auth_token=94621b311df798817174740ea6b76e1431cc04d8; ct0=6758e6db1d1461c8d2f5f9eb4da6a674f41c5584c167b1269e7501270e4244bc2656443faab1bc9a85e23f7dec602a81eb2df017e19ae56e125f285d7dc6f67fe5f360101fce36507d3d0aa997b358a0; twid=u%3D761102697965629440; att=1-jFcbcyuaqAZNJOK1BIn0W8tzMaDgEtkIE7zXnbJX; personalization_id="v1_dwJJeboGKC4SErxa2qlFxQ=="'
    delete GET.referer
    delete GET.origin
    delete GET.host
    GET['cookie'] =cookie
    GET['sec-fetch-site'] ='none'
    const authorize_token = await fetch(url, {
        method: 'GET',
        headers: GET,
        agent: proxy,
    })

    let value = await authorize_token.text()
    let authenticity_token = value.split('name="authenticity_token" value="')[1].split('"')[0]
    let oauth_token = url.split('token=')[1]


    let form = new URLSearchParams()
    form.append('authenticity_token', authenticity_token)
    form.append('redirect_after_login', url)
    form.append('oauth_token', oauth_token)

    const POST = new HeadersHtml().POST(cookie, headers.user_agent, headers.sec_ch_ua, headers.accept_language)
    POST['Upgrade-Insecure-Requests'] = '1'
    POST['Sec-Fetch-User'] = '?1'
    POST['sec-fetch-site'] = 'same-origin'
    POST['origin'] = 'https://api.twitter.com'
    POST['referer'] = url
    POST['cache-control'] = 'max-age=0'
    const authorize = await fetch(`https://api.twitter.com/oauth/authorize`, {
        method: 'POST',
        headers: POST,
        agent: proxy,
        body: form
    })
    let text = await authorize.text()
    let oauth_verifier = text.split('oauth_verifier=')[1].split('"')[0]
    console.log(authorize.status)
    console.log(oauth_verifier)


    delete GET['Sec-Fetch-User']
    GET["referer"] ='https://api.twitter.com/'
    GET["sec-fetch-site"] ='cross-site'
    GET["cookie"] = 'ASP.NET_SessionId=kwidpbrvekbwfashafmiuyk5' //////=====узнать где брать
    const twitteroauthcallback = await fetch(`https://app-backend.bountyblok.io/socialmedia/twitteroauthcallback?isPublicContest=true&contestID=${contestID}&action=1&chainAccount=${wallet}&referrer=&domain=13&taskID=${taskID}&isAuthorizerTask=false&oauth_token=${oauth_token}&oauth_verifier=${oauth_verifier}`, {
        method: 'GET',
        headers: GET,
        agent: proxy,
        redirect: "manual"
    })

    let URL = twitteroauthcallback.headers.get('location')
    console.log(URL)

    GET["host"] = 'wax.contest.bountyblok.io'
    const bountyblok = await fetch(URL, {
        method: 'GET',
        agent: proxy,
        headers: GET,
    })
}
't3xuUrnLEWHPL4ymhmq7%2fJNMHOOXHOnZ7X3pgER0il9i8Agx'
oauth('bp24y.c.wam')

