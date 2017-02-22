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

app.directive('itemeditable', function(){
    return {
        required: '^ngModel',
        scope: {
            model: "=ngModel",
            save: "="
        },
        template: `
        <div class="col s10 offset-s1">
            <div class="card">
                <img style="display: inline; position:absolute; height: 300px; width:300px; top: 5%; right: 5%;z-index: 1" ng-src="images/{{model.url}}">
                <div class="card-image">
                    <img ng-src="images/back.jpg">
                </div>
                <div class="card-content">
                    <span class="card-title">{{model.title}}</span>
                    </p><b>Author: </b>{{model.autor}}</p>
                    </p><b>Image: </b>{{model.url}}</p>
                    
                    <form>
                      <div class="row">
                        <div class="input-field col s12">
                          <input ng-model="model.title" id="name" type="text" class="validate" required>
                          <label for="name" class="active">Name</label>
                        </div>
                        <div class="input-field col s12">
                          <input ng-model="model.autor" id="author" type="text" class="validate" required>
                          <label for="author" class="active">Author</label>
                        </div>
                        <div class="input-field col s12">
                          <input ng-model="model.url" id="image" type="text" class="validate" required>
                          <label for="image" class="active">image</label>
                        </div>
                      </div>
                    </form>
                </div>
                <div class="card-action">
                    <center>
                        <a
                            class="btn btn-large waves-effect indigo" 
                            ng-click="save()">
                            Save
                        </a>
                    </center>
                </div>
            </div>
        </div>
        `
    };
});

