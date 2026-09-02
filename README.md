# 나의 개발일지 (My Dev Log)

> React · GSAP · SCSS를 활용한 인터랙티브 UI 포트폴리오 프로젝트

<br>

## 📌 프로젝트 소개

**나의 개발일지**는 실제 블로그 서비스가 아닌, **프론트엔드 기술 역량을 시각적으로 증명하기 위해 제작한 포트폴리오 프로젝트**입니다.

블로그 형태의 UI를 통해 React 컴포넌트 설계, SCSS(BEM) 스타일링, GSAP 애니메이션, Canvas API 기반 인터랙션 등 다양한 프론트엔드 기술을 실전 수준으로 구현하는 데 집중했습니다.  
실제 데이터 연동 없이 더미 데이터로 구성되어 있으며, UI/UX 완성도와 코드 구조 설계에 중점을 두었습니다.

<br>

## 🚀 실행 방법

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build
```

<br>

## 🛠 기술 스택

| 구분 | 기술 | 버전 | 선택 이유 |
|------|------|------|-----------|
| **UI 프레임워크** | React | 19 | 컴포넌트 기반 구조로 재사용성 극대화 |
| **빌드 도구** | Vite | 5 | 빠른 HMR 및 번들링 속도 |
| **애니메이션** | GSAP (+ ScrollTrigger, Flip) | 3 | 복잡한 시퀀스 애니메이션 정밀 제어 |
| **스타일링** | SCSS + BEM 방법론 | — | 컴포넌트 단위 스타일 격리 및 유지보수성 |
| **아이콘** | react-icons | 5 | 통일된 아이콘 시스템 |

<br>

## ✨ 주요 기능

### 1. 다크 / 라이트 모드

- CSS Custom Properties(`--bg`, `--text`, `--accent` 등)를 활용한 테마 토큰 시스템
- `data-theme` 속성 교체 방식으로 전체 컴포넌트 색상 일괄 전환
- `transition`으로 테마 전환 시 부드러운 색상 변화 연출
- 기본값: 다크 모드 (`#0d0d14`)

### 2. 한국어 / 영어 언어 전환

- `DICT` 객체로 한/영 텍스트를 중앙에서 관리
- 타이틀, 서브타이틀, 검색 플레이스홀더, 푸터 저작권 문구까지 동적 전환
- 언어 전환 시 타이틀 GSAP 애니메이션 자동 재실행 (`key={language}` 활용)

### 3. 실시간 검색 필터링

- 검색 버튼 클릭 시 GSAP로 입력창 슬라이드 인/아웃
- 포스트 **제목 + 설명** 동시 검색
- 카테고리 필터와 AND 조건으로 동시 적용

### 4. 카테고리 필터 탭

- 전체 / 프론트엔드 / UI/UX / 일상 — 4개 카테고리
- 활성 탭에 accent 색상 배경 + glow 효과로 선택 상태 시각화
- 필터 전환 시 카드가 제자리에서 fade-out → fade-in (GSAP)

### 5. Canvas 기반 인터랙티브 배경

- `<canvas>` API로 구현한 **130개 파티클 시스템**
- 파티클 색상: 보라 · 핑크 · 파랑 · 청록 · 오렌지 (다크/라이트 테마 연동)
- **마우스 반경 140px 이내** 파티클이 밀려나는 반응형 인터랙션
- GSAP로 4개의 블롭(Gooey 효과)이 부유 + 마우스 패럴랙스 동시 적용
- SVG feTurbulence noise 텍스처 오버레이로 grain 질감 추가

### 6. 글래스모피즘 카드 UI

- `backdrop-filter: blur(18px)` + 반투명 배경으로 배경 블롭이 카드에 비침
- 라이트 모드: `rgba(255, 255, 255, 0.58)` / 다크 모드: `rgba(255, 255, 255, 0.045)`
- hover 시 `translateY(-7px)` + accent 테두리 glow 효과
- 썸네일 이미지 hover 시 scale 확대

### 7. 메인 타이틀 Wave 애니메이션

- 타이틀을 `<span>`으로 한 글자씩 분리, GSAP `stagger`로 순차 등장 (y: 30→0)
- 각 글자 hover 시 Bounce Loop 무한 반복, 이탈 시 원위치 복귀
- React Strict Mode 이중 실행 방지: `gsap.context()` + `fromTo` 사용

### 8. 스켈레톤 로딩 UI

- 최초 로딩 시 1.2초간 shimmer 애니메이션 스켈레톤 카드 6개 표시
- 이미지, 태그, 제목, 설명, 날짜 영역을 각각 별도 스켈레톤으로 표현
- CSS `linear-gradient` 애니메이션으로 shimmer 구현, 다크/라이트 테마 자동 연동

### 9. 플로팅 맨 위로 버튼

- GSAP `ScrollTrigger`로 150px 이상 스크롤 시 버튼 등장 (`autoAlpha` 제어)
- 클릭 시 `window.scrollTo({ behavior: 'smooth' })`로 최상단 이동

### 10. 기술 스택 마키 푸터

- CSS `animation`으로 기술 아이콘 (React, JS, Sass, HTML5, CSS3, Git, Figma 등) 무한 스크롤
- hover 시 일시정지, 양쪽 fade 처리로 자연스러운 루프 연출

### 11. 반응형 레이아웃

- CSS Grid: **3단(≥1024px) → 2단(768~1023px) → 1단(≤767px)** 자동 전환
- SCSS `respond-to()` 믹스인으로 반응형 미디어 쿼리 일원화

<br>

## 📁 폴더 구조

