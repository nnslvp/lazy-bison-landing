---
title: 'Rozpoczęcie pracy z Hugo: Instalacja i podstawowa konfiguracja bez użycia motywu'
author: Yahor Bukhta
avatar:
date: 2024-01-02T12:45:00+00:00
SEO:
description: ‘Zapoznaj się z naszym kompleksowym przewodnikiem dotyczącym rozpoczęcia pracy z Hugo – szybkim i nowoczesnym generatorem stron statycznych. Naucz się krok po kroku, jak zainstalować Hugo, skonfigurować kompilator CSS, utworzyć nowy projekt i zarządzać postami.’
keywords: ‘Hugo generator stron statycznych, Instalacja Hugo, Przewodnik konfiguracji Hugo, Hugo dla początkujących, Tworzenie projektu Hugo, Konfiguracja bloga Hugo, Szablony i układy Hugo, SASS z Hugo, Przewodnik instalacji Hugo, Tworzenie stron z Hugo, Konfiguracja witryny Hugo, Zarządzanie postami w Hugo, Konfiguracja kompilatora CSS w Hugo, Generowanie stron statycznych, Tworzenie stron internetowych z Hugo, Konfiguracja witryny Hugo’
author: ‘Yahor Bukhta’
image: ‘./images/hugo.png’
description: ''
blog_categories: ['WebDevelopment', 'Frontend']
---

**Wprowadzenie:**

Witamy w świecie Hugo, najszybszego generatora stron statycznych, który rewolucjonizuje rozwój stron internetowych. Niezależnie od tego, czy jesteś doświadczonym programistą, czy dopiero zaczynasz, Hugo oferuje niezrównaną szybkość i elastyczność dla Twoich projektów internetowych. Zanurzmy się w to, jak łatwo możesz skonfigurować Hugo i dlaczego jest to preferowany wybór dla programistów na całym świecie.


**Instalacja Hugo**

