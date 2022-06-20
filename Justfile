default: 
    @echo 'This is a default recipe.'

dev:
    @# handle opening the permissions file
    @deno run --allow-all --watch --import-map=maps.json src/main.ts

build:
    # handle build job
    @deno compile --allow-all --import-map=maps.json src/main.ts

run:
    echo 'This is a run recipe.'

test:
    @deno test


fmt:
    @deno fmt


