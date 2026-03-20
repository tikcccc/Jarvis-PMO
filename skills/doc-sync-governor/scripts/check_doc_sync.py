#!/usr/bin/env python3
"""Check consistency across Jarvis PMO coding-doc markdown files."""

from __future__ import annotations

import argparse
import json
from pathlib import Path


REQUIRED_FILES = [
    "coding-architect.md",
    "coding-rules.md",
    "coding-plan.md",
    "ui-consistency.md",
    "api-spec.md",
    "data-contract.md",
    "acceptance-criteria.md",
    "test-strategy.md",
]

EXPECTED_MODULE_IDS = [
    "portfolio",
    "requirements",
    "milestones",
    "approvals",
    "procurement",
    "design",
    "finance",
    "payment",
    "progress",
    "quality",
    "safety",
    "handover",
]

MODULE_DOC_SECTIONS = [
    "## 1. Module Identity",
    "## 2. Approved Source Inputs",
    "## 3. Business Intent",
    "## 4. Current State and Gap",
    "## 5. Required UI Composition",
    "## 6. Data and Code Ownership",
    "## 7. Interaction Notes",
    "## 8. Do Not Drift",
    "## 9. Implementation Tasks",
    "## 10. Acceptance Checks",
    "## 11. Documentation Sync",
]


def read_text(path: Path) -> str:
    return path.read_text(encoding="utf-8")


def add_issue(issues: list[dict], severity: str, code: str, message: str) -> None:
    issues.append({"severity": severity, "code": code, "message": message})


def require_keywords(text: str, keywords: list[str], issues: list[dict], severity: str, code: str, scope: str) -> None:
    for keyword in keywords:
        if keyword not in text:
            add_issue(issues, severity, code, f"{scope} missing keyword: {keyword}")


