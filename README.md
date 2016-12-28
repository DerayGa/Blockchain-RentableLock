BlockApps 注意點

* browser-solidity compile 可以過的，用bloc不見得可以過（bloc compile XXX）
* sol 不需要 pragma solidity ^0.4.0;
* 註解不能有中文
* 不接受 payable 描述字
* 編碼用 UTF-8 但不要有BOM
* 透過 block start 可以看到部屬（bloc upload XXX）上去的合約的位址
  http://0.0.0.0:8000/contracts/RentableLockService
* 也可以直接開啟json檔案，目錄 app/meta/XXX/Lastest.json
  有一個「address」欄位，位址是一樣的
* 把位址貼到blockapps的api，可以拿到一串JSON
  http://strato-dev4.blockapps.net/eth/v1.2/account?address=fc049166d839e400eeb2c78b6005d78ff38501e1
  格式如下：
  ```
  [{
    "contractRoot": "bdd4543b5aa99fe2acfde1810591af357c45643b13675674b45fc921809c959a",
    "kind": "AddressStateRef",
    "balance": "0",
    "address": "fc049166d839e400eeb2c78b6005d78ff38501e1",
    "latestBlockNum": 79897,
    "code": " ...",
    "nonce": 0
  }]
  ```
* 不能使用web3
* 使用socket.io監聽事件


額外
* 使用sublime可以安裝 「Ethereum」套件
