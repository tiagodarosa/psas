(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/answer/answer.component.css":
/*!*********************************************!*\
  !*** ./src/app/answer/answer.component.css ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".modal {\n    width: 80% !important;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYW5zd2VyL2Fuc3dlci5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0lBQ0kscUJBQXFCO0FBQ3pCIiwiZmlsZSI6InNyYy9hcHAvYW5zd2VyL2Fuc3dlci5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLm1vZGFsIHtcbiAgICB3aWR0aDogODAlICFpbXBvcnRhbnQ7XG59Il19 */"

/***/ }),

/***/ "./src/app/answer/answer.component.html":
/*!**********************************************!*\
  !*** ./src/app/answer/answer.component.html ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"body\">\n\n    <!--Header-->\n    <app-header></app-header>\n  \n    <!-- Spinner -->\n    <ngx-spinner bdColor=\"rgba(0,0,0,0.8)\" size=\"large\" color=\"#00a7f8\" type=\"ball-spin-clockwise\"></ngx-spinner>\n  \n    <!-- Main content -->\n    <main>\n      <div class=\"container\">\n        \n        <!-- Title -->\n        <div class=\"row\">\n          <div class=\"col s12\">\n            <h3 class=\"header\">Responder avaliação</h3>\n            <p class=\"caption\">Aplicação de avaliações que você deve responder.</p>\n          </div>\n        </div>\n\n        <!-- No applications to answer -->\n        <div class=\"row\" *ngIf=\"applicationToAnswer.length<=0\">\n          <div class=\"col s12 center\">\n            <h5 class=\"header\">Tudo certo! Você não tem avaliações para responder.</h5>\n          </div>\n        </div>\n\n        <!-- Applications to answer -->\n        <div class=\"row\">\n          <div class=\"col s12\">\n            <table class=\"highlight\" *ngIf=\"applicationToAnswer.length>0\">\n              <thead>\n                <tr>\n                  <th>Nome</th>\n                  <th>Tipo</th>\n                  <th>Método</th>\n                  <th>Estratégia</th>\n                  <th>Questões</th>\n                  <th>Avaliado</th>\n                  <th>Opções</th>\n                </tr>\n              </thead>\n              <tbody>\n                <tr *ngFor=\"let application of applicationsByUser\">\n                  <td>{{ application.applicationName }}</td>\n                  <td>{{ filterType(application.type) }}</td>\n                  <td>{{ filterMethod(application.method) }}</td>\n                  <td>{{ filterStrategy(application.strategy) }}</td>\n                  <td>{{ application.questionsCount }}</td>\n                  <td>{{ filterName(application.userRated) }}</td>\n                  <td>\n                    <a style=\"cursor: pointer;\" title=\"Avaliar {{ filterName(application.userRated) }}\" (click)=\"answerApplicationModal(application.applicationId, application.userRated)\"><i class=\"material-icons left\">edit</i></a>\n                  </td>\n                </tr>\n              </tbody>\n            </table>\n          </div>\n        </div>\n\n\n        <!-- Modal to answer assessment -->\n        <div id=\"answerApplication\" class=\"modal modal-fixed-footer answerApplication\">\n          <div class=\"modal-content\">\n            <h4>Avaliando {{ filterName(currentUserBeingRated) }}</h4>\n            <!-- Application info -->\n            <div class=\"row\">\n              <p>\n                Nome do avaliado: {{ filterName(currentUserBeingRated) }} <br>\n                Aplicação: {{ currentApplication.name }}<br>\n                Tipo de aplicação: {{ filterType(currentApplication.type) }}<br>\n                Método da aplicação: {{ filterMethod(currentApplication.method) }}<br>\n                Estratégia: {{ filterStrategy(currentApplication.strategy) }}<br>\n              </p>\n            </div>\n            <!-- Questions -->\n            <div class=\"row\">\n              <ul class=\"collapsible expandable\" *ngIf=\"currentApplicationValid\">\n                <li *ngFor=\"let question of currentApplication.assessment.questions; let i = index\" onclick=\"$('.collapsible').collapsible({ accordion: false });\">\n                  <div class=\"collapsible-header\">{{ i+1 }} - {{ question.name | slice:0:40 }}{{ question.name.length > 40 ? '...' : ''}}</div>\n                  <div class=\"collapsible-body\">\n                    <p><b>Questão: </b>{{ question.name }}</p>\n                    <p><b>Competência: </b>{{ question.competenceName }}</p>\n                    <!-- Alternatives -->\n                    <div class=\"row\" *ngIf=\"question.items.length>0\">\n                      <div class=\"col s12 m6 l4 xl3\" *ngFor=\"let item of question.items; let j = index\" style=\"padding: 0;\">\n                        <div class=\"card\" style=\"cursor: pointer;\" id=\"{{ i + '' + j}}\" (click)=\"selectItem(i,j)\">\n                          <div class=\"card-content\">\n                            <p>{{ item.description }}</p>\n                          </div>\n                        </div>\n                      </div>\n                    </div>\n                  </div>\n                </li>\n              </ul>\n            </div>\n            <!-- Comments -->\n            <div class=\"row\">\n              <form class=\"col s12\">\n                <div class=\"row\">\n                  <div class=\"input-field col s12 m6\">\n                    <i class=\"material-icons prefix\">comment</i>\n                    <label class=\"active\" for=\"comments\">Comentários</label>\n                    <input #comments id=\"comments\" type=\"text\" class=\"validate\" value=\"\">\n                  </div>\n                </div>\n              </form>\n            </div>\n\n          </div>\n\n          <!-- Buttons -->\n          <div class=\"modal-footer\">\n            <a class=\"modal-close waves-effect waves-green btn-flat\">Cancelar</a>\n            <a class=\"modal-close waves-effect waves-light light-blue btn\" (click)=\"saveAnswers()\">Salvar</a>\n          </div>\n        </div>\n  \n      </div>\n    </main>\n  \n    <!-- Footer -->\n    <app-footer></app-footer>\n  \n  </div>\n  "

/***/ }),

/***/ "./src/app/answer/answer.component.ts":
/*!********************************************!*\
  !*** ./src/app/answer/answer.component.ts ***!
  \********************************************/
/*! exports provided: AnswerComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AnswerComponent", function() { return AnswerComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services.service */ "./src/app/services.service.ts");
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-spinner */ "./node_modules/ngx-spinner/fesm5/ngx-spinner.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var angularx_social_login__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! angularx-social-login */ "./node_modules/angularx-social-login/angularx-social-login.es5.js");
/* harmony import */ var ngx_cookie_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ngx-cookie-service */ "./node_modules/ngx-cookie-service/ngx-cookie-service.es5.js");







var AnswerComponent = /** @class */ (function () {
    function AnswerComponent(service, spinner, authService, cookie, router) {
        this.service = service;
        this.spinner = spinner;
        this.authService = authService;
        this.cookie = cookie;
        this.router = router;
        this.organizationId = '';
        this.organization = {};
        this.userEmail = '';
        this.applicationToAnswer = [];
        this.applicationsByUser = [];
        this.teamList = [];
        this.assessmentList = [];
        this.currentApplication = {
            name: '',
            type: '',
            method: '',
            strategy: '',
            answers: []
        };
        this.currentUserBeingRated = '';
        this.currentApplicationValid = false;
        this.answers = [];
        this.types = [
            { value: 'initial', description: 'Diagnóstica' },
            { value: 'summative', description: 'Formativa' },
            { value: 'formative', description: 'Somativa' }
        ];
        this.methods = [
            { value: 'ranking', description: 'Ranking' },
            { value: 'nomination', description: 'Nomeação' },
            { value: 'classification', description: 'Classificação' }
        ];
        this.strategies = [
            { value: 'self', description: 'Auto avaliação' },
            { value: 'co', description: 'Co-avaliação' },
            { value: '360', description: 'Avaliação 360º' }
        ];
    }
    AnswerComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.spinner.show();
        this.organizationId = this.cookie.get('ORGANIZATIONID');
        this.authService.authState.subscribe(function (user) {
            _this.userEmail = user.email;
            _this.getApplications();
        });
        $('select').formSelect();
        $('.modal').modal();
    };
    AnswerComponent.prototype.getApplications = function () {
        var _this = this;
        this.applicationToAnswer = [];
        this.applicationsByUser = [];
        this.teamList = [];
        this.assessmentList = [];
        this.answers = [];
        this.service.findApplicationsFromUser().subscribe(function (data) {
            var applications = Object(data);
            _this.organization = applications.organizations.find(function (o) { return o._id === _this.organizationId; });
            var applicationList = Object(applications).applicationList;
            applicationList.forEach(function (application) {
                if (_this.checkApplicationWaitingForAnswer(application) > 0 && application.organizationId === _this.organizationId) {
                    _this.applicationToAnswer.push(application);
                    _this.convertApplicationByUser(application);
                }
            });
            _this.spinner.hide();
        }, function (error) {
            _this.router.navigate(['home']);
        });
    };
    AnswerComponent.prototype.convertApplicationByUser = function (application) {
        var _this = this;
        var answers = Object(application).answers;
        var assessment = Object(application).assessment;
        answers.forEach(function (answer) {
            if (answer.userEvaluator === _this.userEmail && answer.questionOrder === 0 && answer.answer === '') {
                var item = {
                    applicationId: Object(application)._id,
                    type: Object(application).type,
                    method: Object(application).method,
                    strategy: Object(application).strategy,
                    applicationName: Object(application).name,
                    userRated: answer.userRated,
                    questionsCount: assessment.questions.length
                };
                _this.applicationsByUser.push(item);
            }
        });
    };
    AnswerComponent.prototype.checkApplicationWaitingForAnswer = function (application) {
        var _this = this;
        var answers = Object(application).answers;
        var missing = 0;
        answers.forEach(function (answer) {
            if (answer.userEvaluator === _this.userEmail && answer.answer === '') {
                missing++;
            }
        });
        return missing;
    };
    AnswerComponent.prototype.filterType = function (type) {
        try {
            return this.types.find(function (t) { return t.value === type; }).description;
        }
        catch (_a) {
            return type;
        }
    };
    AnswerComponent.prototype.filterMethod = function (method) {
        try {
            return this.methods.find(function (m) { return m.value === method; }).description;
        }
        catch (_a) {
            return method;
        }
    };
    AnswerComponent.prototype.filterStrategy = function (strategy) {
        try {
            return this.strategies.find(function (s) { return s.value === strategy; }).description;
        }
        catch (_a) {
            return strategy;
        }
    };
    AnswerComponent.prototype.filterName = function (user) {
        try {
            var members = Object(this.organization).users;
            return members.find(function (m) { return m.email === user; }).name;
        }
        catch (_a) {
            return user;
        }
    };
    AnswerComponent.prototype.answerApplicationModal = function (applicationId, userRated) {
        this.answers = [];
        this.currentUserBeingRated = userRated;
        this.currentApplication = this.applicationToAnswer.find(function (application) { return application._id === applicationId; });
        if (Object(this.currentApplication).assessment.questions.length > 0) {
            this.currentApplicationValid = true;
            $('#comments').val('');
            M.updateTextFields();
            $('.answerApplication').modal('open');
        }
    };
    AnswerComponent.prototype.selectItem = function (question, item) {
        var ue = this.userEmail;
        var ur = this.currentUserBeingRated;
        var ca = Object(this.currentApplication);
        var iv = ca.assessment.questions[question].items[item].percentage;
        var an = ca.answers.find(function (a) { return a.userEvaluator === ue && a.userRated === ur && a.questionOrder === question; });
        for (var i = 0; i < 20; i++) {
            var optionId = '#' + question + '' + i;
            if (i === item) {
                $(optionId).addClass('light-blue');
                an.answer = iv;
                this.answers = this.answers.filter(function (a) { return a.questionOrder !== question; });
                this.answers.push(an);
            }
            else {
                $(optionId).removeClass('light-blue');
            }
        }
    };
    AnswerComponent.prototype.saveAnswers = function () {
        var _this = this;
        if (confirm('Após salva a resposta, não é possível sua edição. Você esta certo de sua resposta?')) {
            this.spinner.show();
            this.service.saveAnswers(Object(this.currentApplication)._id, this.answers).subscribe(function (data) {
                _this.getApplications();
            }, function (error) {
                _this.router.navigate(['home']);
            });
        }
    };
    AnswerComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-answer',
            template: __webpack_require__(/*! ./answer.component.html */ "./src/app/answer/answer.component.html"),
            styles: [__webpack_require__(/*! ./answer.component.css */ "./src/app/answer/answer.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_services_service__WEBPACK_IMPORTED_MODULE_2__["ServicesService"],
            ngx_spinner__WEBPACK_IMPORTED_MODULE_3__["NgxSpinnerService"],
            angularx_social_login__WEBPACK_IMPORTED_MODULE_5__["AuthService"],
            ngx_cookie_service__WEBPACK_IMPORTED_MODULE_6__["CookieService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"]])
    ], AnswerComponent);
    return AnswerComponent;
}());



/***/ }),

/***/ "./src/app/app.component.css":
/*!***********************************!*\
  !*** ./src/app/app.component.css ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2FwcC5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<router-outlet></router-outlet>\n\n\n\n\n"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var AppComponent = /** @class */ (function () {
    function AppComponent() {
        this.title = 'PSAS';
    }
    AppComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.css */ "./src/app/app.component.css")]
        })
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: provideConfig, tokenGetter, NoCacheHeadersInterceptor, AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "provideConfig", function() { return provideConfig; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tokenGetter", function() { return tokenGetter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NoCacheHeadersInterceptor", function() { return NoCacheHeadersInterceptor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _auth0_angular_jwt__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @auth0/angular-jwt */ "./node_modules/@auth0/angular-jwt/index.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-spinner */ "./node_modules/ngx-spinner/fesm5/ngx-spinner.js");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _core_header_header_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./core/header/header.component */ "./src/app/core/header/header.component.ts");
/* harmony import */ var _routing_module__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./routing.module */ "./src/app/routing.module.ts");
/* harmony import */ var _user_user_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./user/user.component */ "./src/app/user/user.component.ts");
/* harmony import */ var _home_home_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./home/home.component */ "./src/app/home/home.component.ts");
/* harmony import */ var _help_help_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./help/help.component */ "./src/app/help/help.component.ts");
/* harmony import */ var _privacy_privacy_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./privacy/privacy.component */ "./src/app/privacy/privacy.component.ts");
/* harmony import */ var _contact_contact_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./contact/contact.component */ "./src/app/contact/contact.component.ts");
/* harmony import */ var angularx_social_login__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! angularx-social-login */ "./node_modules/angularx-social-login/angularx-social-login.es5.js");
/* harmony import */ var _core_footer_footer_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./core/footer/footer.component */ "./src/app/core/footer/footer.component.ts");
/* harmony import */ var _organization_organization_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./organization/organization.component */ "./src/app/organization/organization.component.ts");
/* harmony import */ var _team_team_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./team/team.component */ "./src/app/team/team.component.ts");
/* harmony import */ var _assessment_assessment_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./assessment/assessment.component */ "./src/app/assessment/assessment.component.ts");
/* harmony import */ var _notfound_notfound_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./notfound/notfound.component */ "./src/app/notfound/notfound.component.ts");
/* harmony import */ var _dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./dashboard/dashboard.component */ "./src/app/dashboard/dashboard.component.ts");
/* harmony import */ var _project_project_component__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./project/project.component */ "./src/app/project/project.component.ts");
/* harmony import */ var _organization_organization_details_organization_details_component__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./organization/organization-details/organization-details.component */ "./src/app/organization/organization-details/organization-details.component.ts");
/* harmony import */ var _team_team_details_team_details_component__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./team/team-details/team-details.component */ "./src/app/team/team-details/team-details.component.ts");
/* harmony import */ var _assessment_assessment_details_assessment_details_component__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./assessment/assessment-details/assessment-details.component */ "./src/app/assessment/assessment-details/assessment-details.component.ts");
/* harmony import */ var _application_application_component__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./application/application.component */ "./src/app/application/application.component.ts");
/* harmony import */ var _competence_competence_component__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./competence/competence.component */ "./src/app/competence/competence.component.ts");
/* harmony import */ var ngx_cookie_service__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ngx-cookie-service */ "./node_modules/ngx-cookie-service/ngx-cookie-service.es5.js");
/* harmony import */ var _profile_profile_component__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./profile/profile.component */ "./src/app/profile/profile.component.ts");
/* harmony import */ var _attendance_attendance_component__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./attendance/attendance.component */ "./src/app/attendance/attendance.component.ts");
/* harmony import */ var _answer_answer_component__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ./answer/answer.component */ "./src/app/answer/answer.component.ts");
/* harmony import */ var _member_member_component__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ./member/member.component */ "./src/app/member/member.component.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");


































var config = new angularx_social_login__WEBPACK_IMPORTED_MODULE_14__["AuthServiceConfig"]([
    {
        id: angularx_social_login__WEBPACK_IMPORTED_MODULE_14__["GoogleLoginProvider"].PROVIDER_ID,
        provider: new angularx_social_login__WEBPACK_IMPORTED_MODULE_14__["GoogleLoginProvider"]('929484490456-cc41rqbu22rpl9td26v6i4k299mvje7p')
    }
    //   ,{ 
    //     id: FacebookLoginProvider.PROVIDER_ID,
    //     provider: new FacebookLoginProvider('5001152149915134')
    //   }
]);
function provideConfig() {
    return config;
}
function tokenGetter() {
    return localStorage.getItem('access_token');
}
var NoCacheHeadersInterceptor = /** @class */ (function () {
    function NoCacheHeadersInterceptor() {
    }
    NoCacheHeadersInterceptor.prototype.intercept = function (req, next) {
        var authReq = req.clone({
            setHeaders: {
                'Cache-Control': 'no-cache',
                Pragma: 'no-cache'
            }
        });
        return next.handle(authReq);
    };
    NoCacheHeadersInterceptor = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Injectable"])()
    ], NoCacheHeadersInterceptor);
    return NoCacheHeadersInterceptor;
}());

var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_6__["AppComponent"],
                _core_header_header_component__WEBPACK_IMPORTED_MODULE_7__["HeaderComponent"],
                _user_user_component__WEBPACK_IMPORTED_MODULE_9__["UserComponent"],
                _home_home_component__WEBPACK_IMPORTED_MODULE_10__["HomeComponent"],
                _help_help_component__WEBPACK_IMPORTED_MODULE_11__["HelpComponent"],
                _privacy_privacy_component__WEBPACK_IMPORTED_MODULE_12__["PrivacyComponent"],
                _contact_contact_component__WEBPACK_IMPORTED_MODULE_13__["ContactComponent"],
                _core_footer_footer_component__WEBPACK_IMPORTED_MODULE_15__["FooterComponent"],
                _organization_organization_component__WEBPACK_IMPORTED_MODULE_16__["OrganizationComponent"],
                _team_team_component__WEBPACK_IMPORTED_MODULE_17__["TeamComponent"],
                _assessment_assessment_component__WEBPACK_IMPORTED_MODULE_18__["AssessmentComponent"],
                _notfound_notfound_component__WEBPACK_IMPORTED_MODULE_19__["NotfoundComponent"],
                _dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_20__["DashboardComponent"],
                _project_project_component__WEBPACK_IMPORTED_MODULE_21__["ProjectComponent"],
                _organization_organization_details_organization_details_component__WEBPACK_IMPORTED_MODULE_22__["OrganizationDetailsComponent"],
                _team_team_details_team_details_component__WEBPACK_IMPORTED_MODULE_23__["TeamDetailsComponent"],
                _assessment_assessment_details_assessment_details_component__WEBPACK_IMPORTED_MODULE_24__["AssessmentDetailsComponent"],
                _application_application_component__WEBPACK_IMPORTED_MODULE_25__["ApplicationComponent"],
                _competence_competence_component__WEBPACK_IMPORTED_MODULE_26__["CompetenceComponent"],
                _profile_profile_component__WEBPACK_IMPORTED_MODULE_28__["ProfileComponent"],
                _attendance_attendance_component__WEBPACK_IMPORTED_MODULE_29__["AttendanceComponent"],
                _answer_answer_component__WEBPACK_IMPORTED_MODULE_30__["AnswerComponent"],
                _member_member_component__WEBPACK_IMPORTED_MODULE_31__["MemberComponent"]
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"],
                _routing_module__WEBPACK_IMPORTED_MODULE_8__["AppRoutingModule"],
                angularx_social_login__WEBPACK_IMPORTED_MODULE_14__["SocialLoginModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClientModule"],
                _auth0_angular_jwt__WEBPACK_IMPORTED_MODULE_3__["JwtModule"].forRoot({
                    config: {
                        tokenGetter: tokenGetter,
                        whitelistedDomains: [
                            'localhost:4200',
                            'us-south.functions.cloud.ibm.com',
                            'https://us-south.functions.cloud.ibm.com/*',
                            'https://us-south.functions.cloud.ibm.com/',
                            'https://us-south.functions.cloud.ibm.com/api/v1/web/psas_psas/default/teste.json',
                            'https://us-south.functions.cloud.ibm.com/api/v1/web/psas_psas/default/',
                            'https://us-south.functions.cloud.ibm.com/api/v1/web/psas_psas/default'
                        ],
                        blacklistedRoutes: []
                    }
                }),
                ngx_spinner__WEBPACK_IMPORTED_MODULE_5__["NgxSpinnerModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_32__["FormsModule"]
            ],
            providers: [
                {
                    provide: angularx_social_login__WEBPACK_IMPORTED_MODULE_14__["AuthServiceConfig"],
                    useFactory: provideConfig
                },
                {
                    provide: _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HTTP_INTERCEPTORS"],
                    useClass: NoCacheHeadersInterceptor,
                    multi: true
                },
                ngx_cookie_service__WEBPACK_IMPORTED_MODULE_27__["CookieService"]
            ],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_6__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/application/application.component.css":
/*!*******************************************************!*\
  !*** ./src/app/application/application.component.css ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2FwcGxpY2F0aW9uL2FwcGxpY2F0aW9uLmNvbXBvbmVudC5jc3MifQ== */"

/***/ }),

/***/ "./src/app/application/application.component.html":
/*!********************************************************!*\
  !*** ./src/app/application/application.component.html ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"body\">\n\n    <!--Header-->\n    <app-header></app-header>\n\n    <!-- Spinner -->\n    <ngx-spinner bdColor=\"rgba(0,0,0,0.8)\" size=\"large\" color=\"#00a7f8\" type=\"ball-spin-clockwise\"></ngx-spinner>\n  \n    <!-- Main content -->\n    <main>\n      <div class=\"container\">\n\n        <!-- Title -->\n        <div class=\"row\">\n          <div class=\"col s12\">\n            <h3 class=\"header\">Aplicar avaliação</h3>\n          </div>\n        </div>\n\n        <!-- No application-->\n        <div class=\"row\" *ngIf=\"myApplications.length<=0\">\n          <div class=\"col s12 center\">\n            <h5 class=\"header\">Nenhuma aplicação nesta organização!</h5>\n            <p class=\"caption\" *ngIf=\"userProfile==='organizationManager' || userProfile==='projectManager' || userProfile==='teamManager'\">\n              Crie uma aplicação clicando no botão \"Nova aplicação\" ou solicite para o gestor da organização ou gestor de equipe para saber quando uma avaliação será aplicada.\n            </p>\n          </div>\n        </div>\n\n\n        <!-- Applications -->\n        <div class=\"row\">\n          <div class=\"col s12\">\n            <table class=\"highlight\" *ngIf=\"myApplications.length>0\">\n              <thead>\n                <tr>\n                  <th>Nome</th>\n                  <th>Equipe</th>\n                  <th>Tipo</th>\n                  <th>Método</th>\n                  <th>Estratégia</th>\n                  <th>Status</th>\n                  <th *ngIf=\"userProfile==='organizationManager' || userProfile==='projectManager' || userProfile==='teamManager'\">Opções</th>\n                </tr>\n              </thead>\n              <tbody>\n                <tr *ngFor=\"let application of myApplications\">\n                  <td>{{ application.name }}</td>\n                  <td>{{ application.team.name }}</td>\n                  <td>{{ filterType(application.type) }}</td>\n                  <td>{{ filterMethod(application.method) }}</td>\n                  <td>{{ filterStrategy(application.strategy) }}</td>\n                  <td>{{ filterStatus(application.status) }}{{ application.status === 'active' ? ' - ' + filterPercentage(application) + '%' : '' }}</td>\n                  <td *ngIf=\"userProfile==='organizationManager' || userProfile==='projectManager' || userProfile==='teamManager'\">\n                    <a *ngIf=\"application.status === 'active'\" style=\"cursor: pointer;\" title=\"Acompanhar aplicação\" (click)=\"attendanceModal(application._id)\"><i class=\"material-icons left\">show_chart</i></a>\n                    <a style=\"cursor: pointer;\" title=\"Excluir aplicação\" (click)=\"deleteApplicationModal(application._id)\"><i class=\"material-icons left\">delete</i></a>\n                  </td>\n                </tr>\n              </tbody>\n            </table>\n          </div>\n        </div>\n\n<<<<<<< HEAD\n        \n        <!-- Modal for new application -->\n        <div id=\"addApplication\" class=\"modal modal-fixed-footer addApplication\">\n          <div class=\"modal-content\">\n=======\n        <!-- Buttons -->\n        <div class=\"row\" *ngIf=\"userProfile==='organizationManager' || userProfile==='projectManager' || userProfile==='teamManager'\">\n          <div class=\"col s12 center\">\n            <a class=\"waves-effect waves-light light-blue btn-large\" (click)=\"addApplicationModal()\"><i class=\"material-icons left\">add</i>Nova aplicação</a>\n          </div>\n        </div>\n\n        <!-- User without access -->\n        <div class=\"row\" *ngIf=\"userProfile!=='organizationManager' && userProfile!=='projectManager' && userProfile!=='teamManager'\">\n          <div class=\"col s12 center\">\n            <p class=\"caption\">Você não possui acesso para adicionar, alterar ou excluir aplicações.</p>\n          </div>\n        </div>\n\n        <!-- Modal for new application -->\n      <div id=\"addApplication\" class=\"modal modal-fixed-footer addApplication\">\n        <div class=\"modal-content\">\n>>>>>>> 5caf4ad23b584424c65f3c809fd185d975ccb9e3\n          <h4>Nova aplicação de avaliação</h4>\n          <p>\n            Informe os dados para criação da aplicação.\n          </p>\n          <div class=\"row\">\n            <form class=\"col s12\">\n              <div class=\"row\">\n                <div class=\"input-field col s6\">\n                  <i class=\"material-icons prefix\">description</i>\n                  <input #name id=\"name\" type=\"text\" class=\"validate\">\n                  <label for=\"name\">Nome</label>\n                </div>\n              </div>\n              <div class=\"row\">\n                <div class=\"input-field col s6\">\n                  <i class=\"material-icons prefix\">group_work</i>\n                  <label for=\"team\" class=\"active\">Equipe</label>\n                  <select #team id=\"team\" class=\"validate\">\n<<<<<<< HEAD\n                    <option *ngFor='let team of teamList' [value]=\"team._id\">\n                      {{ team.name }}\n                    </option>\n=======\n                      <option *ngFor='let team of teamList' [value]=\"team._id\">\n                        {{ team.name }}\n                      </option>\n>>>>>>> 5caf4ad23b584424c65f3c809fd185d975ccb9e3\n                  </select>\n                </div>\n              </div>\n              <div class=\"row\">\n                <div class=\"input-field col s6\">\n                  <i class=\"material-icons prefix\">assessment</i>\n                  <label for=\"assessment\" class=\"active\">Avaliação</label>\n                  <select #assessment id=\"assessment\" class=\"validate\">\n<<<<<<< HEAD\n                    <option *ngFor='let assessment of assessmentList' [value]=\"assessment._id\">\n                      {{ assessment.name }}\n                    </option>\n=======\n                      <option *ngFor='let assessment of assessmentList' [value]=\"assessment._id\">\n                        {{ assessment.name }}\n                      </option>\n>>>>>>> 5caf4ad23b584424c65f3c809fd185d975ccb9e3\n                  </select>\n                </div>\n              </div>\n              <div class=\"row\">\n                <div class=\"input-field col s6\">\n                  <i class=\"material-icons prefix\">search</i>\n                  <label for=\"type\" class=\"active\">Tipo</label>\n                  <select #type id=\"type\" class=\"validate\">\n<<<<<<< HEAD\n                    <option *ngFor='let type of types' [value]=\"type.value\">\n                      {{ type.description }}\n                    </option>\n=======\n                      <option *ngFor='let type of types' [value]=\"type.value\">\n                        {{ type.description }}\n                      </option>\n>>>>>>> 5caf4ad23b584424c65f3c809fd185d975ccb9e3\n                  </select>\n                </div>\n              </div>\n              <div class=\"row\">\n                <div class=\"input-field col s6\">\n                  <i class=\"material-icons prefix\">dashboard</i>\n                  <label for=\"method\" class=\"active\">Método</label>\n                  <select #method id=\"method\" class=\"validate\">\n<<<<<<< HEAD\n                    <option *ngFor='let method of methods' [value]=\"method.value\">\n                      {{ method.description }}\n                    </option>\n=======\n                      <option *ngFor='let method of methods' [value]=\"method.value\">\n                        {{ method.description }}\n                      </option>\n>>>>>>> 5caf4ad23b584424c65f3c809fd185d975ccb9e3\n                  </select>\n                </div>\n              </div>\n              <div class=\"row\">\n                <div class=\"input-field col s6\">\n                  <i class=\"material-icons prefix\">cached</i>\n                  <label for=\"strategy\" class=\"active\">Estratégia</label>\n                  <select #strategy id=\"strategy\" class=\"validate\">\n<<<<<<< HEAD\n                    <option *ngFor='let strategy of strategies' [value]=\"strategy.value\">\n                      {{ strategy.description }}\n                    </option>\n=======\n                      <option *ngFor='let strategy of strategies' [value]=\"strategy.value\">\n                        {{ strategy.description }}\n                      </option>\n>>>>>>> 5caf4ad23b584424c65f3c809fd185d975ccb9e3\n                  </select>\n                </div>\n              </div>\n            </form>\n          </div>\n        </div>\n        <div class=\"modal-footer\">\n          <a class=\"modal-close waves-effect waves-green btn-flat\">Cancelar</a>\n          <a class=\"modal-close waves-effect waves-light light-blue btn\" (click)=\"addApplication(name.value, team.value, assessment.value, type.value, method.value, strategy.value)\">Salvar</a>\n        </div>\n      </div>\n<<<<<<< HEAD\n      \n      <!-- Buttons -->\n      <div class=\"row\" *ngIf=\"userProfile==='organizationManager' || userProfile==='projectManager' || userProfile==='teamManager'\">\n        <div class=\"col s12 center\">\n          <a class=\"waves-effect waves-light light-blue btn-large\" (click)=\"addApplicationModal()\"><i class=\"material-icons left\">add</i>Nova aplicação</a>\n        </div>\n      </div>\n\n      <!-- User without access -->\n      <div class=\"row\" *ngIf=\"userProfile!=='organizationManager' && userProfile!=='projectManager' && userProfile!=='teamManager'\">\n        <div class=\"col s12 center\">\n          <p class=\"caption\">Você não possui acesso para adicionar, alterar ou excluir aplicações.</p>\n        </div>\n      </div>\n      \n      <!-- Modal for attendance of application -->\n      <div id=\"attendance\" class=\"modal modal-fixed-footer attendance\">\n        <div class=\"modal-content\">\n          <h4>Acompanhar aplicação</h4>\n          <p>\n              Status dos membros que responderam e que não responderam a avaliação.\n            </p>\n            <table class = \"highlight\">\n              <thead>\n                <tr>\n                  <th>Avaliador</th>\n                  <th>Avaliado</th>\n                  <th>Status</th>\n                </tr>\n              </thead>\n              <tbody>\n                <tr *ngFor=\"let member of listOfAnswers\">  \n                  <td>{{member.userEvaluator}}</td>\n                  <td>{{member.userRated}}</td>\n                  <td>\n                    <i *ngIf=\" member.missing > 0\" class = \"material-icons left\" style = \"color:red;\"> close</i>\n                    <i *ngIf=\" member.missing === 0\" class = \"material-icons left\" style = \"color:green;\"> check</i>\n                  </td>                    \n                </tr>\n              </tbody>\n            </table>\n=======\n\n\n        <!-- Modal for attendance of application -->\n        <div id=\"attendance\" class=\"modal modal-fixed-footer attendance\">\n          <div class=\"modal-content\">\n            <h4>Acompanhar aplicação</h4>\n            <p>\n              Em desenvolvimento.\n            </p>\n>>>>>>> 5caf4ad23b584424c65f3c809fd185d975ccb9e3\n          </div>\n          <div class=\"modal-footer\">\n            <a class=\"modal-close waves-effect waves-green btn-flat\">Fechar</a>\n          </div>\n        </div>\n\n        <!-- Modal to delete application -->\n        <div id=\"deleteApplication\" class=\"modal modal-fixed-footer deleteApplication\">\n          <div class=\"modal-content\">\n            <h4>Excluir aplicação</h4>\n            <p>\n              Você tem certeza que deseja excluir a aplicação da avaliação?\n              Essa ação não poderá ser desfeita!\n            </p>\n          </div>\n          <div class=\"modal-footer\">\n            <a class=\"modal-close waves-effect waves-green btn-flat\">Cancelar</a>\n            <a class=\"modal-close waves-effect waves-light red btn\" (click)=\"deleteApplication()\">Excluir</a>\n          </div>\n        </div>\n\n\n\n\n\n      </div>\n    </main>\n  \n    <!-- Footer -->\n    <app-footer></app-footer>\n  \n  </div>\n  "

/***/ }),

/***/ "./src/app/application/application.component.ts":
/*!******************************************************!*\
  !*** ./src/app/application/application.component.ts ***!
  \******************************************************/
/*! exports provided: ApplicationComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ApplicationComponent", function() { return ApplicationComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services.service */ "./src/app/services.service.ts");
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-spinner */ "./node_modules/ngx-spinner/fesm5/ngx-spinner.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var angularx_social_login__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! angularx-social-login */ "./node_modules/angularx-social-login/angularx-social-login.es5.js");
/* harmony import */ var ngx_cookie_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ngx-cookie-service */ "./node_modules/ngx-cookie-service/ngx-cookie-service.es5.js");







