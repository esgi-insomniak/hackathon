include .env.local
export

start: ## Start the project
	docker compose up -d

stop: ## Stop the project
	docker compose stop

down: ## Stop and remove the project
	docker compose down

