type Node = {
    name: string;
    right: string;
    left: string;
}

const parseInput = (input: string): [string[], Node[]]=> {
    const inputLines = input.split('\n');
    const sequence = inputLines.shift()?.split('') as string[];

    return [sequence, inputLines.filter(line => line.length > 0).map(line => {
        const [name, neighbours] = line.split('=').map(s => s.trim());
        const [left, right] = neighbours.split(',').map(s => s.trim());
        return { name, left: left.replace('(', ''), right: right.replace(')', '') } as Node;
    })];
    
};

export const part1  = (input: string): number => {
    const [sequence, nodes] = parseInput(input);

    let location = 'AAA';
    let steps = 0;
    let sequenceIndex = 0;
    while (location !== 'ZZZ') {
        const currentNode = nodes.find(node => node.name === location);
        if (currentNode) {
            if (sequence[sequenceIndex] === 'L') {
                location = currentNode.left;
            } else {
                location = currentNode.right;
            }
        }
        sequenceIndex = (sequenceIndex + 1) % sequence.length;
        steps++;
    }
    return steps;
}

function gcd(a: number, b: number) {
    if (b === 0) {
        return a;
    }
    return gcd(b, a % b);
}

function lcm(a: number, b: number) {
    return Math.abs(a * b) / gcd(a, b);
}

export const part2  = (input: string): number => {
    const [sequence, nodes] = parseInput(input);

    let locations = nodes.filter(node => node.name.endsWith('A')).map(node => node.name);
    console.log(locations)
    let sequenceIndex = 0;
    const steps = new Array(locations.length).fill(0);
    while (!locations.every(location => location.endsWith('Z'))) {
        locations = locations.map((location, index) => {
            if (location.endsWith('Z')) {
                return location;
            }
            const currentNode = nodes.find(node => node.name === location);
            if (currentNode) {
                steps[index]++;
                if (sequence[sequenceIndex] === 'L') {
                    return currentNode.left;
                } else {
                    return currentNode.right;
                }
                
            }
            return location;
        });
        // console.log(locations.map(location => nodes.find(node => node.name === location)))
        // if (steps === 10) {
        //     break;
        // }
        sequenceIndex = (sequenceIndex + 1) % sequence.length;
    }
    return steps.reduce((a, b) => lcm(a, b));
}