Tutorial para rodar o projeto.

* Clone o repositório.

* Se não tiver o PHP instalado, siga esse tutorial nesse site para baixar.
Coloque o o diretório do PHP no Path das váriaveis de ambiente, como mostrado no tutorial.
https://blog.schoolofnet.com/como-instalar-o-php-no-windows-do-jeito-certo-e-usar-o-servidor-embutido/

* Instale o Composer para Windows (Composer-Setup.exe).
https://getcomposer.org/download/
Coloque o diretório "bin" do composer no Path das váriaveis de ambiente, Exemplo: "C:\ProgramData\ComposerSetup\bin"

* Acesse o arquivo .ini dentro do diretório onde o php foi instalado e descomente(retire o ; da frente) as extensões "fileinfo" e "zip" e salve o arquivo.
extension=fileinfo
extension=zip

* Dentro do diretório do projeto rode os seguintes comandos:

* Instalar dependências
`npm i ` para instalar as dependências do front
`composer install` para instalar as dependências do composer

* Crie o Arquivo '.env' rodando o comando(não precisa commitar esse arquivo)
  `copy .env.example .env`

* Gere a chave de criptografia
`php artisan key:generate`

* Rode o projeto
`php artisan serve` para rodar o back
`npm run dev` para rodar o front
