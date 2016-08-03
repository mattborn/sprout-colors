var app = NSApp.delegate();

var formatted = [];
var hex = [];
var hex_dedupe = [];

function convertToHex(colors) {
  colors.forEach(function(color) {
    var c = MSColor.colorWithRed_green_blue_alpha(
      color.red(),
      color.green(),
      color.blue(),
      color.alpha()
    );
    hex.push(c.hexValue());
  });
}

// inspired by _.uniq
function dedupe(array, result) {
  array.forEach(function (item) {
    if (result.indexOf(item) < 0) {
      result.push(item);
    }
  });
}

function formatDocumentColors(context) {
  var doc = context.document;
  var colors = doc.documentData().assets().colors();

  try {
    if (colors.length === 111) {
      convertToHex(colors);
      dedupe(hex, hex_dedupe);
      hex_dedupe.forEach(function (color, index) {
        var i = index + 1;
        formatted.push(MSColor.colorWithSVGString('#'+ color));
        if (i < 73 && i % 6 === 0 || i > 72 && i % 4 === 0) {
          formatted.push(MSColor.colorWithSVGString('#FFFFFF'));
          formatted.push(MSColor.colorWithSVGString('#FFFFFF'));
        }
        if (i > 72 && i % 2 === 0) {
          formatted.push(MSColor.colorWithSVGString('#FFFFFF'));
        }
      });
      doc.documentData().assets().setColors(formatted);
      NSApp.displayDialog('Document colors are now formatted.');
    } else {
      NSApp.displayDialog('Clear Document colors, then Add Styles and Symbols to Document in Brand.ai plugin');
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