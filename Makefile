SHELL := bash

# Auto-select container engine
ENGINE ?= $(shell \
	if command -v podman >/dev/null 2>&1; then echo podman; \
	elif command -v docker >/dev/null 2>&1; then echo docker; \
	else echo "no-container-engine"; fi)

IMAGE_NAME := node-npm
IMAGE_TAG := latest
CONTAINER_NAME := $(IMAGE_NAME)-$(IMAGE_TAG)

CONTAINERFILE := container/npm/Containerfile

.PHONY: image shell

image:
	@echo "==> Building image: $(IMAGE_NAME):$(IMAGE_TAG) using $$ENGINE"
	$(ENGINE) build -t $(IMAGE_NAME):$(IMAGE_TAG) -f $(CONTAINERFILE) .

shell:
	@echo "==> Starting container shell with project mounted"

	@if [ "$(ENGINE)" = "podman" ]; then \
		USERNS="--userns=keep-id"; \
	else \
		USERNS=""; \
	fi; \
	\
	$(ENGINE) run --rm -it $$USERNS \
		-v "$$(pwd)":/work:z \
		-w /work \
		-e NPM_TOKEN="$$NPM_TOKEN" \
		$(IMAGE_NAME):$(IMAGE_TAG) \
		sh -c '\
			# Fix HOME if it does not exist (userns remapping) \
			if [ ! -d "$$HOME" ]; then \
				export HOME="/home/node"; \
				mkdir -p "$$HOME"; \
			fi; \
			\
			# Generate ~/.npmrc if token provided \
			if [ -n "$$NPM_TOKEN" ]; then \
				echo "//registry.npmjs.org/:_authToken=$$NPM_TOKEN" > "$$HOME/.npmrc"; \
				echo "Generated $$HOME/.npmrc"; \
			else \
				echo "WARNING: NPM_TOKEN not provided; ~/.npmrc not created"; \
			fi; \
			\
			exec sh \
		'
