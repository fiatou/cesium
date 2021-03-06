/******
* !! WARNING: This is a generated file !!
*
* PLEASE DO NOT MODIFY DIRECTLY
*
* => Changes should be done on file 'app/config.json'.
******/

angular.module("cesium.config", [])

.constant("csConfig", {
	"cacheTimeMs": 60000,
	"fallbackLanguage": "en",
	"rememberMe": false,
	"showUDHistory": false,
	"timeout": 10000,
	"timeWarningExpireMembership": 5184000,
	"timeWarningExpire": 7776000,
	"useLocalStorage": false,
	"useRelative": false,
	"initPhase": false,
	"expertMode": false,
	"decimalCount": 2,
	"httpsMode": false,
	"helptip": {
		"enable": true,
		"installDocUrl": "https://github.com/duniter/duniter/blob/master/doc/install-a-node.md"
	},
	"node": {
		"host": "g1.duniter.org",
		"port": "443"
	},
	"plugins": {
		"es": {
			"enable": true,
			"askEnable": false,
			"host": "g1.data.duniter.fr",
			"port": "443",
			"notifications": {
				"txSent": true,
				"txReceived": true,
				"certSent": true,
				"certReceived": true
			}
		}
	},
	"version": "0.11.8",
	"build": "2017-03-20T09:13:18.316Z",
	"newIssueUrl": "https://github.com/duniter/cesium/issues/new?labels=bug"
})

;