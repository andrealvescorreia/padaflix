# Padaflix: Software de assinatura para delivery de produtos de padaria
Visite o [Padaflix](https://andrealvescorreia.github.io/padaflix) e saiba mais!

***
## Rodar Backend (API) <br>
Pré-requisito:
- Python 3.10 <br>

Abra a pasta raíz do `padaflix` no terminal e execute os seguintes comandos:
```
python -m venv venv 
venv/Scripts/activate
pip install -r requirements.txt
cd backend 
python manage.py migrate 
python manage.py runserver
```

## Rodar frontend:  <br>
Pré-requisitos:
-   NodeJs instalado e atualizado  <br>
-   Backend em execução localmente <br>

Abra a pasta raíz do `padaflix` no terminal e execute os seguintes comandos: <br>
```
cd frontend 
npm install
npm run dev 
```

## Rodar Testes
Abra a pasta raíz do `padaflix` no terminal e execute os seguintes comandos:
```
venv/Scripts/activate 
cd backend 
python manage.py migrate 
python manage.py test
```

- Para mostrar o coverage dos testes:<br>
`coverage run --source "authors" manage.py test -v 2` <br>
`coverage report` ou `coverage html` (gera página html que mostra em detalhes quais partes do código foram cobertas)

***
## Integrantes
[André Alves](https://github.com/andrealvescorreia) <br> 
[Arthur Medeiros](https://github.com/ArthurMedeiros29) <br> 
[Meljael Daniel](https://github.com/meljael) <br> 
[Artur Dantas](https://github.com/Artur906) <br> 
[Wellyngton Targino](https://github.com/welly555) <br>

## Links
[Figma](https://www.figma.com/file/58Ldk3m64don9hTXfn23d7/Padaflix?type=design&node-id=708%3A156&mode=design&t=y4K2LUoerAKmVWN4-1) Protótipos de tela <br>
[Project](https://github.com/users/andrealvescorreia/projects/1/views/1) Kanban de tarefas <br>
[Trello](https://trello.com/b/Du7M4neD/padaflix-kanban) Kanban usado durante disciplina de Gerenciamento de Projetos
