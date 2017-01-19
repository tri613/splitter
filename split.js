const fs = require("fs");
const raw = fs.readFileSync("./raw.txt", "utf8");

const step1 = (raw) => {
    return raw.trim().replace(/\r/g,"")
        .split("\n")
        .map(row => {
            return row.split(" ")
                .reduce((sum, current, currentIndex, array) => {
                    if (currentIndex !== 0) {
                        const prev = parseInt(array[currentIndex-1]);
                        sum.push([prev, parseInt(current)]);
                    }
                    return sum;
                }, []);
        });
};

const step2 = (step1) => (key) => {
    const a = [];
    const b = [];
    step1.forEach(row => {
        const startIndex = row.findIndex(group => {
            const [first, second] = group;
            return (first === key);
        });
        if (startIndex >= 0) {
            const del = row.length - startIndex;
            b.push(...row.splice(startIndex, del));
        }
        a.push(...row);
    });
    return {a, b};
};

const step3 = (step2) => {
    const {a, b} = step2;
    return b.filter(groupB => {
        return !a.some(groupA => {
            const [a0, a1] = groupA;
            const [b0, b1] = groupB;
            return (a0 === b0 && a1 === b1);
        });
    });
};

const result = step3(step2(step1(raw))(3))
    .map(group => `(${group.toString()})`)
    .join(' ');

console.log(result);
