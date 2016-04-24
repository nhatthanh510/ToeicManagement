/**
 * Created by MyPC on 4/22/2016.
 */
(function () {
    'use strict';

    angular
        .module('app')
        .controller('LoginController', LoginController);

    function LoginController() {
        var vm = this;

        initController();
        function initController() {
            AnimateLoginForm();
        }

        function AnimateLoginForm() {
            $('.form').find('input, textarea').on('keyup blur focus', function (e) {

                var $this = $(this),
                    label = $this.prev('label');

                if (e.type === 'keyup') {
                    if ($this.val() === '') {
                        label.removeClass('active highlight');
                    } else {
                        label.addClass('active highlight');
                    }
                } else if (e.type === 'blur') {
                    if( $this.val() === '' ) {
                        label.removeClass('active highlight');
                    } else {
                        label.removeClass('highlight');
                    }
                } else if (e.type === 'focus') {

                    if( $this.val() === '' ) {
                        label.removeClass('highlight');
                    }
                    else if( $this.val() !== '' ) {
                        label.addClass('highlight');
                    }
                }

            });

            $('.tab a').on('click', function (e) {

                e.preventDefault();

                $(this).parent().addClass('active');
                $(this).parent().siblings().removeClass('active');

                var target = $(this).attr('href');

                $('.tab-content > div').not(target).hide();

                $(target).fadeIn(600);

            });
        }
    }
})();
