#!/usr/bin/env bash

# build typescript to js
tsc -p .
cpx \"./**/*.json\" ../dna/

# generate json schemas from types
npx typescript-json-schema ./tsconfig.json PersonaSpec -o ../dna/personas/persona.json
npx typescript-json-schema ./tsconfig.json Field -o ../dna/personas/field.json