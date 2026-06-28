# Research Paper Brief — Member 3(Shreyansh Jaiswal)

## Title
**"ISO 10816-Calibrated Isolation Forest for Predictive Maintenance of ETP Equipment: Real-Time Health Classification of Industrial Pumps and Blowers"**

---

## What This Paper Is About

Equipment failure in an Effluent Treatment Plant (ETP) is as damaging as water quality violations — a failed pump or blower stops treatment entirely, causing regulatory breaches and environmental harm. This paper presents a machine learning system that classifies the health of ETP equipment in real time using three sensor streams — sound (dB), vibration (mm/s RMS), and temperature (°C) — through an IsolationForest anomaly detection model whose training data was deliberately constructed around ISO 10816 vibration severity thresholds.

The key contribution is the **ISO 10816-calibrated synthetic dataset methodology**: using an international mechanical engineering standard as the ground truth for generating training data, rather than collecting expensive real-world labeled sensor data.

---

## Core Contribution

> A synthetic sensor dataset generation methodology calibrated against ISO 10816 vibration severity zones, used to train an IsolationForest model that classifies ETP equipment health across three levels (Healthy / Warning / Critical) for Pumps and Blowers across 17 industrial sectors.

Two contributions:
1. **Methodology**: using ISO 10816 as a calibration target to generate a realistic, label-controlled synthetic training dataset for equipment health ML
2. **System**: a deployed, real-time equipment health classification module serving 17 industry-specific equipment rosters

---

## Paper Structure (8 pages, IEEE double-column)

### 1. Abstract (half column)
- Problem: ETP equipment failures are unpredictable and costly; real labeled sensor datasets are scarce
- Approach: IsolationForest trained on ISO 10816-calibrated synthetic data across 3 sensor streams
- Result: real-time 3-class health classification (Healthy/Warning/Critical) for Pumps and Blowers across 17 industries
- Key metric: anomaly score separation across the 3 health classes

---

### 2. Introduction (0.75 page)
**Write about:**
- What ETP equipment does: pumps move effluent, blowers aerate biological treatment tanks — both are critical to treatment continuity
- The cost of unplanned equipment failure: halted treatment → regulatory violation → environmental harm → fines
- Why predictive maintenance is preferable to reactive maintenance and scheduled maintenance
- The data scarcity problem: real labeled vibration/sound/temperature data from ETP equipment is expensive and rarely published
- Paper's claim: ISO 10816 provides a principled basis for generating calibrated synthetic training data, enabling effective health classification without real labeled data

---

### 3. Background & Related Work (1 page)
**Write about:**

#### 3.1 ISO 10816 Standard
ISO 10816 (now superseded by ISO 20816) defines vibration severity zones for rotating machinery:
| Zone | Vibration (mm/s RMS) | Meaning |
|---|---|---|
| A | 0 – 2.8 | New machinery, acceptable |
| B | 2.8 – 4.5 | Acceptable for long-term operation |
| C | 4.5 – 7.1 | Unsatisfactory, operate short-term only |
| D | > 7.1 | Dangerous, risk of damage |

Explain how Zones A+B → Normal, Zone C → Warning, Zone D → Critical in this system.

#### 3.2 IsolationForest for Anomaly Detection
- IsolationForest (Liu et al., 2008): isolates anomalies by randomly partitioning the feature space
- Anomaly score interpretation: score ≥ 0 → normal, score < 0 → anomalous; more negative = more anomalous
- Why IsolationForest suits this problem: works well on small feature sets (3 features), no need for labeled anomalies during training, naturally handles skewed class distributions

#### 3.3 Related Work
- Vibration-based fault detection in rotating machinery (cite 4–5 papers)
- Predictive maintenance using IsolationForest in industrial settings
- Synthetic data generation for ML in industrial domains
- Gap: no existing work applies ISO 10816 thresholds as synthetic data calibration targets for ETP-specific equipment

---

### 4. Methodology (1.5 pages)
This is the core technical section.

