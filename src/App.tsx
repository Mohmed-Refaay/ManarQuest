/* oxlint-disable next/no-img-element, jsx-a11y/prefer-tag-over-role, typescript/no-base-to-string */
import { useEffect, useMemo, useState } from 'react';
import {
  ArrowLeft,
  Check,
  ChevronLeft,
  ChevronRight,
  CircleHelp,
  ImagePlus,
  LayoutDashboard,
  PencilLine,
  Play,
  Plus,
  RotateCcw,
  Settings2,
  Sparkles,
  Trash2,
  Trophy,
  X,
} from 'lucide-react';

type Player = { id: string; name: string; color: string };
type Question = {
  id: string;
  prompt: string;
  answer: string;
  image?: string;
  playerId: string;
};
type GameData = { title: string; players: Player[]; questions: Question[] };

const starterCards: Array<[string, string]> = [
  ['The first surah in the Mushaf is: __________', 'Surah Al-Fatiha.'],
  [
    'Which surah must we recite in every rak\u2018ah of prayer?',
    'Surah Al-Fatiha.',
  ],
  ['How many verses are in Surah Al-Fatiha?', '7 verses.'],
  ['What is the first step of Wudu?', 'Intention.'],
  ['What do we wipe during Wudu?', 'The head and ears.'],
  ['How many times do we wash our hands?', '3 times.'],
  ['How many times do we wash our mouth?', '3 times.'],
  ['How many times do we sniff water into our nose?', '3 times.'],
  ['How many times do we wash our face?', '3 times.'],
  ['How many times do we wash our arms?', '3 times.'],
  ['How many times do we wipe our head?', 'Once.'],
  ['How many times do we wipe our ears?', 'Once.'],
  ['How many times do we wash our feet?', '3 times.'],
  [
    'From where to where do we wash our face?',
    'From the hairline to the chin and from ear to ear.',
  ],
  [
    'From where to where do we wash our arms?',
    'From the fingertips to the elbows.',
  ],
  [
    'From where to where do we wash our feet?',
    'From the tips of the toes to the ankles.',
  ],
  ['How many rak\u2018ahs are in Fajr?', '2.'],
  ['How many rak\u2018ahs are in Dhuhr?', '4.'],
  ['How many rak\u2018ahs are in Asr?', '4.'],
  ['How many rak\u2018ahs are in Maghrib?', '3.'],
  ['How many rak\u2018ahs are in Ishaa?', '4.'],
  [
    'What is the first ayah of Surah Al-Fatiha?',
    '\u0627\u0644\u0652\u062d\u064e\u0645\u0652\u062f\u064f \u0644\u0650\u0644\u064e\u0651\u0647\u0650 \u0631\u064e\u0628\u0650\u0651 \u0627\u0644\u0652\u0639\u064e\u0627\u0644\u064e\u0645\u0650\u064a\u0646\u064e',
  ],
  [
    'What is the first ayah of Surah Al-Ikhlas?',
    '\u0642\u064f\u0644\u0652 \u0647\u064f\u0648\u064e \u0627\u0644\u0644\u064e\u0651\u0647\u064f \u0623\u064e\u062d\u064e\u062f\u064c',
  ],
  [
    'What is the first ayah of Surah Al-Falaq?',
    '\u0642\u064f\u0644\u0652 \u0623\u064e\u0639\u064f\u0648\u0630\u064f \u0628\u0650\u0631\u064e\u0628\u0650\u0651 \u0627\u0644\u0652\u0641\u064e\u0644\u064e\u0642\u0650',
  ],
  [
    'What is the first ayah of Surah An-Nas?',
    '\u0642\u064f\u0644\u0652 \u0623\u064e\u0639\u064f\u0648\u0630\u064f \u0628\u0650\u0631\u064e\u0628\u0650\u0651 \u0627\u0644\u0646\u064e\u0651\u0627\u0633\u0650',
  ],
  [
    'What is the first ayah of Surah An-Nasr?',
    '\u0625\u0650\u0630\u064e\u0627 \u062c\u064e\u0627\u0621\u064e \u0646\u064e\u0635\u0652\u0631\u064f \u0627\u0644\u0644\u064e\u0651\u0647\u0650 \u0648\u064e\u0627\u0644\u0652\u0641\u064e\u062a\u0652\u062d\u064f',
  ],
  [
    'Where does a Fatha sit on an Arabic letter?\nA) Underneath the letter\nB) Above the letter\nC) Next to the letter',
    'B) Above the letter.',
  ],
  [
    'Which vowel mark is written underneath the letter and makes an “ee” sound?\nA) Damma\nB) Fatha\nC) Kasra',
    'C) Kasra.',
  ],
  [
    'If you see a small curl or mini-wave shape above the letter, like ـُ, what is it called?\nA) Damma\nB) Kasra\nC) Fatha',
    'A) Damma.',
  ],
  [
    'True or false: Arabic letters are written and read from right to left.\nA) True\nB) False',
    'A) True.',
  ],
  [
    'Match the letter Ba (ب) with its correct sound when a Fatha is added:\nA) bi\nB) bu\nC) ba',
    'C) ba.',
  ],
  [
    'Initial shape: Which one is Ba at the beginning of a word?\nA) بـ\nB) ب\nC) ـب',
    'A) بـ',
  ],
  [
    'Medial shape: Which one is Ba in the middle of a word?\nA) ـبـ\nB) ب\nC) بـ',
    'A) ـبـ',
  ],
  [
    'Letter ت (Ta): Which one is Ta at the very end of a word?\nA) تـ\nB) ـتـ\nC) ـت',
    'C) ـت',
  ],
  [
    'Spot the difference: Look closely at ب and ن. Where is the dot for the letter Noon (ن)?\nA) Under the letter\nB) On top of the letter\nC) There is no dot',
    'B) On top of the letter.',
  ],
  [
    'When you see a Damma (ـُ) on a letter, your lips should make a small, round “O” shape to produce the “oo” sound.\nA) True\nB) False',
    'A) True.',
  ],
  [
    'A Fatha (ـَ) opens your mouth wide to make a happy “Ah” sound.\nA) True\nB) False',
    'A) True.',
  ],
  [
    'A Kasra (ـِ) pulls your smile down to make an “Ee” sound.\nA) True\nB) False',
    'A) True.',
  ],
];

