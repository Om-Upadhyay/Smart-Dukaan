# Project audit

Audit date: 2026-11-23

## Repository and working tree

The repository is a small Python project (`972c62f`, branch `main`). The working tree was clean at inspection. Git required a per-command `safe.directory` override because this sandbox owns the checkout; no global Git configuration was changed.

## Existing architecture

- `main.py`: LangChain `create_agent()` runner using local Ollama (`qwen2.5:3b`) and a deterministic conversion tool.
- `conversion_agent.py`, `parser_agent.py`, `memory_rag.py`, `checker_agent.py`, `pipeline.py`: four-module conversion pipeline with local reference aliases and reverse checking.
- `gui.py`: Tkinter front end for the four-module pipeline.
- `unit_converter_all_in_one.py`: bundled terminal and Tkinter implementation.
- `reference_units.md`: local unit alias reference.
- `requirements.txt`: LangChain and Ollama integration.

There is no JavaScript package manifest, web frontend, HTTP backend, database, router, environment configuration, or existing product/inventory feature. Existing functions cover length and weight conversions (with slightly differing aliases between implementations); they do not cover volume. The Python/Ollama agent requires installed dependencies, a running local Ollama service, and a pulled model. Tkinter is local desktop UI, not a deployable browser application.

## Gaps against Smart Dukaan AI brief

The repository does not contain the named Smart Dukaan product. Product CRUD, price/quantity calculations, transaction history, settings, browser UI, offline persistence, service worker, and AI product tools were all absent. Replacing the project wholesale would discard useful conversion work, so the existing Python runners and modules are retained.

## Upgrade architecture

The Smart Dukaan experience was added as a dependency-free static web application at the repository root. It uses native HTML/CSS/JavaScript, browser `localStorage` for products, transactions, and preferences, deterministic arithmetic/conversion functions, and a service worker for the app shell. This avoids introducing a build tool or backend that the current repository cannot support. The existing Python/Tkinter/LangChain application remains available independently.

Data is local to the browser profile and is not synchronized across devices. The assistant uses deterministic intent parsing and application functions; it does not claim LLM-backed natural-language coverage. A secure server-side LLM/API service and multi-user database would be separate deployment work.

## Git notes

Initial status: clean (`## main...origin/main`). No existing user changes were present to preserve.
