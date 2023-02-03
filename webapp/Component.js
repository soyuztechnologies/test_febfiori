sap.ui.define([
    'sap/ui/core/UIComponent'
], function(UIComponent) {
    'use strict';
    return UIComponent.extend("com.ats.hr.prm.Component",{
        metadata: {
            manifest: "json"
        },
        init: function(){
            //Here we will call the parent class contructor
            //is the standard SAP UI5 module
            UIComponent.prototype.init.apply(this);

            //get the router object from parent class
            var oRouter = this.getRouter();
            //The router will scan the manifest file for configuration
            oRouter.initialize();
        },
        // createContent: function(){
        //     var oRootView = new sap.ui.view({
        //         viewName: "com.ats.hr.prm.view.App",
        //         type: "XML",
        //         id: "idAppView"
        //     });

        //     //Step 2: Create the view objects of newly added views 
        //     var oView1 = new sap.ui.view({
        //         viewName: "com.ats.hr.prm.view.View1",
        //         type: "XML",
        //         id: "idView1"
        //     });

        //     var oView2 = new sap.ui.view({
        //         viewName: "com.ats.hr.prm.view.View2",
        //         type: "XML",
        //         id: "idView2"
        //     });

        //     var oEmpty = new sap.ui.view({
        //         viewName: "com.ats.hr.prm.view.Empty",
        //         type: "XML",
        //         id: "idEmpty"
        //     });

        //     //Step 3: Get the object of the container - App Container with id idAppCon
        //     var oAppCon = oRootView.byId("idAppCon");

        //     //Step 4: Add the views inside the app con
        //     oAppCon.addMasterPage(oView1).addDetailPage(oEmpty).addDetailPage(oView2);

        //     return oRootView;
        // },
        destroy: function(){

        }
    });
});