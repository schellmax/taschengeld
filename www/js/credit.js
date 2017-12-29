(function() {
    'use strict';

    var $widget, $form, $main, $major, $minor, $comment;
    var resultDef;
    var isAddition;

    $(document).ready(function(){
        $main = $('body>.page>.main>.center.main');
        $widget = $('body>.page>.main>.center.creditWidget');
        $form = $widget.find('>form');

        $major = $widget.find('input.major');
        $minor = $widget.find('input.minor');
        $comment = $widget.find('input.comment');

        $minor.on('blur', function(){
            var amount = $minor.val();
            amount = parseInt(amount); // also gets rid '.' signs (possible to enter in some browsers)
            if(amount < 10) {
                // note: when using .val() on input, we always get a string, so it's ok to build one here
                amount = '0' + amount;
            }

            $minor.val(amount);
        });

        $form.on('submit', function(e){
            var major = $major.val();
            var minor = $minor.val();

            if(major === '') {
                major = 0; // prevents 'NaN' when using parseFloat below (in case minor also is an empty string)
            }
            var sum = parseFloat(major + '.' + minor);

            $main.removeClass('disabled');
            $widget.removeClass('enabled');

            $major.val('').blur();
            $minor.val('').blur();
            $comment.val('').blur();

            // wait until transitions finished
            setTimeout(function(){
                resultDef.resolve({
                    sum: isAddition ? sum : -sum,
                    comment: $comment.val()
                });
            }, 500);

            e.preventDefault();
        });

        $widget.find('.content>.check').on('click', function(){
            $form.submit();
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
            $major.focus();

            return resultDef;
        }
    }

})();