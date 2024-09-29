FROM ruby:3.2.2

RUN apt-get update -qq && \
    apt-get install -y nodejs postgresql-client

WORKDIR /myapp

COPY Gemfile /myapp/Gemfile
COPY Gemfile.lock /myapp/Gemfile.lock

RUN git config --global user.email "gustavo.malamud@gmail.com" && \
    git config --global user.name "Gustavo Malamud"

RUN bundle install

COPY . /myapp

EXPOSE 3000

CMD ["rails", "server", "-b", "0.0.0.0"]