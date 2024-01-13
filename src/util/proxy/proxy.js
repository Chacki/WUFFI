import {HttpsProxyAgent} from "https-proxy-agent";

let proxy1 = 'http://gXvAGygp:JCBqyXTZ@45.130.212.242:63882'
let proxy2 = 'http://gXvAGygp:JCBqyXTZ@138.124.111.33:62564'
export const proxy = new HttpsProxyAgent(proxy2);
