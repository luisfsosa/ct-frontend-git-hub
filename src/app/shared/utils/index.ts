        const createObject = (columns, content) => content.map((row) => {
            if(row.length > 0){
              console.log('row',row)
              return row.reduce((result, field, index) => {
                result[columns[index]] = field;
                return result;
              }, {});
            }else{
              return {};
            }
          });


export {createObject}