(function () {
    angular.module('contactManagerApp', ['ngMaterial', 'ngMdIcons'])
        .config(function ($mdIconProvider, $mdThemingProvider) {
            $mdIconProvider
                .defaultIconSet('../../assets/svg/avatars.svg', 128)
                .icon('menu', '../../assets/svg/menu.svg',24);
            $mdThemingProvider.theme('default')
                .primaryPalette('blue')
                .accentPalette('red');
        });
})();