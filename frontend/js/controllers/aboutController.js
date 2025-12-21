// Controller da página Quem Somos
app.controller('AboutController', ['$scope', function($scope) {
    $scope.pageTitle = 'Quem Somos';
    
    $scope.aboutInfo = {
        title: 'Na Hora Certa - Aluguel de Salas',
        description: 'Somos uma plataforma especializada em conectar profissionais que precisam de espaços comerciais com proprietários que desejam alugar suas salas.',
        mission: 'Nossa missão é facilitar o processo de locação de salas comerciais, oferecendo transparência, praticidade e segurança para ambas as partes.',
        services: [
            'Aluguel de salas comerciais por período',
            'Divulgação de espaços disponíveis',
            'Gestão simplificada de contratos',
            'Suporte completo no processo de locação'
        ]
    };
}]);
