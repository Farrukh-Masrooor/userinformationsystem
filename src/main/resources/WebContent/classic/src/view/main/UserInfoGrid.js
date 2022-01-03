/**
 * 
 */

Ext.define('MyApp.view.main.UserInfoGrid',{
	
	extend:'Ext.grid.Panel',
	xtype:'mygrid',
	title: 'User Info',
	height: 600,
	scrollable:true,
    id:'mainGridID',

    store: {
        type: 'userInfoStore'
    },
    requires: [
            'Ext.plugin.Viewport',
            'Ext.window.MessageBox',
        ],

    tbar: [{
            text: 'Add User',
            tooltip: 'Add a new User',
            listeners:{
                click:function(){

                //alert("cllick");
                //this.up('app-main').destroy();
                    Ext.create({
                        xtype:'addUserWindow'
                    });
                }
            }

        }

        ],
	columns:[
		{
			
			dataIndex: 'fName',
			text: 'First Name',
			flex:1,
			editor: {
                   		     xtype: 'textfield',
                     	     allowBlank: false,

                 			},

		},
		{
			
			dataIndex: 'lName',
			text: 'Last Name',
			editor: {
       		     xtype: 'textfield',
         	     allowBlank: false,

     			},
			flex:1,

		},

		{

            dataIndex: 'city',
            text: 'City',
            flex:1,
            editor: {
                   		     xtype: 'textfield',
                     	     allowBlank: false,

                 			},

        },
        {

            dataIndex: 'mobileNumber',
            text: 'Mobile Number',
            flex:1,
            editor: {
                   		     xtype: 'textfield',
                     	     allowBlank: false,
                             maxLength: 10,
                             maskRe:/[0-9.]/,
                             enforceMaxLength: true,
                             validator: function(value) {
                                                 return value.length==10 || 'please eneter a valid mobile number';
                                             },
                             allowBlank: false,
                 			},
        },
        {
            text: 'Date of birth',
            xtype:'datecolumn',
            dataIndex: 'dob',
            flex:1,
            editor: {
                   		     xtype: 'datefield',
                             name: 'dob',
                             format: "Y-m-d",

                             allowBlank: false,
                             maxValue: new Date()

                 			},
        },
        {
                    xtype:'actioncolumn',
                    text:'delete user',
                    width:100,

                    items: [{
                        iconCls: 'x-fa fa-cog',
                        tooltip: 'delete',
                        handler: function(grid, rowIndex, colIndex,item,e , record) {
                            var me=this,
                            userId= record.data.userId;

                            Ext.Ajax.request({
                                scope:this,
                                method  : 'DELETE',
                                url:'/user',
                                params: {
                                        "userId" : userId
                                    },
                                success: function(record,res){
                                    var m=Ext.ComponentQuery.query('#mainGridID')[0];
                                        m.getStore().reload();
                                },
                                failure: function(record,res){

                                }

                            });

                        }
                    },]
                }
	],


        plugins: {

        		rowediting: {
                     clicksToMoveEditor: 1,
                     autoCancel: false
                 },
        		gridfilters: true
             },

         listeners: {
            cancelEdit: function(rowEditing, context) {
                // your stuff will go here
            },
            edit: function(editor, e) {
                var data=e.record.data;
                delete data.id;
	    	Ext.Date.format(data.dob,"Y-m-d");
                Ext.Ajax.request(
                {
                    scope:this,
                    method  : 'PUT',
                    jsonData: data,
                    url:'/user',
                    headers : {
                        "Content-Type":"application/json"
                    },
                    success: function(){
                        alert("suuccess");

                    },
                    failure: function(){
                        alert("failed");
                    }
                }
                );
            }
        }



});
