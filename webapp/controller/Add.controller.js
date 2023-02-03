sap.ui.define([
    'com/ats/hr/prm/controller/BaseController',
    'sap/m/MessageBox',
    'sap/m/MessageToast'
], function(Controller, MessageBox, MessageToast) {
    'use strict';
    return Controller.extend("com.ats.hr.prm.controller.Add",{
        onInit: function(){
            //alert("Wow, now we have got the App Controller for Fiori Like App");
            this.oLocal = this.getOwnerComponent().getModel("local");
            this.oRouter = this.getOwnerComponent().getRouter();
            this.oDataModel = this.getOwnerComponent().getModel();
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
        productId: null,
        onEnter: function(oEvent){
            //Step 1: What is the product id user type on UI
            var value = oEvent.getSource().getValue();
            //Step 2: Store the product id being edited in global variable
            this.productId = value;
            //Step 3: use odata model to read product data
            var that = this;
            this.oDataModel.read("/ProductSet('" + value + "')",{
                success: function(data){
                    //Step 4: set data to local model
                    that.oLocal.setProperty("/productData", data);
                    that.setMode("Update");
                }
            });

            this.getView().byId("myProduct").setSrc("/sap/opu/odata/sap/ZJAN_ODATA_SRV/ProductImgSet('"  + value + "')/$value");
        },
        onExpensive: function(){
            //step 1: callFunction of odata model\
            var that = this;
            this.oDataModel.callFunction("/GetMostExpensiveProduct",{
                urlParameters:{
                    I_CATEGORY : this.getView().byId("category").getSelectedKey()
                },
                success: function(data){
                    //step 2: callback on receipt of data
                    //Step 3: set data to local model
                    that.oLocal.setProperty("/productData", data);
                    that.setMode("Update");
                }
            });
            
        },
        onDelete: function(){
            //Get the odata model
            var that = this;
            //fire delete on currently read product
            this.oDataModel.remove("/ProductSet('" + this.productId + "')",{
                success: function(data){
                    MessageToast.show("The product was deleted");
                    that.setMode("Create");
                }
            });

        },
        onSave: function(){
            //Step 1: We read the payload which shows what data on uI
            var payload = this.oLocal.getProperty("/productData");
            //Step 2: pre-checks
            if(!payload.PRODUCT_ID){
                MessageBox.error("Product Id cannot be blank");
                return;
            }
            //Step 3: get the odata model object
            //---this.oDataModel got onInit
            //Step 4: trigger POST request with data (payload)
            if(this.mode === "Create"){
                this.oDataModel.create("/ProductSet", payload,{
                    //Step 5: get the callback in which we will read data
                    success: function(data){
                        MessageToast.show("The product was created successfully");
                    },
                    error: function(oError){
                        //TODO: Error Handling later
                        var msgText = JSON.parse(oError.responseText).error.innererror.errordetails[0].message;
                        MessageBox.error(msgText);
                    }
                });
            }else{
                this.oDataModel.update("/ProductSet('" + this.productId + "')", payload,{
                    //Step 5: get the callback in which we will read data
                    success: function(data){
                        MessageToast.show("The product was updated successfully");
                    },
                    error: function(oError){
                        //TODO: Error Handling later
                        var msgText = JSON.parse(oError.responseText).error.innererror.errordetails[0].message;
                        MessageBox.error(msgText);
                    }
                });
            }
            

            
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