var ApplicationComponent = /** @class */ (function () {
    function ApplicationComponent(service, spinner, authService, cookie, router) {
        this.service = service;
        this.spinner = spinner;
        this.authService = authService;
        this.cookie = cookie;
        this.router = router;
        this.selectedApplication = null;
        this.applicationsCount = 0;
        this.applicationList = [];
        this.myApplications = [];
        this.teamList = [];
        this.assessmentList = [];
        this.applicationToDelete = '';
        this.listOfAnswers = [];
        this.types = [
            { value: 'initial', description: 'Diagnóstica' },
            { value: 'summative', description: 'Formativa' },
            { value: 'formative', description: 'Somativa' }
        ];
        this.methods = [
            { value: 'ranking', description: 'Ranking' },
            { value: 'nomination', description: 'Nomeação' },
            { value: 'classification', description: 'Classificação' }
        ];
        this.strategies = [
            { value: 'self', description: 'Auto avaliação' },
            { value: 'co', description: 'Co-avaliação' },
            { value: '360', description: 'Avaliação 360º' }
        ];
        this.status = [
            { value: 'active', description: 'Em andamento' },
            { value: 'complete', description: 'Concluída' },
            { value: 'inactive', description: 'Interrompida' },
            { value: 'closed', description: 'Encerrada' }
        ];
        this.organizationId = '';
        this.organizationName = '';
        this.userProfile = '';
        this.userEmail = '';
        this.userName = '';
    }
    // ngDoCheck usado para esconder o spinner quando todos os dados forem carregados
    // ngDoCheck(): void { if(this.teamList.length && this.assessmentList.length) {this.spinner.hide();} }
    ApplicationComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.spinner.show();
        this.organizationId = this.cookie.get('ORGANIZATIONID');
        this.organizationName = this.cookie.get('ORGANIZATIONNAME');
        this.userProfile = this.cookie.get('ORGANIZATIONMEMBERPROFILE');
        this.authService.authState.subscribe(function (user) {
            _this.userEmail = user.email;
            _this.userName = user.name;
            _this.getApplications();
        });
        $('select').formSelect();
        $('.modal').modal();
    };
    ApplicationComponent.prototype.filterType = function (type) {
        try {
            return this.types.find(function (t) { return t.value === type; }).description;
        }
        catch (_a) {
            return type;
        }
    };
    ApplicationComponent.prototype.filterMethod = function (method) {
        try {
            return this.methods.find(function (t) { return t.value === method; }).description;
        }
        catch (_a) {
            return method;
        }
    };
    ApplicationComponent.prototype.filterStatus = function (status) {
        try {
            return this.status.find(function (t) { return t.value === status; }).description;
        }
        catch (_a) {
            return status;
        }
    };
    ApplicationComponent.prototype.filterPercentage = function (application) {
        try {
            var totalAnswers = Object(application).answers;
            var totalAnswered_1 = 0;
            totalAnswers.forEach(function (answer) {
                if (answer.answer !== '') {
                    totalAnswered_1++;
                }
            });
            return Math.round((totalAnswered_1 * 100) / totalAnswers.length);
        }
        catch (_a) {
            return 0;
        }
    };
    ApplicationComponent.prototype.filterStrategy = function (strategy) {
        try {
            return this.strategies.find(function (t) { return t.value === strategy; }).description;
        }
        catch (_a) {
            return strategy;
        }
    };
    ApplicationComponent.prototype.getApplications = function () {
        var _this = this;
        this.myApplications = [];
        this.service.findApplicationsFromUser().subscribe(function (data) {
            var applications = Object(data);
            _this.applicationsCount = Object(applications).count;
            _this.applicationList = Object(applications).applicationList;
            _this.applicationList.forEach(function (application) {
                if (application.organizationId === _this.organizationId) {
                    return _this.myApplications.push(application);
                }
            });
            _this.getTeams();
            console.log(_this.teamList);
        }, function (error) {
            _this.router.navigate(['home']);
        });
    };
    ApplicationComponent.prototype.getTeams = function () {
        var _this = this;
        this.service.findProjectsByOrganizationId(this.organizationId).subscribe(function (projects) {
            var projs = Object(projects).projects;
            _this.service.findTeamsFromUser().subscribe(function (data) {
                var teams = Object(data).teams;
                teams.forEach(function (team) {
                    projs.forEach(function (proj) {
                        if (team.projectId === proj._id && team.projectId !== '') {
                            _this.teamList.push(team);
                        }
                    });
                });
                _this.getAssessments();
            }, function (error) {
                M.toast({ html: 'Não foi possível buscar suas equipes.' });
            });
        });
    };
    ApplicationComponent.prototype.getAssessments = function () {
        var _this = this;
        this.service.findAssessmentsFromUser().subscribe(function (data) {
            _this.assessmentList = [];
            var assessments = Object(data).assessments;
            assessments.forEach(function (assessment) {
                if (assessment.organizationId === _this.organizationId) {
                    _this.assessmentList.push(assessment);
                }
            });
            _this.spinner.hide();
        }, function (error) {
            M.toast({ html: 'Não foi possível buscar suas avaliações.' });
        });
    };
    ApplicationComponent.prototype.checkApplicationWaitingForAnswer = function (answers) {
        var _this = this;
        var missing = 0;
        answers.forEach(function (answer) {
            if (answer.userEvaluator === _this.userEmail && answer.answer === '') {
                missing++;
            }
        });
        return missing;
    };
    ApplicationComponent.prototype.checkMember = function (answers, user) {
        var _this = this;
        var missing = 0;
        answers.forEach(function (answer) {
            if (answer.userEvaluator === _this.userEmail && answer.userEvaluator === user) {
                return _this.userName;
            }
            else {
                M.toast({ html: 'Usuário inválido' });
                return 0;
            }
        });
    };
    ApplicationComponent.prototype.addApplicationModal = function () {
        console.log(this.teamList.length);
        if (this.assessmentList.length > 0 && this.teamList.length > 0) {
            $('select').formSelect();
            $('.modal').modal();
            $('.addApplication').modal('open');
        }
        else {
            M.toast({ html: 'Você não possui avaliações ou equipes para incluir uma aplicação!' });
        }
    };
    ApplicationComponent.prototype.attendanceModal = function (applicationId) {
        var _this = this;
        console.log(applicationId);
        var application = this.applicationList.find(function (app) { return app._id === applicationId; });
        this.listOfAnswers = [];
        application.answers.forEach(function (i) {
            if (i.questionOrder === 0) {
                var missing_1 = 0;
                application.answers.forEach(function (j) {
                    if (i.userEvaluator === j.userEvaluator && i.userRated === j.userRated) {
                        if (j.answer === '') {
                            missing_1++;
                        }
                    }
                });
                _this.listOfAnswers.push({
                    userEvaluator: i.userEvaluator,
                    userRated: i.userRated,
                    missing: missing_1
                });
            }
        });
        $('select').formSelect();
        $('.modal').modal();
        $('.attendance').modal('open');
    };
    ApplicationComponent.prototype.addApplication = function (name, teamId, assessmentId, type, method, strategy) {
        var _this = this;
        this.spinner.show();
        if (name == "") {
            console.log(name);
            alert('Aplicação inválida, nome em branco.');
        }
        else if ((confirm('Após iniciada a avaliação, não é possível sua edição. Você esta certo de que sua aplicação de avaliação esta correta?'))) {
            this.service.addApplication(name, teamId, assessmentId, type, method, strategy).subscribe(function (data) {
                _this.getApplications();
            }, function (error) {
                M.toast({ html: 'Erro' });
            });
        }
        this.spinner.hide();
    };
    ApplicationComponent.prototype.deleteApplicationModal = function (applicationId) {
        if (applicationId !== '') {
            this.applicationToDelete = applicationId;
            $('.modal').modal();
            $('.deleteApplication').modal('open');
        }
        else {
            M.toast({ html: 'Ocorreu algum erro ao tentar excluir a aplicação. Por favor, tente novamente!' });
        }
    };
    ApplicationComponent.prototype.deleteApplication = function () {
        var _this = this;
        if (this.applicationToDelete !== '') {
            this.spinner.show();
            this.service.deleteApplication(this.applicationToDelete).subscribe(function (data) {
                _this.getApplications();
            }, function (error) {
                M.toast({ html: 'Ocorreu algum erro ao tentar excluir a aplicação. Por favor, tente novamente!' });
            });
        }
        else {
            M.toast({ html: 'Ocorreu algum erro ao tentar excluir a aplicação. Por favor, tente novamente!' });
        }
    };
    ApplicationComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-application',
            template: __webpack_require__(/*! ./application.component.html */ "./src/app/application/application.component.html"),
            styles: [__webpack_require__(/*! ./application.component.css */ "./src/app/application/application.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_services_service__WEBPACK_IMPORTED_MODULE_2__["ServicesService"],
            ngx_spinner__WEBPACK_IMPORTED_MODULE_3__["NgxSpinnerService"],
            angularx_social_login__WEBPACK_IMPORTED_MODULE_5__["AuthService"],
            ngx_cookie_service__WEBPACK_IMPORTED_MODULE_6__["CookieService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"]])
    ], ApplicationComponent);
    return ApplicationComponent;
}());



/***/ }),

/***/ "./src/app/assessment/assessment-details/assessment-details.component.css":
/*!********************************************************************************!*\
  !*** ./src/app/assessment/assessment-details/assessment-details.component.css ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2Fzc2Vzc21lbnQvYXNzZXNzbWVudC1kZXRhaWxzL2Fzc2Vzc21lbnQtZGV0YWlscy5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/assessment/assessment-details/assessment-details.component.html":
/*!*********************************************************************************!*\
  !*** ./src/app/assessment/assessment-details/assessment-details.component.html ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"body\">\n\n  <!--Header-->\n  <app-header></app-header>\n\n  <!-- Spinner -->\n  <ngx-spinner bdColor=\"rgba(0,0,0,0.8)\" size=\"large\" color=\"#00a7f8\" type=\"ball-spin-clockwise\"></ngx-spinner>\n\n  <!-- Main content -->\n  <main>\n    <div class=\"container\">\n      \n      <!-- Title -->\n      <div class=\"row\">\n        <div class=\"col s12\">\n          <h3 class=\"header\"><a [routerLink]=\"['/assessment']\">Avaliações</a> > {{ assessment.name }}</h3>\n        </div>\n      </div>\n\n      <!-- Questions -->\n      <div class=\"row\">\n        <div class=\"col s12\">\n            <h5>Questões da avaliação</h5>\n        </div>\n      </div>\n      <div class=\"row\">\n        <div class=\"col s12\">\n          <ul class=\"collapsible\" *ngIf=\"assessment.questions.length>0\">\n            <li *ngFor=\"let question of assessment.questions; let i = index\" (click)=\"collapsible()\">\n              <div class=\"collapsible-header\">{{ i+1 }} - {{ question.name | slice:0:40 }}{{ question.name.length > 35 ? '...' : ''}} - {{ question.significance + '%' }}</div>\n              <div class=\"collapsible-body\">\n                <span>\n                  <form class=\"col s12\">\n                    <div class=\"row\">\n                      <div class=\"input-field col s12 m12\">\n                        <i class=\"material-icons prefix\">edit</i>\n                        <label for=\"{{ 'questionName' + i }}\" class=\"active\">Questão</label>\n                        <input id=\"{{ 'questionName' + i }}\" type=\"text\" class=\"validate\" value=\"{{ question.name }}\" (input)=\"changeQuestionName(i)\">\n                      </div>\n                    </div>\n                    <div class=\"row\">\n                      <div class=\"input-field col s12 m6\">\n                        <i class=\"material-icons prefix\">grain</i>\n                        <label class=\"active\" for=\"{{ 'competenceName' + i }}\">Competência</label>\n                        <select name=\"{{ 'competenceName' + i }}\" id=\"{{ 'competenceName' + i }}\" class=\"validate\" (change)=\"changeQuestionCompetence(i)\">\n                          <option *ngFor=\"let competence of organization.competences\" [value]=\"competence.name\" [selected]=\"competence.name===question.competenceName\">\n                            {{ competence.name }}\n                          </option>\n                        </select>\n                      </div>\n                    </div>\n                    <div class=\"row\">\n                      <div class=\"input-field col s12 m6\">\n                        <i class=\"material-icons prefix\">exposure</i>\n                        <label for=\"{{ 'significance' + i }}\" class=\"active\">Peso</label>\n                        <input id=\"{{ 'significance' + i }}\" type=\"number\" class=\"validate\" value=\"{{ question.significance }}\" (input)=\"changeQuestionSignificance(i)\">\n                      </div>\n                    </div>\n                  </form>\n                  <!-- Alternatives -->\n                  <div class=\"row\" *ngIf=\"question.items.length>0\">\n                    <div class=\"col s12\" *ngFor=\"let item of question.items; let j = index\">\n                      <div class=\"card\">\n                        <div class=\"card-content\">\n                          <p><b>Alternativa {{ j+1 }}</b></p>\n                          <br>\n                          <div class=\"row\">\n                            <div class=\"input-field col s12 m6\">\n                              <i class=\"material-icons prefix\">exposure</i>\n                              <label for=\"{{ 'itemPercentage' + i + j }}\" class=\"active\">Peso</label>\n                              <input id=\"{{ 'itemPercentage' + i + j }}\" type=\"number\" class=\"validate\" value=\"{{ item.percentage }}\" (input)=\"changeQuestionItemPercentage(i,j)\">\n                            </div>\n                          </div>\n                          <div class=\"row\">\n                            <div class=\"input-field col s12 m12\">\n                              <i class=\"material-icons prefix\">edit</i>\n                              <label for=\"{{ 'itemDescription' + i + j }}\" class=\"active\">Descrição da alternativa</label>\n                              <input id=\"{{ 'itemDescription' + i + j }}\" type=\"text\" class=\"validate\" value=\"{{ item.description }}\" (input)=\"changeQuestionItemDescription(i,j)\">\n                            </div>\n                          </div>\n                        </div>\n                        <div class=\"card-action light-blue\">\n                          <a style=\"cursor: pointer; color: white;\" title=\"Excluir alternativa\" (click)=\"deleteAlternative(i,j)\"><i class=\"material-icons left\">delete</i>Excluir alternativa</a>\n                        </div>\n                      </div>\n                    </div>\n                  </div>\n                  <!-- Buttons to add alternative or edit question -->\n                  <div class=\"row\">\n                    <div class=\"col s12\">\n                      <a class=\"waves-effect waves-light light-blue btn-small\" (click)=\"addAlternative(i)\" style=\"margin-right: 8px;\"><i class=\"material-icons left\">add</i>Adicionar alternativa</a>\n                      <a class=\"waves-effect waves-light red btn-small\" (click)=\"deleteQuestion(i)\"><i class=\"material-icons left\">delete</i>Excluir questão</a>\n                    </div>\n                  </div>\n                </span>\n              </div>\n            </li>\n          </ul>\n          <div class=\"row\">\n            <div class=\"col s12\">\n              <a class=\"waves-effect waves-light light-blue btn-small\" (click)=\"addQuestion()\"><i class=\"material-icons left\">add</i>Adicionar questão</a>\n            </div>\n          </div>\n        </div>\n      </div>\n\n      <!-- Buttons -->\n      <div class=\"row\">\n        <div class=\"col s12\">\n          <a style=\"margin-top: 4px; margin-bottom: 4px; margin-right: 4px;\" class=\"waves-effect waves-light light-blue btn-large\" [routerLink]=\"['/assessment']\"><i class=\"material-icons left\">arrow_back</i>Voltar</a>\n          <!-- <a class=\"waves-effect waves-light light-blue btn-large right\" (click)=\"copy()\"><i class=\"material-icons left\">save</i>Copiar</a> -->\n          <a class=\"waves-effect waves-light light-blue btn-large right\" (click)=\"save()\"><i class=\"material-icons left\">save</i>Salvar</a>\n          <p class=\"alert alert-success\">\n            <strong>Questões salvas com sucesso!</strong>\n        </div>\n      </div>\n\n\n    </div>\n  </main>\n\n  <!-- Footer -->\n  <app-footer></app-footer>\n\n</div>\n"

/***/ }),

/***/ "./src/app/assessment/assessment-details/assessment-details.component.ts":
/*!*******************************************************************************!*\
  !*** ./src/app/assessment/assessment-details/assessment-details.component.ts ***!
  \*******************************************************************************/
/*! exports provided: AssessmentDetailsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AssessmentDetailsComponent", function() { return AssessmentDetailsComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var src_app_services_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/services.service */ "./src/app/services.service.ts");
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-spinner */ "./node_modules/ngx-spinner/fesm5/ngx-spinner.js");
/* harmony import */ var angularx_social_login__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! angularx-social-login */ "./node_modules/angularx-social-login/angularx-social-login.es5.js");
/* harmony import */ var ngx_cookie_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ngx-cookie-service */ "./node_modules/ngx-cookie-service/ngx-cookie-service.es5.js");







var AssessmentDetailsComponent = /** @class */ (function () {
    function AssessmentDetailsComponent(route, service, spinner, authService, cookie, router) {
        this.route = route;
        this.service = service;
        this.spinner = spinner;
        this.authService = authService;
        this.cookie = cookie;
        this.router = router;
        this.assessment = {
            _id: '',
            _rev: '',
            name: '',
            organizationId: '',
            userCreator: '',
            public: false,
            tool: '',
            status: 'active',
            questions: []
        };
        this.organization = {
            _id: '',
            _rev: '',
            name: '',
            users: [],
            competences: [],
            status: ''
        };
        this.q = {
            name: '',
            description: '',
            competenceName: '',
            significance: 0
        };
        this.alternative = {
            description: '',
            option: '',
            percentage: 0
        };
        this.tools = [
            { value: 'rubric', description: 'Rubrica' },
            { value: 'questionnaire', description: 'Questionário' }
        ];
        this.publicOptions = [
            { value: true, description: 'Sim' },
            { value: false, description: 'Não' }
        ];
        this.currentQuestion = null;
        this.organizationId = '';
        this.organizationName = '';
        this.userProfile = '';
        this.userEmail = '';
    }
    AssessmentDetailsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.spinner.show();
        this.organizationId = this.cookie.get('ORGANIZATIONID');
        this.organizationName = this.cookie.get('ORGANIZATIONNAME');
        this.userProfile = this.cookie.get('ORGANIZATIONMEMBERPROFILE');
        this.authService.authState.subscribe(function (user) {
            _this.userEmail = user.email;
            _this.route.paramMap.subscribe(function (params) {
                _this.assessment._id = params.get('assessmentId');
                _this.getAssessment();
            });
        });
    };
    AssessmentDetailsComponent.prototype.initializeComponents = function () {
        setTimeout(this.initializeComponents, 200);
        $('select').formSelect();
        $('.collapsible').collapsible();
    };
    AssessmentDetailsComponent.prototype.getAssessment = function () {
        var _this = this;
        this.service.findAssessmentById(this.assessment._id).subscribe(function (data) {
            var a = Object(data).assessment;
            _this.assessment._rev = a._rev;
            _this.assessment.name = a.name;
            _this.assessment.organizationId = a.organizationId;
            _this.assessment.userCreator = a.userCreator;
            _this.assessment.public = a.public;
            _this.assessment.tool = a.tool;
            _this.assessment.status = a.status;
            _this.assessment.questions = a.questions;
            _this.service.findOrganizationById(_this.assessment.organizationId).subscribe(function (org) {
                var result = Object(org);
                _this.organization._id = result._id;
                _this.organization._rev = result._rev;
                _this.organization.name = result.name;
                _this.organization.competences = result.competences;
                _this.organization.users = result.users;
                _this.organization.status = result.status;
                _this.spinner.hide();
                $('select').formSelect();
                _this.initializeComponents();
            }, function (error) {
                _this.router.navigate(['home']);
            });
            $('select').formSelect();
            $('.collapsible').collapsible();
        }, function (error) {
            _this.router.navigate(['home']);
        });
    };
    AssessmentDetailsComponent.prototype.filterTool = function (tool) {
        try {
            return this.tools.find(function (t) { return t.value === tool; }).description;
        }
        catch (_a) {
            return tool;
        }
    };
    AssessmentDetailsComponent.prototype.copyAssessment = function () {
        var _this = this;
        this.spinner.show();
        this.assessment.public = false;
        this.assessment.userCreator = undefined;
        this.service.addAssessment(this.assessment).subscribe(function (data) {
            _this.router.navigate(['assessment']);
        }, function (error) {
            _this.router.navigate(['home']);
        });
    };
    AssessmentDetailsComponent.prototype.addQuestion = function () {
        var newQuestion = {
            order: this.assessment.questions.length,
            competenceName: this.organization.competences[0].name,
            description: '',
            items: [],
            name: '',
            significance: 0
        };
        this.assessment.questions.push(newQuestion);
        this.initializeComponents();
    };
    AssessmentDetailsComponent.prototype.editQuestionModal = function (question) {
        var que = this.assessment.questions[question];
        this.q.name = que.name;
        this.q.description = que.description;
        this.q.competenceName = que.competenceName;
        this.q.significance = que.significance;
        $('.modal').modal();
        $('select').formSelect();
        $('.addEditQuestion').modal('open');
    };
    AssessmentDetailsComponent.prototype.collapsible = function () {
        $('.collapsible').collapsible();
        M.updateTextFields();
    };
    AssessmentDetailsComponent.prototype.deleteAlternative = function (question, item) {
        if (confirm("Deseja realmente deletar a alternativa " + (item + 1) + "?")) {
            this.assessment.questions[question].items.splice(item, 1);
        }
    };
    AssessmentDetailsComponent.prototype.deleteQuestion = function (question) {
        if (confirm("Deseja realmente deletar a quest\u00E3o " + (question + 1) + "?")) {
            this.assessment.questions.splice(question, 1);
        }
    };
    AssessmentDetailsComponent.prototype.addAlternative = function (question) {
        var newAlternative = {
            order: this.assessment.questions[question].items.length,
            description: '',
            option: '',
            percentage: ''
        };
        this.assessment.questions[question].items.push(newAlternative);
    };
    AssessmentDetailsComponent.prototype.addEditQuestion = function (qname, competence, sig) {
        var q = {
            name: qname,
            description: '',
            significance: sig,
            competenceName: competence,
            items: []
        };
        this.assessment.questions.push(q);
    };
    AssessmentDetailsComponent.prototype.save = function () {
        var _this = this;
        this.spinner.show();
        console.log(this.assessment);
        this.service.updateAssessment(this.assessment).subscribe(function (data) {
            _this.getAssessment();
            _this.router.navigate(['assessment']);
            M.toast({ html: 'Questões da avaliação salvas com sucesso!' });
        }, function (error) {
            _this.router.navigate(['home']);
        });
    };
    AssessmentDetailsComponent.prototype.copy = function () {
        var _this = this;
        this.spinner.show();
        console.log(this.assessment);
        this.service.addAssessment(this.assessment).subscribe(function (data) {
            _this.getAssessment();
            _this.router.navigate(['assessment']);
        }, function (error) {
            _this.router.navigate(['home']);
        });
    };
    AssessmentDetailsComponent.prototype.changeQuestionName = function (question) {
        var field = '#questionName' + question;
        this.assessment.questions[question].name = $(field).val();
    };
    AssessmentDetailsComponent.prototype.changeQuestionCompetence = function (question) {
        var field = '#competenceName' + question;
        this.assessment.questions[question].competenceName = $(field).val();
        console.log(field);
        console.log(this.assessment.questions[question].competenceName);
    };
    AssessmentDetailsComponent.prototype.changeQuestionSignificance = function (question) {
        var field = '#significance' + question;
        this.assessment.questions[question].significance = $(field).val();
    };
    AssessmentDetailsComponent.prototype.changeQuestionItemPercentage = function (question, item) {
        var field = '#itemPercentage' + question + item;
        this.assessment.questions[question].items[item].percentage = $(field).val();
    };
    AssessmentDetailsComponent.prototype.changeQuestionItemDescription = function (question, item) {
        var field = '#itemDescription' + question + item;
        this.assessment.questions[question].items[item].description = $(field).val();
        console.log(field);
    };
    AssessmentDetailsComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-assessment-details',
            template: __webpack_require__(/*! ./assessment-details.component.html */ "./src/app/assessment/assessment-details/assessment-details.component.html"),
            styles: [__webpack_require__(/*! ./assessment-details.component.css */ "./src/app/assessment/assessment-details/assessment-details.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"],
            src_app_services_service__WEBPACK_IMPORTED_MODULE_3__["ServicesService"],
            ngx_spinner__WEBPACK_IMPORTED_MODULE_4__["NgxSpinnerService"],
            angularx_social_login__WEBPACK_IMPORTED_MODULE_5__["AuthService"],
            ngx_cookie_service__WEBPACK_IMPORTED_MODULE_6__["CookieService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]])
    ], AssessmentDetailsComponent);
    return AssessmentDetailsComponent;
}());



/***/ }),

/***/ "./src/app/assessment/assessment.component.css":
/*!*****************************************************!*\
  !*** ./src/app/assessment/assessment.component.css ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "a.btn-large {\n    margin: 4px;\n    width: 260px;\n}\n\n.editAssessmentQuestions {\n    width: 80% !important;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYXNzZXNzbWVudC9hc3Nlc3NtZW50LmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7SUFDSSxXQUFXO0lBQ1gsWUFBWTtBQUNoQjs7QUFFQTtJQUNJLHFCQUFxQjtBQUN6QiIsImZpbGUiOiJzcmMvYXBwL2Fzc2Vzc21lbnQvYXNzZXNzbWVudC5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiYS5idG4tbGFyZ2Uge1xuICAgIG1hcmdpbjogNHB4O1xuICAgIHdpZHRoOiAyNjBweDtcbn1cblxuLmVkaXRBc3Nlc3NtZW50UXVlc3Rpb25zIHtcbiAgICB3aWR0aDogODAlICFpbXBvcnRhbnQ7XG59Il19 */"

/***/ }),

/***/ "./src/app/assessment/assessment.component.html":
/*!******************************************************!*\
  !*** ./src/app/assessment/assessment.component.html ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"body\">\n\n    <!--Header-->\n    <app-header></app-header>\n\n    <!-- Spinner -->\n    <ngx-spinner bdColor=\"rgba(0,0,0,0.8)\" size=\"large\" color=\"#00a7f8\" type=\"ball-spin-clockwise\"></ngx-spinner>\n  \n    <!-- Main content -->\n    <main>\n      <div class=\"container\">\n\n        <!-- Title -->\n        <div class=\"row\">\n          <div class=\"col s12\">\n            <h3 class=\"header\">Avaliações</h3>\n          </div>\n        </div>\n\n        <!-- Message when user doesnt have assessments -->\n        <div class=\"row\" *ngIf=\"assessments.length<=0 && (userProfile==='organizationManager' || userProfile==='projectManager' || userProfile==='teamManager')\">\n          <div class=\"col s12 center\">\n            <h5 class=\"header\">Você não criou nenhuma avaliação!</h5>\n            <p class=\"caption\">\n              Crie uma avaliação clicando no botão \"Nova avaliação\" e utilize um modelo de avaliação já existente da organização que você é membro, copie de uma avaliação pública ou crie sua própria avaliação.\n            </p>\n          </div>\n        </div>\n\n        <!-- Assessments -->\n        <div class=\"row\">\n          <div class=\"col s12\">\n            <table class=\"highlight\" *ngIf=\"assessments.length>0\">\n              <thead>\n                <tr>\n                  <th>Nome</th>\n                  <th>Ferramenta</th>\n                  <th>Autor</th>\n                  <th>Questões</th>\n                  <th *ngIf=\"userProfile==='organizationManager' || userProfile==='projectManager' || userProfile==='teamManager'\">Opções</th>\n                </tr>\n              </thead>\n              <tbody>\n                <tr *ngFor=\"let assessment of assessments\">\n                  <td>{{ assessment.name }}</td>\n                  <td>{{ filterTool(assessment.tool) }}</td>\n                  <td>{{ assessment.userCreator }}</td>\n                  <td>{{ assessment.questions.length }}</td>\n                  <td *ngIf=\"userProfile==='organizationManager' || userProfile==='projectManager' || userProfile==='teamManager'\">\n                    <a style=\"cursor: pointer;\" title=\"Editar informações da avaliação\" (click)=\"editAssessmentModal(assessment._id)\"><i class=\"material-icons left\">edit</i></a>\n                    <!--<a style=\"cursor: pointer;\" title=\"Editar questões da avaliação\" (click)=\"editAssessmentQuestionsModal(assessment._id)\"><i class=\"material-icons left\">question_answer</i></a>-->\n                    <a style=\"cursor: pointer;\" title=\"Editar questões da avaliação\" [routerLink]=\"['/assessment', assessment._id]\"><i class=\"material-icons left\">question_answer</i></a>\n                    <a style=\"cursor: pointer;\" title=\"{{ assessment.public ? 'Tornar privada a avaliação' : 'Tornar pública a avaliação'}}\" (click)=\"assessmentVisibility(assessment._id)\"><i class=\"material-icons left\">{{ assessment.public ? 'visibility_off' : 'visibility'}}</i></a>\n                    <a style=\"cursor: pointer;\" title=\"Copiar avaliação\" (click)=\"copyAssessmentById(assessment._id)\"><i class=\"material-icons left\">content_copy</i></a>\n                    <a class=\"modal-trigger\" href=\"#deleteAssessment\" title=\"Excluir avaliação\" (click)=\"deleteAssessmentModal(assessment.name, assessment._id)\"><i class=\"material-icons left\">delete</i></a>\n                  </td>\n                </tr>\n              </tbody>\n            </table>\n          </div>\n        </div>\n\n        <!-- Button to add assessment -->\n        <div class=\"row center\" *ngIf=\"userProfile==='organizationManager' || userProfile==='projectManager' || userProfile==='teamManager'\">\n            <a class=\"waves-effect waves-light light-blue btn-large modal-trigger\" href=\"#addAssessment\" (click)=\"addAssessmentModal()\"><i class=\"material-icons left\">add</i>Nova avaliação</a>\n            <a class=\"waves-effect waves-light light-blue btn-large modal-trigger\" href=\"#copyAssessment\" (click)=\"copyAssessmentModal()\"><i class=\"material-icons left\">content_copy</i>Copiar avaliação</a>\n        </div>\n\n        <!-- User without access -->\n        <div class=\"row\" *ngIf=\"userProfile!='organizationManager' && userProfile!='projectManager' && userProfile!='teamManager'\">\n          <div class=\"col s12 center\">\n            <p class=\"caption\">Você não possui acesso para adicionar, alterar ou excluir avaliações na organização {{ organizationName }}.</p>\n          </div>\n        </div>\n\n        <!-- Modal for new assessment -->\n        <div id=\"addAssessment\" class=\"modal modal-fixed-footer addAssessment\">\n          <div class=\"modal-content\">\n            <h4>Nova avaliação</h4>\n            <p>\n              Preencha as informações para criar uma nova avaliação.\n            </p>\n            <div class=\"row\">\n              <form class=\"col s12\">\n                <div class=\"row\">\n                  <div class=\"input-field col s6\">\n                    <i class=\"material-icons prefix\">description</i>\n                    <input #name id=\"name\" type=\"text\" class=\"validate\">\n                    <label for=\"name\">Nome</label>\n                  </div>\n                </div>\n                <div class=\"row\">\n                  <div class=\"input-field col s6\">\n                    <i class=\"material-icons prefix\">build</i>\n                    <label for=\"tool\" class=\"active\">Ferramenta</label>\n                    <select #tool id=\"tool\" class=\"validate\">\n                        <option *ngFor='let tool of tools' [value]=\"tool.value\">\n                          {{ tool.description }}\n                        </option>\n                    </select>\n                  </div>\n                </div>\n              </form>\n            </div>\n          </div>\n          <div class=\"modal-footer\">\n            <a class=\"modal-close waves-effect waves-green btn-flat\">Cancelar</a>\n            <a class=\"modal-close waves-effect waves-light light-blue btn\" (click)=\"addAssessment(name.value, tool.value)\">Salvar</a>\n          </div>\n        </div>\n\n\n        <!-- Modal to edit assessment -->\n        <div id=\"editAssessment\" class=\"modal modal-fixed-footer editAssessment\">\n            <div class=\"modal-content\">\n              <h4>Editar avaliação</h4>\n              <p>\n                Modifique as informações da avaliação.\n              </p>\n              <div class=\"row\">\n                <form class=\"col s12\">\n                  <div class=\"row\">\n                    <div class=\"input-field col s6\">\n                      <i class=\"material-icons prefix\">description</i>\n                      <input #editName id=\"editName\" type=\"text\" class=\"validate\">\n                      <label for=\"editName\" class=\"active\">Nome</label>\n                    </div>\n                  </div>\n                  <div class=\"row\">\n                    <div class=\"input-field col s6\">\n                      <i class=\"material-icons prefix\">build</i>\n                      <label for=\"editTool\" class=\"active\">Ferramenta</label>\n                      <select #editTool id=\"editTool\" class=\"validate\">\n                          <option *ngFor='let tool of tools' [value]=\"tool.value\">\n                            {{ tool.description }}\n                          </option>\n                      </select>\n                    </div>\n                  </div>\n                </form>\n              </div>\n            </div>\n            <div class=\"modal-footer\">\n              <a class=\"modal-close waves-effect waves-green btn-flat\">Cancelar</a>\n              <a class=\"modal-close waves-effect waves-light light-blue btn\" (click)=\"editAssessment(editName.value, editTool.value)\">Salvar</a>\n            </div>\n          </div>\n\n\n\n\n\n        <!-- Modal to delete assessment -->\n        <div id=\"deleteAssessment\" class=\"modal modal-fixed-footer deleteAssessment\">\n          <div class=\"modal-content\">\n            <h4>Excluir avaliação</h4>\n            <p>\n              Você tem certeza que deseja excluir a avaliação?\n              Essa ação não poderá ser desfeita!\n            </p>\n          </div>\n          <div class=\"modal-footer\">\n            <a class=\"modal-close waves-effect waves-green btn-flat\">Cancelar</a>\n            <a class=\"modal-close waves-effect waves-light red btn\" (click)=\"deleteAssessment()\">Excluir</a>\n          </div>\n        </div>\n\n        <!-- Modal to copy assessment -->\n        <div id=\"copyAssessment\" class=\"modal modal-fixed-footer copyAssessment\">\n          <div class=\"modal-content\">\n            <h4>Copiar avaliação</h4>\n            <p>\n              Copie uma avaliação já existente de uma organização que você é membro ou de uma avaliação pública. Clique sobre a avaliação desejada para visualizar os detalhes completos e em seguida clique no botão \"Copiar\".\n            </p>\n            <div class=\"row\">\n              <ul class=\"collapsible\">\n                <!--<li class=\"active\">\n                  <div class=\"collapsible-header waves-effect waves-light light-blue white-text\">Avaliações da organização</div>\n                  <div class=\"collapsible-body\">\n                    <span *ngIf=\"organizationAssessmentsCount<=0\">Nenhuma avaliação disponível nas organizações que você é membro.</span>\n                  </div>\n                </li>-->\n                <li class=\"active\">\n                  <div class=\"collapsible-header waves-effect waves-light light-blue white-text\">Avaliações públicas</div>\n                  <div class=\"collapsible-body\">\n                    <span *ngIf=\"publicAssessmentsCount<=0\">Nenhuma avaliação pública disponível.</span>\n                    <table class=\"highlight responsive-table\" *ngIf=\"publicAssessmentsCount>0\">\n                        <thead>\n                          <tr>\n                            <th>Nome</th>\n                            <th>Ferramenta</th>\n                            <th>Questões</th>\n                          </tr>\n                        </thead>\n                        <tbody>\n                          <tr class=\"modal-close\" style=\"cursor: pointer;\" *ngFor=\"let assessment of publicAssessments\" [routerLink]=\"['/assessment', assessment._id]\">\n                            <td>{{ assessment.name }}</td>\n                            <td>{{ filterTool(assessment.tool) }}</td>\n                            <td>{{ assessment.questions.length }}</td>\n                          </tr>\n                        </tbody>\n                      </table>\n                  </div>\n                </li>\n              </ul>\n            </div>\n          </div>\n          <div class=\"modal-footer\">\n            <a class=\"modal-close waves-effect waves-green btn-flat\">Cancelar</a>\n            <!--<a class=\"modal-close waves-effect waves-light light-blue btn\" (click)=\"addAssessment(name.value, orgId.value, tool.value)\">Salvar</a>-->\n          </div>\n        </div>\n\n\n\n\n        <!-- Modal to edit questions of assessment -->\n        <div id=\"editAssessmentQuestions\" class=\"modal modal-fixed-footer editAssessmentQuestions\">\n          <div class=\"modal-content\">\n            <h4>Editar questões da avaliação</h4>\n            <!-- Application info -->\n            <div class=\"row\">\n              <p>\n                Nome do avaliado: Tiago da Rosa Santos<br>\n                Aplicação: Avaliação de exemplo<br>\n                Tipo de aplicação: diagnóstica<br>\n                Método da aplicação: ranking<br>\n                Estratégia: Avaliação 360º<br>\n                Ferramenta: Rúbrica\n              </p>\n            </div>\n            <!-- Questions -->\n            <div class=\"row\">\n              <ul class=\"collapsible expandable\" *ngIf=\"currentApplicationValid\">\n                <li *ngFor=\"let question of currentApplication.assessment.questions; let i = index\" onclick=\"$('.collapsible').collapsible({ accordion: false });\">\n                  <div class=\"collapsible-header\">{{ i+1 }} - {{ question.name | slice:0:40 }}{{ question.name.length > 40 ? '...' : ''}}</div>\n                  <div class=\"collapsible-body\">\n                    <p><b>Questão: </b>{{ question.name }}</p>\n                    <p><b>Competência: </b>{{ question.competenceName }}</p>\n                    <!-- Alternatives -->\n                    <div class=\"row\" *ngIf=\"question.items.length>0\">\n                      <div class=\"col s12 m6 l4 xl3\" *ngFor=\"let item of question.items; let j = index\" style=\"padding: 0;\">\n                        <div class=\"card\" style=\"cursor: pointer;\" id=\"{{ i + '' + j}}\" (click)=\"selectItem(i,j)\">\n                          <div class=\"card-content\">\n                            <p><b>Alternativa {{ j+1 }}</b></p>\n                            <p>{{ item.description }}</p>\n                          </div>\n                        </div>\n                      </div>\n                    </div>\n                  </div>\n                </li>\n              </ul>\n            </div>\n            <!-- Comments -->\n            <div class=\"row\">\n              <form class=\"col s12\">\n                <div class=\"row\">\n                  <div class=\"input-field col s12 m6\">\n                    <i class=\"material-icons prefix\">comment</i>\n                    <label class=\"active\" for=\"comments\">Comentários</label>\n                    <input #comments id=\"comments\" type=\"text\" class=\"validate\" value=\"\">\n                  </div>\n                </div>\n              </form>\n            </div>\n\n          </div>\n\n          <!-- Buttons -->\n          <div class=\"modal-footer\">\n            <a class=\"modal-close waves-effect waves-green btn-flat\">Cancelar</a>\n            <a class=\"modal-close waves-effect waves-light light-blue btn\">Salvar</a>\n          </div>\n        </div>\n\n\n\n\n\n\n      </div>\n    </main>\n  \n    <!-- Footer -->\n    <app-footer></app-footer>\n  \n  </div>\n  "

/***/ }),

/***/ "./src/app/assessment/assessment.component.ts":
/*!****************************************************!*\
  !*** ./src/app/assessment/assessment.component.ts ***!
  \****************************************************/
/*! exports provided: AssessmentComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AssessmentComponent", function() { return AssessmentComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngx-spinner */ "./node_modules/ngx-spinner/fesm5/ngx-spinner.js");
/* harmony import */ var _services_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../services.service */ "./src/app/services.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var angularx_social_login__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! angularx-social-login */ "./node_modules/angularx-social-login/angularx-social-login.es5.js");
/* harmony import */ var ngx_cookie_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ngx-cookie-service */ "./node_modules/ngx-cookie-service/ngx-cookie-service.es5.js");







