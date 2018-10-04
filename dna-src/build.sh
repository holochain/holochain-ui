#!/usr/bin/env bash

tsc -p .;
cpx \"./**/*.json\" ../dna/;
rm -r ../dna/node_modules;

# generate schemas from types
typescript-json-schema ./tsconfig.json PersonaSpec --required -o ../dna/personas/persona.json 
typescript-json-schema ./tsconfig.json Field --required -o ../dna/personas/field.json 
typescript-json-schema ./tsconfig.json ProfileSpec --required -o ../dna/profiles/profile.json 
typescript-json-schema ./tsconfig.json ProfileField --required -o ../dna/profiles/field.json"