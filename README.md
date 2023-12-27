# PlayKitJS

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/seu-usuario/playkitjs/blob/main/LICENSE)

PlayKitJS é uma engine de jogos em JavaScript feita para simplificar o processo de criação de jogos em 2D. Ela oferece uma API intuitiva e uma série de recursos para facilitar o desenvolvimento de jogos, incluindo simulação de física, manipulação de sprites, entrada de teclado e mouse, e muito mais.

## Instalação

Você pode começar a usar o PlayKitJS clonando este repositório:

```
git clone https://github.com/seu-usuario/playkitjs.git
```

Em seguida, inclua o arquivo `playkit.js` em seu projeto:

```html
<script src="caminho-para/playkit.js"></script>
```

## Uso

Para começar a usar o PlayKitJS, você pode seguir os seguintes passos:

1. Inclua um elemento de canvas em seu HTML:

```html
<canvas id="gameCanvas"></canvas>
```

2. Crie a lógica do seu jogo em um arquivo JavaScript separado:

```javascript
// Importe a biblioteca do PlayKitJS
import { Game, Sprite, Keyboard } from 'playkit';

// Crie uma instância do jogo
const jogo = new Game('gameCanvas');

jogo.setup(() => {
  // Crie um sprite
  const player = new Sprite('sprites/player.png', 32, 32);
  player.setPosition(100, 100);

  // Adicione o sprite ao jogo
  jogo.addSprite(player);

  // Configure o teclado para controlar o sprite
  const keyboard = new Keyboard();
  keyboard.onKeyPress('ArrowUp', () => player.moveUp());
  keyboard.onKeyPress('ArrowDown', () => player.moveDown());
  keyboard.onKeyPress('ArrowLeft', () => player.moveLeft());
  keyboard.onKeyPress('ArrowRight', () => player.moveRight());
});
```

3. Inicie o jogo:

```javascript
jogo.start();
```

## Recursos

O PlayKitJS oferece uma variedade de recursos para ajudar no desenvolvimento de jogos, incluindo:

- Simulação de física realista com a engine Matter.js
- Manipulação de sprites, incluindo posicionamento, rotação e escala
- Detecção de colisões entre sprites
- Manipulação de entrada de teclado e mouse
- Reprodução de sons e músicas
- Gerenciamento de cenas e transições suaves
- E muitos outros recursos úteis para o desenvolvimento de jogos

## Contribuição

Se você quiser contribuir para o PlayKitJS, fique à vontade para abrir uma issue ou enviar um pull request. Sua contribuição é muito apreciada!

## Licença

O PlayKitJS é distribuído sob a licença MIT. Veja o arquivo [LICENSE](https://github.com/seu-usuario/playkitjs/blob/main/LICENSE) para mais informações.

## Contato

Se você tiver alguma dúvida ou sugestão em relação ao PlayKitJS, sinta-se à vontade para entrar em contato pelo email [seu-email@gmail.com](mailto:seu-email@gmail.com).

---

**Divirta-se desenvolvendo jogos com o PlayKitJS!**
