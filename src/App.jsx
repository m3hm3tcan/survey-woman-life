import React, { useState } from "react";

// Simple single-file React component for the survey (copy into a CRA or Vite React project)
// Replace RESTDB_URL and RESTDB_API_KEY placeholders before use.

const RESTDB_URL = "https://chesttrackerdb-1374.restdb.io/rest/survey"; // replace with your restdb collection endpoint
const RESTDB_API_KEY = "68e81cff7f34ed1dfc200a8c"; // replace with your restdb api key (x-apikey)

const initialState = {
  // Section 1: Demographics
  age: "",
  country: "",
  education: "",
  occupation: "",
  livingSituation: "",
  sexualOrientation: "",
  income: "",
  prevSeriousRelationships: "",
  longestRelationshipDuration: "",
  // Section 2: Life Quality
  happiness: 5,
  stress: 5,
  socialSupport: "Sometimes",
  sleepQuality: 3,
  exerciseFrequency: "Sometimes",
  selfEsteem: 3,
  bodyImage: 3,
  // Section 3: Health
  physicalHealth: "Good",
  mentalHealthHistory: "No",
  sexualHealthSteps: "Sometimes",
  historyOfSTIs: "Prefer not to say",
  contraceptionUse: "Sometimes",
  mentalHealthHabits: [],
  // Section 4: Sexual Behaviour & Attitudes
  everHadSex: "",
  ageFirstSex: "",
  partnerTypes: [],
  partneredFreq: "Sometimes",
  soloFreq: "Sometimes",
  masturbationFreq: "Sometimes",
  sexToyFreq: "Sometimes",
  partnersLast12Months: "0",
  partnersLifetime: "0-5",
  comfortDiscussFriends: 3,
  comfortDiscussPartner: 3,
  sexualSatisfaction: 3,
  fantasies: "",
  neverTry: "",
  opennessMultiple: "Maybe",
  casualSexAttitude: "",
  polyamoryAttitude: 3,
  sensitiveAreas: "",
  touchPreference: "",
  bodyConfidence: "",
  // Section 5: Technology & Media
  datingAppUse: "Sometimes",
  pornUse: "Sometimes",
  sexEdSources: [],
  // Closing
  additionalThoughts: "",
};

