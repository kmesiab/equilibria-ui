PROJECT_NAME := equilibria-ui
BUCKET_NAME := my-eq.com

.PHONY: deploy build run

deploy: build
	@echo "Deploying UI to S3..."
	aws s3 sync dist/$(PROJECT_NAME)/browser s3://$(BUCKET_NAME)
	@echo "Deployment complete."

build:
	@echo "Building UI..."
	ng build

run:
	@echo "Running Equlibria UI"
	ng serve
