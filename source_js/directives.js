var CHDirectives = angular.module('CHDirectives', ['CHServices', 'CHControllers']);

CHDirectives.directive("calendar", [function() {
    return {
        restrict: "E",
        templateUrl: "partials/calendar.html",
        controller: 'DuesController',
        scope: {
            selected: "="
        },
        link: function(scope) {

            scope.initial = _removeTime(scope.selected || moment());
            scope.month = scope.initial.clone();

            var start = scope.initial.clone();
            start.date(1);
            _removeTime(start.day(0));

            _buildMonth(scope, start, scope.month);

            scope.select = function(day) {
                scope.selected = day.date;  
            };

            scope.next = function() {
                var next = scope.month.clone();
                _removeTime(next.month(next.month()+1).date(1));
                scope.month.month(scope.month.month()+1);
                _buildMonth(scope, next, scope.month);
            };

            scope.previous = function() {
                var previous = scope.month.clone();
                _removeTime(previous.month(previous.month()-1).date(1));
                scope.month.month(scope.month.month()-1);
                _buildMonth(scope, previous, scope.month);
            };
        }
    };
    
    function _removeTime(date) {
        return date.day(0).hour(0).minute(0).second(0).millisecond(0);
    }

    function _buildMonth(scope, start, month) {
        scope.weeks = [];
        var done = false, date = start.clone(), monthIndex = date.month(), count = 0;
        while (!done) {
            scope.weeks.push({ days: _buildWeek(date.clone(), month) });
            date.add(1, "w");
            done = count++ > 2 && monthIndex !== date.month();
            monthIndex = date.month();
        }
    }

    function _buildWeek(date, month) {
        var days = [];
        for (var i = 0; i < 7; i++) {
            days.push({
                name: date.format("dd").substring(0, 1),
                number: date.date(),
                isCurrentMonth: date.month() === month.month(),
                isToday: date.isSame(new Date(), "day"),
                date: date
            });
            date = date.clone();
            date.add(1, "d");
        }
        return days;
    }
}]);


CHDirectives.directive("week", function() {
    return {
        restrict: "E",
        templateUrl: "partials/week.html",
        scope: {
            selected: "="
        },
        link: function(scope) {

            scope.initial = _removeTime(scope.selected || moment());
            scope.week = scope.initial.clone();

            var start = scope.initial.clone();

            //_buildMonth(scope, start, scope.month);

            _buildWeek (scope, start, scope.week);

            scope.select = function(day) {
                scope.selected = day.date;  
            };

            scope.next = function() {
                var next = scope.week.clone();
                _removeTime(next.week(next.week()+1).day(0));
                scope.week.week(scope.week.week()+1);
                _buildWeek(scope, next, scope.week);
            };

            scope.previous = function() {
                var previous = scope.week.clone();
                _removeTime(previous.week(previous.week()-1).day(0));
                scope.week.week(scope.week.week()-1);
                _buildWeek(scope, previous, scope.week);
            };
        }
    };
    
    function _removeTime(date) {
        return date.day(0).hour(0).minute(0).second(0).millisecond(0);
    }

    function _buildMonth(scope, start, month) {
        scope.weeks = [];
        var done = false, date = start.clone(), monthIndex = date.month(), count = 0;
        while (!done) {
            scope.weeks.push({ days: _buildWeek(date.clone(), month) });
            date.add(1, "w");
            done = count++ > 2 && monthIndex !== date.month();
            monthIndex = date.month();
        }
    }

    function _buildWeek(scope, date, month) {
        scope.days = [];

        for (var i = 0; i < 7; i++) {
            scope.days.push({
                number: date.date(),
                isToday: date.isSame(new Date(), "day"),
                date: date,
                slots: _buildDay(date)
            });
            date = date.clone();
            date.add(1, "d");
        }
    }

    function _buildDay(date) {
        var slots = [];
        for (var i = 0; i < 24; i++) {
            slots.push ({
                todo: i
            })            
        }
        return slots;
    }
});
 