Rozpocznij swoją podróż z Hugo, postępując zgodnie z łatwymi krokami opisanymi w [oficjalnym przewodniku instalacji Hugo](https://gohugo.io/installation/).

**Krok po kroku: Przewodnik instalacji:**

- **Dla macOS (za pomocą Homebrew):**

  ```bash
  brew install hugo
  ```

- **Dla Windows (za pomocą Chocolatey):**

  ```bash
  choco install hugo -confirm
  ```

- **Dla Linux (za pomocą Snap):**

  ```bash
  sudo snap install hugo
  ```

---

**Konfiguracja kompilatora CSS**

Aby bezproblemowo kompilować CSS z SASS/SCSS

- **macOS:**

  ```bash
  brew install sass/sass/sass
  ```

- **Dla Linux (za pomocą Snap):**

  ```bash
  sudo snap install dart-sass
  ```

- **Linux (za pomocą apt-get):**

  ```bash
  sudo apt-get install dart-sass
  ```

---

**Tworzenie nowego projektu: "MyBlog"**

Rozpocznij swoją podróż z Hugo, inicjując nowy projekt:

```bash
hugo new site MyBlog
```

Ta komenda tworzy nowy katalog o nazwie "MyBlog," przygotowując Cię do pracy z podstawową strukturą Hugo.

---

**Zarządzanie postami w Hugo**

Hugo sprawia, że tworzenie, edytowanie i zarządzanie postami jest dziecinnie proste:

- **Tworzenie nowego posta technologicznego:**

  ```bash
  hugo new posts/my-first-tech-post.md
  ```

Ta komenda generuje plik markdown z wstępnie wypełnioną treścią:

  ```markdown
  ---
  title: 'Mój pierwszy post technologiczny'
  date: '2024-01-19'
  categories: ['Tech']
  ---

Zanurz się w moim pierwszym poście technologicznym.
  ```

- **Podobnie, dla posta związanego z web developmencie:**

  ```markdown
  ---
  title: 'Mój pierwszy post o web developmencie'
  date: '2024-01-19'
  categories: ['Web']
  ---

 Odkryj moje spostrzeżenia na temat web developmentu.

  ```

---

**Układy i szablony w Hugo**

Hugo korzysta z układów i szablonów do kształtowania struktury Twojej witryny, zapewniając elastyczność i kontrolę nad prezentacją treści.

- **Podstawowy układ (layouts/_default/baseof.html):**

  Ten podstawowy układ tworzy strukturę HTML Twojej witryny, zawierając sekcję head i główny obszar treści.

  ```html
  <!DOCTYPE html>
  <html lang="en">
  	<head>
  		<meta charset="UTF-8" />
  		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
  		<title>{{ .Params.title }}</title>
  		{{ $opts := dict "transpiler" "dartsass" "targetPath" "css/style.css"
  		"vars" site.Params.styles }} {{ with resources.Get "sass/styles.scss" |
  		toCSS $opts | minify | fingerprint }}
  		<link
  			rel="stylesheet"
  			href="{{ .RelPermalink }}"
  			integrity="{{ .Data.Integrity }}"
  			crossorigin="anonymous"
  		/>
  		{{ end }}
  	</head>
  	<body>
  		<main>{{ block "main" . }} {{ end }}</main>
  	</body>
  </html>
  ```

- **Strona główna (layouts/index.html):**

  Wyświetla listę wszystkich postów i kategorii, co jest kluczowe dla łatwej nawigacji.

  ```html
  {{ define "main" }}
  <ul>
  	<li><a href="/posts">All Posts</a></li>
  	{{ range .Site.Taxonomies.categories }}
  	<li><a href="{{ .Page.Permalink }}">{{ .Page.Title }}</a></li>
  	{{ end }}
  </ul>
  {{ end }}
  ```

- **Strona kategorii (layouts/taxonomy/category.html):**

  Wyświetla posty w konkretnej kategorii, poprawiając doświadczenie użytkownika.

  ```html
  {{ define "main" }}
  <div class="content">
  	{{ range .Pages }}
  	<article>
  		<h2><a href="{{ .Permalink }}">{{ .Title }}</a></h2>
  		<p>{{ .Summary }}</p>
  	</article>
  	{{ end }}
  </div>
  <div class="sidebar">
  	<ul>
  		<li><a href="/posts">All Posts</a></li>
  		{{ range .Site.Taxonomies.categories }}
  		<li><a href="{{ .Page.Permalink }}">{{ .Page.Title }}</a></li>
  		{{ end }}
  	</ul>
  </div>
  {{ end }}
  ```

- **Strona pojedynczego posta (layouts/posts/single.html):**

  Szablon zaprojektowany do wyświetlania pojedynczego posta, skupiający się na czytelności i zaangażowaniu.

  ```html
  {{ define "main" }}
  <div class="post">
  	<h1>{{ .Title }}</h1>
  	<div class="content">{{ .Content }}</div>
  </div>
  {{ end }}
  ```

---

**Style SASS (sass/styles.scss):**

Popraw estetykę swojej witryny za pomocą prostych, ale eleganckich stylów SASS:

```scss
body {
	font-family: Arial, sans-serif;
	background-color: #f4f4f4;
	margin: 0;
	padding: 0;
}

.main {
	width: 80%;
	margin: auto;
	background: white;
	padding: 20px;
}

.sidebar {
	background: #333;
	color: white;
	padding: 20px;
}

.sidebar ul {
	list-style: none;
	padding: 0;
}

.sidebar ul li a {
	color: white;
	text-decoration: none;
}
```

---

**Uruchomienie serwera Hugo**

Podglądaj swoją stronę Hugo lokalnie i zobacz efekty:

```bash
hugo server
```

Uzyskaj dostęp do swojej witryny pod adresem [http://localhost:1313](http://localhost:1313/), co jest krokiem milowym w budowie profesjonalnego bloga lub zaawansowanej strony firmowej. Hugo to nie tylko generator stron statycznych; to potężne narzędzie, które umożliwia tworzenie wysokowydajnych witryn z łatwością.

---

**Zakończenie:**

Dziękujemy za udział w tej wprowadzeniowej podróży do świata Hugo. Śledź naszą serię o Hugo, gdzie zagłębimy się w bardziej zaawansowane funkcje i personalizację. Szczęśliwego kodowania!
