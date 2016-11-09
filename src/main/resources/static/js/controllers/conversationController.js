function conversationController($scope, data, $stateParams) {
    $scope.series = {}
    $scope.data = [[],[]]
    $scope.labels = [];
    for (var i = 0; i < data.length; i++) {
        var from = data[i].from
        if (data[i].analysis) {
            $scope.labels.push(i)
            var angr = data[i].analysis.document_tone.tone_categories[0].tones[0].score
            if (from.name == "Антон") {
                $scope.data[0].push(angr)
                $scope.data[1].push(0)
            } else {
                $scope.data[0].push(0)
                $scope.data[1].push(angr)
            }
        }
    }

    /**
     * Chart
     *
     */
    // $scope.CHART_CAPACITY = 200
    // $scope.CHART_UPDATE_INTERVAL = 1000
    // $scope.CHART_SKIP_ZERO_TICKS = false
    $scope.options = {
        animation: false,
        datasetStrokeWidth: 0.5,
        pointDot: false,
        showScale: true,
        scaleShowLabels: true,
        bezierCurve : true
    };

    $scope.series = ["Антон", "Я"];
    $scope.onClick = function (points, evt) {
        console.log(points, evt);
    };
    // $scope.datasetOverride = [{ yAxisID: 'y-axis-1' }, { yAxisID: 'y-axis-2' }];
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