# padaflix
software de assinatura para delivery de produtos de padaria

## Configurar Frontend  <br>
- Pré-requisitos: NodeJs instalado E atualizado  <br>

Abra a pasta padaflix no terminal e execute os seguintes comandos: <br>
```
cd frontend 
npm install
```

## Rodar frontend:  <br>
```
cd frontend 
npm run dev 
```

## Configurar Backend (API) <br>
- Pré-requisitos: Python instalado E atualizado <br>

Abra a pasta padaflix no terminal e execute os seguintes comandos:
```
python -m venv venv 
venv/Scripts/activate
pip install -r requirements.txt
```

## Rodar API <br>
```
venv/Scripts/activate 
cd backend 
python manage.py migrate 
python manage.py runserver
```

## Rodar Testes
```
venv/Scripts/activate 
cd backend 
python manage.py migrate 
python manage.py test
```

Para mostrar o coverage dos testes:
```
coverage run --source "authors" manage.py test -v 2
coverage report
// ou 
coverage html
```
-- coverage html vai gerar uma página que mostra em detalhes quais partes do código foram cobertas
## Integrantes
<br> André Alves
<br> Arthur Medeiros
<br> Meljael Daniel
<br>Trello: https://trello.com/b/Du7M4neD/padaflix-kanban
