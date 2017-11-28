// Code goes here

var calender = angular.module("calender",[]);

calender.controller("calenderCtrl", function($scope) {
  $scope.months = [1,2,3,4,5,6,7,8,9,10,11,12];
  $scope.years = [2017,2018,2019,2020];
});

calender.directive("eventCalender", function(dates) {
  return {
    templateUrl: 'calender.html',
    controller: function($scope) {
      $scope.selectedYear = 2017;
      $scope.selectedMonth = 1;
      $scope.showAddMeeting = false;
      $scope.event = {};
      $scope.selectUpdate = function() {
         $scope.dates = dates.getAllDays($scope.selectedYear,$scope.selectedMonth);

      }
      $scope.dates = dates.getAllDays($scope.selectedYear,$scope.selectedMonth);

      $scope.addEvent = function(date) {
        $scope.showAddMeeting = true;
        $scope.eventDate = date;
      }; 
      
      $scope.getMeetings = function(date){
        return $scope.event[date.getTime()];
      };
    }
  }
});

calender.directive("scheduleEvent", function() {
  return {
    templateUrl: "schedule-event.html",
    controller: function($scope) {
      $scope.cancelMeeting = function() {
        $scope.showAddMeeting = false;
      };
      $scope.addMeeting = function(eventDate,eventDesc) {
        var eventTime = eventDate.getTime();
        if(!$scope.event[eventTime]){
          $scope.event[eventTime] = [];
        }
        $scope.event[eventTime].push(eventDesc);
        $scope.showAddMeeting = false;
      }
    }
  }
});

calender.service("dates", function() {
  this.getDaysinMonth = function(month,year) {
    return new Date(year, month, 0).getDate();
  };
  this.getAllDays = function(year, month) {
      var s = new Date(year, month-1, 0);
      console.log(s.toString());
      var e = new Date(year, month-1, this.getDaysinMonth(month, year));
      var a = [];
    
      while(s < e) {
        a.push(s);
        s = new Date(s.setDate(s.getDate() + 1))
      }
      return a;
  }
});
