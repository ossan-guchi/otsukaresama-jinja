import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Flower2,
  ShieldCheck,
  MessageCircle,
  RefreshCcw,
  Send,
  Wind,
  Lock,
  Sparkles,
  Heart,
} from "lucide-react";

function Card({ className = "", children }) {
  return <div className={className}>{children}</div>;
}

function CardContent({ className = "", children }) {
  return <div className={className}>{children}</div>;
}

function Button({ className = "", children, onClick, disabled = false }) {
  const baseClass =
    "inline-flex items-center justify-center font-medium transition disabled:cursor-not-allowed disabled:opacity-40 ";
  return (
    <button type="button" onClick={onClick} disabled={disabled} className={baseClass + className}>
      {children}
    </button>
  );
}

export default function OtsukaresamaJinjaApp() {
  const [text, setText] = useState("");
  const [savedGuchi, setSavedGuchi] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [purifying, setPurifying] = useState(false);
  const [mode, setMode] = useState("work");
  const [mikoMessage, setMikoMessage] = useState("");
  const [fortune, setFortune] = useState(null);

  const mikoMessages = [
    "今日も本当によく頑張りましたね。",
    "無理して笑っていた分、ここでは力を抜いて大丈夫です。",
    "そのモヤモヤ、ちゃんと置いていってくださいね。",
    "あなたが弱いのではなく、ずっと頑張りすぎていたのだと思います。",
    "今日は自分を責めずに、少し甘やかしてあげましょう。",
    "誰かの機嫌より、あなたの心の平和を大切にしてくださいね。",
    "明日のあなたに任せてもいいことは、今日は手放しましょう。",
  ];

  const fortunes = [
    { rank: "大吉", message: "今日は自分を甘やかしてOK。好きなものを買って帰りましょう。", item: "コンビニスイーツ" },
    { rank: "吉", message: "十分頑張っています。今日は早めにお風呂に入りましょう。", item: "入浴剤" },
    { rank: "中吉", message: "そのモヤモヤは明日のあなたに任せましょう。", item: "温かいカフェラテ" },
    { rank: "小吉", message: "好きな飲み物をゆっくり飲む時間を作りましょう。", item: "お気に入りのマグカップ" },
    { rank: "末吉", message: "今日は無理に前向きにならなくて大丈夫です。", item: "ふわふわの靴下" },
    { rank: "凶", message: "休憩が必要です。予定をひとつ減らしても大丈夫。", item: "早寝" },
  ];

  const cleanText = (value) => {
    return value.replace(/<[^>]*>?/gm, "").replace(/[{}$]/g, "").slice(0, 500);
  };

  const submitGuchi = () => {
    const cleaned = cleanText(text.trim());
    if (!cleaned) return;
    setSavedGuchi(cleaned);
    setSubmitted(true);
    setPurifying(false);
    setMikoMessage("");
    setFortune(null);
  };

  const purifyGuchi = () => {
    if (!savedGuchi) return;
    setPurifying(true);
    setMikoMessage("");
    setFortune(null);

    setTimeout(() => {
      const miko = mikoMessages[Math.floor(Math.random() * mikoMessages.length)];
      const omikuji = fortunes[Math.floor(Math.random() * fortunes.length)];
      setSavedGuchi("");
      setText("");
      setPurifying(false);
      setSubmitted(false);
      setMikoMessage(miko);
      setFortune(omikuji);
    }, 2600);
  };

  const reset = () => {
    setText("");
    setSavedGuchi("");
    setSubmitted(false);
    setPurifying(false);
    setMikoMessage("");
    setFortune(null);
  };

  const result = useMemo(() => {
    const base = savedGuchi || text.trim();
    const long = base.length > 120;

    const empathyMap = {
      work: "職場で気を張り続けるのは、本当に疲れますよね。ここではきれいにまとめなくて大丈夫です。",
      boss: "理不尽な言葉や態度は、あとからじわじわ心に残ります。傷ついた自分を責めなくて大丈夫です。",
      life: "仕事も生活も人間関係も、全部をちゃんとしようとすると疲れてしまいますよね。",
    };

    const summary = long
      ? "かなり溜め込んでいたようです。今は解決よりも、まず気持ちを外に出して、心を休ませる時間が必要です。"
      : "今のモヤモヤは、我慢・疲れ・納得できなさが少しずつ重なったものかもしれません。";

    const advice =
      "今日やることはひとつだけで大丈夫です。温かい飲み物を飲む、スマホを少し閉じる、早く寝る。小さな回復を優先しましょう。";

    const cleanse =
      "このモヤモヤは、ここでそっと奉納しましょう。明日まで抱えなくて大丈夫。今日のあなたは、十分頑張りました。";

    return { empathy: empathyMap[mode], summary, advice, cleanse };
  }, [savedGuchi, text, mode]);

  const modeButtonClass = (targetMode) => {
    return (
      "rounded-xl px-4 py-3 text-sm font-medium transition " +
      (mode === targetMode
        ? "bg-pink-200/60 ring-2 ring-pink-300/70 text-rose-950"
        : "bg-white/60 text-rose-900 hover:bg-white/80")
    );
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-rose-50 via-pink-50 to-orange-50 p-4 md:p-8 text-rose-950">
      <div className="absolute inset-0 opacity-50 bg-[radial-gradient(circle_at_top,rgba(251,207,232,0.9),transparent_36%),radial-gradient(circle_at_bottom,rgba(254,215,170,0.75),transparent_44%)]" />

      <AnimatePresence>
        {purifying && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center bg-rose-100/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ y: 40, opacity: 1, scale: 1 }}
              animate={{ y: -240, opacity: 0, scale: 0.7 }}
              transition={{ duration: 2.6, ease: "easeInOut" }}
              className="max-w-md rounded-3xl border border-pink-200 bg-white/90 p-5 text-center shadow-2xl"
            >
              <p className="mb-3 text-sm font-semibold text-pink-600">奉納中</p>
              <p className="leading-7 text-rose-900">{savedGuchi}</p>
            </motion.div>

            {[...Array(30)].map((_, i) => (
              <motion.span
                key={"petal-" + i}
                initial={{
                  opacity: 0,
                  y: 180,
                  x: (i % 10) * 42 - 210,
                  rotate: 0,
                }}
                animate={{
                  opacity: [0, 1, 0],
                  y: -260,
                  x: (i % 2 === 0 ? 1 : -1) * (70 + i * 4),
                  rotate: 220,
                }}
                transition={{ duration: 2.4, delay: i * 0.035 }}
                className="absolute text-2xl"
              >
                🌸
              </motion.span>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: [0, 1, 1], y: [30, 0, 0] }}
              transition={{ delay: 1.2, duration: 1 }}
              className="absolute top-24 text-center"
            >
              <Sparkles className="mx-auto mb-3 h-12 w-12 text-pink-500" />
              <p className="text-2xl font-bold text-rose-900">奉納完了</p>
              <p className="mt-2 text-sm text-rose-700">巫女さんがおみくじを引いています</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="relative z-10 mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-pink-200 bg-white/70 px-4 py-2 shadow-sm">
            <Flower2 className="h-4 w-4 text-pink-500" />
            <span className="text-sm font-bold text-rose-900">🌸 おつかれさま神社 🌸</span>
          </div>
          <h1 className="mb-3 text-3xl font-bold tracking-tight md:text-5xl">
            今日のモヤモヤ、奉納しませんか？
          </h1>
          <p className="text-base text-rose-700 md:text-lg">
            仕事・上司・人間関係・毎日の疲れをそっと奉納。巫女さんがやさしく受け止め、おみくじを届けます。
          </p>
        </motion.div>

        <Card className="rounded-3xl border border-pink-100 bg-white/75 shadow-2xl backdrop-blur">
          <CardContent className="space-y-5 p-5 md:p-7">
            <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
              <button onClick={() => setMode("work")} className={modeButtonClass("work")}>仕事疲れ</button>
              <button onClick={() => setMode("boss")} className={modeButtonClass("boss")}>上司・職場</button>
              <button onClick={() => setMode("life")} className={modeButtonClass("life")}>人間関係・生活</button>
            </div>

            <div>
              <label className="mb-2 flex items-center gap-2 font-semibold text-rose-900">
                <MessageCircle className="h-5 w-5 text-pink-500" />
                今日のモヤモヤを書く
              </label>
              <textarea
                value={text}
                onChange={(e) => setText(cleanText(e.target.value))}
                placeholder="例：今日も職場で気を遣いすぎて疲れた。笑って流したけど、本当はちょっとしんどかった…"
                className="min-h-44 w-full resize-none rounded-3xl border border-pink-100 bg-white/90 p-4 text-base text-rose-950 outline-none placeholder:text-rose-300 focus:ring-2 focus:ring-pink-200"
              />
              <div className="mt-2 flex items-center justify-between text-xs text-rose-500">
                <span>最大500文字。個人名・会社名・住所などは書かないことをおすすめします。</span>
                <span>{text.length}/500</span>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Button onClick={submitGuchi} className="rounded-2xl bg-rose-900 px-5 py-6 text-base text-white hover:bg-rose-800">
                <Send className="mr-2 h-4 w-4" />
                モヤモヤを預ける
              </Button>
              <Button onClick={reset} className="rounded-2xl border border-pink-200 bg-white/70 px-5 py-6 text-base text-rose-900 hover:bg-white">
                <RefreshCcw className="mr-2 h-4 w-4" />
                書き直す
              </Button>
            </div>
          </CardContent>
        </Card>

        <AnimatePresence>
          {submitted && savedGuchi && !purifying && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.45 }}
              className="mt-6 grid gap-4"
            >
              <ResponseCard icon={<Heart className="h-5 w-5" />} title="まず、受け止めます" text={result.empathy} />
              <ResponseCard icon={<Wind className="h-5 w-5" />} title="気持ちの整理" text={result.summary} />
              <ResponseCard icon={<MessageCircle className="h-5 w-5" />} title="今日できる小さな回復" text={result.advice} />
              <ResponseCard icon={<Sparkles className="h-5 w-5" />} title="奉納前の言葉" text={result.cleanse} highlight />
            </motion.div>
          )}
        </AnimatePresence>

        {mikoMessage && fortune && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-6 grid gap-4 md:grid-cols-2"
          >
            <Card className="rounded-3xl border border-pink-100 bg-white/80 shadow-xl">
              <CardContent className="p-6 text-center">
                <div className="mb-3 text-6xl">👩‍🦰</div>
                <h2 className="mb-2 text-xl font-bold text-rose-900">巫女さん</h2>
                <p className="text-lg leading-8 text-rose-800">{mikoMessage}</p>
              </CardContent>
            </Card>

            <Card className="rounded-3xl border border-pink-100 bg-gradient-to-br from-white to-pink-100 shadow-xl">
              <CardContent className="p-6 text-center">
                <div className="mb-3 text-5xl">🎴</div>
                <h2 className="mb-2 text-xl font-bold text-rose-900">今日のおみくじ</h2>
                <p className="mb-3 text-4xl font-black text-pink-600">{fortune.rank}</p>
                <p className="text-lg leading-8 text-rose-900">{fortune.message}</p>
                <p className="mt-4 rounded-2xl bg-white/70 px-4 py-3 text-sm font-semibold text-rose-700">
                  ラッキーアイテム：{fortune.item}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        )}

        <section className="mt-6 grid gap-4 md:grid-cols-2">
          <SecurityCard icon={<Lock className="h-5 w-5" />} title="ブラウザ完結・保存しない設計" text="入力されたモヤモヤは画面上の一時状態だけで扱い、サーバー保存・履歴保存をしない前提で設計しています。" />
          <SecurityCard icon={<ShieldCheck className="h-5 w-5" />} title="安全対策" text="HTMLタグ除去、文字数制限、個人情報を書かない注意表示を実装。公開時はHTTPS、ログ最小化、プライバシーポリシーも整えましょう。" />
        </section>

        <p className="mb-28 mt-6 text-center text-xs text-rose-500">
          つらさが強いときは、信頼できる人や専門窓口にも頼ってください。このサービスは医療・心理相談の代替ではありません。
        </p>
      </main>

      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-pink-200 bg-white/85 p-4 backdrop-blur-xl">
        <div className="mx-auto max-w-4xl">
          <motion.button
            whileTap={{ scale: 0.97, rotate: savedGuchi ? [0, -1, 1, 0] : 0 }}
            onClick={purifyGuchi}
            disabled={!savedGuchi || purifying}
            className="group relative w-full overflow-hidden rounded-3xl bg-gradient-to-r from-pink-500 via-rose-400 to-orange-300 px-6 py-6 text-xl font-black tracking-wide text-white shadow-2xl shadow-pink-200 transition disabled:cursor-not-allowed disabled:opacity-40 md:text-2xl"
          >
            <span className="absolute inset-0 bg-white/0 transition group-hover:bg-white/10" />
            <span className="relative flex items-center justify-center gap-3">
              <Flower2 className="h-7 w-7" />
              モヤモヤを奉納する
              <Flower2 className="h-7 w-7" />
            </span>
            <span className="relative mt-1 block text-xs font-medium text-white md:text-sm">
              {savedGuchi
                ? "押すと花びらが舞い、巫女さんがおみくじを届けます"
                : "先に『モヤモヤを預ける』を押してください"}
            </span>
          </motion.button>
        </div>
      </div>
    </div>
  );
}

function ResponseCard({ icon, title, text, highlight = false }) {
  const cardClass =
    "rounded-3xl border border-pink-100 shadow-lg " +
    (highlight ? "bg-pink-100/80" : "bg-white/75");

  const iconClass =
    "rounded-2xl p-2 " +
    (highlight ? "bg-pink-200 text-pink-700" : "bg-rose-100 text-rose-600");

  return (
    <Card className={cardClass}>
      <CardContent className="p-5">
        <div className="flex items-start gap-3">
          <div className={iconClass}>{icon}</div>
          <div>
            <h2 className="mb-1 font-bold text-rose-900">{title}</h2>
            <p className="leading-7 text-rose-700">{text}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function SecurityCard({ icon, title, text }) {
  return (
    <Card className="rounded-3xl border border-emerald-100 bg-white/70 shadow-md">
      <CardContent className="p-5">
        <div className="flex items-start gap-3">
          <div className="rounded-2xl bg-emerald-100 p-2 text-emerald-600">{icon}</div>
          <div>
            <h3 className="mb-1 font-bold text-rose-900">{title}</h3>
            <p className="text-sm leading-6 text-rose-600">{text}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
