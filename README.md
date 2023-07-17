# Padaflix: Software de assinatura para delivery de produtos de padaria


## Rodar frontend:  <br>
- Pré-requisitos: NodeJs instalado e atualizado  <br>

Abra a pasta raíz do `padaflix` no terminal e execute os seguintes comandos: <br>
```
cd frontend 
npm install
npm run dev 
```

## Rodar Backend (API) <br>
- Pré-requisitos: Python instalado E atualizado <br>

Abra a pasta raíz do `padaflix` no terminal e execute os seguintes comandos:
```
python -m venv venv 
venv/Scripts/activate
pip install -r requirements.txt
cd backend 
python manage.py migrate 
python manage.py runserver
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

## Integrantes
[André Alves](https://github.com/andrealvescorreia) <br> 
[Arthur Medeiros](https://github.com/ArthurMedeiros29) <br> 
[Meljael Daniel](https://github.com/meljael) <br> 
***
Kanban tarefas: https://trello.com/b/Du7M4neD/padaflix-kanban
