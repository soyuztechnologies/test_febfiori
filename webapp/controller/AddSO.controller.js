sap.ui.define([
    'com/ats/hr/prm/controller/BaseController',
    'sap/m/MessageBox',
    'sap/m/MessageToast'
], function(Controller, MessageBox, MessageToast) {
    'use strict';
    return Controller.extend("com.ats.hr.prm.controller.AddSO",{
        onInit: function(){
            //alert("Wow, now we have got the App Controller for Fiori Like App");
            this.oLocal = this.getOwnerComponent().getModel("local");
            this.oRouter = this.getOwnerComponent().getRouter();
            this.oDataModel = this.getOwnerComponent().getModel("s2");
            this.setMode("Create");
        },
        mode: "Create",
        setMode: function(mode){
            this.mode = mode;
            if(mode === "Create"){
                this.getView().byId("idSave").setText("Save");
                this.getView().byId("idDelete").setEnabled(false);
                this.getView().byId("name").setEnabled(true);
            }else{
                this.getView().byId("idSave").setText("Update");
                this.getView().byId("idDelete").setEnabled(true);
                this.getView().byId("name").setEnabled(false);
            }
        },
        onAddRow: function(){
            var row = {
                "SoId": "",
                "SoItemPos": "10",
                "ProductId": "HT-1070",
                "Note": "Your Description",
                "CurrencyCode": "EUR",
                "GrossAmount": "168.74",
                "NetAmount": "141.80",
                "TaxAmount": "26.94",
                "Quantity": "2",
                "QuantityUnit": "EA"
            };

            var items = this.oLocal.getProperty("/salesOrderData/To_Items");
            items.push(row);
            this.oLocal.setProperty("/salesOrderData/To_Items", items);
        },
        onSave: function(){
            //Step 1: We read the payload which shows what data on uI
            var payload = this.oLocal.getProperty("/salesOrderData");
            //Step 2: pre-checks
            //Step 3: get the odata model object
            //---this.oDataModel got onInit
            //Step 4: trigger POST request with data (payload)
            this.oDataModel.create("/SalesOrderSet", payload,{
                //Step 5: get the callback in which we will read data
                success: function(data){
                    MessageToast.show("The Sales order with # " + data.SoId + " was created successfully");
                },
                error: function(oError){
                    //TODO: Error Handling later
                    var msgText = JSON.parse(oError.responseText).error.innererror.errordetails[0].message;
                    MessageBox.error(msgText);
                }
            });
            

            
        },
        onClear: function(){
            this.oLocal.setProperty("/productData",{
                "PRODUCT_ID" : "",
                "TYPE_CODE" : "PR",
                "CATEGORY" : "Mice",
                "NAME" : "",
                "DESCRIPTION" : "",
                "SUPPLIER_ID" : "0100000056",
                "SUPPLIER_NAME" : "Pear Computing Services",
                "TAX_TARIF_CODE" : "1 ",
                "MEASURE_UNIT" : "EA",
                "PRICE" : "0.00",
                "CURRENCY_CODE" : "USD",
                "DIM_UNIT" : "CM",
                "PRODUCT_PIC_URL" : "/sap/public/bc/NWDEMO_MODEL/IMAGES/JA-2023.jpg"
            });
            this.setMode("Create");
        }
    });
});