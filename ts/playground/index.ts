console.log('Hello World.');

// Typescript only allows syntax.
function add(a: number, b: number): number {
    return a + b;
}
// More complex types.
interface Person {
    name: string;
    age: number;
}
const person: Person = {
    name: 'Alice',
    age: 30
};
// Using the add function.

console.log('Sum of 2 and 3 is:', add(2, 3));
console.log('Sum of 5 and 7 is:', add(5, 7));
