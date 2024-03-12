PROJECT_NAME := equilibria-ui
BUCKET_NAME := my-eq.com
DISTRIBUTION_ID := E29WUDB6NI3YHZ


.PHONY: deploy build run bust-cache

deploy: gulp build
	@echo "Deploying UI to S3..."
	aws s3 sync dist/$(PROJECT_NAME)/browser s3://$(BUCKET_NAME)
	@echo "Deployment complete."
	make bust-cache

build:
	@echo "Building UI..."
	ng build

run:
	@echo "Running Equlibria UI"
	ng serve

gulp:
	@echo "Gulping project"
	gulp

bust-cache:
	@echo "Invalidating CloudFront cache..."
	aws cloudfront create-invalidation --distribution-id $(DISTRIBUTION_ID) --paths "/*"
	@ec
