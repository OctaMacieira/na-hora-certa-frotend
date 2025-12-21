// Controller da página Home
app.controller('HomeController', ['$scope', '$location', 'RoomService', 
    function($scope, $location, RoomService) {
        $scope.rooms = [];
        $scope.loading = true;
        $scope.error = null;
        
        // Carregar salas da API
        $scope.loadRooms = function() {
            $scope.loading = true;
            $scope.error = null;
            
            RoomService.getAllRooms()
                .then(function(response) {
                    // Limitar a 6 salas
                    $scope.rooms = response.data.slice(0, 6);
                    $scope.loading = false;
                })
                .catch(function(error) {
                    console.error('Erro ao carregar salas:', error);
                    $scope.error = 'Erro ao carregar as salas. Tente novamente mais tarde.';
                    $scope.loading = false;
                    
                    // Dados mock para desenvolvimento
                    $scope.rooms = generateMockRooms();
                });
        };
        
        // Navegar para detalhes da sala
        $scope.viewRoomDetails = function(roomId) {
            $location.path('/sala/' + roomId);
        };
        
        // Extrair bairro do endereço
        $scope.getNeighborhood = function(address) {
            // Implementar lógica para extrair bairro do endereço
            var parts = address.split(',');
            return parts.length > 1 ? parts[parts.length - 2].trim() : 'Bairro não informado';
        };
        
        // Calcular valor total do período
        $scope.calculateTotalValue = function(room) {
            var total = (room.condominium_fee || 0) + (room.iptu || 0);
            return total.toFixed(2);
        };
        
        // Função auxiliar para gerar dados mock
        function generateMockRooms() {
            return [
                {
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
                {
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
                {
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
            ];
        }
        
        // Inicializar
        $scope.loadRooms();
    }
]);
