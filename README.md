<p align="center">
<img src="./midia/RESTAURANT REST API.gif" alt="Imagem de extensão GIF com o nome do projeto em fundo ilustrativo de quadro de giz e ilustrações de pedidos, motoboy e garçom/garçonete." width = 360px>
</p>

## Descrição:
<p>A presente aplicação é uma funcionalidade back-end que gera e administra, de forma mais fácil, o cadastro de clientes com foco em entrega de produtos de resturante(delivery), entretanto, a aplicação foi criada de forma de possa ser utilizada, e adaptada, para cadastro de clientes de qualquer serviço oferecido. Para o programa, o banco de dados relacionais SQLite foi usado, assim como os verbos HTTP e o padrão REST, além da arquitetura MVC, de forma a estruturar coerentemente as operações do método CRUD. 

Este projeto faz parte do Trabalho Final da conclusão do Módulo 4 do curso de Dev. Web FullStack da <a href="https://www.resilia.com.br">Resilia Educação.</a></p>


## Status do Projeto

![Bagde](https://img.shields.io/badge/Status%20do%20Projeto-Concluído-red)

## Ferramentas necessárias:

<p>Atenção nesta parte, pois para utilizar esta Api você precisará instalar algumas ferramentas fundamentais na sua máquina, como: <a href="https://www.gitkraken.com/download?utm_term=git&utm_campaign=1+%7C+1+GK+Git+GUI+-+Search&utm_source=adwords&utm_medium=ppc&hsa_acc=1130375851&hsa_cam=393455543&hsa_grp=23981425823&hsa_ad=550570964612&hsa_src=g&hsa_tgt=kwd-247385313&hsa_kw=git&hsa_mt=e&hsa_net=adwords&hsa_ver=3&gclid=Cj0KCQiA-qGNBhD3ARIsAO_o7ym_H2X6ZGqwCZJqFF5FFzq4fVkZ1h6JujQY4yk9UI5bf2cnWf-Ez-EaAstwEALw_wcB">Git</a> e o JavaScript com <a href="https://nodejs.org/en/download/">NodeJS</a>, além do gerenciador de pacotes npm e a framework express. 
<strong>Observação</strong> é recomendável a utilização de um editor de código que tenha familiaridade, caso não tenha com nenhum, recomenda-se o <a href="https://code.visualstudio.com/download">VsCode</a> pela intuitividade do mecanismo.

# Dependências:

![Badge](https://img.shields.io/badge/"express"-"%5E4.17.1"-red)
![Badge](https://img.shields.io/badge/"sqlite3"-"%5E5.0.2"-red)
![Badge](https://img.shields.io/badge/"cors"-"%5E2.8.5"-red)

# Dependências de desenvolvimento:
![Badge](https://img.shields.io/badge/"nodemon"-"%5E2.0.15"-red)


</p>

## Iniciando passo a passo:


<p>

<ul> 
<li>Após a instalação das ferramentas, acesse o local em sua máquina onde deseja clonar o repositório, abra o terminal "Git Bash"
e rode o seguinte comando no terminal:</li>
<li> git clone https://github.com/LuthGom/restaurante-cliente-API.git </li>
<li>Com o repositório aberto, instale as dependências necessárias com o seguinte comando no terminal:</li>
<li> npm install </li>
<li>Para instalar as dependências de desenvolvimento, rode o comando abaixo no terminal:</li>
<li> npm install nodemon --save-dev</li>
<li>Para iniciar a aplicação basta rodar o comando abaixo via terminal:</li>
<li> npm start</li>
<li> O servidor iniciará na porta:3000 - acesse: http://localhost:3000/clientes</li>


## Atenção:
<p>
<ol>
 <li>É essencial salientar que a versão do NodeJs utilizada para desenvolvimento é a v16.13.0 x LTS, ou seja, é pertinente a instalação de versão igual ou superior para a impecável execução da mesma.</li>

 <li>Caso você por algum motivo venha a excluir o arquivo "database.db", que é o nosso banco de dados gerado com a ferramenta SQLite, rode o comando abaixo a fim de gerar outro banco de dados:</li>
 <li>$ node ./src/infr/create-db.js</li>
 </ol>
</p>

## Rotas da API:
<p> Atualmente, há apenas a rota "/clientes", todavia, por esta rota conseguimos executar todos as operações do método CRUD, citado no início desta documentção.</p>

# Para <strong>visualizar</strong> a lista de todos os clientes:
<p> Operar o método HTTP Get no caminho na "url da API" + "/clientes </p>

# Para <strong>pesquisar</strong> por clientes específicos utilizando seus id's:

<p> Operar o método HTTP Get no caminho "url da API" + "clientes/id"</p>

# Para <strong>cadastrar</strong> um novo cliente no banco de dados:

<p> Operar o método HTTP Post no caminho da "url da API" + "clientes" com todas as informações necessárias para preenchimento dos campos no banco de dados. Veja um exemplo da estrutura de um objeto para requisição </p>

<p>



```json 
 {

   
    "cpf": "string",
    "nome": "string",
    "numero": int,
    "cep": int,
    "endereco": "string",
    "cidade": "string",
    "uf": "string",
    "email": "string",
    "senha": "string"

}
```


</p>

 </p>

# Para <strong>Corrigir</strong> um ou mais dados de um ciente cadastrado:

<p>Operar o método HTTP Patch no caminho da "url da API" + "/clientes/id" contendo no corpo da requisição <strong>meramente</strong>
os dados a serem alterados. Exemplo: supondo que apenas o campo senha será alterado:</p>

<p>
    "senha": "string"
</p>

<p>Ou seja, não há necessidade de digitar todos os dados novamente.</p>

# Para <strong>deletar</strong> um cliente do banco de dados:

<p>Operar o método HTTP Delete no caminho da "url da API" + "/clientes/id" </p>


## Autor 🌈

<img src="./midia/luth.jpeg" alt="Foto do autor, Luciano Mendes pardo, de cabelos chacheados e está de olhos fechados enconstado numa porta. Luciano está utilizando uma regata de crochê, baseada em granny squares, nas cores pretas, verde, roxo, azul, laranja, cinza e amarelo" width = 200px heigth= 200px>

<a href="https://www.linkedin.com/in/dev-luciano-mendes/">Luciano Mendes(Luth🌈) | Clique aqui para o meu Linkedin<a/>
<p>Um ex quase professor de Química!
Depois de 3 anos cursando a Licenciatura, abandonei a graduaçao antes que entrasse em moldes sociais rígidos
e perdesse o viés educacional presente em mim!</p>
