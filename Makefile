
NIPS_DIR := nips
ALIASES_DIR := aliases
DIST_DIR := dist

YAML2JSON := yaml2json
DEREF_SCRIPT := node scripts/deref.js

SCHEMA_YAMLS := $(shell find $(NIPS_DIR) -type f -name "schema.yaml")
ALIAS_YAMLS := $(shell find $(ALIASES_DIR) -type f -name "schema.yaml")
JSON_SCHEMAS := $(patsubst %.yaml,$(DIST_DIR)/%.json,$(SCHEMA_YAMLS) $(ALIAS_YAMLS))

all: $(JSON_SCHEMAS)

$(DIST_DIR)/%.json: %.yaml
	@echo "Dereferencing $<"
	@mkdir -p $(dir $@)
	@$(DEREF_SCRIPT) $(realpath $<) tmp.yaml
	@echo "Converting tmp.yaml to $@"
	@$(YAML2JSON) tmp.yaml > $@
	@rm tmp.yaml

.PHONY: clean
clean:
	@echo "Cleaning up generated JSON schemas"
	@rm -rf $(DIST_DIR)