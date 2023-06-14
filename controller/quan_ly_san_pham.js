function quanLySanPhamController($scope, $http, $document) {
    $scope.arrSon = [];
    $scope.arrThuongHieu = [];
    $scope.indexSelected = -1;
    $scope.son = {
        id: 0,
        hinhAnh: "",
        ten: "",
        thuongHieu: "",
        soLuong: 0,
        gia: 0,
        thongTin: "", 
        trangThai: 0
    };

    // $scope.son.thuongHieu = $scope.arrThuongHieu[1];

    const apiSonUrl = "http://localhost:3000/son";

    const apiThuongHieuUrl = "http://localhost:3000/thuongHieu";

    $http
    .get(apiThuongHieuUrl)
    .then(function(response) {
        $scope.arrThuongHieu = response.data;
    })
    .catch(function(error) {
        console.log(error);
    })

    $http
    .get(apiSonUrl)
    .then(function(response) {
        $scope.arrSon = response.data;

        $scope.begin = 0;
        $scope.pageCount = Math.ceil($scope.arrSon.length / 5);
        
        $scope.first = function() {
            $scope.begin = 0;
            console.log($scope.begin);
        }
    
        $scope.last = function() {
            $scope.begin = ($scope.pageCount - 1) * 5;
            console.log($scope.begin);
        }
    
        $scope.next = function() {
            if($scope.begin < ($scope.pageCount - 1) * 5) {
                $scope.begin += 5;
                console.log($scope.begin);
            }
        }
        $scope.prev = function() {
            if($scope.begin > 0) {
                $scope.begin -= 5;
                console.log($scope.begin);
            }
        } 
    })
    .catch(function(error) {
        console.log(error);
    })

    $scope.select = function(index) {
        $scope.indexSelected = index + $scope.begin;
        var id = $scope.arrSon[$scope.indexSelected].id;

        console.log("Bắt đầu: " + $scope.begin)
        console.log("Index Selected: " + $scope.indexSelected)
        console.log("Id: " + id)
        console.log($scope.arrSon[$scope.indexSelected]);

        $http
        .get(apiSonUrl + "/" + id)
        .then(function(response) {
            $scope.son = response.data;
        })
        .catch(function(error) {
            console.log(error);
        })
    }

    $scope.clear = function() {
        $scope.son = {}
        console.log($scope.son)
    }

    $scope.onSubmit = function(event) {
        event.preventDefault();

        if($scope.indexSelected == -1) {
            $http
            .post(apiSonUrl, $scope.son)
            .then(function() {
                $scope.arrSon.push($scope.son)
     
                alert("Thêm thành công")
            })
            .catch(function(error) {
                console.log(error);
            })
        } else {
            $http
            .put(apiSonUrl + "/" + $scope.son.id, $scope.son)
            .then(function() {
                $scope.arrSon.splice($scope.son.id, 1, $scope.son)
                $scope.indexSelected = -1;
                alert("Sửa thành công")
            })
            .catch(function(error) {
                console.log(error);
            })
        }
    }

    $scope.delete = function(index) {
        $scope.indexSelected = index + $scope.begin;
        var id = $scope.arrSon[$scope.indexSelected].id;

        console.log("Index xóa: " + $scope.indexSelected)
            console.log("Id xóa: " + id)
        $http
        .delete(apiSonUrl + "/" + id)
        .then(function() {
            $scope.arrSon.splice(id, 1)
            $scope.indexSelected = -1;
            alert("Xóa thành công")
        })
        .catch(function(error) {
            console.log(error);
        })
    }
    
}