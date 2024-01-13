import ccxt from "ccxt";
// import "dotenv/config.js";


let binance_key = 'b9BgSe2ZAEuGyNQbQ589QMcyWGWlJR1DAU9uHSY7iUsOhpbs5mjwKX3PudR8KsFV'
let binance_secret = '0rO04iAXdrJgrpKqcd9RNoFxviMBgB4woxX9Yx7UyjrfB0Fs1WvAxST4bSJU0vPG'
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function send_wax (amount, list_address, memo) {
    try {
        let i = 0
        while (true) {

            const address = list_address
            const symbolWithdraw = "WAXP"
            const network = "WAX"

            const exchange = new ccxt.binance({
                'apiKey': binance_key,
                'secret': binance_secret,
                'enableRateLimit': true,
                'options': {
                    'defaultType': 'spot'
                }
            });

            let fetch = await exchange.withdraw(symbolWithdraw, amount, address, memo, {
                network: network
            });
            if (typeof fetch.id === 'string') {
                console.log('SUCCESS '+'send:' + amount + ' WAX ' + ' to: ' + address)
                // return 'SEND SUCCESS'
            } else if (typeof fetch.id === 'undefined') throw 'ТРАНЗАКЦИЯ НЕ ОТПРАВИЛАСЬ'

            await sleep(15000)
            i++
            if (i === list_address.length) break
        }
    } catch (e) {
        throw 'Error'+ e
    }
}

send_wax(7, 'newuser.wax', 'tp54y.c.wam')