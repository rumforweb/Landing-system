window.cbFormModalOptions = {
    title : 'Create Account',
    buttonText : 'Sign in'
};

window.onload = (function () {

    var $button = $('.wheel_btn'),
        $counter = $('.wheel_counter_num'),
        $spinner = $('.wheel_spinner'),
        $popupWrap = $('.popup_overlay'),
        $popup_1 = $('#popup_1'),
        $popup_2 = $('#popup_2'),
        $popupBtn_1 = $('#popup_btn_1'),
        $bonus_1 = $('#wheel_bonus_1'),
        $bonus_2 = $('#wheel_bonus_2');

    $button.click(function () {
        if ( $button.hasClass('spin_1') ) {
            spin_1();
        }
        if ( $button.hasClass('spin_2') ) {
            spin_2();
        }
    });

    function spin_1 () {
        $button.removeClass('spin_1').attr('disabled','disabled');
        $counter.html('1');
        $spinner.removeClass('spin_1').addClass('wheel_spinner_animated_1');
        setTimeout(function () {
            localStorage.currentSpin = '0';
            $bonus_1.fadeIn();
            $spinner.removeClass('wheel_spinner_animated_1').removeClass('wheel__spinner_animated');
            $popupWrap.fadeIn().css('display','flex');
            $popup_1.fadeIn();
            $button.addClass('spin_2').removeClass('spin_1');
        }, 4500);
    }

    function spin_2 () {
        $button.removeClass('spin_2').attr('disabled','disabled');
        $counter.html('0');
        $spinner.removeClass('spin_2').addClass('wheel_spinner_animated_2');
        setTimeout(function () {
            localStorage.currentSpin = '0';
            $bonus_2.fadeIn();
            $spinner.removeClass('wheel_spinner_animated');
            $popupWrap.fadeIn().css('display','flex');
            $popup_2.fadeIn();
        }, 4500);
    }

    $popupBtn_1.click(function () {
        $button.removeAttr('disabled');
        $popupWrap.fadeOut();
        $popup_1.fadeOut();
    });

    switch(localStorage.currentSpin) {
        case 'HTMLC_251_csgo_spin_1':
            $counter.html('1');
            $bonus_1.fadeIn();
            $popupWrap.fadeIn().css('display','flex');
            $popup_1.fadeIn();
            $button.addClass('spin_2').removeClass('spin_1');
            break;
        case 'HTMLC_251_csgo_spin_2':
            $counter.html('0');
            $popupWrap.fadeIn().css('display','flex');
            $bonus_1.fadeIn();
            $bonus_2.fadeIn();
            $popup_2.fadeIn();
            $button.removeClass('spin_2');
            $spinner.removeClass('wheel_spinner_animated').css('transform','rotate(1215deg)');
            break;
        default:
            $counter.html('2');
            break
    }

});