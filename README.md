# Go SearchEngine 🕷️
[![Go](https://github.com/Acollie/Go-Webcrawler/actions/workflows/go.yml/badge.svg)](https://github.com/Acollie/Go-Webcrawler/actions/workflows/go.yml)

![Example of a graph](/assets/example.png "Example of a graph")

## Overview 🌐

### 1. Spider

This goes to websites and finds new ones it uses a local SqliteDB, LRU cache and a stack.

### 2. Conductor

This polls the spiders to check if they significantly more websites.

Why use should the conductor poll the children. To avoid database contention, children all accessed the

### 3. Cartographer

The role of this more complex. This is used to create a view of the pages and see which are linking to each other.
Because the graph is so large we can not load the whole thing so in order to avoid this we load a section and traverse
that.
We can then use this list to generate list of the more important pages

### 4. Connectome

This front end which allows for the Database to be searched

