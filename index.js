const uri = "https://slaves-app.ru/api.php?"
const tokenvk = "vk1.a.TOKEN"

const request = require('request');
const { log } = require('./other')

let Account = {
    params: "",
    lhash: "",
    rhash: "",
    bearer: 0
}

api = (b) => {
    return new Promise((res) => {
        request({
            url: 'https://slaves-app.ru/api.php?'+Account.params,
            method: 'POST',
            body: b.replace('RHASH', Account.rhash).replace('LHASH', Account.lhash).replace('BER', Account.bearer + Date.now()),
            headers: {
                "accept": "*/*",
                "accept-language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
                "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                "sec-ch-ua": "\"Google Chrome\";v=\"119\", \"Chromium\";v=\"119\", \"Not?A_Brand\";v=\"24\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "\"macOS\"",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-origin",
                "x-requested-with": "XMLHttpRequest",
                "Referer": "https://slaves-app.ru/index.php?"+Account.params,
                "Referrer-Policy": "strict-origin-when-cross-origin"
            }
        }, async function (error, response, body) {
            let ress = JSON.parse(body)
            if (ress.res){
                if (ress.res == 'Произошла ошибка. Попробуйте очистить кеш и повторить запрос'){
                    await getAccountData()
                }
            }
            if(ress.res == 'CAPTCHA_NEEDED'){
                let ans = eval(bodys.changes.text.replace('=', '==').replace('РАВНО', '==').replace('БОЛЬШЕ', '>').replace('МЕНЬШЕ', '<')) == true ? "1" : "0"
                console.log(await api("answer="+ans+"&method=check_captcha&rhash=RHASH&bearer=BER%7Ccheck_captcha"))
            }
            return res(JSON.parse(body))
        });
    })
}
/*const axios = require('axios');
getAdsData = async () => {
    let res = await axios.post('https://api.vk.com/method/apps.getSecretHash?v=5.223&client_id=6287487', {
        'app_id': '7804694',
        'request_id': 'theft',
        'access_token': tokenvk
    }, {headers: {
        'Accept':'*//*',
        'Accept-Language':'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
        'Content-Length':'265',
        'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8',
        'Origin': 'https://vk.com',
        'Referer': 'https://vk.com/',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36'
    }})
    return {ts: res.data.response.ts, sign: res.data.response.sign}
} */

getAccountData = async () => {
    let token = await new Promise((res) => {
        request({
            url: 'https://api.vk.com/method/apps.get?v=5.154&platform=web&app_id=7804694&access_token='+tokenvk,
            headers: {
                "accept": "*/*",
                "accept-language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
                "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                "sec-ch-ua": "\"Google Chrome\";v=\"119\", \"Chromium\";v=\"119\", \"Not?A_Brand\";v=\"24\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "\"macOS\"",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-origin",
                "x-requested-with": "XMLHttpRequest",
                'Origin': 'https://vk.com',
                'Referer': 'https://vk.com/'
            }
        }, function (error, response, body) {
            //console.log(JSON.parse(body).response.items[0].webview_url);
            //res(JSON.parse(body).response.items[0].webview_url.replace('https://slaves-app.ru/index.php?', "").replace('vk_ref=other', 'vk_ref=catalog_recent'))
            res(JSON.parse(body).response.items[0].webview_url)
        });
    })
    Account.params = token.replace('https://slaves-app.ru/index.php?', "")
    //console.log(Account.params);
    let tokenlhash = await new Promise((res) => {
        request({
            url: token,
            method: 'GET',
            headers: {
                "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
                "accept-language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
                "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                "sec-ch-ua": "\"Google Chrome\";v=\"119\", \"Chromium\";v=\"119\", \"Not?A_Brand\";v=\"24\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "\"macOS\"",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-origin",
                "x-requested-with": "XMLHttpRequest",
                "Referer": 'https://vk.com/',
                "Referrer-Policy": "strict-origin-when-cross-origin",
                'User-Agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
            }
        }, function (error, response, body) {
            let lhashget = body.match(/false,'(.+)',7804694/i)
            let ber = body.match(/= ([0-9]+) \+ Date\.now\(\);/i)
            res([lhashget[1], ber[1]])
        });
    })
    Account.lhash = tokenlhash[0]
    Account.bearer = tokenlhash[1]
    let accountdata = await new Promise((res) => {
        request({
            url: 'https://slaves-app.ru/api.php?'+Account.params,
            method: 'POST',
            body: `notify=true&lhash=${Account.lhash}&im_slave=391808834&system=true&method=info&bearer=1702953679622%7Cinfo`,
            headers: {
                'Accept':'*/*',
                'Accept-Language':'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
                'Content-Length':'121',
                'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8',
                'Origin':'https://slaves-app.ru',
                'Referer':'https://slaves-app.ru/index.php?'+Account.params,
                'User-Agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
                'X-Requested-With':'XMLHttpRequest'
            }
        }, function (error, response, body) {
            //console.log(JSON.parse(body));
            res(JSON.parse(body).res)
        });
    })

    Account.rhash = accountdata.hash

    log(`Аккаунт, ${accountdata.name} [ID:${accountdata.id}], зупещен | Баланс: ${accountdata.balance} | Ваша цена: ${accountdata.ransom_cost} | У вас ${accountdata.slaves_count} рабов`);
}

