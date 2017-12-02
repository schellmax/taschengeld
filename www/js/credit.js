(function() {
    'use strict';

    var $widget, $main, $amount, $comment;
    var resultDef;
    var isAddition;

    $(document).ready(function(){
        $main = $('body>.page>.main>.center.main');
        $widget = $('body>.page>.main>.center.creditWidget');

        $amount = $widget.find('input.amount');
        $comment = $widget.find('input.comment');

        $widget.find('.content>.check').on('click', function(){
            $main.removeClass('disabled');
            $widget.removeClass('enabled');

            // note: ios won't accept ',' signs, only '.' (otherwise val() returns empty string)
            var amount = $amount.val();
            amount = amount.replace(',', '.');
            amount = amount.replace(/[^0-9.]/g, ''); // https://stackoverflow.com/a/1862149/176140
            amount = parseFloat(amount);

            if(amount !== '' && amount !== 0 && !isNaN(amount)) {
                resultDef.resolve({
                    sum: isAddition ? amount : amount * -1,
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
        render: function(_isAddition) {
            resultDef = $.Deferred();

            isAddition = _isAddition;
            $main.addClass('disabled');
            $widget.addClass('enabled');
            $widget.removeClass('addition');
            $widget.removeClass('subtraction');
            if(isAddition) {
                $widget.addClass('addition');
            } else {
                $widget.addClass('subtraction');
            }

            return resultDef;
        }
    }

})();