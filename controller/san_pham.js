function sanPhamController($scope, $http) {
    $scope.arrSon = [];

    const apiSonUrl = "http://localhost:3000/son";

    $http
    .get(apiSonUrl)
    .then(function(response) {
        $scope.arrSon = response.data;

        $scope.begin = 0;
        $scope.pageCount = Math.ceil($scope.arrSon.length / 9);
        
        $scope.first = function() {
            $scope.begin = 0;
            console.log($scope.begin);
        }
    
        $scope.last = function() {
            $scope.begin = ($scope.pageCount - 1) * 9;
            console.log($scope.begin);
        }
    
        $scope.next = function() {
            if($scope.begin < ($scope.pageCount - 1) * 9) {
                $scope.begin += 9;
                console.log($scope.begin);
            }
        }
        $scope.prev = function() {
            if($scope.begin > 0) {
                $scope.begin -= 9;
                console.log($scope.begin);
            }
        }   
    })
    .catch(function(error) {
        console.log(error);
    })

    $scope.showAll = function() {
        $http
        .get(apiSonUrl)
        .then(function(response) {
            $scope.arrSon = response.data;
            $scope.products = [];
            for (var i = 0; i < $scope.arrSon.length; i ++) {
                $scope.products.push($scope.arrSon[i]);
            } 
        })
        .catch(function(error) {
            console.log(error);
        })
    }

    $scope.arrThuongHieu = [];

    const apiThuongHieuUrl = "http://localhost:3000/thuongHieu";

    $http
    .get(apiThuongHieuUrl)
    .then(function(response) {
        $scope.arrThuongHieu = response.data;

        console.log($scope.arrSon);

        $scope.products = $scope.arrSon;
        $scope.index = -1;
    
        $scope.showSon = function(index) {
            $scope.index = index;
            $scope.products = [];
           
            $scope.first();

            console.log(index);
            for (var i = 0; i < $scope.arrSon.length; i ++) {
                if($scope.arrSon[i].thuongHieu == $scope.arrThuongHieu[index].thuongHieu)  {
                    $scope.products.push($scope.arrSon[i]);
                }
            }   
            $scope.index = -1;      
        }
    })
    .catch(function(error) {
        console.log(error);
    })

    $scope.gioHang = function(id) {
        console.log("ID:" + id);
        for (var i = 0; i < $scope.arrSon.length; i ++) {
            if($scope.arrSon[i].id == id)  {
                console.log("Trước: " + $scope.arrSon[i].trangThai)

                $scope.son = {
                    id: $scope.arrSon[i].id,
                    hinhAnh: $scope.arrSon[i].hinhAnh,
                    ten: $scope.arrSon[i].ten,
                    thuongHieu: $scope.arrSon[i].thuongHieu,
                    soLuong: $scope.arrSon[i].soLuong,
                    gia: $scope.arrSon[i].gia,
                    thongTin: $scope.arrSon[i].thongTin, 
                    trangThai: 1
                }

                $http
                .put(apiSonUrl + "/" + $scope.arrSon[i].id, $scope.son)
                .then(function() {
                    $scope.arrSon.splice($scope.arrSon[i].id, 1, $scope.son)
                    $scope.indexSelected = -1;
                    console.log("Sau: " + $scope.arrSon[i].trangThai)
                })
                .catch(function(error) {
                    console.log(error);
                })
            }
        } 
        alert("Sản phẩm đã vào giỏ hàng")
    }

    $scope.muaHang = function(id) {
        console.log("ID:" + id);
        for (var i = 0; i < $scope.arrSon.length; i ++) {
            if($scope.arrSon[i].id == id)  {
                console.log("Trước: " + $scope.arrSon[i].trangThai)

                $scope.son = {
                    id: $scope.arrSon[i].id,
                    hinhAnh: $scope.arrSon[i].hinhAnh,
                    ten: $scope.arrSon[i].ten,
                    thuongHieu: $scope.arrSon[i].thuongHieu,
                    soLuong: $scope.arrSon[i].soLuong,
                    gia: $scope.arrSon[i].gia,
                    thongTin: $scope.arrSon[i].thongTin, 
                    trangThai: 2
                }

                $http
                .put(apiSonUrl + "/" + $scope.arrSon[i].id, $scope.son)
                .then(function() {
                    $scope.arrSon.splice($scope.arrSon[i].id, 1, $scope.son)
                    $scope.indexSelected = -1;
                    console.log("Sau: " + $scope.arrSon[i].trangThai)
                })
                .catch(function(error) {
                    console.log(error);
                })
            }
        } 
        alert("Sản phẩm đã vào mua hàng")
    }
}