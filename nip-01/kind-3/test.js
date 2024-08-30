import Ajv from 'ajv';
import fs from 'fs';
import path from 'path';

const ajv = new Ajv({ allErrors: true });

function readJsonFile(filePath) {
  try {
    const absolutePath = path.resolve(filePath);
    const fileContent = fs.readFileSync(absolutePath, 'utf8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.error(`Error reading or parsing ${filePath}:`, error);
    process.exit(1);
  }
}

const kind3Schema = readJsonFile('./dist/schema.json');
const kind3SchemaContent = readJsonFile('./dist/schema.content.json');
const event = readJsonFile('samples/1.json');

const eventValid = ajv.validate(kind3Schema, event);
if (!eventValid) {
  console.error('Event validation errors:', ajv.errors);
} else {
  console.log('Event is valid');
}

const eventContentValid = ajv.validate(kind3SchemaContent, event.content);
if (!eventContentValid) {
  console.error('Event content validation errors:', ajv.errors);
} else {
  console.log('Event content is valid');
}
