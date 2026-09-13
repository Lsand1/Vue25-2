import Mock from 'mockjs'

Mock.setup({ timeout: '350-700' })

Mock.mock(/\/api\/mock\/culture-highlights(?:\?.*)?$/, 'get', {
  code: 0,
  message: 'success',
  'data|3': [
    {
      'id|+1': 1,
      'title|+1': ['故宫中轴线', '千里江山图', '宋代点茶'],
      'category|+1': ['建筑礼序', '丹青艺术', '生活美学'],
      'summary|+1': [
        '沿着中轴线理解宫殿空间里的秩序、尺度与礼仪。',
        '从青绿山水的矿物色彩，看古人心中的壮阔山河。',
        '一盏茶汤里的技艺、审美与文人生活。',
      ],
      'route|+1': ['/detail/故宫', '/culture', '/culture'],
    },
  ],
})
