var web3, eth;
var balance = {};
var weiToEther = 1000000000000000000;

function timestampToString(timestamp) {
  return Date(+(timestamp) * 1000)
}

function showLog(msg) {
  $('#log').prepend(`<pre>${msg}</pre><br />`)
  console.log(msg);
}

// 當頁面載入完成時
$(function() {
  // 連結 enode
  web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
  eth = web3.eth;
  // 放置 web3 deploy 程式碼
  var rentablelockserviceContract = web3.eth.contract([{"constant":false,"inputs":[],"name":"checkTimeout","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"renter","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"endTime","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"showAccountBalance","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"rent","outputs":[{"name":"","type":"bool"}],"payable":true,"type":"function"},{"constant":false,"inputs":[],"name":"returnLock","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"unlock","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"locked","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"lock","outputs":[],"payable":false,"type":"function"},{"inputs":[],"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"renter","type":"address"},{"indexed":false,"name":"lease","type":"uint256"},{"indexed":false,"name":"timestamp","type":"uint256"}],"name":"Rented","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"tryingrenter","type":"address"},{"indexed":false,"name":"renter","type":"address"},{"indexed":false,"name":"timestamp","type":"uint256"}],"name":"InUse","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"renter","type":"address"},{"indexed":false,"name":"returneddeposit","type":"uint256"},{"indexed":false,"name":"timestamp","type":"uint256"}],"name":"NormalReturned","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"renter","type":"address"},{"indexed":false,"name":"timestamp","type":"uint256"}],"name":"FailureRented","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"renter","type":"address"},{"indexed":false,"name":"timestamp","type":"uint256"}],"name":"Timeout","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"renter","type":"address"},{"indexed":false,"name":"timestamp","type":"uint256"}],"name":"Locked","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"renter","type":"address"},{"indexed":false,"name":"timestamp","type":"uint256"}],"name":"Unlocked","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"renter","type":"address"},{"indexed":false,"name":"balance","type":"uint256"}],"name":"UserBalanceCheck","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"balance","type":"uint256"}],"name":"ServiceBalanceCheck","type":"event"}]);
  var rentablelockservice = rentablelockserviceContract.new(
     {
       from: web3.eth.accounts[0], 
       data: '60606040526001600260006101000a81548160ff02191690837f0100000000000000000000000000000000000000000000000000000000000000908102040217905550662386f26fc100006003600050555b5b610aa0806100606000396000f360606040523615610095576000357c01000000000000000000000000000000000000000000000000000000009004806309bbd6a01461009a5780632e88ab0b146100c45780633197cbb61461010257806331e763871461012a57806382996d9f14610152578063944e2ba914610177578063a69df4b51461018b578063cf3090121461019f578063f83d08ba146101c957610095565b610002565b34610002576100ac60048050506101dd565b60405180821515815260200191505060405180910390f35b34610002576100d6600480505061020d565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34610002576101146004805050610233565b6040518082815260200191505060405180910390f35b346100025761013c600480505061023c565b6040518082815260200191505060405180910390f35b61015f60048050506102cc565b60405180821515815260200191505060405180910390f35b3461000257610189600480505061056a565b005b346100025761019d6004805050610847565b005b34610002576101b1600480505061096a565b60405180821515815260200191505060405180910390f35b34610002576101db600480505061097d565b005b6000600060009050600160005054421115610201576101fa61056a565b6001905080505b809150610209565b5090565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60016000505481565b60007f2bf40cd2c2c5ebc7390132db6009fc24d272dd05b4ab889fa5dc8bdc16461af0333373ffffffffffffffffffffffffffffffffffffffff1631604051808373ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019250505060405180910390a13373ffffffffffffffffffffffffffffffffffffffff163190506102c9565b90565b6000600073ffffffffffffffffffffffffffffffffffffffff16600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161415156103c4577fdb9e809daeb7deb5c5da859b1aea2d6715766ff39b69c8b5d1b1e8dbae82634f33600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1642604051808473ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff168152602001828152602001935050505060405180910390a160009050610567565b60003411151561042c577fd27cb46adb21283523264bc6c0d5b3d28fda266765c068a63d5808dbed077a2b3342604051808373ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019250505060405180910390a160009050610567565b346004600050819055506003600050543481156100025704420160016000508190555033600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c010000000000000000000000009081020402179055507f7c9d2ac912c28eb5f87522b3a227c33e0884aa9c28bf987198e395fe62c49138600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16600360005054348115610002570442604051808473ffffffffffffffffffffffffffffffffffffffff168152602001838152602001828152602001935050505060405180910390a17fd38ea4677aa48cabe4f0cce0000ea2d3be90d68ba5b9db2e5f01bd1ca53d11603073ffffffffffffffffffffffffffffffffffffffff16316040518082815260200191505060405180910390a15b90565b60003373ffffffffffffffffffffffffffffffffffffffff16600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161415156105c857610002565b6000600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c010000000000000000000000009081020402179055506001600260006101000a81548160ff02191690837f01000000000000000000000000000000000000000000000000000000000000009081020402179055507f9f1ec8c880f76798e7b793325d625e9b60e4082a553c98f42b6cda368dd60008600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1642604051808373ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019250505060405180910390a16003600050544260016000505403026004600050540390506000811015156107cb577fae2d043d563b327edf66cc1ffec2c522ee0ec2b0144cb2cef2d9946edd7ef5d5338242604051808473ffffffffffffffffffffffffffffffffffffffff168152602001838152602001828152602001935050505060405180910390a13373ffffffffffffffffffffffffffffffffffffffff166108fc829081150290604051809050600060405180830381858888f19350505050156107c6577fd38ea4677aa48cabe4f0cce0000ea2d3be90d68ba5b9db2e5f01bd1ca53d11603073ffffffffffffffffffffffffffffffffffffffff16316040518082815260200191505060405180910390a15b610843565b7f48f41610c1ed8e474ea2df3e4c778c8e152b4b5d0f4f91a992a4901a94825661600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1642604051808373ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019250505060405180910390a15b5b50565b3373ffffffffffffffffffffffffffffffffffffffff16600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161415156108a357610002565b6108ab6101dd565b1515610967576000600260006101000a81548160ff02191690837f01000000000000000000000000000000000000000000000000000000000000009081020402179055507f0f0bc5b519ddefdd8e5f9e6423433aa2b869738de2ae34d58ebc796fc749fa0d600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1642604051808373ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019250505060405180910390a15b5b565b600260009054906101000a900460ff1681565b3373ffffffffffffffffffffffffffffffffffffffff16600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161415156109d957610002565b6109e16101dd565b1515610a9d576001600260006101000a81548160ff02191690837f01000000000000000000000000000000000000000000000000000000000000009081020402179055507f9f1ec8c880f76798e7b793325d625e9b60e4082a553c98f42b6cda368dd60008600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1642604051808373ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019250505060405180910390a15b5b56', 
       gas: 4700000
     }, function (e, contract){
      if (e) {
        showLog('錯誤', e);
      }
      if (typeof contract.address !== 'undefined') {
        showLog('RentableLockService 部屬完成!');
        contractControl();
      }
   });

  //--------------------------------
  function updateInfo(id, value) {
    $(id).html([$(id).html().split(' :')[0], value].join(' : '));
  }

  function updateUI() {
    var user = eth.accounts[0];
    $('#account').val(user);
    updateInfo('#locked', '上鎖');
  }

  function contractControl() {
    console.log('進入合約控制');
    updateUI();

    rentablelockservice.showAccountBalance({
      from: eth.accounts[0],
    });

    rentablelockservice.Rented({}, function(err, event) {
      showLog(`租用成功
      當前租用者：${event.args.renter}
      租用時間${timestampToString(event.args.lease)}
      時間：${timestampToString(event.args.timestamp)}
      `)
      updateInfo('#renttime', `${event.args.lease} 秒`);
    });

    rentablelockservice.FailureRented({}, function(err, event) {
      showLog(`租用失敗
      時間：${timestampToString(event.args.timestamp)}
      `);
    });

    rentablelockservice.InUse({}, function(err, event) {
      showLog(`已出租他人
      當前租用者：${event.args.renter}
      時間：${timestampToString(event.args.timestamp)}
      `);
    });

    rentablelockservice.NormalReturned({}, function(err, event) {
      showLog(`歸還成功
      餘額：${+(event.args.returneddeposit) / weiToEther} ether
      時間：${timestampToString(event.args.timestamp)}
      `);

      rentablelockservice.showAccountBalance({
        from: eth.accounts[0],
      });
    });

    rentablelockservice.Timeout({}, function(err, event) {
      showLog(`事件：租用逾時
      時間：${timestampToString(event.args.timestamp)}
      `);

      rentablelockservice.showAccountBalance({
        from: eth.accounts[0],
      });
    });

    rentablelockservice.Locked({}, function(err, event) {
      showLog(`事件：上鎖完成
      時間：${timestampToString(event.args.timestamp)}
      `);
      updateInfo('#locked', '上鎖');
    });

    rentablelockservice.Unlocked({}, function(err, event) {
      showLog(`事件：解鎖完成
      時間：${timestampToString(event.args.timestamp)}
      `);
      updateInfo('#locked', '解鎖');
    });

    rentablelockservice.UserBalanceCheck({}, function(err, event) {
      var balance = +(event.args.balance) / weiToEther;
      showLog(`事件：使用者乙太幣餘額
      帳戶：${event.args.renter}
      餘額：${balance}
      `);
      updateInfo('#renterbalance', balance);
    });

    rentablelockservice.ServiceBalanceCheck({}, function(err, event) {
      var balance = +(event.args.balance) / weiToEther;
      showLog(`事件：合約乙太幣餘額
      餘額：${balance}
      `);
      updateInfo('#rentablelockbalance', balance);
    });

    $('#rent').on('click', function() {
      rentablelockservice.rent({
        from: $('#account').val(),
        value: +($('#deposit').val()) * weiToEther,
      });
    });
    $('#return').on('click', function() {
      rentablelockservice.returnLock({
        from: $('#account').val(),
      });
    });
    $('#lock').on('click', function() {
      rentablelockservice.lock({
        from: $('#account').val(),
      });
    });
    $('#unlock').on('click', function() {
      rentablelockservice.unlock({
        from: $('#account').val(),
      });
    });
  }
});
