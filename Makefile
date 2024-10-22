# Makefile to process YAML schemas in the nips directory

# Directories
NIPS_DIR := nips
ALIASES_DIR := aliases
DIST_DIR := dist

# Tools
YAMLCONVERT := yaml-convert
DEREF_SCRIPT := node scripts/deref.js

# Files
SCHEMA_YAMLS := $(shell find $(NIPS_DIR) -type f -name "schema.yaml")
ALIAS_YAMLS := $(shell find $(ALIASES_DIR) -type f -name "schema.yaml")
JSON_SCHEMAS := $(patsubst %.yaml,$(DIST_DIR)/%.json,$(SCHEMA_YAMLS) $(ALIAS_YAMLS))

# Default target
all: convert_json dereference_json

# Rule to convert YAML to JSON
$(DIST_DIR)/%.json: %.yaml
	@echo "Converting $< to $@"
	@mkdir -p $(dir $@)
	@$(YAMLCONVERT) $< > $@
	@sed -i '' 's/\.yaml/.json/g' $@ || sed -i 's/\.yaml/.json/g' $@

# Target to convert all YAML files to JSON
.PHONY: convert_json
dereference_json: convert_json

convert_json: FORCE $(JSON_SCHEMAS)

# Rule to dereference JSON files
dereference_json:
	@echo "Dereferencing JSON schemas"
	@for json_file in $(JSON_SCHEMAS); do \
		$(DEREF_SCRIPT) $$json_file $$json_file; \
	done

# Clean up all generated JSON files
.PHONY: clean
clean:
	@echo "Cleaning up generated JSON schemas"
	@rm -rf $(DIST_DIR)

# Force target to always run
.PHONY: FORCE
FORCE:
