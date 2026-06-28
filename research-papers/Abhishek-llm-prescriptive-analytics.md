# Research Paper Brief — Member 2(Abhishek Chaubey)

## Title
**"Schema-Constrained LLM Prompting for Prescriptive Industrial Wastewater Treatment: A Gemini-Based Approach to Structured Chemical Recommendation"**

---

## What This Paper Is About

When a wastewater sensor reading violates a regulatory threshold, knowing *that* a violation occurred is not enough — an operator needs to know *what to do about it*. This paper presents a system that uses Google's Gemini LLM, constrained by a carefully engineered Pydantic schema and structured prompting strategy, to automatically generate per-parameter chemical treatment prescriptions (reagent name, dosage, unit operation, expected outcome, cost band) directly from detected wastewater violations.

The paper also documents a real and undocumented failure mode in the Gemini API's structured generation system — the `$defs` validation error — and presents the workaround that restores structured output without a framework change.

---

## Core Contribution

> The design, implementation, and evaluation of a schema-constrained LLM pipeline that converts wastewater parameter violations into actionable, parameter-specific chemical treatment plans — including documentation of a novel Gemini API structured generation failure mode and its resolution.

Two contributions in one paper:
1. **Engineering contribution**: the Pydantic schema + prompt design that produces structured, domain-accurate chemical prescriptions
2. **Technical finding**: the `$defs` / `anyOf` / NULL type validation failure in Gemini's `response_schema=` parameter, its root cause, and the mime-type-only workaround

---

## Paper Structure (8 pages, IEEE double-column)

### 1. Abstract (half column)
- Problem: wastewater AI detects violations but provides no actionable remediation guidance
- Approach: Gemini LLM with schema-constrained structured generation to produce per-parameter prescriptions
- Technical challenge discovered: Gemini's rejection of nested Pydantic schemas containing `$defs`
- Result: structured prescriptions generated accurately across 8 parameters and 17 industry types

---

### 2. Introduction (0.75 page)
**Write about:**
- The gap between *detection* and *remediation* in wastewater AI systems
- Why rule-based lookup tables for treatment plans fail at scale (17 industries × 60+ sub-categories × 8 parameters = thousands of combinations)
- Why LLMs are a natural fit: they encode chemical process knowledge and can generate natural-language + structured output simultaneously
- Paper's claim: schema-constrained LLM prompting can reliably produce domain-accurate treatment prescriptions at industrial scale, provided the API's structured generation limitations are correctly handled

---

### 3. Background & Related Work (1 page)
**Write about:**
- LLMs for engineering recommendations: existing work on using GPT/Gemini in industrial or scientific contexts
- Expert systems for wastewater treatment (traditional rule-based approaches)
- Structured generation in LLMs: JSON mode, function calling, response schemas — compare OpenAI, Gemini, Anthropic approaches
- Pydantic for LLM output validation: brief overview
- Why wastewater treatment requires chemical domain knowledge that cannot be hardcoded (parameter interactions, industry-specific chemistry)

---

### 4. System Design (1.5 pages)
This is the core technical section.

#### 4.1 Input: Violation Detection Output
The LLM pipeline receives output from the `AnalysisAgent` — specifically the list of parameters that violated CPCB/EPA thresholds. Write about:
- What a violation looks like: `{ parameter: "COD", current_value: 850, threshold: 250, severity: "critical" }`
- How violations are filtered before being sent to the LLM (only Warning and Critical parameters trigger prescription generation)
- The 8 wastewater parameters: BOD, COD, TSS, TDS, pH, Oil & Grease, Ammonia, Temperature

#### 4.2 Pydantic Schema Design
Present and explain the two schema classes:

```python
class ParameterTreatment(BaseModel):
    parameter: str           # which parameter is violated
    current_value: float     # measured value
    issue: str               # what the violation means chemically
    chemical: str            # reagent to apply (e.g. "Alum", "Lime", "Cl2")
    dosage: str              # e.g. "15–20 mg/L"
    process: str             # unit operation (e.g. "coagulation-flocculation")
    expected_outcome: str    # what the treatment achieves
    cost_band: str           # "Low" / "Medium" / "High"

class InsightSchema(BaseModel):
    summary: str
    key_findings: List[str]
    recommendations: List[str]
    severity_level: str      # "low" | "medium" | "high" | "critical"
    parameter_treatments: Optional[List[ParameterTreatment]]
```

Explain each field's purpose and why it was chosen. Emphasize `cost_band` as a practical operator-facing field that purely technical systems omit.

#### 4.3 Prompt Engineering Strategy
Write about how the prompt is constructed:
- System context: industry type, all 8 parameter values, which ones are violated
- Explicit schema description appended at the end of the prompt (not relying on `response_schema=` alone)
- Temperature set to 0.2 for deterministic, low-hallucination output
- Show the prompt template structure (sanitized — don't paste the full prompt, just the structure)

#### 4.4 The $defs Validation Failure (This is your key finding)
**Document this carefully** — it is an undocumented Gemini API limitation:

**What happened:**
```
⚠️ Gemini API structured generation error: 3 validation errors for Schema
  properties.parameter_treatments.anyOf.0.items.$ref
    Extra inputs are not permitted
  properties.parameter_treatments.anyOf.1.type
    Input should be 'TYPE_UNSPECIFIED', 'STRING', 'NUMBER', ...
  $defs
    Extra inputs are not permitted
```

**Root cause:** When `Optional[List[ParameterTreatment]]` is serialized to JSON Schema, Python's Pydantic generates:
```json
{
  "$defs": { "ParameterTreatment": { ... } },
  "properties": {
    "parameter_treatments": {
      "anyOf": [
        { "items": { "$ref": "#/$defs/ParameterTreatment" }, "type": "array" },
        { "type": "null" }
      ]
    }
  }
}
```
Gemini's schema validator does not support `$defs` references, `anyOf` with a `null` type union, or `$ref` pointers — it requires a flat, fully inlined schema.

**The fix:**
```python
# Before (broken):
config = types.GenerateContentConfig(
    response_mime_type="application/json",
    response_schema=InsightSchema,   # ← generates $defs, rejected by Gemini
    temperature=0.2
)

# After (working):
config = types.GenerateContentConfig(
    response_mime_type="application/json",  # ← mime-type only
    temperature=0.2
)
# Schema described explicitly in the prompt text instead
```

This is a meaningful finding — the failure is silent (no exception on config creation, only on generation), the error message is cryptic, and the workaround is non-obvious.

---

### 5. Evaluation (1 page)

#### 5.1 Prescription Quality Assessment
Generate 10–15 sample prescriptions by running the system with known violation inputs across 5 different industry types (e.g., distillery high COD, tannery high pH, pharmaceutical high ammonia, textile high TSS, dairy high BOD).

Evaluate each prescription on a rubric (score 1–3 per criterion):
| Criterion | Description |
|---|---|
| Chemical accuracy | Is the suggested reagent chemically appropriate for this parameter? |
| Dosage realism | Is the dosage within industry-standard ranges? |
| Process correctness | Is the unit operation correctly matched to the treatment? |
| Cost band validity | Does the cost band reflect the actual cost of the suggested approach? |

Present results as a table. Calculate average scores across industries.

#### 5.2 Schema Compliance Rate
Run 20 prompts, count how many return a valid JSON object that parses into `InsightSchema` without error. Report compliance rate before and after the $defs fix (before = 0% structured output, after = high compliance).

#### 5.3 Fallback Behaviour
Show what the template fallback returns when Gemini is unavailable. Compare it to a real Gemini response — emphasize the loss of specificity in the fallback.

---

### 6. Discussion (0.5 page)
**Write about:**
- Hallucination risk: Gemini occasionally invents plausible-sounding but incorrect chemicals. Temperature=0.2 reduces but does not eliminate this.
- Limitation: the system cannot verify that a generated prescription is safe for the specific effluent matrix. Human expert validation is still required before acting on prescriptions.
- Generalizability: the mime-type-only + schema-in-prompt pattern works for any Gemini model variant and is not specific to this project

---

### 7. Conclusion & Future Work (0.5 page)
- Structured LLM generation is viable for industrial prescription tasks when schema constraints are correctly applied
- The `$defs` limitation should be documented by Google / is worth raising as a bug report
- Future: fine-tune a smaller domain-specific model on validated prescriptions to reduce hallucination risk

---

## Key Technical Terms to Use
- Structured generation / constrained decoding
- JSON Schema, $defs, $ref, anyOf
- Pydantic BaseModel
- Prompt engineering, schema-in-prompt
- Prescriptive analytics (vs descriptive / diagnostic / predictive)
- Hallucination, temperature parameter
- Fallback / graceful degradation

---

## Files to Reference in the Paper

| File | What it contributes |
|---|---|
| `agents/llm_agent.py` | Full LLM pipeline implementation |
| `agents/analysis_agent.py` | Source of violation data passed to LLM |
| `config/thresholds.py` | CPCB/EPA limits that trigger prescriptions |

---

## What Results You Need to Generate
1. Run the `/analyze/with-insights` endpoint for 5 different industry types with known violations — save the `parameter_treatments` output for each
2. Score each prescription on the 4-criterion rubric above
3. Capture the original $defs error log (it's in the terminal output from before the fix was applied)
4. Run 20 prompts post-fix and count valid JSON responses vs parse failures
5. Show the template fallback response side-by-side with a real Gemini response

---

## Suggested Citations to Look Up
- Gemini API documentation (Google DeepMind)
- Pydantic documentation / JSON Schema specification (RFC 8259)
- Papers on structured generation in LLMs (JSON mode, function calling)
- Expert systems for wastewater treatment (for the "why not rule-based" argument)
- Papers on LLM hallucination and mitigation strategies
- CPCB General Standards for Discharge of Environmental Pollutants
