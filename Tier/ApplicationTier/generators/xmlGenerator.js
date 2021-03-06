'use strict';

module.exports = class XMLGenerator {

    constructor() {
        this.code = '';
    }

    generate(data) {

        this.code += ('<?xml version = "1.0" encoding = "utf-8"?>\n');
        this.code += ('<!DOCTYPE hibernate-configuration SYSTEM "http://www.hibernate.org/dtd/hibernate-configuration-3.0.dtd">\n\n');

        this.code += ('<hibernate-configuration>\n');
        this.code += ('   <session-factory>\n\n');

        this.code += ('      <property name="hibernate.dialect">\n');
        this.code += ('          org.hibernate.dialect.MySQLDialect\n');
        this.code += ('      </property>\n\n');

        this.code += ('      <property name="hibernate.connection.driver_class">\n');
        this.code += ('          com.mysql.jdbc.Driver\n');
        this.code += ('      </property>\n\n');

        this.code += ('      <property name="hibernate.connection.url">\n');
        this.code += ('          jdbc:mysql://localhost/ironworks\n');
        this.code += ('      </property>\n\n');

        this.code += ('      <property name="hibernate.connection.username">\n');
        this.code += ('          root\n');
        this.code += ('      </property>\n\n');

        this.code += ('      <property name="hibernate.connection.password">\n');
        this.code += ('          ironworks\n');
        this.code += ('      </property>\n\n');

        this.code += ('   </session-factory>\n');
        this.code += ('</hibernate-configuration>\n');


        let aux = this.code;
        this.code = '';
        return aux;

    }

}
