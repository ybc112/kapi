import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useAppStore } from "@/store";

const MINT_TIME = new Date("2026-08-04T20:00:00").getTime();

function pad(n: number) {
  return n < 10 ? `0${n}` : `${n}`;
}

export default function Home() {
  const { showToast } = useAppStore();
  const [cd, setCd] = useState({ d: "--", h: "--", m: "--", s: "--" });
  const revealRefs = useRef<HTMLElement[]>([]);

  useEffect(() => {
    const tick = () => {
      const diff = MINT_TIME - Date.now();
      if (diff <= 0) {
        setCd({ d: "00", h: "00", m: "00", s: "00" });
        return;
      }
      setCd({
        d: pad(Math.floor(diff / 86400000)),
        h: pad(Math.floor((diff % 86400000) / 3600000)),
        m: pad(Math.floor((diff % 3600000) / 60000)),
        s: pad(Math.floor((diff % 60000) / 1000)),
      });
    };
    tick();
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    revealRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const addReveal = (el: HTMLElement | null) => {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el);
    }
  };

  return (
    <div className="home">
      {/* HERO */}
      <section className="hero relative overflow-hidden py-20 pb-32" id="top">
        <div className="cloud c1" />
        <div className="cloud c2" />
        <span className="spark s1">✦</span>
        <span className="spark s2">✦</span>
        <span className="spark s3">✦</span>

        <div className="wrap hero-inner relative z-10 mx-auto max-w-[1060px] px-6">
          <div className="hero-left">
            <span className="stamp">🦫 主打一个佛系 · 拒绝暴涨暴跌套路</span>
            <h1 className="hand">
              佛系卡皮巴拉
              <span className="l2">
                <span className="gr">游戏生态币</span> <span className="hot">来了</span>
              </span>
            </h1>
            <svg className="squiggle" viewBox="0 0 300 14" aria-hidden="true">
              <path
                d="M4 9 C 45 3, 90 12, 132 7 S 220 3, 296 8"
                stroke="#E9A85B"
                strokeWidth="5"
                fill="none"
                strokeLinecap="round"
              />
            </svg>
            <p className="lead">
              不靠虚头炒作，靠<b>链上机制</b>维持生态稳定。
              <br />
              玩游戏 + 持币 = 双重收益。
            </p>
            <p className="lead text-xs tracking-wide opacity-80">
              🦫 Capybara game meme token · chill meme culture with real mechanism
            </p>
            <div className="cta-row">
              <button
                className="btn btn-main"
                onClick={() => showToast("info", "🎮 小游戏马上入驻生态，先囤币当股东！")}
              >
                🎮 进生态赚币
              </button>
              <Link className="btn btn-ghost" to="/mint">
                生态 Mint 发射 →
              </Link>
            </div>
            <span className="hint-down hand">↓ 往下翻，看看金库怎么拖底</span>
          </div>

          <div className="hero-right relative flex justify-center">
            <span className="tape tl" />
            <span className="tape br" />
            <img className="capy-pic" src="/logo.jpg" alt="佛系卡皮巴拉 logo" />
            <span className="note-sticker st1">
              🏦 80% 进托底金库<small>自动回购 · 下跌护盘</small>
            </span>
            <span className="note-sticker st2">
              🧺 20% 持币分红<small>按持仓比例分</small>
            </span>
            <span className="note-sticker st3">
              🛡️ 0 归零风险<small>机制写死在合约里</small>
            </span>
          </div>
        </div>

        <div className="hero-ground absolute bottom-0 left-0 right-0 z-[1]">
          <div className="pond" />
          <span className="capy-on-grass">🦫</span>
          <span className="capy-on-grass r">🦫</span>
        </div>
      </section>

      {/* BULLETIN */}
      <section className="bulletin py-24" id="bulletin">
        <div className="wrap mx-auto max-w-[1060px] px-6">
          <div className="sec-head reveal" ref={addReveal}>
            <span className="sec-kicker">📌 公告栏</span>
            <h2 className="sec-title hand">
              每笔交易税费
              <br />
              <span className="em">100%</span> 都花在生态上
            </h2>
            <p className="sec-sub">
              分配规则写死在智能合约里，链上公开、无法篡改 —— 这是卡皮巴拉最硬气的底气。
            </p>
          </div>

          <div className="board reveal relative" ref={addReveal}>
            <span className="pin p1" />
            <span className="pin p2" />
            <div className="papers grid gap-6">
              <div className="paper left">
                <span className="paper-tag">托底金库 🏦</span>
                <div className="pct-row">
                  <span className="pct-num hand">80%</span>
                  <span className="pct-label">
                    交易税费 →
                    <br />
                    生态托底金库
                  </span>
                </div>
                <h3 className="hand">
                  <span className="capy-em">🦫</span>自动回购 · 下跌护盘
                </h3>
                <p>给整个游戏生态筑牢价值底线，告别无支撑归零风险。</p>
                <ul>
                  <li>自动回购垫底，跌不穿</li>
                  <li>金库持续积累，越托越厚</li>
                  <li>价值底线，链上可查</li>
                </ul>
                <div className="fine">🔒 已写入合约 · 任何人无法人为篡改</div>
              </div>

              <div className="paper right">
                <span className="paper-tag">分红池 🧺</span>
                <div className="pct-row">
                  <span className="pct-num hand">20%</span>
                  <span className="pct-label">
                    剩余资金 →
                    <br />
                    自动归集分红池
                  </span>
                </div>
                <h3 className="hand">
                  <span className="capy-em">🧺</span>按持仓比例分给所有人
                </h3>
                <p>拿着不动也有生态红利，长期持仓越拿越香。</p>
                <ul>
                  <li>自动归集，不用手动领</li>
                  <li>按持仓比例，人人有份</li>
                  <li>持仓越久，分红越多</li>
                </ul>
                <div className="fine">📜 分红逻辑 · 全部链上执行</div>
              </div>
            </div>

            <div className="board-banner hand">
              🦫 一边玩小游戏做任务赚币 · 一边享受金库托底兜底 · 长期持仓拿分红
            </div>
          </div>
        </div>
      </section>

      {/* NOTES */}
      <section className="notes pb-24 pt-4" id="notes">
        <div className="wrap mx-auto max-w-[1060px] px-6">
          <div className="sec-head reveal" ref={addReveal}>
            <span className="sec-kicker">🌿 生态闭环</span>
            <h2 className="sec-title hand">
              不是空气币，
              <br />
              是<span className="em">闭环经济</span>
            </h2>
            <p className="sec-sub">游戏驱动流量 → 金库托底价值 → 分红回馈社区，环环相扣。</p>
          </div>

          <div className="notes-grid grid gap-6">
            <div className="stickynote reveal" ref={addReveal}>
              <span className="big">🎮</span>
              <h4>游戏驱动流量</h4>
              <p>金库托底价值，分红回馈社区，玩的人越多生态越稳。</p>
              <span className="mark">闭环第 1 环</span>
            </div>
            <div className="stickynote reveal" ref={addReveal}>
              <span className="big">🛡️</span>
              <h4>80% 金库护盘</h4>
              <p>生态金库托底，筑牢游戏代币的价值底线。</p>
              <span className="mark">最硬气的底气</span>
            </div>
            <div className="stickynote reveal" ref={addReveal}>
              <span className="big">🎁</span>
              <h4>玩着就把币赚了</h4>
              <p>游戏内行为产出代币，持仓共享生态分红收益。</p>
              <span className="mark">双重收益</span>
            </div>
            <div className="stickynote reveal" ref={addReveal}>
              <span className="big">🌱</span>
              <h4>生存生态</h4>
              <p>卡皮巴拉生存生态，拒绝无序暴跌，构建闭环经济。</p>
              <span className="mark">拒绝套路</span>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="about relative overflow-hidden py-24" id="about">
        <div className="wrap mx-auto max-w-[1060px] px-6">
          <div className="journal reveal relative" ref={addReveal}>
            <figure className="photo relative mx-auto">
              <span className="tape" />
              <img src="/logo.jpg" alt="佛系卡皮巴拉" />
              <figcaption>📸 今日份佛系 · 拍于生态里</figcaption>
            </figure>
            <div className="body">
              <span className="sec-kicker">🧘 手账里的话</span>
              <h2 className="sec-title hand text-[clamp(26px,3.6vw,36px)]">
                主打<span className="em">佛系生存玩法</span>的游戏型 Meme 生态
              </h2>
              <p className="mt-4">
                卡皮巴拉是主打佛系生存玩法的游戏型 Meme 生态，而非单纯炒作代币。
                <b>所有税费分配规则写入智能合约，无法人为篡改。</b>
                玩家通过生态内各类生存小游戏获取代币，依托专属金库实现价格托底，同时享受生态分红，打造
                <b>游戏、流通、护盘、分红</b>一体化的可持续生态体系。
              </p>
              <span className="handwritten hand">—— 不靠虚头炒作，靠链上机制维持生态稳定 🫧</span>
              <div className="tags flex flex-wrap gap-2">
                <span>🍙 佛系</span>
                <span>🎮 游戏型 Meme</span>
                <span>⚖️ 机制上链</span>
                <span>💎 金库托底</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TICKETS */}
      <section className="tickets py-24" id="tickets">
        <div className="wrap mx-auto max-w-[1060px] px-6">
          <div className="sec-head reveal" ref={addReveal}>
            <span className="sec-kicker">🎮 游戏生态</span>
            <h2 className="sec-title hand">
              卡皮巴拉的
              <br />
              <span className="gr">佛系生存日记</span>
            </h2>
            <p className="sec-sub">小游戏们正在晒太阳筹备中 ☀️ 玩着玩着就把币赚了。</p>
          </div>

          <div className="tickets-grid grid gap-7">
            <div className="ticket reveal" ref={addReveal}>
              <div className="head">
                <span>场次 01</span>
                <span>🍉 今日热映</span>
              </div>
              <div className="body">
                <span className="big">🍉</span>
                <h4 className="hand">吃瓜消消乐</h4>
                <p>卡皮巴拉最爱的西瓜，消除爽感拉满，通关掉落代币。</p>
              </div>
              <div className="foot">
                <span className="stub" />
                <span>任务产出 🪙</span>
                <span className="go">即将上映 →</span>
                <span className="stub r" />
              </div>
            </div>

            <div className="ticket reveal" ref={addReveal}>
              <div className="head">
                <span>场次 02</span>
                <span>🎣 午后时光</span>
              </div>
              <div className="body">
                <span className="big">🎣</span>
                <h4 className="hand">佛系钓鱼</h4>
                <p>摆烂钓鱼也能赚，鱼竿一甩代币进账，还能钓到稀有皮肤。</p>
              </div>
              <div className="foot">
                <span className="stub" />
                <span>挂机收益 🌙</span>
                <span className="go">即将上映 →</span>
                <span className="stub r" />
              </div>
            </div>

            <div className="ticket reveal" ref={addReveal}>
              <div className="head">
                <span>场次 03</span>
                <span>🛁 温泉日</span>
              </div>
              <div className="body">
                <span className="big">🛁</span>
                <h4 className="hand">温泉泡澡</h4>
                <p>卡皮巴拉躺平模拟器，泡温泉涨体力，体力换代币。</p>
              </div>
              <div className="foot">
                <span className="stub" />
                <span>佛系养成 🧘</span>
                <span className="go">即将上映 →</span>
                <span className="stub r" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MINT */}
      <section className="mint relative overflow-hidden py-24" id="mint">
        <div className="wrap relative z-10 mx-auto max-w-[1060px] px-6 text-center">
          <span className="kicker">⏳ 蹲好别走</span>
          <h2 className="hand">
            生态 <span className="tom">Mint 发射</span> 已开启！
          </h2>
          <p className="sub">🦫 卡皮巴拉生态首批 Mint 已上线 —— 金库已就位，分红已连接，等你来搭窝</p>

          <div className="countdown flex flex-wrap justify-center gap-5">
            <div className="cd-box" style={{ "--t": "-2deg" } as React.CSSProperties}>
              <div className="cd-num hand">{cd.d}</div>
              <div className="cd-label">天</div>
            </div>
            <div className="cd-box" style={{ "--t": "1.5deg", marginTop: "8px" } as React.CSSProperties}>
              <div className="cd-num hand">{cd.h}</div>
              <div className="cd-label">时</div>
            </div>
            <div className="cd-box" style={{ "--t": "-1.5deg", marginTop: "12px" } as React.CSSProperties}>
              <div className="cd-num hand">{cd.m}</div>
              <div className="cd-label">分</div>
            </div>
            <div className="cd-box" style={{ "--t": "2deg", marginTop: "6px" } as React.CSSProperties}>
              <div className="cd-num hand">{cd.s}</div>
              <div className="cd-label">秒</div>
            </div>
          </div>

          <Link to="/mint">
            <button className="mint-btn hand">🦫 立即去 Mint 发射</button>
          </Link>
          <p className="ps">Mint 地址 · 链上可查</p>
        </div>
      </section>

      {/* ROADMAP */}
      <section className="road py-24" id="road">
        <div className="wrap mx-auto max-w-[1060px] px-6">
          <div className="sec-head reveal" ref={addReveal}>
            <span className="sec-kicker">🗺️ 路线图</span>
            <h2 className="sec-title hand">
              卡皮巴拉的
              <br />
              <span className="em">佛系成长计划</span>
            </h2>
          </div>

          <div className="road-list relative">
            <div className="road-item reveal" ref={addReveal}>
              <div className="dot">1</div>
              <div className="road-card">
                <h4>
                  生态启动 <span className="road-flag">已就位 ✅</span>
                </h4>
                <p>官网上线 · 双现金流合约部署 · 托底金库与分红池连接完成</p>
              </div>
            </div>
            <div className="road-item reveal" ref={addReveal}>
              <div className="dot">2</div>
              <div className="road-card">
                <h4>
                  生态 Mint 开启 <span className="road-flag hot">已上线 🔥</span>
                </h4>
                <p>首批生态 Mint 正式开启，金库开始积累，分红池开始运转</p>
              </div>
            </div>
            <div className="road-item reveal" ref={addReveal}>
              <div className="dot">3</div>
              <div className="road-card">
                <h4>
                  小游戏入驻生态 <span className="road-flag gray">筹备中 🌱</span>
                </h4>
                <p>吃瓜消消乐、佛系钓鱼、温泉泡澡陆续上线，游戏内行为产出代币</p>
              </div>
            </div>
            <div className="road-item reveal" ref={addReveal}>
              <div className="dot">4</div>
              <div className="road-card">
                <h4>
                  金库护盘 · 分红回馈 <span className="road-flag gray">持续运转 ⚙️</span>
                </h4>
                <p>金库自动回购托底，分红按持仓比例自动发放，生态闭环稳定运转</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="wrap mx-auto max-w-[1060px] px-6">
          <div className="paw">🐾🐾🐾</div>
          <div className="fbrand hand">🦫 佛系卡皮巴拉 CAPY</div>
          <p className="slogan">
            Chill meme culture with real mechanism —— 不靠虚头炒作，靠链上机制维持生态稳定
          </p>
          <div className="links flex flex-wrap justify-center gap-6">
            <Link to="/#bulletin">双现金流</Link>
            <Link to="/#notes">生态闭环</Link>
            <Link to="/#tickets">游戏生态</Link>
            <Link to="/mint">Mint发射</Link>
            <Link to="/mint-launches">Mint已发射</Link>
          </div>
          <p className="copy">© 2026 CAPY · 佛系卡皮巴拉游戏生态 · 请理性参与，拒绝炒作套路</p>
        </div>
      </footer>
    </div>
  );
}
