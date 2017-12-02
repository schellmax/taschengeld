(function() {
    'use strict';

    var $add, $main, $amount, $comment;
    var resultDef;

    $(document).ready(function(){
        $main = $('body>.page>.main>.center.main');
        $add = $('body>.page>.main>.center.add');

        $amount = $add.find('input.amount');
        $comment = $add.find('input.comment');

        $add.find('.content>.check').on('click', function(){
            $main.removeClass('disabled');
            $add.removeClass('enabled');

            // note: ios won't accept ',' signs, only '.' (otherwise val() returns empty string)
            var amount = $amount.val();
            amount = amount.replace(',', '.');
            amount = amount.replace(/[^0-9.]/g, ''); // https://stackoverflow.com/a/1862149/176140
            amount = parseFloat(amount);

            if(amount !== '' && amount !== 0 && !isNaN(amount)) {
                resultDef.resolve({
                    sum: amount,
                    comment: $comment.text()
                });
            } else {
                resultDef.reject();
            }

            $amount.val('');
            $comment.val('');
        });
    });

    window.Credit = {
        renderAdd: function() {
            resultDef = $.Deferred();
            $main.addClass('disabled');
            $add.addClass('enabled');
            return resultDef;
        }
    }

})();