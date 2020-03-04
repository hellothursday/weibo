/**
 * @description sequelize 数据类型
 * @author qe
 */

const Sequelize = require('sequelize')

module.exports = {
    STRING: Sequelize.STRING,
    DECIMAL: Sequelize.DECIMAL,
    TEXT: Sequelize.TEXT,
    INTEGER: Sequelize.INTEGER,
    TINYINT: Sequelize.TINYINT,
    BOOLEAN: Sequelize.BOOLEAN,
    DATETIME: Sequelize.DATE,
    DATE: Sequelize.DATEONLY
}
