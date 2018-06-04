cp -r ./dna ../Aussie_DJs
cp -r ./dna ../Holo_Community

jq -c '.Name = "Aussie_DJs"' dna/dna.json > ../Aussie_DJs/dna/dna.json
jq -c '.Name = "Holo_Community"' dna/dna.json > ../Holo_Community/dna/dna.json