#### 4.1 Equipment Scope
Write about the two equipment types and why they were chosen:
- **Pump**: moves effluent between treatment stages. Critical for flow continuity.
- **Blower**: provides dissolved oxygen for aerobic biological treatment (activated sludge). Critical for biological treatment effectiveness.

Both types are present in all 17 supported industry ETPs, though with industry-specific names and locations (e.g., "Primary Clarifier Pump", "Aeration Tank Blower #1").

#### 4.2 Sensor Feature Set
Three sensor streams monitored per equipment unit:

| Feature | Unit | Why It Matters |
|---|---|---|
| Sound | dB | Bearing wear, cavitation, and misalignment produce characteristic sound increases |
| Vibration | mm/s RMS | Primary ISO 10816 indicator; directly correlates with mechanical degradation |
| Temperature | °C | Motor overheating due to bearing friction, electrical faults, or overloading |

#### 4.3 ISO 10816-Calibrated Synthetic Dataset
**This is your key methodological contribution — describe it carefully.**

The training dataset was generated synthetically rather than collected from real sensors. The rationale: real labeled ETP sensor data is scarce, expensive, and rarely available at the Warning and Critical class levels (equipment failure is infrequent by design).

**Dataset design:**

| Class | Proportion | Vibration range (mm/s) | Sound range (dB) | Temperature range (°C) |
|---|---|---|---|---|
| Healthy | 70% (1400 samples) | 0.5 – 2.8 (ISO Zone A/B) | 60 – 80 | 30 – 60 |
| Warning | 20% (400 samples) | 2.8 – 4.5 (ISO Zone C) | 80 – 90 | 60 – 75 |
| Critical | 10% (200 samples) | > 4.5 (ISO Zone D) | > 90 | > 75 |

Total: 2000 samples. Class proportions (70/20/10) reflect realistic equipment fleet distributions — most equipment operates normally most of the time.

Write about **why this calibration is principled**:
- ISO 10816 is an internationally recognized standard used by mechanical engineers worldwide
- Using its zone boundaries as dataset boundaries means the ML model's decision surface aligns with expert-validated engineering thresholds
- This is analogous to using clinical guidelines to define normal/abnormal ranges for medical ML datasets

#### 4.4 Model Training
- Algorithm: IsolationForest with `contamination=0.30` (30% of training data treated as anomalous — matching Warning + Critical proportions)
- Feature columns: `["sound", "vibration", "temperature"]`
- Preprocessing pipeline: `SimpleImputer` (median) → `StandardScaler` → `IsolationForest`
- Score interpretation: `decision_function()` output — score ≥ 0 → Healthy, score < 0 → Warning/Critical (further separated by ISO threshold checks)
- Note: `pd.DataFrame` (not plain list) is passed to `decision_function()` to avoid sklearn feature-name warnings

#### 4.5 Industry Equipment Registry
Write about how the system supports 17 industries:
- Each industry has a specific roster: Pumps and Blowers with realistic names and locations
- Example (Pharmaceutical): "API Reactor Feed Pump", "Scrubber Blower", "Effluent Transfer Pump"
- Sub-category mapping: e.g., `"grain"` resolves to the `"distillery"` roster via a `SUB_TO_ROOT` lookup
- Generic fallback: 6-unit roster (3 pumps + 3 blowers) for unsupported industry IDs
- ISO 10816 baseline values seeded as default slider values in the frontend

#### 4.6 Threshold-Plus-Score Classification
The final health classification combines two signals:
1. **IsolationForest anomaly score** (continuous): identifies whether the overall sensor profile is anomalous
2. **ISO 10816 threshold check** (rule-based): checks each individual parameter against its severity level

This two-layer approach prevents the ML model alone from being the single point of failure — a unit can be flagged as Warning by threshold even if the IsolationForest score is borderline.

---

### 5. Results & Evaluation (1 page)

#### 5.1 Anomaly Score Distribution
Report the mean anomaly score per health class from the trained model:
- Healthy: score ≈ +0.068
- Warning: score ≈ −0.020
- Critical: score ≈ −0.102

