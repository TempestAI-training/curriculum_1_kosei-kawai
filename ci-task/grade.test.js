const { assignGrades } = require('./grade');

describe('assignGrades関数のテスト', () => {
    test('基本的な点数の判定が正しいこと', () => {
        const inputs = [100, 80, 22, 2, 59];
        const expected = ["A", "A", "D", "E", "C"];
        expect(assignGrades(inputs)).toEqual(expected);
    });

    test('境界値のテスト（各ランクの境界線）', () => {
        // 79点(B), 80点(A), 59点(C), 60点(B) などギリギリを攻める
        const inputs = [79, 80, 59, 60, 39, 40, 19, 20];
        const expected = ["B", "A", "C", "B", "D", "C", "E", "D"];
        expect(assignGrades(inputs)).toEqual(expected);
    });
});