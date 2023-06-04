## Initialisation
### Installation
```bash 
make build 
```

### Créer une entité
```bash
make entity name=NomDeLEntite
```

### Créer une migration + migrate
```bash
make migration
```

### Composer (install/update)
```bash
make composer install
or
make composer update
or
make composer require package
```

### Fixtures
```bash
make fixtures
```

## Utilisation
### Lancer le serveur
```bash
make start
```

### Arrêter le serveur
```bash
make stop
```

### Relancer le serveur
```bash
make restart
```

### Lancer les tests
```bash
make test
```

### Récuperer les variables d'environnement
```bash
make get-env
```


## Documentation
### Swagger
```bash
http://localhost:80/
```

### Api-Platform
```bash
https://api-platform.com/docs/core/getting-started/
```

### JWT

Pour générer un token JWT utiliser la route /authentication_token.
Une fois généré le token, il faut le mettre dans le header Authorization de la requête :
- Cliquez sur "Authorize" en haut à droite de la page Swagger
- Entrez : Bearer {token} dans le champ "Value"

Vous pouvez maintenant utiliser les routes protégées par JWT.

```bash
https://api-platform.com/docs/core/jwt/
```


