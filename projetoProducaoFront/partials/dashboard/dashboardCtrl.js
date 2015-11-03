(function() {
    'use strict';
    angular.module('ielApp')
    .controller('DashBoardCtrl', ['$scope', '$compile', 'uiCalendarConfig', '$rootScope', '$location','EventoService', function ($scope, $compile, uiCalendarConfig, $rootScope, $location, EventoService) {
    	$rootScope.titulo = "Calendário";
    	$rootScope.activetab = $location.path();
    	$rootScope.esconderHeader = true;
    	
    	$scope.events = [];
    	
    	$scope.updateViewEvents = function(){
	    	EventoService.getEventos().then(function(retorno){
	        	$scope.eventos = retorno;
	        	angular.forEach($scope.eventos,function(evento){
	            	var novoEvento={};
	            	novoEvento.id = evento.id;
	            	novoEvento.title = evento.nome;
	            	novoEvento.start = moment(evento.data).format();
	            	novoEvento.allDay = true;
	            	$scope.events.push(novoEvento);
	            });
	        });
    	};
    	
        var date = new Date();
        var d = date.getDate();
        var m = date.getMonth();
        var y = date.getFullYear();
        $scope.event1 = {title: 'Evento 1', start: new Date(y, m, d)};
        $scope.event2 = {title: 'Evento 2', start: new Date(y, m, d)};
        //$scope.event1.draggable({revert:true,revertDuration:0});

        $scope.changeTo = 'English';
        /* event source that pulls from google.com */
        
        $scope.eventSource = {
            url: "http://www.google.com/calendar/feeds/usa__en%40holiday.calendar.google.com/public/basic",
            className: 'gcal-event',           // an option!
            currentTimezone: 'America/Chicago' // an option!
        };
        
        /* event source that contains custom events on the scope */        
        /*
        $scope.events = [
            {title: 'All Day Event', start: new Date(y, m, 1)},
            {title: 'Evento qualquer', start: new Date(y, m, d + 2)},
            {title: 'EventoTeste1', start: new Date(y, m, d)},
            {title: 'Long Event', start: new Date(y, m, d - 5), end: new Date(y, m, d - 2)},
            {id: 999, title: 'Repeating Event', start: new Date(y, m, d - 3, 16, 0), allDay: false},
            {id: 999, title: 'Repeating Event', start: new Date(y, m, d + 4, 16, 0), allDay: false},
            {
                title: 'Birthday Party',
                start: new Date(y, m, d + 1, 19, 0),
                end: new Date(y, m, d + 1, 22, 30),
                allDay: false
            },
            {title: 'Click for Google', start: new Date(y, m, 28), end: new Date(y, m, 29), url: 'http://google.com/'}
        ];
        */

        $scope.criarEvento = function(){
            var titulo = $scope.nomeNovoEvento;
            //var start = moment($scope.dataNovoEvento).format('DD/MM/YYYY');
            var comeco = $scope.dataNovoEvento;

            if(!comeco){
                console.log(titulo);
                $scope.eventosSemData.push({
                    title:titulo
                });
            }else{
                console.log(titulo + " " +comeco);
                $scope.events.push({
                    title:titulo,
                    start:moment(comeco).format()
                });
            }
            $scope.nomeNovoEvento = "";
            $scope.dataNovoEvento = "";

        };
        
        /* event source that calls a function on every view switch */

        $scope.eventsF = function (start, end, timezone, callback) {
            
            $scope.updateViewEvents();
        };

        /* alert on eventClick */
        $scope.alertOnEventClick = function (date, jsEvent, view) {
            $scope.alertMessage = (date.title + ' was clicked ');
            console.log(date.title);
            $location.path("/evento/"+date.id);
        };
        /* alert on Drop */
        $scope.alertOnDrop = function (event, delta, revertFunc, jsEvent, ui, view) {
            $scope.alertMessage = ('Event Droped to make dayDelta ' + delta);

            console.log(event.title + ", " + event.start);
        };
        /* alert on Resize */
        $scope.alertOnResize = function (event, delta, revertFunc, jsEvent, ui, view) {
            $scope.alertMessage = ('Event Resized to make dayDelta ' + delta);
        };
        /* add and removes an event source of choice */
        $scope.addRemoveEventSource = function (sources, source) {
            var canAdd = 0;
            angular.forEach(sources, function (value, key) {
                if (sources[key] === source) {
                    sources.splice(key, 1);
                    canAdd = 1;
                }
            });
            if (canAdd === 0) {
                sources.push(source);
            }
        };
        /* add custom event*/
        $scope.addEvent = function () {
            $scope.events.push({
                title: 'Open Sesame',
                start: new Date(y, m, 28),
                end: new Date(y, m, 29),
                className: ['openSesame']
            });
        };
        /* remove event */
        $scope.removeEvent = function (index) {
            console.log(index);
            $scope.events.splice(index, 1);
        };
        /* Change View */
        $scope.changeView = function (view, calendar) {
            //uiCalendarConfig.calendars[calendar].fullCalendar('changeView', view);
        	console.log("HUEHUE");
        };
        /* Change View */
        $scope.renderCalender = function (calendar) {
            if (uiCalendarConfig.calendars[calendar]) {
                uiCalendarConfig.calendars[calendar].fullCalendar('render');
                console.log("HUEHUE");
            }
        };
        /* Render Tooltip */
        $scope.eventRender = function (event, element, view) {
            element.attr({
                'tooltip': event.title,
                'tooltip-append-to-body': true
            });
            $compile(element)($scope);
        };
        /* config object */
        $scope.uiConfig = {
            calendar: {
                height: 450,
                editable: true,
                droppable: true,
                header: {
                    left: 'title',
                    center: '',
                    right: 'prev,next'
                },
                drop: function (date, jsEvent, ui) {

                    console.log(date.format('DD/MM/YYYY'));
                    // console.log(ui);
                    // console.log(jsEvent);

                    var eventTitle = jsEvent.target.textContent;
                    var eventStart = date.format();
                    $scope.events.push({
                        title: eventTitle,
                        start: eventStart,
                        className: [eventTitle]
                    });
                    angular.element(jsEvent.toElement).remove();
                    //console.log(angular.element(jsEvent.target.element));


                },
                eventClick: $scope.alertOnEventClick,
                eventDrop: $scope.alertOnDrop,
                eventResize: $scope.alertOnResize,
                eventRender: $scope.eventRender
            }
        };
        //idioma
        $scope.uiConfig.calendar.monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro",
            "Outubro", "Novembro", "Dezembro"];

        $scope.uiConfig.calendar.dayNames = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];

        $scope.uiConfig.calendar.dayNamesShort = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];


        $scope.changeLang = function () {
            if ($scope.changeTo === 'pt-br') {
                $scope.uiConfig.calendar.dayNames = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
                $scope.uiConfig.calendar.dayNamesShort = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];
                $scope.changeTo = 'English';
            } else {
                $scope.uiConfig.calendar.dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
                $scope.uiConfig.calendar.dayNamesShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
                $scope.changeTo = 'pt-br';
            }
        };


        /* event sources array*/
        $scope.eventSources = [$scope.events, $scope.eventsF];


    }]);

}());