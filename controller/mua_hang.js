function muaHangController($scope, $http) {
    $scope.arrSon = [];
    $scope.arrMuaHang = [];

    const apiSonUrl = "http://localhost:3000/son";


    $http
    .get(apiSonUrl)
    .then(function(response) {
        $scope.arrSon = response.data;

        for (var i = 0; i < $scope.arrSon.length; i ++) {
            if($scope.arrSon[i].trangThai == 2)  {
                $scope.arrMuaHang.push($scope.arrSon[i]);
            }
        }  

        $scope.tongGiaTri = 0;

        for(var i = 0; i < $scope.arrMuaHang.length; i++) {
            $scope.tongGiaTri += ($scope.arrMuaHang[i].soLuong * $scope.arrMuaHang[i].gia);       
       }

       console.log($scope.tongGiaTri)
       

        console.log($scope.arrSon)     
        console.log($scope.arrMuaHang)

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

    $scope.deleteMuaHang = function(id) {
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
        alert("Sản phẩm đã được xóa khỏi mua hàng")
    }

    


    var citis = document.getElementById("city");
        var districts = document.getElementById("district");
        var wards = document.getElementById("ward");
        var Parameter = {
            url: "https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json",
            method: "GET",
            responseType: "application/json",
        };
        var promise = axios(Parameter);
        promise.then(function (result) {
            renderCity(result.data);
        });

        function renderCity(data) {
            for (const x of data) {
                citis.options[citis.options.length] = new Option(x.Name, x.Id);
            }
            citis.onchange = function () {
                district.length = 1;
                ward.length = 1;
                if (this.value != "") {
                    const result = data.filter(n => n.Id === this.value);

                    for (const k of result[0].Districts) {
                        district.options[district.options.length] = new Option(k.Name, k.Id);
                    }
                }
            };
            district.onchange = function () {
                ward.length = 1;
                const dataCity = data.filter((n) => n.Id === citis.value);
                if (this.value != "") {
                    const dataWards = dataCity[0].Districts.filter(n => n.Id === this.value)[0].Wards;

                    for (const w of dataWards) {
                        wards.options[wards.options.length] = new Option(w.Name, w.Id);
                    }
                }
            };
        }
}