const starter: GameData = {
  title: 'Road to Jannah',
  players: [
    { id: 'p1', name: 'Maya', color: '#8b5cf6' },
    { id: 'p2', name: 'Leo', color: '#f59e0b' },
    { id: 'p3', name: 'Sofia', color: '#06b6d4' },
  ],
  questions: starterCards.map(([prompt, answer], index) => ({
    id: `q${index + 1}`,
    prompt,
    answer,
    playerId: `p${(index % 3) + 1}`,
  })),
};

const colors = [
  '#8b5cf6',
  '#f59e0b',
  '#06b6d4',
  '#ef476f',
  '#22c55e',
  '#3b82f6',
];
const uid = () => Math.random().toString(36).slice(2, 9);

export default function App() {
  const [data, setData] = useState<GameData>(() => {
    const saved =
      localStorage.getItem('manarquest-game') ??
      localStorage.getItem('manaquest-game') ??
      localStorage.getItem('flipquest-game');
    if (saved)
      try {
        const parsed = JSON.parse(saved) as GameData;
        const isOldStarter =
          parsed.title === 'Animal Adventure' &&
          parsed.questions?.length === 5 &&
          parsed.questions[0]?.prompt === 'Which animal is this?';
        return isOldStarter ? starter : parsed;
      } catch {
        /* keep starter */
      }
    return starter;
  });
  const [view, setView] = useState<'play' | 'dashboard'>('play');
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [finished, setFinished] = useState(false);
  const [editing, setEditing] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);

  useEffect(() => {
    localStorage.setItem('manarquest-game', JSON.stringify(data));
  }, [data]);

  useEffect(() => {
    const context = (
      document as Document & {
        modelContext?: {
          registerTool: (
            tool: unknown,
            options?: { signal?: AbortSignal },
          ) => void | Promise<void>;
        };
      }
    ).modelContext;
    if (!context?.registerTool) return;
    const lifecycle = new AbortController();
    void Promise.resolve(
      context.registerTool(
        {
          name: 'configure_flashcard_game',
          title: 'Configure flashcard game',
          description:
            'Replace the current title, players, and flashcards in one action.',
          inputSchema: {
            type: 'object',
            properties: {
              title: { type: 'string' },
              players: {
                type: 'array',
                items: { type: 'string' },
                minItems: 1,
              },
              cards: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    question: { type: 'string' },
                    answer: { type: 'string' },
                    player: { type: 'integer', minimum: 0 },
                  },
                  required: ['question', 'answer', 'player'],
                  additionalProperties: false,
                },
              },
            },
            required: ['title', 'players', 'cards'],
            additionalProperties: false,
          },
          annotations: { readOnlyHint: false, untrustedContentHint: false },
          execute(input: unknown) {
            const value = input as {
              title?: unknown;
              players?: unknown;
              cards?: unknown;
            };
            if (
              typeof value.title !== 'string' ||
              !Array.isArray(value.players) ||
              !value.players.length ||
              !value.players.every((p) => typeof p === 'string') ||
              !Array.isArray(value.cards)
            )
              throw new Error('Invalid game configuration');
            const players = value.players.map((name, i) => ({
              id: uid(),
              name,
              color: colors[i % colors.length],
            }));
            const cards = value.cards as Array<{
              question?: unknown;
              answer?: unknown;
              player?: unknown;
            }>;
            if (
              !cards.every(
                (c) =>
                  typeof c.question === 'string' &&
                  typeof c.answer === 'string' &&
                  Number.isInteger(c.player) &&
                  Number(c.player) >= 0 &&
                  Number(c.player) < players.length,
              )
            )
              throw new Error('Every card needs valid text and a player index');
            const next: GameData = {
              title: value.title,
              players,
              questions: cards.map((c) => ({
                id: uid(),
                prompt: String(c.question),
                answer: String(c.answer),
                playerId: players[Number(c.player)].id,
              })),
            };
            setData(next);
            setIndex(0);
            setScores({});
            setRevealed(false);
            setFinished(false);
            setView('dashboard');
            return {
              status: 'saved',
              title: next.title,
              players: next.players.length,
              cards: next.questions.length,
            };
          },
        },
        { signal: lifecycle.signal },
      ),
    ).catch(() => undefined);
    return () => lifecycle.abort();
  }, []);

  const current = data.questions[index];
  const currentPlayer = data.players.find((p) => p.id === current?.playerId);
  const winners = useMemo(() => {
    const top = Math.max(0, ...data.players.map((p) => scores[p.id] || 0));
    return data.players.filter((p) => (scores[p.id] || 0) === top);
  }, [data.players, scores]);

  const markAnswer = (correct: boolean) => {
    if (!current || feedback) return;
    setFeedback(correct ? 'correct' : 'wrong');
    if (correct)
      setScores((s) => ({
        ...s,
        [current.playerId]: (s[current.playerId] || 0) + 1,
      }));
    if (index >= data.questions.length - 1)
      setTimeout(() => {
        setFeedback(null);
        setFinished(true);
      }, 720);
    else
      setTimeout(() => {
        setIndex((i) => i + 1);
        setRevealed(false);
        setFeedback(null);
      }, 720);
  };

  const resetGame = () => {
    setIndex(0);
    setScores({});
    setRevealed(false);
    setFinished(false);
    setFeedback(null);
  };
  const updateQuestion = (id: string, field: keyof Question, value: string) =>
    setData((d) => ({
      ...d,
      questions: d.questions.map((q) =>
        q.id === id ? { ...q, [field]: value } : q,
      ),
    }));
  const chooseAnsweringPlayer = (playerId: string) => {
    if (!current) return;
    updateQuestion(current.id, 'playerId', playerId);
  };
  const addQuestion = () => {
    const q = {
      id: uid(),
      prompt: 'Type your question',
      answer: 'Type the answer',
      playerId: data.players[0]?.id || '',
    };
    setData((d) => ({ ...d, questions: [...d.questions, q] }));
    setEditing(q.id);
  };
  const addPlayer = () => {
    const id = uid();
    setData((d) => ({
      ...d,
      players: [
        ...d.players,
        {
          id,
          name: `Player ${d.players.length + 1}`,
          color: colors[d.players.length % colors.length],
        },
      ],
    }));
  };

  return (
    <main className="app-shell">
      <header className="topbar">
        <button
          className="brand"
          onClick={() => setView('play')}
          aria-label="ManarQuest home"
        >
          <span className="brand-mark">
            <Sparkles size={20} />
          </span>
          <span>
            Manar<span>Quest</span>
          </span>
        </button>
        <nav aria-label="Main navigation">
          <button
            className={view === 'play' ? 'nav-active' : ''}
            onClick={() => setView('play')}
          >
            <Play size={17} fill="currentColor" /> Play game
          </button>
          <button
            className={view === 'dashboard' ? 'nav-active' : ''}
            onClick={() => setView('dashboard')}
          >
            <LayoutDashboard size={17} /> Dashboard
          </button>
        </nav>
        <button
          className="round-button"
          onClick={() => setView('dashboard')}
          aria-label="Settings"
        >
          <Settings2 size={20} />
        </button>
      </header>

      {view === 'play' ? (
        <section className="game-page">
          <div className="game-heading">
            <div>
              <p className="eyebrow">
                <span>●</span> LIVE GAME
              </p>
              <h1>{data.title}</h1>
            </div>
            <div className="game-heading-actions">
              <button className="reset-button" onClick={resetGame}>
                <RotateCcw size={16} /> Reset game &amp; scores
              </button>
              <button
                className="edit-game"
                onClick={() => setView('dashboard')}
              >
                <PencilLine size={16} /> Edit game
              </button>
            </div>
          </div>
          <div className="scoreboard">
            {data.players.map((player, i) => (
              <div
                className={`score-pill ${player.id === currentPlayer?.id ? 'is-turn' : ''}`}
                key={player.id}
                style={{ '--player': player.color } as React.CSSProperties}
              >
                <span className="avatar">
                  {player.name.slice(0, 1).toUpperCase()}
                </span>
                <div>
                  <small>
                    {player.id === currentPlayer?.id
                      ? 'YOUR TURN'
                      : `PLAYER ${i + 1}`}
                  </small>
                  <strong>{player.name}</strong>
                </div>
                <b>{scores[player.id] || 0}</b>
              </div>
            ))}
          </div>
          <div
            className="answering-picker"
            aria-label="Choose the player answering this question"
          >
            <div className="answering-label">
              <span className="answering-spark">
                <Sparkles size={16} />
              </span>
              <div>
                <strong>Who’s answering?</strong>
                <small>Pick a player for this card</small>
              </div>
            </div>
            <div className="answering-options">
              {data.players.map((player) => (
                <button
                  key={player.id}
                  className={player.id === currentPlayer?.id ? 'selected' : ''}
                  style={{ '--player': player.color } as React.CSSProperties}
                  onClick={() => chooseAnsweringPlayer(player.id)}
                  aria-pressed={player.id === currentPlayer?.id}
                >
                  <span>{player.name.slice(0, 1).toUpperCase()}</span>
                  {player.name}
                  {player.id === currentPlayer?.id && <Check size={15} />}
                </button>
              ))}
            </div>
          </div>
          <div className="progress-row">
            <span>
              Question {Math.min(index + 1, data.questions.length)} of{' '}
              {data.questions.length}
            </span>
            <div className="progress-track">
              <i
                style={{
                  width: `${data.questions.length ? ((index + 1) / data.questions.length) * 100 : 0}%`,
                }}
              />
            </div>
            <span>
              {data.questions.length
                ? Math.round(((index + 1) / data.questions.length) * 100)
                : 0}
              %
            </span>
          </div>
          {current ? (
            <div className="card-stage">
              <button
                className="side-arrow"
                aria-label="Previous card"
                disabled={index === 0}
                onClick={() => {
                  setIndex(index - 1);
                  setRevealed(false);
                }}
              >
                <ChevronLeft />
              </button>
              <button
                className={`flash-card ${revealed ? 'revealed' : ''} ${feedback === 'correct' ? 'feedback-correct' : ''} ${feedback === 'wrong' ? 'feedback-wrong' : ''}`}
                onClick={() => setRevealed(!revealed)}
                aria-label="Flip flash card"
              >
                <span className="card-corner top">★</span>
                <span className="card-corner bottom">★</span>
                {current.image && (
                  <img src={current.image} alt="Question clue" />
                )}
                <span className="question-badge">
                  <CircleHelp size={15} /> {revealed ? 'ANSWER' : 'QUESTION'}
                </span>
                <strong>{revealed ? current.answer : current.prompt}</strong>
                <small>
                  <RotateCcw size={14} /> Tap card to{' '}
                  {revealed ? 'see question' : 'reveal answer'}
                </small>
              </button>
              <button
                className="side-arrow"
                aria-label="Next card"
                disabled={index >= data.questions.length - 1}
                onClick={() => {
                  setIndex(index + 1);
                  setRevealed(false);
                }}
              >
                <ChevronRight />
              </button>
            </div>
          ) : (
            <div className="empty-card">
              Add your first question in the dashboard.
            </div>
          )}
          <div className="answer-actions">
            <button
              className="wrong"
              onClick={() => markAnswer(false)}
              disabled={!current || !!feedback}
            >
              <span>
                <X />
              </span>
              <div>
                <strong>Not quite</strong>
                <small>Keep trying!</small>
              </div>
            </button>
            <button
              className="correct"
              onClick={() => markAnswer(true)}
              disabled={!current || !!feedback}
            >
              <span>
                <Check />
              </span>
              <div>
                <strong>Got it!</strong>
                <small>+1 point</small>
              </div>
            </button>
          </div>
          <p className="keyboard-hint">
            Teacher controls · flip the card, then choose the result
          </p>
        </section>
      ) : (
        <section className="dashboard-page">
          <div className="dashboard-title">
            <div>
              <button className="back" onClick={() => setView('play')}>
                <ArrowLeft size={17} /> Back to game
              </button>
              <h1>Game builder</h1>
              <p>
                Make this round completely yours. Everything saves on this
                device.
              </p>
            </div>
            <button
              className="play-now"
              onClick={() => {
                resetGame();
                setView('play');
              }}
            >
              <Play size={17} fill="currentColor" /> Play this game
            </button>
          </div>
          <div className="builder-grid">
            <div className="builder-main">
              <section className="panel game-details">
                <div className="panel-heading">
                  <span className="panel-icon purple">
                    <PencilLine size={19} />
                  </span>
                  <div>
                    <h2>Game details</h2>
                    <p>Name your adventure</p>
                  </div>
                </div>
                <label>
                  GAME TITLE
                  <input
                    value={data.title}
                    onChange={(e) =>
                      setData({ ...data, title: e.target.value })
                    }
                  />
                </label>
              </section>
              <section className="panel">
                <div className="panel-heading split">
                  <div className="heading-left">
                    <span className="panel-icon yellow">
                      <CircleHelp size={19} />
                    </span>
                    <div>
                      <h2>Question cards</h2>
                      <p>{data.questions.length} cards in this game</p>
                    </div>
                  </div>
                  <button className="add-button" onClick={addQuestion}>
                    <Plus size={17} /> Add card
                  </button>
                </div>
                <div className="question-list">
                  {data.questions.map((q, i) => (
                    <div className="question-editor" key={q.id}>
                      <span className="number">{i + 1}</span>
                      <div className="question-fields">
                        <input
                          aria-label={`Question ${i + 1}`}
                          value={q.prompt}
                          onFocus={() => setEditing(q.id)}
                          onChange={(e) =>
                            updateQuestion(q.id, 'prompt', e.target.value)
                          }
                        />
                        {editing === q.id && (
                          <div className="expanded-fields">
                            <textarea
                              aria-label="Answer"
                              value={q.answer}
                              onChange={(e) =>
                                updateQuestion(q.id, 'answer', e.target.value)
                              }
                            />
                            <label className="image-upload">
                              <ImagePlus size={17} />{' '}
                              {q.image ? 'Replace image' : 'Add image'}
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                  const f = e.target.files?.[0];
                                  if (!f) return;
                                  const r = new FileReader();
                                  r.onload = () =>
                                    updateQuestion(
                                      q.id,
                                      'image',
                                      String(r.result),
                                    );
                                  r.readAsDataURL(f);
                                }}
                              />
                            </label>
                          </div>
                        )}
                      </div>
                      <select
                        aria-label="Assigned player"
                        value={q.playerId}
                        onChange={(e) =>
                          updateQuestion(q.id, 'playerId', e.target.value)
                        }
                      >
                        {data.players.map((p) => (
                          <option key={p.id} value={p.id}>
                            {p.name}
                          </option>
                        ))}
                      </select>
                      <button
                        className="icon-delete"
                        aria-label="Delete question"
                        onClick={() =>
                          setData((d) => ({
                            ...d,
                            questions: d.questions.filter((x) => x.id !== q.id),
                          }))
                        }
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>
                  ))}
                </div>
              </section>
            </div>
            <aside className="panel players-panel">
              <div className="panel-heading">
                <span className="panel-icon cyan">
                  <Trophy size={19} />
                </span>
                <div>
                  <h2>Players</h2>
                  <p>Who’s joining?</p>
                </div>
              </div>
              <div className="player-list">
                {data.players.map((p, i) => (
                  <div
                    className="player-edit"
                    key={p.id}
                    style={{ '--player': p.color } as React.CSSProperties}
                  >
                    <span>{p.name.slice(0, 1).toUpperCase()}</span>
                    <input
                      value={p.name}
                      aria-label={`Player ${i + 1} name`}
                      onChange={(e) =>
                        setData((d) => ({
                          ...d,
                          players: d.players.map((x) =>
                            x.id === p.id ? { ...x, name: e.target.value } : x,
                          ),
                        }))
                      }
                    />
                    <button
                      aria-label="Remove player"
                      disabled={data.players.length === 1}
                      onClick={() =>
                        setData((d) => ({
                          ...d,
                          players: d.players.filter((x) => x.id !== p.id),
                          questions: d.questions.map((q) =>
                            q.playerId === p.id
                              ? {
                                  ...q,
                                  playerId:
                                    d.players.find((x) => x.id !== p.id)?.id ||
                                    '',
                                }
                              : q,
                          ),
                        }))
                      }
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
              <button className="add-player" onClick={addPlayer}>
                <Plus size={17} /> Add player
              </button>
              <div className="save-note">
                <Sparkles size={18} />
                <div>
                  <strong>Saved automatically</strong>
                  <span>Your game lives in this browser.</span>
                </div>
              </div>
            </aside>
          </div>
        </section>
      )}
      {finished && (
        <div
          className="celebration"
          role="dialog"
          aria-modal="true"
          aria-label="Game results"
        >
          <div className="confetti" aria-hidden="true">
            {Array.from({ length: 32 }, (_, i) => (
              <i key={i} style={{ '--i': i } as React.CSSProperties} />
            ))}
          </div>
          <div className="winner-card">
            <span className="trophy">
              <Trophy size={44} />
            </span>
            <p>AMAZING GAME!</p>
            <h2>
              {winners.length > 1
                ? "It's a tie!"
                : `${winners[0]?.name || 'You'} wins!`}
            </h2>
            <div className="winner-names">
              {winners.map((w) => (
                <span key={w.id} style={{ background: w.color }}>
                  {w.name} · {scores[w.id] || 0}
                </span>
              ))}
            </div>
            <p className="winner-copy">
              You answered, learned, and cheered each other on.
            </p>
            <button onClick={resetGame}>
              <RotateCcw size={18} /> Play again
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
