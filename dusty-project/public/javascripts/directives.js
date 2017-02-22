/**
 * Created by snooze on 21/02/17.
 */

var app = angular.module('dusty-frontend');

app.directive('itemshort', function(){
    return {
        required: '^ngModel',
        scope: {
            model: "=ngModel"
        },
        template: `
        <div class="col s4">
            <div class="card">
                <div class="card-image">
                    <img ng-src="images/{{model.url}}">
                </div>
                <div class="card-content">
                    <span class="card-title">{{model.title}}</span>
                    </p>{{model.autor}}</p>
                    <!--</p>{{model.price}} Eur.</p>-->
                </div>
                <!--<div class="card-action">-->
                    <!--<center>-->
                        <!--<a style="color: indigo;" href="#!/items/{{model.id}}">Ver</a>                    -->
                    <!--</center>-->
                <!--</div>-->
            </div>
        </div>
        `
    };
});

app.directive('catalog', function(){
    return {
        required: '^ngModel',
        scope: {
            items: "=ngModel"
        },
        template: `
        <div class="row">
            <div ng-repeat="item in items">
                <itemshort ng-model="item" />
            </div>
        </div>
        `
    };
});