var AssessmentComponent = /** @class */ (function () {
    function AssessmentComponent(service, spinner, authService, cookie, router) {
        this.service = service;
        this.spinner = spinner;
        this.authService = authService;
        this.cookie = cookie;
        this.router = router;
        this.assessmentsCount = 0;
        this.assessments = [];
        this.publicAssessmentsCount = 0;
        this.publicAssessments = [];
        this.organizationAssessmentsCount = 0;
        this.organizationAssessments = [];
        this.assessmentName = '';
        this.assessmentId = '';
        this.organizationId = '';
        this.userEmail = '';
        this.userProfile = '';
        this.organizationName = '';
        this.currentApplicationValid = false;
        this.assessment = {
            _id: '',
            _rev: '',
            name: '',
            organizationId: '',
            userCreator: '',
            public: false,
            tool: '',
            status: 'active',
            questions: []
        };
        this.tools = [
            { value: 'rubric', description: 'Rubrica' },
        ];
    }
    AssessmentComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.spinner.show();
        this.organizationId = this.cookie.get('ORGANIZATIONID');
        this.organizationName = this.cookie.get('ORGANIZATIONNAME');
        this.userProfile = this.cookie.get('ORGANIZATIONMEMBERPROFILE');
        this.authService.authState.subscribe(function (user) {
            _this.userEmail = user.email;
            _this.getAssessments();
        });
        $('select').formSelect();
        $('.modal').modal();
    };
    AssessmentComponent.prototype.compare = function (a, b) {
        var nameA = a.name.toUpperCase();
        var nameB = b.name.toUpperCase();
        var comparison = 0;
        if (nameA > nameB) {
            comparison = 1;
        }
        else if (nameA < nameB) {
            comparison = -1;
        }
        return comparison;
    };
    AssessmentComponent.prototype.getAssessments = function () {
        var _this = this;
        this.assessments = [];
        this.spinner.show();
        this.service.findAssessmentsFromUser().subscribe(function (data) {
            var result = Object(data);
            _this.assessmentsCount = Object(result).count;
            var assess = Object(result).assessments;
            assess.forEach(function (assessment) {
                if (assessment.organizationId === _this.organizationId) {
                    _this.assessments.push(assessment);
                }
            });
            _this.assessments.sort(_this.compare);
            _this.spinner.hide();
        }, function (error) {
            _this.router.navigate(['home']);
        });
    };
    AssessmentComponent.prototype.filterTool = function (tool) {
        try {
            return this.tools.find(function (t) { return t.value === tool; }).description;
        }
        catch (_a) {
            return tool;
        }
    };
    AssessmentComponent.prototype.addAssessmentModal = function () {
        $('.modal').modal();
        $('select').formSelect();
        $('.addAssessment').modal('open');
    };
    AssessmentComponent.prototype.addAssessment = function (name, tool) {
        var _this = this;
        if (name === '') {
            M.toast({ html: 'Avaliação inválida' });
        }
        else {
            this.spinner.show();
            this.assessment.name = name;
            this.assessment.organizationId = this.organizationId;
            this.assessment.tool = tool;
            this.assessment.userCreator = this.userEmail;
            this.assessment.questions = [];
            console.log(this.assessment);
            this.service.addAssessment(this.assessment).subscribe(function (data) {
                _this.assessment._id = Object(data).status.id;
                _this.assessment._rev = Object(data).status.rev;
                _this.assessments.push(_this.assessment);
                _this.assessments.sort(_this.compare);
                _this.router.navigate(["assessment/" + _this.assessment._id]);
                _this.spinner.hide();
            }, function (error) {
                _this.router.navigate(['home']);
            });
        }
    };
    AssessmentComponent.prototype.copyAssessmentById = function (assessmentId) {
        var _this = this;
        var copy = this.assessments.filter(function (a) { return a._id === assessmentId; })[0];
        this.assessment.name = Object(copy).name + ' (cópia)';
        this.assessment.organizationId = Object(copy).organizationId;
        this.assessment.userCreator = this.userEmail;
        this.assessment.public = false;
        this.assessment.tool = Object(copy).tool;
        this.assessment.status = 'active';
        this.assessment.questions = Object(copy).questions;
        console.log(this.assessment);
        if (this.assessment.organizationId !== '') {
            this.spinner.show();
            this.service.addAssessment(this.assessment).subscribe(function (data) {
                _this.assessment._id = Object(data).status.id;
                _this.assessment._rev = Object(data).status.rev;
                _this.assessments.push(_this.assessment);
                _this.assessments.sort(_this.compare);
                _this.spinner.hide();
                M.toast({ html: 'Avaliação copiada com sucesso!' });
            }, function (error) {
                _this.router.navigate(['home']);
            });
        }
        else {
            M.toast({ html: 'Ocorreu algum erro ao copiar a avaliação. Por favor, tente novamente!' });
        }
    };
    AssessmentComponent.prototype.deleteAssessmentModal = function (name, id) {
        this.assessmentName = name;
        this.assessmentId = id;
        $('.modal').modal();
        $('select').formSelect();
        $('.deleteAssessment').modal('open');
    };
    AssessmentComponent.prototype.deleteAssessment = function () {
        var _this = this;
        this.spinner.show();
        this.service.deleteAssessment(this.assessmentId).subscribe(function (data) {
            _this.assessments = _this.assessments.filter(function (a) { return a._id !== _this.assessmentId; });
            _this.assessments.sort(_this.compare);
            _this.spinner.hide();
        }, function (error) {
            _this.router.navigate(['home']);
        });
    };
    AssessmentComponent.prototype.editAssessmentModal = function (assessmentId) {
        this.assessmentId = assessmentId;
        this.assessment = this.assessments.find(function (a) { return a._id === assessmentId; });
        $('#editName').val(this.assessment.name);
        $('#editTool').val(this.assessment.tool);
        M.updateTextFields();
        $('.modal').modal();
        $('select').formSelect();
        $('.editAssessment').modal('open');
    };
    AssessmentComponent.prototype.editAssessment = function (name, tool) {
        var _this = this;
        if (this.assessment.name !== name || this.assessment.tool !== tool) {
            this.spinner.show();
            this.assessment.name = name;
            this.assessment.tool = tool;
            this.service.updateAssessment(this.assessment).subscribe(function (data) {
                var result = Object(data);
                if (result.status) {
                    var rev = result.status.rev;
                    _this.assessment._rev = rev;
                    _this.assessments = _this.assessments.filter(function (a) { return a._id !== _this.assessment._id; });
                    _this.assessments.push(_this.assessment);
                    _this.assessments.sort(_this.compare);
                    _this.spinner.hide();
                    M.toast({ html: 'Avaliação alterada com sucesso!' });
                }
                else {
                    _this.spinner.hide();
                    M.toast({ html: 'Ocorreu algum erro ao modificar a visibilidade da avaliação. Por favor, tente novamente!' });
                }
            }, function (error) {
                M.toast({ html: 'Ocorreu algum erro ao editar a avaliação. Por favor, tente novamente!' });
            });
        }
        else {
            M.toast({ html: 'Avaliação alterada com sucesso!' });
        }
    };
    AssessmentComponent.prototype.copyAssessmentModal = function () {
        var _this = this;
        this.spinner.show();
        $('.modal').modal();
        $('.collapsible').collapsible({ accordion: false });
        $('select').formSelect();
        $('.tabs').tabs();
        $('.copyAssessment').modal('open');
        this.service.findAllPublicAssessments().subscribe(function (data) {
            var a = Object(data);
            _this.publicAssessmentsCount = Object(a).count;
            _this.publicAssessments = Object(a).assessments;
            _this.spinner.hide();
        }, function (error) {
            _this.router.navigate(['home']);
        });
    };
    AssessmentComponent.prototype.copyAssessment = function (id) {
        console.log(id);
        this.spinner.hide();
    };
    AssessmentComponent.prototype.assessmentVisibility = function (assessmentId) {
        var _this = this;
        this.spinner.show();
        this.assessment = this.assessments.find(function (a) { return a._id === assessmentId; });
        this.assessment.public = !this.assessment.public;
        this.service.updateAssessment(this.assessment).subscribe(function (data) {
            var result = Object(data);
            if (result.status) {
                var rev = result.status.rev;
                _this.assessment._rev = rev;
                _this.assessments = _this.assessments.filter(function (a) { return a._id !== assessmentId; });
                _this.assessments.push(_this.assessment);
                _this.assessments.sort(_this.compare);
                _this.spinner.hide();
                M.toast({ html: 'Visibilidade da avaliação alterada com sucesso!' });
            }
            else {
                _this.spinner.hide();
                M.toast({ html: 'Ocorreu algum erro ao modificar a visibilidade da avaliação. Por favor, tente novamente!' });
            }
        }, function (error) {
            _this.assessment.public = !_this.assessment.public;
            _this.spinner.hide();
            M.toast({ html: 'Ocorreu algum erro ao modificar a visibilidade da avaliação. Por favor, tente novamente!' });
        });
    };
    AssessmentComponent.prototype.editAssessmentQuestionsModal = function (assessmentId) {
        this.assessmentId = assessmentId;
        this.assessment = this.assessments.find(function (a) { return a._id === assessmentId; });
        // $('#editName').val(this.assessment.name);
        // $('#editTool').val(this.assessment.tool);
        M.updateTextFields();
        $('.modal').modal();
        $('select').formSelect();
        $('.editAssessmentQuestions').modal('open');
    };
    AssessmentComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-assessment',
            template: __webpack_require__(/*! ./assessment.component.html */ "./src/app/assessment/assessment.component.html"),
            styles: [__webpack_require__(/*! ./assessment.component.css */ "./src/app/assessment/assessment.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_services_service__WEBPACK_IMPORTED_MODULE_3__["ServicesService"],
            ngx_spinner__WEBPACK_IMPORTED_MODULE_2__["NgxSpinnerService"],
            angularx_social_login__WEBPACK_IMPORTED_MODULE_5__["AuthService"],
            ngx_cookie_service__WEBPACK_IMPORTED_MODULE_6__["CookieService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"]])
    ], AssessmentComponent);
    return AssessmentComponent;
}());



/***/ }),

/***/ "./src/app/attendance/attendance.component.css":
/*!*****************************************************!*\
  !*** ./src/app/attendance/attendance.component.css ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2F0dGVuZGFuY2UvYXR0ZW5kYW5jZS5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/attendance/attendance.component.html":
/*!******************************************************!*\
  !*** ./src/app/attendance/attendance.component.html ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"body\">\n\n    <!--Header-->\n    <app-header></app-header>\n  \n    <!-- Spinner -->\n    <ngx-spinner bdColor=\"rgba(0,0,0,0.8)\" size=\"large\" color=\"#00a7f8\" type=\"ball-spin-clockwise\"></ngx-spinner>\n  \n    <!-- Main content -->\n    <main>\n      <div class=\"container\">\n        \n        <!-- Title -->\n        <div class=\"row\">\n          <div class=\"col s12\">\n            <h3 class=\"header\">Acompanhar aplicação</h3>\n            <p class=\"caption\">Aplicações de avaliação que foram criadas por você ou por outro membro da organização e ainda não foram concluídas.</p>\n          </div>\n        </div>\n  \n      </div>\n    </main>\n  \n    <!-- Footer -->\n    <app-footer></app-footer>\n  \n  </div>\n  "

/***/ }),

/***/ "./src/app/attendance/attendance.component.ts":
/*!****************************************************!*\
  !*** ./src/app/attendance/attendance.component.ts ***!
  \****************************************************/
/*! exports provided: AttendanceComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AttendanceComponent", function() { return AttendanceComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var AttendanceComponent = /** @class */ (function () {
    function AttendanceComponent() {
    }
    AttendanceComponent.prototype.ngOnInit = function () {
    };
    AttendanceComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-attendance',
            template: __webpack_require__(/*! ./attendance.component.html */ "./src/app/attendance/attendance.component.html"),
            styles: [__webpack_require__(/*! ./attendance.component.css */ "./src/app/attendance/attendance.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], AttendanceComponent);
    return AttendanceComponent;
}());



/***/ }),

/***/ "./src/app/competence/competence.component.css":
/*!*****************************************************!*\
  !*** ./src/app/competence/competence.component.css ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbXBldGVuY2UvY29tcGV0ZW5jZS5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/competence/competence.component.html":
/*!******************************************************!*\
  !*** ./src/app/competence/competence.component.html ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"body\">\n\n  <!--Header-->\n  <app-header></app-header>\n\n  <!-- Spinner -->\n  <ngx-spinner bdColor=\"rgba(0,0,0,0.8)\" size=\"large\" color=\"#00a7f8\" type=\"ball-spin-clockwise\"></ngx-spinner>\n\n  <!-- Main content -->\n  <main onload=\"M.AutoInit();\">\n    <div class=\"container\">\n      \n      <!-- Title -->\n      <div class=\"row\">\n        <div class=\"col s12\">\n          <h3 class=\"header\">Competências</h3>\n        </div>\n      </div>\n\n      <div class=\"row\" *ngIf=\"competences.length<=0\">\n        <div class=\"col s12 center\">\n          <h5 class=\"header\">Esta organização não possui competências cadastradas!</h5>\n          <p class=\"caption\" *ngIf=\"userProfile!='organizationManager'\">\n            Solicite para um gestor da organização para adicionar, alterar ou excluir competências da organização.\n          </p>\n          <p class=\"caption\" *ngIf=\"userProfile==='organizationManager'\">\n            Adicione uma competência clicando no botão \"Nova Competência\"!\n          </p>\n        </div>\n      </div>\n\n      <!-- Cards\n      <div class=\"row\" *ngIf=\"cardsVisible\">\n        <div class=\"col s12 m4\">\n          <div class=\"card-panel white\" style=\"height: 300px;\">\n            <h6>Conhecimentos</h6>\n            <div id=\"knowledge\" style=\"height: 90%;\"></div>\n          </div>\n        </div>\n        <div class=\"col s12 m4\">\n          <div class=\"card-panel white\" style=\"height: 300px;\">\n            <h6>Habilidades</h6>\n            <div id=\"ability\" style=\"height: 90%;\"></div>\n          </div>\n        </div>\n        <div class=\"col s12 m4\">\n          <div class=\"card-panel white\" style=\"height: 300px;\">\n            <h6>Atitudes</h6>\n            <div id=\"attitude\" style=\"height: 90%;\"></div>\n          </div>\n        </div>\n      </div> -->\n\n      <!-- Cards -->\n      <div class=\"row\" *ngIf=\"cardsVisible\">\n        <div class=\"col s12 m4\">\n          <div class=\"card-panel white\" style=\"height: 300px;\">\n            <h6>Distribuição</h6>\n            <div id=\"knowledge\" style=\"height: 90%;\"></div>\n          </div>\n        </div>\n        <div class=\"col s12 m8\">\n          <div class=\"card-panel white\" style=\"height: 300px;\">\n            <h6>Visão geral</h6>\n            <h4>{{ knowledgeCount>0 ? (knowledgeCount>1 ? knowledgeCount + ' conhecimentos' : knowledgeCount + ' conhecimento') : 'Nenhum conhecimento'}}</h4>\n            <h4>{{ abilityCount>0 ? (abilityCount>1 ? abilityCount + ' habilidades' : abilityCount + ' habilidade') : 'Nenhuma habilidade'}}</h4>\n            <h4>{{ attitudeCount>0 ? (attitudeCount>1 ? attitudeCount + ' atitudes' : attitudeCount + ' atitude') : 'Nenhuma atitude'}}</h4>\n          </div>\n        </div>\n      </div>\n\n      <!-- Competences -->\n      <div class=\"row\">\n        <div class=\"col s12\">\n          <table class=\"highlight\" *ngIf=\"competences.length>0\">\n            <thead>\n              <tr>\n                <th>Nome</th>\n                <th>Tipo</th>\n                <th>Descrição</th>\n                <th *ngIf=\"userProfile==='organizationManager'\">Opções</th>\n              </tr>\n            </thead>\n            <tbody>\n              <tr *ngFor=\"let competence of competences\">\n                <td (click)=\"editCompetenceModal(competence.name)\">{{ competence.name }}</td>\n                <td (click)=\"editCompetenceModal(competence.name)\">{{ filterCompetenceType(competence.type) }}</td>\n                <td (click)=\"editCompetenceModal(competence.name)\">{{ competence.description }}</td>\n                <td *ngIf=\"userProfile==='organizationManager'\">\n                  <a style=\"cursor: pointer;\" title=\"Editar competência {{ competence.name }}\" (click)=\"editCompetenceModal(competence.name)\"><i class=\"material-icons left\">edit</i></a>\n                  <a class=\"modal-trigger\" href=\"#deleteCompetence\" title=\"Excluir competência {{ competence.name }}\" (click)=\"deleteCompetenceModal(competence.name)\"><i class=\"material-icons left\">delete</i></a>\n                </td>\n              </tr>\n            </tbody>\n          </table>\n        </div>\n      </div>\n\n      <!-- Button -->\n      <div class=\"row\" *ngIf=\"userProfile==='organizationManager'\">\n        <div class=\"col s12 center\">\n          <a class=\"waves-effect waves-light light-blue btn-large modal-trigger\" href=\"#addCompetence\" (click)=\"addCompetenceModal()\"><i class=\"material-icons left\">add</i>Nova competência</a>\n        </div>\n      </div>\n\n      <!-- User without access -->\n      <div class=\"row\" *ngIf=\"userProfile!='organizationManager'\">\n        <div class=\"col s12 center\">\n          <p>Você não possui acesso para adicionar, alterar ou excluir competências na organização {{ organization.name }}.</p>\n        </div>\n      </div>\n\n      <!-- Modal to delete competence -->\n      <div id=\"deleteCompetence\" class=\"modal modal-fixed-footer deleteCompetence\">\n        <div class=\"modal-content\">\n          <h4>Excluir competência</h4>\n          <p>\n            Você realmente deseja excluir a competência? Essa ação não poderá ser desfeita.\n            Todas as avaliações e histórico de avaliações que utilizaram essa competência não serão alterados.\n          </p>\n        </div>\n        <div class=\"modal-footer\">\n          <a class=\"modal-close waves-effect waves-green btn-flat\">Cancelar</a>\n          <a class=\"modal-close waves-effect waves-light red btn\" (click)=\"deleteCompetence()\">Excluir</a>\n        </div>\n      </div>\n\n      <!-- Modal to add competence -->\n      <div id=\"addCompetence\" class=\"modal modal-fixed-footer addCompetence\">\n        <div class=\"modal-content\">\n          <h4>Adicionar nova competência</h4>\n          <p>\n            Informe os dados da nova competência da organização {{ organization.name }}.\n          </p>\n          <div class=\"row\">\n            <form class=\"col s12\">\n              <div class=\"row\">\n                <div class=\"input-field col s12 m6\">\n                  <i class=\"material-icons prefix\">grain</i>\n                  <label class=\"active\" for=\"competenceName\">Nome</label>\n                  <input #competenceName id=\"competenceName\" type=\"text\" class=\"validate\" value=\"\">\n                </div>\n              </div>\n              <div class=\"row\">\n                <div class=\"input-field col s12 m6\">\n                  <i class=\"material-icons prefix\">Tipo</i>\n                  <label class=\"active\" for=\"competenceType\">Tipo</label>\n                  <select #competenceType id=\"competenceType\" class=\"validate\">\n                      <option *ngFor='let type of competenceTypes' [value]=\"type.value\">\n                        {{ type.description }}\n                      </option>\n                  </select>\n                </div>\n              </div>\n              <div class=\"row\">\n                <div class=\"input-field col s12 m6\">\n                  <i class=\"material-icons prefix\">description</i>\n                  <label class=\"active\" for=\"competenceDescription\">Descrição</label>\n                  <input #competenceDescription id=\"competenceDescription\" type=\"text\" class=\"validate\" value=\"\">\n                </div>\n              </div>\n            </form>\n          </div>\n        </div>\n        <div class=\"modal-footer\">\n          <a class=\"modal-close waves-effect waves-green btn-flat\">Cancelar</a>\n          <a class=\"modal-close waves-effect waves-light light-blue btn\" (click)=\"addCompetence(competenceName.value, competenceType.value, competenceDescription.value)\">Adicionar</a>\n        </div>\n      </div>\n\n\n\n\n\n\n      <!-- Modal to edit competence -->\n      <div id=\"editCompetence\" class=\"modal modal-fixed-footer editCompetence\">\n          <div class=\"modal-content\">\n            <h4>Editar competência</h4>\n            <p>\n              Atualize as informações da competência.\n            </p>\n            <div class=\"row\">\n              <form class=\"col s12\">\n                <div class=\"row\">\n                  <div class=\"input-field col s12 m6\">\n                    <i class=\"material-icons prefix\">grain</i>\n                    <label class=\"active\" for=\"competenceNameEdit\">Nome</label>\n                    <input #competenceNameEdit id=\"competenceNameEdit\" type=\"text\" class=\"validate\" value=\"\">\n                  </div>\n                </div>\n                <div class=\"row\">\n                  <div class=\"input-field col s12 m6\">\n                    <i class=\"material-icons prefix\">Tipo</i>\n                    <label class=\"active\" for=\"competenceTypeEdit\">Tipo</label>\n                    <select #competenceTypeEdit id=\"competenceTypeEdit\" class=\"validate\">\n                        <option *ngFor='let type of competenceTypes' [value]=\"type.value\">\n                          {{ type.description }}\n                        </option>\n                    </select>\n                  </div>\n                </div>\n                <div class=\"row\">\n                  <div class=\"input-field col s12 m6\">\n                    <i class=\"material-icons prefix\">description</i>\n                    <label class=\"active\" for=\"competenceDescriptionEdit\">Descrição</label>\n                    <input #competenceDescriptionEdit id=\"competenceDescriptionEdit\" type=\"text\" class=\"validate\" value=\"\">\n                  </div>\n                </div>\n              </form>\n            </div>\n          </div>\n          <div class=\"modal-footer\">\n            <a class=\"modal-close waves-effect waves-green btn-flat\">Cancelar</a>\n            <a class=\"modal-close waves-effect waves-light light-blue btn\" (click)=\"editCompetence(competenceNameEdit.value, competenceTypeEdit.value, competenceDescriptionEdit.value)\">Adicionar</a>\n          </div>\n        </div>\n\n\n\n    </div>\n  </main>\n\n  <!-- Footer -->\n  <app-footer></app-footer>\n\n</div>\n"

/***/ }),

/***/ "./src/app/competence/competence.component.ts":
/*!****************************************************!*\
  !*** ./src/app/competence/competence.component.ts ***!
  \****************************************************/
/*! exports provided: CompetenceComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CompetenceComponent", function() { return CompetenceComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var highcharts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! highcharts */ "./node_modules/highcharts/highcharts.js");
/* harmony import */ var highcharts__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(highcharts__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var angularx_social_login__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! angularx-social-login */ "./node_modules/angularx-social-login/angularx-social-login.es5.js");
/* harmony import */ var _services_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../services.service */ "./src/app/services.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var ngx_cookie_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ngx-cookie-service */ "./node_modules/ngx-cookie-service/ngx-cookie-service.es5.js");
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ngx-spinner */ "./node_modules/ngx-spinner/fesm5/ngx-spinner.js");








var Boost = __webpack_require__(/*! highcharts/modules/boost */ "./node_modules/highcharts/modules/boost.js");
var noData = __webpack_require__(/*! highcharts/modules/no-data-to-display */ "./node_modules/highcharts/modules/no-data-to-display.js");
var More = __webpack_require__(/*! highcharts/highcharts-more */ "./node_modules/highcharts/highcharts-more.js");
Boost(highcharts__WEBPACK_IMPORTED_MODULE_2__);
noData(highcharts__WEBPACK_IMPORTED_MODULE_2__);
More(highcharts__WEBPACK_IMPORTED_MODULE_2__);
var CompetenceComponent = /** @class */ (function () {
    function CompetenceComponent(authService, service, router, cookie, spinner) {
        this.authService = authService;
        this.service = service;
        this.router = router;
        this.cookie = cookie;
        this.spinner = spinner;
        this.userEmail = '';
        this.userProfile = '';
        this.competences = [];
        this.competenceName = '';
        this.competenceType = '';
        this.competenceDescription = '';
        this.temporaryName = '';
        this.organization = {
            _rev: '',
            name: '',
            users: [],
            competences: [],
            status: ''
        };
        this.organizationId = '';
        this.organizationName = '';
        this.competenceTypes = [
            { value: 'knowledge', description: 'Conhecimento' },
            { value: 'ability', description: 'Habilidade' },
            { value: 'attitude', description: 'Atitude' }
        ];
        this.knowledgeCount = 0;
        this.abilityCount = 0;
        this.attitudeCount = 0;
        this.cardsVisible = true;
    }
    CompetenceComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.spinner.show();
        this.organizationId = this.cookie.get('ORGANIZATIONID');
        this.organizationName = this.cookie.get('ORGANIZATIONNAME');
        this.userProfile = this.cookie.get('ORGANIZATIONMEMBERPROFILE');
        this.authService.authState.subscribe(function (user) {
            console.log(user);
            _this.userEmail = user.email;
            _this.getCompetences();
        });
    };
    CompetenceComponent.prototype.getCompetences = function () {
        var _this = this;
        this.service.findOrganizationById(this.organizationId).subscribe(function (data) {
            _this.organization = Object(data);
            _this.competences = _this.organization.competences || [];
            _this.competences.sort(_this.compare);
            _this.updateGraphs();
            _this.spinner.hide();
        }, function (error) {
            _this.spinner.hide();
        });
    };
    CompetenceComponent.prototype.countCompetences = function () {
        var _this = this;
        this.knowledgeCount = 0;
        this.abilityCount = 0;
        this.attitudeCount = 0;
        this.competences.forEach(function (competence) {
            if (competence.type === 'knowledge') {
                _this.knowledgeCount++;
            }
            if (competence.type === 'ability') {
                _this.abilityCount++;
            }
            if (competence.type === 'attitude') {
                _this.attitudeCount++;
            }
        });
    };
    CompetenceComponent.prototype.compare = function (a, b) {
        var nameA = a.name.toUpperCase();
        var nameB = b.name.toUpperCase();
        var comparison = 0;
        if (nameA > nameB) {
            comparison = 1;
        }
        else if (nameA < nameB) {
            comparison = -1;
        }
        return comparison;
    };
    CompetenceComponent.prototype.addCompetenceModal = function () {
        $('.modal').modal();
        $('select').formSelect();
        $('.addCompetence').modal('open');
    };
    CompetenceComponent.prototype.editCompetenceModal = function (competenceName) {
        var comp = this.competences.find(function (c) { return c.name === competenceName; });
        this.temporaryName = competenceName;
        $('#competenceNameEdit').val(competenceName);
        $('#competenceTypeEdit').val(comp.type);
        $('#competenceDescriptionEdit').val(comp.description);
        $('.modal').modal();
        $('select').formSelect();
        $('.editCompetence').modal('open');
        M.updateTextFields();
    };
    CompetenceComponent.prototype.filterCompetenceType = function (competenceType) {
        return this.competenceTypes.find(function (competence) { return competence.value === competenceType; }).description;
    };
    CompetenceComponent.prototype.addCompetence = function (competenceName, competenceType, competenceDescription) {
        var _this = this;
        this.cardsVisible = true;
        if (competenceName === '' || competenceType === '' || competenceDescription === '') {
            M.toast({ html: "Voc\u00EA deve preencher todos os campos obrigat\u00F3rios." });
        }
        else {
            var comp = this.organization.competences.find(function (c) { return c.name === competenceName; });
            if (comp) {
                M.toast({ html: "J\u00E1 existe uma compet\u00EAncia cadastrada com o nome '" + competenceName + "'." });
            }
            else {
                this.spinner.show();
                var competence = {
                    name: competenceName,
                    type: competenceType,
                    description: competenceDescription
                };
                this.organization.competences.push(competence);
                this.service.updateOrganization(this.organization).subscribe(function (data) {
                    _this.competences = _this.organization.competences;
                    _this.competences.sort(_this.compare);
                    _this.spinner.hide();
                    M.toast({ html: 'Competência adicionada com sucesso!' });
                    _this.updateGraphs();
                }, function (error) {
                    _this.router.navigate(['home']);
                });
            }
        }
    };
    CompetenceComponent.prototype.editCompetence = function (competenceName, competenceType, competenceDescription) {
        var _this = this;
        if (competenceName === '' || competenceType === '' || competenceDescription === '') {
            M.toast({ html: "Voc\u00EA deve preencher todos os campos obrigat\u00F3rios." });
        }
        else {
            var comp = this.organization.competences.find(function (c) { return c.name === _this.temporaryName; });
            if (comp) {
                this.spinner.show();
                this.organization.competences = this.organization.competences.filter(function (c) { return c.name !== _this.temporaryName; });
                var competence = {
                    name: competenceName,
                    type: competenceType,
                    description: competenceDescription
                };
                this.organization.competences.push(competence);
                this.service.updateOrganization(this.organization).subscribe(function (data) {
                    _this.competences = _this.organization.competences;
                    _this.competences.sort(_this.compare);
                    _this.temporaryName = '';
                    _this.spinner.hide();
                    M.toast({ html: 'Competência atualizada com sucesso!' });
                    _this.updateGraphs();
                }, function (error) {
                    _this.router.navigate(['home']);
                });
            }
            else {
                M.toast({ html: "Ocorreu algum erro. Por favor, tente novamente!" });
            }
        }
    };
    CompetenceComponent.prototype.deleteCompetenceModal = function (competenceName) {
        this.temporaryName = competenceName;
        $('.modal').modal();
        $('select').formSelect();
        $('.deleteCompetence').modal('open');
    };
    CompetenceComponent.prototype.deleteCompetence = function () {
        var _this = this;
        var comp = this.organization.competences.find(function (c) { return c.name === _this.temporaryName; });
        if (comp) {
            this.spinner.show();
            this.organization.competences = this.organization.competences.filter(function (c) { return c.name !== _this.temporaryName; });
            this.service.updateOrganization(this.organization).subscribe(function (data) {
                _this.competences = _this.organization.competences;
                _this.competences.sort(_this.compare);
                _this.temporaryName = '';
                _this.spinner.hide();
                M.toast({ html: 'Competência excluída com sucesso!' });
                _this.updateGraphs();
            }, function (error) {
                _this.router.navigate(['home']);
            });
        }
        else {
            M.toast({ html: "Ocorreu algum erro ao excluir a compet\u00EAncia." });
        }
    };
    CompetenceComponent.prototype.updateGraphs = function () {
        if (this.competences.length <= 0) {
            this.cardsVisible = false;
        }
        else {
            this.cardsVisible = true;
        }
        this.countCompetences();
        this.spinner.hide();
        var graphOptions = {
            chart: {
                type: 'variablepie',
                backgroundColor: 'transparent'
            },
            title: {
                text: null
            },
            tooltip: {
                enabled: true,
                useHTML: true,
                headerFormat: '',
                pointFormat: '<b>{point.name}</b>'
            },
            series: [{
                    minPointSize: 10,
                    innerSize: '60%',
                    zMin: 0,
                    name: 'competences',
                    showInLegend: false,
                    states: {
                        hover: {
                            enabled: true
                        }
                    },
                    dataLabels: {
                        enabled: false
                    },
                    data: []
                }]
        };
        var knowledgeData = [{
                name: 'Conhecimentos',
                y: this.knowledgeCount * 100 / this.competences.length,
                z: 25,
                sliced: false,
                color: '#448AFF'
            }, {
                name: 'Habilidades',
                y: this.abilityCount * 100 / this.competences.length,
                z: 25,
                sliced: false,
                color: '#4CAF50'
            }, {
                name: 'Atitudes',
                y: this.attitudeCount * 100 / this.competences.length,
                z: 25,
                sliced: false,
                color: '#FF9800'
            }];
        var abilityData = [{
                name: 'Conhecimentos',
                y: this.knowledgeCount * 100 / this.competences.length,
                z: 5,
                color: 'rgba(150,100,50,0.1)',
                enabled: false
            }, {
                name: 'Habilidades',
                y: this.abilityCount * 100 / this.competences.length,
                z: 25,
                sliced: true,
                color: '#4CAF50'
            }, {
                name: 'Atitudes',
                y: this.attitudeCount * 100 / this.competences.length,
                z: 5,
                color: 'rgba(150,100,50,0.1)',
                enabled: false
            }];
        var attitudeData = [{
                name: 'Conhecimentos',
                y: this.knowledgeCount * 100 / this.competences.length,
                z: 5,
                color: 'rgba(150,100,50,0.1)',
                enabled: false
            }, {
                name: 'Habilidades',
                y: this.abilityCount * 100 / this.competences.length,
                z: 5,
                color: 'rgba(150,100,50,0.1)',
                enabled: false
            }, {
                name: 'Atitudes',
                y: this.attitudeCount * 100 / this.competences.length,
                z: 25,
                sliced: true,
                color: '#FF9800'
            }];
        graphOptions.series[0].data = knowledgeData;
        highcharts__WEBPACK_IMPORTED_MODULE_2__["chart"]('knowledge', graphOptions);
        $('.highcharts-credits').hide();
        graphOptions.series[0].data = abilityData;
        highcharts__WEBPACK_IMPORTED_MODULE_2__["chart"]('ability', graphOptions);
        $('.highcharts-credits').hide();
        graphOptions.series[0].data = attitudeData;
        highcharts__WEBPACK_IMPORTED_MODULE_2__["chart"]('attitude', graphOptions);
        $('.highcharts-credits').hide();
    };
    CompetenceComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-competence',
            template: __webpack_require__(/*! ./competence.component.html */ "./src/app/competence/competence.component.html"),
            styles: [__webpack_require__(/*! ./competence.component.css */ "./src/app/competence/competence.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [angularx_social_login__WEBPACK_IMPORTED_MODULE_3__["AuthService"],
            _services_service__WEBPACK_IMPORTED_MODULE_4__["ServicesService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"],
            ngx_cookie_service__WEBPACK_IMPORTED_MODULE_6__["CookieService"],
            ngx_spinner__WEBPACK_IMPORTED_MODULE_7__["NgxSpinnerService"]])
    ], CompetenceComponent);
    return CompetenceComponent;
}());



/***/ }),

/***/ "./src/app/contact/contact.component.css":
/*!***********************************************!*\
  !*** ./src/app/contact/contact.component.css ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbnRhY3QvY29udGFjdC5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/contact/contact.component.html":
/*!************************************************!*\
  !*** ./src/app/contact/contact.component.html ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"body\">\n  \n  <!--Header-->\n  <app-header></app-header>\n\n  <!-- Main content -->\n  <main>\n    <div class=\"container\">\n      <div class=\"row\">\n        <div class=\"col s12\">\n          <h3 class=\"header\">Sobre</h3>\n          <p class=\"caption\">Esta é a página sobre o PSAS e contato.</p>\n        </div>\n      </div>\n    </div>\n  </main>\n\n  <!-- Footer -->\n  <app-footer></app-footer>\n  \n</div>\n"

/***/ }),

/***/ "./src/app/contact/contact.component.ts":
/*!**********************************************!*\
  !*** ./src/app/contact/contact.component.ts ***!
  \**********************************************/
/*! exports provided: ContactComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContactComponent", function() { return ContactComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var ContactComponent = /** @class */ (function () {
    function ContactComponent() {
    }
    ContactComponent.prototype.ngOnInit = function () {
    };
    ContactComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-contact',
            template: __webpack_require__(/*! ./contact.component.html */ "./src/app/contact/contact.component.html"),
            styles: [__webpack_require__(/*! ./contact.component.css */ "./src/app/contact/contact.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], ContactComponent);
    return ContactComponent;
}());



/***/ }),

/***/ "./src/app/core/footer/footer.component.css":
/*!**************************************************!*\
  !*** ./src/app/core/footer/footer.component.css ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".page-footer {\n    height: 46px;\n    padding-top: 0px;\n    background-color: white;\n    color: rgba(0,0,0,0.87);\n}\n\n.p-footer {\n    margin-top: 0px;\n    margin-bottom: 0px;\n    padding-top: 10px;\n    border-top-color: rgb(224, 224, 224);\n    border-top-style: solid;\n    border-top-width: 1px;\n}\n\n.a-footer {\n    padding-left: 10px;\n    padding-right: 10px;\n}\n\n.ul-footer {\n    display:flex;  \n    list-style:none;\n}\n\n@media only screen and (max-width : 992px) {\n    .ul-footer {\n        display: list-item;\n    }\n  }\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29yZS9mb290ZXIvZm9vdGVyLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7SUFDSSxZQUFZO0lBQ1osZ0JBQWdCO0lBQ2hCLHVCQUF1QjtJQUN2Qix1QkFBdUI7QUFDM0I7O0FBRUE7SUFDSSxlQUFlO0lBQ2Ysa0JBQWtCO0lBQ2xCLGlCQUFpQjtJQUNqQixvQ0FBb0M7SUFDcEMsdUJBQXVCO0lBQ3ZCLHFCQUFxQjtBQUN6Qjs7QUFFQTtJQUNJLGtCQUFrQjtJQUNsQixtQkFBbUI7QUFDdkI7O0FBRUE7SUFDSSxZQUFZO0lBQ1osZUFBZTtBQUNuQjs7QUFFQTtJQUNJO1FBQ0ksa0JBQWtCO0lBQ3RCO0VBQ0YiLCJmaWxlIjoic3JjL2FwcC9jb3JlL2Zvb3Rlci9mb290ZXIuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi5wYWdlLWZvb3RlciB7XG4gICAgaGVpZ2h0OiA0NnB4O1xuICAgIHBhZGRpbmctdG9wOiAwcHg7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XG4gICAgY29sb3I6IHJnYmEoMCwwLDAsMC44Nyk7XG59XG5cbi5wLWZvb3RlciB7XG4gICAgbWFyZ2luLXRvcDogMHB4O1xuICAgIG1hcmdpbi1ib3R0b206IDBweDtcbiAgICBwYWRkaW5nLXRvcDogMTBweDtcbiAgICBib3JkZXItdG9wLWNvbG9yOiByZ2IoMjI0LCAyMjQsIDIyNCk7XG4gICAgYm9yZGVyLXRvcC1zdHlsZTogc29saWQ7XG4gICAgYm9yZGVyLXRvcC13aWR0aDogMXB4O1xufVxuXG4uYS1mb290ZXIge1xuICAgIHBhZGRpbmctbGVmdDogMTBweDtcbiAgICBwYWRkaW5nLXJpZ2h0OiAxMHB4O1xufVxuXG4udWwtZm9vdGVyIHtcbiAgICBkaXNwbGF5OmZsZXg7ICBcbiAgICBsaXN0LXN0eWxlOm5vbmU7XG59XG5cbkBtZWRpYSBvbmx5IHNjcmVlbiBhbmQgKG1heC13aWR0aCA6IDk5MnB4KSB7XG4gICAgLnVsLWZvb3RlciB7XG4gICAgICAgIGRpc3BsYXk6IGxpc3QtaXRlbTtcbiAgICB9XG4gIH0iXX0= */"

/***/ }),

/***/ "./src/app/core/footer/footer.component.html":
/*!***************************************************!*\
  !*** ./src/app/core/footer/footer.component.html ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<footer class=\"page-footer\">\n  <p class=\"p-footer center\">\n    <a class=\"a-footer\" routerLink=\"/privacy\">Política de privacidade</a>\n    <a class=\"a-footer modal-trigger\" href=\"#apiDocumentation\" onclick=\"M.Modal.init(document.querySelectorAll('.modal'));$('.apiDocumentation').modal('open');\" (click)=\"getToken()\">Documentação da API</a>\n  </p>\n  <!-- Modal to redirect to api documentation -->\n  <div id=\"apiDocumentation\" class=\"modal modal-fixed-footer apiDocumentation\">\n    <div class=\"modal-content\">\n      <h4>Documentação da API</h4>\n      <p>\n        Para utilizar a API é necessário uma chave <i>bearer token</i>.\n        Você pode copiar e colar a sua chave abaixo. Na janela de documentação, clique sobre o botão <i>Authorize</i> e cole a chave copiada.\n      </p>\n      <br>\n      <div class=\"col s12\">\n        <p class=\"grey-text text-darken-2\" style=\"word-break: break-all; font-size: 12px;\">{{ token }}</p>\n      </div>\n      <br>\n    </div>\n    <div class=\"modal-footer\">\n      <a class=\"modal-close waves-effect waves-green btn-flat\">Cancelar</a>\n      <a class=\"modal-close waves-effect waves-light light-blue btn\" target=\"_blank\" href=\"./assets/api/index.html\">Documentação</a>\n    </div>\n  </div>\n</footer>\n"

/***/ }),

