# Chat code sample for Browser for ConnectyCube platform

This README introduces [ConnectyCube](https://connectycube.com) Chat code sample for Browser

Project contains the following features implemented:

* User authorization
* Chat dialogs creation
* 1-1 messaging
* Group messaging
* Sent/Delivered/Read statuses
* ‘Is typing’ statuses
* File attachments

## Documentation

ConnectyCube JS SDK getting started - [https://developers.connectycube.com/js](https://developers.connectycube.com/js)

ConnectyCube Chat API documentation - [https://developers.connectycube.com/js/messaging](https://developers.connectycube.com/js/messaging)

## Screenshots

TBA

## Build your own Chat app

To make the sample works for your own app, please do the following:

1. Register new account and application at `https://admin.connectycube.com` and then put Application credentials from 'Overview' page into `config.js` file:

    ```javascript
	const CC_CREDENTIALS = {
	    'appId': 0,
	    'authKey': '',
	    'authSecret': ''
	};
    ```

2. At `https://admin.connectycube.com`, create some users in 'Users' module and put them into `config.js` file:

	```javascript
	const CC_USERS = [
        {
          id: 0,
          login: "",
          password: ""
        },
        {
          id: 1,
          login: "",
          password: ""
        },
    ];
	```
3. (Optional) If you are at [Enterprise](https://connectycube.com/pricing/) plan - provide your API server and Chat server endpoints at `config.js` file to point the sample against your own server:

 	```javascript
	const CC_CONFIG = {
        endpoints: {
            api: "",
            chat: ""
        },
        ...
   };
	```
4. Run `index.html` and enjoy!

## Can't build yourself?

Got troubles with building React Native code sample? Just create an issue at [Issues page](https://github.com/ConnectyCube/connectycube-js-samples/issues) - we will create the sample for you. For FREE!
