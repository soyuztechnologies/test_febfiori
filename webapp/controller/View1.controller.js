sap.ui.define([
    'com/ats/hr/prm/controller/BaseController',
    'sap/m/MessageBox',
    'sap/ui/model/Filter',
    'sap/ui/model/FilterOperator',
    'com/ats/hr/prm/util/formatter'
], function(Controller, MessageBox, Filter, FilterOperator, Formatter) {
    'use strict';
    return Controller.extend("com.ats.hr.prm.controller.View1",{
        formatter: Formatter,
        onInit: function(){
            //alert("Wow, now we have got the App Controller for Fiori Like App");
            this.oRouter = this.getOwnerComponent().getRouter();

        },
        onSelectionChange: function(oEvent){
            //Step 1: which item user selected in our list
            var oSelectedItem = oEvent.getParameter("listItem");
            //Step 2: Get the address of the selected item
            var sPath = oSelectedItem.getBindingContextPath();
            //Step 3: Bind the whole of 2nd view with this path = Element Binding
            //3.1 - Object of the view 2 from parent control
            // var oView2 = this.getView().getParent().getParent().getDetailPage("idView2");
            // //3.2 - perform element binding with view2
            // oView2.bindElement(sPath);

            //Extract the id of selected fruit
            //debugger;
            var sIndex = sPath.split("/")[sPath.split("/").length - 1];

            //Navigate
            this.onNext(sIndex);
        },
        onSearch: function(oEvent){
            //Step 1: Read the value from the UI of what user is looking for
            var sSearchText = oEvent.getParameter("query");
            console.log("User search for fruit name ====> " + sSearchText);
            //Step 2: Construct a filter object - like a IF condition with operand and operator
            var oFilter1 = new Filter("CATEGORY", FilterOperator.Contains, sSearchText);
            var oFilter2 = new Filter("type", FilterOperator.Contains, sSearchText);
            var aFilter = [oFilter1, oFilter2];
            //Construction of OR filter
            var oFilter = new Filter({
                filters: aFilter,
                and: false
            });
            //Step 3: Inject the filter object inside the list binding
            var oList = this.getView().byId("idList");
            oList.getBinding("items").filter(oFilter1);

        },
        onAdd: function(){
            this.oRouter.navTo("add");
        },
        onAddSO: function(){
            this.oRouter.navTo("addSO");
        },
        onNext: function(myFruitSelected){
            // //Navigation is only possible with the help of parent-- Container
            // //Step 1: Get the object of the current view
            // var oView = this.getView();
            // //Step 2: Get the container in which view has been added as a child
            // var oAppCon = oView.getParent().getParent();
            // //Step 3: Use the conatiner to navigate to second view
            // oAppCon.toDetail("idView2");

            //Router is our Turak makto to perform navigation
            this.oRouter.navTo("superman",{
                fruitId: myFruitSelected
            });
        },
        onItemPress: function(){
            MessageBox.information("Wow! thanks for your order");
        },
        onDeleteItem: function(oEvent){
            debugger;
            //Step 1: Find on which item the delete was pressed
            var oItem = oEvent.getParameter("listItem");

            //Step 2: Get the object of the list Control
            var oList = oEvent.getSource();

            //Step 3: Now we can perform deletion of the item by using function
            oList.removeItem(oItem);

            // //Step 2: Get the path of the element from the item object
            // var sPath = oItem.getBindingContextPath();
            // MessageBox.confirm(sPath);

        },
        onSave: function(){

        }
    });
});