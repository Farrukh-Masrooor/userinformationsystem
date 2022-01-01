Ext.define('MyApp.view.main.AddUser',{

	extend:'Ext.window.Window',
    title: 'Add a new User',
    id: 'form',
    xtype: 'addUserWindow',
    frame:true,
    height: 300,
    width: 400,
    autoShow:true,
    layout:'anchor',
    scrollable:true,
    modal:true,


    items:[

		{
        xtype:'form',
        id:'formId22',
        scrollable:true,
        padding:10,
        items:[
				{
                xtype:'fieldcontainer',
                layout:'vbox',
                itemId:'fc1',
                defaultType: 'textfield',
                items:[
                        {
                        xtype:'fieldcontainer',
                        layout:'vbox',
                        itemId:'fc12',
                        defaultType: 'textfield',
                        items:[

                                {
                                    xtype: 'numberfield',
                                    name: 'userId',
                                    hidden:true,

                                },
                        		{
                        			xtpe:'textfield',
                        			name: 'fName',
                        		    fieldLabel: 'First Name',
                                    allowBlank: false,

                        		},
                        		{
                        			xtype: 'textfield',
                        			name: 'lName',
                                    allowBlank: false,
                        		    fieldLabel: 'Last Name',

                        		},
                        		{
                                    xtype: 'textfield',
                                    name: 'city',
                                    allowBlank: false,
                                    fieldLabel: 'City',

                                },

                                {
                                    xtype: 'textfield',
                                    name: 'mobileNumber',
                                    maxLength: 10,
                                    maskRe:/[0-9.]/,
                                    enforceMaxLength: true,
                                    fieldLabel: 'Mobile Number',
                                    allowBlank: false,

                                },
                                {
                                    xtype: 'datefield',
                                    name: 'dob',
                                    format: "Y-m-d",
                                    fieldLabel: 'Date of Birth',
                                    allowBlank: false,
                                    maxValue: new Date()
                                },


                        ]
                      }
				]
		},






	],
		}],
    buttons:[
            {

            text:'Reset',
            handler:'resetForm',
            id:'resetButton',
            listeners:{
                click: function(){
                    var form= this.up();
                    var s=form.up().down('#formId22').getForm();
                    s.reset();
                }

            }
            },
            {

            text:'Submit',


            listeners:{
                    click: function(){
                    var formWin= this.up(),
                    form=formWin.up().down('#formId22').getForm();
                    if(form.isValid()){

                    data=form.getValues();
                    Ext.Ajax.request(

                            {
                                scope:this,
                                method  : 'POST',
                                jsonData: data,
                                url:'/user',
                                headers : {
                                    "Content-Type":"application/json"
                                },
                                success: function(){
                                    alert("suuccess");
                                    var r=this.up('#form');
                                    r.destroy();
                                    var m=Ext.ComponentQuery.query('#mainGridID')[0];
                                    m.getStore().reload();
                                },
                                failure: function(record,res){
                                    alert("failed "+record.responseText);
                                }
                            }
                        );}
        			    }
        			}
        		}
        	]
    });