/***/ "./src/app/core/footer/footer.component.ts":
/*!*************************************************!*\
  !*** ./src/app/core/footer/footer.component.ts ***!
  \*************************************************/
/*! exports provided: FooterComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FooterComponent", function() { return FooterComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var angularx_social_login__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! angularx-social-login */ "./node_modules/angularx-social-login/angularx-social-login.es5.js");



var FooterComponent = /** @class */ (function () {
    function FooterComponent(authService) {
        this.authService = authService;
        this.token = '';
    }
    FooterComponent.prototype.ngOnInit = function () { };
    FooterComponent.prototype.getToken = function () {
        var _this = this;
        this.authService.authState.subscribe(function (user) {
            if (user != null) {
                _this.token = user.idToken;
            }
        });
    };
    FooterComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-footer',
            template: __webpack_require__(/*! ./footer.component.html */ "./src/app/core/footer/footer.component.html"),
            styles: [__webpack_require__(/*! ./footer.component.css */ "./src/app/core/footer/footer.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [angularx_social_login__WEBPACK_IMPORTED_MODULE_2__["AuthService"]])
    ], FooterComponent);
    return FooterComponent;
}());



/***/ }),

/***/ "./src/app/core/header/header.component.css":
/*!**************************************************!*\
  !*** ./src/app/core/header/header.component.css ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "#dropdown1 > ul > li.active, #dropdown2 > ul > li.active, #dropdown3 > ul > li.active {\n    background-color: #03a9f4;\n}\n\nli.active > a > .material-icons {\n    color: white !important;\n}\n\nul.sidenav-fixed > li.active {\n    background-color: #03a9f4;\n}\n\na.organization { \n    font-size: 30px;\n    font-weight: bold;\n}\n\nli.logo:hover {\n    background-color: transparent !important;\n}\n\nli.logo a:hover {\n    background-color: transparent !important;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29yZS9oZWFkZXIvaGVhZGVyLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7SUFDSSx5QkFBeUI7QUFDN0I7O0FBRUE7SUFDSSx1QkFBdUI7QUFDM0I7O0FBRUE7SUFDSSx5QkFBeUI7QUFDN0I7O0FBRUE7SUFDSSxlQUFlO0lBQ2YsaUJBQWlCO0FBQ3JCOztBQUVBO0lBQ0ksd0NBQXdDO0FBQzVDOztBQUVBO0lBQ0ksd0NBQXdDO0FBQzVDIiwiZmlsZSI6InNyYy9hcHAvY29yZS9oZWFkZXIvaGVhZGVyLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIjZHJvcGRvd24xID4gdWwgPiBsaS5hY3RpdmUsICNkcm9wZG93bjIgPiB1bCA+IGxpLmFjdGl2ZSwgI2Ryb3Bkb3duMyA+IHVsID4gbGkuYWN0aXZlIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDNhOWY0O1xufVxuXG5saS5hY3RpdmUgPiBhID4gLm1hdGVyaWFsLWljb25zIHtcbiAgICBjb2xvcjogd2hpdGUgIWltcG9ydGFudDtcbn1cblxudWwuc2lkZW5hdi1maXhlZCA+IGxpLmFjdGl2ZSB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzAzYTlmNDtcbn1cblxuYS5vcmdhbml6YXRpb24geyBcbiAgICBmb250LXNpemU6IDMwcHg7XG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XG59XG5cbmxpLmxvZ286aG92ZXIge1xuICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50ICFpbXBvcnRhbnQ7XG59XG5cbmxpLmxvZ28gYTpob3ZlciB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQgIWltcG9ydGFudDtcbn0iXX0= */"

/***/ }),

/***/ "./src/app/core/header/header.component.html":
/*!***************************************************!*\
  !*** ./src/app/core/header/header.component.html ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!-- Navbar -->\n<div class=\"navbar-fixed\">\n  <nav>\n    <div class=\"nav-wrapper light-blue\">\n      <a *ngIf=\"sidenav==true\" href=\"#\" data-target=\"slide-out\" class=\"sidenav-trigger\" onclick=\"M.Sidenav.init(document.querySelectorAll('.sidenav'));\"><i class=\"material-icons\">menu</i></a>\n      <a routerLink=\"/home\" class=\"brand-logo\" style=\"padding-left: 10px;\">PSAS</a>\n      <!-- Navbar medium and upper -->\n      <!--<ul id=\"dropdown4\" class=\"dropdown-content\">\n        <li *ngFor=\"let org of organizations\"><a href=\"#!\">{{ org.name }}</a></li>\n      </ul>-->\n      <ul id=\"nav-mobile\" class=\"right hide-on-med-and-down\">\n        <li *ngIf=\"loggedIn\" style=\"pointer-events: none;\"><a style=\"cursor: default;\">Olá {{ user.firstName }}</a></li>\n        <li *ngIf=\"loggedIn==false\"><a routerLink=\"/user\" style=\"font-weight: bold;\">Entrar</a></li>\n        <li><a routerLink=\"/help\" style=\"font-weight: bold;\">Ajuda</a></li>\n        <li *ngIf=\"loggedIn\"><a (click)=\"signOut()\" style=\"font-weight: bold;\">Sair</a></li>\n      </ul>\n      <!-- Sidenav medium and down -->\n      <!--<ul class=\"sidenav\" id=\"slide-out\">\n        <li *ngIf=\"loggedIn\"><a class=\"sidenav-close\" routerLink=\"/home\">Olá {{ user.firstName }}</a></li>\n        <li *ngIf=\"loggedIn==false\"><a class=\"sidenav-close\" routerLink=\"/user\">Entrar</a></li>\n        <li routerLinkActive=\"active\"><a class=\"sidenav-close\" routerLink=\"/dashboard\">Dashboard</a></li>\n        <li routerLinkActive=\"active\"><a class=\"sidenav-close\" routerLink=\"/organization\">Organizações</a></li>\n        <li routerLinkActive=\"active\"><a class=\"sidenav-close\" routerLink=\"/assessment\">Avaliações</a></li>\n        <li routerLinkActive=\"active\"><a class=\"sidenav-close\" routerLink=\"/project\">Projetos</a></li>\n        <li routerLinkActive=\"active\"><a class=\"sidenav-close\" routerLink=\"/team\">Equipes</a></li>\n        <li routerLinkActive=\"active\"><a class=\"sidenav-close\" routerLink=\"/application\">Aplicações</a></li>\n        <li routerLinkActive=\"active\"><a class=\"sidenav-close\" routerLink=\"/contact\">Sobre</a></li>\n        <li routerLinkActive=\"active\"><a class=\"sidenav-close\" routerLink=\"/help\">Ajuda</a></li>\n        <li *ngIf=\"loggedIn\"><a class=\"sidenav-close\" (click)=\"signOut()\">Sair</a></li>\n      </ul>-->\n    </div>\n  </nav>\n</div>\n\n<!-- Sidenav medium and upper -->\n<ul *ngIf=\"sidenav==true\" class=\"sidenav sidenav-fixed sidenav-close\" id=\"slide-out\">\n  <li class=\"logo center\" style=\"margin-top: 30px; margin-bottom: 30px;\"><a routerLink=\"/organization\" class=\"organization\" style=\"display:flex; align-items: center\"><i class=\"material-icons\" style=\"margin: 0px; margin-right: 5px; color: black;\">keyboard_return</i>{{ organizationName }}</a>\n  </li>\n  <li><a class=\"waves-effect\" style=\"font-size: 18px; cursor: default;\"><b>DASHBOARD</b></a>\n    <div id=\"dropdown1\" class=\"collapsible-body\" style=\"display: block;\">\n      <ul>\n        <li routerLinkActive=\"active\"><a style=\"padding-left: 50px;\" routerLink=\"/profile\"><i class=\"material-icons\" style=\"margin-right: 10px;\">person</i>Meu perfil</a></li>\n        <li routerLinkActive=\"active\"><a style=\"padding-left: 50px;\" routerLink=\"/dashboard\"><i class=\"material-icons\" style=\"margin-right: 10px;\">business</i>Perfil da organização</a></li>\n      </ul>\n    </div>\n  </li>\n  <li><a class=\"waves-effect\" style=\"font-size: 18px; cursor: default;\"><b>ORGANIZAÇÃO</b></a>\n    <div id=\"dropdown2\" class=\"collapsible-body\" style=\"display: block;\">\n      <ul>\n        <li routerLinkActive=\"active\"><a style=\"padding-left: 50px;\" routerLink=\"/competence\"><i class=\"material-icons\" style=\"margin-right: 10px;\">grain</i>Competências</a></li>\n        <li routerLinkActive=\"active\"><a style=\"padding-left: 50px;\" routerLink=\"/member\"><i class=\"material-icons\" style=\"margin-right: 10px;\">people</i>Pessoas</a></li>\n        <li routerLinkActive=\"active\"><a style=\"padding-left: 50px;\" routerLink=\"/project\"><i class=\"material-icons\" style=\"margin-right: 10px;\">folder</i>Projetos</a></li>\n        <li routerLinkActive=\"active\"><a style=\"padding-left: 50px;\" routerLink=\"/team\"><i class=\"material-icons\" style=\"margin-right: 10px;\">group_work</i>Equipes</a></li>\n      </ul>\n    </div>\n  </li>\n  <li><a class=\"waves-effect\" style=\"font-size: 18px; cursor: default;\"><b>AVALIAÇÃO</b></a>\n    <div id=\"dropdown3\" class=\"collapsible-body\" style=\"display: block;\">\n      <ul>\n        <li routerLinkActive=\"active\"><a style=\"padding-left: 50px;\" routerLink=\"/assessment\"><i class=\"material-icons\" style=\"margin-right: 10px;\">assessment</i>Avaliações</a></li>\n        <li routerLinkActive=\"active\"><a style=\"padding-left: 50px;\" routerLink=\"/application\"><i class=\"material-icons\" style=\"margin-right: 10px;\">assignment_turned_in</i>Aplicar avaliação</a></li>\n        <!--<li routerLinkActive=\"active\"><a style=\"padding-left: 50px;\" routerLink=\"/attendance\"><i class=\"material-icons\" style=\"margin-right: 10px;\">question_answer</i>Acompanhar aplicação</a></li>-->\n        <li routerLinkActive=\"active\"><a style=\"padding-left: 50px;\" routerLink=\"/answer\"><i class=\"material-icons\" style=\"margin-right: 10px;\">rate_review</i>Responder avaliação</a></li>\n      </ul>\n    </div>\n  </li>\n</ul>\n "

/***/ }),

/***/ "./src/app/core/header/header.component.ts":
/*!*************************************************!*\
  !*** ./src/app/core/header/header.component.ts ***!
  \*************************************************/
/*! exports provided: HeaderComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HeaderComponent", function() { return HeaderComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var angularx_social_login__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! angularx-social-login */ "./node_modules/angularx-social-login/angularx-social-login.es5.js");
/* harmony import */ var _auth0_angular_jwt__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @auth0/angular-jwt */ "./node_modules/@auth0/angular-jwt/index.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var src_app_services_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/services.service */ "./src/app/services.service.ts");
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ngx-spinner */ "./node_modules/ngx-spinner/fesm5/ngx-spinner.js");
/* harmony import */ var ngx_cookie_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ngx-cookie-service */ "./node_modules/ngx-cookie-service/ngx-cookie-service.es5.js");








var HeaderComponent = /** @class */ (function () {
    function HeaderComponent(authService, jwtHelper, router, service, cookie, spinner) {
        this.authService = authService;
        this.jwtHelper = jwtHelper;
        this.router = router;
        this.service = service;
        this.cookie = cookie;
        this.spinner = spinner;
        this.organizationName = 'PSAS';
        this.organizations = [
            { name: 'teste' },
            { name: 'teste2' }
        ];
    }
    HeaderComponent.prototype.signOut = function () {
        this.authService.signOut();
        this.router.navigate(['home']);
    };
    HeaderComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.router.url === '/home' || this.router.url === '/organization') {
            this.sidenav = false;
        }
        else {
            this.sidenav = true;
            if (this.cookie.check('ORGANIZATIONNAME')) {
                this.organizationName = this.cookie.get('ORGANIZATIONNAME');
            }
        }
        this.authService.authState.subscribe(function (user) {
            _this.user = user;
            _this.loggedIn = (user != null);
            if (_this.sidenav === false && _this.loggedIn === false) {
                _this.router.navigate(['home']);
            }
        });
        $('.dropdown-trigger').dropdown();
    };
    HeaderComponent.prototype.getOrganizations = function () {
        var _this = this;
        this.service.findOrganizationsFromUser().subscribe(function (data) {
            var orgs = Object(data);
            // this.organizations = Object(orgs).organizationList;
            _this.spinner.hide();
            $('.dropdown-trigger').dropdown();
        }, function (error) {
            _this.spinner.hide();
        });
    };
    HeaderComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-header',
            template: __webpack_require__(/*! ./header.component.html */ "./src/app/core/header/header.component.html"),
            styles: [__webpack_require__(/*! ./header.component.css */ "./src/app/core/header/header.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [angularx_social_login__WEBPACK_IMPORTED_MODULE_2__["AuthService"],
            _auth0_angular_jwt__WEBPACK_IMPORTED_MODULE_3__["JwtHelperService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"],
            src_app_services_service__WEBPACK_IMPORTED_MODULE_5__["ServicesService"],
            ngx_cookie_service__WEBPACK_IMPORTED_MODULE_7__["CookieService"],
            ngx_spinner__WEBPACK_IMPORTED_MODULE_6__["NgxSpinnerService"]])
    ], HeaderComponent);
    return HeaderComponent;
}());



/***/ }),

/***/ "./src/app/dashboard/dashboard.component.css":
/*!***************************************************!*\
  !*** ./src/app/dashboard/dashboard.component.css ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2Rhc2hib2FyZC9kYXNoYm9hcmQuY29tcG9uZW50LmNzcyJ9 */"

/***/ }),

/***/ "./src/app/dashboard/dashboard.component.html":
/*!****************************************************!*\
  !*** ./src/app/dashboard/dashboard.component.html ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"body\">\n\n  <!--Header-->\n  <app-header></app-header>\n  \n  <!-- Spinner -->\n  <ngx-spinner bdColor=\"rgba(0,0,0,0.8)\" size=\"large\" color=\"#00a7f8\" type=\"ball-spin-clockwise\"></ngx-spinner>\n  \n  <!-- Main content -->\n  <main>\n\n    <div class=\"container\">\n\n      <!-- Title -->\n      <div class=\"row\">\n        <div class=\"col s12\">\n          <h3 class=\"header\">Perfil da organização</h3>\n          <p class=\"caption\">Informações sobre a organização.</p>\n        </div>\n      </div>\n\n\n      <!-- Comparative -->\n      <div class=\"divider\"></div>\n      <div class=\"row\">\n        <div class=\"col s12\">\n          <h3 class=\"header\">Comparação dos resultados de avaliação</h3>\n          <h5 *ngIf=\"answers.length<=0\">Sem avaliações para calcular os resultados comparativos</h5>\n        </div>\n      </div>\n      <div class=\"row\">\n        <div class=\"col s12\">\n          <div class=\"row\">\n            <div class=\"input-field col s12 m6\">\n              <select>\n                <option value=\"\" selected>Todos</option>\n                <option *ngFor=\"let project of projects\" [value]=\"project._id\">\n                  {{ project.name }}\n                </option>\n              </select>\n              <label>Projeto</label>\n            </div>\n            <div class=\"input-field col s12 m6\">\n              <select #team (change)=\"comparativeResultsByTeam(team.value)\">\n                <option value=\"\" selected>Todas</option>\n                <option *ngFor=\"let team of teams\" [value]=\"team._id\">\n                  {{ team.name }}\n                </option>\n              </select>\n              <label>Equipe</label>\n            </div>\n          </div>\n          <div class=\"row\">\n            <div class=\"col s12\">\n              <div class=\"card-panel white\" style=\"height: 500px;\">\n                <div id=\"results\"></div>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n\n    \n      <!-- History -->\n      <div class=\"divider\"></div>\n      <div class=\"row\">\n        <div class=\"col s12\">\n          <h3 class=\"header\">Histórico</h3>\n          <h5 *ngIf=\"answers.length<=0\">Sem avaliações para exibir no histórico</h5>\n        </div>\n      </div>\n      <div class=\"row\">\n        <div class=\"col s12\">\n          <div class=\"row\">\n            <div class=\"input-field col s12 m6\">\n              <select #HProject (change)=\"updateHistoryChart(HProject.value, HTeam.value, HPerson.value, HCompetence.value)\">\n                <option value=\"\" selected>Todos</option>\n                <option *ngFor=\"let project of projects\" [value]=\"project._id\">\n                  {{ project.name }}\n                </option>\n              </select >\n              <label>Projeto</label>\n            </div>\n            <div class=\"input-field col s12 m6\">\n              <select #HTeam (change)=\"filterHistoryTeam(HProject.value, HTeam.value, HPerson.value, HCompetence.value)\">\n                <option value=\"\" selected>Todas</option>\n                <option *ngFor=\"let team of teams\" [value]=\"team._id\">\n                  {{ team.name }}\n                </option>\n              </select>\n              <label>Equipe</label>\n            </div>\n          </div>\n          <div class=\"row\">\n            <div class=\"input-field col s12 m6\">\n              <select name=\"HPerson\" id=\"HPerson\" #HPerson (change)=\"updateHistoryChart(HProject.value, HTeam.value, HPerson.value, HCompetence.value)\">\n                <option value=\"\" selected>Todas</option>\n                <option *ngFor=\"let person of peopleList\" [value]=\"person.email\">\n                  {{ person.name }}\n                </option>\n              </select>\n              <label>Pessoas</label>\n            </div>\n            <div class=\"input-field col s12 m6\">\n              <select #HCompetence (change)=\"updateHistoryChart(HProject.value, HTeam.value, HPerson.value, HCompetence.value)\">\n                <option value=\"\" selected>Todas</option>\n                <option *ngFor=\"let competence of spotlightCompetences\" [value]=\"competence\">\n                  {{ competence }}\n                </option>\n              </select>\n              <label>Competências</label>\n            </div>\n          </div>\n        </div>\n      </div>\n      <div class=\"row\">\n        <div class=\"col s12\">\n          <div class=\"card-panel white\" style=\"height: 500px;\">\n            <div id=\"history\"></div>\n          </div>\n        </div>\n      </div>\n\n\n\n\n\n      <!-- Highlights -->\n      <div class=\"divider\"></div>\n      <div class=\"row\">\n        <div class=\"col s12\">\n          <h3 class=\"header\">Destaques</h3>\n          <h5 *ngIf=\"answers.length<=0\">Sem avaliações para exibir os destaques</h5>\n        </div>\n      </div>\n      <div class=\"row\">\n        <div class=\"col s12\">\n          <div class=\"row\">\n            <div class=\"input-field col s12 m6\">\n              <select #DProject>\n                <option value=\"\" selected>Todos</option>\n                <option *ngFor=\"let project of projects\" [value]=\"project._id\">\n                  {{ project.name }}\n                </option>\n              </select >\n              <label>Projeto</label>\n            </div>\n            <div class=\"input-field col s12 m6\">\n              <select #DTeam>\n                <option value=\"\" selected>Todas</option>\n                <option *ngFor=\"let team of teams\" [value]=\"team._id\">\n                  {{ team.name }}\n                </option>\n              </select>\n              <label>Equipe</label>\n            </div>\n          </div>\n          <div class=\"row\">\n            <div class=\"input-field col s12 m12\">\n              <select #DCompetence>\n                <option value=\"\" selected>Todas</option>\n                <option *ngFor=\"let competence of spotlightCompetences\" [value]=\"competence\">\n                  {{ competence }}\n                </option>\n              </select>\n              <label>Competências</label>\n            </div>\n          </div>\n        </div>\n      </div>\n      <div class=\"row\">\n        <div class=\"col s12\">\n          <div class=\"card-panel white\" style=\"height: 500px;\">\n            <div id=\"highlights\"></div>\n          </div>\n        </div>\n      </div>\n\n\n\n\n    </div>\n\n  </main>\n  \n  <!-- Footer -->\n  <app-footer></app-footer>\n  \n</div>\n  \n  "

/***/ }),

/***/ "./src/app/dashboard/dashboard.component.ts":
/*!**************************************************!*\
  !*** ./src/app/dashboard/dashboard.component.ts ***!
  \**************************************************/
/*! exports provided: DashboardComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DashboardComponent", function() { return DashboardComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var highcharts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! highcharts */ "./node_modules/highcharts/highcharts.js");
/* harmony import */ var highcharts__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(highcharts__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _services_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../services.service */ "./src/app/services.service.ts");
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-spinner */ "./node_modules/ngx-spinner/fesm5/ngx-spinner.js");
/* harmony import */ var angularx_social_login__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! angularx-social-login */ "./node_modules/angularx-social-login/angularx-social-login.es5.js");
/* harmony import */ var ngx_cookie_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ngx-cookie-service */ "./node_modules/ngx-cookie-service/ngx-cookie-service.es5.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");









// let Boost = require('highcharts/modules/boost');
// let noData = require('highcharts/modules/no-data-to-display');
var More = __webpack_require__(/*! highcharts/highcharts-more */ "./node_modules/highcharts/highcharts-more.js");
// Boost(Highcharts);
// noData(Highcharts);
More(highcharts__WEBPACK_IMPORTED_MODULE_2__);
var DashboardComponent = /** @class */ (function () {
    function DashboardComponent(service, spinner, authService, cookie, http, router) {
        this.service = service;
        this.spinner = spinner;
        this.authService = authService;
        this.cookie = cookie;
        this.http = http;
        this.router = router;
        this.organizationId = '';
        this.organizationName = '';
        this.userProfile = '';
        this.userEmail = '';
        this.userName = '';
        this.spotlightCompetences = [];
        this.historySelectedCompetences = [];
        this.teams = [];
        this.people = [];
        this.peopleList = [];
        this.answers = [];
        this.projects = [];
        this.applications = [];
        this.topThreeCompetences = [];
        this.resultsChart = {
            categories: [],
            series: []
        };
    }
    DashboardComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.spinner.show();
        this.organizationId = this.cookie.get('ORGANIZATIONID');
        this.organizationName = this.cookie.get('ORGANIZATIONNAME');
        this.userProfile = this.cookie.get('ORGANIZATIONMEMBERPROFILE');
        this.authService.authState.subscribe(function (user) {
            if (user) {
                _this.userEmail = user.email;
                _this.userName = user.name;
                _this.findProfile();
            }
            else {
                _this.router.navigate(['home']);
            }
        });
        M.AutoInit();
        $('.indicator').addClass('light-blue');
        $('select').formSelect();
    };
    DashboardComponent.prototype.initializeComponents = function () {
        setTimeout(this.initializeComponents, 200);
        $('select').formSelect();
    };
    DashboardComponent.prototype.updateTeams = function () {
        var _this = this;
        this.teams = [];
        var tempIds = [];
        this.applications.forEach(function (app) {
            if (!tempIds.includes(app.team._id)) {
                tempIds.push(app.team._id);
                _this.teams.push({ name: app.team.name, _id: app.team._id, projectId: app.team.projectId });
            }
        });
    };
    DashboardComponent.prototype.updateProjects = function (projects) {
        var _this = this;
        this.projects = [];
        var tempIds = [];
        this.teams.forEach(function (team) {
            if (!tempIds.includes(team.projectId)) {
                tempIds.push(team.projectId);
                projects.forEach(function (proj) {
                    if (proj._id === team.projectId) {
                        _this.projects.push({ name: proj.name, _id: proj._id });
                    }
                });
            }
        });
    };
    DashboardComponent.prototype.findName = function (email) {
        var name = email;
        this.applications.forEach(function (a) {
            a.team.members.forEach(function (m) {
                if (m.email === email) {
                    name = m.name || email;
                }
            });
        });
        if (name === this.userEmail) {
            name = this.userName;
        }
        return name;
    };
    DashboardComponent.prototype.updatePeople = function () {
        var _this = this;
        this.people = [];
        var tempEmail = [];
        this.answers.forEach(function (a) {
            if (!tempEmail.includes(a.userRated)) {
                tempEmail.push(a.userRated);
                _this.people.push({ name: _this.findName(a.userRated), email: a.userRated });
            }
        });
        this.peopleList = this.people;
    };
    DashboardComponent.prototype.findProfile = function () {
        var _this = this;
        this.service.findOrganizationProfile(this.organizationId).subscribe(function (data) {
            _this.spotlightCompetences = [];
            _this.answers = Object(data).answers;
            _this.applications = Object(data).applications;
            _this.updateTeams();
            var compTempArray = [];
            _this.answers.forEach(function (answer) {
                compTempArray.push(answer.questionCompetence);
                if (!_this.spotlightCompetences.includes(answer.questionCompetence)) {
                    _this.spotlightCompetences.push(answer.questionCompetence);
                }
            });
            // this.selectTopThreeCompetences(Object(data));
            _this.service.findProjectsFromUser().subscribe(function (proj) {
                // this.updateTeamsList(Object(data).applications, Object(proj).projects);
                _this.updateProjects(Object(proj).projects);
                _this.updatePeople();
                _this.initializeComponents();
                _this.resultChartComparative(_this.spotlightCompetences, _this.answers, '', '');
                _this.historyChartCompetence('', '', '', '');
                // this.updateHighlightsChart('', '', '');
                _this.spinner.hide();
            }, function (error) {
                _this.router.navigate(['home']);
            });
        }, function (error) {
            _this.router.navigate(['home']);
        });
    };
    DashboardComponent.prototype.historyChartCompetence = function (project, team, person, competence) {
        if (competence === '') {
            this.updateHistoryChart(project, team, person, competence);
        }
        else {
            var comp = this.spotlightCompetences.find(function (c) { return c.questionCompetence === competence; });
            if (comp) {
                this.updateHistoryChart(project, team, person, competence);
            }
            else {
                this.updateHistoryChart(project, team, person, competence);
            }
        }
    };
    DashboardComponent.prototype.filterHistoryTeam = function (project, team, person, competence) {
        var _this = this;
        this.peopleList = [];
        if (team === '') {
            this.peopleList = this.people;
        }
        else {
            var tempEmail_1 = [];
            this.answers.forEach(function (a) {
                if (a.teamId === team) {
                    if (!tempEmail_1.includes(a.userRated)) {
                        tempEmail_1.push(a.userRated);
                        _this.peopleList.push({ name: _this.findName(a.userRated), email: a.userRated });
                    }
                }
            });
        }
        this.initializeComponents();
        this.updateHistoryChart(project, team, person, competence);
    };
    DashboardComponent.prototype.updateHistoryChart = function (project, team, person, competence) {
        var testando = [];
        if (person !== '') {
            this.answers.forEach(function (a) {
                if (a.userRated === person) {
                    testando.push(a);
                }
            });
        }
        else {
            testando = this.answers;
        }
        var temporary = [];
        var dates = [];
        this.answers.forEach(function (a) {
            if (!dates.includes(a.endDate)) {
                dates.push(a.endDate);
            }
        });
        this.spotlightCompetences.forEach(function (c, i) {
            temporary[i] = { name: c, showInLegend: true, data: [] };
            dates.forEach(function (d) {
                var value = 0;
                var count = 0;
                var day = 0;
                var month = 0;
                var year = 0;
                testando.forEach(function (a) {
                    if (a.questionCompetence === c && a.answer !== '' && a.endDate === d) {
                        day = new Date(a.endDate).getUTCDate();
                        month = new Date(a.endDate).getUTCMonth();
                        year = new Date(a.endDate).getUTCFullYear();
                        value = value + ((a.answer * 100) / 100);
                        count++;
                    }
                });
                temporary[i].data.push([Date.UTC(year, month, day), (value / count)]);
            });
        });
        var competenceSeries = [];
        if (competence !== '') {
            temporary.forEach(function (t) {
                if (t.name === competence) {
                    competenceSeries.push(t);
                }
            });
        }
        else {
            competenceSeries = temporary;
        }
        competenceSeries.forEach(function (c) {
            var tempData2 = [];
            var temp = [];
            c.data.forEach(function (d) {
                var index = temp.findIndex(function (t) { return t.date === d[0]; });
                if (index === -1) {
                    temp.push({ date: d[0], values: [d[1]] });
                }
                else {
                    temp[index].values.push(d[1]);
                }
            });
            temp.forEach(function (t) {
                tempData2.push([t.date, t.values.reduce(function (a, b) { return a + b; }, 0) / t.values.length]);
            });
            c.data = tempData2;
        });
        console.log(competenceSeries);
        highcharts__WEBPACK_IMPORTED_MODULE_2__["chart"]('history', {
            chart: {
                type: 'area',
                height: '450px',
                backgroundColor: 'transparent'
            },
            title: {
                text: null
            },
            xAxis: {
                type: 'datetime',
                dateTimeLabelFormats: {
                    minute: '%H:%M',
                    month: '%e/%m',
                    year: '%Y'
                },
                title: {
                    text: 'Data'
                }
            },
            yAxis: {
                title: {
                    text: 'Porcentagem'
                }
            },
            tooltip: {
                headerFormat: '<b>{series.name}</b><br>',
                pointFormat: 'Atingiu {point.y:.0f}% em {point.x:%e/%m/%Y}'
            },
            plotOptions: {
                area: {
                    marker: {
                        enabled: false,
                        symbol: 'circle',
                        radius: 2,
                        states: {
                            hover: {
                                enabled: true
                            }
                        }
                    }
                }
            },
            series: competenceSeries
        });
        $('.highcharts-credits').hide();
    };
    /*updateHighlightsChart(project, team, competence) {
      const temporary = [];
      const k = this.answers;
  
      const pep = [];
      this.answers.forEach(a => {
        if (!pep.includes(a.userRated)) {
          pep.push(a.userRated);
        }
      });
  
      /*this.teams.forEach(function(c, i) {
        temporary[i] = { name: c.name, data: [] };
        pep.forEach(p => {
          let value = 0;
          let count = 0;
          k.forEach(a => {
            if (a.teamId === c._id && a.answer !== '' && a.userRated === p) {
              value = value + ((a.answer * 100) / 100);
              count++;
            }
          });
          temporary[i].data.push({ name: p, value: (value / count)});
        });
      });*/
    /*let competenceSeries = [];
    if (competence !== '') {
      temporary.forEach(t => {
        if (t.name === competence) {
          competenceSeries.push(t);
        }
      });
    } else {
      competenceSeries = temporary;
    }

    Highcharts.chart('highlights', {
      chart: {
          type: 'packedbubble',
          height: '460px'
      },
      title: {
          text: ''
      },
      tooltip: {
          useHTML: true,
          pointFormat: '<b>{point.name}:</b> {point.value}'
      },
      plotOptions: {
          packedbubble: {
              minSize: '20%',
              maxSize: '100%',
              zMin: 0,
              zMax: 1000,
              layoutAlgorithm: {
                  gravitationalConstant: 0.05,
                  splitSeries: 'true',
                  seriesInteraction: false,
                  dragBetweenSeries: true,
                  parentNodeLimit: true
              },
              dataLabels: {
                  enabled: true,
                  format: '{point.name}',
                  filter: {
                      property: 'y',
                      operator: '>',
                      value: 250
                  },
                  style: {
                      color: 'black',
                      textOutline: 'none',
                      fontWeight: 'normal'
                  }
              }
          }
      },
      series: [{
          name: 'Equipe 1',
          data: [{
              name: 'Tiago Santos',
              value: 7.4
          },
          {
              name: 'André',
              value: 400
          },
          {
              name: 'Nicoli',
              value: 8
          }]
      }, {
          name: 'Equipe 2',
          data: [{
              name: 'Tiago Santos',
              value: 7.6
          },
          {
              name: 'Leonardo',
              value: 280
          },
          {
              name: 'Ernest',
              value: 8.3
          }]
      }],
      // series: competenceSeries
    });
    $('.highcharts-credits').hide();
  }*/
    DashboardComponent.prototype.resultChartComparative = function (spotCompetences, answers, project, team) {
        var _this = this;
        var categories = [];
        var userResultsData = [];
        var otherResultsData = [];
        var temporary = [];
        this.resultsChart = {
            categories: [],
            series: []
        };
        // Filtra todas as equipes
        var tempTeams = [];
        if (team === '') {
            this.answers.forEach(function (answer) {
                if (!tempTeams.includes(answer.teamId)) {
                    tempTeams.push(answer.teamId);
                }
            });
        }
        else {
            tempTeams.push(team);
        }
        // Para cada time monta a soma da competencia
        // tslint:disable-next-line: only-arrow-functions
        tempTeams.forEach(function (t, i) {
            temporary[i] = { teamId: t, competences: [] };
            spotCompetences.forEach(function (c) {
                var temp3 = 0;
                var count3 = 0;
                answers.forEach(function (a) {
                    if (a.teamId === t && a.questionCompetence === c && a.answer !== '') {
                        temp3 = temp3 + ((a.answer * 100) / 100);
                        count3++;
                    }
                });
                temporary[i].competences.push({ competence: c, mean: (temp3 / count3) });
            });
        });
        this.resultsChart.categories = spotCompetences;
        temporary.forEach(function (temp) {
            var competenceValues = [];
            temp.competences.forEach(function (c) {
                competenceValues.push(c.mean);
            });
            _this.resultsChart.series.push({
                name: _this.findTeamName(temp.teamId),
                data: competenceValues,
                pointPlacement: 'on'
            });
        });
        this.updateResultsChart();
    };
    DashboardComponent.prototype.comparativeResultsByTeam = function (teamId) {
        this.resultChartComparative(this.spotlightCompetences, this.answers, '', teamId);
    };
    DashboardComponent.prototype.findTeamName = function (teamId) {
        var teamName = teamId;
        this.applications.forEach(function (app) {
            if (app.team._id === teamId) {
                teamName = app.team.name;
            }
        });
        return teamName;
    };
    DashboardComponent.prototype.updateResultsChart = function () {
        highcharts__WEBPACK_IMPORTED_MODULE_2__["chart"]('results', {
            chart: {
                polar: true,
                type: 'area',
                height: '450px',
            },
            title: {
                text: null,
                x: -80
            },
            pane: {
                size: '80%'
            },
            xAxis: {
                categories: this.resultsChart.categories,
                tickmarkPlacement: 'on',
                lineWidth: 0
            },
            yAxis: {
                gridLineInterpolation: 'polygon',
                lineWidth: 0,
                min: 0
            },
            tooltip: {
                shared: true,
                pointFormat: '<span style="color:{series.color}">{series.name}: {point.y:,.0f}%<br/>'
            },
            legend: {
                align: 'right',
                verticalAlign: 'middle',
                layout: 'vertical'
            },
            series: this.resultsChart.series,
            responsive: {
                rules: [{
                        condition: {
                            maxWidth: 500
                        },
                        chartOptions: {
                            legend: {
                                align: 'center',
                                verticalAlign: 'bottom',
                                layout: 'horizontal'
                            },
                            pane: {
                                size: '70%'
                            }
                        }
                    }]
            }
        });
        $('.highcharts-credits').hide();
    };
    DashboardComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-dashboard',
            template: __webpack_require__(/*! ./dashboard.component.html */ "./src/app/dashboard/dashboard.component.html"),
            styles: [__webpack_require__(/*! ./dashboard.component.css */ "./src/app/dashboard/dashboard.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_services_service__WEBPACK_IMPORTED_MODULE_4__["ServicesService"],
            ngx_spinner__WEBPACK_IMPORTED_MODULE_5__["NgxSpinnerService"],
            angularx_social_login__WEBPACK_IMPORTED_MODULE_6__["AuthService"],
            ngx_cookie_service__WEBPACK_IMPORTED_MODULE_7__["CookieService"],
            _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClient"],
            _angular_router__WEBPACK_IMPORTED_MODULE_8__["Router"]])
    ], DashboardComponent);
    return DashboardComponent;
}());



/***/ }),

