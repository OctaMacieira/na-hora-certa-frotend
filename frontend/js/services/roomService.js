// Service para comunicação com a API Backend
app.service('RoomService', ['$http', function($http) {
    // URL base da API backend (ajustar conforme necessário)
    var API_BASE_URL = 'http://localhost:8000/api';
    
    // Obter todas as salas
    this.getAllRooms = function() {
        return $http.get(API_BASE_URL + '/rooms');
    };
    
    // Obter sala por ID
    this.getRoomById = function(id) {
        return $http.get(API_BASE_URL + '/rooms/' + id);
    };
    
    // Cadastrar nova sala
    this.createRoom = function(roomData) {
        return $http.post(API_BASE_URL + '/rooms', roomData);
    };
    
    // Atualizar sala existente
    this.updateRoom = function(id, roomData) {
        return $http.put(API_BASE_URL + '/rooms/' + id, roomData);
    };
    
    // Deletar sala
    this.deleteRoom = function(id) {
        return $http.delete(API_BASE_URL + '/rooms/' + id);
    };
    
    // Buscar endereço pelo CEP (via API externa como ViaCEP)
    this.getAddressByZipCode = function(zipCode) {
        var cleanZipCode = zipCode.replace(/\D/g, '');
        return $http.get('https://viacep.com.br/ws/' + cleanZipCode + '/json/');
    };
}]);
