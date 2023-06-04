
.PHONY: list
list: ## List of all commands available
	@LC_ALL=C $(MAKE) -pRrq -f $(lastword $(MAKEFILE_LIST)) : 2>/dev/null | awk -v RS= -F: '/(^|\n)# Files(\n|$$)/,/(^|\n)# Finished Make data base/ {if ($$1 !~ "^[#.]") {print $$1}}' | sort | egrep -v -e '^[^[:alnum:]]' -e '^$@$$'
build: ## Build the docker images
	docker compose build --no-cache --force-rm --pull
	docker compose run --rm php composer install --no-interaction --no-progress --no-suggest
	docker compose run --rm php sh -c "chmod +x bin/** && mkdir 'config/jwt' || true"
	make jwt
	make start
jwt: ## Generate the JWT keys
	docker compose run --rm php sh -c 'set -e && apk add openssl && php bin/console lexik:jwt:generate-keypair --overwrite && setfacl -R -m u:www-data:rX -m u:"$(whoami)":rwX config/jwt && setfacl -dR -m u:www-data:rX -m u:"$(whoami)":rwX config/jwt'
start: ## Start the docker containers
	docker compose up -d
stop: ## Stop the docker containers
	docker compose stop
restart: ## Restart the docker containers
	docker compose restart
logs: ## Display the logs of the docker containers
	docker compose logs -f
down: ## Stop and remove the docker containers
	docker compose down
new-fixture: ## Create a new fixture
	docker compose exec php bin/console make:fixtures $(filter-out $@,$(MAKECMDGOALS))
fixtures: ## Load the fixtures
	docker compose exec php bin/console doctrine:fixtures:load --no-interaction
fixtures-purge: ## Purge the database and load the fixtures
	docker compose exec php bin/console doctrine:fixtures:load --purge-with-truncate --no-interaction
migration: ## Run the migrations and migrate them
	docker compose exec php bin/console doctrine:migration:diff
	make migrate
migrate: ## Migrate the database
	docker compose exec php bin/console doctrine:migrations:migrate --no-interaction
schema: ## Update the database schema
	docker compose exec php bin/console doctrine:schema:update --force
drop-data:
	docker compose exec php bin/console doctrine:schema:drop --force --full-database
drop-database:
	docker compose exec php bin/console doctrine:database:drop --force --if-exists
create-database:
	docker compose exec php bin/console doctrine:database:create
bash: ## Open a bash shell in the php container
	docker compose exec php sh
composer: ## Run composer
	docker compose exec php composer $(filter-out $@,$(MAKECMDGOALS))
entity: ## Create a new entity
	docker compose exec php bin/console make:entity $(filter-out $@,$(MAKECMDGOALS))
test: ## Run the tests
	docker compose exec php php bin/console doctrine:database:drop --force --if-exists --env=test
	docker compose exec php php bin/console doctrine:database:create --env=test
	docker compose exec -T php php bin/console -e test doctrine:migrations:migrate --no-interaction
	docker compose exec -T php php bin/console doctrine:fixtures:load --no-interaction --env=test
	docker compose exec php bin/phpunit
get-env: ## Get the environment variables
	docker compose exec php bin/console debug:container --env-vars
