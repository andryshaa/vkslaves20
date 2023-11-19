const uri = "https://slaves-app.ru/api.php?"
const uri_params = "vk_access_token_settings=friends&vk_app_id=7804694&vk_are_notifications_enabled=1&vk_is_app_user=1&vk_is_favorite=0&vk_language=en&vk_platform=desktop_web&vk_ref=catalog_recent&vk_ts=170044711&vk_user_id=1973618&sign=1-OUZuP6s"

const rhash = "1dc7a0cb8f3c859fc7f457597e0"
const bearer = "17023355297"
const lhash = ""

const request = require('request');

let text = "407747535%2C"
getSlaves = () => {
    text = ""
    for (let i = 0; i < 100000; i++) {
        let id = 100000018 + Math.floor(Math.random()*807747535)
        text += `${id}${i < 49 ? "%2C" : ""}`
    }
}

main = async () => {
    getSlaves()
    request({
        url: 'https://slaves-app.ru/api.php?'+uri_params,
        method: 'POST',
        body: "friends="+text+"&request_hash=&method=g%D0%B5tMarket.v3&rhash="+rhash+"&bearer="+bearer+"%7Cg%D0%B5tMarket.v3",
        //body: "friends=407747535&request_hash=&method=g%D0%B5tMarket.v3&rhash=2aadf564810da8fa55be505d5d8aa337&bearer=1702386539665%7Cg%D0%B5tMarket.v3",
        //body: "vkid=407747535&hash=d263fd2e9e5f5f7c1d38352bab50dfaa&method=bu%D1%83&rhash=2aadf564810da8fa55be505d5d8aa337&bearer=1702386782651%7Cbu%D1%83",
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
            "Referer": "https://slaves-app.ru/index.php?"+uri_params,
            "Referrer-Policy": "strict-origin-when-cross-origin"
        }
    }, function (error, response, body) {
        let bodys = JSON.parse(body)
        console.log('body:', bodys);
        let a = JSON.parse(body)
        for (let i = 0; i < a.length; i++) {
            const e = a[i];
            if(e.cost <= 50000){
                request({
                    url: 'https://slaves-app.ru/api.php?'+uri_params,
                    method: 'POST',
                    body: "vkid="+e.id+"&hash="+e.hash+"&method=bu%D1%83&rhash="+rhash+"&bearer="+bearer+"%7Cbu%D1%83",
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
                        "Referer": "https://slaves-app.ru/index.php?"+uri_params,
                        "Referrer-Policy": "strict-origin-when-cross-origin"
                    }
                }, function (error, response, body) {
                    let bodys = JSON.parse(body)
                    if (bodys.res){
                        if(bodys.res == 'CAPTCHA_NEEDED'){
                            let ans = eval(bodys.changes.text.replace('=', '==').replace('РАВНО', '==').replace('БОЛЬШЕ', '>').replace('МЕНЬШЕ', '<')) == true ? "1" : "0"
                            request({
                                url: 'https://slaves-app.ru/api.php?'+uri_params,
                                method: 'POST',
                                body: "answer="+ans+"&method=check_captcha&rhash="+rhash+"&bearer="+bearer+"%7Ccheck_captcha",
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
                                    "Referer": "https://slaves-app.ru/index.php?"+uri_params,
                                    "Referrer-Policy": "strict-origin-when-cross-origin"
                                }
                            }, function (error, response, body) {
                                console.log('CAPTHA SEND');
                                console.log('body:', JSON.parse(body));
                            });
                            setTimeout(main, 1000);
                            return
                        }
                    }
                    console.log('body:', JSON.parse(body));
                });
            }
        }
    });
    setTimeout(main, 1000 + Math.floor(Math.random()*500));
}
main()