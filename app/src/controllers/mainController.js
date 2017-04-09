(function () {
    angular.module('contactManagerApp').controller('mainController', MainController);
    MainController.$inject = ['userService', '$mdSidenav', '$mdToast', '$mdDialog', '$mdMedia'];
    function MainController(userService, $mdSidenav, $mdToast, $mdDialog, $mdMedia) {
        var vm = this;
        vm.searchText = "";
        vm.tabIndex = 0;

        vm.toggleSidenav = function () {
            $mdSidenav('left').toggle();
        };

        vm.users = userService.loadAllUsers();

        vm.selectUser = function (user) {
            vm.selected = user;

            var sidenav = $mdSidenav('left');
            if (sidenav.isOpen()) {
                sidenav.close();
            }
            vm.tabIndex = 0;
        };

        vm.removeNote = function (note) {
            var foundIndex = vm.selected.notes.indexOf(note);
            vm.selected.notes.splice(foundIndex, 1);
            openToast("Note was removed!");
        };

        vm.addUser = function (ev) {
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'));

            $mdDialog.show({
                templateUrl: 'src/view/newUserDialog.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                controller: NewUserDialogController,
                controllerAs: 'ctrl',
                clickOutsideToClose: true,
                fullscreen: useFullScreen
            }).then(function (user) {
                openToast('User added!')
            }, function () {
                console.log('Yiu cancelled the dialog.');
            });
        };

        vm.clearNotes = function (ev) {
            var confirm = $mdDialog.confirm()
                .title('Are you sure you want to delete all notes?')
                .textContent('All notes will be deleted, you can\'t undou this action')
                .targetEvent(ev)
                .ok('Yes')
                .cancel('No');

            $mdDialog.show(confirm).then(function () {
                vm.selected.notes = [];
                openToast('Cleared notes');
            })
        };

        function openToast(message) {
            $mdToast.show(
                $mdToast.simple()
                    .textContent(message)
                    .position('top right')
                    .hideDelay(3000)
            );
        }

        function NewUserDialogController($mdDialog) {
            var vm = this;

            vm.save = function () {
                $mdDialog.hide({});
            };

            vm.cancel = function () {
                $mdDialog.cancel();
            };
        }
    }
})();