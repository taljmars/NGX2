/*==========================================================
    Author      : Ranjithprabhu K
    Date Created: 24 Dec 2015
    Description : Base for Dashboard Application module

    Change Log
    s.no      date    author     description


 ===========================================================*/

var dashboard = angular.module('dashboard', ['ui.router', 'ngAnimate','ngMaterial']);


dashboard.config(["$stateProvider", function ($stateProvider) {

    //dashboard home page state
    $stateProvider.state('app.dashboard', {
        url: '/dashboard',
        templateUrl: 'app/modules/dashboard/views/home.html',
        controller: 'HomeController',
        controllerAs: 'vm',
        data: {
            pageTitle: 'Home'
        }
    });

    //map page state
    $stateProvider.state('app.map', {
        url: '/map',
        templateUrl: 'app/modules/dashboard/views/map.html',
        controller: 'MapController',
        controllerAs: 'vm',
        data: {
            pageTitle: 'Map'
        }
    });

    //missionAreas page state
    $stateProvider.state('app.missionAreas', {
        url: '/missionAreas',
        templateUrl: 'app/modules/dashboard/views/missionAreas.html',
        controller: 'missionAreasController',
        controllerAs: 'vm',
        data: {
            pageTitle: 'Mission and Areas'
        }
    });

    //education page state
    $stateProvider.state('app.education', {
        url: '/education',
        templateUrl: 'app/modules/dashboard/views/education.html',
        controller: 'EducationController',
        controllerAs: 'vm',
        data: {
            pageTitle: 'Dashboard Home'
        }
    });

    //Achievements page state
    $stateProvider.state('app.achievements', {
        url: '/achievements',
        templateUrl: 'app/modules/dashboard/views/achievements.html',
        controller: 'AchievementsController',
        controllerAs: 'vm',
        data: {
            pageTitle: 'Achievements'
        }
    });

    //Experience page state
    $stateProvider.state('app.experience', {
        url: '/experience',
        templateUrl: 'app/modules/dashboard/views/experience.html',
        controller: 'ExperienceController',
        controllerAs: 'vm',
        data: {
            pageTitle: 'Experience'
        }
    });

    //Drone Log page state
    $stateProvider.state('app.droneLog', {
        url: '/drone-log',
        templateUrl: 'app/modules/dashboard/views/droneLog.html',
        controller: 'DroneLogController',
        controllerAs: 'vm',
        data: {
            pageTitle: 'Drone Log'
        }
    });

    // Portfolio page state
    $stateProvider.state('app.portfolio', {
        url: '/portfolio',
        templateUrl: 'app/modules/dashboard/views/portfolio.html',
        controller: 'PortfolioController',
        controllerAs: 'vm',
        data: {
            pageTitle: 'Portfolio'
        }
    });

    //About Me page state
    $stateProvider.state('app.about', {
        url: '/about-me',
        templateUrl: 'app/modules/dashboard/views/about.html',
        controller: 'AboutController',
        controllerAs: 'vm',
        data: {
            pageTitle: 'About Me'
        }
    });

    //Contact page state
    $stateProvider.state('app.contact', {
        url: '/contact',
        templateUrl: 'app/modules/dashboard/views/contact.html',
        controller: 'ContactController',
        controllerAs: 'vm',
        data: {
            pageTitle: 'Contact Me'
        }
    });

    //Websites page state
    $stateProvider.state('app.websites', {
        url: '/websites',
        templateUrl: 'app/modules/dashboard/views/websites.html',
        controller: 'WebsitesController',
        controllerAs: 'vm',
        data: {
            pageTitle: 'Websites'
        }
    });

    //Gallery page state
    $stateProvider.state('app.gallery', {
        url: '/gallery',
        templateUrl: 'app/modules/dashboard/views/gallery.html',
        controller: 'GalleryController',
        controllerAs: 'vm',
        data: {
            pageTitle: 'Gallery'
        }
    });

    //Search page state
    $stateProvider.state('app.search', {
        url: '/search',
        templateUrl: 'app/modules/dashboard/views/search.html',
        controller: 'appCtrl',
        controllerAs: 'vm',
        data: {
            pageTitle: 'Search'
        }
    });

}]);
