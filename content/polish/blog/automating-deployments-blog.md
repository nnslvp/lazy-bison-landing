---
title: Automatyzacja wdrożeń za pomocą Kamal i GitHub Actions
author: Yahor Bukhta
avatar:
date: 2023-12-08T17:18:00
SEO:
  description: 'Kompleksowy przewodnik po automatyzacji wdrożeń aplikacji webowych Ruby on Rails za pomocą Kamal i GitHub Actions. Zawiera przewodnik instalacji oraz przykładową konfigurację GitHub Actions.'
  keywords: 'Kamal, GitHub Actions, Wdrożenie Aplikacji Webowych, Automatyzacja, CI/CD Pipeline, Ruby, Ruby on Rails, Programiści'
  author: 'Yahor Bukhta'
image: '/images/kamal-in-github-actions.png'
blog_categories: ['DevOps']
---

## Wprowadzenie: Uprość swoje wdrożenia

Dowiedz się, jak zautomatyzować wdrożenia aplikacji webowych za pomocą Kamal i GitHub Actions. Ten kompleksowy przewodnik obejmuje instalację, konfigurację oraz przykładową konfigurację dla bezproblemowych wdrożeń.

## Szczegółowy przewodnik instalacji Kamal

Aby uzyskać bardziej szczegółowe informacje na temat instalacji i konfiguracji, zapoznaj się z tym [szczegółowym wpisem]({{< relref "blog/effortless-deployment-blog" >}}).

### Proste kroki do zainstalowania Kamal

1. **Bezpośrednia instalacja**: Wykonaj `bundle add kamal`, aby dodać gem do swojego projektu Ruby.
   - **Uwaga dotycząca kompatybilności**: Może nie działać ze starszymi wersjami Ruby on Rails.
2. **Unikanie konfliktów wersji**: Aby uniknąć konfliktów wersji w starszych wersjach Ruby on Rails poniżej 6, zaleca się utworzenie osobnego pliku Gemfile.

   - Utwórz plik o nazwie `gemfiles/kamal.Gemfile` i wypełnij go:

   ```ruby
    source '<https://rubygems.org>'
    gem 'kamal', '~> 1.0.0'
   ```

- Wygeneruj uruchamialny katalog:

  ```bash
  BUNDLE_GEMFILE=kamal/Gemfile bundle binstub kamal --path ../bin
  ```

- Uruchom

  ```bash
  BUNDLE_GEMFILE=kamal/Gemfile bundle install
  ```

Po wykonaniu tych kroków możesz uruchomić `bin/kamal` z konsoli, co jest szczególnie przydatne dla GitHub Actions.

## Znaczenie automatyzacji w rozwoju aplikacji webowych

Automatyzacja nie tylko usprawnia przepływ pracy, ale także zmniejsza liczbę błędów i oszczędza cenny czas. Dowiedz się, dlaczego Kamal w połączeniu z GitHub Actions to idealne rozwiązanie dla solidnego, zautomatyzowanego pipeline’u wdrożeniowego.

## Jak skonfigurować GitHub Actions

Utwórz katalog `.github/workflows/` w swoim repozytorium. Dodaj plik YAML dla swojego workflow i bezpiecznie przechowuj wrażliwe dane, takie jak hasła i klucze, za pomocą GitHub Secrets.

## Integracja Kamal z GitHub Actions dla bezproblemowych wdrożeń

Dowiedz się, jak zintegrować Kamal z workflow GitHub Actions, aby zapewnić spójne i bezpieczne wdrożenia.

## Przykładowa konfiguracja GitHub Actions dla Ruby on Rails

Oto przykładowa konfiguracja `.github/workflows/staging_deploy.yml` oparta na Twojej konfiguracji:

```yml
name: 'Staging deploy'

on:
  push:
    branches: ['develop']

concurrency: staging_environment

jobs:
  deploy:
    runs-on: ubuntu-20.04

    # change it
    env:
      RAILS_MASTER_KEY: ${{ secrets.RAILS_MASTER_KEY }}
      DOCKER_REGISTRY_USERNAME: ${{ secrets.DOCKERHUB_USERNAME }}
      DOCKER_REGISTRY_PASSWORD: ${{ secrets.DOCKERHUB_PASSWORD }}
      MYSQL_ROOT_PASSWORD: ${{ secrets.MYSQL_ROOT_PASSWORD }}

    steps:
      - name: Check out the repo
        uses: actions/checkout@v3

      - name: SSH Auth
        uses: webfactory/ssh-agent@v0.8.0
        with:
          ssh-private-key: ${{ secrets.STAGING_KEY }}

      # Need for registry cache
      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v2

      - name: Install Kamal
        uses: ruby/setup-ruby@v1
        env:
          BUNDLE_GEMFILE: ./gemfiles/kamal.gemfile
        with:
          ruby-version: 2.7.8 # change it
          bundler-cache: true

      - name: Update server envs
        run: kamal env push -d staging
      # run: ./bin/kamal env push -d staging

      - name: Deploy
        run: kamal deploy -d staging
    # run: ./bin/kamal deploy -d staging
```

## Podsumowanie: Udoskonal swój pipeline CI/CD za pomocą Kamal i GitHub Actions

Automatyzacja wdrożeń z Kamal i GitHub Actions znacznie udoskonala Twój pipeline CI/CD, czyniąc go wydajnym, bezpiecznym i przyjaznym dla deweloperów.