/***/ "./src/app/help/help.component.css":
/*!*****************************************!*\
  !*** ./src/app/help/help.component.css ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2hlbHAvaGVscC5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/help/help.component.html":
/*!******************************************!*\
  !*** ./src/app/help/help.component.html ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"body\">\n \n  <!--Header-->\n  <app-header></app-header>\n  \n  <!-- Main content -->\n  <main>\n    <div class=\"container\">\n      <div class=\"row\">\n        <div class=\"col s12\">\n          <h2 class=\"header\">Ajuda</h2>\n          Esta seção está destinada a compreender as funcionalidades do sistema web PSAS\n          <br>\n          <br>\n          <h4>Organização</h4>\n          <ol>\n            <li>A organização se refere a empresa ao qual o usuário trabalha</li>\n            <li>\n              Organização demonstração\n              <ol type=\"A\">\n                <li>\n                  Exemplos com predefinições de competências, pessoas, projetos, avaliações já aplicadas e com respostas\n                </li>\n              </ol>\n            </li>\n            <li>Nova organização\n              <ol type=\"A\">\n                <li>\n                  Ao criar uma nova organização não vai existir nenhum dado inserido\n                </li>\n              </ol>\n            </li>\n          </ol>\n  \n  \n          <!-- MEU PERFIL -->\n          <h4>Meu perfil</h4>\n          <table>\n            <ol>\n              <li>\n                Em meu perfil existem informações sobre o perfil do usuário, como:\n                <ol type=\"A\">\n                  <li>Suas melhores competências</li>\n                  <li>Competências ao qual o você deve aperfeiçoar</li>\n                  <li>Gráfico do tipo Spider que ilustra uma comparação\n                    entre o avaliado e a referência</li>\n                  <li>Histórico das avaliações sobre competências do avaliado,\n                    possibilitando ao avaliado saber a porcentagem da sua evolução.\n                    A visualização de suas competências podem ser ilustradas todas de uma vez ou uma por vez.\n                  </li>\n                </ol>\n              </li>\n  \n            </ol>\n          </table>\n  \n          <!-- PERFIL DA ORGANIZACAO -->\n          <h4>Perfil da organização</h4>\n          <thead>\n            <tr>\n              <ol>\n                <li>\n                  Em perfil da organização existem informações sobre o perfil da organização, ilustrando os resultados mediante a competências da equipe em determinado projeto, como:\n                  <ol type=\"A\">\n                  <li>Em Comparação dos resultados de avaliação é possível escolher entre todos os projetos e todas as equipes da organização, para se obter uma visualização geral de como estão andando as competências da organização. Assim como em meu perfil também é possível visualizar informações sobre projetos e equipes específicas, correlacionando o projeto trabalho a N equipes.</li>\n                  <li>A organização também possui um histórico, neste histórico as relações podem ser visualizadas em relação a todos projetos, equipes, pessoas e competências. Também pode ser selecionado projetos, equipes, pessoas e competências em específico. Depende de como o usuário gostaria de visualizar a informação, para compreender a eficiência de um determinada competência em sua organização.</li>\n  \n                  <li>Os destaques trazem um gráfico para visualizar as competências que estão melhor desempenhando na organização. Assim o gerente de projetos pode definir quais das competências tem de ser reajustadas.</li>\n                  </ol>\n                </li>\n              </ol>\n            </tr>\n          </thead>\n  \n          <!-- COMPETENCIAS -->\n          <h4>Competências</h4>\n          <table>\n      <pre>\n    O conceito de competências podem ser descritos em três tipos, conhecimento, habilidades e atitudes.\n    O conhecimento é a definido como a capacidade de usar seus conhecimentos, atitudes pessoais, sociais\n    ou metodológicas, em situações de trabalho ou estudo e no desenvolvimento profissional e pessoal.\n    Estão ligadas ao comportamento das pessoas e são adquiridas com o tempo.\n    A habilidade de aplicar o conhecimento e usar o conhecimento para completar tarefas e resolver pro-\n    blemas. São competências que podem ser aprendidas, como o domínio em uma determinada linguagem de\n    programação.\n    A atitude está voltada ao comportamento, a ação da pessoa sobre um determinado aspecto ou atributo.\n    Demonstrando o querer fazer, alguma tarefa ou ação. \n      </pre>\n          <ol>\n            <li>Em competências é possível o gerente, definir quais das competências serão importantes para a organização.</li>\n            <li>Ao clicar no botão nova competência é possível definir o nome, o tipo e a descrição da competência. Tendo em vista que o tipo são definidos pelos 3 pontos discutidos no texto anterior, conhecimentos, habilidades e atitudes</li>\n            <li>Ao adicionar todas as competências, é possível verificar a distribuição das competências criadas e a quantidade de cada uma delas nos painéis <strong>Distribuição e Visão geral </strong>. Estas competências  estarão presentes nas avaliações realizadas na organização.</li>\n          </ol>\n  \n  \n  \n          </table>\n          <!-- PESSOAS -->\n          <h4>Pessoas</h4>\n          <table>\n            <ol>\n              <li>A interface de Pessoas está relacionada às pessoas, que estão presentes na organização</li>\n              <li>Ao entrar na interface de Pessoas, é possível observar uma lista de pessoas na organização, as informações presentes são: Nome, E-mail, Perfil e as opções de edição e exclusão de pessoas.</li>\n              <li>Ao adicionar uma nova pessoa na organização é necessário escolher, o nome e o e-mail e o perfil da pessoa.</li>\n              <li>O perfil da pessoa na organização são divididos em: </li>\n              <ol type=\"A\">\n                  <li>Gerente da organização, que é responsável por gerir a organização, como quem serão os gerentes de projetos e equipes e também membros da organização </li>\n                  <li>Gerente de projetos, adiciona as novos projetos para que seja possível avaliar os membros das equipes</li>\n                  <li>Gerente de equipes, responsável por criar novas equipes e vincular com o projeto que deve ser atribuído aos membros da equipe.</li>\n                  <li>Membro da organização, faz parte da equipe mas não pode gerir as funções de projeto, equipe e pessoas. Podendo responder apenas as avaliações atribuídas a ele.</li>\n              </ol>\n            </ol>\n  \n  \n          </table>\n          <!-- PROJETOS -->\n          <h4>Projetos</h4>\n          <table>\n  \n            <ol>\n              <li>A interface de Projetos, está relacionada com as equipes. Cada projeto pode ter uma ou mais equipes. </li>\n              <ol type=\"A\">\n                  <li>Ao adicionar um novo projeto, é necessário preencher o campo Nome do projeto.</li>\n                  <li>O gerente de projetos, é responsável pela gestão dos projetos.</li>\n              </ol>\n            </ol>\n  \n  \n          </table>\n          <!-- EQUIPES -->\n          <h4>Equipes</h4>\n          <table>\n            <li>A interface de Equipes, são as pessoas que estão cadastradas na organização e agrupadas especificamente para serem vinculadas com um projeto, e serem avaliadas.</li>\n            <ol>\n              <li>Ao adicionar uma nova equipe, é necessário preencher o campo Nome da equipe e vincular ela com o Projeto que a equipe fará parte.</li>\n              <ol type=\"A\">\n                <li>Após adicionar uma nova equipe é necessário adicionar as pessoas nas equipe, para isso basta clicar no ícone de boneco em opções.</li>\n                <li>Após clicar nas opções da equipe, é possível adicionar as pessoas presentes na organização dentro de sua equipe. Para registrar as pessoas nas equipes basta clicar em salvar.</li>\n              </ol>\n            </ol>\n  \n          </table>\n          <!-- AVALIACOES -->\n          <h4>Avaliações</h4>\n          <table>\n            <li>Nesta tela são listadas todas as avaliações, caso tenha alguma criada.</li>\n            <li>A interface de Avaliações, é usada para criar as perguntas para as questões da avaliação. Esta avaliação faz o uso da ferramenta Rubrica.</li>\n            <li>Após adicionada às questões e as alternativas nas questões, basta clicar no botão salvar.</li>\n            <li>Também é possível copiar avaliação e torná-la pública.</li>\n            <li>Devido a um bug do sistema as avaliações públicas não são possíveis de serem criadas.</li>\n            <ol>\n              <li>Ao criar uma nova avaliação, o usuário é redirecionado para uma interface ao qual é possível: </li>\n              <li>Adicionar questões na avaliação e preencher os campos Questão que é o nome da questão, Peso que é o valor a ser atribuído na questão e a competência que a questão está relacionada.</li>\n              <li>Atribuir a competência relacionada à questão.</li>\n              <ol type=\"A\">\n                <li>Dentro da questão o usuário deve colocar alternativas, cada alternativa tem um valor, a soma de todos os valores das alternativas deve ser igual ao da questão.</li>\n                <li>Além do valor da alternativa tem a sua descrição.</li>\n              </ol>\n            </ol>\n  \n  \n  \n  \n          </table>\n          <!-- APLICAR AVALIACAO -->\n          <h4>Aplicar avaliação</h4>\n          <table>\n            <li>Na interface Aplicar avaliação estão listadas todas as avaliações aplicadas.</li>\n            <li>Na última coluna listada em Aplicar Avaliação, se localiza o campo opção, podendo excluir a aplicação da avaliação. E também no ícone de gráfico, ver quais foram os avaliadores que responderam as avaliações e quais faltam responder</li>\n            <li>Ao criar a aplicação da avaliação existem os seguintes campos: Nome, Equipe, Avaliação, Tipo da avaliação, Método e Estratégia da avaliação</li>\n              <ol>\n                <li>O campo nome é o ID de aplicar avaliação.</li>\n                <li>A equipe que  será avaliada.</li>\n                <li>A avaliação criada, para os usuários responderem suas perguntas.</li>\n                <li>O tipo de avaliação podendo ser: Diagnóstica, Formativa ou Somativa.</li>\n                <li>A estratégia de avaliação, se ela vai ser uma: Auto avaliação, Co-avaliação e Avaliação 360</li>\n                <li>Após ter escolhido todos os campos, o usuário terá que salvar para não perder as escolhas</li>\n              </ol>\n          </table>\n          <!-- RESPONDER AVALIACAO -->\n          <h4>Responder avaliação</h4>\n          <table>\n            <li>Na interface responder avaliação, estão listadas as avaliações criadas para os usuários respondê-las.</li>\n            <li>Ao clicar no ícone opções, uma janela é aberta responder às questões da avaliação.</li>\n            <ol>\n              <li>Para responder às questões, basta selecionar a questão e responder as alternativas criadas clicando nelas.</li>\n              <li>Caso o usuário julgar necessário, ele pode realizar um comentário sobre a avaliação.</li>\n              <li>Ao responder a avaliação, não é possível edita-la.</li>\n            </ol>\n          </table>\n        </div>\n      </div>\n    </div>\n  </main>\n  \n  <!-- Footer -->\n  <app-footer></app-footer>\n  \n </div>\n <!-- <markdown [data]=\"markdown\" lineNumbers></markdown> -->\n \n \n"

/***/ }),

/***/ "./src/app/help/help.component.ts":
/*!****************************************!*\
  !*** ./src/app/help/help.component.ts ***!
  \****************************************/
/*! exports provided: HelpComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HelpComponent", function() { return HelpComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var HelpComponent = /** @class */ (function () {
    function HelpComponent() {
    }
    HelpComponent.prototype.ngOnInit = function () {
    };
    HelpComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-help',
            template: __webpack_require__(/*! ./help.component.html */ "./src/app/help/help.component.html"),
            styles: [__webpack_require__(/*! ./help.component.css */ "./src/app/help/help.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], HelpComponent);
    return HelpComponent;
}());



/***/ }),

/***/ "./src/app/home/home.component.css":
/*!*****************************************!*\
  !*** ./src/app/home/home.component.css ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".footer-copyright {\n    padding-bottom: 10px;\n    padding-top: 10px;\n}\n\n.a-footer-copyright {\n    padding-left: 10px;\n    padding-right: 10px;\n}\n\n.promo i {\n    color: rgb(3, 169, 244);\n    direction: ltr;\n    display: block;\n    font-family: \"Material Icons\";\n    font-size: 105px;\n    margin-top: 40px;\n}\n\n.promo-caption {\n    font-size: 25.5px;\n    font-weight: 500;\n    height: 41px;\n    line-height: 40px;\n    margin-bottom: 0px;\n    margin-top: 5px;\n}\n\n.promo-description {\n    font-size: 18px;\n    font-weight: 300;\n    /*height: 150px;*/\n    line-height: 25px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvaG9tZS9ob21lLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7SUFDSSxvQkFBb0I7SUFDcEIsaUJBQWlCO0FBQ3JCOztBQUVBO0lBQ0ksa0JBQWtCO0lBQ2xCLG1CQUFtQjtBQUN2Qjs7QUFFQTtJQUNJLHVCQUF1QjtJQUN2QixjQUFjO0lBQ2QsY0FBYztJQUNkLDZCQUE2QjtJQUM3QixnQkFBZ0I7SUFDaEIsZ0JBQWdCO0FBQ3BCOztBQUVBO0lBQ0ksaUJBQWlCO0lBQ2pCLGdCQUFnQjtJQUNoQixZQUFZO0lBQ1osaUJBQWlCO0lBQ2pCLGtCQUFrQjtJQUNsQixlQUFlO0FBQ25COztBQUVBO0lBQ0ksZUFBZTtJQUNmLGdCQUFnQjtJQUNoQixpQkFBaUI7SUFDakIsaUJBQWlCO0FBQ3JCIiwiZmlsZSI6InNyYy9hcHAvaG9tZS9ob21lLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuZm9vdGVyLWNvcHlyaWdodCB7XG4gICAgcGFkZGluZy1ib3R0b206IDEwcHg7XG4gICAgcGFkZGluZy10b3A6IDEwcHg7XG59XG5cbi5hLWZvb3Rlci1jb3B5cmlnaHQge1xuICAgIHBhZGRpbmctbGVmdDogMTBweDtcbiAgICBwYWRkaW5nLXJpZ2h0OiAxMHB4O1xufVxuXG4ucHJvbW8gaSB7XG4gICAgY29sb3I6IHJnYigzLCAxNjksIDI0NCk7XG4gICAgZGlyZWN0aW9uOiBsdHI7XG4gICAgZGlzcGxheTogYmxvY2s7XG4gICAgZm9udC1mYW1pbHk6IFwiTWF0ZXJpYWwgSWNvbnNcIjtcbiAgICBmb250LXNpemU6IDEwNXB4O1xuICAgIG1hcmdpbi10b3A6IDQwcHg7XG59XG5cbi5wcm9tby1jYXB0aW9uIHtcbiAgICBmb250LXNpemU6IDI1LjVweDtcbiAgICBmb250LXdlaWdodDogNTAwO1xuICAgIGhlaWdodDogNDFweDtcbiAgICBsaW5lLWhlaWdodDogNDBweDtcbiAgICBtYXJnaW4tYm90dG9tOiAwcHg7XG4gICAgbWFyZ2luLXRvcDogNXB4O1xufVxuXG4ucHJvbW8tZGVzY3JpcHRpb24ge1xuICAgIGZvbnQtc2l6ZTogMThweDtcbiAgICBmb250LXdlaWdodDogMzAwO1xuICAgIC8qaGVpZ2h0OiAxNTBweDsqL1xuICAgIGxpbmUtaGVpZ2h0OiAyNXB4O1xufSJdfQ== */"

/***/ }),

/***/ "./src/app/home/home.component.html":
/*!******************************************!*\
  !*** ./src/app/home/home.component.html ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"body\">\n\n  <!--Header-->\n  <app-header></app-header>\n\n  <!-- Spinner -->\n  <ngx-spinner bdColor=\"rgba(0,0,0,0.8)\" size=\"large\" color=\"#00a7f8\" type=\"ball-spin-clockwise\"></ngx-spinner>\n\n  <!-- Main content -->\n  <div class=\"\">\n    \n    <!-- Title -->\n    <div class=\"row center\">\n      <div class=\"col s12 m12\">\n        <h1 class=\"header\">PSAS</h1>\n      </div>\n      <div class=\"col s12 m8 offset-m2\">\n        <h4 class=\"light\">Um framework para avaliação em pares das competências de equipes de projetos de software.</h4>\n      </div>\n    </div>\n    <div class=\"row center\">\n        <a *ngIf=\"loggedIn\" routerLink=\"/organization\" class=\"btn-large waves-effect light-blue\">Entrar</a>\n        <a *ngIf=\"loggedIn==false\" routerLink=\"/user\" class=\"btn-large waves-effect light-blue\">Entrar</a>\n    </div>\n    <div class=\"divider\"></div>\n\n    <!-- 3 steps -->\n    <div class=\"section\">\n      <div class=\"row\">\n        <div class=\"col s12 m10 offset-m1\">\n          <div class=\"row\">\n            <div class=\"col s12 m4\">\n              <div class=\"center promo\">\n                <i class=\"material-icons\">add_box</i>\n                <!-- <i class=\"material-icons\">note_add</i> -->\n                <p class=\"promo-caption\">Crie</p>\n                <p class=\"light center promo-description\">Crie avaliações de desempenho personalizadas, baseadas nas competências mais relevantes para a sua empresa e equipe, usando diferentes tipos, estratégias e métodos.</p>\n              </div>\n            </div>\n            <div class=\"col s12 m4\">\n              <div class=\"center promo\">\n                <i class=\"material-icons\">star_half</i>\n                <!-- <i class=\"material-icons\">star_border</i> -->\n                <p class=\"promo-caption\">Avalie</p>\n                <p class=\"light center promo-description\">Aplique avaliações de desempenho para mensurar atributos e competências da sua equipe. Descubra talentos e identifique pontos de melhora nos seus comapnheiros de equipe.</p>\n              </div>\n            </div>\n            <div class=\"col s12 m4\">\n              <div class=\"center promo\">\n                <i class=\"material-icons\">insert_chart</i>\n                <p class=\"promo-caption\">Veja</p>\n                <p class=\"light center promo-description\">Analise os resultados das avaliações e acompanhe a evolução da sua equipe através de gráficos e elementos visuais que auxiliam na compreensão geral dos insumos da sua pesquisa.</p>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n    <div class=\"divider\"></div>\n\n    <!-- Porque avaliar competencias -->\n    <div class=\"section\">\n      <div class=\"row center\">\n        <h3 class=\"light header\">Porquê avaliar competências?</h3>\n        <p class=\"col s12 m8 offset-m2 caption promo-description\">\n          As competências de uma equipe são um fator significativo para o desempenho geral e\n          trabalhar em equipe também é uma parte essencial\n          do desenvolvimento de projetos [de\n          software]. A avaliação de competências, nesse contexto, tem o objetivo de permitir a\n          identificação das competências de cada pessoa e da equipe de projetos, facilitar a formação\n          de novas equipes com base nos resultados de\n          um projeto e ser utilizado para o\n          aperfeiçoamento das pessoas.</p>\n      </div>\n      <!--<div class=\"row center\">\n          <a class=\"waves-effect waves-light light-blue btn-large modal-trigger\" href=\"#pqAvaliarCompetencias\" (click)=\"pqAvaliarCompetencias()\">Mais informações</a>\n          <!- <a href=\"http://materializecss.com/showcase.html\" class=\"btn-large waves-effect light-blue\">Mais informações</a> ->\n      </div>-->\n    </div>\n    <div class=\"divider\"></div>\n\n    <!-- Modal - Porque avaliar competencias? -->\n    <div id=\"pqAvaliarCompetencias\" class=\"modal modal-fixed-footer pqAvaliarCompetencias\">\n        <div class=\"modal-content\">\n          <h4>Porquê avaliar competências?</h4>\n          <p>A bunch of text</p>\n        </div>\n        <div class=\"modal-footer\">\n          <a href=\"#pqAvaliarCompetencias\" class=\"modal-close waves-effect waves-light light-blue btn\">Agree</a>        \n        </div>\n      </div>\n\n    <!-- Porque avaliar em pares -->\n    <div class=\"section\">\n      <div class=\"row center\">\n        <h3 class=\"light header\">Porquê avaliar em pares?</h3>\n        <p class=\"col s12 m8 offset-m2 caption promo-description\">\n          A avaliação em pares deve ser usada para melhorar as capacidades avaliativas,\n          motivando a reflexão sobre o próprio desempenho e aumentando a consciência de qualidade sobre o próprio trabalho.\n        </p>\n      </div>\n      <!--<div class=\"row center\">\n          <a class=\"waves-effect waves-light light-blue btn-large modal-trigger\" href=\"#pqAvaliarPares\" (click)=\"pqAvaliarPares()\">Mais informações</a>\n      </div>-->\n    </div>\n    <div class=\"divider\"></div>\n\n      <!-- Modal - Porque avaliar em pares? -->\n      <!--<div id=\"pqAvaliarPares\" class=\"modal modal-fixed-footer\">\n          <div class=\"modal-content\">\n            <h4>Porquê avaliar em pares?</h4>\n            <p>A bunch of text</p>\n          </div>\n          <div class=\"modal-footer\">\n            <a href=\"#!\" class=\"modal-close waves-effect waves-light light-blue btn\">Agree</a>        \n          </div>\n        </div>-->\n\n  </div>\n\n  <!-- Footer -->\n  <div class=\"row\" style=\"margin-bottom: 0;\">\n      <div class=\"col s12 m10 offset-m1\">\n        <div class=\"row\">\n          <div class=\"col l4 s12\">\n            <h5>Contribuições científicas</h5>\n            <p class=\"grey-text text-darken-2\">\n              Um mapeamento sistemático da literatura sobre a avaliação em pares das competências de um indivíduo em uma equipe de projetos de software.\n              <a href=\"http://www.seer.unirio.br/index.php/isys/article/view/7007/7974\" target=\"_blank\">Link externo</a>\n            </p>\n            <p class=\"grey-text text-darken-2\">\n              PSAS: A Framework for Peer Assessment of an Individuals Skills in a Software Projects Team.\n              <a href=\"https://doi.org/10.1145/3422392.3422506\" target=\"_blank\">Link externo</a>\n            </p>\n            \n          </div>\n          <div class=\"col l4 s12\">\n            <h5>Entre na discussão</h5>\n            <p class=\"grey-text text-darken-2\">O PSAS é de código aberto, acesse o Github e contribua!</p>\n            <iframe src=\"https://ghbtns.com/github-btn.html?user=tiagodarosa&amp;repo=psas&amp;type=watch&amp;count=true&amp;size=large\" allowtransparency=\"true\" frameborder=\"0\" scrolling=\"0\" width=\"170\" height=\"30\"></iframe>\n          </div>\n          <div class=\"col l4 s12\" style=\"overflow: hidden;\">\n            <h5>Desenvolvido</h5>\n            <div class=\"patreon-footer-ad\">\n                <a href=\"http://www2.joinville.udesc.br/%7Egpie/site/\" alt=\"Compare Energy\" target=\"_blank\" rel=\"noopener\">\n                  <img width=\"180px\" height=\"84px\" style=\"margin-top: 5px;\" src=\"../../assets/gpie.png\" alt=\"GPIE\">\n                </a>\n              </div>\n              <div class=\"patreon-footer-ad\">\n                  <a href=\"http://www.joinville.udesc.br/portal/departamentos/dcc/\" target=\"_blank\" rel=\"noopener\">\n                  <img width=\"172px\" height=\"63px\" style=\"margin-top: 20px;\" src=\"../../assets/dcc.png\" alt=\"DCC\">\n                  </a>\n                </div>\n                <div class=\"patreon-footer-ad\">\n                    <a href=\"http://www.joinville.udesc.br/\" target=\"_blank\" rel=\"noopener\">\n                    <img width=\"189px\" height=\"65px\" style=\"margin-top: 20px;\" src=\"../../assets/marcaudesc.png\" alt=\"UDESC\">\n                    </a>\n                  </div>\n          </div>\n        </div>\n        \n\n        <div class=\"footer-copyright\">\n          © 2021 PSAS.\n          <a class=\"a-footer-copyright\" routerLink=\"/privacy\">Política de privacidade</a>\n        </div>\n\n      </div>\n    </div>\n\n</div>\n\n"

/***/ }),

/***/ "./src/app/home/home.component.ts":
/*!****************************************!*\
  !*** ./src/app/home/home.component.ts ***!
  \****************************************/
/*! exports provided: HomeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomeComponent", function() { return HomeComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services.service */ "./src/app/services.service.ts");
/* harmony import */ var angularx_social_login__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! angularx-social-login */ "./node_modules/angularx-social-login/angularx-social-login.es5.js");
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-spinner */ "./node_modules/ngx-spinner/fesm5/ngx-spinner.js");





var HomeComponent = /** @class */ (function () {
    function HomeComponent(authService, service, spinner) {
        this.authService = authService;
        this.service = service;
        this.spinner = spinner;
        this.teste = {};
    }
    HomeComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.spinner.show();
        this.authService.authState.subscribe(function (user) {
            _this.user = user;
            _this.loggedIn = (user != null);
        });
        this.spinner.hide();
    };
    HomeComponent.prototype.pqAvaliarCompetencias = function () {
        console.log('oi');
    };
    HomeComponent.prototype.pqAvaliarPares = function () {
        console.log('oi');
    };
    HomeComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-home',
            template: __webpack_require__(/*! ./home.component.html */ "./src/app/home/home.component.html"),
            styles: [__webpack_require__(/*! ./home.component.css */ "./src/app/home/home.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [angularx_social_login__WEBPACK_IMPORTED_MODULE_3__["AuthService"], _services_service__WEBPACK_IMPORTED_MODULE_2__["ServicesService"], ngx_spinner__WEBPACK_IMPORTED_MODULE_4__["NgxSpinnerService"]])
    ], HomeComponent);
    return HomeComponent;
}());



/***/ }),

/***/ "./src/app/member/member.component.css":
/*!*********************************************!*\
  !*** ./src/app/member/member.component.css ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL21lbWJlci9tZW1iZXIuY29tcG9uZW50LmNzcyJ9 */"

/***/ }),

/***/ "./src/app/member/member.component.html":
/*!**********************************************!*\
  !*** ./src/app/member/member.component.html ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"body\">\n\n    <!--Header-->\n    <app-header></app-header>\n\n    <!-- Spinner -->\n    <ngx-spinner bdColor=\"rgba(0,0,0,0.8)\" size=\"large\" color=\"#00a7f8\" type=\"ball-spin-clockwise\"></ngx-spinner>\n  \n    <!-- Main content -->\n    <main>\n      <div class=\"container\">\n        \n        <!-- Title -->\n        <div class=\"row\">\n          <div class=\"col s12\">\n            <h3 class=\"header\">Pessoas</h3>\n          </div>\n        </div>\n\n        <div class=\"row\" *ngIf=\"members.length<=0\">\n          <div class=\"col s12 center\">\n            <h5 class=\"header\">Esta organização não possui pessoas cadastradas!</h5>\n            <p class=\"caption\" *ngIf=\"userProfile!='organizationManager' && userProfile!='projectManager'\">\n              Solicite para um gestor da organização ou gestor de projetos para adicionar, alterar ou excluir pessoas na organização.\n            </p>\n            <p class=\"caption\" *ngIf=\"userProfile==='organizationManager' || userProfile==='projectManager'\">\n              Adicione uma pessoa clicando no botão \"Nova pessoa\"!\n            </p>\n          </div>\n        </div>\n\n\n        <!-- Members -->\n        <div class=\"row\">\n          <div class=\"col s12\">\n            <table class=\"highlight\" *ngIf=\"members.length>0\">\n              <thead>\n                <tr>\n                  <th>Nome</th>\n                  <th>E-mail</th>\n                  <th>Perfil</th>\n                  <th *ngIf=\"userProfile==='organizationManager' || userProfile==='projectManager'\">Opções</th>\n                </tr>\n              </thead>\n              <tbody>\n                <tr *ngFor=\"let member of members\">\n                  <td>{{ member.name }}</td>\n                  <td>{{ member.email }}</td>\n                  <td>{{ filterUserProfile(member.profile) }}</td>\n                  <td *ngIf=\"userProfile==='organizationManager' || userProfile==='projectManager'\">\n                    <a class=\"modal-trigger\" href=\"#editMember\" title=\"Editar informações de {{ member.name }}\" (click)=\"editMemberModal(member.email)\"><i class=\"material-icons left\">edit</i></a>\n                    <a style=\"cursor: pointer;\" title=\"Excluir {{ member.name }}\" (click)=\"deleteMemberModal(member.email)\"><i class=\"material-icons left\">delete</i></a>\n                  </td>\n                </tr>\n              </tbody>\n            </table>\n          </div>\n        </div>\n\n        <!-- Buttons -->\n        <div class=\"row\" *ngIf=\"userProfile==='organizationManager' || userProfile==='projectManager'\">\n          <div class=\"col s12 center\">\n            <a class=\"waves-effect waves-light light-blue btn-large modal-trigger\" href=\"#newMember\" (click)=\"addMemberModal()\"><i class=\"material-icons left\">add</i>Adicionar pessoa</a>\n          </div>\n        </div>\n\n        <!-- User without access -->\n        <div class=\"row\" *ngIf=\"userProfile!='organizationManager' && userProfile!='projectManager'\">\n          <div class=\"col s12 center\">\n            <p class=\"caption\">Você não possui acesso para adicionar, alterar ou excluir pessoas na organização {{ organization.name }}.</p>\n          </div>\n        </div>\n\n        <!-- Modal for new member -->\n        <div id=\"newMember\" class=\"modal modal-fixed-footer newMember\">\n          <div class=\"modal-content\">\n            <h4>Adicionar pessoa</h4>\n            <p>\n              Informe os dados para adicionar uma nova pessoa na organização.\n            </p>\n            <div class=\"row\">\n              <form class=\"col s12\">\n                <div class=\"row\">\n                  <div class=\"input-field col s12 m6\">\n                    <i class=\"material-icons prefix\">person</i>\n                    <label for=\"name\">Nome</label>\n                    <input #name id=\"name\"  type=\"text\" class=\"validate\">\n                  </div>\n                </div>\n                <div class=\"row\">\n                  <div class=\"input-field col s12 m6\">\n                    <i class=\"material-icons prefix\">email</i>\n                    <label for=\"email\">E-mail</label>\n                    <input #email id=\"email\" type=\"text\" class=\"validate\">\n                  </div>\n                </div>\n                <div class=\"row\">\n                  <div class=\"input-field col s12 m6\">\n                    <i class=\"material-icons prefix\">security</i>\n                    <label for=\"profile\" class=\"active\">Perfil</label>\n                    <select #profile id=\"profile\" class=\"validate\">\n                        <option *ngFor='let profile of userProfiles' [value]=\"profile.value\">\n                          {{ profile.description }}\n                        </option>\n                    </select>\n                  </div>\n                </div>\n              </form>\n            </div>\n          </div>\n          <div class=\"modal-footer\">\n            <a class=\"modal-close waves-effect waves-green btn-flat\">Cancelar</a>\n            <a class=\"modal-close waves-effect waves-light light-blue btn\" (click)=\"addMember(name.value, email.value, profile.value)\">Salvar</a>\n          </div>\n        </div>\n\n        <!-- Modal to edit member -->\n        <div id=\"editMember\" class=\"modal modal-fixed-footer editMember\">\n          <div class=\"modal-content\">\n            <h4>Editar pessoa</h4>\n            <p>\n              Atualize os dados da pessoa.\n            </p>\n            <div class=\"row\">\n              <form class=\"col s12\">\n                <div class=\"row\">\n                  <div class=\"input-field col s12 m6\">\n                    <i class=\"material-icons prefix\">person</i>\n                    <label for=\"editName\" class=\"active\">Nome</label>\n                    <input #editName id=\"editName\" type=\"text\" class=\"validate\">\n                  </div>\n                </div>\n                <div class=\"row\">\n                  <div class=\"input-field col s12 m6\">\n                    <i class=\"material-icons prefix\" >email</i>\n                    <label for=\"editEmail\" class=\"active\">E-mail</label>\n                    <input #editEmail id=\"editEmail\" type=\"text\" class=\"validate\" value=\"{{ email }}\">\n                  </div>\n                </div>\n                <div class=\"row\">\n                  <div class=\"input-field col s12 m6\">\n                    <i class=\"material-icons prefix\">security</i>\n                    <label for=\"editProfile\" class=\"active\">Perfil</label>\n                    <select #editProfile id=\"editProfile\" class=\"validate\">\n                        <option *ngFor='let profile of userProfiles' [value]=\"profile.value\">\n                          {{ profile.description }}\n                        </option>\n                    </select>\n                  </div>\n                </div>\n              </form>\n            </div>\n          </div>\n          <div class=\"modal-footer\">\n            <a class=\"modal-close waves-effect waves-green btn-flat\">Cancelar</a>\n            <a class=\"modal-close waves-effect waves-light light-blue btn\" (click)=\"editMember(editName.value, editEmail.value, editProfile.value)\">Salvar</a>\n          </div>\n        </div>\n\n        <!-- Modal to delete member -->\n        <div id=\"deleteMember\" class=\"modal modal-fixed-footer deleteMember\">\n          <div class=\"modal-content\">\n            <h4>Excluir pessoa</h4>\n            <p>\n              Você tem certeza que deseja excluir esta pessoa? Essa ação não poderá ser desfeita!\n            </p>\n          </div>\n          <div class=\"modal-footer\">\n            <a class=\"modal-close waves-effect waves-green btn-flat\">Cancelar</a>\n            <a class=\"modal-close waves-effect waves-light red btn\" (click)=\"deleteMember()\">Excluir</a>\n          </div>\n        </div>\n\n      </div>\n    </main>\n  \n    <!-- Footer -->\n    <app-footer></app-footer>\n  \n  </div>\n  "

/***/ }),

/***/ "./src/app/member/member.component.ts":
/*!********************************************!*\
  !*** ./src/app/member/member.component.ts ***!
  \********************************************/
/*! exports provided: MemberComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MemberComponent", function() { return MemberComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services.service */ "./src/app/services.service.ts");
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-spinner */ "./node_modules/ngx-spinner/fesm5/ngx-spinner.js");
/* harmony import */ var ngx_cookie_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-cookie-service */ "./node_modules/ngx-cookie-service/ngx-cookie-service.es5.js");
/* harmony import */ var angularx_social_login__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! angularx-social-login */ "./node_modules/angularx-social-login/angularx-social-login.es5.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var validator__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! validator */ "./node_modules/validator/index.js");
/* harmony import */ var validator__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(validator__WEBPACK_IMPORTED_MODULE_7__);








var MemberComponent = /** @class */ (function () {
    function MemberComponent(service, authService, spinner, cookie, router) {
        this.service = service;
        this.authService = authService;
        this.spinner = spinner;
        this.cookie = cookie;
        this.router = router;
        this.members = [];
        this.organizationId = '';
        this.organization = {};
        this.userEmail = '';
        this.userProfile = '';
        this.userToDelete = '';
        this.userProfiles = [
            { value: 'organizationManager', description: 'Gerente da organização' },
            { value: 'projectManager', description: 'Gerente de projetos' },
            { value: 'teamManager', description: 'Gerente de equipes' },
            { value: 'organizationMember', description: 'Membro da organização' }
        ];
    }
    MemberComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.spinner.show();
        this.organizationId = this.cookie.get('ORGANIZATIONID');
        console.log(this.organizationId);
        this.authService.authState.subscribe(function (user) {
            _this.userEmail = user.email;
            _this.getOrganization();
        });
    };
    MemberComponent.prototype.getOrganization = function () {
        var _this = this;
        this.service.findOrganizationById(this.organizationId).subscribe(function (data) {
            var organization = Object(data);
            _this.members = Object(organization).users || [];
            _this.organization = Object(organization);
            _this.userProfile = _this.getUserProfile(_this.organization);
            _this.spinner.hide();
        }, function (error) {
            _this.router.navigate(['home']);
        });
    };
    MemberComponent.prototype.getUserProfile = function (organization) {
        var _this = this;
        var users = organization.users;
        var user = users.find(function (u) { return u.email === _this.userEmail; });
        if (user) {
            return user.profile;
        }
        else {
            return this.cookie.get('ORGANIZATIONMEMBERPROFILE');
        }
    };
    MemberComponent.prototype.filterUserProfile = function (profile) {
        try {
            return this.userProfiles.find(function (userProfile) { return userProfile.value === profile; }).description;
        }
        catch (_a) {
            return profile;
        }
    };
    MemberComponent.prototype.addMemberModal = function () {
        $('#name').val('');
        $('#email').val('');
        $('select').formSelect();
        $('.modal').modal();
        $('.newMember').modal('open');
    };
    MemberComponent.prototype.editMemberModal = function (email) {
        var user = this.members.find(function (u) { return u.email === email; });
        $('#editName').val(user.name);
        $('#editEmail').val(user.email);
        $('#editProfile').val(user.profile);
        M.updateTextFields();
        $('select').formSelect();
        $('.modal').modal();
        $('.editMember').modal('open');
    };
    MemberComponent.prototype.deleteMemberModal = function (email) {
        if (email === this.userEmail) {
            M.toast({ html: 'Você não pode excluir você mesmo da organização!' });
        }
        else {
            this.userToDelete = email;
            $('select').formSelect();
            $('.modal').modal();
            $('.deleteMember').modal('open');
        }
    };
    MemberComponent.prototype.addMember = function (name, email, profile) {
        var _this = this;
        if (name !== '' && email !== '' && profile !== '') {
            var user = this.members.find(function (u) { return u.email === email; });
            var ifmailvalid = validator__WEBPACK_IMPORTED_MODULE_7___default.a.isEmail(email);
            if (user) {
                M.toast({ html: 'O e-mail informado já está cadastrado na organização!' });
            }
            else if (!ifmailvalid) {
                M.toast({ html: 'Email inválido' });
            }
            else {
                this.spinner.show();
                var u = { name: name, email: email, profile: profile, status: 'active' };
                this.members.push(u);
                Object(this.organization).users = this.members;
                this.service.updateOrganization(this.organization).subscribe(function (data) {
                    _this.spinner.hide();
                    M.toast({ html: 'Pessoa adicionada com sucesso!' });
                }, function (error) {
                    M.toast({ html: 'Ocorreu algum erro ao adicionar a pessoa. Por favor, tente novamente!' });
                });
            }
        }
        else if ((name === '' || email === '' || profile === '')) {
            M.toast({ html: 'Favor preencher todos os campos!' });
        }
    };
    MemberComponent.prototype.deleteMember = function () {
        var _this = this;
        if (this.userToDelete !== '') {
            var user = this.members.find(function (u) { return u.email === _this.userToDelete; });
            if (user) {
                this.spinner.show();
                user.status = 'deleted';
                this.members = this.members.filter(function (member) { return member.email !== _this.userToDelete; });
                this.members.push(user);
                Object(this.organization).users = this.members;
                this.service.updateOrganization(this.organization).subscribe(function (data) {
                    _this.members = _this.members.filter(function (member) { return member.email !== _this.userToDelete; });
                    _this.spinner.hide();
                    _this.userToDelete = '';
                    M.toast({ html: 'Pessoa excluída com sucesso!' });
                }, function (error) {
                    M.toast({ html: 'Ocorreu algum erro ao excluir a pessoa da organização. Por favor, tente novamente!' });
                });
            }
            else {
                M.toast({ html: 'Estranho... E-mail não encontrado! Por favor, tente novamente!' });
            }
        }
        else {
            M.toast({ html: 'Estranho... E-mail não encontrado! Por favor, tente novamente!' });
        }
    };
    MemberComponent.prototype.editMember = function (name, email, profile) {
        var _this = this;
        if (name !== '' && email !== '' && profile !== '') {
            var user = this.members.find(function (u) { return u.email === email; });
            if (user) {
                this.spinner.show();
                user.name = name;
                user.email = email;
                user.profile = profile;
                this.members = this.members.filter(function (member) { return member.email !== email; });
                this.members.push(user);
                Object(this.organization).users = this.members;
                this.service.updateOrganization(this.organization).subscribe(function (data) {
                    _this.spinner.hide();
                    M.toast({ html: 'Informações da pessoa atualizadas com sucesso!' });
                }, function (error) {
                    console.error(error);
                    M.toast({ html: 'Ocorreu algum erro na edição dos dados da pessoa. Por favor, tente novamente!' });
                });
            }
            else {
                M.toast({ html: 'Estranho... E-mail não encontrado! Por favor, tente novamente!' });
            }
        }
        else {
            M.toast({ html: 'Favor preencher todos os campos!' });
        }
    };
    MemberComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-member',
            template: __webpack_require__(/*! ./member.component.html */ "./src/app/member/member.component.html"),
            styles: [__webpack_require__(/*! ./member.component.css */ "./src/app/member/member.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_services_service__WEBPACK_IMPORTED_MODULE_2__["ServicesService"],
            angularx_social_login__WEBPACK_IMPORTED_MODULE_5__["AuthService"],
            ngx_spinner__WEBPACK_IMPORTED_MODULE_3__["NgxSpinnerService"],
            ngx_cookie_service__WEBPACK_IMPORTED_MODULE_4__["CookieService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_6__["Router"]])
    ], MemberComponent);
    return MemberComponent;
}());



