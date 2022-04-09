const Colaboradores = require('../models/Colaboradores')
const Setores = require('../models/Setores')

module.exports = class LoadALlUsersRepository {
  async load () {
    const response = await Colaboradores.findAll({
      include: {
        model: Setores,
        as: 'belongs_to'
      }
    })

    const dict = response.reduce((acc, cur) => {
      const description = cur.belongs_to.dataValues.description
      const { nome, email } = cur
      if (!Object.prototype.hasOwnProperty.call(acc, description)) {
        return { ...acc, [description]: [{ nome, email }] }
      }
      acc[description] = [...acc[description], { nome, email }]
      return acc
    }, {})
    return dict
  }
}
