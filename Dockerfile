FROM ruby:2.4.1

# シェルスクリプトとしてbashを利用
RUN rm /bin/sh && ln -s /bin/bash /bin/sh

# リポジトリを更新し依存モジュールをインストール
RUN apt-get update -qq && apt-get install -y build-essential

# Node.jsをインストール
RUN curl -sL https://deb.nodesource.com/setup_8.x | bash - && \
    apt-get install nodejs

ENV LANG C.UTF-8
ENV ROOT_PATH /clickerapp

# ルート直下にwebappという名前で作業ディレクトリを作成（コンテナ内のアプリケーションディレクトリ）
RUN mkdir $ROOT_PATH
WORKDIR $ROOT_PATH

# ホストのGemfileとGemfile.lockをコンテナにコピー
ADD Gemfile $ROOT_PATH/Gemfile
ADD Gemfile.lock $ROOT_PATH/Gemfile.lock

# bundle installの実行
RUN bundle install

# ホストのアプリケーションディレクトリ内をすべてコンテナにコピー
ADD . $ROOT_PATH

# puma.sockを配置するディレクトリを作成
RUN mkdir -p tmp/sockets
