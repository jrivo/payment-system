const AccessControl = require('accesscontrol');

let grantsObject = {
    admin: {
        transaction: {
            'create:any': ['*'],
            'read:any': ['*'],
            'update:any': ['*'],
            'delete:any': ['*']
        },
        operation: {
            'create:any': ['*'],
            'read:any': ['*'],
            'update:any': ['*'],
            'delete:any': ['*']
        },
        marchand: {
            'create:any': ['*'],
            'read:any': ['*'],
            'update:any': ['*'],
            'delete:any': ['*']
        },
        user: {
            'create:any': ['*'],
            'read:any': ['*'],
            'update:any': ['*'],
            'delete:any': ['*']
        },
        history: {
            'create:any': ['*'],
            'read:any': ['*'],
            'update:any': ['*'],
            'delete:any': ['*']
        },
        credential: {
            'create:any': ['*'],
            'read:any': ['*'],
            'update:any': ['*'],
            'delete:any': ['*']
        },
    },
    user: {
        transaction: {
            'create:own': ['*', '!_id'],
            'read:own': ['*'],
            'update:own': ['*'],
            'delete:own': ['*']
        },
        operation: {
            'create:own': ['*', '!_id'],
            'read:own': ['*'],
            'update:own': ['*'],
            'delete:own': ['*']
        },
        history: {
            'create:own': ['*', '!_id'],
            'read:own': ['*'],
            'update:own': ['*'],
            'delete:own': ['*']
        },
    }
};

const accessControl = new AccessControl(grantsObject);

module.exports = accessControl;
