import { useState } from 'react';

export default function Home() {
  const [patients, setPatients] = useState([]);
  const [form, setForm] = useState({ name: '', age: '', symptoms: '', vitals: '' });

  function evaluateTriage(symptoms, vitals) {
    const s = symptoms.toLowerCase();
    const v = vitals.toLowerCase();
    if (s.includes("chest pain") || s.includes("shortness of breath") || v.includes("bp over 180")) {
      return "Critical";
    } else if (s.includes("fever") || s.includes("vomiting") || v.includes("high temp")) {
      return "Urgent";
    } else {
      return "Non-Urgent";
    }
  }

  function handleSubmit() {
    const triageLevel = evaluateTriage(form.symptoms, form.vitals);
    const newPatient = { ...form, triage: triageLevel, id: Date.now() };
    setPatients([newPatient, ...patients]);
    setForm({ name: '', age: '', symptoms: '', vitals: '' });
  }

  return (
    <div style={{ backgroundColor: '#111', color: '#fff', minHeight: '100vh', padding: '2rem' }}>
      <h1>ER AI Triage Intake</h1>
      <div style={{ backgroundColor: '#222', padding: '1rem', marginBottom: '2rem' }}>
        <input
          style={{ display: 'block', marginBottom: '1rem' }}
          placeholder="Patient Name"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
        />
        <input
          style={{ display: 'block', marginBottom: '1rem' }}
          placeholder="Age"
          type="number"
          value={form.age}
          onChange={e => setForm({ ...form, age: e.target.value })}
        />
        <textarea
          style={{ display: 'block', marginBottom: '1rem' }}
          placeholder="Describe symptoms"
          value={form.symptoms}
          onChange={e => setForm({ ...form, symptoms: e.target.value })}
        />
        <textarea
          style={{ display: 'block', marginBottom: '1rem' }}
          placeholder="Vitals (e.g., Temp: 101, BP: 120/80)"
          value={form.vitals}
          onChange={e => setForm({ ...form, vitals: e.target.value })}
        />
        <button onClick={handleSubmit}>Submit</button>
      </div>

      <h2>Waiting Room Queue</h2>
      <div>
        {patients.map(p => (
          <div key={p.id} style={{ backgroundColor: '#333', padding: '1rem', marginBottom: '1rem' }}>
            <p><strong>{p.name}</strong> (Age {p.age})</p>
            <p>Symptoms: {p.symptoms}</p>
            <p>Vitals: {p.vitals}</p>
            <p style={{
              color: p.triage === 'Critical' ? 'red' :
                     p.triage === 'Urgent' ? 'yellow' : 'lightgreen'
            }}>
              Triage Level: {p.triage}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
