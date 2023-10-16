module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'secret',
  database: 'nome_do_banco_de_dados',
  define: {
    timestamp: true, // Cria duas colunas: createadAt e updatedAt
    underscored: true, // nomeclatura _  (não camelCase) customersGroup => customers_group
    underscoredAll: true,
  },
};