/***/ }),

/***/ "./src/app/notfound/notfound.component.css":
/*!*************************************************!*\
  !*** ./src/app/notfound/notfound.component.css ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL25vdGZvdW5kL25vdGZvdW5kLmNvbXBvbmVudC5jc3MifQ== */"

/***/ }),

/***/ "./src/app/notfound/notfound.component.html":
/*!**************************************************!*\
  !*** ./src/app/notfound/notfound.component.html ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"body\">\n    \n    <!-- Main content -->\n    <div>\n      \n      <!-- Title -->\n      <div class=\"row center\">\n        <div class=\"col s12 m12\">\n          <h1 class=\"header\">404</h1>\n        </div>\n        <div class=\"col s12 m8 offset-m2\">\n          <h4 class=\"light\">Ops! Página não encontrada!</h4>\n          <br>\n          <a href=\"https://psas.mybluemix.net\">PSAS</a>\n        </div>\n      </div>\n  \n  </div>\n</div>\n  "

/***/ }),

/***/ "./src/app/notfound/notfound.component.ts":
/*!************************************************!*\
  !*** ./src/app/notfound/notfound.component.ts ***!
  \************************************************/
/*! exports provided: NotfoundComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NotfoundComponent", function() { return NotfoundComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var NotfoundComponent = /** @class */ (function () {
    function NotfoundComponent() {
    }
    NotfoundComponent.prototype.ngOnInit = function () {
    };
    NotfoundComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-notfound',
            template: __webpack_require__(/*! ./notfound.component.html */ "./src/app/notfound/notfound.component.html"),
            styles: [__webpack_require__(/*! ./notfound.component.css */ "./src/app/notfound/notfound.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], NotfoundComponent);
    return NotfoundComponent;
}());



/***/ }),

/***/ "./src/app/organization/organization-details/organization-details.component.css":
/*!**************************************************************************************!*\
  !*** ./src/app/organization/organization-details/organization-details.component.css ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL29yZ2FuaXphdGlvbi9vcmdhbml6YXRpb24tZGV0YWlscy9vcmdhbml6YXRpb24tZGV0YWlscy5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/organization/organization-details/organization-details.component.html":
/*!***************************************************************************************!*\
  !*** ./src/app/organization/organization-details/organization-details.component.html ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"body\">\n\n    <!--Header-->\n    <app-header></app-header>\n\n    <!-- Spinner -->\n    <ngx-spinner bdColor=\"rgba(0,0,0,0.8)\" size=\"large\" color=\"#00a7f8\" type=\"ball-spin-clockwise\"></ngx-spinner>\n  \n    <!-- Main content -->\n    <main onload=\"M.AutoInit();\">\n      <div class=\"container\">\n        \n        <!-- Title -->\n        <div class=\"row\">\n          <div class=\"col s12\">\n            <h3 class=\"header\"><a [routerLink]=\"['/organization']\">Organizações</a> > {{ organization.name }}</h3>\n          </div>\n        </div>\n\n        <!-- Organization info -->\n        <div class=\"row\">\n          <div class=\"col s12\">\n            <div class=\"card\">\n              <div class=\"card-content light-blue white-text\">\n                <span class=\"card-title\">Informações</span>\n                  <!--<p></p>-->\n              </div>\n              <div class=\"divider\"></div>\n              <div class=\"card-content\">\n                <label class=\"active\" for=\"name\">Nome</label>\n                <input value=\"{{ organization.name }}\" id=\"name\" type=\"text\" disabled>\n              </div>\n              <div class=\"card-action\">\n                <a class=\"waves-effect waves-light light-blue btn-small modal-trigger\" href=\"#editOrganization\" (click)=\"editOrganizationModal()\"><i class=\"material-icons left\">edit</i>Editar</a>\n              </div>\n            </div>\n          </div>\n        </div>\n\n        <!-- Organization users -->\n        <div class=\"row\">\n          <div class=\"col s12\">\n            <div class=\"card\">\n              <div class=\"card-content light-blue white-text\">\n                <span class=\"card-title\">Pessoas</span>\n                  <!--<p></p>-->\n              </div>\n              <div class=\"divider\"></div>\n              <div class=\"card-content\">\n                <table class=\"highlight responsive-table\">\n                  <thead>\n                    <tr>\n                      <th>Nome</th>\n                      <th>E-mail</th>\n                      <th>Perfil</th>\n                      <th>Status</th>\n                      <th>Opções</th>\n                    </tr>\n                  </thead>\n                  <tbody>\n                    <tr *ngFor=\"let user of organization.users\">\n                      <td>{{ user.name }}</td>\n                      <td>{{ user.email }}</td>\n                      <td>{{ filterUserProfile(user.profile) }}</td>\n                      <td>{{ filterUserStatus(user.status) }}</td>\n                      <td>\n                        <a class=\"modal-trigger\" href=\"#deleteUser\" title=\"Excluir usuário {{ user.name }}\" (click)=\"deleteUserModal(user.name, user.email)\"><i class=\"material-icons left\">delete</i></a>\n                      </td>\n                    </tr>\n                  </tbody>\n                </table>\n              </div>\n              <div class=\"card-action\">\n                <a class=\"waves-effect waves-light light-blue btn-small modal-trigger\" href=\"#addUser\" (click)=\"addUserModal()\"><i class=\"material-icons left\">add</i>Adicionar pessoa</a>\n              </div>\n            </div>\n          </div>\n        </div>\n\n        <!-- Organization competences -->\n        <div class=\"row\">\n          <div class=\"col s12\">\n            <div class=\"card\">\n              <div class=\"card-content light-blue white-text\">\n                <span class=\"card-title\">Competências avaliadas</span>\n                  <!--<p></p>-->\n              </div>\n              <div class=\"divider\"></div>\n              <div class=\"card-content\">\n                <table class=\"highlight\" *ngIf=\"organization.competences.length>0\">\n                  <thead>\n                    <tr>\n                      <th>Nome</th>\n                      <th>Tipo</th>\n                      <th>Descrição</th>\n                    </tr>\n                  </thead>\n                  <tbody>\n                    <tr *ngFor=\"let competence of organization.competences\">\n                      <td>{{ competence.name }}</td>\n                      <td>{{ filterCompetenceType(competence.type) }}</td>\n                      <td>{{ competence.description }}</td>\n                    </tr>\n                  </tbody>\n                </table>\n                <p class=\"caption\" *ngIf=\"organization.competences.length<=0\">\n                  Esta organização não possui competências cadastradas.\n                </p>\n              </div>\n              <div class=\"card-action\">\n                <a class=\"waves-effect waves-light light-blue btn-small modal-trigger\" href=\"#addCompetence\" (click)=\"addCompetenceModal()\"><i class=\"material-icons left\">add</i>Adicionar competência</a>\n              </div>\n            </div>\n          </div>\n        </div>\n\n\n        <!-- Buttons -->\n        <div class=\"row\">\n          <div class=\"col s12\">\n            <a class=\"waves-effect waves-light light-blue btn-large\" [routerLink]=\"['/organization']\"><i class=\"material-icons left\">arrow_back</i>Voltar</a>\n          </div>\n        </div>\n\n        <!-- Modal to edit organization -->\n        <div id=\"editOrganization\" class=\"modal modal-fixed-footer editOrganization\">\n          <div class=\"modal-content\">\n            <h4>Editar organização {{ organization.name }}</h4>\n            <p>\n              Informe o novo nome da organização e clique em Salvar.\n            </p>\n            <div class=\"row\">\n              <form class=\"col s12\">\n                <div class=\"row\">\n                  <div class=\"input-field col s12 m6\">\n                    <i class=\"material-icons prefix\">description</i>\n                    <label class=\"active\" for=\"organizationName\">Nome</label>\n                    <input #organizationName id=\"organizationName\" type=\"text\" class=\"validate\" value=\"{{ organization.name }}\">\n                  </div>\n                </div>\n              </form>\n            </div>\n          </div>\n          <div class=\"modal-footer\">\n            <a class=\"modal-close waves-effect waves-green btn-flat\">Cancelar</a>\n            <a class=\"modal-close waves-effect waves-light light-blue btn\" (click)=\"updateOrganization(organizationName.value)\">Salvar</a>\n          </div>\n        </div>\n\n        <!-- Modal to add user -->\n        <div id=\"addUser\" class=\"modal modal-fixed-footer addUser\">\n          <div class=\"modal-content\">\n            <h4>Adicionar pessoa na organização {{ organization.name }}</h4>\n            <p>\n              Informe os dados da pessoa a ser cadastrada na organização.\n            </p>\n            <div class=\"row\">\n              <form class=\"col s12\">\n                <div class=\"row\">\n                  <div class=\"input-field col s12 m6\">\n                    <i class=\"material-icons prefix\">person_outline</i>\n                    <label class=\"active\" for=\"organizationName\">Nome</label>\n                    <input #userName id=\"userName\" type=\"text\" class=\"validate\" value=\"\">\n                  </div>\n                </div>\n                <div class=\"row\">\n                  <div class=\"input-field col s12 m6\">\n                    <i class=\"material-icons prefix\">email</i>\n                    <label class=\"active\" for=\"organizationName\">E-mail</label>\n                    <input #userEmail id=\"userEmail\" type=\"email\" class=\"validate\" value=\"\">\n                  </div>\n                </div>\n                <div class=\"row\">\n                  <div class=\"input-field col s12 m6\">\n                    <i class=\"material-icons prefix\">security</i>\n                    <label class=\"active\" for=\"organizationName\">Perfil</label>\n                    <select #userProfile id=\"userProfile\" class=\"validate\">\n                        <option *ngFor='let profile of userProfiles' [value]=\"profile.value\">\n                          {{ profile.description }}\n                        </option>\n                    </select>\n                  </div>\n                </div>\n              </form>\n            </div>\n          </div>\n          <div class=\"modal-footer\">\n            <a class=\"modal-close waves-effect waves-green btn-flat\">Cancelar</a>\n            <a class=\"modal-close waves-effect waves-light light-blue btn\" (click)=\"addUser(userName.value, userEmail.value, userProfile.value)\">Adicionar</a>\n          </div>\n        </div>\n\n        <!-- Modal to delete user -->\n        <div id=\"deleteUser\" class=\"modal modal-fixed-footer deleteUser\">\n          <div class=\"modal-content\">\n            <h4>Excluir pessoa</h4>\n            <p>\n              Você realmente deseja excluir {{ email }} da organização {{ organization.name }}? Essa ação não poderá ser desfeita.\n            </p>\n          </div>\n          <div class=\"modal-footer\">\n            <a class=\"modal-close waves-effect waves-green btn-flat\">Cancelar</a>\n            <a class=\"modal-close waves-effect waves-light red btn\" (click)=\"deleteUser(email)\">Excluir</a>\n          </div>\n        </div>\n\n        <!-- Modal to add competence -->\n        <div id=\"addCompetence\" class=\"modal modal-fixed-footer addCompetence\">\n          <div class=\"modal-content\">\n            <h4>Adicionar competência na organização {{ organization.name }}</h4>\n            <p>\n              Informe os dados da competência a ser cadastrada na organização.\n            </p>\n            <div class=\"row\">\n              <form class=\"col s12\">\n                <div class=\"row\">\n                  <div class=\"input-field col s12 m6\">\n                    <i class=\"material-icons prefix\">blur_on</i>\n                    <label class=\"active\" for=\"competenceName\">Nome</label>\n                    <input #competenceName id=\"competenceName\" type=\"text\" class=\"validate\" value=\"\">\n                  </div>\n                </div>\n                <div class=\"row\">\n                  <div class=\"input-field col s12 m6\">\n                    <i class=\"material-icons prefix\">Tipo</i>\n                    <label class=\"active\" for=\"competenceType\">Tipo</label>\n                    <select #competenceType id=\"competenceType\" class=\"validate\">\n                        <option *ngFor='let type of competenceTypes' [value]=\"type.value\">\n                          {{ type.description }}\n                        </option>\n                    </select>\n                  </div>\n                </div>\n                <div class=\"row\">\n                  <div class=\"input-field col s12 m6\">\n                    <i class=\"material-icons prefix\">security</i>\n                    <label class=\"active\" for=\"competenceDescription\">Descrição</label>\n                    <input #competenceDescription id=\"competenceDescription\" type=\"text\" class=\"validate\" value=\"\">\n                  </div>\n                </div>\n              </form>\n            </div>\n          </div>\n          <div class=\"modal-footer\">\n            <a class=\"modal-close waves-effect waves-green btn-flat\">Cancelar</a>\n            <a class=\"modal-close waves-effect waves-light light-blue btn\" (click)=\"addCompetence(competenceName.value, competenceType.value, competenceDescription.value)\">Adicionar</a>\n          </div>\n        </div>\n\n      </div>\n    </main>\n  \n    <!-- Footer -->\n    <app-footer></app-footer>\n  \n  </div>\n  "

/***/ }),

/***/ "./src/app/organization/organization-details/organization-details.component.ts":
/*!*************************************************************************************!*\
  !*** ./src/app/organization/organization-details/organization-details.component.ts ***!
  \*************************************************************************************/
/*! exports provided: OrganizationDetailsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OrganizationDetailsComponent", function() { return OrganizationDetailsComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var src_app_services_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/services.service */ "./src/app/services.service.ts");
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-spinner */ "./node_modules/ngx-spinner/fesm5/ngx-spinner.js");





var OrganizationDetailsComponent = /** @class */ (function () {
    function OrganizationDetailsComponent(route, service, spinner, router) {
        this.route = route;
        this.service = service;
        this.spinner = spinner;
        this.router = router;
        this.organizationId = '';
        this.organization = {
            _rev: '',
            name: '',
            users: [],
            competences: [],
            status: ''
        };
        this.username = '';
        this.email = '';
        this.competenceTypes = [
            { value: 'knowledge', description: 'Conhecimento' },
            { value: 'ability', description: 'Habilidade' },
            { value: 'attitude', description: 'Atitude' }
        ];
        this.userProfiles = [
            { value: 'organizationManager', description: 'Gerente da organização' },
            { value: 'projectManager', description: 'Gerente de projetos' },
            { value: 'teamManager', description: 'Gerente de equipes' },
            { value: 'organizationMember', description: 'Membro da organização' }
        ];
        this.userStatus = [
            { value: 'active', description: 'Ativo' },
            { value: 'inactive', description: 'Inativo' },
            { value: 'deleted', description: 'Excluído' }
        ];
    }
    OrganizationDetailsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.spinner.show();
        this.route.paramMap.subscribe(function (params) {
            _this.organizationId = params.get('organizationId');
            _this.refresh();
        });
    };
    OrganizationDetailsComponent.prototype.refresh = function () {
        var _this = this;
        this.service.findOrganizationById(this.organizationId).subscribe(function (data) {
            var result = Object(data);
            _this.organization.competences = result.competences || [];
            _this.organization._rev = result._rev;
            _this.organization.name = result.name || '';
            _this.organization.users = result.users || [];
            _this.organization.status = result.status || 'active';
            _this.spinner.hide();
        }, function (error) {
            _this.router.navigate(['home']);
        });
    };
    OrganizationDetailsComponent.prototype.editOrganizationModal = function () {
        $('.modal').modal();
        $('.deleteOrganization').modal('open');
    };
    OrganizationDetailsComponent.prototype.updateOrganization = function (orgName) {
        var _this = this;
        this.spinner.show();
        var org = {
            _id: this.organizationId,
            _rev: this.organization._rev,
            name: orgName,
            users: this.organization.users,
            competences: this.organization.competences,
            status: this.organization.status
        };
        this.service.updateOrganization(org).subscribe(function (data) {
            _this.refresh();
        }, function (error) {
            _this.router.navigate(['home']);
        });
    };
    OrganizationDetailsComponent.prototype.addUserModal = function () {
        $('.modal').modal();
        $('select').formSelect();
        $('.addUser').modal('open');
    };
    OrganizationDetailsComponent.prototype.filterUserProfile = function (profile) {
        try {
            return this.userProfiles.find(function (userProfile) { return userProfile.value === profile; }).description;
        }
        catch (_a) {
            return profile;
        }
    };
    OrganizationDetailsComponent.prototype.filterUserStatus = function (status) {
        try {
            return this.userStatus.find(function (st) { return st.value === status; }).description;
        }
        catch (_a) {
            return status;
        }
    };
    OrganizationDetailsComponent.prototype.addUser = function (userName, userEmail, userProfile) {
        this.spinner.show();
        var user = {
            name: userName,
            email: userEmail,
            profile: userProfile,
            status: 'active'
        };
        this.organization.users.push(user);
        this.updateOrganization(this.organization.name);
    };
    OrganizationDetailsComponent.prototype.deleteUserModal = function (userName, userEmail) {
        this.username = userName;
        this.email = userEmail;
        $('.modal').modal();
        $('.deleteUser').modal('open');
    };
    OrganizationDetailsComponent.prototype.deleteUser = function (userEmail) {
        this.spinner.show();
        var tempUser = this.organization.users.find(function (user) { return user.email === userEmail; });
        console.log(tempUser);
        var index = this.organization.users.indexOf(tempUser);
        console.log(index);
        tempUser.status = 'deleted';
        this.organization.users.splice(index, 1);
        this.organization.users.push(tempUser);
        console.log(this.organization);
        this.updateOrganization(this.organization.name);
    };
    OrganizationDetailsComponent.prototype.addCompetenceModal = function () {
        $('.modal').modal();
        $('select').formSelect();
        $('.addCompetence').modal('open');
    };
    OrganizationDetailsComponent.prototype.filterCompetenceType = function (competenceType) {
        return this.competenceTypes.find(function (competence) { return competence.value === competenceType; }).description;
    };
    OrganizationDetailsComponent.prototype.addCompetence = function (competenceName, competenceType, competenceDescription) {
        this.spinner.show();
        var competence = {
            name: competenceName,
            type: competenceType,
            description: competenceDescription
        };
        this.organization.competences.push(competence);
        this.updateOrganization(this.organization.name);
    };
    OrganizationDetailsComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-organization-details',
            template: __webpack_require__(/*! ./organization-details.component.html */ "./src/app/organization/organization-details/organization-details.component.html"),
            styles: [__webpack_require__(/*! ./organization-details.component.css */ "./src/app/organization/organization-details/organization-details.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"],
            src_app_services_service__WEBPACK_IMPORTED_MODULE_3__["ServicesService"],
            ngx_spinner__WEBPACK_IMPORTED_MODULE_4__["NgxSpinnerService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]])
    ], OrganizationDetailsComponent);
    return OrganizationDetailsComponent;
}());



/***/ }),

/***/ "./src/app/organization/organization.component.css":
/*!*********************************************************!*\
  !*** ./src/app/organization/organization.component.css ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "select {\n    color: #000; /* no need for !important :) */\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvb3JnYW5pemF0aW9uL29yZ2FuaXphdGlvbi5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0lBQ0ksV0FBVyxFQUFFLDhCQUE4QjtBQUMvQyIsImZpbGUiOiJzcmMvYXBwL29yZ2FuaXphdGlvbi9vcmdhbml6YXRpb24uY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbInNlbGVjdCB7XG4gICAgY29sb3I6ICMwMDA7IC8qIG5vIG5lZWQgZm9yICFpbXBvcnRhbnQgOikgKi9cbn0iXX0= */"

/***/ }),

/***/ "./src/app/organization/organization.component.html":
/*!**********************************************************!*\
  !*** ./src/app/organization/organization.component.html ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"body\">\n\n  <!--Header-->\n  <app-header></app-header>\n\n  <!-- Spinner -->\n  <ngx-spinner bdColor=\"rgba(0,0,0,0.8)\" size=\"large\" color=\"#00a7f8\" type=\"ball-spin-clockwise\"></ngx-spinner>\n\n  <!-- Main content -->\n  <div>\n\n    <div class=\"container\">\n    \n    <!-- Title -->\n    <div class=\"row\">\n      <div class=\"col s12\">\n        <!--<h3 class=\"header\">Organizações</h3>-->\n        <h3 class=\"header\"><a [routerLink]=\"['/home']\">Home</a> > Organizações</h3>\n        <!--<p class=\"caption\">\n            \n        </p>-->\n      </div>\n    </div>\n\n    <div class=\"row\" *ngIf=\"organizationsCount<=0\">\n      <div class=\"col s12 center\">\n        <h5 class=\"header\">Você não está cadastrado em nenhuma organização!</h5>\n        <p class=\"caption\">\n          Uma organização é o maior conjunto dentro do PSAS, onde você gerencia as competências e pessoas.\n          <br>\n          Os dados de uma organização não podem ser acessados ou vinculados à outra organização, mesmo que você tenha o perfil de acesso de gestor.\n          <br><br>\n          Crie sua organização clicando no botão \"Nova organização\" ou solicite para o gestor da organização que você deseja participar incluir o seu e-mail <b>{{ email }}</b> como membro da organização.\n        </p>\n      </div>\n    </div>\n\n    <!-- Cards of organizations -->\n    <div class=\"row\">\n      <div class=\"col s12 m6 l6 xl4\" *ngFor=\"let org of organizationsList\">\n        <div class=\"card small darken-1\">\n          <div class=\"card-content\" style=\"cursor: pointer;\">\n            <span class=\"card-title\" (click)=\"selectOrganization(org._id)\">{{ org.name }}</span>\n            <p (click)=\"selectOrganizationPeople(org._id)\">\n              {{ org.users.length }} {{ org.users.length>1 ? 'pessoas' : 'pessoa' }}\n            </p>\n            <p (click)=\"selectOrganizationCompetence(org._id)\">\n              {{ org.competences.length>0 ? (org.competences.length>1 ? org.competences.length + ' competências' : org.competences.length + ' competência') : ('Nenhuma competência cadastrada') }}\n            </p>\n          </div>\n          <div class=\"card-action light-blue\">\n            <a class=\"modal-trigger\" style=\"color: white;\" href=\"#deleteOrganization\" title=\"Excluir organização {{ org.name }}\" (click)=\"deleteOrganizationModal(org._id)\"><i class=\"material-icons left\">delete</i></a>\n          </div>\n        </div>\n      </div>\n    </div>\n\n    <!-- Buttons -->\n    <div class=\"row\">\n      <div class=\"col s12 center\">\n        <a class=\"waves-effect waves-light light-blue btn-large modal-trigger\" href=\"#newOrganization\" (click)=\"addOrganizationModal()\"><i class=\"material-icons left\">add</i>Nova organização</a>\n      </div>\n    </div>\n\n    <!-- Modal for new organization -->\n    <div id=\"newOrganization\" class=\"modal modal-fixed-footer newOrganization\">\n      <div class=\"modal-content\">\n        <h4>Nova organização</h4>\n        <p>\n          Informe o nome da organização. Após a criação, você poderá editar as competências e pessoas da organização.\n          Ao criar uma nova organização, o seu perfil já será incluído como gestor da organização.\n        </p>\n        <div class=\"row\">\n          <form class=\"col s12\">\n            <div class=\"row\">\n              <div class=\"input-field col s12\">\n                <i class=\"material-icons prefix\">description</i>\n                <input #orgName id=\"organizationName\" type=\"text\" class=\"validate\">\n                <label for=\"organizationName\">Nome</label>\n              </div>\n            </div>\n          </form>\n        </div>\n      </div>\n      <div class=\"modal-footer\">\n        <a class=\"modal-close waves-effect waves-green btn-flat\">Cancelar</a>\n        <a class=\"modal-close waves-effect waves-light light-blue btn\" (click)=\"addOrganization(orgName.value)\">Salvar</a>\n      </div>\n    </div>\n\n    <!-- Modal to delete organization -->\n    <div id=\"deleteOrganization\" class=\"modal modal-fixed-footer\">\n      <div class=\"modal-content\">\n        <h4>Excluir organização <b>{{ organizationName }}</b></h4>\n        <p>\n          Você tem certeza que deseja excluir a organização?\n          Todas as informações relacionadas à organização serão apagadas e nenhuma pessoa terá mais acesso à esta organização.\n          Essa ação não poderá ser desfeita!\n        </p>\n      </div>\n      <div class=\"modal-footer\">\n        <a (click)=\"organizationId=''\" class=\"modal-close waves-effect waves-green btn-flat\">Cancelar</a>\n        <a class=\"modal-close waves-effect waves-light red btn\" (click)=\"deleteOrganization(organizationId)\">Excluir</a>\n      </div>\n    </div>\n\n    </div>\n\n  </div>\n\n</div>\n"

/***/ }),

/***/ "./src/app/organization/organization.component.ts":
/*!********************************************************!*\
  !*** ./src/app/organization/organization.component.ts ***!
  \********************************************************/
/*! exports provided: OrganizationComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OrganizationComponent", function() { return OrganizationComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngx-spinner */ "./node_modules/ngx-spinner/fesm5/ngx-spinner.js");
/* harmony import */ var _services_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../services.service */ "./src/app/services.service.ts");
/* harmony import */ var angularx_social_login__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! angularx-social-login */ "./node_modules/angularx-social-login/angularx-social-login.es5.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var ngx_cookie_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ngx-cookie-service */ "./node_modules/ngx-cookie-service/ngx-cookie-service.es5.js");







var OrganizationComponent = /** @class */ (function () {
    function OrganizationComponent(authService, service, router, cookie, spinner) {
        this.authService = authService;
        this.service = service;
        this.router = router;
        this.cookie = cookie;
        this.spinner = spinner;
        this.organizations = {};
        this.organizationsCount = 0;
        this.organizationsList = [];
        this.organizationId = '';
        this.organizationName = '';
        this.organizationUsers = [];
        this.organizationCompetences = [];
        this.email = '';
    }
    OrganizationComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.spinner.show();
        this.authService.authState.subscribe(function (user) {
            _this.user = user;
            _this.email = user.email;
            _this.getOrganizations();
        });
        $('select').formSelect();
        $('.modal').modal();
    };
    OrganizationComponent.prototype.findOrganizationById = function (id) {
        var _this = this;
        this.service.findOrganizationById(id).subscribe(function (data) {
            console.log(data);
            _this.spinner.hide();
        }, function (error) {
            _this.spinner.hide();
        });
    };
    OrganizationComponent.prototype.getOrganizations = function () {
        var _this = this;
        this.service.findOrganizationsFromUser().subscribe(function (data) {
            _this.organizations = Object(data);
            _this.organizationsCount = Object(_this.organizations).count;
            _this.organizationsList = Object(_this.organizations).organizationList;
            _this.spinner.hide();
        }, function (error) {
            _this.spinner.hide();
        });
    };
    OrganizationComponent.prototype.deleteOrganizationModal = function (organizationId) {
        var organization = this.organizationsList.find(function (org) { return org._id === organizationId; });
        this.organizationId = organizationId;
        this.organizationName = organization.name;
        $('.modal').modal();
        $('.deleteOrganization').modal('open');
    };
    OrganizationComponent.prototype.deleteOrganization = function (id) {
        var _this = this;
        this.spinner.show();
        this.service.deleteOrganization(id).subscribe(function (data) {
            _this.getOrganizations();
        }, function (error) {
            console.log('ohoh, mostrar mensagem de erro pro usuario');
            _this.spinner.hide();
        });
    };
    OrganizationComponent.prototype.addOrganizationModal = function () {
        this.organizationName = '';
        $('.modal').modal();
        $('.newOrganization').modal('open');
    };
    OrganizationComponent.prototype.addOrganization = function (name) {
        var _this = this;
        this.spinner.show();
        this.service.addOrganization(name).subscribe(function (data) {
            _this.getOrganizations();
        }, function (error) {
            console.log('ohoh, mostrar mensagem de erro pro usuario');
            _this.spinner.hide();
        });
    };
    OrganizationComponent.prototype.editCompetences = function (organizationId) {
        var organization = this.organizationsList.find(function (org) { return org._id === organizationId; });
        this.organizationName = organization.name;
        this.organizationCompetences = organization.competences;
        $('.editCompetences').modal('open');
    };
    OrganizationComponent.prototype.editUsers = function (organizationId) {
        var organization = this.organizationsList.find(function (org) { return org._id === organizationId; });
        this.organizationName = organization.name;
        this.organizationUsers = organization.users;
        $('.editUsers').modal('open');
    };
    OrganizationComponent.prototype.selectOrganization = function (organizationId) {
        var _this = this;
        var organization = this.organizationsList.find(function (org) { return org._id === organizationId; });
        var user = Object(organization).users.find(function (u) { return u.email === _this.email; });
        this.cookie.set('ORGANIZATIONID', organizationId, 15);
        this.cookie.set('ORGANIZATIONNAME', organization.name, 15);
        this.cookie.set('ORGANIZATIONMEMBERPROFILE', user.profile, 15);
        this.router.navigate(['profile']);
    };
    OrganizationComponent.prototype.selectOrganizationPeople = function (organizationId) {
        var _this = this;
        var organization = this.organizationsList.find(function (org) { return org._id === organizationId; });
        var user = Object(organization).users.find(function (u) { return u.email === _this.email; });
        this.cookie.set('ORGANIZATIONID', organizationId, 15);
        this.cookie.set('ORGANIZATIONNAME', organization.name, 15);
        this.cookie.set('ORGANIZATIONMEMBERPROFILE', user.profile, 15);
        this.router.navigate(['member']);
    };
    OrganizationComponent.prototype.selectOrganizationCompetence = function (organizationId) {
        var _this = this;
        var organization = this.organizationsList.find(function (org) { return org._id === organizationId; });
        var user = Object(organization).users.find(function (u) { return u.email === _this.email; });
        this.cookie.set('ORGANIZATIONID', organizationId, 15);
        this.cookie.set('ORGANIZATIONNAME', organization.name, 15);
        this.cookie.set('ORGANIZATIONMEMBERPROFILE', user.profile, 15);
        this.router.navigate(['competence']);
    };
    OrganizationComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-organization',
            template: __webpack_require__(/*! ./organization.component.html */ "./src/app/organization/organization.component.html"),
            styles: [__webpack_require__(/*! ./organization.component.css */ "./src/app/organization/organization.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [angularx_social_login__WEBPACK_IMPORTED_MODULE_4__["AuthService"],
            _services_service__WEBPACK_IMPORTED_MODULE_3__["ServicesService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"],
            ngx_cookie_service__WEBPACK_IMPORTED_MODULE_6__["CookieService"],
            ngx_spinner__WEBPACK_IMPORTED_MODULE_2__["NgxSpinnerService"]])
    ], OrganizationComponent);
    return OrganizationComponent;
}());



/***/ }),

/***/ "./src/app/privacy/privacy.component.css":
/*!***********************************************!*\
  !*** ./src/app/privacy/privacy.component.css ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3ByaXZhY3kvcHJpdmFjeS5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/privacy/privacy.component.html":
/*!************************************************!*\
  !*** ./src/app/privacy/privacy.component.html ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"body\">\n\n  <!--Header-->\n  <app-header></app-header>\n\n  <!-- Main content -->\n  <main>\n    <div class=\"container\">\n      <div class=\"row\">\n        <div class=\"col s12\">\n          <h3 class=\"header\">Privacidade</h3>\n          <p class=\"caption\">Esta é a página com informações de privacidade. </p>\n        </div>\n      </div>\n    </div>\n  </main>\n\n  <!-- Footer -->\n  <app-footer></app-footer>\n\n</div>\n"

/***/ }),

/***/ "./src/app/privacy/privacy.component.ts":
/*!**********************************************!*\
  !*** ./src/app/privacy/privacy.component.ts ***!
  \**********************************************/
/*! exports provided: PrivacyComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PrivacyComponent", function() { return PrivacyComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var PrivacyComponent = /** @class */ (function () {
    function PrivacyComponent() {
    }
    PrivacyComponent.prototype.ngOnInit = function () {
    };
    PrivacyComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-privacy',
            template: __webpack_require__(/*! ./privacy.component.html */ "./src/app/privacy/privacy.component.html"),
            styles: [__webpack_require__(/*! ./privacy.component.css */ "./src/app/privacy/privacy.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], PrivacyComponent);
    return PrivacyComponent;
}());



/***/ }),

/***/ "./src/app/profile/profile.component.css":
/*!***********************************************!*\
  !*** ./src/app/profile/profile.component.css ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".tabs .tab a{\n    color:#000;\n} /*Black color to the text*/ .tabs .tab a:hover {\n    background-color:#eee;\n    color:#000;\n} /*Text color on hover*/ .tabs .tab a.active {\n    background-color: white;\n    color:#000;\n} /*Background and text color when a tab is active*/\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcHJvZmlsZS9wcm9maWxlLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7SUFDSSxVQUFVO0FBQ2QsRUFBRSwwQkFBMEIsRUFFNUI7SUFDSSxxQkFBcUI7SUFDckIsVUFBVTtBQUNkLEVBQUUsc0JBQXNCLEVBRXhCO0lBQ0ksdUJBQXVCO0lBQ3ZCLFVBQVU7QUFDZCxFQUFFLGlEQUFpRCIsImZpbGUiOiJzcmMvYXBwL3Byb2ZpbGUvcHJvZmlsZS5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLnRhYnMgLnRhYiBhe1xuICAgIGNvbG9yOiMwMDA7XG59IC8qQmxhY2sgY29sb3IgdG8gdGhlIHRleHQqL1xuXG4udGFicyAudGFiIGE6aG92ZXIge1xuICAgIGJhY2tncm91bmQtY29sb3I6I2VlZTtcbiAgICBjb2xvcjojMDAwO1xufSAvKlRleHQgY29sb3Igb24gaG92ZXIqL1xuXG4udGFicyAudGFiIGEuYWN0aXZlIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcbiAgICBjb2xvcjojMDAwO1xufSAvKkJhY2tncm91bmQgYW5kIHRleHQgY29sb3Igd2hlbiBhIHRhYiBpcyBhY3RpdmUqL1xuIl19 */"

/***/ }),

/***/ "./src/app/profile/profile.component.html":
/*!************************************************!*\
  !*** ./src/app/profile/profile.component.html ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"body\">\n\n  <!--Header-->\n  <app-header></app-header>\n\n  <!-- Spinner -->\n  <ngx-spinner bdColor=\"rgba(0,0,0,0.8)\" size=\"large\" color=\"#00a7f8\" type=\"ball-spin-clockwise\"></ngx-spinner>\n\n  <!-- Main content -->\n  <main>\n    <div class=\"container\">\n      \n      <!-- Title -->\n      <div class=\"row\">\n        <div class=\"col s12\">\n          <h3 class=\"header\">Meu perfil</h3>\n        </div>\n      </div>\n      <div class=\"row\">\n        <div class=\"col s12 m6\" style=\"cursor: default;\" >\n          <div class=\"card-panel white\" style=\"height: 300px;\">\n            <h5>Competências em destaque</h5>\n            <h6 *ngFor=\"let competence of topThreeCompetences\">\n              {{ competence.questionCompetence }}\n            </h6>\n            <h6 *ngIf=\"topThreeCompetences.length<=0\">Sem avaliações para determinar competências em destaque</h6>\n          </div>\n        </div>\n        <div class=\"col s12 m6\" style=\"cursor: default;\">\n          <div class=\"card-panel white\" style=\"height: 300px;\">\n            <h5>Competências que preciso aperfeiçoar</h5>\n            <h6 *ngFor=\"let competence of threeCompetencesToImprove\">\n              {{ competence.questionCompetence }}\n            </h6>\n            <h6 *ngIf=\"threeCompetencesToImprove.length<=0\">Sem avaliações para determinar as competências que você precisa aperfeiçoar</h6>\n          </div>\n        </div>\n      </div>\n\n      <!-- Title -->\n      <div class=\"divider\"></div>\n      <div class=\"row\">\n        <div class=\"col s12\">\n          <h3 class=\"header\">Comparação dos resultados de avaliação</h3>\n          <h5 *ngIf=\"topThreeCompetences.length<=0\">Sem avaliações para calcular os resultados comparativos</h5>\n        </div>\n      </div>\n      <!--<div class=\"row\">\n        <div class=\"col s12\" style=\"cursor: pointer;\" routerLink=\"/application\">\n          <div class=\"card-panel white\" style=\"height: 300px;\">\n            <h6>Avaliações</h6>\n            <h5>15 aplicações</h5>\n            <h5>100% das pessoas participando</h5>\n            <h5>4 avaliações não respondidas</h5>\n          </div>\n        </div>\n      </div>-->\n      <div class=\"row\">\n        <div class=\"col s12\">\n          <!--<div class=\"card\">\n            <div class=\"card-tabs\">\n              <ul class=\"tabs tabs-fixed-width\">\n                <li class=\"tab\"><a class=\"active black-text\" href=\"#test4\">Projeto</a></li>\n                <li class=\"tab\"><a href=\"#test5\">Equipe</a></li>\n              </ul>\n            </div>\n            <div class=\"card-content\">\n              <div id=\"test4\">Test 1</div>\n              <div id=\"test5\">Test 2</div>\n            </div>\n          </div>-->\n          <div class=\"row\">\n            <div class=\"input-field col s12 m6\">\n              <select #project (change)=\"comparativeResultsByProject(project.value)\">\n                <option value=\"\" selected>Todos</option>\n                <option *ngFor=\"let project of projects\" [value]=\"project._id\">\n                  {{ project.name }}\n                </option>\n              </select>\n              <label>Projeto</label>\n            </div>\n            <div class=\"input-field col s12 m6\">\n              <select>\n                <option value=\"\" selected>Todas</option>\n                <option *ngFor=\"let team of teams\" [value]=\"team._id\">\n                  {{ team.name }}\n                </option>\n              </select>\n              <label>Equipe</label>\n            </div>\n          </div>\n          <div class=\"row\">\n            <div class=\"col s12\">\n              <div class=\"card-panel white\" style=\"height: 500px;\">\n                <div id=\"results\"></div>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n\n      <!-- Title -->\n      <div class=\"divider\"></div>\n      <div class=\"row\">\n        <div class=\"col s12\">\n          <h3 class=\"header\">Histórico</h3>\n          <h5 *ngIf=\"topThreeCompetences.length<=0\">Sem avaliações para exibir no histórico</h5>\n        </div>\n      </div>\n      <div class=\"row\">\n        <div class=\"input-field col s12\">\n          <select #history (change)=\"historyChartCompetence(history.value)\">\n            <option value=\"Todas\" selected>Todas</option>\n            <option *ngFor=\"let competence of spotlightCompetences\" [value]=\"competence.questionCompetence\">\n              {{ competence.questionCompetence }}\n            </option>\n          </select>\n          <label>Competência</label>\n        </div>\n      </div>\n      <div class=\"row\">\n        <div class=\"col s12\">\n          <div class=\"card-panel white\" style=\"height: 500px;\">\n            <div id=\"history\"></div>\n          </div>\n        </div>\n      </div>\n\n    </div>\n  </main>\n\n  <!-- Footer -->\n  <app-footer></app-footer>\n\n</div>\n"

/***/ }),

