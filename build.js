import { build } from "esbuild";
import { YAMLPlugin } from "esbuild-yaml";

const yourConfig = {};

build({
  ...yourConfig,
  plugins: [
    YAMLPlugin()
  ]
});