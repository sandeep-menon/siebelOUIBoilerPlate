window.onload = init;

function init(){
    //resetting field values
    $("#type_select").val('Default');
    $("#name_input").val('')
    $("#js_type_select").val('Default');
    $("#flowerbox_check").prop('checked', false);
    $("#result").hide();

    //initialize jQuery Dialog box
    $("#dialog-1").dialog({
        autoOpen: false,
        modal: true,
        dialogClass: "no-close",
        buttons: [
            {
                text: "OK",
                click: function() {
                    $(this).dialog("close");
                }
            }
        ]
    });
}

function jQDiag(type){
    //Takes input type and sets the error message according to 
    //the below switch case
    switch(type){
        case "type_select":
            $("#dialog-1").text("Please select Type of the Object");
            $("#dialog-1").dialog("open");
            break;
        
        case "enter_name":
            $("#dialog-1").text("Name of the object cannot be empty. Please enter a name");
            $("#dialog-1").dialog("open");
            break;
        
        case "pm_pr":
            $("#dialog-1").text("Please select either PM or PR");
            $("#dialog-1").dialog("open");
            break;
        
        default:
            $("#dialog-1").text("There seems to be a problem with me. Please reload the page");
            $("#dialog-1").dialog("open");
            break;
    }
}

function checkRequiredFields(){
    //This function checks for all the required 
    //fields to generate the boiler plate
    //checking type of the object
    check = true;
    if($("#type_select").val() == "Default"){
        check = false;
        jQDiag("type_select");
    }
    else if($("#name_input").val() == ""){
        check = false;
        jQDiag("enter_name");
    }
    else if($("#js_type_select").val() == "Default"){
        check = false;
        jQDiag("pm_pr");
    }
    return check;
}

function insertCode(data){
    //this function updates the passed in string
    //inside the codemirror text-area
    var editor = $(".CodeMirror")[0].CodeMirror;
    var doc = editor.getDoc();
    var cursor = doc.getCursor();
    if(cursor.line != 0){
        data = "\n" + data;
    }
    doc.replaceRange(data, cursor);
}

function genFlowerBox(){
    //This function generates a flower box
    var date = new Date();
    date = date.toDateString();
    flowerBox = "/**********************************************************************\n"+
                "// Author\t\t\t: \n"+
                "// Company\t\t\t: \n"+
                "// Date\t\t\t\t: "+date+"\n"+
                "// Purpose\t\t\t: \n"+
                "// \n"+
                "// Modification List\n"+
                "// Name\t\t\t\tDate\t\t\t\tModification\n"+
                "// --------------------------------------------------------------------\n"+
                "// \n"+
                "/**********************************************************************/\n";
    return flowerBox;
}

function genObjectName(){
    var objectName = $("#name_input").val();
    objectName = objectName.replace(/ /g, '');
    return objectName;
}