/***/ "./src/app/profile/profile.component.ts":
/*!**********************************************!*\
  !*** ./src/app/profile/profile.component.ts ***!
  \**********************************************/
/*! exports provided: ProfileComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProfileComponent", function() { return ProfileComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var highcharts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! highcharts */ "./node_modules/highcharts/highcharts.js");
/* harmony import */ var highcharts__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(highcharts__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _services_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../services.service */ "./src/app/services.service.ts");
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-spinner */ "./node_modules/ngx-spinner/fesm5/ngx-spinner.js");
/* harmony import */ var angularx_social_login__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! angularx-social-login */ "./node_modules/angularx-social-login/angularx-social-login.es5.js");
/* harmony import */ var ngx_cookie_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ngx-cookie-service */ "./node_modules/ngx-cookie-service/ngx-cookie-service.es5.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");








var Boost = __webpack_require__(/*! highcharts/modules/boost */ "./node_modules/highcharts/modules/boost.js");
var noData = __webpack_require__(/*! highcharts/modules/no-data-to-display */ "./node_modules/highcharts/modules/no-data-to-display.js");
var More = __webpack_require__(/*! highcharts/highcharts-more */ "./node_modules/highcharts/highcharts-more.js");
var VariablePie = __webpack_require__(/*! highcharts/modules/variable-pie */ "./node_modules/highcharts/modules/variable-pie.js");
Boost(highcharts__WEBPACK_IMPORTED_MODULE_2__);
noData(highcharts__WEBPACK_IMPORTED_MODULE_2__);
More(highcharts__WEBPACK_IMPORTED_MODULE_2__);
VariablePie(highcharts__WEBPACK_IMPORTED_MODULE_2__);
var ProfileComponent = /** @class */ (function () {
    function ProfileComponent(service, spinner, authService, cookie, router) {
        this.service = service;
        this.spinner = spinner;
        this.authService = authService;
        this.cookie = cookie;
        this.router = router;
        this.organizationId = '';
        this.organizationName = '';
        this.userProfile = '';
        this.userEmail = '';
        this.spotlightCompetences = [];
        this.historySelectedCompetences = [];
        this.teams = [];
        this.answers = [];
        this.projects = [];
        this.topThreeCompetences = [];
        this.threeCompetencesToImprove = [];
        this.resultsChart = {
            categories: [],
            series: []
        };
    }
    ;
    ProfileComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.spinner.show();
        this.organizationId = this.cookie.get('ORGANIZATIONID');
        this.organizationName = this.cookie.get('ORGANIZATIONNAME');
        this.userProfile = this.cookie.get('ORGANIZATIONMEMBERPROFILE');
        this.authService.authState.subscribe(function (user) {
            if (user) {
                _this.userEmail = user.email;
                _this.findProfile();
            }
            else {
                _this.router.navigate(['home']);
            }
        });
        M.AutoInit();
        $('.indicator').addClass('light-blue');
        $('select').formSelect();
    };
    ProfileComponent.prototype.initializeComponents = function () {
        setTimeout(this.initializeComponents, 200);
        $('select').formSelect();
    };
    ProfileComponent.prototype.findProfile = function () {
        var _this = this;
        this.service.findProfile(this.organizationId).subscribe(function (data) {
            _this.spotlightCompetences = Object(data).spotlightCompetences;
            _this.answers = Object(data).answers;
            _this.historyChartCompetence('');
            _this.selectTopThreeCompetences(Object(data));
            _this.service.findProjectsFromUser().subscribe(function (proj) {
                _this.updateTeamsList(Object(data).applications, Object(proj).projects);
                _this.initializeComponents();
                _this.spinner.hide();
            }, function (error) {
                _this.router.navigate(['home']);
            });
        }, function (error) {
            _this.router.navigate(['home']);
        });
    };
    ProfileComponent.prototype.resultChartComparative = function (spotCompetences, answers) {
        var categories = [];
        var userResultsData = [];
        var otherResultsData = [];
        spotCompetences.forEach(function (competence) {
            categories.push(competence.questionCompetence);
            userResultsData.push(competence.mean);
            var temp = 0;
            var count = 0;
            answers.forEach(function (answer) {
                if (answer.questionCompetence === competence.questionCompetence) {
                    if (answer.answer !== '') {
                        temp = temp + ((answer.answer * 100) / 100);
                        count++;
                    }
                }
            });
            otherResultsData.push(temp / count);
        });
        this.resultsChart.categories = categories;
        this.resultsChart.series = [{
                name: 'Você',
                data: userResultsData,
                pointPlacement: 'on'
            }, {
                name: 'Comparativo',
                data: otherResultsData,
                pointPlacement: 'on'
            }];
        this.updateResultsChart();
    };
    ProfileComponent.prototype.sortCompetencesByMean = function (a, b) {
        var ca = a.mean;
        var cb = b.mean;
        var comparison = 0;
        if (ca > cb) {
            comparison = -1;
        }
        else if (ca < cb) {
            comparison = 1;
        }
        return comparison;
    };
    ProfileComponent.prototype.selectTopThreeCompetences = function (profile) {
        if (profile) {
            var temp = [];
            this.topThreeCompetences = profile.spotlightCompetences;
            temp = profile.spotlightCompetences;
            this.topThreeCompetences.sort(this.sortCompetencesByMean);
            temp.sort(this.sortCompetencesByMean);
            this.topThreeCompetences = this.topThreeCompetences.slice(0, 3);
            if (temp.length > 6) {
                temp.reverse();
                this.threeCompetencesToImprove = temp.slice(0, 3);
            }
            else {
                this.threeCompetencesToImprove = [];
            }
        }
    };
    ProfileComponent.prototype.updateTeamsList = function (applications, projs) {
        var _this = this;
        this.teams = [];
        applications.forEach(function (application) {
            if (_this.teams.length <= 0) {
                _this.teams.push(application.team);
            }
            else {
                var t = _this.teams.find(function (team) { return team._id === application.team._id; });
                if (!t) {
                    _this.teams.push(application.team);
                }
            }
        });
        this.updateProjectsList(this.teams, projs);
    };
    ProfileComponent.prototype.updateProjectsList = function (teams, projs) {
        var _this = this;
        this.projects = [];
        teams.forEach(function (team) {
            var p = projs.find(function (proj) { return proj._id === team.projectId; });
            if (p) {
                if (_this.projects.length <= 0) {
                    _this.projects.push(p);
                }
                else {
                    var p2 = _this.projects.find(function (proj) { return proj._id === team.projectId; });
                    if (!p2) {
                        _this.projects.push(p2);
                    }
                }
            }
        });
        this.resultChartComparative(this.spotlightCompetences, this.answers);
    };
    ProfileComponent.prototype.comparativeResultsByProject = function (project) {
        var ans = [];
        this.answers.forEach(function (answer) {
            if (answer.projectId === project && answer !== '') {
                ans.push(answer);
            }
        });
        this.resultChartComparative(this.spotlightCompetences, ans);
    };
    ProfileComponent.prototype.historyChartCompetence = function (competence) {
        if (competence === '') {
            this.updateHistoryChart(this.spotlightCompetences);
        }
        else {
            var comp = this.spotlightCompetences.find(function (c) { return c.questionCompetence === competence; });
            if (comp) {
                this.updateHistoryChart([comp]);
            }
            else {
                this.updateHistoryChart(this.spotlightCompetences);
            }
        }
    };
    ProfileComponent.prototype.updateHistoryChart = function (competences) {
        var _this = this;
        var competenceSeries = [];
        competences.forEach(function (competence) {
            var tempData = [];
            competence.values.forEach(function (element) {
                var d = new Date(element.date).getUTCDate();
                var m = new Date(element.date).getUTCMonth();
                var y = new Date(element.date).getUTCFullYear();
                var h = new Date(element.date).getUTCHours();
                var min = new Date(element.date).getUTCMinutes();
                tempData.push([Date.UTC(y, m, d), element.value]);
            });
            _this.historySelectedCompetences.push(competence.questionCompetence);
            competenceSeries.push({
                name: competence.questionCompetence,
                showInLegend: true,
                data: tempData
            });
        });
        competenceSeries.forEach(function (c) {
            var tempData2 = [];
            var temp = [];
            c.data.forEach(function (d) {
                var index = temp.findIndex(function (t) { return t.date === d[0]; });
                if (index === -1) {
                    temp.push({ date: d[0], values: [d[1]] });
                }
                else {
                    temp[index].values.push(d[1]);
                }
            });
            temp.forEach(function (t) {
                tempData2.push([t.date, t.values.reduce(function (a, b) { return a + b; }, 0) / t.values.length]);
            });
            c.data = tempData2;
        });
        highcharts__WEBPACK_IMPORTED_MODULE_2__["chart"]('history', {
            chart: {
                type: 'area',
                height: '450px',
                backgroundColor: 'transparent'
            },
            title: {
                text: null
            },
            xAxis: {
                type: 'datetime',
                dateTimeLabelFormats: {
                    minute: '%H:%M',
                    month: '%e/%m',
                    year: '%Y'
                },
                title: {
                    text: 'Data'
                }
            },
            yAxis: {
                title: {
                    text: 'Porcentagem'
                }
            },
            tooltip: {
                headerFormat: '<b>{series.name}</b><br>',
                pointFormat: 'Atingiu {point.y:.0f}% em {point.x:%e/%m/%Y}'
            },
            plotOptions: {
                area: {
                    marker: {
                        enabled: false,
                        symbol: 'circle',
                        radius: 2,
                        states: {
                            hover: {
                                enabled: true
                            }
                        }
                    }
                }
            },
            series: competenceSeries
        });
        $('.highcharts-credits').hide();
    };
    ProfileComponent.prototype.updateResultsChart = function () {
        highcharts__WEBPACK_IMPORTED_MODULE_2__["chart"]('results', {
            chart: {
                polar: true,
                type: 'area',
                height: '450px',
            },
            title: {
                text: null,
                x: -80
            },
            pane: {
                size: '80%'
            },
            xAxis: {
                categories: this.resultsChart.categories,
                tickmarkPlacement: 'on',
                lineWidth: 0
            },
            yAxis: {
                gridLineInterpolation: 'polygon',
                lineWidth: 0,
                min: 0
            },
            tooltip: {
                shared: true,
                pointFormat: '<span style="color:{series.color}">{series.name}: {point.y:,.0f}%<br/>'
            },
            legend: {
                align: 'right',
                verticalAlign: 'middle',
                layout: 'vertical'
            },
            series: this.resultsChart.series,
            responsive: {
                rules: [{
                        condition: {
                            maxWidth: 500
                        },
                        chartOptions: {
                            legend: {
                                align: 'center',
                                verticalAlign: 'bottom',
                                layout: 'horizontal'
                            },
                            pane: {
                                size: '70%'
                            }
                        }
                    }]
            }
        });
        $('.highcharts-credits').hide();
    };
    ProfileComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-profile',
            template: __webpack_require__(/*! ./profile.component.html */ "./src/app/profile/profile.component.html"),
            styles: [__webpack_require__(/*! ./profile.component.css */ "./src/app/profile/profile.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_services_service__WEBPACK_IMPORTED_MODULE_3__["ServicesService"],
            ngx_spinner__WEBPACK_IMPORTED_MODULE_4__["NgxSpinnerService"],
            angularx_social_login__WEBPACK_IMPORTED_MODULE_5__["AuthService"],
            ngx_cookie_service__WEBPACK_IMPORTED_MODULE_6__["CookieService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_7__["Router"]])
    ], ProfileComponent);
    return ProfileComponent;
}());



/***/ }),

/***/ "./src/app/project/project.component.css":
/*!***********************************************!*\
  !*** ./src/app/project/project.component.css ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3Byb2plY3QvcHJvamVjdC5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/project/project.component.html":
/*!************************************************!*\
  !*** ./src/app/project/project.component.html ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"body\">\n\n    <!--Header-->\n    <app-header></app-header>\n\n    <!-- Spinner -->\n    <ngx-spinner bdColor=\"rgba(0,0,0,0.8)\" size=\"large\" color=\"#00a7f8\" type=\"ball-spin-clockwise\"></ngx-spinner>\n  \n    <!-- Main content -->\n    <main>\n      <div class=\"container\">\n        \n        <!-- Title -->\n        <div class=\"row\">\n          <div class=\"col s12\">\n            <h3 class=\"header\">Projetos</h3>\n            <!--<p class=\"caption\">\n                \n            </p>-->\n          </div>\n        </div>\n\n        <div class=\"row\" *ngIf=\"projectsCount<=0\">\n          <div class=\"col s12 center\">\n            <h5 class=\"header\">Esta organização não tem nenhum projeto!</h5>\n            <p class=\"caption\" *ngIf=\"userProfile!='organizationManager' && userProfile!='projectManager'\">\n              Solicite para um gestor da organização ou gestor de projetos que você deseja participar de um projeto!\n            </p>\n            <p class=\"caption\" *ngIf=\"userProfile==='organizationManager' || userProfile==='projectManager'\">\n                Crie um projeto clicando no botão \"Novo projeto\" ou solicite para um gestor da organização ou gestor de projetos que você deseja participar de um projeto!\n              </p>\n          </div>\n        </div>\n\n\n      <!-- Projects -->\n      <div class=\"row\">\n        <div class=\"col s12\">\n          <table *ngIf=\"projectsList.length>0\">\n            <thead>\n              <tr>\n                <th style=\"width: 80%;\">Nome</th>\n                <th *ngIf=\"userProfile==='organizationManager' || userProfile==='projectManager'\">Opções</th>\n              </tr>\n            </thead>\n            <tbody>\n              <tr *ngFor=\"let project of projectsList\">\n<<<<<<< HEAD\n                <td >{{ project.name }}</td>\n=======\n                <td (click)=\"editProjectModal(project._id)\">{{ project.name }}</td>\n>>>>>>> 5caf4ad23b584424c65f3c809fd185d975ccb9e3\n                <td *ngIf=\"userProfile==='organizationManager' || userProfile==='projectManager'\">\n                  <a class=\"modal-trigger\" href=\"#editProject\" title=\"Editar projeto {{ project.name }}\" (click)=\"editProjectModal(project._id)\"><i class=\"material-icons left\">edit</i></a>\n                  <a class=\"modal-trigger\" href=\"#deleteProject\" title=\"Excluir projeto {{ project.name }}\" (click)=\"deleteProjectModal(project._id)\"><i class=\"material-icons left\">delete</i></a>\n                </td>\n              </tr>\n            </tbody>\n          </table>\n        </div>\n      </div>\n\n        <!-- Buttons -->\n        <div class=\"row\" *ngIf=\"userProfile==='organizationManager' || userProfile==='projectManager'\">\n          <div class=\"col s12 center\">\n            <a class=\"waves-effect waves-light light-blue btn-large modal-trigger\" href=\"#newProject\" (click)=\"addProjectModal()\"><i class=\"material-icons left\">add</i>Novo projeto</a>\n          </div>\n        </div>\n\n        <!-- User without access -->\n        <div class=\"row\" *ngIf=\"userProfile!='organizationManager' && userProfile!='projectManager'\">\n          <div class=\"col s12 center\">\n            <p class=\"caption\">Você não possui acesso para adicionar, alterar ou excluir projetos na organização {{ organization.name }}.</p>\n          </div>\n        </div>\n\n        <!-- Modal for new project -->\n        <div id=\"newProject\" class=\"modal modal-fixed-footer newProject\">\n          <div class=\"modal-content\">\n            <h4>Novo projeto</h4>\n            <p>\n              Informe os dados para criar um novo projeto.\n            </p>\n            <div class=\"row\">\n              <form class=\"col s12\">\n                <div class=\"row\">\n                  <div class=\"input-field col s12 m6\">\n                    <i class=\"material-icons prefix\">description</i>\n                    <input #projName id=\"projName\" type=\"text\" class=\"validate\" value=\"{{ projectName }}\">\n                    <label for=\"projName\">Nome</label>\n                  </div>\n                </div>\n              </form>\n            </div>\n          </div>\n          <div class=\"modal-footer\">\n            <a class=\"modal-close waves-effect waves-green btn-flat\">Cancelar</a>\n            <a class=\"modal-close waves-effect waves-light light-blue btn\" (click)=\"addProject(projName.value)\">Salvar</a>\n          </div>\n        </div>\n\n        <!-- Modal to edit project -->\n        <div id=\"editProject\" class=\"modal modal-fixed-footer editProject\">\n          <div class=\"modal-content\">\n            <h4>Editar projeto {{ projectName }}</h4>\n            <p>\n              Atualize as informações do projeto.\n            </p>\n            <div class=\"row\">\n              <form class=\"col s12\">\n                <div class=\"row\">\n                  <div class=\"input-field col s12 m6\">\n                    <i class=\"material-icons prefix\">description</i>\n                    <label for=\"projNameEdit\" class=\"active\">Nome</label>\n                    <input #projNameEdit id=\"projNameEdit\" type=\"text\" class=\"validate\" value=\"{{ projectName }}\">\n                  </div>\n                </div>\n              </form>\n            </div>\n          </div>\n          <div class=\"modal-footer\">\n            <a class=\"modal-close waves-effect waves-green btn-flat\">Cancelar</a>\n            <a class=\"modal-close waves-effect waves-light light-blue btn\" (click)=\"updateProject(projectId, projNameEdit.value)\">Salvar</a>\n          </div>\n        </div>\n\n        <!-- Modal to delete project -->\n        <div id=\"deleteProject\" class=\"modal modal-fixed-footer\">\n          <div class=\"modal-content\">\n            <h4>Excluir projeto <b>{{ projectName }}</b></h4>\n            <p>\n              Você tem certeza que deseja excluir o projeto? Essa ação não poderá ser desfeita!\n            </p>\n          </div>\n          <div class=\"modal-footer\">\n            <a class=\"modal-close waves-effect waves-green btn-flat\">Cancelar</a>\n            <a class=\"modal-close waves-effect waves-light red btn\" (click)=\"deleteProject(projectId)\">Excluir</a>\n          </div>\n        </div>\n\n      </div>\n    </main>\n  \n    <!-- Footer -->\n    <app-footer></app-footer>\n  \n  </div>\n  "

/***/ }),

/***/ "./src/app/project/project.component.ts":
/*!**********************************************!*\
  !*** ./src/app/project/project.component.ts ***!
  \**********************************************/
/*! exports provided: ProjectComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProjectComponent", function() { return ProjectComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services.service */ "./src/app/services.service.ts");
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-spinner */ "./node_modules/ngx-spinner/fesm5/ngx-spinner.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var ngx_cookie_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-cookie-service */ "./node_modules/ngx-cookie-service/ngx-cookie-service.es5.js");
/* harmony import */ var angularx_social_login__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! angularx-social-login */ "./node_modules/angularx-social-login/angularx-social-login.es5.js");







var ProjectComponent = /** @class */ (function () {
    function ProjectComponent(service, authService, spinner, cookie, router) {
        this.service = service;
        this.authService = authService;
        this.spinner = spinner;
        this.cookie = cookie;
        this.router = router;
        this.projectsList = [];
        this.projectsCount = 0;
        this.organizationId = '';
        this.organizationsList = [];
        this.organization = {};
        this.projectName = '';
        this.userEmail = '';
        this.userProfile = '';
        this.projectId = '';
    }
    ProjectComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.spinner.show();
        this.organizationId = this.cookie.get('ORGANIZATIONID');
        this.authService.authState.subscribe(function (user) {
            _this.userEmail = user.email;
            _this.getProjects();
        });
        $('select').formSelect();
        $('.modal').modal();
        M.AutoInit();
    };
    ProjectComponent.prototype.getProjects = function () {
        var _this = this;
        this.projectsList = [];
        this.projectsCount = 0;
        this.projectName = '';
        this.projectId = '';
        this.service.findProjectsByOrganizationId(this.organizationId).subscribe(function (data) {
            var projects = Object(data);
            _this.projectsList = Object(projects).projects;
            _this.projectsCount = _this.projectsList.length;
            _this.organization = Object(projects).organization;
            _this.userProfile = _this.getUserProfile(_this.organization);
            _this.spinner.hide();
        }, function (error) {
            _this.router.navigate(['home']);
        });
    };
    ProjectComponent.prototype.getUserProfile = function (organization) {
        var _this = this;
        var users = organization.users;
        var user = users.find(function (u) { return u.email === _this.userEmail; });
        if (user) {
            return user.profile;
        }
        else {
            return '';
        }
    };
    ProjectComponent.prototype.addProjectModal = function () {
        this.projectName = '';
        $('select').formSelect();
        M.updateTextFields();
        $('.modal').modal();
        $('.newProject').modal('open');
    };
    ProjectComponent.prototype.addProject = function (projectName) {
        var _this = this;
        if (projectName === '') {
            M.toast({ html: 'Projeto inválido' });
        }
        else {
            this.spinner.show();
            var project = {
                name: projectName,
                organizationId: this.organizationId,
                status: 'active'
            };
            this.service.addProject(project).subscribe(function (data) {
                _this.getProjects();
            }, function (error) {
                _this.router.navigate(['home']);
            });
        }
    };
    ProjectComponent.prototype.deleteProjectModal = function (projectId) {
        var project = this.projectsList.find(function (proj) { return proj._id === projectId; });
        this.projectId = projectId;
        this.projectName = project.name;
        $('.modal').modal();
        $('.deleteProject').modal('open');
    };
    ProjectComponent.prototype.deleteProject = function (projectId) {
        var _this = this;
        this.spinner.show();
        this.service.deleteProject(projectId).subscribe(function (data) {
            _this.getProjects();
        }, function (error) {
            _this.router.navigate(['home']);
        });
    };
    ProjectComponent.prototype.editProjectModal = function (projectId) {
        $('select').formSelect();
        var project = this.projectsList.find(function (proj) { return proj._id === projectId; });
        this.projectId = projectId;
        this.projectName = project.name;
        $('#projNameEdit').val(project.name);
        M.updateTextFields();
        $('.modal').modal();
        $('.editProject').modal('open');
    };
    ProjectComponent.prototype.updateProject = function (projectId, projName) {
        var _this = this;
        this.spinner.show();
        var project = this.projectsList.find(function (proj) { return proj._id === projectId; });
        project.name = projName;
        project.organizationId = this.organizationId;
        this.service.updateProject(project).subscribe(function (data) {
            _this.getProjects();
        }, function (error) {
            _this.router.navigate(['home']);
        });
    };
    ProjectComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-project',
            template: __webpack_require__(/*! ./project.component.html */ "./src/app/project/project.component.html"),
            styles: [__webpack_require__(/*! ./project.component.css */ "./src/app/project/project.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_services_service__WEBPACK_IMPORTED_MODULE_2__["ServicesService"],
            angularx_social_login__WEBPACK_IMPORTED_MODULE_6__["AuthService"],
            ngx_spinner__WEBPACK_IMPORTED_MODULE_3__["NgxSpinnerService"],
            ngx_cookie_service__WEBPACK_IMPORTED_MODULE_5__["CookieService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"]])
    ], ProjectComponent);
    return ProjectComponent;
}());



/***/ }),

/***/ "./src/app/routing.module.ts":
/*!***********************************!*\
  !*** ./src/app/routing.module.ts ***!
  \***********************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _user_user_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./user/user.component */ "./src/app/user/user.component.ts");
/* harmony import */ var _home_home_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./home/home.component */ "./src/app/home/home.component.ts");
/* harmony import */ var _help_help_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./help/help.component */ "./src/app/help/help.component.ts");
/* harmony import */ var _privacy_privacy_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./privacy/privacy.component */ "./src/app/privacy/privacy.component.ts");
/* harmony import */ var _contact_contact_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./contact/contact.component */ "./src/app/contact/contact.component.ts");
/* harmony import */ var _assessment_assessment_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./assessment/assessment.component */ "./src/app/assessment/assessment.component.ts");
/* harmony import */ var _organization_organization_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./organization/organization.component */ "./src/app/organization/organization.component.ts");
/* harmony import */ var _project_project_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./project/project.component */ "./src/app/project/project.component.ts");
/* harmony import */ var _team_team_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./team/team.component */ "./src/app/team/team.component.ts");
/* harmony import */ var _notfound_notfound_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./notfound/notfound.component */ "./src/app/notfound/notfound.component.ts");
/* harmony import */ var _dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./dashboard/dashboard.component */ "./src/app/dashboard/dashboard.component.ts");
/* harmony import */ var _application_application_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./application/application.component */ "./src/app/application/application.component.ts");
/* harmony import */ var _organization_organization_details_organization_details_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./organization/organization-details/organization-details.component */ "./src/app/organization/organization-details/organization-details.component.ts");
/* harmony import */ var _team_team_details_team_details_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./team/team-details/team-details.component */ "./src/app/team/team-details/team-details.component.ts");
/* harmony import */ var _assessment_assessment_details_assessment_details_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./assessment/assessment-details/assessment-details.component */ "./src/app/assessment/assessment-details/assessment-details.component.ts");
/* harmony import */ var _competence_competence_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./competence/competence.component */ "./src/app/competence/competence.component.ts");
/* harmony import */ var _profile_profile_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./profile/profile.component */ "./src/app/profile/profile.component.ts");
/* harmony import */ var _attendance_attendance_component__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./attendance/attendance.component */ "./src/app/attendance/attendance.component.ts");
/* harmony import */ var _answer_answer_component__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./answer/answer.component */ "./src/app/answer/answer.component.ts");
/* harmony import */ var _member_member_component__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./member/member.component */ "./src/app/member/member.component.ts");























var routes = [
    { path: 'user', component: _user_user_component__WEBPACK_IMPORTED_MODULE_3__["UserComponent"] },
    { path: 'home', component: _home_home_component__WEBPACK_IMPORTED_MODULE_4__["HomeComponent"] },
    { path: 'dashboard', component: _dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_13__["DashboardComponent"] },
    { path: 'help', component: _help_help_component__WEBPACK_IMPORTED_MODULE_5__["HelpComponent"] },
    { path: 'privacy', component: _privacy_privacy_component__WEBPACK_IMPORTED_MODULE_6__["PrivacyComponent"] },
    { path: 'contact', component: _contact_contact_component__WEBPACK_IMPORTED_MODULE_7__["ContactComponent"] },
    { path: 'assessment', component: _assessment_assessment_component__WEBPACK_IMPORTED_MODULE_8__["AssessmentComponent"] },
    { path: 'assessment/:assessmentId', component: _assessment_assessment_details_assessment_details_component__WEBPACK_IMPORTED_MODULE_17__["AssessmentDetailsComponent"] },
    { path: 'application', component: _application_application_component__WEBPACK_IMPORTED_MODULE_14__["ApplicationComponent"] },
    { path: 'organization', component: _organization_organization_component__WEBPACK_IMPORTED_MODULE_9__["OrganizationComponent"] },
    { path: 'competence', component: _competence_competence_component__WEBPACK_IMPORTED_MODULE_18__["CompetenceComponent"] },
    { path: 'answer', component: _answer_answer_component__WEBPACK_IMPORTED_MODULE_21__["AnswerComponent"] },
    { path: 'attendance', component: _attendance_attendance_component__WEBPACK_IMPORTED_MODULE_20__["AttendanceComponent"] },
    { path: 'profile', component: _profile_profile_component__WEBPACK_IMPORTED_MODULE_19__["ProfileComponent"] },
    { path: 'member', component: _member_member_component__WEBPACK_IMPORTED_MODULE_22__["MemberComponent"] },
    { path: 'organization/:organizationId', component: _organization_organization_details_organization_details_component__WEBPACK_IMPORTED_MODULE_15__["OrganizationDetailsComponent"] },
    { path: 'project', component: _project_project_component__WEBPACK_IMPORTED_MODULE_10__["ProjectComponent"] },
    { path: 'team', component: _team_team_component__WEBPACK_IMPORTED_MODULE_11__["TeamComponent"] },
    { path: 'team/:teamId', component: _team_team_details_team_details_component__WEBPACK_IMPORTED_MODULE_16__["TeamDetailsComponent"] },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: '404', component: _notfound_notfound_component__WEBPACK_IMPORTED_MODULE_12__["NotfoundComponent"] },
    { path: '**', redirectTo: '/404' }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forRoot(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());



/***/ }),

/***/ "./src/app/services.service.ts":
/*!*************************************!*\
  !*** ./src/app/services.service.ts ***!
  \*************************************/
/*! exports provided: ServicesService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ServicesService", function() { return ServicesService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var angularx_social_login__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! angularx-social-login */ "./node_modules/angularx-social-login/angularx-social-login.es5.js");
/* harmony import */ var _auth0_angular_jwt__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @auth0/angular-jwt */ "./node_modules/@auth0/angular-jwt/index.js");






var endpoint = 'https://61914044.us-south.apiconnect.appdomain.cloud/psas/v1';
var ServicesService = /** @class */ (function () {
    function ServicesService(http, jwtHelper, authService) {
        this.http = http;
        this.jwtHelper = jwtHelper;
        this.authService = authService;
        this.token = '';
        this.httpOptions = {};
    }
    ServicesService.prototype.extractData = function (res) {
        var body = res;
        return body || {};
    };
    ServicesService.prototype.getUserEmail = function () {
        this.authService.authState.subscribe(function (user) {
            if (user != null) {
                console.log(user);
                return user.email;
            }
        });
    };
    ServicesService.prototype.getHttpOptions = function () {
        var _this = this;
        this.authService.authState.subscribe(function (user) {
            if (user != null) {
                _this.httpOptions = {
                    headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]({
                        'Content-Type': 'application/json',
                        'Cache-Control': 'no-cache',
                        'If-Modified-Since': '0',
                        Pragma: 'no-cache',
                        Expires: 'Thu, 01 Jan 1970 00:00:00 GMT',
                        Authorization: user.idToken
                    })
                };
            }
        });
    };
    ServicesService.prototype.findOrganizationsFromUser = function () {
        this.getHttpOptions();
        return this.http.get(endpoint + '/organization', this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(this.extractData));
    };
    ServicesService.prototype.deleteOrganization = function (id) {
        this.getHttpOptions();
        return this.http.delete(endpoint + '/organization/' + id, this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(this.extractData));
    };
    ServicesService.prototype.addOrganization = function (organizationName) {
        this.getHttpOptions();
        var body = {
            name: organizationName
        };
        return this.http.post(endpoint + '/organization', body, this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(this.extractData));
    };
    ServicesService.prototype.updateOrganization = function (organization) {
        this.getHttpOptions();
        var org = Object(organization);
        var body = {
            _id: org._id,
            _rev: org._rev,
            name: org.name,
            users: org.users,
            competences: org.competences,
            status: org.status
        };
        return this.http.put(endpoint + '/organization/' + org._id, body, this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(this.extractData));
    };
    ServicesService.prototype.findOrganizationById = function (id) {
        this.getHttpOptions();
        return this.http.get(endpoint + '/organization/' + id, this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(this.extractData));
    };
    ServicesService.prototype.findProjectsFromUser = function () {
        this.getHttpOptions();
        return this.http.get(endpoint + '/project', this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(this.extractData));
    };
    ServicesService.prototype.addProject = function (project) {
        this.getHttpOptions();
        var proj = Object(project);
        var body = {
            name: proj.name,
            organizationId: proj.organizationId,
            status: proj.status
        };
        return this.http.post(endpoint + '/project', body, this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(this.extractData));
    };
    ServicesService.prototype.deleteProject = function (id) {
        this.getHttpOptions();
        return this.http.delete(endpoint + '/project/' + id, this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(this.extractData));
    };
    ServicesService.prototype.updateProject = function (project) {
        this.getHttpOptions();
        var proj = Object(project);
        var body = {
            _id: proj._id,
            _rev: proj._rev,
            name: proj.name,
            organizationId: proj.organizationId,
            status: proj.status
        };
        return this.http.put(endpoint + '/project/' + body._id, body, this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(this.extractData));
    };
    ServicesService.prototype.findProjectById = function (id) {
        this.getHttpOptions();
        return this.http.get(endpoint + '/project/' + id, this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(this.extractData));
    };
    ServicesService.prototype.findProjectsByOrganizationId = function (organizationId) {
        this.getHttpOptions();
        return this.http.get(endpoint + '/project/findByOrganizationId/' + organizationId, this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(this.extractData));
    };
    ServicesService.prototype.findTeamsFromUser = function () {
        this.getHttpOptions();
        return this.http.get(endpoint + '/team', this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(this.extractData));
    };
    ServicesService.prototype.addTeam = function (teamName, projId) {
        this.getHttpOptions();
        var body = {
            name: teamName,
            projectId: projId,
            members: {
                email: this.getUserEmail(),
                status: 'active'
            }
        };
        return this.http.post(endpoint + '/team', body, this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(this.extractData));
    };
    ServicesService.prototype.deleteTeam = function (id) {
        this.getHttpOptions();
        return this.http.delete(endpoint + '/team/' + id, this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(this.extractData));
    };
    ServicesService.prototype.findTeamById = function (id) {
        this.getHttpOptions();
        return this.http.get(endpoint + '/team/' + id, this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(this.extractData));
    };
    ServicesService.prototype.updateTeam = function (teamId, team) {
        this.getHttpOptions();
        var t = Object(team);
        var body = t;
        return this.http.put(endpoint + '/team/' + teamId, body, this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(this.extractData));
    };
    ServicesService.prototype.findAssessmentsFromUser = function () {
        this.getHttpOptions();
        return this.http.get(endpoint + '/assessment', this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(this.extractData));
    };
    ServicesService.prototype.findAllPublicAssessments = function () {
        this.getHttpOptions();
        return this.http.get(endpoint + '/assessment/findAllPublic', this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(this.extractData));
    };
    ServicesService.prototype.addAssessment = function (assessment) {
        this.getHttpOptions();
        var a = Object(assessment);
        var body = {
            _id: a._id,
            _rev: a._rev,
            name: a.name,
            organizationId: a.organizationId,
            userCreator: a.userCreator || this.getUserEmail(),
            public: a.public || false,
            tool: a.tool || 'rubric',
            status: a.status || 'active',
            questions: a.questions || []
        };
        return this.http.post(endpoint + '/assessment/', body, this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(this.extractData));
    };
    ServicesService.prototype.deleteAssessment = function (id) {
        this.getHttpOptions();
        return this.http.delete(endpoint + '/assessment/' + id, this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(this.extractData));
    };
    ServicesService.prototype.findAssessmentById = function (id) {
        this.getHttpOptions();
        return this.http.get(endpoint + '/assessment/' + id, this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(this.extractData));
    };
    ServicesService.prototype.updateAssessment = function (assessment) {
        this.getHttpOptions();
        var a = Object(assessment);
        var body = {
            _id: a._id,
            _rev: a._rev,
            name: a.name,
            organizationId: a.organizationId,
            userCreator: a.userCreator || this.getUserEmail(),
            public: a.public || false,
            tool: a.tool || 'rubric',
            status: a.status || 'active',
            questions: a.questions || []
        };
        return this.http.put(endpoint + '/assessment/' + body._id, body, this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(this.extractData));
    };
    ServicesService.prototype.findApplicationsFromUser = function () {
        this.getHttpOptions();
        return this.http.get(endpoint + '/application', this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(this.extractData));
    };
    ServicesService.prototype.addApplication = function (name, teamId, assessmentId, type, method, strategy) {
        var body = {
            name: name,
            teamId: teamId,
            assessmentId: assessmentId,
            type: type,
            method: method,
            strategy: strategy
        };
        this.getHttpOptions();
        return this.http.post(endpoint + '/application', body, this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(this.extractData));
    };
    ServicesService.prototype.deleteApplication = function (id) {
        this.getHttpOptions();
        return this.http.delete(endpoint + '/application/' + id, this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(this.extractData));
    };
    ServicesService.prototype.saveAnswers = function (applicationId, answersArray) {
        this.getHttpOptions();
        var body = {
            answers: answersArray
        };
        return this.http.put(endpoint + '/application/saveAnswers/' + applicationId, body, this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(this.extractData));
    };
    ServicesService.prototype.findProfile = function (organizationId) {
        this.getHttpOptions();
        return this.http.get(endpoint + '/dashboard/findProfile/' + organizationId, this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(this.extractData));
    };
    ServicesService.prototype.findOrganizationProfile = function (organizationId) {
        this.getHttpOptions();
        return this.http.get(endpoint + '/dashboard/findOrganizationProfile/' + organizationId, this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(this.extractData));
    };
    ServicesService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"], _auth0_angular_jwt__WEBPACK_IMPORTED_MODULE_5__["JwtHelperService"], angularx_social_login__WEBPACK_IMPORTED_MODULE_4__["AuthService"]])
    ], ServicesService);
    return ServicesService;
}());



/***/ }),

