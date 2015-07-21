(function() {
    angular
        .module('chatApp', ['ngRoute'])
        .controller('ChatCtrl', ChatCtrl);

    ChatCtrl.$inject = ['socket'];

    function ChatCtrl(socket){
        var vm = this;
        vm.messages = [];
        vm.error = false;
        vm.sendMsg = sendMsg;

        function sendMsg() {
            if(vm.text){
                var data = {
                    name: vm.name || 'anonymous',
                    text: vm.text
                };

                vm.name = "";
                vm.text = "";
                vm.error = false;

                socket.emit('chat message', data);

            } else {
                vm.error = true;
            }
        }

        socket.on('new message', function(data){
            vm.messages.push(data);
        });

        socket.on('chat history', function(messages){
            vm.messages = messages;
        });
    }

})();