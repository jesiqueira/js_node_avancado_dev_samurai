# js_node_avancado_dev_samurai

# Add sucrase para usar import e não mais require

yarn add sucrase -D

# Criar arquivo nodemon.json para configurar sucrase com dados abaixo.

{
"execMap": {
"js": "sucrase-node"
}
}

# Add eslint como dependencia de desenvolvimento

yarn add eslint -D

# inicializando eslint

yarn eslint --init

# Configurações do projeto

yarn add prettier eslint-config-prettier eslint-plugin-prettier -D

# Add sequelize

yarn add sequelize

# Add sequelize-cli como Dependencia de desenvolvimento

yarn add sequelize-cli

# Add pg e pg-hstore para usar o BD Postgres

yarn add pg pg-hstore

# Iniciando processo para criar tabelas com sequelize

yarn sequelize migration:create --name create-nome_da_tabela

# realizar a migration

yarn sequelize db:migrate

# remover ou desfazer a ultima migration

yarn sequelize db:migrate:undo

# remover ou desfazer todas as migration ou tabelas

yarn sequelize db:migrate:undo:all
