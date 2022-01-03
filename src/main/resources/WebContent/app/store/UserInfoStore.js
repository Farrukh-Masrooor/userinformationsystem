/**
 * 
 */

Ext.define('MyApp.store.UserInfoStore',{
	extend: 'Ext.data.Store',

	alias: 'store.userInfoStore',

	fields: [
                    {name: 'fName', type: 'string'},
                    {name: 'lName', type: 'string'},
                    {name: 'city', type: 'string'},
                    {name: 'mobileNumber', type: 'string'},
                    {name: 'dob', type: 'date'},
                    ],

	proxy: {
                type: 'ajax',
                url:'/user',
                reader: {
                    type: 'json',
					rootProperty: ''
                }
            },
            autoLoad: true
});
