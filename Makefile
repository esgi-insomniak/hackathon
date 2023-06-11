include .env.local
export

install:
	docker compose run --rm node yarn install


start: ## Start the project
	docker compose up -d

stop: ## Stop the project
	docker compose stop

down: ## Stop and remove the project
	docker compose down

