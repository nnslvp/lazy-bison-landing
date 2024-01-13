---
layout: blog
title: Automating Deployments with Kamal and GitHub Actions
author: MARIE CAPHLISH
date: 2023-12-06T17:18:00
SEO:
  description: 'Comprehensive guide to automating Ruby on Rails web app deployments using Kamal and GitHub Actions. Includes installation guide and sample GitHub Actions configuration.'
  keywords: 'Kamal, GitHub Actions, Web App Deployment, Automation, CI/CD Pipeline, Ruby, Ruby on Rails, Developers'
  author: 'Lazy Bison'

avatar: '/images/blogs/2023-12-06-automating-deployments-blog/author-blog.jpeg'
image: '/images/blogs/2023-12-06-automating-deployments-blog/blog-preview-img.png'
description: >
  Navigating the intricacies of web application
  deployment can be a daunting task. Enter Kamal—a
  deployment tool designed to alleviate these
  complexities. In this article, we'll delve into the
  key features of Kamal and share insights from our own
  hands-on experience.
blog_categories: ['DevOps']
---

## Introduction: Simplify Your Deployments

Learn how to automate your web app deployments using Kamal and GitHub Actions. This comprehensive guide covers installation, setup, and includes a sample configuration for seamless deployments.

## Detailed Guide to Installing Kamal

For a more in-depth look at installation and configuration, check out this [detailed post](https://www.notion.so/Effortless-Deployment-of-Web-Applications-with-Kamal-394073d1007149aaad561f17dae7ff9a?pvs=21).

### Easy Steps to Install Kamal

1. **Direct Installation**: Execute `bundle add kamal` to add the gem to your Ruby project.
   - **Compatibility Note**: May not work with older Ruby on Rails versions.
2. **Avoiding Version Conflicts**: To avoid version conflicts in Ruby on Rails versions lower than 6, it is recommended to set up a separate Gemfile.

   - Create a file named `gemfiles/kamal.Gemfile` and populate it with:

   ```ruby
    source '<https://rubygems.org>'
    gem 'kamal', '~> 1.0.0'
   ```

- Generate a runnable directory: `BUNDLE_GEMFILE=kamal/Gemfile bundle binstub kamal --path ../bin`.
- Run `BUNDLE_GEMFILE=kamal/Gemfile bundle install`.

After these steps, you can run `bin/kamal` from the console, which is particularly useful for GitHub Actions.

## The Importance of Automation in Web Development

Automation not only streamlines your workflow but also reduces errors and saves valuable time. Learn why Kamal combined with GitHub Actions is the ultimate solution for a robust, automated deployment pipeline.

## How to Set Up GitHub Actions

Create a `.github/workflows/` directory in your repository. Add a YAML file for your workflow and securely store sensitive data like passwords and keys using GitHub Secrets.

## Integrating Kamal with GitHub Actions for Seamless Deployments

Learn how to integrate Kamal into your GitHub Actions workflow for consistent and secure deployments.

## Sample GitHub Actions Configuration for Ruby on Rails

Here's a sample `.github/workflows/staging_deploy.yml` based on your configuration:

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

## Conclusion: Enhance Your CI/CD Pipeline with Kamal and GitHub Actions

Automating deployments with Kamal and GitHub Actions significantly enhances your CI/CD pipeline, making it efficient, secure, and developer-friendly.
