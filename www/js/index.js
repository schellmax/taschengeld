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

        function showCreditWidget(isAddition) {
            var creditWidget = Credit.render(isAddition);
            creditWidget.done(function(result){
                console.log('result', result);
                activeUser.credit += result.sum;
                activeUser.transfers.push({
                    date: new Date().toString(),
                    sum: result.sum,
                    comment: result.comment
                });
                localStorage.setItem('data', JSON.stringify(data));
                renderCredit(activeUser.credit);

                // animate
                if(result.sum > 0) {
                    var $main = $('body>.page>.main>.center.main');
                    $main.removeClass('happy');
                    $main.width();
                    $main.addClass('happy');
                }
            });
            creditWidget.fail(function(){
                console.log('no input');
            });
        }

        $minus.on('click', function(){
            showCreditWidget(false);
        });

        $plus.on('click', function(){
            showCreditWidget(true);
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