/***/ "./src/app/team/team-details/team-details.component.css":
/*!**************************************************************!*\
  !*** ./src/app/team/team-details/team-details.component.css ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3RlYW0vdGVhbS1kZXRhaWxzL3RlYW0tZGV0YWlscy5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/team/team-details/team-details.component.html":
/*!***************************************************************!*\
  !*** ./src/app/team/team-details/team-details.component.html ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"body\">\n\n  <!--Header-->\n  <app-header></app-header>\n\n  <!-- Spinner -->\n  <ngx-spinner bdColor=\"rgba(0,0,0,0.8)\" size=\"large\" color=\"#00a7f8\" type=\"ball-spin-clockwise\"></ngx-spinner>\n\n  <!-- Main content -->\n  <main onload=\"M.AutoInit();\">\n    <div class=\"container\">\n      \n      <!-- Title -->\n      <div class=\"row\">\n        <div class=\"col s12\">\n          <h3 class=\"header\"><a [routerLink]=\"['/team']\">Equipes</a> > {{ team.name }}</h3>\n        </div>\n      </div>\n\n      <!-- Team info -->\n      <div class=\"row\">\n        <div class=\"col s12\">\n          <div class=\"card\">\n            <div class=\"card-content light-blue white-text\">\n              <span class=\"card-title\">Informações</span>\n                <!--<p></p>-->\n            </div>\n            <div class=\"divider\"></div>\n            <div class=\"card-content\">\n              <label class=\"active\" for=\"name\">Nome</label>\n              <input value=\"{{ team.name }}\" id=\"name\" type=\"text\" disabled>\n            </div>\n            <div class=\"card-action\">\n              <a class=\"waves-effect waves-light light-blue btn-small modal-trigger\" href=\"#editTeam\" (click)=\"editTeamModal()\"><i class=\"material-icons left\">edit</i>Editar</a>\n            </div>\n          </div>\n        </div>\n      </div>\n\n      <!-- Team members -->\n      <div class=\"row\" *ngIf=\"organizationUsers.length>0\">\n        <div class=\"col s12\">\n          <div class=\"card\">\n            <div class=\"card-content light-blue white-text\">\n              <span class=\"card-title\">Pessoas</span>\n                <!--<p></p>-->\n            </div>\n            <div class=\"divider\"></div>\n            <div class=\"card-content\">\n              <table class=\"highlight responsive-table\">\n                <thead>\n                  <tr>\n                    <th>Nome</th>\n                    <th>E-mail</th>\n                    <th>Status</th>\n                    <th>Opções</th>\n                  </tr>\n                </thead>\n                <tbody>\n                  <tr *ngFor=\"let member of team.members\">\n                    <td>{{ findName(member.email) }}</td>\n                    <td>{{ member.email }}</td>\n                    <td>{{ filterUserStatus(member.status) }}</td>\n                    <td>\n                      <a class=\"modal-trigger\" href=\"#deleteMember\" title=\"Excluir membro {{ member.name }}\" (click)=\"deleteMemberModal(member.name, member.email)\"><i class=\"material-icons left\">delete</i></a>\n                    </td>\n                  </tr>\n                </tbody>\n              </table>\n            </div>\n            <div class=\"card-action\">\n              <a class=\"waves-effect waves-light light-blue btn-small modal-trigger\" href=\"#addMember\" (click)=\"addMemberModal()\"><i class=\"material-icons left\">add</i>Adicionar pessoa</a>\n            </div>\n          </div>\n        </div>\n      </div>\n\n      <!-- Buttons -->\n      <div class=\"row\">\n        <div class=\"col s12\">\n          <a class=\"waves-effect waves-light light-blue btn-large\" [routerLink]=\"['/team']\"><i class=\"material-icons left\">arrow_back</i>Voltar</a>\n        </div>\n      </div>\n\n      <!-- Modal to edit team -->\n      <div id=\"editTeam\" class=\"modal modal-fixed-footer editTeam\">\n        <div class=\"modal-content\">\n          <h4>Editar organização {{ team.name }}</h4>\n          <p>\n            Informe o novo nome da organização e clique em Salvar.\n          </p>\n          <div class=\"row\">\n            <form class=\"col s12\">\n              <div class=\"row\">\n                <div class=\"input-field col s12 m6\">\n                  <i class=\"material-icons prefix\">description</i>\n                  <label class=\"active\" for=\"teamName\">Nome</label>\n                  <input #teamName id=\"teamName\" type=\"text\" class=\"validate\" value=\"{{ team.name }}\">\n                </div>\n              </div>\n            </form>\n          </div>\n        </div>\n        <div class=\"modal-footer\">\n          <a class=\"modal-close waves-effect waves-green btn-flat\">Cancelar</a>\n          <a class=\"modal-close waves-effect waves-light light-blue btn\" (click)=\"updateTeam(teamName.value)\">Salvar</a>\n        </div>\n      </div>\n\n      <!-- Modal to add user -->\n      <div id=\"addMember\" class=\"modal modal-fixed-footer addMember\">\n        <div class=\"modal-content\">\n          <h4>Adicionar pessoa na equipe {{ team.name }}</h4>\n          <p *ngIf=\"userList.length>0\">\n            Selecione a pessoa que deve ser incluída na equipe.\n          </p>\n          <p *ngIf=\"userList.length<=0\">\n            Todas as pessoas da organização já foram adicionadas nesta equipe!\n          </p>\n          <div class=\"row\">\n            <form class=\"col s12\">\n              <div class=\"row\">\n                <div class=\"input-field col s12\">\n                  <i class=\"material-icons prefix\">person_outline</i>\n                  <label class=\"active\" for=\"userEmail\">Pessoa</label>\n                  <select #userEmail id=\"userEmail\" class=\"validate\">\n                    <option *ngFor='let user of userList' [value]=\"user.email\">\n                      {{ (user.name ? user.name+' - ' : '') + user.email }}\n                    </option>\n                  </select>\n                </div>\n              </div>\n            </form>\n          </div>\n        </div>\n        <div class=\"modal-footer\">\n          <a class=\"modal-close waves-effect waves-green btn-flat\">Cancelar</a>\n          <a *ngIf=\"userList.length>0\" class=\"modal-close waves-effect waves-light light-blue btn\" (click)=\"addUser(userEmail.value)\">Adicionar</a>\n        </div>\n      </div>\n\n      <!-- Modal to delete user -->\n      <div id=\"deleteUser\" class=\"modal modal-fixed-footer deleteUser\">\n        <div class=\"modal-content\">\n          <h4>Excluir pessoa</h4>\n          <p>\n            Você realmente deseja excluir {{ email }} da equipe {{ team.name }}? Essa ação não poderá ser desfeita.\n          </p>\n        </div>\n        <div class=\"modal-footer\">\n          <a class=\"modal-close waves-effect waves-green btn-flat\">Cancelar</a>\n          <a class=\"modal-close waves-effect waves-light red btn\" (click)=\"deleteUser(email)\">Excluir</a>\n        </div>\n      </div>\n\n    </div>\n  </main>\n\n  <!-- Footer -->\n  <app-footer></app-footer>\n\n</div>\n"

/***/ }),

/***/ "./src/app/team/team-details/team-details.component.ts":
/*!*************************************************************!*\
  !*** ./src/app/team/team-details/team-details.component.ts ***!
  \*************************************************************/
/*! exports provided: TeamDetailsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TeamDetailsComponent", function() { return TeamDetailsComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var src_app_services_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/services.service */ "./src/app/services.service.ts");
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-spinner */ "./node_modules/ngx-spinner/fesm5/ngx-spinner.js");





var TeamDetailsComponent = /** @class */ (function () {
    function TeamDetailsComponent(route, service, spinner, router) {
        this.route = route;
        this.service = service;
        this.spinner = spinner;
        this.router = router;
        this.teamId = '';
        this.team = {
            _id: '',
            _rev: '',
            name: '',
            projectId: '',
            members: [],
            status: ''
        };
        this.username = '';
        this.email = '';
        this.organizationUsers = [];
        this.userList = [];
        this.userProfiles = [
            { value: 'organizationManager', description: 'Gerente da organização' },
            { value: 'projectManager', description: 'Gerente de projetos' },
            { value: 'teamManager', description: 'Gerente de equipes' },
            { value: 'organizationMember', description: 'Membro da organização' }
        ];
        this.userStatus = [
            { value: 'active', description: 'Ativo' },
            { value: 'inactive', description: 'Inativo' },
            { value: 'deleted', description: 'Excluído' }
        ];
    }
    TeamDetailsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.spinner.show();
        this.route.paramMap.subscribe(function (params) {
            _this.teamId = params.get('teamId');
            _this.refresh();
        });
    };
    TeamDetailsComponent.prototype.refresh = function () {
        var _this = this;
        this.service.findTeamById(this.teamId).subscribe(function (data) {
            var result = Object(data);
            _this.team._id = result.team._id || '';
            _this.team._rev = result.team._rev;
            _this.team.name = result.team.name || '';
            _this.team.projectId = result.team.projectId || '';
            _this.team.members = result.team.members || [];
            _this.team.status = result.team.status || 'active';
            _this.service.findProjectById(_this.team.projectId).subscribe(function (data2) {
                var proj = Object(data2);
                _this.service.findOrganizationById(proj.project.organizationId).subscribe(function (data3) {
                    var org = Object(data3);
                    _this.organizationUsers = org.users;
                    _this.filterUsersNotInTeam();
                    _this.spinner.hide();
                }, function (error) {
                    _this.router.navigate(['home']);
                });
            }, function (error) {
                _this.router.navigate(['home']);
            });
        }, function (error) {
            _this.router.navigate(['home']);
        });
    };
    TeamDetailsComponent.prototype.editTeamModal = function () {
        $('.modal').modal();
        $('.deleteOrganization').modal('open');
    };
    TeamDetailsComponent.prototype.updateTeam = function (teamName) {
        var _this = this;
        this.spinner.show();
        var t = {
            _id: this.teamId,
            _rev: this.team._rev,
            name: teamName,
            projectId: this.team.projectId,
            members: this.team.members,
            status: this.team.status
        };
        this.service.updateTeam(this.teamId, t).subscribe(function (data) {
            _this.refresh();
        }, function (error) {
            _this.router.navigate(['home']);
        });
    };
    TeamDetailsComponent.prototype.filterUsersNotInTeam = function () {
        var users = [];
        this.team.members.forEach(function teste(u) {
            users.push(u.email);
        });
        this.userList = this.organizationUsers.filter(function (user) { return !users.includes(user.email); });
    };
    TeamDetailsComponent.prototype.addMemberModal = function () {
        console.log(this.userList);
        $('.modal').modal();
        $('select').formSelect();
        $('.addMember').modal('open');
    };
    TeamDetailsComponent.prototype.filterUserProfile = function (profile) {
        try {
            return this.userProfiles.find(function (userProfile) { return userProfile.value === profile; }).description;
        }
        catch (_a) {
            return profile;
        }
    };
    TeamDetailsComponent.prototype.findName = function (email) {
        try {
            return this.organizationUsers.find(function (user) { return user.email === email; }).name;
        }
        catch (_a) {
            return '';
        }
    };
    TeamDetailsComponent.prototype.filterUserStatus = function (status) {
        try {
            return this.userStatus.find(function (st) { return st.value === status; }).description;
        }
        catch (_a) {
            return status;
        }
    };
    TeamDetailsComponent.prototype.addUser = function (userEmail) {
        this.spinner.show();
        var user = {
            email: userEmail,
            status: 'active'
        };
        this.team.members.push(user);
        this.updateTeam(this.team.name);
    };
    TeamDetailsComponent.prototype.deleteUserModal = function (userName, userEmail) {
        this.username = userName;
        this.email = userEmail;
        $('.modal').modal();
        $('.deleteUser').modal('open');
    };
    TeamDetailsComponent.prototype.deleteUser = function (userEmail) {
        this.spinner.show();
        var tempUser = this.team.members.find(function (user) { return user.email === userEmail; });
        var index = this.team.members.indexOf(tempUser);
        tempUser.status = 'deleted';
        this.team.members.splice(index, 1);
        this.team.members.push(tempUser);
        this.updateTeam(this.team.name);
    };
    TeamDetailsComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-team-details',
            template: __webpack_require__(/*! ./team-details.component.html */ "./src/app/team/team-details/team-details.component.html"),
            styles: [__webpack_require__(/*! ./team-details.component.css */ "./src/app/team/team-details/team-details.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"],
            src_app_services_service__WEBPACK_IMPORTED_MODULE_3__["ServicesService"],
            ngx_spinner__WEBPACK_IMPORTED_MODULE_4__["NgxSpinnerService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]])
    ], TeamDetailsComponent);
    return TeamDetailsComponent;
}());



/***/ }),

/***/ "./src/app/team/team.component.css":
/*!*****************************************!*\
  !*** ./src/app/team/team.component.css ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3RlYW0vdGVhbS5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/team/team.component.html":
/*!******************************************!*\
  !*** ./src/app/team/team.component.html ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"body\">\n\n  <!--Header-->\n  <app-header></app-header>\n\n  <!-- Spinner -->\n  <ngx-spinner bdColor=\"rgba(0,0,0,0.8)\" size=\"large\" color=\"#00a7f8\" type=\"ball-spin-clockwise\"></ngx-spinner>\n\n  <!-- Main content -->\n  <main>\n    <div class=\"container\">\n      \n      <!-- Title -->\n      <div class=\"row\">\n        <div class=\"col s12\">\n          <h3 class=\"header\">Equipes</h3>\n          <!--<p class=\"caption\">\n              \n          </p>-->\n        </div>\n      </div>\n\n      <div class=\"row\" *ngIf=\"teamsCount<=0\">\n        <div class=\"col s12 center\">\n          <h5 class=\"header\">Você não está cadastrado em nenhuma equipe!</h5>\n          <p class=\"caption\">\n            Crie uma equipe clicando no botão \"Nova equipe\" ou solicite para o gestor da organização ou gestor de equipe que você deseja participar incluir você como membro da organização.\n          </p>\n        </div>\n      </div>\n\n      <!-- Cards of teams \n      <div class=\"row\" *ngIf=\"projectsList.length>0\">\n        <div class=\"col s12 m6 l6 xl4\" *ngFor=\"let team of teamsList\">\n          <div class=\"card small darken-1\">\n            <div class=\"card-content\">\n              <span class=\"card-title\">{{ team.name }}</span>\n              <p>\n                Projeto {{ findProjectName(team.projectId) }}\n                <br>\n                {{ team.members.length }} {{ team.members.length>1 ? 'pessoas' : 'pessoa' }}\n              </p>\n            </div>\n            <div class=\"card-action light-blue\">\n              <a *ngIf=\"userProfile==='organizationManager' || userProfile==='projectManager' || userProfile==='teamManager'\" style=\"color: white;\" [routerLink]=\"['/team', team._id]\" title=\"Editar equipe {{ team.name }}\"><i class=\"material-icons left\">edit</i></a>\n              <a *ngIf=\"userProfile==='organizationManager' || userProfile==='projectManager' || userProfile==='teamManager'\" class=\"modal-trigger\" style=\"color: white;\" href=\"#deleteTeam\" title=\"Excluir equipe {{ team.name }}\" (click)=\"deleteTeamModal(team._id)\"><i class=\"material-icons left\">delete</i></a>\n            </div>\n          </div>\n        </div>\n      </div>-->\n\n      <!-- Teams -->\n      <div class=\"row\" *ngIf=\"teamsList.length>0\">\n        <div class=\"col s12\">\n          <table class=\"highlight\">\n            <thead>\n              <tr>\n                <th>Nome</th>\n                <th>Projeto</th>\n                <th>Membros</th>\n                <th *ngIf=\"userProfile==='organizationManager' || userProfile==='projectManager' || userProfile==='teamManager'\">Opções</th>\n              </tr>\n            </thead>\n            <tbody>\n              <tr *ngFor=\"let team of teamsList\">\n                <td>{{ team.name }}</td>\n                <td>{{ findProjectName(team.projectId) }}</td>\n                <td>{{ team.members.length }}</td>\n                <td *ngIf=\"userProfile==='organizationManager' || userProfile==='projectManager' || userProfile==='teamManager'\">\n                  <a (click)=\"editTeamModal(team._id)\" style=\"cursor: pointer;\" title=\"Editar equipe\"><i class=\"material-icons left\">edit</i></a>\n                  <a (click)=\"editMembersModal(team._id)\" style=\"cursor: pointer;\" title=\"Editar membros da equipe\"><i class=\"material-icons left\">people</i></a>\n                  <!--<a [routerLink]=\"['/team', team._id]\" title=\"Editar membros da equipe\"><i class=\"material-icons left\">delete</i></a>-->\n                  <a class=\"modal-trigger\" href=\"#deleteTeam\" title=\"Excluir equipe\" (click)=\"deleteTeamModal(team._id)\"><i class=\"material-icons left\">delete</i></a>\n                </td>\n              </tr>\n            </tbody>\n          </table>\n        </div>\n      </div>\n\n      <!-- Buttons -->\n      <div class=\"row\" *ngIf=\"userProfile==='organizationManager' || userProfile==='projectManager' || userProfile==='teamManager'\">\n        <div class=\"col s12 center\">\n          <a class=\"waves-effect waves-light light-blue btn-large modal-trigger\" href=\"#addTeam\" (click)=\"addTeamModal()\"><i class=\"material-icons left\">add</i>Nova equipe</a>\n        </div>\n      </div>\n\n      <!-- User without access -->\n      <div class=\"row\" *ngIf=\"userProfile!='organizationManager' && userProfile!='projectManager' && userProfile!='teamManager'\">\n        <div class=\"col s12 center\">\n          <p class=\"caption\">Você não possui acesso para adicionar, alterar ou excluir equipes na organização {{ organizationName }}.</p>\n        </div>\n      </div>\n\n      <!-- Modal for new team -->\n      <div id=\"addTeam\" class=\"modal modal-fixed-footer addTeam\">\n        <div class=\"modal-content\">\n          <h4>Nova equipe</h4>\n          <p>\n            Informe o nome da equipe.\n          </p>\n          <div class=\"row\">\n            <form class=\"col s12\">\n              <div class=\"row\">\n                <div class=\"input-field col s12 m12 l6\">\n                  <i class=\"material-icons prefix\">description</i>\n                  <input #tName id=\"tName\" type=\"text\" class=\"validate\">\n                  <label for=\"tName\">Nome</label>\n                </div>\n              </div>\n              <div class=\"row\">\n                <div class=\"input-field col s12 m12 l6\">\n                  <i class=\"material-icons prefix\">folder</i>\n                  <label for=\"tProjectId\" class=\"active\">Projeto</label>\n                  <select #tProjectId id=\"tProjectId\" class=\"validate\">\n                      <option *ngFor='let project of projectsList' [value]=\"project._id\">\n                        {{ project.name }}\n                      </option>\n                  </select>\n                </div>\n              </div>\n            </form>\n          </div>\n        </div>\n        <div class=\"modal-footer\">\n          <a class=\"modal-close waves-effect waves-green btn-flat\">Cancelar</a>\n          <a class=\"modal-close waves-effect waves-light light-blue btn\" (click)=\"addTeam(tName.value, tProjectId.value)\">Salvar</a>\n        </div>\n      </div>\n\n\n\n\n      <!-- Modal to edit team -->\n      <div id=\"editTeam\" class=\"modal modal-fixed-footer editTeam\">\n        <div class=\"modal-content\">\n          <h4>Editar equipe</h4>\n          <p>\n            Edite as informações da equipe. As alterações da equipe serão válidas apenas nas novas aplicações.\n          </p>\n          <div class=\"row\">\n            <form class=\"col s12\">\n              <div class=\"row\">\n                <div class=\"input-field col s12 m12 l6\">\n                  <i class=\"material-icons prefix\">description</i>\n                  <input #editName id=\"editName\" type=\"text\" class=\"validate\">\n                  <label for=\"editName\" class=\"active\">Nome</label>\n                </div>\n              </div>\n              <div class=\"row\">\n                <div class=\"input-field col s12 m12 l6\">\n                  <i class=\"material-icons prefix\">folder</i>\n                  <label for=\"editProject\" class=\"active\">Projeto</label>\n                  <select #editProject id=\"editProject\" class=\"validate\">\n                      <option *ngFor='let project of projectsList' [value]=\"project._id\">\n                        {{ project.name }}\n                      </option>\n                  </select>\n                </div>\n              </div>\n            </form>\n          </div>\n        </div>\n        <div class=\"modal-footer\">\n          <a class=\"modal-close waves-effect waves-green btn-flat\">Cancelar</a>\n          <a class=\"modal-close waves-effect waves-light light-blue btn\" (click)=\"editTeam(editName.value, editProject.value)\">Salvar</a>\n        </div>\n      </div>\n\n\n\n\n\n      <!-- Modal to edit members of a team -->\n      <div id=\"editMembers\" class=\"modal modal-fixed-footer editMembers\">\n        <div class=\"modal-content\">\n          <h4>Editar membros da equipe</h4>\n          <p>\n            Adicione ou remova os membros da equipe. As alterações serão válidas apenas nas novas aplicações.\n          </p>\n          <div class=\"row\">\n            <form class=\"col s12\">\n              <div class=\"row\" *ngIf=\"membersNotInTeam.length>0\">\n                <div class=\"input-field col s12\">\n                  <i class=\"material-icons prefix\">description</i>\n                  <label for=\"editProject\" class=\"active\">Pessoas da organização</label>\n                  <select #addMember id=\"addMember\" class=\"validate\">\n                      <option *ngFor='let user of membersNotInTeam' [value]=\"user.email\">\n                        {{ findName(user.email) }} - {{ user.email }}\n                      </option>\n                  </select>\n                </div>\n                <div class=\"col s12\">\n                  <a class=\"waves-effect waves-light light-blue btn\" (click)=\"addMemberToTeam(addMember.value)\">Adicionar</a>\n                </div>\n              </div>\n              <div class=\"row\" *ngIf=\"membersNotInTeam.length<=0\">\n                <div class=\"input-field col s12\">\n                  <p>Todas as pessoas da organização já estão nesta equipe!</p>\n                </div>\n              </div>\n              <table class=\"highlight\">\n                <thead>\n                  <tr>\n                    <th>Nome</th>\n                    <th>E-mail</th>\n                    <th>Status</th>\n                    <th *ngIf=\"userProfile==='organizationManager' || userProfile==='projectManager' || userProfile==='teamManager'\">Opções</th>\n                  </tr>\n                </thead>\n                <tbody>\n                  <tr *ngFor=\"let member of temporaryTeamMembers\">\n                    <td>{{ findName(member.email) }}</td>\n                    <td>{{ member.email }}</td>\n                    <td>{{ member.status }}</td>\n                    <td *ngIf=\"userProfile==='organizationManager' || userProfile==='projectManager' || userProfile==='teamManager'\">\n                      <a (click)=\"deleteMemberOfTeam(member.email)\" style=\"cursor: pointer;\" title=\"Excluir membro\"><i class=\"material-icons left\">delete</i></a>\n                    </td>\n                  </tr>\n                </tbody>\n              </table>\n            </form>\n          </div>\n        </div>\n        <div class=\"modal-footer\">\n          <a class=\"modal-close waves-effect waves-green btn-flat\">Cancelar</a>\n          <a class=\"modal-close waves-effect waves-light light-blue btn\" (click)=\"editTeamMembers()\">Salvar</a>\n        </div>\n      </div>\n\n\n\n\n      <!-- Modal to delete team -->\n      <div id=\"deleteTeam\" class=\"modal modal-fixed-footer deleteTeam\">\n        <div class=\"modal-content\">\n          <h4>Excluir equipe <b>{{ teamName }}</b></h4>\n          <p>\n            Você tem certeza que deseja excluir a equipe?\n            Essa ação não poderá ser desfeita!\n          </p>\n        </div>\n        <div class=\"modal-footer\">\n          <a (click)=\"teamId=''\" class=\"modal-close waves-effect waves-green btn-flat\">Cancelar</a>\n          <a class=\"modal-close waves-effect waves-light red btn\" (click)=\"deleteTeam(teamId)\">Excluir</a>\n        </div>\n      </div>\n\n    </div>\n  </main>\n\n  <!-- Footer -->\n  <app-footer></app-footer>\n\n</div>\n"

/***/ }),

/***/ "./src/app/team/team.component.ts":
/*!****************************************!*\
  !*** ./src/app/team/team.component.ts ***!
  \****************************************/
/*! exports provided: TeamComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TeamComponent", function() { return TeamComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services.service */ "./src/app/services.service.ts");
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-spinner */ "./node_modules/ngx-spinner/fesm5/ngx-spinner.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var angularx_social_login__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! angularx-social-login */ "./node_modules/angularx-social-login/angularx-social-login.es5.js");
/* harmony import */ var ngx_cookie_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ngx-cookie-service */ "./node_modules/ngx-cookie-service/ngx-cookie-service.es5.js");







var TeamComponent = /** @class */ (function () {
    function TeamComponent(service, spinner, authService, cookie, router) {
        this.service = service;
        this.spinner = spinner;
        this.authService = authService;
        this.cookie = cookie;
        this.router = router;
        this.teamsCount = 0;
        this.teamsList = [];
        this.teamId = '';
        this.teamName = '';
        this.teamProjectId = '';
        this.projectsCount = 0;
        this.projectsList = [];
        this.organizationId = '';
        this.organizationName = '';
        this.organization = {
            users: []
        };
        this.userEmail = '';
        this.userProfile = '';
        this.team = {
            _id: '',
            _rev: '',
            name: '',
            projectId: '',
            projectName: '',
            status: '',
            members: [],
        };
        this.membersNotInTeam = [];
        this.temporaryTeamMembers = [];
    }
    TeamComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.spinner.show();
        this.organizationId = this.cookie.get('ORGANIZATIONID');
        this.organizationName = this.cookie.get('ORGANIZATIONNAME');
        this.userProfile = this.cookie.get('ORGANIZATIONMEMBERPROFILE');
        this.authService.authState.subscribe(function (user) {
            _this.userEmail = user.email;
            _this.getTeams();
        });
        $('select').formSelect();
        $('.modal').modal();
    };
    TeamComponent.prototype.getTeams = function () {
        var _this = this;
        this.teamsList = [];
        this.projectsList = [];
        this.service.findTeamsFromUser().subscribe(function (data) {
            var projs = Object(data).projects;
            console.log(projs);
            projs.forEach(function (p) {
                if (p.organizationId === _this.organizationId) {
                    _this.projectsList.push(p);
                }
            });
            var tList = Object(data).teams;
            tList.forEach(function (t) {
                if (_this.projectsList.some(function (p) { return p._id === t.projectId; })) {
                    _this.teamsList.push(t);
                }
            });
            _this.teamsCount = _this.teamsList.length;
            _this.projectsCount = _this.projectsList.length;
            _this.teamsList.sort(_this.compare);
            _this.organization.users = Object(data).organizations.find(function (org) { return org._id === _this.organizationId; }).users;
            _this.spinner.hide();
        }, function (error) {
            _this.router.navigate(['home']);
        });
    };
    TeamComponent.prototype.findName = function (email) {
        try {
            if (email) {
                return this.organization.users.find(function (u) { return u.email === email; }).name || '';
            }
            else {
                return '';
            }
        }
        catch (_a) {
            return email;
        }
    };
    TeamComponent.prototype.findProjectName = function (projectId) {
        var project = this.projectsList.find(function (p) { return p._id === projectId; });
        return project.name || '';
    };
    TeamComponent.prototype.deleteTeamModal = function (teamId) {
        var team = this.teamsList.find(function (t) { return t._id === teamId; });
        this.teamId = teamId;
        this.teamName = team.name;
        $('.modal').modal();
        $('.deleteTeam').modal('open');
    };
    TeamComponent.prototype.deleteTeam = function (teamId) {
        var _this = this;
        this.spinner.show();
        this.service.deleteTeam(teamId).subscribe(function (data) {
            _this.getTeams();
        }, function (error) {
            _this.router.navigate(['home']);
        });
    };
    TeamComponent.prototype.addTeamModal = function () {
        this.teamId = '';
        this.teamName = '';
        $('.modal').modal();
        $('select').formSelect();
        $('.addTeam').modal('open');
    };
    TeamComponent.prototype.addTeam = function (name, projectId) {
        var _this = this;
        if (name === '') {
            M.toast({ html: 'Equipe inválida' });
        }
        else {
            this.spinner.show();
            this.service.addTeam(name, projectId).subscribe(function (data) {
                _this.spinner.hide();
                _this.getTeams();
                M.toast({ html: 'Equipe criada com sucesso' });
            }, function (error) {
                _this.router.navigate(['home']);
            });
        }
    };
    TeamComponent.prototype.editTeamModal = function (teamId) {
        this.teamId = teamId;
        this.team = this.teamsList.find(function (team) { return team._id === teamId; });
        $('#editName').val(this.team.name);
        $('#editProject').val(this.team.projectId);
        M.updateTextFields();
        $('.modal').modal();
        $('select').formSelect();
        $('.editTeam').modal('open');
    };
    TeamComponent.prototype.compare = function (a, b) {
        var nameA = a.name.toUpperCase();
        var nameB = b.name.toUpperCase();
        var comparison = 0;
        if (nameA > nameB) {
            comparison = 1;
        }
        else if (nameA < nameB) {
            comparison = -1;
        }
        return comparison;
    };
    TeamComponent.prototype.editTeam = function (name, projectId) {
        var _this = this;
        if (this.team.name !== name || this.team.projectId !== projectId) {
            if (name !== '') {
                this.spinner.show();
                this.team.name = name;
                this.team.projectId = projectId;
                this.team.projectName = this.projectsList.find(function (p) { return p._id === projectId; }).name;
                this.service.updateTeam(this.teamId, this.team).subscribe(function (data) {
                    var result = Object(data);
                    if (result.status) {
                        var rev = result.status.rev;
                        _this.team._rev = rev;
                        _this.teamsList = _this.teamsList.filter(function (t) { return t._id !== _this.teamId; });
                        _this.teamsList.push(_this.team);
                        _this.teamsList.sort(_this.compare);
                        _this.spinner.hide();
                        M.toast({ html: 'Equipe alterada com sucesso!' });
                    }
                    else {
                        _this.spinner.hide();
                        M.toast({ html: 'Ocorreu algum erro ao editar a equipe. Por favor, tente novamente!' });
                    }
                }, function (error) {
                    M.toast({ html: 'Ocorreu algum erro ao editar a equipe. Por favor, tente novamente!' });
                });
            }
            else {
                M.toast({ html: 'Favor preencher todos os campos!' });
            }
        }
        else {
            M.toast({ html: 'Equipe alterada com sucesso!' });
        }
    };
    TeamComponent.prototype.initializeComponents = function () {
        setTimeout(this.initializeComponents, 200);
        $('select').formSelect();
    };
    TeamComponent.prototype.addMemberToTeam = function (email) {
        this.temporaryTeamMembers.push(this.organization.users.find(function (user) { return user.email === email; }));
        this.checkMembersNotInTeam(this.temporaryTeamMembers);
        $('select').formSelect();
        M.updateTextFields();
        this.initializeComponents();
    };
    TeamComponent.prototype.deleteMemberOfTeam = function (email) {
        console.log(email);
        this.temporaryTeamMembers = this.temporaryTeamMembers.filter(function (user) { return user.email !== email; });
        this.checkMembersNotInTeam(this.temporaryTeamMembers);
        $('select').formSelect();
        M.updateTextFields();
        this.initializeComponents();
    };
    TeamComponent.prototype.checkMembersNotInTeam = function (teamMembers) {
        var _this = this;
        this.membersNotInTeam = [];
        this.organization.users.forEach(function (user) {
            if (!teamMembers.find(function (member) { return member.email === user.email; })) {
                _this.membersNotInTeam.push(user);
            }
        });
    };
    TeamComponent.prototype.editTeamMembers = function () {
        var _this = this;
        console.log(this.temporaryTeamMembers);
        if (this.temporaryTeamMembers.length > 0) {
            this.spinner.show();
            this.team.members = this.temporaryTeamMembers;
            this.service.updateTeam(this.teamId, this.team).subscribe(function (data) {
                _this.temporaryTeamMembers = [];
                var result = Object(data);
                if (result.status) {
                    var rev = result.status.rev;
                    _this.team._rev = rev;
                    _this.teamsList = _this.teamsList.filter(function (t) { return t._id !== _this.teamId; });
                    _this.teamsList.push(_this.team);
                    _this.teamsList.sort(_this.compare);
                    _this.spinner.hide();
                    M.toast({ html: 'Equipe alterada com sucesso!' });
                }
                else {
                    _this.spinner.hide();
                    M.toast({ html: 'Ocorreu algum erro ao editar a equipe. Por favor, tente novamente!' });
                }
            }, function (error) {
                M.toast({ html: 'Ocorreu algum erro ao editar a equipe. Por favor, tente novamente!' });
            });
        }
        else {
            M.toast({ html: 'A equipe deve ter pelo menos um membro!' });
        }
    };
    TeamComponent.prototype.editMembersModal = function (teamId) {
        this.temporaryTeamMembers = [];
        this.teamId = teamId;
        this.team = this.teamsList.find(function (team) { return team._id === teamId; });
        this.temporaryTeamMembers = JSON.parse(JSON.stringify(this.team.members));
        this.checkMembersNotInTeam(this.temporaryTeamMembers);
        $('select').formSelect();
        M.updateTextFields();
        $('.modal').modal();
        $('.editMembers').modal('open');
        this.initializeComponents();
    };
    TeamComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-team',
            template: __webpack_require__(/*! ./team.component.html */ "./src/app/team/team.component.html"),
            styles: [__webpack_require__(/*! ./team.component.css */ "./src/app/team/team.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_services_service__WEBPACK_IMPORTED_MODULE_2__["ServicesService"],
            ngx_spinner__WEBPACK_IMPORTED_MODULE_3__["NgxSpinnerService"],
            angularx_social_login__WEBPACK_IMPORTED_MODULE_5__["AuthService"],
            ngx_cookie_service__WEBPACK_IMPORTED_MODULE_6__["CookieService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"]])
    ], TeamComponent);
    return TeamComponent;
}());



/***/ }),

/***/ "./src/app/user/user.component.css":
/*!*****************************************!*\
  !*** ./src/app/user/user.component.css ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3VzZXIvdXNlci5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/user/user.component.html":
/*!******************************************!*\
  !*** ./src/app/user/user.component.html ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"wrapper\" style=\"display: flex;position: absolute;top: 0;left: 0;height: 100%;width: 100%;\">\n    <div class=\"row valign-wrapper\" style=\"margin: 0 auto;\">\n        <div class=\"col s12 m6 offset-m3\">\n          <div class=\"card\">\n            <div class=\"card-content\">\n              <span class=\"card-title center\"><h2>PSAS</h2></span>\n              <h5 class=\"center\">Entre com sua conta de redes sociais</h5>\n              <p class=\"center\" *ngIf=\"authorizationError\" style=\"color: red\">\n                Ocorreu algum erro :(\n                <br>\n                Por favor, tente novamente :)\n              </p>\n              <br>\n              <div class=\"row center\">\n                  <a class=\"waves-effect waves-light btn-large red\" (click)=\"signInWithGoogle()\" style=\"width: 280px\"><i class=\"fab fa-google left\"></i>Google</a>\n              </div>\n              <!-- <div class=\"row center\">\n                  <a class=\"waves-effect waves-light btn-large disabled\" style=\"width: 280px\"><i class=\"fab fa-apple left\"></i>Apple</a>\n              </div> -->\n              <!-- <div class=\"row center\">\n                  <a class=\"waves-effect waves-light btn-large disabled\" style=\"width: 280px\"><i class=\"fab fa-linkedin left\"></i>LinkedIn</a>\n              </div> -->\n              <!-- <div class=\"row center\">\n                  <a class=\"waves-effect waves-light btn-large blue\" (click)=\"signInWithFB()\" style=\"width: 280px\"><i class=\"fab fa-facebook left\"></i>Facebook</a>\n              </div> -->\n              <div class=\"row center\">\n                  <a class=\"waves-effect waves-teal btn-flat\" routerLink=\"/home\">Cancelar</a>\n                </div>\n              <p>#NoPasswords. Não queremos que você fique criando novas contas em cada aplicativo que você acessa. Utiliza sua conta de redes sociais para se autenticar no PSAS.</p>\n            </div>\n          </div>\n        </div>\n  </div>\n</div>\n\n"

/***/ }),

/***/ "./src/app/user/user.component.ts":
/*!****************************************!*\
  !*** ./src/app/user/user.component.ts ***!
  \****************************************/
/*! exports provided: UserComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserComponent", function() { return UserComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var angularx_social_login__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! angularx-social-login */ "./node_modules/angularx-social-login/angularx-social-login.es5.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");





var UserComponent = /** @class */ (function () {
    function UserComponent(authService, router) {
        this.authService = authService;
        this.router = router;
        this.env = _environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"];
    }
    UserComponent.prototype.signInWithGoogle = function () {
        var _this = this;
        this.authService.signIn(angularx_social_login__WEBPACK_IMPORTED_MODULE_3__["GoogleLoginProvider"].PROVIDER_ID).then(function (error) {
            // console.log(error);
            if (error) {
                _this.router.navigate(['organization']);
            }
            else {
                console.log('An error has occurred while using Google Authorization Service.');
                _this.authorizationError = true;
            }
        });
    };
    // signInWithFB(): void {
    //   this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then((error) =>{
    //     if (error){
    //       this.router.navigate(['organization'])
    //     } else{
    //       console.log('An error has occured while using Facebook Authorization Service');
    //       this.authorizationError = true;
    //     }
    //   });
    // }
    UserComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.authService.authState.subscribe(function (user) {
            _this.user = user;
            console.log(user);
        });
    };
    UserComponent.prototype.signOut = function () {
        this.authService.signOut();
    };
    UserComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-user',
            template: __webpack_require__(/*! ./user.component.html */ "./src/app/user/user.component.html"),
            styles: [__webpack_require__(/*! ./user.component.css */ "./src/app/user/user.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [angularx_social_login__WEBPACK_IMPORTED_MODULE_3__["AuthService"], _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"]])
    ], UserComponent);
    return UserComponent;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false,
    isLogged: false,
    email: '',
    token: '',
    firstname: ''
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.error(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /home/demaman/Documents/TCC/psas/src/main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map