```
src/
├── index.css               # CSS 변수 정의 (라이트/다크 테마 토큰)
├── main.jsx                # React 진입점
├── App.jsx                 # 레이아웃, 상태 관리, 더미 포스트 데이터
├── App.scss
│
├── assets/images/          # 포스트 썸네일 이미지 (PNG × 6)
│
├── components/
│   ├── Header/             # 고정 헤더 (검색·테마·언어·소셜)
│   ├── FilterBar/          # 카테고리 탭 필터
│   ├── CardList/           # 카드 목록 (GSAP fade 애니메이션)
│   ├── Card/               # 개별 포스트 카드 (글래스모피즘)
│   ├── CardSkeleton/       # shimmer 스켈레톤 로딩
│   ├── WaveBackground/     # Canvas 파티클 + GSAP 블롭 배경
│   ├── Footer/             # 기술스택 마키 + 저작권
│   └── FloatingTopBtn/     # ScrollTrigger 연동 맨 위로 버튼
│
└── styles/
    ├── _variables.scss     # 색상, 글래스, 브레이크포인트 변수
    ├── _mixins.scss        # respond-to, glass-panel 믹스인
    └── global.scss         # 전역 Reset + 기본 스타일
```

<br>

## 🎨 디자인 시스템

### 테마 색상 토큰

| 토큰 | 라이트 모드 | 다크 모드 | 용도 |
|------|------------|----------|------|
| `--bg` | `#f5f3ff` | `#0d0d14` | 배경 기본색 |
| `--bg-glass` | `rgba(255,255,255,0.58)` | `rgba(255,255,255,0.045)` | 글래스 카드 배경 |
| `--text-h` | `#1a1523` | `#f0eeff` | 제목 텍스트 |
| `--text` | `#5c5470` | `#9ca3af` | 본문 텍스트 |
| `--accent` | `#8b2fff` | `#c084fc` | 강조 컬러 |
| `--border` | `rgba(200,180,255,0.35)` | `rgba(255,255,255,0.09)` | 테두리 |

### 반응형 브레이크포인트

| 구간 | 범위 | 그리드 |
|------|------|--------|
| 데스크톱 | 1024px 이상 | 3단 |
| 태블릿 | 768px ~ 1023px | 2단 |
| 모바일 | 767px 이하 | 1단 |

<br>

## 🔧 트러블슈팅

### 1. CSS 변수 전체 미적용 (핵심 버그)

**문제**  
`index.css`에 테마 토큰(`--bg`, `--accent` 등)을 정의했으나 전혀 적용되지 않아 배경이 흰색, FilterBar에 불릿(•) 노출, 활성 탭 글씨 안 보임 등 연쇄 문제 발생.

**원인**  
`main.jsx`가 `global.scss`만 import하고 `index.css`는 import하지 않음. Vite는 `index.css`를 자동으로 번들에 포함하지 않음.

**해결**  
```js
// main.jsx
import './index.css'   // ← 추가
import './styles/global.scss'
```

---

### 2. 글래스모피즘 backdrop-filter 미동작

**문제**  
`backdrop-filter: blur(18px)`을 카드에 적용했으나 배경이 흐려지지 않고 단색으로만 보임.

**원인**  
`backdrop-filter`는 **요소 뒤에 렌더링되는 콘텐츠**가 있어야 효과가 발생함. `body`에 `background-color: #0d0d14`가 지정되어 있어 `WaveBackground`(z-index: -1)를 완전히 가리고, 카드 뒤에는 단색만 남아 블러 효과가 무의미해짐.

**해결**  
`body`와 `#root`를 `background: transparent`로 설정. `WaveBackground`(position: fixed, z-index: -1)가 배경 렌더링을 전담하고, 카드 뒤로 그라디언트 블롭이 비쳐 blur 효과 활성화.

---

### 3. GSAP와 React Strict Mode 이중 실행 충돌

**문제**  
개발 환경에서 타이틀 애니메이션이 두 번 실행되어 글자가 겹치거나 애니메이션이 꼬이는 현상 발생.

**원인**  
React 18 Strict Mode는 개발 환경에서 컴포넌트를 마운트 → 언마운트 → 재마운트하여 `useEffect`를 두 번 실행. `gsap.to()`를 사용할 경우 두 번째 실행이 첫 번째 애니메이션과 충돌.

**해결**  
`gsap.fromTo()`를 사용해 시작값과 종료값을 명시적으로 지정, `gsap.context()`로 스코프를 제한하고 cleanup 함수에서 `ctx.revert()`로 정리.

```js
const ctx = gsap.context(() => {
  gsap.fromTo('.app__title-char',
    { y: 30, opacity: 0 },
    { y: 0, opacity: 1, stagger: 0.05, duration: 0.8 }
  );
}, titleRef);
return () => ctx.revert();
```

---

### 4. FilterBar 불릿(•) 노출 및 UI/UX 탭 크기 이상

**문제**  
필터 탭 아이템 옆에 브라우저 기본 불릿(•)이 노출되고, `UI/UX` 탭만 크기와 위치가 달리 보임.

**원인**  
- CSS 변수 미적용(#1번 버그)으로 `global.scss`의 `list-style: none` reset이 동작하지 않음
- `flex-wrap: wrap`이 적용되어 `/` 문자 포함 탭이 줄바꿈

**해결**  
```scss
.filter-bar__list {
  list-style: none !important;  // 이중 안전망
  flex-wrap: nowrap;
}
.filter-bar__item {
  list-style: none !important;
  flex-shrink: 0;               // 크기 축소 방지
}
```

<br>

## 📸 스크린샷

<img width="686" height="496" alt="mdl-mockup" src="https://github.com/user-attachments/assets/e533d58a-bdb6-41ad-90df-a3c899dc5414" />


<br>

---

© 2026 나의 개발일지. All rights reserved.