Plot a box plot or violin plot showing score distributions for each class. The separation between Healthy (+) and Critical (−) scores should be visually clear.

#### 5.2 Classification Performance
Use the synthetic test set to report:
- Accuracy for binary classification (Healthy vs Anomalous)
- Confusion matrix
- Precision/Recall/F1 per class (if labels are used for evaluation)

#### 5.3 Fleet Analysis Case Study
Walk through one industry end-to-end:
- Choose an industry (e.g., Pulp & Paper — complex equipment roster)
- Show the equipment list (names, locations, types)
- Simulate realistic sensor readings (some normal, some elevated)
- Show the fleet analysis result: overall fleet health, per-unit scores, Gemini maintenance prescriptions
- This is a qualitative demonstration of the system working end-to-end

#### 5.4 Comparison: Rule-Based vs ML + Rule-Based
Show a case where:
- The ISO threshold check alone would miss a multi-parameter anomaly (each individual parameter slightly elevated but not over threshold)
- The IsolationForest score correctly identifies the combination as anomalous
- This demonstrates the value of the ML layer on top of rule-based checks

---

### 6. Discussion (0.5 page)
**Write about:**
- Limitation: synthetic data may not capture real-world sensor noise patterns, multicollinearity, or wear-pattern temporal dependencies
- The `contamination=0.30` choice: if real equipment fleets have a different anomaly rate, retraining with a different contamination value would be needed
- Generalizability: the same methodology (ISO standard → synthetic data → IsolationForest) can be applied to other ISO standards (e.g., ISO 7919 for shaft vibration)
- Why this approach does not replace vibration analysts — it is a first-alert triage tool, not a diagnosis system

---

### 7. Conclusion & Future Work (0.5 page)
- ISO 10816-calibrated synthetic data is a principled and practical approach to the label scarcity problem in ETP equipment monitoring
- The two-layer classification (IsolationForest + threshold check) is more robust than either approach alone
- Future: collect real labeled sensor data from partner ETPs to fine-tune the model; add temporal modeling (LSTM on sensor time series) for early degradation detection before threshold violations

---

## Key Technical Terms to Use
- Predictive maintenance (PdM)
- Condition monitoring
- ISO 10816 / ISO 20816 vibration severity zones
- IsolationForest, anomaly score, contamination parameter
- Synthetic dataset, label calibration
- Feature set: sound, vibration, temperature
- Fleet analysis
- Two-layer classification (ML + rule-based)

---

## Files to Reference in the Paper

| File | What it contributes |
|---|---|
| `agents/preventive_agent.py` | PreventiveAgent, fleet analysis, IsolationForest scoring |
| `training/train_equipment_anomaly.py` | Synthetic dataset generation + model training |
| `config/equipment_thresholds.py` | ISO 10816 threshold values for Pump and Blower |
| `config/equipment_registry.py` | 17 industry equipment rosters |
| `models/equipment_anomaly_model.pkl` | Trained IsolationForest pipeline |

---

## What Results You Need to Generate
1. Run `training/train_equipment_anomaly.py` and capture the training output (accuracy, scores per class)
2. Plot anomaly score distributions for Healthy / Warning / Critical (use matplotlib or seaborn)
3. Run the `/preventive/analyze` endpoint for 2–3 industries with varied sensor inputs — save the JSON response
4. Build the fleet analysis case study table manually (one industry, full equipment roster, mixed health states)
5. Run the comparison case: find an input where individual thresholds pass but IsolationForest flags anomaly

---

## Suggested Citations to Look Up
- Liu, F.T., Ting, K.M., Zhou, Z.H. (2008). *Isolation Forest.* IEEE ICDM.
- ISO 10816-3 / ISO 20816-3: Mechanical vibration — Evaluation of machine vibration
- Papers on predictive maintenance using IsolationForest in industrial settings
- Papers on synthetic data generation for industrial ML (manufacturing, IoT sensors)
- Papers on rotating machinery fault detection using vibration signals
- CPCB Environmental Standards for ETP operation in India
