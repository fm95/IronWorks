'use strict';

module.exports = class JavaGenerator {

    constructor() {
      this.code = '';
      this.metodi = '';
    }

    generate(data) {
        if(data.length > 0) {

          this.code += ('import javax.persistence.*;\n\n');

          for (let i = 0; i < data.length; i++) {
              let entity = data[i];

              this.code += ('/*\n* Entità ' + entity.name + '\n*/\n');
              this.code += ('@Entity\n');
              this.code += ('class ' + entity.name + ' implements Serializable {');

              if(entity.attr.length > 0) {
                this.code += ('\n\n');

                for(let i = 0; i < entity.attr.length; i++) {
                    let attribute = entity.attr[i];
                    this.newField(
                        attribute.scope,
                        attribute.array,
                        attribute.type,
                        attribute.name,
                        attribute.primaryKey,
                    );
                }

                this.code += ('\n' + this.metodi + '\n');
              }
              else {
                this.code += ('\n\n   @Id @GeneratedValue\n');
                this.code += ('   @Column(name = "id")\n');
                this.code += ('   private int id;\n\n');
              }
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

    newField(scope, array, type, name, primaryKey) {
        if(primaryKey === 'true'){
            this.code += ('   @Id\n');
        }
        this.code += ('   @Column(name = "' + name + '")\n');

        this.code += ('   ' + scope + ' ' + type + ' ' + name);
        if(array === 'true'){
          this.code += ('[];\n\n');
        }else{
          this.code += (';\n\n');
        }
        this.metodi += ('   ' + type + ' get' + name.substring(0,1).toUpperCase() + name.substring(1) + '() {return ' + name + ';}\n');
        this.metodi += ('   void set' + name.substring(0,1).toUpperCase() + name.substring(1) + '(' + type + ' ' + name + ') {this.' + name + ' = ' + name + ';}\n\n');
    }

}
