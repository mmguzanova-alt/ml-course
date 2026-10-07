# Агентная платформа ЕПЦП: минималистичное видео (Remotion)

Ролик (~114 с, 1920×1080, 30 fps) по презентации «Агентная платформа ЕПЦП. Архитектура и бизнес-сценарии».
Стиль взят из самой презентации: белый фон, красный акцент #C00000, Golos Text, тонкие линии, шевроны.

```bash
npm install
npm run studio   # предпросмотр
npm run render   # out/epcp.mp4 (нужны файлы озвучки, см. ниже)
```

Сцены лежат в `src/scenes.tsx`, порядок и длительность в `src/Video.tsx` (`TIMELINE`), общие компоненты в `src/ui.tsx`.

## Озвучка

Текст диктора лежит в `vo-script.json`, по одной записи на сцену. Голос: Piper, русская модель `ru-irinia-medium`. Длительность сцен подстраивается под длину фраз (`src/vo.json`), пошаговые анимации идут вслед за фразами.

```bash
pip install piper-tts
curl -L -o voice.tgz https://github.com/rhasspy/piper/releases/download/v0.0.2/voice-ru-irinia-medium.tar.gz && tar xzf voice.tgz
python3 ../tools/make_vo.py . ru-irinia-medium.onnx   # пишет public/vo/*.wav и src/vo.json
```

Ударение ставится знаком акута (`Соло́н`), латинские аббревиатуры пишутся кириллицей (`эм-си-пи`).
