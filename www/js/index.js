(function() {
    'use strict';

    var $amount;

    var data = localStorage.getItem('data');
    if(!data) {
        data = {
            users: [
                {
                    name: 'Max',
                    credit: 0,
                    transfers: [
                        // {
                        //     date: 'Sun Nov 19 2017 18:24:03 GMT+0100 (CET)',
                        //     sum: 5.5,
                        //     comment: 'Trinkgeld'
                        // }
                    ]
                }
            ]
        };
    } else {
        data = JSON.parse(data);
    }

    var activeUser = data.users[0];

    function renderCredit(amount) {
        var stringParts = amount.toFixed(2).split('.');
        $amount.text(stringParts[0] + ',' + stringParts[1]);
    }

    $(document).ready(function(){

        var $plus = $('.button.plus');
        var $minus = $('.button.minus');
        $amount = $('.credit .amount');

        renderCredit(activeUser.credit);

        $minus.on('click', function(){
            activeUser.credit -= 1;
            localStorage.setItem('data', JSON.stringify(data));
            $amount.text(activeUser.credit + ',00');
        });

        $plus.on('click', function(){
            var addition = Credit.renderAdd();
            addition.done(function(result){
                console.log('result', result);
                activeUser.credit += result.sum;
                activeUser.transfers.push({
                    date: new Date().toString(),
                    sum: result.sum,
                    comment: result.comment
                });
                localStorage.setItem('data', JSON.stringify(data));
                renderCredit(activeUser.credit);
            });
            addition.fail(function(){
                console.log('no input');
            });
        });
    });

    $(document).ready(function(){

        var $settings = $('.settings');
        $settings.find('.top').on('click', function(){
            $settings.addClass('opened');
        });

        $settings.find('.bottom').on('click', function(){
            $settings.removeClass('opened');
        });
    })
})();