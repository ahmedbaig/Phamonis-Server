// ConnectyCube application credentials
//
const CC_CREDENTIALS = {
    appId: 1489,
    authKey: 'hMpp29YgT75pq-P',
    authSecret: 'vrFMR5YvpuOMZ8d'
};

const CC_CONFIG = {
    // endpoints: {
    //     api: "",
    //     chat: ""
    // },
    streamManagement: {
        enable: true
    },
    debug: false,
    videocalling: {
        answerTimeInterval: 30,
        dialingTimeInterval: 5,
        disconnectTimeInterval: 35,
        statsReportTimeInterval: 5
    }
};

var MY_USER = ""

const CC_USERS = [ 
    {
        id:"228032",
        login: "faraz",
        full_name: "faraz",
        password: "123123123"
    }, 
    {
        id:"228038",
        login: "ahmedbaig",
        full_name: "ahmedbaig",
        password: "123123123"
    }, 
];

var appConfig = {
    dilogsPerRequers: 15,
    messagesPerRequest: 50,
    usersPerRequest: 15,
    typingTimeout: 3 // 3 seconds
};

var CONSTANTS = {
    DIALOG_TYPES: {
        PRIVATE: 3,
        GROUPCHAT: 2,
        PUBLICCHAT: 1
    },
    ATTACHMENT: {
        TYPE: 'image',
        BODY: '[attachment]',
        MAXSIZE: 2 * 1000000, // set 2 megabytes,
        MAXSIZEMESSAGE: 'Image is too large. Max size is 2 mb.'
    },
    NOTIFICATION_TYPES: {
        NEW_DIALOG: '1',
        UPDATE_DIALOG: '2'
    }
};
