// Controller da página Cadastrar Sala
app.controller('RegisterRoomController', ['$scope', '$location', 'RoomService', 
    function($scope, $location, RoomService) {
        $scope.room = {
            zip_code: '',
            address: '',
            size: null,
            documents_ok: false,
            condominium_fee: null,
            iptu: null,
            number_of_bathrooms: 1,
            has_parking_space: false,
            has_reception: false,
            doctors_office: false
        };
        
        $scope.loading = false;
        $scope.error = null;
        $scope.success = false;
        
        // Buscar endereço pelo CEP
        $scope.searchAddress = function() {
            if ($scope.room.zip_code && $scope.room.zip_code.length >= 8) {
                RoomService.getAddressByZipCode($scope.room.zip_code)
                    .then(function(response) {
                        if (!response.data.erro) {
                            var addressParts = [
                                response.data.logradouro,
                                response.data.bairro,
                                response.data.localidade,
                                response.data.uf
                            ].filter(Boolean);
                            
                            $scope.room.address = addressParts.join(', ');
                        }
                    })
                    .catch(function(error) {
                        console.error('Erro ao buscar CEP:', error);
                    });
            }
        };
        
        // Submeter formulário
        $scope.submitForm = function() {
            if ($scope.roomForm.$valid) {
                $scope.loading = true;
                $scope.error = null;
                
                RoomService.createRoom($scope.room)
                    .then(function(response) {
                        $scope.loading = false;
                        $scope.success = true;
                        
                        // Redirecionar para home após 2 segundos
                        setTimeout(function() {
                            $scope.$apply(function() {
                                $location.path('/home');
                            });
                        }, 2000);
                    })
                    .catch(function(error) {
                        console.error('Erro ao cadastrar sala:', error);
                        $scope.error = 'Erro ao cadastrar sala. Tente novamente.';
                        $scope.loading = false;
                    });
            }
        };
        
        // Resetar formulário
        $scope.resetForm = function() {
            $scope.room = {
                zip_code: '',
                address: '',
                size: null,
                documents_ok: false,
                condominium_fee: null,
                iptu: null,
                number_of_bathrooms: 1,
                has_parking_space: false,
                has_reception: false,
                doctors_office: false
            };
            $scope.roomForm.$setPristine();
            $scope.roomForm.$setUntouched();
            $scope.error = null;
            $scope.success = false;
        };
    }
]);
