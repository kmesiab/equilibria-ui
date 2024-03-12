PROJECT_NAME := equilibria-ui
BUCKET_NAME := my-eq.com
DISTRIBUTION_ID := E29WUDB6NI3YHZ


.PHONY: deploy build run bust-cache

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

bust-cache:
	@echo "Invalidating CloudFront cache..."
	aws cloudfront create-invalidation --distribution-id $(DISTRIBUTION_ID) --paths "/*"
	@ec
