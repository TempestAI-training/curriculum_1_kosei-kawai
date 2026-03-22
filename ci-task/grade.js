/**
 * 点数の配列を受け取り、成績の配列を返す関数
 * 80点以上: "A"
 * 60点以上: "B"
 * 40点以上: "C"
 * 20点以上: "D"
 * それ以外: "E"
 */
const assignGrades = (scores) => {
    return scores.map((score) => {
        if (score >= 80) {
            return "A";
        } else if (score >= 60) {
            return "B";
        } else if (score >= 40) {
            return "C";
        } else if (score >= 20) {
            return "D";
        } else {
            return "E";
        }
    });
};

// 別のファイル（テスト）からこの関数を使えるようにエクスポートする
module.exports = { assignGrades };