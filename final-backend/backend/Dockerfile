FROM python:3.9-buster

# Pythonの出力をバッファリングしない設定
ENV PYTHONUNBUFFERED=1

WORKDIR /src

# pipを使ってpoetryをインストール
RUN pip install poetry

# poetryの定義ファイルをコピー
COPY pyproject.toml* poetry.lock* ./

# Docker内では仮想環境を作らず、システム全体にインストールする
RUN poetry config virtualenvs.create false
# ライブラリをインストール
RUN if [ -f pyproject.toml ]; then poetry install --no-root; fi
# uvicornサーバーの立ち上げ
ENTRYPOINT ["uvicorn", "api.main:app", "--host", "0.0.0.0", "--reload"]