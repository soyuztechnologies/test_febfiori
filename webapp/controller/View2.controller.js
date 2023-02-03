sap.ui.define([
    'com/ats/hr/prm/controller/BaseController',
    'sap/m/MessageBox',
    'sap/m/MessageToast',
    'sap/ui/core/Fragment',
    'sap/ui/model/Filter',
    'sap/ui/model/FilterOperator'
], function(Controller, MessageBox, MessageToast, Fragment, Filter, FilterOperator) {
    'use strict';
    return Controller.extend("com.ats.hr.prm.controller.View2",{
        //This is my global variable to avoid creating fragment again and again
        oSupplierPopup: null,
        oCityPopup: null,
        onInit: function(){
            //alert("Wow, now we have got the App Controller for Fiori Like App");
            //Step 1: get Router object
            this.oRouter = this.getOwnerComponent().getRouter();
            //Step 2: attach route handler which trigger our code everytime route changes
            this.oRouter.getRoute("superman").attachMatched(this.herculis, this);
        },
        herculis: function(oEvent){
            //Step 1: Reconstruction of the path of the fruit
            var sPath = '/' + oEvent.getParameter("arguments").fruitId;
            //Step 2: Bind element
            this.getView().bindElement(sPath,{
                expand: 'To_Supplier'
            });

            setTimeout(function(){
                var map;

                map = new google.maps.Map(document.getElementById("__component0---idView2--map"), {
                    center: { lat: 28.7041, lng: 77.1025 },
                    zoom: 8,
                });
            }, 3000);
            

            //window.initMap = initMap;
        },

        onSupplierItem: function(oEvent){
            
            var oSelectedItem = oEvent.getParameter("listItem");
            var sPath = oSelectedItem.getBindingContextPath();
            console.log(sPath);

        },
        onConfirmPopup: function(oEvent){
            var sId = oEvent.getSource().getId();
            if(sId.indexOf("city") !== -1){
                //Step 1: Get Selected item
                var oSelectedItem = oEvent.getParameter("selectedItem");
                //Step 2: get the label of selected item
                var sText = oSelectedItem.getLabel();
                //Step 3: Set this selected value to field
                this.oField.setValue(sText);
            }else{
                //because of supplier popup
                //Step 1: Get Selected item
                var oSelectedItem = oEvent.getParameter("selectedItem");
                //Step 2: get the label of selected item
                var sText = oSelectedItem.getTitle();
                //Filter our table data based on the selection
                //Step 3: Get table object
                var oTable = this.getView().byId("idSupplierTab");
                //Step 4: Construct filter
                var oFilter = new Filter("name", FilterOperator.EQ, sText);
                //Step 5: Inject filter to table
                oTable.getBinding("items").filter(oFilter);
            }
            
        },
        oField: null,
        onF4Help: function(oEvent){
            this.oField = oEvent.getSource();
            var that = this;
            if(!this.oCityPopup){
                Fragment.load({
                    name: 'com.ats.hr.prm.fragments.popup',
                    id: 'city',
                    controller: this
                }).then(function(oFragment){
                    debugger;
                    that.oCityPopup = oFragment;
                    that.oCityPopup.setTitle("City");
                    that.getView().addDependent(that.oCityPopup);
                    that.oCityPopup.bindAggregation("items",{
                        path: '/cities',
                        template: new sap.m.DisplayListItem({
                            label:'{name}',
                            value: '{famousFor}'
                        })
                    });
                    that.oCityPopup.open();
                });
            }else{
                this.oCityPopup.open();
            }

            //MessageBox.confirm("This functionality is under construction");
        },
        
        onFilter: function(){
            //In the call back / promise, we are not allowed to use
            //global variable 'this', so we create a local variable as
            //a copy of global variable, this local variable is allowed inside
            //calllback and promise to access controller object
            var that = this;
            //Step 1: Create a brand new fragment object
            //Now check if we already create fragment or not before
            if(!this.oSupplierPopup){
                Fragment.load({
                    name: 'com.ats.hr.prm.fragments.popup',
                    id: 'supplier',
                    controller: this
                    //here then is a promise functionwhich is predefined in java script
                }).then((oFragment) => {
                    //this is the callback where we open our fragment
                    that.oSupplierPopup = oFragment;
                    that.oSupplierPopup.setTitle("Choose Supplier(s)");
                    //Allowing the Fragment to access the supplier data
                    that.getView().addDependent(that.oSupplierPopup);
                    that.oSupplierPopup.bindAggregation("items",{
                        path: '/suppliers',
                        template: new sap.m.StandardListItem({
                            icon: 'sap-icon://supplier',
                            title: '{name}',
                            description: '{city}'
                        })
                    });
                    that.oSupplierPopup.open();
                });
            }else{
                this.oSupplierPopup.open();
            }
            //MessageBox.confirm("This functionality is under construction");
        },
        onBack: function(){

            this.getView().getParent().to("idView1");
        },
        onSave: function(){
            MessageBox.confirm("Would you like to save?",{
                title:"Anubhav Confirmation",
                onClose: this.onHandleMessage
            });
        },
        onHandleMessage: function(status){
            console.log(status);
            if(status === "OK"){
                MessageToast.show("Wow, The order has been saved");
            }else{
                MessageBox.error("OOPS!! it was cancelled");
            }
        }
    });
});