# WordChainerJS

> Korean Word Chainer Bot

[![npm](https://img.shields.io/npm/v/word-chainer.svg?style=flat-square)](https://www.npmjs.com/package/word-chainer) [![npm](https://img.shields.io/npm/dt/word-chainer.svg?style=flat-square)](https://www.npmjs.com/package/word-chainer)

한국어 끝말잇기 봇

## ChangeLog

See [CHANGELOG](./CHANGELOG.md)

## Install

- Install with npm:
``` bash
npm install word-chainer
```

- Clone the repo:
``` bash
git clone https://github.com/Astro36/WordChainerJS.git
```

## Usage

```javascript
const chainer = require('word-chainer');

const bot = new chainer.WordChainer(chainer.EasyLevel);

const readline = require('readline');

const r = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

r.setPrompt('You: ');
r.prompt();
r.on('line', (line) => {
  if (line === 'exit' || line === 'gg') {
    r.close();
  }

  try {
    const next = bot.next(line);
    console.log(`Bot: ${next}`);
    if (next === 'gg') {
      r.close();
    }
  } catch (e) {
    console.log(e.toString());
  }

  r.prompt();
});
r.on('close', () => {
  process.exit();
});
```

## Rule

이 규칙은 참가자와 봇 모두에게 기본적으로 적용되는 규칙입니다.

### 개요

앞 참가자가 입력한 단어의 마지막 글자로 시작하는 단어를 입력합니다. 차례는 한 사람이 패배할 때까지 반복됩니다. 자신의 차례에 단어를 입력하지 못하면 패배합니다.

```
끝말잇기-기사-사과-과산화나트륨
```

### 사용 가능 단어

단어는 2글자 이상이어야 하며, 가~힣 사이의 글자 중 하나여야 합니다.

#### 품사

명사만을 사용할 수 있습니다. 또한, 일부 고유명사도 사용할 수 있습니다.

- `나트륨`: 명사
- `슘페터`: <인명> 모라비아 태생의 미국 경제학자(1883~1950)

#### 어휘

표준어, 옛말, 방언, 북한어(문화어), 외래어 등을 사용할 수 있습니다.

- `민주주의`
- `션믈`: 뇌물(賂物)의 옛말
- `곽밥`: 도시락의 북한어
- `트랙션`: <미술> 도장면(塗裝面)이 갈라져서 그 틈으로 바닥이 드러나는 일

#### 띄어쓰기

여러 개의 단어가 합쳐진 단어도 인정하며, 모든 단어는 띄어 쓰지 않음을 원칙으로 합니다.

#### 한방단어

각 게임의 참가자의 첫 번째 차례에는 한방단어(끝말잇기에서 더 이을 단어가 없는 글자)를 사용할 수 없습니다.

## Custom Rule

사용자가 임의로 지정할 수 있는 규칙입니다.

### 두음법칙 Rule.ALLOWED_INITIAL [Default]

아래와 같은 두음 법칙을 인정합니다. 단, 역은 성립하지 않습니다.
- 녀 -> 여
- 뇨 -> 요
- 뉴 -> 유
- 니 -> 이
- 랴 -> 야
- 려 -> 여
- 례 -> 예
- 료 -> 요
- 류 -> 유
- 리 -> 이
- 라 -> 나
- 래 -> 내
- 로 -> 노
- 뢰 -> 뇌
- 루 -> 누
- 르 -> 느

### 특수단어 추가 Rule.ALLOWED_EXTRA

아래와 같은 주제의 단어를 사용할 수 있습니다.
- THE iDOLM@STER
- VOCALOID
- 개구리 중사 케로로
- 국내 방송 프로그램
- 니세코이
- 대한민국 철도역
- 도타 2
- 듀라라라!!
- 디지몬
- 라면/과자
- 러브 라이브!
- 리그 오브 레전드
- 마법소녀 리리컬 나노하
- 마법소녀 마도카☆마기카
- 메이플스토리
- 메카쿠시티 액터즈
- 모노가타리 시리즈
- 모바일 게임
- 빙과
- 사이퍼즈
- 스즈미야 하루히
- 스타크래프트
- 신조어
- 아지랑이 프로젝트
- 앙상블 스타즈!
- 엘소드
- 오레이모
- 오버워치
- 온라인 게임
- 외국 영화
- 월드 오브 워크래프트
- 유루유리
- 유명인
- 라이트 노벨
- 만화/애니메이션
- 젤다의 전설
- 포켓몬스터
- 하이큐!!
- 하스스톤
- 한국 영화
- 함대 컬렉션
- 히어로즈 오브 더 스톰

### 매너 Rule.MANNER

한방단어와 스택단어(끝 한 글자로 시작하는 단어가 5개 미만인 글자)를 사용할 수 없습니다. 아래와 같은 단어가 스택단어입니다.
- `가뭄`: `뭄바이`, `뭄푸레`
- `비스킷`: `킷값`, `킷캣`(Rule.ALLOWED_EXTRA 적용 시)
- `햇돝`: `돝고기`, `돝벌기`, `돝잠`

## Level

봇의 난이도에 대한 설명입니다. 모든 사용자 규칙을 적용했을 때를 기준으로 합니다.

### Easy

쉬움 난이도입니다. 한방단어를 사용하지 않으며 콤보(ex. 연속 - **속력** - 역기 - **기력** - 역사 - **사력**)를 사용할 확률이 매우 낮습니다. 반격하기 쉬운 단어를 사용합니다.

### Normal

보통 난이도입니다. 한방단어를 사용하지 않으며 콤보를 사용할 확률이 낮습니다.

### Hard

어려움 난이도입니다. 한방단어를 사용하지 않습니다. 반격하기 어려운 단어를 사용합니다.

### Insane

매우 어려움 난이도입니다. 반격하기 매우 어려운 단어를 사용합니다.

## License

WordChainerJS is licensed under the [GPL 3.0](./LICENSE).

[dp.sql](https://github.com/JJoriping/KKuTu/blob/master/db.sql) for Korean word database is licensed under an [GPL-3.0](https://raw.githubusercontent.com/JJoriping/KKuTu/master/LICENSE) by JJoriping.
