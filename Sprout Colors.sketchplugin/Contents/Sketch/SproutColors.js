var app = NSApp.delegate();

function formatDocumentColors(context) {
  var doc = context.document;
  var colors = doc.documentData().assets().colors();
  var formatted = [];

  try {
    if (colors.length === 111) {
      colors.forEach(function(color, index) {
        // for later:
        // var c = MSColor.colorWithRed_green_blue_alpha(
        //   color.red(),
        //   color.green(),
        //   color.blue(),
        //   color.alpha()
        // );
        // hexValues.push(c.hexValue());
        formatted.push(color);
        if ((index + 1) % 6 === 0) {
          formatted.push(MSColor.colorWithSVGString('#FFFFFF'));
          formatted.push(MSColor.colorWithSVGString('#FFFFFF'));
        }
      });
      doc.documentData().assets().setColors(formatted);
      NSApp.displayDialog('Document colors are now formatted.');
    } else {
      NSApp.displayDialog('Add Styles and Symbols to Document in Brand.ai plugin');
    }
  } catch(e) {
    log(e);
    NSApp.displayDialog('There was an error. Check the Console log.');
  }
}

function copyToGlobalColors(context) {
  var doc = context.document;
  app.globalAssets().setColors(doc.documentData().assets().colors());
  NSApp.displayDialog('Document colors copied to global colors.');
}