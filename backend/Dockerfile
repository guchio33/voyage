FROM ruby:3.0.0

RUN apt-get update -qq && apt-get -y install \
    build-essential \
    libpq-dev

RUN mkdir /backend

COPY Gemfile /backend
COPY Gemfile.lock /backend

WORKDIR /backend

RUN gem install bundler && bundle install
