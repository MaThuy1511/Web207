function gioHangController($scope, $http) {
    $scope.arrSon = [];
    $scope.arrGioHang = [];

    const apiSonUrl = "http://localhost:3000/son";


    $http
    .get(apiSonUrl)
    .then(function(response) {
        $scope.arrSon = response.data;

        for (var i = 0; i < $scope.arrSon.length; i ++) {
            if($scope.arrSon[i].trangThai == 1)  {
                $scope.arrGioHang.push($scope.arrSon[i]);
            }
        }  
        console.log($scope.arrSon)     
        console.log($scope.arrGioHang)

        $scope.begin = 0;
        $scope.pageCount = Math.ceil($scope.arrSon.length / 3);
        
        $scope.first = function() {
            $scope.begin = 0;
            console.log($scope.begin);
        }
    
        $scope.last = function() {
            $scope.begin = ($scope.pageCount - 1) * 3;
            console.log($scope.begin);
        }
    
        $scope.next = function() {
            if($scope.begin < ($scope.pageCount - 1) * 3) {
                $scope.begin += 3;
                console.log($scope.begin);
            }
        }
        $scope.prev = function() {
            if($scope.begin > 0) {
                $scope.begin -= 3;
                console.log($scope.begin);
            }
        }   
    })
    .catch(function(error) {
        console.log(error);
    })

    $scope.deleteGioHang = function(id) {
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
                    trangThai: 0
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
        alert("Sản phẩm đã được xóa khỏi giỏ hàng")
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