import Mock from 'mockjs'

Mock.setup({ timeout: '350-700' })

Mock.mock(/\/api\/mock\/culture-highlights(?:\?.*)?$/, 'get', {
  code: 0,
  message: 'success',
  'data|3': [
    {
      'id|+1': 1,
      'title|+1': ['故宫中轴线', '千里江山图', '景泰蓝'],
      'category|+1': ['建筑礼序', '丹青艺术', '器物工艺'],
      'summary|+1': [
        '沿着中轴线理解宫殿空间里的秩序、尺度与礼仪。',
        '从青绿山水的矿物色彩，看古人心中的壮阔山河。',
        '从金属线与珐琅釉彩，认识器物表面的工艺语言。',
      ],
      'route|+1': ['/detail/故宫', '/detail/千里江山图', '/detail/景泰蓝'],
    },
  ],
})
