#feature-id    Matt Sulecki > Astrometric Solution Transfer
#feature-info  Transfer Astrometric Solution from one view to another.


function FileSelectorDialog() {
    this.__base__ = Dialog;
    this.__base__();

    this.sourceViewList = new ViewList(this);
    this.sourceViewList.getAll();
    this.sourceViewList.onViewSelected = function(view) {
        this.dialog.sourceView = view;
    };

    this.targetViewList = new ViewList(this);
    this.targetViewList.getAll();
    this.targetViewList.onViewSelected = function(view) {
        this.dialog.targetView = view;
    };

    this.sourceLabel = new Label(this);
    this.sourceLabel.text = "Source";

    this.targetLabel = new Label(this);
    this.targetLabel.text = "Target";

    this.runButton = new PushButton(this);
    this.runButton.text = "Run";
    this.runButton.width = 50; // Set the minimum width to make the button smaller
    this.runButton.onClick = function() {
        if (this.dialog.sourceView && this.dialog.targetView) {
            let source = this.dialog.sourceView;
            let target = this.dialog.targetView
            
            try {
                const properties = source.properties.filter(property => {
                    
                    return property.indexOf("AstrometricSolution") > -1;
                });

               properties.forEach(property => {
                try {
                    target.setPropertyValue(property,source.propertyValue(property));
                    console.writeln("\u001b[32m"+property+"\u001b[0m");
                }
                catch(error){
                    console.writeln("error: "+error);
                }
               })
               dialog.close();

  }
            catch(error){
                console.criticalln(error);
            }

        } else {
            console.criticalln("Please select both source and target views.");
        }
    };

    this.sizer = new VerticalSizer;
    this.sizer.margin = 6;
    this.sizer.spacing = 4;
    this.sizer.add(this.sourceLabel);
    this.sizer.add(this.sourceViewList);
    this.sizer.add(this.targetLabel);
    this.sizer.add(this.targetViewList);
    this.sizer.addSpacing(8);
    this.sizer.add(this.runButton);

    this.windowTitle = "File Selector";
    this.adjustToContents();
    this.setFixedSize();
}

FileSelectorDialog.prototype = new Dialog;

function main() {
    let dialog = new FileSelectorDialog();
    dialog.execute();
}

main();
