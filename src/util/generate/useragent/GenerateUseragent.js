import ListUseragent from "./ListUseragent.js";

export function GenerateUseragent  () {
    let useragent = ListUseragent()
    let Google_Chrome_Ver = useragent.split('Chrome/')[1].split('.')[0]
    let brand = (v) =>  {
        switch (v) {
            case '118': return '24'
            case '119': return '24'
            case '120': return '8'
            default: return '99'
        }
    }
    let version = brand(Google_Chrome_Ver)
    let sec_ch_ua = `"Google Chrome";v="${Google_Chrome_Ver}", "Chromium";v="${Google_Chrome_Ver}", "Not?A_Brand";v="${version}"`
    return {
        useragent: useragent,
        sec_ch_ua: sec_ch_ua,
        brand: version,
    }
}
