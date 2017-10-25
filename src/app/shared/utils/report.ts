declare var jsPDF: any; // Important

export function print(orientation,reportName,columnNames,realColumns,columns, content){

  let doc = new jsPDF({orientation: orientation});

  var currentpage = 0;

  var footer = function (data) {
    if (currentpage < doc.internal.getNumberOfPages()) {
      doc.setFontSize(10);
      doc.setFontStyle('normal');
      doc.text("Copyright (c) QUO Contablita. All rights reserved.", data.settings.margin.left, doc.internal.pageSize.height - 3);
      currentpage = doc.internal.getNumberOfPages();
    }
  };

  doc.setFontSize(18);
  doc.setTextColor(40);
  doc.setFontStyle('bold');
  doc.text(reportName, 80, 12);

  var rows= [];
  var cols= [];

  for(var element of content){
    cols=[];
    for(var column of columns){
      cols.push(element[realColumns.indexOf(column)]);
    }
    rows.push(cols);
  }

  doc.autoTable(columnNames, rows, {
    startY: 20,
    afterPageContent: footer,
    margin: { horizontal: 5 },
    bodyStyles: { valign: 'top' },
    styles: {
      overflow: 'linebreak' ,
      rowHeight: 60,
      columnWidth: 50
    },
    headerStyles: {
      fillColor: [51, 122, 183],
      textColor: [255],
      halign: 'center'
    },
    columnStyles: {
      1:{
        columnWidth: 50
      }
    },
    theme: 'grid'
  });

  doc.putTotalPages("{total_pages_count_string}")
  var date = new Date().toLocaleDateString();
  doc.save(reportName+`Test_${date}.pdf`);

}
