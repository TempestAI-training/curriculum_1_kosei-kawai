const assignGrades = (scores) => {
    const testScores = scores.map((score) => {
    if (score >= 80) {
        return "A";
    }
    else if (score >=60) {
        return "B";
    }
    else if (score >=40) {
        return "C";
    }
    else if (score >=20) {
        return "D";
    }
    else  {
        return "E";
    }
    });
    return testScores;
}
const N = Number(window.prompt('人数を入力してください'));
const grade = [];
for (let i=0; i <= N-1; i+=1) {
    const score = Number(window.prompt('点数を入力してください'))
    grade.push(score);
}
console.log('生徒の点数:',grade);
console.log('成績評価',assignGrades(grade));
