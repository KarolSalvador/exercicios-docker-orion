const sharp = require('sharp');

module.exports = {
  name: 'StickerNode',
  displayName: 'Sticker Generator',
  group: ['transform'],
  version: 1,
  description: 'Converte imagem para sticker WebP compatível com WhatsApp',
  defaults: {
    name: 'Sticker Generator',
    color: '#4CAF50',
  },
  inputs: ['main'],
  outputs: ['main'],
  properties: [
    {
      displayName: 'Tamanho',
      name: 'size',
      type: 'number',
      default: 512,
      description: 'Dimensão (largura e altura) do sticker em pixels',
    },
  ],
  async execute() {
    const items = this.getInputData();
    const size = this.getNodeParameter('size', 0);

    for (let i = 0; i < items.length; i++) {
      const binaryData = items[i].binary?.data;
      if (!binaryData) throw new Error('Nenhum dado binário encontrado.');

      const imageBuffer = Buffer.from(binaryData, 'base64');

      // Redimensiona mantendo o fundo original
      const stickerBuffer = await sharp(imageBuffer)
        .resize(size, size, {
          fit: 'inside', // mantém proporção original
          withoutEnlargement: true, // não aumenta imagens pequenas
        })
        .webp({
          quality: 100,
          effort: 6,
        })
        .toBuffer();

      items[i].json = {
        sticker: stickerBuffer.toString('base64'),
        format: 'webp',
        message: 'Sticker gerado com sucesso!',
      };
    }

    return this.prepareOutputData(items);
  },
};