export default function App() {
  const [data, setData] = useState(initialState);
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState(null);

  const steps = [
    "Consent",
    "Demographics",
    "Life Quality",
    "Health",
    "Sexual Behaviour",
    "Technology",
    "Closing",
  ];

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      // multi-select arrays
      setData((d) => {
        const prev = d[name] || [];
        if (checked) return { ...d, [name]: [...prev, value] };
        return { ...d, [name]: prev.filter((v) => v !== value) };
      });
    } else {
      setData((d) => ({ ...d, [name]: value }));
    }
  }

  function next() {
    setStep((s) => Math.min(s + 1, steps.length - 1));
    window.scrollTo(0, 0);
  }
  function prev() {
    setStep((s) => Math.max(s - 1, 0));
    window.scrollTo(0, 0);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setMessage(null);

    try {
      const payload = {
        timestamp: new Date().toISOString(),
        survey_response: data, // ✅ store all data under one field
      };

      const resp = await fetch(RESTDB_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-apikey": RESTDB_API_KEY,
        },
        body: JSON.stringify(payload),
      });

      if (!resp.ok) throw new Error(`Server returned ${resp.status}`);

      // ✅ Show thank-you message and reset
      setMessage({
        type: "success",
        text: "Thank you — your responses were submitted.",
      });
      setData(initialState);
      setStep(-1); // special "thank you" state
    } catch (err) {
      console.error(err);
      setMessage({
        type: "error",
        text: "Submission failed. Check console and RESTDB settings.",
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="survey-root">
      <style>{css}</style>
      <header className="survey-header">
        <h1>Sexual Behaviour, Health & Lifestyle Survey</h1>
        <div className="progress">
          Step {step + 1} of {steps.length} — {steps[step]}
        </div>
        <div className="progress-bar">
          <div style={{ width: `${((step + 1) / steps.length) * 100}%` }} />
        </div>
      </header>

      <form className="survey-form" onSubmit={handleSubmit}>
        {step === 0 && (
          <section>
            <h2>Consent & Information</h2>
            <p>
              You are invited to participate in a research survey about sexual
              behaviour, health, and lifestyle among women aged 18–40 who are
              either not married OR not in a relationship. Participation is
              voluntary and anonymous.
            </p>
            <p>
              By clicking "I agree and continue" you confirm you are aged 18–40
              and meet the participant criteria.
            </p>
            <div className="actions">
              <button type="button" onClick={next} className="btn primary">
                I agree and continue
              </button>
            </div>
          </section>
        )}

        {step === 1 && (
          <section>
            <h2>Demographics</h2>
            <label>
              Age (18–40)
              <input
                name="age"
                value={data.age}
                onChange={handleChange}
                placeholder="e.g. 27"
              />
            </label>
            <label>
              Country of residence
              <input
                name="country"
                value={data.country}
                onChange={handleChange}
              />
            </label>
            <label>
              Education level
              <select
                name="education"
                value={data.education}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option>High school</option>
                <option>Undergraduate</option>
                <option>Postgraduate</option>
                <option>Other</option>
              </select>
            </label>
            <label>
              Current occupation
              <input
                name="occupation"
                value={data.occupation}
                onChange={handleChange}
              />
            </label>
            <label>
              Living situation
              <select
                name="livingSituation"
                value={data.livingSituation}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option>Alone</option>
                <option>With family</option>
                <option>With roommates</option>
                <option>Other</option>
              </select>
            </label>
            <label>
              Sexual orientation
              <select
                name="sexualOrientation"
                value={data.sexualOrientation}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option>Heterosexual</option>
                <option>Bisexual</option>
                <option>Lesbian</option>
                <option>Other</option>
              </select>
            </label>
            <label>
              Annual income level
              <select name="income" value={data.income} onChange={handleChange}>
                <option value="">Select</option>
                <option>0-2000€</option>
                <option>2000–4000€</option>
                <option>4000–7000€</option>
                <option>Prefer not to say</option>
              </select>
            </label>
            <label>
              Previous serious relationships
              <select
                name="prevSeriousRelationships"
                value={data.prevSeriousRelationships}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option>None</option>
                <option>1</option>
                <option>2</option>
                <option>3+</option>
              </select>
            </label>
            <label>
              Longest previous relationship duration
              <select
                name="longestRelationshipDuration"
                value={data.longestRelationshipDuration}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option>&lt;6 months</option>
                <option>6–12 months</option>
                <option>1–3 years</option>
                <option>3+ years</option>
              </select>
            </label>
            <div className="actions">
              <button type="button" onClick={prev} className="btn">
                Back
              </button>
              <button type="button" onClick={next} className="btn primary">
                Next
              </button>
            </div>
          </section>
        )}

        {step === 2 && (
          <section>
            <h2>Life Quality / Well-being</h2>
            <label>
              Overall happiness: {data.happiness}
              <input
                type="range"
                name="happiness"
                min="1"
                max="10"
                value={data.happiness}
                onChange={handleChange}
              />
            </label>
            <label>
              Stress level: {data.stress}
              <input
                type="range"
                name="stress"
                min="1"
                max="10"
                value={data.stress}
                onChange={handleChange}
              />
            </label>
            <label>
              Social support
              <select
                name="socialSupport"
                value={data.socialSupport}
                onChange={handleChange}
              >
                <option>Yes</option>
                <option>No</option>
                <option>Sometimes</option>
              </select>
            </label>
            <label>
              Sleep quality (1 very poor — 5 excellent)
              <select
                name="sleepQuality"
                value={data.sleepQuality}
                onChange={handleChange}
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </label>
            <label>
              Exercise frequency
              <select
                name="exerciseFrequency"
                value={data.exerciseFrequency}
                onChange={handleChange}
              >
                <option>Never</option>
                <option>Rarely</option>
                <option>Sometimes</option>
                <option>Often</option>
                <option>Daily</option>
              </select>
            </label>
            <label>
              Self-esteem (1–5)
              <select
                name="selfEsteem"
                value={data.selfEsteem}
                onChange={handleChange}
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </label>
            <label>
              Body image satisfaction (1–5)
              <select
                name="bodyImage"
                value={data.bodyImage}
                onChange={handleChange}
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </label>

            <div className="actions">
              <button type="button" onClick={prev} className="btn">
                Back
              </button>
              <button type="button" onClick={next} className="btn primary">
                Next
              </button>
            </div>
          </section>
        )}

        {step === 3 && (
          <section>
            <h2>Health</h2>
            <label>
              General physical health
              <select
                name="physicalHealth"
                value={data.physicalHealth}
                onChange={handleChange}
              >
                <option>Poor</option>
                <option>Fair</option>
                <option>Good</option>
                <option>Very Good</option>
                <option>Excellent</option>
              </select>
            </label>
            <label>
              Ever diagnosed with a mental health condition?
              <select
                name="mentalHealthHistory"
                value={data.mentalHealthHistory}
                onChange={handleChange}
              >
                <option>No</option>
                <option>Yes</option>
              </select>
            </label>
            <label>
              Steps to maintain sexual health
              <select
                name="sexualHealthSteps"
                value={data.sexualHealthSteps}
                onChange={handleChange}
              >
                <option>Yes</option>
                <option>No</option>
                <option>Sometimes</option>
              </select>
            </label>
            <label>
              History of STIs
              <select
                name="historyOfSTIs"
                value={data.historyOfSTIs}
                onChange={handleChange}
              >
                <option>Yes</option>
                <option>No</option>
                <option>Prefer not to say</option>
              </select>
            </label>
            <label>
              Contraception use
              <select
                name="contraceptionUse"
                value={data.contraceptionUse}
                onChange={handleChange}
              >
                <option>Never</option>
                <option>Rarely</option>
                <option>Sometimes</option>
                <option>Often</option>
                <option>Always</option>
              </select>
            </label>
            <fieldset>
              <legend>Mental health habits (select all that apply)</legend>
              <label>
                <input
                  type="checkbox"
                  name="mentalHealthHabits"
                  value="Therapy"
                  onChange={handleChange}
                  checked={data.mentalHealthHabits.includes("Therapy")}
                />{" "}
                Therapy
              </label>
              <label>
                <input
                  type="checkbox"
                  name="mentalHealthHabits"
                  value="Meditation"
                  onChange={handleChange}
                  checked={data.mentalHealthHabits.includes("Meditation")}
                />{" "}
                Meditation
              </label>
              <label>
                <input
                  type="checkbox"
                  name="mentalHealthHabits"
                  value="Mindfulness"
                  onChange={handleChange}
                  checked={data.mentalHealthHabits.includes("Mindfulness")}
                />{" "}
                Mindfulness
              </label>
              <label>
                <input
                  type="checkbox"
                  name="mentalHealthHabits"
                  value="Exercise"
                  onChange={handleChange}
                  checked={data.mentalHealthHabits.includes("Exercise")}
                />{" "}
                Exercise
              </label>
              <label>
                <input
                  type="checkbox"
                  name="mentalHealthHabits"
                  value="None"
                  onChange={handleChange}
                  checked={data.mentalHealthHabits.includes("None")}
                />{" "}
                None
              </label>
            </fieldset>

            <div className="actions">
              <button type="button" onClick={prev} className="btn">
                Back
              </button>
              <button type="button" onClick={next} className="btn primary">
                Next
              </button>
            </div>
          </section>
        )}

        {step === 4 && (
          <section>
            <h2>Sexual Behaviour & Attitudes</h2>
            <label>
              Have you ever had a sexual partner?
              <select
                name="everHadSex"
                value={data.everHadSex}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option>Yes</option>
                <option>No</option>
              </select>
            </label>
            <label>
              Age at first sexual experience
              <input
                name="ageFirstSex"
                value={data.ageFirstSex}
                onChange={handleChange}
                placeholder="e.g. 17"
              />
            </label>
            <fieldset>
              <legend>Types of partners (select all that apply)</legend>
              <label>
                <input
                  type="checkbox"
                  name="partnerTypes"
                  value="Casual"
                  onChange={handleChange}
                  checked={data.partnerTypes.includes("Casual")}
                />{" "}
                Casual
              </label>
              <label>
                <input
                  type="checkbox"
                  name="partnerTypes"
                  value="Regular"
                  onChange={handleChange}
                  checked={data.partnerTypes.includes("Regular")}
                />{" "}
                Regular / committed
              </label>
              <label>
                <input
                  type="checkbox"
                  name="partnerTypes"
                  value="Online-only"
                  onChange={handleChange}
                  checked={data.partnerTypes.includes("Online-only")}
                />{" "}
                Online-only
              </label>
              <label>
                <input
                  type="checkbox"
                  name="partnerTypes"
                  value="Other"
                  onChange={handleChange}
                  checked={data.partnerTypes.includes("Other")}
                />{" "}
                Other
              </label>
            </fieldset>

            <label>
              Frequency of sexual activity (partnered)
              <select
                name="partneredFreq"
                value={data.partneredFreq}
                onChange={handleChange}
              >
                <option>Never</option>
                <option>Rarely (less than once a month)</option>
                <option>Sometimes (1–3 times per month)</option>
                <option>Often (1–3 times per week)</option>
                <option>Very often (4+ times per week)</option>
              </select>
            </label>

            <label>
              Frequency of sexual activity (solo)
              <select
                name="soloFreq"
                value={data.soloFreq}
                onChange={handleChange}
              >
                <option>Never</option>
                <option>Rarely (less than once a month)</option>
                <option>Sometimes (1–3 times per month)</option>
                <option>Often (1–3 times per week)</option>
                <option>Very often (4+ times per week)</option>
              </select>
            </label>

            <label>
              Which parts of your body do you find most sensitive to touch or
              stimulation?
              <textarea
                name="sensitiveAreas"
                value={data.sensitiveAreas}
                onChange={handleChange}
                rows={3}
                placeholder=""
              />
            </label>

            <label>
              Are there areas of your body where you would like to experience
              more touch or physical attention?
              <textarea
                name="touchPreference"
                value={data.touchPreference}
                onChange={handleChange}
                rows={3}
                placeholder=""
              />
            </label>

            <label>
              How confident do you feel about your body when it comes to
              intimacy or being seen by a partner?
              <select
                name="bodyConfidence"
                value={data.bodyConfidence}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option>Not confident at all</option>
                <option>Slightly confident</option>
                <option>Moderately confident</option>
                <option>Very confident</option>
                <option>Extremely confident</option>
              </select>
            </label>

            <label>
              How often do you masturbate?
              <select
                name="masturbationFreq"
                value={data.masturbationFreq}
                onChange={handleChange}
              >
                <option>Never</option>
                <option>Rarely (less than once a month)</option>
                <option>Sometimes (1–3 times per month)</option>
                <option>Often (1–3 times per week)</option>
                <option>Very often (4+ times per week)</option>
              </select>
            </label>

            <label>
              How often do you use sex toys?
              <select
                name="sexToyFreq"
                value={data.sexToyFreq}
                onChange={handleChange}
              >
                <option>Never</option>
                <option>Rarely</option>
                <option>Sometimes</option>
                <option>Often</option>
                <option>Very often</option>
              </select>
            </label>

            <label>
              Number of sexual partners in last 12 months
              <select
                name="partnersLast12Months"
                value={data.partnersLast12Months}
                onChange={handleChange}
              >
                <option>0</option>
                <option>1</option>
                <option>2</option>
                <option>3+</option>
              </select>
            </label>
            <label>
              Number of sexual partners in lifetime
              <select
                name="partnersLifetime"
                value={data.partnersLifetime}
                onChange={handleChange}
              >
                <option>0–5</option>
                <option>6–10</option>
                <option>11–20</option>
                <option>20+</option>
              </select>
            </label>

            <label>
              Comfort discussing sexual topics with friends:{" "}
              {data.comfortDiscussFriends}
              <input
                type="range"
                min="1"
                max="5"
                name="comfortDiscussFriends"
                value={data.comfortDiscussFriends}
                onChange={handleChange}
              />
            </label>
            <label>
              Comfort discussing sexual topics with partner:{" "}
              {data.comfortDiscussPartner}
              <input
                type="range"
                min="1"
                max="5"
                name="comfortDiscussPartner"
                value={data.comfortDiscussPartner}
                onChange={handleChange}
              />
            </label>
            <label>
              Sexual life satisfaction: {data.sexualSatisfaction}
              <input
                type="range"
                min="1"
                max="5"
                name="sexualSatisfaction"
                value={data.sexualSatisfaction}
                onChange={handleChange}
              />
            </label>

            <label>
              Sexual fantasies you want to explore (short)
              <textarea
                name="fantasies"
                value={data.fantasies}
                onChange={handleChange}
                rows={3}
                placeholder=""
              />
            </label>
            <label>
              Sexual activities you would never try (short)
              <textarea
                name="neverTry"
                value={data.neverTry}
                onChange={handleChange}
                rows={3}
                placeholder=""
              />
            </label>
            <label>
              Are you open to having multiple sexual partners simultaneously?
              <select
                name="opennessMultiple"
                value={data.opennessMultiple}
                onChange={handleChange}
              >
                <option>Yes</option>
                <option>No</option>
                <option>Maybe</option>
              </select>
            </label>
            <label>
              How do you feel about casual sex? (short)
              <textarea
                name="casualSexAttitude"
                value={data.casualSexAttitude}
                onChange={handleChange}
                rows={2}
                placeholder=""
              />
            </label>
            <label>
              Attitude toward polyamory / non-monogamy: {data.polyamoryAttitude}
              <input
                type="range"
                min="1"
                max="5"
                name="polyamoryAttitude"
                value={data.polyamoryAttitude}
                onChange={handleChange}
              />
            </label>

            <div className="actions">
              <button type="button" onClick={prev} className="btn">
                Back
              </button>
              <button type="button" onClick={next} className="btn primary">
                Next
              </button>
            </div>
          </section>
        )}

        {step === 5 && (
          <section>
            <h2>Technology & Media</h2>
            <label>
              Use of dating apps
              <select
                name="datingAppUse"
                value={data.datingAppUse}
                onChange={handleChange}
              >
                <option>Never</option>
                <option>Rarely</option>
                <option>Sometimes</option>
                <option>Often</option>
              </select>
            </label>
            <label>
              Use of pornography
              <select
                name="pornUse"
                value={data.pornUse}
                onChange={handleChange}
              >
                <option>Never</option>
                <option>Rarely</option>
                <option>Sometimes</option>
                <option>Often</option>
              </select>
            </label>
            <fieldset>
              <legend>Sources of sex education (select all that apply)</legend>
              <label>
                <input
                  type="checkbox"
                  name="sexEdSources"
                  value="School"
                  onChange={handleChange}
                  checked={data.sexEdSources.includes("School")}
                />{" "}
                School
              </label>
              <label>
                <input
                  type="checkbox"
                  name="sexEdSources"
                  value="Internet"
                  onChange={handleChange}
                  checked={data.sexEdSources.includes("Internet")}
                />{" "}
                Internet
              </label>
              <label>
                <input
                  type="checkbox"
                  name="sexEdSources"
                  value="Friends"
                  onChange={handleChange}
                  checked={data.sexEdSources.includes("Friends")}
                />{" "}
                Friends
              </label>
              <label>
                <input
                  type="checkbox"
                  name="sexEdSources"
                  value="Family"
                  onChange={handleChange}
                  checked={data.sexEdSources.includes("Family")}
                />{" "}
                Family
              </label>
              <label>
                <input
                  type="checkbox"
                  name="sexEdSources"
                  value="Other"
                  onChange={handleChange}
                  checked={data.sexEdSources.includes("Other")}
                />{" "}
                Other
              </label>
            </fieldset>

            <div className="actions">
              <button type="button" onClick={prev} className="btn">
                Back
              </button>
              <button type="button" onClick={next} className="btn primary">
                Next
              </button>
            </div>
          </section>
        )}

        {step === 6 && (
          <section>
            <h2>Closing</h2>
            <label>
              Any additional thoughts or experiences you'd like to share?
              <textarea
                name="additionalThoughts"
                value={data.additionalThoughts}
                onChange={handleChange}
                rows={4}
                placeholder="Optional"
              />
            </label>

            <div className="actions">
              <button type="button" onClick={prev} className="btn">
                Back
              </button>
              <button
                type="submit"
                className="btn primary"
                disabled={submitting}
              >
                {submitting ? "Submitting..." : "Submit"}
              </button>
            </div>

            {message && (
              <div className={`message ${message.type}`}>{message.text}</div>
            )}
          </section>
        )}
      </form>

      <footer className="survey-footer">
        <small>
          All responses are anonymous and voluntary. Thank you so much for your
          feedback.
        </small>
      </footer>
    </div>
  );
}

const css = `
.survey-root{font-family: Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial;max-width:900px;margin:24px auto;padding:18px;background:#fff;border-radius:8px;box-shadow:0 6px 18px rgba(0,0,0,0.06)}
.survey-header h1{margin:0 0 6px;font-size:20px}
.progress{font-size:13px;color:#666;margin-bottom:8px}
.progress-bar{background:#eee;height:8px;border-radius:999px;overflow:hidden;margin-bottom:18px}
.progress-bar > div{height:100%;background:#6c63ff;transition:width .3s}
.survey-form section{margin-bottom:18px}
.survey-form h2{font-size:18px;margin-bottom:10px}
label{display:block;margin-bottom:10px;font-size:14px}
input[type=text], input[type=number], select, textarea{width:100%;padding:8px;border-radius:6px;border:1px solid #ddd;margin-top:6px}
textarea{resize:vertical}
.actions{display:flex;gap:8px;margin-top:12px}
.btn{padding:8px 14px;border-radius:8px;border:1px solid #ccc;background:#f2f2f2;cursor:pointer}
.btn.primary{background:#6c63ff;color:#fff;border-color:transparent}
.btn:disabled{opacity:0.6;cursor:not-allowed}
fieldset{border:1px solid #eee;padding:10px;border-radius:6px}
legend{font-weight:600}
.message{margin-top:12px;padding:10px;border-radius:6px}
.message.success{background:#e6ffef;border:1px solid #b7f0c9}
.message.error{background:#ffe6e6;border:1px solid #f0b7b7}
.survey-footer{margin-top:18px;text-align:center;color:#666}
`;