def main() -> int:
    parser = argparse.ArgumentParser(description="Check coding-doc consistency.")
    parser.add_argument("doc_dir", help="Path to coding-doc")
    parser.add_argument("--json", help="Write JSON report to this path", default="")
    args = parser.parse_args()

    doc_dir = Path(args.doc_dir).resolve()
    issues: list[dict] = []

    if not doc_dir.exists() or not doc_dir.is_dir():
        raise SystemExit(f"[ERROR] Directory not found: {doc_dir}")

    file_map: dict[str, Path] = {}
    for name in REQUIRED_FILES:
        path = doc_dir / name
        file_map[name] = path
        if not path.exists():
            add_issue(issues, "error", "MISSING_FILE", f"Missing required file: {path}")

    modules_dir = doc_dir / "modules"
    template_path = modules_dir / "_template.md"
    if not modules_dir.exists():
        add_issue(issues, "error", "MISSING_MODULES_DIR", f"Missing modules directory: {modules_dir}")
    elif not template_path.exists():
        add_issue(issues, "error", "MISSING_MODULE_TEMPLATE", f"Missing module template: {template_path}")

    if any(issue["severity"] == "error" and issue["code"].startswith("MISSING_") for issue in issues):
        report = {"doc_dir": str(doc_dir), "ok": False, "issues": issues}
        payload = json.dumps(report, ensure_ascii=False, indent=2)
        print(payload)
        if args.json:
            output = Path(args.json).resolve()
            output.parent.mkdir(parents=True, exist_ok=True)
            output.write_text(payload, encoding="utf-8")
            print(f"[OK] Wrote report to {output}")
        return 1

    architect = read_text(file_map["coding-architect.md"])
    rules = read_text(file_map["coding-rules.md"])
    plan = read_text(file_map["coding-plan.md"])
    ui_consistency = read_text(file_map["ui-consistency.md"])
    api_spec = read_text(file_map["api-spec.md"])
    data_contract = read_text(file_map["data-contract.md"])
    acceptance = read_text(file_map["acceptance-criteria.md"])
    test_strategy = read_text(file_map["test-strategy.md"])

    require_keywords(
        architect,
        ["/portfolio", "/requirements", "/milestones", "/approvals", "/procurement", "/design", "/finance", "/payment", "/progress", "/quality", "/safety", "/handover"],
        issues,
        "error",
        "ARCH_ROUTE_MISSING",
        "coding-architect.md",
    )
    require_keywords(
        architect,
        ["Next.js App Router", "TypeScript", "lucide-react"],
        issues,
        "warn",
        "ARCH_STACK_GAP",
        "coding-architect.md",
    )
    require_keywords(
        plan,
        ["Phase 4. Migrate High-Fidelity Screens", "Phase 5. Migrate Remaining Modules"],
        issues,
        "warn",
        "PLAN_PHASE_GAP",
        "coding-plan.md",
    )
    require_keywords(
        acceptance,
        ["strategic dashboard plus the twelve documented modules", "Sidebar grouping and navigation hierarchy remain consistent"],
        issues,
        "warn",
        "AC_COVERAGE_GAP",
        "acceptance-criteria.md",
    )
    require_keywords(
        test_strategy,
        ["all twelve module routes render", "/payment", "/portfolio"],
        issues,
        "warn",
        "TEST_STRATEGY_GAP",
        "test-strategy.md",
    )
    require_keywords(
        ui_consistency,
        ["prototype.html", "gemeni_chat.md", "white-theme executive command center"],
        issues,
        "warn",
        "UI_CONSISTENCY_GAP",
        "ui-consistency.md",
    )
    require_keywords(
        rules,
        ["data-contract.md", "coding-doc/", "NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN"],
        issues,
        "warn",
        "RULES_SYNC_REFERENCE_GAP",
        "coding-rules.md",
    )

    api_to_contract = [
        ("getNavigation()", "NavItem"),
        ("getModuleMeta(", "ModuleMeta"),
        ("getDashboardMetrics()", "MetricCard"),
        ("getDashboardFeed()", "FeedItem"),
        ("getPortfolioProjects()", "ProjectRecord"),
        ("getMilestones(", "MilestoneRecord"),
        ("getApprovals(", "ApprovalRecord"),
        ("getApprovalConditions(", "ApprovalCondition"),
    ]
    for api_keyword, contract_keyword in api_to_contract:
        if api_keyword not in api_spec:
            add_issue(issues, "error", "API_KEYWORD_MISSING", f"api-spec.md missing API seam: {api_keyword}")
        if contract_keyword not in data_contract:
            add_issue(issues, "error", "CONTRACT_KEYWORD_MISSING", f"data-contract.md missing shared type: {contract_keyword}")

    if "coding-doc/modules/" not in rules and "module doc" not in rules.lower():
        add_issue(
            issues,
            "warn",
            "RULES_MODULE_DOC_GAP",
            "coding-rules.md should mention module-doc sync or coding-doc/modules coverage.",
        )

    for module_id in EXPECTED_MODULE_IDS:
        module_doc = modules_dir / f"{module_id}.md"
        if not module_doc.exists():
            add_issue(
                issues,
                "warn",
                "MISSING_MODULE_DOC",
                f"Missing module doc: {module_doc}",
            )

    for module_doc in sorted(modules_dir.glob("*.md")):
        if module_doc.name == "_template.md":
            continue
        text = read_text(module_doc)
        for section in MODULE_DOC_SECTIONS:
            if section not in text:
                add_issue(
                    issues,
                    "warn",
                    "MODULE_DOC_SECTION_GAP",
                    f"{module_doc.relative_to(doc_dir)} missing section: {section}",
                )
        if "Current implementation status:" not in text:
            add_issue(
                issues,
                "warn",
                "MODULE_DOC_STATUS_GAP",
                f"{module_doc.relative_to(doc_dir)} missing current implementation status field.",
            )
        if "Route:" not in text or "Module id:" not in text:
            add_issue(
                issues,
                "warn",
                "MODULE_DOC_IDENTITY_GAP",
                f"{module_doc.relative_to(doc_dir)} missing route or module id metadata.",
            )

    has_error = any(issue["severity"] == "error" for issue in issues)
    report = {"doc_dir": str(doc_dir), "ok": not has_error, "issues": issues}
    payload = json.dumps(report, ensure_ascii=False, indent=2)
    print(payload)

    if args.json:
        output = Path(args.json).resolve()
        output.parent.mkdir(parents=True, exist_ok=True)
        output.write_text(payload, encoding="utf-8")
        print(f"[OK] Wrote report to {output}")

    return 1 if has_error else 0


if __name__ == "__main__":
    raise SystemExit(main())
