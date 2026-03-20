#!/usr/bin/env python3
"""Build a lightweight recursive index for markdown files under coding-doc/."""

from __future__ import annotations

import argparse
import json
import re
from pathlib import Path


HEADING_RE = re.compile(r"^(#{1,6})\s+(.+?)\s*$")


def should_skip(path: Path) -> bool:
    return any(part.startswith(".") for part in path.parts)


def extract_file_index(root: Path, md_path: Path) -> dict:
    text = md_path.read_text(encoding="utf-8")
    lines = text.splitlines()
    headings: list[dict] = []
    title = None

    for lineno, line in enumerate(lines, start=1):
        match = HEADING_RE.match(line)
        if not match:
            continue
        level = len(match.group(1))
        heading_text = match.group(2).strip()
        headings.append({"line": lineno, "level": level, "text": heading_text})
        if title is None and level == 1:
            title = heading_text

    rel_path = md_path.relative_to(root)
    folder = str(rel_path.parent) if str(rel_path.parent) != "." else ""
    return {
        "file": str(rel_path),
        "folder": folder,
        "title": title or md_path.stem,
        "heading_count": len(headings),
        "headings": headings,
    }


def build_index(doc_dir: Path) -> dict:
    files = sorted(
        path for path in doc_dir.rglob("*.md") if path.is_file() and not should_skip(path.relative_to(doc_dir))
    )
    indexed = [extract_file_index(doc_dir, path) for path in files]
    folders = sorted({entry["folder"] for entry in indexed if entry["folder"]})
    module_docs = sorted(
        entry["file"]
        for entry in indexed
        if entry["file"].startswith("modules/") and entry["file"] != "modules/_template.md"
    )

    return {
        "doc_dir": str(doc_dir),
        "files_count": len(indexed),
        "folders": folders,
        "module_docs": module_docs,
        "files": indexed,
    }


def main() -> int:
    parser = argparse.ArgumentParser(description="Index coding-doc markdown files.")
    parser.add_argument("doc_dir", help="Path to coding-doc directory")
    parser.add_argument(
        "--output",
        help="Optional JSON output path (for example coding-doc/.doc-index.json)",
        default="",
    )
    args = parser.parse_args()

    doc_dir = Path(args.doc_dir).resolve()
    if not doc_dir.exists() or not doc_dir.is_dir():
        raise SystemExit(f"[ERROR] Directory not found: {doc_dir}")

    index = build_index(doc_dir)
    payload = json.dumps(index, ensure_ascii=False, indent=2)
    print(payload)

    if args.output:
        output = Path(args.output).resolve()
        output.parent.mkdir(parents=True, exist_ok=True)
        output.write_text(payload, encoding="utf-8")
        print(f"[OK] Wrote index to {output}")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
