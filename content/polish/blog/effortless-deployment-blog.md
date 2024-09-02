---
title: Bezproblemowe wdrażanie aplikacji webowych z Kamal
author: Yahor Bukhta
avatar:
date: 2023-12-06T17:18:00
SEO:
  description: 'Dowiedz się, jak Kamal upraszcza wdrażanie aplikacji webowych dzięki funkcjom takim jak zero przestojów, stopniowe wdrażanie i elastyczna konfiguracja. Idealne dla programistów.'
  keywords: 'Kamal, Wdrażanie Aplikacji Webowych, Zero Przestojów, Stopniowe Wdrażanie, Elastyczna Konfiguracja, Programiści'
  author: 'Yahor Bukhta'
image: './images/kamal.png'
blog_categories: ['DevOps']
---

### Wprowadzenie:

Poruszanie się po zawirowaniach wdrażania aplikacji webowych może być przytłaczające. Oto Kamal – narzędzie do wdrażania zaprojektowane, aby uprościć te złożoności. W tym artykule przyjrzymy się kluczowym funkcjom Kamala i podzielimy się spostrzeżeniami z naszego własnego doświadczenia.

### Kluczowe Zalety Kamala

Kamal oferuje szereg funkcji, które czynią go idealnym rozwiązaniem do wdrażania aplikacji webowych:

- **Zero Przestojów**: Kamal zapewnia nieprzerwaną usługę podczas procesu wdrażania.
- **Stopniowe Wdrażanie**: Aktualizuj swoją aplikację płynnie, bez wpływu na doświadczenie końcowego użytkownika.
- **Elastyczna Konfiguracja**: Kamal oferuje rozbudowane opcje zarządzania zmiennymi środowiskowymi i danymi wrażliwymi w sposób bezpieczny.

### Dlaczego Wybraliśmy Kamal

W naszej studiu deweloperskim Kamal stał się nieocenionym narzędziem. Jego intuicyjny interfejs konfiguracyjny i kompleksowy zestaw funkcji znacznie zmniejszyły nasze obciążenie związane z wdrażaniem, pozwalając nam skoncentrować się na rozwoju. Szczególnie godne uwagi jest solidne zarządzanie zmiennymi środowiskowymi i sekretami.

### Przewodnik Instalacji

Instalacja Kamala jest prosta. Oto Twoje opcje:

1. Aby dodać gem do projektu Ruby on Rails, po prostu wykonaj **`bundle add kamal`**. Należy pamiętać, że mogą wystąpić problemy z kompatybilnością z starszymi wersjami Ruby on Rails.

2. Dla użytkowników Dockera, możesz stworzyć alias w konfiguracji konsoli, aby uruchomić Kamala w następujący sposób:

```bash
alias kamal="docker run -it --rm -v '${PWD}:/workdir' -v '/run/host-services/ssh-auth.sock:/run/host-services/ssh-auth.sock' -e SSH_AUTH_SOCK='/run/host-services/ssh-auth.sock' -v /var/run/docker.sock:/var/run/docker.sock ghcr.io/basecamp/kamal:latest"
```

1. To avoid version conflicts, you can set up a separate Gemfile as follows:

- Utwórz plik o nazwie **`gemfiles/kamal.Gemfile`** i wypełnij go następującą zawartością:

```ruby
source 'https://rubygems.org'
gem 'kamal', '~> 1.0.0'
```

- Run

```bash
BUNDLE_GEMFILE=kamal/Gemfile bundle install
```

- Wygeneruj katalog do uruchamiania za pomocą

```bash
BUNDLE_GEMFILE=kamal/Gemfile bundle binstub kamal --path ../bin
```

Po wykonaniu tych kroków, możesz uruchomić **`bin/kamal`** z konsoli. Jest to szczególnie przydatne w przypadku GitHub Actions, jeśli dodanie gema do projektu nie jest możliwe.

### Kroki konfiguracyjne

Konfiguracja Kamala jest prosta. Wystarczy uruchomić **`kamal init`**, aby wygenerować niezbędne katalogi i pliki. Następnie możesz przystąpić do konfiguracji ustawień wdrożenia za pomocą plików **`deploy.yml`** oraz **`deploy.<nazwa środowiska>.yml`**.

