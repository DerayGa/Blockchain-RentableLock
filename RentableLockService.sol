pragma solidity ^0.4.0;
// 105971007 薛德瑞
contract RentableLockService {
    address public renter;
    uint public endTime;
    bool public locked = true;
    uint private convertRate = 0.01 ether;
    uint private deposit;

    event Rented(address renter, uint lease, uint timestamp);
    event InUse(address tryingrenter, address renter, uint timestamp);
    event NormalReturned(address renter, uint returneddeposit, uint timestamp);
    event FailureRented(address renter, uint timestamp);
    event Timeout(address renter, uint timestamp);
    event Locked(address renter, uint timestamp);
    event Unlocked(address renter, uint timestamp);
    event UserBalanceCheck(address renter, uint balance);
    event ServiceBalanceCheck(uint balance);

    function RentableLockService() {
    }

    // 租用鎖的函式
    function rent() payable returns (bool){
        //已經被租用
        if(renter != address(0)) {
            InUse(msg.sender, renter, now);
            return false;
        }

        //沒錢還敢租？ 滾
        if (msg.value <= 0) {
            FailureRented(msg.sender, now);
            return false;
        }
        //記錄租金
        deposit = msg.value;
        //可租用時間從現在開始算 每0.01 ether 1秒
        //now的單位為秒
        endTime = now + (msg.value / convertRate);
        //記錄租用者
        renter = msg.sender;

        Rented(renter, msg.value / convertRate, now);

        //顯示合約餘額
        ServiceBalanceCheck(this.balance);
    }

    function showAccountBalance() returns (uint) {
        //顯示帳戶餘額
        UserBalanceCheck(msg.sender, msg.sender.balance);
        return msg.sender.balance;
    }

    // 歸還鎖的函式
    // 我不喜歡function名稱有底線，把return_ 改成 returnLock
    function returnLock() {
        //還的人不等於借的人，滾！
        if (renter != msg.sender) throw;

        //重設租借者狀態為空值
        renter = address(0);

        //上鎖
        locked = true;
        Locked(renter, now);

        //計算餘額
        var balance = deposit - ((endTime - now) * convertRate);

        //還有餘額就還給租借者
        if (balance >= 0) {
            NormalReturned(msg.sender, balance, now);
            if (msg.sender.send(balance)) {
                //顯示合約餘額
                ServiceBalanceCheck(this.balance);
            }
        } else {
            //觸發逾時事件，嗶嗶
            Timeout(renter, now);
        }
    }

    //檢查租用是否逾時
    function checkTimeout() returns (bool) {
        var isTimeout = false;
        if (now > endTime) {
            //操超過租借時間了，強制歸還
            returnLock();

            isTimeout =  true;
        }
        return isTimeout;
    }

    // 鎖住鎖的函式
    function lock() {
        //操作的人不等於借的人，滾！
        if (renter != msg.sender) throw;

        if (!checkTimeout()) {
            locked = true;
            Locked(renter, now);
        }
    }

    // 解鎖鎖的函式
    function unlock() {
        //操作的人不等於借的人，滾！
        if (renter != msg.sender) throw;

        if (!checkTimeout()) {
            locked = false;
            Unlocked(renter, now);
        }
    }
}