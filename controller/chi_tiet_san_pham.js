function chiTietSanPhamController($scope, $http, $routeParams) {

    const apiSonUrl = "http://localhost:3000/son";

    console.log($routeParams);

    $http
    .get(apiSonUrl + "/" + $routeParams.id)
    .then(function(response) {
        console.log(response);
        $scope.son = response.data;
    })
    .catch(function(error) {
        console.log(error);
    })

    $scope.arrThuongHieu = [];

    const apiThuongHieuUrl = "http://localhost:3000/thuongHieu";

    $http
    .get(apiThuongHieuUrl)
    .then(function(response) {
        $scope.arrThuongHieu = response.data;       
    })
    .catch(function(error) {
        console.log(error);
    });
}