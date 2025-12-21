// Diretiva para Header Reutilizável
app.directive('appHeader', function() {
    return {
        restrict: 'E',
        templateUrl: 'components/header.html',
        replace: true
    };
});

// Diretiva para Footer Reutilizável
app.directive('appFooter', function() {
    return {
        restrict: 'E',
        templateUrl: 'components/footer.html',
        replace: true
    };
});
