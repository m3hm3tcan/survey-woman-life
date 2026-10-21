import { useState } from "react";

const RESTDB_URL = "https://chesttrackerdb-1374.restdb.io/rest/survey";
const RESTDB_API_KEY = "68e81cff7f34ed1dfc200a8c";
const yesNo = ["Yes", "No"];
const maybe = ["Yes", "No", "Maybe"];
const frequency = ["Never", "Rarely", "Sometimes", "Often", "Very often"];

const stateKeys = [
  "age country education occupation livingSituation sexualOrientation incomeLevel seriousRelationships longestRelationship",
  "happiness stress sleepQuality exerciseFrequency bodyImageSatisfaction selfConfidence comparativeAttractiveness sexualAttractiveness",
  "everHadIntercourse ageFirstExperience lifetimePartners partnersLast12Months recentPartnerType currentDesire masturbationFrequency enjoySelfPleasure orgasmEase sexualLifeSatisfaction",
  "lastAttractedTouch lastAttractedTouchFeeling lastMeaningfulTouch lastMeaningfulTouchFeeling desiredTouchFeeling favoriteTouchAreas favoriteTouchWhy moreAttentionAreas moreAttentionWhy massageExperience massageFeeling massageInterest touchImportance attractionIncreasingTouch",
  "noticeAttractivePeople firstAttractionCue attractiveQualities desiredCompliments attractionCommunication attractionWithLittleClothing",
  "excitingFantasy realisticFantasy imaginedScenario imaginedMultiplePartners considerMultiplePartners multiplePartnerSetting fantasyOpenness",
  "attractedToCommittedPerson relationshipWithCommittedPerson involvementWithMarriedPerson involvementFactors relationshipBoundaries attractionReducingBehaviors",
  "friendsComfort oppositeSexFriendsComfort friendsReaction shareExperiences shareExperiencesWhy socialConversationFrequency easiestTopics hardestTopics",
  "lastStrongAttraction lastStrongAttractionSituation lastSexualInterest lastSexualInterestTrigger lastEmotionalConnection lastEmotionalConnectionExperience desireCreators",
  "misunderstoodSexuality relationshipLessons additionalThoughts",
]
  .join(" ")
  .split(" ")
  .reduce((result, key) => ({ ...result, [key]: "" }), {});

