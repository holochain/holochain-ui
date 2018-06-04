cp -r ./dna ./cells/Aussie_DJs
cp -r ./dna ./cells/Holo_Community

jq -c '.Name = "Aussie_DJs"' dna/dna.json > ./cells/Aussie_DJs/dna/dna.json
jq -c '.Name = "Holo_Community"' dna/dna.json > ./cells/Holo_Community/dna/dna.json
