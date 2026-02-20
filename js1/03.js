const N = Number(window.prompt("自然数を入力してください"));
let evenSum = 0;
let oddSum = 0;
for (let i = 1; i <= N; i += 1) {
    if (i%2 == 0) {
        evenSum += i;
    }
    else {
        oddSum += i;
    }
}
const difference = Math.abs(evenSum - oddSum)
document.write(difference)