const sections = [
  {
    title: "Demographics",
    intro: "A little context helps us understand the patterns in the answers.",
    fields: [
      ["age", "Age", "number"],
      ["country", "Country of Residence", "text"],
      [
        "education",
        "Education Level",
        "select",
        ["High school", "Undergraduate", "Postgraduate", "Other"],
      ],
      ["occupation", "Occupation", "text"],
      [
        "livingSituation",
        "Living Situation",
        "select",
        ["Alone", "With family", "With roommates", "Other"],
      ],
      [
        "sexualOrientation",
        "Sexual Orientation",
        "select",
        [
          "Heterosexual",
          "Bisexual",
          "Lesbian",
          "Queer",
          "Other",
          "Prefer not to say",
        ],
      ],
      [
        "incomeLevel",
        "Income Level",
        "select",
        [
          "Low",
          "Lower-middle",
          "Middle",
          "Upper-middle",
          "High",
          "Prefer not to say",
        ],
      ],
      [
        "seriousRelationships",
        "Previous Serious Relationships",
        "select",
        ["None", "1", "2", "3+"],
      ],
      [
        "longestRelationship",
        "Longest Relationship Duration",
        "select",
        ["Less than 6 months", "6-12 months", "1-3 years", "More than 3 years"],
      ],
    ],
  },
  {
    title: "General Wellbeing",
    intro:
      "There are no right answers. Choose the number that feels closest to your experience.",
    fields: [
      ["happiness", "Overall Happiness (1-10)", "range"],
      ["stress", "Stress Level (1-10)", "range"],
      [
        "sleepQuality",
        "Sleep Quality",
        "select",
        ["Very poor", "Poor", "Average", "Good", "Very good"],
      ],
      ["exerciseFrequency", "Exercise Frequency", "select", frequency],
      ["bodyImageSatisfaction", "Body Image Satisfaction (1-10)", "range"],
      ["selfConfidence", "Self Confidence (1-10)", "range"],
      [
        "comparativeAttractiveness",
        "How attractive do you feel compared to other women? (1-10)",
        "range",
      ],
      [
        "sexualAttractiveness",
        "How sexually attractive do you consider yourself? (1-10)",
        "range",
      ],
    ],
  },
  {
    title: "Sexual History",
    fields: [
      [
        "everHadIntercourse",
        "Have you ever had sexual intercourse?",
        "select",
        yesNo,
      ],
      ["ageFirstExperience", "Age at first sexual experience", "number"],
      [
        "lifetimePartners",
        "Number of lifetime sexual partners",
        "select",
        ["0", "1", "2-5", "6-10", "11-20", "20+"],
      ],
      [
        "partnersLast12Months",
        "Number of sexual partners during last 12 months",
        "select",
        ["0", "1", "2", "3+"],
      ],
      [
        "recentPartnerType",
        "Relationship type of most recent sexual partner",
        "select",
        [
          "Committed relationship",
          "Dating",
          "Casual",
          "Friend",
          "Other",
          "Not applicable",
        ],
      ],
      [
        "currentDesire",
        "How often do you currently experience sexual desire?",
        "select",
        frequency,
      ],
      [
        "masturbationFrequency",
        "How often do you masturbate?",
        "select",
        frequency,
      ],
      ["enjoySelfPleasure", "Do you enjoy self-pleasure?", "select", yesNo],
      [
        "orgasmEase",
        "How easily do you reach orgasm?",
        "select",
        ["Very difficult", "Difficult", "Sometimes", "Easy", "Very easy"],
      ],
      [
        "sexualLifeSatisfaction",
        "How satisfied are you with your current sexual life? (1-10)",
        "range",
      ],
    ],
  },
  {
    title: "Physical Touch & Sensuality",
    intro:
      "A brief answer is enough. Focus on what feels comfortable and meaningful to you.",
    fields: [
      [
        "lastAttractedTouch",
        "When did you last share physical contact with someone you felt attracted to?",
        "textarea",
      ],
      [
        "lastAttractedTouchFeeling",
        "What did you feel in that moment, emotionally or physically?",
        "textarea",
      ],
      [
        "lastMeaningfulTouch",
        "When did you last experience meaningful, comforting, or exciting physical contact?",
        "textarea",
      ],
      [
        "lastMeaningfulTouchFeeling",
        "What made that contact feel meaningful to you?",
        "textarea",
      ],
      [
        "desiredTouchFeeling",
        "When you imagine wanted physical affection, what feelings or sensations come to mind?",
        "textarea",
      ],
      [
        "favoriteTouchAreas",
        "Which areas of your body do you most enjoy being touched?",
        "textarea",
      ],
      [
        "favoriteTouchWhy",
        "What do you enjoy about being touched there?",
        "textarea",
      ],
      [
        "moreAttentionAreas",
        "Which areas of your body would you like a partner to pay more attention to?",
        "textarea",
      ],
      [
        "moreAttentionWhy",
        "What kind of attention would feel good to you, and why?",
        "textarea",
      ],
      [
        "massageExperience",
        "Have you ever shared a quiet moment of physical closeness with someone, such as cuddling or holding each other? Briefly describe it, or write “Not applicable.”",
        "textarea",
      ],
      [
        "massageFeeling",
        "What, if anything, made that moment of closeness feel relaxing or uncomfortable? If not applicable, write “Not applicable.”",
        "textarea",
      ],
      [
        "massageInterest",
        "If you have never shared a moment like this, would you like to? Why or why not? If you have, write “Already have.”",
        "textarea",
      ],
      [
        "touchImportance",
        "How does physical affection influence attraction for you? A short example is welcome.",
        "textarea",
      ],
      [
        "attractionIncreasingTouch",
        "What kind of consensual touch, if any, helps you feel closer or more attracted to someone?",
        "textarea",
      ],
    ],
  },
  {
    title: "Attraction & Desire",
    intro:
      "Answer in a few words or sentences; use an example if one comes to mind.",
    fields: [
      [
        "noticeAttractivePeople",
        "How often do you notice attractive people in daily life?",
        "select",
        frequency,
      ],
      [
        "firstAttractionCue",
        "When you see someone attractive, what attracts you first?",
        "select",
        [
          "Face",
          "Eyes",
          "Smile",
          "Voice",
          "Body",
          "Confidence",
          "Intelligence",
          "Other",
        ],
      ],
      [
        "attractiveQualities",
        "Which qualities make someone attractive to you beyond appearance? What makes those qualities appealing?",
        "textarea",
      ],
      [
        "desiredCompliments",
        "What kind of compliment makes you feel seen or desired, and why does it resonate with you?",
        "textarea",
      ],
      [
        "attractionCommunication",
        "What kinds of conversation or communication make you feel a stronger connection or attraction?",
        "textarea",
      ],
      [
        "attractionWithLittleClothing",
        "When seeing an attractive person with little clothing, how likely are you to feel excitement or attraction? (1-10)",
        "range",
      ],
    ],
  },
  {
    title: "Fantasies & Imagination",
    intro:
      "Take your time here. A few vivid details can help us understand what appeals to you. You can describe the atmosphere, setting, people involved, emotions, pace, and what makes the scenario exciting or meaningful. Keep your answer within your own comfort level.",
    fields: [
      [
        "excitingFantasy",
        "Describe a romantic or intimate fantasy you find exciting, whether or not you would want to experience it in real life. What happens, what is the setting and atmosphere, and what feelings or details make it appealing to you?",
        "textarea",
      ],
      [
        "realisticFantasy",
        "If you feel comfortable sharing, describe a romantic or intimate experience you might genuinely want to try. What would need to happen for it to feel safe, enjoyable, and right for you?",
        "textarea",
      ],
      [
        "imaginedScenario",
        "What kinds of romantic or intimate scenarios tend to return to your imagination? Describe any recurring themes, roles, emotions, or details that stand out.",
        "textarea",
      ],
      [
        "imaginedMultiplePartners",
        "Have you ever imagined being involved with more than one partner at the same time?",
        "select",
        maybe,
      ],
      [
        "considerMultiplePartners",
        "Would you ever consider such an experience?",
        "select",
        maybe,
      ],
      [
        "multiplePartnerSetting",
        "If this idea interests you, what boundaries, communication, setting, or circumstances would help everyone feel comfortable? If it does not interest you, briefly say why or write “Not applicable.”",
        "textarea",
      ],
      [
        "fantasyOpenness",
        "How open are you to exploring new fantasies? (1-10)",
        "range",
      ],
    ],
  },
  {
    title: "Relationships & Boundaries",
    intro:
      "Brief, direct answers are welcome. Share only the detail needed to explain your view.",
    fields: [
      [
        "attractedToCommittedPerson",
        "Have you ever been attracted to someone who was married or in a committed relationship?",
        "select",
        yesNo,
      ],
      [
        "relationshipWithCommittedPerson",
        "Have you ever had a relationship with someone who was married or committed?",
        "select",
        ["Yes", "No", "Prefer not to answer"],
      ],
      [
        "involvementWithMarriedPerson",
        "Would you consider becoming involved with a married person?",
        "select",
        ["Never", "Depends", "Possibly", "Yes"],
      ],
      [
        "involvementFactors",
        "What values or circumstances would most influence your decision?",
        "textarea",
      ],
      [
        "relationshipBoundaries",
        "Which boundary is especially important to you in a relationship, and how would you want a partner to respect it?",
        "textarea",
      ],
      [
        "attractionReducingBehaviors",
        "Which behaviors tend to reduce your attraction or trust, and what about them matters to you?",
        "textarea",
      ],
    ],
  },
  {
    title: "Social & Peer Discussions",
    intro: "A short answer is enough; you may give a simple example.",
    fields: [
      [
        "friendsComfort",
        "How comfortable are you discussing sexuality with close friends? (1-10)",
        "range",
      ],
      [
        "oppositeSexFriendsComfort",
        "How comfortable are you discussing sexuality with opposite-sex friends? (1-10)",
        "range",
      ],
      [
        "friendsReaction",
        "If friends discuss their sexual experiences with you, how do you usually react?",
        "select",
        [
          "Comfortable",
          "Somewhat comfortable",
          "Neutral",
          "Uncomfortable",
          "Very uncomfortable",
        ],
      ],
      [
        "shareExperiences",
        "How openly do you share your own experiences with friends? Briefly describe what you do or do not share.",
        "textarea",
      ],
      [
        "shareExperiencesWhy",
        "What makes sharing feel comfortable or uncomfortable for you?",
        "textarea",
      ],
      [
        "socialConversationFrequency",
        "How often do these conversations happen in your social circle, and what are they usually like?",
        "textarea",
      ],
      [
        "easiestTopics",
        "Which relationship or attraction topics are easiest for you to discuss, and why?",
        "textarea",
      ],
      [
        "hardestTopics",
        "Which topics are hardest to discuss, and what makes them difficult?",
        "textarea",
      ],
    ],
  },
  {
    title: "Recent Experiences",
    intro:
      "A couple of sentences is enough. You do not need to identify anyone.",
    fields: [
      [
        "lastStrongAttraction",
        "When did you last feel strongly attracted to someone? Briefly describe the context, or write “Not applicable.”",
        "textarea",
      ],
      [
        "lastStrongAttractionSituation",
        "What specifically sparked or strengthened that attraction? If not applicable, write “Not applicable.”",
        "textarea",
      ],
      [
        "lastSexualInterest",
        "When did you last feel sexual interest in someone?",
        "textarea",
      ],
      [
        "lastSexualInterestTrigger",
        "What contributed to that feeling?",
        "textarea",
      ],
      [
        "lastEmotionalConnection",
        "When did you last feel emotionally connected to someone? ",
        "textarea",
      ],
      [
        "lastEmotionalConnectionExperience",
        "What helped create that sense of connection? ",
        "textarea",
      ],
      [
        "desireCreators",
        "What tends to create desire for you? Consider appearance, emotional connection, conversation, attention, mood, or other factors; which matters most and why?",
        "textarea",
      ],
    ],
  },
  {
    title: "Final Thoughts",
    intro:
      "Short reflections are welcome. Add detail only where it feels useful.",
    fields: [
      [
        "misunderstoodSexuality",
        "What do you think people often misunderstand about women’s sexuality?",
        "textarea",
      ],
      [
        "relationshipLessons",
        "What has experience taught you about what you need or value in relationships?",
        "textarea",
      ],
      [
        "additionalThoughts",
        "What is one thing about your experience of attraction, intimacy, or relationships you wish this survey had asked?",
        "textarea",
      ],
    ],
  },
];

