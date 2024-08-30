const Ajv2020 = require("ajv");
const fs = require('fs');
const path = require('path');

const ajv = new Ajv2020({ allErrors: true });

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

const event1 = readJsonFile('samples/valid.json');
const content1 = JSON.parse(event1.content)

const event1Valid = ajv.validate(kind3Schema, event1);
if (!event1Valid) {
  console.error('Event validation errors:', ajv.errors);
} else {
  console.log('Event is valid');
}

const event1ContentValid = ajv.validate(kind3SchemaContent, content1);
if (!event1ContentValid) {
  console.error('Event content validation errors:', ajv.errors);
} else {
  console.log('Event content is valid');
}


const event2 = readJsonFile('samples/invalid.json');
const content2 = JSON.parse(event2.content)

const event2Valid = ajv.validate(kind3Schema, event2);
if (!event2Valid) {
  console.error('Event validation errors:', ajv.errors);
} else {
  console.log('Event is valid');
}

const event2ContentValid = ajv.validate(kind3SchemaContent, content2);
if (!event2ContentValid) {
  console.error('Event content validation errors:', ajv.errors);
} else {
  console.log('Event content is valid');
}
