(function() {
    'use strict';

    var data = localStorage.getItem('data');
    if(!data) {
        data = {
            users: [
                {
                    credit: 0
                }
            ]
        };
    } else {
        data = JSON.parse(data);
    }

    var activeUser = data.users[0];

    $(document).ready(function(){

        var $plus = $('.button.plus');
        var $minus = $('.button.minus');
        var $amount = $('.credit .amount');
        
        $amount.text(activeUser.credit + ',00');

        $minus.on('click', function(){
            activeUser.credit -= 1;
            localStorage.setItem('data', JSON.stringify(data));
            $amount.text(activeUser.credit + ',00');
        });

        $plus.on('click', function(){
            activeUser.credit += 1;
            localStorage.setItem('data', JSON.stringify(data));
            $amount.text(activeUser.credit + ',00');
        });
    })
})();