'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$scope','$compile','$http', function($scope, $compile, $http) {
    $scope.notEdit = true;
    $scope.telRequired = false;
    $scope.editContact = function() {
      $scope.notEdit = false;

    };
    $http.get("https://maps.googleapis.com/maps/api/geocode/json?address=paris&key=AIzaSyDKvvBgAkSCugEbXckutuAFuqPzthsCnJ8").then(
        function(response){
          $scope.locationApi = response.data;
          if($scope.locationApi.status === "OK"){
            $scope.lat = $scope.locationApi.results[0].geometry.location.lat;
            $scope.lng = $scope.locationApi.results[0].geometry.location.lng;
          }
        }
    );


    $scope.deleteContact = function(contact) {
        console.log('contact',contact);
        for(var i=0; i<$scope.contacts.length; i++){
          if($scope.contacts[i].name === contact.contact.name) {
            $scope.contacts.splice(i, 1);
          }
        }
    };

    $scope.checkPhone = function(ev){
      console.log('ev',ev);
      var isnum = /^\d+$/.test(ev.target.value);
      if(!isnum) {
        ev.target.classList.add('red-text')

      } else {
        ev.target.classList.remove('red-text')

      }
    };

    $scope.addContact = function() {
      var contactsDiv = document.querySelector('.contacts');
      var contact= '<div class="display-flex w-30-p h-180 white-bg mb-20 p-20 align-items-center justify-space-between">' +
          '<div class="text-center"><img class="contactImg" ng-src="{{contact.img}}" src="Assets/alex jonathan.jpg" alt="contact"/>' +
          '<h4>{{contact.job}}</h4></div>' +
          '<div class="details display-flex flex-direction-col ml--100">' +
          '<span>Name:<input class="text-bold" ng-disabled="notEdit" type="text" ng-model="contact.name"/></span>' +
          '<span><i class="fa fa-map-marker" aria-hidden="true"></i>' +
          '<span>Location:<input ng-disabled="notEdit" type="text" ng-model="contact.location"/></span>' +
          '</span>' +
          '<span>Twitter:<input ng-disabled="notEdit"  class="text-bold" type="text" ng-model="contact.twitter"/></span>' +
          '<span>State:<input ng-disabled="notEdit"  type="text" ng-model="contact.state"/></span>' +
          '<span>Street:<input ng-disabled="notEdit"  type="text" ng-model="contact.street"/></span>' +
          '<span class="text-underline">' +
          '<span>Phone:<input ng-disabled="notEdit" type="tel" onkeyup="checkPhone($event)" pattern="[0-9]" ng-model="contact.phoneNum"/></span>' +
          '</span></div><div class="align-self-end">' +
          '<i class="fa fa-pencil cursor-pointer" aria-hidden="true" ng-click="editContact()"></i>' +
          '<i class="fa fa-trash cursor-pointer" aria-hidden="true" ng-click="deleteContact(this)"></i>' +
          '</div>';

      angular.element(contactsDiv).append( $compile(contact)($scope) )
    };

    $scope.contacts = [{
        name:'Alex Jonathan',
        img:'../app/Assets/alex jonathan.jpg',
        job: 'CEO',
        location: 'Rivera State 32/106',
        twitter:'Twitter,Inc',
        street:'795 Folsom Ave, suit 600',
        state:'San Francisco CA 94107',
        phoneNum: '123456789'
      },
      {
        name:'John Smith',
        img:'../app/Assets/John-Smith.jpg',
        job: 'Sales manager',
        location: 'Rivera State 32/106',
        twitter:'Twitter,Inc',
        street:'795 Folsom Ave, suit 600',
        state:'San Francisco CA 94107',
        phoneNum: '123456789'
      },
      {
        name:'Janeth Carton',
        img:'../app/Assets/Janeth Carton.jpg',
        job: 'Graphics designer',
        location: 'Rivera State 32/106',
        twitter:'Twitter,Inc',
        street:'795 Folsom Ave, suit 600',
        state:'San Francisco CA 94107',
        phoneNum: '123456789'
      },
      {
        name:'Michael zimber',
        img:'../app/Assets/michael zimber.jpg',
        job: 'Graphics designer',
        location: 'Rivera State 32/106',
        twitter:'Twitter,Inc',
        street:'795 Folsom Ave, suit 600',
        state:'San Francisco CA 94107',
        phoneNum: '123456789'
      },
      {
        name:'Alexo Jonathane',
        img:'../app/Assets/alex jonathan.jpg',
        job: 'CEO',
        location: 'Rivera State 32/106',
        twitter:'Twitter,Inc',
        street:'795 Folsom Ave, suit 600',
        state:'San Francisco CA 94107',
        phoneNum: '123456789'
      },
      {
        name:'Johan Smithe',
        img:'../app/Assets/John-Smith.jpg',
        job: 'Sales manager',
        location: 'Rivera State 32/106',
        twitter:'Twitter,Inc',
        street:'795 Folsom Ave, suit 600',
        state:'San Francisco CA 94107',
        phoneNum: '123456789'
      }
    ];
}]);