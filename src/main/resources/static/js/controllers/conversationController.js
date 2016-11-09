function conversationController($scope, data, $stateParams) {
    $scope.data = data

    /**
     * Chart
     *
     */
    // $scope.CHART_CAPACITY = 200
    // $scope.CHART_UPDATE_INTERVAL = 1000
    // $scope.CHART_SKIP_ZERO_TICKS = false
    // $scope.chartOptions = {
    //     animation: false,
    //     datasetStrokeWidth: 0.5,
    //     pointDot: false,
    //     showScale: true,
    //     showTooltips: false,
    //     scaleShowLabels: true,
    //     bezierCurve : true
    // };

    $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
    $scope.series = ['Series A', 'Series B'];
    $scope.data = [
        [65, 59, 80, 81, 56, 55, 40],
        [28, 48, 40, 19, 86, 27, 90]
    ];
    $scope.onClick = function (points, evt) {
        console.log(points, evt);
    };
    $scope.datasetOverride = [{ yAxisID: 'y-axis-1' }, { yAxisID: 'y-axis-2' }];
    $scope.options = {
        scales: {
            yAxes: [
                {
                    id: 'y-axis-1',
                    type: 'linear',
                    display: true,
                    position: 'left'
                },
                {
                    id: 'y-axis-2',
                    type: 'linear',
                    display: true,
                    position: 'right'
                }
            ]
        }
    };
}

conversationController.resolve = {
    data: function ($q, $http, $stateParams) {
        var deferred = $q.defer();

        $http({
            method: 'GET',
            url: 'api/conversation/' + $stateParams.conversation + '.me',
            headers: {'Content-Type': 'application/json;charset=UTF-8'}
        })
            .success(function (data) {
                deferred.resolve(data)
            })
            .error(function (data) {
                deferred.reject("error value");
            });

        return deferred.promise;
    }
}