# 2026.03.JPM.Platform Split Index

- Source PDF: `../2026.03.JPM.Platform.pdf`
- Prototype source: `../prototype.html`
- Split rule: 依照 PDF 章節拆分，並映射到 `prototype.html` 的 sidebar/module 結構。
- Note: `Strategic Overview` 在 PDF 中沒有獨立章節，請對應到第 1 章中的 `Strategic Dashboard` 內容。

## Module Index

| Prototype ID | Sidebar Label | Route | PDF Chapter | PDF Pages | Output File | Prototype Sections |
| --- | --- | --- | --- | --- | --- | --- |
| Dashboard | Strategic Overview | `/` | No standalone chapter; see Chapter 1 `Project Portfolio Management` | 1-3 | [01-portfolio-ssot.md](./01-portfolio-ssot.md) | `Strategic Dashboard` |
| Portfolio | Portfolio (SSOT) | `/portfolio` | Chapter 1 | 1-3 | [01-portfolio-ssot.md](./01-portfolio-ssot.md) | Automated Recording via Agents<br>SSOT Central Database<br>Intelligent Threshold Alerting<br>Strategic Dashboard |
| Requirements | Requirements | `/requirements` | Chapter 2 | 3-8 | [02-requirements.md](./02-requirements.md) | Client Requirements<br>Project Brief<br>Feasibility Studies<br>Site Information<br>Project Budget<br>Project Programme<br>Procurement Strategy<br>Responsibility Matrix<br>Information Requirements |
| Milestones | Milestones | `/milestones` | Chapter 3 | 8-11 | [03-milestones.md](./03-milestones.md) | Agent-Driven Plan Parsing<br>Multi-Source Evidence Tracking<br>Dynamic Baseline Management<br>Delay Prediction Engine |
| Approvals | Gov Approvals | `/approvals` | Chapter 4 | 11-15 | [04-approvals.md](./04-approvals.md) | Agent-Driven Condition Extraction<br>Compliance Evidence Capture<br>Approval SSOT Database<br>Delay Impact Simulation |
| Procurement | Procurement | `/procurement` | Chapter 5 | 15-18 | [05-procurement.md](./05-procurement.md) | Digital BQ Validation<br>Compliance Auditing<br>Contractual Risk Prediction<br>Intelligent Tender Evaluation<br>Service Provider Profiling |
| Design | Design (BIM-Cost) | `/design` | Chapter 6 | 18-22 | [06-design.md](./06-design.md) | Intelligent BIM Consistency<br>Digital Specification Management<br>Real-Time Cost Estimation<br>Design Health Monitoring |
| Finance | Finance | `/finance` | Chapter 7 | 22-25 | [07-finance.md](./07-finance.md) | Total Funding & Revenue<br>Total Budget Control<br>Planned vs Awarded Contracts<br>Invoiced vs Paid Tracking<br>VO Sum Management<br>Cash Flow Forecasting<br>Anomaly Detection |
| Payment | Jarvis PAY | `/payment` | Chapter 8 | 25-29 | [08-payment-jarvis-pay.md](./08-payment-jarvis-pay.md) | Multi-Contract Rule Engine<br>Objective Progress Verification<br>Real-Time CE/VO Integration<br>Blockchain Audit Trail |
| Progress | Progress (Eagle Eye) | `/progress` | Chapter 9 | 29-32 | [09-progress-eagle-eye.md](./09-progress-eagle-eye.md) | 360° Site Data Capture<br>AI Trade Recognition<br>Visual Quantity Tracking<br>4D Progress Dashboard |
| Quality | Quality (DWSS) | `/quality` | Chapter 10 | 32-35 | [10-quality-dwss.md](./10-quality-dwss.md) | Work Commence / Completion Approval<br>Biometric Personnel Tracking<br>Dynamic RFI Tracking<br>Automated Site Daily |
| Safety | Safety (Smart Site) | `/safety` | Chapter 11 | 35-38 | [11-safety-smart-site.md](./11-safety-smart-site.md) | Smart Video Analytics<br>Personnel Location<br>Tower Crane Monitoring<br>Hoisting Safety<br>Environmental Monitoring<br>Excavation/Slope Sensors<br>Gas Detection<br>Structural Health<br>Drone Inspection |
| Handover | Handover | `/handover` | Chapter 12 | 38-42 | [12-handover.md](./12-handover.md) | AI Auto-Defect Detection<br>Digital Rectification Loop<br>Reality-vs-Model Verification<br>Interactive User Manual |
