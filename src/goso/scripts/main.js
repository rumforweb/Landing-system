'use strict';

/*
 * Script for handle site events.
 *
 * (C) 2019 cyber.bet
 */
$(function () {

    $('.open-nav, .mobile-nav-overlay').on('click', function (e) {
        console.log('click');

        $('.open-nav').toggleClass('close-menu');
        $('.mobile-nav-overlay').toggle();
        $('._mobile-nav').toggle();
    });
});