'use strict';

module.exports = class JavaGenerator {

    constructor() {
      this.code = '';
      this.metodi = '';
    }

    generate(data) {
        if(data.length > 0) {
          for (let i = 0; i < data.length; i++) {
              let entity = data[i];

              this.code += ('/*\n* Entità ' + entity.name + '\n*/\n');
              this.code += ('class ' + entity.name + ' {');

              if(entity.attr.length > 0){ this.code += ('\n\n'); }
              for(let i = 0; i < entity.attr.length; i++) {
                  let attribute = entity.attr[i];
                  this.newField(
                      attribute.scope,
                      attribute.type,
                      attribute.name,
                      attribute.primaryKey,
                  );
              }
              if(entity.attr.length > 0){ this.code += ('\n' + this.metodi + '\n'); }
              this.code += ('}\n\n');
              this.metodi = '';
          }
          let aux = this.code;
          this.code = '';
          this.metodi = '';

          return aux;
        }
        else {
            return '';
        }
    }

    newField(scope, type, name, primaryKey) {
        this.code += ('   ' + scope + ' ' + type + ' ' + name + ';\n');
        this.metodi += ('   ' + type + ' get' + name.substring(0,1).toUpperCase() + name.substring(1) + '() {return ' + name + ';}\n');
        this.metodi += ('   void set' + name.substring(0,1).toUpperCase() + name.substring(1) + '(' + type + ' ' + name + ') {this.' + name + ' = ' + name + ';}\n');
    }

}
