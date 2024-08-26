Tutorial para rodar o projeto.

1. Clone o repositório.

2. Se não tiver o PHP instalado, siga esse tutorial nesse site para baixar.
Coloque o o diretório do PHP no Path das váriaveis de ambiente, como mostrado no tutorial.
https://blog.schoolofnet.com/como-instalar-o-php-no-windows-do-jeito-certo-e-usar-o-servidor-embutido/

3. Instale o Composer para Windows (Composer-Setup.exe).
https://getcomposer.org/download/
Coloque o diretório "bin" do composer no Path das váriaveis de ambiente, Exemplo: "C:\ProgramData\ComposerSetup\bin"

4. Acesse o arquivo .ini dentro do diretório onde o php foi instalado e descomente(retire o ; da frente) as extensões "fileinfo", "zip" e "pdo_mysql" e salve o arquivo.
extension=fileinfo
extension=zip

5. Dentro do diretório do projeto rode os seguintes comandos:

* Instalar dependências
`npm i ` para instalar as dependências do front
`composer install` para instalar as dependências do composer

* Crie o Arquivo '.env' rodando o comando(não precisa commitar esse arquivo)
  `copy .env.example .env`

* Gere a chave de criptografia
`php artisan key:generate`

6. Configure o banco
   * Verifique se tem o mysql instalado, se não, instale no link https://dev.mysql.com/downloads/workbench/
   * Configure seu dados no banco no arquivo .env
    ```
    DB_CONNECTION=mysql
    DB_HOST=127.0.0.1
    DB_PORT=3306
    DB_DATABASE=nome_do_seu_banco
    DB_USERNAME=seu_usuario
    DB_PASSWORD=sua_senha
    
    ```
* Se algo der errado, tente excluir a linha do DB_HOST

7. Rode o projeto
`php artisan serve` para rodar o back
`npm run dev` para rodar o front
