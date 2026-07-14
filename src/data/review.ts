import type { Flashcard, Quiz } from "@/types";

export const seedFlashcards: Flashcard[] = [
  { id: "f1", courseId: "c-etf", front: "什麼是 ETF？", back: "指數股票型基金，追蹤特定指數、可像股票一樣在市場買賣，一次買進即分散投資一籃子標的。" },
  { id: "f2", courseId: "c-etf", front: "費用率（Expense Ratio）代表什麼？", back: "基金每年收取的管理成本占資產的比例，長期複利下，低費用率對報酬影響很大。" },
  { id: "f3", courseId: "c-etf", front: "為什麼要分散投資？", back: "降低單一標的波動對整體資產的衝擊，避免把雞蛋放在同一個籃子裡。" },
  { id: "f4", courseId: "c-etf", front: "0050 追蹤什麼指數？", back: "台灣 50 指數，涵蓋台股市值前 50 大的上市公司。" },
  { id: "f5", courseId: "c-pm", front: "需求訪談的第一守則？", back: "問行為與過去發生的事實，而不是問假設性的『你會不會用』。" },
  { id: "f6", courseId: "c-pm", front: "什麼是引導性問題？", back: "暗示了期待答案的問題，會污染訪談資料，應改用開放式問句。" },
  { id: "f7", courseId: "c-ai", front: "用 AI 整理會議記錄的關鍵步驟？", back: "先給逐字稿，再要求輸出『決議 / 待辦 / 負責人 / 期限』的結構化格式。" },
  { id: "f8", courseId: "c-ai", front: "Prompt 要具體到什麼程度？", back: "給角色、給任務、給輸出格式、給範例，四者齊備結果最穩定。" },
  { id: "f9", courseId: "c-bake", front: "麵團攪拌過度會怎樣？", back: "麵筋過度出筋，成品口感變硬、不鬆軟。" },
  { id: "f10", courseId: "c-fin101", front: "三大財報是哪三張？", back: "損益表、資產負債表、現金流量表。" },
  { id: "f11", courseId: "c-fin101", front: "毛利率反映什麼？", back: "本業的獲利能力，毛利率越高代表產品越有定價權或成本控制越好。" },
  { id: "f12", courseId: "c-slides", front: "一頁投影片的原則？", back: "一頁一重點，標題直接講結論，而不是只寫主題。" },
];

export const seedQuizzes: Quiz[] = [
  {
    id: "q1",
    courseId: "c-etf",
    question: "關於 ETF 的敘述，何者正確？",
    options: [
      "ETF 只能在收盤後以淨值申購",
      "買一檔 ETF 即可分散投資一籃子標的",
      "ETF 一定沒有管理費用",
      "ETF 報酬保證高於個股",
    ],
    answerIndex: 1,
    explanation: "ETF 追蹤指數、一次持有多檔成分股，天然具備分散效果；但仍有費用率，且報酬不保證。",
  },
  {
    id: "q2",
    courseId: "c-etf",
    question: "長期投資時，為什麼要特別留意費用率？",
    options: [
      "費用率越高報酬越好",
      "費用率跟報酬無關",
      "複利效果下，長期會顯著侵蝕報酬",
      "費用率只影響第一年",
    ],
    answerIndex: 2,
    explanation: "看似微小的年度費用率，經過長期複利放大後，會明顯拉低最終報酬。",
  },
  {
    id: "q3",
    courseId: "c-pm",
    question: "以下哪一種提問最適合需求訪談？",
    options: [
      "你會不會想要這個新功能？",
      "上一次遇到這個問題時，你實際是怎麼處理的？",
      "你覺得我們做得好不好？",
      "這個功能是不是很棒？",
    ],
    answerIndex: 1,
    explanation: "問實際發生過的行為能取得可信資料；假設性與引導性問題容易得到討好式答案。",
  },
  {
    id: "q4",
    courseId: "c-ai",
    question: "要讓 AI 穩定輸出想要的格式，最有效的做法是？",
    options: [
      "問越短越好",
      "給角色、任務、輸出格式與範例",
      "一次問十個問題",
      "不要給任何背景",
    ],
    answerIndex: 1,
    explanation: "結構化的 prompt（角色 / 任務 / 格式 / 範例）能大幅提升輸出的一致性。",
  },
  {
    id: "q5",
    courseId: "c-fin101",
    question: "現金流量表主要告訴我們什麼？",
    options: [
      "公司賺了多少帳面利潤",
      "公司實際的現金進出狀況",
      "公司股價會不會漲",
      "公司員工人數",
    ],
    answerIndex: 1,
    explanation: "損益表看帳面獲利，現金流量表看真金白銀的進出，兩者需一起看才完整。",
  },
];
