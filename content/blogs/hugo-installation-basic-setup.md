---
layout: blog
title: 'Getting Started with Hugo: Installation and Basic Setup without Theme'
author: Yahor Bukhta
avatar:
date: 2023-11-28T12:45:00+00:00
SEO:
  description: 'Explore our comprehensive guide on getting started with Hugo - the swift and modern static site generator. Learn step-by-step how to install Hugo, set up a CSS compiler, create a new project, and manage posts.'
  keywords: 'Hugo static site generator, Install Hugo, Hugo setup guide, Hugo for beginners, Creating a Hugo project, Hugo blog setup, Hugo templates and layouts, SASS with Hugo, Hugo installation guide, Hugo site development, Manage posts in Hugo, Hugo CSS compiler setup, Static site generation, Web development with Hugo, Hugo site configuration'
  author: 'Yahor Bukhta'
image: './images/blogs/hugo-installation-basic-setup/hugo.png'
description: >
  DESCRIPTION TEXT HERE
blog_categories: ['WebDevelopment', 'Frontend']
---

**Introduction:**

Welcome to the world of Hugo, the fastest static site generator that's transforming web development. Whether you're a seasoned coder or just starting, Hugo offers unparalleled speed and flexibility for your web projects. Let's dive into how you can set up Hugo effortlessly and why it's the go-to choice for developers around the globe.

---

**Installing Hugo**

Begin your journey with Hugo by following the easy steps outlined in the [official Hugo installation guide](https://gohugo.io/installation/).

**Step-by-Step Installation Guide:**

- **For macOS (using Homebrew):**

  ```bash
  brew install hugo
  ```

- **For Windows (using Chocolatey):**

  ```bash
  choco install hugo -confirm
  ```

- **For Linux (using Snap):**

  ```bash
  sudo snap install hugo
  ```

---

**Setting Up a CSS Compiler**

To seamlessly compile CSS from SASS/SCSS, choose a tool that best fits your OS:

- **macOS:**

  ```bash
  brew install sass/sass/sass
  ```

- **Linux (using Snap):**

  ```bash
  sudo snap install dart-sass
  ```

- **Linux (using apt-get):**

  ```bash
  sudo apt-get install dart-sass
  ```

---

**Creating a New Project: "MyBlog"**

Start your Hugo journey by initializing a new project:

```bash
hugo new site MyBlog
```

This command crafts a new directory named "MyBlog," prepping you with the essential Hugo structure.

---

**Managing Posts in Hugo**

Hugo's straightforward process makes creating, editing, and managing posts a breeze:

- **Creating a new tech post:**

  ```bash
  hugo new posts/my-first-tech-post.md
  ```

  This command generates a markdown file pre-populated with:

  ```markdown
  ---
  title: 'My First Tech Post'
  date: '2024-01-19'
  categories: ['Tech']
  ---

  Dive into my first tech post.
  ```

- **Similarly, for a web-related post:**

  ```markdown
  ---
  title: 'My First Web Post'
  date: '2024-01-19'
  categories: ['Web']
  ---

  Explore my insights on web development.
  ```

---

**Hugo Layouts and Templates**

Hugo uses layouts and templates to sculpt your website's structure, providing flexibility and control over your content's presentation.

- **Base Layout (layouts/\_default/baseof.html):**

  This foundational layout forms the HTML structure of your site, incorporating the head section and main content area.

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

- **Main Page (layouts/index.html):**

  Showcases a list of all posts and categories, a crucial feature for easy navigation.

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

- **Category Page (layouts/taxonomy/category.html):**

  Displays posts within a specific category, enhancing user experience.

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

- **Single Post Page (layouts/posts/single.html):**

  A template designed for individual post display, focusing on readability and engagement.

  ```html
  {{ define "main" }}
  <div class="post">
  	<h1>{{ .Title }}</h1>
  	<div class="content">{{ .Content }}</div>
  </div>
  {{ end }}
  ```

---

**SASS Styles (sass/styles.scss):**

Improve your site's aesthetics with simple yet elegant SASS styles:

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

**Running Hugo Server**

Preview your Hugo site locally and witness the magic:

```bash
hugo server
```

Access your site at [http://localhost:1313](http://localhost:1313/), a stepping stone to building a professional blog or a sophisticated company website. Hugo isn’t just a static site generator; it's a powerful tool that empowers you to create high-performance websites with ease.

---

**Conclusion:**

Thank you for joining this introductory journey into Hugo. Stay tuned for more in our Hugo series, where we'll dive deeper into advanced features and customization. Happy coding!
