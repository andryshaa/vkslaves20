const uri = "https://slaves-app.ru/api.php?"
const uri_params = "vk_access_token_settings=friends&vk_app_id=7804694&vk_are_notifications_enabled=1&vk_is_app_user=1&vk_is_favorite=0&vk_language=en&vk_platform=desktop_web&vk_ref=catalog_recent&vk_ts=170044711&vk_user_id=1973618&sign=1-OUZuP6s"

const rhash = "1dc7a0cb8f3c859fc7f457597e0"
const bearer = "17023355297"
const lhash = ""

const request = require('request');


req = (b) => {
    return new Promise((res) => {
        request({
            url: 'https://slaves-app.ru/api.php?'+uri_params,
            method: 'POST',
            body: b,
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
            res(JSON.parse(body))
        });
    })
}

pumpkin = async () => {
    let info = await req("method=halloween_load&rhash="+rhash+"&bearer="+bearer+"%7Challoween_load")
    if(info.picking > 0){
        let infopick = await req("type=double&hash=undefined%2C1700407948%2CRGpRdYldrJwS-5dGW-Is3k-o8APgHvNg7pU3eHGLIuM&method=halloween_harvest&rhash="+rhash+"&bearer="+bearer+"%7Challoween_harvest")
        console.log(infopick);
        let infosad = await req("type=free&hash=undefined%2C1700408013%2COlCrHC1kyzAo38mkEMaiJSr58kOzh3bmCtIXERfFDvQ&method=halloween_pour&rhash="+rhash+"&bearer="+bearer+"%7Challoween_pour")
        console.log(infosad);
    }else{
        console.log(await req("type=free&hash=undefined%2C1700407403%2C7w-HXMhAx-YrWth1UIZFCSq8cAQtQkPgGYysQ_eNvi8&method=halloween_speed_up&rhash="+rhash+"&bearer="+bearer+"%7Challoween_speed_up"));
    }

}

main = async () => {
    //console.log(await req("friends=407747535&request_hash=&method=g%D0%B5tMarket.v3&rhash="+rhash+"&bearer="+bearer+"%7Cg%D0%B5tMarket.v3"));
    console.log(await req("hash=12%2C1700408334%2Cy59RiH8-xEVTxcMYyG6d7gjWLop2yBXi-gjVQGhFZJo&method=on_wat%D1%81h%D0%B5d&rhash="+rhash+"&bearer="+bearer+"%7Con_wat%D1%81h%D0%B5d"));
    //await pumpkin()
    setTimeout(main, 20000 + Math.floor(Math.random()*1500));
}
main()