const ADSHASH = "32,1700577841,_-67uBO1Yay8k8cifGXlt7EEsAWqhr7VT_wQqGGCyzg"
farmAds = async () => {
    //let ads = await getAdsData()
    //console.log(await api('hash=14%2CADSTS%2CADSSIGN&method=on_wat%D1%81h%D0%B5d&rhash=RHASH&bearer=BER%7Con_wat%D1%81h%D0%B5d'.replace('ADSTS', ads.ts).replace('ADSSIGN', ads.sign)));
    let res = await api('hash=ADSHASH&method=on_wat%D1%81h%D0%B5d&rhash=RHASH&bearer=BER%7Con_wat%D1%81h%D0%B5d'.replace('ADSHASH', ADSHASH))
    log(res.res.replace(" <i class='fas fa-coins'></i>", ''))
    setTimeout(farmAds, 20000 + Math.floor(Math.random()*1000))
}

const MAXCOST = 25000
slavesFarm = async () => {
    text = ""
    for (let i = 0; i < 100000; i++) {
        let id = 100000018 + Math.floor(Math.random()*807747535)
        text += `${id}${i < 49 ? "%2C" : ""}`
    }
    let users = await api("friends="+text+"&request_hash=&method=g%D0%B5tMarket.v3&rhash=RHASH&bearer=BER%7Cg%D0%B5tMarket.v3")
    for (let i = 0; i < users.length; i++) {
        const u = users[i];
        if (u.cost <= MAXCOST) {
            let buy = await api("vkid="+u.id+"&hash="+u.hash+"&method=bu%D1%83&rhash=RHASH&bearer=BER%7Cbu%D1%83")
            log(`Покупка раба [ID:${u.id}]: ${buy.res}`);
        }
    }
    setTimeout(slavesFarm, 5000 + Math.floor(Math.random()*1000))
    //"friends="+text+"&request_hash=&method=g%D0%B5tMarket.v3&rhash="+rhash+"&bearer="+bearer+"%7Cg%D0%B5tMarket.v3"
}

const intervalTakeM = 1 // в минутах
takeMoney = async () => {
    // method=get_salar&rhash=979a9cea7340419c2c881819760eff75&bearer=1703292468598%7Cget_salar
    let res = await api("method=get_salar&rhash=RHASH&bearer=BER%7Cget_salar")
    if (res.res != 'Нечего собирать. Вернитесь позже') {
        log(`${res.res.replace(" <i class='fas fa-coins'></i>", "")}, баланс: ${res.changes.balance}`);
    }

    setTimeout(takeMoney, intervalTakeM*60000)
}

main = async () => {
    await getAccountData()

    takeMoney()
}
main()
