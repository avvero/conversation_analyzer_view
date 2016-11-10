function conversationController($scope, data, $stateParams) {
    $scope.emotionTones = ["Anger", "Disgust", "Fear", "Joy", "Sadness"]
    $scope.emotionToneId = 0
    $scope.setEmotionToneId = function(id) {
        $scope.emotionToneId = id
        $scope.updateData()
    }
    $scope.series = []
    $scope.data = []
    $scope.labels = []
    $scope.options = {}

    $scope.updateData = function() {
        $scope.series = []
        $scope.data = []
        $scope.labels = []

        var groupedData = {}
        var accounts = {}
        for (var i = 0; i < data.length; i++) {
            if (!accounts[data[i].from.id]) {
                var name = data[i].from.name || data[i].from.id
                accounts[data[i].from.id] = name
            } else {
                if(accounts[data[i].from.id] == data[i].from.id && data[i].from.name) {
                    accounts[data[i].from.id] = data[i].from.name
                }
            }
        }
        for (var account in accounts) {
            $scope.series.push(accounts[account])
            groupedData[account] = []
        }

        for (var i = 0; i < data.length; i++) {
            if (data[i].analysis) {
                $scope.labels.push(data[i].text)
                var angry = data[i].analysis.document_tone.tone_categories[0].tones[$scope.emotionToneId].score
                for (var accountId in groupedData) {
                    if (data[i].from.id == accountId) {
                        groupedData[accountId].push(angry)
                    } else {
                        groupedData[accountId].push(0)
                    }
                }
            }
        }
        for (var accountName in groupedData) {
            $scope.data.push(groupedData[accountName])
        }
        /**
         * Chart
         *
         */
        $scope.options = {
            title: {
                display: true,
                text: 'Tone analysis for the conversation [' + $scope.emotionTones[$scope.emotionToneId] +']'
            },
            legend: {
                display: true,
                position: 'bottom'
            },
            scales: {
                xAxes: [{
                    display: false,
                    scaleLabel: {
                        display: false
                    }
                }],
                yAxes: [{
                    ticks: {
                        max: 1
                    }
                }]
            }
        };
    }
    $scope.updateData()
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