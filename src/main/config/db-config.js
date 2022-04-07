module.exports = {
  dialect: 'postgres',
  host: 'db',
  username: 'postgres',
  password: 'docker',
  database: 'test',
  define: {
    timestamps: true,
    underscored: true
  }
}
