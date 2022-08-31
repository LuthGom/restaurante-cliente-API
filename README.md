
<iframe src="https://drive.google.com/file/d/13bUQw6NeFpTEFxGutuXUyZbdbek3w-9f/preview" width="360" height="190" allow="autoplay"></iframe>


---

<h1 style="color: tomato">Descrição</h1>
<p style="text-align: justify; color: whitesmoke">A presente aplicação é uma funcionalidade back-end que gera e administra, de forma mais fácil, o cadastro de clientes com foco em entrega de produtos de resturante(delivery), entretanto, a aplicação foi criada de forma de possa ser utilizada, e adaptada, para cadastro de clientes de qualquer serviço oferecido. Para o programa, o banco de dados relacionais PostgreSQL foi usado, assim como os verbos HTTP e o padrão REST, além da arquitetura MVC, de forma a estruturar coerentemente as operações do método CRUD. Além disso, a API conta com autenticação de login por tokens, utilizando a lib jsonwebtoken e outras dependências para estratégias de autenticação local e bearer.

Considerando a forma como a lógica de autenticação por tokens foi implementada, utilizando redis para desenvolvimento local, pelo menos por enquanto, para que a API rode localmente de forma impecável, é preciso ter o redis rodando em sua máquina.

Instruções de instaLAção disponível em:
[redis.io](https://redis.io/docs/getting-started/installation/install-redis-on-linux/)

Caso o sistema operacional seja Windows, recomendo fortemente e leitura do blog para tal: [redis.com](https://redis.com/blog/redis-on-windows-10/)

Este projeto faz parte do Trabalho Final da conclusão do Módulo 4 do curso de Dev. Web FullStack da <a href="https://www.resilia.com.br">Resilia Educação.</a></p>

---

## Status do Projeto

![Bagde](https://img.shields.io/badge/Status%20do%20Projeto-Concluído-green)

---

## <span style="color: tomato">Ferramentas necessárias:</span>

<p style="text-align: justify; color: whitesmoke">Atenção nesta parte, pois para utilizar esta Api você precisará instalar algumas ferramentas fundamentais na sua máquina, como: <a href="https://www.gitkraken.com/download?utm_term=git&utm_campaign=1+%7C+1+GK+Git+GUI+-+Search&utm_source=adwords&utm_medium=ppc&hsa_acc=1130375851&hsa_cam=393455543&hsa_grp=23981425823&hsa_ad=550570964612&hsa_src=g&hsa_tgt=kwd-247385313&hsa_kw=git&hsa_mt=e&hsa_net=adwords&hsa_ver=3&gclid=Cj0KCQiA-qGNBhD3ARIsAO_o7ym_H2X6ZGqwCZJqFF5FFzq4fVkZ1h6JujQY4yk9UI5bf2cnWf-Ez-EaAstwEALw_wcB">Git</a> e o JavaScript com <a href="https://nodejs.org/en/download/">NodeJS</a>, além do gerenciador de pacotes npm e a framework express. 
<strong>Observação</strong> é recomendável a utilização de um editor de código que tenha familiaridade, caso não tenha com nenhum, recomenda-se o <a href="https://code.visualstudio.com/download">VsCode</a> pela intuitividade do mecanismo.


## <span style="color: tomato">Variáveis de ambiente necessárias:</span>

<span style="color: whitesmoke">
- CHAVE_JWT <br>
- REDIS_URL <br>
- REDIS_PASSWORD <br>
- PG_HOST <br>
- PG_DATABASE <br>
- PG_USER <br>
- PG_PORT <br>
- PG_PASSWORD <br>
</span>

---

# <span style="color: tomato">Dependências:</span>

![Badge](https://img.shields.io/badge/"bcrypt"-"%5E5.0.1"-red)<br>
![Badge](https://img.shields.io/badge/"cors"-"%5E2.8.5"-orange)<br>
![Badge](https://img.shields.io/badge/"dotenv"-"%5E16.0.0"-yellow)<br>
![Badge](https://img.shields.io/badge/"express"-"%5E4.17.1"-green)<br>
![Badge](https://img.shields.io/badge/"jsonwebtoken"-"%5E8.5.1"-blue)<br>
![Badge](https://img.shields.io/badge/"passport"-"%5E0.5.2"-purple)<br>
![Badge](https://img.shields.io/badge/"passportLocal"-"%5E1.0.0"-pink)<br>
![Badge](https://img.shields.io/badge/"passportHttpBearer"-"%5E1.0.1"-white)<br>
![Badge](https://img.shields.io/badge/"redis"-"%5E4.0.4"-black)<br>
![Badge](https://img.shields.io/badge/"sqlite3"-"%5E5.0.2"-roxy)<br>

# <span style="color: tomato">Dependências de desenvolvimento:</span>

![Badge](https://img.shields.io/badge/"jest"-"%5E27.4.7"-white) <br>
![Badge](https://img.shields.io/badge/"nodemon"-"%5E2.0.15"-black)<br>
![Badge](https://img.shields.io/badge/"supertest"-"%5E6.2.2"-white)<br>



## <span style="color: tomato">Iniciando passo a passo:</span>



<ul style="text-align: justify; color: whitesmoke"> 
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

## <span style="color: tomato">Atenção:</span>


<ul style="text-align: justify; color: whitesmoke">
 <li>É essencial salientar que a versão do NodeJs utilizada para desenvolvimento é a v16.13.0 x LTS, ou seja, é pertinente a instalação de versão igual ou superior para a impecável execução da mesma.</li>

 </ul>


## <span style="color: tomato">Rotas da API:</span>

### <span style="color: whitesmoke; background-color: tomato">Documentação Swagger:</span> <a href="https://restaurant-client-api.herokuapp.com/docs/">Clique aqui!👈</a>

### <span style="color: tomato">Validações:</span> 
 - <p style="color:whitesmoke; text-align: justify">CPF: algoritmo de validação da receita federal. Recomenda-se o site [Gerador de CPFs - 4Devs](https://www.4devs.com.br/gerador_de_cpf) para utilizar um cpf que atinga da validação.</p>

- <p style="color:whitesmoke; text-align: justify"> Nome: Pelo menos 8 caracteres.</p>

- <p style="color:whitesmoke; text-align: justify"> Email: formato: exemplo@email.com</p>

- <p style="color:whitesmoke; text-align: justify"> Senha: Pelo menos 1 letra maiúscula, pelo menos 1 minúscula e pelo menos 1 caracter especial. No mínimo 8 caracteres.</p>

- <p style="color:whitesmoke; text-align: justify"> O login gerará um token, que vai ser requisitado para realizar outras ações, como logout, delete e update para os verbos HTTP get, delete e patch,respectivamente. Dessa forma, o mesmo que está sendo feito para logout, como mostra a a imagem abaixo, deverá ser feito para delete e update.</p>

### <span style="color:tomato; text-align: justify">COMO PEGAR E UTILIZAR O TOKEN GERADO PELO LOGIN:</span>

<iframe src="https://drive.google.com/file/d/1CIPaDjQBGr6G9OmTLqLZDKF7LaYYdzL1/preview" width="640" height="480" allow="autoplay"></iframe>

## Autor 🌈

<img src="https://avatars.githubusercontent.com/u/88147834?v=4" alt="Foto do autor, Luciano Mendes pardo, de cabelos chacheados e está de olhos fechados enconstado numa porta. Luciano está utilizando uma regata de crochê, baseada em granny squares, nas cores pretas, verde, roxo, azul, laranja, cinza e amarelo" width = 200px heigth= 200px>

<a href="https://www.linkedin.com/in/dev-luciano-mendes/">Luciano Mendes(Luth🌈) | Clique aqui para o meu Linkedin<a/>

<p>Um ex quase professor de Química!
Depois de 3 anos cursando a Licenciatura, abandonei a graduação antes que entrasse em moldes sociais rígidos
e perdesse o viés educacional presente em mim!</p>
