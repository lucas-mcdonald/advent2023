const parseInput = (input: string): number[][] => {
    return input.split('\n').map(line => line.split(/\s+/).map(num => parseInt(num))) ;
}

const getDx = (sequence: number[]): number[] => {
    let dx = [];
    for (let i = 1; i < sequence.length; i++) {
        dx.push(sequence[i] - sequence[i - 1]);
    }
    return dx;
}

const extrapolate = (sequence: number[]): number[] => {
    let extrapolated = [...sequence];
    let dx = getDx(extrapolated);
    if (dx.every(d => d === 0)) {
        extrapolated.push(extrapolated[extrapolated.length - 1]);
    } else {
        let last = extrapolated[extrapolated.length - 1] + extrapolate(dx)[dx.length];
        extrapolated.push(last)
    }
    return extrapolated;
}

const runExtrapolation = (sequences: number[][]): number => {
    const nextValues: number[] = [];
    for (let i = 0; i < sequences.length; i++) {
        const extrapolated = extrapolate(sequences[i]);
        nextValues.push(extrapolated[extrapolated.length - 1]);
    }
    return nextValues.reduce((a, b) => a + b, 0);
}

const part1 = (input: string): number => {
    const sequences = parseInput(input);
    return runExtrapolation(sequences);
}

const part2 = (input: string): number => {
    const sequences = parseInput(input).map(sequence => sequence.toReversed());
    return runExtrapolation(sequences);
}

export default {
    part1,
    part2
}