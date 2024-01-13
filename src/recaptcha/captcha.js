


// process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
let proxy = "socks5://gXvAGygp:JCBqyXTZ@138.124.111.33:62565"
let client_key = "CAP-68F37C26E0B58C9D016D058FAF49F5E7"
let PublicKey = "6LerCacdAAAAAP7vfVnWzFe2ITgIbvZ11DQLB4qN"
export async function ReCaptcha (useragent) {
    let clientKey = client_key
    let json = {
        "clientKey": clientKey,
        "task": {
            "type": "ReCaptchaV2Task",
            "websiteURL": "https://www.mycloudwallet.com",
            "websiteKey": PublicKey,
            "isInvisible": true,
            "apiDomain": "https://recaptcha.net",
            "userAgent": useragent,
            "proxy": proxy,
        }
    }
    const captcha = await fetch(`https://api.capsolver.com/createTask`, {
        method: 'POST',
        body: JSON.stringify(json),
        headers: {
            'Content-Type': 'application/json',
            'Accept-Encoding': 'gzip, deflate',
        }
    });
    let text = await captcha.json();
    console.log(text)
    let taskId = text.taskId;

    if (taskId !== undefined) {
        while (true) {
            const get_captcha = await fetch(`https://api.capsolver.com/getTaskResult`, {
                method: 'POST',
                body: JSON.stringify({
                    "clientKey": clientKey,
                    "taskId": taskId
                }),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': '*/*',
                    'Accept-Encoding': 'gzip, deflate',
                }
            });
            let json_getTask = await get_captcha.json();
            if (json_getTask.status === "ready") {
                return json_getTask.solution.gRecaptchaResponse
            }
            await new Promise(resolve => setTimeout(resolve, 2000));
            if (json_getTask.status === "ready") {
                break;
            } else if (json_getTask.errorId === 1) {
                throw 'ERROR_CAPTCHA_SOLVE_FAILED'
            }
        }
    }

}

