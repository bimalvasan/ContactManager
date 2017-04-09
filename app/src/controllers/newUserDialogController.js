(function () {
    angular.module('contactManagerApp').controller('newUserDialogController', NewUserDialogController);
    NewUserDialogController.$inject = ['$mdDialog'];
    function NewUserDialogController($mdDialog) {
        var vm = this;

        vm.save = function (){
            $mdDialog.hide({});
        };

        vm.cancel = function(){
            $mdDialog.cancel();
        };
    }
});