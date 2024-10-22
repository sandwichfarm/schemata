import $RefParser from "@apidevtools/json-schema-ref-parser";
import fs from 'fs/promises';
import path from 'path';

const args = process.argv.slice(2);

const input = args[0];
const output = args[1];

const schema = await import(path.resolve(input));

try {
    const dereferencedSchema = await $RefParser.dereference(schema);
    await fs.writeFile(output, JSON.stringify(dereferencedSchema, null, 2), 'utf-8');
    console.log(`Schema written to ${output}`);
} catch (err) {
    console.error(err);
}