function genCode(objectName, comments){
    var jsType = $("#js_type_select").val();
    var objType = $("#type_select").val();
    var code = "";

    if(jsType == "PM"){
        code = 'if (typeof(SiebelAppFacade.OBJECTNAMEPM) === "undefined") {\n'+
               '\n'+
               '\tSiebelJS.Namespace("SiebelAppFacade.OBJECTNAMEPM");\n'+
               '\tdefine("siebel/custom/OBJECTNAMEPM", ["siebel/jstype"],\n'+
               '\t\tfunction () {\n'+
               '\t\t\tSiebelAppFacade.OBJECTNAMEPM = (function () {\n'+
               '\n'+
               '\t\t\t\tfunction OBJECTNAMEPM(pm) {\n'+
               '\t\t\t\t\tSiebelAppFacade.OBJECTNAMEPM.superclass.constructor.apply(this, arguments);\n'+
               '\t\t\t\t}\n'+
               '\t\t\t\tSiebelJS.Extend(OBJECTNAMEPM, SiebelAppFacade.JSType);\n'+
               '\t\t\t\tOBJECTNAMEPM.prototype.Init = function () {\n';
        if(comments){
            code += 
            '\t\t\t\t\t// Init is called each time the object is initialised.\n'+
            '\t\t\t\t\t// Add code here that should happen before default processing\n';
        }

        code += '\t\t\t\t\tSiebelAppFacade.OBJECTNAMEPM.superclass.Init.apply(this, arguments);\n';

        if(comments){
            code += '\t\t\t\t\t// Add code here that should happen after default processing\n';
        }

        code += '\t\t\t\t}\n'+
                '\t\t\t\tOBJECTNAMEPM.prototype.Setup = function (propSet) {\n';
        
        if(comments){
            code += '\t\t\t\t\t// Setup is called each time the object is initialised.\n'+
                    '\t\t\t\t\t// Add code here that should happen before default processing\n';
        }

        code += '\t\t\t\t\tSiebelAppFacade.OBJECTNAMEPM.superclass.Setup.apply(this, arguments);\n';

        if(comments){
            code += '\t\t\t\t\t// Add code here that should happen after default processing\n';
        }

        code += '\t\t\t\t}\n'+
                '\t\t\t\treturn OBJECTNAMEPM;\n'+
                '\t\t\t}()\n'+
                '\t\t);\n'+
                '\t\treturn "SiebelAppFacade.OBJECTNAMEPM";\n'+
                '\t})\n'+
                '}';
        
        //replacing placeholders
        code = code.replace(/OBJECTNAME/g, objectName);
        if(objType == "FormApplet"){
            code = code.replace(/jstype/g, 'pmodel');
            code = code.replace(/JSType/g, 'PresentationModel');
        }
        if(objType == "ListApplet"){
            code = code.replace(/jstype/g, 'listpmodel');
            code = code.replace(/JSType/g, 'ListPresentationModel');
        }
        if(objType == "View"){
            code = code.replace(/jstype/g, 'viewpm');
            code = code.replace(/JSType/g, 'ViewPM');
        }
    }

    if(jsType == "PR"){
        code = 'if (typeof(SiebelAppFacade.OBJECTNAMEPR) === "undefined") {\n'+
               '\n'+
               '\tSiebelJS.Namespace("SiebelAppFacade.OBJECTNAMEPR");\n'+
               '\tdefine("siebel/custom/OBJECTNAMEPR", ["siebel/jstype"],\n'+
               '\t\tfunction () {\n'+
               '\t\t\tSiebelAppFacade.OBJECTNAMEPR = (function () {\n'+
               '\n'+
               '\t\t\t\tfunction OBJECTNAMEPR(pm) {\n'+
               '\t\t\t\t\tSiebelAppFacade.OBJECTNAMEPR.superclass.constructor.apply(this, arguments);\n'+
               '\t\t\t\t}\n'+
               '\n'+
               '\t\t\t\tSiebelJS.Extend(OBJECTNAMEPR, SiebelAppFacade.JSType);\n'+
               '\n'+
               '\t\t\t\tOBJECTNAMEPR.prototype.Init = function () {\n';

        if(comments){
            code += '\t\t\t\t\t// Init is called each time the object is initialised.\n'+
                    '\t\t\t\t\t// Add code here that should happen before default processing\n';
        }

        code += '\t\t\t\t\tSiebelAppFacade.OBJECTNAMEPR.superclass.Init.apply(this, arguments);\n';

        if(comments){
            code += '\t\t\t\t\t// Add code here that should happen after default processing\n';
        }

        code += '\t\t\t\t}\n'+
                '\n'+
                '\t\t\t\tOBJECTNAMEPR.prototype.ShowUI = function () {\n';

        if(comments){
            code += '\t\t\t\t\t// ShowUI is called when the object is initially laid out.\n'+
                    '\t\t\t\t\t// Add code here that should happen before default processing\n';
        }

        code += '\t\t\t\t\tSiebelAppFacade.OBJECTNAMEPR.superclass.ShowUI.apply(this, arguments);\n';

        if(comments){
            code += '\t\t\t\t\t// Add code here that should happen after default processing\n';
        }

        code += '\t\t\t\t}\n'+
                '\n'+
                '\t\t\t\tOBJECTNAMEPR.prototype.BindData = function (bRefresh) {\n';
        
        if(comments){
            code += '\t\t\t\t\t// BindData is called each time the data set changes.\n'+
                    '\t\t\t\t\t// This is where you will bind that data to user interface elements you might have created in ShowUI\n'+
                    '\t\t\t\t\t// Add code here that should happen before default processing\n';
        }

        code += '\t\t\t\t\tSiebelAppFacade.OBJECTNAMEPR.superclass.BindData.apply(this, arguments);\n';

        if(comments){
            code += '\t\t\t\t\t// Add code here that should happen after default processing\n';
        }

        code += '\t\t\t\t}\n'+
                '\n'+
                '\t\t\t\tOBJECTNAMEPR.prototype.BindEvents = function () {\n';
        
        if(comments){
            code += '\t\t\t\t\t// BindEvents is where we add UI event processing.\n'+
                    '\t\t\t\t\t// Add code here that should happen before default processing\n';
        }

        code += '\t\t\t\t\tSiebelAppFacade.OBJECTNAMEPR.superclass.BindEvents.apply(this, arguments);\n';

        if(comments){
            code += '\t\t\t\t\t// Add code here that should happen after default processing\n';
        }

        code += '\t\t\t\t}\n'+
                '\n'+
                '\t\t\t\tOBJECTNAMEPR.prototype.EndLife = function () {\n';
        
        if(comments){
            code += '\t\t\t\t\t// EndLife is where we perform any required cleanup.\n'+
                    '\t\t\t\t\t// Add code here that should happen before default processing\n';
        }

        code += '\t\t\t\t\tSiebelAppFacade.OBJECTNAMEPR.superclass.EndLife.apply(this, arguments);\n';

        if(comments){
            code += '\t\t\t\t\t// Add code here that should happen after default processing\n';
        }

        code += '\t\t\t\t}\n'+
                '\n'+
                '\t\t\t\treturn OBJECTNAMEPR;\n'+
                '\t\t\t}()\n'+
                '\t\t);\n'+
                '\t\treturn "SiebelAppFacade.OBJECTNAMEPR";\n'+
                '\t})\n'+
                '}\n';

        //replacing placeholders
        code = code.replace(/OBJECTNAME/g, objectName);
        if(objType == "FormApplet"){
            code = code.replace(/jstype/g, 'phyrenderer');
            code = code.replace(/JSType/g, 'PhysicalRenderer');
        }
        if(objType == "ListApplet"){
            code = code.replace(/jstype/g, 'jqgridrenderer');
            code = code.replace(/JSType/g, 'JQGridRenderer');
        }
        if(objType == "View"){
            code = code.replace(/jstype/g, 'viewpr');
            code = code.replace(/JSType/g, 'ViewPR');
        }
    }
	code += '// Generated using https://sandeep-menon.github.io/siebelOUIBoilerPlate/ ';
    return code;
}

function startGen(){
    if($("#genButton").text() != "Reset"){
        if(checkRequiredFields()){
            $("#result").show();
            ($("#comments_check").is(':checked')) ? comments = true : comments = false;
            
            if($("#flowerbox_check").is(':checked')){
                //generating a flower box
                var flowerBox = genFlowerBox();
                insertCode(flowerBox);
            }
    
            var objectName = genObjectName();
    
            //now generate actual code
            var code = genCode(objectName, comments);
            insertCode(code);
            $("#genButton").text('Reset');
        }
    }
    else {
        location.reload();
    }
}