Oto przykładowy plik **`deploy.yml`**, który pomoże Ci zacząć:

```yaml
# Name of your application. Used to uniquely configure containers.
service: <project_name>

# Name of the container image.
image: <docker_image_name>

# Deploy to these servers.
# servers:
#  - 192.168.0.1

# Credentials for your image host.
# registry:
# Specify the registry server, if you're not using Docker Hub
# server: registry.digitalocean.com / ghcr.io / ...

username:
  - DOCKER_REGISTRY_USERNAME # this is ENV variable

# Always use an access token rather than real password when possible.
password:
  - DOCKER_REGISTRY_PASSWORD # also ENV variable

# Inject ENV variables into containers (secrets come from .env).
# Remember to run `kamal env push` after making changes!
env:
#   clear:
#     DB_HOST: 192.168.0.2
secret:
  - RAILS_MASTER_KEY
  - MYSQL_ROOT_PASSWORD

# Use a different ssh user than root
# ssh:
#   user: app

# Configure builder setup.

builder:
  multiarch: false
  cache:
    type: registry
    options: mode=max,image-manifest=true,oci-mediatypes=true

# builder:
#   args:
#     RUBY_VERSION: 3.2.0
#   secrets:
#     - GITHUB_TOKEN
#   remote:
#     arch: amd64
#     host: ssh://app@192.168.0.1

# Use accessory services (secrets come from .env).
# accessories:
#   db:
#     image: mysql:8.1.0
#     host: 192.168.0.2
#     port: 3306
#     env:
#       clear:
#         MYSQL_ROOT_HOST: '%'
#       secret:
#         - MYSQL_ROOT_PASSWORD
#     directories:
#       - data:/var/lib/mysql
#   redis:
#     image: redis:7.2.1
#     host: 192.168.0.3
#     port: 6379
#     directories:
#       - data:/data

# Configure custom arguments for Traefik
# traefik:
#   args:
#     accesslog: true
#     accesslog.format: json

# Configure a custom healthcheck (default is /up on port 3000)
healthcheck:
  max_attempts: 30
# Bridge fingerprinted assets, like JS and CSS, between versions to avoid
# hitting 404 on in-flight requests. Combines all files from new and old
# version inside the asset_path.
# asset_path: /rails/public/assets

# Configure rolling deploys by setting a wait time between batches of restarts.
# boot:
#   limit: 10 # Can also specify as a percentage of total hosts, such as "25%"
#   wait: 2
```

A oto przykładowy plik **`deploy.staging.yml`** dla środowisk stagingowych:

```yaml
servers:
  - <staging server ip>

env:
  clear:
    RAILS_ENV: staging
    DB_HOST: <staging DB server ip>
    REDIS_HOST: <staging Redis server ip>

accessories:
  db:
    image: mysql:8.1.0
    host: <staging DB server ip>
    port: 3306
    env:
      clear:
        MYSQL_ROOT_HOST: '%'
      secret:
        - MYSQL_ROOT_PASSWORD
    directories:
      - data:/var/lib/mysql
  redis:
    image: redis:7.2.1
    host: <staging Redis server ip>
    port: 6379
    directories:
      - data:/data
```

### Przewodnik po użyciu

Aby skonfigurować swój serwer, wykonaj polecenie **`kamal setup`**. W naszym przypadku polecenie to wygląda następująco:

```bash
kamal setup -d staging
```

Aby stworzyć plik `.env`, wykonaj polecenie **`kamal envify`**. W naszym przypadku polecenie to wygląda następująco:

```bash
kamal envify -d staging
```

Aby przesłać zmienne z plików `.env` na serwer, wykonaj polecenie **`kamal env push`**. W naszym przypadku polecenie to wygląda następująco:

```bash
kamal env push -d staging
```

Aby **wdrożyć** swoją aplikację, użyj polecenia **`kamal deploy`**. W naszym przypadku polecenie to wygląda następująco:

```bash
kamal deploy -d staging
```

### Podsumowanie

Kamal wyróżnia się jako uproszczone i efektywne rozwiązanie do wdrażania aplikacji webowych. Jego funkcje zapewniające brak przestojów, stopniowe wdrożenia i elastyczne opcje konfiguracji czynią go niezbędnym narzędziem dla każdego zespołu deweloperskiego.
