const MemoForm = ({
    title,
    setTitle,
    content,
    setContent,
    tag,
    setTag,
    onSave,
}) => {
    return(
        <div
        style={{
            display: "flex",
            flexDirection: "column",
            gap: 10,
            padding: 20,
            border: "1px solid #61dafb",
            marginTop: 20,
            width: 300,
        }}
        >
            <label>
                タイトル
                <input type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            </label>

            <label>
                内容
                <textarea 
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />
            </label>

            <label>
                タグ
                <input type="text" 
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                />
            </label>

            <button onClick={onSave}>保存</button>
        </div>
    );
};

export default MemoForm;