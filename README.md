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
