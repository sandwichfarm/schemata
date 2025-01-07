import $RefParser from "@apidevtools/json-schema-ref-parser";
import fs from 'fs/promises';
import path from 'path';

const args = process.argv.slice(2);

const input = args[0];
const output = args[1];

try {
    const schemaData = await fs.readFile(path.resolve(input), 'utf-8');
    const schema = JSON.parse(schemaData);
    const dereferencedSchema = await $RefParser.dereference(schema);
    await fs.writeFile(output, JSON.stringify(dereferencedSchema, null, 2), 'utf-8');
    console.log(`Schema written to ${output}`);
} catch (err) {
    console.error(err);
}