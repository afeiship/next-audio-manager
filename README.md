# next-audio-manager
> Audio manager.

[![version][version-image]][version-url]
[![license][license-image]][license-url]
[![size][size-image]][size-url]
[![download][download-image]][download-url]

## installation
```bash
npm install -S @feizheng/next-audio-manager
```

## apis
| api      | params | description                   |
| -------- | ------ | ----------------------------- |
| create   | -      | Create one/multiple instance. |
| method   | -      | Call context method.          |
| property | -      | Call context property.        |

## usage
```js
import NxAudioManager from '@feizheng/next-audio-manager';

// ======= multiple =======
NxAudioManager.create([
  { key: 'k1', src: 'https://file-examples.com/wp-content/uploads/2017/11/file_example_MP3_700KB.mp3' },
  { key: 'k2', src: 'https://kolber.github.io/audiojs/demos/mp3/juicy.mp3' }
]);

// stop all audios:
NxAudioManager.method('play');



// ======= single =======
const audio = NxAudioManager.create({ 
  standalone: true,
  src: 'https://file-examples.com/wp-content/uploads/2017/11/file_example_MP3_700KB.mp3' 
});

audio.method('play');
```

## license
Code released under [the MIT license](https://github.com/afeiship/next-audio-manager/blob/master/LICENSE.txt).

[version-image]: https://img.shields.io/npm/v/@feizheng/next-audio-manager
[version-url]: https://npmjs.org/package/@feizheng/next-audio-manager

[license-image]: https://img.shields.io/npm/l/@feizheng/next-audio-manager
[license-url]: https://github.com/afeiship/next-audio-manager/blob/master/LICENSE.txt

[size-image]: https://img.shields.io/bundlephobia/minzip/@feizheng/next-audio-manager
[size-url]: https://github.com/afeiship/next-audio-manager/blob/master/dist/next-audio-manager.min.js

[download-image]: https://img.shields.io/npm/dm/@feizheng/next-audio-manager
[download-url]: https://www.npmjs.com/package/@feizheng/next-audio-manager
