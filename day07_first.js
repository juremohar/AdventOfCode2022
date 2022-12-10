const { readFileSync } = require('fs');

function syncReadFile(filename) {
    const contents = readFileSync(filename, 'utf-8');
    return contents.split(/\r?\n/);
}

function isNumeric(value) {
    return /^-?\d+$/.test(value);
}

const data = syncReadFile('./day07.txt');

let dict = {};
let path = [];

data.forEach(line => {
    let commandArguments = line.split(" ");

    if (commandArguments[0] == "$" && commandArguments[1] == "cd") {
        if (commandArguments[2] == "/") return;
        commandArguments[2] == ".." ? path.pop() : path.push(commandArguments[2])
    }

    if (isNumeric(commandArguments[0])) {
        for (let i = 0; i <= path.length; i++) {
            let absolutePath = "/" + path.slice(0, i).join("/");
            if (!dict[absolutePath]) {
                dict[absolutePath] = 0;
            }

            dict[absolutePath] += commandArguments[0] * 1;
        }
    }
});

let sum = 0
for (const [path, value] of Object.entries(dict)) {
    if (value < 100000) {
        sum += value;
    }
}

console.log(sum)
