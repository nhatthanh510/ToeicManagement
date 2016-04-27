/**
 * Created by MyPC on 4/22/2016.
 */
(function () {
    'use strict';

    angular
        .module('app')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$location', 'AuthenticationService', 'FlashService', 'UserService'];

    function LoginController( $location, AuthenticationService, FlashService, UserService ) {
        var vm = this;

        vm.login = login;
        vm.register = register;

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

        function login() {
            vm.dataLoading = true;
            AuthenticationService.Login(vm.username, vm.password, function(response) {
                if (response.success) {
                    AuthenticationService.SetCredentials(vm.username, vm.password);
                    $location.path('/home');
                } else {
                    FlashService.Error(response.message);
                    vm.dataLoading = false;
                }
            })
        }

        function register() {
            vm.dataLoading = true;
            UserService.Create(vm.user)
                .then(function (response) {
                    if (response.success) {
                        FlashService.Success('Registration successful', true);
                        $location.path('/login');
                    } else {
                        FlashService.Error(response.message);
                        vm.dataLoading = false;
                    }
                });
        }
    }
})();