function Field({ field, value, onChange }) {
  const [name, label, type, values] = field;
  const required = true;
  return (
    <label className="field" htmlFor={name}>
      <span>
        {label}
        {required && <b aria-hidden="true"> *</b>}
      </span>
      {type === "textarea" ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          rows={4}
          required
          placeholder={
            name === "excitingFantasy" ||
            name === "realisticFantasy" ||
            name === "imaginedScenario"
              ? "Share as much detail as feels comfortable."
              : "A brief answer is enough."
          }
        />
      ) : type === "range" ? (
        <div className="range-wrap">
          <input
            id={name}
            type="range"
            name={name}
            min="1"
            max="10"
            value={value || 5}
            onChange={onChange}
          />
          <output>{value || 5}</output>
        </div>
      ) : type === "select" ? (
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          required
        >
          <option value="">Choose an answer</option>
          {values.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          min={name === "age" ? 18 : undefined}
          max={name === "age" ? 40 : undefined}
          required
        />
      )}
    </label>
  );
}

export default function SurveyApp() {
  const [data, setData] = useState(stateKeys);
  const [step, setStep] = useState(-1);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const total = sections.length;
  const change = (event) =>
    setData((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  const next = (event) => {
    event.preventDefault();
    if (!event.currentTarget.reportValidity()) return;
    setError("");
    setStep((current) => Math.min(current + 1, total - 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const previous = () => {
    setError("");
    setStep((current) => Math.max(0, current - 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  async function submit(event) {
    event.preventDefault();
    if (!event.currentTarget.reportValidity()) return;
    setSubmitting(true);
    setError("");
    try {
      const response = await fetch(RESTDB_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-apikey": RESTDB_API_KEY,
        },
        body: JSON.stringify({
          timestamp: new Date().toISOString(),
          survey_response: data,
        }),
      });
      if (!response.ok) throw new Error(`Request failed: ${response.status}`);
      setStep(total);
    } catch (submissionError) {
      console.error(submissionError);
      setError("We could not submit your responses. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }
  if (step === total)
    return (
      <main className="thank-you">
        <div>
          <div className="thank-icon">✓</div>
          <p className="eyebrow">SUBMISSION COMPLETE</p>
          <h1>Thank You</h1>
          <p>Your responses have been submitted successfully.</p>
          <p>We appreciate your participation.</p>
        </div>
      </main>
    );
  if (step === -1)
    return (
      <main className="welcome">
        <div className="welcome-card">
          <p className="eyebrow">ANONYMOUS SURVEY · 18-40</p>
          <h1>
            Women, intimacy & <em>everyday desire</em>
          </h1>
          <p className="lead">
            A private, thoughtful survey about attraction, touch, relationships
            and wellbeing for adult women who are currently unmarried and/or not
            in a committed relationship.
          </p>
          <div className="notice">
            <strong>Your privacy matters.</strong>
            <span>
              No name, email, or identifying information is requested. Your
              answers are submitted anonymously.
            </span>
          </div>
          <button
            className="button primary full"
            type="button"
            onClick={() => setStep(0)}
          >
            Begin survey <span>→</span>
          </button>
          <small>Voluntary participation</small>
        </div>
      </main>
    );
  const section = sections[step];
  return (
    <main className="app-shell">
      <header className="topbar">
        <div className="brand">
          <span className="brand-mark">◒</span> private perspectives
        </div>
        <span className="anonymous">Anonymous participation</span>
      </header>
      <div className="progress-meta">
        <span>
          SECTION {String(step + 1).padStart(2, "0")} /{" "}
          {String(total).padStart(2, "0")}
        </span>
        <span>{Math.round(((step + 1) / total) * 100)}% complete</span>
      </div>
      <div className="progress-track">
        <div style={{ width: `${((step + 1) / total) * 100}%` }} />
      </div>
      <form
        className="survey-card"
        onSubmit={step === total - 1 ? submit : next}
        noValidate
      >
        <div className="section-heading">
          <p className="eyebrow">PART {step + 1}</p>
          <h1>{section.title}</h1>
          {section.intro && <p>{section.intro}</p>}
        </div>
        <div className="fields">
          {section.fields.map((field) => (
            <Field
              key={field[0]}
              field={field}
              value={data[field[0]]}
              onChange={change}
            />
          ))}
        </div>
        {error && (
          <p className="error" role="alert">
            {error}
          </p>
        )}
        <div className="actions">
          {step > 0 && (
            <button
              type="button"
              className="button secondary"
              onClick={previous}
            >
              ← Back
            </button>
          )}
          <button
            className="button primary"
            type="submit"
            disabled={submitting}
          >
            {submitting
              ? "Submitting..."
              : step === total - 1
                ? "Submit responses"
                : "Continue"}
            <span>→</span>
          </button>
        </div>
      </form>
      <footer>
        Your responses are anonymous and stored securely as one survey response.
      </footer>
    </main>
  );
}
