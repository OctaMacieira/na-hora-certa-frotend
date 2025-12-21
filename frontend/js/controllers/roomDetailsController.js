// Controller da página de Detalhes da Sala
app.controller('RoomDetailsController', ['$scope', '$routeParams', '$location', 'RoomService', 
    function($scope, $routeParams, $location, RoomService) {
        $scope.room = null;
        $scope.loading = true;
        $scope.error = null;
        $scope.roomId = $routeParams.id;
        
        // Carregar detalhes da sala
        $scope.loadRoomDetails = function() {
            $scope.loading = true;
            $scope.error = null;
            
            RoomService.getRoomById($scope.roomId)
                .then(function(response) {
                    $scope.room = response.data;
                    $scope.loading = false;
                })
                .catch(function(error) {
                    console.error('Erro ao carregar detalhes da sala:', error);
                    $scope.error = 'Erro ao carregar os detalhes da sala.';
                    $scope.loading = false;
                    
                    // Dados mock para desenvolvimento
                    $scope.room = getMockRoom($scope.roomId);
                });
        };
        
        // Calcular valor total
        $scope.calculateTotal = function() {
            if ($scope.room) {
                return ($scope.room.condominium_fee || 0) + ($scope.room.iptu || 0);
            }
            return 0;
        };
        
        // Voltar para home
        $scope.goBack = function() {
            $location.path('/home');
        };
        
        // Extrair bairro do endereço
        $scope.getNeighborhood = function() {
            if ($scope.room && $scope.room.address) {
                var parts = $scope.room.address.split(',');
                return parts.length > 1 ? parts[parts.length - 2].trim() : 'Não informado';
            }
            return 'Não informado';
        };
        
        // Função auxiliar para dados mock
        function getMockRoom(id) {
            var mockRooms = {
                '1': {
                    id: '1',
                    address: 'Rua das Flores, 123, Jardins',
                    zip_code: '01234-567',
                    size: 50,
                    condominium_fee: 500.00,
                    iptu: 200.00,
                    number_of_bathrooms: 2,
                    has_parking_space: true,
                    has_reception: true,
                    doctors_office: true,
                    documents_ok: true
                },
                '2': {
                    id: '2',
                    address: 'Av. Paulista, 1000, Bela Vista',
                    zip_code: '01310-100',
                    size: 80,
                    condominium_fee: 800.00,
                    iptu: 350.00,
                    number_of_bathrooms: 3,
                    has_parking_space: true,
                    has_reception: true,
                    doctors_office: false,
                    documents_ok: true
                },
                '3': {
                    id: '3',
                    address: 'Rua Augusta, 500, Consolação',
                    zip_code: '01305-000',
                    size: 40,
                    condominium_fee: 400.00,
                    iptu: 150.00,
                    number_of_bathrooms: 1,
                    has_parking_space: false,
                    has_reception: false,
                    doctors_office: true,
                    documents_ok: true
                }
            };
            
            return mockRooms[id] || null;
        }
        
        // Inicializar
        $scope.loadRoomDetails();
    }
]);
